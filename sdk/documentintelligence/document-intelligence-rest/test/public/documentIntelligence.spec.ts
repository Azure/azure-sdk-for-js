// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { createRecorder } from "./utils/recorderUtils";
import { Context } from "mocha";
import DocumentIntelligence, {
  AnalyzeResultOperationOutput,
  DocumentClassifierDetailsOutput,
  DocumentIntelligenceClient,
  getLongRunningPoller,
  isUnexpected,
} from "../../src";
import assert from "assert";
import { getRandomNumber } from "./utils/utils";
const containerSasUrl = (): string =>
  assertEnvironmentVariable("FORM_RECOGNIZER_TRAINING_CONTAINER_SAS_URL");

describe("DocumentIntelligenceClient", () => {
  let recorder: Recorder;
  let client: DocumentIntelligenceClient;
  const options = { apiVersion: "2023-07-31" };
  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = DocumentIntelligence(
      assertEnvironmentVariable("FORM_RECOGNIZER_ENDPOINT"),
      { key: assertEnvironmentVariable("FORM_RECOGNIZER_API_KEY") },
      recorder.configureClientOptions(options)
    );
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("API Key works - getInfo", async function () {
    const response = await client.path("/info").get()
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    assert.strictEqual(
      (response.body).customDocumentModels.limit,
      20000,
      "expected customDocumentModels limit should be 20000"
    );
  });

  it("AAD works - getInfo", async function () {
    client = DocumentIntelligence(
      assertEnvironmentVariable("FORM_RECOGNIZER_ENDPOINT"),
      createTestCredential(),
      recorder.configureClientOptions(options)
    );
    const response = await client.path("/info").get()
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    assert.strictEqual(
      response.body.customDocumentModels.limit,
      20000,
      "expected customDocumentModels limit should be 20000"
    );
  });

  it("documentModels get", async function () {
    const response = await client.path("/documentModels").get();
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    assert.strictEqual(
      response.body.value[0].apiVersion,
      options.apiVersion,
      "expected apiVersion to match"
    );
  });

  it("documentModels analyze prebuilt-businessCard", async function () {
    const initialResponse = await client
      .path("/documentModels/{modelId}:analyze", "prebuilt-businessCard")
      .post({
        contentType: "application/json",
        body: {
          urlSource:
            "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/businessCard/business-card-english.jpg",
        },
        queryParameters: { locale: "en-IN" },
      });
      // add a test for stream

    if (isUnexpected(initialResponse)) {
      throw initialResponse.body.error;
    }

    const poller = getLongRunningPoller(client, initialResponse);
    const result = (await (await poller).pollUntilDone()).body as AnalyzeResultOperationOutput;
    assert.strictEqual(
      result.analyzeResult?.apiVersion,
      options.apiVersion,
      "expected apiVersion to match"
    );
    assert.strictEqual(
      result.analyzeResult?.content,
      `Dr. Avery Smith\nSenior Researcher\nCloud & Al Department\navery.smith@contoso.com\nhttps://www.contoso.com/\nmob: +44 (0) 7911 123456\ntel: +44 (0) 20 9876 5432\nfax: +44 (0) 20 6789 2345\nContoso\n2 Kingdom Street\nPaddington, London, W2 6BD`,
      "expected content to match"
    );
    assert.strictEqual(
      result.analyzeResult?.documents?.[0].docType,
      "businessCard",
      "expected docType to be businessCard"
    );
  });

  it("documentClassifiers build", async function () {
    const initialResponse = await client.path("/documentClassifiers:build").post({
      body: {
        classifierId: recorder.variable(
          "customClassifierId",
          `customClassifier${getRandomNumber()}`
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
          }
        }
      }
    })

    if (isUnexpected(initialResponse)) {
      throw initialResponse.body.error;
    }
    const poller = getLongRunningPoller(client, initialResponse);
    const result = (await (await poller).pollUntilDone()).body as DocumentClassifierDetailsOutput;
    assert.strictEqual(
      result.classifierId,
      recorder.variable("customClassifierId"),
      "expected classifierId to match"
    );
    assert.strictEqual(
      result.apiVersion,
      options.apiVersion,
      "expected apiVersion to match"
    );
  });

  // it("classify from PNG file URL", async function (this: Context) {
  //   const url = makeTestUrl("/Invoice_1.pdf");

  //   const { classifierId } = await requireClassifier();

  //   const poller = await client.beginClassifyDocumentFromUrl(
  //     classifierId,
  //     url,
  //     testPollingOptions
  //   );

  //   const result = await poller.pollUntilDone();

  //   assert.oneOf(result.documents?.[0].docType, ["foo", "bar"]);
  // });
});
