// src/ui/auth/register.js
import { register } from "../../api/auth/register";
/**
 * Handles the user registration form submission, validates form data, and calls the registration API.
 * If the registration is successful, the user is redirected to the login page.
 * 
 * @async
 * @function onRegister
 * @param {Event} event - The form submission event triggered by the registration form.
 * 
 * @throws {Error} Throws an error if the registration request fails.
 * 
 * @returns {Promise<void>} No return value, but redirects the user to the login page on success.
 * 
 * @example
 * // Attach this function to the form's submit event:
 * document.getElementById('registerForm').addEventListener('submit', onRegister);
 * 
 * // The form should contain fields with names 'name', 'email', 'password', and 'confirmPassword':
 * // <form id="registerForm">
 * //   <input type="text" name="name" required>
 * //   <input type="email" name="email" required>
 * //   <input type="password" name="password" required>
 * //   <input type="password" name="confirmPassword" required>
 * //   <button type="submit">Register</button>
 * // </form>
 */

export async function onRegister(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const user = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  if (user.password !== formData.get("confirmPassword")) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await register(user);
    if (response.ok) {
      alert("Registration successful");
      window.location.href = "/auth/login/";
    } else {
      const res = await response.json();
      if (res.errors.length > 0) {
        res.errors.forEach((err) => {
          alert(err.message);
        });
      }
    }
  } catch (error) {
    alert(`Registration failed: ${error}`);
  }
}
