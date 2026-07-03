const navLinks = document.querySelectorAll('.ul-list li a');
const sections = document.querySelectorAll('section');

function removeActive() {
  navLinks.forEach(link => link.parentElement.classList.remove('active'));
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 80, 
      behavior: 'smooth'
    });

    removeActive();
    link.parentElement.classList.add('active');
  });
});

// Mobile Navigation Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.querySelector('.ul-list');

if (mobileToggle && navMenu) {
  mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('open');
    mobileToggle.classList.toggle('open');
  });

  // Close menu when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      mobileToggle.classList.remove('open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
      navMenu.classList.remove('open');
      mobileToggle.classList.remove('open');
    }
  });
}

// Dark Mode Toggle Logic
const themeToggle = document.getElementById('theme-toggle');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  if (themeToggle) {
    themeToggle.innerHTML = theme === 'dark' 
      ? '<i class="fa-solid fa-sun"></i>' 
      : '<i class="fa-solid fa-moon"></i>';
  }
}

// Initialize Theme
const savedTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (systemDark ? 'dark' : 'light');
setTheme(initialTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });
}

// Scroll Event Handler
const revealElements = document.querySelectorAll('.home-container, .about-container, .tech-container, .projects-container, .services-container, .contact-content');
revealElements.forEach(el => el.classList.add('reveal'));

const backToTop = document.createElement('div');
backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
backToTop.id = "back-to-top";
document.body.appendChild(backToTop);

backToTop.style.cssText = `
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: var(--accent);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.3s ease, background-color 0.3s ease;
`;

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTop.addEventListener('mouseover', () => backToTop.style.transform = 'scale(1.2)');
backToTop.addEventListener('mouseout', () => backToTop.style.transform = 'scale(1)');

window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      removeActive();
      const activeLink = document.querySelector(`.ul-list li a[href="#${section.id}"]`);
      if (activeLink) activeLink.parentElement.classList.add('active');
    }
  });

  if (window.scrollY > 500) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }

  revealElements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('active-reveal');
    }
  });
});

// Typing Animation
const typingElement = document.querySelector('.info-home h3'); 
const words = ["Frontend Developer", "UI/UX Designer", "Web Enthusiast", "React Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
  if (!typingElement) return;
  const currentWord = words[wordIndex];
  let displayedText = currentWord.substring(0, charIndex);
  
  typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(type, typingSpeed);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, typingSpeed / 2);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(type, 1000);
  }
}

document.addEventListener('DOMContentLoaded', type);

// Loading Screen
document.addEventListener("DOMContentLoaded", () => {
  const loadingText = document.getElementById("loading-text");
  const mainIcon = document.querySelector(".main-icon");
  const subIcons = document.querySelectorAll(".sub-icons i");
  const designerText = document.getElementById("designer-text");
  const mainPage = document.getElementById("main-page");
  const loadingScreen = document.getElementById("loading-screen");

  function showElement(element, delay = 0) {
    if (!element) return;
    setTimeout(() => {
      element.classList.remove("hidden");
      element.classList.add("fall");
    }, delay);
  }

  showElement(loadingText, 0);          
  showElement(mainIcon, 800);         
  subIcons.forEach((icon, idx) => {
    showElement(icon, 1600 + idx * 400);  
  });
  showElement(designerText, 2800);    

  setTimeout(() => {
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      setTimeout(() => loadingScreen.style.display = 'none', 500);
    }
    if (mainPage) {
      mainPage.classList.add("visible");
    }
  }, 4000);
});

// Web3Forms Form Submission Handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Check if the placeholder access key is still present
    const accessKeyInput = contactForm.querySelector('input[name="access_key"]');
    if (accessKeyInput && accessKeyInput.value === 'YOUR_ACCESS_KEY_HERE') {
      alert('Please replace the placeholder access key inside index.html line 324 with your real Web3Forms Access Key.');
      return;
    }

    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const btn = contactForm.querySelector('.btn-send');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    })
    .then(async (response) => {
      let resJson = await response.json();
      if (response.status == 200) {
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
        contactForm.reset();
      } else {
        btn.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Error!';
        console.error(resJson);
      }
    })
    .catch(error => {
      btn.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Error!';
      console.error(error);
    })
    .then(() => {
      btn.disabled = false;
      setTimeout(() => { btn.innerHTML = originalText; }, 3000);
    });
  });
}
