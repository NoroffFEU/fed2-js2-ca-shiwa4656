/**
 * Sets an event listener on the logout button to handle user logout.
 * When the button is clicked, it prevents the default behavior and triggers the `onLogout` function.
 * 
 * @function setLogoutListener
 * 
 * @throws {Error} Throws an error if the logout button is not found in the DOM.
 * 
 * @example
 * // Ensure there is an element with the ID 'logOut' in your HTML
 * // <button id="logOut">Logout</button>
 * 
 * // Call this function to set up the logout button listener
 * setLogoutListener();
 */

import { onLogout } from '../auth/logout.js';
export function setLogoutListener() {
    const logoutBtn = document.getElementById('logOut');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default anchor link behavior
            onLogout();
        });
    }
}

