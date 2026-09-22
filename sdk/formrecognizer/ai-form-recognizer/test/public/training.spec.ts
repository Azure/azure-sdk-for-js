// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getYieldedValue } from "@azure-tools/test-utils-vitest";
import type { Recorder } from "@azure-tools/test-recorder";
import {
  authMethods,
  createRecorder,
  getRandomNumber,
  makeCredential,
  testPollingOptions,
} from "../utils/recordedClients.js";
import type { DocumentModelDetails } from "../../src/index.js";
import { DocumentAnalysisClient, DocumentModelAdministrationClient } from "../../src/index.js";
import { DocumentModelBuildMode } from "../../src/options/BuildModelOptions.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import {
  getEndpoint,
  getTestingContainerSasUrl,
  getTrainingContainerSasUrl,
} from "../utils/injectables.js";

const containerSasUrl = (): string => getTrainingContainerSasUrl();

const buildMode = DocumentModelBuildMode.Template;
/*
 * Run the entire battery of tests using both AAD and API Key.
 *
 * Note: Neural builds are currently disabled, as they take prohibitively long to complete for the live testing
 * environment.
 */
describe.each(authMethods)(`[%s] model management`, (authMethod) => {
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  // #region Model Training

  /*
   * All test steps that are related to training and validating
   * models from source documents are encapsulated in this
   * "describe" block
   */

  describe("model build", async () => {
    const allModels: string[] = [];

    let client: DocumentModelAdministrationClient;

    let id = 0;
    function getId(): number {
      return (id += 1);
    }

    beforeEach(async () => {
      // Create a client using the current AAD/API Key configuration
      client = new DocumentModelAdministrationClient(
        getEndpoint(),
        makeCredential(authMethod),
        recorder.configureClientOptions({}),
      );
    });

    describe(`custom model from trainingdata-v3 (${buildMode})`, async () => {
      let _model: DocumentModelDetails;

      let modelId: string;

      // We only want to create the model once, but because of the recorder's
      // precedence, we have to create it in a test, so one test will end up
      // recording the entire creation and the other tests will still be able
      // to use it
      async function requireModel(): Promise<DocumentModelDetails> {
        if (!_model) {
          // Compute a unique name for the model
          modelId = recorder.variable(getId().toString(), `modelName${getRandomNumber()}`);
          const poller = await client.beginBuildDocumentModel(
            modelId,
            containerSasUrl(),
            buildMode,
            testPollingOptions,
          );
          _model = await poller.pollUntilDone();

          assert.equal(_model.modelId, modelId);

          allModels.push(_model.modelId);
        }

        return _model;
      }

      /*
       * Make sure the model training API returns correct information
       * for the model.
       */
      it("validate model training response", async () => {
        const model = await requireModel();

        assert.isDefined(model);
        assert.isDefined(model.modelId);

        assert.isNotEmpty(model.docTypes);
        const submodel = model.docTypes![model.modelId];

        // When training with labels, we will have expectations for the names
        assert.isDefined(submodel.fieldSchema["Signature"]);
      });

      /*
       * Use the model for some simple recognition
       */
      describe("recognition", async () => {
        let recognizerClient: DocumentAnalysisClient;

        beforeEach(() => {
          recognizerClient = new DocumentAnalysisClient(
            getEndpoint(),
            makeCredential(authMethod),
            recorder.configureClientOptions({}),
          );
        });

        it("form from url", async () => {
          const model = await requireModel();

          const testingContainerUrl = getTestingContainerSasUrl();
          const urlParts = testingContainerUrl.split("?");
          const url = `${urlParts[0]}/Form_1.jpg?${urlParts[1]}`;

          const poller = await recognizerClient.beginAnalyzeDocumentFromUrl(
            model.modelId,
            url,
            testPollingOptions,
          );
          const { documents, tables } = await poller.pollUntilDone();

          assert.isNotEmpty(documents);
          const document = documents?.[0];

          assert.isNotEmpty(document?.boundingRegions);

          assert.isNotEmpty(tables);
          const [table] = tables!;

          assert.isDefined(table.boundingRegions?.[0].polygon);
          assert.equal(table.boundingRegions?.[0].pageNumber, 1);

          assert.isDefined(document?.fields);
          assert.isDefined(document?.fields["Merchant"]);
          assert.isDefined(document?.fields["DatedAs"]);
          assert.isDefined(document?.fields["CompanyPhoneNumber"]);
          assert.isDefined(document?.fields["CompanyName"]);
          assert.isDefined(document?.fields["Signature"]);
        });
      });

      it("getModel() verification", async () => {
        const model = await requireModel();

        const modelDetails = await client.getDocumentModel(model.modelId);

        assert.strictEqual(modelDetails.modelId, model.modelId);
        assert.strictEqual(modelDetails.description, model.description);
        assert.isDefined(modelDetails.docTypes);
      });
    });

    /*
     * Check to make sure account information querying works
     */
    describe("account properties", () => {
      it("has trained models and limits", async () => {
        const {
          customDocumentModels: { count, limit },
        } = await client.getResourceDetails();

        // Model count should be >0 because we just trained several models
        assert.isTrue(count > 0);
        assert.isTrue(limit > 0);
      });
    });

    /*
     * These are tests that check that model querying functions as expected.
     * This section also cleans up the models by deleting them.
     */
    describe("model information", async () => {
      it("iterate models in account", async () => {
        const modelsInAccount = [];
        for await (const model of client.listDocumentModels()) {
          assert.isDefined(model.modelId);
          modelsInAccount.push(model.modelId);
        }

        for (const modelId of allModels) {
          assert.isTrue(modelsInAccount.includes(modelId));
        }
      });

      it("old-style iteration with next model info", async () => {
        const iter = client.listDocumentModels();
        const item = getYieldedValue(await iter.next());
        assert.isDefined(item);
        assert.isDefined(item.modelId);
      });

      it("delete models from the account", async () => {
        // Delete all of the models
        await Promise.all(allModels.map((modelId) => client.deleteDocumentModel(modelId)));

        await Promise.all(
          allModels.map(async (modelId) => {
            try {
              await client.getDocumentModel(modelId);
              throw new Error(
                `The service returned model info for ${modelId}, but we thought we had deleted it!`,
              );
            } catch (e: unknown) {
              assert.isTrue((e as Error).message.endsWith(" not found."));
            }
          }),
        );
      });
    });
  });

  // #endregion

  it(`compose model (${buildMode})`, async () => {
    const client = new DocumentModelAdministrationClient(
      getEndpoint(),
      makeCredential(authMethod),
      recorder.configureClientOptions({}),
    );

    // Helper function to train/validate single model
    async function makeModel(prefix: string): Promise<string> {
      const modelId = recorder.variable(prefix, `${prefix}${getRandomNumber()}`);
      const poller = await client.beginBuildDocumentModel(
        modelId,
        containerSasUrl(),
        buildMode,
        testPollingOptions,
      );
      const model = await poller.pollUntilDone();

      assert.equal(model.modelId, modelId);
      assert.equal(model.modelId, modelId);
      assert.isDefined(model.docTypes);

      return model.modelId;
    }

    const componentModelIds = await Promise.all([makeModel("input1"), makeModel("input2")]);

    const modelId = recorder.variable("composedModelName", `composedModelName${getRandomNumber()}`);
    const composePoller = await client.beginComposeDocumentModel(
      modelId,
      componentModelIds,
      testPollingOptions,
    );

    const composedModel = await composePoller.pollUntilDone();
    assert.isDefined(composedModel.modelId);
    assert.equal(composedModel.modelId, modelId);
    assert.isDefined(composedModel.docTypes);

    // Submodels
    assert.equal(Object.entries(composedModel.docTypes ?? {}).length, 2);
  });

  it(`copy model (${buildMode})`, { timeout: 60000 }, async () => {
    // Since this test is isolated, we'll create a fresh set of resources for it

    const trainingClient = new DocumentModelAdministrationClient(
      getEndpoint(),
      makeCredential(authMethod),
      recorder.configureClientOptions({}),
    );
    await recorder.addSanitizers(
      {
        bodyKeySanitizers: [
          {
            jsonPath: "$.accessToken",
            value: "access_token",
          },
        ],
      },
      ["playback", "record"],
    );
    const modelId = recorder.variable("copySource", `copySource${getRandomNumber()}`);

    const trainingPoller = await trainingClient.beginBuildDocumentModel(
      modelId,
      containerSasUrl(),
      buildMode,
      testPollingOptions,
    );
    const sourceModel = await trainingPoller.pollUntilDone();

    assert.equal(sourceModel.modelId, modelId);

    const targetModelId = recorder.variable("copyTarget", `copyTarget${getRandomNumber()}`);
    const targetAuth = await trainingClient.getCopyAuthorization(targetModelId);

    const poller = await trainingClient.beginCopyModelTo(
      sourceModel.modelId,
      targetAuth,
      testPollingOptions,
    );
    const copyResult = await poller.pollUntilDone();

    assert.isDefined(copyResult);
    assert.equal(copyResult.modelId, targetAuth.targetModelId);

    assert.isDefined(copyResult.createdOn);

    const targetModel = await trainingClient.getDocumentModel(copyResult.modelId);

    assert.equal(targetModel.modelId, targetAuth.targetModelId);
    assert.equal(targetModel.modelId, copyResult.modelId);
  });
});
