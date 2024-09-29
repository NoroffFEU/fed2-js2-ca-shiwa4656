/**
 * Handles the post update form submission, sends the updated post data to the API, and provides feedback to the user.
 * 
 * @async
 * @function onUpdatePost
 * @param {Event} event - The form submission event triggered by the post update form.
 * 
 * @throws {Error} Throws an error if the post update request fails.
 * 
 * @returns {Promise<void>} No return value, but resets the form on success.
 * 
 * @example
 * // Attach this function to the form's submit event:
 * document.getElementById('updatePostForm').addEventListener('submit', onUpdatePost);
 * 
 * // The form should contain fields for 'title', 'content', and 'url':
 * // <form id="updatePostForm">
 * //   <input type="text" name="title" required>
 * //   <textarea name="content" required></textarea>
 * //   <input type="url" name="url" required>
 * //   <button type="submit">Update Post</button>
 * // </form>
 */

import { updatePost } from "../../api/post/update";
export async function onUpdatePost(event) {
  // ui/post/create.js

  event.preventDefault(); // Prevent form from reloading the page

  const form = event.target;
  const title = form.title.value;
  const body = form.content.value; // Ensure content is body
  const mediaUrl = form.url.value;

  // Assuming tags are left empty for now
  const tags = [];
  const media = {
    url: mediaUrl,
    alt: "User-provided image", // Optionally you can update this to something dynamic
  };

  try {
    await createPost({ title, body, tags, media });
    alert("Post created successfully!");
    form.reset(); // Reset form after successful post creation
  } catch (error) {
    console.error("Error creating post:", error);
    alert("Failed to create post.");
    console.log(error)
  }
}
