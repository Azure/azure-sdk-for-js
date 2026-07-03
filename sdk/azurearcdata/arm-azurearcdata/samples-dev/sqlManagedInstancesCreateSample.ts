// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-azurearcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or replaces a SQL Managed Instance resource
 *
 * @summary creates or replaces a SQL Managed Instance resource
 * x-ms-original-file: 2026-03-01-preview/CreateOrUpdateSqlManagedInstance.json
 */
async function createOrUpdateASQLManagedInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlManagedInstances.create("testrg", "testsqlManagedInstance", {
    extendedLocation: {
      name: "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.ExtendedLocation/customLocations/arclocation",
      type: "CustomLocation",
    },
    location: "northeurope",
    properties: {
      activeDirectoryInformation: { keytabInformation: { keytab: "********" } },
      admin: "Admin user",
      basicLoginInformation: { password: "********", username: "username" },
      clusterId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.Kubernetes/connectedClusters/connectedk8s",
      endTime: "Instance end time",
      extensionId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.Kubernetes/connectedClusters/connectedk8s/providers/Microsoft.KubernetesConfiguration/extensions/extension",
      k8SRaw: {
        spec: {
          replicas: 1,
          scheduling: {
            default: {
              resources: {
                limits: { additionalProperty: "additionalValue", cpu: "1", memory: "8Gi" },
                requests: { additionalProperty: "additionalValue", cpu: "1", memory: "8Gi" },
              },
            },
          },
          security: {
            activeDirectory: {
              accountName: "Account name",
              connector: { name: "Name of connector", namespace: "Namespace of connector" },
              encryptionTypes: ["Encryption type item1, Encryption type item2,..."],
              keytabSecret: "Key tab secret of account",
            },
            adminLoginSecret: "test-sql-login-secret",
            serviceCertificateSecret: "Service Certificate Secret",
            transparentDataEncryption: { mode: "SystemManaged" },
          },
          settings: {
            network: {
              forceencryption: 0,
              tlsciphers:
                "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384",
              tlsprotocols: "1.2",
            },
          },
        },
        additionalProperties: {
          additionalProperty: 1234,
        },
      },
      licenseType: "LicenseIncluded",
      startTime: "Instance start time",
    },
    sku: { name: "vCore", dev: true, tier: "GeneralPurpose" },
    tags: { mytag: "myval" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateASQLManagedInstance();
}

main().catch(console.error);
