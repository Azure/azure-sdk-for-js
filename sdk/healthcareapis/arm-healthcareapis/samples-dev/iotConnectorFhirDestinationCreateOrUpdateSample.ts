// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates an IoT Connector FHIR destination resource with the specified parameters.
 *
 * @summary Creates or updates an IoT Connector FHIR destination resource with the specified parameters.
 * x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2024-03-31/examples/iotconnectors/iotconnector_fhirdestination_Create.json
 */

import type { IotFhirDestination } from "@azure/arm-healthcareapis";
import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateAnIotConnectorFhirDestination(): Promise<void> {
  const subscriptionId = process.env["HEALTHCAREAPIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HEALTHCAREAPIS_RESOURCE_GROUP"] || "testRG";
  const workspaceName = "workspace1";
  const iotConnectorName = "blue";
  const fhirDestinationName = "dest1";
  const iotFhirDestination: IotFhirDestination = {
    fhirMapping: {
      content: {
        template: [
          {
            template: {
              codes: [
                {
                  code: "8867-4",
                  display: "Heart rate",
                  system: "http://loinc.org",
                },
              ],
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
    location: "westus",
    resourceIdentityResolutionType: "Create",
  };
  const credential = new DefaultAzureCredential();
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.iotConnectorFhirDestination.beginCreateOrUpdateAndWait(
    resourceGroupName,
    workspaceName,
    iotConnectorName,
    fhirDestinationName,
    iotFhirDestination,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAnIotConnectorFhirDestination();
}

main().catch(console.error);
