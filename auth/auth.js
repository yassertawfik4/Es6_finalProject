// ====== REGISTRATION VALIDATION ======
let registerFullName = document.getElementById("registerFullName");
let errorFullName = document.getElementById("errorFullName");
let registerEmail = document.getElementById("registerEmail");
let errorEmail = document.getElementById("errorEmail");
let registerPassword = document.getElementById("registerPassword");
const errorPassword = document.getElementById("errorPassword");
const ruleLength = document.getElementById("ruleLength");
const ruleUpper = document.getElementById("ruleUpper");
const ruleLower = document.getElementById("ruleLower");
const ruleNumber = document.getElementById("ruleNumber");
const ruleSpecial = document.getElementById("ruleSpecial");

let user = {
  fullName: "",
  email: "",
  password: "",
};

let handler = {
  set(target, prop, value) {
    if (prop === "fullName") {
      if (value.trim() === "") {
        errorFullName.innerText = "Full Name Is Required";
        return false;
      }
      if (value.length < 3) {
        errorFullName.innerText = "Full Name Must Be At Least 3 Characters";
        return false;
      }
      errorFullName.innerText = "";
    } else if (prop === "email") {
      if (value.trim() === "") {
        errorEmail.innerText = "Email is Required";
        return false;
      }
      let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        errorEmail.innerText = "Email is Invalid";
        return false;
      }
      errorEmail.innerText = "";
    } else if (prop === "password") {
      let rules = {
        length: value.length >= 8,
        upper: /[A-Z]/.test(value),
        lower: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        special: /[!@#$%&*]/.test(value),
      };
      ruleLength.style.color = rules.length ? "green" : "red";
      ruleUpper.style.color = rules.upper ? "green" : "red";
      ruleLower.style.color = rules.lower ? "green" : "red";
      ruleNumber.style.color = rules.number ? "green" : "red";
      ruleSpecial.style.color = rules.special ? "green" : "red";
      let allValid = Object.values(rules).every(Boolean);
      if (!allValid) {
        return false;
      }
      errorPassword.innerText = "";
    }
    target[prop] = value;
    return true;
  },
};
var proxy = new Proxy(user, handler);
if (registerFullName) {
  registerFullName.addEventListener("input", (e) => {
    proxy.fullName = e.target.value;
  });
}
if (registerEmail) {
  registerEmail.addEventListener("input", (e) => {
    proxy.email = e.target.value;
  });
}
if (registerPassword) {
  registerPassword.addEventListener("input", (e) => {
    proxy.password = e.target.value;
  });
}
// ====== REGISTER FORM SUBMIT ======
const registerForm = document.querySelector("form");
if (registerForm && document.title === "Register") {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!user.fullName || !user.email || !user.password) {
      alert("Please fill all fields correctly");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.email === user.email)) {
      errorEmail.innerText = "Email already registered";
      return;
    }
    users.push({
      fullName: user.fullName,
      email: user.email,
      password: user.password,
    });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please login.");
    window.location.href = "./login.html";
  });
}

// ====== LOGIN FORM SUBMIT ======
if (document.title === "Login") {
  const loginForm = document.querySelector("form");
  const loginUsername = loginForm.querySelector("input[type='text']");
  const loginPassword = loginForm.querySelector("input[type='password']");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginUsername.value.trim();
    const password = loginPassword.value.trim();
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      alert("Login successful!");
      window.location.href = "../index.html";
    } else {
      alert("Invalid email or password");
    }
  });
}
