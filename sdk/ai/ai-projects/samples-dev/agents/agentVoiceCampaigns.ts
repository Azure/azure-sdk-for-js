// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Read preview voice campaign preparation and validation errors, plus GA outbound call-job status, without placing calls.
 * @azsdk-weight 50
 */

import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

export async function main(): Promise<void> {
  const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"]?.trim();
  const agentName = process.env["FOUNDRY_AGENT_NAME"]?.trim();
  if (!projectEndpoint || !agentName) {
    throw new Error("Set FOUNDRY_PROJECT_ENDPOINT and FOUNDRY_AGENT_NAME.");
  }
  const campaignName = process.env["FOUNDRY_VOICE_CAMPAIGN_NAME"]?.trim();
  const operationId = process.env["FOUNDRY_VOICE_CAMPAIGN_OPERATION_ID"]?.trim();
  const callJobId = process.env["FOUNDRY_TELEPHONY_CALL_JOB_ID"]?.trim();
  if (operationId && !campaignName) {
    throw new Error("Set FOUNDRY_VOICE_CAMPAIGN_NAME when supplying a campaign operation ID.");
  }
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const options = {
    requestOptions: { headers: { "foundry-features": "VoiceAgents=V1Preview" } },
  };
  const telephony = project.beta.voiceAgents.telephony;

  // Campaign creation can immediately authorize dialing. This sample performs reads only.
  console.log("Reading one page of voice campaigns...");
  for await (const page of telephony
    .list(agentName, { ...options, limit: 5, order: "desc" })
    .byPage()) {
    for (const campaign of page) {
      console.log(`Campaign ${campaign.name}: ${campaign.status}`);
    }
    break;
  }
  if (campaignName) {
    const campaign = await telephony.get(agentName, campaignName, {
      ...options,
      operationId,
    });
    console.log(`Selected campaign ${campaign.name}: ${campaign.status}`);
    for await (const page of telephony
      .listValidationErrors(agentName, campaignName, { ...options, limit: 5, order: "asc" })
      .byPage()) {
      for (const entry of page) {
        console.log(`Validation row ${entry.row_number}: ${entry.error.code}`);
      }
      break;
    }
    console.log(
      "Validation errors can be partial during preparation; an empty page is not success.",
    );
    if (operationId) {
      const operation = await telephony.getOperation(agentName, campaignName, operationId, options);
      console.log(`Campaign operation ${operation.id}: ${operation.kind} ${operation.status}`);
    }
  }

  // Call jobs are GA, including jobs created by a preview campaign.
  for await (const page of project.voiceAgents.telephony
    .listCallJobs(agentName, { campaignName, limit: 5, order: "desc" })
    .byPage()) {
    for (const job of page) {
      // Avoid logging telephone numbers, provider credentials, or structured caller inputs.
      console.log(`Call job ${job.id}: ${job.status}, attempts: ${job.attempt_count}`);
    }
    break;
  }
  if (callJobId) {
    const job = await project.voiceAgents.telephony.getCallJob(agentName, callJobId);
    console.log(`Selected call job ${job.id}: ${job.status}, attempts: ${job.attempt_count}`);
  }
}

main().catch((error: unknown) => {
  console.error("Sample failed:", error);
  process.exitCode = 1;
});
