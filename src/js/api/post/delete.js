/**
 * @file delete.js
 * @description This module contains the function to delete a social media post using an API.
 * The function sends a DELETE request to the specified API endpoint using the provided post ID.
 */

const API_URL = "https://v2.api.noroff.dev/social/posts/";
/**
 * Deletes a social media post by its ID.
 * This function sends a DELETE request to the API and logs the response or throws an error if the deletion fails.
 * 
 * @async
 * @function deletePost
 * @param {string} id - The unique identifier of the post to be deleted.
 * 
 * @throws {Error} Throws an error if the request to delete the post fails.
 * 
 * @returns {Promise<void>} Does not return any content, but logs the API response.
 * 
 * @example
 * const postId = "123456789";
 * 
 * deletePost(postId)
 *   .then(() => {
 *     console.log("Post deleted successfully");
 *   })
 *   .catch(error => {
 *     console.error("Error deleting post:", error);
 *   });
 */
export async function deletePost(id) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2hpcndhYyIsImVtYWlsIjoic2hpYWJkMzgzNjlAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3MjczNTc5MDd9.UEUvSk-fipXHIozj7MpWRRbzWAp3dSK6W3kkNCQc9xA",
      "X-Noroff-API-Key": "9b16dd46-dba3-44c7-a516-66599a3c7358",
    },
  };

  const response = await fetch(`${API_URL}${id}`, {
    method: "DELETE",
    headers: options.headers,
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  console.log(response);
}
