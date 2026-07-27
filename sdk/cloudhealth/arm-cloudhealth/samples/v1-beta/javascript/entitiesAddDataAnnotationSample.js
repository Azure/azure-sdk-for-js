// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to add a data annotation to an entity
 *
 * @summary add a data annotation to an entity
 * x-ms-original-file: 2026-05-01-preview/Entities_AddDataAnnotation.json
 */
async function entitiesAddDataAnnotation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.entities.addDataAnnotation(
    "online-store-rg",
    "online-store",
    "web-frontend",
    {
      annotationDetails: {
        environment: "production",
        deploymentId: "deploy-2026-05-04-001",
        changedBy: "release-pipeline",
      },
      description: "Deployed release 2.4.1 to the web frontend.",
    },
  );
  console.log(result);
}

async function main() {
  await entitiesAddDataAnnotation();
}

main().catch(console.error);
