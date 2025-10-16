// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerContext } from "../../api/planetaryComputerContext.js";
import {
  search,
  listCollectionQueryables,
  listQueryables,
  deleteQueryable,
  createOrReplaceQueryable,
  createQueryables,
  getStacLandingPage,
  updateItem,
  listItems,
  getItem,
  deleteItem,
  createOrReplaceItem,
  createItem,
  getConformanceClass,
  replaceTileSettings,
  getTileSettings,
  getCollectionThumbnail,
  listRenderOptions,
  getRenderOption,
  deleteRenderOption,
  createOrReplaceRenderOption,
  createRenderOption,
  replacePartitionType,
  getPartitionType,
  listCollections,
  getCollection,
  deleteCollection,
  createOrReplaceCollection,
  createCollection,
  listMosaics,
  getMosaic,
  deleteMosaic,
  createOrReplaceMosaic,
  addMosaic,
  getCollectionConfiguration,
  deleteCollectionAsset,
  createOrReplaceCollectionAsset,
  createCollectionAsset,
} from "../../api/stac/operations.js";
import {
  StacSearchOptionalParams,
  StacListCollectionQueryablesOptionalParams,
  StacListQueryablesOptionalParams,
  StacDeleteQueryableOptionalParams,
  StacCreateOrReplaceQueryableOptionalParams,
  StacCreateQueryablesOptionalParams,
  StacGetStacLandingPageOptionalParams,
  StacUpdateItemOptionalParams,
  StacListItemsOptionalParams,
  StacGetItemOptionalParams,
  StacDeleteItemOptionalParams,
  StacCreateOrReplaceItemOptionalParams,
  StacCreateItemOptionalParams,
  StacGetConformanceClassOptionalParams,
  StacReplaceTileSettingsOptionalParams,
  StacGetTileSettingsOptionalParams,
  StacGetCollectionThumbnailOptionalParams,
  StacListRenderOptionsOptionalParams,
  StacGetRenderOptionOptionalParams,
  StacDeleteRenderOptionOptionalParams,
  StacCreateOrReplaceRenderOptionOptionalParams,
  StacCreateRenderOptionOptionalParams,
  StacReplacePartitionTypeOptionalParams,
  StacGetPartitionTypeOptionalParams,
  StacListCollectionsOptionalParams,
  StacGetCollectionOptionalParams,
  StacDeleteCollectionOptionalParams,
  StacCreateOrReplaceCollectionOptionalParams,
  StacCreateCollectionOptionalParams,
  StacListMosaicsOptionalParams,
  StacGetMosaicOptionalParams,
  StacDeleteMosaicOptionalParams,
  StacCreateOrReplaceMosaicOptionalParams,
  StacAddMosaicOptionalParams,
  StacGetCollectionConfigurationOptionalParams,
  StacDeleteCollectionAssetOptionalParams,
  StacCreateOrReplaceCollectionAssetOptionalParams,
  StacCreateCollectionAssetOptionalParams,
} from "../../api/stac/options.js";
import {
  FormContent,
  StacCollection,
  UserCollectionSettings,
  TileSettings,
  StacMosaic,
  RenderOption,
  StacCatalogCollections,
  PartitionType,
  StacConformanceClasses,
  StacItemOrStacItemCollectionUnion,
  StacItemCollection,
  StacItem,
  StacLandingPage,
  StacQueryable,
  StacSearchParameters,
} from "../../models/models.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Stac operations. */
export interface StacOperations {
  /** STAC search operation. */
  search: (
    body: StacSearchParameters,
    options?: StacSearchOptionalParams,
  ) => Promise<StacItemCollection>;
  /** List all queryables in a given collection */
  listCollectionQueryables: (
    collectionId: string,
    options?: StacListCollectionQueryablesOptionalParams,
  ) => Promise<Record<string, any>>;
  /** List all queryables in the GeoCatalog instance */
  listQueryables: (
    options?: StacListQueryablesOptionalParams,
  ) => Promise<Record<string, any>>;
  /** Delete queryables by name for specified collection. */
  deleteQueryable: (
    collectionId: string,
    queryableName: string,
    options?: StacDeleteQueryableOptionalParams,
  ) => Promise<void>;
  /**
   * Updates a queryable given a queryable definition and
   * corresponding collection id.
   */
  createOrReplaceQueryable: (
    collectionId: string,
    queryableName: string,
    body: StacQueryable,
    options?: StacCreateOrReplaceQueryableOptionalParams,
  ) => Promise<StacQueryable>;
  /** Set queryables for a collection given a list of queryable definitions */
  createQueryables: (
    collectionId: string,
    body: StacQueryable[],
    options?: StacCreateQueryablesOptionalParams,
  ) => Promise<StacQueryable[]>;
  /** Return the STAC landing page. */
  getStacLandingPage: (
    options?: StacGetStacLandingPageOptionalParams,
  ) => Promise<StacLandingPage>;
  /** Update a STAC item in a collection */
  updateItem: (
    collectionId: string,
    itemId: string,
    body: StacItem,
    options?: StacUpdateItemOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /**
   * Fetch features of the feature collection with id `collectionId`.
   *
   * Every feature in a dataset belongs to a collection. A dataset may
   * consist of multiple feature collections. A feature collection is often a
   * collection of features of a similar type, based on a common schema.
   */
  listItems: (
    collectionId: string,
    options?: StacListItemsOptionalParams,
  ) => Promise<StacItemCollection>;
  /** Fetch a single STAC Item */
  getItem: (
    collectionId: string,
    itemId: string,
    options?: StacGetItemOptionalParams,
  ) => Promise<StacItem>;
  /** Delete a STAC item from a collection */
  deleteItem: (
    collectionId: string,
    itemId: string,
    options?: StacDeleteItemOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or replace a STAC item in a collection */
  createOrReplaceItem: (
    collectionId: string,
    itemId: string,
    body: StacItem,
    options?: StacCreateOrReplaceItemOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a new STAC item or a set of items in a collection */
  createItem: (
    collectionId: string,
    body: StacItemOrStacItemCollectionUnion,
    options?: StacCreateItemOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Returns the STAC conformance classes. */
  getConformanceClass: (
    options?: StacGetConformanceClassOptionalParams,
  ) => Promise<StacConformanceClasses>;
  /** Update the tile settings for a given collection */
  replaceTileSettings: (
    collectionId: string,
    body: TileSettings,
    options?: StacReplaceTileSettingsOptionalParams,
  ) => Promise<TileSettings>;
  /** Get the tile settings for a given collection */
  getTileSettings: (
    collectionId: string,
    options?: StacGetTileSettingsOptionalParams,
  ) => Promise<TileSettings>;
  /** Get thumbnail for given collection. */
  getCollectionThumbnail: (
    collectionId: string,
    options?: StacGetCollectionThumbnailOptionalParams,
  ) => Promise<Uint8Array>;
  /** Get all render options for a given collection */
  listRenderOptions: (
    collectionId: string,
    options?: StacListRenderOptionsOptionalParams,
  ) => Promise<RenderOption[]>;
  /** Get a render option for a given collection */
  getRenderOption: (
    collectionId: string,
    renderOptionId: string,
    options?: StacGetRenderOptionOptionalParams,
  ) => Promise<RenderOption>;
  /** Delete a render option for a given collection */
  deleteRenderOption: (
    collectionId: string,
    renderOptionId: string,
    options?: StacDeleteRenderOptionOptionalParams,
  ) => Promise<void>;
  /** Update a render option for a given collection */
  createOrReplaceRenderOption: (
    collectionId: string,
    renderOptionId: string,
    body: RenderOption,
    options?: StacCreateOrReplaceRenderOptionOptionalParams,
  ) => Promise<RenderOption>;
  /** Add a render option for a given collection */
  createRenderOption: (
    collectionId: string,
    body: RenderOption,
    options?: StacCreateRenderOptionOptionalParams,
  ) => Promise<RenderOption>;
  /**
   * Updates partition type for a GeoCatalog Collection. This will
   * determine the partitioning scheme for items within the database,
   * and can only be set before any items are loaded.
   *
   * Ideal partitioning schemes result in partitions of roughly 100k items each.
   *
   * The default partitioning scheme is "none" which does not partition items.
   */
  replacePartitionType: (
    collectionId: string,
    body: PartitionType,
    options?: StacReplacePartitionTypeOptionalParams,
  ) => Promise<void>;
  /** Get the partitiontype for a GeoCatalog Collection. */
  getPartitionType: (
    collectionId: string,
    options?: StacGetPartitionTypeOptionalParams,
  ) => Promise<PartitionType>;
  /** List all collections in the GeoCatalog instance */
  listCollections: (
    options?: StacListCollectionsOptionalParams,
  ) => Promise<StacCatalogCollections>;
  /** Get a collection in the GeoCatalog instance */
  getCollection: (
    collectionId: string,
    options?: StacGetCollectionOptionalParams,
  ) => Promise<StacCollection>;
  /** Delete a collection in the GeoCatalog instance */
  deleteCollection: (
    collectionId: string,
    options?: StacDeleteCollectionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or replace a collection in the GeoCatalog instance */
  createOrReplaceCollection: (
    collectionId: string,
    body: StacCollection,
    options?: StacCreateOrReplaceCollectionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a new collection in the GeoCatalog instance */
  createCollection: (
    body: StacCollection,
    options?: StacCreateCollectionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get the mosaic definitions for a given collection */
  listMosaics: (
    collectionId: string,
    options?: StacListMosaicsOptionalParams,
  ) => Promise<StacMosaic[]>;
  /** Get a mosaic definition from a given collection */
  getMosaic: (
    collectionId: string,
    mosaicId: string,
    options?: StacGetMosaicOptionalParams,
  ) => Promise<StacMosaic>;
  /** Delete a mosaic definition from a given collection */
  deleteMosaic: (
    collectionId: string,
    mosaicId: string,
    options?: StacDeleteMosaicOptionalParams,
  ) => Promise<void>;
  /** Update a mosaic definition from a given collection */
  createOrReplaceMosaic: (
    collectionId: string,
    mosaicId: string,
    body: StacMosaic,
    options?: StacCreateOrReplaceMosaicOptionalParams,
  ) => Promise<StacMosaic>;
  /** Add a mosaic definition to a given collection */
  addMosaic: (
    collectionId: string,
    body: StacMosaic,
    options?: StacAddMosaicOptionalParams,
  ) => Promise<StacMosaic>;
  /** Get the complete user configuration for a given collection */
  getCollectionConfiguration: (
    collectionId: string,
    options?: StacGetCollectionConfigurationOptionalParams,
  ) => Promise<UserCollectionSettings>;
  /** Delete an asset from a given collection. */
  deleteCollectionAsset: (
    collectionId: string,
    assetId: string,
    options?: StacDeleteCollectionAssetOptionalParams,
  ) => Promise<void>;
  /** Update an existing asset in a given collection. */
  createOrReplaceCollectionAsset: (
    collectionId: string,
    assetId: string,
    body: FormContent,
    options?: StacCreateOrReplaceCollectionAssetOptionalParams,
  ) => Promise<StacCollection>;
  /**
   * Create a new asset in the Collection metadata and write the associated
   * file to managed storage.
   */
  createCollectionAsset: (
    collectionId: string,
    body: FormContent,
    options?: StacCreateCollectionAssetOptionalParams,
  ) => Promise<StacCollection>;
}

function _getStac(context: PlanetaryComputerContext) {
  return {
    search: (body: StacSearchParameters, options?: StacSearchOptionalParams) =>
      search(context, body, options),
    listCollectionQueryables: (
      collectionId: string,
      options?: StacListCollectionQueryablesOptionalParams,
    ) => listCollectionQueryables(context, collectionId, options),
    listQueryables: (options?: StacListQueryablesOptionalParams) =>
      listQueryables(context, options),
    deleteQueryable: (
      collectionId: string,
      queryableName: string,
      options?: StacDeleteQueryableOptionalParams,
    ) => deleteQueryable(context, collectionId, queryableName, options),
    createOrReplaceQueryable: (
      collectionId: string,
      queryableName: string,
      body: StacQueryable,
      options?: StacCreateOrReplaceQueryableOptionalParams,
    ) =>
      createOrReplaceQueryable(
        context,
        collectionId,
        queryableName,
        body,
        options,
      ),
    createQueryables: (
      collectionId: string,
      body: StacQueryable[],
      options?: StacCreateQueryablesOptionalParams,
    ) => createQueryables(context, collectionId, body, options),
    getStacLandingPage: (options?: StacGetStacLandingPageOptionalParams) =>
      getStacLandingPage(context, options),
    updateItem: (
      collectionId: string,
      itemId: string,
      body: StacItem,
      options?: StacUpdateItemOptionalParams,
    ) => updateItem(context, collectionId, itemId, body, options),
    listItems: (collectionId: string, options?: StacListItemsOptionalParams) =>
      listItems(context, collectionId, options),
    getItem: (
      collectionId: string,
      itemId: string,
      options?: StacGetItemOptionalParams,
    ) => getItem(context, collectionId, itemId, options),
    deleteItem: (
      collectionId: string,
      itemId: string,
      options?: StacDeleteItemOptionalParams,
    ) => deleteItem(context, collectionId, itemId, options),
    createOrReplaceItem: (
      collectionId: string,
      itemId: string,
      body: StacItem,
      options?: StacCreateOrReplaceItemOptionalParams,
    ) => createOrReplaceItem(context, collectionId, itemId, body, options),
    createItem: (
      collectionId: string,
      body: StacItemOrStacItemCollectionUnion,
      options?: StacCreateItemOptionalParams,
    ) => createItem(context, collectionId, body, options),
    getConformanceClass: (options?: StacGetConformanceClassOptionalParams) =>
      getConformanceClass(context, options),
    replaceTileSettings: (
      collectionId: string,
      body: TileSettings,
      options?: StacReplaceTileSettingsOptionalParams,
    ) => replaceTileSettings(context, collectionId, body, options),
    getTileSettings: (
      collectionId: string,
      options?: StacGetTileSettingsOptionalParams,
    ) => getTileSettings(context, collectionId, options),
    getCollectionThumbnail: (
      collectionId: string,
      options?: StacGetCollectionThumbnailOptionalParams,
    ) => getCollectionThumbnail(context, collectionId, options),
    listRenderOptions: (
      collectionId: string,
      options?: StacListRenderOptionsOptionalParams,
    ) => listRenderOptions(context, collectionId, options),
    getRenderOption: (
      collectionId: string,
      renderOptionId: string,
      options?: StacGetRenderOptionOptionalParams,
    ) => getRenderOption(context, collectionId, renderOptionId, options),
    deleteRenderOption: (
      collectionId: string,
      renderOptionId: string,
      options?: StacDeleteRenderOptionOptionalParams,
    ) => deleteRenderOption(context, collectionId, renderOptionId, options),
    createOrReplaceRenderOption: (
      collectionId: string,
      renderOptionId: string,
      body: RenderOption,
      options?: StacCreateOrReplaceRenderOptionOptionalParams,
    ) =>
      createOrReplaceRenderOption(
        context,
        collectionId,
        renderOptionId,
        body,
        options,
      ),
    createRenderOption: (
      collectionId: string,
      body: RenderOption,
      options?: StacCreateRenderOptionOptionalParams,
    ) => createRenderOption(context, collectionId, body, options),
    replacePartitionType: (
      collectionId: string,
      body: PartitionType,
      options?: StacReplacePartitionTypeOptionalParams,
    ) => replacePartitionType(context, collectionId, body, options),
    getPartitionType: (
      collectionId: string,
      options?: StacGetPartitionTypeOptionalParams,
    ) => getPartitionType(context, collectionId, options),
    listCollections: (options?: StacListCollectionsOptionalParams) =>
      listCollections(context, options),
    getCollection: (
      collectionId: string,
      options?: StacGetCollectionOptionalParams,
    ) => getCollection(context, collectionId, options),
    deleteCollection: (
      collectionId: string,
      options?: StacDeleteCollectionOptionalParams,
    ) => deleteCollection(context, collectionId, options),
    createOrReplaceCollection: (
      collectionId: string,
      body: StacCollection,
      options?: StacCreateOrReplaceCollectionOptionalParams,
    ) => createOrReplaceCollection(context, collectionId, body, options),
    createCollection: (
      body: StacCollection,
      options?: StacCreateCollectionOptionalParams,
    ) => createCollection(context, body, options),
    listMosaics: (
      collectionId: string,
      options?: StacListMosaicsOptionalParams,
    ) => listMosaics(context, collectionId, options),
    getMosaic: (
      collectionId: string,
      mosaicId: string,
      options?: StacGetMosaicOptionalParams,
    ) => getMosaic(context, collectionId, mosaicId, options),
    deleteMosaic: (
      collectionId: string,
      mosaicId: string,
      options?: StacDeleteMosaicOptionalParams,
    ) => deleteMosaic(context, collectionId, mosaicId, options),
    createOrReplaceMosaic: (
      collectionId: string,
      mosaicId: string,
      body: StacMosaic,
      options?: StacCreateOrReplaceMosaicOptionalParams,
    ) => createOrReplaceMosaic(context, collectionId, mosaicId, body, options),
    addMosaic: (
      collectionId: string,
      body: StacMosaic,
      options?: StacAddMosaicOptionalParams,
    ) => addMosaic(context, collectionId, body, options),
    getCollectionConfiguration: (
      collectionId: string,
      options?: StacGetCollectionConfigurationOptionalParams,
    ) => getCollectionConfiguration(context, collectionId, options),
    deleteCollectionAsset: (
      collectionId: string,
      assetId: string,
      options?: StacDeleteCollectionAssetOptionalParams,
    ) => deleteCollectionAsset(context, collectionId, assetId, options),
    createOrReplaceCollectionAsset: (
      collectionId: string,
      assetId: string,
      body: FormContent,
      options?: StacCreateOrReplaceCollectionAssetOptionalParams,
    ) =>
      createOrReplaceCollectionAsset(
        context,
        collectionId,
        assetId,
        body,
        options,
      ),
    createCollectionAsset: (
      collectionId: string,
      body: FormContent,
      options?: StacCreateCollectionAssetOptionalParams,
    ) => createCollectionAsset(context, collectionId, body, options),
  };
}

export function _getStacOperations(
  context: PlanetaryComputerContext,
): StacOperations {
  return {
    ..._getStac(context),
  };
}
