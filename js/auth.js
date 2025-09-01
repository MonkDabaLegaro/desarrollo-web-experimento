document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("errorMsg");
  
    // 🔑 Credenciales de ejemplo
    const adminUser = "admin";
    const adminPass = "1234";
  
    if (username === adminUser && password === adminPass) {
      // Guardar sesión
      localStorage.setItem("isLoggedIn", "true");
      // Redirigir a la página original (si venía de otra) o a inicio
      const redirect = localStorage.getItem("redirectAfterLogin") || "index.html";
      localStorage.removeItem("redirectAfterLogin");
      window.location.href = redirect;
    } else {
      errorMsg.textContent = "Usuario o contraseña incorrectos.";
    }
  });
