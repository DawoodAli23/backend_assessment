exports.up = function (knex) {
  return knex.schema.createTable("Tenant_Profile", (table) => {
    table.increments("tenant_id").primary();
    table.string("tenant_name", 255);
    table.json("address", 255);
    table.string("city", 255);
    table.string("state", 255);
    table.string("country", 255);
    table.string("zip_code", 255);
    table.string("phone", 255);
    table.string("web_url", 255);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("Tenant_Profile");
};
