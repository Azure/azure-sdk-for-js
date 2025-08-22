// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Check if the probe path is a valid path and the file can be accessed. Probe path is the path to a file hosted on the origin server to help accelerate the delivery of dynamic content via the CDN endpoint. This path is relative to the origin path specified in the endpoint configuration.
 *
 * @summary Check if the probe path is a valid path and the file can be accessed. Probe path is the path to a file hosted on the origin server to help accelerate the delivery of dynamic content via the CDN endpoint. This path is relative to the origin path specified in the endpoint configuration.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/ValidateProbe.json
 */

import type { ValidateProbeInput } from "@azure/arm-cdn";
import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function validateProbe(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const validateProbeInput: ValidateProbeInput = {
    probeURL: "https://www.bing.com/image",
  };
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.validateProbe(validateProbeInput);
  console.log(result);
}

async function main(): Promise<void> {
  await validateProbe();
}

main().catch(console.error);
