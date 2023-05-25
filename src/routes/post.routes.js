const router = require('express').Router();
const postController = require('../controllers/post.controller');
const authenticate = require('../middlewares/auth.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');
const postValidation = require('../validations/post.validation');
const isAdmin = require('../middlewares/role.middleware');

router
  .route('/')
  .get(authenticate, isAdmin, postController.getAllPostsController)
  .post(
    authenticate,
    isAdmin,
    validationMiddleware(postValidation.createPost),
    postController.addPostController
  );

router
  .route('/all')
  .get(authenticate, postController.getAllPostsByLabelAndStatusController);
router
  .route('/:id')
  .get(
    authenticate,
    validationMiddleware(postValidation.getPost),
    postController.getPostByIdController
  )
  .patch(
    authenticate,
    isAdmin,
    validationMiddleware(postValidation.updatePost),
    postController.updatePostController
  )
  .delete(
    authenticate,
    isAdmin,
    validationMiddleware(postValidation.deletePost),
    postController.deletePostController
  );

module.exports = router;
