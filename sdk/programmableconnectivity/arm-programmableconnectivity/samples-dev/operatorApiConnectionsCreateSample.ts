// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProgrammableConnectivityClient } from "@azure/arm-programmableconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create an Operator API Connection.
 *
 * @summary create an Operator API Connection.
 * x-ms-original-file: 2025-03-30-preview/OperatorApiConnections_Create_MaximumSet_Gen.json
 */
async function operatorApiConnectionsCreateMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "93519EA0-206F-42A3-8126-A234F19328E0";
  const client = new ProgrammableConnectivityClient(credential, subscriptionId);
  const result = await client.operatorApiConnections.create(
    "rgopenapi",
    "operatorApiConnectionName",
    {
      properties: {
        operatorApiPlanId:
          "/subscriptions/00000000-0000-0000-0000-00000000000/providers/Microsoft.ProgrammableConnectivity/operatorApiPlans/livmzrh",
        gatewayId:
          "/subscriptions/00000000-0000-0000-0000-00000000000/resourceGroups/example-rg/providers/Microsoft.ProgrammableConnectivity/gateways/cdvcixxcdhjqw",
        purposes: ["Fraud Detection and Prevention"],
        purposeReason: "This application uses this API for this purpose because...",
        dataProcessingList: [
          {
            processingOperation: "Access",
            contexts: ["Algorithmic logic"],
            duration: "Endless",
            frequency: "Continuous",
            transitRegions: [
              {
                countryCode: "AA",
                commercialOrganization: "Contoso",
                commercialActivity: true,
                dataPrivacyFrameworkUrl: "https://www.dataprivacyframework.gov/participant/0",
              },
            ],
            storageRegions: [
              {
                countryCode: "AA",
                commercialOrganization: "Contoso",
                commercialActivity: true,
                dataPrivacyFrameworkUrl: "https://www.dataprivacyframework.gov/participant/0",
              },
            ],
          },
        ],
        planTermsAndConditionsAccepted: true,
      },
      tags: {},
      location: "eastus",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await operatorApiConnectionsCreateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
