// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates the rollout details.
 *
 * @summary creates or updates the rollout details.
 * x-ms-original-file: 2026-10-01/CustomRollouts_CreateOrUpdate.json
 */
async function customRolloutsCreateOrUpdate(): Promise<void> {
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
              swaggerUri: "https://github.com/Azure/azure-rest-api-specs/pull/123456",
            },
          },
          refreshSubscriptionRegistration: true,
          rolloutId: "rollout-0001",
          rolloutOrchestrationMetadata: {
            isForManifestBuildout: true,
            deploymentType: "RegionAgnosticRollout",
            trafficRing: "Canary",
            serviceGroup: "Microsoft.Contoso.ManifestRollout",
            serviceIdentifier: "00000000-0000-0000-0000-000000000000",
          },
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await customRolloutsCreateOrUpdate();
}

main().catch(console.error);
