// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { testPollingOptions } from "@azure-tools/test-recorder";
import { createRecorder } from "../utils/recorderUtils.js";
import DocumentIntelligence, {
  getLongRunningPoller,
  isUnexpected,
  paginate,
} from "@azure-rest/ai-document-intelligence";
import { assert, describe, beforeEach, afterEach, it } from "vitest";
import { getRandomNumber, containerSasUrl } from "../utils/utils.js";
import type {
  AnalyzeOperationOutput,
  DocumentModelDetailsOutput,
  DocumentTypeDetails,
  DocumentIntelligenceClient,
  DocumentTypeDetailsOutput,
} from "@azure-rest/ai-document-intelligence";
import { getEndpoint } from "../../utils/injectables.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { buildClassifier } from "../utils/buildClassifier.js";

describe("model management", () => {
  let recorder: Recorder;
  let client: DocumentIntelligenceClient;
  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = DocumentIntelligence(
      getEndpoint(),
      createTestCredential(),
      recorder.configureClientOptions({}),
    );
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

  describe("model build", async function () {
    const allModels: string[] = [];

    let id = 0;
    function getId(): number {
      return (id += 1);
    }

    describe(`custom model from trainingdata-v3`, async () => {
      let _model: DocumentModelDetailsOutput;

      let modelId: string;

      // We only want to create the model once, but because of the recorder's
      // precedence, we have to create it in a test, so one test will end up
      // recording the entire creation and the other tests will still be able
      // to use it
      async function requireModel(): Promise<DocumentModelDetailsOutput> {
        if (!_model) {
          // Compute a unique name for the model
          modelId = recorder.variable(getId().toString(), `modelName${getRandomNumber()}`);
          const initialResponse = await client.path("/documentModels:build").post({
            body: {
              buildMode: "template",
              modelId: modelId,
              azureBlobSource: {
                containerUrl: containerSasUrl(),
              },
            },
          });
          if (isUnexpected(initialResponse)) {
            throw initialResponse.body.error;
          }
          const response = await getLongRunningPoller(client, initialResponse);
          const result = response.body as DocumentModelDetailsOutput;
          _model = result;

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
          submodel.fieldSchema!["Signature"],
          "Expecting field with name 'Signature' to be valid",
        );
      });

      /*
       * Use the model for some simple recognition
       */
      describe("recognition", async () => {
        it("form from url", async () => {
          const model = await requireModel();
          const urlParts = containerSasUrl().split("?");
          const url = `${urlParts[0]}/Form_1.jpg?${urlParts[1]}`;

          const initialResponse = await client
            .path("/documentModels/{modelId}:analyze", model.modelId)
            .post({
              contentType: "application/json",
              body: {
                urlSource: url,
              },
            });

          if (isUnexpected(initialResponse)) {
            throw initialResponse.body.error;
          }

          const response = await getLongRunningPoller(client, initialResponse, {
            intervalInMs: testPollingOptions.updateIntervalInMs,
          });
          const analyzeResult = (response.body as AnalyzeOperationOutput).analyzeResult;

          const documents = analyzeResult?.documents;
          const tables = analyzeResult?.tables;
          assert.isNotEmpty(documents);
          const document = documents?.[0];

          assert.isNotEmpty(document?.boundingRegions);

          assert.isNotEmpty(tables);
          const [table] = tables!;

          assert.ok(table.boundingRegions?.[0].polygon);
          assert.equal(table.boundingRegions?.[0].pageNumber, 1);

          assert.ok(document?.fields);
          assert.ok(document?.fields?.["Merchant"]);
          assert.ok(document?.fields?.["DatedAs"]);
          assert.ok(document?.fields?.["CompanyPhoneNumber"]);
          assert.ok(document?.fields?.["CompanyName"]);
          assert.ok(document?.fields?.["Signature"]);
        });
      });

      it("getModel() verification", async () => {
        const model = await requireModel();

        const modelDetails = await client.path("/documentModels/{modelId}", model.modelId).get();

        if (isUnexpected(modelDetails)) {
          throw modelDetails.body.error;
        }

        assert.strictEqual(modelDetails.body.modelId, model.modelId);
        assert.strictEqual(modelDetails.body.description, model.description);
        assert.ok(modelDetails.body.docTypes);
      });
    });

    /*
     * These are tests that check that model querying functions as expected.
     * This section also cleans up the models by deleting them.
     */
    describe("model information", async () => {
      it("iterate models in account", async () => {
        const response = await client.path("/documentModels").get();
        if (isUnexpected(response)) {
          throw response.body.error;
        }

        const modelsInAccount: string[] = [];
        for await (const model of paginate(client, response)) {
          assert.ok(model.modelId);
          modelsInAccount.push(model.modelId);
        }

        for (const modelId of allModels) {
          assert.isTrue(modelsInAccount.includes(modelId));
        }
      });

      it("delete models from the account", async () => {
        // Delete all of the models
        await Promise.all(
          allModels.map((modelId) => client.path("/documentModels/{modelId}", modelId).delete()),
        );

        await Promise.all(
          allModels.map(async (modelId) => {
            try {
              const res = await client.path("/documentModels/{modelId}", modelId).get();
              if (isUnexpected(res)) {
                throw res.body.error;
              }
              console.log(`Model ${res.body.modelId} was not deleted!`);
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

  it(`compose model`, async function () {
    // Helper function to train/validate single model
    async function makeModel(
      prefix: string,
    ): Promise<{ docTypes: Record<string, DocumentTypeDetailsOutput> }> {
      const testModelId = recorder.variable(prefix, `${prefix}${getRandomNumber()}`);
      const initialResponse = await client.path("/documentModels:build").post({
        body: {
          buildMode: "template",
          modelId: testModelId,
          azureBlobSource: {
            containerUrl: containerSasUrl(),
          },
        },
      });
      if (isUnexpected(initialResponse)) {
        throw initialResponse.body.error;
      }
      const response = await getLongRunningPoller(client, initialResponse);
      const { modelId, docTypes } = response.body as DocumentModelDetailsOutput;

      assert.equal(modelId, testModelId);
      if (!docTypes) {
        throw new Error("Expected docTypes to be defined");
      }
      const updated: Record<string, DocumentTypeDetails> = {};
      for (const key of Object.keys(docTypes)) {
        updated[key] = {
          modelId,
        };
      }
      return { docTypes: updated };
    }

    const [component1, component2] = await Promise.all([makeModel("input1"), makeModel("input2")]);

    const modelId = recorder.variable("composedModelName", `composedModelName${getRandomNumber()}`);
    const initialResponse = await client.path("/documentModels:compose").post({
      body: {
        classifierId: (await buildClassifier(client, recorder)).classifierId,
        docTypes: { ...component1.docTypes, ...component2.docTypes },
        modelId,
      },
    });

    if (isUnexpected(initialResponse)) {
      throw initialResponse.body.error;
    }
    const response = await getLongRunningPoller(client, initialResponse);

    const composedModel = response.body as DocumentModelDetailsOutput;
    assert.ok(composedModel.modelId);
    assert.equal(composedModel.modelId, modelId);
    assert.ok(composedModel.docTypes);

    // Submodels
    assert.equal(Object.entries(composedModel.docTypes ?? {}).length, 2);
  });

  it(`copy model`, async function () {
    const modelId = recorder.variable("copySource", `copySource${getRandomNumber()}`);

    const initialResponse = await client.path("/documentModels:build").post({
      body: {
        buildMode: "template",
        modelId: modelId,
        azureBlobSource: {
          containerUrl: containerSasUrl(),
        },
      },
    });
    if (isUnexpected(initialResponse)) {
      throw initialResponse.body.error;
    }
    const response = await getLongRunningPoller(client, initialResponse);
    const sourceModel = response.body as DocumentModelDetailsOutput;

    assert.equal(sourceModel.modelId, modelId);

    const targetModelId = recorder.variable("copyTarget", `copyTarget${getRandomNumber()}`);
    const targetAuth = await client.path("/documentModels:authorizeCopy").post({
      body: {
        modelId: targetModelId,
      },
    });

    if (isUnexpected(targetAuth)) {
      throw targetAuth.body.error;
    }
    const copyInitResponse = await client
      .path("/documentModels/{modelId}:copyTo", sourceModel.modelId)
      .post({
        body: targetAuth.body,
      });

    if (isUnexpected(copyInitResponse)) {
      throw copyInitResponse.body.error;
    }
    const copyResponse = await getLongRunningPoller(client, copyInitResponse);
    const copyResult = copyResponse.body as DocumentModelDetailsOutput;

    assert.ok(copyResult, "Expecting valid copy result");
    assert.equal(copyResult.modelId, targetAuth.body.targetModelId);

    assert.ok(copyResult.createdDateTime, "Expecting valid 'trainingStartedOn' property");

    const targetModel = await client.path("/documentModels/{modelId}", copyResult.modelId).get();

    if (isUnexpected(targetModel)) {
      throw targetModel.body.error;
    }
    assert.equal(targetModel.body.modelId, targetAuth.body.targetModelId);
    assert.equal(targetModel.body.modelId, copyResult.modelId);
  });
});
