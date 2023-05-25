const router = require('express').Router();
const userController = require('../controllers/user.controller');
const authenticate = require('../middlewares/auth.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');
const userValidation = require('../validations/user.validation');
const isAdmin = require('../middlewares/role.middleware');

router.route('/login').post(userController.loginUserController);

router
  .route('/upgrade')
  .post(authenticate, userController.upgradeUserController);

router
  .route('/')
  .get(authenticate, isAdmin, userController.getAllUsersController)
  .post(
    validationMiddleware(userValidation.createUser),
    userController.addUserController
  );
router
  .route('/:id')
  .get(
    authenticate,
    validationMiddleware(userValidation.getUser),
    userController.getUserByIdController
  )
  .patch(
    authenticate,
    validationMiddleware(userValidation.updateUser),
    userController.updateUserController
  )
  .delete(
    authenticate,
    validationMiddleware(userValidation.deleteUser),
    userController.deleteUserController
  );

module.exports = router;
