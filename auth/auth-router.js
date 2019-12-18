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
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                req.session.user = user;
                res.status(200).json({ message: 'Logged in!'})
            } else {
                res.status(401).json({ message: 'YOU SHALL NOT PASS!'})
            }
        })
        .catch(error => {
            res.status(500).json(error);
          });
});

router.get('/logout', (req, res) => {
    if(req.session){
        req.session.destroy(err => {
            if(err){
                res.status(500).json({
                    message: "You cannot leave."
                })
            } else {
                res.status(200).json({ message: 'logged out'})
            }
        })
    } else {
        res.status(200).end();
    }
})

module.exports = router;