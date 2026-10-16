// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the rollout details.
 *
 * @summary creates or updates the rollout details.
 * x-ms-original-file: 2025-10-01/CustomRollouts_CreateOrUpdate.json
 */
async function customRolloutsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.customRollouts.createOrUpdate(
    "Microsoft.Contoso",
    "brazilUsShoeBoxTesting",
    {
      properties: {
        specification: {
          autoProvisionConfig: { storage: true, resourceGraph: true },
          canary: { regions: ["brazilus"] },
          manifestCheckinSpecification: {
            manifestCheckinOption: "AttemptAutomaticManifestCheckin",
            manifestCheckinParams: {
              baselineArmManifestLocation: "EastUS2EUAP",
              environment: "Prod",
            },
          },
          refreshSubscriptionRegistration: true,
          rolloutId: "Ev2RolloutIdGuid",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await customRolloutsCreateOrUpdate();
}

main().catch(console.error);
