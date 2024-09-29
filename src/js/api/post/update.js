/**
 * @file updateAndComment.js
 * @description This module contains functions for updating a social media post and commenting on a post using an API.
 */

 /**
  * Updates a social media post with the provided details.
  * This function sends a PUT request to the API to update the post.
  * 
  * @async
  * @function updatePost
  * @param {string} id - The unique identifier of the post to be updated.
  * @param {Object} postDetails - An object containing the new post details.
  * @param {string} postDetails.title - The updated title of the post.
  * @param {string} postDetails.body - The updated body content of the post.
  * @param {Array<string>} postDetails.tags - The updated array of tags associated with the post.
  * @param {Array<Object>} [postDetails.media] - The updated array of media objects associated with the post.
  * 
  * @throws {Error} Throws an error if the request to update the post fails.
  * 
  * @returns {Promise<Object>} The updated post data from the API.
  * 
  * @example
  * const postId = "123456";
  * const updatedPost = {
  *   title: "Updated Title",
  *   body: "Updated body content.",
  *   tags: ["update", "tech"],
  *   media: [{ type: "image", url: "https://example.com/newimage.jpg" }]
  * };
  * 
  * updatePost(postId, updatedPost)
  *   .then(post => {
  *     console.log("Post updated:", post);
  *   })
  *   .catch(error => {
  *     console.error("Error updating post:", error);
  *   });
  */
export async function updatePost(id, { title, body, tags, media }) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2hpcndhYyIsImVtYWlsIjoic2hpYWJkMzgzNjlAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3MjczNTc5MDd9.UEUvSk-fipXHIozj7MpWRRbzWAp3dSK6W3kkNCQc9xA",
      "X-Noroff-API-Key": "9b16dd46-dba3-44c7-a516-66599a3c7358",
    },
  };

  const response = await fetch(`https://v2.api.noroff.dev/social/posts/${id}`, {
    method: "PUT",
    headers: options.headers,
    body: JSON.stringify({ title, body, tags, media }),
  });

  if (!response.ok) {
    throw new Error("Failed to edit post");
  }

  return await response.json();
}

/**
  * Adds a comment to a social media post.
  * This function sends a POST request to the API to add a comment to the specified post.
  * 
  * @async
  * @function commentOnPost
  * @param {string} id - The unique identifier of the post to comment on.
  * @param {Object} commentDetails - An object containing the comment body.
  * @param {string} commentDetails.body - The content of the comment.
  * 
  * @throws {Error} Throws an error if the request to add the comment fails.
  * 
  * @returns {Promise<Object>} The response data from the API after adding the comment.
  * 
  * @example
  * const postId = "123456";
  * const comment = {
  *   body: "This is my comment on the post."
  * };
  * 
  * commentOnPost(postId, comment)
  *   .then(response => {
  *     console.log("Comment added:", response);
  *   })
  *   .catch(error => {
  *     console.error("Error adding comment:", error);
  *   });
  */
export async function commentOnPost(id, { body }) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2hpcndhYyIsImVtYWlsIjoic2hpYWJkMzgzNjlAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3MjczNTc5MDd9.UEUvSk-fipXHIozj7MpWRRbzWAp3dSK6W3kkNCQc9xA",
      "X-Noroff-API-Key": "9b16dd46-dba3-44c7-a516-66599a3c7358",
    },
  };

  const response = await fetch(
    `https://v2.api.noroff.dev/social/posts/${id}/comment`,
    {
      method: "POST",
      headers: options.headers,
      body: JSON.stringify({ body }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to comment on the post");
  }

  return await response.json();
}
