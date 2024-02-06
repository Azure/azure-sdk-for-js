import { SearchDocumentsBase, SearchDocumentsTestOptions } from "./core/searchDocumentsBase.spec";
import { PerfOptionDictionary } from "@azure/test-utils-perf";
import { generateHotels } from "./core/documentsGenerator";
import { Hotel } from "./core/hotel";
import { IndexDocumentsBatch } from "@azure/search-documents";

export class IndexDocumentsTest extends SearchDocumentsBase<SearchDocumentsTestOptions> {
  public options: PerfOptionDictionary<SearchDocumentsTestOptions> = {
    documentsCount: {
      required: true,
      description: "Number of Documents to be created",
      shortName: "dc",
      longName: "documentsCount",
      defaultValue: 10,
    },
  };
  private hotels: Hotel[];

  constructor() {
    super();
    this.hotels = generateHotels(this.parsedOptions.documentsCount.value!);
  }

  async run(): Promise<void> {
    for (let i = 0; i < this.hotels.length; i++) {
      this.hotels[i].hotelId = Math.floor(
        Math.random() * (this.hotels.length * 2 - this.hotels.length + 1) + this.hotels.length
      ).toString();
    }
    const batch: IndexDocumentsBatch<Hotel> = new IndexDocumentsBatch<Hotel>();
    batch.upload(this.hotels);
    await this.searchClient.indexDocuments(batch);
  }
}
