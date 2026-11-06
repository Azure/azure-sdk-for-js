// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new FlowProfile or updates an existing one.
 *
 * @summary creates a new FlowProfile or updates an existing one.
 * x-ms-original-file: 2026-02-06-preview/createOrUpdateFlowProfile.json
 */
async function createsOrUpdatesTheFlowPRofileResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.flowProfiles.createOrUpdate(
    "testRG",
    "testPipeline",
    "testFlowProfile",
    {
      location: "East US",
      properties: {
        replicationScenario: "Files",
        status: "Enabled",
        description: "Hello world description",
        rulesets: {
          mimeFilters: {
            type: "Allow",
            filters: [{ media: "application/json", extensions: [".json", ".app", ".js"] }],
          },
          textMatching: {
            deny: [
              { text: "hello world", matchType: "Partial", caseSensitivity: "Insensitive" },
              { text: "hello", matchType: "Complete", caseSensitivity: "Sensitive" },
            ],
          },
          antivirus: { avSolutions: ["Defender", "ClamAv"] },
          archives: {
            minimumSizeForExpansion: 1,
            maximumExpansionSizeLimit: 123456,
            maximumDepthLimit: 12,
            maximumCompressionRatioLimit: 123,
          },
          dataSize: { maximum: 123456789, minimum: 1 },
          xmlFilters: {
            defaultNamespace: "testnamespace",
            reference: "Inline",
            schema:
              '<?xml version="1.0" encoding="UTF-8" ?> <xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"></xs:schema>',
          },
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createsOrUpdatesTheFlowPRofileResource();
}

main().catch(console.error);
