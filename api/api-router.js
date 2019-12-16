const router = require('express').Router();

const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router');

router.use('/', authRouter);
router.use('/users', usersRouter);

module.exports = router;
