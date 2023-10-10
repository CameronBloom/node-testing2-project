
exports.seed = function(knex) {
  return knex('drivers').truncate()
    .then(function () {
      return knex('drivers').insert([
        {first_name: 'Max', last_name: 'Verstappen'},
        {first_name: 'Oscar', last_name: 'Piastri'},
        {first_name: 'Lando', last_name: 'Norris'},
        {first_name: 'George', last_name: 'Russel'},
      ]);
    });
};
