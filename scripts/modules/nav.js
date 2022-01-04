const navbar = document.querySelector("nav")
let sticky = navbar.offsetTop
let targets
let navItem

//Exported function to refresh variables when new elements are added to navBar
function getAllNewElements() {
  targets = document.querySelectorAll('.parallax')
  navItem = document.querySelectorAll(".nav-item")

  underlineNavElements()
  detectSectionsInViewport()
}
export default getAllNewElements;

getAllNewElements()

// Sticky navbar
window.addEventListener("scroll", () => {
  if (window.pageYOffset > sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky")
  }
})

//Underline active element in navbar by adding 'active' class on user click
function underlineNavElements() {
  navItem.forEach(item => {
    item.addEventListener("click", () => {
      navItem.forEach(item => item.classList.remove("active"))

      document.getElementById(item.getAttribute("data-target")).scrollIntoView(true)

      item.classList.add("active")
    })
  })
}

//Underline active element in navbar by detecting section in viewport
function detectSectionsInViewport() {
  let navbarHeight = document.querySelector("nav").offsetHeight
  let rootMarginBottom = window.innerHeight - navbarHeight

  let options = {
    rootMargin: "0px 0px -" + rootMarginBottom + "px 0px",
    threshold: 0
  };

  let intersectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      let currItem
      if (entry.isIntersecting) {
        let navItem = document.querySelectorAll(".nav-item")

        navItem.forEach(item => {
          item.classList.remove("active")
          if (item.getAttribute("data-target") == entry.target.parentElement.getAttribute("data-anchor")) {
            currItem = item
          }
        })
        currItem.classList.add('active')
      }
    });
  }, options);

  targets.forEach(target => intersectionObserver.observe(target))
}