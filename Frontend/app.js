// ─── Config ───────────────────────────────────────────────
const API_BASE = "https://deknek-project-x61a.onrender.com/api/auth";
// ─── Tab Switching ─────────────────────────────────────────
function switchTab(tab) {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const tabLogin = document.getElementById("tab-login");
  const tabSignup = document.getElementById("tab-signup");
  const indicator = document.getElementById("tab-indicator");

  if (tab === "login") {
    loginForm.classList.add("active");
    signupForm.classList.remove("active");
    tabLogin.classList.add("active");
    tabSignup.classList.remove("active");
    indicator.classList.remove("right");
  } else {
    signupForm.classList.add("active");
    loginForm.classList.remove("active");
    tabSignup.classList.add("active");
    tabLogin.classList.remove("active");
    indicator.classList.add("right");
  }

  clearMessages();
}

function clearMessages() {
  ["login-error", "signup-error", "signup-success"].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.classList.add("hidden"); el.textContent = ""; }
  });
}

// ─── Password Toggle ───────────────────────────────────────
function togglePass(inputId, btn) {
  const input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text"; btn.textContent = "🙈";
  } else {
    input.type = "password"; btn.textContent = "👁";
  }
}

// ─── Password Strength ────────────────────────────────────
document.getElementById("signup-password")?.addEventListener("input", function () {
  const val = this.value;
  const fill = document.getElementById("strength-fill");
  const label = document.getElementById("strength-label");

  let strength = 0;
  if (val.length >= 6) strength++;
  if (val.length >= 10) strength++;
  if (/[A-Z]/.test(val)) strength++;
  if (/[0-9]/.test(val)) strength++;
  if (/[^A-Za-z0-9]/.test(val)) strength++;

  const levels = [
    { w: "0%", color: "transparent", text: "" },
    { w: "25%", color: "#ef4444", text: "Weak" },
    { w: "50%", color: "#f97316", text: "Fair" },
    { w: "75%", color: "#eab308", text: "Good" },
    { w: "100%", color: "#22c55e", text: "Strong" },
  ];
  const level = levels[Math.min(strength, 4)];
  fill.style.width = level.w;
  fill.style.background = level.color;
  label.textContent = level.text;
  label.style.color = level.color;
});

// ─── Loading State ────────────────────────────────────────
function setLoading(btnId, loading) {
  const btn = document.getElementById(btnId);
  const text = btn.querySelector(".btn-text");
  const loader = btn.querySelector(".btn-loader");
  btn.disabled = loading;
  text.classList.toggle("hidden", loading);
  loader.classList.toggle("hidden", !loading);
}

// ─── Show Message ─────────────────────────────────────────
function showMsg(id, text) {
  const el = document.getElementById(id);
  el.textContent = text;
  el.classList.remove("hidden");
}

// ─── Signup ───────────────────────────────────────────────
async function handleSignup(e) {
  e.preventDefault();
  clearMessages();
  setLoading("signup-btn", true);

  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;

  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      showMsg("signup-success", "✓ Account created! You can now sign in.");
      document.getElementById("signup-form").reset();
      setTimeout(() => switchTab("login"), 1800);
    } else {
      showMsg("signup-error", data.message || "Registration failed. Try again.");
    }
  } catch (err) {
    showMsg("signup-error", "Cannot connect to server. Is the backend running?");
  } finally {
    setLoading("signup-btn", false);
  }
}

// ─── Login ────────────────────────────────────────────────
async function handleLogin(e) {
  e.preventDefault();
  clearMessages();
  setLoading("login-btn", true);

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      showDashboard(data.user);
    } else {
      showMsg("login-error", data.message || "Invalid email or password.");
    }
  } catch (err) {
    showMsg("login-error", "Cannot connect to server. Is the backend running?");
  } finally {
    setLoading("login-btn", false);
  }
}

// ─── Dashboard ────────────────────────────────────────────
function showDashboard(user) {
  document.querySelector(".container").style.display = "none";
  document.getElementById("dashboard").classList.remove("hidden");

  const initials = user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  document.getElementById("user-avatar").textContent = initials;
  document.getElementById("user-greeting").textContent = `Hello, ${user.name.split(" ")[0]}!`;
  document.getElementById("user-email-display").textContent = user.email;

  const now = new Date();
  document.getElementById("login-time").textContent =
    now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function handleLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  document.querySelector(".container").style.display = "flex";
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("login-form").reset();
}

// ─── Auto-login if token exists ──────────────────────────
window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  if (token && user) {
    showDashboard(JSON.parse(user));
  }
});
