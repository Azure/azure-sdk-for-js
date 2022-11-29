// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as dotenv from "dotenv";

/**
 * This sample demonstrates how to list enclave quotes using client Certificate Authentication
 *
 * @summary gets a list of all enclave quotes using Client Certificate Authentication
 */

dotenv.config();

export async function main() {
  console.log("== Confidential Ledger ==");
}

main().catch((err) => {
  console.error(err);
});
