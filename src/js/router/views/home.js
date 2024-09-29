/**
 * @file home.js
 * @description This file handles the logic for displaying posts on the home page, including populating the post feed, adding delete functionality, and protecting the page with authentication.
 * It also sets up the logout listener and ensures the user is authenticated.
 */


import { authGuard } from "../../utilities/authGuard";
import { readPosts } from "../../api/post/read.js";
import { deletePost } from "../../api/post/delete.js"; // Import the deletePost function
import { setLogoutListener } from "../../ui/global/logout.js";
import { readProfile } from "../../api/profile/read.js";

setLogoutListener();
authGuard();

const profile = await readProfile();
/**
 * Populates the page with a list of posts by fetching them from the API.
 * This function retrieves posts, creates post cards, and handles delete functionality for posts.
 * If the user is the author of a post, they are given the option to edit or delete their post.
 * 
 * @async
 * @function populatePosts
 * @throws {Error} Logs an error if the posts cannot be fetched or if there is an issue in displaying them.
 * 
 * @returns {Promise<void>} No return value.
 * 
 * @example
 * // Automatically called when the page is loaded
 * populatePosts();
 */

async function populatePosts() {
  const mainContent = document.querySelector(".main-content");

  if (!mainContent) {
    console.error("Main content element not found");
    return;
  }

  mainContent.innerHTML = "Populating posts...";

  try {
    const response = await readPosts(12, 1);
    let posts = response.data;
    posts = posts.slice(0, 12);
    console.log(posts.length);

    if (!Array.isArray(posts)) {
      console.error("Error: Expected an array of posts, but got:", posts);
      mainContent.innerHTML =
        "<p>Failed to load posts. Please try again later.</p>";
      return;
    }

    if (posts.length === 0) {
      mainContent.innerHTML = "<p>No posts available at the moment.</p>";
      return;
    }

    posts.forEach((post) => {
      const postCard = document.createElement("div");
      postCard.classList.add("post-card");

      postCard.innerHTML = `
        <a href="/post/?id=${post.id}">
          <div class="post-header">
            <img src="${
              post.author?.avatar?.url ||
              "../../../public/images/shirwacProfile.avif"
            }" alt="${post.author?.name || "Unknown User"}">
            <div class="username">${post.author?.name || "Unknown User"}</div>
          </div>
        
        <h2>${post.title || "Untitled Post"}</h2>
        <div class="post-content">${post.body || "No content available."}</div>
        <div class="post-image">
          <img src="${
            post.media?.url || "../../../public/images/weather.avif"
          }" alt="Post Image">
        </div>
        <div class="post-actions">
          <button class="like-button">👍 Like</button>
          ${
            post.author?.name == profile.data.name
              ? `  
             <a href="/post/edit/?id=${post.id}"> <button class="like-button">Edit</button> </a>
                <button class="like-button delete-btn">Delete</button>`
              : ``
          }
        </div>
        </a>
       
      `;


      // Attach delete event listener
      const deleteButton = postCard.querySelector(".like-button.delete-btn");
      if (deleteButton) {
        deleteButton.addEventListener("click", async () => {
          const confirmDelete = confirm(
            "Are you sure you want to delete this post?"
          );
          if (confirmDelete) {
            try {
              await deletePost(post.id); // Delete post
              postCard.remove(); // Remove post from DOM
              alert("Post deleted successfully.");
            } catch (error) {
              console.error("Error deleting post:", error);
              alert("Failed to delete post.");
            }
          }
        });
      }

      mainContent.appendChild(postCard);
    });
  } catch (error) {
    console.error("Error populating posts:", error);
    mainContent.innerHTML =
      "<p>Failed to load posts. Please try again later.</p>";
  }
}

window.addEventListener("load", () => {
  populatePosts();
});

populatePosts();
