const images = document.querySelectorAll(".gallery .image");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const counter = document.getElementById("counter");
const download = document.getElementById("download");

let currentIndex = 0;

// Open Lightbox
images.forEach((image, index) => {
    image.addEventListener("click", () => {
        currentIndex = index;
        showImage();
        lightbox.style.display = "flex";
    });
});

// Show Image
function showImage() {

    const img = images[currentIndex].querySelector("img");

    lightboxImg.style.animation = "none";
    lightboxImg.offsetHeight;
    lightboxImg.style.animation = "fade 0.4s ease";

    lightboxImg.src = img.src;

    download.href = img.src;

    counter.textContent = `${currentIndex + 1} / ${images.length}`;
}

// Close
closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

// Next
nextBtn.addEventListener("click", () => {
    currentIndex++;

    if(currentIndex >= images.length){
        currentIndex = 0;
    }

    showImage();
});

// Previous
prevBtn.addEventListener("click", () => {
    currentIndex--;

    if(currentIndex < 0){
        currentIndex = images.length - 1;
    }

    showImage();
});

// Close on Background Click
lightbox.addEventListener("click",(e)=>{
    if(e.target===lightbox){
        lightbox.style.display="none";
    }
});

// Keyboard Controls
document.addEventListener("keydown",(e)=>{

    if(lightbox.style.display==="flex"){

        if(e.key==="ArrowRight"){
            nextBtn.click();
        }

        if(e.key==="ArrowLeft"){
            prevBtn.click();
        }

        if(e.key==="Escape"){
            lightbox.style.display="none";
        }

    }

});

// Filter Buttons
const filterButtons = document.querySelectorAll(".buttons button");

filterButtons.forEach(button=>{

button.addEventListener("click",()=>{

filterButtons.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

const filter = button.getAttribute("data-filter");

images.forEach(image=>{

if(filter==="all"){

image.style.display="block";

}

else if(image.classList.contains(filter)){

image.style.display="block";

}

else{

image.style.display="none";

}

});

});

});

const darkMode = document.getElementById("darkMode");

// Check saved theme when page loads
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
    darkMode.innerHTML = "☀️ Light Mode";
}

darkMode.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        darkMode.innerHTML = "☀️ Light Mode";
        localStorage.setItem("theme", "dark");
    } else {
        darkMode.innerHTML = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");
    }

});

// Auto Slideshow
setInterval(() => {

    if (lightbox.style.display === "flex") {

        currentIndex++;

        if (currentIndex >= images.length) {
            currentIndex = 0;
        }

        showImage();
    }

}, 3000);

const search = document.getElementById("search");

search.addEventListener("keyup", () => {

    const value = search.value.toLowerCase();

    images.forEach(image => {

        const text = image.innerText.toLowerCase();

        if(text.includes(value)){
            image.style.display = "block";
        }
        else{
            image.style.display = "none";
        }

    });

});