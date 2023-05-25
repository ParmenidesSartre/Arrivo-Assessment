const {
  addPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByLabelAndStatus,
} = require('../models/post.model');

const getAllPostsController = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllPostsByLabelAndStatusController = async (req, res) => {
  try {
    let posts;
    if (req.user.membership === 'Premium') {
      // Fetch both premium and normal posts for premium users
      posts = await getPostsByLabelAndStatus(
        ['Premium', 'Normal'],
        'Published'
      );
    } else {
      // Fetch only normal posts for normal users
      posts = await getPostsByLabelAndStatus('Normal', 'Published');
    }

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addPostController = async (req, res) => {
  try {
    const post = await addPost(req.body);
    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPostByIdController = async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePostController = async (req, res) => {
  try {
    const post = await updatePost(
      req.params.id,
      req.body.column,
      req.body.value
    );
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deletePostController = async (req, res) => {
  try {
    await deletePost(req.params.id);
    res.status(204).json({});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllPostsController,
  addPostController,
  getPostByIdController,
  updatePostController,
  deletePostController,
  getAllPostsByLabelAndStatusController,
};
