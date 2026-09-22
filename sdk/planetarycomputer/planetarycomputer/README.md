# Azure Planetary Computer Pro client library for JavaScript

The [Microsoft Planetary Computer Pro][service_overview] is a geospatial data management service built on Azure's hyperscale infrastructure. The GeoCatalog is an Azure resource that provides foundational capabilities to ingest, manage, search, and distribute geospatial datasets using the [SpatioTemporal Asset Catalog (STAC)][stac_spec] open specification.

### Key capabilities

- **STAC Collection Management**: Create, read, update, and delete STAC collections and items to organize your geospatial datasets
- **Collection Configuration**: Configure render options, mosaics, tile settings, and queryables to optimize query performance and visualization
- **Data Visualization**: Generate map tiles (XYZ, TileJSON, WMTS), preview images, crop by GeoJSON or bounding box, extract point values, and compute statistics
- **Mosaic Operations**: Register STAC search-based mosaics for pixel-wise data query and retrieval, generate tiles from multiple items, and access TileJSON and WMTS capabilities
- **Map Legends**: Retrieve class map legends (categorical) and interval legends (continuous) as JSON or PNG images with predefined color maps
- **Data Ingestion**: Set up ingestion sources (Managed Identity or SAS token), define ingestions from STAC catalogs, and create and monitor ingestion runs
- **STAC API Operations**: Full CRUD operations on items, search with spatial/temporal filters and sorting, retrieve queryable properties, and check API conformance
- **Secure Access**: Generate SAS tokens with configurable duration for collections, sign asset HREFs for secure downloads, and revoke tokens—all secured via Microsoft Entra ID

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/planetarycomputer/planetarycomputer)
- [Package (NPM)](https://www.npmjs.com/package/@azure/planetarycomputer)
- [API reference documentation][api_ref_docs]
- [Product documentation][service_overview]

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription][azure_sub]
- A [Microsoft Planetary Computer Pro GeoCatalog resource][deploy_geocatalog]. You can create the resource via the [Azure Portal][azure_portal], the [Azure PowerShell][azure_powershell], or the [Azure CLI][azure_cli].

The GeoCatalog endpoint (catalogUri) can be found in the Azure Portal on your GeoCatalog resource's overview page.

### Install the `@azure/planetarycomputer` package

Install the Azure Planetary Computer Pro client library for JavaScript with `npm`:

```bash
npm install @azure/planetarycomputer
```

### Create and authenticate a `PlanetaryComputerProClient`

There are several ways to authenticate with the Microsoft Planetary Computer Pro service and the recommended way is to use Microsoft Entra ID for secure, keyless authentication via the [Azure Identity library][azure_identity]. To get started:

1. Install the [Azure Identity package](https://www.npmjs.com/package/@azure/identity):

```bash
npm install @azure/identity
```

2. [Register a new Microsoft Entra ID application and grant access to Microsoft Planetary Computer Pro][manage_access] by assigning the suitable role to your service principal.

3. Set the values of the client ID, tenant ID, and client secret of the Microsoft Entra ID application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

4. Create the client using [DefaultAzureCredential][azure_identity_dac]:

```ts snippet:ReadmeSampleCreateClient_Node
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

const credential = new DefaultAzureCredential();
const catalogUri = "<your-geocatalog-endpoint>"; // e.g., "https://your-geocatalog.geocatalogs.azure.com"
const client = new PlanetaryComputerProClient(catalogUri, credential);
```

## Key concepts

### PlanetaryComputerProClient

`PlanetaryComputerProClient` is the primary interface for developers using the Microsoft Planetary Computer Pro client library. The client provides access to several operation groups:

#### STAC Operations (`client.stac`)

- **Collection Management**: Create, update, list, and delete STAC collections to organize your geospatial datasets
- **Item Management**: Create, read, update, and delete individual STAC items within collections
- **Search API**: Search for items using spatial and temporal filters, sorting, and queryable properties
- **Configuration**: Manage render options, mosaics, tile settings, queryables, and partition types
- **API Conformance**: Retrieve STAC API conformance classes and landing page information

#### Data Operations (`client.data`)

- **Tile Generation**: Generate map tiles (XYZ, TileJSON, WMTS) from collections, items, and mosaics
- **Data Visualization**: Create preview images, crop by GeoJSON or bounding box, extract point values, and compute statistics
- **Mosaic Operations**: Register STAC search-based mosaics and retrieve mosaic tiles, TileJSON, and WMTS capabilities
- **Map Legends**: Retrieve class map and interval legends as JSON or PNG images
- **Asset Metadata**: Retrieve tile matrix sets and asset metadata for collections and items

#### Ingestion Operations (`client.ingestion`)

- **Ingestion Sources**: Set up ingestion sources using Managed Identity or SAS token authentication
- **Ingestion Definitions**: Define automated STAC catalog ingestion from public and private data sources
- **Ingestion Runs**: Create and monitor ingestion runs with detailed operation tracking

#### Shared Access Signature Operations (`client.sharedAccessSignature`)

- **Token Generation**: Generate SAS tokens with configurable duration for collections
- **Asset Signing**: Sign asset HREFs for secure downloads of managed storage assets
- **Token Revocation**: Revoke tokens when needed to control access

### GeoCatalog

A GeoCatalog is the top-level Azure resource that stores and organizes your geospatial data. It provides:

- Zone-redundant, managed storage for raster and data cube formats
- Built-in cloud-optimization for supported data types
- A managed STAC API for all stored data
- Integration with Azure's security and identity management through Microsoft Entra ID

### STAC (SpatioTemporal Asset Catalog)

STAC is an open specification for organizing and describing geospatial data. Microsoft Planetary Computer Pro uses STAC to provide:

- **Collections**: Logical groupings of related geospatial datasets
- **Items**: Individual assets (e.g., satellite imagery, rasters) with metadata
- **Assets**: The actual data files referenced by STAC Items

## Examples

This section provides code snippets covering common GeoCatalog workflows. For complete working examples, see the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/planetarycomputer/planetarycomputer/samples-dev) directory.

- [List STAC Collections](#list-stac-collections)
- [Search for STAC Items](#search-for-stac-items)
- [Get STAC Item Details](#get-stac-item-details)
- [Create a STAC Collection](#create-a-stac-collection)
- [Register and Render Mosaic Tiles](#register-and-render-mosaic-tiles)
- [Extract Point Values](#extract-point-values)
- [Generate Map Tiles](#generate-map-tiles)
- [Set Up Ingestion Source](#set-up-ingestion-source)
- [Data Ingestion Management](#data-ingestion-management)
- [Get a SAS Token](#get-a-sas-token)

### List STAC Collections

```ts snippet:ReadmeSampleListCollections
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

const credential = new DefaultAzureCredential();
const catalogUri = "<your-geocatalog-endpoint>";
const client = new PlanetaryComputerProClient(catalogUri, credential);
const collections = await client.stac.getCollections();
console.log(`Found ${collections.collections.length} collections`);
for (const collection of collections.collections) {
  console.log(`- ${collection.id}: ${collection.description}`);
}
```

### Search for STAC Items

```ts snippet:ReadmeSampleSearchItems
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

const credential = new DefaultAzureCredential();
const catalogUri = "<your-geocatalog-endpoint>";
const client = new PlanetaryComputerProClient(catalogUri, credential);
const searchResult = await client.stac.search({
  collections: ["naip"],
  datetime: "2021-01-01T00:00:00Z/2022-12-31T23:59:59Z",
  limit: 10,
});
console.log(`Found ${searchResult.features.length} items`);
for (const item of searchResult.features) {
  console.log(`Item ID: ${item.id}, Collection: ${item.collection}`);
}
```

### Get STAC Item Details

```ts snippet:ReadmeSampleGetItem
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

const credential = new DefaultAzureCredential();
const catalogUri = "<your-geocatalog-endpoint>";
const client = new PlanetaryComputerProClient(catalogUri, credential);
const item = await client.stac.getItem("naip", "ga_m_3308421_se_16_060_20211114");
console.log(`Item ID: ${item.id}`);
console.log(`Assets: ${Object.keys(item.assets)}`);
```

### Create a STAC Collection

```ts snippet:ReadmeSampleCreateCollection
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

const credential = new DefaultAzureCredential();
const catalogUri = "<your-geocatalog-endpoint>";
const client = new PlanetaryComputerProClient(catalogUri, credential);
const poller = await client.stac.createCollection({
  id: "my-collection",
  type: "Collection",
  stacVersion: "1.0.0",
  description: "A collection of geospatial data",
  license: "proprietary",
  extent: {
    spatial: { boundingBox: [[-180, -90, 180, 90]] },
    temporal: { interval: [[null, null]] },
  },
  links: [],
});
await poller.pollUntilDone();
console.log("Collection created");
```

### Register and Render Mosaic Tiles

```ts snippet:ReadmeSampleMosaicTiles
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

const credential = new DefaultAzureCredential();
const catalogUri = "<your-geocatalog-endpoint>";
const client = new PlanetaryComputerProClient(catalogUri, credential);
const registration = await client.data.registerMosaicsSearch({
  collections: ["naip"],
  filterLang: "cql2-json" as const,
  filter: { op: "=", args: [{ property: "naip:year" }, "2021"] },
});
console.log(`Search ID: ${registration.searchId}`);
const tileJson = await client.data.getSearchTileJson(registration.searchId, {
  assets: ["image"],
});
console.log(`Tile URLs: ${tileJson.tiles}`);
```

### Extract Point Values

```ts snippet:ReadmeSamplePointValues
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

const credential = new DefaultAzureCredential();
const catalogUri = "<your-geocatalog-endpoint>";
const client = new PlanetaryComputerProClient(catalogUri, credential);
const pointData = await client.data.getItemPoint(
  "naip",
  "ga_m_3308421_se_16_060_20211114",
  -84.41,
  33.65,
  { assets: ["image"] },
);
console.log(`Coordinates: ${pointData.coordinates}`);
console.log(`Values: ${pointData.values}`);
```

### Generate Map Tiles

```ts snippet:ReadmeSampleMapTile
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

const credential = new DefaultAzureCredential();
const catalogUri = "<your-geocatalog-endpoint>";
const client = new PlanetaryComputerProClient(catalogUri, credential);
const tileResponse = await client.data.getTile(
  "naip",
  "ga_m_3308421_se_16_060_20211114",
  "WebMercatorQuad",
  14,
  4322,
  6463,
  { assets: ["image"] },
);
console.log(`Tile size: ${tileResponse.length} bytes`);
```

### Set Up Ingestion Source

```ts snippet:ReadmeSampleIngestionSource
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

const credential = new DefaultAzureCredential();
const catalogUri = "<your-geocatalog-endpoint>";
const client = new PlanetaryComputerProClient(catalogUri, credential);
const source = await client.ingestion.createSource({
  id: "my-storage-source",
  kind: "BlobManagedIdentity",
  connectionInfo: {
    containerUri: "https://mystorage.blob.core.windows.net/geospatial-data",
    objectId: "00000000-0000-0000-0000-000000000000",
  },
});
console.log(`Created source: ${source.id}`);
```

### Data Ingestion Management

```ts snippet:ReadmeSampleIngestion
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

const credential = new DefaultAzureCredential();
const catalogUri = "<your-geocatalog-endpoint>";
const client = new PlanetaryComputerProClient(catalogUri, credential);
const ingestion = await client.ingestion.create("my-collection", {
  importType: "StaticCatalog",
  displayName: "My data ingestion",
  sourceCatalogUrl: "https://example.com/catalog.json",
  keepOriginalAssets: true,
  skipExistingItems: true,
});
console.log(`Created ingestion: ${ingestion.id}`);
```

### Get a SAS Token

```ts snippet:ReadmeSampleGetSasToken
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

const credential = new DefaultAzureCredential();
const catalogUri = "<your-geocatalog-endpoint>";
const client = new PlanetaryComputerProClient(catalogUri, credential);
const token = await client.sharedAccessSignature.getToken("naip");
console.log(`Token expires at: ${token.expiresOn}`);
// Sign an asset URL for secure download
const signed = await client.sharedAccessSignature.getUrl(
  "https://storage.blob.core.windows.net/container/asset.tif",
);
console.log(`Signed URL: ${signed.href}`);
```

## Troubleshooting

### General

Planetary Computer Pro client library will raise exceptions defined in [Azure Core](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/core-rest-pipeline).

```ts snippet:ReadmeSampleErrorHandling
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";
import { RestError } from "@azure/core-rest-pipeline";

const credential = new DefaultAzureCredential();
const catalogUri = "<your-geocatalog-endpoint>";
const client = new PlanetaryComputerProClient(catalogUri, credential);
try {
  await client.stac.getCollection("non-existent-collection");
} catch (e) {
  if (e instanceof RestError) {
    console.log(`Status code: ${e.statusCode}`);
    console.log(`Message: ${e.message}`);
  }
}
```

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

### More sample code

For complete working examples, see the individual sample files:

| Scenario | Sample |
|---|---|
| STAC Collection Management | [stacCreateCollectionSample.ts][sample_create_collection] |
| STAC Item Management | [stacCreateItemSample.ts][sample_create_item] |
| STAC Search | [stacSearchSample.ts][sample_search] |
| Mosaic Registration | [dataRegisterMosaicsSearchSample.ts][sample_register_mosaic] |
| Map Tile Generation | [dataGetTileSample.ts][sample_get_tile] |
| Point Values | [dataGetPointSample.ts][sample_get_point] |
| Ingestion Setup | [ingestionCreateSourceSample.ts][sample_create_source] |
| Ingestion Management | [ingestionCreateSample.ts][sample_create_ingestion] |
| SAS Token | [sharedAccessSignatureGetTokenSample.ts][sample_get_token] |
| Map Legends | [dataGetLegendSample.ts][sample_get_legend] |

### Additional documentation

- Learn more about [Microsoft Planetary Computer Pro][service_overview]
- Read the [STAC Specification][stac_spec]
- See how to [Deploy a GeoCatalog resource][deploy_geocatalog]
- Understand how to [Manage access to Microsoft Planetary Computer Pro][manage_access]

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

This project welcomes contributions and suggestions. Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit [cla.microsoft.com][cla].

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct][code_of_conduct]. For more information, see the [Code of Conduct FAQ][code_of_conduct_faq] or contact [opencode@microsoft.com][email_opencode] with any additional questions or comments.

<!-- LINKS -->

[source_code]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/planetarycomputer/planetarycomputer
[service_overview]: https://learn.microsoft.com/azure/planetary-computer/microsoft-planetary-computer-pro-overview
[stac_spec]: https://stacspec.org/
[deploy_geocatalog]: https://learn.microsoft.com/azure/planetary-computer/deploy-geocatalog-resource
[manage_access]: https://learn.microsoft.com/azure/planetary-computer/manage-access
[azure_cli]: https://learn.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com
[azure_portal]: https://portal.azure.com
[azure_powershell]: https://learn.microsoft.com/powershell/azure
[azure_identity]: https://learn.microsoft.com/javascript/api/overview/azure/identity-readme
[azure_identity_dac]: https://learn.microsoft.com/javascript/api/@azure/identity/defaultazurecredential
[api_ref_docs]: https://learn.microsoft.com/javascript/api/@azure/planetarycomputer
[cla]: https://cla.microsoft.com
[code_of_conduct]: https://opensource.microsoft.com/codeofconduct/
[code_of_conduct_faq]: https://opensource.microsoft.com/codeofconduct/faq/
[email_opencode]: mailto:opencode@microsoft.com
[sample_create_collection]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/planetarycomputer/planetarycomputer/samples-dev/stacCreateCollectionSample.ts
[sample_create_item]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/planetarycomputer/planetarycomputer/samples-dev/stacCreateItemSample.ts
[sample_search]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/planetarycomputer/planetarycomputer/samples-dev/stacSearchSample.ts
[sample_register_mosaic]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/planetarycomputer/planetarycomputer/samples-dev/dataRegisterMosaicsSearchSample.ts
[sample_get_tile]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/planetarycomputer/planetarycomputer/samples-dev/dataGetTileSample.ts
[sample_get_point]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/planetarycomputer/planetarycomputer/samples-dev/dataGetPointSample.ts
[sample_create_source]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/planetarycomputer/planetarycomputer/samples-dev/ingestionCreateSourceSample.ts
[sample_create_ingestion]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/planetarycomputer/planetarycomputer/samples-dev/ingestionCreateSample.ts
[sample_get_token]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/planetarycomputer/planetarycomputer/samples-dev/sharedAccessSignatureGetTokenSample.ts
[sample_get_legend]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/planetarycomputer/planetarycomputer/samples-dev/dataGetLegendSample.ts
