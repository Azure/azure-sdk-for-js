// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates creating, retrieving, listing, and deleting feature flags
 * using the dedicated feature flag endpoint. Requires the 2026-05-01-preview API version or later.
 * @azsdk-weight 19
 */
import type { FeatureFlag } from "@azure/app-configuration";
import { AppConfigurationClient } from "@azure/app-configuration";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main(): Promise<void> {
  console.log(`Running featureFlagEndpoint sample`);

  // Set the following environment variable or edit the value on the following line.
  const endpoint = process.env["AZ_CONFIG_ENDPOINT"] || "<endpoint>";

  const credential = new DefaultAzureCredential();
  const client = new AppConfigurationClient(endpoint, credential);

  // Create a simple feature flag through the dedicated feature flag endpoint.
  const simpleFlagName = "sample-simple-feature-flag";
  console.log(`Setting a simple feature flag: ${simpleFlagName}`);
  await client.setFeatureFlag({
    name: simpleFlagName,
    enabled: true,
    description: "A simple feature flag",
  });

  // Retrieve the feature flag we just created.
  const retrieved = await client.getFeatureFlag(simpleFlagName);
  console.log(`Retrieved feature flag: ${retrieved.name}, enabled: ${retrieved.enabled}`);

  // Create a richer feature flag with conditions, variants, allocation, telemetry, and tags.
  const richFlagName = "sample-rich-feature-flag";
  const richFlag: FeatureFlag = {
    name: richFlagName,
    enabled: true,
    description: "A feature flag with conditions, variants, allocation, and telemetry",
    conditions: {
      requirementType: "All",
      filters: [
        {
          name: "Microsoft.TimeWindow",
          parameters: { Start: "Mon, 01 Jan 2024 00:00:00 GMT" },
        },
        {
          name: "Microsoft.Percentage",
          parameters: { Value: "50" },
        },
      ],
    },
    variants: [
      { name: "On", value: "true" },
      { name: "Off", value: "false" },
    ],
    allocation: {
      defaultWhenEnabled: "On",
      defaultWhenDisabled: "Off",
      percentile: [
        { variant: "On", from: 0, to: 50 },
        { variant: "Off", from: 50, to: 100 },
      ],
    },
    telemetry: {
      enabled: true,
    },
    tags: {
      team: "samples",
    },
  };

  console.log(`Setting a rich feature flag: ${richFlagName}`);
  await client.setFeatureFlag(richFlag);

  // List all feature flags.
  console.log(`Listing all feature flags`);
  for await (const flag of client.listFeatureFlags()) {
    console.log(`  Found feature flag: ${flag.name}, enabled: ${flag.enabled}`);
  }

  // List revisions for the rich feature flag.
  console.log(`Listing revisions for ${richFlagName}`);
  for await (const revision of client.listFeatureFlagRevisions({ nameFilter: richFlagName })) {
    console.log(`  Revision last modified: ${revision.lastModified}`);
  }

  // Clean up the feature flags we created.
  console.log(`Deleting the sample feature flags`);
  await client.deleteFeatureFlag(simpleFlagName);
  await client.deleteFeatureFlag(richFlagName);
}

main().catch((error) => {
  console.error("Failed to run sample:", error);
  process.exit(1);
});
