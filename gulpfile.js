const gulp = require("gulp"),
	autoprefixer = require("gulp-autoprefixer"),
	browserslist = require("browser-sync").create(),
	plumber = require("gulp-plumber"),
	sass = require("gulp-sass"),
	minify = require("gulp-csso"),
	rename = require("gulp-rename"),
	imagemin = require("gulp-imagemin"),
	del = require("del");

gulp.task("clean", () => del("build"));

gulp.task("sass", () =>
	gulp
		.src("app/sass/**/*.scss")
		.pipe(plumber())
		.pipe(sass())
		.pipe(
			autoprefixer({
				browsers: ["last 5 versions"],
			})
		)
		.pipe(gulp.dest("app/css"))
		.pipe(browserslist.stream())
		.pipe(
			sass({
				outputStyle: "compressed",
			}).on("error", sass.logError)
		)
);

gulp.task("minify", () =>
	gulp
		.src("app/css/style.css")
		.pipe(minify())
		.pipe(rename("style.min.css"))
		.pipe(gulp.dest("app/css"))
);

gulp.task("images", () =>
	gulp
		.src("app/img/**/*.{png,svg,jpg}")
		.pipe(
			imagemin([
				imagemin.optipng({ optimizationLevel: 3 }),
				imagemin.jpegtran({ progressive: true }),
				imagemin.svgo(),
			])
		)
		.pipe(gulp.dest("app/img"))
);

gulp.task("serve", () => {
	browserslist.init({
		server: {
			baseDir: "./app",
		},
	});
	gulp.watch("app/sass/**/*.scss", gulp.series("sass"));
	gulp.watch("app/*.html").on("change", browserslist.reload);
});

gulp.task("copy", () =>
	gulp
		.src(
			[
				"app/*.html",
				"app/fonts/**/*.woff",
				"app/img/**",
				"app/js/**",
				"app/css/*.css",
			],
			{
				base: "app/",
			}
		)
		.pipe(gulp.dest("build"))
);

gulp.task("optimizeImages", gulp.parallel("images"));
gulp.task("serve", gulp.parallel("minify", "sass", "serve"));
gulp.task("build", gulp.series("clean", "copy", "sass", "images"));
