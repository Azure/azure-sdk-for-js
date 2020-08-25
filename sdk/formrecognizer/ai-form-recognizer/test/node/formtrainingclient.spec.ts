// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import fs from "fs-extra";
import path from "path";

import * as dotenv from "dotenv";
dotenv.config();

import {
  createRecordedTrainingClient,
  createRecordedRecognizerClient,
  testEnv,
  testPollingOptions
} from "../util/recordedClients";
import {
  FormRecognizerClient,
  TrainingDocumentInfo,
  FormTrainingClient,
  AzureKeyCredential
} from "../../src";
import { env, Recorder } from "@azure/test-utils-recorder";

const ASSET_PATH = path.resolve(path.join(process.cwd(), "test-assets"));
let unlabeledModelId: string | undefined;
let labeledModelId: string | undefined;
let modelIdToDelete: string | undefined;

describe("FormTrainingClient NodeJS only", () => {
  let trainingClient: FormTrainingClient;
  let recorder: Recorder;
  const apiKey = new AzureKeyCredential(testEnv.FORM_RECOGNIZER_API_KEY);

  beforeEach(function() {
    // eslint-disable-next-line no-invalid-this
    ({ recorder, client: trainingClient } = createRecordedTrainingClient(this, apiKey));
  });

  afterEach(async function() {
    if (recorder) {
      await recorder.stop();
    }
  });

  const expectedDocumentInfo: TrainingDocumentInfo = {
    name: "Form_1.jpg",
    errors: [],
    pageCount: 1,
    status: "succeeded"
  };

  it("trains model with forms and no labels", async () => {
    const containerSasUrl = env.FORM_RECOGNIZER_TRAINING_CONTAINER_SAS_URL;
    assert.ok(containerSasUrl, "Expect valid container sas url");
    const poller = await trainingClient.beginTraining(containerSasUrl, false, testPollingOptions);
    const response = await poller.pollUntilDone();

    assert.ok(response, "Expecting valid response");
    assert.ok(response!.status === "ready", "Expecting status to be 'ready'");
    assert.ok(response!.modelId);
    // save the id for recognition tests
    unlabeledModelId = response!.modelId;

    assert.ok(
      response!.submodels && response!.submodels.length > 0,
      "Expected non empty sub model list"
    );
    const model = response!.submodels![0];
    assert.equal(model.formType, "form-0");
    assert.equal(model.accuracy, undefined);
    assert.ok(model.fields["field-0"], "Expecting field with name 'field-0' to be valid");

    assert.deepStrictEqual(response?.trainingDocuments![0], expectedDocumentInfo);
  });

  it("trains model with forms and labels", async () => {
    const containerSasUrl = env.FORM_RECOGNIZER_TRAINING_CONTAINER_SAS_URL;
    assert.ok(containerSasUrl, "Expect valid container sas url");

    const poller = await trainingClient.beginTraining(containerSasUrl, true, testPollingOptions);
    const response = await poller.pollUntilDone();

    assert.ok(response, "Expecting valid response");
    assert.ok(response!.status === "ready", "Expecting status to be 'ready'");
    assert.ok(response!.modelId);
    // save the id for recognition tests
    labeledModelId = response!.modelId;

    assert.ok(
      response!.submodels && response!.submodels.length > 0,
      "Expected non empty sub model list"
    );
    const model = response!.submodels![0];
    assert.equal(model.formType, `form-${response!.modelId}`);
    assert.ok(model.fields["Signature"], "Expecting field with name 'Signature' to be valid");

    // TODO: why training with labels is missing `errors` array?
    assert.deepStrictEqual(response?.trainingDocuments![0].name, expectedDocumentInfo.name);
  });

  it("trains model with forms and no labels including sub folders", async () => {
    const containerSasUrl = env.FORM_RECOGNIZER_TRAINING_CONTAINER_SAS_URL;
    assert.ok(containerSasUrl, "Expect valid container sas url");

    const poller = await trainingClient.beginTraining(containerSasUrl, false, {
      includeSubfolders: true,
      ...testPollingOptions
    });
    const response = await poller.pollUntilDone();

    assert.ok(response, "Expecting valid response");
    assert.ok(response!.status === "ready", "Expecting status to be 'ready'");
    assert.ok(response!.modelId);
    // save the model Id for deletion test later
    modelIdToDelete = response!.modelId;
    assert.ok(
      response!.trainingDocuments && response!.trainingDocuments.length > 0,
      "Expected non empty training document list"
    );
    assert.deepStrictEqual(response?.trainingDocuments![0], expectedDocumentInfo);
  });

  it("trains model with forms and no labels specifying prefix ", async () => {
    const containerSasUrl = env.FORM_RECOGNIZER_TRAINING_CONTAINER_SAS_URL;
    assert.ok(containerSasUrl, "Expect valid container sas url");

    const poller = await trainingClient.beginTraining(containerSasUrl, false, {
      prefix: "Form_",
      ...testPollingOptions
    });
    const response = await poller.pollUntilDone();

    assert.ok(response, "Expecting valid response");
    assert.ok(response!.status === "ready", "Expecting status to be 'ready'");
    assert.ok(response!.modelId);
    assert.ok(
      response!.trainingDocuments && response!.trainingDocuments.length > 0,
      "Expected non empty training document list"
    );
    assert.deepStrictEqual(response?.trainingDocuments![0], expectedDocumentInfo);
  });

  it("getAccountProperties() gets model count and limit for this account", async () => {
    const properties = await trainingClient.getAccountProperties();

    assert.ok(
      properties.customModelCount > 0,
      `Expecting models in account but got ${properties.customModelCount}`
    );
    assert.ok(
      properties.customModelLimit > 0,
      `Expecting maximum number of models in account but got ${properties.customModelLimit}`
    );
  });

  it("listModels() iterates models in this account", async () => {
    for await (const validModel of trainingClient.listCustomModels()) {
      assert.ok(validModel.modelId, `Expecting a model but got ${validModel.modelId}`);
    }
  });

  it("listModels() allows getting next model info", async () => {
    const iter = trainingClient.listCustomModels();
    const item = await iter.next();
    assert.ok(item, `Expecting a model but got ${item}`);
    assert.ok(item.value.modelId, `Expecting a model id but got ${item.value.modelId}`);
  });

  it("getModel() returns a model", async function() {
    if (!modelIdToDelete) {
      // eslint-disable-next-line no-invalid-this
      this.skip();
    }

    const modelInfo = await trainingClient.getCustomModel(modelIdToDelete!);

    assert.ok(modelInfo.modelId === modelIdToDelete, "Expecting same model id");
    assert.ok(
      modelInfo.submodels && modelInfo.submodels.length > 0,
      "Expecting no empty list of custom form sub models"
    );
  });

  it("deleteModels() removes a model from this account", async function() {
    if (!modelIdToDelete) {
      // eslint-disable-next-line no-invalid-this
      this.skip();
    }

    await trainingClient.deleteModel(modelIdToDelete!);
    try {
      await trainingClient.getCustomModel(modelIdToDelete!);
      throw new Error("Expect that an error has already been thrown");
    } catch (err) {
      const message = (err as Error).message;
      assert.ok(
        message.startsWith("Model with 'id="),
        `Expecting error message "${message}" to start with "Model with 'id="`
      );
      assert.ok(
        message.endsWith(" not found."),
        `Expecting error message "${message}" to end with " not found."`
      );
    }
  });

  it("copies model", async function() {
    // for testing purpose, copy into the same resource
    const resourceId = env.FORM_RECOGNIZER_TARGET_RESOURCE_ID;
    const resourceRegion = env.FORM_RECOGNIZER_TARGET_RESOURCE_REGION;

    const targetAuth = await trainingClient.getCopyAuthorization(resourceId, resourceRegion);

    assert.ok(labeledModelId, "Expecting valid model id in source");
    const poller = await trainingClient.beginCopyModel(
      labeledModelId!,
      targetAuth,
      testPollingOptions
    );
    const result = await poller.pollUntilDone();

    assert.ok(result, "Expecting valid copy result");
    assert.equal(result?.modelId, targetAuth.modelId, "Expecting matching model ids");
    assert.equal(result!.status, "ready");
    assert.ok(result!.trainingStartedOn, "Expecting valid 'trainingStartedOn' property");
    assert.ok(result!.trainingCompletedOn, "Expecting valid 'trainingCompletedOn' property");
  });
}).timeout(60000);

describe("FormRecognizerClient form recognition NodeJS", () => {
  let recognizerClient: FormRecognizerClient;
  let recorder: Recorder;
  const apiKey = new AzureKeyCredential(testEnv.FORM_RECOGNIZER_API_KEY);

  beforeEach(function() {
    // eslint-disable-next-line no-invalid-this
    ({ recorder, client: recognizerClient } = createRecordedRecognizerClient(this, apiKey));
  });

  afterEach(async function() {
    if (recorder) {
      await recorder.stop();
    }
  });

  it("recognizes form jpeg unlabeled model", async () => {
    const filePath = path.join(ASSET_PATH, "forms", "Form_1.jpg");
    const stream = fs.createReadStream(filePath);

    assert.ok(unlabeledModelId, "Expecting valid model id from training without labels");
    const poller = await recognizerClient.beginRecognizeCustomForms(unlabeledModelId!, stream, {
      contentType: "image/jpeg",
      ...testPollingOptions
    });
    const forms = await poller.pollUntilDone();

    assert.ok(forms && forms.length > 0, `Expect no-empty pages but got ${forms}`);
    const form = forms![0];
    assert.equal(form.formType, "form-0");
    assert.deepStrictEqual(form.pageRange, {
      firstPageNumber: 1,
      lastPageNumber: 1
    });
    assert.ok(form.pages.length > 0, "Expecting at least one page in the first recognized form");
    assert.ok(form.fields["field-0"], "Expecting field-0");
    assert.ok(form.fields["field-1"], "Expecting field-1");
    assert.ok(form.fields["field-2"], "Expecting field-2");
  });

  it("recognizes form url unlabeled model", async () => {
    const testingContainerUrl: string = env.FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL;
    const urlParts = testingContainerUrl.split("?");
    const url = `${urlParts[0]}/Form_1.jpg?${urlParts[1]}`;

    assert.ok(unlabeledModelId, "Expecting valid model id from training without labels");
    const poller = await recognizerClient.beginRecognizeCustomFormsFromUrl(
      unlabeledModelId!,
      url,
      testPollingOptions
    );
    const forms = await poller.pollUntilDone();

    assert.ok(forms && forms.length > 0, `Expect no-empty pages but got ${forms}`);
    const form = forms![0];
    assert.equal(form.formType, "form-0");
    assert.deepStrictEqual(form.pageRange, {
      firstPageNumber: 1,
      lastPageNumber: 1
    });
    assert.ok(form.pages.length > 0, "Expecting at least one page in the first recognized form");
    assert.ok(form.fields["field-0"], "Expecting field-0");
    assert.ok(form.fields["field-1"], "Expecting field-1");
    assert.ok(form.fields["field-2"], "Expecting field-2");
  });

  it("recognizes form jpeg labeled model", async () => {
    const filePath = path.join(ASSET_PATH, "forms", "Form_1.jpg");
    const stream = fs.createReadStream(filePath);

    assert.ok(unlabeledModelId, "Expecting valid model id from training without labels");
    const poller = await recognizerClient.beginRecognizeCustomForms(labeledModelId!, stream, {
      contentType: "image/jpeg",
      ...testPollingOptions
    });
    const forms = await poller.pollUntilDone();

    assert.ok(forms && forms.length > 0, `Expect no-empty pages but got ${forms}`);
    const form = forms![0];
    assert.equal(form.formType, "custom:form");
    assert.deepStrictEqual(form.pageRange, {
      firstPageNumber: 1,
      lastPageNumber: 1
    });
    assert.ok(form.pages.length > 0, "Expecting at least one page in the first recognized form");
    assert.ok(form.fields);
    assert.ok(form.fields["Merchant"]);
    assert.ok(form.fields["DatedAs"]);
    assert.ok(form.fields["CompanyPhoneNumber"]);
    assert.ok(form.fields["CompanyName"]);
    assert.ok(form.fields["Signature"]);
  });

  it("recognizes form jpeg labeled model no content type", async () => {
    const filePath = path.join(ASSET_PATH, "forms", "Form_1.jpg");
    const stream = fs.createReadStream(filePath);

    assert.ok(labeledModelId, "Expecting valid model id from training without labels");
    const poller = await recognizerClient.beginRecognizeCustomForms(
      labeledModelId!,
      stream,
      testPollingOptions
    );
    const forms = await poller.pollUntilDone();

    assert.ok(forms && forms.length > 0, `Expect no-empty pages but got ${forms}`);
    const form = forms![0];
    assert.equal(form.formType, "custom:form");
    assert.deepStrictEqual(form.pageRange, {
      firstPageNumber: 1,
      lastPageNumber: 1
    });
    assert.ok(form.pages.length > 0, "Expecting at least one page in the first recognized form");
    assert.ok(form.fields);
    assert.ok(form.fields["Merchant"]);
    assert.ok(form.fields["DatedAs"]);
    assert.ok(form.fields["CompanyPhoneNumber"]);
    assert.ok(form.fields["CompanyName"]);
    assert.ok(form.fields["Signature"]);
  });
}).timeout(60000);

describe("[AAD] FormTrainingClient NodeJS only", () => {
  let trainingClient: FormTrainingClient;
  let recorder: Recorder;

  beforeEach(function() {
    // eslint-disable-next-line no-invalid-this
    ({ recorder, client: trainingClient } = createRecordedTrainingClient(this));
  });

  afterEach(async function() {
    if (recorder) {
      await recorder.stop();
    }
  });

  it("getAccountProperties() gets model count and limit for this account", async () => {
    const properties = await trainingClient.getAccountProperties();

    assert.ok(
      properties.customModelLimit > 0,
      `Expecting maximum number of models in account but got ${properties.customModelLimit}`
    );
  });
}).timeout(60000);
