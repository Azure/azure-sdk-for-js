// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressOptionDictionary, PerfStressTest } from "@azure/test-utils-perfstress";
import {
  AzureKeyCredential,
  BeginRecognizeCustomFormsOptions,
  CustomFormModel,
  FormRecognizerClient,
  FormTrainingClient
} from "@azure/ai-form-recognizer";
import { TokenCredential } from "@azure/core-http";
import { DefaultAzureCredential } from "@azure/identity";

function unreachable(message?: string): never {
  throw new Error(message ?? "Unreachable Exception.");
}

export class CustomModelRecognitionTest extends PerfStressTest<BeginRecognizeCustomFormsOptions> {
  public options: PerfStressOptionDictionary<BeginRecognizeCustomFormsOptions> = {
    updateIntervalInMs: {
      required: false,
      description: "Polling interval in milliseconds",
      shortName: "u",
      longName: "update-interval",
      defaultValue: 5000
    }
  };

  /**
   * Not thrilled about this, but `globalSetup` only runs once overall, while `setup`
   * shouldn't have to train the model every time.
   */
  static sessionModel: CustomFormModel | undefined = undefined;

  private recognizerClient: FormRecognizerClient;
  private trainingClient: FormTrainingClient;

  private documentUrl: string;

  constructor() {
    super();

    let credential: TokenCredential | AzureKeyCredential;

    try {
      credential = new DefaultAzureCredential();
    } catch {
      credential = new AzureKeyCredential(process.env.FORM_RECOGNIZER_API_KEY ?? "");
    }

    const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT;

    if (!endpoint) {
      throw new Error(`Expected FORM_RECOGNIZER_ENDPOINT to be defined: ${endpoint}`);
    }

    this.trainingClient = new FormTrainingClient(endpoint, credential);
    this.recognizerClient = new FormRecognizerClient(endpoint, credential);

    const documentUrl = process.env.FORM_RECOGNIZER_TEST_DOCUMENT_URL;

    if (!documentUrl) {
      throw new Error(`Expected FORM_RECOGNIZER_TEST_DOCUMENT_URL to be defined: ${documentUrl}`);
    }

    this.documentUrl = documentUrl;
  }

  public async globalSetup() {
    const trainingContainerSasUrl = process.env.FORM_RECOGNIZER_TRAINING_CONTAINER_SAS_URL;

    if (!trainingContainerSasUrl) {
      throw new Error(
        `Expected FORM_RECOGNIZER_TRAINING_CONTAINER_SAS_URL to be defined: ${trainingContainerSasUrl}`
      );
    }

    try {
      const poller = await this.trainingClient.beginTraining(trainingContainerSasUrl, true);

      CustomModelRecognitionTest.sessionModel = await poller.pollUntilDone();

      console.log(`Trained custom model: ${CustomModelRecognitionTest.sessionModel.modelId}`);
    } catch (ex) {
      console.trace(ex);
      throw ex;
    }
  }

  public async globalCleanup() {
    const modelId = CustomModelRecognitionTest.sessionModel?.modelId;
    if (modelId) {
      console.log(`Deleting ${modelId}`);
      await this.trainingClient.deleteModel(modelId);
    }
  }

  async runAsync(): Promise<void> {
    const modelId = CustomModelRecognitionTest.sessionModel?.modelId;
    if (!modelId) {
      return unreachable("Failed to initialize model.");
    }

    const poller = await this.recognizerClient.beginRecognizeCustomFormsFromUrl(
      modelId,
      this.documentUrl
    );

    await poller.pollUntilDone();
  }
}
