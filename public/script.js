// ===== NAVBAR SCROLL =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.style.boxShadow = window.scrollY > 10
    ? "0 1px 20px rgba(16,16,30,.08)" : "none";
}, { passive: true });

// ===== SMOOTH ANCHORS =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ===== INTERACTIVE TERMINAL =====
const output   = document.getElementById("shellOutput");
const btns     = document.getElementById("shellButtons");
const resetBtn = document.getElementById("resetBtn");

const MENUS = {
  main: {
    lines: [
      { cls: "sh-dim",   text: " " },
      { cls: "sh-box",   text: "\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557" },
      { cls: "sh-title", text: "\u2551        \uD83D\uDED2 E-COMMERCE SYSTEM         \u2551" },
      { cls: "sh-box",   text: "\u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563" },
      { cls: "sh-opt",   text: "\u2551 1. \uD83D\uDC64 User Login                    \u2551" },
      { cls: "sh-opt",   text: "\u2551 2. \uD83C\uDFEA Seller Login                  \u2551" },
      { cls: "sh-opt",   text: "\u2551 3. \uD83D\uDCDD Register User                 \u2551" },
      { cls: "sh-opt",   text: "\u2551 4. \uD83C\uDFEC Register Seller               \u2551" },
      { cls: "sh-opt",   text: "\u2551 5. \u274C Exit                          \u2551" },
      { cls: "sh-box",   text: "\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D" },
      { cls: "sh-prompt",text: "\uD83D\uDC49 Enter choice: \u2588" },
    ],
    buttons: [
      { id:"btn1", choice:"1", label:"1 \u2014 User Login" },
      { id:"btn2", choice:"2", label:"2 \u2014 Seller Login" },
      { id:"btn3", choice:"3", label:"3 \u2014 Register User" },
      { id:"btn4", choice:"4", label:"4 \u2014 Register Seller", cls:"" },
      { id:"btn5", choice:"5", label:"5 \u2014 Exit", cls:"shell-btn-exit" },
    ]
  }
};

const FLOWS = {
  "1": {
    prompt: "\uD83D\uDC64 USER LOGIN",
    steps: [
      { out: "Email: user@example.com",   cls: "sh-input" },
      { out: "Password: ••••••••",         cls: "sh-input" },
      { out: "\u2714 Welcome, Demo User!",   cls: "sh-success" },
      { out: "\uD83D\uDD52 Last Login: 2026-11-01 18:42:30", cls: "sh-dim" },
      { out: " " },
      { out: "1 View Products",  cls: "sh-opt" },
      { out: "2 Add to Cart",    cls: "sh-opt" },
      { out: "3 View Cart",      cls: "sh-opt" },
      { out: "4 Place Order",    cls: "sh-opt" },
      { out: "5 Logout",         cls: "sh-opt" },
    ],
    buttons: [
      { id:"u1", choice:"view", label:"1 \u2014 View Products" },
      { id:"u2", choice:"cart", label:"2 \u2014 View Cart" },
      { id:"u3", choice:"order",label:"4 \u2014 Place Order" },
      { id:"u4", choice:"back", label:"5 \u2014 Logout", cls:"shell-btn-exit" },
    ]
  },
  "2": {
    prompt: "\uD83C\uDFEA SELLER LOGIN",
    steps: [
      { out: "Email: seller@myshop.com", cls: "sh-input" },
      { out: "\u2714 Welcome, MyShop!", cls: "sh-success" },
      { out: " " },
      { out: "1 Add Product",     cls: "sh-opt" },
      { out: "2 View My Products",cls: "sh-opt" },
      { out: "3 Logout",          cls: "sh-opt" },
    ],
    buttons: [
      { id:"s1", choice:"addprod", label:"1 \u2014 Add Product" },
      { id:"s2", choice:"myprods", label:"2 \u2014 View My Products" },
      { id:"s3", choice:"back",    label:"3 \u2014 Logout", cls:"shell-btn-exit" },
    ]
  },
  "3": {
    prompt: "\uD83D\uDCDD REGISTER USER",
    steps: [
      { out: "Name: Lokesh",            cls: "sh-input" },
      { out: "Email: lokesh@email.com", cls: "sh-input" },
      { out: "Password: ••••••••",       cls: "sh-input" },
      { out: "\u2714 User Registered successfully!", cls: "sh-success" },
    ],
    buttons: [
      { id:"r1", choice:"back", label:"\u2190 Back to Main Menu" },
    ]
  },
  "4": {
    prompt: "\uD83C\uDFEC REGISTER SELLER",
    steps: [
      { out: "Enter your email: lokesh@email.com", cls: "sh-input" },
      { out: "Shop name: Lokesh Electronics",      cls: "sh-input" },
      { out: "\u2714 Seller Registered successfully!", cls: "sh-success" },
    ],
    buttons: [
      { id:"r2", choice:"back", label:"\u2190 Back to Main Menu" },
    ]
  },
  "5": {
    prompt: "\uD83D\uDC4B Exiting...",
    steps: [
      { out: "\uD83D\uDC4B Goodbye! See you next time.", cls: "sh-success" },
      { out: " " },
      { out: "Process finished with exit code 0", cls: "sh-dim" },
    ],
    buttons: [
      { id:"e1", choice:"restart", label:"\u21BA Restart System" },
    ]
  },
  "view": {
    prompt: "\uD83D\uDCE6 AVAILABLE PRODUCTS",
    steps: [
      { out: "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", cls:"sh-box" },
      { out: "ID   Name                 Category       Price     Stock", cls:"sh-opt" },
      { out: "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", cls:"sh-box" },
      { out: "1    Smartphone Pro       Electronics    \u20B912999.0  45",    cls:"sh-dim" },
      { out: "2    UltraBook Laptop     Computers      \u20B954999.0  12",   cls:"sh-dim" },
      { out: "3    Air Runner Shoes     Footwear       \u20B92499.0   120",  cls:"sh-dim" },
      { out: "4    Bass Earbuds         Audio          \u20B91799.0   78",   cls:"sh-dim" },
      { out: "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", cls:"sh-box" },
    ],
    buttons: [
      { id:"v1", choice:"back", label:"\u2190 Back to User Menu" },
    ]
  },
  "cart": {
    prompt: "\uD83D\uDED2 YOUR CART",
    steps: [
      { out: "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", cls:"sh-box" },
      { out: "Product          Price     Qty  Total", cls:"sh-opt" },
      { out: "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", cls:"sh-box" },
      { out: "Smartphone Pro   \u20B912999.0 1    \u20B912999.00",  cls:"sh-dim" },
      { out: "UltraBook Laptop \u20B954999.0 1    \u20B954999.00", cls:"sh-dim" },
      { out: "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", cls:"sh-box" },
      { out: "Total Amount: \u20B967998.00", cls:"sh-success" },
    ],
    buttons: [
      { id:"c1", choice:"order", label:"\uD83D\uDE80 Place Order" },
      { id:"c2", choice:"back",  label:"\u2190 Back to User Menu" },
    ]
  },
  "order": {
    prompt: "\uD83D\uDE80 PLACING ORDER",
    steps: [
      { out: "Checking stock for product #1... \u2714", cls:"sh-dim" },
      { out: "Checking stock for product #2... \u2714", cls:"sh-dim" },
      { out: "Updating inventory...",               cls:"sh-dim" },
      { out: "\uD83C\uDF89 Order placed! Total \u20B967998.00", cls:"sh-success" },
      { out: "\uD83D\uDDD1\uFE0F  Cart cleared.",               cls:"sh-dim" },
    ],
    buttons: [
      { id:"o1", choice:"back", label:"\u2190 Back to User Menu" },
    ]
  },
  "addprod": {
    prompt: "\u2795 ADD PRODUCT",
    steps: [
      { out: "Name: Samsung Galaxy S25",     cls:"sh-input" },
      { out: "Category: Electronics",         cls:"sh-input" },
      { out: "Price: 89999",                  cls:"sh-input" },
      { out: "Stock: 50",                     cls:"sh-input" },
      { out: "\u2714 Product Added!",         cls:"sh-success" },
    ],
    buttons: [
      { id:"p1", choice:"back", label:"\u2190 Back to Seller Menu" },
    ]
  },
  "myprods": {
    prompt: "\uD83D\uDCCB MY PRODUCTS",
    steps: [
      { out: "1. Samsung Galaxy S25  - \u20B989999 (Stock: 50)", cls:"sh-dim" },
      { out: "2. Wireless Keyboard   - \u20B91299  (Stock: 200)",cls:"sh-dim" },
      { out: "3. USB-C Hub           - \u20B9899   (Stock: 85)", cls:"sh-dim" },
    ],
    buttons: [
      { id:"m1", choice:"back", label:"\u2190 Back to Seller Menu" },
    ]
  },
  "back":    null,
  "restart": null,
};

let stateStack = [];
let currentState = "main";

function setButtons(btnDefs) {
  btns.innerHTML = "";
  btnDefs.forEach(b => {
    const el = document.createElement("button");
    el.className = "shell-btn " + (b.cls || "");
    el.id = b.id;
    el.setAttribute("data-choice", b.choice);
    el.textContent = b.label;
    el.addEventListener("click", () => handleChoice(b.choice));
    btns.appendChild(el);
  });
}

function addLine(text, cls) {
  const div = document.createElement("div");
  div.className = "shell-line " + (cls || "");
  div.textContent = text;
  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
}

function showMainMenu() {
  currentState = "main";
  stateStack = [];
  addLine(" ");
  addLine("\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557", "sh-box");
  addLine("\u2551        \uD83D\uDED2 E-COMMERCE SYSTEM         \u2551", "sh-title");
  addLine("\u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563", "sh-box");
  addLine("\u2551 1. \uD83D\uDC64 User Login                    \u2551", "sh-opt");
  addLine("\u2551 2. \uD83C\uDFEA Seller Login                  \u2551", "sh-opt");
  addLine("\u2551 3. \uD83D\uDCDD Register User                 \u2551", "sh-opt");
  addLine("\u2551 4. \uD83C\uDFEC Register Seller               \u2551", "sh-opt");
  addLine("\u2551 5. \u274C Exit                          \u2551", "sh-opt");
  addLine("\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D", "sh-box");
  addLine("\uD83D\uDC49 Enter choice: \u2588", "sh-prompt");
  setButtons(MENUS.main.buttons);
}

function handleChoice(choice) {
  if (choice === "back") {
    const prev = stateStack.pop();
    if (prev) runFlow(prev, true);
    else showMainMenu();
    return;
  }
  if (choice === "restart") {
    resetTerminal();
    return;
  }
  runFlow(choice, false);
}

function runFlow(choice, isBack) {
  const flow = FLOWS[choice];
  if (!flow) { showMainMenu(); return; }
  if (!isBack) stateStack.push(currentState);
  currentState = choice;

  addLine("\uD83D\uDC49 " + choice, "sh-input");
  addLine(" ");
  addLine("── " + flow.prompt + " ──", "sh-title");
  flow.steps.forEach(s => addLine(s.out, s.cls || ""));
  addLine("\uD83D\uDC49 Enter choice: \u2588", "sh-prompt");
  setButtons(flow.buttons);
  output.scrollTop = output.scrollHeight;
}

function resetTerminal() {
  output.innerHTML = "";
  stateStack = [];
  currentState = "main";
  addLine("$ java -cp .;mysql-connector-j.jar DBMS.EcommerceSystem", "sh-dim");
  addLine("Connecting to ecommerce1@localhost:3306...", "sh-dim");
  showMainMenu();
}

// Init buttons from HTML
document.querySelectorAll(".shell-btn").forEach(btn => {
  btn.addEventListener("click", () => handleChoice(btn.dataset.choice));
});
resetBtn.addEventListener("click", resetTerminal);

// ===== ADD TO CART =====
function addToCart(btn) {
  btn.textContent = "Added!";
  btn.classList.add("added");
  btn.disabled = true;
  const toast = document.getElementById("cartToast");
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      btn.textContent = "Add to Cart";
      btn.classList.remove("added");
      btn.disabled = false;
    }, 300);
  }, 2000);
}

// ===== COPY SCHEMA =====
document.querySelectorAll(".copy-schema").forEach(btn => {
  btn.addEventListener("click", () => {
    const pre = document.getElementById(btn.dataset.id);
    if (!pre) return;
    navigator.clipboard.writeText(pre.innerText).then(() => {
      btn.textContent = "Copied!";
      btn.classList.add("ok");
      setTimeout(() => { btn.textContent = "Copy"; btn.classList.remove("ok"); }, 2000);
    });
  });
});

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = "1";
      e.target.style.transform = "translateY(0)";
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll(".feat-card,.prod-card,.schema-card,.step-item").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity .45s ease, transform .45s ease";
  observer.observe(el);
});

console.log("%c ShopFlash ", "background:#6358f0;color:#fff;font-weight:bold;font-size:14px;padding:4px 10px;border-radius:6px;");
