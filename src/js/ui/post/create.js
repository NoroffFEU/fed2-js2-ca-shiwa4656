// ui/post/create.js
import { createPost } from "../../api/post/create";
/**
 * Handles the post creation form submission, sends the post data to the API, and provides feedback to the user.
 * If the post is successfully created, the user is redirected to the home page.
 * 
 * @async
 * @function onCreatePost
 * @param {Event} event - The form submission event triggered by the post creation form.
 * 
 * @throws {Error} Throws an error if the post creation request fails.
 * 
 * @returns {Promise<void>} No return value, but redirects the user to the home page on success.
 * 
 * @example
 * // Attach this function to the form's submit event:
 * document.getElementById('createPostForm').addEventListener('submit', onCreatePost);
 * 
 * // The form should contain fields for 'title', 'content', and 'url':
 * // <form id="createPostForm">
 * //   <input type="text" name="title" required>
 * //   <textarea name="content" required></textarea>
 * //   <input type="url" name="url" required>
 * //   <button type="submit">Create Post</button>
 * // </form>
 */

export async function onCreatePost(event) {
    event.preventDefault(); // Prevent form from reloading the page

    const form = event.target;
    const title = form.title.value;
    const body = form.content.value; // Ensure content is body
    const mediaUrl = form.url.value;

    // Assuming tags are left empty for now
    const tags = [];
    const media = {
        url: mediaUrl,
        alt: 'User-provided image' // Optionally you can update this to something dynamic
    };

    try {
        await createPost({ title, body, tags, media });
        alert('Post created successfully!');
        form.reset(); // Reset form after successful post creation
        window.location.href = "/"
    } catch (error) {
        console.error('Error creating post:', error);
        alert('Failed to create post.');
    }
}
