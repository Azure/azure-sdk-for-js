// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import fs from "fs-extra";
import path from "path";

// import { getTrainingContainerSasUrl } from "../util/trainingContainer";
import { FormRecognizerClient, AzureKeyCredential } from '../../src';
import { env } from "@azure/test-utils-recorder";
// import { URLBuilder } from '@azure/core-http';

const ASSET_PATH = path.resolve(path.join(process.cwd(), "test-assets"));
const recognizerClient = new FormRecognizerClient(env.ENDPOINT, new AzureKeyCredential(env.FORM_RECOGNIZER_API_KEY));
let unlabeledModelId: string | undefined;
let labeledModelId: string | undefined;

describe("FormTrainingClient NodeJS only", () => {
  const trainingClient = recognizerClient.getFormTrainingClient();

  it("trains model with forms and no labels", async () => {
    // const containerSasUrl = getTrainingContainerSasUrl();
    // assert.ok(containerSasUrl, "Expect valid container sas url");
    const containerSasUrl = "<get the url to in the container>";

    const poller = await trainingClient.beginTraining(containerSasUrl, false);
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expecting valid response");
    assert.equal(response!.status, "succeeded");
    assert.ok(response!.modelId);
    // save the id for recognition tests
    unlabeledModelId = response!.modelId;

    assert.ok(response!.models && response!.models.length > 0, "Expected non empty sub model list");
    const model = response!.models![0];
    assert.equal(model.formType, "form-0");
    assert.equal(model.accuracy, 1);
    assert.ok(model.fields["field-0"], "Expecting field with name 'field-0' to be valid");

    assert.deepStrictEqual(response?.trainingDocuments, []);
  });

  it("trains model with forms and labels", async () => {
    // const containerSasUrl = getTrainingContainerSasUrl();
    // assert.ok(containerSasUrl, "Expect valid container sas url");
    const containerSasUrl = "<get the url to a form in the container>";

    const poller = await trainingClient.beginTraining(containerSasUrl, true);
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expecting valid response");
    assert.equal(response!.status, "succeeded");
    assert.ok(response!.modelId);
    // save the id for recognition tests
    unlabeledModelId = response!.modelId;

    assert.ok(response!.models && response!.models.length > 0, "Expected non empty sub model list");
    const model = response!.models![0];
    assert.equal(model.formType, "custom:form");
    assert.equal(model.accuracy, 1);
    assert.ok(model.fields["FieldName"], "Expecting field with name 'field-0' to be valid");

    assert.deepStrictEqual(response?.trainingDocuments, []);
  });

  it("trains model with forms and no labels including sub folders", async () => {
    // const containerSasUrl = getTrainingContainerSasUrl();
    // assert.ok(containerSasUrl, "Expect valid container sas url");
    const containerSasUrl = "<get the url to a form in the container>";

    const poller = await trainingClient.beginTraining(containerSasUrl, false, {
      includeSubFolders: true
    });
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expecting valid response");
    assert.equal(response!.status, "succeeded");
    assert.ok(response!.modelId);
    assert.ok(response!.trainingDocuments && response!.trainingDocuments.length > 0, "Expected non empty training document list");
    assert.deepStrictEqual(response!.trainingDocuments, []);
  });

  it("trains model with forms and no labels specifying prefix ", async () => {
    // const containerSasUrl = getTrainingContainerSasUrl();
    // assert.ok(containerSasUrl, "Expect valid container sas url");
    const containerSasUrl = "<get the url to a form in the container>";

    const poller = await trainingClient.beginTraining(containerSasUrl, false, {
      prefix: "Form_"
    });
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expecting valid response");
    assert.equal(response!.status, "succeeded");
    assert.ok(response!.modelId);
    assert.ok(response!.trainingDocuments && response!.trainingDocuments.length > 0, "Expected non empty training document list");
    assert.deepStrictEqual(response!.trainingDocuments, []);
  });
}).timeout(60000);

describe("FormRecognizerClient form recognition NodeJS only", () => {
  it("recognizes form from a jpeg file stream using model without labels", async () => {
    const filePath = path.join(ASSET_PATH, "forms", "Form_1.jpg");
    const stream = fs.createReadStream(filePath);

    assert.ok(unlabeledModelId, "Expecting valid model id from training without labels")
    const poller = await recognizerClient.beginRecognizeForms(unlabeledModelId!, stream, "image/jpeg");
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expect valid response object");
    assert.equal(response!.status, "succeeded");
    assert.ok(response!.forms && response!.forms.length > 0, `Expect no-empty pages but got ${response!.forms}`);
    const form = response!.forms![0];
    console.dir(form, {depth: undefined});
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

  it("recognizes form from a url to a jpeg file using model without labels", async () => {
    // const containerSasUrl = getTrainingContainerSasUrl();
    // assert.ok(containerSasUrl, "Expect valid container sas url");
    const url = "<get a blob url to upload a form to the container>";

    assert.ok(unlabeledModelId, "Expecting valid model id from training without labels")
    const poller = await recognizerClient.beginRecognizeFormsFromUrl(unlabeledModelId!, url);
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expect valid response object");
    assert.equal(response!.status, "succeeded");
    assert.ok(response!.forms && response!.forms.length > 0, `Expect no-empty pages but got ${response!.forms}`);
    const form = response!.forms![0];
    console.dir(form, {depth: undefined});
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

  it("recognizes form from a jpeg file stream using model with labels", async () => {
    const filePath = path.join(ASSET_PATH, "forms", "Form_1.jpg");
    const stream = fs.createReadStream(filePath);

    assert.ok(unlabeledModelId, "Expecting valid model id from training without labels")
    const poller = await recognizerClient.beginRecognizeForms(labeledModelId!, stream, "image/jpeg");
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expect valid response object");
    assert.equal(response!.status, "succeeded");
    assert.ok(response!.forms && response!.forms.length > 0, `Expect no-empty pages but got ${response!.forms}`);
    const form = response!.forms![0];
    console.dir(form, {depth: undefined});
    assert.equal(form.formType, "custom:form");
    assert.deepStrictEqual(form.pageRange, {
      firstPageNumber: 1,
      lastPageNumber: 1
    });
    assert.ok(form.pages.length > 0, "Expecting at least one page in the first recognized form");
    assert.ok(form.fields);
    assert.ok(form.fields["InvoiceCharges"]);
    assert.ok(form.fields["InvoiceDate"]);
    assert.ok(form.fields["InvoiceDueDate"]);
    assert.ok(form.fields["InvoiceNumber"]);
    assert.ok(form.fields["InvoiceVatId"]);
  });

  it("recognizes form from a jpeg file stream using model with labels without specifying content type", async () => {
    const filePath = path.join(ASSET_PATH, "forms", "Form_1.jpg");
    const stream = fs.createReadStream(filePath);

    assert.ok(unlabeledModelId, "Expecting valid model id from training without labels")
    const poller = await recognizerClient.beginRecognizeForms(labeledModelId!, stream);
    await poller.pollUntilDone();
    const response = poller.getResult();

    assert.ok(response, "Expect valid response object");
    assert.equal(response!.status, "succeeded");
    assert.ok(response!.forms && response!.forms.length > 0, `Expect no-empty pages but got ${response!.forms}`);
    const form = response!.forms![0];
    console.dir(form, {depth: undefined});
    assert.equal(form.formType, "custom:form");
    assert.deepStrictEqual(form.pageRange, {
      firstPageNumber: 1,
      lastPageNumber: 1
    });
    assert.ok(form.pages.length > 0, "Expecting at least one page in the first recognized form");
    assert.ok(form.fields);
    assert.ok(form.fields["InvoiceCharges"]);
    assert.ok(form.fields["InvoiceDate"]);
    assert.ok(form.fields["InvoiceDueDate"]);
    assert.ok(form.fields["InvoiceNumber"]);
    assert.ok(form.fields["InvoiceVatId"]);
  });

}).timeout(60000);
