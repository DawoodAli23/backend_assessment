const { createTenantHelper } = require("../controller/tenant.controller");
const { createUserHelper } = require("../controller/user.controller");

const processMessage = async (kafkaMessage) => {
  const { event_name, properties } = kafkaMessage;
  //Start working here
  switch (event_name) {
    case "user_created":
      createUserHelper(
        properties.first_name,
        properties.last_name,
        properties.department,
        properties.tenant_id,
        properties.image_url,
        properties.city,
        properties.country,
        properties.bio,
        properties.social_links,
        properties.employee_id
      );
      break;

    case "tenant_created":
      createTenantHelper(
        properties.name,
        properties.address,
        properties.city,
        properties.state,
        properties.country,
        properties.zip_code,
        properties.phone,
        properties.web_url,
        true,
        properties.id
      );
      break;
  }
};

module.exports = { processMessage };
