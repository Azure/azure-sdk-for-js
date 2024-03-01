// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  EntityCreateOrUpdateParameters,
  EntityListByGuidsParameters,
  EntityBulkCreateOrUpdateParameters,
  EntityBulkDeleteParameters,
  EntityAddClassificationParameters,
  EntityGetParameters,
  EntityPartialUpdateAttributeByGuidParameters,
  EntityDeleteParameters,
  EntityGetClassificationParameters,
  EntityRemoveClassificationParameters,
  EntityGetClassificationsParameters,
  EntityAddClassificationsParameters,
  EntityUpdateClassificationsParameters,
  EntityGetByUniqueAttributesParameters,
  EntityPartialUpdateByUniqueAttributesParameters,
  EntityDeleteByUniqueAttributeParameters,
  EntityRemoveClassificationByUniqueAttributeParameters,
  EntityAddClassificationsByUniqueAttributeParameters,
  EntityUpdateClassificationsByUniqueAttributeParameters,
  EntityBulkSetClassificationsParameters,
  EntityListByUniqueAttributesParameters,
  EntityGetHeaderParameters,
  EntityRemoveBusinessMetadataParameters,
  EntityAddOrUpdateBusinessMetadataParameters,
  EntityRemoveBusinessMetadataAttributesParameters,
  EntityAddOrUpdateBusinessMetadataAttributesParameters,
  EntityGetSampleBusinessMetadataTemplateParameters,
  EntityImportBusinessMetadataParameters,
  EntityRemoveLabelsParameters,
  EntitySetLabelsParameters,
  EntityAddLabelParameters,
  EntityRemoveLabelsByUniqueAttributeParameters,
  EntitySetLabelsByUniqueAttributeParameters,
  EntityAddLabelsByUniqueAttributeParameters,
  EntityMoveEntitiesToCollectionParameters,
  GlossaryListParameters,
  GlossaryCreateParameters,
  GlossaryCreateCategoriesParameters,
  GlossaryCreateCategoryParameters,
  GlossaryGetCategoryParameters,
  GlossaryUpdateCategoryParameters,
  GlossaryDeleteCategoryParameters,
  GlossaryPartialUpdateCategoryParameters,
  GlossaryListRelatedCategoriesParameters,
  GlossaryListCategoryTermsParameters,
  GlossaryCreateTermParameters,
  GlossaryGetTermParameters,
  GlossaryUpdateTermParameters,
  GlossaryDeleteTermParameters,
  GlossaryPartialUpdateTermParameters,
  GlossaryCreateTermsParameters,
  GlossaryListEntitiesAssignedWithTermParameters,
  GlossaryAssignTermToEntitiesParameters,
  GlossaryDeleteTermAssignmentFromEntitiesParameters,
  GlossaryListRelatedTermsParameters,
  GlossaryGetParameters,
  GlossaryUpdateParameters,
  GlossaryDeleteParameters,
  GlossaryListCategoriesParameters,
  GlossaryListCategoriesHeadersParameters,
  GlossaryGetDetailedParameters,
  GlossaryPartialUpdateParameters,
  GlossaryListTermsParameters,
  GlossaryListTermHeadersParameters,
  DiscoveryQueryParameters,
  DiscoverySuggestParameters,
  DiscoveryAutoCompleteParameters,
  LineageGetParameters,
  LineageGetNextPageParameters,
  LineageGetByUniqueAttributeParameters,
  RelationshipCreateParameters,
  RelationshipUpdateParameters,
  RelationshipGetParameters,
  RelationshipDeleteParameters,
  TypeGetBusinessMetadataDefByGuidParameters,
  TypeGetBusinessMetadataDefByNameParameters,
  TypeGetClassificationDefByGuidParameters,
  TypeGetClassificationDefByNameParameters,
  TypeGetEntityDefByGuidParameters,
  TypeGetEntityDefByNameParameters,
  TypeGetEnumDefByGuidParameters,
  TypeGetEnumDefByNameParameters,
  TypeGetRelationshipDefByGuidParameters,
  TypeGetRelationshipDefByNameParameters,
  TypeGetStructDefByGuidParameters,
  TypeGetStructDefByNameParameters,
  TypeGetByGuidParameters,
  TypeGetByNameParameters,
  TypeDeleteParameters,
  TypeListParameters,
  TypeBulkCreateParameters,
  TypeBulkUpdateParameters,
  TypeBulkDeleteParameters,
  TypeListHeadersParameters,
  TypeGetTermTemplateDefByGuidParameters,
  TypeGetTermTemplateDefByNameParameters,
} from "./parameters";
import {
  EntityCreateOrUpdate200Response,
  EntityCreateOrUpdateDefaultResponse,
  EntityListByGuids200Response,
  EntityListByGuidsDefaultResponse,
  EntityBulkCreateOrUpdate200Response,
  EntityBulkCreateOrUpdateDefaultResponse,
  EntityBulkDelete200Response,
  EntityBulkDeleteDefaultResponse,
  EntityAddClassification204Response,
  EntityAddClassificationDefaultResponse,
  EntityGet200Response,
  EntityGetDefaultResponse,
  EntityPartialUpdateAttributeByGuid200Response,
  EntityPartialUpdateAttributeByGuidDefaultResponse,
  EntityDeleteOperation200Response,
  EntityDeleteOperationDefaultResponse,
  EntityGetClassification200Response,
  EntityGetClassificationDefaultResponse,
  EntityRemoveClassification204Response,
  EntityRemoveClassificationDefaultResponse,
  EntityGetClassifications200Response,
  EntityGetClassificationsDefaultResponse,
  EntityAddClassifications204Response,
  EntityAddClassificationsDefaultResponse,
  EntityUpdateClassifications204Response,
  EntityUpdateClassificationsDefaultResponse,
  EntityGetByUniqueAttributes200Response,
  EntityGetByUniqueAttributesDefaultResponse,
  EntityPartialUpdateByUniqueAttributes200Response,
  EntityPartialUpdateByUniqueAttributesDefaultResponse,
  EntityDeleteByUniqueAttribute200Response,
  EntityDeleteByUniqueAttributeDefaultResponse,
  EntityRemoveClassificationByUniqueAttribute204Response,
  EntityRemoveClassificationByUniqueAttributeDefaultResponse,
  EntityAddClassificationsByUniqueAttribute204Response,
  EntityAddClassificationsByUniqueAttributeDefaultResponse,
  EntityUpdateClassificationsByUniqueAttribute204Response,
  EntityUpdateClassificationsByUniqueAttributeDefaultResponse,
  EntityBulkSetClassifications200Response,
  EntityBulkSetClassificationsDefaultResponse,
  EntityListByUniqueAttributes200Response,
  EntityListByUniqueAttributesDefaultResponse,
  EntityGetHeader200Response,
  EntityGetHeaderDefaultResponse,
  EntityRemoveBusinessMetadata204Response,
  EntityRemoveBusinessMetadataDefaultResponse,
  EntityAddOrUpdateBusinessMetadata204Response,
  EntityAddOrUpdateBusinessMetadataDefaultResponse,
  EntityRemoveBusinessMetadataAttributes204Response,
  EntityRemoveBusinessMetadataAttributesDefaultResponse,
  EntityAddOrUpdateBusinessMetadataAttributes204Response,
  EntityAddOrUpdateBusinessMetadataAttributesDefaultResponse,
  EntityGetSampleBusinessMetadataTemplate200Response,
  EntityGetSampleBusinessMetadataTemplateDefaultResponse,
  EntityImportBusinessMetadata200Response,
  EntityImportBusinessMetadataDefaultResponse,
  EntityRemoveLabels204Response,
  EntityRemoveLabelsDefaultResponse,
  EntitySetLabels204Response,
  EntitySetLabelsDefaultResponse,
  EntityAddLabel204Response,
  EntityAddLabelDefaultResponse,
  EntityRemoveLabelsByUniqueAttribute204Response,
  EntityRemoveLabelsByUniqueAttributeDefaultResponse,
  EntitySetLabelsByUniqueAttribute204Response,
  EntitySetLabelsByUniqueAttributeDefaultResponse,
  EntityAddLabelsByUniqueAttribute204Response,
  EntityAddLabelsByUniqueAttributeDefaultResponse,
  EntityMoveEntitiesToCollection200Response,
  EntityMoveEntitiesToCollectionDefaultResponse,
  GlossaryList200Response,
  GlossaryListDefaultResponse,
  GlossaryCreate200Response,
  GlossaryCreateDefaultResponse,
  GlossaryCreateCategories200Response,
  GlossaryCreateCategoriesDefaultResponse,
  GlossaryCreateCategory200Response,
  GlossaryCreateCategoryDefaultResponse,
  GlossaryGetCategory200Response,
  GlossaryGetCategoryDefaultResponse,
  GlossaryUpdateCategory200Response,
  GlossaryUpdateCategoryDefaultResponse,
  GlossaryDeleteCategory204Response,
  GlossaryDeleteCategoryDefaultResponse,
  GlossaryPartialUpdateCategory200Response,
  GlossaryPartialUpdateCategoryDefaultResponse,
  GlossaryListRelatedCategories200Response,
  GlossaryListRelatedCategoriesDefaultResponse,
  GlossaryListCategoryTerms200Response,
  GlossaryListCategoryTermsDefaultResponse,
  GlossaryCreateTerm200Response,
  GlossaryCreateTermDefaultResponse,
  GlossaryGetTerm200Response,
  GlossaryGetTermDefaultResponse,
  GlossaryUpdateTerm200Response,
  GlossaryUpdateTermDefaultResponse,
  GlossaryDeleteTerm204Response,
  GlossaryDeleteTermDefaultResponse,
  GlossaryPartialUpdateTerm200Response,
  GlossaryPartialUpdateTermDefaultResponse,
  GlossaryCreateTerms200Response,
  GlossaryCreateTermsDefaultResponse,
  GlossaryListEntitiesAssignedWithTerm200Response,
  GlossaryListEntitiesAssignedWithTermDefaultResponse,
  GlossaryAssignTermToEntities204Response,
  GlossaryAssignTermToEntitiesDefaultResponse,
  GlossaryDeleteTermAssignmentFromEntities204Response,
  GlossaryDeleteTermAssignmentFromEntitiesDefaultResponse,
  GlossaryListRelatedTerms200Response,
  GlossaryListRelatedTermsDefaultResponse,
  GlossaryGet200Response,
  GlossaryGetDefaultResponse,
  GlossaryUpdate200Response,
  GlossaryUpdateDefaultResponse,
  GlossaryDeleteOperation204Response,
  GlossaryDeleteOperationDefaultResponse,
  GlossaryListCategories200Response,
  GlossaryListCategoriesDefaultResponse,
  GlossaryListCategoriesHeaders200Response,
  GlossaryListCategoriesHeadersDefaultResponse,
  GlossaryGetDetailed200Response,
  GlossaryGetDetailedDefaultResponse,
  GlossaryPartialUpdate200Response,
  GlossaryPartialUpdateDefaultResponse,
  GlossaryListTerms200Response,
  GlossaryListTermsDefaultResponse,
  GlossaryListTermHeaders200Response,
  GlossaryListTermHeadersDefaultResponse,
  DiscoveryQuery200Response,
  DiscoveryQueryDefaultResponse,
  DiscoverySuggest200Response,
  DiscoverySuggestDefaultResponse,
  DiscoveryAutoComplete200Response,
  DiscoveryAutoCompleteDefaultResponse,
  LineageGet200Response,
  LineageGetDefaultResponse,
  LineageGetNextPage200Response,
  LineageGetNextPageDefaultResponse,
  LineageGetByUniqueAttribute200Response,
  LineageGetByUniqueAttributeDefaultResponse,
  RelationshipCreate200Response,
  RelationshipCreateDefaultResponse,
  RelationshipUpdate200Response,
  RelationshipUpdateDefaultResponse,
  RelationshipGet200Response,
  RelationshipGetDefaultResponse,
  RelationshipDeleteOperation204Response,
  RelationshipDeleteOperationDefaultResponse,
  TypeGetBusinessMetadataDefByGuid200Response,
  TypeGetBusinessMetadataDefByGuidDefaultResponse,
  TypeGetBusinessMetadataDefByName200Response,
  TypeGetBusinessMetadataDefByNameDefaultResponse,
  TypeGetClassificationDefByGuid200Response,
  TypeGetClassificationDefByGuidDefaultResponse,
  TypeGetClassificationDefByName200Response,
  TypeGetClassificationDefByNameDefaultResponse,
  TypeGetEntityDefByGuid200Response,
  TypeGetEntityDefByGuidDefaultResponse,
  TypeGetEntityDefByName200Response,
  TypeGetEntityDefByNameDefaultResponse,
  TypeGetEnumDefByGuid200Response,
  TypeGetEnumDefByGuidDefaultResponse,
  TypeGetEnumDefByName200Response,
  TypeGetEnumDefByNameDefaultResponse,
  TypeGetRelationshipDefByGuid200Response,
  TypeGetRelationshipDefByGuidDefaultResponse,
  TypeGetRelationshipDefByName200Response,
  TypeGetRelationshipDefByNameDefaultResponse,
  TypeGetStructDefByGuid200Response,
  TypeGetStructDefByGuidDefaultResponse,
  TypeGetStructDefByName200Response,
  TypeGetStructDefByNameDefaultResponse,
  TypeGetByGuid200Response,
  TypeGetByGuidDefaultResponse,
  TypeGetByName200Response,
  TypeGetByNameDefaultResponse,
  TypeDeleteOperation204Response,
  TypeDeleteOperationDefaultResponse,
  TypeList200Response,
  TypeListDefaultResponse,
  TypeBulkCreate200Response,
  TypeBulkCreateDefaultResponse,
  TypeBulkUpdate200Response,
  TypeBulkUpdateDefaultResponse,
  TypeBulkDelete204Response,
  TypeBulkDeleteDefaultResponse,
  TypeListHeaders200Response,
  TypeListHeadersDefaultResponse,
  TypeGetTermTemplateDefByGuid200Response,
  TypeGetTermTemplateDefByGuidDefaultResponse,
  TypeGetTermTemplateDefByName200Response,
  TypeGetTermTemplateDefByNameDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface EntityCreateOrUpdate {
  /**
   * Create or update an entity.
   * Existing entity is matched using its unique guid if
   * supplied or by its unique attributes eg: qualifiedName.
   * Map and array of
   * collections are not well supported. E.g., array<array<int>>, array<map<string,
   * int>>.
   * For each contact type, the maximum number of contacts is 20.
   */
  post(
    options?: EntityCreateOrUpdateParameters,
  ): StreamableMethod<EntityCreateOrUpdate200Response | EntityCreateOrUpdateDefaultResponse>;
}

export interface EntityListByGuids {
  /** List entities in bulk identified by its GUIDs. */
  get(
    options: EntityListByGuidsParameters,
  ): StreamableMethod<EntityListByGuids200Response | EntityListByGuidsDefaultResponse>;
  /**
   * Create or update entities in bulk.
   * Existing entity is matched using its unique
   * guid if supplied or by its unique attributes eg: qualifiedName.
   * Map and array
   * of collections are not well supported. E.g., array<array<int>>,
   * array<map<string, int>>.
   * For each contact type, the maximum number of contacts
   * is 20.
   */
  post(
    options?: EntityBulkCreateOrUpdateParameters,
  ): StreamableMethod<
    EntityBulkCreateOrUpdate200Response | EntityBulkCreateOrUpdateDefaultResponse
  >;
  /**
   * Delete a list of entities in bulk identified by their GUIDs or unique
   * attributes.
   */
  delete(
    options: EntityBulkDeleteParameters,
  ): StreamableMethod<EntityBulkDelete200Response | EntityBulkDeleteDefaultResponse>;
}

export interface EntityAddClassification {
  /** Associate a classification to multiple entities in bulk. */
  post(
    options?: EntityAddClassificationParameters,
  ): StreamableMethod<EntityAddClassification204Response | EntityAddClassificationDefaultResponse>;
}

export interface EntityGet {
  /** Get complete definition of an entity given its GUID. */
  get(
    options?: EntityGetParameters,
  ): StreamableMethod<EntityGet200Response | EntityGetDefaultResponse>;
  /**
   * Update entity partially - create or update entity attribute identified by its
   * GUID.
   * Supports only primitive attribute type and entity references.
   * It does not support updating complex types like arrays, and maps.
   * Null updates are not possible.
   */
  put(
    options: EntityPartialUpdateAttributeByGuidParameters,
  ): StreamableMethod<
    | EntityPartialUpdateAttributeByGuid200Response
    | EntityPartialUpdateAttributeByGuidDefaultResponse
  >;
  /** Delete an entity identified by its GUID. */
  delete(
    options?: EntityDeleteParameters,
  ): StreamableMethod<EntityDeleteOperation200Response | EntityDeleteOperationDefaultResponse>;
}

export interface EntityGetClassification {
  /** Get classification for a given entity represented by a GUID. */
  get(
    options?: EntityGetClassificationParameters,
  ): StreamableMethod<EntityGetClassification200Response | EntityGetClassificationDefaultResponse>;
  /** Delete a given classification from an existing entity represented by a GUID. */
  delete(
    options?: EntityRemoveClassificationParameters,
  ): StreamableMethod<
    EntityRemoveClassification204Response | EntityRemoveClassificationDefaultResponse
  >;
}

export interface EntityGetClassifications {
  /** List classifications for a given entity represented by a GUID. */
  get(
    options?: EntityGetClassificationsParameters,
  ): StreamableMethod<
    EntityGetClassifications200Response | EntityGetClassificationsDefaultResponse
  >;
  /** Add classifications to an existing entity represented by a GUID. */
  post(
    options: EntityAddClassificationsParameters,
  ): StreamableMethod<
    EntityAddClassifications204Response | EntityAddClassificationsDefaultResponse
  >;
  /** Update classifications to an existing entity represented by a guid. */
  put(
    options: EntityUpdateClassificationsParameters,
  ): StreamableMethod<
    EntityUpdateClassifications204Response | EntityUpdateClassificationsDefaultResponse
  >;
}

export interface EntityGetByUniqueAttributes {
  /**
   * Get complete definition of an entity given its type and unique attribute.
   *
   * In
   * addition to the typeName path parameter, attribute key-value pair(s) can be
   * provided in the following format:
   * attr:\<attrName>=<attrValue>.
   *
   * NOTE: The
   * attrName and attrValue should be unique across entities, eg.
   * qualifiedName.
   *
   * The REST request would look something like this:
   * GET
   * /v2/entity/uniqueAttribute/type/aType?attr:aTypeAttribute=someValue.
   */
  get(
    options?: EntityGetByUniqueAttributesParameters,
  ): StreamableMethod<
    EntityGetByUniqueAttributes200Response | EntityGetByUniqueAttributesDefaultResponse
  >;
  /**
   * Update entity partially - Allow a subset of attributes to be updated on an
   * entity which is identified by its type and unique attribute eg:
   * Referenceable.qualifiedName. Null updates are not possible.
   *
   * In addition to the
   * typeName path parameter, attribute key-value pair(s) can be provided in the
   * following format:
   *
   * attr:<attrName>=<attrValue>.
   * NOTE: The attrName and
   * attrValue should be unique across entities, eg. qualifiedName.
   *
   * The REST
   * request would look something like this:
   * PUT
   * /v2/entity/uniqueAttribute/type/aType?attr:aTypeAttribute=someValue.
   */
  put(
    options?: EntityPartialUpdateByUniqueAttributesParameters,
  ): StreamableMethod<
    | EntityPartialUpdateByUniqueAttributes200Response
    | EntityPartialUpdateByUniqueAttributesDefaultResponse
  >;
  /**
   * Delete an entity identified by its type and unique attributes.
   * In addition to
   * the typeName path parameter, attribute key-value pair(s) can be provided in the
   * following format:
   * attr:\<attrName>=\<attrValue>.
   * NOTE: The attrName and
   * attrValue should be unique across entities, eg. qualifiedName.
   *
   * The REST
   * request would look something like this:
   * DELETE
   * /v2/entity/uniqueAttribute/type/aType?attr:aTypeAttribute=someValue.
   */
  delete(
    options?: EntityDeleteByUniqueAttributeParameters,
  ): StreamableMethod<
    EntityDeleteByUniqueAttribute200Response | EntityDeleteByUniqueAttributeDefaultResponse
  >;
}

export interface EntityRemoveClassificationByUniqueAttribute {
  /**
   * Delete a given classification from an entity identified by its type and unique
   * attributes.
   */
  delete(
    options?: EntityRemoveClassificationByUniqueAttributeParameters,
  ): StreamableMethod<
    | EntityRemoveClassificationByUniqueAttribute204Response
    | EntityRemoveClassificationByUniqueAttributeDefaultResponse
  >;
}

export interface EntityAddClassificationsByUniqueAttribute {
  /** Add classification to the entity identified by its type and unique attributes. */
  post(
    options: EntityAddClassificationsByUniqueAttributeParameters,
  ): StreamableMethod<
    | EntityAddClassificationsByUniqueAttribute204Response
    | EntityAddClassificationsByUniqueAttributeDefaultResponse
  >;
  /** Update classification on an entity identified by its type and unique attributes. */
  put(
    options: EntityUpdateClassificationsByUniqueAttributeParameters,
  ): StreamableMethod<
    | EntityUpdateClassificationsByUniqueAttribute204Response
    | EntityUpdateClassificationsByUniqueAttributeDefaultResponse
  >;
}

export interface EntityBulkSetClassifications {
  /** Set classifications on entities in bulk. */
  post(
    options?: EntityBulkSetClassificationsParameters,
  ): StreamableMethod<
    EntityBulkSetClassifications200Response | EntityBulkSetClassificationsDefaultResponse
  >;
}

export interface EntityListByUniqueAttributes {
  /**
   * Bulk API to retrieve list of entities identified by its unique attributes.
   * In
   * addition to the typeName path parameter, attribute key-value pair(s) can be
   * provided in the following
   * format
   *
   * typeName=\<typeName>&attr_1:\<attrName>=\<attrValue>&attr_2:\<attrName>=\<attrValue>&attr_3:\<attrName>=\<attrValue>
   *
   * NOTE:
   * The attrName should be an unique attribute for the given entity-type.
   * The REST
   * request would look something like this
   *
   * GET
   * /v2/entity/bulk/uniqueAttribute/type/hive_db?attr_1:qualifiedName=db1@cl1&attr_2:qualifiedName=db2@cl1
   *
   * Note:
   * at least one unique attribute must be provided.
   */
  get(
    options?: EntityListByUniqueAttributesParameters,
  ): StreamableMethod<
    EntityListByUniqueAttributes200Response | EntityListByUniqueAttributesDefaultResponse
  >;
}

export interface EntityGetHeader {
  /** Get entity header given its GUID. */
  get(
    options?: EntityGetHeaderParameters,
  ): StreamableMethod<EntityGetHeader200Response | EntityGetHeaderDefaultResponse>;
}

export interface EntityRemoveBusinessMetadata {
  /** Remove business metadata from an entity. */
  delete(
    options: EntityRemoveBusinessMetadataParameters,
  ): StreamableMethod<
    EntityRemoveBusinessMetadata204Response | EntityRemoveBusinessMetadataDefaultResponse
  >;
  /** Add business metadata to an entity. */
  post(
    options: EntityAddOrUpdateBusinessMetadataParameters,
  ): StreamableMethod<
    EntityAddOrUpdateBusinessMetadata204Response | EntityAddOrUpdateBusinessMetadataDefaultResponse
  >;
}

export interface EntityRemoveBusinessMetadataAttributes {
  /** Delete business metadata attributes from an entity. */
  delete(
    options: EntityRemoveBusinessMetadataAttributesParameters,
  ): StreamableMethod<
    | EntityRemoveBusinessMetadataAttributes204Response
    | EntityRemoveBusinessMetadataAttributesDefaultResponse
  >;
  /** Add or update business metadata attributes. */
  post(
    options: EntityAddOrUpdateBusinessMetadataAttributesParameters,
  ): StreamableMethod<
    | EntityAddOrUpdateBusinessMetadataAttributes204Response
    | EntityAddOrUpdateBusinessMetadataAttributesDefaultResponse
  >;
}

export interface EntityGetSampleBusinessMetadataTemplate {
  /** Get the sample Template for uploading/creating bulk BusinessMetaData */
  get(
    options?: EntityGetSampleBusinessMetadataTemplateParameters,
  ): StreamableMethod<
    | EntityGetSampleBusinessMetadataTemplate200Response
    | EntityGetSampleBusinessMetadataTemplateDefaultResponse
  >;
}

export interface EntityImportBusinessMetadata {
  /** Upload the file for creating Business Metadata in BULK */
  post(
    options: EntityImportBusinessMetadataParameters,
  ): StreamableMethod<
    EntityImportBusinessMetadata200Response | EntityImportBusinessMetadataDefaultResponse
  >;
}

export interface EntityRemoveLabels {
  /** Delete given labels to a given entity. */
  delete(
    options?: EntityRemoveLabelsParameters,
  ): StreamableMethod<EntityRemoveLabels204Response | EntityRemoveLabelsDefaultResponse>;
  /** Set labels to a given entity. */
  post(
    options?: EntitySetLabelsParameters,
  ): StreamableMethod<EntitySetLabels204Response | EntitySetLabelsDefaultResponse>;
  /** Add given labels to a given entity. */
  put(
    options?: EntityAddLabelParameters,
  ): StreamableMethod<EntityAddLabel204Response | EntityAddLabelDefaultResponse>;
}

export interface EntityRemoveLabelsByUniqueAttribute {
  /**
   * Delete given labels to a given entity identified by its type and unique
   * attribute.
   *
   * If labels is null/empty, no labels will be removed.
   *
   * If any labels
   * in labels set are non-existing labels, they will be ignored, only existing
   * labels will be removed. In addition to the typeName path parameter, attribute
   * key-value pair(s) can be provided in the following format:
   * attr:<attrName>=<attrValue>. NOTE: The attrName and attrValue should be unique
   * across entities, eg. qualifiedName. The REST request would look something like
   * this: DELETE
   * /v2/entity/uniqueAttribute/type/aType?attr:aTypeAttribute=someValue.
   */
  delete(
    options?: EntityRemoveLabelsByUniqueAttributeParameters,
  ): StreamableMethod<
    | EntityRemoveLabelsByUniqueAttribute204Response
    | EntityRemoveLabelsByUniqueAttributeDefaultResponse
  >;
  /**
   * Set labels to a given entity identified by its type and unique attributes.
   *
   * If
   * labels is null/empty, existing labels will all be removed.
   *
   * In addition to the
   * typeName path parameter, attribute key-value pair(s) can be provided in the
   * following format: attr:<attrName>=<attrValue>.
   *
   * NOTE: The attrName and
   * attrValue should be unique across entities, eg. qualifiedName.
   *
   * The REST
   * request would look something like this: POST
   * /v2/entity/uniqueAttribute/type/aType?attr:aTypeAttribute=someValue.
   */
  post(
    options?: EntitySetLabelsByUniqueAttributeParameters,
  ): StreamableMethod<
    EntitySetLabelsByUniqueAttribute204Response | EntitySetLabelsByUniqueAttributeDefaultResponse
  >;
  /**
   * Add given labels to a given entity identified by its type and unique
   * attributes.
   *
   * If labels is null/empty, no labels will be added.
   *
   * In addition to
   * the typeName path parameter, attribute key-value pair(s) can be provided in the
   * following format: attr:<attrName>=<attrValue>.
   *
   * NOTE: The attrName and
   * attrValue should be unique across entities, eg. qualifiedName.
   *
   * The REST
   * request would look something like this: PUT
   * /v2/entity/uniqueAttribute/type/aType?attr:aTypeAttribute=someValue.
   */
  put(
    options?: EntityAddLabelsByUniqueAttributeParameters,
  ): StreamableMethod<
    EntityAddLabelsByUniqueAttribute204Response | EntityAddLabelsByUniqueAttributeDefaultResponse
  >;
}

export interface EntityMoveEntitiesToCollection {
  /** Move existing entities to the target collection. */
  post(
    options: EntityMoveEntitiesToCollectionParameters,
  ): StreamableMethod<
    EntityMoveEntitiesToCollection200Response | EntityMoveEntitiesToCollectionDefaultResponse
  >;
}

export interface GlossaryList {
  /**
   * Get all glossaries. Recommend using limit/offset to get pagination result.
   * Recommend using 'ignoreTermsAndCategories=true' and fetch terms/categories
   * separately using
   *
   *  'GET /datamap/api/atlas/v2/glossary/{glossaryId}/terms'
   * and
   *
   *  'GET '/datamap/api/atlas/v2/glossary/{glossaryId}/categories'.
   */
  get(
    options?: GlossaryListParameters,
  ): StreamableMethod<GlossaryList200Response | GlossaryListDefaultResponse>;
  /** Create a glossary. */
  post(
    options?: GlossaryCreateParameters,
  ): StreamableMethod<GlossaryCreate200Response | GlossaryCreateDefaultResponse>;
}

export interface GlossaryCreateCategories {
  /** Create glossary category in bulk. */
  post(
    options: GlossaryCreateCategoriesParameters,
  ): StreamableMethod<
    GlossaryCreateCategories200Response | GlossaryCreateCategoriesDefaultResponse
  >;
}

export interface GlossaryCreateCategory {
  /** Create a glossary category. */
  post(
    options?: GlossaryCreateCategoryParameters,
  ): StreamableMethod<GlossaryCreateCategory200Response | GlossaryCreateCategoryDefaultResponse>;
}

export interface GlossaryGetCategory {
  /** Get specific glossary category by its GUID. */
  get(
    options?: GlossaryGetCategoryParameters,
  ): StreamableMethod<GlossaryGetCategory200Response | GlossaryGetCategoryDefaultResponse>;
  /** Update the given glossary category by its GUID. */
  put(
    options?: GlossaryUpdateCategoryParameters,
  ): StreamableMethod<GlossaryUpdateCategory200Response | GlossaryUpdateCategoryDefaultResponse>;
  /** Delete a glossary category. */
  delete(
    options?: GlossaryDeleteCategoryParameters,
  ): StreamableMethod<GlossaryDeleteCategory204Response | GlossaryDeleteCategoryDefaultResponse>;
}

export interface GlossaryPartialUpdateCategory {
  /**
   * Update the glossary category partially. So far we only supports partial
   * updating shortDescription and longDescription for category.
   */
  put(
    options: GlossaryPartialUpdateCategoryParameters,
  ): StreamableMethod<
    GlossaryPartialUpdateCategory200Response | GlossaryPartialUpdateCategoryDefaultResponse
  >;
}

export interface GlossaryListRelatedCategories {
  /**
   * Get all related categories (parent and children). Limit, offset, and sort
   * parameters are currently not being enabled and won't work even they are passed.
   */
  get(
    options?: GlossaryListRelatedCategoriesParameters,
  ): StreamableMethod<
    GlossaryListRelatedCategories200Response | GlossaryListRelatedCategoriesDefaultResponse
  >;
}

export interface GlossaryListCategoryTerms {
  /** Get all terms associated with the specific category. */
  get(
    options?: GlossaryListCategoryTermsParameters,
  ): StreamableMethod<
    GlossaryListCategoryTerms200Response | GlossaryListCategoryTermsDefaultResponse
  >;
}

export interface GlossaryCreateTerm {
  /** Create a glossary term. */
  post(
    options?: GlossaryCreateTermParameters,
  ): StreamableMethod<GlossaryCreateTerm200Response | GlossaryCreateTermDefaultResponse>;
}

export interface GlossaryGetTerm {
  /** Get a specific glossary term by its GUID. */
  get(
    options?: GlossaryGetTermParameters,
  ): StreamableMethod<GlossaryGetTerm200Response | GlossaryGetTermDefaultResponse>;
  /** Update the given glossary term by its GUID. */
  put(
    options?: GlossaryUpdateTermParameters,
  ): StreamableMethod<GlossaryUpdateTerm200Response | GlossaryUpdateTermDefaultResponse>;
  /** Delete a glossary term. */
  delete(
    options?: GlossaryDeleteTermParameters,
  ): StreamableMethod<GlossaryDeleteTerm204Response | GlossaryDeleteTermDefaultResponse>;
}

export interface GlossaryPartialUpdateTerm {
  /**
   * Update the glossary term partially. So far we only supports partial updating
   * shortDescription, longDescription, abbreviation, usage and status for term.
   */
  put(
    options: GlossaryPartialUpdateTermParameters,
  ): StreamableMethod<
    GlossaryPartialUpdateTerm200Response | GlossaryPartialUpdateTermDefaultResponse
  >;
}

export interface GlossaryCreateTerms {
  /** Create glossary terms in bulk. */
  post(
    options: GlossaryCreateTermsParameters,
  ): StreamableMethod<GlossaryCreateTerms200Response | GlossaryCreateTermsDefaultResponse>;
}

export interface GlossaryListEntitiesAssignedWithTerm {
  /**
   * List all related objects assigned with the specified term. Recommend using
   * limit/offset to get pagination result.
   */
  get(
    options?: GlossaryListEntitiesAssignedWithTermParameters,
  ): StreamableMethod<
    | GlossaryListEntitiesAssignedWithTerm200Response
    | GlossaryListEntitiesAssignedWithTermDefaultResponse
  >;
  /**
   * Assign the given term to the provided list of related objects. Recommend using
   * small batches with multiple API calls.
   *
   * [Entities Create Or Update
   * operation](https://learn.microsoft.com/en-us/rest/api/purview/datamapdataplane/entity/bulk-create-or-update?tabs=HTTP)
   * is an alternative to assign a term to multiple entities.
   */
  post(
    options: GlossaryAssignTermToEntitiesParameters,
  ): StreamableMethod<
    GlossaryAssignTermToEntities204Response | GlossaryAssignTermToEntitiesDefaultResponse
  >;
  /** Delete the term assignment for the given list of related objects. */
  delete(
    options: GlossaryDeleteTermAssignmentFromEntitiesParameters,
  ): StreamableMethod<
    | GlossaryDeleteTermAssignmentFromEntities204Response
    | GlossaryDeleteTermAssignmentFromEntitiesDefaultResponse
  >;
}

export interface GlossaryListRelatedTerms {
  /**
   * Get all related terms for a specific term by its GUID. Limit, offset, and sort
   * parameters are currently not being enabled and won't work even they are passed.
   */
  get(
    options?: GlossaryListRelatedTermsParameters,
  ): StreamableMethod<
    GlossaryListRelatedTerms200Response | GlossaryListRelatedTermsDefaultResponse
  >;
}

export interface GlossaryGet {
  /** Get a specific Glossary by its GUID. */
  get(
    options?: GlossaryGetParameters,
  ): StreamableMethod<GlossaryGet200Response | GlossaryGetDefaultResponse>;
  /** Update the given glossary. */
  put(
    options?: GlossaryUpdateParameters,
  ): StreamableMethod<GlossaryUpdate200Response | GlossaryUpdateDefaultResponse>;
  /**
   * Delete a glossary. Will delete underlying terms/categories together. Recommend
   * separate delete terms and categories.
   */
  delete(
    options?: GlossaryDeleteParameters,
  ): StreamableMethod<GlossaryDeleteOperation204Response | GlossaryDeleteOperationDefaultResponse>;
}

export interface GlossaryListCategories {
  /**
   * Get the categories belonging to a specific glossary. Recommend using
   * limit/offset to get pagination result.
   */
  get(
    options?: GlossaryListCategoriesParameters,
  ): StreamableMethod<GlossaryListCategories200Response | GlossaryListCategoriesDefaultResponse>;
}

export interface GlossaryListCategoriesHeaders {
  /**
   * Get the category headers belonging to a specific glossary. Recommend using
   * limit/offset to get pagination result.
   */
  get(
    options?: GlossaryListCategoriesHeadersParameters,
  ): StreamableMethod<
    GlossaryListCategoriesHeaders200Response | GlossaryListCategoriesHeadersDefaultResponse
  >;
}

export interface GlossaryGetDetailed {
  /**
   * Get a specific glossary with detailed information. This API is not
   * recommend.
   *
   * Recommend to fetch terms/categories details separately using
   *
   * GET /datamap/api/atlas/v2/glossary/{glossaryId}/terms and
   *
   * GET /datamap/api/atlas/v2/glossary/{glossaryId}/categories.
   */
  get(
    options?: GlossaryGetDetailedParameters,
  ): StreamableMethod<GlossaryGetDetailed200Response | GlossaryGetDetailedDefaultResponse>;
}

export interface GlossaryPartialUpdate {
  /**
   * Update the glossary partially. Some properties such as qualifiedName are not
   * allowed to be updated.
   *
   * So far we only supports partial updating
   * shortDescription, longDescription, language and usage for glossary.
   *
   * Recommend
   * using 'ignoreTermsAndCategories=true' to reduce response body size.
   */
  put(
    options: GlossaryPartialUpdateParameters,
  ): StreamableMethod<GlossaryPartialUpdate200Response | GlossaryPartialUpdateDefaultResponse>;
}

export interface GlossaryListTerms {
  /**
   * Get terms belonging to a specific glossary. Recommend using limit/offset to get
   * pagination result.
   */
  get(
    options?: GlossaryListTermsParameters,
  ): StreamableMethod<GlossaryListTerms200Response | GlossaryListTermsDefaultResponse>;
}

export interface GlossaryListTermHeaders {
  /**
   * Get term headers belonging to a specific glossary. Recommend using limit/offset
   * to get pagination result.
   */
  get(
    options?: GlossaryListTermHeadersParameters,
  ): StreamableMethod<GlossaryListTermHeaders200Response | GlossaryListTermHeadersDefaultResponse>;
}

export interface DiscoveryQuery {
  /** Get data using search. */
  post(
    options?: DiscoveryQueryParameters,
  ): StreamableMethod<DiscoveryQuery200Response | DiscoveryQueryDefaultResponse>;
}

export interface DiscoverySuggest {
  /** Get search suggestions by query criteria. */
  post(
    options?: DiscoverySuggestParameters,
  ): StreamableMethod<DiscoverySuggest200Response | DiscoverySuggestDefaultResponse>;
}

export interface DiscoveryAutoComplete {
  /** Get auto complete options. */
  post(
    options?: DiscoveryAutoCompleteParameters,
  ): StreamableMethod<DiscoveryAutoComplete200Response | DiscoveryAutoCompleteDefaultResponse>;
}

export interface LineageGet {
  /** Get lineage info of the entity specified by GUID. */
  get(
    options: LineageGetParameters,
  ): StreamableMethod<LineageGet200Response | LineageGetDefaultResponse>;
}

export interface LineageGetNextPage {
  /** Return immediate next page lineage info about entity with pagination */
  get(
    options: LineageGetNextPageParameters,
  ): StreamableMethod<LineageGetNextPage200Response | LineageGetNextPageDefaultResponse>;
}

export interface LineageGetByUniqueAttribute {
  /**
   * Return lineage info about entity.
   *
   * In addition to the typeName path parameter,
   * attribute key-value pair(s) can be provided in the following
   * format
   *
   * attr:[attrName]=[attrValue]
   *
   * NOTE: The attrName and attrValue should be
   * unique across entities, eg. qualifiedName.
   *
   * The REST request would look
   * something like this:
   *
   * GET
   * /v2/lineage/uniqueAttribute/type/aType?attr:aTypeAttribute=someValue.
   */
  get(
    options: LineageGetByUniqueAttributeParameters,
  ): StreamableMethod<
    LineageGetByUniqueAttribute200Response | LineageGetByUniqueAttributeDefaultResponse
  >;
}

export interface RelationshipCreate {
  /** Create a new relationship between entities. */
  post(
    options?: RelationshipCreateParameters,
  ): StreamableMethod<RelationshipCreate200Response | RelationshipCreateDefaultResponse>;
  /** Update an existing relationship between entities. */
  put(
    options?: RelationshipUpdateParameters,
  ): StreamableMethod<RelationshipUpdate200Response | RelationshipUpdateDefaultResponse>;
}

export interface RelationshipGet {
  /** Get relationship information between entities by its GUID. */
  get(
    options?: RelationshipGetParameters,
  ): StreamableMethod<RelationshipGet200Response | RelationshipGetDefaultResponse>;
  /** Delete a relationship between entities by its GUID. */
  delete(
    options?: RelationshipDeleteParameters,
  ): StreamableMethod<
    RelationshipDeleteOperation204Response | RelationshipDeleteOperationDefaultResponse
  >;
}

export interface TypeGetBusinessMetadataDefByGuid {
  /** Get the businessMetadata definition for the given guid. */
  get(
    options?: TypeGetBusinessMetadataDefByGuidParameters,
  ): StreamableMethod<
    TypeGetBusinessMetadataDefByGuid200Response | TypeGetBusinessMetadataDefByGuidDefaultResponse
  >;
}

export interface TypeGetBusinessMetadataDefByName {
  /** Get the businessMetadata definition by it's name (unique). */
  get(
    options?: TypeGetBusinessMetadataDefByNameParameters,
  ): StreamableMethod<
    TypeGetBusinessMetadataDefByName200Response | TypeGetBusinessMetadataDefByNameDefaultResponse
  >;
}

export interface TypeGetClassificationDefByGuid {
  /** Get the classification definition for the given GUID. */
  get(
    options?: TypeGetClassificationDefByGuidParameters,
  ): StreamableMethod<
    TypeGetClassificationDefByGuid200Response | TypeGetClassificationDefByGuidDefaultResponse
  >;
}

export interface TypeGetClassificationDefByName {
  /** Get the classification definition by its name (unique). */
  get(
    options?: TypeGetClassificationDefByNameParameters,
  ): StreamableMethod<
    TypeGetClassificationDefByName200Response | TypeGetClassificationDefByNameDefaultResponse
  >;
}

export interface TypeGetEntityDefByGuid {
  /** Get the Entity definition for the given GUID. */
  get(
    options?: TypeGetEntityDefByGuidParameters,
  ): StreamableMethod<TypeGetEntityDefByGuid200Response | TypeGetEntityDefByGuidDefaultResponse>;
}

export interface TypeGetEntityDefByName {
  /** Get the entity definition by its name (unique). */
  get(
    options?: TypeGetEntityDefByNameParameters,
  ): StreamableMethod<TypeGetEntityDefByName200Response | TypeGetEntityDefByNameDefaultResponse>;
}

export interface TypeGetEnumDefByGuid {
  /** Get the enum definition for the given GUID. */
  get(
    options?: TypeGetEnumDefByGuidParameters,
  ): StreamableMethod<TypeGetEnumDefByGuid200Response | TypeGetEnumDefByGuidDefaultResponse>;
}

export interface TypeGetEnumDefByName {
  /** Get the enum definition by its name (unique). */
  get(
    options?: TypeGetEnumDefByNameParameters,
  ): StreamableMethod<TypeGetEnumDefByName200Response | TypeGetEnumDefByNameDefaultResponse>;
}

export interface TypeGetRelationshipDefByGuid {
  /** Get the relationship definition for the given GUID. */
  get(
    options?: TypeGetRelationshipDefByGuidParameters,
  ): StreamableMethod<
    TypeGetRelationshipDefByGuid200Response | TypeGetRelationshipDefByGuidDefaultResponse
  >;
}

export interface TypeGetRelationshipDefByName {
  /** Get the relationship definition by its name (unique). */
  get(
    options?: TypeGetRelationshipDefByNameParameters,
  ): StreamableMethod<
    TypeGetRelationshipDefByName200Response | TypeGetRelationshipDefByNameDefaultResponse
  >;
}

export interface TypeGetStructDefByGuid {
  /** Get the struct definition for the given GUID. */
  get(
    options?: TypeGetStructDefByGuidParameters,
  ): StreamableMethod<TypeGetStructDefByGuid200Response | TypeGetStructDefByGuidDefaultResponse>;
}

export interface TypeGetStructDefByName {
  /** Get the struct definition by its name (unique). */
  get(
    options?: TypeGetStructDefByNameParameters,
  ): StreamableMethod<TypeGetStructDefByName200Response | TypeGetStructDefByNameDefaultResponse>;
}

export interface TypeGetByGuid {
  /** Get the type definition for the given GUID. */
  get(
    options?: TypeGetByGuidParameters,
  ): StreamableMethod<TypeGetByGuid200Response | TypeGetByGuidDefaultResponse>;
}

export interface TypeGetByName {
  /** Get the type definition by its name (unique). */
  get(
    options?: TypeGetByNameParameters,
  ): StreamableMethod<TypeGetByName200Response | TypeGetByNameDefaultResponse>;
  /** Delete API for type identified by its name. */
  delete(
    options?: TypeDeleteParameters,
  ): StreamableMethod<TypeDeleteOperation204Response | TypeDeleteOperationDefaultResponse>;
}

export interface TypeList {
  /** List all type definitions in bulk. */
  get(
    options?: TypeListParameters,
  ): StreamableMethod<TypeList200Response | TypeListDefaultResponse>;
  /**
   * Create all atlas type definitions in bulk, only new definitions will be
   * created.
   * Any changes to the existing definitions will be discarded.
   */
  post(
    options?: TypeBulkCreateParameters,
  ): StreamableMethod<TypeBulkCreate200Response | TypeBulkCreateDefaultResponse>;
  /**
   * Update all types in bulk, changes detected in the type definitions would be
   * persisted.
   */
  put(
    options?: TypeBulkUpdateParameters,
  ): StreamableMethod<TypeBulkUpdate200Response | TypeBulkUpdateDefaultResponse>;
  /** Delete API for all types in bulk. */
  delete(
    options?: TypeBulkDeleteParameters,
  ): StreamableMethod<TypeBulkDelete204Response | TypeBulkDeleteDefaultResponse>;
}

export interface TypeListHeaders {
  /** List all type definitions returned as a list of minimal information header. */
  get(
    options?: TypeListHeadersParameters,
  ): StreamableMethod<TypeListHeaders200Response | TypeListHeadersDefaultResponse>;
}

export interface TypeGetTermTemplateDefByGuid {
  /** Get the term template definition for the given GUID. */
  get(
    options?: TypeGetTermTemplateDefByGuidParameters,
  ): StreamableMethod<
    TypeGetTermTemplateDefByGuid200Response | TypeGetTermTemplateDefByGuidDefaultResponse
  >;
}

export interface TypeGetTermTemplateDefByName {
  /** Get the term template definition by its name (unique). */
  get(
    options?: TypeGetTermTemplateDefByNameParameters,
  ): StreamableMethod<
    TypeGetTermTemplateDefByName200Response | TypeGetTermTemplateDefByNameDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/atlas/v2/entity' has methods for the following verbs: post */
  (path: "/atlas/v2/entity"): EntityCreateOrUpdate;
  /** Resource for '/atlas/v2/entity/bulk' has methods for the following verbs: get, post, delete */
  (path: "/atlas/v2/entity/bulk"): EntityListByGuids;
  /** Resource for '/atlas/v2/entity/bulk/classification' has methods for the following verbs: post */
  (path: "/atlas/v2/entity/bulk/classification"): EntityAddClassification;
  /** Resource for '/atlas/v2/entity/guid/\{guid\}' has methods for the following verbs: get, put, delete */
  (path: "/atlas/v2/entity/guid/{guid}", guid: string): EntityGet;
  /** Resource for '/atlas/v2/entity/guid/\{guid\}/classification/\{classificationName\}' has methods for the following verbs: get, delete */
  (
    path: "/atlas/v2/entity/guid/{guid}/classification/{classificationName}",
    guid: string,
    classificationName: string,
  ): EntityGetClassification;
  /** Resource for '/atlas/v2/entity/guid/\{guid\}/classifications' has methods for the following verbs: get, post, put */
  (path: "/atlas/v2/entity/guid/{guid}/classifications", guid: string): EntityGetClassifications;
  /** Resource for '/atlas/v2/entity/uniqueAttribute/type/\{typeName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/atlas/v2/entity/uniqueAttribute/type/{typeName}",
    typeName: string,
  ): EntityGetByUniqueAttributes;
  /** Resource for '/atlas/v2/entity/uniqueAttribute/type/\{typeName\}/classification/\{classificationName\}' has methods for the following verbs: delete */
  (
    path: "/atlas/v2/entity/uniqueAttribute/type/{typeName}/classification/{classificationName}",
    typeName: string,
    classificationName: string,
  ): EntityRemoveClassificationByUniqueAttribute;
  /** Resource for '/atlas/v2/entity/uniqueAttribute/type/\{typeName\}/classifications' has methods for the following verbs: post, put */
  (
    path: "/atlas/v2/entity/uniqueAttribute/type/{typeName}/classifications",
    typeName: string,
  ): EntityAddClassificationsByUniqueAttribute;
  /** Resource for '/atlas/v2/entity/bulk/setClassifications' has methods for the following verbs: post */
  (path: "/atlas/v2/entity/bulk/setClassifications"): EntityBulkSetClassifications;
  /** Resource for '/atlas/v2/entity/bulk/uniqueAttribute/type/\{typeName\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/entity/bulk/uniqueAttribute/type/{typeName}",
    typeName: string,
  ): EntityListByUniqueAttributes;
  /** Resource for '/atlas/v2/entity/guid/\{guid\}/header' has methods for the following verbs: get */
  (path: "/atlas/v2/entity/guid/{guid}/header", guid: string): EntityGetHeader;
  /** Resource for '/atlas/v2/entity/guid/\{guid\}/businessmetadata' has methods for the following verbs: delete, post */
  (
    path: "/atlas/v2/entity/guid/{guid}/businessmetadata",
    guid: string,
  ): EntityRemoveBusinessMetadata;
  /** Resource for '/atlas/v2/entity/guid/\{guid\}/businessmetadata/\{businessMetadataName\}' has methods for the following verbs: delete, post */
  (
    path: "/atlas/v2/entity/guid/{guid}/businessmetadata/{businessMetadataName}",
    businessMetadataName: string,
    guid: string,
  ): EntityRemoveBusinessMetadataAttributes;
  /** Resource for '/atlas/v2/entity/businessmetadata/import/template' has methods for the following verbs: get */
  (
    path: "/atlas/v2/entity/businessmetadata/import/template",
  ): EntityGetSampleBusinessMetadataTemplate;
  /** Resource for '/atlas/v2/entity/businessmetadata/import' has methods for the following verbs: post */
  (path: "/atlas/v2/entity/businessmetadata/import"): EntityImportBusinessMetadata;
  /** Resource for '/atlas/v2/entity/guid/\{guid\}/labels' has methods for the following verbs: delete, post, put */
  (path: "/atlas/v2/entity/guid/{guid}/labels", guid: string): EntityRemoveLabels;
  /** Resource for '/atlas/v2/entity/uniqueAttribute/type/\{typeName\}/labels' has methods for the following verbs: delete, post, put */
  (
    path: "/atlas/v2/entity/uniqueAttribute/type/{typeName}/labels",
    typeName: string,
  ): EntityRemoveLabelsByUniqueAttribute;
  /** Resource for '/entity/moveTo' has methods for the following verbs: post */
  (path: "/entity/moveTo"): EntityMoveEntitiesToCollection;
  /** Resource for '/atlas/v2/glossary' has methods for the following verbs: get, post */
  (path: "/atlas/v2/glossary"): GlossaryList;
  /** Resource for '/atlas/v2/glossary/categories' has methods for the following verbs: post */
  (path: "/atlas/v2/glossary/categories"): GlossaryCreateCategories;
  /** Resource for '/atlas/v2/glossary/category' has methods for the following verbs: post */
  (path: "/atlas/v2/glossary/category"): GlossaryCreateCategory;
  /** Resource for '/atlas/v2/glossary/category/\{categoryId\}' has methods for the following verbs: get, put, delete */
  (path: "/atlas/v2/glossary/category/{categoryId}", categoryId: string): GlossaryGetCategory;
  /** Resource for '/atlas/v2/glossary/category/\{categoryId\}/partial' has methods for the following verbs: put */
  (
    path: "/atlas/v2/glossary/category/{categoryId}/partial",
    categoryId: string,
  ): GlossaryPartialUpdateCategory;
  /** Resource for '/atlas/v2/glossary/category/\{categoryId\}/related' has methods for the following verbs: get */
  (
    path: "/atlas/v2/glossary/category/{categoryId}/related",
    categoryId: string,
  ): GlossaryListRelatedCategories;
  /** Resource for '/atlas/v2/glossary/category/\{categoryId\}/terms' has methods for the following verbs: get */
  (
    path: "/atlas/v2/glossary/category/{categoryId}/terms",
    categoryId: string,
  ): GlossaryListCategoryTerms;
  /** Resource for '/atlas/v2/glossary/term' has methods for the following verbs: post */
  (path: "/atlas/v2/glossary/term"): GlossaryCreateTerm;
  /** Resource for '/atlas/v2/glossary/term/\{termId\}' has methods for the following verbs: get, put, delete */
  (path: "/atlas/v2/glossary/term/{termId}", termId: string): GlossaryGetTerm;
  /** Resource for '/atlas/v2/glossary/term/\{termId\}/partial' has methods for the following verbs: put */
  (path: "/atlas/v2/glossary/term/{termId}/partial", termId: string): GlossaryPartialUpdateTerm;
  /** Resource for '/atlas/v2/glossary/terms' has methods for the following verbs: post */
  (path: "/atlas/v2/glossary/terms"): GlossaryCreateTerms;
  /** Resource for '/atlas/v2/glossary/terms/\{termId\}/assignedEntities' has methods for the following verbs: get, post, delete */
  (
    path: "/atlas/v2/glossary/terms/{termId}/assignedEntities",
    termId: string,
  ): GlossaryListEntitiesAssignedWithTerm;
  /** Resource for '/atlas/v2/glossary/terms/\{termId\}/related' has methods for the following verbs: get */
  (path: "/atlas/v2/glossary/terms/{termId}/related", termId: string): GlossaryListRelatedTerms;
  /** Resource for '/atlas/v2/glossary/\{glossaryId\}' has methods for the following verbs: get, put, delete */
  (path: "/atlas/v2/glossary/{glossaryId}", glossaryId: string): GlossaryGet;
  /** Resource for '/atlas/v2/glossary/\{glossaryId\}/categories' has methods for the following verbs: get */
  (path: "/atlas/v2/glossary/{glossaryId}/categories", glossaryId: string): GlossaryListCategories;
  /** Resource for '/atlas/v2/glossary/\{glossaryId\}/categories/headers' has methods for the following verbs: get */
  (
    path: "/atlas/v2/glossary/{glossaryId}/categories/headers",
    glossaryId: string,
  ): GlossaryListCategoriesHeaders;
  /** Resource for '/atlas/v2/glossary/\{glossaryId\}/detailed' has methods for the following verbs: get */
  (path: "/atlas/v2/glossary/{glossaryId}/detailed", glossaryId: string): GlossaryGetDetailed;
  /** Resource for '/atlas/v2/glossary/\{glossaryId\}/partial' has methods for the following verbs: put */
  (path: "/atlas/v2/glossary/{glossaryId}/partial", glossaryId: string): GlossaryPartialUpdate;
  /** Resource for '/atlas/v2/glossary/\{glossaryId\}/terms' has methods for the following verbs: get */
  (path: "/atlas/v2/glossary/{glossaryId}/terms", glossaryId: string): GlossaryListTerms;
  /** Resource for '/atlas/v2/glossary/\{glossaryId\}/terms/headers' has methods for the following verbs: get */
  (
    path: "/atlas/v2/glossary/{glossaryId}/terms/headers",
    glossaryId: string,
  ): GlossaryListTermHeaders;
  /** Resource for '/search/query' has methods for the following verbs: post */
  (path: "/search/query"): DiscoveryQuery;
  /** Resource for '/search/suggest' has methods for the following verbs: post */
  (path: "/search/suggest"): DiscoverySuggest;
  /** Resource for '/search/autocomplete' has methods for the following verbs: post */
  (path: "/search/autocomplete"): DiscoveryAutoComplete;
  /** Resource for '/atlas/v2/lineage/\{guid\}' has methods for the following verbs: get */
  (path: "/atlas/v2/lineage/{guid}", guid: string): LineageGet;
  /** Resource for '/lineage/\{guid\}/next' has methods for the following verbs: get */
  (path: "/lineage/{guid}/next", guid: string): LineageGetNextPage;
  /** Resource for '/atlas/v2/lineage/uniqueAttribute/type/\{typeName\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/lineage/uniqueAttribute/type/{typeName}",
    typeName: string,
  ): LineageGetByUniqueAttribute;
  /** Resource for '/atlas/v2/relationship' has methods for the following verbs: post, put */
  (path: "/atlas/v2/relationship"): RelationshipCreate;
  /** Resource for '/atlas/v2/relationship/guid/\{guid\}' has methods for the following verbs: get, delete */
  (path: "/atlas/v2/relationship/guid/{guid}", guid: string): RelationshipGet;
  /** Resource for '/atlas/v2/types/businessmetadatadef/guid/\{guid\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/types/businessmetadatadef/guid/{guid}",
    guid: string,
  ): TypeGetBusinessMetadataDefByGuid;
  /** Resource for '/atlas/v2/types/businessmetadatadef/name/\{name\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/types/businessmetadatadef/name/{name}",
    name: string,
  ): TypeGetBusinessMetadataDefByName;
  /** Resource for '/atlas/v2/types/classificationdef/guid/\{guid\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/types/classificationdef/guid/{guid}",
    guid: string,
  ): TypeGetClassificationDefByGuid;
  /** Resource for '/atlas/v2/types/classificationdef/name/\{name\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/types/classificationdef/name/{name}",
    name: string,
  ): TypeGetClassificationDefByName;
  /** Resource for '/atlas/v2/types/entitydef/guid/\{guid\}' has methods for the following verbs: get */
  (path: "/atlas/v2/types/entitydef/guid/{guid}", guid: string): TypeGetEntityDefByGuid;
  /** Resource for '/atlas/v2/types/entitydef/name/\{name\}' has methods for the following verbs: get */
  (path: "/atlas/v2/types/entitydef/name/{name}", name: string): TypeGetEntityDefByName;
  /** Resource for '/atlas/v2/types/enumdef/guid/\{guid\}' has methods for the following verbs: get */
  (path: "/atlas/v2/types/enumdef/guid/{guid}", guid: string): TypeGetEnumDefByGuid;
  /** Resource for '/atlas/v2/types/enumdef/name/\{name\}' has methods for the following verbs: get */
  (path: "/atlas/v2/types/enumdef/name/{name}", name: string): TypeGetEnumDefByName;
  /** Resource for '/atlas/v2/types/relationshipdef/guid/\{guid\}' has methods for the following verbs: get */
  (path: "/atlas/v2/types/relationshipdef/guid/{guid}", guid: string): TypeGetRelationshipDefByGuid;
  /** Resource for '/atlas/v2/types/relationshipdef/name/\{name\}' has methods for the following verbs: get */
  (path: "/atlas/v2/types/relationshipdef/name/{name}", name: string): TypeGetRelationshipDefByName;
  /** Resource for '/atlas/v2/types/structdef/guid/\{guid\}' has methods for the following verbs: get */
  (path: "/atlas/v2/types/structdef/guid/{guid}", guid: string): TypeGetStructDefByGuid;
  /** Resource for '/atlas/v2/types/structdef/name/\{name\}' has methods for the following verbs: get */
  (path: "/atlas/v2/types/structdef/name/{name}", name: string): TypeGetStructDefByName;
  /** Resource for '/atlas/v2/types/typedef/guid/\{guid\}' has methods for the following verbs: get */
  (path: "/atlas/v2/types/typedef/guid/{guid}", guid: string): TypeGetByGuid;
  /** Resource for '/atlas/v2/types/typedef/name/\{name\}' has methods for the following verbs: get, delete */
  (path: "/atlas/v2/types/typedef/name/{name}", name: string): TypeGetByName;
  /** Resource for '/atlas/v2/types/typedefs' has methods for the following verbs: get, post, put, delete */
  (path: "/atlas/v2/types/typedefs"): TypeList;
  /** Resource for '/atlas/v2/types/typedefs/headers' has methods for the following verbs: get */
  (path: "/atlas/v2/types/typedefs/headers"): TypeListHeaders;
  /** Resource for '/types/termtemplatedef/guid/\{guid\}' has methods for the following verbs: get */
  (path: "/types/termtemplatedef/guid/{guid}", guid: string): TypeGetTermTemplateDefByGuid;
  /** Resource for '/types/termtemplatedef/name/\{name\}' has methods for the following verbs: get */
  (path: "/types/termtemplatedef/name/{name}", name: string): TypeGetTermTemplateDefByName;
}

export type PurviewDataMapClient = Client & {
  path: Routes;
};
