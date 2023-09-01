const popup = document.querySelector('.popup');
const createPostBtn = document.querySelector('#create-post');
const postPopup = document.querySelector('#create-post-popup');
const commentPopup = document.querySelector('#create-comment-popup');
const cancelPost = document.querySelector('#cancel-create-post');
const submitPost = document.querySelector('#submit-create-post');
const cancelComment = document.querySelector('#cancel-create-post');
const submitComment = document.querySelector('#submit-create-post');
const URL = 'http://localhost:4040';
let postPopupStatus = false;
let commentPopupStatus = false;
let posts = [];

//display create-post popup
createPost.addEventListener('click', () => {
    if (postPopupStatus) {
        postPopup.style.display = 'none';
    } else {
        postPopup.style.display = 'block';
    }
    postPopupStatus = !postPopupStatus;
});

cancel.addEventListener('click', () => {
    popup.style.display = 'none';
    if(postPopupStatus){
        postPopupStatus = !postPopupStatus;
        return;
    }
    if (commentPopupStatus) {
        commentPopupStatus = !commentPopupStatus;
    }
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