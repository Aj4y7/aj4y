// Sakura (Cherry Blossom) Animation
(function () {
  "use strict";

  const STORAGE_KEY = "sakura-enabled";
  const MAX_PETALS = 50;
  let sakuraContainer = null;
  let isActive = false;
  let animationInterval = null;

  // Initialize sakura system
  function init() {
    // Create container for petals
    sakuraContainer = document.createElement("div");
    sakuraContainer.id = "sakura-container";
    sakuraContainer.style.display = "none";
    document.body.appendChild(sakuraContainer);

    // Create toggle button
    const toggleButton = document.createElement("div");
    toggleButton.className = "sakura-toggle";
    toggleButton.innerHTML = 'sakura: <span class="sakura-status">off</span>';
    toggleButton.addEventListener("click", toggleSakura);
    document.body.appendChild(toggleButton);

    // Load saved state
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState === "true") {
      startSakura();
    }
  }

  // Toggle sakura animation
  function toggleSakura() {
    if (isActive) {
      stopSakura();
    } else {
      startSakura();
    }
  }

  // Start sakura animation
  function startSakura() {
    isActive = true;
    sakuraContainer.style.display = "block";

    // Update button
    const button = document.querySelector(".sakura-toggle");
    const status = button.querySelector(".sakura-status");
    status.textContent = "on";
    button.classList.add("active");

    // Save state
    localStorage.setItem(STORAGE_KEY, "true");

    // Create initial petals immediately
    for (let i = 0; i < 5; i++) {
      setTimeout(() => createPetal(), i * 100);
    }

    // Start generating petals more frequently
    animationInterval = setInterval(createPetal, 200);
  }

  // Stop sakura animation
  function stopSakura() {
    isActive = false;

    // Update button
    const button = document.querySelector(".sakura-toggle");
    const status = button.querySelector(".sakura-status");
    status.textContent = "off";
    button.classList.remove("active");

    // Save state
    localStorage.setItem(STORAGE_KEY, "false");

    // Stop generating petals
    if (animationInterval) {
      clearInterval(animationInterval);
      animationInterval = null;
    }

    // Clear existing petals
    setTimeout(() => {
      if (!isActive) {
        sakuraContainer.style.display = "none";
        sakuraContainer.innerHTML = "";
      }
    }, 10000); // Let existing petals finish falling
  }

  // Create a single petal
  function createPetal() {
    if (!isActive) return;

    // Limit number of petals
    const currentPetals =
      sakuraContainer.querySelectorAll(".sakura-petal").length;
    if (currentPetals >= MAX_PETALS) return;

    const petal = document.createElement("div");
    petal.className = "sakura-petal";

    // Random starting position
    petal.style.left = Math.random() * 100 + "%";

    // Random animation duration (10-16 seconds) - faster
    const duration = Math.random() * 6 + 10;
    petal.style.animationDuration = duration + "s";

    // Random delay
    const delay = Math.random() * 2;
    petal.style.animationDelay = delay + "s";

    sakuraContainer.appendChild(petal);

    // Remove petal after animation completes
    setTimeout(() => {
      if (petal.parentNode) {
        petal.parentNode.removeChild(petal);
      }
    }, (duration + delay) * 1000);
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
