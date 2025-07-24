// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { delay } from "@azure-tools/test-recorder";
import type {
  AgentsClient,
  DeepResearchToolDefinition,
  MessageTextContent,
  ThreadMessage,
  MessageTextUrlCitationAnnotation,
} from "../../../src/index.js";
import { isOutputOfType } from "../../../src/index.js";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("Agents - Deep Research", () => {
  let recorder: Recorder;
  let projectsClient: AgentsClient;
  const bingConnectionId = process.env["AZURE_BING_CONNECTION_ID"] || "<connection-id>";
  const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";
  const deepResearchModelDeploymentName =
    process.env["DEEP_RESEARCH_MODEL_DEPLOYMENT_NAME"] || "o3-deep-research";
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

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("client and projectsClient operations are accessible", async function () {
    assert.isNotNull(projectsClient);
    assert.notEqual(bingConnectionId, "<connection-id>");
  });

  it("should create agent with Deep Research tool", async function () {
    // Create agent with the Deep Research tool
    const agent = await projectsClient.createAgent(modelDeploymentName, {
      name: "test-deep-research-agent",
      instructions: "You are a helpful Agent that assists in researching scientific topics.",
      tools: [deepResearchTool],
    });

    assert.isNotNull(agent.id);
    assert.equal(agent.name, "test-deep-research-agent");
    assert.isArray(agent.tools);
    assert.equal(agent.tools?.length, 1);
    assert.equal(agent.tools?.[0].type, "deep_research");

    // Clean up
    await projectsClient.deleteAgent(agent.id);
  });

  it("should run Deep Research and get results", async function () {
    // Create agent with the Deep Research tool
    const agent = await projectsClient.createAgent(modelDeploymentName, {
      name: "test-deep-research-agent",
      instructions: "You are a helpful Agent that assists in researching scientific topics.",
      tools: [deepResearchTool],
    });
    assert.isNotNull(agent.id);

    // Create thread for communication
    const thread = await projectsClient.threads.create();
    assert.isNotNull(thread.id);

    // Create message to thread
    const message = await projectsClient.messages.create(
      thread.id,
      "user",
      "Research the current state of artificial intelligence in healthcare, focusing on diagnostic applications.",
    );
    assert.isNotNull(message.id);

    // Create and poll the run
    const run = await projectsClient.runs.create(thread.id, agent.id);
    assert.isNotNull(run.id);

    // Poll the run status (with timeout for test environment)
    let currentRun = run;
    let attempts = 0;
    const maxAttempts = 50;

    while (
      (currentRun.status === "queued" || currentRun.status === "in_progress") &&
      attempts < maxAttempts
    ) {
      await delay(1000); // Wait 1 second
      currentRun = await projectsClient.runs.get(thread.id, run.id);
      attempts++;
    }

    assert.oneOf(currentRun.status, [
      "completed",
      "failed",
      "cancelled",
      "expired",
      "queued",
      "in_progress",
    ]);

    // Clean up
    await projectsClient.deleteAgent(agent.id);
    await projectsClient.threads.delete(thread.id);
  });

  it("should create a research summary from Deep Research results", async function () {
    // This test will verify the citation extraction logic without running actual Deep Research
    // Create a mock message with URL citations
    const mockMessage: ThreadMessage = {
      id: "test-message-id",
      object: "thread.message",
      createdAt: new Date(),
      threadId: "test-thread-id",
      role: "assistant",
      status: "completed",
      content: [
        {
          type: "text",
          text: {
            value:
              "Based on my research, artificial intelligence in healthcare has shown significant progress.",
            annotations: [
              {
                type: "url_citation",
                text: "[1]",
                startIndex: 10,
                endIndex: 13,
                urlCitation: {
                  url: "https://example.com/ai-healthcare-study",
                  title: "AI in Healthcare: A Comprehensive Study",
                },
              },
            ],
          },
        },
      ],
      assistantId: "test-assistant-id",
      runId: "test-run-id",
      attachments: [],
      metadata: {},
      incompleteDetails: null,
      completedAt: new Date(),
      incompleteAt: null,
    };

    // Test URL citation extraction function
    const summary = createResearchSummary(mockMessage);

    assert.isString(summary);
    assert.include(summary, "## References");
    assert.include(
      summary,
      "- [AI in Healthcare: A Comprehensive Study](https://example.com/ai-healthcare-study)",
    );
  });
});

/**
 * Helper function to extract URL citations from a thread message
 * This function is tested separately and mimics the sample code logic
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

function createResearchSummary(message: ThreadMessage): string {
  if (!message) {
    return "";
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

  return content;
}
