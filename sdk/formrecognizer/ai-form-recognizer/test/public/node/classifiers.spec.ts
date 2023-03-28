// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { matrix } from "@azure/test-utils";

import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";

import {
  createRecorder,
  getRandomNumber,
  makeCredential,
  testPollingOptions,
} from "../../utils/recordedClients";
import { DocumentClassifierDetails } from "../../../src/generated";
import { DocumentModelAdministrationClient } from "../../../src/documentModelAdministrationClient";
import { DocumentAnalysisClient } from "../../../src/documentAnalysisClient";
import path from "path";
import fs from "fs";
import { ASSET_PATH, makeTestUrl } from "../../utils/etc";

const endpoint = (): string => assertEnvironmentVariable("FORM_RECOGNIZER_ENDPOINT");
// const containerSasUrl = (): string =>
//   assertEnvironmentVariable("FORM_RECOGNIZER_TRAINING_CONTAINER_SAS_URL");

/*
 * Run the entire battery of tests using both AAD and API Key.
 *
 * Note: Neural builds are currently disabled, as they take prohibitively long to complete for the live testing
 * environment.
 */
matrix([[/* true, */ false]] as const, async (useAad) => {
  describe.only(`[${useAad ? "AAD" : "API Key"}] document classifiers`, () => {
    let recorder: Recorder;
    let client: DocumentAnalysisClient;

    beforeEach(async function (this: Context) {
      recorder = await createRecorder(this.currentTest);
      await recorder.setMatcher("BodilessMatcher");
      client = new DocumentAnalysisClient(
        endpoint(),
        makeCredential(useAad),
        recorder.configureClientOptions({})
      );
    });

    afterEach(async function () {
      await recorder.stop();
    });

    let _classifier: DocumentClassifierDetails;
    let _classifierId: string;

    const customClassifierDescription = "Custom classifier description";

    // We only want to create the model once, but because of the recorder's
    // precedence, we have to create it in a test, so one test will end up
    // recording the entire creation and the other tests will still be able
    // to use it.
    async function requireClassifier(): Promise<DocumentClassifierDetails> {
      if (!_classifier) {
        const trainingClient = new DocumentModelAdministrationClient(
          endpoint(),
          makeCredential(useAad),
          recorder.configureClientOptions({})
        );
        _classifierId = recorder.variable(
          "customClassifierId",
          `customClassifier${getRandomNumber()}`
        );

        const poller = await trainingClient.beginBuildDocumentClassifier(
          _classifierId,
          {
            // TODO: use a different container for each test
            foo: {
              azureBlobSource: {
                containerUrl: assertEnvironmentVariable(
                  "FORM_RECOGNIZER_SELECTION_MARK_STORAGE_CONTAINER_SAS_URL"
                ),
              },
            },
            bar: {
              azureBlobSource: {
                containerUrl: assertEnvironmentVariable(
                  "FORM_RECOGNIZER_SELECTION_MARK_STORAGE_CONTAINER_SAS_URL"
                ),
              },
            },
          },
          { ...testPollingOptions, description: customClassifierDescription }
        );

        _classifier = await poller.pollUntilDone();

        assert.ok(_classifier.classifierId);
      }

      return _classifier;
    }

    it("build classifier", async function (this: Context) {
      const classifier = await requireClassifier();

      assert.containsAllKeys(classifier.docTypes, ["foo", "bar"]);
      assert.equal(classifier.classifierId, _classifierId);
      assert.equal(classifier.description, customClassifierDescription);
    });

    it("analyze from PNG file stream", async function (this: Context) {
      const filePath = path.join(ASSET_PATH, "forms", "Invoice_1.pdf");
      const stream = fs.createReadStream(filePath);

      const { classifierId } = await requireClassifier();

      const poller = await client.beginClassifyDocument(classifierId, stream, testPollingOptions);

      const result = await poller.pollUntilDone();

      assert.oneOf(result.documents?.[0].docType, ["foo", "bar"]);
    });

    it("analyze from PNG file URL", async function (this: Context) {
      const url = makeTestUrl("/Invoice_1.pdf");

      const { classifierId } = await requireClassifier();

      const poller = await client.beginClassifyDocumentFromUrl(
        classifierId,
        url,
        testPollingOptions
      );

      const result = await poller.pollUntilDone();

      assert.oneOf(result.documents?.[0].docType, ["foo", "bar"]);
    });
  });
});
