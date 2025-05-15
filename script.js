// 1. Featured Homes Gallery Slideshow

const images = [
  "https://picsum.photos/id/1015/600/350",
  "https://picsum.photos/id/1016/600/350",
  "https://picsum.photos/id/1018/600/350",
  "https://picsum.photos/id/1020/600/350",
];

let currentImageIndex = 0;

const galleryImg = document.getElementById('gallery-img');
const prevBtn = document.getElementById('prev-img');
const nextBtn = document.getElementById('next-img');

function showImage(index) {
  galleryImg.style.transform = "scale(0.9)";
  setTimeout(() => {
    galleryImg.src = images[index];
    galleryImg.style.transform = "scale(1)";
  }, 150);
}

prevBtn.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  showImage(currentImageIndex);
});

nextBtn.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  showImage(currentImageIndex);
});

// 2. Tabs functionality

const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    const tabId = btn.dataset.tab;
    document.getElementById(`tab-${tabId}`).classList.add('active');
  });
});

// 3. Booking Form Validation

const form = document.getElementById('booking-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const checkinInput = document.getElementById('checkin');
const checkoutInput = document.getElementById('checkout');
const guestsInput = document.getElementById('guests');
const formMessage = document.getElementById('form-message');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateBookingForm() {
  formMessage.style.color = "red";
  formMessage.textContent = "";

  if (!nameInput.value.trim()) {
    formMessage.textContent = "Please enter your full name.";
    return false;
  }

  if (!emailRegex.test(emailInput.value)) {
    formMessage.textContent = "Please enter a valid email address.";
    return false;
  }

  if (!checkinInput.value) {
    formMessage.textContent = "Please select a check-in date.";
    return false;
  }

  if (!checkoutInput.value) {
    formMessage.textContent = "Please select a check-out date.";
    return false;
  }

  if (new Date(checkoutInput.value) <= new Date(checkinInput.value)) {
    formMessage.textContent = "Check-out date must be after check-in date.";
    return false;
  }

  const guests = Number(guestsInput.value);
  if (!guests || guests < 1 || guests > 10) {
    formMessage.textContent = "Number of guests must be between 1 and 10.";
    return false;
  }

  return true;
}

// Real-time feedback border colors for inputs
[nameInput, emailInput, checkinInput, checkoutInput, guestsInput].forEach(input => {
  input.addEventListener('input', () => {
    if (input.checkValidity()) {
      input.style.borderColor = "green";
    } else {
      input.style.borderColor = "red";
    }
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (validateBookingForm()) {
    formMessage.style.color = "green";
    formMessage.textContent = "Booking confirmed! Thank you for choosing Dream Home Booking. 🏡✨";
    form.reset();

    [nameInput, emailInput, checkinInput, checkoutInput, guestsInput].forEach(input => {
      input.style.borderColor = "";
    });
  }
});

// 4. Footer Interactive Elements: Button color change and hover effect

const colorBtn = document.getElementById('color-btn');
const hoverText = document.getElementById('hover-text');
const secretMessage = document.getElementById('secret-message');

colorBtn.addEventListener('click', () => {
  const colors = ['#28a745', '#17a2b8', '#ffc107', '#dc3545', '#6f42c1'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  colorBtn.style.backgroundColor = randomColor;
  colorBtn.textContent = "Color Changed! Click again for more.";
});

hoverText.addEventListener('mouseenter', () => {
  hoverText.classList.add('hovered');
});
hoverText.addEventListener('mouseleave', () => {
  hoverText.classList.remove('hovered');
});

// Bonus: Secret double-click on color button to show message
colorBtn.addEventListener('dblclick', () => {
  secretMessage.style.display = 'block';
  setTimeout(() => {
    secretMessage.style.display = 'none';
  }, 4000);
});
