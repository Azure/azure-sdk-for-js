// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PerfOptionDictionary, PerfTest, getEnvVar } from "@azure-tools/test-perf";
import {
  AzureKeyCredential,
  DocumentModelDetails,
  DocumentAnalysisClient,
  DocumentModelAdministrationClient,
} from "@azure/ai-form-recognizer";
import { DefaultAzureCredential, TokenCredential } from "@azure/identity";
import { randomUUID } from "@azure/core-util";

function unreachable(message?: string): never {
  throw new Error(message ?? "Unreachable Exception.");
}

interface CustomModelRecognitionTestOptions {
  updateIntervalInMs: number;
}

export class CustomModelRecognitionTest extends PerfTest<CustomModelRecognitionTestOptions> {
  public options: PerfOptionDictionary<CustomModelRecognitionTestOptions> = {
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
  static sessionModel: DocumentModelDetails | undefined = undefined;

  private recognizerClient: DocumentAnalysisClient;
  private trainingClient: DocumentModelAdministrationClient;

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

    this.trainingClient = new DocumentModelAdministrationClient(endpoint, credential);
    this.recognizerClient = new DocumentAnalysisClient(endpoint, credential);

    this.documentUrl = getEnvVar("FORM_RECOGNIZER_TEST_DOCUMENT_URL");
  }

  public async globalSetup(): Promise<void> {
    const trainingContainerSasUrl = getEnvVar("FORM_RECOGNIZER_TRAINING_CONTAINER_SAS_URL");

    try {
      const poller = await this.trainingClient.beginBuildDocumentModel(
        randomUUID(),
        trainingContainerSasUrl,
        "template",
      );

      CustomModelRecognitionTest.sessionModel = await poller.pollUntilDone();

      console.log(`Trained custom model: ${CustomModelRecognitionTest.sessionModel.modelId}`);
    } catch (ex) {
      console.trace(ex);
      throw ex;
    }
  }

  public async globalCleanup(): Promise<void> {
    const modelId = CustomModelRecognitionTest.sessionModel?.modelId;
    if (modelId) {
      console.log(`Deleting ${modelId}`);
      await this.trainingClient.deleteDocumentModel(modelId);
    }
  }

  async run(): Promise<void> {
    const modelId = CustomModelRecognitionTest.sessionModel?.modelId;
    if (!modelId) {
      return unreachable("Failed to initialize model.");
    }

    const poller = await this.recognizerClient.beginAnalyzeDocumentFromUrl(
      modelId,
      this.documentUrl,
      {
        updateIntervalInMs: this.parsedOptions.updateIntervalInMs?.value,
      },
    );

    await poller.pollUntilDone();
  }
}
