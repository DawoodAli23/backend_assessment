const knex = require("../database/db");

const createTenant = async (req, res) => {
  try {
    const {
      body: {
        tenant_name,
        address,
        city,
        state,
        country,
        zip_code,
        phone,
        web_url,
      },
    } = req;

    const tenant = await createTenantHelper(
      tenant_name,
      address,
      city,
      state,
      country,
      zip_code,
      phone,
      web_url
    );
    res.status(200).json({
      message: "Tenant Created",
      data: tenant,
    });
  } catch (error) {
    res.json({
      message: "Unable to create tenant",
    });
  }
};

const createTenantHelper = async (
  tenant_name,
  address,
  city,
  state,
  country,
  zip_code,
  phone,
  web_url,
  kafka = false,
  tenant_id
) => {
  const id = kafka ? { tenant_id } : {};
  return await knex("Tenant_Profile")
    .insert({
      tenant_name,
      address: JSON.stringify(address),
      city,
      state,
      country,
      zip_code,
      phone,
      web_url,
      ...id,
    })
    .returning([
      "tenant_id",
      "tenant_name",
      "address",
      "city",
      "state",
      "country",
      "zip_code",
      "phone",
      "web_url",
    ]);
};

const getTenants = async (req, res) => {
  try {
    const tenants = await knex("Tenant_Profile").select("*");
    res.status(200).json({
      message: "Tenants Found",
      data: tenants,
    });
  } catch (error) {
    res.json({
      message: "Unable to fetch tenants",
    });
  }
};

const getTenantById = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const tenant = await knex("Tenant_Profile")
      .select("*")
      .where("tenant_id", id);
    res.status(200).json({
      message: tenant.length ? "Tenant Found" : "Tenant does not exists",
      data: tenant,
    });
  } catch (error) {
    res.json({
      message: "Unable to fetch tenant",
    });
  }
};

const deleteTenantById = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const tenant = await knex("Tenant_Profile")
      .where("tenant_id", id)
      .del()
      .returning([
        "tenant_id",
        "tenant_name",
        "address",
        "city",
        "state",
        "country",
        "zip_code",
        "phone",
        "web_url",
      ]);
    res.status(200).json({
      message: tenant.length ? "Tenant deleted" : "Tenant does not exists",
      data: tenant,
    });
  } catch (error) {
    res.json({
      message: "Unable to delete tenant",
    });
  }
};

const updatedTenantById = async (req, res) => {
  try {
    const {
      params: { id },
      body: {
        tenant_name,
        address,
        city,
        state,
        country,
        zip_code,
        phone,
        web_url,
      },
    } = req;

    const updatedName = tenant_name ? { tenant_name } : {};
    const updatedAddress = address ? { address: JSON.stringify(address) } : {};
    const updatedCity = city ? { city } : {};
    const updatedState = state ? { state } : {};
    const updatedCountry = country ? { country } : {};
    const updatedZipCode = zip_code ? { zip_code } : {};
    const updatedPhone = phone ? { phone } : {};
    const updatedWebUrl = web_url ? { web_url } : {};

    const tenant = await knex("Tenant_Profile")
      .where("tenant_id", id)
      .update({
        ...updatedName,
        ...updatedAddress,
        ...updatedCity,
        ...updatedState,
        ...updatedCountry,
        ...updatedZipCode,
        ...updatedPhone,
        ...updatedWebUrl,
      })
      .returning([
        "tenant_id",
        "tenant_name",
        "address",
        "city",
        "state",
        "country",
        "zip_code",
        "phone",
        "web_url",
      ]);
    res.status(200).json({
      message: tenant.length ? "Tenant updated" : "Tenant does not exists",
      data: tenant,
    });
  } catch (error) {
    res.json({
      message: "Unable to update tenants",
    });
  }
};

module.exports = {
  createTenant,
  createTenantHelper,
  getTenants,
  getTenantById,
  deleteTenantById,
  updatedTenantById,
};
