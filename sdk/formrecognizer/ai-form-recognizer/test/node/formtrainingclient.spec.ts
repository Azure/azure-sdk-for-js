// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import fs from "fs-extra";
import path from "path";

import * as dotenv from "dotenv";
dotenv.config();

import { createRecordedTrainingClient, createRecordedRecognizerClient } from "../util/recordedClients";
import {
  FormRecognizerClient,
  AzureKeyCredential,
  TrainingDocumentInfo,
  FormTrainingClient
} from "../../src";
import { env, Recorder } from "@azure/test-utils-recorder";

const ASSET_PATH = path.resolve(path.join(process.cwd(), "test-assets"));
let unlabeledModelId: string | undefined;
let labeledModelId: string | undefined;
let modelIdToDelete: string | undefined;

describe("FormTrainingClient NodeJS only", () => {
  let trainingClient: FormTrainingClient;
  let recorder: Recorder;

  beforeEach(function() {
    ({recorder, client: trainingClient} = createRecordedTrainingClient(this));
    trainingClient = new FormTrainingClient(
      env.FORM_RECOGNIZER_ENDPOINT,
      new AzureKeyCredential(env.FORM_RECOGNIZER_API_KEY)
    );
  });

  afterEach(function() {
    if (recorder) {
      recorder.stop();
    }
  })

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
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expecting valid response");
    assert.ok(response!.status === "ready", "Expecting status to be 'ready'");
    assert.ok(response!.modelId);
    // save the id for recognition tests
    unlabeledModelId = response!.modelId;

    assert.ok(response!.models && response!.models.length > 0, "Expected non empty sub model list");
    const model = response!.models![0];
    assert.equal(model.formType, "form-0");
    assert.equal(model.accuracy, undefined);
    assert.ok(model.fields["field-0"], "Expecting field with name 'field-0' to be valid");

    assert.deepStrictEqual(response?.trainingDocuments![0], expectedDocumentInfo);
  });

  it("trains model with forms and labels", async () => {
    const containerSasUrl = env.FORM_RECOGNIZER_TRAINING_CONTAINER_SAS_URL;
    assert.ok(containerSasUrl, "Expect valid container sas url");

    const poller = await trainingClient.beginTraining(containerSasUrl, true);
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expecting valid response");
    assert.ok(response!.status === "ready", "Expecting status to be 'ready'");
    assert.ok(response!.modelId);
    // save the id for recognition tests
    labeledModelId = response!.modelId;

    assert.ok(response!.models && response!.models.length > 0, "Expected non empty sub model list");
    const model = response!.models![0];
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
    await poller.pollUntilDone();
    const response = poller.getResult();

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
    await poller.pollUntilDone();
    const response = poller.getResult();

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

    assert.ok(properties.count > 0, `Expecting models in account but got ${properties.count}`);
    assert.ok(
      properties.limit > 0,
      `Expecting maximum number of models in account but got ${properties.limit}`
    );
  });

  it("listModels() iterates models in this account", async () => {
    let count = 0;
    for await (const _model of trainingClient.listModels()) {
      count++;
      if (count > 30) {
        break; // work around issue https://github.com/Azure/azure-sdk-for-js/issues/8353
      }
    }
    assert.ok(count > 0, `Expecting models in account but got ${count}`);
  });

  it("listModels() allows getting next model info", async () => {
    const iter = trainingClient.listModels();
    const item = await iter.next();
    assert.ok(item, `Expecting a model but got ${item}`);
    assert.ok(item.value.modelId, `Expecting a model id but got ${item.value.modelId}`);
  });

  it("getModel() returns a model", async function() {
    if (!modelIdToDelete) {
      this.skip();
    }

    const modelInfo = await trainingClient.getModel(modelIdToDelete!);

    assert.ok(modelInfo.modelId === modelIdToDelete, "Expecting same model id");
    assert.ok(
      modelInfo.models && modelInfo.models.length > 0,
      "Expecting no empty list of custom form sub models"
    );
  });

  it("deleteModels() removes a model from this account", async function() {
    if (!modelIdToDelete) {
      this.skip();
    }

    await trainingClient.deleteModel(modelIdToDelete!);
    try {
      await trainingClient.getModel(modelIdToDelete!);
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

describe("FormRecognizerClient form recognition NodeJS", () => {
  let recognizerClient: FormRecognizerClient;
  let recorder: Recorder;

  beforeEach(function() {
    ({recorder, client: recognizerClient} = createRecordedRecognizerClient(this));
  });

  afterEach(function() {
    if (recorder) {
      recorder.stop();
    }
  })

  it("recognizes form jpeg unlabeled model", async () => {
    const filePath = path.join(ASSET_PATH, "forms", "Form_1.jpg");
    const stream = fs.createReadStream(filePath);

    assert.ok(unlabeledModelId, "Expecting valid model id from training without labels");
    const poller = await recognizerClient.beginRecognizeForms(
      unlabeledModelId!,
      stream,
      "image/jpeg"
    );
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expect valid response object");
    assert.equal(response!.status, "succeeded");
    assert.ok(
      response!.forms && response!.forms.length > 0,
      `Expect no-empty pages but got ${response!.forms}`
    );
    const form = response!.forms![0];
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
    const poller = await recognizerClient.beginRecognizeFormsFromUrl(unlabeledModelId!, url);
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expect valid response object");
    assert.equal(response!.status, "succeeded");
    assert.ok(
      response!.forms && response!.forms.length > 0,
      `Expect no-empty pages but got ${response!.forms}`
    );
    const form = response!.forms![0];
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
    const poller = await recognizerClient.beginRecognizeForms(
      labeledModelId!,
      stream,
      "image/jpeg"
    );
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expect valid response object");
    assert.equal(response!.status, "succeeded");
    assert.ok(
      response!.forms && response!.forms.length > 0,
      `Expect no-empty pages but got ${response!.forms}`
    );
    const form = response!.forms![0];
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
    const poller = await recognizerClient.beginRecognizeForms(labeledModelId!, stream);
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expect valid response object");
    assert.equal(response!.status, "succeeded");
    assert.ok(
      response!.forms && response!.forms.length > 0,
      `Expect no-empty pages but got ${response!.forms}`
    );
    const form = response!.forms![0];
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

  it("handles missing fields", async () => {
    const filePath = path.join(ASSET_PATH, "forms", "Invoice_1.pdf");
    const stream = fs.createReadStream(filePath);

    assert.ok(labeledModelId, "Expecting valid model id from training without labels");
    const poller = await recognizerClient.beginRecognizeForms(labeledModelId!, stream);
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expect valid response object");
    assert.equal(response!.status, "succeeded");
    assert.ok(
      response!.forms && response!.forms.length > 0,
      `Expect no-empty pages but got ${response!.forms}`
    );
    const form = response!.forms![0];
    assert.equal(form.formType, "custom:form");
    assert.deepStrictEqual(form.pageRange, {
      firstPageNumber: 1,
      lastPageNumber: 1
    });
    assert.ok(form.pages.length > 0, "Expecting at least one page in the first recognized form");
    assert.ok(form.fields);
    assert.ok(form.fields["Merchant"], "Expecting valid 'Merchant' field");
    assert.equal(form.fields["Merchant"].confidence, undefined, "Expecting 'Merchant' field has undefined confidence");
    assert.equal(form.fields["Merchant"].fieldLabel, undefined, "Expecting 'Merchant' field has undefined fieldLabel");
    assert.equal(form.fields["Merchant"].value, undefined, "Expecting 'Merchant' field has undefined value");
    assert.equal(form.fields["Merchant"].valueText, undefined, "Expecting 'Merchant' field has undefined valueText");
    assert.equal(form.fields["Merchant"].valueType, undefined, "Expecting 'Merchant' field has undefined valueType");
  });
}).timeout(60000);
