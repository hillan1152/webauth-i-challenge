const db = require('../database/dbConfig.js');

module.exports = {
    add,
    // find, 
    findById
}

// ADD REGISTRATION
function add(user){
    return db('users')
        .insert(user, 'id')
        .then(ids => {
            const [id] = ids;
            return findById(id)
        })
}

// FIND ID FOR REGISTRATION
function findById(id){
    return db('users')
        .select('id', 'username')
        .where({ id })
        .first();
}