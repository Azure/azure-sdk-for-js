// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to call ServiceFabric with a client certificate
 *
 * @summary Service Fabric Client Certificate
 */

import * as dotenv from "dotenv";
import ServiceFabric from "../src";
import { promises as fs } from "fs";

dotenv.config();

async function main() {
  // If you are using a self signed certificate make sure to
  // set the following environment variable
  // process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
  console.log("== Service Fabric Sample ==");

  const pfx = await fs.readFile("<PATH TO CERTIFICATE>");
  const serviceFabric = ServiceFabric({ pfx });

  const clusterHealth = await serviceFabric.getClusterHealth();

  if (clusterHealth.status !== "200") {
    throw clusterHealth.body.Error?.Code;
  }

  console.log(JSON.stringify(clusterHealth.body));
}

main().catch(console.error);
