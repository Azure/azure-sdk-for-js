// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  AtlasEntityWithExtInfo,
  AtlasEntitiesWithExtInfo,
  ClassificationAssociateRequest,
  AtlasClassification,
  AtlasEntityHeaders,
  AtlasGlossary,
  AtlasGlossaryCategory,
  DictionaryOfStringDictionary,
  AtlasGlossaryTerm,
  AtlasRelatedObjectId,
  SearchRequest,
  SuggestRequest,
  AutoCompleteRequest,
  Direction,
  AtlasRelationship,
  Type,
  AtlasTypesDef
} from "./models";

export interface EntityCreateOrUpdateBodyParam {
  body: AtlasEntityWithExtInfo;
}

export type EntityCreateOrUpdateParameters = RequestParameters &
  EntityCreateOrUpdateBodyParam;

export interface EntityGetByGuidsQueryParamProperties {
  /** An array of GUIDs of entities to create. */
  guid: string[];
  /** Whether to return minimal information for referred entities. */
  minExtInfo?: boolean;
  /** Whether to ignore relationship attributes. */
  ignoreRelationships?: boolean;
  /** An array of the relationship types need to be excluded from the response. */
  excludeRelationshipTypes?: string[];
}

export interface EntityGetByGuidsQueryParam {
  queryParameters: EntityGetByGuidsQueryParamProperties;
}

export type EntityGetByGuidsParameters = RequestParameters &
  EntityGetByGuidsQueryParam;

export interface EntityCreateOrUpdateBulkBodyParam {
  body: AtlasEntitiesWithExtInfo;
}

export type EntityCreateOrUpdateBulkParameters = RequestParameters &
  EntityCreateOrUpdateBulkBodyParam;

export interface EntityDeleteByGuidsQueryParamProperties {
  /** An array of GUIDs of entities to delete. */
  guid: string[];
}

export interface EntityDeleteByGuidsQueryParam {
  queryParameters: EntityDeleteByGuidsQueryParamProperties;
}

export type EntityDeleteByGuidsParameters = RequestParameters &
  EntityDeleteByGuidsQueryParam;

export interface EntityAddClassificationBodyParam {
  body: ClassificationAssociateRequest;
}

export type EntityAddClassificationParameters = RequestParameters &
  EntityAddClassificationBodyParam;

export interface EntityGetByIdQueryParamProperties {
  /** Whether to return minimal information for referred entities. */
  minExtInfo?: boolean;
  /** Whether to ignore relationship attributes. */
  ignoreRelationships?: boolean;
}

export interface EntityGetByIdQueryParam {
  queryParameters?: EntityGetByIdQueryParamProperties;
}

export type EntityGetByIdParameters = RequestParameters &
  EntityGetByIdQueryParam;

export interface EntityPartialUpdateEntityAttrByGuidQueryParamProperties {
  /** The name of the attribute. */
  name: string;
}

export interface EntityPartialUpdateEntityAttrByGuidQueryParam {
  queryParameters: EntityPartialUpdateEntityAttrByGuidQueryParamProperties;
}

export interface EntityPartialUpdateEntityAttrByGuidBodyParam {
  body: any;
}

export type EntityPartialUpdateEntityAttrByGuidParameters = RequestParameters &
  EntityPartialUpdateEntityAttrByGuidQueryParam &
  EntityPartialUpdateEntityAttrByGuidBodyParam;
export type EntityDeleteByGuidParameters = RequestParameters;
export type EntityGetClassificationParameters = RequestParameters;
export type EntityDeleteClassificationParameters = RequestParameters;
export type EntityGetClassificationsParameters = RequestParameters;

export interface EntityAddClassificationsBodyParam {
  body: AtlasClassification[];
}

export type EntityAddClassificationsParameters = RequestParameters &
  EntityAddClassificationsBodyParam;

export interface EntityUpdateClassificationsBodyParam {
  body: AtlasClassification[];
}

export type EntityUpdateClassificationsParameters = RequestParameters &
  EntityUpdateClassificationsBodyParam;

export interface EntityGetByUniqueAttributesQueryParamProperties {
  /** Whether to return minimal information for referred entities. */
  minExtInfo?: boolean;
  /** Whether to ignore relationship attributes. */
  ignoreRelationships?: boolean;
  /** The qualified name of the entity. */
  "attr:qualifiedName"?: string;
}

export interface EntityGetByUniqueAttributesQueryParam {
  queryParameters?: EntityGetByUniqueAttributesQueryParamProperties;
}

export type EntityGetByUniqueAttributesParameters = RequestParameters &
  EntityGetByUniqueAttributesQueryParam;

export interface EntityPartialUpdateEntityByUniqueAttrsQueryParamProperties {
  /** The qualified name of the entity. */
  "attr:qualifiedName"?: string;
}

export interface EntityPartialUpdateEntityByUniqueAttrsQueryParam {
  queryParameters?: EntityPartialUpdateEntityByUniqueAttrsQueryParamProperties;
}

export interface EntityPartialUpdateEntityByUniqueAttrsBodyParam {
  body: AtlasEntityWithExtInfo;
}

export type EntityPartialUpdateEntityByUniqueAttrsParameters = RequestParameters &
  EntityPartialUpdateEntityByUniqueAttrsQueryParam &
  EntityPartialUpdateEntityByUniqueAttrsBodyParam;

export interface EntityDeleteByUniqueAttributeQueryParamProperties {
  /** The qualified name of the entity. */
  "attr:qualifiedName"?: string;
}

export interface EntityDeleteByUniqueAttributeQueryParam {
  queryParameters?: EntityDeleteByUniqueAttributeQueryParamProperties;
}

export type EntityDeleteByUniqueAttributeParameters = RequestParameters &
  EntityDeleteByUniqueAttributeQueryParam;

export interface EntityDeleteClassificationByUniqueAttributeQueryParamProperties {
  /** The qualified name of the entity. */
  "attr:qualifiedName"?: string;
}

export interface EntityDeleteClassificationByUniqueAttributeQueryParam {
  queryParameters?: EntityDeleteClassificationByUniqueAttributeQueryParamProperties;
}

export type EntityDeleteClassificationByUniqueAttributeParameters = RequestParameters &
  EntityDeleteClassificationByUniqueAttributeQueryParam;

export interface EntityAddClassificationsByUniqueAttributeQueryParamProperties {
  /** The qualified name of the entity. */
  "attr:qualifiedName"?: string;
}

export interface EntityAddClassificationsByUniqueAttributeQueryParam {
  queryParameters?: EntityAddClassificationsByUniqueAttributeQueryParamProperties;
}

export interface EntityAddClassificationsByUniqueAttributeBodyParam {
  body: AtlasClassification[];
}

export type EntityAddClassificationsByUniqueAttributeParameters = RequestParameters &
  EntityAddClassificationsByUniqueAttributeQueryParam &
  EntityAddClassificationsByUniqueAttributeBodyParam;

export interface EntityUpdateClassificationsByUniqueAttributeQueryParamProperties {
  /** The qualified name of the entity. */
  "attr:qualifiedName"?: string;
}

export interface EntityUpdateClassificationsByUniqueAttributeQueryParam {
  queryParameters?: EntityUpdateClassificationsByUniqueAttributeQueryParamProperties;
}

export interface EntityUpdateClassificationsByUniqueAttributeBodyParam {
  body: AtlasClassification[];
}

export type EntityUpdateClassificationsByUniqueAttributeParameters = RequestParameters &
  EntityUpdateClassificationsByUniqueAttributeQueryParam &
  EntityUpdateClassificationsByUniqueAttributeBodyParam;

export interface EntitySetClassificationsBodyParam {
  body: AtlasEntityHeaders;
}

export type EntitySetClassificationsParameters = RequestParameters &
  EntitySetClassificationsBodyParam;

export interface EntityGetEntitiesByUniqueAttributesQueryParamProperties {
  /** Whether to return minimal information for referred entities. */
  minExtInfo?: boolean;
  /** Whether to ignore relationship attributes. */
  ignoreRelationships?: boolean;
  /** Qualified name of an entity. E.g. to find 2 entities you can set attrs_0:qualifiedName=db1\@cl1&attrs_2:qualifiedName=db2\@cl1 */
  "attr_N:qualifiedName"?: string;
}

export interface EntityGetEntitiesByUniqueAttributesQueryParam {
  queryParameters?: EntityGetEntitiesByUniqueAttributesQueryParamProperties;
}

export type EntityGetEntitiesByUniqueAttributesParameters = RequestParameters &
  EntityGetEntitiesByUniqueAttributesQueryParam;
export type EntityGetHeaderByIdParameters = RequestParameters;

export interface GlossaryGetGlossariesQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryGetGlossariesQueryParam {
  queryParameters?: GlossaryGetGlossariesQueryParamProperties;
}

export type GlossaryGetGlossariesParameters = RequestParameters &
  GlossaryGetGlossariesQueryParam;

export interface GlossaryCreateGlossaryBodyParam {
  body: AtlasGlossary;
}

export type GlossaryCreateGlossaryParameters = RequestParameters &
  GlossaryCreateGlossaryBodyParam;

export interface GlossaryCreateGlossaryCategoriesBodyParam {
  body: AtlasGlossaryCategory[];
}

export type GlossaryCreateGlossaryCategoriesParameters = RequestParameters &
  GlossaryCreateGlossaryCategoriesBodyParam;

export interface GlossaryCreateGlossaryCategoryBodyParam {
  body: AtlasGlossaryCategory;
}

export type GlossaryCreateGlossaryCategoryParameters = RequestParameters &
  GlossaryCreateGlossaryCategoryBodyParam;
export type GlossaryGetGlossaryCategoryParameters = RequestParameters;

export interface GlossaryUpdateGlossaryCategoryBodyParam {
  body: AtlasGlossaryCategory;
}

export type GlossaryUpdateGlossaryCategoryParameters = RequestParameters &
  GlossaryUpdateGlossaryCategoryBodyParam;
export type GlossaryDeleteGlossaryCategoryParameters = RequestParameters;

export interface GlossaryPartialUpdateGlossaryCategoryBodyParam {
  body: DictionaryOfStringDictionary;
}

export type GlossaryPartialUpdateGlossaryCategoryParameters = RequestParameters &
  GlossaryPartialUpdateGlossaryCategoryBodyParam;

export interface GlossaryGetRelatedCategoriesQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryGetRelatedCategoriesQueryParam {
  queryParameters?: GlossaryGetRelatedCategoriesQueryParamProperties;
}

export type GlossaryGetRelatedCategoriesParameters = RequestParameters &
  GlossaryGetRelatedCategoriesQueryParam;

export interface GlossaryGetCategoryTermsQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryGetCategoryTermsQueryParam {
  queryParameters?: GlossaryGetCategoryTermsQueryParamProperties;
}

export type GlossaryGetCategoryTermsParameters = RequestParameters &
  GlossaryGetCategoryTermsQueryParam;

export interface GlossaryCreateGlossaryTermQueryParamProperties {
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
}

export interface GlossaryCreateGlossaryTermQueryParam {
  queryParameters?: GlossaryCreateGlossaryTermQueryParamProperties;
}

export interface GlossaryCreateGlossaryTermBodyParam {
  body: AtlasGlossaryTerm;
}

export type GlossaryCreateGlossaryTermParameters = RequestParameters &
  GlossaryCreateGlossaryTermQueryParam &
  GlossaryCreateGlossaryTermBodyParam;

export interface GlossaryGetGlossaryTermQueryParamProperties {
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
}

export interface GlossaryGetGlossaryTermQueryParam {
  queryParameters?: GlossaryGetGlossaryTermQueryParamProperties;
}

export type GlossaryGetGlossaryTermParameters = RequestParameters &
  GlossaryGetGlossaryTermQueryParam;

export interface GlossaryUpdateGlossaryTermBodyParam {
  body: AtlasGlossaryTerm;
}

export type GlossaryUpdateGlossaryTermParameters = RequestParameters &
  GlossaryUpdateGlossaryTermBodyParam;
export type GlossaryDeleteGlossaryTermParameters = RequestParameters;

export interface GlossaryPartialUpdateGlossaryTermQueryParamProperties {
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
}

export interface GlossaryPartialUpdateGlossaryTermQueryParam {
  queryParameters?: GlossaryPartialUpdateGlossaryTermQueryParamProperties;
}

export interface GlossaryPartialUpdateGlossaryTermBodyParam {
  body: DictionaryOfStringDictionary;
}

export type GlossaryPartialUpdateGlossaryTermParameters = RequestParameters &
  GlossaryPartialUpdateGlossaryTermQueryParam &
  GlossaryPartialUpdateGlossaryTermBodyParam;

export interface GlossaryCreateGlossaryTermsQueryParamProperties {
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
}

export interface GlossaryCreateGlossaryTermsQueryParam {
  queryParameters?: GlossaryCreateGlossaryTermsQueryParamProperties;
}

export interface GlossaryCreateGlossaryTermsBodyParam {
  body: AtlasGlossaryTerm[];
}

export type GlossaryCreateGlossaryTermsParameters = RequestParameters &
  GlossaryCreateGlossaryTermsQueryParam &
  GlossaryCreateGlossaryTermsBodyParam;

export interface GlossaryGetEntitiesAssignedWithTermQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryGetEntitiesAssignedWithTermQueryParam {
  queryParameters?: GlossaryGetEntitiesAssignedWithTermQueryParamProperties;
}

export type GlossaryGetEntitiesAssignedWithTermParameters = RequestParameters &
  GlossaryGetEntitiesAssignedWithTermQueryParam;

export interface GlossaryAssignTermToEntitiesBodyParam {
  body: AtlasRelatedObjectId[];
}

export type GlossaryAssignTermToEntitiesParameters = RequestParameters &
  GlossaryAssignTermToEntitiesBodyParam;

export interface GlossaryRemoveTermAssignmentFromEntitiesBodyParam {
  body: AtlasRelatedObjectId[];
}

export type GlossaryRemoveTermAssignmentFromEntitiesParameters = RequestParameters &
  GlossaryRemoveTermAssignmentFromEntitiesBodyParam;

export interface GlossaryDeleteTermAssignmentFromEntitiesBodyParam {
  body: AtlasRelatedObjectId[];
}

export type GlossaryDeleteTermAssignmentFromEntitiesParameters = RequestParameters &
  GlossaryDeleteTermAssignmentFromEntitiesBodyParam;

export interface GlossaryGetRelatedTermsQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryGetRelatedTermsQueryParam {
  queryParameters?: GlossaryGetRelatedTermsQueryParamProperties;
}

export type GlossaryGetRelatedTermsParameters = RequestParameters &
  GlossaryGetRelatedTermsQueryParam;
export type GlossaryGetGlossaryParameters = RequestParameters;

export interface GlossaryUpdateGlossaryBodyParam {
  body: AtlasGlossary;
}

export type GlossaryUpdateGlossaryParameters = RequestParameters &
  GlossaryUpdateGlossaryBodyParam;
export type GlossaryDeleteGlossaryParameters = RequestParameters;

export interface GlossaryGetGlossaryCategoriesQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryGetGlossaryCategoriesQueryParam {
  queryParameters?: GlossaryGetGlossaryCategoriesQueryParamProperties;
}

export type GlossaryGetGlossaryCategoriesParameters = RequestParameters &
  GlossaryGetGlossaryCategoriesQueryParam;

export interface GlossaryGetGlossaryCategoriesHeadersQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryGetGlossaryCategoriesHeadersQueryParam {
  queryParameters?: GlossaryGetGlossaryCategoriesHeadersQueryParamProperties;
}

export type GlossaryGetGlossaryCategoriesHeadersParameters = RequestParameters &
  GlossaryGetGlossaryCategoriesHeadersQueryParam;

export interface GlossaryGetDetailedGlossaryQueryParamProperties {
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
}

export interface GlossaryGetDetailedGlossaryQueryParam {
  queryParameters?: GlossaryGetDetailedGlossaryQueryParamProperties;
}

export type GlossaryGetDetailedGlossaryParameters = RequestParameters &
  GlossaryGetDetailedGlossaryQueryParam;

export interface GlossaryPartialUpdateGlossaryQueryParamProperties {
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
}

export interface GlossaryPartialUpdateGlossaryQueryParam {
  queryParameters?: GlossaryPartialUpdateGlossaryQueryParamProperties;
}

export interface GlossaryPartialUpdateGlossaryBodyParam {
  body: DictionaryOfStringDictionary;
}

export type GlossaryPartialUpdateGlossaryParameters = RequestParameters &
  GlossaryPartialUpdateGlossaryQueryParam &
  GlossaryPartialUpdateGlossaryBodyParam;

export interface GlossaryGetGlossaryTermsQueryParamProperties {
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryGetGlossaryTermsQueryParam {
  queryParameters?: GlossaryGetGlossaryTermsQueryParamProperties;
}

export type GlossaryGetGlossaryTermsParameters = RequestParameters &
  GlossaryGetGlossaryTermsQueryParam;

export interface GlossaryGetGlossaryTermHeadersQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryGetGlossaryTermHeadersQueryParam {
  queryParameters?: GlossaryGetGlossaryTermHeadersQueryParamProperties;
}

export type GlossaryGetGlossaryTermHeadersParameters = RequestParameters &
  GlossaryGetGlossaryTermHeadersQueryParam;

export interface GlossaryImportGlossaryTermsViaCSVQueryParamProperties {
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
}

export interface GlossaryImportGlossaryTermsViaCSVQueryParam {
  queryParameters?: GlossaryImportGlossaryTermsViaCSVQueryParamProperties;
}

export interface GlossaryImportGlossaryTermsViaCSVBodyParam {
  body: string;
}

export type GlossaryImportGlossaryTermsViaCSVParameters = RequestParameters &
  GlossaryImportGlossaryTermsViaCSVQueryParam &
  GlossaryImportGlossaryTermsViaCSVBodyParam;

export interface GlossaryImportGlossaryTermsViaCSVByGlossaryNameQueryParamProperties {
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
}

export interface GlossaryImportGlossaryTermsViaCSVByGlossaryNameQueryParam {
  queryParameters?: GlossaryImportGlossaryTermsViaCSVByGlossaryNameQueryParamProperties;
}

export interface GlossaryImportGlossaryTermsViaCSVByGlossaryNameBodyParam {
  body: string;
}

export type GlossaryImportGlossaryTermsViaCSVByGlossaryNameParameters = RequestParameters &
  GlossaryImportGlossaryTermsViaCSVByGlossaryNameQueryParam &
  GlossaryImportGlossaryTermsViaCSVByGlossaryNameBodyParam;
export type GlossaryGetImportCSVOperationStatusParameters = RequestParameters;

export interface GlossaryExportGlossaryTermsAsCSVQueryParamProperties {
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
}

export interface GlossaryExportGlossaryTermsAsCSVQueryParam {
  queryParameters?: GlossaryExportGlossaryTermsAsCSVQueryParamProperties;
}

export interface GlossaryExportGlossaryTermsAsCSVBodyParam {
  body: string[];
}

export type GlossaryExportGlossaryTermsAsCSVParameters = RequestParameters &
  GlossaryExportGlossaryTermsAsCSVQueryParam &
  GlossaryExportGlossaryTermsAsCSVBodyParam;

export interface GlossaryGetTermsByGlossaryNameQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
}

export interface GlossaryGetTermsByGlossaryNameQueryParam {
  queryParameters?: GlossaryGetTermsByGlossaryNameQueryParamProperties;
}

export type GlossaryGetTermsByGlossaryNameParameters = RequestParameters &
  GlossaryGetTermsByGlossaryNameQueryParam;

export interface DiscoveryQueryBodyParam {
  body: SearchRequest;
}

export type DiscoveryQueryParameters = RequestParameters &
  DiscoveryQueryBodyParam;

export interface DiscoverySuggestBodyParam {
  body: SuggestRequest;
}

export type DiscoverySuggestParameters = RequestParameters &
  DiscoverySuggestBodyParam;

export interface DiscoveryAutoCompleteBodyParam {
  body: AutoCompleteRequest;
}

export type DiscoveryAutoCompleteParameters = RequestParameters &
  DiscoveryAutoCompleteBodyParam;

export interface LineageGetLineageGraphQueryParamProperties {
  /** The number of hops for lineage. */
  depth?: number;
  /** The number of max expanding width in lineage. */
  width?: number;
  /** The direction of the lineage, which could be INPUT, OUTPUT or BOTH. */
  direction: Direction;
  /** True to include the parent chain in the response. */
  includeParent?: boolean;
  /** True to include derived lineage in the response */
  getDerivedLineage?: boolean;
}

export interface LineageGetLineageGraphQueryParam {
  queryParameters: LineageGetLineageGraphQueryParamProperties;
}

export type LineageGetLineageGraphParameters = RequestParameters &
  LineageGetLineageGraphQueryParam;

export interface LineageNextPageLineageQueryParamProperties {
  /** The direction of the lineage, which could be INPUT, OUTPUT or BOTH. */
  direction: Direction;
  /** True to include derived lineage in the response */
  getDerivedLineage?: boolean;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The page size - by default there is no paging. */
  limit?: number;
}

export interface LineageNextPageLineageQueryParam {
  queryParameters: LineageNextPageLineageQueryParamProperties;
}

export type LineageNextPageLineageParameters = RequestParameters &
  LineageNextPageLineageQueryParam;

export interface RelationshipCreateBodyParam {
  body: AtlasRelationship;
}

export type RelationshipCreateParameters = RequestParameters &
  RelationshipCreateBodyParam;

export interface RelationshipUpdateBodyParam {
  body: AtlasRelationship;
}

export type RelationshipUpdateParameters = RequestParameters &
  RelationshipUpdateBodyParam;

export interface RelationshipGetByIdQueryParamProperties {
  /** Limits whether includes extended information. */
  extendedInfo?: boolean;
}

export interface RelationshipGetByIdQueryParam {
  queryParameters?: RelationshipGetByIdQueryParamProperties;
}

export type RelationshipGetByIdParameters = RequestParameters &
  RelationshipGetByIdQueryParam;
export type RelationshipDeleteByIdParameters = RequestParameters;
export type TypesGetClassificationDefByGuidParameters = RequestParameters;
export type TypesGetClassificationDefByNameParameters = RequestParameters;
export type TypesGetEntityDefByGuidParameters = RequestParameters;
export type TypesGetEntityDefByNameParameters = RequestParameters;
export type TypesGetEnumDefByGuidParameters = RequestParameters;
export type TypesGetEnumDefByNameParameters = RequestParameters;
export type TypesGetRelationshipDefByGuidParameters = RequestParameters;
export type TypesGetRelationshipDefByNameParameters = RequestParameters;
export type TypesGetStructDefByGuidParameters = RequestParameters;
export type TypesGetStructDefByNameParameters = RequestParameters;
export type TypesGetTypeDefByGuidParameters = RequestParameters;
export type TypesGetTypeDefByNameParameters = RequestParameters;
export type TypesDeleteTypeByNameParameters = RequestParameters;

export interface TypesGetAllTypeDefsQueryParamProperties {
  /**
   * Whether include termtemplatedef when return all typedefs.
   * This is always true when search filter type=term_template
   */
  includeTermTemplate?: boolean;
  /** Typedef name as search filter when get typedefs. */
  type?: Type;
}

export interface TypesGetAllTypeDefsQueryParam {
  queryParameters?: TypesGetAllTypeDefsQueryParamProperties;
}

export type TypesGetAllTypeDefsParameters = RequestParameters &
  TypesGetAllTypeDefsQueryParam;

export interface TypesCreateTypeDefsBodyParam {
  body: AtlasTypesDef;
}

export type TypesCreateTypeDefsParameters = RequestParameters &
  TypesCreateTypeDefsBodyParam;

export interface TypesUpdateAtlasTypeDefsBodyParam {
  body: AtlasTypesDef;
}

export type TypesUpdateAtlasTypeDefsParameters = RequestParameters &
  TypesUpdateAtlasTypeDefsBodyParam;

export interface TypesDeleteTypeDefsBodyParam {
  body: AtlasTypesDef;
}

export type TypesDeleteTypeDefsParameters = RequestParameters &
  TypesDeleteTypeDefsBodyParam;

export interface TypesGetTypeDefHeadersQueryParamProperties {
  /**
   * Whether include termtemplatedef when return all typedefs.
   * This is always true when search filter type=term_template
   */
  includeTermTemplate?: boolean;
  /** Typedef name as search filter when get typedefs. */
  type?: Type;
}

export interface TypesGetTypeDefHeadersQueryParam {
  queryParameters?: TypesGetTypeDefHeadersQueryParamProperties;
}

export type TypesGetTypeDefHeadersParameters = RequestParameters &
  TypesGetTypeDefHeadersQueryParam;
export type TypesGetTermTemplateDefByGuidParameters = RequestParameters;
export type TypesGetTermTemplateDefByNameParameters = RequestParameters;
