// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfTest, PerfOptionDictionary, getEnvVar } from "@azure/test-utils-perf";
import {
  AzureKeyCredential,
  TextAnalysisClient,
  LanguageDetectionAction,
  AnalyzeActionNames,
} from "@azure/ai-text-analytics";
import { DefaultAzureCredential } from "@azure/identity";

interface DetectLanguagePerfTestOptions extends LanguageDetectionAction {
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
  client: TextAnalysisClient;
  docs: string[] = [];

  constructor() {
    super();
    this.options = this.parsedOptions;
    this.docs = Array(this.parsedOptions["documents-count"]?.value).fill(
      "Detta är ett dokument skrivet på engelska."
    );
    const endpoint = getEnvVar("ENDPOINT");

    try {
      this.client = new TextAnalysisClient(endpoint, new DefaultAzureCredential());
    } catch (e) {
      this.client = new TextAnalysisClient(
        endpoint,
        new AzureKeyCredential(process.env.LANGUAGE_API_KEY ?? "")
      );
    }
  }

  async run(): Promise<void> {
    await this.client.analyze(AnalyzeActionNames.LanguageDetection, this.docs, "en");
  }
}
