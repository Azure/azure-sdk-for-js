# Azure Planetary Computer Pro client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure Planetary Computer Pro in some common scenarios.

| **File Name**                                                                       | **Description**                                      |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [dataCropGeoJsonSample.ts][datacropgeojsonsample]                                   | create image from a GeoJSON feature.                 |
| [dataCropGeoJsonWithDimensionsSample.ts][datacropgeojsonwithdimensionssample]       | create image from a GeoJSON feature with dimensions. |
| [dataGetAssetStatisticsSample.ts][datagetassetstatisticssample]                     | get per-asset statistics.                            |
| [dataGetBoundsSample.ts][datagetboundssample]                                       | get item bounds.                                     |
| [dataGetClassMapLegendSample.ts][datagetclassmaplegendsample]                       | get class map legend.                                |
| [dataGetGeoJsonStatisticsSample.ts][datagetgeojsonstatisticssample]                 | get statistics from a GeoJSON feature.               |
| [dataGetInfoGeoJsonSample.ts][datagetinfogeojsonsample]                             | get item info as GeoJSON.                            |
| [dataGetIntervalLegendSample.ts][datagetintervallegendsample]                       | get interval legend.                                 |
| [dataGetItemAssetDetailsSample.ts][datagetitemassetdetailssample]                   | get item asset details.                              |
| [dataGetLegendSample.ts][datagetlegendsample]                                       | get legend image.                                    |
| [dataGetMosaicsAssetsForPointSample.ts][datagetmosaicsassetsforpointsample]         | get mosaic assets for a point.                       |
| [dataGetMosaicsAssetsForTileSample.ts][datagetmosaicsassetsfortilesample]           | get mosaic assets for a tile.                        |
| [dataGetMosaicsSearchInfoSample.ts][datagetmosaicssearchinfosample]                 | get mosaic search query metadata.                    |
| [dataGetMosaicsTileJsonSample.ts][datagetmosaicstilejsonsample]                     | get mosaic TileJSON.                                 |
| [dataGetMosaicsTileSample.ts][datagetmosaicstilesample]                             | create a mosaic map tile.                            |
| [dataGetMosaicsWmtsCapabilitiesSample.ts][datagetmosaicswmtscapabilitiessample]     | get mosaic OGC WMTS capabilities.                    |
| [dataGetPartSample.ts][datagetpartsample]                                           | create image from part of a dataset.                 |
| [dataGetPartWithDimensionsSample.ts][datagetpartwithdimensionssample]               | create image from part of a dataset with dimensions. |
| [dataGetPointSample.ts][datagetpointsample]                                         | get point value for a dataset.                       |
| [dataGetPreviewSample.ts][datagetpreviewsample]                                     | create a preview of a dataset.                       |
| [dataGetPreviewWithFormatSample.ts][datagetpreviewwithformatsample]                 | create a preview with format in path.                |
| [dataGetTileJsonSample.ts][datagettilejsonsample]                                   | get TileJSON for a dataset.                          |
| [dataGetTileMatrixDefinitionsSample.ts][datagettilematrixdefinitionssample]         | get tile matrix definitions.                         |
| [dataGetTileSample.ts][datagettilesample]                                           | create map tile from a dataset.                      |
| [dataGetWmtsCapabilitiesSample.ts][datagetwmtscapabilitiessample]                   | get OGC WMTS capabilities.                           |
| [dataListAvailableAssetsSample.ts][datalistavailableassetssample]                   | list available assets for an item.                   |
| [dataListStatisticsSample.ts][dataliststatisticssample]                             | get merged asset statistics.                         |
| [dataListTileMatricesSample.ts][datalisttilematricessample]                         | list tile matrix sets.                               |
| [dataRegisterMosaicsSearchSample.ts][dataregistermosaicssearchsample]               | register a mosaic search query.                      |
| [ingestionCancelAllOperationsSample.ts][ingestioncancelalloperationssample]         | cancel all running operations.                       |
| [ingestionCancelOperationSample.ts][ingestioncanceloperationsample]                 | cancel a running operation.                          |
| [ingestionCreateRunSample.ts][ingestioncreaterunsample]                             | create a new ingestion run.                          |
| [ingestionCreateSample.ts][ingestioncreatesample]                                   | create a new ingestion.                              |
| [ingestionCreateSourceSample.ts][ingestioncreatesourcesample]                       | create an ingestion source.                          |
| [ingestionDeleteSample.ts][ingestiondeletesample]                                   | delete an ingestion.                                 |
| [ingestionDeleteSourceSample.ts][ingestiondeletesourcesample]                       | delete an ingestion source.                          |
| [ingestionGetOperationSample.ts][ingestiongetoperationsample]                       | get an operation.                                    |
| [ingestionGetRunSample.ts][ingestiongetrunsample]                                   | get a run of an ingestion.                           |
| [ingestionGetSample.ts][ingestiongetsample]                                         | get an ingestion definition.                         |
| [ingestionGetSourceSample.ts][ingestiongetsourcesample]                             | get an ingestion source.                             |
| [ingestionListManagedIdentitiesSample.ts][ingestionlistmanagedidentitiessample]     | list managed identities.                             |
| [ingestionListOperationsSample.ts][ingestionlistoperationssample]                   | list operations.                                     |
| [ingestionListRunsSample.ts][ingestionlistrunssample]                               | list runs of an ingestion.                           |
| [ingestionListSample.ts][ingestionlistsample]                                       | list ingestions for a collection.                    |
| [ingestionListSourcesSample.ts][ingestionlistsourcessample]                         | list ingestion sources.                              |
| [ingestionReplaceSourceSample.ts][ingestionreplacesourcesample]                     | replace an ingestion source.                         |
| [ingestionUpdateSample.ts][ingestionupdatesample]                                   | update an ingestion definition.                      |
| [sharedAccessSignatureGetSignSample.ts][sharedaccesssignaturegetsignsample]         | sign a URL with a SAS token.                         |
| [sharedAccessSignatureGetTokenSample.ts][sharedaccesssignaturegettokensample]       | get a SAS token for a collection.                    |
| [sharedAccessSignatureRevokeTokenSample.ts][sharedaccesssignaturerevoketokensample] | revoke all SAS tokens.                               |
| [stacAddMosaicSample.ts][stacaddmosaicsample]                                       | add a mosaic to a collection.                        |
| [stacCreateCollectionAssetSample.ts][staccreatecollectionassetsample]               | create a collection asset.                           |
| [stacCreateCollectionSample.ts][staccreatecollectionsample]                         | create a new STAC collection.                        |
| [stacCreateItemSample.ts][staccreateitemsample]                                     | create a STAC item.                                  |
| [stacCreateQueryablesSample.ts][staccreatequeryablessample]                         | create queryables for a collection.                  |
| [stacCreateRenderOptionSample.ts][staccreaterenderoptionsample]                     | create a render option.                              |
| [stacDeleteCollectionAssetSample.ts][stacdeletecollectionassetsample]               | delete a collection asset.                           |
| [stacDeleteCollectionSample.ts][stacdeletecollectionsample]                         | delete a STAC collection.                            |
| [stacDeleteItemSample.ts][stacdeleteitemsample]                                     | delete a STAC item.                                  |
| [stacDeleteMosaicSample.ts][stacdeletemosaicsample]                                 | delete a mosaic.                                     |
| [stacDeleteQueryableSample.ts][stacdeletequeryablesample]                           | delete a queryable.                                  |
| [stacDeleteRenderOptionSample.ts][stacdeleterenderoptionsample]                     | delete a render option.                              |
| [stacGetCollectionConfigurationSample.ts][stacgetcollectionconfigurationsample]     | get collection configuration.                        |
| [stacGetCollectionQueryablesSample.ts][stacgetcollectionqueryablessample]           | get collection queryables.                           |
| [stacGetCollectionSample.ts][stacgetcollectionsample]                               | Get a STAC collection.                               |
| [stacGetCollectionThumbnailSample.ts][stacgetcollectionthumbnailsample]             | get collection thumbnail.                            |
| [stacGetConformanceClassSample.ts][stacgetconformanceclasssample]                   | get conformance classes.                             |
| [stacGetItemCollectionSample.ts][stacgetitemcollectionsample]                       | get items in a collection.                           |
| [stacGetItemSample.ts][stacgetitemsample]                                           | Get a STAC item.                                     |
| [stacGetLandingPageSample.ts][stacgetlandingpagesample]                             | get the STAC landing page.                           |
| [stacGetMosaicSample.ts][stacgetmosaicsample]                                       | get a mosaic by ID.                                  |
| [stacGetPartitionTypeSample.ts][stacgetpartitiontypesample]                         | get partition type for a collection.                 |
| [stacGetRenderOptionSample.ts][stacgetrenderoptionsample]                           | get a render option.                                 |
| [stacGetTileSettingsSample.ts][stacgettilesettingssample]                           | get tile settings.                                   |
| [stacListCollectionsSample.ts][staclistcollectionssample]                           | List all STAC collections.                           |
| [stacListMosaicsSample.ts][staclistmosaicssample]                                   | list mosaics for a collection.                       |
| [stacListQueryablesSample.ts][staclistqueryablessample]                             | list global queryables.                              |
| [stacListRenderOptionsSample.ts][staclistrenderoptionssample]                       | list render options.                                 |
| [stacReplaceCollectionAssetSample.ts][stacreplacecollectionassetsample]             | replace a collection asset.                          |
| [stacReplaceItemSample.ts][stacreplaceitemsample]                                   | replace a STAC item.                                 |
| [stacReplaceMosaicSample.ts][stacreplacemosaicsample]                               | replace a mosaic.                                    |
| [stacReplacePartitionTypeSample.ts][stacreplacepartitiontypesample]                 | replace partition type.                              |
| [stacReplaceQueryableSample.ts][stacreplacequeryablesample]                         | replace a queryable.                                 |
| [stacReplaceRenderOptionSample.ts][stacreplacerenderoptionsample]                   | replace a render option.                             |
| [stacReplaceTileSettingsSample.ts][stacreplacetilesettingssample]                   | replace tile settings.                               |
| [stacSearchSample.ts][stacsearchsample]                                             | Search for STAC items.                               |
| [stacUpdateItemSample.ts][stacupdateitemsample]                                     | update a STAC item.                                  |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/dataCropGeoJsonSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env PLANETARYCOMPUTER_ENDPOINT="<planetarycomputer endpoint>" PLANETARYCOMPUTER_COLLECTION_ID="<planetarycomputer collection id>" PLANETARYCOMPUTER_ITEM_ID="<planetarycomputer item id>" node dist/dataCropGeoJsonSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[datacropgeojsonsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataCropGeoJsonSample.ts
[datacropgeojsonwithdimensionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataCropGeoJsonWithDimensionsSample.ts
[datagetassetstatisticssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataGetAssetStatisticsSample.ts
[datagetboundssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataGetBoundsSample.ts
[datagetclassmaplegendsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataGetClassMapLegendSample.ts
[datagetgeojsonstatisticssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataGetGeoJsonStatisticsSample.ts
[datagetinfogeojsonsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataGetInfoGeoJsonSample.ts
[datagetintervallegendsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataGetIntervalLegendSample.ts
[datagetitemassetdetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataGetItemAssetDetailsSample.ts
[datagetlegendsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataGetLegendSample.ts
[datagetmosaicsassetsforpointsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataGetMosaicsAssetsForPointSample.ts
[datagetmosaicsassetsfortilesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataGetMosaicsAssetsForTileSample.ts
[datagetmosaicssearchinfosample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataGetMosaicsSearchInfoSample.ts
[datagetmosaicstilejsonsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataGetMosaicsTileJsonSample.ts
[datagetmosaicstilesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataGetMosaicsTileSample.ts
[datagetmosaicswmtscapabilitiessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataGetMosaicsWmtsCapabilitiesSample.ts
[datagetpartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataGetPartSample.ts
[datagetpartwithdimensionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataGetPartWithDimensionsSample.ts
[datagetpointsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataGetPointSample.ts
[datagetpreviewsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataGetPreviewSample.ts
[datagetpreviewwithformatsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataGetPreviewWithFormatSample.ts
[datagettilejsonsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataGetTileJsonSample.ts
[datagettilematrixdefinitionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataGetTileMatrixDefinitionsSample.ts
[datagettilesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataGetTileSample.ts
[datagetwmtscapabilitiessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataGetWmtsCapabilitiesSample.ts
[datalistavailableassetssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataListAvailableAssetsSample.ts
[dataliststatisticssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataListStatisticsSample.ts
[datalisttilematricessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataListTileMatricesSample.ts
[dataregistermosaicssearchsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/dataRegisterMosaicsSearchSample.ts
[ingestioncancelalloperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/ingestionCancelAllOperationsSample.ts
[ingestioncanceloperationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/ingestionCancelOperationSample.ts
[ingestioncreaterunsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/ingestionCreateRunSample.ts
[ingestioncreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/ingestionCreateSample.ts
[ingestioncreatesourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/ingestionCreateSourceSample.ts
[ingestiondeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/ingestionDeleteSample.ts
[ingestiondeletesourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/ingestionDeleteSourceSample.ts
[ingestiongetoperationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/ingestionGetOperationSample.ts
[ingestiongetrunsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/ingestionGetRunSample.ts
[ingestiongetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/ingestionGetSample.ts
[ingestiongetsourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/ingestionGetSourceSample.ts
[ingestionlistmanagedidentitiessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/ingestionListManagedIdentitiesSample.ts
[ingestionlistoperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/ingestionListOperationsSample.ts
[ingestionlistrunssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/ingestionListRunsSample.ts
[ingestionlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/ingestionListSample.ts
[ingestionlistsourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/ingestionListSourcesSample.ts
[ingestionreplacesourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/ingestionReplaceSourceSample.ts
[ingestionupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/ingestionUpdateSample.ts
[sharedaccesssignaturegetsignsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/sharedAccessSignatureGetSignSample.ts
[sharedaccesssignaturegettokensample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/sharedAccessSignatureGetTokenSample.ts
[sharedaccesssignaturerevoketokensample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/sharedAccessSignatureRevokeTokenSample.ts
[stacaddmosaicsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacAddMosaicSample.ts
[staccreatecollectionassetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacCreateCollectionAssetSample.ts
[staccreatecollectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacCreateCollectionSample.ts
[staccreateitemsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacCreateItemSample.ts
[staccreatequeryablessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacCreateQueryablesSample.ts
[staccreaterenderoptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacCreateRenderOptionSample.ts
[stacdeletecollectionassetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacDeleteCollectionAssetSample.ts
[stacdeletecollectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacDeleteCollectionSample.ts
[stacdeleteitemsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacDeleteItemSample.ts
[stacdeletemosaicsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacDeleteMosaicSample.ts
[stacdeletequeryablesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacDeleteQueryableSample.ts
[stacdeleterenderoptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacDeleteRenderOptionSample.ts
[stacgetcollectionconfigurationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacGetCollectionConfigurationSample.ts
[stacgetcollectionqueryablessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacGetCollectionQueryablesSample.ts
[stacgetcollectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacGetCollectionSample.ts
[stacgetcollectionthumbnailsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacGetCollectionThumbnailSample.ts
[stacgetconformanceclasssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacGetConformanceClassSample.ts
[stacgetitemcollectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacGetItemCollectionSample.ts
[stacgetitemsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacGetItemSample.ts
[stacgetlandingpagesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacGetLandingPageSample.ts
[stacgetmosaicsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacGetMosaicSample.ts
[stacgetpartitiontypesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacGetPartitionTypeSample.ts
[stacgetrenderoptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacGetRenderOptionSample.ts
[stacgettilesettingssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacGetTileSettingsSample.ts
[staclistcollectionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacListCollectionsSample.ts
[staclistmosaicssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacListMosaicsSample.ts
[staclistqueryablessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacListQueryablesSample.ts
[staclistrenderoptionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacListRenderOptionsSample.ts
[stacreplacecollectionassetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacReplaceCollectionAssetSample.ts
[stacreplaceitemsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacReplaceItemSample.ts
[stacreplacemosaicsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacReplaceMosaicSample.ts
[stacreplacepartitiontypesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacReplacePartitionTypeSample.ts
[stacreplacequeryablesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacReplaceQueryableSample.ts
[stacreplacerenderoptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacReplaceRenderOptionSample.ts
[stacreplacetilesettingssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacReplaceTileSettingsSample.ts
[stacsearchsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacSearchSample.ts
[stacupdateitemsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/typescript/src/stacUpdateItemSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/planetarycomputer
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/planetarycomputer/planetarycomputer/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
