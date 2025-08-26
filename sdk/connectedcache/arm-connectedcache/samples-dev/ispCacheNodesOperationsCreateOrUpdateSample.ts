// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to this api creates an ispCacheNode with the specified create parameters
 *
 * @summary this api creates an ispCacheNode with the specified create parameters
 * x-ms-original-file: 2023-05-01-preview/IspCacheNodesOperations_CreateOrUpdate_MaximumSet_Gen.json
 */

import { ConnectedCacheClient } from "@azure/arm-connectedcache";
import { DefaultAzureCredential } from "@azure/identity";

async function ispCacheNodesOperationsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  const result = await client.ispCacheNodesOperations.createOrUpdate(
    "rgConnectedCache",
    "zpqzbmanlljgmkrthtydrtneavhlnlqkdmviq",
    "cabakm",
    {
      location: "westus",
      properties: {
        cacheNode: {
          fullyQualifiedResourceId: "hskxkpbiqbrbjiwdzrxndru",
          customerName: "xwyqk",
          ipAddress: "voctagljcwqgcpnionqdcbjk",
          customerIndex: "qtoiglqaswivmkjhzogburcxtszmek",
          cacheNodeId: "xjzffjftwcgsehanoxsl",
          cacheNodeName: "mfjxb",
          customerAsn: 4,
          isEnabled: true,
          maxAllowableEgressInMbps: 29,
          isEnterpriseManaged: true,
          cidrCsv: ["nlqlvrthafvvljuupcbcw"],
          shouldMigrate: true,
          cidrSelectionType: 4,
        },
        additionalCacheNodeProperties: {
          driveConfiguration: [
            {
              physicalPath: "/mcc",
              sizeInGb: 500,
              cacheNumber: 1,
              nginxMapping: "lijygenjq",
            },
          ],
          bgpConfiguration: { asnToIpAddressMapping: "pafcimhoog" },
          cacheNodePropertiesDetailsIssuesList: ["ex"],
          proxyUrlConfiguration: { proxyUrl: "hplstyg" },
          proxyUrl: "qhux",
          optionalProperty1: "hvpmt",
          optionalProperty2: "talanelmsgxvksrzoeeontqkjzbpv",
          optionalProperty3: "bxkoxq",
          optionalProperty4: "pqlkcekupusoc",
          optionalProperty5: "nyvvmrjigqdufzjdvazdca",
        },
        statusCode: "1",
        statusText: "Success",
        statusDetails: "djruqvptzxak",
        error: {},
      },
      tags: { key4171: "qtjlszkawsdujzpgohsbw" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await ispCacheNodesOperationsCreateOrUpdate();
}

main().catch(console.error);
