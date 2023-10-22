exports.up = function (knex) {
  return knex.schema.createTable("User_Profile", (table) => {
    table.increments("user_id").primary(); // serial
    table.string("first_name", 255);
    table.string("last_name", 255);
    table.string("department", 255);
    table.integer("tenant_id").unsigned();
    table
      .foreign("tenant_id")
      .references("tenant_id")
      .inTable("Tenant_Profile");
    table.string("image_url", 255);
    table.string("city", 255);
    table.string("country", 255);
    table.string("bio", 255);
    table.json("social_links", 255);
    table.integer("employee_id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("User_Profile");
};
