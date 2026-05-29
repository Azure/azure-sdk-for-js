# Azure Planetary Computer Pro client library for JavaScript

The [Microsoft Planetary Computer Pro][service_overview] is a geospatial data management service built on Azure's hyperscale infrastructure. The GeoCatalog is an Azure resource that provides foundational capabilities to ingest, manage, search, and distribute geospatial datasets using the [SpatioTemporal Asset Catalog (STAC)][stac_spec] open specification.

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/planetarycomputer/planetarycomputer)
- [Package (NPM)](https://www.npmjs.com/package/@azure/planetarycomputer)
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
  dateTime: "2021-01-01T00:00:00Z/2022-12-31T23:59:59Z",
  limit: 10,
} as any);
console.log(`Found ${searchResult.features.length} items`);
for (const item of searchResult.features) {
  console.log(`Item ID: ${item.id}, Collection: ${item.collection}`);
}
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
