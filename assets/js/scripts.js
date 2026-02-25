// Reveal on scroll
const revealEls = Array.from(document.querySelectorAll(".reveal"));
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// Loader
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.classList.add("hide");
});

// Carousel controls
const carousel = document.querySelector(".carousel");
const prevBtn = document.querySelector("[data-carousel='prev']");
const nextBtn = document.querySelector("[data-carousel='next']");
function scrollByCard(dir){
  if(!carousel) return;
  const card = carousel.querySelector(".slide");
  const step = (card?.getBoundingClientRect().width || 320) + 14;
  carousel.scrollBy({ left: dir * step, behavior: "smooth" });
}
if (prevBtn) prevBtn.addEventListener("click", () => scrollByCard(-1));
if (nextBtn) nextBtn.addEventListener("click", () => scrollByCard(1));

// WhatsApp form
const orderForm = document.getElementById("orderForm");
const btnWA = document.getElementById("sendWhatsApp");
function buildMsg(){
  if(!orderForm) return "";
  const d = new FormData(orderForm);
  const lines = [
    "Hello Cupcake Nation! I'd like to place an order enquiry (advance booking).",
    "",
    `Name: ${d.get("name")||""}`,
    `Phone: ${d.get("phone")||""}`,
    `Event date: ${d.get("date")||""}`,
    d.get("occasion") ? `Occasion: ${d.get("occasion")}` : null,
    d.get("notes") ? `Notes: ${d.get("notes")}` : null,
    "",
    "Please confirm availability and next steps. Thank you!"
  ].filter(Boolean);
  return lines.join("\n");
}
if(btnWA){
  btnWA.addEventListener("click", () => {
    const url = "https://wa.me/919885150247?text=" + encodeURIComponent(buildMsg());
    window.open(url, "_blank", "noopener");
  });
}
