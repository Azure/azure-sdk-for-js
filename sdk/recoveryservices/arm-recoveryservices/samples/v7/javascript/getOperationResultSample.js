// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesClient } = require("@azure/arm-recoveryservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the operation result for a resource.
 *
 * @summary gets the operation result for a resource.
 * x-ms-original-file: 2025-08-01/GetOperationResult.json
 */
async function getOperationResult() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.getOperationResult(
    "HelloWorld",
    "swaggerExample",
    "YWUzNDFkMzQtZmM5OS00MmUyLWEzNDMtZGJkMDIxZjlmZjgzOzdmYzBiMzhmLTc2NmItNDM5NS05OWQ1LTVmOGEzNzg4MWQzNA==",
  );
  console.log(result);
}

async function main() {
  await getOperationResult();
}

main().catch(console.error);
