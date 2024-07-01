// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfTest, PerfOptionDictionary, getEnvVar } from "@azure-tools/test-perf";
import {
  AzureKeyCredential,
  DetectLanguageOptions,
  TextAnalyticsClient,
} from "@azure/ai-text-analytics";
import { DefaultAzureCredential } from "@azure/identity";

interface DetectLanguagePerfTestOptions extends DetectLanguageOptions {
  "documents-count": number;
}

export class DetectLanguageTest extends PerfTest<DetectLanguagePerfTestOptions> {
  options: PerfOptionDictionary<DetectLanguagePerfTestOptions> = {
    "documents-count": {
      required: true,
      description: "Number of documents",
      shortName: "n",
      longName: "docs-count",
      defaultValue: 1000,
    },
  };
  client: TextAnalyticsClient;
  docs: string[] = [];

  constructor() {
    super();
    this.options = this.parsedOptions;
    this.docs = Array(this.parsedOptions["documents-count"]?.value).fill(
      "Detta är ett dokument skrivet på engelska.",
    );
    const endpoint = getEnvVar("ENDPOINT");

    try {
      this.client = new TextAnalyticsClient(endpoint, new DefaultAzureCredential());
    } catch (e) {
      this.client = new TextAnalyticsClient(
        endpoint,
        new AzureKeyCredential(getEnvVar("LANGUAGE_API_KEY")),
      );
    }
  }

  async run(): Promise<void> {
    await this.client.detectLanguage(this.docs, "en");
  }
}
