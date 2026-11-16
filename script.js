document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Skill rings (edit these) ----------
var skills = [
  { name: "HTML", level: 85 },
  { name: "CSS", level: 75 },
  { name: "JavaScript", level: 65 },
  { name: "Problem solving", level: 80 }
];
var rings = document.getElementById("rings");
skills.forEach(function (s) {
  var d = document.createElement("div");
  d.className = "ring";
  d.innerHTML = '<div class="disc" data-level="' + s.level + '" role="img" aria-label="' + s.name + ' ' + s.level + ' percent"><b>0%</b></div><span>' + s.name + "</span>";
  rings.appendChild(d);
});

function animateRings() {
  document.querySelectorAll(".disc").forEach(function (disc) {
    var target = Number(disc.dataset.level), n = 0;
    var timer = setInterval(function () {
      n += 2;
      if (n >= target) { n = target; clearInterval(timer); }
      disc.style.setProperty("--p", n);
      disc.firstChild.textContent = n + "%";
    }, 18);
  });
}

// ---------- Scroll reveal ----------
var ringsDone = false;
var reveal = new IntersectionObserver(function (entries) {
  entries.forEach(function (en) {
    if (en.isIntersecting) {
      en.target.classList.add("in");
      if (en.target.id === "skills" && !ringsDone) { ringsDone = true; animateRings(); }
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll(".reveal").forEach(function (el) { reveal.observe(el); });

// ---------- Active nav link ----------
var links = document.querySelectorAll(".pill a");
var spy = new IntersectionObserver(function (entries) {
  entries.forEach(function (en) {
    if (en.isIntersecting) {
      links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id); });
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("section").forEach(function (s) { spy.observe(s); });

// ---------- Flip project cards (edit these) ----------
var projects = [
  { title: "Personal profile page", tag: "Web", back: "This page: scroll animations, skill rings, flip cards and a validated form." },
  { title: "Your next web project", tag: "Web", back: "Replace this text with a project from your training." },
  { title: "University program", tag: "Other", back: "Replace this text with a program you wrote in a course." }
];
var flips = document.getElementById("flips");
projects.forEach(function (p) {
  var b = document.createElement("button");
  b.type = "button";
  b.className = "flip";
  b.setAttribute("aria-pressed", "false");
  b.innerHTML = '<div class="inner"><div class="face front"><small>' + p.tag + "</small><h3>" + p.title + '</h3></div><div class="face back">' + p.back + "</div></div>";
  b.addEventListener("click", function () {
    var on = b.classList.toggle("turned");
    b.setAttribute("aria-pressed", on);
  });
  flips.appendChild(b);
});

// ---------- Contact form ----------
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var msg = document.getElementById("message").value.trim();
  var ok = true;
  function check(cond, id, text) {
    document.getElementById(id).textContent = cond ? "" : text;
    if (!cond) ok = false;
  }
  check(name.length >= 2, "nameErr", "Please enter your name.");
  check(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), "emailErr", "Please enter a valid email.");
  check(msg.length >= 10, "msgErr", "Message must be at least 10 characters.");
  var out = document.getElementById("formMsg");
  if (ok) { out.textContent = "Thanks, " + name + "! Your message is ready."; this.reset(); }
  else { out.textContent = ""; }
});

// ---------- Theme toggle (Night / Light mode) ----------
var themeToggle = document.getElementById("themeToggle");
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  if (themeToggle) {
    var isDark = theme === "dark";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to night mode");
    themeToggle.setAttribute("title", isDark ? "تفعيل الوضع النهاري" : "تفعيل الوضع الليلي");
  }
}

if (themeToggle) {
  var initialTheme = document.documentElement.getAttribute("data-theme") || "dark";
  applyTheme(initialTheme);
  themeToggle.addEventListener("click", function () {
    var current = document.documentElement.getAttribute("data-theme") || "dark";
    var next = current === "dark" ? "light" : "dark";
    applyTheme(next);
  });
}
