# Migrate from Purview Catalog to Purview DataMap

This guide is intended to assist in the migration to Azure Purview DataMap client library [`purview-datamap-rest`](https://www.npmjs.com/package/@azure-rest/purview-datamap) from [`purview-catalog-rest`](https://www.npmjs.com/package/@azure-rest/purview-catalog). It will focus on side-by-side comparisons for similar operations between the two packages.

For those new to the Purview Data Map library, please refer to the [`purview-datamap-rest` readme](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-datamap-rest/README.md) and [`purview-datamap-rest` samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/purview/purview-datamap-rest/samples/v1-beta) for the `purview-datamap-rest` library rather than this guide.

## Table of contents

- [Migration benefits](#migration-benefits)
- [General changes](#general-changes)
  - [Package and client name](#package-and-client-name)
- [Additional samples](#additional-samples)

## Migration benefits

> Note: `purview-catalog-rest` has been [deprecated]. Please upgrade to `purview-datamap-rest` for continued support.


The new Purview DataMap library `purview-datamap-rest` includes the service models together with the GA DataMap APIs [API Document](https://learn.microsoft.com/rest/api/purview/datamapdataplane/operation-groups?view=rest-purview-datamapdataplane-2023-09-01). The client name and the operation names have slightly changed but the main functionality remains the same.

## General changes

### Package and client name

Previously in `purview-catalog-rest`, the client name is PurviewCatalog.

```js
import PurviewCatalog from "@azure-rest/purview-catalog";
import { DefaultAzureCredential } from "@azure/identity";
const client = PurviewCatalog(
  "https://<my-account-name>.purview.azure.com",
  new DefaultAzureCredential()
);
```

Now in `purview-datamap-rest`, the client name is PurviewDataMap.

```js
import PurviewDataMap from "@azure-rest/purview-datamap";
import { DefaultAzureCredential } from "@azure/identity";
const client = PurviewDataMap(
  "https://<my-account-name>.purview.azure.com",
  new DefaultAzureCredential()
);
```

## Additional samples

For more examples, see [Samples for Purview DataMap](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/purview/purview-datamap-rest#examples).