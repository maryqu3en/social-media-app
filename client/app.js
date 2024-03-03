//API endpoints
const API_URL = "http://localhost:4040/api";
const POSTS_URL = `${API_URL}/posts`;
const COMMENTS_URL = `${API_URL}/add-comment`;

const postsContainer = document.querySelector(".posts-container");
const popup = document.querySelector(".popup");
const createPostBtn = document.querySelector("#create-post");
const postPopup = document.querySelector("#create-post-popup");
const commentPopup = document.querySelector("#create-comment-popup");
const cancelPost = document.querySelector("#cancel-create-post");
const submitPost = document.querySelector("#submit-create-post");
const cancelComment = document.querySelector("#cancel-create-post");
const submitComment = document.querySelector("#submit-create-post");

let postPopupStatus = false;
let commentPopupStatus = false;

//display create-post popup
createPostBtn.addEventListener("click", () => {
  if (postPopupStatus) {
    postPopup.style.display = "none";
  } else {
    postPopup.style.display = "block";
  }
  postPopupStatus = !postPopupStatus;
});

//hide popup after clicking cancel
cancelPost.addEventListener("click", () => {
  postPopup.style.display = "none";
  postPopupStatus = !postPopupStatus;
});

//fetch and display posts
async function fetchPosts() {
  try {
    const response = await fetch(POSTS_URL);
    const data = await response.json();

    if (response.ok) {
      const posts = data;
      //display on console the type pf posts
      console.log('type of posts', typeof posts, 'length:', posts?.length );
      console.log(posts);
      posts.posts.forEach((postData) => {
        const post = document.createElement("div");
        post.classList.add("post");
        post.id = postData.id;
        post.innerHTML = `
                  <h2>${postData.title}</h2>
                  <img src="${postData.pic}" alt="Post Image">
                  <p class="time">${postData.date}</p>
                  <p>${postData.description}</p>
                  <div>
                    <button class="edit-post">Edit Post</button>
                    <button class="delete-post">Delete Post</button>
                    <button class="load-comments">Load Comments</button>
                  </div>
                  <div class="comments-popup">
                      <button class="add-comment">Add Comment</button>
                      <div class="comments-list"></div>
                  </div>
              `;
              
        postsContainer.appendChild(post);
        const deleteButton = post.querySelector(".delete-post");
        deleteButton.addEventListener("click", () => {
          const postId = post.id;
          deletePost(postId);
          location.reload();
        });
      });
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

fetchPosts();

//create a new post
async function createPost(pic, title, description) {
  try {
    const response = await fetch(`${API_URL}/add-post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pic, title, description }),
    });
    const data = await response.json();

    if (response.ok) {
      console.log("Post created:", data);
      fetchPosts();
      location.reload();
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error("Error creating post:", error);
  }
}

submitPost.addEventListener("click", async () => {
  if (postPopup) {
    const newPostTitle = postPopup.querySelector(
      'input[placeholder="title"]'
    ).value;
    const newPostDescription = postPopup.querySelector(
      'input[placeholder="description"]'
    ).value;
    const newPostPicture = postPopup.querySelector(
      'input[placeholder="image URL"]'
    ).value;
    createPost(newPostPicture, newPostTitle, newPostDescription);
  }
  location.reload();
});

// Function to create a new comment for a post
async function createComment(postId, text) {
  try {
    const response = await fetch(`${COMMENTS_URL}/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();

    if (response.ok) {
      // Comment created successfully, you can handle the response data here
      console.log("Comment created:", data);
      // Refresh the comments for the specific post
      fetchComments(postId);
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error("Error creating comment:", error);
  }
}

// Function to fetch and display comments for a post
async function fetchComments(postId) {
  try {
    const response = await fetch(`${POSTS_URL}/${postId}/comments`);
    const data = await response.json();

    if (response.ok) {
      const comments = data.comments;
      // Display comments on the frontend (you can implement this part)
      // Loop through 'comments' and render them on your webpage
    } else {
      // Handle error
      console.error(data.message);
    }
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
}

//delete a post
async function deletePost(postId) {
  try {
    const response = await fetch(`${API_URL}/delete-post/${postId}`, {
      method: "POST",
    });

    if (response.ok) {
      console.log("Post deleted successfully");
      fetchPosts();
      location.reload();
    } else {
      const data = await response.json();
      console.error(data.message);
    }
  } catch (error) {
    console.error("Error deleting post:", error);
  }
}