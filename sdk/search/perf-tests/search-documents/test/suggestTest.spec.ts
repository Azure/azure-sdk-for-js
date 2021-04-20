import { SearchDocumentsBase, SearchDocumentsTestOptions } from "./core/searchDocumentsBase.spec";
import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";

export class SuggestTest extends SearchDocumentsBase<SearchDocumentsTestOptions> {
  public options: PerfStressOptionDictionary<SearchDocumentsTestOptions> = {
    documentsCount: {
      required: true,
      description: "Number of Documents to be created",
      shortName: "dc",
      longName: "documentsCount",
      defaultValue: 10
    }
  };

  constructor() {
    super();
  }

  public async globalSetup() {
    await super.globalSetup();
    await super.populateIndex(this.parsedOptions.documentsCount.value!);
  }

  async runAsync(): Promise<void> {
    await this.searchClient.suggest("historic", this.suggesterName)
  }
}
