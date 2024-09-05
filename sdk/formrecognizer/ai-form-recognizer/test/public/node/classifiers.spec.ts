// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "chai";
import { Context } from "mocha";

import { matrix } from "@azure-tools/test-utils";

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
const containerSasUrl = (): string =>
  assertEnvironmentVariable("FORM_RECOGNIZER_TRAINING_CONTAINER_SAS_URL");

/*
 * Run the entire battery of tests using both AAD and API Key.
 *
 * Note: Neural builds are currently disabled, as they take prohibitively long to complete for the live testing
 * environment.
 */
matrix([[true, false]] as const, async (useAad) => {
  describe(`[${useAad ? "AAD" : "API Key"}] document classifiers`, () => {
    let recorder: Recorder;
    let client: DocumentAnalysisClient;

    beforeEach(async function (this: Context) {
      recorder = await createRecorder(this.currentTest);
      await recorder.setMatcher("BodilessMatcher");
      client = new DocumentAnalysisClient(
        endpoint(),
        makeCredential(useAad),
        recorder.configureClientOptions({}),
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
          recorder.configureClientOptions({}),
        );
        _classifierId = recorder.variable(
          "customClassifierId",
          `customClassifier${getRandomNumber()}`,
        );

        const poller = await trainingClient.beginBuildDocumentClassifier(
          _classifierId,
          {
            // TODO: use a different container for each test
            foo: {
              azureBlobSource: {
                containerUrl: containerSasUrl(),
              },
            },
            bar: {
              azureBlobSource: {
                containerUrl: containerSasUrl(),
              },
            },
          },
          { ...testPollingOptions, description: customClassifierDescription },
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

      assert.isNotEmpty(result.documents);
      assert.oneOf(result.documents![0].docType, ["foo", "bar"]);

      // Additionally check that the pages aren't empty and that there are some common fields set
      assert.isNotEmpty(result.pages);
      assert.ok(result.pages![0].pageNumber);
      assert.isDefined(result.pages![0].angle);
      assert.ok(result.pages![0].height);
      assert.ok(result.pages![0].width);
      assert.ok(result.pages![0].unit);
    });

    it("analyze from PNG file URL", async function (this: Context) {
      const url = makeTestUrl("/Invoice_1.pdf");

      const { classifierId } = await requireClassifier();

      const poller = await client.beginClassifyDocumentFromUrl(
        classifierId,
        url,
        testPollingOptions,
      );

      const result = await poller.pollUntilDone();

      assert.oneOf(result.documents?.[0].docType, ["foo", "bar"]);
    });

    it("get & delete classifiers from the account", async function () {
      if (useAad) {
        // TODO: AAD is not implemented for this operation in the service.
        this.skip();
        return;
      }

      const trainingClient = new DocumentModelAdministrationClient(
        endpoint(),
        makeCredential(useAad),
        recorder.configureClientOptions({}),
      );
      await trainingClient.getDocumentClassifier(_classifierId);

      // Delete the custom classifier we created
      if (_classifierId) {
        await trainingClient.deleteDocumentClassifier(_classifierId);
      }

      // Try to get the classifier and assert that it's gone
      await assert.isRejected(
        (async function () {
          await trainingClient.getDocumentClassifier(_classifierId);
        })(),
      );
    });
  });
});
