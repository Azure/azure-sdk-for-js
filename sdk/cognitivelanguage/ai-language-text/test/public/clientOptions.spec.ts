// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createClient, startRecorder } from "./utils/recordedClient.js";
import type { FullOperationResponse } from "@azure/core-client";
import type { Recorder } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe(`[API Key] TextAnalysisClient`, () => {
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = await startRecorder(ctx);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  describe("Client options", async () => {
    it("service version", async () => {
      const docs = [
        {
          id: "1",
          language: "en",
          text: "Microsoft was founded by Bill Gates and Paul Allen",
        },
        {
          id: "2",
          language: "es",
          text: "Microsoft fue fundado por Bill Gates y Paul Allen",
        },
      ];
      for (const serviceVersion of ["2022-04-01-preview", "2022-05-01"]) {
        const clientWithServiceVersion = createClient("APIKey", {
          recorder,
          clientOptions: {
            serviceVersion,
          },
        });
        let rawResponse: FullOperationResponse;
        await clientWithServiceVersion.analyze("EntityRecognition", docs, {
          onResponse: (currentResponse) => {
            if (rawResponse === undefined) rawResponse = currentResponse;
          },
        });
        if (rawResponse! === undefined) {
          assert.fail(`rawResponse wasn't assigned`);
        }
        assert.include(rawResponse.request.url, serviceVersion);
      }
    });
  });
});
