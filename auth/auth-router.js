const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
    let user = req.body;

    // HASH THE PASSWORD
    const hash = bcrypt.hashSync(user.password, 8);

    user.password = hash; 

    Users.add(user)
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.post('/login', (req, res) => {
    let { username, password } = req.params;

    Users.findBy({ username })
        .first()
        console.log(username)
        .then(user => {
            console.log(user)
            if(user && bcrypt.compareSync(password, user.password)){
                res.status(200).json({ message: 'Logged in!'})
            } else {
                res.status(401).json({ message: 'YOU SHALL NOT PASS!'})
            }
        })
        .catch(error => {
            res.status(500).json(error);
          });
})

module.exports = router;