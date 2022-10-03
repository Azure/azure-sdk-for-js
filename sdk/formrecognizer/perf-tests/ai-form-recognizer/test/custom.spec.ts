// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfOptionDictionary, PerfTest, getEnvVar } from "@azure/test-utils-perf";
import {
  AzureKeyCredential,
  BeginRecognizeCustomFormsOptions,
  CustomFormModel,
  FormRecognizerClient,
  FormTrainingClient,
} from "@azure/ai-form-recognizer";
import { DefaultAzureCredential, TokenCredential } from "@azure/identity";

function unreachable(message?: string): never {
  throw new Error(message ?? "Unreachable Exception.");
}

export class CustomModelRecognitionTest extends PerfTest<BeginRecognizeCustomFormsOptions> {
  public options: PerfOptionDictionary<BeginRecognizeCustomFormsOptions> = {
    updateIntervalInMs: {
      required: false,
      description: "Polling interval in milliseconds",
      shortName: "u",
      longName: "update-interval",
      defaultValue: 5000,
    },
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
      credential = new AzureKeyCredential(getEnvVar("FORM_RECOGNIZER_API_KEY"));
    }

    const endpoint = getEnvVar("FORM_RECOGNIZER_ENDPOINT");

    this.trainingClient = new FormTrainingClient(endpoint, credential);
    this.recognizerClient = new FormRecognizerClient(endpoint, credential);

    this.documentUrl = getEnvVar("FORM_RECOGNIZER_TEST_DOCUMENT_URL");
  }

  public async globalSetup(): Promise<void> {
    const trainingContainerSasUrl = getEnvVar("FORM_RECOGNIZER_TRAINING_CONTAINER_SAS_URL");

    try {
      const poller = await this.trainingClient.beginTraining(trainingContainerSasUrl, true);

      CustomModelRecognitionTest.sessionModel = await poller.pollUntilDone();

      console.log(`Trained custom model: ${CustomModelRecognitionTest.sessionModel.modelId}`);
    } catch (ex: any) {
      console.trace(ex);
      throw ex;
    }
  }

  public async globalCleanup(): Promise<void> {
    const modelId = CustomModelRecognitionTest.sessionModel?.modelId;
    if (modelId) {
      console.log(`Deleting ${modelId}`);
      await this.trainingClient.deleteModel(modelId);
    }
  }

  async run(): Promise<void> {
    const modelId = CustomModelRecognitionTest.sessionModel?.modelId;
    if (!modelId) {
      return unreachable("Failed to initialize model.");
    }

    const poller = await this.recognizerClient.beginRecognizeCustomFormsFromUrl(
      modelId,
      this.documentUrl,
      {
        updateIntervalInMs: this.parsedOptions.updateIntervalInMs?.value,
      }
    );

    await poller.pollUntilDone();
  }
}
