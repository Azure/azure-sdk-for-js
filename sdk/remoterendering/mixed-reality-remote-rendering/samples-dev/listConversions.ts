// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates using the Azure Remote Rendering SDK to list conversions.
 */

/// <reference lib="esnext.asynciterable" />

import { RemoteRenderingClient } from "@azure/mixed-reality-remote-rendering";
import { AzureKeyCredential } from "@azure/core-auth";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set this environment variables or edit the following values
const accountDomain = process.env["REMOTERENDERING_ARR_ACCOUNT_DOMAIN"] || "<account domain>";
const accountId = process.env["REMOTERENDERING_ARR_ACCOUNT_ID"] || "<account ID>";
const accountKey = process.env["REMOTERENDERING_ARR_ACCOUNT_KEY"] || "<account key>";
const serviceEndpoint = process.env["REMOTERENDERING_ARR_SERVICE_ENDPOINT"] || "<serviceEndpoint>";

export async function main() {
  console.log("== Convert an asset example ==");

  console.log("== Creating a client ==");

  let credential = new AzureKeyCredential(accountKey);

  const client = new RemoteRenderingClient(serviceEndpoint, accountId, accountDomain, credential);

  console.log("== Starting listing conversions ==");

  for await (const conversion of client.listConversions()) {
    if (conversion.status === "Succeeded") {
      console.log(
        `Conversion ${conversion.conversionId} succeeded: Output written to ${conversion.output?.outputAssetUrl}`,
      );
    } else if (conversion.status === "Failed") {
      console.log(
        `Conversion ${conversion.conversionId} failed: ${conversion.error.code} ${conversion.error.message}`,
      );
    }
  }

  console.log("== All conversions listed ==");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
