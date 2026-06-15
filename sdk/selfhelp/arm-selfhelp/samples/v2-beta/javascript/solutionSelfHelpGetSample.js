// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HelpRP } = require("@azure/arm-selfhelp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets Self Help Solutions for a given solutionId. Self Help Solutions consist of rich instructional video tutorials, links and guides to public documentation related to a specific problem that enables users to troubleshoot Azure issues.
 *
 * @summary gets Self Help Solutions for a given solutionId. Self Help Solutions consist of rich instructional video tutorials, links and guides to public documentation related to a specific problem that enables users to troubleshoot Azure issues.
 * x-ms-original-file: 2024-03-01-preview/SelfHelpSolution_Get.json
 */
async function solutionGet() {
  const credential = new DefaultAzureCredential();
  const client = new HelpRP(credential);
  const result = await client.solutionSelfHelp.get("SolutionId1");
  console.log(result);
}

async function main() {
  await solutionGet();
}

main().catch(console.error);
