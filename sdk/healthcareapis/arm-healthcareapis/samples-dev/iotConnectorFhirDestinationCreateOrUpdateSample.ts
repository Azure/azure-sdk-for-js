// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an IoT Connector FHIR destination resource with the specified parameters.
 *
 * @summary creates or updates an IoT Connector FHIR destination resource with the specified parameters.
 * x-ms-original-file: 2025-04-01-preview/iotconnectors/iotconnector_fhirdestination_Create.json
 */
async function createOrUpdateAnIotConnectorFhirDestination(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.iotConnectorFhirDestination.createOrUpdate(
    "testRG",
    "workspace1",
    "blue",
    "dest1",
    {
      location: "westus",
      fhirMapping: {
        content: {
          template: [
            {
              template: {
                codes: [{ code: "8867-4", display: "Heart rate", system: "http://loinc.org" }],
                periodInterval: 60,
                typeName: "heartrate",
                value: {
                  defaultPeriod: 5000,
                  unit: "count/min",
                  valueName: "hr",
                  valueType: "SampledData",
                },
              },
              templateType: "CodeValueFhir",
            },
          ],
          templateType: "CollectionFhirTemplate",
        },
      },
      fhirServiceResourceId:
        "subscriptions/11111111-2222-3333-4444-555566667777/resourceGroups/myrg/providers/Microsoft.HealthcareApis/workspaces/myworkspace/fhirservices/myfhirservice",
      resourceIdentityResolutionType: "Create",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAnIotConnectorFhirDestination();
}

main().catch(console.error);
