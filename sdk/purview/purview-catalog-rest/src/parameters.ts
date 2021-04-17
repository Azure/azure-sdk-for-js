// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  JsonAtlasEntityWithExtInfo,
  JsonAtlasEntitiesWithExtInfo,
  JsonClassificationAssociateRequest,
  JsonAtlasClassification,
  JsonAtlasEntityHeaders,
  JsonAtlasGlossary,
  JsonAtlasGlossaryCategory,
  DictionaryOfStringDictionary,
  JsonAtlasGlossaryTerm,
  JsonAtlasRelatedObjectId,
  JsonSearchRequest,
  JsonSuggestRequest,
  JsonAutoCompleteRequest,
  Enum7,
  JsonAtlasRelationship,
  Enum14,
  JsonAtlasTypesDef
} from "./models";

export interface EntityRestCreateOrUpdateBodyParam {
  body: JsonAtlasEntityWithExtInfo;
}

export type EntityRestCreateOrUpdateParameters = RequestParameters &
  EntityRestCreateOrUpdateBodyParam;

export interface EntityRestGetByGuidsQueryParamProperties {
  /** An array of GUIDs of entities to create. */
  guid: string[];
  /** Whether to return minimal information for referred entities. */
  minExtInfo?: boolean;
  /** Whether to ignore relationship attributes. */
  ignoreRelationships?: boolean;
  /** An array of the relationship types need to be excluded from the response. */
  excludeRelationshipTypes?: string[];
}

export interface EntityRestGetByGuidsQueryParam {
  queryParameters: EntityRestGetByGuidsQueryParamProperties;
}

export type EntityRestGetByGuidsParameters = RequestParameters &
  EntityRestGetByGuidsQueryParam;

export interface EntityRestCreateOrUpdateBulkBodyParam {
  body: JsonAtlasEntitiesWithExtInfo;
}

export type EntityRestCreateOrUpdateBulkParameters = RequestParameters &
  EntityRestCreateOrUpdateBulkBodyParam;

export interface EntityRestBulkDeleteQueryParamProperties {
  /** An array of GUIDs of entities to delete. */
  guid: string[];
}

export interface EntityRestBulkDeleteQueryParam {
  queryParameters: EntityRestBulkDeleteQueryParamProperties;
}

export type EntityRestBulkDeleteParameters = RequestParameters &
  EntityRestBulkDeleteQueryParam;

export interface EntityRestAddClassificationBodyParam {
  body: JsonClassificationAssociateRequest;
}

export type EntityRestAddClassificationParameters = RequestParameters &
  EntityRestAddClassificationBodyParam;

export interface EntityRestGetByIdQueryParamProperties {
  /** Whether to return minimal information for referred entities. */
  minExtInfo?: boolean;
  /** Whether to ignore relationship attributes. */
  ignoreRelationships?: boolean;
}

export interface EntityRestGetByIdQueryParam {
  queryParameters?: EntityRestGetByIdQueryParamProperties;
}

export type EntityRestGetByIdParameters = RequestParameters &
  EntityRestGetByIdQueryParam;

export interface EntityRestPartialUpdateEntityAttrByGuidQueryParamProperties {
  /** The name of the attribute. */
  name: string;
}

export interface EntityRestPartialUpdateEntityAttrByGuidQueryParam {
  queryParameters: EntityRestPartialUpdateEntityAttrByGuidQueryParamProperties;
}

export interface EntityRestPartialUpdateEntityAttrByGuidBodyParam {
  body: any;
}

export type EntityRestPartialUpdateEntityAttrByGuidParameters = RequestParameters &
  EntityRestPartialUpdateEntityAttrByGuidQueryParam &
  EntityRestPartialUpdateEntityAttrByGuidBodyParam;
export type EntityRestDeleteByGuidParameters = RequestParameters;
export type EntityRestGetClassificationParameters = RequestParameters;
export type EntityRestDeleteClassificationParameters = RequestParameters;
export type EntityRestGetClassificationsParameters = RequestParameters;

export interface EntityRestAddClassificationsBodyParam {
  body: JsonAtlasClassification[];
}

export type EntityRestAddClassificationsParameters = RequestParameters &
  EntityRestAddClassificationsBodyParam;

export interface EntityRestUpdateClassificationsBodyParam {
  body: JsonAtlasClassification[];
}

export type EntityRestUpdateClassificationsParameters = RequestParameters &
  EntityRestUpdateClassificationsBodyParam;

export interface EntityRestGetByUniqueAttributesQueryParamProperties {
  /** Whether to return minimal information for referred entities. */
  minExtInfo?: boolean;
  /** Whether to ignore relationship attributes. */
  ignoreRelationships?: boolean;
  /** The qualified name of the entity. */
  "attr:qualifiedName"?: string;
}

export interface EntityRestGetByUniqueAttributesQueryParam {
  queryParameters?: EntityRestGetByUniqueAttributesQueryParamProperties;
}

export type EntityRestGetByUniqueAttributesParameters = RequestParameters &
  EntityRestGetByUniqueAttributesQueryParam;

export interface EntityRestPartialUpdateEntityByUniqueAttrsQueryParamProperties {
  /** The qualified name of the entity. */
  "attr:qualifiedName"?: string;
}

export interface EntityRestPartialUpdateEntityByUniqueAttrsQueryParam {
  queryParameters?: EntityRestPartialUpdateEntityByUniqueAttrsQueryParamProperties;
}

export interface EntityRestPartialUpdateEntityByUniqueAttrsBodyParam {
  body: JsonAtlasEntityWithExtInfo;
}

export type EntityRestPartialUpdateEntityByUniqueAttrsParameters = RequestParameters &
  EntityRestPartialUpdateEntityByUniqueAttrsQueryParam &
  EntityRestPartialUpdateEntityByUniqueAttrsBodyParam;

export interface EntityRestDeleteByUniqueAttributeQueryParamProperties {
  /** The qualified name of the entity. */
  "attr:qualifiedName"?: string;
}

export interface EntityRestDeleteByUniqueAttributeQueryParam {
  queryParameters?: EntityRestDeleteByUniqueAttributeQueryParamProperties;
}

export type EntityRestDeleteByUniqueAttributeParameters = RequestParameters &
  EntityRestDeleteByUniqueAttributeQueryParam;

export interface EntityRestDeleteClassificationByUniqueAttributeQueryParamProperties {
  /** The qualified name of the entity. */
  "attr:qualifiedName"?: string;
}

export interface EntityRestDeleteClassificationByUniqueAttributeQueryParam {
  queryParameters?: EntityRestDeleteClassificationByUniqueAttributeQueryParamProperties;
}

export type EntityRestDeleteClassificationByUniqueAttributeParameters = RequestParameters &
  EntityRestDeleteClassificationByUniqueAttributeQueryParam;

export interface EntityRestAddClassificationsByUniqueAttributeQueryParamProperties {
  /** The qualified name of the entity. */
  "attr:qualifiedName"?: string;
}

export interface EntityRestAddClassificationsByUniqueAttributeQueryParam {
  queryParameters?: EntityRestAddClassificationsByUniqueAttributeQueryParamProperties;
}

export interface EntityRestAddClassificationsByUniqueAttributeBodyParam {
  body: JsonAtlasClassification[];
}

export type EntityRestAddClassificationsByUniqueAttributeParameters = RequestParameters &
  EntityRestAddClassificationsByUniqueAttributeQueryParam &
  EntityRestAddClassificationsByUniqueAttributeBodyParam;

export interface EntityRestUpdateClassificationsByUniqueAttributeQueryParamProperties {
  /** The qualified name of the entity. */
  "attr:qualifiedName"?: string;
}

export interface EntityRestUpdateClassificationsByUniqueAttributeQueryParam {
  queryParameters?: EntityRestUpdateClassificationsByUniqueAttributeQueryParamProperties;
}

export interface EntityRestUpdateClassificationsByUniqueAttributeBodyParam {
  body: JsonAtlasClassification[];
}

export type EntityRestUpdateClassificationsByUniqueAttributeParameters = RequestParameters &
  EntityRestUpdateClassificationsByUniqueAttributeQueryParam &
  EntityRestUpdateClassificationsByUniqueAttributeBodyParam;

export interface EntityRestSetClassificationsBodyParam {
  body: JsonAtlasEntityHeaders;
}

export type EntityRestSetClassificationsParameters = RequestParameters &
  EntityRestSetClassificationsBodyParam;

export interface EntityRestGetEntitiesByUniqueAttributesQueryParamProperties {
  /** Whether to return minimal information for referred entities. */
  minExtInfo?: boolean;
  /** Whether to ignore relationship attributes. */
  ignoreRelationships?: boolean;
  /** Qualified name of an entity. E.g. to find 2 entities you can set attrs_0:qualifiedName=db1\@cl1&attrs_2:qualifiedName=db2\@cl1 */
  "attr_N:qualifiedName"?: string;
}

export interface EntityRestGetEntitiesByUniqueAttributesQueryParam {
  queryParameters?: EntityRestGetEntitiesByUniqueAttributesQueryParamProperties;
}

export type EntityRestGetEntitiesByUniqueAttributesParameters = RequestParameters &
  EntityRestGetEntitiesByUniqueAttributesQueryParam;
export type EntityRestGetHeaderByIdParameters = RequestParameters;

export interface GlossaryRestGetGlossariesQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryRestGetGlossariesQueryParam {
  queryParameters?: GlossaryRestGetGlossariesQueryParamProperties;
}

export type GlossaryRestGetGlossariesParameters = RequestParameters &
  GlossaryRestGetGlossariesQueryParam;

export interface GlossaryRestCreateGlossaryBodyParam {
  body: JsonAtlasGlossary;
}

export type GlossaryRestCreateGlossaryParameters = RequestParameters &
  GlossaryRestCreateGlossaryBodyParam;

export interface GlossaryRestCreateGlossaryCategoriesBodyParam {
  body: JsonAtlasGlossaryCategory[];
}

export type GlossaryRestCreateGlossaryCategoriesParameters = RequestParameters &
  GlossaryRestCreateGlossaryCategoriesBodyParam;

export interface GlossaryRestCreateGlossaryCategoryBodyParam {
  body: JsonAtlasGlossaryCategory;
}

export type GlossaryRestCreateGlossaryCategoryParameters = RequestParameters &
  GlossaryRestCreateGlossaryCategoryBodyParam;
export type GlossaryRestGetGlossaryCategoryParameters = RequestParameters;

export interface GlossaryRestUpdateGlossaryCategoryBodyParam {
  body: JsonAtlasGlossaryCategory;
}

export type GlossaryRestUpdateGlossaryCategoryParameters = RequestParameters &
  GlossaryRestUpdateGlossaryCategoryBodyParam;
export type GlossaryRestDeleteGlossaryCategoryParameters = RequestParameters;

export interface GlossaryRestPartialUpdateGlossaryCategoryBodyParam {
  body: DictionaryOfStringDictionary;
}

export type GlossaryRestPartialUpdateGlossaryCategoryParameters = RequestParameters &
  GlossaryRestPartialUpdateGlossaryCategoryBodyParam;

export interface GlossaryRestGetRelatedCategoriesQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryRestGetRelatedCategoriesQueryParam {
  queryParameters?: GlossaryRestGetRelatedCategoriesQueryParamProperties;
}

export type GlossaryRestGetRelatedCategoriesParameters = RequestParameters &
  GlossaryRestGetRelatedCategoriesQueryParam;

export interface GlossaryRestGetCategoryTermsQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryRestGetCategoryTermsQueryParam {
  queryParameters?: GlossaryRestGetCategoryTermsQueryParamProperties;
}

export type GlossaryRestGetCategoryTermsParameters = RequestParameters &
  GlossaryRestGetCategoryTermsQueryParam;

export interface GlossaryRestCreateGlossaryTermBodyParam {
  body: JsonAtlasGlossaryTerm;
}

export type GlossaryRestCreateGlossaryTermParameters = RequestParameters &
  GlossaryRestCreateGlossaryTermBodyParam;
export type GlossaryRestGetGlossaryTermParameters = RequestParameters;

export interface GlossaryRestUpdateGlossaryTermBodyParam {
  body: JsonAtlasGlossaryTerm;
}

export type GlossaryRestUpdateGlossaryTermParameters = RequestParameters &
  GlossaryRestUpdateGlossaryTermBodyParam;
export type GlossaryRestDeleteGlossaryTermParameters = RequestParameters;

export interface GlossaryRestPartialUpdateGlossaryTermBodyParam {
  body: DictionaryOfStringDictionary;
}

export type GlossaryRestPartialUpdateGlossaryTermParameters = RequestParameters &
  GlossaryRestPartialUpdateGlossaryTermBodyParam;

export interface GlossaryRestCreateGlossaryTermsBodyParam {
  body: JsonAtlasGlossaryTerm[];
}

export type GlossaryRestCreateGlossaryTermsParameters = RequestParameters &
  GlossaryRestCreateGlossaryTermsBodyParam;

export interface GlossaryRestGetEntitiesAssignedWithTermQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryRestGetEntitiesAssignedWithTermQueryParam {
  queryParameters?: GlossaryRestGetEntitiesAssignedWithTermQueryParamProperties;
}

export type GlossaryRestGetEntitiesAssignedWithTermParameters = RequestParameters &
  GlossaryRestGetEntitiesAssignedWithTermQueryParam;

export interface GlossaryRestAssignTermToEntitiesBodyParam {
  body: JsonAtlasRelatedObjectId[];
}

export type GlossaryRestAssignTermToEntitiesParameters = RequestParameters &
  GlossaryRestAssignTermToEntitiesBodyParam;

export interface GlossaryRestRemoveTermAssignmentFromEntitiesBodyParam {
  body: JsonAtlasRelatedObjectId[];
}

export type GlossaryRestRemoveTermAssignmentFromEntitiesParameters = RequestParameters &
  GlossaryRestRemoveTermAssignmentFromEntitiesBodyParam;

export interface GlossaryRestDeleteTermAssignmentFromEntitiesBodyParam {
  body: JsonAtlasRelatedObjectId[];
}

export type GlossaryRestDeleteTermAssignmentFromEntitiesParameters = RequestParameters &
  GlossaryRestDeleteTermAssignmentFromEntitiesBodyParam;

export interface GlossaryRestGetRelatedTermsQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryRestGetRelatedTermsQueryParam {
  queryParameters?: GlossaryRestGetRelatedTermsQueryParamProperties;
}

export type GlossaryRestGetRelatedTermsParameters = RequestParameters &
  GlossaryRestGetRelatedTermsQueryParam;
export type GlossaryRestGetGlossaryParameters = RequestParameters;

export interface GlossaryRestUpdateGlossaryBodyParam {
  body: JsonAtlasGlossary;
}

export type GlossaryRestUpdateGlossaryParameters = RequestParameters &
  GlossaryRestUpdateGlossaryBodyParam;
export type GlossaryRestDeleteGlossaryParameters = RequestParameters;

export interface GlossaryRestGetGlossaryCategoriesQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryRestGetGlossaryCategoriesQueryParam {
  queryParameters?: GlossaryRestGetGlossaryCategoriesQueryParamProperties;
}

export type GlossaryRestGetGlossaryCategoriesParameters = RequestParameters &
  GlossaryRestGetGlossaryCategoriesQueryParam;

export interface GlossaryRestGetGlossaryCategoriesHeadersQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryRestGetGlossaryCategoriesHeadersQueryParam {
  queryParameters?: GlossaryRestGetGlossaryCategoriesHeadersQueryParamProperties;
}

export type GlossaryRestGetGlossaryCategoriesHeadersParameters = RequestParameters &
  GlossaryRestGetGlossaryCategoriesHeadersQueryParam;
export type GlossaryRestGetDetailedGlossaryParameters = RequestParameters;

export interface GlossaryRestPartialUpdateGlossaryBodyParam {
  body: DictionaryOfStringDictionary;
}

export type GlossaryRestPartialUpdateGlossaryParameters = RequestParameters &
  GlossaryRestPartialUpdateGlossaryBodyParam;

export interface GlossaryRestGetGlossaryTermsQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryRestGetGlossaryTermsQueryParam {
  queryParameters?: GlossaryRestGetGlossaryTermsQueryParamProperties;
}

export type GlossaryRestGetGlossaryTermsParameters = RequestParameters &
  GlossaryRestGetGlossaryTermsQueryParam;

export interface GlossaryRestGetGlossaryTermHeadersQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryRestGetGlossaryTermHeadersQueryParam {
  queryParameters?: GlossaryRestGetGlossaryTermHeadersQueryParamProperties;
}

export type GlossaryRestGetGlossaryTermHeadersParameters = RequestParameters &
  GlossaryRestGetGlossaryTermHeadersQueryParam;

export interface GlossaryRestImportGlossaryTermsViaCSVBodyParam {
  body: string;
}

export type GlossaryRestImportGlossaryTermsViaCSVParameters = RequestParameters &
  GlossaryRestImportGlossaryTermsViaCSVBodyParam;

export interface GlossaryRestImportGlossaryTermsViaCSVByGlossaryNameQueryParamProperties {
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
}

export interface GlossaryRestImportGlossaryTermsViaCSVByGlossaryNameQueryParam {
  queryParameters?: GlossaryRestImportGlossaryTermsViaCSVByGlossaryNameQueryParamProperties;
}

export interface GlossaryRestImportGlossaryTermsViaCSVByGlossaryNameBodyParam {
  body: string;
}

export type GlossaryRestImportGlossaryTermsViaCSVByGlossaryNameParameters = RequestParameters &
  GlossaryRestImportGlossaryTermsViaCSVByGlossaryNameQueryParam &
  GlossaryRestImportGlossaryTermsViaCSVByGlossaryNameBodyParam;
export type GlossaryRestGetImportCSVOperationStatusParameters = RequestParameters;

export interface GlossaryRestExportGlossaryTermsAsCSVBodyParam {
  body: string[];
}

export type GlossaryRestExportGlossaryTermsAsCSVParameters = RequestParameters &
  GlossaryRestExportGlossaryTermsAsCSVBodyParam;

export interface GlossaryRestGetTermsByGlossaryNameQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
}

export interface GlossaryRestGetTermsByGlossaryNameQueryParam {
  queryParameters?: GlossaryRestGetTermsByGlossaryNameQueryParamProperties;
}

export type GlossaryRestGetTermsByGlossaryNameParameters = RequestParameters &
  GlossaryRestGetTermsByGlossaryNameQueryParam;

export interface DiscoveryRestSearchAdvancedBodyParam {
  body: JsonSearchRequest;
}

export type DiscoveryRestSearchAdvancedParameters = RequestParameters &
  DiscoveryRestSearchAdvancedBodyParam;

export interface DiscoveryRestSuggestBodyParam {
  body: JsonSuggestRequest;
}

export type DiscoveryRestSuggestParameters = RequestParameters &
  DiscoveryRestSuggestBodyParam;

export interface DiscoveryRestAutoCompleteBodyParam {
  body: JsonAutoCompleteRequest;
}

export type DiscoveryRestAutoCompleteParameters = RequestParameters &
  DiscoveryRestAutoCompleteBodyParam;

export interface LineageRestGetLineageGraphQueryParamProperties {
  /** The number of hops for lineage. */
  depth?: number;
  /** The number of max expanding width in lineage. */
  width?: number;
  /** The direction of the lineage, which could be INPUT, OUTPUT or BOTH. */
  direction: Enum7;
  /** True to include the parent chain in the response. */
  includeParent?: boolean;
  /** True to include derived lineage in the response */
  getDerivedLineage?: boolean;
}

export interface LineageRestGetLineageGraphQueryParam {
  queryParameters: LineageRestGetLineageGraphQueryParamProperties;
}

export type LineageRestGetLineageGraphParameters = RequestParameters &
  LineageRestGetLineageGraphQueryParam;

export interface LineageRestNextLevelLineageQueryParamProperties {
  /** The direction of the lineage, which could be INPUT, OUTPUT or BOTH. */
  direction: Enum7;
  /** True to include derived lineage in the response */
  getDerivedLineage?: boolean;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The page size - by default there is no paging. */
  limit?: number;
}

export interface LineageRestNextLevelLineageQueryParam {
  queryParameters: LineageRestNextLevelLineageQueryParamProperties;
}

export type LineageRestNextLevelLineageParameters = RequestParameters &
  LineageRestNextLevelLineageQueryParam;

export interface RelationshipRestCreateBodyParam {
  body: JsonAtlasRelationship;
}

export type RelationshipRestCreateParameters = RequestParameters &
  RelationshipRestCreateBodyParam;

export interface RelationshipRestUpdateBodyParam {
  body: JsonAtlasRelationship;
}

export type RelationshipRestUpdateParameters = RequestParameters &
  RelationshipRestUpdateBodyParam;

export interface RelationshipRestGetById2QueryParamProperties {
  /** Limits whether includes extended information. */
  extendedInfo?: boolean;
}

export interface RelationshipRestGetById2QueryParam {
  queryParameters?: RelationshipRestGetById2QueryParamProperties;
}

export type RelationshipRestGetById2Parameters = RequestParameters &
  RelationshipRestGetById2QueryParam;
export type RelationshipRestDeleteByIdParameters = RequestParameters;
export type TypesRestGetClassificationDefByGuidParameters = RequestParameters;
export type TypesRestGetClassificationDefByNameParameters = RequestParameters;
export type TypesRestGetEntityDefByGuidParameters = RequestParameters;
export type TypesRestGetEntityDefByNameParameters = RequestParameters;
export type TypesRestGetEnumDefByGuidParameters = RequestParameters;
export type TypesRestGetEnumDefByNameParameters = RequestParameters;
export type TypesRestGetRelationshipDefByGuidParameters = RequestParameters;
export type TypesRestGetRelationshipDefByNameParameters = RequestParameters;
export type TypesRestGetStructDefByGuidParameters = RequestParameters;
export type TypesRestGetStructDefByNameParameters = RequestParameters;
export type TypesRestGetTypeDefByGuidParameters = RequestParameters;
export type TypesRestGetTypeDefByNameParameters = RequestParameters;
export type TypesRestDeleteTypeByNameParameters = RequestParameters;

export interface TypesRestGetAllTypeDefsQueryParamProperties {
  /**
   * Whether include termtemplatedef when return all typedefs.
   * This is always true when search filter type=term_template
   */
  includeTermTemplate?: boolean;
  /** Typedef name as search filter when get typedefs. */
  type?: Enum14;
}

export interface TypesRestGetAllTypeDefsQueryParam {
  queryParameters?: TypesRestGetAllTypeDefsQueryParamProperties;
}

export type TypesRestGetAllTypeDefsParameters = RequestParameters &
  TypesRestGetAllTypeDefsQueryParam;

export interface TypesRestCreateTypeDefsBodyParam {
  body: JsonAtlasTypesDef;
}

export type TypesRestCreateTypeDefsParameters = RequestParameters &
  TypesRestCreateTypeDefsBodyParam;

export interface TypesRestUpdateAtlasTypeDefsBodyParam {
  body: JsonAtlasTypesDef;
}

export type TypesRestUpdateAtlasTypeDefsParameters = RequestParameters &
  TypesRestUpdateAtlasTypeDefsBodyParam;

export interface TypesRestDeleteTypeDefsBodyParam {
  body: JsonAtlasTypesDef;
}

export type TypesRestDeleteTypeDefsParameters = RequestParameters &
  TypesRestDeleteTypeDefsBodyParam;

export interface TypesRestGetTypeDefHeadersQueryParamProperties {
  /**
   * Whether include termtemplatedef when return all typedefs.
   * This is always true when search filter type=term_template
   */
  includeTermTemplate?: boolean;
  /** Typedef name as search filter when get typedefs. */
  type?: Enum14;
}

export interface TypesRestGetTypeDefHeadersQueryParam {
  queryParameters?: TypesRestGetTypeDefHeadersQueryParamProperties;
}

export type TypesRestGetTypeDefHeadersParameters = RequestParameters &
  TypesRestGetTypeDefHeadersQueryParam;
export type TypesRestGetTermTemplateDefByGuidParameters = RequestParameters;
export type TypesRestGetTermTemplateDefByNameParameters = RequestParameters;
