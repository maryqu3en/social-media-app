const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 4040;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

let posts = fs.readFileSync(path.resolve(__dirname, "data.json"), "utf-8");
posts = JSON.parse(posts);

//test api
app.get("/api", (req, res) => {
  return res.status(200).json({ data: "hello world" });
});

//return list of posts
app.get("/api/posts", (req, res) => {
  return res.status(200).json({
    posts,
  });
});

//return comments of post
app.get("/api/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  const post = posts.find((post) => post.id == id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const comments = post.comments;
  return res.status(200).json({
    comments,
  });
});

//create new post
app.post("/api/add-post", (req, res) => {
  const { pic, title, description } = req.body;

  if (!pic || !title) {
    return res.status(400).json({
      message: "pic and title are required",
    });
  }

  const id = posts.length + 1;
  const date = Date.now();
  const newPost = {
    id,
    pic,
    title,
    date,
    description,
  };

  posts.push(newPost);
  fs.writeFileSync(path.resolve(__dirname, "data.json"), JSON.stringify(posts));

  return res.status(200).json({
    posts,
  });
});

//edit post
app.put("/api/edit-post/:id", (req, res) => {
  const { id } = req.params;
  const { pic, title, description } = req.body;

  // Find the post with the given id
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  post.pic = pic || post.pic;
  post.title = title || post.title;
  post.description = description || post.description;

  // Update the data.json file
  fs.writeFileSync(path.resolve(__dirname, "data.json"), JSON.stringify(posts));

  return res.status(200).json({
    message: "Post edited successfully",
    post: post,
  });
});

//delete post
app.post("/api/delete-post/:id", (req, res) => {
  const { id } = req.params;

  // Find the index of the post with the given id
  const postIndex = posts.findIndex((post) => post.id == id);

  if (postIndex !== -1) {
    // Remove the post from the array
    posts.splice(postIndex, 1);

    // Update the data.json file
    fs.writeFileSync(
      path.resolve(__dirname, "data.json"),
      JSON.stringify(posts)
    );

    return res.status(200).json({
      message: "Post deleted successfully",
      posts: posts,
    });
  } else {
    return res.status(404).json({
      message: "Post not found",
    });
  }
});

//create comment
app.post("/api/add-comment/:postId", (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;

  // Find the post with the given postId
  const post = posts.find((post) => post.id == postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const comment = {
    id: Math.floor(Math.random() * 1000),
    text: text,
  };

  post.comments.push(comment);

  // Update the data.json file
  fs.writeFileSync(path.resolve(__dirname, "data.json"), JSON.stringify(posts));

  return res.status(200).json({
    message: "Comment added successfully",
    post: post,
  });
});

//edit comment
app.put("/api/edit-comment/:postId/:commentId", (req, res) => {
  const { postId, commentId } = req.params;
  const { text } = req.body;

  // Find the post with the given postId
  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const comment = post.comments.find((comment) => comment.id === commentId);

  if (!comment) {
    return res.status(404).json({
      message: "Comment not found",
    });
  }

  comment.text = text;

  // Update the data.json file
  fs.writeFileSync(path.resolve(__dirname, "data.json"), JSON.stringify(posts));

  return res.status(200).json({
    message: "Comment edited successfully",
    post: post,
  });
});

//delete comment
app.delete("/api/delete-comment/:postId/:commentId", (req, res) => {
  const { postId, commentId } = req.params;

  // Find the post with the given postId
  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const commentIndex = post.comments.findIndex(
    (comment) => comment.id === commentId  //eyes on this !!!!!!
  );

  if (commentIndex === -1) {
    return res.status(404).json({
      message: "Comment not found",
    });
  }

  post.comments.splice(commentIndex, 1);

  // Update the data.json file
  fs.writeFileSync(path.resolve(__dirname, "data.json"), JSON.stringify(posts));

  return res.status(200).json({
    message: "Comment deleted successfully",
    post: post,
  });
});

app.listen(PORT, () =>
  console.log(`server running in http://localhost:${PORT}`)
);
