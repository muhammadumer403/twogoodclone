var tl = gsap.timeline();
var videoContainer = document.querySelector(".video-container");
const crsr = document.querySelector(".crsr"); // Ensure crsr is selected
const crsr1Span = document.querySelector(".crsr1 span"); // Ensure .crsr1 span is selected
const isDesktop = window.matchMedia("(min-width: 768px)");

let currentColor = "";

console.log(isDesktop);

function start() {
  tl.from("h1 span", {
    y: 500,
    stagger: 0.3,
    duration: 0.9,
    ease: "power2.inOut",
  });
  tl.from("nav", {
    opacity: 0,
    duration: 0.2,
  });
  var tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "6% top",
      scrub: 1,
    },
  });
  tl2.to(
    "nav .part2 h4",
    {
      opacity: 0,
      y: -10,
      duration: 2,
      ease: "power4",
    },
    "a"
  );
  tl2.to(
    "nav .svg",
    {
      transform: "translateY(-5vmax)",
    },
    "a"
  );
}
function video() {
  videoContainer.addEventListener("mousemove", (dets) => {
    if (isDesktop.matches) {
      gsap.to(crsr, {
        scale: 1,
        left: dets.x,
        top: dets.y,
        background: "white",
      });
    }
  });
  videoContainer.addEventListener("click", (dets) => {
    var video = videoContainer.querySelector("video");
    video.muted = !video.muted;
    if (crsr1Span.innerText === "Unmute" && crsr.innerText === 'Unmute') {
      isDesktop.matches
        ? (crsr.innerText = "Mute")
        : (crsr1Span.innerText = "Mute");
    } else {
      isDesktop.matches
        ? (crsr.innerText = "Unmute")
        : (crsr1Span.innerText = "Unmute");
    }
  });
  videoContainer.addEventListener("mouseleave", () => {
    if (isDesktop.matches) {
      gsap.to(crsr, {
        scale: 0,
      });
    }
  });
}
function scroll() {
  gsap.from(".image-container", {
    scrollTrigger: {
      trigger: ".gallery",
      start: "top center",
    },
    scale: 1.2,
    opacity: 0,
    stagger: 0.1,
  });
  gsap.from(".product", {
    scrollTrigger: {
      trigger: ".products",
      start: "top center",
    },
    y: 10,
    opacity: 0,
    stagger: 0.1,
  });
  gsap.from(".our-about .img img", {
    scrollTrigger: {
      trigger: ".our-about",
      start: "top center",
    },
    scale: 1.3,
    opacity: 0,
    y: 100,
  });
  gsap.from("footer", {
    scrollTrigger: {
      trigger: "footer",
      start: "top bottom",
    },
    opacity: 0,
    y: 100,
  });
}
function crsrAnimationProduct() {
  if (isDesktop.matches) {
    document.querySelectorAll(".product").forEach((product) => {
      product.addEventListener("mouseenter", (event) => {
        const newColor = event.target.dataset.color;

        // Change the cursor color only if it's different from the current color
        if (newColor !== currentColor) {
          currentColor = newColor;
          gsap.to(crsr, {
            background: currentColor,
            duration: 0.3,
            ease: "power4.out",
          });
        }

        document
          .querySelector(".products")
          .addEventListener("mousemove", (dets) => {
            crsr.textContent = "";
            gsap.to(crsr, {
              scale: 2,
            });
            gsap.to(crsr, {
              left: dets.x,
              top: dets.y,
            });
          });
      });
    });

    document.querySelector(".products").addEventListener("mouseleave", () => {
      currentColor = ""; // Reset color when leaving the products container
      crsr.textContent = "Unmute";
    });
    document.querySelector(".products").addEventListener("mouseleave", () => {
      gsap.to(crsr, {
        scale: 0,
      });
      crsr.textContent = "Unmute";
    });
  }
}

scroll();
start();
video();
crsrAnimationProduct();
(function () {
  const locomotiveScroll = new LocomotiveScroll();
})();
