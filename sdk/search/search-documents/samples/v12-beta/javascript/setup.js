// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Defines the utility methods.
 */

const { KnownAnalyzerNames } = require("@azure/search-documents");
require("dotenv/config");
const { env } = require("node:process");
const WAIT_TIME = 4000;

const documentKeyRetriever = (document) => {
  return document.hotelId;
};

/**
 * A wrapper for setTimeout that resolves a promise after timeInMs milliseconds.
 * @param timeInMs - The number of milliseconds to be delayed.
 * @returns Promise that is resolved after timeInMs
 */
function delay(timeInMs) {
  return new Promise((resolve) => setTimeout(resolve, timeInMs));
}

async function createIndex(client, name) {
  const hotelIndex = {
    name,
    fields: [
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
        type: "Collection(Edm.Single)",
        name: "descriptionVectorEn",
        searchable: true,
        vectorSearchDimensions: 1536,
        vectorSearchProfileName: "vector-search-profile",
      },
      {
        type: "Collection(Edm.Single)",
        name: "descriptionVectorFr",
        searchable: true,
        vectorSearchDimensions: 1536,
        vectorSearchProfileName: "vector-search-profile",
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
    ],
    suggesters: [
      {
        name: "sg",
        sourceFields: ["description", "hotelName"],
        searchMode: "analyzingInfixMatching",
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
      algorithms: [{ name: "vector-search-algorithm", kind: "hnsw" }],
      vectorizers: [
        {
          vectorizerName: "vector-search-vectorizer",
          kind: "azureOpenAI",
          parameters: {
            modelName: env.AZURE_OPENAI_DEPLOYMENT_NAME,
            resourceUrl: env.AZURE_OPENAI_ENDPOINT,
            deploymentId: env.AZURE_OPENAI_DEPLOYMENT_NAME,
          },
        },
      ],
      profiles: [
        {
          name: "vector-search-profile",
          algorithmConfigurationName: "vector-search-algorithm",
          vectorizerName: "vector-search-vectorizer",
        },
      ],
    },
  };
  await client.createIndex(hotelIndex);
}

module.exports = { WAIT_TIME, documentKeyRetriever, delay, createIndex };
