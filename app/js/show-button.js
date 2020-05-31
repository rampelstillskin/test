const burgerMenuButton = document.querySelector(".mobile-nav__open");
const desktopNav = document.querySelector(".desktop-nav");
const mobileNav = document.querySelector(".mobile-nav");
const closeBurgerMenu = document.querySelector(".close");

burgerMenuButton.addEventListener("click", () => {
	mobileNav.classList.toggle("show");
	burgerMenuButton.classList.toggle("close");
});
