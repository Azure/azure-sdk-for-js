// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns remote private endpoint connection information after validation.
 *
 * @summary returns remote private endpoint connection information after validation.
 * x-ms-original-file: 2024-09-01/PrivateEndpointConnectionProxy_Validate.json
 */
async function validatesThePrivateEndpointConnectionProxy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.privateEndpointConnectionProxies.validate(
    "rgswagger_2024-09-01",
    "4",
    "d",
    {
      etag: "hruibxrezstxroxrxweh",
      properties: {
        remotePrivateEndpoint: {
          id: "yipalno",
          privateLinkServiceConnections: [
            {
              name: "jqwntlzfsksl",
              groupIds: ["hvejynjktikteipnioyeja"],
              requestMessage: "bukgzpkvcvfbmcdmpcbiigbvugicqa",
            },
          ],
          manualPrivateLinkServiceConnections: [
            {
              name: "jqwntlzfsksl",
              groupIds: ["hvejynjktikteipnioyeja"],
              requestMessage: "bukgzpkvcvfbmcdmpcbiigbvugicqa",
            },
          ],
          privateLinkServiceProxies: [
            {
              id: "nzqxevuyqeedrqnkbnlcyrrrbzxvl",
              remotePrivateLinkServiceConnectionState: {
                status: "Approved",
                description: "y",
                actionsRequired: "afwbq",
              },
              remotePrivateEndpointConnection: { id: "ocunsgawjsqohkrcyxiv" },
              groupConnectivityInformation: [
                {
                  groupId: "per",
                  memberName: "ybptuypgdqoxkuwqx",
                  customerVisibleFqdns: ["vedcg"],
                  internalFqdn: "maqavwhxwzzhbzjbryyquvitmup",
                  redirectMapId: "pezncxcq",
                  privateLinkServiceArmRegion: "rerkqqxinteevmlbrdkktaqhcch",
                },
              ],
            },
          ],
          connectionDetails: [
            {
              id: "lenqkogzkes",
              privateIpAddress: "cyiacdzzyqmxjpijjbwgasegehtqe",
              linkIdentifier: "ravfufhkdowufd",
              groupId: "pjrlygpadir",
              memberName: "ybuysjrlfupewxe",
            },
          ],
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await validatesThePrivateEndpointConnectionProxy();
}

main().catch(console.error);
