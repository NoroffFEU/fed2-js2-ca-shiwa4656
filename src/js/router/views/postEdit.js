import { authGuard } from "../../utilities/authGuard";
import { readPost } from "../../api/post/read";
import { updatePost } from "../../api/post/update";

authGuard();

// a way to get the id from the url params
// Get the current page URL
const urlParams = new URLSearchParams(window.location.search);

// Extract the value of the 'id' parameter
const id = urlParams.get("id");

console.log(id); // Outputs '12' if the URL is something like ?id=12

// based on this id, getpost(id)
const post = (await readPost(id)).data;

// pupulate content of the index.html

const title = document.querySelector("#title");
const content = document.querySelector("#content");
const url = document.querySelector("#url");

title.value = post.title;
content.textContent = post.body;
url.value = post.media.url;

const form = document.querySelector("form");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const title = document.querySelector("#title");
  const content = document.querySelector("#content");
  const url = document.querySelector("#url");
  const media = { url: url.value };

  try {
    // update post in the api
    const res = await updatePost(id, {
      title: title.value,
      body: content.value,
      tags: [""],
      media,
    });

    // redirect
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
});
