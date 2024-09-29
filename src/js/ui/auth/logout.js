/**
 * Logs the user out by removing the authentication token from local storage
 * and redirecting them to the login page.
 * 
 * @function onLogout
 * 
 * @returns {void} No return value, but the user is redirected to the login page.
 * 
 * @example
 * // Call this function when the user clicks a logout button:
 * document.getElementById('logoutButton').addEventListener('click', onLogout);
 * 
 * // Or use it as part of a logout process in your application:
 * onLogout();
 */
export function onLogout() {
    localStorage.removeItem('token'); 
    window.location.href = './auth/login/';
}
