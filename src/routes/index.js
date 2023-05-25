const router = require('express').Router();

const userRoutes = require('./user.routes');
const categoryRoutes = require('./category.routes');
const postRoutes = require('./post.routes');
const paymentRoutes = require('./payment.routes');

const defaultRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/categories',
    route: categoryRoutes,
  },
  {
    path: '/posts',
    route: postRoutes,
  },
  {
    path: '/payments',
    route: paymentRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
