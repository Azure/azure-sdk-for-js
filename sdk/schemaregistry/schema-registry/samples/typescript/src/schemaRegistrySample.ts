// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates something
 */

import { SchemaRegistryClient } from "@azure/schema-registry";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set this environment variables or edit the following values
const endpoint = process.env["SCHEMA_REGISTRY_ENDPOINT"] || "<endpoint>";

export async function main() {
  console.log("== Sample SchemaRegistry ==");

  // TODO
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
