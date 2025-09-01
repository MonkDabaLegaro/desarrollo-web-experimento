document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  // 🔑 Credenciales simples de ejemplo
  const adminUser = "admin";
  const adminPass = "1234";

  if (username === adminUser && password === adminPass) {
    // Redirigir al panel admin (puedes crear admin.html)
    window.location.href = "admin.html";
  } else {
    errorMsg.textContent = "Usuario o contraseña incorrectos.";
  }
});