import { login } from "../../api/auth/login";
/**
 * Handles the login form submission by preventing the default form behavior, extracting user input,
 * and calling the login API. If login is successful, it redirects the user to the home page.
 * 
 * @async
 * @function onLogin
 * @param {Event} event - The form submission event triggered by the login form.
 * 
 * @throws {Error} Throws an error if the login attempt fails.
 * 
 * @returns {Promise<void>} No return value, but redirects the user on successful login.
 * 
 * @example
 * // Attach this function to the form's submit event:
 * document.getElementById('loginForm').addEventListener('submit', onLogin);
 * 
 * // The form should contain fields with names 'email' and 'password':
 * // <form id="loginForm">
 * //   <input type="email" name="email" required>
 * //   <input type="password" name="password" required>
 * //   <button type="submit">Login</button>
 * // </form>
 */

export async function onLogin(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.elements['email'].value;
    const password = form.elements['password'].value;

    try {
        const result = await login({ email, password });
        alert('Login successful');
        window.location.href = "../../";
        // Handle successful login (e.g., redirect, store token, etc.)
    } catch (error) {
        alert('Login failed: ' + error.message);
    }
}