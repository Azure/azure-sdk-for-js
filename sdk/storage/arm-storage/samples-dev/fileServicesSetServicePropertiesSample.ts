// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to sets the properties of file services in storage accounts, including CORS (Cross-Origin Resource Sharing) rules.
 *
 * @summary sets the properties of file services in storage accounts, including CORS (Cross-Origin Resource Sharing) rules.
 * x-ms-original-file: 2025-08-01/FileServicesPut.json
 */
async function putFileServices(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileServices.setServiceProperties("res4410", "sto8607", {
    fileServiceProperties: {
      cors: {
        corsRules: [
          {
            allowedHeaders: ["x-ms-meta-abc", "x-ms-meta-data*", "x-ms-meta-target*"],
            allowedMethods: ["GET", "HEAD", "POST", "OPTIONS", "MERGE", "PUT"],
            allowedOrigins: ["http://www.contoso.com", "http://www.fabrikam.com"],
            exposedHeaders: ["x-ms-meta-*"],
            maxAgeInSeconds: 100,
          },
          {
            allowedHeaders: ["*"],
            allowedMethods: ["GET"],
            allowedOrigins: ["*"],
            exposedHeaders: ["*"],
            maxAgeInSeconds: 2,
          },
          {
            allowedHeaders: ["x-ms-meta-12345675754564*"],
            allowedMethods: ["GET", "PUT"],
            allowedOrigins: ["http://www.abc23.com", "https://www.fabrikam.com/*"],
            exposedHeaders: ["x-ms-meta-abc", "x-ms-meta-data*", "x-ms-meta-target*"],
            maxAgeInSeconds: 2000,
          },
        ],
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to sets the properties of file services in storage accounts, including CORS (Cross-Origin Resource Sharing) rules.
 *
 * @summary sets the properties of file services in storage accounts, including CORS (Cross-Origin Resource Sharing) rules.
 * x-ms-original-file: 2025-08-01/FileServicesPut_EnableSMBMultichannel.json
 */
async function putFileServicesEnableSMBMultichannel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileServices.setServiceProperties("res4410", "sto8607", {
    fileServiceProperties: { protocolSettings: { smb: { multichannel: { enabled: true } } } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to sets the properties of file services in storage accounts, including CORS (Cross-Origin Resource Sharing) rules.
 *
 * @summary sets the properties of file services in storage accounts, including CORS (Cross-Origin Resource Sharing) rules.
 * x-ms-original-file: 2025-08-01/FileServicesPut_EnableSecureSmbFeatures.json
 */
async function putFileServicesEnableSecureSmbFeatures(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileServices.setServiceProperties("res4410", "sto8607", {
    fileServiceProperties: {
      protocolSettings: {
        smb: {
          authenticationMethods: "NTLMv2;Kerberos",
          channelEncryption: "AES-128-CCM;AES-128-GCM;AES-256-GCM",
          kerberosTicketEncryption: "RC4-HMAC;AES-256",
          versions: "SMB2.1;SMB3.0;SMB3.1.1",
        },
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to sets the properties of file services in storage accounts, including CORS (Cross-Origin Resource Sharing) rules.
 *
 * @summary sets the properties of file services in storage accounts, including CORS (Cross-Origin Resource Sharing) rules.
 * x-ms-original-file: 2025-08-01/FileServicesPut_EncryptionInTransitRequired.json
 */
async function putFileServicesEncryptionInTransitRequired(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileServices.setServiceProperties("res4410", "sto8607", {
    fileServiceProperties: {
      protocolSettings: {
        nfs: { encryptionInTransit: { required: true } },
        smb: { encryptionInTransit: { required: true } },
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putFileServices();
  await putFileServicesEnableSMBMultichannel();
  await putFileServicesEnableSecureSmbFeatures();
  await putFileServicesEncryptionInTransitRequired();
}

main().catch(console.error);
