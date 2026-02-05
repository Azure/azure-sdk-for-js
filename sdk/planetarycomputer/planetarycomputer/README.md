# Azure Planetary Computer Pro client library for JavaScript

The [Microsoft Planetary Computer Pro][service_overview] is a geospatial data management service built on Azure's hyperscale infrastructure. The GeoCatalog is an Azure resource that provides foundational capabilities to ingest, manage, search, and distribute geospatial datasets using the [SpatioTemporal Asset Catalog (STAC)][stac_spec] open specification.

Key links:

- [Source code][source_code]
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

   ```ts snippet:ReadmeSampleCreateClient
   import { DefaultAzureCredential } from "@azure/identity";
   import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

   // [START ReadmeSampleCreateClient]
   const credential = new DefaultAzureCredential();
   const catalogUri = "<your-geocatalog-endpoint>"; // e.g., "https://your-geocatalog.geocatalogs.azure.com"
   const client = new PlanetaryComputerProClient(catalogUri, credential);
   ```

## Key concepts

### PlanetaryComputerProClient

`PlanetaryComputerProClient` is the primary interface for developers using the Microsoft Planetary Computer Pro client library. The client provides access to several operation groups:

- **stac**: STAC API operations for searching and managing geospatial data collections and items
- **data**: Data API operations for accessing pixel-level data through mosaic and tiling endpoints  
- **ingestion**: Ingestion API operations for uploading and managing geospatial datasets
- **sharedAccessSignature**: Operations for generating time-limited access tokens for secure data sharing

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

This section provides examples of using the features of Microsoft Planetary Computer Pro. For additional examples, check out the samples folder.

### List STAC Collections

List all collections in your GeoCatalog:

```ts snippet:ReadmeSampleListCollections
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

// [START ReadmeSampleListCollections]
const credential = new DefaultAzureCredential();
const catalogUri = "<your-geocatalog-endpoint>";
const client = new PlanetaryComputerProClient(catalogUri, credential);
const collections = await client.stac.listCollections();
console.log(`Found ${collections.collections.length} collections`);
for (const collection of collections.collections) {
  console.log(`- ${collection.id}: ${collection.description}`);
}
```

### Search for STAC Items

Search for geospatial data within a geographic bounding box and time range:

```ts snippet:ReadmeSampleSearchItems
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

// [START ReadmeSampleSearchItems]
const credential = new DefaultAzureCredential();
const catalogUri = "<your-geocatalog-endpoint>";
const client = new PlanetaryComputerProClient(catalogUri, credential);
const searchResult = await client.stac.search({
  collections: ["naip-atl"],
  filterLang: "cql2-json",
  filter: {
    op: "s_intersects",
    args: [
      { property: "geometry" },
      {
        type: "Polygon",
        coordinates: [
          [
            [-122.5, 47.0],
            [-122.0, 47.0],
            [-122.0, 47.5],
            [-122.5, 47.5],
            [-122.5, 47.0],
          ],
        ],
      },
    ],
  },
  datetime: "2024-01-01T00:00:00Z/2024-12-31T23:59:59Z",
  limit: 10,
} as any);
if (searchResult.type === "FeatureCollection") {
  console.log(`Found ${searchResult.features.length} items`);
  for (const item of searchResult.features) {
    console.log(`Item ID: ${item.id}, Collection: ${item.collection}`);
  }
}
```

### Create a STAC Collection

Organize your geospatial datasets by creating STAC Collections:

```ts snippet:ReadmeSampleCreateCollection
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

// [START ReadmeSampleCreateCollection]
const credential = new DefaultAzureCredential();
const catalogUri = "<your-geocatalog-endpoint>";
const client = new PlanetaryComputerProClient(catalogUri, credential);
const collectionId = "my-satellite-imagery";
await client.stac.createCollection({
  id: collectionId,
  type: "Collection",
  stacVersion: "1.0.0",
  description: "My satellite imagery collection",
  license: "proprietary",
  extent: {
    spatial: {
      boundingBox: [[-180, -90, 180, 90]],
    },
    temporal: {
      interval: [[new Date("2024-01-01T00:00:00Z"), null]],
    },
  },
  links: [],
} as any);
console.log(`Collection '${collectionId}' created successfully`);
```

### Ingest a STAC Item

Upload geospatial data to your GeoCatalog by creating STAC Items:

```ts snippet:ReadmeSampleCreateItem
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

// [START ReadmeSampleCreateItem]
const credential = new DefaultAzureCredential();
const catalogUri = "<your-geocatalog-endpoint>";
const client = new PlanetaryComputerProClient(catalogUri, credential);
const collectionId = "my-satellite-imagery";
const itemId = "my-item-001";
await client.stac.createItem(collectionId, {
  id: itemId,
  type: "Feature",
  stacVersion: "1.0.0",
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-122.5, 47.0],
        [-122.0, 47.0],
        [-122.0, 47.5],
        [-122.5, 47.5],
        [-122.5, 47.0],
      ],
    ],
  },
  properties: {
    datetime: "2024-01-01T00:00:00Z",
  },
  assets: {},
  links: [],
  collection: collectionId,
} as any);
console.log(`Item '${itemId}' created successfully in collection '${collectionId}'`);
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

- Explore the samples folder for detailed examples
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
[cla]: https://cla.microsoft.com
[code_of_conduct]: https://opensource.microsoft.com/codeofconduct/
[code_of_conduct_faq]: https://opensource.microsoft.com/codeofconduct/faq/
[email_opencode]: mailto:opencode@microsoft.com
