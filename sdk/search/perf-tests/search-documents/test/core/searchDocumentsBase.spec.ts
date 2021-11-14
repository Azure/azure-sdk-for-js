import { PerfTest, getEnvVar } from "@azure/test-utils-perf";
import {
  SearchClient,
  AzureKeyCredential,
  SearchIndexClient,
  SearchIndex,
  KnownAnalyzerNames
} from "@azure/search-documents";
import { Hotel } from "./hotel";
import { generateHotels } from "./documentsGenerator";

export interface SearchDocumentsTestOptions {
  documentsCount: number;
}

export abstract class SearchDocumentsBase<TOptions = Record<string, unknown>> extends PerfTest<
  TOptions
> {
  searchIndexClient: SearchIndexClient;
  searchClient: SearchClient<Hotel>;
  indexName: string;
  suggesterName: string;

  constructor() {
    super();
    const credential = new AzureKeyCredential(getEnvVar("SEARCH_DOCUMENTS_API_KEY"));
    const endpoint = getEnvVar("SEARCH_DOCUMENTS_ENDPOINT");
    this.indexName = getEnvVar("SEARCH_DOCUMENTS_INDEXNAME");
    this.searchClient = new SearchClient<Hotel>(endpoint, this.indexName, credential);
    this.searchIndexClient = new SearchIndexClient(endpoint, credential);
    this.suggesterName = "sg";
  }

  public async globalSetup() {
    const hotelIndex: SearchIndex = {
      name: this.indexName,
      fields: [
        {
          type: "Edm.String",
          name: "hotelId",
          key: true,
          filterable: true,
          sortable: true
        },
        {
          type: "Edm.String",
          name: "hotelName",
          searchable: true,
          filterable: true,
          sortable: true
        },
        {
          type: "Edm.String",
          name: "description",
          searchable: true,
          analyzerName: KnownAnalyzerNames.EnLucene
        },
        {
          type: "Edm.String",
          name: "descriptionFr",
          searchable: true,
          analyzerName: KnownAnalyzerNames.FrLucene
        },
        {
          type: "Edm.String",
          name: "category",
          searchable: true,
          filterable: true,
          sortable: true,
          facetable: true
        },
        {
          type: "Collection(Edm.String)",
          name: "tags",
          searchable: true,
          filterable: true,
          facetable: true
        },
        {
          type: "Edm.Boolean",
          name: "parkingIncluded",
          filterable: true,
          sortable: true,
          facetable: true
        },
        {
          type: "Edm.Boolean",
          name: "smokingAllowed",
          filterable: true,
          sortable: true,
          facetable: true
        },
        {
          type: "Edm.DateTimeOffset",
          name: "lastRenovationDate",
          filterable: true,
          sortable: true,
          facetable: true
        },
        {
          type: "Edm.Double",
          name: "rating",
          filterable: true,
          sortable: true,
          facetable: true
        },
        {
          type: "Edm.GeographyPoint",
          name: "location",
          filterable: true,
          sortable: true
        },
        {
          type: "Edm.ComplexType",
          name: "address",
          fields: [
            {
              type: "Edm.String",
              name: "streetAddress",
              searchable: true
            },
            {
              type: "Edm.String",
              name: "city",
              searchable: true,
              filterable: true,
              sortable: true,
              facetable: true
            },
            {
              type: "Edm.String",
              name: "stateProvince",
              searchable: true,
              filterable: true,
              sortable: true,
              facetable: true
            },
            {
              type: "Edm.String",
              name: "country",
              searchable: true,
              filterable: true,
              sortable: true,
              facetable: true
            },
            {
              type: "Edm.String",
              name: "postalCode",
              searchable: true,
              filterable: true,
              sortable: true,
              facetable: true
            }
          ]
        },
        {
          type: "Collection(Edm.ComplexType)",
          name: "rooms",
          fields: [
            {
              type: "Edm.String",
              name: "description",
              searchable: true,
              analyzerName: KnownAnalyzerNames.EnLucene
            },
            {
              type: "Edm.String",
              name: "descriptionFr",
              searchable: true,
              analyzerName: KnownAnalyzerNames.FrLucene
            },
            {
              type: "Edm.String",
              name: "type",
              searchable: true,
              filterable: true,
              facetable: true
            },
            {
              type: "Edm.Double",
              name: "baseRate",
              filterable: true,
              facetable: true
            },
            {
              type: "Edm.String",
              name: "bedOptions",
              searchable: true,
              filterable: true,
              facetable: true
            },
            {
              type: "Edm.Int32",
              name: "sleepsCount",
              filterable: true,
              facetable: true
            },
            {
              type: "Edm.Boolean",
              name: "smokingAllowed",
              filterable: true,
              facetable: true
            },
            {
              type: "Collection(Edm.String)",
              name: "tags",
              searchable: true,
              filterable: true,
              facetable: true
            }
          ]
        }
      ],
      suggesters: [
        {
          name: "sg",
          searchMode: "analyzingInfixMatching",
          sourceFields: ["description", "hotelName"]
        }
      ],
      scoringProfiles: [
        {
          name: "nearest",
          functionAggregation: "sum",
          functions: [
            {
              type: "distance",
              fieldName: "location",
              boost: 2,
              parameters: {
                referencePointParameter: "myloc",
                boostingDistance: 100
              }
            }
          ]
        }
      ],
      corsOptions: {
        // for browser tests
        allowedOrigins: ["*"]
      }
    };
    await this.searchIndexClient.createIndex(hotelIndex);
  }

  public async globalCleanup() {
    await this.searchIndexClient.deleteIndex(this.indexName);
  }

  public async populateIndex(documentsCount: number) {
    const hotels = generateHotels(documentsCount);
    while (hotels.length > 0) {
      const hotelsToUpload = hotels.splice(0, 100);
      await this.searchClient.uploadDocuments(hotelsToUpload);
    }
  }
}
