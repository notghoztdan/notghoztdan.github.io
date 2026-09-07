const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

document.querySelectorAll("[data-toast]").forEach((button) => {
  button.addEventListener("click", () => showToast(button.dataset.toast));
});

const loginScreen = document.getElementById("loginScreen");
const appShell = document.getElementById("appShell");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const passwordToggle = document.getElementById("passwordToggle");
const demoEmail = "r@rickdan.me";
const demoPassword = "123123";

function enterBank() {
  loginScreen.classList.add("is-hidden");
  appShell.classList.remove("is-hidden");
  window.scrollTo(0, 0);
  showToast("Welcome to your RickDan demo account!");
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (loginEmail.value.trim().toLowerCase() !== demoEmail || loginPassword.value !== demoPassword) {
    loginError.textContent = "That email or password does not match this demo account.";
    return;
  }
  loginError.textContent = "";
  enterBank();
});
passwordToggle.addEventListener("click", () => {
  const showing = loginPassword.type === "text";
  loginPassword.type = showing ? "password" : "text";
  passwordToggle.textContent = showing ? "Show" : "Hide";
  passwordToggle.setAttribute("aria-label", showing ? "Show password" : "Hide password");
});

const balanceAmount = document.getElementById("balanceAmount");
const balanceToggle = document.getElementById("balanceToggle");
let balanceVisible = true;
balanceToggle.addEventListener("click", () => {
  balanceVisible = !balanceVisible;
  balanceAmount.innerHTML = balanceVisible ? "$24,680<span>.42</span>" : "$••,•••<span>.••</span>";
  balanceToggle.textContent = balanceVisible ? "◉" : "○";
  balanceToggle.setAttribute("aria-label", balanceVisible ? "Hide balance" : "Show balance");
});

document.getElementById("addMoney").addEventListener("click", () => showToast("Add money flow opened"));
document.getElementById("viewAll").addEventListener("click", () => showToast("Showing your complete transaction history"));

const search = document.getElementById("transactionSearch");
const transactions = [...document.querySelectorAll(".transaction-item")];
const emptyState = document.getElementById("emptyState");
search.addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase().trim();
  let visibleCount = 0;
  transactions.forEach((transaction) => {
    const matches = transaction.dataset.name.includes(query);
    transaction.style.display = matches ? "flex" : "none";
    if (matches) visibleCount += 1;
  });
  emptyState.classList.toggle("visible", visibleCount === 0);
});

const pageTitle = document.getElementById("pageTitle");
const sidebar = document.getElementById("sidebar");
const overviewView = document.getElementById("overviewView");
const detailView = document.getElementById("detailView");
const detailPages = {
  Payments: {
    eyebrow: "Money movement",
    title: "Payments made simple.",
    copy: "Send, schedule, and keep track of every outgoing payment.",
    tiles: [
      ["↗", "Send money", "$1,280.00", "Move money to a friend or another RickDan account."],
      ["◷", "Scheduled", "3 payments", "Your upcoming payments are organized and ready."],
      ["✓", "Paid this month", "$2,104.72", "Everything is up to date. Nice work!"]
    ],
    wide: ["Upcoming payments", [["Internet · Sep 09", "$64.00"], ["Rent · Sep 12", "$1,450.00"], ["Electricity · Sep 15", "$82.40"]]]
  },
  Accounts: {
    eyebrow: "Your money",
    title: "Accounts with a little sunshine.",
    copy: "See where your money lives and give each dollar a home.",
    tiles: [
      ["C", "Everyday Checking", "$8,420.42", "Available now · •• 4821"],
      ["S", "Rainy Day Savings", "$16,260.00", "Growing steadily · •• 1048"],
      ["＋", "Open an account", "Your choice", "Explore a new way to save, spend, or plan."]
    ],
    wide: ["Account activity", [["Checking · Interest", "+$2.14"], ["Savings · Transfer in", "+$400.00"], ["Checking · Card purchase", "-$84.26"]]]
  },
  Insights: {
    eyebrow: "Your money story",
    title: "Small choices, big picture.",
    copy: "Friendly insights that help you feel more confident about your month.",
    tiles: [
      ["◒", "Spending trend", "12.4% lower", "You spent less this month than last month."],
      ["✦", "Savings streak", "14 days", "You are building a lovely little habit."],
      ["◎", "Top category", "Living", "Groceries, home, and everyday essentials."]
    ],
    wide: ["Monthly snapshot", [["Needs", "$1,460 · 46%"], ["Fun", "$824 · 26%"], ["Other", "$900 · 28%"]]]
  },
  Cards: {
    eyebrow: "Cards & controls",
    title: "Your cards, your rules.",
    copy: "Keep your cards close, secure, and ready for the next adventure.",
    tiles: [
      ["▭", "RickDan Everyday", "•• 4821", "Active · Everyday Checking"],
      ["▣", "RickDan Virtual", "•• 9017", "Active · Online purchases"],
      ["＋", "Add a card", "2 available", "Create a virtual card for safer shopping."]
    ],
    wide: ["Card controls", [["Contactless payments", "On"], ["Travel notice", "Not set"], ["Spending limit", "$4,700 / month"]]]
  },
  Settings: {
    eyebrow: "Your preferences",
    title: "Make RickDan yours.",
    copy: "Choose how your account looks, sounds, and keeps you informed.",
    tiles: [
      ["◉", "Profile", "Jordan Davis", "Personal details and contact information."],
      ["♢", "Security", "Protected", "Password, passkeys, and trusted devices."],
      ["⚙", "Preferences", "English (US)", "Notifications, appearance, and accessibility."]
    ],
    wide: ["Quick preferences", [["Email notifications", "On"], ["Friendly reminders", "On"], ["Monthly statements", "Paperless"]]]
  }
};

function renderDetailPage(view) {
  const page = detailPages[view];
  if (!page) {
    overviewView.classList.remove("is-hidden");
    detailView.classList.add("is-hidden");
    return;
  }
  const tiles = page.tiles.map(([icon, title, metric, copy]) => `<article class="detail-tile"><span class="detail-icon">${icon}</span><h3>${title}</h3><strong>${metric}</strong><p>${copy}</p></article>`).join("");
  const rows = page.wide[1].map(([label, value]) => `<li><span>${label}</span><b>${value}</b></li>`).join("");
  detailView.innerHTML = `<div class="detail-hero"><div><p class="eyebrow">${page.eyebrow}</p><h1>${page.title}</h1><p>${page.copy}</p></div><button class="primary-button" data-toast="${view} tools are ready">＋ New ${view === "Settings" ? "preference" : "activity"}</button></div><div class="detail-grid">${tiles}<article class="detail-tile detail-wide"><h3>${page.wide[0]}</h3><ul class="detail-list">${rows}</ul></article><article class="detail-tile"><h3>RickDan tip</h3><p>Tap any option to explore this demo. Real accounts and payments are never connected here.</p></article></div>`;
  detailView.querySelector("[data-toast]").addEventListener("click", (event) => showToast(event.currentTarget.dataset.toast));
  detailView.querySelectorAll(".detail-tile").forEach((tile) => {
    tile.addEventListener("click", () => showToast(`${tile.querySelector("h3").textContent} selected`));
  });
  overviewView.classList.add("is-hidden");
  detailView.classList.remove("is-hidden");
  window.scrollTo(0, 0);
}

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
    pageTitle.textContent = link.dataset.view;
    sidebar.classList.remove("open");
    renderDetailPage(link.dataset.view);
  });
});
document.getElementById("menuToggle").addEventListener("click", () => sidebar.classList.toggle("open"));

document.querySelector(".brand").addEventListener("click", () => {
  document.querySelectorAll(".nav-link").forEach((item) => item.classList.remove("active"));
  document.querySelector('.nav-link[data-view="Overview"]').classList.add("active");
  pageTitle.textContent = "Overview";
  renderDetailPage("Overview");
});
