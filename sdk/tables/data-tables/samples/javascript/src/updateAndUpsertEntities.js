// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { TableClient } = require("@azure/data-tables");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

const tablesUrl = process.env["TABLES_URL"] || "";
const sasToken = process.env["SAS_TOKEN"] || "";

async function updateAndUpsertEntities() {
  console.log("== Update and Upsert entities Sample ==");

  // Note that this sample assumes that a table with tableName exists
  const tableName = "OfficeSupplies5p1";

  // See authenticationMethods sample for other options of creating a new client
  const client = new TableClient(`${tablesUrl}${sasToken}`, tableName);

  const entity = {
    partitionKey: "Stationery",
    rowKey: "A1",
    name: "Marker Set",
    price: 5.0,
    brand: "myCompany"
  };

  // Entity doesn't exist in table, so calling upsertEntity will simply insert the entity.
  await client.upsertEntity(entity, "Merge");

  // Remove brand
  delete entity.brand;

  // Entity does exist in the table, so calling upsertEntity will update using the given UpdateMode.
  // Because we are passing "Replace" as update mode, the existing entity will be replaced and delete the "brand" property.
  await client.upsertEntity(entity, "Replace");

  const noBrandEntity = await client.getEntity(entity.partitionKey, entity.rowKey);

  // Update the price property
  noBrandEntity.price = 7.0;
  await client.updateEntity(noBrandEntity, "Merge");

  const updatedEntity = await client.getEntity(entity.partitionKey, entity.rowKey);

  console.log(`Original entity: ${JSON.stringify(entity)}`);
  console.log(`Updated entity: ${JSON.stringify(updatedEntity)}`);
}

async function main() {
  await updateAndUpsertEntities();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
