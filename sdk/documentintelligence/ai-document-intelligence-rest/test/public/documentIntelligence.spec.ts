// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { createRecorder } from "./utils/recorderUtils.js";
import DocumentIntelligence from "../../src/documentIntelligence.js";
import { assert, describe, beforeEach, afterEach, it } from "vitest";
import { getRandomNumber, containerSasUrl } from "./utils/utils.js";
import { DocumentIntelligenceClient } from "../../src/clientDefinitions.js";
import {
  DocumentClassifierBuildOperationDetailsOutput,
  getLongRunningPoller,
  isUnexpected,
} from "../../src/index.js";

describe("DocumentIntelligenceClient", () => {
  let recorder: Recorder;
  let client: DocumentIntelligenceClient;
  beforeEach(async function (context) {
    recorder = await createRecorder(context);
    await recorder.setMatcher("BodilessMatcher");
    client = DocumentIntelligence(
      assertEnvironmentVariable("DOCUMENT_INTELLIGENCE_ENDPOINT"),
      { key: assertEnvironmentVariable("DOCUMENT_INTELLIGENCE_API_KEY") },
      recorder.configureClientOptions({}),
    );
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("API Key works - getInfo", async function () {
    const response = await client.path("/info").get();
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    assert.strictEqual(
      response.body.customDocumentModels.limit,
      20000,
      "expected customDocumentModels limit should be 20000",
    );
  });

  it.skip("AAD works - getInfo", async function () {
    client = DocumentIntelligence(
      assertEnvironmentVariable("DOCUMENT_INTELLIGENCE_ENDPOINT"),
      createTestCredential(),
      recorder.configureClientOptions({}),
    );
    const response = await client.path("/info").get();
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    assert.strictEqual(
      response.body.customDocumentModels.limit,
      20000,
      "expected customDocumentModels limit should be 20000",
    );
  });

  it.skip("documentClassifiers build", async function () {
    const initialResponse = await client.path("/documentClassifiers:build").post({
      body: {
        classifierId: recorder.variable(
          "customClassifierId",
          `customClassifier${getRandomNumber()}`,
        ),
        description: "Custom classifier description",
        docTypes: {
          foo: {
            azureBlobSource: {
              containerUrl: containerSasUrl(),
            },
          },
          bar: {
            // Adding source kind fails with 400 Invalid Argument
            azureBlobSource: {
              containerUrl: containerSasUrl(),
            },
          },
        },
      },
    });

    if (isUnexpected(initialResponse)) {
      throw initialResponse.body.error;
    }
    const poller = getLongRunningPoller(client, initialResponse);
    const response = <DocumentClassifierBuildOperationDetailsOutput>(
      (await (await poller).pollUntilDone()).body
    );
    assert.strictEqual(
      response.result?.classifierId,
      recorder.variable("customClassifierId"),
      "expected classifierId to match",
    );
  });
});
