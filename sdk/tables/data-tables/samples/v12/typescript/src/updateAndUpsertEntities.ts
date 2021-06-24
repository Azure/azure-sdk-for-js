// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * This sample demonstrates how to perform entity update and upsert operations in a table
 *
 * @summary updates and upserts entities in a table
 */

import { TableClient } from "@azure/data-tables";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

const tablesUrl = process.env["TABLES_URL"] || "";
const sasToken = process.env["SAS_TOKEN"] || "";

async function updateAndUpsertEntities() {
  console.log("== Update and Upsert entities Sample ==");

  // Note that this sample assumes that a table with tableName exists
  const tableName = `updateAndUpsertEntitiesTable`;

  // See authenticationMethods sample for other options of creating a new client
  const client = new TableClient(`${tablesUrl}${sasToken}`, tableName);

  // Create the table
  await client.createTable();

  const entity: Entity = {
    partitionKey: "Stationery",
    rowKey: "A1",
    name: "Marker Set",
    price: 5.0,
    brand: "myCompany"
  };

  // Entity doesn't exist in table, so calling upsertEntity will simply insert the entity.
  await client.upsertEntity(entity, "Merge");

  // Entity does exist in the table, so calling upsertEntity will update using the given UpdateMode.
  // Because we are passing "Replace" as update mode, the existing entity will be replaced and delete the "brand" property.
  await client.upsertEntity(
    {
      partitionKey: "Stationery",
      rowKey: "A1",
      name: "Marker Set",
      price: 5.0,
      // Replace with the same entity but without a brand
      brand: undefined
    },
    "Replace"
  );

  // Getting the entity we just created should give us an entity similar to the one that we first inserted
  // but without a brand property
  const noBrandEntity = await client.getEntity<Entity>(entity.partitionKey, entity.rowKey);

  // Now we update the price setting, the default update mode is "Merge" which will only update the properties
  // of the entity that are different to what is already stored, in this case we just need to update the price
  // so we can just send an entity with the partition and row keys plus the new price
  await client.updateEntity({
    partitionKey: noBrandEntity.partitionKey,
    rowKey: noBrandEntity.rowKey,
    price: 7.0
  });

  // Getting the entity should gice us an entity like the original, but without a brand and with a price of 7
  const updatedEntity = await client.getEntity(entity.partitionKey, entity.rowKey);
  console.log(`Original entity: ${JSON.stringify(entity)}`);
  console.log(`Updated entity: ${JSON.stringify(updatedEntity)}`);

  // Delete the table for cleanup
  await client.deleteTable();
}

interface Entity {
  partitionKey: string;
  rowKey: string;
  name: string;
  price: number;
  brand?: string;
}

export async function main() {
  await updateAndUpsertEntities();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
