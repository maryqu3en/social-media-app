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
createPostBtn.addEventListener('click', () => {
    if (postPopupStatus) {
        postPopup.style.display = 'none';
    } else {
        postPopup.style.display = 'block';
    }
    postPopupStatus = !postPopupStatus;
});

//hide popup after clicking cancel
cancelPost.addEventListener('click', () => {
    postPopup.style.display = 'none';
    postPopupStatus = !postPopupStatus;
    // commentPopupStatus = !commentPopupStatus;
    
});

//create post element
const createTicketDom = (id, title, isTodo) => {
  const ticket = document.createElement('div');
  ticket.classList.add('ticket');
  ticket.id = id;
  ticket.innerHTML = `<p>${title}</p>`;
  if (isTodo) {
      ticket.addEventListener('click', async (e) => {
          await fetch(`${url}api/done`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ id: id })
          });

          location.reload();
      });
  }
  return ticket;
}








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