// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assertEnvironmentVariable, isLiveMode, isPlaybackMode } from "@azure-tools/test-recorder";
import { computeSha256Hash, delay, isDefined } from "@azure/core-util";
import type { OpenAIClient } from "@azure/openai";
import { assert } from "vitest";
import type {
  SearchClient,
  SearchField,
  SearchIndex,
  SearchIndexClient,
  SearchIndexerClient,
  VectorSearchAlgorithmConfiguration,
  VectorSearchCompression,
  VectorSearchProfile,
  VectorSearchVectorizer,
} from "../../../src/index.js";
import { GeographyPoint, KnownAnalyzerNames } from "../../../src/index.js";
import type { Hotel } from "./interfaces.js";

export const WAIT_TIME = isPlaybackMode() ? 0 : 4000;

export async function createIndex(
  client: SearchIndexClient,
  name: string,
  serviceVersion: string,
): Promise<SearchIndex> {
  const isPreview = serviceVersion.toLowerCase().includes("preview");

  const vectorizers: VectorSearchVectorizer[] = [
    {
      kind: "azureOpenAI",
      vectorizerName: "vector-search-vectorizer",
      parameters: {
        deploymentId: assertEnvironmentVariable("AZURE_OPENAI_DEPLOYMENT_NAME"),
        resourceUrl: assertEnvironmentVariable("AZURE_OPENAI_ENDPOINT"),
        modelName: "text-embedding-ada-002",
      },
    },
  ];
  await Promise.all(vectorizers.map((v) => renameUniquelyInPlace("vectorizerName", v)));
  const [azureOpenAiVectorizerName] = vectorizers.map((v) => v.vectorizerName);

  const algorithmConfigurations: VectorSearchAlgorithmConfiguration[] = [
    {
      name: "vector-search-algorithm-configuration",
      kind: "hnsw",
      parameters: { metric: "dotProduct" },
    },
    {
      name: "vector-search-algorithm-configuration",
      kind: "exhaustiveKnn",
      parameters: { metric: "euclidean" },
    },
  ];
  await Promise.all(algorithmConfigurations.map((c) => renameUniquelyInPlace("name", c)));
  const [hnswAlgorithmConfigurationName, exhaustiveKnnAlgorithmConfigurationName] =
    algorithmConfigurations.map((c) => c.name);

  const compressionConfigurations: VectorSearchCompression[] = [
    {
      compressionName: "vector-search-compression-configuration",
      kind: "scalarQuantization",
      parameters: { quantizedDataType: "int8" },
      rerankWithOriginalVectors: true,
    },
  ];
  await Promise.all(
    compressionConfigurations.map((c) => renameUniquelyInPlace("compressionName", c)),
  );
  const [scalarQuantizationCompressionConfigurationName] = compressionConfigurations.map(
    (c) => c.compressionName,
  );

  const vectorSearchProfiles: VectorSearchProfile[] = [
    {
      name: "vector-search-profile",
      vectorizerName: isPreview ? azureOpenAiVectorizerName : undefined,
      algorithmConfigurationName: exhaustiveKnnAlgorithmConfigurationName,
    },
    {
      name: "vector-search-profile",
      vectorizerName: isPreview ? azureOpenAiVectorizerName : undefined,
      algorithmConfigurationName: hnswAlgorithmConfigurationName,
      compressionName: isPreview ? scalarQuantizationCompressionConfigurationName : undefined,
    },
  ];
  await Promise.all(vectorSearchProfiles.map((p) => renameUniquelyInPlace("name", p)));
  const [azureOpenAiVectorSearchProfileName, azureOpenAiCompressedVectorSearchProfileName] =
    vectorSearchProfiles.map((p) => p.name);

  const vectorFields: SearchField[] = [
    {
      type: "Collection(Edm.Single)",
      name: "vectorDescription",
      searchable: true,
      vectorSearchDimensions: 1536,
      hidden: true,
      vectorSearchProfileName: azureOpenAiVectorSearchProfileName,
    },
    {
      type: "Collection(Edm.Half)",
      name: "compressedVectorDescription",
      searchable: true,
      hidden: true,
      vectorSearchDimensions: 1536,
      vectorSearchProfileName: azureOpenAiCompressedVectorSearchProfileName,
      stored: false,
    },
  ];

  const fields: SearchField[] = [
    {
      type: "Edm.String",
      name: "hotelId",
      key: true,
      filterable: true,
      sortable: true,
    },
    {
      type: "Edm.String",
      name: "hotelName",
      searchable: true,
      filterable: true,
      sortable: true,
    },
    {
      type: "Edm.String",
      name: "description",
      searchable: true,
      analyzerName: KnownAnalyzerNames.EnLucene,
    },
    {
      type: "Edm.String",
      name: "descriptionFr",
      searchable: true,
      analyzerName: KnownAnalyzerNames.FrLucene,
    },
    {
      type: "Edm.String",
      name: "category",
      searchable: true,
      filterable: true,
      sortable: true,
      facetable: true,
    },
    {
      type: "Collection(Edm.String)",
      name: "tags",
      searchable: true,
      filterable: true,
      facetable: true,
    },
    {
      type: "Edm.Boolean",
      name: "parkingIncluded",
      filterable: true,
      sortable: true,
      facetable: true,
    },
    {
      type: "Edm.Boolean",
      name: "smokingAllowed",
      filterable: true,
      sortable: true,
      facetable: true,
    },
    {
      type: "Edm.DateTimeOffset",
      name: "lastRenovationDate",
      filterable: true,
      sortable: true,
      facetable: true,
    },
    {
      type: "Edm.Double",
      name: "rating",
      filterable: true,
      sortable: true,
      facetable: true,
    },
    {
      type: "Edm.GeographyPoint",
      name: "location",
      filterable: true,
      sortable: true,
    },
    {
      type: "Edm.ComplexType",
      name: "address",
      fields: [
        {
          type: "Edm.String",
          name: "streetAddress",
          searchable: true,
        },
        {
          type: "Edm.String",
          name: "city",
          searchable: true,
          filterable: true,
          sortable: true,
          facetable: true,
        },
        {
          type: "Edm.String",
          name: "stateProvince",
          searchable: true,
          filterable: true,
          sortable: true,
          facetable: true,
        },
        {
          type: "Edm.String",
          name: "country",
          searchable: true,
          filterable: true,
          sortable: true,
          facetable: true,
        },
        {
          type: "Edm.String",
          name: "postalCode",
          searchable: true,
          filterable: true,
          sortable: true,
          facetable: true,
        },
      ],
    },
    {
      type: "Collection(Edm.ComplexType)",
      name: "rooms",
      fields: [
        {
          type: "Edm.String",
          name: "description",
          searchable: true,
          analyzerName: KnownAnalyzerNames.EnLucene,
        },
        {
          type: "Edm.String",
          name: "descriptionFr",
          searchable: true,
          analyzerName: KnownAnalyzerNames.FrLucene,
        },
        {
          type: "Edm.String",
          name: "type",
          searchable: true,
          filterable: true,
          facetable: true,
        },
        {
          type: "Edm.Double",
          name: "baseRate",
          filterable: true,
          facetable: true,
        },
        {
          type: "Edm.String",
          name: "bedOptions",
          searchable: true,
          filterable: true,
          facetable: true,
        },
        {
          type: "Edm.Int32",
          name: "sleepsCount",
          filterable: true,
          facetable: true,
        },
        {
          type: "Edm.Boolean",
          name: "smokingAllowed",
          filterable: true,
          facetable: true,
        },
        {
          type: "Collection(Edm.String)",
          name: "tags",
          searchable: true,
          filterable: true,
          facetable: true,
        },
      ],
    },
    ...vectorFields,
  ];

  const hotelIndex: SearchIndex = {
    name,
    fields,
    suggesters: [
      {
        name: "sg",
        searchMode: "analyzingInfixMatching",
        sourceFields: ["description", "hotelName"],
      },
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
              boostingDistance: 100,
            },
          },
        ],
      },
    ],
    corsOptions: {
      // for browser tests
      allowedOrigins: ["*"],
    },
    vectorSearch: {
      algorithms: algorithmConfigurations,
      vectorizers: isPreview ? vectorizers : undefined,
      compressions: isPreview ? compressionConfigurations : undefined,
      profiles: vectorSearchProfiles,
    },
    semanticSearch: {
      defaultConfigurationName: "semantic-configuration",
      configurations: [
        {
          name: "semantic-configuration",
          prioritizedFields: {
            titleField: { name: "hotelName" },
            contentFields: [{ name: "description" }],
            keywordsFields: [{ name: "tags" }],
          },
        },
      ],
    },
  };

  return client.createIndex(hotelIndex);
}

export async function populateIndex(
  client: SearchClient<Hotel>,
  openAIClient: OpenAIClient,
): Promise<void> {
  // test data from https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/search/Azure.Search.Documents/tests/Utilities/SearchResources.Data.cs
  const testDocuments: Hotel[] = [
    {
      hotelId: "1",
      description:
        "Best hotel in town if you like luxury hotels. They have an amazing infinity pool, a spa, " +
        "and a really helpful concierge. The location is perfect -- right downtown, close to all " +
        "the tourist attractions. We highly recommend this hotel.",
      descriptionFr:
        "Meilleur hôtel en ville si vous aimez les hôtels de luxe. Ils ont une magnifique piscine " +
        "à débordement, un spa et un concierge très utile. L'emplacement est parfait – en plein " +
        "centre, à proximité de toutes les attractions touristiques. Nous recommandons fortement " +
        "cet hôtel.",
      hotelName: "Fancy Stay",
      category: "Luxury",
      tags: ["pool", "view", "wifi", "concierge"],
      parkingIncluded: false,
      smokingAllowed: false,
      lastRenovationDate: new Date(Date.UTC(2010, 5, 27)),
      rating: 5,
      location: new GeographyPoint({
        longitude: -122.131577,
        latitude: 47.678581,
      }),
    },
    {
      hotelId: "2",
      description: "Cheapest hotel in town. Infact, a motel.",
      descriptionFr: "Hôtel le moins cher en ville. Infact, un motel.",
      hotelName: "Roach Motel",
      category: "Budget",
      tags: ["motel", "budget"],
      parkingIncluded: true,
      smokingAllowed: true,
      lastRenovationDate: new Date(Date.UTC(1982, 3, 28)),
      rating: 1,
      location: new GeographyPoint({
        longitude: -122.131577,
        latitude: 49.678581,
      }),
    },
    {
      hotelId: "3",
      description: "Very popular hotel in town",
      descriptionFr: "Hôtel le plus populaire en ville",
      hotelName: "EconoStay",
      category: "Budget",
      tags: ["wifi", "budget"],
      parkingIncluded: true,
      smokingAllowed: false,
      lastRenovationDate: new Date(Date.UTC(1995, 6, 1)),
      rating: 4,
      location: new GeographyPoint({
        longitude: -122.131577,
        latitude: 46.678581,
      }),
    },
    {
      hotelId: "4",
      description: "Pretty good hotel",
      descriptionFr: "Assez bon hôtel",
      hotelName: "Express Rooms",
      category: "Budget",
      tags: ["wifi", "budget"],
      parkingIncluded: true,
      smokingAllowed: false,
      lastRenovationDate: new Date(Date.UTC(1995, 6, 1)),
      rating: 4,
      location: new GeographyPoint({
        longitude: -122.131577,
        latitude: 46.678581,
      }),
    },
    {
      hotelId: "5",
      description: "Another good hotel",
      descriptionFr: "Un autre bon hôtel",
      hotelName: "Comfy Place",
      category: "Budget",
      tags: ["wifi", "budget"],
      parkingIncluded: true,
      smokingAllowed: false,
      lastRenovationDate: new Date(Date.UTC(2012, 7, 12)),
      rating: 4,
      location: new GeographyPoint({
        longitude: -122.131577,
        latitude: 48.678581,
      }),
    },
    {
      hotelId: "6",
      description: "Surprisingly expensive. Model suites have an ocean-view.",
      lastRenovationDate: null,
    },
    {
      hotelId: "7",
      description: "Modern architecture, very polite staff and very clean. Also very affordable.",
      descriptionFr: "Architecture moderne, personnel poli et très propre. Aussi très abordable.",
      hotelName: "Modern Stay",
    },
    {
      hotelId: "8",
      description:
        "Has some road noise and is next to the very police station. Bathrooms had morel coverings.",
      descriptionFr:
        "Il y a du bruit de la route et se trouve à côté de la station de police. Les salles de bain avaient des revêtements de morilles.",
    },
    {
      hotelId: "9",
      hotelName: "Secret Point Motel",
      description:
        "The hotel is ideally located on the main commercial artery of the city in the heart of New York. A few minutes away is Time's Square and the historic centre of the city, as well as other places of interest that make New York one of America's most attractive and cosmopolitan cities.",
      descriptionFr:
        "L'hôtel est idéalement situé sur la principale artère commerciale de la ville en plein cœur de New York. A quelques minutes se trouve la place du temps et le centre historique de la ville, ainsi que d'autres lieux d'intérêt qui font de New York l'une des villes les plus attractives et cosmopolites de l'Amérique.",
      category: "Boutique",
      tags: ["pool", "air conditioning", "concierge"],
      parkingIncluded: false,
      smokingAllowed: true,
      lastRenovationDate: new Date(Date.UTC(1970, 0, 18)),
      rating: 4,
      location: new GeographyPoint({
        longitude: -73.975403,
        latitude: 40.760586,
      }),
      address: {
        streetAddress: "677 5th Ave",
        city: "New York",
        stateProvince: "NY",
        country: "USA",
        postalCode: "10022",
      },
      rooms: [
        {
          description: "Budget Room, 1 Queen Bed (Cityside)",
          descriptionFr: "Chambre Économique, 1 grand lit (côté ville)",
          type: "Budget Room",
          baseRate: 9.69,
          bedOptions: "1 Queen Bed",
          sleepsCount: 2,
          smokingAllowed: true,
          tags: ["vcr/dvd"],
        },
        {
          description: "Budget Room, 1 King Bed (Mountain View)",
          descriptionFr: "Chambre Économique, 1 très grand lit (Mountain View)",
          type: "Budget Room",
          baseRate: 8.09,
          bedOptions: "1 King Bed",
          sleepsCount: 2,
          smokingAllowed: true,
          tags: ["vcr/dvd", "jacuzzi tub"],
        },
      ],
    },
    {
      hotelId: "10",
      hotelName: "Countryside Hotel",
      description:
        "Save up to 50% off traditional hotels.  Free WiFi, great location near downtown, full kitchen, washer & dryer, 24/7 support, bowling alley, fitness center and more.",
      descriptionFr:
        "Économisez jusqu'à 50% sur les hôtels traditionnels.  WiFi gratuit, très bien situé près du centre-ville, cuisine complète, laveuse & sécheuse, support 24/7, bowling, centre de fitness et plus encore.",
      category: "Budget",
      tags: ["24-hour front desk service", "coffee in lobby", "restaurant"],
      parkingIncluded: false,
      smokingAllowed: true,
      lastRenovationDate: new Date(Date.UTC(1999, 8, 6)),
      rating: 3,
      location: new GeographyPoint({
        longitude: -78.940483,
        latitude: 35.90416,
      }),
      address: {
        streetAddress: "6910 Fayetteville Rd",
        city: "Durham",
        stateProvince: "NC",
        country: "USA",
        postalCode: "27713",
      },
      rooms: [
        {
          description: "Suite, 1 King Bed (Amenities)",
          descriptionFr: "Suite, 1 très grand lit (Services)",
          type: "Suite",
          baseRate: 2.44,
          bedOptions: "1 King Bed",
          sleepsCount: 2,
          smokingAllowed: true,
          tags: ["coffee maker"],
        },
        {
          description: "Budget Room, 1 Queen Bed (Amenities)",
          descriptionFr: "Chambre Économique, 1 grand lit (Services)",
          type: "Budget Room",
          baseRate: 7.69,
          bedOptions: "1 Queen Bed",
          sleepsCount: 2,
          smokingAllowed: false,
          tags: ["coffee maker"],
        },
      ],
    },
  ];

  if (!isLiveMode()) {
    await addVectorDescriptions(testDocuments, openAIClient);
  }

  await client.uploadDocuments(testDocuments);

  while ((await client.getDocumentsCount()) !== testDocuments.length) {
    await delay(WAIT_TIME);
  }
}

async function addVectorDescriptions(
  documents: Hotel[],
  openAIClient: OpenAIClient,
): Promise<void> {
  const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME ?? "deployment-name";

  const descriptions = documents.map(({ description }) => description).filter(isDefined);

  const embeddingsArray = await openAIClient.getEmbeddings(deploymentName, descriptions);

  embeddingsArray.data.forEach((embeddingItem) => {
    const { embedding, index } = embeddingItem;
    const document = documents[index];
    document.vectorDescription = embedding;
    document.compressedVectorDescription = embedding;
  });
}

export async function deleteDataSourceConnections(client: SearchIndexerClient): Promise<void> {
  for (let i = 1; i <= 2; i++) {
    await client.deleteDataSourceConnection(`my-data-source-${i}`);
  }
}

export async function createSkillsets(client: SearchIndexerClient): Promise<void> {
  const testCaseNames: string[] = ["my-azureblob-skillset-1", "my-azureblob-skillset-2"];
  const skillSetNames: string[] = await client.listSkillsetsNames();
  const unCommonElements: string[] = skillSetNames.filter(
    (element) => !testCaseNames.includes(element),
  );
  if (unCommonElements.length > 0) {
    // There are skillsets which are already existing in this subscription.
    // We do not want to delete them by accident. So, we are returning without further
    // action. The test cases will fail. Please do not use a subscription which already
    // has skillsets for testing.
    assert.fail("Subscription has other skillsets not related to this testing.");
  }

  for (const skillSet of skillSetNames) {
    await client.deleteSkillset(skillSet);
  }

  for (let i = 1; i <= 2; i++) {
    await client.createSkillset({
      name: `my-azureblob-skillset-${i}`,
      description: `Skillset description`,
      skills: [
        {
          odatatype: "#Microsoft.Skills.Text.EntityRecognitionSkill",
          inputs: [
            {
              name: "text",
              source: "/document/merged_content",
            },
            {
              name: "languageCode",
              source: "/document/language",
            },
          ],
          outputs: [
            {
              name: "persons",
              targetName: "people",
            },
            {
              name: "locations",
              targetName: "locations",
            },
          ],
        },
      ],
    });
  }
}

export async function deleteSkillsets(client: SearchIndexerClient): Promise<void> {
  for (let i = 1; i <= 2; i++) {
    await client.deleteSkillset(`my-azureblob-skillset-${i}`);
  }
}

export async function createIndexers(
  client: SearchIndexerClient,
  targetIndexName: string,
): Promise<void> {
  const testCaseNames: string[] = ["my-azure-indexer-1", "my-azure-indexer-2"];
  const indexerNames: string[] = await client.listIndexersNames();
  const unCommonElements: string[] = indexerNames.filter(
    (element) => !testCaseNames.includes(element),
  );
  if (unCommonElements.length > 0) {
    // There are indexers which are already existing in this subscription.
    // We do not want to delete them by accident. So, we are returning without further
    // action. The test cases will fail. Please do not use a subscription which already
    // has indexers for testing.
    assert.fail("Subscription has other indexers not related to this testing.");
  }

  for (const indexer of indexerNames) {
    await client.deleteIndexer(indexer);
  }

  for (let i = 1; i <= 2; i++) {
    await client.createIndexer({
      name: `my-azure-indexer-${i}`,
      description: "Description for Sample Indexer",
      dataSourceName: "my-data-source-1",
      targetIndexName: targetIndexName,
      isDisabled: false,
    });
  }
}

export async function deleteIndexers(client: SearchIndexerClient): Promise<void> {
  for (let i = 1; i <= 2; i++) {
    await client.deleteIndexer(`my-azure-indexer-${i}`);
  }
}

export async function createSynonymMaps(client: SearchIndexClient): Promise<void> {
  const testCaseNames: string[] = ["my-azure-synonymmap-1", "my-azure-synonymmap-2"];
  const synonymMapNames: string[] = await client.listSynonymMapsNames();
  const unCommonElements: string[] = synonymMapNames.filter(
    (element) => !testCaseNames.includes(element),
  );
  if (unCommonElements.length > 0) {
    // There are synonym maps which are already existing in this subscription.
    // We do not want to delete them by accident. So, we are returning without further
    // action. The test cases will fail. Please do not use a subscription which already
    // has synonym maps for testing.
    assert.fail("Subscription has other synonymmaps not related to this testing.");
  }

  for (const synonymMap of synonymMapNames) {
    await client.deleteSynonymMap(synonymMap);
  }

  for (let i = 1; i <= 2; i++) {
    await client.createSynonymMap({
      name: `my-azure-synonymmap-${i}`,
      synonyms: ["United States, United States of America => USA", "Washington, Wash. => WA"],
    });
  }
}

export async function deleteSynonymMaps(client: SearchIndexClient): Promise<void> {
  for (let i = 1; i <= 2; i++) {
    await client.deleteSynonymMap(`my-azure-synonymmap-${i}`);
  }
}

export async function createSimpleIndex(client: SearchIndexClient, name: string): Promise<void> {
  const index: SearchIndex = {
    name,
    fields: [
      {
        type: "Edm.String",
        name: "id",
        key: true,
      },
      {
        type: "Edm.Double",
        name: "awesomenessLevel",
        sortable: true,
        filterable: true,
        facetable: true,
      },
      {
        type: "Edm.String",
        name: "description",
        searchable: true,
      },
      {
        type: "Edm.ComplexType",
        name: "details",
        fields: [
          {
            type: "Collection(Edm.String)",
            name: "tags",
            searchable: true,
          },
        ],
      },
      {
        type: "Edm.Int32",
        name: "hiddenWeight",
        hidden: true,
      },
    ],
  };
  await client.createIndex(index);
}

export function createRandomIndexName(): string {
  return `hotel-live-test-${Math.floor(Math.random() * 100000) + 1000000}`;
}

async function renameUniquelyInPlace<T extends string>(
  prop: T,
  obj: Record<typeof prop, string>,
): Promise<void> {
  const hash = await computeSha256Hash(JSON.stringify(obj), "hex");
  const name = [obj[prop], hash.toLowerCase()].join("-");
  obj[prop] = name;
}
