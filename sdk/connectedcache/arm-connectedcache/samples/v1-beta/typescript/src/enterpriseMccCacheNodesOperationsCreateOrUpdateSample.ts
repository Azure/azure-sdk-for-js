// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectedCacheClient } from "@azure/arm-connectedcache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this api creates an ispCacheNode with the specified create parameters
 *
 * @summary this api creates an ispCacheNode with the specified create parameters
 * x-ms-original-file: 2023-05-01-preview/EnterpriseMccCacheNodesOperations_CreateOrUpdate_MaximumSet_Gen.json
 */
async function createsAnEnterpriseMccCacheNodeResourceGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  const result = await client.enterpriseMccCacheNodesOperations.createOrUpdate(
    "rgConnectedCache",
    "nhdkvstdrrtsxxuz",
    "fgduqdovidpemlnmhelomffuafdrbgaasqznvrdkbvspfzsnrhncdtqquhijhdpwyzwleukqldpceyxqhqlftqrr",
    {
      location: "westus",
      properties: {
        cacheNode: {
          fullyQualifiedResourceId: "yeinlleavzbehelhsucb",
          customerName: "zsklcocjfjhkcpmzyefzkwamdzc",
          ipAddress: "gbfkdhloyphnpnhemwrcrxlk",
          customerIndex: "vafvezmelfgmjsrccjukrhppljvipg",
          cacheNodeId: "fmrjefyddfn",
          cacheNodeName: "qppvqxliajjfoalzjbgmxggr",
          customerAsn: 25,
          isEnabled: true,
          maxAllowableEgressInMbps: 27,
          isEnterpriseManaged: true,
          cidrCsv: ["nlqlvrthafvvljuupcbcw"],
          shouldMigrate: true,
          cidrSelectionType: 11,
        },
        statusCode: "1",
        statusText: "Success",
        statusDetails: "lgljxmyyoakw",
        additionalCacheNodeProperties: {
          cacheNodePropertiesDetailsIssuesList: [
            "ennbzfpuszgalzpawmwicaofqcwcj",
          ],
          driveConfiguration: [
            {
              physicalPath: "pcbkezoofhamkycot",
              sizeInGb: 14,
              cacheNumber: 11,
              nginxMapping: "cirlpkpuxg",
            },
          ],
          bgpConfiguration: { asnToIpAddressMapping: "fjbggfvumrn" },
          proxyUrlConfiguration: { proxyUrl: "hplstyg" },
          proxyUrl: "ihkzxlzvpcywtzrogupqozkdud",
          optionalProperty1: "ph",
          optionalProperty2: "soqqgpgcbhb",
          optionalProperty3: "fpnycrbagptsujiotnjfuhlm",
          optionalProperty4: "gesqugrxvhxlxxyvatgrautxwlmxsf",
          optionalProperty5: "zknjgzpaqtvdqjydd",
        },
        error: {},
      },
      tags: { key259: "qbkixjuyjkoj" },
    },
  );
  console.log(result);
}

async function main() {
  createsAnEnterpriseMccCacheNodeResourceGeneratedByMaximumSetRule();
}

main().catch(console.error);
