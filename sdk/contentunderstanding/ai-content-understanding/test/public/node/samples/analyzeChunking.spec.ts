// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Sample test for analyzeChunking.ts - Create an analyzer with semantic
 * chunking, run it, and inspect the returned `DocumentContent.chunks`.
 *
 * Preview-only feature: `ContentAnalyzerConfig.chunkingStrategy` and
 * `DocumentContent.chunks` only exist on the `2026-06-01-preview` surface.
 * Wrapped in `forEachServiceVersion({ previewOnly: true })` so the GA cell is
 * skipped.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import type {
  ContentAnalyzer,
  ContentUnderstandingClient,
  DocumentContent,
  SemanticChunkingStrategy,
} from "../../../../src/index.js";
import { assert, beforeEach, afterEach, it } from "vitest";
import {
  createRecorder,
  createClient,
  getSampleFilePath,
  testPollingOptions,
} from "./sampleTestUtils.js";
import { forEachServiceVersion, previewOnly } from "../../../utils/multiVersion.js";
import fs from "node:fs";

forEachServiceVersion("Sample: analyzeChunking", previewOnly, ({ apiVersion, modelProfile }) => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = createClient(recorder, apiVersion);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should return document chunks from an analyzer with SemanticChunkingStrategy", async () => {
    const filePath = getSampleFilePath("sample_invoice.pdf");
    if (!fs.existsSync(filePath)) {
      console.warn(`Sample file not found at ${filePath}, skipping test`);
      return;
    }

    const analyzerId = recorder.variable(
      "semanticChunkingAnalyzerId",
      `semantic_chunking_${Math.floor(Date.now() / 1000)}`,
    );
    const chunkingStrategy: SemanticChunkingStrategy = {
      kind: "semantic",
      maxTokens: 300,
    };
    const analyzer: ContentAnalyzer = {
      baseAnalyzerId: "prebuilt-document",
      description: "Analyzer with semantic chunking",
      config: {
        returnDetails: true,
        enableLayout: true,
        chunkingStrategy,
      },
      models: {
        completion:
          process.env["CONTENTUNDERSTANDING_COMPLETION_MODEL"] ?? modelProfile.completionModel,
      },
    } as unknown as ContentAnalyzer;

    try {
      const createPoller = client.createAnalyzer(analyzerId, analyzer, testPollingOptions);
      await createPoller.pollUntilDone();

      const bytes = fs.readFileSync(filePath);
      const analyzePoller = client.analyzeBinary(analyzerId, bytes, testPollingOptions);
      const result = await analyzePoller.pollUntilDone();

      const doc = result.contents.find((c) => c.kind === "document") as DocumentContent | undefined;
      assert.ok(doc, "Result should contain document content");

      // fixture produces multiple semantic chunks under maxTokens=300, and specific
      // strings ("INVOICE", "CONTOSO", "Consulting Services") appear predictably
      // in the chunk markdowns.
      const createdAnalyzer = await client.getAnalyzer(analyzerId);
      assert.ok(createdAnalyzer.config, "Analyzer config should not be null");
      assert.ok(
        createdAnalyzer.config?.chunkingStrategy,
        "Chunking strategy should be set on the analyzer",
      );
      assert.strictEqual(
        (createdAnalyzer.config?.chunkingStrategy as SemanticChunkingStrategy).kind,
        "semantic",
        "Chunking strategy kind should be 'semantic'",
      );
      assert.strictEqual(
        (createdAnalyzer.config?.chunkingStrategy as SemanticChunkingStrategy).maxTokens,
        300,
        "Semantic chunk maxTokens should be 300",
      );

      const chunks = doc.chunks ?? [];
      assert.ok(
        chunks.length >= 2,
        `Invoice should produce at least 2 semantic chunks, got ${chunks.length}`,
      );

      const chunkMarkdowns = chunks.map((chunk) =>
        (chunk.spans ?? [])
          .map((span) => (doc.markdown ?? "").substring(span.offset, span.offset + span.length))
          .join("\n"),
      );
      assert.strictEqual(
        chunkMarkdowns.length,
        chunks.length,
        "Rendered chunk markdown count should match chunks.length",
      );

      // sample_invoice.pdf typically splits header/party info, line items, and totals
      // into separate chunks.
      assert.ok(
        chunkMarkdowns[0].includes("INVOICE"),
        `First chunk should contain 'INVOICE', got: ${chunkMarkdowns[0].substring(0, 100)}`,
      );
      assert.ok(
        chunkMarkdowns[0].includes("CONTOSO"),
        `First chunk should contain 'CONTOSO', got: ${chunkMarkdowns[0].substring(0, 100)}`,
      );
      assert.ok(
        chunkMarkdowns.join("\n").includes("Consulting Services"),
        "Joined chunks should contain 'Consulting Services'",
      );
      const lastChunk = chunkMarkdowns[chunkMarkdowns.length - 1];
      assert.ok(
        lastChunk.includes("AMOUNT DUE") || lastChunk.includes("THANK YOU"),
        `Last chunk should contain 'AMOUNT DUE' or 'THANK YOU', got: ${lastChunk.substring(0, 100)}`,
      );

      for (const chunk of chunks) {
        assert.ok(chunk.spans && chunk.spans.length > 0, "Each chunk should have spans");
        for (const span of chunk.spans) {
          assert.ok(span.length > 0, "Each chunk span length should be positive");
        }
      }
    } finally {
      await client.deleteAnalyzer(analyzerId);
    }
  });
});
