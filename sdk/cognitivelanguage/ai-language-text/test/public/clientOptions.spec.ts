// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context, Suite } from "mocha";
import { createClient, startRecorder } from "./utils/recordedClient";
import { FullOperationResponse } from "@azure/core-client";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "@azure-tools/test-utils";

describe(`[API Key] TextAnalysisClient`, function (this: Suite) {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this.currentTest);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  describe("Client options", async function () {
    it("service version", async function () {
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
