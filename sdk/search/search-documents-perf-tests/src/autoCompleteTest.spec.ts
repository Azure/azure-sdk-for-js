// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SearchDocumentsTestOptions } from "./core/searchDocumentsBase.spec.js";
import { SearchDocumentsBase } from "./core/searchDocumentsBase.spec.js";
import type { PerfOptionDictionary } from "@azure-tools/test-perf";

export class AutoCompleteTest extends SearchDocumentsBase<SearchDocumentsTestOptions> {
  public options: PerfOptionDictionary<SearchDocumentsTestOptions> = {
    documentsCount: {
      required: true,
      description: "Number of Documents to be created",
      shortName: "dc",
      longName: "documentsCount",
      defaultValue: 10,
    },
  };

  public async globalSetup(): Promise<void> {
    await super.globalSetup();
    await super.populateIndex(this.parsedOptions.documentsCount.value!);
  }

  async run(): Promise<void> {
    await this.searchClient.autocomplete("historic", this.suggesterName);
  }
}
