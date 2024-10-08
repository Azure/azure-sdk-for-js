// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  EntityCreateOrUpdateParameters,
  EntityListByGuidsParameters,
  EntityCreateOrUpdateEntitiesParameters,
  EntityDeleteByGuidsParameters,
  EntityAddClassificationParameters,
  EntityGetByGuidParameters,
  EntityPartialUpdateEntityAttributeByGuidParameters,
  EntityDeleteByGuidParameters,
  EntityGetClassificationParameters,
  EntityDeleteClassificationParameters,
  EntityGetClassificationsParameters,
  EntityAddClassificationsParameters,
  EntityUpdateClassificationsParameters,
  EntityGetByUniqueAttributesParameters,
  EntityPartialUpdateEntityByUniqueAttributesParameters,
  EntityDeleteByUniqueAttributeParameters,
  EntityDeleteClassificationByUniqueAttributeParameters,
  EntityAddClassificationsByUniqueAttributeParameters,
  EntityUpdateClassificationsByUniqueAttributeParameters,
  EntitySetClassificationsParameters,
  EntityGetEntitiesByUniqueAttributesParameters,
  EntityGetHeaderParameters,
  EntityDeleteBusinessMetadataParameters,
  EntityAddOrUpdateBusinessMetadataParameters,
  EntityDeleteBusinessMetadataAttributesParameters,
  EntityAddOrUpdateBusinessMetadataAttributesParameters,
  EntityGetSampleBusinessMetadataTemplateParameters,
  EntityImportBusinessMetadataParameters,
  EntityDeleteLabelsParameters,
  EntitySetLabelsParameters,
  EntityAddLabelParameters,
  EntityDeleteLabelsByUniqueAttributeParameters,
  EntitySetLabelsByUniqueAttributeParameters,
  EntityAddLabelsByUniqueAttributeParameters,
  GlossaryListGlossariesParameters,
  GlossaryCreateGlossaryParameters,
  GlossaryCreateGlossaryCategoriesParameters,
  GlossaryCreateGlossaryCategoryParameters,
  GlossaryGetGlossaryCategoryParameters,
  GlossaryUpdateGlossaryCategoryParameters,
  GlossaryDeleteGlossaryCategoryParameters,
  GlossaryPartialUpdateGlossaryCategoryParameters,
  GlossaryListRelatedCategoriesParameters,
  GlossaryListCategoryTermsParameters,
  GlossaryCreateGlossaryTermParameters,
  GlossaryGetGlossaryTermParameters,
  GlossaryUpdateGlossaryTermParameters,
  GlossaryDeleteGlossaryTermParameters,
  GlossaryPartialUpdateGlossaryTermParameters,
  GlossaryCreateGlossaryTermsParameters,
  GlossaryGetEntitiesAssignedWithTermParameters,
  GlossaryAssignTermToEntitiesParameters,
  GlossaryRemoveTermAssignmentFromEntitiesParameters,
  GlossaryDeleteTermAssignmentFromEntitiesParameters,
  GlossaryListRelatedTermsParameters,
  GlossaryGetGlossaryParameters,
  GlossaryUpdateGlossaryParameters,
  GlossaryDeleteGlossaryParameters,
  GlossaryListGlossaryCategoriesParameters,
  GlossaryListGlossaryCategoriesHeadersParameters,
  GlossaryGetDetailedGlossaryParameters,
  GlossaryPartialUpdateGlossaryParameters,
  GlossaryListGlossaryTermsParameters,
  GlossaryListGlossaryTermHeadersParameters,
  GlossaryImportGlossaryTermsViaCsvParameters,
  GlossaryImportGlossaryTermsViaCsvByGlossaryNameParameters,
  GlossaryGetImportCsvOperationStatusParameters,
  GlossaryExportGlossaryTermsAsCsvParameters,
  GlossaryListTermsByGlossaryNameParameters,
  DiscoveryQueryParameters,
  DiscoverySuggestParameters,
  DiscoveryBrowseParameters,
  DiscoveryAutoCompleteParameters,
  LineageGetLineageGraphParameters,
  LineageNextPageLineageParameters,
  LineageGetLineageByUniqueAttributeParameters,
  RelationshipCreateParameters,
  RelationshipUpdateParameters,
  RelationshipGetParameters,
  RelationshipDeleteParameters,
  TypesGetBusinessMetadataDefByGuidParameters,
  TypesGetBusinessMetadataDefByNameParameters,
  TypesGetClassificationDefByGuidParameters,
  TypesGetClassificationDefByNameParameters,
  TypesGetEntityDefinitionByGuidParameters,
  TypesGetEntityDefinitionByNameParameters,
  TypesGetEnumDefByGuidParameters,
  TypesGetEnumDefByNameParameters,
  TypesGetRelationshipDefByGuidParameters,
  TypesGetRelationshipDefByNameParameters,
  TypesGetStructDefByGuidParameters,
  TypesGetStructDefByNameParameters,
  TypesGetTypeDefinitionByGuidParameters,
  TypesGetTypeDefinitionByNameParameters,
  TypesDeleteTypeByNameParameters,
  TypesGetAllTypeDefinitionsParameters,
  TypesCreateTypeDefinitionsParameters,
  TypesUpdateAtlasTypeDefinitionsParameters,
  TypesDeleteTypeDefinitionsParameters,
  TypesListTypeDefinitionHeadersParameters,
  TypesGetTermTemplateDefByGuidParameters,
  TypesGetTermTemplateDefByNameParameters,
  CollectionCreateOrUpdateParameters,
  CollectionCreateOrUpdateBulkParameters,
  CollectionMoveEntitiesToCollectionParameters,
} from "./parameters";
import {
  EntityCreateOrUpdate200Response,
  EntityCreateOrUpdateDefaultResponse,
  EntityListByGuids200Response,
  EntityListByGuidsDefaultResponse,
  EntityCreateOrUpdateEntities200Response,
  EntityCreateOrUpdateEntitiesDefaultResponse,
  EntityDeleteByGuids200Response,
  EntityDeleteByGuidsDefaultResponse,
  EntityAddClassification204Response,
  EntityAddClassificationDefaultResponse,
  EntityGetByGuid200Response,
  EntityGetByGuidDefaultResponse,
  EntityPartialUpdateEntityAttributeByGuid200Response,
  EntityPartialUpdateEntityAttributeByGuidDefaultResponse,
  EntityDeleteByGuid200Response,
  EntityDeleteByGuidDefaultResponse,
  EntityGetClassification200Response,
  EntityGetClassificationDefaultResponse,
  EntityDeleteClassification204Response,
  EntityDeleteClassificationDefaultResponse,
  EntityGetClassifications200Response,
  EntityGetClassificationsDefaultResponse,
  EntityAddClassifications204Response,
  EntityAddClassificationsDefaultResponse,
  EntityUpdateClassifications204Response,
  EntityUpdateClassificationsDefaultResponse,
  EntityGetByUniqueAttributes200Response,
  EntityGetByUniqueAttributesDefaultResponse,
  EntityPartialUpdateEntityByUniqueAttributes200Response,
  EntityPartialUpdateEntityByUniqueAttributesDefaultResponse,
  EntityDeleteByUniqueAttribute200Response,
  EntityDeleteByUniqueAttributeDefaultResponse,
  EntityDeleteClassificationByUniqueAttribute204Response,
  EntityDeleteClassificationByUniqueAttributeDefaultResponse,
  EntityAddClassificationsByUniqueAttribute204Response,
  EntityAddClassificationsByUniqueAttributeDefaultResponse,
  EntityUpdateClassificationsByUniqueAttribute204Response,
  EntityUpdateClassificationsByUniqueAttributeDefaultResponse,
  EntitySetClassifications200Response,
  EntitySetClassificationsDefaultResponse,
  EntityGetEntitiesByUniqueAttributes200Response,
  EntityGetEntitiesByUniqueAttributesDefaultResponse,
  EntityGetHeader200Response,
  EntityGetHeaderDefaultResponse,
  EntityDeleteBusinessMetadata204Response,
  EntityAddOrUpdateBusinessMetadata204Response,
  EntityDeleteBusinessMetadataAttributes204Response,
  EntityAddOrUpdateBusinessMetadataAttributes204Response,
  EntityGetSampleBusinessMetadataTemplate200Response,
  EntityGetSampleBusinessMetadataTemplate400Response,
  EntityImportBusinessMetadata200Response,
  EntityImportBusinessMetadata400Response,
  EntityImportBusinessMetadata409Response,
  EntityDeleteLabels204Response,
  EntitySetLabels204Response,
  EntityAddLabel204Response,
  EntityDeleteLabelsByUniqueAttribute204Response,
  EntitySetLabelsByUniqueAttribute204Response,
  EntityAddLabelsByUniqueAttribute204Response,
  GlossaryListGlossaries200Response,
  GlossaryListGlossariesDefaultResponse,
  GlossaryCreateGlossary200Response,
  GlossaryCreateGlossaryDefaultResponse,
  GlossaryCreateGlossaryCategories200Response,
  GlossaryCreateGlossaryCategoriesDefaultResponse,
  GlossaryCreateGlossaryCategory200Response,
  GlossaryCreateGlossaryCategoryDefaultResponse,
  GlossaryGetGlossaryCategory200Response,
  GlossaryGetGlossaryCategoryDefaultResponse,
  GlossaryUpdateGlossaryCategory200Response,
  GlossaryUpdateGlossaryCategoryDefaultResponse,
  GlossaryDeleteGlossaryCategory204Response,
  GlossaryDeleteGlossaryCategoryDefaultResponse,
  GlossaryPartialUpdateGlossaryCategory200Response,
  GlossaryPartialUpdateGlossaryCategoryDefaultResponse,
  GlossaryListRelatedCategories200Response,
  GlossaryListRelatedCategoriesDefaultResponse,
  GlossaryListCategoryTerms200Response,
  GlossaryListCategoryTermsDefaultResponse,
  GlossaryCreateGlossaryTerm200Response,
  GlossaryCreateGlossaryTermDefaultResponse,
  GlossaryGetGlossaryTerm200Response,
  GlossaryGetGlossaryTermDefaultResponse,
  GlossaryUpdateGlossaryTerm200Response,
  GlossaryUpdateGlossaryTermDefaultResponse,
  GlossaryDeleteGlossaryTerm204Response,
  GlossaryDeleteGlossaryTermDefaultResponse,
  GlossaryPartialUpdateGlossaryTerm200Response,
  GlossaryPartialUpdateGlossaryTermDefaultResponse,
  GlossaryCreateGlossaryTerms200Response,
  GlossaryCreateGlossaryTermsDefaultResponse,
  GlossaryGetEntitiesAssignedWithTerm200Response,
  GlossaryGetEntitiesAssignedWithTermDefaultResponse,
  GlossaryAssignTermToEntities204Response,
  GlossaryAssignTermToEntitiesDefaultResponse,
  GlossaryRemoveTermAssignmentFromEntities204Response,
  GlossaryRemoveTermAssignmentFromEntitiesDefaultResponse,
  GlossaryDeleteTermAssignmentFromEntities204Response,
  GlossaryDeleteTermAssignmentFromEntitiesDefaultResponse,
  GlossaryListRelatedTerms200Response,
  GlossaryListRelatedTermsDefaultResponse,
  GlossaryGetGlossary200Response,
  GlossaryGetGlossaryDefaultResponse,
  GlossaryUpdateGlossary200Response,
  GlossaryUpdateGlossaryDefaultResponse,
  GlossaryDeleteGlossary204Response,
  GlossaryDeleteGlossaryDefaultResponse,
  GlossaryListGlossaryCategories200Response,
  GlossaryListGlossaryCategoriesDefaultResponse,
  GlossaryListGlossaryCategoriesHeaders200Response,
  GlossaryListGlossaryCategoriesHeadersDefaultResponse,
  GlossaryGetDetailedGlossary200Response,
  GlossaryGetDetailedGlossaryDefaultResponse,
  GlossaryPartialUpdateGlossary200Response,
  GlossaryPartialUpdateGlossaryDefaultResponse,
  GlossaryListGlossaryTerms200Response,
  GlossaryListGlossaryTermsDefaultResponse,
  GlossaryListGlossaryTermHeaders200Response,
  GlossaryListGlossaryTermHeadersDefaultResponse,
  GlossaryImportGlossaryTermsViaCsv202Response,
  GlossaryImportGlossaryTermsViaCsvDefaultResponse,
  GlossaryImportGlossaryTermsViaCsvByGlossaryName202Response,
  GlossaryImportGlossaryTermsViaCsvByGlossaryNameDefaultResponse,
  GlossaryGetImportCsvOperationStatus200Response,
  GlossaryGetImportCsvOperationStatusDefaultResponse,
  GlossaryExportGlossaryTermsAsCsv200Response,
  GlossaryExportGlossaryTermsAsCsvDefaultResponse,
  GlossaryListTermsByGlossaryName200Response,
  GlossaryListTermsByGlossaryNameDefaultResponse,
  DiscoveryQuery200Response,
  DiscoveryQueryDefaultResponse,
  DiscoverySuggest200Response,
  DiscoverySuggestDefaultResponse,
  DiscoveryBrowse200Response,
  DiscoveryBrowseDefaultResponse,
  DiscoveryAutoComplete200Response,
  DiscoveryAutoCompleteDefaultResponse,
  LineageGetLineageGraph200Response,
  LineageGetLineageGraphDefaultResponse,
  LineageNextPageLineage200Response,
  LineageNextPageLineageDefaultResponse,
  LineageGetLineageByUniqueAttribute200Response,
  LineageGetLineageByUniqueAttribute400Response,
  LineageGetLineageByUniqueAttribute404Response,
  RelationshipCreate200Response,
  RelationshipCreateDefaultResponse,
  RelationshipUpdate200Response,
  RelationshipUpdateDefaultResponse,
  RelationshipGet200Response,
  RelationshipGetDefaultResponse,
  RelationshipDelete204Response,
  RelationshipDeleteDefaultResponse,
  TypesGetBusinessMetadataDefByGuid200Response,
  TypesGetBusinessMetadataDefByGuid404Response,
  TypesGetBusinessMetadataDefByName200Response,
  TypesGetBusinessMetadataDefByName404Response,
  TypesGetClassificationDefByGuid200Response,
  TypesGetClassificationDefByGuidDefaultResponse,
  TypesGetClassificationDefByName200Response,
  TypesGetClassificationDefByNameDefaultResponse,
  TypesGetEntityDefinitionByGuid200Response,
  TypesGetEntityDefinitionByGuidDefaultResponse,
  TypesGetEntityDefinitionByName200Response,
  TypesGetEntityDefinitionByNameDefaultResponse,
  TypesGetEnumDefByGuid200Response,
  TypesGetEnumDefByGuidDefaultResponse,
  TypesGetEnumDefByName200Response,
  TypesGetEnumDefByNameDefaultResponse,
  TypesGetRelationshipDefByGuid200Response,
  TypesGetRelationshipDefByGuidDefaultResponse,
  TypesGetRelationshipDefByName200Response,
  TypesGetRelationshipDefByNameDefaultResponse,
  TypesGetStructDefByGuid200Response,
  TypesGetStructDefByGuidDefaultResponse,
  TypesGetStructDefByName200Response,
  TypesGetStructDefByNameDefaultResponse,
  TypesGetTypeDefinitionByGuid200Response,
  TypesGetTypeDefinitionByGuidDefaultResponse,
  TypesGetTypeDefinitionByName200Response,
  TypesGetTypeDefinitionByNameDefaultResponse,
  TypesDeleteTypeByName204Response,
  TypesDeleteTypeByNameDefaultResponse,
  TypesGetAllTypeDefinitions200Response,
  TypesGetAllTypeDefinitionsDefaultResponse,
  TypesCreateTypeDefinitions200Response,
  TypesCreateTypeDefinitionsDefaultResponse,
  TypesUpdateAtlasTypeDefinitions200Response,
  TypesUpdateAtlasTypeDefinitionsDefaultResponse,
  TypesDeleteTypeDefinitions204Response,
  TypesDeleteTypeDefinitionsDefaultResponse,
  TypesListTypeDefinitionHeaders200Response,
  TypesListTypeDefinitionHeadersDefaultResponse,
  TypesGetTermTemplateDefByGuid200Response,
  TypesGetTermTemplateDefByGuidDefaultResponse,
  TypesGetTermTemplateDefByName200Response,
  TypesGetTermTemplateDefByNameDefaultResponse,
  CollectionCreateOrUpdate200Response,
  CollectionCreateOrUpdateDefaultResponse,
  CollectionCreateOrUpdateBulk200Response,
  CollectionCreateOrUpdateBulkDefaultResponse,
  CollectionMoveEntitiesToCollection200Response,
  CollectionMoveEntitiesToCollectionDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface EntityCreateOrUpdate {
  /**
   * Create or update an entity in Atlas.
   * Existing entity is matched using its unique guid if supplied or by its unique attributes eg: qualifiedName.
   * Map and array of collections are not well supported. E.g., array<array<int>>, array<map<string, int>>.
   */
  post(
    options: EntityCreateOrUpdateParameters,
  ): StreamableMethod<EntityCreateOrUpdate200Response | EntityCreateOrUpdateDefaultResponse>;
}

export interface EntityListByGuids {
  /** List entities in bulk identified by its GUIDs. */
  get(
    options: EntityListByGuidsParameters,
  ): StreamableMethod<EntityListByGuids200Response | EntityListByGuidsDefaultResponse>;
  /**
   * Create or update entities in Atlas in bulk.
   * Existing entity is matched using its unique guid if supplied or by its unique attributes eg: qualifiedName.
   * Map and array of collections are not well supported. E.g., array<array<int>>, array<map<string, int>>.
   */
  post(
    options: EntityCreateOrUpdateEntitiesParameters,
  ): StreamableMethod<
    EntityCreateOrUpdateEntities200Response | EntityCreateOrUpdateEntitiesDefaultResponse
  >;
  /** Delete a list of entities in bulk identified by their GUIDs or unique attributes. */
  delete(
    options: EntityDeleteByGuidsParameters,
  ): StreamableMethod<EntityDeleteByGuids200Response | EntityDeleteByGuidsDefaultResponse>;
}

export interface EntityAddClassification {
  /** Associate a classification to multiple entities in bulk. */
  post(
    options: EntityAddClassificationParameters,
  ): StreamableMethod<EntityAddClassification204Response | EntityAddClassificationDefaultResponse>;
}

export interface EntityGetByGuid {
  /** Get complete definition of an entity given its GUID. */
  get(
    options?: EntityGetByGuidParameters,
  ): StreamableMethod<EntityGetByGuid200Response | EntityGetByGuidDefaultResponse>;
  /**
   * Update entity partially - create or update entity attribute identified by its GUID.
   * Supports only primitive attribute type and entity references.
   * It does not support updating complex types like arrays, and maps.
   * Null updates are not possible.
   */
  put(
    options: EntityPartialUpdateEntityAttributeByGuidParameters,
  ): StreamableMethod<
    | EntityPartialUpdateEntityAttributeByGuid200Response
    | EntityPartialUpdateEntityAttributeByGuidDefaultResponse
  >;
  /** Delete an entity identified by its GUID. */
  delete(
    options?: EntityDeleteByGuidParameters,
  ): StreamableMethod<EntityDeleteByGuid200Response | EntityDeleteByGuidDefaultResponse>;
}

export interface EntityGetClassification {
  /** List classifications for a given entity represented by a GUID. */
  get(
    options?: EntityGetClassificationParameters,
  ): StreamableMethod<EntityGetClassification200Response | EntityGetClassificationDefaultResponse>;
  /** Delete a given classification from an existing entity represented by a GUID. */
  delete(
    options?: EntityDeleteClassificationParameters,
  ): StreamableMethod<
    EntityDeleteClassification204Response | EntityDeleteClassificationDefaultResponse
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
   * In addition to the typeName path parameter, attribute key-value pair(s) can be provided in the following format:
   * attr:\<attrName>=<attrValue>.
   * NOTE: The attrName and attrValue should be unique across entities, eg. qualifiedName.
   * The REST request would look something like this:
   * GET /v2/entity/uniqueAttribute/type/aType?attr:aTypeAttribute=someValue.
   */
  get(
    options?: EntityGetByUniqueAttributesParameters,
  ): StreamableMethod<
    EntityGetByUniqueAttributes200Response | EntityGetByUniqueAttributesDefaultResponse
  >;
  /**
   * Update entity partially - Allow a subset of attributes to be updated on
   * an entity which is identified by its type and unique attribute  eg: Referenceable.qualifiedName.
   * Null updates are not possible.
   * In addition to the typeName path parameter, attribute key-value pair(s) can be provided in the following format:
   * attr:<attrName>=<attrValue>.
   * NOTE: The attrName and attrValue should be unique across entities, eg. qualifiedName.
   * The REST request would look something like this:
   * PUT /v2/entity/uniqueAttribute/type/aType?attr:aTypeAttribute=someValue.
   */
  put(
    options: EntityPartialUpdateEntityByUniqueAttributesParameters,
  ): StreamableMethod<
    | EntityPartialUpdateEntityByUniqueAttributes200Response
    | EntityPartialUpdateEntityByUniqueAttributesDefaultResponse
  >;
  /**
   * Delete an entity identified by its type and unique attributes.
   * In addition to the typeName path parameter, attribute key-value pair(s) can be provided in the following format:
   * attr:\<attrName>=\<attrValue>.
   * NOTE: The attrName and attrValue should be unique across entities, eg. qualifiedName.
   * The REST request would look something like this:
   * DELETE /v2/entity/uniqueAttribute/type/aType?attr:aTypeAttribute=someValue.
   */
  delete(
    options?: EntityDeleteByUniqueAttributeParameters,
  ): StreamableMethod<
    EntityDeleteByUniqueAttribute200Response | EntityDeleteByUniqueAttributeDefaultResponse
  >;
}

export interface EntityDeleteClassificationByUniqueAttribute {
  /** Delete a given classification from an entity identified by its type and unique attributes. */
  delete(
    options?: EntityDeleteClassificationByUniqueAttributeParameters,
  ): StreamableMethod<
    | EntityDeleteClassificationByUniqueAttribute204Response
    | EntityDeleteClassificationByUniqueAttributeDefaultResponse
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

export interface EntitySetClassifications {
  /** Set classifications on entities in bulk. */
  post(
    options: EntitySetClassificationsParameters,
  ): StreamableMethod<
    EntitySetClassifications200Response | EntitySetClassificationsDefaultResponse
  >;
}

export interface EntityGetEntitiesByUniqueAttributes {
  /**
   * Bulk API to retrieve list of entities identified by its unique attributes.
   *
   * In addition to the typeName path parameter, attribute key-value pair(s) can be provided in the following format
   *
   * typeName=\<typeName>&attr_1:\<attrName>=\<attrValue>&attr_2:\<attrName>=\<attrValue>&attr_3:\<attrName>=\<attrValue>
   *
   * NOTE: The attrName should be an unique attribute for the given entity-type
   *
   * The REST request would look something like this
   *
   * GET /v2/entity/bulk/uniqueAttribute/type/hive_db?attr_0:qualifiedName=db1@cl1&attr_2:qualifiedName=db2@cl1
   */
  get(
    options?: EntityGetEntitiesByUniqueAttributesParameters,
  ): StreamableMethod<
    | EntityGetEntitiesByUniqueAttributes200Response
    | EntityGetEntitiesByUniqueAttributesDefaultResponse
  >;
}

export interface EntityGetHeader {
  /** Get entity header given its GUID. */
  get(
    options?: EntityGetHeaderParameters,
  ): StreamableMethod<EntityGetHeader200Response | EntityGetHeaderDefaultResponse>;
}

export interface EntityDeleteBusinessMetadata {
  /** Remove business metadata from an entity. */
  delete(
    options?: EntityDeleteBusinessMetadataParameters,
  ): StreamableMethod<EntityDeleteBusinessMetadata204Response>;
  /** Add business metadata to an entity. */
  post(
    options?: EntityAddOrUpdateBusinessMetadataParameters,
  ): StreamableMethod<EntityAddOrUpdateBusinessMetadata204Response>;
}

export interface EntityDeleteBusinessMetadataAttributes {
  /** Delete business metadata attributes from an entity. */
  delete(
    options?: EntityDeleteBusinessMetadataAttributesParameters,
  ): StreamableMethod<EntityDeleteBusinessMetadataAttributes204Response>;
  /** Add or update business metadata attributes */
  post(
    options?: EntityAddOrUpdateBusinessMetadataAttributesParameters,
  ): StreamableMethod<EntityAddOrUpdateBusinessMetadataAttributes204Response>;
}

export interface EntityGetSampleBusinessMetadataTemplate {
  /** Get the sample Template for uploading/creating bulk BusinessMetaData */
  get(
    options?: EntityGetSampleBusinessMetadataTemplateParameters,
  ): StreamableMethod<
    | EntityGetSampleBusinessMetadataTemplate200Response
    | EntityGetSampleBusinessMetadataTemplate400Response
  >;
}

export interface EntityImportBusinessMetadata {
  /** Upload the file for creating Business Metadata in BULK */
  post(
    options?: EntityImportBusinessMetadataParameters,
  ): StreamableMethod<
    | EntityImportBusinessMetadata200Response
    | EntityImportBusinessMetadata400Response
    | EntityImportBusinessMetadata409Response
  >;
}

export interface EntityDeleteLabels {
  /** delete given labels to a given entity */
  delete(options?: EntityDeleteLabelsParameters): StreamableMethod<EntityDeleteLabels204Response>;
  /** Set labels to a given entity */
  post(options?: EntitySetLabelsParameters): StreamableMethod<EntitySetLabels204Response>;
  /** add given labels to a given entity */
  put(options?: EntityAddLabelParameters): StreamableMethod<EntityAddLabel204Response>;
}

export interface EntityDeleteLabelsByUniqueAttribute {
  /** Delete given labels to a given entity identified by its type and unique attributes, if labels is null/empty, no labels will be removed. If any labels in labels set are non-existing labels, they will be ignored, only existing labels will be removed. In addition to the typeName path parameter, attribute key-value pair(s) can be provided in the following format: attr:<attrName>=<attrValue>. NOTE: The attrName and attrValue should be unique across entities, eg. qualifiedName. The REST request would look something like this: DELETE /v2/entity/uniqueAttribute/type/aType?attr:aTypeAttribute=someValue. */
  delete(
    options?: EntityDeleteLabelsByUniqueAttributeParameters,
  ): StreamableMethod<EntityDeleteLabelsByUniqueAttribute204Response>;
  /** Set labels to a given entity identified by its type and unique attributes, if labels is null/empty, existing labels will all be removed. In addition to the typeName path parameter, attribute key-value pair(s) can be provided in the following format: attr:<attrName>=<attrValue>. NOTE: The attrName and attrValue should be unique across entities, eg. qualifiedName. The REST request would look something like this: POST /v2/entity/uniqueAttribute/type/aType?attr:aTypeAttribute=someValue. */
  post(
    options?: EntitySetLabelsByUniqueAttributeParameters,
  ): StreamableMethod<EntitySetLabelsByUniqueAttribute204Response>;
  /** Add given labels to a given entity identified by its type and unique attributes, if labels is null/empty, no labels will be added. In addition to the typeName path parameter, attribute key-value pair(s) can be provided in the following format: attr:<attrName>=<attrValue>. NOTE: The attrName and attrValue should be unique across entities, eg. qualifiedName. The REST request would look something like this: PUT /v2/entity/uniqueAttribute/type/aType?attr:aTypeAttribute=someValue. */
  put(
    options?: EntityAddLabelsByUniqueAttributeParameters,
  ): StreamableMethod<EntityAddLabelsByUniqueAttribute204Response>;
}

export interface GlossaryListGlossaries {
  /** Get all glossaries registered with Atlas. */
  get(
    options?: GlossaryListGlossariesParameters,
  ): StreamableMethod<GlossaryListGlossaries200Response | GlossaryListGlossariesDefaultResponse>;
  /** Create a glossary. */
  post(
    options: GlossaryCreateGlossaryParameters,
  ): StreamableMethod<GlossaryCreateGlossary200Response | GlossaryCreateGlossaryDefaultResponse>;
}

export interface GlossaryCreateGlossaryCategories {
  /** Create glossary category in bulk. */
  post(
    options: GlossaryCreateGlossaryCategoriesParameters,
  ): StreamableMethod<
    GlossaryCreateGlossaryCategories200Response | GlossaryCreateGlossaryCategoriesDefaultResponse
  >;
}

export interface GlossaryCreateGlossaryCategory {
  /** Create a glossary category. */
  post(
    options: GlossaryCreateGlossaryCategoryParameters,
  ): StreamableMethod<
    GlossaryCreateGlossaryCategory200Response | GlossaryCreateGlossaryCategoryDefaultResponse
  >;
}

export interface GlossaryGetGlossaryCategory {
  /** Get specific glossary category by its GUID. */
  get(
    options?: GlossaryGetGlossaryCategoryParameters,
  ): StreamableMethod<
    GlossaryGetGlossaryCategory200Response | GlossaryGetGlossaryCategoryDefaultResponse
  >;
  /** Update the given glossary category by its GUID. */
  put(
    options: GlossaryUpdateGlossaryCategoryParameters,
  ): StreamableMethod<
    GlossaryUpdateGlossaryCategory200Response | GlossaryUpdateGlossaryCategoryDefaultResponse
  >;
  /** Delete a glossary category. */
  delete(
    options?: GlossaryDeleteGlossaryCategoryParameters,
  ): StreamableMethod<
    GlossaryDeleteGlossaryCategory204Response | GlossaryDeleteGlossaryCategoryDefaultResponse
  >;
}

export interface GlossaryPartialUpdateGlossaryCategory {
  /** Update the glossary category partially. */
  put(
    options: GlossaryPartialUpdateGlossaryCategoryParameters,
  ): StreamableMethod<
    | GlossaryPartialUpdateGlossaryCategory200Response
    | GlossaryPartialUpdateGlossaryCategoryDefaultResponse
  >;
}

export interface GlossaryListRelatedCategories {
  /** Get all related categories (parent and children). Limit, offset, and sort parameters are currently not being enabled and won't work even they are passed. */
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

export interface GlossaryCreateGlossaryTerm {
  /** Create a glossary term. */
  post(
    options: GlossaryCreateGlossaryTermParameters,
  ): StreamableMethod<
    GlossaryCreateGlossaryTerm200Response | GlossaryCreateGlossaryTermDefaultResponse
  >;
}

export interface GlossaryGetGlossaryTerm {
  /** Get a specific glossary term by its GUID. */
  get(
    options?: GlossaryGetGlossaryTermParameters,
  ): StreamableMethod<GlossaryGetGlossaryTerm200Response | GlossaryGetGlossaryTermDefaultResponse>;
  /** Update the given glossary term by its GUID. */
  put(
    options: GlossaryUpdateGlossaryTermParameters,
  ): StreamableMethod<
    GlossaryUpdateGlossaryTerm200Response | GlossaryUpdateGlossaryTermDefaultResponse
  >;
  /** Delete a glossary term. */
  delete(
    options?: GlossaryDeleteGlossaryTermParameters,
  ): StreamableMethod<
    GlossaryDeleteGlossaryTerm204Response | GlossaryDeleteGlossaryTermDefaultResponse
  >;
}

export interface GlossaryPartialUpdateGlossaryTerm {
  /** Update the glossary term partially. */
  put(
    options: GlossaryPartialUpdateGlossaryTermParameters,
  ): StreamableMethod<
    GlossaryPartialUpdateGlossaryTerm200Response | GlossaryPartialUpdateGlossaryTermDefaultResponse
  >;
}

export interface GlossaryCreateGlossaryTerms {
  /** Create glossary terms in bulk. */
  post(
    options: GlossaryCreateGlossaryTermsParameters,
  ): StreamableMethod<
    GlossaryCreateGlossaryTerms200Response | GlossaryCreateGlossaryTermsDefaultResponse
  >;
}

export interface GlossaryGetEntitiesAssignedWithTerm {
  /** Get all related objects assigned with the specified term. */
  get(
    options?: GlossaryGetEntitiesAssignedWithTermParameters,
  ): StreamableMethod<
    | GlossaryGetEntitiesAssignedWithTerm200Response
    | GlossaryGetEntitiesAssignedWithTermDefaultResponse
  >;
  /** Assign the given term to the provided list of related objects. */
  post(
    options: GlossaryAssignTermToEntitiesParameters,
  ): StreamableMethod<
    GlossaryAssignTermToEntities204Response | GlossaryAssignTermToEntitiesDefaultResponse
  >;
  /** Delete the term assignment for the given list of related objects. */
  put(
    options: GlossaryRemoveTermAssignmentFromEntitiesParameters,
  ): StreamableMethod<
    | GlossaryRemoveTermAssignmentFromEntities204Response
    | GlossaryRemoveTermAssignmentFromEntitiesDefaultResponse
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
  /** Get all related terms for a specific term by its GUID. Limit, offset, and sort parameters are currently not being enabled and won't work even they are passed. */
  get(
    options?: GlossaryListRelatedTermsParameters,
  ): StreamableMethod<
    GlossaryListRelatedTerms200Response | GlossaryListRelatedTermsDefaultResponse
  >;
}

export interface GlossaryGetGlossary {
  /** Get a specific Glossary by its GUID. */
  get(
    options?: GlossaryGetGlossaryParameters,
  ): StreamableMethod<GlossaryGetGlossary200Response | GlossaryGetGlossaryDefaultResponse>;
  /** Update the given glossary. */
  put(
    options: GlossaryUpdateGlossaryParameters,
  ): StreamableMethod<GlossaryUpdateGlossary200Response | GlossaryUpdateGlossaryDefaultResponse>;
  /** Delete a glossary. */
  delete(
    options?: GlossaryDeleteGlossaryParameters,
  ): StreamableMethod<GlossaryDeleteGlossary204Response | GlossaryDeleteGlossaryDefaultResponse>;
}

export interface GlossaryListGlossaryCategories {
  /** Get the categories belonging to a specific glossary. */
  get(
    options?: GlossaryListGlossaryCategoriesParameters,
  ): StreamableMethod<
    GlossaryListGlossaryCategories200Response | GlossaryListGlossaryCategoriesDefaultResponse
  >;
}

export interface GlossaryListGlossaryCategoriesHeaders {
  /** Get the category headers belonging to a specific glossary. */
  get(
    options?: GlossaryListGlossaryCategoriesHeadersParameters,
  ): StreamableMethod<
    | GlossaryListGlossaryCategoriesHeaders200Response
    | GlossaryListGlossaryCategoriesHeadersDefaultResponse
  >;
}

export interface GlossaryGetDetailedGlossary {
  /** Get a specific glossary with detailed information. */
  get(
    options?: GlossaryGetDetailedGlossaryParameters,
  ): StreamableMethod<
    GlossaryGetDetailedGlossary200Response | GlossaryGetDetailedGlossaryDefaultResponse
  >;
}

export interface GlossaryPartialUpdateGlossary {
  /** Update the glossary partially. Some properties such as qualifiedName are not allowed to be updated. */
  put(
    options: GlossaryPartialUpdateGlossaryParameters,
  ): StreamableMethod<
    GlossaryPartialUpdateGlossary200Response | GlossaryPartialUpdateGlossaryDefaultResponse
  >;
}

export interface GlossaryListGlossaryTerms {
  /** Get terms belonging to a specific glossary. */
  get(
    options?: GlossaryListGlossaryTermsParameters,
  ): StreamableMethod<
    GlossaryListGlossaryTerms200Response | GlossaryListGlossaryTermsDefaultResponse
  >;
}

export interface GlossaryListGlossaryTermHeaders {
  /** Get term headers belonging to a specific glossary. */
  get(
    options?: GlossaryListGlossaryTermHeadersParameters,
  ): StreamableMethod<
    GlossaryListGlossaryTermHeaders200Response | GlossaryListGlossaryTermHeadersDefaultResponse
  >;
}

export interface GlossaryImportGlossaryTermsViaCsv {
  /** Import Glossary Terms from local csv file */
  post(
    options: GlossaryImportGlossaryTermsViaCsvParameters,
  ): StreamableMethod<
    GlossaryImportGlossaryTermsViaCsv202Response | GlossaryImportGlossaryTermsViaCsvDefaultResponse
  >;
}

export interface GlossaryImportGlossaryTermsViaCsvByGlossaryName {
  /** Import Glossary Terms from local csv file by glossaryName */
  post(
    options: GlossaryImportGlossaryTermsViaCsvByGlossaryNameParameters,
  ): StreamableMethod<
    | GlossaryImportGlossaryTermsViaCsvByGlossaryName202Response
    | GlossaryImportGlossaryTermsViaCsvByGlossaryNameDefaultResponse
  >;
}

export interface GlossaryGetImportCsvOperationStatus {
  /** Get the status of import csv operation */
  get(
    options?: GlossaryGetImportCsvOperationStatusParameters,
  ): StreamableMethod<
    | GlossaryGetImportCsvOperationStatus200Response
    | GlossaryGetImportCsvOperationStatusDefaultResponse
  >;
}

export interface GlossaryExportGlossaryTermsAsCsv {
  /** Export Glossary Terms as csv file */
  post(
    options: GlossaryExportGlossaryTermsAsCsvParameters,
  ): StreamableMethod<
    GlossaryExportGlossaryTermsAsCsv200Response | GlossaryExportGlossaryTermsAsCsvDefaultResponse
  >;
}

export interface GlossaryListTermsByGlossaryName {
  /** Get terms by glossary name. */
  get(
    options?: GlossaryListTermsByGlossaryNameParameters,
  ): StreamableMethod<
    GlossaryListTermsByGlossaryName200Response | GlossaryListTermsByGlossaryNameDefaultResponse
  >;
}

export interface DiscoveryQuery {
  /** Gets data using search. */
  post(
    options: DiscoveryQueryParameters,
  ): StreamableMethod<DiscoveryQuery200Response | DiscoveryQueryDefaultResponse>;
}

export interface DiscoverySuggest {
  /** Get search suggestions by query criteria. */
  post(
    options: DiscoverySuggestParameters,
  ): StreamableMethod<DiscoverySuggest200Response | DiscoverySuggestDefaultResponse>;
}

export interface DiscoveryBrowse {
  /** Browse entities by path or entity type. */
  post(
    options: DiscoveryBrowseParameters,
  ): StreamableMethod<DiscoveryBrowse200Response | DiscoveryBrowseDefaultResponse>;
}

export interface DiscoveryAutoComplete {
  /** Get auto complete options. */
  post(
    options: DiscoveryAutoCompleteParameters,
  ): StreamableMethod<DiscoveryAutoComplete200Response | DiscoveryAutoCompleteDefaultResponse>;
}

export interface LineageGetLineageGraph {
  /** Get lineage info of the entity specified by GUID. */
  get(
    options: LineageGetLineageGraphParameters,
  ): StreamableMethod<LineageGetLineageGraph200Response | LineageGetLineageGraphDefaultResponse>;
}

export interface LineageNextPageLineage {
  /** Return immediate next page lineage info about entity with pagination */
  get(
    options: LineageNextPageLineageParameters,
  ): StreamableMethod<LineageNextPageLineage200Response | LineageNextPageLineageDefaultResponse>;
}

export interface LineageGetLineageByUniqueAttribute {
  /**
   * Returns lineage info about entity.
   *
   * In addition to the typeName path parameter, attribute key-value pair(s) can be provided in the following format
   *
   * attr:[attrName]=[attrValue]
   *
   * NOTE: The attrName and attrValue should be unique across entities, eg. qualifiedName
   */
  get(
    options: LineageGetLineageByUniqueAttributeParameters,
  ): StreamableMethod<
    | LineageGetLineageByUniqueAttribute200Response
    | LineageGetLineageByUniqueAttribute400Response
    | LineageGetLineageByUniqueAttribute404Response
  >;
}

export interface RelationshipCreate {
  /** Create a new relationship between entities. */
  post(
    options: RelationshipCreateParameters,
  ): StreamableMethod<RelationshipCreate200Response | RelationshipCreateDefaultResponse>;
  /** Update an existing relationship between entities. */
  put(
    options: RelationshipUpdateParameters,
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
  ): StreamableMethod<RelationshipDelete204Response | RelationshipDeleteDefaultResponse>;
}

export interface TypesGetBusinessMetadataDefByGuid {
  /** Get the businessMetadata definition for the given guid */
  get(
    options?: TypesGetBusinessMetadataDefByGuidParameters,
  ): StreamableMethod<
    TypesGetBusinessMetadataDefByGuid200Response | TypesGetBusinessMetadataDefByGuid404Response
  >;
}

export interface TypesGetBusinessMetadataDefByName {
  /** Get the businessMetadata definition by it's name (unique) */
  get(
    options?: TypesGetBusinessMetadataDefByNameParameters,
  ): StreamableMethod<
    TypesGetBusinessMetadataDefByName200Response | TypesGetBusinessMetadataDefByName404Response
  >;
}

export interface TypesGetClassificationDefByGuid {
  /** Get the classification definition for the given GUID. */
  get(
    options?: TypesGetClassificationDefByGuidParameters,
  ): StreamableMethod<
    TypesGetClassificationDefByGuid200Response | TypesGetClassificationDefByGuidDefaultResponse
  >;
}

export interface TypesGetClassificationDefByName {
  /** Get the classification definition by its name (unique). */
  get(
    options?: TypesGetClassificationDefByNameParameters,
  ): StreamableMethod<
    TypesGetClassificationDefByName200Response | TypesGetClassificationDefByNameDefaultResponse
  >;
}

export interface TypesGetEntityDefinitionByGuid {
  /** Get the Entity definition for the given GUID. */
  get(
    options?: TypesGetEntityDefinitionByGuidParameters,
  ): StreamableMethod<
    TypesGetEntityDefinitionByGuid200Response | TypesGetEntityDefinitionByGuidDefaultResponse
  >;
}

export interface TypesGetEntityDefinitionByName {
  /** Get the entity definition by its name (unique). */
  get(
    options?: TypesGetEntityDefinitionByNameParameters,
  ): StreamableMethod<
    TypesGetEntityDefinitionByName200Response | TypesGetEntityDefinitionByNameDefaultResponse
  >;
}

export interface TypesGetEnumDefByGuid {
  /** Get the enum definition for the given GUID. */
  get(
    options?: TypesGetEnumDefByGuidParameters,
  ): StreamableMethod<TypesGetEnumDefByGuid200Response | TypesGetEnumDefByGuidDefaultResponse>;
}

export interface TypesGetEnumDefByName {
  /** Get the enum definition by its name (unique). */
  get(
    options?: TypesGetEnumDefByNameParameters,
  ): StreamableMethod<TypesGetEnumDefByName200Response | TypesGetEnumDefByNameDefaultResponse>;
}

export interface TypesGetRelationshipDefByGuid {
  /** Get the relationship definition for the given GUID. */
  get(
    options?: TypesGetRelationshipDefByGuidParameters,
  ): StreamableMethod<
    TypesGetRelationshipDefByGuid200Response | TypesGetRelationshipDefByGuidDefaultResponse
  >;
}

export interface TypesGetRelationshipDefByName {
  /** Get the relationship definition by its name (unique). */
  get(
    options?: TypesGetRelationshipDefByNameParameters,
  ): StreamableMethod<
    TypesGetRelationshipDefByName200Response | TypesGetRelationshipDefByNameDefaultResponse
  >;
}

export interface TypesGetStructDefByGuid {
  /** Get the struct definition for the given GUID. */
  get(
    options?: TypesGetStructDefByGuidParameters,
  ): StreamableMethod<TypesGetStructDefByGuid200Response | TypesGetStructDefByGuidDefaultResponse>;
}

export interface TypesGetStructDefByName {
  /** Get the struct definition by its name (unique). */
  get(
    options?: TypesGetStructDefByNameParameters,
  ): StreamableMethod<TypesGetStructDefByName200Response | TypesGetStructDefByNameDefaultResponse>;
}

export interface TypesGetTypeDefinitionByGuid {
  /** Get the type definition for the given GUID. */
  get(
    options?: TypesGetTypeDefinitionByGuidParameters,
  ): StreamableMethod<
    TypesGetTypeDefinitionByGuid200Response | TypesGetTypeDefinitionByGuidDefaultResponse
  >;
}

export interface TypesGetTypeDefinitionByName {
  /** Get the type definition by its name (unique). */
  get(
    options?: TypesGetTypeDefinitionByNameParameters,
  ): StreamableMethod<
    TypesGetTypeDefinitionByName200Response | TypesGetTypeDefinitionByNameDefaultResponse
  >;
  /** Delete API for type identified by its name. */
  delete(
    options?: TypesDeleteTypeByNameParameters,
  ): StreamableMethod<TypesDeleteTypeByName204Response | TypesDeleteTypeByNameDefaultResponse>;
}

export interface TypesGetAllTypeDefinitions {
  /** Get all type definitions in Atlas in bulk. */
  get(
    options?: TypesGetAllTypeDefinitionsParameters,
  ): StreamableMethod<
    TypesGetAllTypeDefinitions200Response | TypesGetAllTypeDefinitionsDefaultResponse
  >;
  /**
   * Create all atlas type definitions in bulk, only new definitions will be created.
   * Any changes to the existing definitions will be discarded.
   */
  post(
    options: TypesCreateTypeDefinitionsParameters,
  ): StreamableMethod<
    TypesCreateTypeDefinitions200Response | TypesCreateTypeDefinitionsDefaultResponse
  >;
  /** Update all types in bulk, changes detected in the type definitions would be persisted. */
  put(
    options: TypesUpdateAtlasTypeDefinitionsParameters,
  ): StreamableMethod<
    TypesUpdateAtlasTypeDefinitions200Response | TypesUpdateAtlasTypeDefinitionsDefaultResponse
  >;
  /** Delete API for all types in bulk. */
  delete(
    options: TypesDeleteTypeDefinitionsParameters,
  ): StreamableMethod<
    TypesDeleteTypeDefinitions204Response | TypesDeleteTypeDefinitionsDefaultResponse
  >;
}

export interface TypesListTypeDefinitionHeaders {
  /** List all type definitions returned as a list of minimal information header. */
  get(
    options?: TypesListTypeDefinitionHeadersParameters,
  ): StreamableMethod<
    TypesListTypeDefinitionHeaders200Response | TypesListTypeDefinitionHeadersDefaultResponse
  >;
}

export interface TypesGetTermTemplateDefByGuid {
  /** Get the term template definition for the given GUID. */
  get(
    options?: TypesGetTermTemplateDefByGuidParameters,
  ): StreamableMethod<
    TypesGetTermTemplateDefByGuid200Response | TypesGetTermTemplateDefByGuidDefaultResponse
  >;
}

export interface TypesGetTermTemplateDefByName {
  /** Get the term template definition by its name (unique). */
  get(
    options?: TypesGetTermTemplateDefByNameParameters,
  ): StreamableMethod<
    TypesGetTermTemplateDefByName200Response | TypesGetTermTemplateDefByNameDefaultResponse
  >;
}

export interface CollectionCreateOrUpdate {
  /**
   * Creates or updates an entity to a collection.
   * Existing entity is matched using its unique guid if supplied or by its unique attributes eg: qualifiedName.
   * Map and array of collections are not well supported. E.g., array<array<int>>, array<map<string, int>>.
   */
  post(
    options: CollectionCreateOrUpdateParameters,
  ): StreamableMethod<
    CollectionCreateOrUpdate200Response | CollectionCreateOrUpdateDefaultResponse
  >;
}

export interface CollectionCreateOrUpdateBulk {
  /**
   * Creates or updates entities in bulk to a collection.
   * Existing entity is matched using its unique guid if supplied or by its unique attributes eg: qualifiedName.
   * Map and array of collections are not well supported. E.g., array<array<int>>, array<map<string, int>>.
   */
  post(
    options: CollectionCreateOrUpdateBulkParameters,
  ): StreamableMethod<
    CollectionCreateOrUpdateBulk200Response | CollectionCreateOrUpdateBulkDefaultResponse
  >;
}

export interface CollectionMoveEntitiesToCollection {
  /** Move existing entities to the target collection. */
  post(
    options: CollectionMoveEntitiesToCollectionParameters,
  ): StreamableMethod<
    | CollectionMoveEntitiesToCollection200Response
    | CollectionMoveEntitiesToCollectionDefaultResponse
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
  (path: "/atlas/v2/entity/guid/{guid}", guid: string): EntityGetByGuid;
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
  ): EntityDeleteClassificationByUniqueAttribute;
  /** Resource for '/atlas/v2/entity/uniqueAttribute/type/\{typeName\}/classifications' has methods for the following verbs: post, put */
  (
    path: "/atlas/v2/entity/uniqueAttribute/type/{typeName}/classifications",
    typeName: string,
  ): EntityAddClassificationsByUniqueAttribute;
  /** Resource for '/atlas/v2/entity/bulk/setClassifications' has methods for the following verbs: post */
  (path: "/atlas/v2/entity/bulk/setClassifications"): EntitySetClassifications;
  /** Resource for '/atlas/v2/entity/bulk/uniqueAttribute/type/\{typeName\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/entity/bulk/uniqueAttribute/type/{typeName}",
    typeName: string,
  ): EntityGetEntitiesByUniqueAttributes;
  /** Resource for '/atlas/v2/entity/guid/\{guid\}/header' has methods for the following verbs: get */
  (path: "/atlas/v2/entity/guid/{guid}/header", guid: string): EntityGetHeader;
  /** Resource for '/atlas/v2/entity/guid/\{guid\}/businessmetadata' has methods for the following verbs: delete, post */
  (
    path: "/atlas/v2/entity/guid/{guid}/businessmetadata",
    guid: string,
  ): EntityDeleteBusinessMetadata;
  /** Resource for '/atlas/v2/entity/guid/\{guid\}/businessmetadata/\{bmName\}' has methods for the following verbs: delete, post */
  (
    path: "/atlas/v2/entity/guid/{guid}/businessmetadata/{bmName}",
    guid: string,
    bmName: string,
  ): EntityDeleteBusinessMetadataAttributes;
  /** Resource for '/atlas/v2/entity/businessmetadata/import/template' has methods for the following verbs: get */
  (
    path: "/atlas/v2/entity/businessmetadata/import/template",
  ): EntityGetSampleBusinessMetadataTemplate;
  /** Resource for '/atlas/v2/entity/businessmetadata/import' has methods for the following verbs: post */
  (path: "/atlas/v2/entity/businessmetadata/import"): EntityImportBusinessMetadata;
  /** Resource for '/atlas/v2/entity/guid/\{guid\}/labels' has methods for the following verbs: delete, post, put */
  (path: "/atlas/v2/entity/guid/{guid}/labels", guid: string): EntityDeleteLabels;
  /** Resource for '/atlas/v2/entity/uniqueAttribute/type/\{typeName\}/labels' has methods for the following verbs: delete, post, put */
  (
    path: "/atlas/v2/entity/uniqueAttribute/type/{typeName}/labels",
    typeName: string,
  ): EntityDeleteLabelsByUniqueAttribute;
  /** Resource for '/atlas/v2/glossary' has methods for the following verbs: get, post */
  (path: "/atlas/v2/glossary"): GlossaryListGlossaries;
  /** Resource for '/atlas/v2/glossary/categories' has methods for the following verbs: post */
  (path: "/atlas/v2/glossary/categories"): GlossaryCreateGlossaryCategories;
  /** Resource for '/atlas/v2/glossary/category' has methods for the following verbs: post */
  (path: "/atlas/v2/glossary/category"): GlossaryCreateGlossaryCategory;
  /** Resource for '/atlas/v2/glossary/category/\{categoryGuid\}' has methods for the following verbs: get, put, delete */
  (
    path: "/atlas/v2/glossary/category/{categoryGuid}",
    categoryGuid: string,
  ): GlossaryGetGlossaryCategory;
  /** Resource for '/atlas/v2/glossary/category/\{categoryGuid\}/partial' has methods for the following verbs: put */
  (
    path: "/atlas/v2/glossary/category/{categoryGuid}/partial",
    categoryGuid: string,
  ): GlossaryPartialUpdateGlossaryCategory;
  /** Resource for '/atlas/v2/glossary/category/\{categoryGuid\}/related' has methods for the following verbs: get */
  (
    path: "/atlas/v2/glossary/category/{categoryGuid}/related",
    categoryGuid: string,
  ): GlossaryListRelatedCategories;
  /** Resource for '/atlas/v2/glossary/category/\{categoryGuid\}/terms' has methods for the following verbs: get */
  (
    path: "/atlas/v2/glossary/category/{categoryGuid}/terms",
    categoryGuid: string,
  ): GlossaryListCategoryTerms;
  /** Resource for '/atlas/v2/glossary/term' has methods for the following verbs: post */
  (path: "/atlas/v2/glossary/term"): GlossaryCreateGlossaryTerm;
  /** Resource for '/atlas/v2/glossary/term/\{termGuid\}' has methods for the following verbs: get, put, delete */
  (path: "/atlas/v2/glossary/term/{termGuid}", termGuid: string): GlossaryGetGlossaryTerm;
  /** Resource for '/atlas/v2/glossary/term/\{termGuid\}/partial' has methods for the following verbs: put */
  (
    path: "/atlas/v2/glossary/term/{termGuid}/partial",
    termGuid: string,
  ): GlossaryPartialUpdateGlossaryTerm;
  /** Resource for '/atlas/v2/glossary/terms' has methods for the following verbs: post */
  (path: "/atlas/v2/glossary/terms"): GlossaryCreateGlossaryTerms;
  /** Resource for '/atlas/v2/glossary/terms/\{termGuid\}/assignedEntities' has methods for the following verbs: get, post, put, delete */
  (
    path: "/atlas/v2/glossary/terms/{termGuid}/assignedEntities",
    termGuid: string,
  ): GlossaryGetEntitiesAssignedWithTerm;
  /** Resource for '/atlas/v2/glossary/terms/\{termGuid\}/related' has methods for the following verbs: get */
  (path: "/atlas/v2/glossary/terms/{termGuid}/related", termGuid: string): GlossaryListRelatedTerms;
  /** Resource for '/atlas/v2/glossary/\{glossaryGuid\}' has methods for the following verbs: get, put, delete */
  (path: "/atlas/v2/glossary/{glossaryGuid}", glossaryGuid: string): GlossaryGetGlossary;
  /** Resource for '/atlas/v2/glossary/\{glossaryGuid\}/categories' has methods for the following verbs: get */
  (
    path: "/atlas/v2/glossary/{glossaryGuid}/categories",
    glossaryGuid: string,
  ): GlossaryListGlossaryCategories;
  /** Resource for '/atlas/v2/glossary/\{glossaryGuid\}/categories/headers' has methods for the following verbs: get */
  (
    path: "/atlas/v2/glossary/{glossaryGuid}/categories/headers",
    glossaryGuid: string,
  ): GlossaryListGlossaryCategoriesHeaders;
  /** Resource for '/atlas/v2/glossary/\{glossaryGuid\}/detailed' has methods for the following verbs: get */
  (
    path: "/atlas/v2/glossary/{glossaryGuid}/detailed",
    glossaryGuid: string,
  ): GlossaryGetDetailedGlossary;
  /** Resource for '/atlas/v2/glossary/\{glossaryGuid\}/partial' has methods for the following verbs: put */
  (
    path: "/atlas/v2/glossary/{glossaryGuid}/partial",
    glossaryGuid: string,
  ): GlossaryPartialUpdateGlossary;
  /** Resource for '/atlas/v2/glossary/\{glossaryGuid\}/terms' has methods for the following verbs: get */
  (
    path: "/atlas/v2/glossary/{glossaryGuid}/terms",
    glossaryGuid: string,
  ): GlossaryListGlossaryTerms;
  /** Resource for '/atlas/v2/glossary/\{glossaryGuid\}/terms/headers' has methods for the following verbs: get */
  (
    path: "/atlas/v2/glossary/{glossaryGuid}/terms/headers",
    glossaryGuid: string,
  ): GlossaryListGlossaryTermHeaders;
  /** Resource for '/glossary/\{glossaryGuid\}/terms/import' has methods for the following verbs: post */
  (
    path: "/glossary/{glossaryGuid}/terms/import",
    glossaryGuid: string,
  ): GlossaryImportGlossaryTermsViaCsv;
  /** Resource for '/glossary/name/\{glossaryName\}/terms/import' has methods for the following verbs: post */
  (
    path: "/glossary/name/{glossaryName}/terms/import",
    glossaryName: string,
  ): GlossaryImportGlossaryTermsViaCsvByGlossaryName;
  /** Resource for '/glossary/terms/import/\{operationGuid\}' has methods for the following verbs: get */
  (
    path: "/glossary/terms/import/{operationGuid}",
    operationGuid: string,
  ): GlossaryGetImportCsvOperationStatus;
  /** Resource for '/glossary/\{glossaryGuid\}/terms/export' has methods for the following verbs: post */
  (
    path: "/glossary/{glossaryGuid}/terms/export",
    glossaryGuid: string,
  ): GlossaryExportGlossaryTermsAsCsv;
  /** Resource for '/glossary/name/\{glossaryName\}/terms' has methods for the following verbs: get */
  (
    path: "/glossary/name/{glossaryName}/terms",
    glossaryName: string,
  ): GlossaryListTermsByGlossaryName;
  /** Resource for '/search/query' has methods for the following verbs: post */
  (path: "/search/query"): DiscoveryQuery;
  /** Resource for '/search/suggest' has methods for the following verbs: post */
  (path: "/search/suggest"): DiscoverySuggest;
  /** Resource for '/browse' has methods for the following verbs: post */
  (path: "/browse"): DiscoveryBrowse;
  /** Resource for '/search/autocomplete' has methods for the following verbs: post */
  (path: "/search/autocomplete"): DiscoveryAutoComplete;
  /** Resource for '/atlas/v2/lineage/\{guid\}' has methods for the following verbs: get */
  (path: "/atlas/v2/lineage/{guid}", guid: string): LineageGetLineageGraph;
  /** Resource for '/lineage/\{guid\}/next/' has methods for the following verbs: get */
  (path: "/lineage/{guid}/next/", guid: string): LineageNextPageLineage;
  /** Resource for '/atlas/v2/lineage/uniqueAttribute/type/\{typeName\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/lineage/uniqueAttribute/type/{typeName}",
    typeName: string,
  ): LineageGetLineageByUniqueAttribute;
  /** Resource for '/atlas/v2/relationship' has methods for the following verbs: post, put */
  (path: "/atlas/v2/relationship"): RelationshipCreate;
  /** Resource for '/atlas/v2/relationship/guid/\{guid\}' has methods for the following verbs: get, delete */
  (path: "/atlas/v2/relationship/guid/{guid}", guid: string): RelationshipGet;
  /** Resource for '/atlas/v2/types/businessmetadatadef/guid/\{guid\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/types/businessmetadatadef/guid/{guid}",
    guid: string,
  ): TypesGetBusinessMetadataDefByGuid;
  /** Resource for '/atlas/v2/types/businessmetadatadef/name/\{name\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/types/businessmetadatadef/name/{name}",
    name: string,
  ): TypesGetBusinessMetadataDefByName;
  /** Resource for '/atlas/v2/types/classificationdef/guid/\{guid\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/types/classificationdef/guid/{guid}",
    guid: string,
  ): TypesGetClassificationDefByGuid;
  /** Resource for '/atlas/v2/types/classificationdef/name/\{name\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/types/classificationdef/name/{name}",
    name: string,
  ): TypesGetClassificationDefByName;
  /** Resource for '/atlas/v2/types/entitydef/guid/\{guid\}' has methods for the following verbs: get */
  (path: "/atlas/v2/types/entitydef/guid/{guid}", guid: string): TypesGetEntityDefinitionByGuid;
  /** Resource for '/atlas/v2/types/entitydef/name/\{name\}' has methods for the following verbs: get */
  (path: "/atlas/v2/types/entitydef/name/{name}", name: string): TypesGetEntityDefinitionByName;
  /** Resource for '/atlas/v2/types/enumdef/guid/\{guid\}' has methods for the following verbs: get */
  (path: "/atlas/v2/types/enumdef/guid/{guid}", guid: string): TypesGetEnumDefByGuid;
  /** Resource for '/atlas/v2/types/enumdef/name/\{name\}' has methods for the following verbs: get */
  (path: "/atlas/v2/types/enumdef/name/{name}", name: string): TypesGetEnumDefByName;
  /** Resource for '/atlas/v2/types/relationshipdef/guid/\{guid\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/types/relationshipdef/guid/{guid}",
    guid: string,
  ): TypesGetRelationshipDefByGuid;
  /** Resource for '/atlas/v2/types/relationshipdef/name/\{name\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/types/relationshipdef/name/{name}",
    name: string,
  ): TypesGetRelationshipDefByName;
  /** Resource for '/atlas/v2/types/structdef/guid/\{guid\}' has methods for the following verbs: get */
  (path: "/atlas/v2/types/structdef/guid/{guid}", guid: string): TypesGetStructDefByGuid;
  /** Resource for '/atlas/v2/types/structdef/name/\{name\}' has methods for the following verbs: get */
  (path: "/atlas/v2/types/structdef/name/{name}", name: string): TypesGetStructDefByName;
  /** Resource for '/atlas/v2/types/typedef/guid/\{guid\}' has methods for the following verbs: get */
  (path: "/atlas/v2/types/typedef/guid/{guid}", guid: string): TypesGetTypeDefinitionByGuid;
  /** Resource for '/atlas/v2/types/typedef/name/\{name\}' has methods for the following verbs: get, delete */
  (path: "/atlas/v2/types/typedef/name/{name}", name: string): TypesGetTypeDefinitionByName;
  /** Resource for '/atlas/v2/types/typedefs' has methods for the following verbs: get, post, put, delete */
  (path: "/atlas/v2/types/typedefs"): TypesGetAllTypeDefinitions;
  /** Resource for '/atlas/v2/types/typedefs/headers' has methods for the following verbs: get */
  (path: "/atlas/v2/types/typedefs/headers"): TypesListTypeDefinitionHeaders;
  /** Resource for '/types/termtemplatedef/guid/\{guid\}' has methods for the following verbs: get */
  (path: "/types/termtemplatedef/guid/{guid}", guid: string): TypesGetTermTemplateDefByGuid;
  /** Resource for '/types/termtemplatedef/name/\{name\}' has methods for the following verbs: get */
  (path: "/types/termtemplatedef/name/{name}", name: string): TypesGetTermTemplateDefByName;
  /** Resource for '/collections/\{collection\}/entity' has methods for the following verbs: post */
  (path: "/collections/{collection}/entity", collection: string): CollectionCreateOrUpdate;
  /** Resource for '/collections/\{collection\}/entity/bulk' has methods for the following verbs: post */
  (path: "/collections/{collection}/entity/bulk", collection: string): CollectionCreateOrUpdateBulk;
  /** Resource for '/collections/\{collection\}/entity/moveHere' has methods for the following verbs: post */
  (
    path: "/collections/{collection}/entity/moveHere",
    collection: string,
  ): CollectionMoveEntitiesToCollection;
}

export type PurviewCatalogClient = Client & {
  path: Routes;
};
