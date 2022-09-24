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
  AtlasGlossaryTerm,
  AtlasRelatedObjectId,
  SearchRequest,
  SuggestRequest,
  BrowseRequest,
  AutoCompleteRequest,
  AtlasRelationship,
  AtlasTypesDef,
  MoveEntitiesRequest,
} from "./models";

export interface EntityCreateOrUpdateBodyParam {
  /** Atlas entity with extended information. */
  body: AtlasEntityWithExtInfo;
}

export interface EntityCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EntityCreateOrUpdateParameters = EntityCreateOrUpdateMediaTypesParam &
  EntityCreateOrUpdateBodyParam &
  RequestParameters;

export interface EntityListByGuidsQueryParamProperties {
  /** An array of GUIDs of entities to list. */
  guid: Array<string>;
  /** Whether to return minimal information for referred entities. */
  minExtInfo?: boolean;
  /** Whether to ignore relationship attributes. */
  ignoreRelationships?: boolean;
  /** An array of the relationship types need to be excluded from the response. */
  excludeRelationshipTypes?: Array<string>;
}

export interface EntityListByGuidsQueryParam {
  queryParameters: EntityListByGuidsQueryParamProperties;
}

export type EntityListByGuidsParameters = EntityListByGuidsQueryParam & RequestParameters;

export interface EntityCreateOrUpdateEntitiesBodyParam {
  /** An array of entities to create or update. */
  body: AtlasEntitiesWithExtInfo;
}

export interface EntityCreateOrUpdateEntitiesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EntityCreateOrUpdateEntitiesParameters = EntityCreateOrUpdateEntitiesMediaTypesParam &
  EntityCreateOrUpdateEntitiesBodyParam &
  RequestParameters;

export interface EntityDeleteByGuidsQueryParamProperties {
  /** An array of GUIDs of entities to delete. */
  guid: Array<string>;
}

export interface EntityDeleteByGuidsQueryParam {
  queryParameters: EntityDeleteByGuidsQueryParamProperties;
}

export type EntityDeleteByGuidsParameters = EntityDeleteByGuidsQueryParam & RequestParameters;

export interface EntityAddClassificationBodyParam {
  /** The request to associate a classification to multiple entities. */
  body: ClassificationAssociateRequest;
}

export interface EntityAddClassificationMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EntityAddClassificationParameters = EntityAddClassificationMediaTypesParam &
  EntityAddClassificationBodyParam &
  RequestParameters;

export interface EntityGetByGuidQueryParamProperties {
  /** Whether to return minimal information for referred entities. */
  minExtInfo?: boolean;
  /** Whether to ignore relationship attributes. */
  ignoreRelationships?: boolean;
}

export interface EntityGetByGuidQueryParam {
  queryParameters?: EntityGetByGuidQueryParamProperties;
}

export type EntityGetByGuidParameters = EntityGetByGuidQueryParam & RequestParameters;

export interface EntityPartialUpdateEntityAttributeByGuidBodyParam {
  /** The value of the attribute. */
  body: Record<string, unknown>;
}

export interface EntityPartialUpdateEntityAttributeByGuidQueryParamProperties {
  /** The name of the attribute. */
  name: string;
}

export interface EntityPartialUpdateEntityAttributeByGuidQueryParam {
  queryParameters: EntityPartialUpdateEntityAttributeByGuidQueryParamProperties;
}

export interface EntityPartialUpdateEntityAttributeByGuidMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EntityPartialUpdateEntityAttributeByGuidParameters =
  EntityPartialUpdateEntityAttributeByGuidQueryParam &
    EntityPartialUpdateEntityAttributeByGuidMediaTypesParam &
    EntityPartialUpdateEntityAttributeByGuidBodyParam &
    RequestParameters;
export type EntityDeleteByGuidParameters = RequestParameters;
export type EntityGetClassificationParameters = RequestParameters;
export type EntityDeleteClassificationParameters = RequestParameters;
export type EntityGetClassificationsParameters = RequestParameters;

export interface EntityAddClassificationsBodyParam {
  /** An array of classifications to be added. */
  body: Array<AtlasClassification>;
}

export interface EntityAddClassificationsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EntityAddClassificationsParameters = EntityAddClassificationsMediaTypesParam &
  EntityAddClassificationsBodyParam &
  RequestParameters;

export interface EntityUpdateClassificationsBodyParam {
  /** An array of classifications to be updated. */
  body: Array<AtlasClassification>;
}

export interface EntityUpdateClassificationsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EntityUpdateClassificationsParameters = EntityUpdateClassificationsMediaTypesParam &
  EntityUpdateClassificationsBodyParam &
  RequestParameters;

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

export type EntityGetByUniqueAttributesParameters = EntityGetByUniqueAttributesQueryParam &
  RequestParameters;

export interface EntityPartialUpdateEntityByUniqueAttributesBodyParam {
  /** Atlas entity with extended information. */
  body: AtlasEntityWithExtInfo;
}

export interface EntityPartialUpdateEntityByUniqueAttributesQueryParamProperties {
  /** The qualified name of the entity. */
  "attr:qualifiedName"?: string;
}

export interface EntityPartialUpdateEntityByUniqueAttributesQueryParam {
  queryParameters?: EntityPartialUpdateEntityByUniqueAttributesQueryParamProperties;
}

export interface EntityPartialUpdateEntityByUniqueAttributesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EntityPartialUpdateEntityByUniqueAttributesParameters =
  EntityPartialUpdateEntityByUniqueAttributesQueryParam &
    EntityPartialUpdateEntityByUniqueAttributesMediaTypesParam &
    EntityPartialUpdateEntityByUniqueAttributesBodyParam &
    RequestParameters;

export interface EntityDeleteByUniqueAttributeQueryParamProperties {
  /** The qualified name of the entity. */
  "attr:qualifiedName"?: string;
}

export interface EntityDeleteByUniqueAttributeQueryParam {
  queryParameters?: EntityDeleteByUniqueAttributeQueryParamProperties;
}

export type EntityDeleteByUniqueAttributeParameters = EntityDeleteByUniqueAttributeQueryParam &
  RequestParameters;

export interface EntityDeleteClassificationByUniqueAttributeQueryParamProperties {
  /** The qualified name of the entity. */
  "attr:qualifiedName"?: string;
}

export interface EntityDeleteClassificationByUniqueAttributeQueryParam {
  queryParameters?: EntityDeleteClassificationByUniqueAttributeQueryParamProperties;
}

export type EntityDeleteClassificationByUniqueAttributeParameters =
  EntityDeleteClassificationByUniqueAttributeQueryParam & RequestParameters;

export interface EntityAddClassificationsByUniqueAttributeBodyParam {
  /** An array of classification to be added. */
  body: Array<AtlasClassification>;
}

export interface EntityAddClassificationsByUniqueAttributeQueryParamProperties {
  /** The qualified name of the entity. */
  "attr:qualifiedName"?: string;
}

export interface EntityAddClassificationsByUniqueAttributeQueryParam {
  queryParameters?: EntityAddClassificationsByUniqueAttributeQueryParamProperties;
}

export interface EntityAddClassificationsByUniqueAttributeMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EntityAddClassificationsByUniqueAttributeParameters =
  EntityAddClassificationsByUniqueAttributeQueryParam &
    EntityAddClassificationsByUniqueAttributeMediaTypesParam &
    EntityAddClassificationsByUniqueAttributeBodyParam &
    RequestParameters;

export interface EntityUpdateClassificationsByUniqueAttributeBodyParam {
  /** An array of classification to be updated. */
  body: Array<AtlasClassification>;
}

export interface EntityUpdateClassificationsByUniqueAttributeQueryParamProperties {
  /** The qualified name of the entity. */
  "attr:qualifiedName"?: string;
}

export interface EntityUpdateClassificationsByUniqueAttributeQueryParam {
  queryParameters?: EntityUpdateClassificationsByUniqueAttributeQueryParamProperties;
}

export interface EntityUpdateClassificationsByUniqueAttributeMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EntityUpdateClassificationsByUniqueAttributeParameters =
  EntityUpdateClassificationsByUniqueAttributeQueryParam &
    EntityUpdateClassificationsByUniqueAttributeMediaTypesParam &
    EntityUpdateClassificationsByUniqueAttributeBodyParam &
    RequestParameters;

export interface EntitySetClassificationsBodyParam {
  /** Atlas entity headers. */
  body: AtlasEntityHeaders;
}

export interface EntitySetClassificationsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EntitySetClassificationsParameters = EntitySetClassificationsMediaTypesParam &
  EntitySetClassificationsBodyParam &
  RequestParameters;

export interface EntityGetEntitiesByUniqueAttributesQueryParamProperties {
  /** Whether to return minimal information for referred entities. */
  minExtInfo?: boolean;
  /** Whether to ignore relationship attributes. */
  ignoreRelationships?: boolean;
  /** Qualified name of an entity. E.g. to find 2 entities you can set attrs_0:qualifiedName=db1@cl1&attrs_2:qualifiedName=db2@cl1 */
  "attr_N:qualifiedName"?: string;
}

export interface EntityGetEntitiesByUniqueAttributesQueryParam {
  queryParameters?: EntityGetEntitiesByUniqueAttributesQueryParamProperties;
}

export type EntityGetEntitiesByUniqueAttributesParameters =
  EntityGetEntitiesByUniqueAttributesQueryParam & RequestParameters;
export type EntityGetHeaderParameters = RequestParameters;

export interface EntityDeleteBusinessMetadataBodyParam {
  /** BusinessMetadata */
  body?: Record<string, Record<string, unknown>>;
}

export interface EntityDeleteBusinessMetadataMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EntityDeleteBusinessMetadataParameters = EntityDeleteBusinessMetadataMediaTypesParam &
  EntityDeleteBusinessMetadataBodyParam &
  RequestParameters;

export interface EntityAddOrUpdateBusinessMetadataBodyParam {
  /** Business Metadata */
  body?: Record<string, Record<string, unknown>>;
}

export interface EntityAddOrUpdateBusinessMetadataQueryParamProperties {
  /** Whether to overwrite the existing business metadata on the entity or not, default is false. */
  isOverwrite?: boolean;
}

export interface EntityAddOrUpdateBusinessMetadataQueryParam {
  queryParameters?: EntityAddOrUpdateBusinessMetadataQueryParamProperties;
}

export interface EntityAddOrUpdateBusinessMetadataMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EntityAddOrUpdateBusinessMetadataParameters =
  EntityAddOrUpdateBusinessMetadataQueryParam &
    EntityAddOrUpdateBusinessMetadataMediaTypesParam &
    EntityAddOrUpdateBusinessMetadataBodyParam &
    RequestParameters;

export interface EntityDeleteBusinessMetadataAttributesBodyParam {
  /** BusinessMetadataAttributes */
  body?: Record<string, Record<string, unknown>>;
}

export interface EntityDeleteBusinessMetadataAttributesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EntityDeleteBusinessMetadataAttributesParameters =
  EntityDeleteBusinessMetadataAttributesMediaTypesParam &
    EntityDeleteBusinessMetadataAttributesBodyParam &
    RequestParameters;

export interface EntityAddOrUpdateBusinessMetadataAttributesBodyParam {
  /** BusinessMetadataAttributes */
  body?: Record<string, Record<string, unknown>>;
}

export interface EntityAddOrUpdateBusinessMetadataAttributesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EntityAddOrUpdateBusinessMetadataAttributesParameters =
  EntityAddOrUpdateBusinessMetadataAttributesMediaTypesParam &
    EntityAddOrUpdateBusinessMetadataAttributesBodyParam &
    RequestParameters;
export type EntityGetSampleBusinessMetadataTemplateParameters = RequestParameters;

export interface EntityImportBusinessMetadataBodyParam {
  body?: EntityImportBusinessMetadataFormBody;
}

export interface EntityImportBusinessMetadataFormBody {
  /**
   * InputStream of file
   *
   * Value may contain any sequence of octets
   */
  uploadedInputStream?: string | Uint8Array;
}

export interface EntityImportBusinessMetadataMediaTypesParam {
  /** Request content type */
  contentType?: "multipart/form-data";
}

export type EntityImportBusinessMetadataParameters = EntityImportBusinessMetadataMediaTypesParam &
  EntityImportBusinessMetadataBodyParam &
  RequestParameters;

export interface EntityDeleteLabelsBodyParam {
  /** set of labels to be deleted */
  body?: Array<string>;
}

export interface EntityDeleteLabelsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EntityDeleteLabelsParameters = EntityDeleteLabelsMediaTypesParam &
  EntityDeleteLabelsBodyParam &
  RequestParameters;

export interface EntitySetLabelsBodyParam {
  /** set of labels to be set to the entity */
  body?: Array<string>;
}

export interface EntitySetLabelsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EntitySetLabelsParameters = EntitySetLabelsMediaTypesParam &
  EntitySetLabelsBodyParam &
  RequestParameters;

export interface EntityAddLabelBodyParam {
  /** set of labels to be added */
  body?: Array<string>;
}

export interface EntityAddLabelMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EntityAddLabelParameters = EntityAddLabelMediaTypesParam &
  EntityAddLabelBodyParam &
  RequestParameters;

export interface EntityDeleteLabelsByUniqueAttributeBodyParam {
  /** set of labels to be deleted */
  body?: Array<string>;
}

export interface EntityDeleteLabelsByUniqueAttributeQueryParamProperties {
  /** The qualified name of the entity */
  "attr:qualifiedName"?: string;
}

export interface EntityDeleteLabelsByUniqueAttributeQueryParam {
  queryParameters?: EntityDeleteLabelsByUniqueAttributeQueryParamProperties;
}

export interface EntityDeleteLabelsByUniqueAttributeMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EntityDeleteLabelsByUniqueAttributeParameters =
  EntityDeleteLabelsByUniqueAttributeQueryParam &
    EntityDeleteLabelsByUniqueAttributeMediaTypesParam &
    EntityDeleteLabelsByUniqueAttributeBodyParam &
    RequestParameters;

export interface EntitySetLabelsByUniqueAttributeBodyParam {
  /** set of labels to be set */
  body?: Array<string>;
}

export interface EntitySetLabelsByUniqueAttributeQueryParamProperties {
  /** The qualified name of the entity */
  "attr:qualifiedName"?: string;
}

export interface EntitySetLabelsByUniqueAttributeQueryParam {
  queryParameters?: EntitySetLabelsByUniqueAttributeQueryParamProperties;
}

export interface EntitySetLabelsByUniqueAttributeMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EntitySetLabelsByUniqueAttributeParameters =
  EntitySetLabelsByUniqueAttributeQueryParam &
    EntitySetLabelsByUniqueAttributeMediaTypesParam &
    EntitySetLabelsByUniqueAttributeBodyParam &
    RequestParameters;

export interface EntityAddLabelsByUniqueAttributeBodyParam {
  /** set of labels to be added */
  body?: Array<string>;
}

export interface EntityAddLabelsByUniqueAttributeQueryParamProperties {
  /** The qualified name of the entity */
  "attr:qualifiedName"?: string;
}

export interface EntityAddLabelsByUniqueAttributeQueryParam {
  queryParameters?: EntityAddLabelsByUniqueAttributeQueryParamProperties;
}

export interface EntityAddLabelsByUniqueAttributeMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EntityAddLabelsByUniqueAttributeParameters =
  EntityAddLabelsByUniqueAttributeQueryParam &
    EntityAddLabelsByUniqueAttributeMediaTypesParam &
    EntityAddLabelsByUniqueAttributeBodyParam &
    RequestParameters;

export interface GlossaryListGlossariesQueryParamProperties {
  /** The page size - by default there is no paging. */
  limit?: number;
  /** The offset for pagination purpose. */
  offset?: number;
  /** The sort order, ASC (default) or DESC. */
  sort?: string;
  /** Whether ignore terms and categories */
  ignoreTermsAndCategories?: boolean;
}

export interface GlossaryListGlossariesQueryParam {
  queryParameters?: GlossaryListGlossariesQueryParamProperties;
}

export type GlossaryListGlossariesParameters = GlossaryListGlossariesQueryParam & RequestParameters;

export interface GlossaryCreateGlossaryBodyParam {
  /**
   * Glossary definition, terms & categories can be anchored to a glossary.
   * Using the anchor attribute when creating the Term/Category.
   */
  body: AtlasGlossary;
}

export interface GlossaryCreateGlossaryMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GlossaryCreateGlossaryParameters = GlossaryCreateGlossaryMediaTypesParam &
  GlossaryCreateGlossaryBodyParam &
  RequestParameters;

export interface GlossaryCreateGlossaryCategoriesBodyParam {
  /** An array of glossary category definitions to be created. */
  body: Array<AtlasGlossaryCategory>;
}

export interface GlossaryCreateGlossaryCategoriesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GlossaryCreateGlossaryCategoriesParameters =
  GlossaryCreateGlossaryCategoriesMediaTypesParam &
    GlossaryCreateGlossaryCategoriesBodyParam &
    RequestParameters;

export interface GlossaryCreateGlossaryCategoryBodyParam {
  /**
   * The glossary category definition. A category must be anchored to a Glossary when creating.
   * Optionally, terms belonging to the category and the hierarchy can also be defined during creation.
   */
  body: AtlasGlossaryCategory;
}

export interface GlossaryCreateGlossaryCategoryMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GlossaryCreateGlossaryCategoryParameters =
  GlossaryCreateGlossaryCategoryMediaTypesParam &
    GlossaryCreateGlossaryCategoryBodyParam &
    RequestParameters;
export type GlossaryGetGlossaryCategoryParameters = RequestParameters;

export interface GlossaryUpdateGlossaryCategoryBodyParam {
  /** The glossary category to be updated. */
  body: AtlasGlossaryCategory;
}

export interface GlossaryUpdateGlossaryCategoryMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GlossaryUpdateGlossaryCategoryParameters =
  GlossaryUpdateGlossaryCategoryMediaTypesParam &
    GlossaryUpdateGlossaryCategoryBodyParam &
    RequestParameters;
export type GlossaryDeleteGlossaryCategoryParameters = RequestParameters;

export interface GlossaryPartialUpdateGlossaryCategoryBodyParam {
  /** A map containing keys as attribute names and values as corresponding attribute values for partial update. */
  body: Record<string, string>;
}

export interface GlossaryPartialUpdateGlossaryCategoryMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GlossaryPartialUpdateGlossaryCategoryParameters =
  GlossaryPartialUpdateGlossaryCategoryMediaTypesParam &
    GlossaryPartialUpdateGlossaryCategoryBodyParam &
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

export interface GlossaryCreateGlossaryTermBodyParam {
  /**
   * The glossary term definition. A term must be anchored to a Glossary at the time of creation.
   * Optionally it can be categorized as well.
   */
  body: AtlasGlossaryTerm;
}

export interface GlossaryCreateGlossaryTermQueryParamProperties {
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
}

export interface GlossaryCreateGlossaryTermQueryParam {
  queryParameters?: GlossaryCreateGlossaryTermQueryParamProperties;
}

export interface GlossaryCreateGlossaryTermMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GlossaryCreateGlossaryTermParameters = GlossaryCreateGlossaryTermQueryParam &
  GlossaryCreateGlossaryTermMediaTypesParam &
  GlossaryCreateGlossaryTermBodyParam &
  RequestParameters;

export interface GlossaryGetGlossaryTermQueryParamProperties {
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
  /** An array of relationship types which need to be excluded. */
  excludeRelationshipTypes?: Array<string>;
}

export interface GlossaryGetGlossaryTermQueryParam {
  queryParameters?: GlossaryGetGlossaryTermQueryParamProperties;
}

export type GlossaryGetGlossaryTermParameters = GlossaryGetGlossaryTermQueryParam &
  RequestParameters;

export interface GlossaryUpdateGlossaryTermBodyParam {
  /** The glossary term to be updated. */
  body: AtlasGlossaryTerm;
}

export interface GlossaryUpdateGlossaryTermQueryParamProperties {
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
}

export interface GlossaryUpdateGlossaryTermQueryParam {
  queryParameters?: GlossaryUpdateGlossaryTermQueryParamProperties;
}

export interface GlossaryUpdateGlossaryTermMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GlossaryUpdateGlossaryTermParameters = GlossaryUpdateGlossaryTermQueryParam &
  GlossaryUpdateGlossaryTermMediaTypesParam &
  GlossaryUpdateGlossaryTermBodyParam &
  RequestParameters;
export type GlossaryDeleteGlossaryTermParameters = RequestParameters;

export interface GlossaryPartialUpdateGlossaryTermBodyParam {
  /** A map containing keys as attribute names and values as corresponding attribute values to be updated. */
  body: Record<string, string>;
}

export interface GlossaryPartialUpdateGlossaryTermQueryParamProperties {
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
}

export interface GlossaryPartialUpdateGlossaryTermQueryParam {
  queryParameters?: GlossaryPartialUpdateGlossaryTermQueryParamProperties;
}

export interface GlossaryPartialUpdateGlossaryTermMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GlossaryPartialUpdateGlossaryTermParameters =
  GlossaryPartialUpdateGlossaryTermQueryParam &
    GlossaryPartialUpdateGlossaryTermMediaTypesParam &
    GlossaryPartialUpdateGlossaryTermBodyParam &
    RequestParameters;

export interface GlossaryCreateGlossaryTermsBodyParam {
  /** An array of glossary term definitions to be created in bulk. */
  body: Array<AtlasGlossaryTerm>;
}

export interface GlossaryCreateGlossaryTermsQueryParamProperties {
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
}

export interface GlossaryCreateGlossaryTermsQueryParam {
  queryParameters?: GlossaryCreateGlossaryTermsQueryParamProperties;
}

export interface GlossaryCreateGlossaryTermsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GlossaryCreateGlossaryTermsParameters = GlossaryCreateGlossaryTermsQueryParam &
  GlossaryCreateGlossaryTermsMediaTypesParam &
  GlossaryCreateGlossaryTermsBodyParam &
  RequestParameters;

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

export type GlossaryGetEntitiesAssignedWithTermParameters =
  GlossaryGetEntitiesAssignedWithTermQueryParam & RequestParameters;

export interface GlossaryAssignTermToEntitiesBodyParam {
  /** An array of related object IDs to which the term has to be associated. */
  body: Array<AtlasRelatedObjectId>;
}

export interface GlossaryAssignTermToEntitiesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GlossaryAssignTermToEntitiesParameters = GlossaryAssignTermToEntitiesMediaTypesParam &
  GlossaryAssignTermToEntitiesBodyParam &
  RequestParameters;

export interface GlossaryRemoveTermAssignmentFromEntitiesBodyParam {
  /** An array of related object IDs from which the term has to be dissociated. */
  body: Array<AtlasRelatedObjectId>;
}

export interface GlossaryRemoveTermAssignmentFromEntitiesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GlossaryRemoveTermAssignmentFromEntitiesParameters =
  GlossaryRemoveTermAssignmentFromEntitiesMediaTypesParam &
    GlossaryRemoveTermAssignmentFromEntitiesBodyParam &
    RequestParameters;

export interface GlossaryDeleteTermAssignmentFromEntitiesBodyParam {
  /** An array of related object IDs from which the term has to be dissociated. */
  body: Array<AtlasRelatedObjectId>;
}

export interface GlossaryDeleteTermAssignmentFromEntitiesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GlossaryDeleteTermAssignmentFromEntitiesParameters =
  GlossaryDeleteTermAssignmentFromEntitiesMediaTypesParam &
    GlossaryDeleteTermAssignmentFromEntitiesBodyParam &
    RequestParameters;

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

export type GlossaryListRelatedTermsParameters = GlossaryListRelatedTermsQueryParam &
  RequestParameters;
export type GlossaryGetGlossaryParameters = RequestParameters;

export interface GlossaryUpdateGlossaryBodyParam {
  /** The glossary definition to be updated. */
  body: AtlasGlossary;
}

export interface GlossaryUpdateGlossaryMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GlossaryUpdateGlossaryParameters = GlossaryUpdateGlossaryMediaTypesParam &
  GlossaryUpdateGlossaryBodyParam &
  RequestParameters;
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

export type GlossaryListGlossaryCategoriesParameters = GlossaryListGlossaryCategoriesQueryParam &
  RequestParameters;

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

export type GlossaryListGlossaryCategoriesHeadersParameters =
  GlossaryListGlossaryCategoriesHeadersQueryParam & RequestParameters;

export interface GlossaryGetDetailedGlossaryQueryParamProperties {
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
}

export interface GlossaryGetDetailedGlossaryQueryParam {
  queryParameters?: GlossaryGetDetailedGlossaryQueryParamProperties;
}

export type GlossaryGetDetailedGlossaryParameters = GlossaryGetDetailedGlossaryQueryParam &
  RequestParameters;

export interface GlossaryPartialUpdateGlossaryBodyParam {
  /** A map containing keys as attribute names and values as corresponding attribute values. */
  body: Record<string, string>;
}

export interface GlossaryPartialUpdateGlossaryQueryParamProperties {
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
}

export interface GlossaryPartialUpdateGlossaryQueryParam {
  queryParameters?: GlossaryPartialUpdateGlossaryQueryParamProperties;
}

export interface GlossaryPartialUpdateGlossaryMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GlossaryPartialUpdateGlossaryParameters = GlossaryPartialUpdateGlossaryQueryParam &
  GlossaryPartialUpdateGlossaryMediaTypesParam &
  GlossaryPartialUpdateGlossaryBodyParam &
  RequestParameters;

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

export type GlossaryListGlossaryTermsParameters = GlossaryListGlossaryTermsQueryParam &
  RequestParameters;

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

export type GlossaryListGlossaryTermHeadersParameters = GlossaryListGlossaryTermHeadersQueryParam &
  RequestParameters;

export interface GlossaryImportGlossaryTermsViaCsvBodyParam {
  body: GlossaryImportGlossaryTermsViaCsvFormBody;
}

export interface GlossaryImportGlossaryTermsViaCsvFormBody {
  /**
   * The csv file to import glossary terms from.
   *
   * Value may contain any sequence of octets
   */
  file: string | Uint8Array;
}

export interface GlossaryImportGlossaryTermsViaCsvQueryParamProperties {
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
}

export interface GlossaryImportGlossaryTermsViaCsvQueryParam {
  queryParameters?: GlossaryImportGlossaryTermsViaCsvQueryParamProperties;
}

export interface GlossaryImportGlossaryTermsViaCsvMediaTypesParam {
  /** Request content type */
  contentType?: "multipart/form-data";
}

export type GlossaryImportGlossaryTermsViaCsvParameters =
  GlossaryImportGlossaryTermsViaCsvQueryParam &
    GlossaryImportGlossaryTermsViaCsvMediaTypesParam &
    GlossaryImportGlossaryTermsViaCsvBodyParam &
    RequestParameters;

export interface GlossaryImportGlossaryTermsViaCsvByGlossaryNameBodyParam {
  body: GlossaryImportGlossaryTermsViaCsvByGlossaryNameFormBody;
}

export interface GlossaryImportGlossaryTermsViaCsvByGlossaryNameFormBody {
  /**
   * The csv file to import glossary terms from.
   *
   * Value may contain any sequence of octets
   */
  file: string | Uint8Array;
}

export interface GlossaryImportGlossaryTermsViaCsvByGlossaryNameQueryParamProperties {
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
}

export interface GlossaryImportGlossaryTermsViaCsvByGlossaryNameQueryParam {
  queryParameters?: GlossaryImportGlossaryTermsViaCsvByGlossaryNameQueryParamProperties;
}

export interface GlossaryImportGlossaryTermsViaCsvByGlossaryNameMediaTypesParam {
  /** Request content type */
  contentType?: "multipart/form-data";
}

export type GlossaryImportGlossaryTermsViaCsvByGlossaryNameParameters =
  GlossaryImportGlossaryTermsViaCsvByGlossaryNameQueryParam &
    GlossaryImportGlossaryTermsViaCsvByGlossaryNameMediaTypesParam &
    GlossaryImportGlossaryTermsViaCsvByGlossaryNameBodyParam &
    RequestParameters;
export type GlossaryGetImportCsvOperationStatusParameters = RequestParameters;

export interface GlossaryExportGlossaryTermsAsCsvBodyParam {
  /** An array of term guids. */
  body: Array<string>;
}

export interface GlossaryExportGlossaryTermsAsCsvQueryParamProperties {
  /** Whether include term hierarchy */
  includeTermHierarchy?: boolean;
}

export interface GlossaryExportGlossaryTermsAsCsvQueryParam {
  queryParameters?: GlossaryExportGlossaryTermsAsCsvQueryParamProperties;
}

export interface GlossaryExportGlossaryTermsAsCsvMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GlossaryExportGlossaryTermsAsCsvParameters =
  GlossaryExportGlossaryTermsAsCsvQueryParam &
    GlossaryExportGlossaryTermsAsCsvMediaTypesParam &
    GlossaryExportGlossaryTermsAsCsvBodyParam &
    RequestParameters;

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

export type GlossaryListTermsByGlossaryNameParameters = GlossaryListTermsByGlossaryNameQueryParam &
  RequestParameters;

export interface DiscoveryQueryBodyParam {
  /** An object specifying the search criteria. */
  body: SearchRequest;
}

export interface DiscoveryQueryMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DiscoveryQueryParameters = DiscoveryQueryMediaTypesParam &
  DiscoveryQueryBodyParam &
  RequestParameters;

export interface DiscoverySuggestBodyParam {
  /** An object specifying the suggest criteria. */
  body: SuggestRequest;
}

export interface DiscoverySuggestMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DiscoverySuggestParameters = DiscoverySuggestMediaTypesParam &
  DiscoverySuggestBodyParam &
  RequestParameters;

export interface DiscoveryBrowseBodyParam {
  /** An object specifying the browse criteria. */
  body: BrowseRequest;
}

export interface DiscoveryBrowseMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DiscoveryBrowseParameters = DiscoveryBrowseMediaTypesParam &
  DiscoveryBrowseBodyParam &
  RequestParameters;

export interface DiscoveryAutoCompleteBodyParam {
  /** An object specifying the autocomplete criteria. */
  body: AutoCompleteRequest;
}

export interface DiscoveryAutoCompleteMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DiscoveryAutoCompleteParameters = DiscoveryAutoCompleteMediaTypesParam &
  DiscoveryAutoCompleteBodyParam &
  RequestParameters;

export interface LineageGetLineageGraphQueryParamProperties {
  /** The number of hops for lineage. */
  depth?: number;
  /** The number of max expanding width in lineage. */
  width?: number;
  /** The direction of the lineage, which could be INPUT, OUTPUT or BOTH. */
  direction: "BOTH" | "INPUT" | "OUTPUT";
  /** True to include the parent chain in the response. */
  includeParent?: boolean;
  /** True to include derived lineage in the response */
  getDerivedLineage?: boolean;
}

export interface LineageGetLineageGraphQueryParam {
  queryParameters: LineageGetLineageGraphQueryParamProperties;
}

export type LineageGetLineageGraphParameters = LineageGetLineageGraphQueryParam & RequestParameters;

export interface LineageNextPageLineageQueryParamProperties {
  /** The direction of the lineage, which could be INPUT, OUTPUT or BOTH. */
  direction: "BOTH" | "INPUT" | "OUTPUT";
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

export type LineageNextPageLineageParameters = LineageNextPageLineageQueryParam & RequestParameters;

export interface LineageGetLineageByUniqueAttributeQueryParamProperties {
  /** The number of hops for lineage. */
  depth?: number;
  /** The number of max expanding width in lineage. */
  width?: number;
  /** The direction of the lineage, which could be INPUT, OUTPUT or BOTH. */
  direction: "BOTH" | "INPUT" | "OUTPUT";
  /** True to include the parent chain in the response. */
  includeParent?: boolean;
  /** True to include derived lineage in the response */
  getDerivedLineage?: boolean;
}

export interface LineageGetLineageByUniqueAttributeQueryParam {
  queryParameters: LineageGetLineageByUniqueAttributeQueryParamProperties;
}

export type LineageGetLineageByUniqueAttributeParameters =
  LineageGetLineageByUniqueAttributeQueryParam & RequestParameters;

export interface RelationshipCreateBodyParam {
  /** The AtlasRelationship object containing the information for the relationship to be created. */
  body: AtlasRelationship;
}

export interface RelationshipCreateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type RelationshipCreateParameters = RelationshipCreateMediaTypesParam &
  RelationshipCreateBodyParam &
  RequestParameters;

export interface RelationshipUpdateBodyParam {
  /** The AtlasRelationship object containing the information for the relationship to be created. */
  body: AtlasRelationship;
}

export interface RelationshipUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type RelationshipUpdateParameters = RelationshipUpdateMediaTypesParam &
  RelationshipUpdateBodyParam &
  RequestParameters;

export interface RelationshipGetQueryParamProperties {
  /** Limits whether includes extended information. */
  extendedInfo?: boolean;
}

export interface RelationshipGetQueryParam {
  queryParameters?: RelationshipGetQueryParamProperties;
}

export type RelationshipGetParameters = RelationshipGetQueryParam & RequestParameters;
export type RelationshipDeleteParameters = RequestParameters;
export type TypesGetBusinessMetadataDefByGuidParameters = RequestParameters;
export type TypesGetBusinessMetadataDefByNameParameters = RequestParameters;
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
  type?: "enum" | "entity" | "classification" | "relationship" | "struct" | "term_template";
}

export interface TypesGetAllTypeDefinitionsQueryParam {
  queryParameters?: TypesGetAllTypeDefinitionsQueryParamProperties;
}

export type TypesGetAllTypeDefinitionsParameters = TypesGetAllTypeDefinitionsQueryParam &
  RequestParameters;

export interface TypesCreateTypeDefinitionsBodyParam {
  /** A composite wrapper object with corresponding lists of the type definition. */
  body: AtlasTypesDef;
}

export interface TypesCreateTypeDefinitionsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type TypesCreateTypeDefinitionsParameters = TypesCreateTypeDefinitionsMediaTypesParam &
  TypesCreateTypeDefinitionsBodyParam &
  RequestParameters;

export interface TypesUpdateAtlasTypeDefinitionsBodyParam {
  /** A composite object that captures all type definition changes. */
  body: AtlasTypesDef;
}

export interface TypesUpdateAtlasTypeDefinitionsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type TypesUpdateAtlasTypeDefinitionsParameters =
  TypesUpdateAtlasTypeDefinitionsMediaTypesParam &
    TypesUpdateAtlasTypeDefinitionsBodyParam &
    RequestParameters;

export interface TypesDeleteTypeDefinitionsBodyParam {
  /** A composite object that captures all types to be deleted */
  body: AtlasTypesDef;
}

export interface TypesDeleteTypeDefinitionsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type TypesDeleteTypeDefinitionsParameters = TypesDeleteTypeDefinitionsMediaTypesParam &
  TypesDeleteTypeDefinitionsBodyParam &
  RequestParameters;

export interface TypesListTypeDefinitionHeadersQueryParamProperties {
  /**
   * Whether include termtemplatedef when return all typedefs.
   * This is always true when search filter type=term_template
   */
  includeTermTemplate?: boolean;
  /** Typedef name as search filter when get typedefs. */
  type?: "enum" | "entity" | "classification" | "relationship" | "struct" | "term_template";
}

export interface TypesListTypeDefinitionHeadersQueryParam {
  queryParameters?: TypesListTypeDefinitionHeadersQueryParamProperties;
}

export type TypesListTypeDefinitionHeadersParameters = TypesListTypeDefinitionHeadersQueryParam &
  RequestParameters;
export type TypesGetTermTemplateDefByGuidParameters = RequestParameters;
export type TypesGetTermTemplateDefByNameParameters = RequestParameters;

export interface CollectionCreateOrUpdateBodyParam {
  /** Atlas entity with extended information. */
  body: AtlasEntityWithExtInfo;
}

export interface CollectionCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CollectionCreateOrUpdateParameters = CollectionCreateOrUpdateMediaTypesParam &
  CollectionCreateOrUpdateBodyParam &
  RequestParameters;

export interface CollectionCreateOrUpdateBulkBodyParam {
  /** Atlas entities with extended information. */
  body: AtlasEntitiesWithExtInfo;
}

export interface CollectionCreateOrUpdateBulkMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CollectionCreateOrUpdateBulkParameters = CollectionCreateOrUpdateBulkMediaTypesParam &
  CollectionCreateOrUpdateBulkBodyParam &
  RequestParameters;

export interface CollectionMoveEntitiesToCollectionBodyParam {
  /** Entity guids to be moved to target collection. */
  body: MoveEntitiesRequest;
}

export interface CollectionMoveEntitiesToCollectionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CollectionMoveEntitiesToCollectionParameters =
  CollectionMoveEntitiesToCollectionMediaTypesParam &
    CollectionMoveEntitiesToCollectionBodyParam &
    RequestParameters;
