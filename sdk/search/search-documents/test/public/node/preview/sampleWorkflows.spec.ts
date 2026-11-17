// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeEach, describe, it } from "vitest";
import { assertEnvironmentVariable, Recorder } from "@azure-tools/test-recorder";
import { createSampleRecorderStartOptions } from "../../utils/recordedClient.js";
import { runRecordedSample } from "../../utils/recordedSamples.js";

describe("November preview sample workflows", { timeout: 720_000 }, () => {
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(
      createSampleRecorderStartOptions(
        ctx.task.name.includes("GPT-6") ? "gpt-6-sol" : "gpt-5-mini",
      ),
    );
  });

  afterEach(async () => {
    await recorder?.stop();
  });

  it("runs File upload and replacement with serialized LRO resume and operation diagnostics", async () => {
    await runRecordedSample("knowledgeSourceFileLro", recorder);
  });

  it("runs both persisted KB tools without leaking references across their scopes", async () => {
    await runRecordedSample("knowledgeBaseTools", recorder);
  });

  it("runs direct agentic search and persisted Microsoft Retriever 1 retrieval", async () => {
    await runRecordedSample("agenticSearch", recorder);
  });

  it("runs direct graph planning and provenance against seeded assertions", async () => {
    await runRecordedSample("knowledgeGraphRetrieval", recorder);
  });

  it("runs populated Topic Graph modes and stored/runtime KB retrieval", async () => {
    await runRecordedSample("topicGraphDiverseSearch", recorder);
  });

  it("runs seeded random scoring searches", async () => {
    await runRecordedSample("randomScoring", recorder);
  });

  it("runs compatible embedding, query vectorization and grounded chat retrieval", async () => {
    await runRecordedSample("knowledgeBaseModelProviders", recorder, {
      KNOWLEDGE_MODEL_PROVIDER: "openAICompatible",
    });
  });

  it("runs native GPT-6 grounded knowledge-base retrieval", async () => {
    await runRecordedSample("knowledgeBaseModelProviders", recorder, {
      KNOWLEDGE_MODEL_PROVIDER: "azureOpenAI",
      AZURE_OPENAI_CHAT_DEPLOYMENT_NAME: assertEnvironmentVariable(
        "AZURE_OPENAI_GPT6_DEPLOYMENT_NAME",
      ),
      AZURE_OPENAI_CHAT_MODEL_NAME: assertEnvironmentVariable("AZURE_OPENAI_GPT6_MODEL_NAME"),
    });
  });

  it("runs automatic country hints and retrieves a newly indexed facet after its TTL", async () => {
    await runRecordedSample("queryHintsAutoConfiguration", recorder, {
      QUERY_HINT_REFRESH: "true",
    });
  });

  it("runs inline graph extraction, filtered provenance and hydrated KB source text", async () => {
    await runRecordedSample("knowledgeSourceGraphExtraction", recorder);
  });
});
