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
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
    pageTitle.textContent = link.dataset.view;
    sidebar.classList.remove("open");
  });
});
document.getElementById("menuToggle").addEventListener("click", () => sidebar.classList.toggle("open"));
