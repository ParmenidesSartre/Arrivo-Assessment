const router = require('express').Router();
const categoryController = require('../controllers/category.controller');
const authenticate = require('../middlewares/auth.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');
const categoryValidation = require('../validations/category.validation');
const isAdmin = require('../middlewares/role.middleware');

router
  .route('/')
  .get(authenticate, categoryController.getAllCategoriesController)
  .post(
    authenticate,
    isAdmin,
    validationMiddleware(categoryValidation.createCategory),
    categoryController.addCategoryController
  );
router
  .route('/:id')
  .get(
    authenticate,
    validationMiddleware(categoryValidation.getCategory),
    categoryController.getCategoryByIdController
  )
  .patch(
    authenticate,
    isAdmin,
    validationMiddleware(categoryValidation.updateCategory),
    categoryController.updateCategoryController
  )
  .delete(
    authenticate,
    isAdmin,
    validationMiddleware(categoryValidation.deleteCategory),
    categoryController.deleteCategoryController
  );

module.exports = router;
