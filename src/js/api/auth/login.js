/**
 * Logs in a user by sending their email and password to the API.
 * This function sends a POST request to the login API, retrieves the token, and stores it in local storage.
 * 
 * @async
 * @function login
 * @param {Object} credentials - The login credentials.
 * @param {string} credentials.email - The user's email address.
 * @param {string} credentials.password - The user's password.
 * 
 * @throws {Error} Throws an error if the login request fails.
 * 
 * @returns {Promise<Object>} The result from the login API, including the user's token and other information.
 * 
 * @example
 * const credentials = {
 *   email: "shirwac@noroffstud.no",
 *   password: "securepassword123"
 * };
 * 
 * login(credentials)
 *   .then(result => {
 *     console.log("Login successful:", result);
 *   })
 *   .catch(error => {
 *     console.error("Login failed:", error);
 *   });
 */
export async function login({ email, password }) {
    const response = await fetch('https://v2.api.noroff.dev/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    const result = await response.json();

    // Save the token to the local storage
    localStorage.setItem("token", result.data.accessToken);

    return result; // Optionally return the result
}
