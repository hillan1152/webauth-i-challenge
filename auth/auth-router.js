const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
    let user = req.body;

    // HASH THE PASSWORD
    const hash = bcrypt.hashSync(user.password, 8);

    Users.add(user)
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


module.exports = router;