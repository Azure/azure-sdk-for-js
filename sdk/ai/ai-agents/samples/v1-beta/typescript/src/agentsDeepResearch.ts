// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations with the Deep Research tool
 * from the Azure Agents service. Deep Research issues external Bing Search queries
 * and invokes an LLM, so each run can take several minutes to complete.
 *
 * For more information see the Deep Research Tool document: https://aka.ms/agents-deep-research
 *
 * @summary demonstrates how to use agent operations with the Deep Research tool.
 */

import type {
  MessageTextContent,
  ThreadMessage,
  DeepResearchToolDefinition,
  MessageTextUrlCitationAnnotation,
} from "@azure/ai-agents";
import { AgentsClient, isOutputOfType } from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";

import "dotenv/config";

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";
const deepResearchModelDeploymentName =
  process.env["DEEP_RESEARCH_MODEL_DEPLOYMENT_NAME"] || "gpt-4o";
const bingConnectionId = process.env["AZURE_BING_CONNECTION_ID"] || "<connection-id>";

/**
 * Fetches and prints new agent response from the thread
 * @param threadId - The thread ID
 * @param client - The AgentsClient instance
 * @param lastMessageId - The ID of the last message processed
 * @returns The ID of the newest message, or undefined if no new message
 */
async function fetchAndPrintNewAgentResponse(
  threadId: string,
  client: AgentsClient,
  lastMessageId?: string,
): Promise<string | undefined> {
  const messages = client.messages.list(threadId);
  let latestMessage: ThreadMessage | undefined;
  for await (const msg of messages) {
    if (msg.role === "assistant") {
      latestMessage = msg;
      break;
    }
  }

  if (!latestMessage || latestMessage.id === lastMessageId) {
    return lastMessageId;
  }

  console.log("\nAgent response:");

  // Print text content
  for (const content of latestMessage.content) {
    if (isOutputOfType<MessageTextContent>(content, "text")) {
      console.log(content.text.value);
    }
  }

  const urlCitations = getUrlCitationsFromMessage(latestMessage);
  if (urlCitations.length > 0) {
    console.log("\nURL Citations:");
    for (const citation of urlCitations) {
      console.log(`URL Citations: [${citation.title}](${citation.url})`);
    }
  }

  return latestMessage.id;
}

/**
 * Extracts URL citations from a thread message
 * @param message - The thread message
 * @returns Array of URL citations
 */
function getUrlCitationsFromMessage(message: ThreadMessage): Array<{ title: string; url: string }> {
  const citations: Array<{ title: string; url: string }> = [];

  for (const content of message.content) {
    if (isOutputOfType<MessageTextContent>(content, "text")) {
      for (const annotation of content.text.annotations) {
        if (isOutputOfType<MessageTextUrlCitationAnnotation>(annotation, "url_citation")) {
          citations.push({
            title: annotation.urlCitation.title || annotation.urlCitation.url,
            url: annotation.urlCitation.url,
          });
        }
      }
    }
  }

  return citations;
}

/**
 * Creates a research summary from the final message
 * @param message - The thread message containing the research results
 * @param filepath - The file path to write the summary to
 */
function createResearchSummary(message: ThreadMessage): void {
  if (!message) {
    console.log("No message content provided, cannot create research summary.");
    return;
  }

  let content = "";

  // Write text summary
  const textSummaries: string[] = [];
  for (const contentItem of message.content) {
    if (isOutputOfType<MessageTextContent>(contentItem, "text")) {
      textSummaries.push(contentItem.text.value.trim());
    }
  }
  content += textSummaries.join("\n\n");

  // Write unique URL citations, if present
  const urlCitations = getUrlCitationsFromMessage(message);
  if (urlCitations.length > 0) {
    content += "\n\n## References\n";
    const seenUrls = new Set<string>();
    for (const citation of urlCitations) {
      if (!seenUrls.has(citation.url)) {
        content += `- [${citation.title}](${citation.url})\n`;
        seenUrls.add(citation.url);
      }
    }
  }

  // writeFileSync(filepath, content, "utf-8");
  console.log(`Research summary created:\n${content}`);
  // console.log(`Research summary written to '${filepath}'.`);
}

export async function main(): Promise<void> {
  // Create an Azure AI Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());

  // Create Deep Research tool definition
  const deepResearchTool: DeepResearchToolDefinition = {
    type: "deep_research",
    deepResearch: {
      model: deepResearchModelDeploymentName,
      bingGroundingConnections: [
        {
          connectionId: bingConnectionId,
        },
      ],
    },
  };

  // Create agent with the Deep Research tool
  const agent = await client.createAgent(modelDeploymentName, {
    name: "my-agent",
    instructions: "You are a helpful Agent that assists in researching scientific topics.",
    tools: [deepResearchTool],
  });
  console.log(`Created agent, ID: ${agent.id}`);

  // Create thread for communication
  const thread = await client.threads.create();
  console.log(`Created thread, ID: ${thread.id}`);

  // Create message to thread
  const message = await client.messages.create(
    thread.id,
    "user",
    "Research the current scientific understanding of orca intelligence and communication, focusing on recent (preferably past 5 years) peer-reviewed studies, comparisons with other intelligent species such as dolphins or primates, specific cognitive abilities like problem-solving and social learning, and detailed analyses of vocal and non-vocal communication systems—please include notable authors or landmark papers if applicable.",
  );
  console.log(`Created message, ID: ${message.id}`);

  console.log("Start processing the message... this may take a few minutes to finish. Be patient!");

  // Create and poll the run
  const run = await client.runs.create(thread.id, agent.id);
  let lastMessageId: string | undefined;

  // Poll the run status
  let currentRun = run;
  while (currentRun.status === "queued" || currentRun.status === "in_progress") {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
    currentRun = await client.runs.get(thread.id, run.id);

    lastMessageId = await fetchAndPrintNewAgentResponse(thread.id, client, lastMessageId);
    console.log(`Run status: ${currentRun.status}`);
  }

  console.log(`Run finished with status: ${currentRun.status}, ID: ${currentRun.id}`);

  if (currentRun.status === "failed") {
    console.log(`Run failed: ${currentRun.lastError}`);
  }

  // Fetch the final message from the agent and create a research summary
  const messages = client.messages.list(thread.id, { order: "desc", limit: 10 });
  let finalMessage: ThreadMessage | undefined;

  for await (const msg of messages) {
    if (msg.role === "assistant") {
      finalMessage = msg;
      break;
    }
  }

  if (finalMessage) {
    createResearchSummary(finalMessage);
  }

  // Clean-up and delete the agent once the run is finished
  await client.deleteAgent(agent.id);
  console.log("Deleted agent");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
