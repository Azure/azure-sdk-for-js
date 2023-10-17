# Microsoft Azure Data Manager for Agriculture REST client library for JavaScript

Microsoft Azure Data Manager for Agriculture is a B2B PaaS offering from Microsoft that makes it easy for AgriFood companies to build intelligent digital agriculture solutions on Azure.Data Manager for Agriculture acquire, aggregate, and process agricultural data from various sources (farm equipment, weather, satellite) without the need to invest in deep data engineering resources.  Customers can build SaaS solutions on top of Data Manager for Agriculture and leverage first class support for model building to generate insights at scale.

Use Data Manager for Agriculture client library for JavaScript to do the following.

- Create & update parties, farms, fields, seasonal fields and boundaries.
- Ingest satellite and weather data for areas of interest.
- Ingest farm operations data covering tilling, planting, harvesting and application of farm inputs.

**Please rely heavily on the [service's documentation][product_documentation] and our [REST client docs][rest_client] to use this library**

Key links:

- [Source code][source_code]
- [Package (NPM)][npm]
- [API reference documentation][ref_docs]
- [Product documentation][product_documentation]

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)

### Prerequisites

- You must have an [Azure subscription][azure_subscription].
- Microsoft Azure Data Manager for Agriculture resource - [Microsoft Azure Data Manager for Agriculture][install_farmbeats]

### Install the `@azure-rest/agrifood-farming` package

Install the Data Manager for Agriculture rest client library for JavaScript with `npm`:

```bash
npm install @azure-rest/agrifood-farming
```

### Create and authenticate a `Microsoft Azure Data Manager for Agriculture` REST Client

To use an [Azure Active Directory (AAD) token credential][authenticate_with_token],
provide an instance of the desired credential type obtained from the
[@azure/identity][azure_identity_credentials] library.

To authenticate with AAD, you must first `npm` install [`@azure/identity`][azure_identity_npm].

After setup, you can choose which type of [credential][azure_identity_credentials] from `@azure/identity` to use.
As an example, [DefaultAzureCredential][default_azure_credential]
can be used to authenticate the client:

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables:
AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET

Use the returned token credential to authenticate the client:

```typescript
import FarmBeats from "@azure-rest/agrifood-farming";
import { DefaultAzureCredential } from "@azure/identity";

const client = FarmBeats(
  "https://<farmbeats resource name>.farmbeats.azure.net",
  new DefaultAzureCredential()
);
```

## Key concepts

### REST Client

This client is one of our REST clients. We highly recommend you read how to use a REST client [here][rest_client].

### [Farm Hierarchy][farm_hierarchy]

Farm hierarchy is a collection of below entities.

- Party - is the custodian of all the agronomic data.
- Farm - is a logical collection of fields and/or seasonal fields. They do not have any area associated with them.
- Field - is a multi-polygon area. This is expected to be stable across seasons.
- Seasonal field - is a multi-polygon area. To define a seasonal boundary we need the details of area (boundary), time (season) and crop. New seasonal fields are expected to be created for every growing season.
- Boundary - is the actual multi-polygon area expressed as a geometry (in geojson). It is normally associated with a field or a seasonal field. Satellite, weather and farm operations data is linked to a boundary.
- Cascade delete - Agronomic data is stored hierarchically with party as the root. The hierarchy includes Party -> Farms -> Fields -> Seasonal Fields -> Boundaries -> Associated data (satellite, weather, farm operations). Cascade delete refers to the process of deleting any node and its subtree.

### [Scenes][scenes]

Scenes refers to images normally ingested using satellite APIs. This includes raw bands and derived bands (Ex: NDVI). Scenes may also include spatial outputs of an inference or AI/ML model (Ex: LAI).

### [Farm Operations][farm_operations_docs]

Fam operations includes details pertaining to tilling, planting, application of pesticides & nutrients, and harvesting. This can either be manually pushed into FarmBeats using APIs or the same information can be pulled from farm equipment service providers like John Deere.

## Examples

### Create a Party

Once you have authenticated and created the client object as shown in the [Authenticate the client](#create-and-authenticate-a-farmbeats-rest-client)
section, you can create a party within the Data Manager for Agriculture resource like this:

```typescript
import FarmBeats, { isUnexpected } from "@azure-rest/agrifood-farming";
import { DefaultAzureCredential } from "@azure/identity";

const client = FarmBeats(
  "https://<farmbeats resource name>.farmbeats.azure.net",
  new DefaultAzureCredential()
);

const partyId = "test_party";
const result = await farmbeatsClient.path("/parties/{partyId}", partyId).patch({
  body: {
    name: "Contoso Party",
    description: "Your custom party description here",
    status: "Active",
    properties: { foo: "bar", "numeric one": 1, "1": "numeric key" },
  },
  // Set the content-type of the request
  contentType: "application/merge-patch+json",
});

if (isUnexpected(result)) {
  throw result.body.error;
}

const party = result.body;
console.log(`Created Party: ${party.name}`);
```

### List Parties

```typescript
import FarmBeats, { isUnexpected } from "@azure-rest/agrifood-farming";
import { DefaultAzureCredential } from "@azure/identity";

const client = FarmBeats(
  "https://<farmbeats resource name>.farmbeats.azure.net",
  new DefaultAzureCredential()
);

const response = await farmbeatsClient.path("/parties").get();

if (isUnexpected(response)) {
  throw response.body.error;
}

const parties = paginate(farmbeatsClient, response);

// Log each party id
for await (const party of parties) {
  const partyOutput = party;
  console.log(partyOutput.id);
}
```

### Additional Samples

For additional samples, please refer to the [samples folder][samples_folder]

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

### Additional documentation

For more extensive documentation on the FarmBeats, see the [FarmBeats documentation][product_docs] on docs.microsoft.com.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fagrifood%2Fagrifood-farming-rest%2FREADME.png)

[product_documentation]: https://docs.microsoft.com/azure/industry/agriculture/overview-azure-farmbeats
[rest_client]: https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md
[source_code]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/agrifood/agrifood-farming-rest
[npm]: https://www.npmjs.com/org/azure-rest
[ref_docs]: https://azure.github.io/azure-sdk-for-js
[azure_subscription]: https://azure.microsoft.com/free/
[farmbeats_resource]: https://docs.microsoft.com/azure/industry/agriculture/install-azure-farmbeats
[authenticate_with_token]: https://docs.microsoft.com/azure/cognitive-services/authentication?tabs=powershell#authenticate-with-an-authentication-token
[azure_identity_credentials]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials
[azure_identity_npm]: https://www.npmjs.com/package/@azure/identity
[default_azure_credential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
[install_farmbeats]: https://aka.ms/FarmBeatsInstallDocumentationPaaS
[farm_hierarchy]: https://aka.ms/FarmBeatsFarmHierarchyDocs
[scenes]: https://aka.ms/FarmBeatsSatellitePaaSDocumentation
[farm_operations_docs]: https://aka.ms/FarmBeatsFarmOperationsDocumentation
[product_docs]: https://aka.ms/FarmBeatsProductDocumentationPaaS
