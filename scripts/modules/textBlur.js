//Preform text blur when it is entering or leaving viewport
let navbarHeight = document.querySelector("nav").offsetHeight
let offsetTop = navbarHeight + 100

const blurOptions = {
    rootMargin: "-" + offsetTop + "px 0px -100px 0px",
    threshold: 0
}

const blurOnScroll = new IntersectionObserver(function (entries, blurOnScroll) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("appear")
        } else {
            entry.target.classList.remove("appear")
        }
    })
}, blurOptions)

//Function to refresh variables when new elements are added to page
function getTextToBlur() {
    const textToBlur = document.querySelectorAll(".fade-in")
    textToBlur.forEach(entry => {
        blurOnScroll.observe(entry)
    })
}
export default getTextToBlur

getTextToBlur()