const knex = require("../database/db");

const createUser = async (req, res) => {
  try {
    const {
      body: {
        first_name,
        last_name,
        department,
        tenant_id,
        image_url,
        city,
        country,
        bio,
        social_links,
        employee_id,
      },
    } = req;

    const user = await createUserHelper(
      first_name,
      last_name,
      department,
      tenant_id,
      image_url,
      city,
      country,
      bio,
      social_links,
      employee_id
    );
    res.status(200).json({
      message: "User Created",
      data: user,
    });
  } catch (error) {
    console.log("====>", error);
    res.json({
      message: "Unable to create User",
    });
  }
};

const createUserHelper = async (
  first_name,
  last_name,
  department,
  tenant_id,
  image_url,
  city,
  country,
  bio,
  social_links,
  employee_id
) => {
  return await knex("User_Profile")
    .insert({
      first_name,
      last_name,
      department,
      tenant_id,
      image_url,
      city,
      country,
      bio,
      social_links: JSON.stringify(social_links),
      employee_id,
    })
    .returning([
      "user_id",
      "first_name",
      "last_name",
      "department",
      "tenant_id",
      "image_url",
      "city",
      "country",
      "bio",
      "social_links",
      "employee_id",
    ]);
};

const getUsers = async (req, res) => {
  try {
    const tenants = await knex("User_Profile").select("*");
    res.status(200).json({
      message: "Users Found",
      data: tenants,
    });
  } catch (error) {
    console.log("====>", error);
    res.json({
      message: "Unable to fetch users",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const user = await knex("User_Profile").select("*").where("user_id", id);
    res.status(200).json({
      message: user.length ? "User Found" : "User does not exists",
      data: user,
    });
  } catch (error) {
    console.log("====>", error);
    res.json({
      message: "Unable to fetch user",
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const user = await knex("User_Profile")
      .where("user_id", id)
      .del()
      .returning([
        "user_id",
        "first_name",
        "last_name",
        "department",
        "tenant_id",
        "image_url",
        "city",
        "country",
        "bio",
        "social_links",
        "employee_id",
      ]);
    res.status(200).json({
      message: user.length ? "User deleted" : "User does not exists",
      data: user,
    });
  } catch (error) {
    console.log("====>", error);
    res.json({
      message: "Unable to delete user",
    });
  }
};

const updatedUserById = async (req, res) => {
  try {
    const {
      params: { id },
      body: {
        first_name,
        last_name,
        department,
        image_url,
        city,
        country,
        bio,
        social_links,
        employee_id,
      },
    } = req;

    const updatedFirstName = first_name ? { first_name } : {};
    const updatedLastName = last_name ? { last_name } : {};
    const updatedDepartment = department ? { department } : {};
    const updatedImageUrl = image_url ? { image_url } : {};
    const updatedCity = city ? { city } : {};
    const updatedCountry = country ? { country } : {};
    const updatedBio = bio ? { bio } : {};
    const updatedSocialLink = social_links
      ? { social_links: JSON.stringify(social_links) }
      : {};
    const updatedEmployeeId = employee_id ? { employee_id } : {};

    const user = await knex("User_Profile")
      .where("user_id", id)
      .update({
        ...updatedFirstName,
        ...updatedLastName,
        ...updatedDepartment,
        ...updatedImageUrl,
        ...updatedCountry,
        ...updatedCity,
        ...updatedBio,
        ...updatedSocialLink,
        ...updatedEmployeeId,
      })
      .returning([
        "user_id",
        "first_name",
        "last_name",
        "department",
        "tenant_id",
        "image_url",
        "city",
        "country",
        "bio",
        "social_links",
        "employee_id",
      ]);
    res.status(200).json({
      message: user.length ? "User updated" : "User does not exists",
      data: user,
    });
  } catch (error) {
    console.log("====>", error);
    res.json({
      message: "Unable to update user",
    });
  }
};

module.exports = {
  createUser,
  createUserHelper,
  getUsers,
  getUserById,
  deleteUserById,
  updatedUserById,
};
