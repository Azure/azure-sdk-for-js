// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
  RelationshipCreateParameters,
  RelationshipUpdateParameters,
  RelationshipGetParameters,
  RelationshipDeleteParameters,
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
  EntityCreateOrUpdatedefaultResponse,
  EntityListByGuids200Response,
  EntityListByGuidsdefaultResponse,
  EntityCreateOrUpdateEntities200Response,
  EntityCreateOrUpdateEntitiesdefaultResponse,
  EntityDeleteByGuids200Response,
  EntityDeleteByGuidsdefaultResponse,
  EntityAddClassification204Response,
  EntityAddClassificationdefaultResponse,
  EntityGetByGuid200Response,
  EntityGetByGuiddefaultResponse,
  EntityPartialUpdateEntityAttributeByGuid200Response,
  EntityPartialUpdateEntityAttributeByGuiddefaultResponse,
  EntityDeleteByGuid200Response,
  EntityDeleteByGuiddefaultResponse,
  EntityGetClassification200Response,
  EntityGetClassificationdefaultResponse,
  EntityDeleteClassification204Response,
  EntityDeleteClassificationdefaultResponse,
  EntityGetClassifications200Response,
  EntityGetClassificationsdefaultResponse,
  EntityAddClassifications204Response,
  EntityAddClassificationsdefaultResponse,
  EntityUpdateClassifications204Response,
  EntityUpdateClassificationsdefaultResponse,
  EntityGetByUniqueAttributes200Response,
  EntityGetByUniqueAttributesdefaultResponse,
  EntityPartialUpdateEntityByUniqueAttributes200Response,
  EntityPartialUpdateEntityByUniqueAttributesdefaultResponse,
  EntityDeleteByUniqueAttribute200Response,
  EntityDeleteByUniqueAttributedefaultResponse,
  EntityDeleteClassificationByUniqueAttribute204Response,
  EntityDeleteClassificationByUniqueAttributedefaultResponse,
  EntityAddClassificationsByUniqueAttribute204Response,
  EntityAddClassificationsByUniqueAttributedefaultResponse,
  EntityUpdateClassificationsByUniqueAttribute204Response,
  EntityUpdateClassificationsByUniqueAttributedefaultResponse,
  EntitySetClassifications200Response,
  EntitySetClassificationsdefaultResponse,
  EntityGetEntitiesByUniqueAttributes200Response,
  EntityGetEntitiesByUniqueAttributesdefaultResponse,
  EntityGetHeader200Response,
  EntityGetHeaderdefaultResponse,
  GlossaryListGlossaries200Response,
  GlossaryListGlossariesdefaultResponse,
  GlossaryCreateGlossary200Response,
  GlossaryCreateGlossarydefaultResponse,
  GlossaryCreateGlossaryCategories200Response,
  GlossaryCreateGlossaryCategoriesdefaultResponse,
  GlossaryCreateGlossaryCategory200Response,
  GlossaryCreateGlossaryCategorydefaultResponse,
  GlossaryGetGlossaryCategory200Response,
  GlossaryGetGlossaryCategorydefaultResponse,
  GlossaryUpdateGlossaryCategory200Response,
  GlossaryUpdateGlossaryCategorydefaultResponse,
  GlossaryDeleteGlossaryCategory204Response,
  GlossaryDeleteGlossaryCategorydefaultResponse,
  GlossaryPartialUpdateGlossaryCategory200Response,
  GlossaryPartialUpdateGlossaryCategorydefaultResponse,
  GlossaryListRelatedCategories200Response,
  GlossaryListRelatedCategoriesdefaultResponse,
  GlossaryListCategoryTerms200Response,
  GlossaryListCategoryTermsdefaultResponse,
  GlossaryCreateGlossaryTerm200Response,
  GlossaryCreateGlossaryTermdefaultResponse,
  GlossaryGetGlossaryTerm200Response,
  GlossaryGetGlossaryTermdefaultResponse,
  GlossaryUpdateGlossaryTerm200Response,
  GlossaryUpdateGlossaryTermdefaultResponse,
  GlossaryDeleteGlossaryTerm204Response,
  GlossaryDeleteGlossaryTermdefaultResponse,
  GlossaryPartialUpdateGlossaryTerm200Response,
  GlossaryPartialUpdateGlossaryTermdefaultResponse,
  GlossaryCreateGlossaryTerms200Response,
  GlossaryCreateGlossaryTermsdefaultResponse,
  GlossaryGetEntitiesAssignedWithTerm200Response,
  GlossaryGetEntitiesAssignedWithTermdefaultResponse,
  GlossaryAssignTermToEntities204Response,
  GlossaryAssignTermToEntitiesdefaultResponse,
  GlossaryRemoveTermAssignmentFromEntities204Response,
  GlossaryRemoveTermAssignmentFromEntitiesdefaultResponse,
  GlossaryDeleteTermAssignmentFromEntities204Response,
  GlossaryDeleteTermAssignmentFromEntitiesdefaultResponse,
  GlossaryListRelatedTerms200Response,
  GlossaryListRelatedTermsdefaultResponse,
  GlossaryGetGlossary200Response,
  GlossaryGetGlossarydefaultResponse,
  GlossaryUpdateGlossary200Response,
  GlossaryUpdateGlossarydefaultResponse,
  GlossaryDeleteGlossary204Response,
  GlossaryDeleteGlossarydefaultResponse,
  GlossaryListGlossaryCategories200Response,
  GlossaryListGlossaryCategoriesdefaultResponse,
  GlossaryListGlossaryCategoriesHeaders200Response,
  GlossaryListGlossaryCategoriesHeadersdefaultResponse,
  GlossaryGetDetailedGlossary200Response,
  GlossaryGetDetailedGlossarydefaultResponse,
  GlossaryPartialUpdateGlossary200Response,
  GlossaryPartialUpdateGlossarydefaultResponse,
  GlossaryListGlossaryTerms200Response,
  GlossaryListGlossaryTermsdefaultResponse,
  GlossaryListGlossaryTermHeaders200Response,
  GlossaryListGlossaryTermHeadersdefaultResponse,
  GlossaryImportGlossaryTermsViaCsv202Response,
  GlossaryImportGlossaryTermsViaCsvdefaultResponse,
  GlossaryImportGlossaryTermsViaCsvByGlossaryName202Response,
  GlossaryImportGlossaryTermsViaCsvByGlossaryNamedefaultResponse,
  GlossaryGetImportCsvOperationStatus200Response,
  GlossaryGetImportCsvOperationStatusdefaultResponse,
  GlossaryExportGlossaryTermsAsCsv200Response,
  GlossaryExportGlossaryTermsAsCsvdefaultResponse,
  GlossaryListTermsByGlossaryName200Response,
  GlossaryListTermsByGlossaryNamedefaultResponse,
  DiscoveryQuery200Response,
  DiscoveryQuerydefaultResponse,
  DiscoverySuggest200Response,
  DiscoverySuggestdefaultResponse,
  DiscoveryBrowse200Response,
  DiscoveryBrowsedefaultResponse,
  DiscoveryAutoComplete200Response,
  DiscoveryAutoCompletedefaultResponse,
  LineageGetLineageGraph200Response,
  LineageGetLineageGraphdefaultResponse,
  LineageNextPageLineage200Response,
  LineageNextPageLineagedefaultResponse,
  RelationshipCreate200Response,
  RelationshipCreatedefaultResponse,
  RelationshipUpdate200Response,
  RelationshipUpdatedefaultResponse,
  RelationshipGet200Response,
  RelationshipGetdefaultResponse,
  RelationshipDelete204Response,
  RelationshipDeletedefaultResponse,
  TypesGetClassificationDefByGuid200Response,
  TypesGetClassificationDefByGuiddefaultResponse,
  TypesGetClassificationDefByName200Response,
  TypesGetClassificationDefByNamedefaultResponse,
  TypesGetEntityDefinitionByGuid200Response,
  TypesGetEntityDefinitionByGuiddefaultResponse,
  TypesGetEntityDefinitionByName200Response,
  TypesGetEntityDefinitionByNamedefaultResponse,
  TypesGetEnumDefByGuid200Response,
  TypesGetEnumDefByGuiddefaultResponse,
  TypesGetEnumDefByName200Response,
  TypesGetEnumDefByNamedefaultResponse,
  TypesGetRelationshipDefByGuid200Response,
  TypesGetRelationshipDefByGuiddefaultResponse,
  TypesGetRelationshipDefByName200Response,
  TypesGetRelationshipDefByNamedefaultResponse,
  TypesGetStructDefByGuid200Response,
  TypesGetStructDefByGuiddefaultResponse,
  TypesGetStructDefByName200Response,
  TypesGetStructDefByNamedefaultResponse,
  TypesGetTypeDefinitionByGuid200Response,
  TypesGetTypeDefinitionByGuiddefaultResponse,
  TypesGetTypeDefinitionByName200Response,
  TypesGetTypeDefinitionByNamedefaultResponse,
  TypesDeleteTypeByName204Response,
  TypesDeleteTypeByNamedefaultResponse,
  TypesGetAllTypeDefinitions200Response,
  TypesGetAllTypeDefinitionsdefaultResponse,
  TypesCreateTypeDefinitions200Response,
  TypesCreateTypeDefinitionsdefaultResponse,
  TypesUpdateAtlasTypeDefinitions200Response,
  TypesUpdateAtlasTypeDefinitionsdefaultResponse,
  TypesDeleteTypeDefinitions204Response,
  TypesDeleteTypeDefinitionsdefaultResponse,
  TypesListTypeDefinitionHeaders200Response,
  TypesListTypeDefinitionHeadersdefaultResponse,
  TypesGetTermTemplateDefByGuid200Response,
  TypesGetTermTemplateDefByGuiddefaultResponse,
  TypesGetTermTemplateDefByName200Response,
  TypesGetTermTemplateDefByNamedefaultResponse,
  CollectionCreateOrUpdate200Response,
  CollectionCreateOrUpdatedefaultResponse,
  CollectionCreateOrUpdateBulk200Response,
  CollectionCreateOrUpdateBulkdefaultResponse,
  CollectionMoveEntitiesToCollection200Response,
  CollectionMoveEntitiesToCollectiondefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface EntityCreateOrUpdate {
  /**
   * Create or update an entity in Atlas.
   * Existing entity is matched using its unique guid if supplied or by its unique attributes eg: qualifiedName.
   * Map and array of collections are not well supported. E.g., array<array<int>>, array<map<string, int>>.
   */
  post(
    options: EntityCreateOrUpdateParameters
  ): StreamableMethod<EntityCreateOrUpdate200Response | EntityCreateOrUpdatedefaultResponse>;
}

export interface EntityListByGuids {
  /** List entities in bulk identified by its GUIDs. */
  get(
    options: EntityListByGuidsParameters
  ): StreamableMethod<EntityListByGuids200Response | EntityListByGuidsdefaultResponse>;
  /**
   * Create or update entities in Atlas in bulk.
   * Existing entity is matched using its unique guid if supplied or by its unique attributes eg: qualifiedName.
   * Map and array of collections are not well supported. E.g., array<array<int>>, array<map<string, int>>.
   */
  post(
    options: EntityCreateOrUpdateEntitiesParameters
  ): StreamableMethod<EntityCreateOrUpdateEntities200Response | EntityCreateOrUpdateEntitiesdefaultResponse>;
  /** Delete a list of entities in bulk identified by their GUIDs or unique attributes. */
  delete(
    options: EntityDeleteByGuidsParameters
  ): StreamableMethod<EntityDeleteByGuids200Response | EntityDeleteByGuidsdefaultResponse>;
}

export interface EntityAddClassification {
  /** Associate a classification to multiple entities in bulk. */
  post(
    options: EntityAddClassificationParameters
  ): StreamableMethod<EntityAddClassification204Response | EntityAddClassificationdefaultResponse>;
}

export interface EntityGetByGuid {
  /** Get complete definition of an entity given its GUID. */
  get(
    options?: EntityGetByGuidParameters
  ): StreamableMethod<EntityGetByGuid200Response | EntityGetByGuiddefaultResponse>;
  /**
   * Update entity partially - create or update entity attribute identified by its GUID.
   * Supports only primitive attribute type and entity references.
   * It does not support updating complex types like arrays, and maps.
   * Null updates are not possible.
   */
  put(
    options: EntityPartialUpdateEntityAttributeByGuidParameters
  ): StreamableMethod<
    | EntityPartialUpdateEntityAttributeByGuid200Response
    | EntityPartialUpdateEntityAttributeByGuiddefaultResponse
  >;
  /** Delete an entity identified by its GUID. */
  delete(
    options?: EntityDeleteByGuidParameters
  ): StreamableMethod<EntityDeleteByGuid200Response | EntityDeleteByGuiddefaultResponse>;
}

export interface EntityGetClassification {
  /** List classifications for a given entity represented by a GUID. */
  get(
    options?: EntityGetClassificationParameters
  ): StreamableMethod<EntityGetClassification200Response | EntityGetClassificationdefaultResponse>;
  /** Delete a given classification from an existing entity represented by a GUID. */
  delete(
    options?: EntityDeleteClassificationParameters
  ): StreamableMethod<EntityDeleteClassification204Response | EntityDeleteClassificationdefaultResponse>;
}

export interface EntityGetClassifications {
  /** List classifications for a given entity represented by a GUID. */
  get(
    options?: EntityGetClassificationsParameters
  ): StreamableMethod<EntityGetClassifications200Response | EntityGetClassificationsdefaultResponse>;
  /** Add classifications to an existing entity represented by a GUID. */
  post(
    options: EntityAddClassificationsParameters
  ): StreamableMethod<EntityAddClassifications204Response | EntityAddClassificationsdefaultResponse>;
  /** Update classifications to an existing entity represented by a guid. */
  put(
    options: EntityUpdateClassificationsParameters
  ): StreamableMethod<EntityUpdateClassifications204Response | EntityUpdateClassificationsdefaultResponse>;
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
    options?: EntityGetByUniqueAttributesParameters
  ): StreamableMethod<EntityGetByUniqueAttributes200Response | EntityGetByUniqueAttributesdefaultResponse>;
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
    options: EntityPartialUpdateEntityByUniqueAttributesParameters
  ): StreamableMethod<
    | EntityPartialUpdateEntityByUniqueAttributes200Response
    | EntityPartialUpdateEntityByUniqueAttributesdefaultResponse
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
    options?: EntityDeleteByUniqueAttributeParameters
  ): StreamableMethod<
    EntityDeleteByUniqueAttribute200Response | EntityDeleteByUniqueAttributedefaultResponse
  >;
}

export interface EntityDeleteClassificationByUniqueAttribute {
  /** Delete a given classification from an entity identified by its type and unique attributes. */
  delete(
    options?: EntityDeleteClassificationByUniqueAttributeParameters
  ): StreamableMethod<
    | EntityDeleteClassificationByUniqueAttribute204Response
    | EntityDeleteClassificationByUniqueAttributedefaultResponse
  >;
}

export interface EntityAddClassificationsByUniqueAttribute {
  /** Add classification to the entity identified by its type and unique attributes. */
  post(
    options: EntityAddClassificationsByUniqueAttributeParameters
  ): StreamableMethod<
    | EntityAddClassificationsByUniqueAttribute204Response
    | EntityAddClassificationsByUniqueAttributedefaultResponse
  >;
  /** Update classification on an entity identified by its type and unique attributes. */
  put(
    options: EntityUpdateClassificationsByUniqueAttributeParameters
  ): StreamableMethod<
    | EntityUpdateClassificationsByUniqueAttribute204Response
    | EntityUpdateClassificationsByUniqueAttributedefaultResponse
  >;
}

export interface EntitySetClassifications {
  /** Set classifications on entities in bulk. */
  post(
    options: EntitySetClassificationsParameters
  ): StreamableMethod<EntitySetClassifications200Response | EntitySetClassificationsdefaultResponse>;
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
    options?: EntityGetEntitiesByUniqueAttributesParameters
  ): StreamableMethod<
    | EntityGetEntitiesByUniqueAttributes200Response
    | EntityGetEntitiesByUniqueAttributesdefaultResponse
  >;
}

export interface EntityGetHeader {
  /** Get entity header given its GUID. */
  get(
    options?: EntityGetHeaderParameters
  ): StreamableMethod<EntityGetHeader200Response | EntityGetHeaderdefaultResponse>;
}

export interface GlossaryListGlossaries {
  /** Get all glossaries registered with Atlas. */
  get(
    options?: GlossaryListGlossariesParameters
  ): StreamableMethod<GlossaryListGlossaries200Response | GlossaryListGlossariesdefaultResponse>;
  /** Create a glossary. */
  post(
    options: GlossaryCreateGlossaryParameters
  ): StreamableMethod<GlossaryCreateGlossary200Response | GlossaryCreateGlossarydefaultResponse>;
}

export interface GlossaryCreateGlossaryCategories {
  /** Create glossary category in bulk. */
  post(
    options: GlossaryCreateGlossaryCategoriesParameters
  ): StreamableMethod<
    GlossaryCreateGlossaryCategories200Response | GlossaryCreateGlossaryCategoriesdefaultResponse
  >;
}

export interface GlossaryCreateGlossaryCategory {
  /** Create a glossary category. */
  post(
    options: GlossaryCreateGlossaryCategoryParameters
  ): StreamableMethod<
    GlossaryCreateGlossaryCategory200Response | GlossaryCreateGlossaryCategorydefaultResponse
  >;
}

export interface GlossaryGetGlossaryCategory {
  /** Get specific glossary category by its GUID. */
  get(
    options?: GlossaryGetGlossaryCategoryParameters
  ): StreamableMethod<GlossaryGetGlossaryCategory200Response | GlossaryGetGlossaryCategorydefaultResponse>;
  /** Update the given glossary category by its GUID. */
  put(
    options: GlossaryUpdateGlossaryCategoryParameters
  ): StreamableMethod<
    GlossaryUpdateGlossaryCategory200Response | GlossaryUpdateGlossaryCategorydefaultResponse
  >;
  /** Delete a glossary category. */
  delete(
    options?: GlossaryDeleteGlossaryCategoryParameters
  ): StreamableMethod<
    GlossaryDeleteGlossaryCategory204Response | GlossaryDeleteGlossaryCategorydefaultResponse
  >;
}

export interface GlossaryPartialUpdateGlossaryCategory {
  /** Update the glossary category partially. */
  put(
    options: GlossaryPartialUpdateGlossaryCategoryParameters
  ): StreamableMethod<
    | GlossaryPartialUpdateGlossaryCategory200Response
    | GlossaryPartialUpdateGlossaryCategorydefaultResponse
  >;
}

export interface GlossaryListRelatedCategories {
  /** Get all related categories (parent and children). Limit, offset, and sort parameters are currently not being enabled and won't work even they are passed. */
  get(
    options?: GlossaryListRelatedCategoriesParameters
  ): StreamableMethod<
    GlossaryListRelatedCategories200Response | GlossaryListRelatedCategoriesdefaultResponse
  >;
}

export interface GlossaryListCategoryTerms {
  /** Get all terms associated with the specific category. */
  get(
    options?: GlossaryListCategoryTermsParameters
  ): StreamableMethod<GlossaryListCategoryTerms200Response | GlossaryListCategoryTermsdefaultResponse>;
}

export interface GlossaryCreateGlossaryTerm {
  /** Create a glossary term. */
  post(
    options: GlossaryCreateGlossaryTermParameters
  ): StreamableMethod<GlossaryCreateGlossaryTerm200Response | GlossaryCreateGlossaryTermdefaultResponse>;
}

export interface GlossaryGetGlossaryTerm {
  /** Get a specific glossary term by its GUID. */
  get(
    options?: GlossaryGetGlossaryTermParameters
  ): StreamableMethod<GlossaryGetGlossaryTerm200Response | GlossaryGetGlossaryTermdefaultResponse>;
  /** Update the given glossary term by its GUID. */
  put(
    options: GlossaryUpdateGlossaryTermParameters
  ): StreamableMethod<GlossaryUpdateGlossaryTerm200Response | GlossaryUpdateGlossaryTermdefaultResponse>;
  /** Delete a glossary term. */
  delete(
    options?: GlossaryDeleteGlossaryTermParameters
  ): StreamableMethod<GlossaryDeleteGlossaryTerm204Response | GlossaryDeleteGlossaryTermdefaultResponse>;
}

export interface GlossaryPartialUpdateGlossaryTerm {
  /** Update the glossary term partially. */
  put(
    options: GlossaryPartialUpdateGlossaryTermParameters
  ): StreamableMethod<
    GlossaryPartialUpdateGlossaryTerm200Response | GlossaryPartialUpdateGlossaryTermdefaultResponse
  >;
}

export interface GlossaryCreateGlossaryTerms {
  /** Create glossary terms in bulk. */
  post(
    options: GlossaryCreateGlossaryTermsParameters
  ): StreamableMethod<GlossaryCreateGlossaryTerms200Response | GlossaryCreateGlossaryTermsdefaultResponse>;
}

export interface GlossaryGetEntitiesAssignedWithTerm {
  /** Get all related objects assigned with the specified term. */
  get(
    options?: GlossaryGetEntitiesAssignedWithTermParameters
  ): StreamableMethod<
    | GlossaryGetEntitiesAssignedWithTerm200Response
    | GlossaryGetEntitiesAssignedWithTermdefaultResponse
  >;
  /** Assign the given term to the provided list of related objects. */
  post(
    options: GlossaryAssignTermToEntitiesParameters
  ): StreamableMethod<GlossaryAssignTermToEntities204Response | GlossaryAssignTermToEntitiesdefaultResponse>;
  /** Delete the term assignment for the given list of related objects. */
  put(
    options: GlossaryRemoveTermAssignmentFromEntitiesParameters
  ): StreamableMethod<
    | GlossaryRemoveTermAssignmentFromEntities204Response
    | GlossaryRemoveTermAssignmentFromEntitiesdefaultResponse
  >;
  /** Delete the term assignment for the given list of related objects. */
  delete(
    options: GlossaryDeleteTermAssignmentFromEntitiesParameters
  ): StreamableMethod<
    | GlossaryDeleteTermAssignmentFromEntities204Response
    | GlossaryDeleteTermAssignmentFromEntitiesdefaultResponse
  >;
}

export interface GlossaryListRelatedTerms {
  /** Get all related terms for a specific term by its GUID. Limit, offset, and sort parameters are currently not being enabled and won't work even they are passed. */
  get(
    options?: GlossaryListRelatedTermsParameters
  ): StreamableMethod<GlossaryListRelatedTerms200Response | GlossaryListRelatedTermsdefaultResponse>;
}

export interface GlossaryGetGlossary {
  /** Get a specific Glossary by its GUID. */
  get(
    options?: GlossaryGetGlossaryParameters
  ): StreamableMethod<GlossaryGetGlossary200Response | GlossaryGetGlossarydefaultResponse>;
  /** Update the given glossary. */
  put(
    options: GlossaryUpdateGlossaryParameters
  ): StreamableMethod<GlossaryUpdateGlossary200Response | GlossaryUpdateGlossarydefaultResponse>;
  /** Delete a glossary. */
  delete(
    options?: GlossaryDeleteGlossaryParameters
  ): StreamableMethod<GlossaryDeleteGlossary204Response | GlossaryDeleteGlossarydefaultResponse>;
}

export interface GlossaryListGlossaryCategories {
  /** Get the categories belonging to a specific glossary. */
  get(
    options?: GlossaryListGlossaryCategoriesParameters
  ): StreamableMethod<
    GlossaryListGlossaryCategories200Response | GlossaryListGlossaryCategoriesdefaultResponse
  >;
}

export interface GlossaryListGlossaryCategoriesHeaders {
  /** Get the category headers belonging to a specific glossary. */
  get(
    options?: GlossaryListGlossaryCategoriesHeadersParameters
  ): StreamableMethod<
    | GlossaryListGlossaryCategoriesHeaders200Response
    | GlossaryListGlossaryCategoriesHeadersdefaultResponse
  >;
}

export interface GlossaryGetDetailedGlossary {
  /** Get a specific glossary with detailed information. */
  get(
    options?: GlossaryGetDetailedGlossaryParameters
  ): StreamableMethod<GlossaryGetDetailedGlossary200Response | GlossaryGetDetailedGlossarydefaultResponse>;
}

export interface GlossaryPartialUpdateGlossary {
  /** Update the glossary partially. Some properties such as qualifiedName are not allowed to be updated. */
  put(
    options: GlossaryPartialUpdateGlossaryParameters
  ): StreamableMethod<
    GlossaryPartialUpdateGlossary200Response | GlossaryPartialUpdateGlossarydefaultResponse
  >;
}

export interface GlossaryListGlossaryTerms {
  /** Get terms belonging to a specific glossary. */
  get(
    options?: GlossaryListGlossaryTermsParameters
  ): StreamableMethod<GlossaryListGlossaryTerms200Response | GlossaryListGlossaryTermsdefaultResponse>;
}

export interface GlossaryListGlossaryTermHeaders {
  /** Get term headers belonging to a specific glossary. */
  get(
    options?: GlossaryListGlossaryTermHeadersParameters
  ): StreamableMethod<
    GlossaryListGlossaryTermHeaders200Response | GlossaryListGlossaryTermHeadersdefaultResponse
  >;
}

export interface GlossaryImportGlossaryTermsViaCsv {
  /** Import Glossary Terms from local csv file */
  post(
    options: GlossaryImportGlossaryTermsViaCsvParameters
  ): StreamableMethod<
    GlossaryImportGlossaryTermsViaCsv202Response | GlossaryImportGlossaryTermsViaCsvdefaultResponse
  >;
}

export interface GlossaryImportGlossaryTermsViaCsvByGlossaryName {
  /** Import Glossary Terms from local csv file by glossaryName */
  post(
    options: GlossaryImportGlossaryTermsViaCsvByGlossaryNameParameters
  ): StreamableMethod<
    | GlossaryImportGlossaryTermsViaCsvByGlossaryName202Response
    | GlossaryImportGlossaryTermsViaCsvByGlossaryNamedefaultResponse
  >;
}

export interface GlossaryGetImportCsvOperationStatus {
  /** Get the status of import csv operation */
  get(
    options?: GlossaryGetImportCsvOperationStatusParameters
  ): StreamableMethod<
    | GlossaryGetImportCsvOperationStatus200Response
    | GlossaryGetImportCsvOperationStatusdefaultResponse
  >;
}

export interface GlossaryExportGlossaryTermsAsCsv {
  /** Export Glossary Terms as csv file */
  post(
    options: GlossaryExportGlossaryTermsAsCsvParameters
  ): StreamableMethod<
    GlossaryExportGlossaryTermsAsCsv200Response | GlossaryExportGlossaryTermsAsCsvdefaultResponse
  >;
}

export interface GlossaryListTermsByGlossaryName {
  /** Get terms by glossary name. */
  get(
    options?: GlossaryListTermsByGlossaryNameParameters
  ): StreamableMethod<
    GlossaryListTermsByGlossaryName200Response | GlossaryListTermsByGlossaryNamedefaultResponse
  >;
}

export interface DiscoveryQuery {
  /** Gets data using search. */
  post(
    options: DiscoveryQueryParameters
  ): StreamableMethod<DiscoveryQuery200Response | DiscoveryQuerydefaultResponse>;
}

export interface DiscoverySuggest {
  /** Get search suggestions by query criteria. */
  post(
    options: DiscoverySuggestParameters
  ): StreamableMethod<DiscoverySuggest200Response | DiscoverySuggestdefaultResponse>;
}

export interface DiscoveryBrowse {
  /** Browse entities by path or entity type. */
  post(
    options: DiscoveryBrowseParameters
  ): StreamableMethod<DiscoveryBrowse200Response | DiscoveryBrowsedefaultResponse>;
}

export interface DiscoveryAutoComplete {
  /** Get auto complete options. */
  post(
    options: DiscoveryAutoCompleteParameters
  ): StreamableMethod<DiscoveryAutoComplete200Response | DiscoveryAutoCompletedefaultResponse>;
}

export interface LineageGetLineageGraph {
  /** Get lineage info of the entity specified by GUID. */
  get(
    options: LineageGetLineageGraphParameters
  ): StreamableMethod<LineageGetLineageGraph200Response | LineageGetLineageGraphdefaultResponse>;
}

export interface LineageNextPageLineage {
  /** Return immediate next page lineage info about entity with pagination */
  get(
    options: LineageNextPageLineageParameters
  ): StreamableMethod<LineageNextPageLineage200Response | LineageNextPageLineagedefaultResponse>;
}

export interface RelationshipCreate {
  /** Create a new relationship between entities. */
  post(
    options: RelationshipCreateParameters
  ): StreamableMethod<RelationshipCreate200Response | RelationshipCreatedefaultResponse>;
  /** Update an existing relationship between entities. */
  put(
    options: RelationshipUpdateParameters
  ): StreamableMethod<RelationshipUpdate200Response | RelationshipUpdatedefaultResponse>;
}

export interface RelationshipGet {
  /** Get relationship information between entities by its GUID. */
  get(
    options?: RelationshipGetParameters
  ): StreamableMethod<RelationshipGet200Response | RelationshipGetdefaultResponse>;
  /** Delete a relationship between entities by its GUID. */
  delete(
    options?: RelationshipDeleteParameters
  ): StreamableMethod<RelationshipDelete204Response | RelationshipDeletedefaultResponse>;
}

export interface TypesGetClassificationDefByGuid {
  /** Get the classification definition for the given GUID. */
  get(
    options?: TypesGetClassificationDefByGuidParameters
  ): StreamableMethod<
    TypesGetClassificationDefByGuid200Response | TypesGetClassificationDefByGuiddefaultResponse
  >;
}

export interface TypesGetClassificationDefByName {
  /** Get the classification definition by its name (unique). */
  get(
    options?: TypesGetClassificationDefByNameParameters
  ): StreamableMethod<
    TypesGetClassificationDefByName200Response | TypesGetClassificationDefByNamedefaultResponse
  >;
}

export interface TypesGetEntityDefinitionByGuid {
  /** Get the Entity definition for the given GUID. */
  get(
    options?: TypesGetEntityDefinitionByGuidParameters
  ): StreamableMethod<
    TypesGetEntityDefinitionByGuid200Response | TypesGetEntityDefinitionByGuiddefaultResponse
  >;
}

export interface TypesGetEntityDefinitionByName {
  /** Get the entity definition by its name (unique). */
  get(
    options?: TypesGetEntityDefinitionByNameParameters
  ): StreamableMethod<
    TypesGetEntityDefinitionByName200Response | TypesGetEntityDefinitionByNamedefaultResponse
  >;
}

export interface TypesGetEnumDefByGuid {
  /** Get the enum definition for the given GUID. */
  get(
    options?: TypesGetEnumDefByGuidParameters
  ): StreamableMethod<TypesGetEnumDefByGuid200Response | TypesGetEnumDefByGuiddefaultResponse>;
}

export interface TypesGetEnumDefByName {
  /** Get the enum definition by its name (unique). */
  get(
    options?: TypesGetEnumDefByNameParameters
  ): StreamableMethod<TypesGetEnumDefByName200Response | TypesGetEnumDefByNamedefaultResponse>;
}

export interface TypesGetRelationshipDefByGuid {
  /** Get the relationship definition for the given GUID. */
  get(
    options?: TypesGetRelationshipDefByGuidParameters
  ): StreamableMethod<
    TypesGetRelationshipDefByGuid200Response | TypesGetRelationshipDefByGuiddefaultResponse
  >;
}

export interface TypesGetRelationshipDefByName {
  /** Get the relationship definition by its name (unique). */
  get(
    options?: TypesGetRelationshipDefByNameParameters
  ): StreamableMethod<
    TypesGetRelationshipDefByName200Response | TypesGetRelationshipDefByNamedefaultResponse
  >;
}

export interface TypesGetStructDefByGuid {
  /** Get the struct definition for the given GUID. */
  get(
    options?: TypesGetStructDefByGuidParameters
  ): StreamableMethod<TypesGetStructDefByGuid200Response | TypesGetStructDefByGuiddefaultResponse>;
}

export interface TypesGetStructDefByName {
  /** Get the struct definition by its name (unique). */
  get(
    options?: TypesGetStructDefByNameParameters
  ): StreamableMethod<TypesGetStructDefByName200Response | TypesGetStructDefByNamedefaultResponse>;
}

export interface TypesGetTypeDefinitionByGuid {
  /** Get the type definition for the given GUID. */
  get(
    options?: TypesGetTypeDefinitionByGuidParameters
  ): StreamableMethod<TypesGetTypeDefinitionByGuid200Response | TypesGetTypeDefinitionByGuiddefaultResponse>;
}

export interface TypesGetTypeDefinitionByName {
  /** Get the type definition by its name (unique). */
  get(
    options?: TypesGetTypeDefinitionByNameParameters
  ): StreamableMethod<TypesGetTypeDefinitionByName200Response | TypesGetTypeDefinitionByNamedefaultResponse>;
  /** Delete API for type identified by its name. */
  delete(
    options?: TypesDeleteTypeByNameParameters
  ): StreamableMethod<TypesDeleteTypeByName204Response | TypesDeleteTypeByNamedefaultResponse>;
}

export interface TypesGetAllTypeDefinitions {
  /** Get all type definitions in Atlas in bulk. */
  get(
    options?: TypesGetAllTypeDefinitionsParameters
  ): StreamableMethod<TypesGetAllTypeDefinitions200Response | TypesGetAllTypeDefinitionsdefaultResponse>;
  /**
   * Create all atlas type definitions in bulk, only new definitions will be created.
   * Any changes to the existing definitions will be discarded.
   */
  post(
    options: TypesCreateTypeDefinitionsParameters
  ): StreamableMethod<TypesCreateTypeDefinitions200Response | TypesCreateTypeDefinitionsdefaultResponse>;
  /** Update all types in bulk, changes detected in the type definitions would be persisted. */
  put(
    options: TypesUpdateAtlasTypeDefinitionsParameters
  ): StreamableMethod<
    TypesUpdateAtlasTypeDefinitions200Response | TypesUpdateAtlasTypeDefinitionsdefaultResponse
  >;
  /** Delete API for all types in bulk. */
  delete(
    options: TypesDeleteTypeDefinitionsParameters
  ): StreamableMethod<TypesDeleteTypeDefinitions204Response | TypesDeleteTypeDefinitionsdefaultResponse>;
}

export interface TypesListTypeDefinitionHeaders {
  /** List all type definitions returned as a list of minimal information header. */
  get(
    options?: TypesListTypeDefinitionHeadersParameters
  ): StreamableMethod<
    TypesListTypeDefinitionHeaders200Response | TypesListTypeDefinitionHeadersdefaultResponse
  >;
}

export interface TypesGetTermTemplateDefByGuid {
  /** Get the term template definition for the given GUID. */
  get(
    options?: TypesGetTermTemplateDefByGuidParameters
  ): StreamableMethod<
    TypesGetTermTemplateDefByGuid200Response | TypesGetTermTemplateDefByGuiddefaultResponse
  >;
}

export interface TypesGetTermTemplateDefByName {
  /** Get the term template definition by its name (unique). */
  get(
    options?: TypesGetTermTemplateDefByNameParameters
  ): StreamableMethod<
    TypesGetTermTemplateDefByName200Response | TypesGetTermTemplateDefByNamedefaultResponse
  >;
}

export interface CollectionCreateOrUpdate {
  /**
   * Creates or updates an entity to a collection.
   * Existing entity is matched using its unique guid if supplied or by its unique attributes eg: qualifiedName.
   * Map and array of collections are not well supported. E.g., array<array<int>>, array<map<string, int>>.
   */
  post(
    options: CollectionCreateOrUpdateParameters
  ): StreamableMethod<CollectionCreateOrUpdate200Response | CollectionCreateOrUpdatedefaultResponse>;
}

export interface CollectionCreateOrUpdateBulk {
  /**
   * Creates or updates entities in bulk to a collection.
   * Existing entity is matched using its unique guid if supplied or by its unique attributes eg: qualifiedName.
   * Map and array of collections are not well supported. E.g., array<array<int>>, array<map<string, int>>.
   */
  post(
    options: CollectionCreateOrUpdateBulkParameters
  ): StreamableMethod<CollectionCreateOrUpdateBulk200Response | CollectionCreateOrUpdateBulkdefaultResponse>;
}

export interface CollectionMoveEntitiesToCollection {
  /** Move existing entities to the target collection. */
  post(
    options: CollectionMoveEntitiesToCollectionParameters
  ): StreamableMethod<
    | CollectionMoveEntitiesToCollection200Response
    | CollectionMoveEntitiesToCollectiondefaultResponse
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
    classificationName: string
  ): EntityGetClassification;
  /** Resource for '/atlas/v2/entity/guid/\{guid\}/classifications' has methods for the following verbs: get, post, put */
  (path: "/atlas/v2/entity/guid/{guid}/classifications", guid: string): EntityGetClassifications;
  /** Resource for '/atlas/v2/entity/uniqueAttribute/type/\{typeName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/atlas/v2/entity/uniqueAttribute/type/{typeName}",
    typeName: string
  ): EntityGetByUniqueAttributes;
  /** Resource for '/atlas/v2/entity/uniqueAttribute/type/\{typeName\}/classification/\{classificationName\}' has methods for the following verbs: delete */
  (
    path: "/atlas/v2/entity/uniqueAttribute/type/{typeName}/classification/{classificationName}",
    typeName: string,
    classificationName: string
  ): EntityDeleteClassificationByUniqueAttribute;
  /** Resource for '/atlas/v2/entity/uniqueAttribute/type/\{typeName\}/classifications' has methods for the following verbs: post, put */
  (
    path: "/atlas/v2/entity/uniqueAttribute/type/{typeName}/classifications",
    typeName: string
  ): EntityAddClassificationsByUniqueAttribute;
  /** Resource for '/atlas/v2/entity/bulk/setClassifications' has methods for the following verbs: post */
  (path: "/atlas/v2/entity/bulk/setClassifications"): EntitySetClassifications;
  /** Resource for '/atlas/v2/entity/bulk/uniqueAttribute/type/\{typeName\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/entity/bulk/uniqueAttribute/type/{typeName}",
    typeName: string
  ): EntityGetEntitiesByUniqueAttributes;
  /** Resource for '/atlas/v2/entity/guid/\{guid\}/header' has methods for the following verbs: get */
  (path: "/atlas/v2/entity/guid/{guid}/header", guid: string): EntityGetHeader;
  /** Resource for '/atlas/v2/glossary' has methods for the following verbs: get, post */
  (path: "/atlas/v2/glossary"): GlossaryListGlossaries;
  /** Resource for '/atlas/v2/glossary/categories' has methods for the following verbs: post */
  (path: "/atlas/v2/glossary/categories"): GlossaryCreateGlossaryCategories;
  /** Resource for '/atlas/v2/glossary/category' has methods for the following verbs: post */
  (path: "/atlas/v2/glossary/category"): GlossaryCreateGlossaryCategory;
  /** Resource for '/atlas/v2/glossary/category/\{categoryGuid\}' has methods for the following verbs: get, put, delete */
  (
    path: "/atlas/v2/glossary/category/{categoryGuid}",
    categoryGuid: string
  ): GlossaryGetGlossaryCategory;
  /** Resource for '/atlas/v2/glossary/category/\{categoryGuid\}/partial' has methods for the following verbs: put */
  (
    path: "/atlas/v2/glossary/category/{categoryGuid}/partial",
    categoryGuid: string
  ): GlossaryPartialUpdateGlossaryCategory;
  /** Resource for '/atlas/v2/glossary/category/\{categoryGuid\}/related' has methods for the following verbs: get */
  (
    path: "/atlas/v2/glossary/category/{categoryGuid}/related",
    categoryGuid: string
  ): GlossaryListRelatedCategories;
  /** Resource for '/atlas/v2/glossary/category/\{categoryGuid\}/terms' has methods for the following verbs: get */
  (
    path: "/atlas/v2/glossary/category/{categoryGuid}/terms",
    categoryGuid: string
  ): GlossaryListCategoryTerms;
  /** Resource for '/atlas/v2/glossary/term' has methods for the following verbs: post */
  (path: "/atlas/v2/glossary/term"): GlossaryCreateGlossaryTerm;
  /** Resource for '/atlas/v2/glossary/term/\{termGuid\}' has methods for the following verbs: get, put, delete */
  (path: "/atlas/v2/glossary/term/{termGuid}", termGuid: string): GlossaryGetGlossaryTerm;
  /** Resource for '/atlas/v2/glossary/term/\{termGuid\}/partial' has methods for the following verbs: put */
  (
    path: "/atlas/v2/glossary/term/{termGuid}/partial",
    termGuid: string
  ): GlossaryPartialUpdateGlossaryTerm;
  /** Resource for '/atlas/v2/glossary/terms' has methods for the following verbs: post */
  (path: "/atlas/v2/glossary/terms"): GlossaryCreateGlossaryTerms;
  /** Resource for '/atlas/v2/glossary/terms/\{termGuid\}/assignedEntities' has methods for the following verbs: get, post, put, delete */
  (
    path: "/atlas/v2/glossary/terms/{termGuid}/assignedEntities",
    termGuid: string
  ): GlossaryGetEntitiesAssignedWithTerm;
  /** Resource for '/atlas/v2/glossary/terms/\{termGuid\}/related' has methods for the following verbs: get */
  (path: "/atlas/v2/glossary/terms/{termGuid}/related", termGuid: string): GlossaryListRelatedTerms;
  /** Resource for '/atlas/v2/glossary/\{glossaryGuid\}' has methods for the following verbs: get, put, delete */
  (path: "/atlas/v2/glossary/{glossaryGuid}", glossaryGuid: string): GlossaryGetGlossary;
  /** Resource for '/atlas/v2/glossary/\{glossaryGuid\}/categories' has methods for the following verbs: get */
  (
    path: "/atlas/v2/glossary/{glossaryGuid}/categories",
    glossaryGuid: string
  ): GlossaryListGlossaryCategories;
  /** Resource for '/atlas/v2/glossary/\{glossaryGuid\}/categories/headers' has methods for the following verbs: get */
  (
    path: "/atlas/v2/glossary/{glossaryGuid}/categories/headers",
    glossaryGuid: string
  ): GlossaryListGlossaryCategoriesHeaders;
  /** Resource for '/atlas/v2/glossary/\{glossaryGuid\}/detailed' has methods for the following verbs: get */
  (
    path: "/atlas/v2/glossary/{glossaryGuid}/detailed",
    glossaryGuid: string
  ): GlossaryGetDetailedGlossary;
  /** Resource for '/atlas/v2/glossary/\{glossaryGuid\}/partial' has methods for the following verbs: put */
  (
    path: "/atlas/v2/glossary/{glossaryGuid}/partial",
    glossaryGuid: string
  ): GlossaryPartialUpdateGlossary;
  /** Resource for '/atlas/v2/glossary/\{glossaryGuid\}/terms' has methods for the following verbs: get */
  (
    path: "/atlas/v2/glossary/{glossaryGuid}/terms",
    glossaryGuid: string
  ): GlossaryListGlossaryTerms;
  /** Resource for '/atlas/v2/glossary/\{glossaryGuid\}/terms/headers' has methods for the following verbs: get */
  (
    path: "/atlas/v2/glossary/{glossaryGuid}/terms/headers",
    glossaryGuid: string
  ): GlossaryListGlossaryTermHeaders;
  /** Resource for '/glossary/\{glossaryGuid\}/terms/import' has methods for the following verbs: post */
  (
    path: "/glossary/{glossaryGuid}/terms/import",
    glossaryGuid: string
  ): GlossaryImportGlossaryTermsViaCsv;
  /** Resource for '/glossary/name/\{glossaryName\}/terms/import' has methods for the following verbs: post */
  (
    path: "/glossary/name/{glossaryName}/terms/import",
    glossaryName: string
  ): GlossaryImportGlossaryTermsViaCsvByGlossaryName;
  /** Resource for '/glossary/terms/import/\{operationGuid\}' has methods for the following verbs: get */
  (
    path: "/glossary/terms/import/{operationGuid}",
    operationGuid: string
  ): GlossaryGetImportCsvOperationStatus;
  /** Resource for '/glossary/\{glossaryGuid\}/terms/export' has methods for the following verbs: post */
  (
    path: "/glossary/{glossaryGuid}/terms/export",
    glossaryGuid: string
  ): GlossaryExportGlossaryTermsAsCsv;
  /** Resource for '/glossary/name/\{glossaryName\}/terms' has methods for the following verbs: get */
  (
    path: "/glossary/name/{glossaryName}/terms",
    glossaryName: string
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
  /** Resource for '/atlas/v2/relationship' has methods for the following verbs: post, put */
  (path: "/atlas/v2/relationship"): RelationshipCreate;
  /** Resource for '/atlas/v2/relationship/guid/\{guid\}' has methods for the following verbs: get, delete */
  (path: "/atlas/v2/relationship/guid/{guid}", guid: string): RelationshipGet;
  /** Resource for '/atlas/v2/types/classificationdef/guid/\{guid\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/types/classificationdef/guid/{guid}",
    guid: string
  ): TypesGetClassificationDefByGuid;
  /** Resource for '/atlas/v2/types/classificationdef/name/\{name\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/types/classificationdef/name/{name}",
    name: string
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
    guid: string
  ): TypesGetRelationshipDefByGuid;
  /** Resource for '/atlas/v2/types/relationshipdef/name/\{name\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/types/relationshipdef/name/{name}",
    name: string
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
    collection: string
  ): CollectionMoveEntitiesToCollection;
}

export type PurviewCatalogClient = Client & {
  path: Routes;
};
