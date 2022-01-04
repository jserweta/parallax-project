let navbarHeight = document.querySelector("nav").offsetHeight
let rootMarginBottom = window.innerHeight - navbarHeight

const options = {
    rootMargin: "0px 0px -" + rootMarginBottom + "px 0px",
    threshold: 0.0
};

let deg = 0
let direction = true
const parallaxIntersectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.id == "travelling"){
                //First section - mountains
                const bg = document.querySelector(".parallax #background-1")
                const moon = document.querySelector(".parallax #moon")
                const mountain = document.querySelector(".parallax #mountain")
                const campervan = document.querySelector(".parallax #campervan")
                const road = document.querySelector(".parallax #road")

                const header = document.querySelectorAll(".parallax-header")

                window.addEventListener("scroll", () => {
                    let value = window.scrollY
                    
                    bg.style.top = value * 0.5 + "px"
                    moon.style.left = -value * 0.5 + "px"
                    mountain.style.top = -value * 0.15 + "px"
                    campervan.style.top = value * 0.1 + "px"
                    campervan.style.left = value * 0.15 + "px"
                    road.style.top = value * 0.15 + "px"
                    header[0].style.top = value * 1 + "px"
                
                })
                
            }else if (entry.target.id == "sunset") {
                //Second section - sunset
                const bg2 = document.querySelector("#background-2")
                const sun = document.querySelector("#sun")
                const bird1 = document.querySelector("#bird-1")
                const bird2 = document.querySelector("#bird-2")
                const swing = document.querySelector("#swing")

                let contentSec = document.getElementById(entry.target.id).querySelector(".content")

                window.addEventListener("scroll", () => {
                    let positionFromTop = document.querySelector("#sunset").offsetTop
                    let offset = positionFromTop - navbarHeight

                    let value = window.scrollY - positionFromTop
                    if (window.scrollY >= offset) {
                        bg2.style.bottom = value * 0.15 + "px"
                        sun.style.left = value * 0.5 + "px"
                        sun.style.top = value * 0.6 + "px"
                        bird1.style.top = -value * 0.4 + "px"
                        bird1.style.left = value * 0.4 + "px"
                        bird2.style.top = -value * 0.3 + "px"
                        bird2.style.left = -value * 0.3 + "px"

                        if (direction) {
                            deg = deg + 0.2
                            swing.style.transform = "skewX(" + deg + "deg) translateY(-10px)"
                            if (deg >= 10) direction = false
                        } else {
                            deg = deg - 0.2
                            swing.style.transform = "skewX(" + deg + "deg) translateY(-10px)"
                            if (deg <= -10) direction = true
                        }
                        //header[1].style.top = value * 0.7 + "px"
                    }
                   
                    
                })
            } else if (entry.target.id == "city") {
                //Third section - city
                const cityCar = document.querySelector("#city-car")
                const cityRoad = document.querySelector("#city-road")
                const citySkyscraper = document.querySelector("#city-skyscraper")
                const citySky = document.querySelector("#city-sky")

                let contentSec = document.getElementById(entry.target.id).querySelector(".content")
                // let scale = 1
                // let lastScrollTop = 0
                window.addEventListener("scroll", () => {
                    let positionFromTop = document.querySelector("#city").offsetTop
                    let offset = positionFromTop - navbarHeight

                    let value = window.scrollY - positionFromTop
                    if (window.scrollY >= offset) {
                        
                        cityCar.style.top = -value * 0.1 + "px"
                        cityCar.style.left = -value * 0.8 + "px"
                        //cityCar.style.transform = "scale("+ scale +")"
                        cityRoad.style.bottom = value * 0.15 + "px"
                        citySkyscraper.style.top = -value * 0.15 + "px"
                        citySky.style.top = -value * 0.6 + "px"
                        
                        // let st = window.pageYOffset || document.documentElement.scrollTop; 
                   
                        // if (st > lastScrollTop){
                        //     scale = scale >= 0.4 ? scale - 0.01 : scale
                        //  } else {
                        //     scale = scale < 1 ? scale + 0.01 : scale
                        //  }
                        // lastScrollTop = st <= 0 ? 0 : st;

                    }
                
                })


            }else if (entry.target.id == "lake"){
                //Fourth section - lake
                const lakeCoast = document.querySelector("#coast")
                const boatMidBottom = document.querySelector("#boat-middle-bottom")
                const boatRight = document.querySelector("#boat-right")
                const lakeMountains = document.querySelector("#lake-mountains")

                let contentSec = document.getElementById(entry.target.id).querySelector(".content")

                window.addEventListener("scroll", () => {
                    let positionFromTop = document.querySelector("#lake").offsetTop
                    let offset = positionFromTop - navbarHeight

                    let value = window.scrollY - positionFromTop
                    if (window.scrollY >= offset) {
                        lakeCoast.style.top = value * 0.1 + "px"
                        
                        lakeMountains.style.top = -value * 0.2 + "px"

                        boatMidBottom.style.top = value * 0.3 +"px"
                        boatMidBottom.style.left = -value * 0.1 + "px"
                       
                        boatRight.style.top = value * 0.1 + "px"
                        boatRight.style.left = value * 0.2 + "px"
                    } 
                })
            }

        }
    });
}, options);
export default parallaxIntersectionObserver

parallaxIntersectionObserver.observe(document.getElementById("travelling"))
