
exports.seed = function(knex) {
  return knex('users').insert([
    { username: 'Anthony', password: "pass"},
    { username: 'Tony', password: "pass"},
    { username: 'Paul', password: "pass"}
  ]);
};
