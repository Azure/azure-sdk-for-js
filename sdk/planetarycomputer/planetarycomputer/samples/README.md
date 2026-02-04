# Azure Planetary Computer Pro Client Library Samples

These TypeScript samples demonstrate how to use the Azure Planetary Computer Pro SDK to interact with GeoCatalog services.

## Prerequisites

- Node.js 18+
- Azure subscription with Planetary Computer Pro access
- Azure CLI for authentication

## Environment Variables

Set the following environment variables before running the samples:

```bash
# Required for all samples
export PLANETARYCOMPUTER_ENDPOINT="https://your-geocatalog-endpoint.azure.com"
export PLANETARYCOMPUTER_COLLECTION_ID="your-collection-id"

# Required for some item operations
export PLANETARYCOMPUTER_ITEM_ID="your-item-id"

# Required for ingestion samples (optional)
export PLANETARYCOMPUTER_INGESTION_CONTAINER_URI="https://yourstorage.blob.core.windows.net/container"
export PLANETARYCOMPUTER_INGESTION_CATALOG_URL="https://example.com/catalog.json"
export PLANETARYCOMPUTER_MANAGED_IDENTITY_OBJECT_ID="your-managed-identity-object-id"
export PLANETARYCOMPUTER_INGESTION_SAS_CONTAINER_URI="https://yourstorage.blob.core.windows.net/container"
export PLANETARYCOMPUTER_INGESTION_SAS_TOKEN="sv=2023-01-03&sr=c&sig=..."
```

## Running the Samples

First, authenticate with Azure:

```bash
az login
```

Then run any sample:

```bash
npx ts-node 00_stacCollection.ts
npx ts-node 01_ingestionManagement.ts
npx ts-node 02_stacSpecification.ts
npx ts-node 03_sharedAccessSignature.ts
npx ts-node 04_stacItemTiler.ts
npx ts-node 05_mosaicsTiler.ts
npx ts-node 06_mapLegends.ts
```

## Sample Descriptions

### [00_stacCollection.ts](./00_stacCollection.ts)

Demonstrates STAC collection operations:
- Creating and deleting STAC collections
- Updating collection metadata
- Managing partition types
- Creating and managing render options
- Creating and managing collection mosaics
- Managing tile settings and queryables

### [01_ingestionManagement.ts](./01_ingestionManagement.ts)

Demonstrates comprehensive ingestion management:
- Creating managed identity ingestion sources
- Creating SAS token ingestion sources
- Creating and running ingestion jobs
- Monitoring ingestion status
- Managing ingestion operations

**Note:** Ingestion operations can take significant time to complete.

### [02_stacSpecification.ts](./02_stacSpecification.ts)

Demonstrates STAC API operations:
- Checking API conformance
- Getting the landing page
- Searching collections
- Searching and querying items with filters
- Creating, updating, and deleting STAC items

**Note:** Item create/update/delete operations are long-running.

### [03_sharedAccessSignature.ts](./03_sharedAccessSignature.ts)

Demonstrates Shared Access Signature (SAS) operations:
- Generating SAS tokens for collections
- Signing asset HREFs for authenticated access
- Downloading assets using signed URLs
- Revoking SAS tokens

### [04_stacItemTiler.ts](./04_stacItemTiler.ts)

Demonstrates STAC item tiling operations:
- Getting tile matrix definitions
- Listing available assets
- Getting asset statistics
- Cropping images with GeoJSON
- Getting image previews
- Generating tiles and TileJSON

### [05_mosaicsTiler.ts](./05_mosaicsTiler.ts)

Demonstrates mosaic tiling and static image operations:
- Registering mosaic searches
- Getting mosaic tiles
- Getting WMTS capabilities
- Creating and retrieving static images

### [06_mapLegends.ts](./06_mapLegends.ts)

Demonstrates map legend operations:
- Getting class map legends (categorical)
- Getting interval legends (continuous)
- Downloading legend images

## Output Files

Several samples save output files locally:
- Tile images (PNG)
- Preview images (PNG)
- WMTS capabilities (XML)
- Legend images (PNG)
- Static images

These files are saved in the current working directory.

## Notes

- Some operations are **long-running** and may take several minutes to complete
- Collection creation and item ingestion can be particularly time-consuming
- Make sure you have appropriate permissions for all operations
- Always clean up test collections and items when done
