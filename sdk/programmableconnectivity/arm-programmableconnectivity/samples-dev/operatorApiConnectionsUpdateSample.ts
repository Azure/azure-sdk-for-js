// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProgrammableConnectivityClient } from "@azure/arm-programmableconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update an Operator API Connection.
 *
 * @summary update an Operator API Connection.
 * x-ms-original-file: 2025-03-30-preview/OperatorApiConnections_Update_MaximumSet_Gen.json
 */
async function operatorApiConnectionsUpdateMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "93519EA0-206F-42A3-8126-A234F19328E0";
  const client = new ProgrammableConnectivityClient(credential, subscriptionId);
  const result = await client.operatorApiConnections.update(
    "rgopenapi",
    "operatorApiConnectionName",
    {
      tags: {},
      properties: {
        operatorApiPlanId:
          "/subscriptions/00000000-0000-0000-0000-00000000000/providers/Microsoft.ProgrammableConnectivity/operatorApiPlans/livmzrh",
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
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await operatorApiConnectionsUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
