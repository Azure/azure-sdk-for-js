# Azure Planetary Computer Pro client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure Planetary Computer Pro in some common scenarios.

| **File Name**                                                                       | **Description**                                      |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [dataCropGeoJsonSample.js][datacropgeojsonsample]                                   | create image from a GeoJSON feature.                 |
| [dataCropGeoJsonWithDimensionsSample.js][datacropgeojsonwithdimensionssample]       | create image from a GeoJSON feature with dimensions. |
| [dataGetAssetStatisticsSample.js][datagetassetstatisticssample]                     | get per-asset statistics.                            |
| [dataGetBoundsSample.js][datagetboundssample]                                       | get item bounds.                                     |
| [dataGetClassMapLegendSample.js][datagetclassmaplegendsample]                       | get class map legend.                                |
| [dataGetGeoJsonStatisticsSample.js][datagetgeojsonstatisticssample]                 | get statistics from a GeoJSON feature.               |
| [dataGetInfoGeoJsonSample.js][datagetinfogeojsonsample]                             | get item info as GeoJSON.                            |
| [dataGetIntervalLegendSample.js][datagetintervallegendsample]                       | get interval legend.                                 |
| [dataGetItemAssetDetailsSample.js][datagetitemassetdetailssample]                   | get item asset details.                              |
| [dataGetLegendSample.js][datagetlegendsample]                                       | get legend image.                                    |
| [dataGetMosaicsAssetsForPointSample.js][datagetmosaicsassetsforpointsample]         | get mosaic assets for a point.                       |
| [dataGetMosaicsAssetsForTileSample.js][datagetmosaicsassetsfortilesample]           | get mosaic assets for a tile.                        |
| [dataGetMosaicsSearchInfoSample.js][datagetmosaicssearchinfosample]                 | get mosaic search query metadata.                    |
| [dataGetMosaicsTileJsonSample.js][datagetmosaicstilejsonsample]                     | get mosaic TileJSON.                                 |
| [dataGetMosaicsTileSample.js][datagetmosaicstilesample]                             | create a mosaic map tile.                            |
| [dataGetMosaicsWmtsCapabilitiesSample.js][datagetmosaicswmtscapabilitiessample]     | get mosaic OGC WMTS capabilities.                    |
| [dataGetPartSample.js][datagetpartsample]                                           | create image from part of a dataset.                 |
| [dataGetPartWithDimensionsSample.js][datagetpartwithdimensionssample]               | create image from part of a dataset with dimensions. |
| [dataGetPointSample.js][datagetpointsample]                                         | get point value for a dataset.                       |
| [dataGetPreviewSample.js][datagetpreviewsample]                                     | create a preview of a dataset.                       |
| [dataGetPreviewWithFormatSample.js][datagetpreviewwithformatsample]                 | create a preview with format in path.                |
| [dataGetTileJsonSample.js][datagettilejsonsample]                                   | get TileJSON for a dataset.                          |
| [dataGetTileMatrixDefinitionsSample.js][datagettilematrixdefinitionssample]         | get tile matrix definitions.                         |
| [dataGetTileSample.js][datagettilesample]                                           | create map tile from a dataset.                      |
| [dataGetWmtsCapabilitiesSample.js][datagetwmtscapabilitiessample]                   | get OGC WMTS capabilities.                           |
| [dataListAvailableAssetsSample.js][datalistavailableassetssample]                   | list available assets for an item.                   |
| [dataListStatisticsSample.js][dataliststatisticssample]                             | get merged asset statistics.                         |
| [dataListTileMatricesSample.js][datalisttilematricessample]                         | list tile matrix sets.                               |
| [dataRegisterMosaicsSearchSample.js][dataregistermosaicssearchsample]               | register a mosaic search query.                      |
| [ingestionCancelAllOperationsSample.js][ingestioncancelalloperationssample]         | cancel all running operations.                       |
| [ingestionCancelOperationSample.js][ingestioncanceloperationsample]                 | cancel a running operation.                          |
| [ingestionCreateRunSample.js][ingestioncreaterunsample]                             | create a new ingestion run.                          |
| [ingestionCreateSample.js][ingestioncreatesample]                                   | create a new ingestion.                              |
| [ingestionCreateSourceSample.js][ingestioncreatesourcesample]                       | create an ingestion source.                          |
| [ingestionDeleteSample.js][ingestiondeletesample]                                   | delete an ingestion.                                 |
| [ingestionDeleteSourceSample.js][ingestiondeletesourcesample]                       | delete an ingestion source.                          |
| [ingestionGetOperationSample.js][ingestiongetoperationsample]                       | get an operation.                                    |
| [ingestionGetRunSample.js][ingestiongetrunsample]                                   | get a run of an ingestion.                           |
| [ingestionGetSample.js][ingestiongetsample]                                         | get an ingestion definition.                         |
| [ingestionGetSourceSample.js][ingestiongetsourcesample]                             | get an ingestion source.                             |
| [ingestionListManagedIdentitiesSample.js][ingestionlistmanagedidentitiessample]     | list managed identities.                             |
| [ingestionListOperationsSample.js][ingestionlistoperationssample]                   | list operations.                                     |
| [ingestionListRunsSample.js][ingestionlistrunssample]                               | list runs of an ingestion.                           |
| [ingestionListSample.js][ingestionlistsample]                                       | list ingestions for a collection.                    |
| [ingestionListSourcesSample.js][ingestionlistsourcessample]                         | list ingestion sources.                              |
| [ingestionReplaceSourceSample.js][ingestionreplacesourcesample]                     | replace an ingestion source.                         |
| [ingestionUpdateSample.js][ingestionupdatesample]                                   | update an ingestion definition.                      |
| [sharedAccessSignatureGetSignSample.js][sharedaccesssignaturegetsignsample]         | sign a URL with a SAS token.                         |
| [sharedAccessSignatureGetTokenSample.js][sharedaccesssignaturegettokensample]       | get a SAS token for a collection.                    |
| [sharedAccessSignatureRevokeTokenSample.js][sharedaccesssignaturerevoketokensample] | revoke all SAS tokens.                               |
| [stacAddMosaicSample.js][stacaddmosaicsample]                                       | add a mosaic to a collection.                        |
| [stacCreateCollectionAssetSample.js][staccreatecollectionassetsample]               | create a collection asset.                           |
| [stacCreateCollectionSample.js][staccreatecollectionsample]                         | create a new STAC collection.                        |
| [stacCreateItemSample.js][staccreateitemsample]                                     | create a STAC item.                                  |
| [stacCreateQueryablesSample.js][staccreatequeryablessample]                         | create queryables for a collection.                  |
| [stacCreateRenderOptionSample.js][staccreaterenderoptionsample]                     | create a render option.                              |
| [stacDeleteCollectionAssetSample.js][stacdeletecollectionassetsample]               | delete a collection asset.                           |
| [stacDeleteCollectionSample.js][stacdeletecollectionsample]                         | delete a STAC collection.                            |
| [stacDeleteItemSample.js][stacdeleteitemsample]                                     | delete a STAC item.                                  |
| [stacDeleteMosaicSample.js][stacdeletemosaicsample]                                 | delete a mosaic.                                     |
| [stacDeleteQueryableSample.js][stacdeletequeryablesample]                           | delete a queryable.                                  |
| [stacDeleteRenderOptionSample.js][stacdeleterenderoptionsample]                     | delete a render option.                              |
| [stacGetCollectionConfigurationSample.js][stacgetcollectionconfigurationsample]     | get collection configuration.                        |
| [stacGetCollectionQueryablesSample.js][stacgetcollectionqueryablessample]           | get collection queryables.                           |
| [stacGetCollectionSample.js][stacgetcollectionsample]                               | Get a STAC collection.                               |
| [stacGetCollectionThumbnailSample.js][stacgetcollectionthumbnailsample]             | get collection thumbnail.                            |
| [stacGetConformanceClassSample.js][stacgetconformanceclasssample]                   | get conformance classes.                             |
| [stacGetItemCollectionSample.js][stacgetitemcollectionsample]                       | get items in a collection.                           |
| [stacGetItemSample.js][stacgetitemsample]                                           | Get a STAC item.                                     |
| [stacGetLandingPageSample.js][stacgetlandingpagesample]                             | get the STAC landing page.                           |
| [stacGetMosaicSample.js][stacgetmosaicsample]                                       | get a mosaic by ID.                                  |
| [stacGetPartitionTypeSample.js][stacgetpartitiontypesample]                         | get partition type for a collection.                 |
| [stacGetRenderOptionSample.js][stacgetrenderoptionsample]                           | get a render option.                                 |
| [stacGetTileSettingsSample.js][stacgettilesettingssample]                           | get tile settings.                                   |
| [stacListCollectionsSample.js][staclistcollectionssample]                           | List all STAC collections.                           |
| [stacListMosaicsSample.js][staclistmosaicssample]                                   | list mosaics for a collection.                       |
| [stacListQueryablesSample.js][staclistqueryablessample]                             | list global queryables.                              |
| [stacListRenderOptionsSample.js][staclistrenderoptionssample]                       | list render options.                                 |
| [stacReplaceCollectionAssetSample.js][stacreplacecollectionassetsample]             | replace a collection asset.                          |
| [stacReplaceItemSample.js][stacreplaceitemsample]                                   | replace a STAC item.                                 |
| [stacReplaceMosaicSample.js][stacreplacemosaicsample]                               | replace a mosaic.                                    |
| [stacReplacePartitionTypeSample.js][stacreplacepartitiontypesample]                 | replace partition type.                              |
| [stacReplaceQueryableSample.js][stacreplacequeryablesample]                         | replace a queryable.                                 |
| [stacReplaceRenderOptionSample.js][stacreplacerenderoptionsample]                   | replace a render option.                             |
| [stacReplaceTileSettingsSample.js][stacreplacetilesettingssample]                   | replace tile settings.                               |
| [stacSearchSample.js][stacsearchsample]                                             | Search for STAC items.                               |
| [stacUpdateItemSample.js][stacupdateitemsample]                                     | update a STAC item.                                  |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dataCropGeoJsonSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env PLANETARYCOMPUTER_ENDPOINT="<planetarycomputer endpoint>" PLANETARYCOMPUTER_COLLECTION_ID="<planetarycomputer collection id>" PLANETARYCOMPUTER_ITEM_ID="<planetarycomputer item id>" node dataCropGeoJsonSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[datacropgeojsonsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataCropGeoJsonSample.js
[datacropgeojsonwithdimensionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataCropGeoJsonWithDimensionsSample.js
[datagetassetstatisticssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataGetAssetStatisticsSample.js
[datagetboundssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataGetBoundsSample.js
[datagetclassmaplegendsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataGetClassMapLegendSample.js
[datagetgeojsonstatisticssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataGetGeoJsonStatisticsSample.js
[datagetinfogeojsonsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataGetInfoGeoJsonSample.js
[datagetintervallegendsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataGetIntervalLegendSample.js
[datagetitemassetdetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataGetItemAssetDetailsSample.js
[datagetlegendsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataGetLegendSample.js
[datagetmosaicsassetsforpointsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataGetMosaicsAssetsForPointSample.js
[datagetmosaicsassetsfortilesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataGetMosaicsAssetsForTileSample.js
[datagetmosaicssearchinfosample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataGetMosaicsSearchInfoSample.js
[datagetmosaicstilejsonsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataGetMosaicsTileJsonSample.js
[datagetmosaicstilesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataGetMosaicsTileSample.js
[datagetmosaicswmtscapabilitiessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataGetMosaicsWmtsCapabilitiesSample.js
[datagetpartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataGetPartSample.js
[datagetpartwithdimensionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataGetPartWithDimensionsSample.js
[datagetpointsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataGetPointSample.js
[datagetpreviewsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataGetPreviewSample.js
[datagetpreviewwithformatsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataGetPreviewWithFormatSample.js
[datagettilejsonsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataGetTileJsonSample.js
[datagettilematrixdefinitionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataGetTileMatrixDefinitionsSample.js
[datagettilesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataGetTileSample.js
[datagetwmtscapabilitiessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataGetWmtsCapabilitiesSample.js
[datalistavailableassetssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataListAvailableAssetsSample.js
[dataliststatisticssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataListStatisticsSample.js
[datalisttilematricessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataListTileMatricesSample.js
[dataregistermosaicssearchsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/dataRegisterMosaicsSearchSample.js
[ingestioncancelalloperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/ingestionCancelAllOperationsSample.js
[ingestioncanceloperationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/ingestionCancelOperationSample.js
[ingestioncreaterunsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/ingestionCreateRunSample.js
[ingestioncreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/ingestionCreateSample.js
[ingestioncreatesourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/ingestionCreateSourceSample.js
[ingestiondeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/ingestionDeleteSample.js
[ingestiondeletesourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/ingestionDeleteSourceSample.js
[ingestiongetoperationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/ingestionGetOperationSample.js
[ingestiongetrunsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/ingestionGetRunSample.js
[ingestiongetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/ingestionGetSample.js
[ingestiongetsourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/ingestionGetSourceSample.js
[ingestionlistmanagedidentitiessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/ingestionListManagedIdentitiesSample.js
[ingestionlistoperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/ingestionListOperationsSample.js
[ingestionlistrunssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/ingestionListRunsSample.js
[ingestionlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/ingestionListSample.js
[ingestionlistsourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/ingestionListSourcesSample.js
[ingestionreplacesourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/ingestionReplaceSourceSample.js
[ingestionupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/ingestionUpdateSample.js
[sharedaccesssignaturegetsignsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/sharedAccessSignatureGetSignSample.js
[sharedaccesssignaturegettokensample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/sharedAccessSignatureGetTokenSample.js
[sharedaccesssignaturerevoketokensample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/sharedAccessSignatureRevokeTokenSample.js
[stacaddmosaicsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacAddMosaicSample.js
[staccreatecollectionassetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacCreateCollectionAssetSample.js
[staccreatecollectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacCreateCollectionSample.js
[staccreateitemsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacCreateItemSample.js
[staccreatequeryablessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacCreateQueryablesSample.js
[staccreaterenderoptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacCreateRenderOptionSample.js
[stacdeletecollectionassetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacDeleteCollectionAssetSample.js
[stacdeletecollectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacDeleteCollectionSample.js
[stacdeleteitemsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacDeleteItemSample.js
[stacdeletemosaicsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacDeleteMosaicSample.js
[stacdeletequeryablesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacDeleteQueryableSample.js
[stacdeleterenderoptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacDeleteRenderOptionSample.js
[stacgetcollectionconfigurationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacGetCollectionConfigurationSample.js
[stacgetcollectionqueryablessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacGetCollectionQueryablesSample.js
[stacgetcollectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacGetCollectionSample.js
[stacgetcollectionthumbnailsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacGetCollectionThumbnailSample.js
[stacgetconformanceclasssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacGetConformanceClassSample.js
[stacgetitemcollectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacGetItemCollectionSample.js
[stacgetitemsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacGetItemSample.js
[stacgetlandingpagesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacGetLandingPageSample.js
[stacgetmosaicsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacGetMosaicSample.js
[stacgetpartitiontypesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacGetPartitionTypeSample.js
[stacgetrenderoptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacGetRenderOptionSample.js
[stacgettilesettingssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacGetTileSettingsSample.js
[staclistcollectionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacListCollectionsSample.js
[staclistmosaicssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacListMosaicsSample.js
[staclistqueryablessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacListQueryablesSample.js
[staclistrenderoptionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacListRenderOptionsSample.js
[stacreplacecollectionassetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacReplaceCollectionAssetSample.js
[stacreplaceitemsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacReplaceItemSample.js
[stacreplacemosaicsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacReplaceMosaicSample.js
[stacreplacepartitiontypesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacReplacePartitionTypeSample.js
[stacreplacequeryablesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacReplaceQueryableSample.js
[stacreplacerenderoptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacReplaceRenderOptionSample.js
[stacreplacetilesettingssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacReplaceTileSettingsSample.js
[stacsearchsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacSearchSample.js
[stacupdateitemsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/planetarycomputer/samples/v1-beta/javascript/stacUpdateItemSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/planetarycomputer
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/planetarycomputer/planetarycomputer/README.md
