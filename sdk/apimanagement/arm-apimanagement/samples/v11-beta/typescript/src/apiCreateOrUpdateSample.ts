// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates new or updates existing specified API of the API Management service instance.
 *
 * @summary creates new or updates existing specified API of the API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateApi.json
 */
async function apiManagementCreateApi(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.api.createOrUpdate("rg1", "apimService1", "tempgroup", {
    path: "newapiPath",
    description: "apidescription5200",
    authenticationSettings: {
      oAuth2: { authorizationServerId: "authorizationServerId2283", scope: "oauth2scope2580" },
    },
    displayName: "apiname1463",
    protocols: ["https", "http"],
    serviceUrl: "http://newechoapi.cloudapp.net/api",
    subscriptionKeyParameterNames: { header: "header4520", query: "query3037" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates new or updates existing specified API of the API Management service instance.
 *
 * @summary creates new or updates existing specified API of the API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateApiClone.json
 */
async function apiManagementCreateApiClone(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.api.createOrUpdate("rg1", "apimService1", "echo-api2", {
    path: "echo2",
    description: "Copy of Existing Echo Api including Operations.",
    displayName: "Echo API2",
    isCurrent: true,
    protocols: ["http", "https"],
    serviceUrl: "http://echoapi.cloudapp.net/api",
    sourceApiId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/apis/58a4aeac497000007d040001",
    subscriptionRequired: true,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates new or updates existing specified API of the API Management service instance.
 *
 * @summary creates new or updates existing specified API of the API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateApiNewVersionUsingExistingApi.json
 */
async function apiManagementCreateApiNewVersionUsingExistingApi(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.api.createOrUpdate("rg1", "apimService1", "echoapiv3", {
    path: "echo2",
    description:
      "Create Echo API into a new Version using Existing Version Set and Copy all Operations.",
    apiVersion: "v4",
    apiVersionSetId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/apiVersionSets/aa9c59e6-c0cd-4258-9356-9ca7d2f0b458",
    displayName: "Echo API2",
    isCurrent: true,
    protocols: ["http", "https"],
    serviceUrl: "http://echoapi.cloudapp.net/api",
    sourceApiId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/apis/echoPath",
    subscriptionRequired: true,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates new or updates existing specified API of the API Management service instance.
 *
 * @summary creates new or updates existing specified API of the API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateApiRevisionFromExistingApi.json
 */
async function apiManagementCreateApiRevisionFromExistingApi(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.api.createOrUpdate("rg1", "apimService1", "echo-api;rev=3", {
    path: "echo",
    apiRevisionDescription: "Creating a Revision of an existing API",
    serviceUrl: "http://echoapi.cloudapp.net/apiv3",
    sourceApiId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/apis/echo-api",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates new or updates existing specified API of the API Management service instance.
 *
 * @summary creates new or updates existing specified API of the API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateApiUsingImportOverrideServiceUrl.json
 */
async function apiManagementCreateApiUsingImportOverrideServiceUrl(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.api.createOrUpdate("rg1", "apimService1", "apidocs", {
    format: "swagger-link",
    path: "petstoreapi123",
    serviceUrl: "http://petstore.swagger.wordnik.com/api",
    value: "http://apimpimportviaurl.azurewebsites.net/api/apidocs/",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates new or updates existing specified API of the API Management service instance.
 *
 * @summary creates new or updates existing specified API of the API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateApiUsingOai3Import.json
 */
async function apiManagementCreateApiUsingOai3Import(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.api.createOrUpdate("rg1", "apimService1", "petstore", {
    format: "openapi-link",
    path: "petstore",
    value:
      "https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore.yaml",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates new or updates existing specified API of the API Management service instance.
 *
 * @summary creates new or updates existing specified API of the API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateApiUsingOai3ImportWithTranslateRequiredQueryParametersConduct.json
 */
async function apiManagementCreateApiUsingOai3ImportWithTranslateRequiredQueryParametersConduct(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.api.createOrUpdate("rg1", "apimService1", "petstore", {
    format: "openapi-link",
    path: "petstore",
    translateRequiredQueryParametersConduct: "template",
    value:
      "https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore.yaml",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates new or updates existing specified API of the API Management service instance.
 *
 * @summary creates new or updates existing specified API of the API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateApiUsingSwaggerImport.json
 */
async function apiManagementCreateApiUsingSwaggerImport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.api.createOrUpdate("rg1", "apimService1", "petstore", {
    format: "swagger-link-json",
    path: "petstore",
    value: "http://petstore.swagger.io/v2/swagger.json",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates new or updates existing specified API of the API Management service instance.
 *
 * @summary creates new or updates existing specified API of the API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateApiUsingWadlImport.json
 */
async function apiManagementCreateApiUsingWadlImport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.api.createOrUpdate("rg1", "apimService1", "petstore", {
    format: "wadl-link-json",
    path: "collector",
    value:
      "https://developer.cisco.com/media/wae-release-6-2-api-reference/wae-collector-rest-api/application.wadl",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates new or updates existing specified API of the API Management service instance.
 *
 * @summary creates new or updates existing specified API of the API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateApiWithMultipleAuthServers.json
 */
async function apiManagementCreateApiWithMultipleAuthServers(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.api.createOrUpdate("rg1", "apimService1", "tempgroup", {
    path: "newapiPath",
    description: "apidescription5200",
    authenticationSettings: {
      oAuth2AuthenticationSettings: [
        { authorizationServerId: "authorizationServerId2283", scope: "oauth2scope2580" },
        { authorizationServerId: "authorizationServerId2284", scope: "oauth2scope2581" },
      ],
    },
    displayName: "apiname1463",
    protocols: ["https", "http"],
    serviceUrl: "http://newechoapi.cloudapp.net/api",
    subscriptionKeyParameterNames: { header: "header4520", query: "query3037" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates new or updates existing specified API of the API Management service instance.
 *
 * @summary creates new or updates existing specified API of the API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateApiWithMultipleOpenIdConnectProviders.json
 */
async function apiManagementCreateApiWithMultipleOpenIdConnectProviders(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.api.createOrUpdate("rg1", "apimService1", "tempgroup", {
    path: "newapiPath",
    description: "apidescription5200",
    authenticationSettings: {
      openidAuthenticationSettings: [
        {
          bearerTokenSendingMethods: ["authorizationHeader"],
          openidProviderId: "openidProviderId2283",
        },
        {
          bearerTokenSendingMethods: ["authorizationHeader"],
          openidProviderId: "openidProviderId2284",
        },
      ],
    },
    displayName: "apiname1463",
    protocols: ["https", "http"],
    serviceUrl: "http://newechoapi.cloudapp.net/api",
    subscriptionKeyParameterNames: { header: "header4520", query: "query3037" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates new or updates existing specified API of the API Management service instance.
 *
 * @summary creates new or updates existing specified API of the API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateApiWithOpenIdConnect.json
 */
async function apiManagementCreateApiWithOpenIdConnect(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.api.createOrUpdate("rg1", "apimService1", "tempgroup", {
    path: "petstore",
    description:
      "This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.",
    authenticationSettings: {
      openid: {
        bearerTokenSendingMethods: ["authorizationHeader"],
        openidProviderId: "testopenid",
      },
    },
    displayName: "Swagger Petstore",
    protocols: ["https"],
    serviceUrl: "http://petstore.swagger.io/v2",
    subscriptionKeyParameterNames: {
      header: "Ocp-Apim-Subscription-Key",
      query: "subscription-key",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates new or updates existing specified API of the API Management service instance.
 *
 * @summary creates new or updates existing specified API of the API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateGraphQLApi.json
 */
async function apiManagementCreateGraphQLApi(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.api.createOrUpdate("rg1", "apimService1", "tempgroup", {
    apiType: "graphql",
    path: "graphql-api",
    description: "apidescription5200",
    displayName: "apiname1463",
    protocols: ["http", "https"],
    serviceUrl: "https://api.spacex.land/graphql",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates new or updates existing specified API of the API Management service instance.
 *
 * @summary creates new or updates existing specified API of the API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateGrpcApi.json
 */
async function apiManagementCreateGrpcApi(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.api.createOrUpdate("rg1", "apimService1", "tempgroup", {
    apiType: "grpc",
    format: "grpc-link",
    path: "grpc-api",
    description: "apidescription5200",
    displayName: "apiname1463",
    protocols: ["https"],
    serviceUrl: "https://your-api-hostname/samples",
    value:
      "https://raw.githubusercontent.com/kedacore/keda/main/pkg/scalers/externalscaler/externalscaler.proto",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates new or updates existing specified API of the API Management service instance.
 *
 * @summary creates new or updates existing specified API of the API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateODataApi.json
 */
async function apiManagementCreateODataApi(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.api.createOrUpdate("rg1", "apimService1", "tempgroup", {
    apiType: "odata",
    format: "odata-link",
    path: "odata-api",
    description: "apidescription5200",
    displayName: "apiname1463",
    protocols: ["http", "https"],
    serviceUrl: "https://services.odata.org/TripPinWebApiService",
    value: "https://services.odata.org/TripPinWebApiService/$metadata",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates new or updates existing specified API of the API Management service instance.
 *
 * @summary creates new or updates existing specified API of the API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateSoapPassThroughApiUsingWsdlImport.json
 */
async function apiManagementCreateSoapPassThroughApiUsingWsdlImport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.api.createOrUpdate("rg1", "apimService1", "soapApi", {
    format: "wsdl-link",
    path: "currency",
    soapApiType: "soap",
    value: "http://www.webservicex.net/CurrencyConvertor.asmx?WSDL",
    wsdlSelector: {
      wsdlEndpointName: "CurrencyConvertorSoap",
      wsdlServiceName: "CurrencyConvertor",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates new or updates existing specified API of the API Management service instance.
 *
 * @summary creates new or updates existing specified API of the API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateSoapToRestApiUsingWsdlImport.json
 */
async function apiManagementCreateSoapToRestApiUsingWsdlImport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.api.createOrUpdate("rg1", "apimService1", "soapApi", {
    format: "wsdl-link",
    path: "currency",
    value: "http://www.webservicex.net/CurrencyConvertor.asmx?WSDL",
    wsdlSelector: {
      wsdlEndpointName: "CurrencyConvertorSoap",
      wsdlServiceName: "CurrencyConvertor",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates new or updates existing specified API of the API Management service instance.
 *
 * @summary creates new or updates existing specified API of the API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWebsocketApi.json
 */
async function apiManagementCreateWebSocketApi(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.api.createOrUpdate("rg1", "apimService1", "tempgroup", {
    apiType: "websocket",
    path: "newapiPath",
    description: "apidescription5200",
    displayName: "apiname1463",
    protocols: ["wss", "ws"],
    serviceUrl: "wss://echo.websocket.org",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateApi();
  await apiManagementCreateApiClone();
  await apiManagementCreateApiNewVersionUsingExistingApi();
  await apiManagementCreateApiRevisionFromExistingApi();
  await apiManagementCreateApiUsingImportOverrideServiceUrl();
  await apiManagementCreateApiUsingOai3Import();
  await apiManagementCreateApiUsingOai3ImportWithTranslateRequiredQueryParametersConduct();
  await apiManagementCreateApiUsingSwaggerImport();
  await apiManagementCreateApiUsingWadlImport();
  await apiManagementCreateApiWithMultipleAuthServers();
  await apiManagementCreateApiWithMultipleOpenIdConnectProviders();
  await apiManagementCreateApiWithOpenIdConnect();
  await apiManagementCreateGraphQLApi();
  await apiManagementCreateGrpcApi();
  await apiManagementCreateODataApi();
  await apiManagementCreateSoapPassThroughApiUsingWsdlImport();
  await apiManagementCreateSoapToRestApiUsingWsdlImport();
  await apiManagementCreateWebSocketApi();
}

main().catch(console.error);
