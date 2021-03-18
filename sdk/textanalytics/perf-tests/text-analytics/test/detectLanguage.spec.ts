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

interface DetectLanguagePerfTestOptions extends DetectLanguageOptions {
  "documents-count": number;
}

export class DetectLanguageTest extends PerfStressTest<DetectLanguagePerfTestOptions> {
  options: PerfStressOptionDictionary<DetectLanguagePerfTestOptions> = {
    "documents-count": {
      required: true,
      description: "Number of documents",
      shortName: "n",
      longName: "docs-count",
      defaultValue: 1000
    }
  };
  client: TextAnalyticsClient;
  docs: string[] = [];

  constructor() {
    super();
    this.options = this.parsedOptions;
    this.docs = Array(this.parsedOptions["documents-count"]?.value).fill(
      "Detta är ett dokument skrivet på engelska."
    );
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
    await this.client.detectLanguage(this.docs, "en");
  }
}
