import parallaxIntersectionObserver from "./parallax.js"
import getAllNewElements from './nav.js'
import getTextToBlur from './textBlur.js'

//Dynamic load next sections when they appear 100px in viewport
let content = document.querySelector('.content')
const options = {
    rootMargin: "0px 0px -100px 0px",
    threshold: 0.0
}
let numberOfVisibleSections = 1
let previousY = 0

//Intersection observer to watch when previous section is ending
const loadSectionIntersectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {

        //Detecting if page is scrolling down
        const currentY = entry.boundingClientRect.y
        if (currentY < previousY) {

            if (entry.isIntersecting && numberOfVisibleSections < 4) {
                numberOfVisibleSections += 1
                //Adding new section by getting it from prepared files
                fetch("section-" + numberOfVisibleSections + ".html")
                    .then(res => res.text())
                    .then((text) => {
                        //Parsing text into html object
                        let parser = new DOMParser();

                        let html = parser.parseFromString(text, "text/html");
                        let secId = html.querySelector("section").id
                        //Appending section after last section
                        entry.target.parentElement.insertAdjacentElement("afterend", html.querySelector("section"))

                        //Add new element to navbar
                        const navBar = document.querySelector("nav")
                        let navItem = document.createElement("div")
                        navItem.setAttribute("data-target", secId)
                        navItem.setAttribute("class", "nav-item")
                        navItem.innerText = secId

                        navBar.appendChild(navItem)

                        //Refresh variables to make blur and nav underline work
                        getAllNewElements()
                        getTextToBlur()

                        //Observe new elements that are added above
                        let nextContent = document.getElementById(secId).querySelector(".content")
                        loadSectionIntersectionObserver.observe(nextContent)
                        parallaxIntersectionObserver.observe(document.getElementById(secId))

                    })
                //Unobserve current section
                loadSectionIntersectionObserver.unobserve(entry.target)
            }
        }
        previousY = currentY
    })
}, options)

loadSectionIntersectionObserver.observe(content)