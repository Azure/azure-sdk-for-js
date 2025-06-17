// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AgentsClient,
  ThreadRun,
  isOutputOfType,
  RunStepToolCallDetails,
  RunStepAzureAISearchToolCall,
  RunStepCodeInterpreterImageOutput,
  RunStepCodeInterpreterToolCall,
  RunStepFileSearchToolCall,
  RunStepBingGroundingToolCall,
  RunStepSharepointToolCall,
  RunStepMicrosoftFabricToolCall,
  RunStepBingCustomSearchToolCall,
  RunStepFunctionToolCall,
  RunStepOpenAPIToolCall,
} from "@azure/ai-agents";

export async function createAndPollThreadRun(
  client: AgentsClient,
  agentId: string,
  threadId: string,
  withRunStepDetails: boolean = false,
): Promise<ThreadRun> {
  // Create and poll a run
  console.log("Creating run...");
  const run = await client.runs.createAndPoll(threadId, agentId, {
    pollingOptions: {
      intervalInMs: 2000,
    },
    onResponse: (response): void => {
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
    if (isOutputOfType<RunStepToolCallDetails>(stepDetails, "tool_calls")) {
      const toolCalls = stepDetails.toolCalls;
      for (const toolCall of toolCalls) {
        console.log(`Tool Call ID: ${toolCall.id}, Tool type: ${toolCall.type}`);

        if (isOutputOfType<RunStepCodeInterpreterToolCall>(toolCall, "code_interpreter")) {
          const codeInterpreter = toolCall.codeInterpreter;
          if (codeInterpreter) {
            console.log(`Code Interpreter Tool Call input: ${codeInterpreter.input}`);
            console.log(`Code Interpreter Tool Call output: ${codeInterpreter.outputs}`);
          }
        }
        if (isOutputOfType<RunStepFileSearchToolCall>(toolCall, "file_search")) {
          const fileSearch = toolCall.fileSearch;
          if (fileSearch) {
            for (const file of fileSearch.results) {
              console.log(`File Search Tool Call fileId: ${file.fileId}`);
              console.log(`File Search Tool Call fileName: ${file.fileName}`);
              console.log(`File Search Tool Call score: ${file.score}`);
            }
          }
        }
        if (isOutputOfType<RunStepBingGroundingToolCall>(toolCall, "bing_grounding")) {
          const bingGrounding = toolCall.bingGrounding;
          if (bingGrounding) {
            console.log(`Bing Grounding Tool Call: ${bingGrounding}`);
          }
        }

        if (isOutputOfType<RunStepAzureAISearchToolCall>(toolCall, "azure_ai_search")) {
          {
            const azureAISearch = toolCall.azureAISearch;
            if (azureAISearch) {
              console.log(`Azure AI Search Tool Call input: ${azureAISearch.input}`);
              console.log(`Azure AI Search Tool Call output: ${azureAISearch.output}`);
            }
          }
        }

        if (isOutputOfType<RunStepSharepointToolCall>(toolCall, "sharepoint_grounding")) {
          const sharePoint = toolCall.sharePoint;
          if (sharePoint) {
            console.log(`SharePoint Tool Call: ${sharePoint}`);
          }
        }

        if (isOutputOfType<RunStepMicrosoftFabricToolCall>(toolCall, "fabric_dataagent")) {
          const microsoftFabric = toolCall.microsoftFabric;
          if (microsoftFabric) {
            console.log(`Microsoft Fabric Tool Call: ${microsoftFabric}`);
          }
        }
        if (isOutputOfType<RunStepBingCustomSearchToolCall>(toolCall, "bing_custom_search")) {
          const bingCustomSearch = toolCall.bingCustomSearch;
          if (bingCustomSearch) {
            console.log(`Bing Custom Search Tool Call: ${bingCustomSearch}`);
          }
        }

        if (isOutputOfType<RunStepFunctionToolCall>(toolCall, "function")) {
          const func = toolCall.function;
          if (func) {
            console.log(`Function Tool Call name: ${func.name}`);
            console.log(`Function Tool Call arguments: ${JSON.stringify(func.arguments, null, 2)}`);
          }
        }

        if (isOutputOfType<RunStepOpenAPIToolCall>(toolCall, "openapi")) {
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
