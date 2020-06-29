// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { DefaultHttpClient, WebResource } from "@azure/core-http";

import {
  FormRecognizerClient,
  AzureKeyCredential,
  TrainingDocumentInfo,
  FormTrainingClient
} from "../../src";
import { env, Recorder } from "@azure/test-utils-recorder";
import {
  createRecordedTrainingClient,
  createRecordedRecognizerClient,
  testEnv
} from "../util/recordedClients";

let unlabeledModelId: string | undefined;
let modelIdToDelete: string | undefined;

describe("FormTrainingClient browser only", () => {
  let trainingClient: FormTrainingClient;
  let recorder: Recorder;
  const apiKey = new AzureKeyCredential(testEnv.FORM_RECOGNIZER_API_KEY);

  beforeEach(function() {
    ({ recorder, client: trainingClient } = createRecordedTrainingClient(this, apiKey));
    trainingClient = new FormTrainingClient(
      env.FORM_RECOGNIZER_ENDPOINT,
      new AzureKeyCredential(env.FORM_RECOGNIZER_API_KEY)
    );
  });

  afterEach(function() {
    if (recorder) {
      recorder.stop();
    }
  });

  const expectedDocumentInfo: TrainingDocumentInfo = {
    documentName: "Form_1.jpg",
    errors: [],
    pageCount: 1,
    status: "succeeded"
  };

  it("trains model with forms and no labels", async () => {
    const containerSasUrl = env.FORM_RECOGNIZER_TRAINING_CONTAINER_SAS_URL;
    assert.ok(containerSasUrl, "Expect valid container sas url");
    const poller = await trainingClient.beginTraining(containerSasUrl, false);
    const response = await poller.pollUntilDone();

    assert.ok(response, "Expecting valid response");
    assert.ok(response!.status === "ready", "Expecting status to be 'ready'");
    assert.ok(response!.modelId);
    // save the id for recognition tests
    unlabeledModelId = response!.modelId;

    assert.ok(response!.submodels && response!.submodels.length > 0, "Expected non empty sub model list");
    const model = response!.submodels![0];
    assert.equal(model.formType, "form-0");
    assert.equal(model.accuracy, undefined);
    assert.ok(model.fields["field-0"], "Expecting field with name 'field-0' to be valid");

    assert.deepStrictEqual(response?.trainingDocuments![0], expectedDocumentInfo);
  });

  it("trains model with forms and labels", async () => {
    const containerSasUrl = env.FORM_RECOGNIZER_TRAINING_CONTAINER_SAS_URL;
    assert.ok(containerSasUrl, "Expect valid container sas url");

    const poller = await trainingClient.beginTraining(containerSasUrl, true);
    const response = await poller.pollUntilDone();

    assert.ok(response, "Expecting valid response");
    assert.ok(response!.status === "ready", "Expecting status to be 'ready'");
    assert.ok(response!.modelId);

    assert.ok(response!.submodels && response!.submodels.length > 0, "Expected non empty sub model list");
    const model = response!.submodels![0];
    assert.equal(model.formType, `form-${response!.modelId}`);
    assert.equal(model.accuracy, 0.973);
    assert.ok(model.fields["Signature"], "Expecting field with name 'Signature' to be valid");

    // TODO: why training with labels is missing `errors` array?
    assert.deepStrictEqual(
      response?.trainingDocuments![0].documentName,
      expectedDocumentInfo.documentName
    );
  });

  it("trains model with forms and no labels including sub folders", async () => {
    const containerSasUrl = env.FORM_RECOGNIZER_TRAINING_CONTAINER_SAS_URL;
    assert.ok(containerSasUrl, "Expect valid container sas url");

    const poller = await trainingClient.beginTraining(containerSasUrl, false, {
      includeSubFolders: true
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
      prefix: "Form_"
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
    let count = 0;
    for await (const _model of trainingClient.listCustomModels()) {
      count++;
      if (count > 30) {
        break; // work around issue https://github.com/Azure/azure-sdk-for-js/issues/8353
      }
    }
    assert.ok(count > 0, `Expecting models in account but got ${count}`);
  });

  it("listModels() allows getting next model info", async () => {
    const iter = trainingClient.listCustomModels();
    const item = await iter.next();
    assert.ok(item, `Expecting a model but got ${item}`);
    assert.ok(item.value.modelId, `Expecting a model id but got ${item.value.modelId}`);
  });

  it("getModel() returns a model", async function() {
    if (!modelIdToDelete) {
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
}).timeout(60000);

describe("FormRecognizerClient custom form recognition browser only", () => {
  let recognizerClient: FormRecognizerClient;
  let recorder: Recorder;
  const apiKey = new AzureKeyCredential(testEnv.FORM_RECOGNIZER_API_KEY);

  beforeEach(function() {
    ({ recorder, client: recognizerClient } = createRecordedRecognizerClient(this, apiKey));
  });

  afterEach(function() {
    if (recorder) {
      recorder.stop();
    }
  });
  it("recognizes form url unlabeled model", async () => {
    const testingContainerUrl: string = env.FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL;
    const urlParts = testingContainerUrl.split("?");
    const url = `${urlParts[0]}/Form_1.jpg?${urlParts[1]}`;

    assert.ok(unlabeledModelId, "Expecting valid model id from training without labels");
    const poller = await recognizerClient.beginRecognizeCustomFormsFromUrl(unlabeledModelId!, url);
    const forms = await poller.pollUntilDone();

    assert.ok(
      forms && forms.length > 0,
      `Expect no-empty pages but got ${forms}`
    );
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

  it("recognizes form Blob unlabeled model", async () => {
    recorder.skip(
      "browser",
      "issue with blob response https://github.com/Azure/azure-sdk-for-js/issues/8663"
    );
    const testingContainerUrl: string = env.FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL;
    const urlParts = testingContainerUrl.split("?");
    const url = `${urlParts[0]}/Form_1.jpg?${urlParts[1]}`;
    const req = new WebResource(url, "GET");
    req.streamResponseBody = true;
    const httpClient = new DefaultHttpClient();
    const blob = await httpClient.sendRequest(req);
    const data = await blob.blobBody;

    assert.ok(unlabeledModelId, "Expecting valid model id from training without labels");
    assert.ok(data, "Expect valid Blob data to use as input");
    const poller = await recognizerClient.beginRecognizeCustomForms(unlabeledModelId!, data!);
    const forms = await poller.pollUntilDone();

    assert.ok(
      forms && forms.length > 0,
      `Expect no-empty pages but got ${forms}`
    );
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
}).timeout(60000);
