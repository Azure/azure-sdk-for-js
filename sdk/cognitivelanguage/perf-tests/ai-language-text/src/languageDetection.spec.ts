// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PerfTest, PerfOptionDictionary, getEnvVar } from "@azure-tools/test-perf";
import {
  AzureKeyCredential,
  TextAnalysisClient,
  LanguageDetectionAction,
  AnalyzeActionNames,
} from "@azure/ai-language-text";
import { DefaultAzureCredential } from "@azure/identity";

interface LanguageDetectionPerfTestOptions extends LanguageDetectionAction {
  "documents-count": number;
}

export class LanguageDetectionTest extends PerfTest<LanguageDetectionPerfTestOptions> {
  options: PerfOptionDictionary<LanguageDetectionPerfTestOptions> = {
    "documents-count": {
      required: true,
      description: "Number of documents",
      shortName: "n",
      longName: "docs-count",
      defaultValue: 1000,
    },
  };
  client: TextAnalysisClient;
  docs: string[] = [];

  constructor() {
    super();
    this.options = this.parsedOptions;
    this.docs = Array(this.parsedOptions["documents-count"]?.value).fill(
      "Detta är ett dokument skrivet på engelska.",
    );
    const endpoint = getEnvVar("ENDPOINT");

    try {
      this.client = new TextAnalysisClient(endpoint, new DefaultAzureCredential());
    } catch (e) {
      this.client = new TextAnalysisClient(
        endpoint,
        new AzureKeyCredential(getEnvVar("LANGUAGE_API_KEY")),
      );
    }
  }

  async run(): Promise<void> {
    await this.client.analyze(AnalyzeActionNames.LanguageDetection, this.docs, "en");
  }
}
