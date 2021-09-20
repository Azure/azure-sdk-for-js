// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { matrix } from "@azure/test-utils";

import { env, Recorder } from "@azure-tools/test-recorder";

import { testPollingOptions, createRecorder, makeCredential } from "../utils/recordedClients";

import {
  TrainingDocumentInfo,
  FormTrainingClient,
  CustomFormModel,
  FormRecognizerClient
} from "../../src";

const endpoint = (): string => env.FORM_RECOGNIZER_ENDPOINT;
const containerSasUrl = (): string => env.FORM_RECOGNIZER_TRAINING_CONTAINER_SAS_URL;

/*
 * Run the entire battery of tests using both AAD and API Key.
 */
matrix([[true, false]] as const, async (useAad) => {
  describe(`[${useAad ? "AAD" : "API Key"}] FormTrainingClient`, () => {
    let recorder: Recorder;

    beforeEach(function(this: Context) {
      recorder = createRecorder(this);
    });

    afterEach(async function() {
      await recorder.stop();
    });

    // #region Model Training

    /*
     * All test steps that are related to training and validating
     * models from source documents are encapsulated in this
     * "describe" block
     */

    describe("model training", async function() {
      const allModels: string[] = [];

      let trainingClient: FormTrainingClient;

      let id = 0;
      function getId(): number {
        return (id += 1);
      }

      beforeEach(function() {
        // Create a client using the current AAD/API Key configuration
        trainingClient = new FormTrainingClient(endpoint(), makeCredential(useAad));
      });

      /*
       * This `matrix` creates a test combination that will repeat training
       * and recognition against those models for all combinations of the
       * following training settings:
       *
       * Labels x subFolders x Prefix
       */
      matrix(
        [
          [true, false],
          [true, false],
          [true, false]
        ],
        async (useLabels, includeSubfolders, usePrefix) => {
          const labelsText = useLabels ? "labels" : "no labels";
          const subfoldersText = includeSubfolders ? "subfolders" : "no subfolders";
          const prefixText = usePrefix ? "prefix" : "no prefix";

          // This configuration is not allowed.
          if (useLabels && includeSubfolders) {
            return;
          }

          /*
           * This defines the suite of tests related to a particular model
           *
           * The model will be trained, then all of the tests within the model will run
           */
          describe(`model with ${labelsText}, ${subfoldersText}, and ${prefixText}`, async () => {
            let _model: CustomFormModel;

            let modelName: string;
            let expectedDocumentInfo: TrainingDocumentInfo;

            // We only want to create the model once, but because of the recorder's
            // precedence, we have to create it in a test, so one test will end up
            // recording the entire creation and the other tests will still be able
            // to use it
            async function requireModel(): Promise<CustomFormModel> {
              if (!_model) {
                // Compute a unique name for the model
                modelName = recorder.getUniqueName("modelName", getId().toString());
                const poller = await trainingClient.beginTraining(containerSasUrl(), useLabels, {
                  includeSubfolders,
                  modelName,
                  ...testPollingOptions
                });
                _model = await poller.pollUntilDone();

                assert.ok(_model.modelId);

                expectedDocumentInfo = {
                  name: "Form_1.jpg",
                  modelId: _model.modelId,
                  errors: [],
                  pageCount: 1,
                  status: "succeeded"
                };

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
              assert.ok(model.status === "ready", "Expecting status to be 'ready'");
              assert.ok(model.modelId);

              assert.isNotEmpty(model.submodels);
              const submodel = model.submodels![0];

              const expectedFormType = useLabels
                ? `custom:${modelName}`
                : `form-${useLabels ? model.modelId : "0"}`;
              assert.equal(submodel.formType, expectedFormType);

              assert.equal(model.modelName, modelName);

              if (useLabels) {
                // When training with labels, we will have expectations for the names
                assert.ok(
                  submodel.fields["Signature"],
                  "Expecting field with name 'Signature' to be valid"
                );
                assert.isNotTrue(model.properties?.isComposedModel);
              } else {
                assert.equal(submodel.accuracy, undefined);
                assert.ok(
                  submodel.fields["field-0"],
                  "Expecting field with name 'field-0' to be valid"
                );
              }

              assert.deepStrictEqual(model.trainingDocuments?.[0], expectedDocumentInfo);
            });

            /*
             * Use the model for some simple recognition
             */
            describe("recognition", async () => {
              let recognizerClient: FormRecognizerClient;

              beforeEach(() => {
                recognizerClient = new FormRecognizerClient(endpoint(), makeCredential(useAad));
              });

              it("form from url", async () => {
                const model = await requireModel();

                const testingContainerUrl = env.FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL;
                const urlParts = testingContainerUrl.split("?");
                const url = `${urlParts[0]}/Form_1.jpg?${urlParts[1]}`;

                const poller = await recognizerClient.beginRecognizeCustomFormsFromUrl(
                  model.modelId,
                  url,
                  testPollingOptions
                );
                const forms = await poller.pollUntilDone();

                assert.isNotEmpty(forms, `Expect no-empty pages but got ${forms}`);
                const form = forms[0];

                assert.deepStrictEqual(form.pageRange, {
                  firstPageNumber: 1,
                  lastPageNumber: 1
                });
                assert.isNotEmpty(form.pages);

                const [page] = form.pages;
                assert.isNotEmpty(page.tables);
                const [table] = page.tables!;

                // TODO: service regression, should be valid on unlabeled models as well
                if (useLabels) {
                  assert.ok(table.boundingBox);
                }

                assert.equal(table.pageNumber, 1);

                if (useLabels) {
                  assert.ok(form.fields);
                  assert.ok(form.fields["Merchant"]);
                  assert.ok(form.fields["DatedAs"]);
                  assert.ok(form.fields["CompanyPhoneNumber"]);
                  assert.ok(form.fields["CompanyName"]);
                  assert.ok(form.fields["Signature"]);
                } else {
                  assert.equal(form.formType, "form-0");
                  assert.ok(form.fields["field-0"], "Expecting field-0");
                  assert.ok(form.fields["field-1"], "Expecting field-1");
                  assert.ok(form.fields["field-2"], "Expecting field-2");
                }
              });
            });

            it("getModel() verification", async () => {
              const model = await requireModel();

              const modelInfo = await trainingClient.getCustomModel(model.modelId);

              assert.strictEqual(modelInfo.modelId, model.modelId);
              assert.strictEqual(modelInfo.modelName, model.modelName);
              assert.equal(modelInfo.status, "ready");
              assert.isNotEmpty(modelInfo.submodels);
            });
          });
        }
      );

      /*
       * Check to make sure account information querying works
       */
      describe("account properties", () => {
        it("has trained models and limits", async () => {
          const properties = await trainingClient.getAccountProperties();

          // Model count should be >0 because we just trained several models
          assert.ok(
            properties.customModelCount > 0,
            `Expecting models in account but got ${properties.customModelCount}`
          );
          assert.ok(
            properties.customModelLimit > 0,
            `Expecting maximum number of models in account but got ${properties.customModelLimit}`
          );
        });
      });

      /*
       * These are tests that check that model querying functions as expected.
       * This section also cleans up the models by deleting them.
       */
      describe("model information", async () => {
        it("iterate models in account", async () => {
          const modelsInAccount = [];
          for await (const model of trainingClient.listCustomModels()) {
            assert.ok(model.modelId, `Expecting a model but got ${model.modelId}`);
            modelsInAccount.push(model.modelId);
          }

          for (const modelId of allModels) {
            assert.isTrue(modelsInAccount.includes(modelId));
          }
        });

        it("old-style iteration with next model info", async () => {
          const iter = trainingClient.listCustomModels();
          const item = await iter.next();
          assert.ok(item, `Expecting a model but got ${item}`);
          assert.ok(item.value.modelId, `Expecting a model id but got ${item.value.modelId}`);
        });

        it("delete models from the account", async () => {
          // Delete all of the models
          const results = await Promise.all(
            allModels.map((modelId) => trainingClient.deleteModel(modelId))
          );

          // Just make sure they are all 200s
          assert.isTrue(
            results.every((r) => r._response.status >= 200 && r._response.status < 300)
          );

          await Promise.all(
            allModels.map(async (modelId) => {
              try {
                await trainingClient.getCustomModel(modelId);
                throw new Error(
                  `The service returned model info for ${modelId}, but we thought we had deleted it!`
                );
              } catch ({ message }) {
                assert.isTrue(message.startsWith("Model with 'id="));
                assert.isTrue(message.endsWith(" not found."));
              }
            })
          );
        });
      });
    });

    // #endregion

    it("compose model", async function() {
      const trainingClient = new FormTrainingClient(endpoint(), makeCredential(useAad));

      // Create two models using the same data set. This will still test our training
      // client because the service's behavior here shouldn't affect it.

      let allTrainingDocuments: TrainingDocumentInfo[] = [];

      // Helper function to train/validate single model
      async function makeModel(modelName: string): Promise<string> {
        const poller = await trainingClient.beginTraining(containerSasUrl(), true, {
          modelName,
          ...testPollingOptions
        });
        const model = await poller.pollUntilDone();

        assert.ok(model.modelId);
        assert.equal(model.errors?.length, 0);
        assert.equal(model.modelName, modelName);
        assert.isNotEmpty(model.trainingDocuments);
        assert.isNotEmpty(model.submodels);

        allTrainingDocuments = allTrainingDocuments.concat(model.trainingDocuments ?? []);

        return model.modelId;
      }

      const modelIds = await Promise.all([makeModel("input1"), makeModel("input2")]);

      const modelName = recorder.getUniqueName("composedModelName");
      const composePoller = await trainingClient.beginCreateComposedModel(modelIds, {
        modelName,
        ...testPollingOptions
      });

      const composedModel = await composePoller.pollUntilDone();
      assert.ok(composedModel.modelId);
      assert.equal(composedModel.errors?.length ?? 0, 0);
      assert.equal(composedModel.modelName, modelName);
      assert.ok(composedModel.properties);
      assert.isTrue(composedModel.properties?.isComposedModel);

      // Submodels
      assert.equal(composedModel.submodels?.length, 2);
      assert.isTrue(composedModel.submodels?.every((model) => modelIds.includes(model.modelId!)));

      // Training Documents
      assert.equal(composedModel.trainingDocuments?.length, allTrainingDocuments.length);
      for (const info of composedModel.trainingDocuments ?? []) {
        assert.isTrue(modelIds.includes(info.modelId!));
        assert.isTrue(info.name.startsWith("Form_"));
      }
    });

    it("copy model", async function() {
      // Since this test is isolated, we'll create a fresh set of resources for it

      const trainingClient = new FormTrainingClient(endpoint(), makeCredential(useAad));
      const trainingPoller = await trainingClient.beginTraining(containerSasUrl(), true, {
        modelName: recorder.getUniqueName("copyModelName"),
        // If we are using the model name, add that
        ...testPollingOptions
      });
      const sourceModel = await trainingPoller.pollUntilDone();

      assert.equal(sourceModel.status, "ready");
      assert.ok(sourceModel.modelId);
      assert.ok(sourceModel.modelName);

      // for testing purpose, copy into the same resource
      const resourceId = env.FORM_RECOGNIZER_TARGET_RESOURCE_ID;
      const resourceRegion = env.FORM_RECOGNIZER_TARGET_RESOURCE_REGION;

      const targetAuth = await trainingClient.getCopyAuthorization(resourceId, resourceRegion);

      const poller = await trainingClient.beginCopyModel(
        sourceModel.modelId,
        targetAuth,
        testPollingOptions
      );
      const copyResult = await poller.pollUntilDone();

      assert.ok(copyResult, "Expecting valid copy result");
      assert.equal(copyResult.modelId, targetAuth.modelId);
      assert.equal(copyResult.status, "ready");

      assert.ok(copyResult.trainingStartedOn, "Expecting valid 'trainingStartedOn' property");
      assert.ok(copyResult.trainingCompletedOn, "Expecting valid 'trainingCompletedOn' property");

      const targetModel = await trainingClient.getCustomModel(copyResult.modelId);

      assert.equal(targetModel.modelId, targetAuth.modelId);
      assert.equal(targetModel.modelId, copyResult.modelId);
      assert.equal(targetModel.modelName, sourceModel.modelName);
    });
  }).timeout(60000);
});
