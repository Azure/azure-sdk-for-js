// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to call ServiceFabric Azure Active Directory (AAD) to authenticate.
 *
 * @summary Service Fabric with AAD
 */

import * as dotenv from "dotenv";

import { DefaultAzureCredential } from "@azure/identity";
import ServiceFabric from "@azure-rest/service-fabric";

dotenv.config();
const endpoint = process.env["SERVICE_FABRIC_ENDPOINT"] ?? "";

async function main() {
  console.log("== Service Fabric with AAD Sample ==");
  const credential = new DefaultAzureCredential();
  const serviceFabric = ServiceFabric(endpoint, credential);

  const clusterHealth = await serviceFabric.path("/$/GetClusterHealth").get();

  if (clusterHealth.status !== "200") {
    throw clusterHealth.body.Error?.Code;
  }

  console.log(JSON.stringify(clusterHealth.body));
}

main().catch(console.error);
