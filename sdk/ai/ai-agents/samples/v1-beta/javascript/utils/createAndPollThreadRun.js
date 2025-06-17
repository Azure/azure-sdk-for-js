// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Utils to create and poll a thread run until it finishes.
 */
const { isOutputOfType } = require("@azure/ai-agents");

async function createAndPollThreadRun(client, agentId, threadId, withRunStepDetails = false) {
  // Create and poll a run
  console.log("Creating run...");
  const run = await client.runs.createAndPoll(threadId, agentId, {
    pollingOptions: {
      intervalInMs: 2000,
    },
    onResponse: (response) => {
      const parsedBody =
        typeof response.parsedBody === "object" && response.parsedBody !== null
          ? response.parsedBody
          : null;
      const status = parsedBody && "status" in parsedBody ? parsedBody.status : "unknown";
      console.log(`Received response with status: ${status}`);
    },
  });
  console.log(`Run finished with status: ${run.status}`);
  if (!withRunStepDetails) {
    return run;
  }
  // Fetch run steps to get the details of agent run
  const runSteps = await client.runSteps.list(threadId, run.id);

  for await (const step of runSteps) {
    console.log(`Step ID: ${step.id}, Status: ${step.status}`, JSON.stringify(step, null, 2));
    const stepDetails = step.stepDetails;
    if (isOutputOfType(stepDetails, "tool_calls")) {
      const toolCalls = stepDetails.toolCalls;
      for (const toolCall of toolCalls) {
        console.log(`Tool Call ID: ${toolCall.id}, Tool type: ${toolCall.type}`);

        if (isOutputOfType(toolCall, "code_interpreter")) {
          const codeInterpreter = toolCall.codeInterpreter;
          if (codeInterpreter) {
            console.log(`Code Interpreter Tool Call input: ${codeInterpreter.input}`);
            console.log(`Code Interpreter Tool Call output: ${codeInterpreter.outputs}`);
          }
        }
        if (isOutputOfType(toolCall, "file_search")) {
          const fileSearch = toolCall.fileSearch;
          if (fileSearch) {
            for (const file of fileSearch.results) {
              console.log(`File Search Tool Call fileId: ${file.fileId}`);
              console.log(`File Search Tool Call fileName: ${file.fileName}`);
              console.log(`File Search Tool Call score: ${file.score}`);
            }
          }
        }
        if (isOutputOfType(toolCall, "bing_grounding")) {
          const bingGrounding = toolCall.bingGrounding;
          if (bingGrounding) {
            console.log(`Bing Grounding Tool Call: ${bingGrounding}`);
          }
        }

        if (isOutputOfType(toolCall, "azure_ai_search")) {
          {
            const azureAISearch = toolCall.azureAISearch;
            if (azureAISearch) {
              console.log(`Azure AI Search Tool Call input: ${azureAISearch.input}`);
              console.log(`Azure AI Search Tool Call output: ${azureAISearch.output}`);
            }
          }
        }

        if (isOutputOfType(toolCall, "sharepoint_grounding")) {
          const sharePoint = toolCall.sharePoint;
          if (sharePoint) {
            console.log(`SharePoint Tool Call: ${sharePoint}`);
          }
        }

        if (isOutputOfType(toolCall, "fabric_dataagent")) {
          const microsoftFabric = toolCall.microsoftFabric;
          if (microsoftFabric) {
            console.log(`Microsoft Fabric Tool Call: ${microsoftFabric}`);
          }
        }
        if (isOutputOfType(toolCall, "bing_custom_search")) {
          const bingCustomSearch = toolCall.bingCustomSearch;
          if (bingCustomSearch) {
            console.log(`Bing Custom Search Tool Call: ${bingCustomSearch}`);
          }
        }

        if (isOutputOfType(toolCall, "function")) {
          const func = toolCall.function;
          if (func) {
            console.log(`Function Tool Call name: ${func.name}`);
            console.log(`Function Tool Call arguments: ${JSON.stringify(func.arguments, null, 2)}`);
          }
        }

        if (isOutputOfType(toolCall, "openapi")) {
          const openAPI = toolCall.openAPI;
          if (openAPI) {
            console.log(`Open API Tool Call: ${openAPI}`);
          }
        }
      }
    }
  }
  return run;
}

module.exports = { createAndPollThreadRun };
