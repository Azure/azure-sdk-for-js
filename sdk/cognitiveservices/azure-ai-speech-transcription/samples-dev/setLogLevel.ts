// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to enable logging for troubleshooting.
 *
 * @summary enable logging to troubleshoot issues
 */

// <SetLogLevel>
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
// </SetLogLevel>

export async function main(): Promise<void> {
  console.log("== Set Log Level Sample ==");
  console.log("Logging has been enabled at 'info' level.");
  console.log("HTTP requests and responses will now be logged.");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
