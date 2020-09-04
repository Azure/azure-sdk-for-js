// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableClient } from "@azure/data-tables";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

const tablesUrl = process.env["TABLES_URL"] || "";
const sasToken = process.env["SAS_TOKEN"] || "";

export async function createAndDeleteEntities() {
  console.log("== Create and delete entities Sample ==");

  const tableName = "OfficeSupplies5p1";

  // See authenticationMethods sample for other options of creating a new client
  const client = new TableClient(`${tablesUrl}${sasToken}`, tableName);

  // Create the table
  await client.create();

  const entity: Entity = {
    partitionKey: "Stationery",
    rowKey: "A1",
    name: "Marker Set",
    price: 5.0,
    brand: "myCompany",
  };

  // Entity doesn't exist in table, so calling upsertEntity will simply insert the entity.
  await client.upsertEntity(entity, "Merge");

  // Remove brand
  // Entity does exist in the table, so calling upsertEntity will update using the given UpdateMode.
  // Because we are passing "Replace" as update mode, the existing entity will be replaced and delete the "brand" property.
  await client.upsertEntity({ ...entity, brand: null }, "Replace");

  const noBrandEntity = await client.getEntity(
    entity.partitionKey,
    entity.rowKey
  );

  // Update the price property
  await client.updateEntity({ ...noBrandEntity, price: 7.0 }, "Merge");

  const updatedEntity = await client.getEntity(
    entity.partitionKey,
    entity.rowKey
  );

  console.log(`Original entity: ${JSON.stringify(entity)}`);
  console.log(`Updated entity: ${JSON.stringify(updatedEntity)}`);

  // Delete the table
  await client.delete();
}

interface Entity {
  partitionKey: string;
  rowKey: string;
  name: string;
  price: number;
  brand?: string;
}

export async function main() {
  await createAndDeleteEntities();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
