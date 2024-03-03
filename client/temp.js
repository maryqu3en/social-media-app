document.addEventListener("DOMContentLoaded", () => {
    const createPostButton = document.querySelector("#create-post");
    const createPostPopup = document.querySelector("#create-post-popup");
    const createCommentPopup = document.querySelector("#create-comment-popup");
    const cancelButtonCreatePost = createPostPopup.querySelector(
      "#cancel-create-post"
    );
    const submitButtonCreatePost = createPostPopup.querySelector(
      "#submit-create-post"
    );
    const cancelButtonCreateComment = createCommentPopup.querySelector(
      "#cancel-create-comment"
    );
    const submitButtonCreateComment = createCommentPopup.querySelector(
      "#submit-create-comment"
    );
    const postsContainer = document.querySelector(".posts-container");
  
    // Function to create a post element
    function createPostElement(postData) {
      const post = document.createElement("div");
      post.classList.add("post");
      post.dataset.id = postData.id;
  
      post.innerHTML = `
              <h2>${postData.title}</h2>
              <img src="${postData.pic}" alt="Post Image">
              <p class="time">${postData.date}</p>
              <p>${postData.description}</p>
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
        const postId = post.dataset.id;
        const response = await fetch(`/api/posts/${postId}/comments`);
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
    }
  
    // Function to create a new post
    function createNewPost(title, pic, description) {
      fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, pic, description }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.posts) {
            const newPost = createPostElement(data.posts[data.posts.length - 1]);
            postsContainer.appendChild(newPost);
          }
        });
    }
  
    // Event listener for the "Create Post" button
    createPostButton.addEventListener("click", () => {
      createPostPopup.style.display = "block";
      const submitCreatePostButton = createPostPopup.querySelector(
        "#submit-create-post"
      );
      submitCreatePostButton.addEventListener("click", () => {
        const title = createPostPopup.querySelector(
          'input[placeholder="title"]'
        ).value;
        const pic = createPostPopup.querySelector(
          'input[placeholder="image URL"]'
        ).value;
        const description = createPostPopup.querySelector(
          'input[placeholder="description"]'
        ).value;
        if (title && pic) {
          createNewPost(title, pic, description);
          createPostPopup.style.display = "none";
        }
      });
      const cancelCreatePostButton = createPostPopup.querySelector(
        "#cancel-create-post"
      );
      cancelCreatePostButton.addEventListener("click", () => {
        createPostPopup.style.display = "none";
      });
    });
  
    // Initial load of posts from the server
    fetch("/api/posts")
      .then((response) => response.json())
      .then((data) => {
        if (data.posts) {
          data.posts.forEach((postData) => {
            const postElement = createPostElement(postData);
            postsContainer.appendChild(postElement);
          });
        }
      });
  });
  



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
    if (commentsData.length > 0) {
      commentsData.forEach((comment) => {
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
            `${URL}/api/delete-comment/${postId}/${commentId}`,
            {
              method: "DELETE",
            }
          );
          if (deleteCommentResponse.status === 200) { //eyes on this !!!!!
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

const submitEvent = async () => {
  const title = postPopup.querySelector('input[placeholder="title"]').value;
  await fetch(`${url}api/add-post`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: title })
  });

  location.reload();
}

submitPost.addEventListener('click', async () => {
  await submitEvent();
});

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
