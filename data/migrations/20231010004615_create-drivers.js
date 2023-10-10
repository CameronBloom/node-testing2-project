
exports.up = function(knex) {
  return knex.schema
    .createTable("drivers", table => {
      table.incremets("driver_id")
      table.text("first_name").notNullable()
      table.text("last_name").notNullable()
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("drivers")
};
