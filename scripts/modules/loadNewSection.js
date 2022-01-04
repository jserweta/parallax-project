import parallaxIntersectionObserver from "./parallax.js"
import getAllNewElements from './nav.js'
import getTextToBlur from './textBlur.js'

let content = document.querySelector('.content')
const options = {
    rootMargin: "0px 0px -100px 0px",
    threshold: 0.0
}
let numberOfVisibleSections = 1

let previousY = 0
const loadSectionIntersectionObserver = new IntersectionObserver((entries, observer) => {
   entries.forEach((entry, index) =>{
    const currentY = entry.boundingClientRect.y
    if (currentY < previousY) {
        console.log('scrolling down')
       if (entry.isIntersecting && numberOfVisibleSections < 4){
          console.log(entry.intersectionRatio)
           numberOfVisibleSections += 1
           fetch("section-"+numberOfVisibleSections+".html")
            .then(res=>res.text())
            .then((text) => {
                let parser = new DOMParser();
               
                let html = parser.parseFromString(text, "text/html");
                let secId = html.querySelector("section").id
                
                entry.target.parentElement.insertAdjacentElement("afterend",html.querySelector("section"))

                const navBar = document.querySelector("nav")

                let navItem = document.createElement("div")
                navItem.setAttribute("data-target", secId)
                navItem.setAttribute("class", "nav-item")
                navItem.innerText = secId

                navBar.appendChild(navItem)

                getAllNewElements()
                getTextToBlur()

                let nextContent = document.getElementById(secId).querySelector(".content")

                loadSectionIntersectionObserver.observe(nextContent)

                parallaxIntersectionObserver.observe(document.getElementById(secId))
                
            })
            loadSectionIntersectionObserver.unobserve(entry.target)
       }
    }
    previousY = currentY
   })
}, options)

loadSectionIntersectionObserver.observe(content)