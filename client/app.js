const popup = document.querySelector(".popup");
const createPostBtn = document.querySelector("#create-post");
const postPopup = document.querySelector("#create-post-popup");
const commentPopup = document.querySelector("#create-comment-popup");
const cancelPost = document.querySelector("#cancel-create-post");
const submitPost = document.querySelector("#submit-create-post");
const cancelComment = document.querySelector("#cancel-create-post");
const submitComment = document.querySelector("#submit-create-post");
const URL = "http://localhost:4040";
let postPopupStatus = false;
let commentPopupStatus = false;
let posts = [];

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
  // commentPopupStatus = !commentPopupStatus;
});

//create post element
const createPostDom = (id, title, pic, description) => {
  const post = document.createElement("div");
  post.classList.add("post");
  post.id = id;
  post.innerHTML = `
              <h2>${title}</h2>
              <img src="${pic}" alt="Post Image">
              <p class="time">${date}</p>
              <p>${description}</p>
              <button class="edit-post">Edit Post</button>
              <button class="delete-post">Delete Post</button>
              <button class="load-comments">Load Comments</button>
              <div class="comments-popup">
                  <button class="add-comment">Add Comment</button>
                  <div class="comments-list"></div>
              </div>
  `;
  const loadCommentsButton = post.querySelector(".load-comments");
  const addCommentButton = post.querySelector(".add-comment");
  const commentsPopup = post.querySelector(".comments-popup");
  const commentsList = post.querySelector(".comments-list");
  const deletePostButton = post.querySelector(".delete-post");
  const editPostButton = post.querySelector(".edit-post");

  // Load comments for the post
  loadCommentsButton.addEventListener("click", async () => {
    const postId = post.id;
    const response = await fetch(`${URL}/api/posts/${postId}/comments`);
    const commentsData = await response.json();
    commentsList.innerHTML = ""; // Clear previous comments
    if (commentsData.comments.length > 0) {
      commentsData.comments.forEach((comment) => {
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment");
        commentElement.innerHTML = `
                      <p>${comment.text}</p>
                      <button class="edit-comment">Edit</button>
                      <button class="delete-comment">Delete</button>
                  `;

        const editCommentButton =
          commentElement.querySelector(".edit-comment");
        const deleteCommentButton =
          commentElement.querySelector(".delete-comment");

        // Add functionality to edit comment
        editCommentButton.addEventListener("click", () => {
          // Implement edit comment logic here
          // You can use a similar popup approach as for creating a post
        });

        // Add functionality to delete comment
        deleteCommentButton.addEventListener("click", async () => {
          // Implement delete comment logic here
          const commentId = comment.id;
          const deleteCommentResponse = await fetch(
            `/api/posts/${postId}/comments/${commentId}`,
            {
              method: "DELETE",
            }
          );
          if (deleteCommentResponse.status === 200) {
            commentElement.remove();
          }
        });

        commentsList.appendChild(commentElement);
      });
    } else {
      commentsList.innerHTML = "<p>No comments yet</p>";
    }
    commentsPopup.style.display = "block";
  });

  // Add functionality to add comment
  addCommentButton.addEventListener("click", () => {
    createCommentPopup.style.display = "block";
    const submitCommentButton = createCommentPopup.querySelector(
      "#submit-create-comment"
    );
    submitCommentButton.addEventListener("click", async () => {
      const commentText = createCommentPopup.querySelector("input").value;
      if (commentText) {
        const addCommentResponse = await fetch(
          `/api/posts/${postId}/comments`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: commentText }),
          }
        );
        if (addCommentResponse.status === 200) {
          createCommentPopup.style.display = "none";
          loadCommentsButton.click(); // Reload comments
        }
      }
    });
  });

  // Add functionality to delete post
  deletePostButton.addEventListener("click", async () => {
    const postId = post.dataset.id;
    const deletePostResponse = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });
    if (deletePostResponse.status === 200) {
      post.remove();
    }
  });

  // Add functionality to edit post
  editPostButton.addEventListener("click", () => {
    // Implement edit post logic here
    // You can use a similar popup approach as for creating a post
  });

  return post;
};

// const createComment = document.querySelector('');
// const deletePost = document.querySelector('');
// const deleteComment = document.querySelector('');
// createComment.addEventListener('click', () => {
//     if (commentPopupStatus) {
//         commentPopup.style.display = 'none';
//     } else {
//         commentPopup.style.display = 'block';
//     }
//     commentPopupStatus = !commentPopupStatus;
// });
