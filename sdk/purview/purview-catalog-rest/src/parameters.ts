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
  AtlasTypesDef,
} from "./models";

export interface EntityCreateOrUpdateBodyParam {
  body: AtlasEntityWithExtInfo;
}

export type EntityCreateOrUpdateParameters = RequestParameters & EntityCreateOrUpdateBodyParam;

export interface EntityListByGuidsQueryParamProperties {
  /** An array of GUIDs of entities to create. */
  guids: string[];
  /** Whether to return minimal information for referred entities. */
  minExtInfo?: boolean;
  /** Whether to ignore relationship attributes. */
  ignoreRelationships?: boolean;
  /** An array of the relationship types need to be excluded from the response. */
  excludeRelationshipTypes?: string[];
}

export interface EntityListByGuidsQueryParam {
  queryParameters: EntityListByGuidsQueryParamProperties;
}

export type EntityListByGuidsParameters = RequestParameters & EntityListByGuidsQueryParam;

export interface EntityCreateOrUpdateEntitiesBodyParam {
  body: AtlasEntitiesWithExtInfo;
}

export type EntityCreateOrUpdateEntitiesParameters = RequestParameters &
  EntityCreateOrUpdateEntitiesBodyParam;

export interface EntityDeleteByGuidsQueryParamProperties {
  /** An array of GUIDs of entities to delete. */
  guids: string[];
}

export interface EntityDeleteByGuidsQueryParam {
  queryParameters: EntityDeleteByGuidsQueryParamProperties;
}

export type EntityDeleteByGuidsParameters = RequestParameters & EntityDeleteByGuidsQueryParam;

export interface EntityAddClassificationBodyParam {
  body: ClassificationAssociateRequest;
}

export type EntityAddClassificationParameters = RequestParameters &
  EntityAddClassificationBodyParam;

export interface EntityGetByGuidQueryParamProperties {
  /** Whether to return minimal information for referred entities. */
  minExtInfo?: boolean;
  /** Whether to ignore relationship attributes. */
  ignoreRelationships?: boolean;
}

export interface EntityGetByGuidQueryParam {
  queryParameters?: EntityGetByGuidQueryParamProperties;
}

export type EntityGetByGuidParameters = RequestParameters & EntityGetByGuidQueryParam;

export interface EntityPartialUpdateEntityAttributeByGuidQueryParamProperties {
  /** The name of the attribute. */
  name: string;
}

export interface EntityPartialUpdateEntityAttributeByGuidQueryParam {
  queryParameters: EntityPartialUpdateEntityAttributeByGuidQueryParamProperties;
}

export interface EntityPartialUpdateEntityAttributeByGuidBodyParam {
  body: any;
}

export type EntityPartialUpdateEntityAttributeByGuidParameters = RequestParameters &
  EntityPartialUpdateEntityAttributeByGuidQueryParam &
  EntityPartialUpdateEntityAttributeByGuidBodyParam;
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

export interface EntityPartialUpdateEntityByUniqueAttributesQueryParamProperties {
  /** The qualified name of the entity. */
  "attr:qualifiedName"?: string;
}

export interface EntityPartialUpdateEntityByUniqueAttributesQueryParam {
  queryParameters?: EntityPartialUpdateEntityByUniqueAttributesQueryParamProperties;
}

export interface EntityPartialUpdateEntityByUniqueAttributesBodyParam {
  body: AtlasEntityWithExtInfo;
}

export type EntityPartialUpdateEntityByUniqueAttributesParameters = RequestParameters &
  EntityPartialUpdateEntityByUniqueAttributesQueryParam &
  EntityPartialUpdateEntityByUniqueAttributesBodyParam;

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
export type EntityGetHeaderParameters = RequestParameters;

export interface GlossaryListGlossariesQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryListGlossariesQueryParam {
  queryParameters?: GlossaryListGlossariesQueryParamProperties;
}

export type GlossaryListGlossariesParameters = RequestParameters & GlossaryListGlossariesQueryParam;

export interface GlossaryCreateGlossaryBodyParam {
  body: AtlasGlossary;
}

export type GlossaryCreateGlossaryParameters = RequestParameters & GlossaryCreateGlossaryBodyParam;

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

export type GlossaryListRelatedCategoriesParameters = RequestParameters &
  GlossaryListRelatedCategoriesQueryParam;

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

export type GlossaryListCategoryTermsParameters = RequestParameters &
  GlossaryListCategoryTermsQueryParam;

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

export interface GlossaryListRelatedTermsQueryParamProperties {
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

export type GlossaryListRelatedTermsParameters = RequestParameters &
  GlossaryListRelatedTermsQueryParam;
export type GlossaryGetGlossaryParameters = RequestParameters;

export interface GlossaryUpdateGlossaryBodyParam {
  body: AtlasGlossary;
}

export type GlossaryUpdateGlossaryParameters = RequestParameters & GlossaryUpdateGlossaryBodyParam;
export type GlossaryDeleteGlossaryParameters = RequestParameters;

export interface GlossaryListGlossaryCategoriesQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryListGlossaryCategoriesQueryParam {
  queryParameters?: GlossaryListGlossaryCategoriesQueryParamProperties;
}

export type GlossaryListGlossaryCategoriesParameters = RequestParameters &
  GlossaryListGlossaryCategoriesQueryParam;

export interface GlossaryListGlossaryCategoriesHeadersQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryListGlossaryCategoriesHeadersQueryParam {
  queryParameters?: GlossaryListGlossaryCategoriesHeadersQueryParamProperties;
}

export type GlossaryListGlossaryCategoriesHeadersParameters = RequestParameters &
  GlossaryListGlossaryCategoriesHeadersQueryParam;

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

export interface GlossaryListGlossaryTermsQueryParamProperties {
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryListGlossaryTermsQueryParam {
  queryParameters?: GlossaryListGlossaryTermsQueryParamProperties;
}

export type GlossaryListGlossaryTermsParameters = RequestParameters &
  GlossaryListGlossaryTermsQueryParam;

export interface GlossaryListGlossaryTermHeadersQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
}

export interface GlossaryListGlossaryTermHeadersQueryParam {
  queryParameters?: GlossaryListGlossaryTermHeadersQueryParamProperties;
}

export type GlossaryListGlossaryTermHeadersParameters = RequestParameters &
  GlossaryListGlossaryTermHeadersQueryParam;

export interface GlossaryImportGlossaryTermsViaCsvQueryParamProperties {
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
}

export interface GlossaryImportGlossaryTermsViaCsvQueryParam {
  queryParameters?: GlossaryImportGlossaryTermsViaCsvQueryParamProperties;
}

export interface GlossaryImportGlossaryTermsViaCsvBodyParam {
  body: string;
}

export type GlossaryImportGlossaryTermsViaCsvParameters = RequestParameters &
  GlossaryImportGlossaryTermsViaCsvQueryParam &
  GlossaryImportGlossaryTermsViaCsvBodyParam;

export interface GlossaryImportGlossaryTermsViaCsvByGlossaryNameQueryParamProperties {
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
}

export interface GlossaryImportGlossaryTermsViaCsvByGlossaryNameQueryParam {
  queryParameters?: GlossaryImportGlossaryTermsViaCsvByGlossaryNameQueryParamProperties;
}

export interface GlossaryImportGlossaryTermsViaCsvByGlossaryNameBodyParam {
  body: string;
}

export type GlossaryImportGlossaryTermsViaCsvByGlossaryNameParameters = RequestParameters &
  GlossaryImportGlossaryTermsViaCsvByGlossaryNameQueryParam &
  GlossaryImportGlossaryTermsViaCsvByGlossaryNameBodyParam;
export type GlossaryGetImportCsvOperationStatusParameters = RequestParameters;

export interface GlossaryExportGlossaryTermsAsCsvQueryParamProperties {
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
}

export interface GlossaryExportGlossaryTermsAsCsvQueryParam {
  queryParameters?: GlossaryExportGlossaryTermsAsCsvQueryParamProperties;
}

export interface GlossaryExportGlossaryTermsAsCsvBodyParam {
  body: string[];
}

export type GlossaryExportGlossaryTermsAsCsvParameters = RequestParameters &
  GlossaryExportGlossaryTermsAsCsvQueryParam &
  GlossaryExportGlossaryTermsAsCsvBodyParam;

export interface GlossaryListTermsByGlossaryNameQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
}

export interface GlossaryListTermsByGlossaryNameQueryParam {
  queryParameters?: GlossaryListTermsByGlossaryNameQueryParamProperties;
}

export type GlossaryListTermsByGlossaryNameParameters = RequestParameters &
  GlossaryListTermsByGlossaryNameQueryParam;

export interface DiscoveryQueryBodyParam {
  body: SearchRequest;
}

export type DiscoveryQueryParameters = RequestParameters & DiscoveryQueryBodyParam;

export interface DiscoverySuggestBodyParam {
  body: SuggestRequest;
}

export type DiscoverySuggestParameters = RequestParameters & DiscoverySuggestBodyParam;

export interface DiscoveryAutoCompleteBodyParam {
  body: AutoCompleteRequest;
}

export type DiscoveryAutoCompleteParameters = RequestParameters & DiscoveryAutoCompleteBodyParam;

export interface GetLineageGraphQueryParamProperties {
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

export interface GetLineageGraphQueryParam {
  queryParameters: GetLineageGraphQueryParamProperties;
}

export type GetLineageGraphParameters = RequestParameters & GetLineageGraphQueryParam;

export interface NextPageLineageQueryParamProperties {
  /** The direction of the lineage, which could be INPUT, OUTPUT or BOTH. */
  direction: Direction;
  /** True to include derived lineage in the response */
  getDerivedLineage?: boolean;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The page size - by default there is no paging. */
  limit?: number;
}

export interface NextPageLineageQueryParam {
  queryParameters: NextPageLineageQueryParamProperties;
}

export type NextPageLineageParameters = RequestParameters & NextPageLineageQueryParam;

export interface RelationshipCreateBodyParam {
  body: AtlasRelationship;
}

export type RelationshipCreateParameters = RequestParameters & RelationshipCreateBodyParam;

export interface RelationshipUpdateBodyParam {
  body: AtlasRelationship;
}

export type RelationshipUpdateParameters = RequestParameters & RelationshipUpdateBodyParam;

export interface RelationshipGetQueryParamProperties {
  /** Limits whether includes extended information. */
  extendedInfo?: boolean;
}

export interface RelationshipGetQueryParam {
  queryParameters?: RelationshipGetQueryParamProperties;
}

export type RelationshipGetParameters = RequestParameters & RelationshipGetQueryParam;
export type RelationshipDeleteParameters = RequestParameters;
export type TypesGetClassificationDefByGuidParameters = RequestParameters;
export type TypesGetClassificationDefByNameParameters = RequestParameters;
export type TypesGetEntityDefinitionByGuidParameters = RequestParameters;
export type TypesGetEntityDefinitionByNameParameters = RequestParameters;
export type TypesGetEnumDefByGuidParameters = RequestParameters;
export type TypesGetEnumDefByNameParameters = RequestParameters;
export type TypesGetRelationshipDefByGuidParameters = RequestParameters;
export type TypesGetRelationshipDefByNameParameters = RequestParameters;
export type TypesGetStructDefByGuidParameters = RequestParameters;
export type TypesGetStructDefByNameParameters = RequestParameters;
export type TypesGetTypeDefinitionByGuidParameters = RequestParameters;
export type TypesGetTypeDefinitionByNameParameters = RequestParameters;
export type TypesDeleteTypeByNameParameters = RequestParameters;

export interface TypesGetAllTypeDefinitionsQueryParamProperties {
  /**
   * Whether include termtemplatedef when return all typedefs.
   * This is always true when search filter type=term_template
   */
  includeTermTemplate?: boolean;
  /** Typedef name as search filter when get typedefs. */
  type?: Type;
}

export interface TypesGetAllTypeDefinitionsQueryParam {
  queryParameters?: TypesGetAllTypeDefinitionsQueryParamProperties;
}

export type TypesGetAllTypeDefinitionsParameters = RequestParameters &
  TypesGetAllTypeDefinitionsQueryParam;

export interface TypesCreateTypeDefinitionsBodyParam {
  body: AtlasTypesDef;
}

export type TypesCreateTypeDefinitionsParameters = RequestParameters &
  TypesCreateTypeDefinitionsBodyParam;

export interface TypesUpdateAtlasTypeDefinitionsBodyParam {
  body: AtlasTypesDef;
}

export type TypesUpdateAtlasTypeDefinitionsParameters = RequestParameters &
  TypesUpdateAtlasTypeDefinitionsBodyParam;

export interface TypesDeleteTypeDefinitionsBodyParam {
  body: AtlasTypesDef;
}

export type TypesDeleteTypeDefinitionsParameters = RequestParameters &
  TypesDeleteTypeDefinitionsBodyParam;

export interface TypesListTypeDefinitionHeadersQueryParamProperties {
  /**
   * Whether include termtemplatedef when return all typedefs.
   * This is always true when search filter type=term_template
   */
  includeTermTemplate?: boolean;
  /** Typedef name as search filter when get typedefs. */
  type?: Type;
}

export interface TypesListTypeDefinitionHeadersQueryParam {
  queryParameters?: TypesListTypeDefinitionHeadersQueryParamProperties;
}

export type TypesListTypeDefinitionHeadersParameters = RequestParameters &
  TypesListTypeDefinitionHeadersQueryParam;
export type TypesGetTermTemplateDefByGuidParameters = RequestParameters;
export type TypesGetTermTemplateDefByNameParameters = RequestParameters;
