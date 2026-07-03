// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-azurearcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or replaces an Active Directory connector resource.
 *
 * @summary creates or replaces an Active Directory connector resource.
 * x-ms-original-file: 2026-03-01-preview/CreateOrUpdateActiveDirectoryConnector.json
 */
async function createOrUpdateAnActiveDirectoryConnectorInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.activeDirectoryConnectors.create(
    "testrg",
    "testdataController",
    "testADConnector",
    {
      properties: {
        spec: {
          activeDirectory: {
            domainControllers: {
              primaryDomainController: { hostname: "dc1.contoso.local" },
              secondaryDomainControllers: [
                { hostname: "dc2.contoso.local" },
                { hostname: "dc3.contoso.local" },
              ],
            },
            realm: "CONTOSO.LOCAL",
            serviceAccountProvisioning: "manual",
          },
          dns: {
            nameserverIPAddresses: ["11.11.111.111", "22.22.222.222"],
            preferK8SDnsForPtrLookups: false,
            replicas: 1,
          },
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAnActiveDirectoryConnectorInstance();
}

main().catch(console.error);
