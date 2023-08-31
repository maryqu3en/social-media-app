document.addEventListener("DOMContentLoaded", async () => {
    const postList = document.querySelector(".post-list");

    try {
        const response = await fetch("data.json"); // Change the path to your JSON file
        const data = await response.json();

        data.posts.forEach(postData => {
            const postElement = createPostElement(postData);
            postList.appendChild(postElement);
        });
    } catch (error) {
        console.error("Error loading posts:", error);
    }
});

function createPostElement(postData) {
    const post = document.createElement("li");
    post.className = "post";

    const title = document.createElement("h2");
    title.className = "post-title";
    title.textContent = postData.title;
    post.appendChild(title);

    const image = document.createElement("img");
    image.className = "post-image";
    image.src = postData.image;
    image.alt = "Post Image";
    post.appendChild(image);

    const commentsContainer = document.createElement("div");
    commentsContainer.className = "comments";

    postData.comments.forEach(commentText => {
        const comment = document.createElement("div");
        comment.className = "comment";

        const commentTextElement = document.createElement("p");
        commentTextElement.className = "comment-text";
        commentTextElement.textContent = commentText;
        comment.appendChild(commentTextElement);

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-comment-button";
        deleteButton.textContent = "Delete";
        comment.appendChild(deleteButton);

        commentsContainer.appendChild(comment);
    });

    post.appendChild(commentsContainer);

    const addCommentContainer = document.createElement("div");
    addCommentContainer.className = "add-comment";

    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.placeholder = "Add a comment...";
    addCommentContainer.appendChild(commentInput);

    const addButton = document.createElement("button");
    addButton.className = "add-comment-button";
    addButton.textContent = "Add Comment";
    addCommentContainer.appendChild(addButton);

    post.appendChild(addCommentContainer);

    return post;
}
