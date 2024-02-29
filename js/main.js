const [prevBtn,carouselPause,nextBtn] = document.querySelector(".carousel_btnBox").querySelectorAll("button");
const pauseI = document.getElementById("carouselBtn");
const aboutNav = document.querySelector(".header_nav_menu_box").querySelector("span");
const start_btn = document.querySelector(".start_btn");
const CarouselNode = document.querySelector(".project_carousel");
const [nowPage, divide, totalPage] = document.querySelector(".carouselPage").querySelectorAll("span");
totalPage.textContent = document.querySelectorAll(".project_box").length.toString();
const options = {
  loop: true ,
  align : "center",
  duration : 50,
};

const plugins = [EmblaCarouselAutoplay({delay: 3000})];
const Carousel = EmblaCarousel(CarouselNode, options, plugins);
Carousel.plugins().autoplay.play();
let carouselActive = true;

Carousel.on("select",() =>{
  update_nowPage();
})

prevBtn.onclick = () => {
  Carousel.scrollPrev();
  update_nowPage();
}

nextBtn.onclick = () => {
  Carousel.scrollNext();
  update_nowPage();
}

carouselPause.onclick = () => {
  if(carouselActive){
    Carousel.plugins().autoplay.stop();
    pauseI.className = "fa-regular fa-circle-play";
  }
  else {
    Carousel.plugins().autoplay.play();
    pauseI.className = "fa-regular fa-circle-pause";
  }
  carouselActive = !carouselActive;
};

window.addEventListener("scroll", active_navBox);
window.addEventListener("scroll", view_up_box);
start_btn.addEventListener("click", () => {nav(aboutNav);});

function update_nowPage(){
  nowPage.textContent = Carousel.selectedScrollSnap() + 1
}
function nav(span){
  const target = document.getElementById(`${span.textContent}`);
  window.scroll({
    top : target.offsetTop-70,
    behavior: 'smooth'
  })
}
function active_navBox(){
  const header = document.querySelector("header");
  if(window.scrollY > 0){
    header.setAttribute("active","active");
  }
  else {
    header.removeAttribute("active");
  }
}
function goTop(){
  window.scrollTo({
    top : 0,
    behavior : "smooth"
  })
}
function view_up_box(){
  const aboutY = document.getElementById(`${aboutNav.textContent}`).offsetTop;
  const upBox = document.querySelector(".up_box");

  if(window.scrollY > aboutY){
    upBox.style.display = "block";
  }
  else upBox.style.display = "none";
}
