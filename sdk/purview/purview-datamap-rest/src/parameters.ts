// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RequestParameters } from "@azure-rest/core-client";
import type {
  BusinessAttributeUpdateBehavior,
  AtlasEntityWithExtInfo,
  AtlasEntitiesWithExtInfo,
  ClassificationAssociateOptions,
  AtlasClassification,
  AtlasEntityHeaders,
  BusinessMetadataOptions,
  MoveEntitiesOptions,
  AtlasGlossary,
  AtlasGlossaryCategory,
  AtlasGlossaryTerm,
  AtlasRelatedObjectId,
  QueryOptions,
  SuggestOptions,
  AutoCompleteOptions,
  LineageDirection,
  AtlasRelationship,
  TypeCategory,
  AtlasTypesDef,
} from "./models.js";

export interface EntityCreateOrUpdateBodyParam {
  /** Body parameter. */
  body: AtlasEntityWithExtInfo;
}

export interface EntityCreateOrUpdateQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version"?: string;
  /**
   * Used to define the update behavior for business attributes when updating
   * entities.
   *
   * Possible values: "ignore", "replace", "merge"
   */
  businessAttributeUpdateBehavior?: BusinessAttributeUpdateBehavior;
  /**
   * The collection where entities will be moved to. Only specify a value if you
   * need to move an entity to another collection.
   */
  collectionId?: string;
}

export interface EntityCreateOrUpdateQueryParam {
  queryParameters?: EntityCreateOrUpdateQueryParamProperties;
}

export type EntityCreateOrUpdateParameters = EntityCreateOrUpdateQueryParam &
  EntityCreateOrUpdateBodyParam &
  RequestParameters;

/** This is the wrapper object for the parameter `guid` with explode set to true and style set to form. */
export interface EntityListByGuidsGuidQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface EntityListByGuidsQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version"?: string;
  /** An array of GUIDs of entities to list. */
  guid: EntityListByGuidsGuidQueryParam;
  /** Whether to return minimal information for referred entities. */
  minExtInfo?: boolean;
  /** Whether to ignore relationship attributes. */
  ignoreRelationships?: boolean;
}

export interface EntityListByGuidsQueryParam {
  queryParameters: EntityListByGuidsQueryParamProperties;
}

export type EntityListByGuidsParameters = EntityListByGuidsQueryParam & RequestParameters;

export interface EntityBulkCreateOrUpdateBodyParam {
  /** Body parameter. */
  body: AtlasEntitiesWithExtInfo;
}

export interface EntityBulkCreateOrUpdateQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version"?: string;
  /**
   * The collection where entities will be moved to. Only specify a value if you
   * need to move an entity to another collection.
   */
  collectionId?: string;
  /**
   * Used to define the update behavior for business attributes when updating
   * entities.
   *
   * Possible values: "ignore", "replace", "merge"
   */
  businessAttributeUpdateBehavior?: BusinessAttributeUpdateBehavior;
}

export interface EntityBulkCreateOrUpdateQueryParam {
  queryParameters?: EntityBulkCreateOrUpdateQueryParamProperties;
}

export type EntityBulkCreateOrUpdateParameters = EntityBulkCreateOrUpdateQueryParam &
  EntityBulkCreateOrUpdateBodyParam &
  RequestParameters;

/** This is the wrapper object for the parameter `guid` with explode set to true and style set to form. */
export interface EntityBulkDeleteGuidQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface EntityBulkDeleteQueryParamProperties {
  /** An array of GUIDs of entities to delete. */
  guid: EntityBulkDeleteGuidQueryParam;
}

export interface EntityBulkDeleteQueryParam {
  queryParameters: EntityBulkDeleteQueryParamProperties;
}

export type EntityBulkDeleteParameters = EntityBulkDeleteQueryParam & RequestParameters;

export interface EntityAddClassificationBodyParam {
  /** Body parameter. */
  body: ClassificationAssociateOptions;
}

export type EntityAddClassificationParameters = EntityAddClassificationBodyParam &
  RequestParameters;

export interface EntityGetQueryParamProperties {
  /** Whether to return minimal information for referred entities. */
  minExtInfo?: boolean;
  /** Whether to ignore relationship attributes. */
  ignoreRelationships?: boolean;
}

export interface EntityGetQueryParam {
  queryParameters?: EntityGetQueryParamProperties;
}

export type EntityGetParameters = EntityGetQueryParam & RequestParameters;

export interface EntityPartialUpdateAttributeByGuidBodyParam {
  /** The value of the attribute. */
  body: unknown;
}

export interface EntityPartialUpdateAttributeByGuidQueryParamProperties {
  /** The name of the attribute. */
  name: string;
}

export interface EntityPartialUpdateAttributeByGuidQueryParam {
  queryParameters: EntityPartialUpdateAttributeByGuidQueryParamProperties;
}

export type EntityPartialUpdateAttributeByGuidParameters =
  EntityPartialUpdateAttributeByGuidQueryParam &
    EntityPartialUpdateAttributeByGuidBodyParam &
    RequestParameters;
export type EntityDeleteParameters = RequestParameters;
export type EntityGetClassificationParameters = RequestParameters;
export type EntityRemoveClassificationParameters = RequestParameters;
export type EntityGetClassificationsParameters = RequestParameters;

export interface EntityAddClassificationsBodyParam {
  /** An array of classifications to be added. */
  body: Array<AtlasClassification>;
}

export type EntityAddClassificationsParameters = EntityAddClassificationsBodyParam &
  RequestParameters;

export interface EntityUpdateClassificationsBodyParam {
  /** An array of classifications to be updated. */
  body: Array<AtlasClassification>;
}

export type EntityUpdateClassificationsParameters = EntityUpdateClassificationsBodyParam &
  RequestParameters;

export interface EntityGetByUniqueAttributesQueryParamProperties {
  /** Whether to return minimal information for referred entities. */
  minExtInfo?: boolean;
  /** Whether to ignore relationship attributes. */
  ignoreRelationships?: boolean;
  /**
   * The qualified name of the entity. (This is only an example. qualifiedName can
   * be changed to other unique attributes)
   */
  "attr:qualifiedName"?: string;
}

export interface EntityGetByUniqueAttributesQueryParam {
  queryParameters?: EntityGetByUniqueAttributesQueryParamProperties;
}

export type EntityGetByUniqueAttributesParameters = EntityGetByUniqueAttributesQueryParam &
  RequestParameters;

export interface EntityPartialUpdateByUniqueAttributesBodyParam {
  /** Body parameter. */
  body: AtlasEntityWithExtInfo;
}

export interface EntityPartialUpdateByUniqueAttributesQueryParamProperties {
  /**
   * The qualified name of the entity. (This is only an example. qualifiedName can
   * be changed to other unique attributes)
   */
  "attr:qualifiedName"?: string;
}

export interface EntityPartialUpdateByUniqueAttributesQueryParam {
  queryParameters?: EntityPartialUpdateByUniqueAttributesQueryParamProperties;
}

export type EntityPartialUpdateByUniqueAttributesParameters =
  EntityPartialUpdateByUniqueAttributesQueryParam &
    EntityPartialUpdateByUniqueAttributesBodyParam &
    RequestParameters;

export interface EntityDeleteByUniqueAttributeQueryParamProperties {
  /**
   * The qualified name of the entity. (This is only an example. qualifiedName can
   * be changed to other unique attributes)
   */
  "attr:qualifiedName"?: string;
}

export interface EntityDeleteByUniqueAttributeQueryParam {
  queryParameters?: EntityDeleteByUniqueAttributeQueryParamProperties;
}

export type EntityDeleteByUniqueAttributeParameters = EntityDeleteByUniqueAttributeQueryParam &
  RequestParameters;

export interface EntityRemoveClassificationByUniqueAttributeQueryParamProperties {
  /**
   * The qualified name of the entity. (This is only an example. qualifiedName can
   * be changed to other unique attributes)
   */
  "attr:qualifiedName"?: string;
}

export interface EntityRemoveClassificationByUniqueAttributeQueryParam {
  queryParameters?: EntityRemoveClassificationByUniqueAttributeQueryParamProperties;
}

export type EntityRemoveClassificationByUniqueAttributeParameters =
  EntityRemoveClassificationByUniqueAttributeQueryParam & RequestParameters;

export interface EntityAddClassificationsByUniqueAttributeBodyParam {
  /** An array of classification to be added. */
  body: Array<AtlasClassification>;
}

export interface EntityAddClassificationsByUniqueAttributeQueryParamProperties {
  /**
   * The qualified name of the entity. (This is only an example. qualifiedName can
   * be changed to other unique attributes)
   */
  "attr:qualifiedName"?: string;
}

export interface EntityAddClassificationsByUniqueAttributeQueryParam {
  queryParameters?: EntityAddClassificationsByUniqueAttributeQueryParamProperties;
}

export type EntityAddClassificationsByUniqueAttributeParameters =
  EntityAddClassificationsByUniqueAttributeQueryParam &
    EntityAddClassificationsByUniqueAttributeBodyParam &
    RequestParameters;

export interface EntityUpdateClassificationsByUniqueAttributeBodyParam {
  /** An array of classification to be updated. */
  body: Array<AtlasClassification>;
}

export interface EntityUpdateClassificationsByUniqueAttributeQueryParamProperties {
  /**
   * The qualified name of the entity. (This is only an example. qualifiedName can
   * be changed to other unique attributes)
   */
  "attr:qualifiedName"?: string;
}

export interface EntityUpdateClassificationsByUniqueAttributeQueryParam {
  queryParameters?: EntityUpdateClassificationsByUniqueAttributeQueryParamProperties;
}

export type EntityUpdateClassificationsByUniqueAttributeParameters =
  EntityUpdateClassificationsByUniqueAttributeQueryParam &
    EntityUpdateClassificationsByUniqueAttributeBodyParam &
    RequestParameters;

export interface EntityBulkSetClassificationsBodyParam {
  /** Body parameter. */
  body: AtlasEntityHeaders;
}

export type EntityBulkSetClassificationsParameters = EntityBulkSetClassificationsBodyParam &
  RequestParameters;

export interface EntityListByUniqueAttributesQueryParamProperties {
  /** Whether to return minimal information for referred entities. */
  minExtInfo?: boolean;
  /** Whether to ignore relationship attributes. */
  ignoreRelationships?: boolean;
  /**
   * Qualified name of an entity. E.g. to find 2 entities you can set
   * attrs_1:qualifiedName=db1@cl1&attrs_2:qualifiedName=db2@cl1. (This is only an
   * example. qualifiedName can be changed to other unique attributes)
   */
  "attr_N:qualifiedName"?: string;
}

export interface EntityListByUniqueAttributesQueryParam {
  queryParameters?: EntityListByUniqueAttributesQueryParamProperties;
}

export type EntityListByUniqueAttributesParameters = EntityListByUniqueAttributesQueryParam &
  RequestParameters;
export type EntityGetHeaderParameters = RequestParameters;

export interface EntityRemoveBusinessMetadataBodyParam {
  /** Business metadata payload */
  body: Record<string, Record<string, unknown>>;
}

export type EntityRemoveBusinessMetadataParameters = EntityRemoveBusinessMetadataBodyParam &
  RequestParameters;

export interface EntityAddOrUpdateBusinessMetadataBodyParam {
  /** BusinessMetadata payload */
  body: Record<string, Record<string, unknown>>;
}

export interface EntityAddOrUpdateBusinessMetadataQueryParamProperties {
  /**
   * Whether to overwrite the existing business metadata on the entity or not,
   * default is false.
   */
  isOverwrite?: boolean;
}

export interface EntityAddOrUpdateBusinessMetadataQueryParam {
  queryParameters?: EntityAddOrUpdateBusinessMetadataQueryParamProperties;
}

export type EntityAddOrUpdateBusinessMetadataParameters =
  EntityAddOrUpdateBusinessMetadataQueryParam &
    EntityAddOrUpdateBusinessMetadataBodyParam &
    RequestParameters;

export interface EntityRemoveBusinessMetadataAttributesBodyParam {
  /** Business metadata attribute payload */
  body: Record<string, unknown>;
}

export type EntityRemoveBusinessMetadataAttributesParameters =
  EntityRemoveBusinessMetadataAttributesBodyParam & RequestParameters;

export interface EntityAddOrUpdateBusinessMetadataAttributesBodyParam {
  /** Business metadata attribute payload */
  body: Record<string, unknown>;
}

export type EntityAddOrUpdateBusinessMetadataAttributesParameters =
  EntityAddOrUpdateBusinessMetadataAttributesBodyParam & RequestParameters;
export type EntityGetSampleBusinessMetadataTemplateParameters = RequestParameters;

export interface EntityImportBusinessMetadataBodyParam {
  /** Multipart body */
  body: BusinessMetadataOptions;
}

export interface EntityImportBusinessMetadataMediaTypesParam {
  /** The content type for the operation. Always multipart/form-data for this operation. */
  contentType: "multipart/form-data";
}

export type EntityImportBusinessMetadataParameters = EntityImportBusinessMetadataMediaTypesParam &
  EntityImportBusinessMetadataBodyParam &
  RequestParameters;

export interface EntityRemoveLabelsBodyParam {
  /** set of labels to be deleted */
  body?: string[];
}

export type EntityRemoveLabelsParameters = EntityRemoveLabelsBodyParam & RequestParameters;

export interface EntitySetLabelsBodyParam {
  /** set of labels to be set to the entity */
  body?: string[];
}

export type EntitySetLabelsParameters = EntitySetLabelsBodyParam & RequestParameters;

export interface EntityAddLabelBodyParam {
  /** set of labels to be added */
  body?: string[];
}

export type EntityAddLabelParameters = EntityAddLabelBodyParam & RequestParameters;

export interface EntityRemoveLabelsByUniqueAttributeBodyParam {
  /** set of labels to be deleted */
  body?: string[];
}

export interface EntityRemoveLabelsByUniqueAttributeQueryParamProperties {
  /**
   * The qualified name of the entity. (This is only an example. qualifiedName can
   * be changed to other unique attributes)
   */
  "attr:qualifiedName"?: string;
}

export interface EntityRemoveLabelsByUniqueAttributeQueryParam {
  queryParameters?: EntityRemoveLabelsByUniqueAttributeQueryParamProperties;
}

export type EntityRemoveLabelsByUniqueAttributeParameters =
  EntityRemoveLabelsByUniqueAttributeQueryParam &
    EntityRemoveLabelsByUniqueAttributeBodyParam &
    RequestParameters;

export interface EntitySetLabelsByUniqueAttributeBodyParam {
  /** set of labels to be set */
  body?: string[];
}

export interface EntitySetLabelsByUniqueAttributeQueryParamProperties {
  /**
   * The qualified name of the entity. (This is only an example. qualifiedName can
   * be changed to other unique attributes)
   */
  "attr:qualifiedName"?: string;
}

export interface EntitySetLabelsByUniqueAttributeQueryParam {
  queryParameters?: EntitySetLabelsByUniqueAttributeQueryParamProperties;
}

export type EntitySetLabelsByUniqueAttributeParameters =
  EntitySetLabelsByUniqueAttributeQueryParam &
    EntitySetLabelsByUniqueAttributeBodyParam &
    RequestParameters;

export interface EntityAddLabelsByUniqueAttributeBodyParam {
  /** set of labels to be added */
  body?: string[];
}

export interface EntityAddLabelsByUniqueAttributeQueryParamProperties {
  /**
   * The qualified name of the entity. (This is only an example. qualifiedName can
   * be changed to other unique attributes)
   */
  "attr:qualifiedName"?: string;
}

export interface EntityAddLabelsByUniqueAttributeQueryParam {
  queryParameters?: EntityAddLabelsByUniqueAttributeQueryParamProperties;
}

export type EntityAddLabelsByUniqueAttributeParameters =
  EntityAddLabelsByUniqueAttributeQueryParam &
    EntityAddLabelsByUniqueAttributeBodyParam &
    RequestParameters;

export interface EntityMoveEntitiesToCollectionBodyParam {
  /** Body parameter. */
  body: MoveEntitiesOptions;
}

export interface EntityMoveEntitiesToCollectionQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
  /** The collection where entities will be moved to. */
  collectionId: string;
}

export interface EntityMoveEntitiesToCollectionQueryParam {
  queryParameters: EntityMoveEntitiesToCollectionQueryParamProperties;
}

export type EntityMoveEntitiesToCollectionParameters = EntityMoveEntitiesToCollectionQueryParam &
  EntityMoveEntitiesToCollectionBodyParam &
  RequestParameters;

export interface GlossaryListQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version"?: string;
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
  /** Whether ignore terms and categories */
  ignoreTermsAndCategories?: boolean;
}

export interface GlossaryListQueryParam {
  queryParameters?: GlossaryListQueryParamProperties;
}

export type GlossaryListParameters = GlossaryListQueryParam & RequestParameters;

export interface GlossaryCreateBodyParam {
  /** Body parameter. */
  body: AtlasGlossary;
}

export type GlossaryCreateParameters = GlossaryCreateBodyParam & RequestParameters;

export interface GlossaryCreateCategoriesBodyParam {
  /** An array of glossary category definitions to be created. */
  body: Array<AtlasGlossaryCategory>;
}

export type GlossaryCreateCategoriesParameters = GlossaryCreateCategoriesBodyParam &
  RequestParameters;

export interface GlossaryCreateCategoryBodyParam {
  /** Body parameter. */
  body: AtlasGlossaryCategory;
}

export type GlossaryCreateCategoryParameters = GlossaryCreateCategoryBodyParam & RequestParameters;
export type GlossaryGetCategoryParameters = RequestParameters;

export interface GlossaryUpdateCategoryBodyParam {
  /** Body parameter. */
  body: AtlasGlossaryCategory;
}

export type GlossaryUpdateCategoryParameters = GlossaryUpdateCategoryBodyParam & RequestParameters;
export type GlossaryDeleteCategoryParameters = RequestParameters;

export interface GlossaryPartialUpdateCategoryBodyParam {
  /**
   * A map containing keys as attribute names and values as corresponding attribute
   * values for partial update.
   */
  body: Record<string, string>;
}

export type GlossaryPartialUpdateCategoryParameters = GlossaryPartialUpdateCategoryBodyParam &
  RequestParameters;

export interface GlossaryListRelatedCategoriesQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryListRelatedCategoriesQueryParam {
  queryParameters?: GlossaryListRelatedCategoriesQueryParamProperties;
}

export type GlossaryListRelatedCategoriesParameters = GlossaryListRelatedCategoriesQueryParam &
  RequestParameters;

export interface GlossaryListCategoryTermsQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryListCategoryTermsQueryParam {
  queryParameters?: GlossaryListCategoryTermsQueryParamProperties;
}

export type GlossaryListCategoryTermsParameters = GlossaryListCategoryTermsQueryParam &
  RequestParameters;

export interface GlossaryCreateTermBodyParam {
  /** Body parameter. */
  body: AtlasGlossaryTerm;
}

export interface GlossaryCreateTermQueryParamProperties {
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
}

export interface GlossaryCreateTermQueryParam {
  queryParameters?: GlossaryCreateTermQueryParamProperties;
}

export type GlossaryCreateTermParameters = GlossaryCreateTermQueryParam &
  GlossaryCreateTermBodyParam &
  RequestParameters;

export interface GlossaryGetTermQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version"?: string;
}

export interface GlossaryGetTermQueryParam {
  queryParameters?: GlossaryGetTermQueryParamProperties;
}

export type GlossaryGetTermParameters = GlossaryGetTermQueryParam & RequestParameters;

export interface GlossaryUpdateTermBodyParam {
  /** Body parameter. */
  body: AtlasGlossaryTerm;
}

export interface GlossaryUpdateTermQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version"?: string;
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
}

export interface GlossaryUpdateTermQueryParam {
  queryParameters?: GlossaryUpdateTermQueryParamProperties;
}

export type GlossaryUpdateTermParameters = GlossaryUpdateTermQueryParam &
  GlossaryUpdateTermBodyParam &
  RequestParameters;
export type GlossaryDeleteTermParameters = RequestParameters;

export interface GlossaryPartialUpdateTermBodyParam {
  /**
   * A map containing keys as attribute names and values as corresponding attribute
   * values to be updated.
   */
  body: Record<string, string>;
}

export interface GlossaryPartialUpdateTermQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version"?: string;
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
}

export interface GlossaryPartialUpdateTermQueryParam {
  queryParameters?: GlossaryPartialUpdateTermQueryParamProperties;
}

export type GlossaryPartialUpdateTermParameters = GlossaryPartialUpdateTermQueryParam &
  GlossaryPartialUpdateTermBodyParam &
  RequestParameters;

export interface GlossaryCreateTermsBodyParam {
  /** An array of glossary term definitions to be created in bulk. */
  body: Array<AtlasGlossaryTerm>;
}

export interface GlossaryCreateTermsQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version"?: string;
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
}

export interface GlossaryCreateTermsQueryParam {
  queryParameters?: GlossaryCreateTermsQueryParamProperties;
}

export type GlossaryCreateTermsParameters = GlossaryCreateTermsQueryParam &
  GlossaryCreateTermsBodyParam &
  RequestParameters;

export interface GlossaryListEntitiesAssignedWithTermQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryListEntitiesAssignedWithTermQueryParam {
  queryParameters?: GlossaryListEntitiesAssignedWithTermQueryParamProperties;
}

export type GlossaryListEntitiesAssignedWithTermParameters =
  GlossaryListEntitiesAssignedWithTermQueryParam & RequestParameters;

export interface GlossaryAssignTermToEntitiesBodyParam {
  /** An array of related object IDs to which the term has to be associated. */
  body: Array<AtlasRelatedObjectId>;
}

export type GlossaryAssignTermToEntitiesParameters = GlossaryAssignTermToEntitiesBodyParam &
  RequestParameters;

export interface GlossaryDeleteTermAssignmentFromEntitiesBodyParam {
  /** An array of related object IDs from which the term has to be dissociated. */
  body: Array<AtlasRelatedObjectId>;
}

export type GlossaryDeleteTermAssignmentFromEntitiesParameters =
  GlossaryDeleteTermAssignmentFromEntitiesBodyParam & RequestParameters;

export interface GlossaryListRelatedTermsQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version"?: string;
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryListRelatedTermsQueryParam {
  queryParameters?: GlossaryListRelatedTermsQueryParamProperties;
}

export type GlossaryListRelatedTermsParameters = GlossaryListRelatedTermsQueryParam &
  RequestParameters;
export type GlossaryGetParameters = RequestParameters;

export interface GlossaryUpdateBodyParam {
  /** Body parameter. */
  body: AtlasGlossary;
}

export interface GlossaryUpdateQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version"?: string;
  /** Whether ignore terms and categories */
  ignoreTermsAndCategories?: boolean;
}

export interface GlossaryUpdateQueryParam {
  queryParameters?: GlossaryUpdateQueryParamProperties;
}

export type GlossaryUpdateParameters = GlossaryUpdateQueryParam &
  GlossaryUpdateBodyParam &
  RequestParameters;
export type GlossaryDeleteParameters = RequestParameters;

export interface GlossaryListCategoriesQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryListCategoriesQueryParam {
  queryParameters?: GlossaryListCategoriesQueryParamProperties;
}

export type GlossaryListCategoriesParameters = GlossaryListCategoriesQueryParam & RequestParameters;

export interface GlossaryListCategoriesHeadersQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryListCategoriesHeadersQueryParam {
  queryParameters?: GlossaryListCategoriesHeadersQueryParamProperties;
}

export type GlossaryListCategoriesHeadersParameters = GlossaryListCategoriesHeadersQueryParam &
  RequestParameters;

export interface GlossaryGetDetailedQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version"?: string;
}

export interface GlossaryGetDetailedQueryParam {
  queryParameters?: GlossaryGetDetailedQueryParamProperties;
}

export type GlossaryGetDetailedParameters = GlossaryGetDetailedQueryParam & RequestParameters;

export interface GlossaryPartialUpdateBodyParam {
  /**
   * A map containing keys as attribute names and values as corresponding attribute
   * values.
   */
  body: Record<string, string>;
}

export interface GlossaryPartialUpdateQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version"?: string;
  /** Whether ignore terms and categories */
  ignoreTermsAndCategories?: boolean;
}

export interface GlossaryPartialUpdateQueryParam {
  queryParameters?: GlossaryPartialUpdateQueryParamProperties;
}

export type GlossaryPartialUpdateParameters = GlossaryPartialUpdateQueryParam &
  GlossaryPartialUpdateBodyParam &
  RequestParameters;

export interface GlossaryListTermsQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version"?: string;
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryListTermsQueryParam {
  queryParameters?: GlossaryListTermsQueryParamProperties;
}

export type GlossaryListTermsParameters = GlossaryListTermsQueryParam & RequestParameters;

export interface GlossaryListTermHeadersQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryListTermHeadersQueryParam {
  queryParameters?: GlossaryListTermHeadersQueryParamProperties;
}

export type GlossaryListTermHeadersParameters = GlossaryListTermHeadersQueryParam &
  RequestParameters;

export interface DiscoveryQueryBodyParam {
  /** Body parameter. */
  body: QueryOptions;
}

export interface DiscoveryQueryQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface DiscoveryQueryQueryParam {
  queryParameters: DiscoveryQueryQueryParamProperties;
}

export type DiscoveryQueryParameters = DiscoveryQueryQueryParam &
  DiscoveryQueryBodyParam &
  RequestParameters;

export interface DiscoverySuggestBodyParam {
  /** Body parameter. */
  body: SuggestOptions;
}

export interface DiscoverySuggestQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface DiscoverySuggestQueryParam {
  queryParameters: DiscoverySuggestQueryParamProperties;
}

export type DiscoverySuggestParameters = DiscoverySuggestQueryParam &
  DiscoverySuggestBodyParam &
  RequestParameters;

export interface DiscoveryAutoCompleteBodyParam {
  /** Body parameter. */
  body: AutoCompleteOptions;
}

export interface DiscoveryAutoCompleteQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface DiscoveryAutoCompleteQueryParam {
  queryParameters: DiscoveryAutoCompleteQueryParamProperties;
}

export type DiscoveryAutoCompleteParameters = DiscoveryAutoCompleteQueryParam &
  DiscoveryAutoCompleteBodyParam &
  RequestParameters;

export interface LineageGetQueryParamProperties {
  /** The number of hops for lineage. */
  depth?: number;
  /**
   * The direction of the lineage, which could be INPUT, OUTPUT or BOTH.
   *
   * Possible values: "INPUT", "OUTPUT", "BOTH"
   */
  direction: LineageDirection;
}

export interface LineageGetQueryParam {
  queryParameters: LineageGetQueryParamProperties;
}

export type LineageGetParameters = LineageGetQueryParam & RequestParameters;

export interface LineageGetNextPageQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
  /**
   * The direction of the lineage, which could be INPUT, OUTPUT or BOTH.
   *
   * Possible values: "INPUT", "OUTPUT", "BOTH"
   */
  direction: LineageDirection;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The page size - by default there is no paging. */
  limit?: number;
}

export interface LineageGetNextPageQueryParam {
  queryParameters: LineageGetNextPageQueryParamProperties;
}

export type LineageGetNextPageParameters = LineageGetNextPageQueryParam & RequestParameters;

export interface LineageGetByUniqueAttributeQueryParamProperties {
  /** The number of hops for lineage. */
  depth?: number;
  /**
   * The direction of the lineage, which could be INPUT, OUTPUT or BOTH.
   *
   * Possible values: "INPUT", "OUTPUT", "BOTH"
   */
  direction: LineageDirection;
  /**
   * The qualified name of the entity. (This is only an example. qualifiedName can
   * be changed to other unique attributes)
   */
  "attr:qualifiedName"?: string;
}

export interface LineageGetByUniqueAttributeQueryParam {
  queryParameters: LineageGetByUniqueAttributeQueryParamProperties;
}

export type LineageGetByUniqueAttributeParameters = LineageGetByUniqueAttributeQueryParam &
  RequestParameters;

export interface RelationshipCreateBodyParam {
  /** Body parameter. */
  body: AtlasRelationship;
}

export type RelationshipCreateParameters = RelationshipCreateBodyParam & RequestParameters;

export interface RelationshipUpdateBodyParam {
  /** Body parameter. */
  body: AtlasRelationship;
}

export type RelationshipUpdateParameters = RelationshipUpdateBodyParam & RequestParameters;

export interface RelationshipGetQueryParamProperties {
  /** Limits whether includes extended information. */
  extendedInfo?: boolean;
}

export interface RelationshipGetQueryParam {
  queryParameters?: RelationshipGetQueryParamProperties;
}

export type RelationshipGetParameters = RelationshipGetQueryParam & RequestParameters;
export type RelationshipDeleteParameters = RequestParameters;
export type TypeGetBusinessMetadataDefByGuidParameters = RequestParameters;
export type TypeGetBusinessMetadataDefByNameParameters = RequestParameters;
export type TypeGetClassificationDefByGuidParameters = RequestParameters;
export type TypeGetClassificationDefByNameParameters = RequestParameters;
export type TypeGetEntityDefByGuidParameters = RequestParameters;
export type TypeGetEntityDefByNameParameters = RequestParameters;
export type TypeGetEnumDefByGuidParameters = RequestParameters;
export type TypeGetEnumDefByNameParameters = RequestParameters;
export type TypeGetRelationshipDefByGuidParameters = RequestParameters;
export type TypeGetRelationshipDefByNameParameters = RequestParameters;
export type TypeGetStructDefByGuidParameters = RequestParameters;
export type TypeGetStructDefByNameParameters = RequestParameters;
export type TypeGetByGuidParameters = RequestParameters;
export type TypeGetByNameParameters = RequestParameters;
export type TypeDeleteParameters = RequestParameters;

export interface TypeListQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version"?: string;
  /**
   * Whether include termtemplatedef when return all typedefs.
   * This is always true
   * when search filter type=term_template
   */
  includeTermTemplate?: boolean;
  /**
   * Typedef name as search filter when get typedefs.
   *
   * Possible values: "PRIMITIVE", "OBJECT_ID_TYPE", "ENUM", "STRUCT", "CLASSIFICATION", "ENTITY", "ARRAY", "MAP", "RELATIONSHIP", "TERM_TEMPLATE"
   */
  type?: TypeCategory;
}

export interface TypeListQueryParam {
  queryParameters?: TypeListQueryParamProperties;
}

export type TypeListParameters = TypeListQueryParam & RequestParameters;

export interface TypeBulkCreateBodyParam {
  /** Body parameter. */
  body: AtlasTypesDef;
}

export type TypeBulkCreateParameters = TypeBulkCreateBodyParam & RequestParameters;

export interface TypeBulkUpdateBodyParam {
  /** Body parameter. */
  body: AtlasTypesDef;
}

export type TypeBulkUpdateParameters = TypeBulkUpdateBodyParam & RequestParameters;

export interface TypeBulkDeleteBodyParam {
  /** Body parameter. */
  body: AtlasTypesDef;
}

export type TypeBulkDeleteParameters = TypeBulkDeleteBodyParam & RequestParameters;

export interface TypeListHeadersQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version"?: string;
  /**
   * Whether include termtemplatedef when return all typedefs.
   * This is always true
   * when search filter type=term_template
   */
  includeTermTemplate?: boolean;
  /**
   * Typedef name as search filter when get typedefs.
   *
   * Possible values: "PRIMITIVE", "OBJECT_ID_TYPE", "ENUM", "STRUCT", "CLASSIFICATION", "ENTITY", "ARRAY", "MAP", "RELATIONSHIP", "TERM_TEMPLATE"
   */
  type?: TypeCategory;
}

export interface TypeListHeadersQueryParam {
  queryParameters?: TypeListHeadersQueryParamProperties;
}

export type TypeListHeadersParameters = TypeListHeadersQueryParam & RequestParameters;

export interface TypeGetTermTemplateDefByGuidQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface TypeGetTermTemplateDefByGuidQueryParam {
  queryParameters: TypeGetTermTemplateDefByGuidQueryParamProperties;
}

export type TypeGetTermTemplateDefByGuidParameters = TypeGetTermTemplateDefByGuidQueryParam &
  RequestParameters;

export interface TypeGetTermTemplateDefByNameQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface TypeGetTermTemplateDefByNameQueryParam {
  queryParameters: TypeGetTermTemplateDefByNameQueryParamProperties;
}

export type TypeGetTermTemplateDefByNameParameters = TypeGetTermTemplateDefByNameQueryParam &
  RequestParameters;
