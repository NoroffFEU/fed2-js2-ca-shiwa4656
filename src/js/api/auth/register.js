/**
 * Registers a new user by sending their details to the API.
 * This function sends a POST request to the registration API endpoint with the provided user data.
 * 
 * @async
 * @function register
 * @param {Object} user - An object containing the user's registration details.
 * @param {string} user.name - The user's full name.
 * @param {string} user.email - The user's email address.
 * @param {string} user.password - The user's chosen password.
 * @param {string} [user.avatar] - Optional URL to the user's avatar image.
 * 
 * @throws {Error} Throws an error if the registration request fails.
 * 
 * @returns {Promise<Response>} The raw response object from the API. 
 * You may need to check response status or parse JSON depending on use case.
 * 
 * @example
 * const newUser = {
 *   name: "shirwac",
 *   email: "shirwac@norof.stud.no",
 *   password: "strongPassword123",
 *   avatar: "https://example.com/avatar.jpg" // Optional
 * };
 * 
 * register(newUser)
 *   .then(response => {
 *     if (response.ok) {
 *       console.log("Registration successful");
 *     } else {
 *       console.error("Registration failed");
 *     }
 *   })
 *   .catch(error => {
 *     console.error("Error during registration:", error);
 *   });
 */
export async function register(user) {
  const response = await fetch("https://v2.api.noroff.dev/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response;
}
