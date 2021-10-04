// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { matrix } from "@azure/test-utils";

import { env, Recorder } from "@azure-tools/test-recorder";

import { testPollingOptions, createRecorder, makeCredential } from "../utils/recordedClients";

import { DocumentAnalysisClient, DocumentModelAdministrationClient, ModelInfo } from "../../src";

const endpoint = (): string => env.FORM_RECOGNIZER_ENDPOINT;
const containerSasUrl = (): string => env.FORM_RECOGNIZER_TRAINING_CONTAINER_SAS_URL;

/*
 * Run the entire battery of tests using both AAD and API Key.
 */
matrix([[true, false]] as const, async (useAad) => {
  describe(`[${useAad ? "AAD" : "API Key"}] model management`, () => {
    let recorder: Recorder;

    beforeEach(function (this: Context) {
      recorder = createRecorder(this);
    });

    afterEach(async function () {
      await recorder.stop();
    });

    // #region Model Training

    /*
     * All test steps that are related to training and validating
     * models from source documents are encapsulated in this
     * "describe" block
     */

    describe("model build", async function () {
      const allModels: string[] = [];

      let client: DocumentModelAdministrationClient;

      let id = 0;
      function getId(): number {
        return (id += 1);
      }

      beforeEach(function () {
        // Create a client using the current AAD/API Key configuration
        client = new DocumentModelAdministrationClient(endpoint(), makeCredential(useAad));
      });

      describe(`custom model from trainingdata-v3`, async () => {
        let _model: ModelInfo;

        let modelId: string;

        // We only want to create the model once, but because of the recorder's
        // precedence, we have to create it in a test, so one test will end up
        // recording the entire creation and the other tests will still be able
        // to use it
        async function requireModel(): Promise<ModelInfo> {
          if (!_model) {
            // Compute a unique name for the model
            modelId = recorder.getUniqueName("modelName", getId().toString());
            const poller = await client.beginBuildModel(
              modelId,
              containerSasUrl(),
              testPollingOptions
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

          assert.ok(model, "Expecting valid response");
          assert.ok(model.modelId);

          assert.isNotEmpty(model.docTypes);
          const submodel = model.docTypes![model.modelId];

          // When training with labels, we will have expectations for the names
          assert.ok(
            submodel.fieldSchema["Signature"],
            "Expecting field with name 'Signature' to be valid"
          );
        });

        /*
         * Use the model for some simple recognition
         */
        describe("recognition", async () => {
          let recognizerClient: DocumentAnalysisClient;

          beforeEach(() => {
            recognizerClient = new DocumentAnalysisClient(endpoint(), makeCredential(useAad));
          });

          it("form from url", async () => {
            const model = await requireModel();

            const testingContainerUrl = env.FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL;
            const urlParts = testingContainerUrl.split("?");
            const url = `${urlParts[0]}/Form_1.jpg?${urlParts[1]}`;

            const poller = await recognizerClient.beginAnalyzeDocuments(
              model.modelId,
              url,
              testPollingOptions
            );
            const { documents, tables } = await poller.pollUntilDone();

            assert.isNotEmpty(documents);
            const document = documents[0];

            assert.isNotEmpty(document.boundingRegions);

            assert.isNotEmpty(tables);
            const [table] = tables!;

            assert.ok(table.boundingRegions?.[0].boundingBox);
            assert.equal(table.boundingRegions?.[0].pageNumber, 1);

            assert.ok(document.fields);
            assert.ok(document.fields["Merchant"]);
            assert.ok(document.fields["DatedAs"]);
            assert.ok(document.fields["CompanyPhoneNumber"]);
            assert.ok(document.fields["CompanyName"]);
            assert.ok(document.fields["Signature"]);
          });
        });

        it("getModel() verification", async () => {
          const model = await requireModel();

          const modelInfo = await client.getModel(model.modelId);

          assert.strictEqual(modelInfo.modelId, model.modelId);
          assert.strictEqual(modelInfo.description, model.description);
          assert.ok(modelInfo.docTypes);
        });
      });

      /*
       * Check to make sure account information querying works
       */
      describe("account properties", () => {
        it("has trained models and limits", async () => {
          const {
            customDocumentModels: { count, limit },
          } = await client.getInfo();

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
          for await (const model of client.listModels()) {
            assert.ok(model.modelId);
            modelsInAccount.push(model.modelId);
          }

          for (const modelId of allModels) {
            assert.isTrue(modelsInAccount.includes(modelId));
          }
        });

        it("old-style iteration with next model info", async () => {
          const iter = client.listModels();
          const item = await iter.next();
          assert.ok(item, `Expecting a model but got ${item}`);
          assert.ok(item.value.modelId, `Expecting a model id but got ${item.value.modelId}`);
        });

        it("delete models from the account", async () => {
          // Delete all of the models
          await Promise.all(allModels.map((modelId) => client.deleteModel(modelId)));

          await Promise.all(
            allModels.map(async (modelId) => {
              try {
                await client.getModel(modelId);
                throw new Error(
                  `The service returned model info for ${modelId}, but we thought we had deleted it!`
                );
              } catch ({ message }) {
                assert.isTrue((message as string).endsWith(" not found."));
              }
            })
          );
        });
      });
    });

    // #endregion

    it("compose model", async function () {
      const client = new DocumentModelAdministrationClient(endpoint(), makeCredential(useAad));

      // Helper function to train/validate single model
      async function makeModel(prefix: string): Promise<string> {
        const modelId = recorder.getUniqueName(prefix);
        const poller = await client.beginBuildModel(modelId, containerSasUrl(), testPollingOptions);
        const model = await poller.pollUntilDone();

        assert.equal(model.modelId, modelId);
        assert.equal(model.modelId, modelId);
        assert.ok(model.docTypes);

        return model.modelId;
      }

      const componentModelIds = await Promise.all([makeModel("input1"), makeModel("input2")]);

      const modelId = recorder.getUniqueName("composedModelName");
      const composePoller = await client.beginComposeModel(
        modelId,
        componentModelIds,
        testPollingOptions
      );

      const composedModel = await composePoller.pollUntilDone();
      assert.ok(composedModel.modelId);
      assert.equal(composedModel.modelId, modelId);
      assert.ok(composedModel.docTypes);

      // Submodels
      assert.equal(Object.entries(composedModel.docTypes ?? {}).length, 2);
    });

    it("copy model", async function () {
      // Since this test is isolated, we'll create a fresh set of resources for it

      const trainingClient = new DocumentModelAdministrationClient(
        endpoint(),
        makeCredential(useAad)
      );
      const modelId = recorder.getUniqueName("copySource");

      const trainingPoller = await trainingClient.beginBuildModel(
        modelId,
        containerSasUrl(),
        testPollingOptions
      );
      const sourceModel = await trainingPoller.pollUntilDone();

      assert.equal(sourceModel.modelId, modelId);

      const targetModelId = recorder.getUniqueName("copyTarget");
      const targetAuth = await trainingClient.getCopyAuthorization(targetModelId);

      const poller = await trainingClient.beginCopyModel(
        sourceModel.modelId,
        targetAuth,
        testPollingOptions
      );
      const copyResult = await poller.pollUntilDone();

      assert.ok(copyResult, "Expecting valid copy result");
      assert.equal(copyResult.modelId, targetAuth.targetModelId);

      assert.ok(copyResult.createdDateTime, "Expecting valid 'trainingStartedOn' property");

      const targetModel = await trainingClient.getModel(copyResult.modelId);

      assert.equal(targetModel.modelId, targetAuth.targetModelId);
      assert.equal(targetModel.modelId, copyResult.modelId);
    });
  }).timeout(60000);
});
