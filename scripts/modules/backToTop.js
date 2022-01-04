let btt = document.querySelector(".back-to-top")

window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
        btt.style.opacity = 1;
    } else {
        btt.style.opacity = 0;
    }
})

btt.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})