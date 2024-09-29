/**
 * @file create.js
 * @description This module contains the function to create a new social media post using an API.
 * The function sends a POST request to the specified API endpoint with the provided post details,
 * such as title, body, tags, and media.
 */

import { readProfile } from "../profile/read";

/**
 * Creates a new social media post using the provided details.
 * This function sends a POST request to the API with the post content and returns the response data.
 * 
 * @async
 * @function createPost
 * @param {Object} postDetails - An object containing the post details.
 * @param {string} postDetails.title - The title of the post.
 * @param {string} postDetails.body - The body content of the post.
 * @param {Array<string>} postDetails.tags - An array of tags associated with the post.
 * @param {Array<Object>} [postDetails.media] - An optional array of media objects associated with the post.
 * 
 * @throws {Error} Throws an error if the request to create a post fails.
 * 
 * @returns {Promise<Object>} The response data from the API after creating the post.
 * 
 * @example
 * const post = {
 *   title: "My New Post",
 *   body: "This is the content of my new post.",
 *   tags: ["news", "update"],
 *   media: [
 *     { type: "image", url: "https://example.com/image.jpg" },
 *   ],
 * };
 * 
 * createPost(post)
 *   .then(response => {
 *     console.log("Post created:", response);
 *   })
 *   .catch(error => {
 *     console.error("Error creating post:", error);
 *   });
 */
export async function createPost({ title, body, tags, media }) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2hpcndhYyIsImVtYWlsIjoic2hpYWJkMzgzNjlAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3MjczNTc5MDd9.UEUvSk-fipXHIozj7MpWRRbzWAp3dSK6W3kkNCQc9xA",
      "X-Noroff-API-Key": "9b16dd46-dba3-44c7-a516-66599a3c7358",
    },
  };

  const response = await fetch("https://v2.api.noroff.dev/social/posts", {
    method: "POST",
    headers: options.headers,
    body: JSON.stringify({ title, body, tags, media }),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return await response.json();
}

