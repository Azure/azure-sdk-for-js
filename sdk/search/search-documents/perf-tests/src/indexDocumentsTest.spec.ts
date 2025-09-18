// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SearchDocumentsTestOptions } from "./core/searchDocumentsBase.spec.js";
import { SearchDocumentsBase } from "./core/searchDocumentsBase.spec.js";
import type { PerfOptionDictionary } from "@azure-tools/test-perf";
import { generateHotels } from "./core/documentsGenerator.js";
import type { Hotel } from "./core/hotel.js";
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
        Math.random() * (this.hotels.length * 2 - this.hotels.length + 1) + this.hotels.length,
      ).toString();
    }
    const batch: IndexDocumentsBatch<Hotel> = new IndexDocumentsBatch<Hotel>();
    batch.upload(this.hotels);
    await this.searchClient.indexDocuments(batch);
  }
}
