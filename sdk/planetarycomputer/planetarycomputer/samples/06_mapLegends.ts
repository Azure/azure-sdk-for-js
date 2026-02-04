// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates map legend operations including:
 * - Getting class map legends (categorical color maps)
 * - Getting interval legends (continuous color maps)
 * - Getting legend images
 *
 * @description
 * USAGE:
 *   npx ts-node 06_mapLegends.ts
 *
 *   Set the environment variable PLANETARYCOMPUTER_ENDPOINT with your endpoint URL.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient, KnownColorMapNames } from "@azure/planetarycomputer";
import * as fs from "fs";

// Environment variables
const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT;

if (!endpoint) {
  throw new Error("PLANETARYCOMPUTER_ENDPOINT environment variable must be set");
}

/**
 * Get a class map legend (categorical color map).
 */
async function getClassMapLegend(client: PlanetaryComputerProClient): Promise<void> {
  console.log("Getting class map legend for MTBS Severity...");

  const result = await client.data.getClassMapLegend(KnownColorMapNames.MtbsSeverity);

  console.log(`  Legend classes: ${Object.keys(result).length}`);

  // Show a few classes
  const classes = Object.entries(result).slice(0, 5);
  for (const [classValue, color] of classes) {
    console.log(`  Class ${classValue}: RGBA(${(color as number[]).join(", ")})`);
  }
}

/**
 * Get an interval legend (continuous color map).
 */
async function getIntervalLegend(client: PlanetaryComputerProClient): Promise<void> {
  console.log("Getting interval legend for MODIS 64A1...");

  const result = await client.data.getIntervalLegend(KnownColorMapNames.Modis64A1);

  const keys = Object.keys(result);
  console.log(`  Legend intervals: ${keys.length}`);

  // Show a few intervals
  for (const key of keys.slice(0, 3)) {
    const interval = (result as Record<string, unknown>)[key] as unknown[];
    if (Array.isArray(interval) && interval.length === 2) {
      const range = interval[0] as number[];
      const color = interval[1] as number[];
      console.log(`  Interval ${key}: Range [${range.join(", ")}], RGBA(${color.join(", ")})`);
    }
  }
}

/**
 * Get a legend as a PNG image and save it locally.
 */
async function getLegend(client: PlanetaryComputerProClient): Promise<void> {
  console.log("Getting legend image for RdYlGn color map...");

  const response = await client.data.getLegend("rdylgn");

  // Collect the image bytes
  const chunks: Uint8Array[] = [];
  for await (const chunk of response) {
    chunks.push(chunk);
  }

  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const legendBytes = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    legendBytes.set(chunk, offset);
    offset += chunk.length;
  }

  // Save the legend to a file
  const filename = "legend_rdylgn.png";
  fs.writeFileSync(filename, legendBytes);

  console.log(`  Legend saved as: ${filename} (${legendBytes.length} bytes)`);
}

/**
 * Main execution function.
 */
async function main(): Promise<void> {
  console.log(`Connected to: ${endpoint}\n`);

  // Create client
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(endpoint, credential);

  // Execute map legend operations
  await getClassMapLegend(client);
  await getIntervalLegend(client);
  await getLegend(client);

  console.log("\nMap Legend Operations Complete");
}

main().catch(console.error);
