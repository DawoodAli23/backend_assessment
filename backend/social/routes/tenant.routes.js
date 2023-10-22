const {
  createTenant,
  getTenants,
  getTenantById,
  deleteTenantById,
  updatedTenantById,
} = require("../controller/tenant.controller");

const router = require("express").Router();

router
  .get("/", getTenants)
  .get("/:id", getTenantById)
  .post("/", createTenant)
  .patch("/:id", updatedTenantById)
  .delete("/:id", deleteTenantById);

module.exports = router;
