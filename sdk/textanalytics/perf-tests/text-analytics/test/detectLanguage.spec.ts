// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PerfStressTest,
  PerfStressOptionDictionary,
  getEnvVar
} from "@azure/test-utils-perfstress";
import {
  AzureKeyCredential,
  TextAnalyticsClient,
  DetectLanguageOptions
} from "@azure/ai-text-analytics";
import { TokenCredential, DefaultAzureCredential } from "@azure/identity";

export class DetectLanguageTest extends PerfStressTest<DetectLanguageOptions> {
  options: PerfStressOptionDictionary<DetectLanguageOptions>;
  client: TextAnalyticsClient;
  docs: string[] = [];

  constructor() {
    super();
    this.options = {};
    let credential: TokenCredential | AzureKeyCredential;

    try {
      credential = new DefaultAzureCredential();
    } catch (e) {
      credential = new AzureKeyCredential(process.env.TEXT_ANALYTICS_API_KEY ?? "");
    }

    const endpoint = getEnvVar("ENDPOINT");

    this.client = new TextAnalyticsClient(endpoint, credential);
  }

  async runAsync(): Promise<void> {
    await this.client.detectLanguage(
      Array(10).fill("Detta är ett dokument skrivet på engelska."),
      "en"
    );
  }
}
