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
