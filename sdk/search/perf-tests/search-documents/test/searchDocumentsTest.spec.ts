import { SearchDocumentsBase, SearchDocumentsTestOptions } from "./core/searchDocumentsBase.spec";
import { PerfOptionDictionary } from "@azure/test-utils-perf";

export class SearchDocumentsTest extends SearchDocumentsBase<SearchDocumentsTestOptions> {
  public options: PerfOptionDictionary<SearchDocumentsTestOptions> = {
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

  async run(): Promise<void> {
    await this.searchClient.search("");
  }
}
