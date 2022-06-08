// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to call ServiceFabric using TLS certificates.
 *
 * @summary Service Fabric TLS Client Certificate
 */

import * as dotenv from "dotenv";

import ServiceFabric from "@azure-rest/service-fabric";
import { promises as fs } from "fs";

dotenv.config();
const endpoint = process.env["SERVICE_FABRIC_ENDPOINT"] ?? "";
const pfxPath = process.env["SERVICE_FABRIC_PFX_PATH"] ?? "";

async function main() {
  // If you are using a self signed certificate make sure to
  // set the following environment variable
  // process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
  console.log("== Service Fabric with TLS Certificate Sample ==");

  const pfx = await fs.readFile(pfxPath);
  const serviceFabric = ServiceFabric(endpoint, { tlsOptions: { pfx } });

  const clusterHealth = await serviceFabric.path("/$/GetClusterHealth").get();

  if (clusterHealth.status !== "200") {
    throw clusterHealth.body.Error?.Code;
  }

  console.log(JSON.stringify(clusterHealth.body));
}

main().catch(console.error);
