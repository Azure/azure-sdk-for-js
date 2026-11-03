// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a GitHub issue for the specified repository and assessment.
 *
 * @summary creates a GitHub issue for the specified repository and assessment.
 * x-ms-original-file: 2025-11-01-preview/SecurityConnectorsDevOps/CreateGitHubIssues_example.json
 */
async function createGitHubIssues() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const client = new SecurityCenter(credential, subscriptionId);
  await client.gitHubIssues.create(
    "myRg",
    "mySecurityConnectorName",
    "myGitHubOwner",
    "myGitHubRepo",
    {
      createIssueRequest: {
        securityAssessmentResourceId:
          "/subscriptions/0806e1cd-cfda-4ff8-b99c-2b0af42cffd3/resourceGroups/myRg/providers/Microsoft.Security/assessments/assessment-12345",
      },
    },
  );
}

async function main() {
  await createGitHubIssues();
}

main().catch(console.error);
