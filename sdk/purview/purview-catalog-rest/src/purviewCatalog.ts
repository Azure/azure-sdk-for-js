// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  EntityRestCreateOrUpdateParameters,
  EntityRestGetByGuidsParameters,
  EntityRestCreateOrUpdateBulkParameters,
  EntityRestBulkDeleteParameters,
  EntityRestAddClassificationParameters,
  EntityRestGetByIdParameters,
  EntityRestPartialUpdateEntityAttrByGuidParameters,
  EntityRestDeleteByGuidParameters,
  EntityRestGetClassificationParameters,
  EntityRestDeleteClassificationParameters,
  EntityRestGetClassificationsParameters,
  EntityRestAddClassificationsParameters,
  EntityRestUpdateClassificationsParameters,
  EntityRestGetByUniqueAttributesParameters,
  EntityRestPartialUpdateEntityByUniqueAttrsParameters,
  EntityRestDeleteByUniqueAttributeParameters,
  EntityRestDeleteClassificationByUniqueAttributeParameters,
  EntityRestAddClassificationsByUniqueAttributeParameters,
  EntityRestUpdateClassificationsByUniqueAttributeParameters,
  EntityRestSetClassificationsParameters,
  EntityRestGetEntitiesByUniqueAttributesParameters,
  EntityRestGetHeaderByIdParameters,
  GlossaryRestGetGlossariesParameters,
  GlossaryRestCreateGlossaryParameters,
  GlossaryRestCreateGlossaryCategoriesParameters,
  GlossaryRestCreateGlossaryCategoryParameters,
  GlossaryRestGetGlossaryCategoryParameters,
  GlossaryRestUpdateGlossaryCategoryParameters,
  GlossaryRestDeleteGlossaryCategoryParameters,
  GlossaryRestPartialUpdateGlossaryCategoryParameters,
  GlossaryRestGetRelatedCategoriesParameters,
  GlossaryRestGetCategoryTermsParameters,
  GlossaryRestCreateGlossaryTermParameters,
  GlossaryRestGetGlossaryTermParameters,
  GlossaryRestUpdateGlossaryTermParameters,
  GlossaryRestDeleteGlossaryTermParameters,
  GlossaryRestPartialUpdateGlossaryTermParameters,
  GlossaryRestCreateGlossaryTermsParameters,
  GlossaryRestGetEntitiesAssignedWithTermParameters,
  GlossaryRestAssignTermToEntitiesParameters,
  GlossaryRestRemoveTermAssignmentFromEntitiesParameters,
  GlossaryRestDeleteTermAssignmentFromEntitiesParameters,
  GlossaryRestGetRelatedTermsParameters,
  GlossaryRestGetGlossaryParameters,
  GlossaryRestUpdateGlossaryParameters,
  GlossaryRestDeleteGlossaryParameters,
  GlossaryRestGetGlossaryCategoriesParameters,
  GlossaryRestGetGlossaryCategoriesHeadersParameters,
  GlossaryRestGetDetailedGlossaryParameters,
  GlossaryRestPartialUpdateGlossaryParameters,
  GlossaryRestGetGlossaryTermsParameters,
  GlossaryRestGetGlossaryTermHeadersParameters,
  GlossaryRestImportGlossaryTermsViaCSVParameters,
  GlossaryRestImportGlossaryTermsViaCSVByGlossaryNameParameters,
  GlossaryRestGetImportCSVOperationStatusParameters,
  GlossaryRestExportGlossaryTermsAsCSVParameters,
  GlossaryRestGetTermsByGlossaryNameParameters,
  DiscoveryRestSearchAdvancedParameters,
  DiscoveryRestSuggestParameters,
  DiscoveryRestAutoCompleteParameters,
  LineageRestGetLineageGraphParameters,
  LineageRestNextLevelLineageParameters,
  RelationshipRestCreateParameters,
  RelationshipRestUpdateParameters,
  RelationshipRestGetById2Parameters,
  RelationshipRestDeleteByIdParameters,
  TypesRestGetClassificationDefByGuidParameters,
  TypesRestGetClassificationDefByNameParameters,
  TypesRestGetEntityDefByGuidParameters,
  TypesRestGetEntityDefByNameParameters,
  TypesRestGetEnumDefByGuidParameters,
  TypesRestGetEnumDefByNameParameters,
  TypesRestGetRelationshipDefByGuidParameters,
  TypesRestGetRelationshipDefByNameParameters,
  TypesRestGetStructDefByGuidParameters,
  TypesRestGetStructDefByNameParameters,
  TypesRestGetTypeDefByGuidParameters,
  TypesRestGetTypeDefByNameParameters,
  TypesRestDeleteTypeByNameParameters,
  TypesRestGetAllTypeDefsParameters,
  TypesRestCreateTypeDefsParameters,
  TypesRestUpdateAtlasTypeDefsParameters,
  TypesRestDeleteTypeDefsParameters,
  TypesRestGetTypeDefHeadersParameters,
  TypesRestGetTermTemplateDefByGuidParameters,
  TypesRestGetTermTemplateDefByNameParameters
} from "./parameters";
import {
  EntityRestCreateOrUpdate200Response,
  EntityRestGetByGuids200Response,
  EntityRestCreateOrUpdateBulk200Response,
  EntityRestBulkDelete200Response,
  EntityRestAddClassification204Response,
  EntityRestGetById200Response,
  EntityRestPartialUpdateEntityAttrByGuid200Response,
  EntityRestDeleteByGuid200Response,
  EntityRestGetClassification200Response,
  EntityRestDeleteClassification204Response,
  EntityRestGetClassifications200Response,
  EntityRestAddClassifications204Response,
  EntityRestUpdateClassifications204Response,
  EntityRestGetByUniqueAttributes200Response,
  EntityRestPartialUpdateEntityByUniqueAttrs200Response,
  EntityRestDeleteByUniqueAttribute200Response,
  EntityRestDeleteClassificationByUniqueAttribute204Response,
  EntityRestAddClassificationsByUniqueAttribute204Response,
  EntityRestUpdateClassificationsByUniqueAttribute204Response,
  EntityRestSetClassifications200Response,
  EntityRestGetEntitiesByUniqueAttributes200Response,
  EntityRestGetHeaderById200Response,
  GlossaryRestGetGlossaries200Response,
  GlossaryRestCreateGlossary200Response,
  GlossaryRestCreateGlossaryCategories200Response,
  GlossaryRestCreateGlossaryCategory200Response,
  GlossaryRestGetGlossaryCategory200Response,
  GlossaryRestUpdateGlossaryCategory200Response,
  GlossaryRestDeleteGlossaryCategory204Response,
  GlossaryRestPartialUpdateGlossaryCategory200Response,
  GlossaryRestGetRelatedCategories200Response,
  GlossaryRestGetCategoryTerms200Response,
  GlossaryRestCreateGlossaryTerm200Response,
  GlossaryRestGetGlossaryTerm200Response,
  GlossaryRestUpdateGlossaryTerm200Response,
  GlossaryRestDeleteGlossaryTerm204Response,
  GlossaryRestPartialUpdateGlossaryTerm200Response,
  GlossaryRestCreateGlossaryTerms200Response,
  GlossaryRestGetEntitiesAssignedWithTerm200Response,
  GlossaryRestAssignTermToEntities204Response,
  GlossaryRestRemoveTermAssignmentFromEntities204Response,
  GlossaryRestDeleteTermAssignmentFromEntities204Response,
  GlossaryRestGetRelatedTerms200Response,
  GlossaryRestGetGlossary200Response,
  GlossaryRestUpdateGlossary200Response,
  GlossaryRestDeleteGlossary204Response,
  GlossaryRestGetGlossaryCategories200Response,
  GlossaryRestGetGlossaryCategoriesHeaders200Response,
  GlossaryRestGetDetailedGlossary200Response,
  GlossaryRestPartialUpdateGlossary200Response,
  GlossaryRestGetGlossaryTerms200Response,
  GlossaryRestGetGlossaryTermHeaders200Response,
  GlossaryRestImportGlossaryTermsViaCSV202Response,
  GlossaryRestImportGlossaryTermsViaCSVByGlossaryName202Response,
  GlossaryRestGetImportCSVOperationStatus200Response,
  GlossaryRestExportGlossaryTermsAsCSV200Response,
  GlossaryRestGetTermsByGlossaryName200Response,
  DiscoveryRestSearchAdvanced200Response,
  DiscoveryRestSuggest200Response,
  DiscoveryRestAutoComplete200Response,
  LineageRestGetLineageGraph200Response,
  LineageRestNextLevelLineage200Response,
  RelationshipRestCreate200Response,
  RelationshipRestUpdate200Response,
  RelationshipRestGetById2200Response,
  RelationshipRestDeleteById204Response,
  TypesRestGetClassificationDefByGuid200Response,
  TypesRestGetClassificationDefByName200Response,
  TypesRestGetEntityDefByGuid200Response,
  TypesRestGetEntityDefByName200Response,
  TypesRestGetEnumDefByGuid200Response,
  TypesRestGetEnumDefByName200Response,
  TypesRestGetRelationshipDefByGuid200Response,
  TypesRestGetRelationshipDefByName200Response,
  TypesRestGetStructDefByGuid200Response,
  TypesRestGetStructDefByName200Response,
  TypesRestGetTypeDefByGuid200Response,
  TypesRestGetTypeDefByName200Response,
  TypesRestDeleteTypeByName204Response,
  TypesRestGetAllTypeDefs200Response,
  TypesRestCreateTypeDefs200Response,
  TypesRestUpdateAtlasTypeDefs200Response,
  TypesRestDeleteTypeDefs204Response,
  TypesRestGetTypeDefHeaders200Response,
  TypesRestGetTermTemplateDefByGuid200Response,
  TypesRestGetTermTemplateDefByName200Response
} from "./responses";
import { getClient, ClientOptions, Client } from "@azure-rest/core-client";
import { KeyCredential, TokenCredential } from "@azure/core-auth";

export interface EntityRestCreateOrUpdate {
  /**
   * Create or update an entity in Atlas.
   * Existing entity is matched using its unique guid if supplied or by its unique attributes eg: qualifiedName.
   * Map and array of collections are not well supported. E.g., array<array<int>>, array<map<string, int>>.
   */
  post(
    options: EntityRestCreateOrUpdateParameters
  ): Promise<EntityRestCreateOrUpdate200Response>;
}

export interface EntityRestBulkDelete {
  /** List entities in bulk identified by its GUIDs. */
  get(
    options?: EntityRestGetByGuidsParameters
  ): Promise<EntityRestGetByGuids200Response>;
  /**
   * Create or update entities in Atlas in bulk.
   * Existing entity is matched using its unique guid if supplied or by its unique attributes eg: qualifiedName.
   * Map and array of collections are not well supported. E.g., array<array<int>>, array<map<string, int>>.
   */
  post(
    options: EntityRestCreateOrUpdateBulkParameters
  ): Promise<EntityRestCreateOrUpdateBulk200Response>;
  /** Delete a list of entities in bulk identified by their GUIDs or unique attributes. */
  delete(
    options?: EntityRestBulkDeleteParameters
  ): Promise<EntityRestBulkDelete200Response>;
}

export interface EntityRestAddClassification {
  /** Associate a classification to multiple entities in bulk. */
  post(
    options: EntityRestAddClassificationParameters
  ): Promise<EntityRestAddClassification204Response>;
}

export interface EntityRestDeleteByGuid {
  /** Get complete definition of an entity given its GUID. */
  get(
    options?: EntityRestGetByIdParameters
  ): Promise<EntityRestGetById200Response>;
  /**
   * Update entity partially - create or update entity attribute identified by its GUID.
   * Supports only primitive attribute type and entity references.
   * It does not support updating complex types like arrays, and maps.
   * Null updates are not possible.
   */
  put(
    options: EntityRestPartialUpdateEntityAttrByGuidParameters
  ): Promise<EntityRestPartialUpdateEntityAttrByGuid200Response>;
  /** Delete an entity identified by its GUID. */
  delete(
    options?: EntityRestDeleteByGuidParameters
  ): Promise<EntityRestDeleteByGuid200Response>;
}

export interface EntityRestDeleteClassification {
  /** List classifications for a given entity represented by a GUID. */
  get(
    options?: EntityRestGetClassificationParameters
  ): Promise<EntityRestGetClassification200Response>;
  /** Delete a given classification from an existing entity represented by a GUID. */
  delete(
    options?: EntityRestDeleteClassificationParameters
  ): Promise<EntityRestDeleteClassification204Response>;
}

export interface EntityRestUpdateClassifications {
  /** List classifications for a given entity represented by a GUID. */
  get(
    options?: EntityRestGetClassificationsParameters
  ): Promise<EntityRestGetClassifications200Response>;
  /** Add classifications to an existing entity represented by a GUID. */
  post(
    options: EntityRestAddClassificationsParameters
  ): Promise<EntityRestAddClassifications204Response>;
  /** Update classifications to an existing entity represented by a guid. */
  put(
    options: EntityRestUpdateClassificationsParameters
  ): Promise<EntityRestUpdateClassifications204Response>;
}

export interface EntityRestDeleteByUniqueAttribute {
  /**
   * Get complete definition of an entity given its type and unique attribute.
   * In addition to the typeName path parameter, attribute key-value pair(s) can be provided in the following format:
   * attr:\<attrName>=<attrValue>.
   * NOTE: The attrName and attrValue should be unique across entities, eg. qualifiedName.
   * The REST request would look something like this:
   * GET /v2/entity/uniqueAttribute/type/aType?attr:aTypeAttribute=someValue.
   */
  get(
    options?: EntityRestGetByUniqueAttributesParameters
  ): Promise<EntityRestGetByUniqueAttributes200Response>;
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
    options: EntityRestPartialUpdateEntityByUniqueAttrsParameters
  ): Promise<EntityRestPartialUpdateEntityByUniqueAttrs200Response>;
  /**
   * Delete an entity identified by its type and unique attributes.
   * In addition to the typeName path parameter, attribute key-value pair(s) can be provided in the following format:
   * attr:\<attrName>=\<attrValue>.
   * NOTE: The attrName and attrValue should be unique across entities, eg. qualifiedName.
   * The REST request would look something like this:
   * DELETE /v2/entity/uniqueAttribute/type/aType?attr:aTypeAttribute=someValue.
   */
  delete(
    options?: EntityRestDeleteByUniqueAttributeParameters
  ): Promise<EntityRestDeleteByUniqueAttribute200Response>;
}

export interface EntityRestDeleteClassificationByUniqueAttribute {
  /** Delete a given classification from an entity identified by its type and unique attributes. */
  delete(
    options?: EntityRestDeleteClassificationByUniqueAttributeParameters
  ): Promise<EntityRestDeleteClassificationByUniqueAttribute204Response>;
}

export interface EntityRestUpdateClassificationsByUniqueAttribute {
  /** Add classification to the entity identified by its type and unique attributes. */
  post(
    options: EntityRestAddClassificationsByUniqueAttributeParameters
  ): Promise<EntityRestAddClassificationsByUniqueAttribute204Response>;
  /** Update classification on an entity identified by its type and unique attributes. */
  put(
    options: EntityRestUpdateClassificationsByUniqueAttributeParameters
  ): Promise<EntityRestUpdateClassificationsByUniqueAttribute204Response>;
}

export interface EntityRestSetClassifications {
  /** Set classifications on entities in bulk. */
  post(
    options: EntityRestSetClassificationsParameters
  ): Promise<EntityRestSetClassifications200Response>;
}

export interface EntityRestGetEntitiesByUniqueAttributes {
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
   * GET /v2/entity/bulk/uniqueAttribute/type/hive_db?attr_0:qualifiedName=db1\@cl1&attr_2:qualifiedName=db2\@cl1
   */
  get(
    options?: EntityRestGetEntitiesByUniqueAttributesParameters
  ): Promise<EntityRestGetEntitiesByUniqueAttributes200Response>;
}

export interface EntityRestGetHeaderById {
  /** Get entity header given its GUID. */
  get(
    options?: EntityRestGetHeaderByIdParameters
  ): Promise<EntityRestGetHeaderById200Response>;
}

export interface GlossaryRestCreateGlossary {
  /** Get all glossaries registered with Atlas. */
  get(
    options?: GlossaryRestGetGlossariesParameters
  ): Promise<GlossaryRestGetGlossaries200Response>;
  /** Create a glossary. */
  post(
    options: GlossaryRestCreateGlossaryParameters
  ): Promise<GlossaryRestCreateGlossary200Response>;
}

export interface GlossaryRestCreateGlossaryCategories {
  /** Create glossary category in bulk. */
  post(
    options: GlossaryRestCreateGlossaryCategoriesParameters
  ): Promise<GlossaryRestCreateGlossaryCategories200Response>;
}

export interface GlossaryRestCreateGlossaryCategory {
  /** Create a glossary category. */
  post(
    options: GlossaryRestCreateGlossaryCategoryParameters
  ): Promise<GlossaryRestCreateGlossaryCategory200Response>;
}

export interface GlossaryRestDeleteGlossaryCategory {
  /** Get specific glossary category by its GUID. */
  get(
    options?: GlossaryRestGetGlossaryCategoryParameters
  ): Promise<GlossaryRestGetGlossaryCategory200Response>;
  /** Update the given glossary category by its GUID. */
  put(
    options: GlossaryRestUpdateGlossaryCategoryParameters
  ): Promise<GlossaryRestUpdateGlossaryCategory200Response>;
  /** Delete a glossary category. */
  delete(
    options?: GlossaryRestDeleteGlossaryCategoryParameters
  ): Promise<GlossaryRestDeleteGlossaryCategory204Response>;
}

export interface GlossaryRestPartialUpdateGlossaryCategory {
  /** Update the glossary category partially. */
  put(
    options: GlossaryRestPartialUpdateGlossaryCategoryParameters
  ): Promise<GlossaryRestPartialUpdateGlossaryCategory200Response>;
}

export interface GlossaryRestGetRelatedCategories {
  /** Get all related categories (parent and children). Limit, offset, and sort parameters are currently not being enabled and won't work even they are passed. */
  get(
    options?: GlossaryRestGetRelatedCategoriesParameters
  ): Promise<GlossaryRestGetRelatedCategories200Response>;
}

export interface GlossaryRestGetCategoryTerms {
  /** Get all terms associated with the specific category. */
  get(
    options?: GlossaryRestGetCategoryTermsParameters
  ): Promise<GlossaryRestGetCategoryTerms200Response>;
}

export interface GlossaryRestCreateGlossaryTerm {
  /** Create a glossary term. */
  post(
    options: GlossaryRestCreateGlossaryTermParameters
  ): Promise<GlossaryRestCreateGlossaryTerm200Response>;
}

export interface GlossaryRestDeleteGlossaryTerm {
  /** Get a specific glossary term by its GUID. */
  get(
    options?: GlossaryRestGetGlossaryTermParameters
  ): Promise<GlossaryRestGetGlossaryTerm200Response>;
  /** Update the given glossary term by its GUID. */
  put(
    options: GlossaryRestUpdateGlossaryTermParameters
  ): Promise<GlossaryRestUpdateGlossaryTerm200Response>;
  /** Delete a glossary term. */
  delete(
    options?: GlossaryRestDeleteGlossaryTermParameters
  ): Promise<GlossaryRestDeleteGlossaryTerm204Response>;
}

export interface GlossaryRestPartialUpdateGlossaryTerm {
  /** Update the glossary term partially. */
  put(
    options: GlossaryRestPartialUpdateGlossaryTermParameters
  ): Promise<GlossaryRestPartialUpdateGlossaryTerm200Response>;
}

export interface GlossaryRestCreateGlossaryTerms {
  /** Create glossary terms in bulk. */
  post(
    options: GlossaryRestCreateGlossaryTermsParameters
  ): Promise<GlossaryRestCreateGlossaryTerms200Response>;
}

export interface GlossaryRestDeleteTermAssignmentFromEntities {
  /** Get all related objects assigned with the specified term. */
  get(
    options?: GlossaryRestGetEntitiesAssignedWithTermParameters
  ): Promise<GlossaryRestGetEntitiesAssignedWithTerm200Response>;
  /** Assign the given term to the provided list of related objects. */
  post(
    options: GlossaryRestAssignTermToEntitiesParameters
  ): Promise<GlossaryRestAssignTermToEntities204Response>;
  /** Delete the term assignment for the given list of related objects. */
  put(
    options: GlossaryRestRemoveTermAssignmentFromEntitiesParameters
  ): Promise<GlossaryRestRemoveTermAssignmentFromEntities204Response>;
  /** Delete the term assignment for the given list of related objects. */
  delete(
    options: GlossaryRestDeleteTermAssignmentFromEntitiesParameters
  ): Promise<GlossaryRestDeleteTermAssignmentFromEntities204Response>;
}

export interface GlossaryRestGetRelatedTerms {
  /** Get all related terms for a specific term by its GUID. Limit, offset, and sort parameters are currently not being enabled and won't work even they are passed. */
  get(
    options?: GlossaryRestGetRelatedTermsParameters
  ): Promise<GlossaryRestGetRelatedTerms200Response>;
}

export interface GlossaryRestDeleteGlossary {
  /** Get a specific Glossary by its GUID. */
  get(
    options?: GlossaryRestGetGlossaryParameters
  ): Promise<GlossaryRestGetGlossary200Response>;
  /** Update the given glossary. */
  put(
    options: GlossaryRestUpdateGlossaryParameters
  ): Promise<GlossaryRestUpdateGlossary200Response>;
  /** Delete a glossary. */
  delete(
    options?: GlossaryRestDeleteGlossaryParameters
  ): Promise<GlossaryRestDeleteGlossary204Response>;
}

export interface GlossaryRestGetGlossaryCategories {
  /** Get the categories belonging to a specific glossary. */
  get(
    options?: GlossaryRestGetGlossaryCategoriesParameters
  ): Promise<GlossaryRestGetGlossaryCategories200Response>;
}

export interface GlossaryRestGetGlossaryCategoriesHeaders {
  /** Get the category headers belonging to a specific glossary. */
  get(
    options?: GlossaryRestGetGlossaryCategoriesHeadersParameters
  ): Promise<GlossaryRestGetGlossaryCategoriesHeaders200Response>;
}

export interface GlossaryRestGetDetailedGlossary {
  /** Get a specific glossary with detailed information. */
  get(
    options?: GlossaryRestGetDetailedGlossaryParameters
  ): Promise<GlossaryRestGetDetailedGlossary200Response>;
}

export interface GlossaryRestPartialUpdateGlossary {
  /** Update the glossary partially. Some properties such as qualifiedName are not allowed to be updated. */
  put(
    options: GlossaryRestPartialUpdateGlossaryParameters
  ): Promise<GlossaryRestPartialUpdateGlossary200Response>;
}

export interface GlossaryRestGetGlossaryTerms {
  /** Get terms belonging to a specific glossary. */
  get(
    options?: GlossaryRestGetGlossaryTermsParameters
  ): Promise<GlossaryRestGetGlossaryTerms200Response>;
}

export interface GlossaryRestGetGlossaryTermHeaders {
  /** Get term headers belonging to a specific glossary. */
  get(
    options?: GlossaryRestGetGlossaryTermHeadersParameters
  ): Promise<GlossaryRestGetGlossaryTermHeaders200Response>;
}

export interface GlossaryRestImportGlossaryTermsViaCSV {
  /** Import Glossary Terms from local csv file */
  post(
    options: GlossaryRestImportGlossaryTermsViaCSVParameters
  ): Promise<GlossaryRestImportGlossaryTermsViaCSV202Response>;
}

export interface GlossaryRestImportGlossaryTermsViaCSVByGlossaryName {
  /** Import Glossary Terms from local csv file by glossaryName */
  post(
    options: GlossaryRestImportGlossaryTermsViaCSVByGlossaryNameParameters
  ): Promise<GlossaryRestImportGlossaryTermsViaCSVByGlossaryName202Response>;
}

export interface GlossaryRestGetImportCSVOperationStatus {
  /** Get the status of import csv operation */
  get(
    options?: GlossaryRestGetImportCSVOperationStatusParameters
  ): Promise<GlossaryRestGetImportCSVOperationStatus200Response>;
}

export interface GlossaryRestExportGlossaryTermsAsCSV {
  /** Export Glossary Terms as csv file */
  post(
    options: GlossaryRestExportGlossaryTermsAsCSVParameters
  ): Promise<GlossaryRestExportGlossaryTermsAsCSV200Response>;
}

export interface GlossaryRestGetTermsByGlossaryName {
  /** Get terms by glossary name. */
  get(
    options?: GlossaryRestGetTermsByGlossaryNameParameters
  ): Promise<GlossaryRestGetTermsByGlossaryName200Response>;
}

export interface DiscoveryRestSearchAdvanced {
  /** Gets data using search. */
  post(
    options: DiscoveryRestSearchAdvancedParameters
  ): Promise<DiscoveryRestSearchAdvanced200Response>;
}

export interface DiscoveryRestSuggest {
  /** Get search suggestions by query criteria. */
  post(
    options: DiscoveryRestSuggestParameters
  ): Promise<DiscoveryRestSuggest200Response>;
}

export interface DiscoveryRestAutoComplete {
  /** Get auto complete options. */
  post(
    options: DiscoveryRestAutoCompleteParameters
  ): Promise<DiscoveryRestAutoComplete200Response>;
}

export interface LineageRestGetLineageGraph {
  /** Get lineage info about the specified entity by GUID. */
  get(
    options?: LineageRestGetLineageGraphParameters
  ): Promise<LineageRestGetLineageGraph200Response>;
}

export interface LineageRestNextLevelLineage {
  /** Return immediate next level lineage info about entity with pagination */
  get(
    options?: LineageRestNextLevelLineageParameters
  ): Promise<LineageRestNextLevelLineage200Response>;
}

export interface RelationshipRestUpdate {
  /** Create a new relationship between entities. */
  post(
    options: RelationshipRestCreateParameters
  ): Promise<RelationshipRestCreate200Response>;
  /** Update an existing relationship between entities. */
  put(
    options: RelationshipRestUpdateParameters
  ): Promise<RelationshipRestUpdate200Response>;
}

export interface RelationshipRestDeleteById {
  /** Get relationship information between entities by its GUID. */
  get(
    options?: RelationshipRestGetById2Parameters
  ): Promise<RelationshipRestGetById2200Response>;
  /** Delete a relationship between entities by its GUID. */
  delete(
    options?: RelationshipRestDeleteByIdParameters
  ): Promise<RelationshipRestDeleteById204Response>;
}

export interface TypesRestGetClassificationDefByGuid {
  /** Get the classification definition for the given GUID. */
  get(
    options?: TypesRestGetClassificationDefByGuidParameters
  ): Promise<TypesRestGetClassificationDefByGuid200Response>;
}

export interface TypesRestGetClassificationDefByName {
  /** Get the classification definition by its name (unique). */
  get(
    options?: TypesRestGetClassificationDefByNameParameters
  ): Promise<TypesRestGetClassificationDefByName200Response>;
}

export interface TypesRestGetEntityDefByGuid {
  /** Get the Entity definition for the given GUID. */
  get(
    options?: TypesRestGetEntityDefByGuidParameters
  ): Promise<TypesRestGetEntityDefByGuid200Response>;
}

export interface TypesRestGetEntityDefByName {
  /** Get the entity definition by its name (unique). */
  get(
    options?: TypesRestGetEntityDefByNameParameters
  ): Promise<TypesRestGetEntityDefByName200Response>;
}

export interface TypesRestGetEnumDefByGuid {
  /** Get the enum definition for the given GUID. */
  get(
    options?: TypesRestGetEnumDefByGuidParameters
  ): Promise<TypesRestGetEnumDefByGuid200Response>;
}

export interface TypesRestGetEnumDefByName {
  /** Get the enum definition by its name (unique). */
  get(
    options?: TypesRestGetEnumDefByNameParameters
  ): Promise<TypesRestGetEnumDefByName200Response>;
}

export interface TypesRestGetRelationshipDefByGuid {
  /** Get the relationship definition for the given GUID. */
  get(
    options?: TypesRestGetRelationshipDefByGuidParameters
  ): Promise<TypesRestGetRelationshipDefByGuid200Response>;
}

export interface TypesRestGetRelationshipDefByName {
  /** Get the relationship definition by its name (unique). */
  get(
    options?: TypesRestGetRelationshipDefByNameParameters
  ): Promise<TypesRestGetRelationshipDefByName200Response>;
}

export interface TypesRestGetStructDefByGuid {
  /** Get the struct definition for the given GUID. */
  get(
    options?: TypesRestGetStructDefByGuidParameters
  ): Promise<TypesRestGetStructDefByGuid200Response>;
}

export interface TypesRestGetStructDefByName {
  /** Get the struct definition by its name (unique). */
  get(
    options?: TypesRestGetStructDefByNameParameters
  ): Promise<TypesRestGetStructDefByName200Response>;
}

export interface TypesRestGetTypeDefByGuid {
  /** Get the type definition for the given GUID. */
  get(
    options?: TypesRestGetTypeDefByGuidParameters
  ): Promise<TypesRestGetTypeDefByGuid200Response>;
}

export interface TypesRestDeleteTypeByName {
  /** Get the type definition by its name (unique). */
  get(
    options?: TypesRestGetTypeDefByNameParameters
  ): Promise<TypesRestGetTypeDefByName200Response>;
  /** Delete API for type identified by its name. */
  delete(
    options?: TypesRestDeleteTypeByNameParameters
  ): Promise<TypesRestDeleteTypeByName204Response>;
}

export interface TypesRestDeleteTypeDefs {
  /** Get all type definitions in Atlas in bulk. */
  get(
    options?: TypesRestGetAllTypeDefsParameters
  ): Promise<TypesRestGetAllTypeDefs200Response>;
  /**
   * Create all atlas type definitions in bulk, only new definitions will be created.
   * Any changes to the existing definitions will be discarded.
   */
  post(
    options: TypesRestCreateTypeDefsParameters
  ): Promise<TypesRestCreateTypeDefs200Response>;
  /** Update all types in bulk, changes detected in the type definitions would be persisted. */
  put(
    options: TypesRestUpdateAtlasTypeDefsParameters
  ): Promise<TypesRestUpdateAtlasTypeDefs200Response>;
  /** Delete API for all types in bulk. */
  delete(
    options: TypesRestDeleteTypeDefsParameters
  ): Promise<TypesRestDeleteTypeDefs204Response>;
}

export interface TypesRestGetTypeDefHeaders {
  /** List all type definitions returned as a list of minimal information header. */
  get(
    options?: TypesRestGetTypeDefHeadersParameters
  ): Promise<TypesRestGetTypeDefHeaders200Response>;
}

export interface TypesRestGetTermTemplateDefByGuid {
  /** Get the term template definition for the given GUID. */
  get(
    options?: TypesRestGetTermTemplateDefByGuidParameters
  ): Promise<TypesRestGetTermTemplateDefByGuid200Response>;
}

export interface TypesRestGetTermTemplateDefByName {
  /** Get the term template definition by its name (unique). */
  get(
    options?: TypesRestGetTermTemplateDefByNameParameters
  ): Promise<TypesRestGetTermTemplateDefByName200Response>;
}

export interface Routes {
  /** Resource for '/atlas/v2/entity' has methods for the following verbs: post */
  (path: "/atlas/v2/entity"): EntityRestCreateOrUpdate;
  /** Resource for '/atlas/v2/entity/bulk' has methods for the following verbs: get, post, delete */
  (path: "/atlas/v2/entity/bulk"): EntityRestBulkDelete;
  /** Resource for '/atlas/v2/entity/bulk/classification' has methods for the following verbs: post */
  (path: "/atlas/v2/entity/bulk/classification"): EntityRestAddClassification;
  /** Resource for '/atlas/v2/entity/guid/\{guid\}' has methods for the following verbs: get, put, delete */
  (path: "/atlas/v2/entity/guid/{guid}", guid: string): EntityRestDeleteByGuid;
  /** Resource for '/atlas/v2/entity/guid/\{guid\}/classification/\{classificationName\}' has methods for the following verbs: get, delete */
  (
    path: "/atlas/v2/entity/guid/{guid}/classification/{classificationName}",
    guid: string,
    classificationName: string
  ): EntityRestDeleteClassification;
  /** Resource for '/atlas/v2/entity/guid/\{guid\}/classifications' has methods for the following verbs: get, post, put */
  (
    path: "/atlas/v2/entity/guid/{guid}/classifications",
    guid: string
  ): EntityRestUpdateClassifications;
  /** Resource for '/atlas/v2/entity/uniqueAttribute/type/\{typeName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/atlas/v2/entity/uniqueAttribute/type/{typeName}",
    typeName: string
  ): EntityRestDeleteByUniqueAttribute;
  /** Resource for '/atlas/v2/entity/uniqueAttribute/type/\{typeName\}/classification/\{classificationName\}' has methods for the following verbs: delete */
  (
    path: "/atlas/v2/entity/uniqueAttribute/type/{typeName}/classification/{classificationName}",
    typeName: string,
    classificationName: string
  ): EntityRestDeleteClassificationByUniqueAttribute;
  /** Resource for '/atlas/v2/entity/uniqueAttribute/type/\{typeName\}/classifications' has methods for the following verbs: post, put */
  (
    path: "/atlas/v2/entity/uniqueAttribute/type/{typeName}/classifications",
    typeName: string
  ): EntityRestUpdateClassificationsByUniqueAttribute;
  /** Resource for '/atlas/v2/entity/bulk/setClassifications' has methods for the following verbs: post */
  (
    path: "/atlas/v2/entity/bulk/setClassifications"
  ): EntityRestSetClassifications;
  /** Resource for '/atlas/v2/entity/bulk/uniqueAttribute/type/\{typeName\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/entity/bulk/uniqueAttribute/type/{typeName}",
    typeName: string
  ): EntityRestGetEntitiesByUniqueAttributes;
  /** Resource for '/atlas/v2/entity/guid/\{guid\}/header' has methods for the following verbs: get */
  (
    path: "/atlas/v2/entity/guid/{guid}/header",
    guid: string
  ): EntityRestGetHeaderById;
  /** Resource for '/atlas/v2/glossary' has methods for the following verbs: get, post */
  (path: "/atlas/v2/glossary"): GlossaryRestCreateGlossary;
  /** Resource for '/atlas/v2/glossary/categories' has methods for the following verbs: post */
  (path: "/atlas/v2/glossary/categories"): GlossaryRestCreateGlossaryCategories;
  /** Resource for '/atlas/v2/glossary/category' has methods for the following verbs: post */
  (path: "/atlas/v2/glossary/category"): GlossaryRestCreateGlossaryCategory;
  /** Resource for '/atlas/v2/glossary/category/\{categoryGuid\}' has methods for the following verbs: get, put, delete */
  (
    path: "/atlas/v2/glossary/category/{categoryGuid}",
    categoryGuid: string
  ): GlossaryRestDeleteGlossaryCategory;
  /** Resource for '/atlas/v2/glossary/category/\{categoryGuid\}/partial' has methods for the following verbs: put */
  (
    path: "/atlas/v2/glossary/category/{categoryGuid}/partial",
    categoryGuid: string
  ): GlossaryRestPartialUpdateGlossaryCategory;
  /** Resource for '/atlas/v2/glossary/category/\{categoryGuid\}/related' has methods for the following verbs: get */
  (
    path: "/atlas/v2/glossary/category/{categoryGuid}/related",
    categoryGuid: string
  ): GlossaryRestGetRelatedCategories;
  /** Resource for '/atlas/v2/glossary/category/\{categoryGuid\}/terms' has methods for the following verbs: get */
  (
    path: "/atlas/v2/glossary/category/{categoryGuid}/terms",
    categoryGuid: string
  ): GlossaryRestGetCategoryTerms;
  /** Resource for '/atlas/v2/glossary/term' has methods for the following verbs: post */
  (path: "/atlas/v2/glossary/term"): GlossaryRestCreateGlossaryTerm;
  /** Resource for '/atlas/v2/glossary/term/\{termGuid\}' has methods for the following verbs: get, put, delete */
  (
    path: "/atlas/v2/glossary/term/{termGuid}",
    termGuid: string
  ): GlossaryRestDeleteGlossaryTerm;
  /** Resource for '/atlas/v2/glossary/term/\{termGuid\}/partial' has methods for the following verbs: put */
  (
    path: "/atlas/v2/glossary/term/{termGuid}/partial",
    termGuid: string
  ): GlossaryRestPartialUpdateGlossaryTerm;
  /** Resource for '/atlas/v2/glossary/terms' has methods for the following verbs: post */
  (path: "/atlas/v2/glossary/terms"): GlossaryRestCreateGlossaryTerms;
  /** Resource for '/atlas/v2/glossary/terms/\{termGuid\}/assignedEntities' has methods for the following verbs: get, post, put, delete */
  (
    path: "/atlas/v2/glossary/terms/{termGuid}/assignedEntities",
    termGuid: string
  ): GlossaryRestDeleteTermAssignmentFromEntities;
  /** Resource for '/atlas/v2/glossary/terms/\{termGuid\}/related' has methods for the following verbs: get */
  (
    path: "/atlas/v2/glossary/terms/{termGuid}/related",
    termGuid: string
  ): GlossaryRestGetRelatedTerms;
  /** Resource for '/atlas/v2/glossary/\{glossaryGuid\}' has methods for the following verbs: get, put, delete */
  (
    path: "/atlas/v2/glossary/{glossaryGuid}",
    glossaryGuid: string
  ): GlossaryRestDeleteGlossary;
  /** Resource for '/atlas/v2/glossary/\{glossaryGuid\}/categories' has methods for the following verbs: get */
  (
    path: "/atlas/v2/glossary/{glossaryGuid}/categories",
    glossaryGuid: string
  ): GlossaryRestGetGlossaryCategories;
  /** Resource for '/atlas/v2/glossary/\{glossaryGuid\}/categories/headers' has methods for the following verbs: get */
  (
    path: "/atlas/v2/glossary/{glossaryGuid}/categories/headers",
    glossaryGuid: string
  ): GlossaryRestGetGlossaryCategoriesHeaders;
  /** Resource for '/atlas/v2/glossary/\{glossaryGuid\}/detailed' has methods for the following verbs: get */
  (
    path: "/atlas/v2/glossary/{glossaryGuid}/detailed",
    glossaryGuid: string
  ): GlossaryRestGetDetailedGlossary;
  /** Resource for '/atlas/v2/glossary/\{glossaryGuid\}/partial' has methods for the following verbs: put */
  (
    path: "/atlas/v2/glossary/{glossaryGuid}/partial",
    glossaryGuid: string
  ): GlossaryRestPartialUpdateGlossary;
  /** Resource for '/atlas/v2/glossary/\{glossaryGuid\}/terms' has methods for the following verbs: get */
  (
    path: "/atlas/v2/glossary/{glossaryGuid}/terms",
    glossaryGuid: string
  ): GlossaryRestGetGlossaryTerms;
  /** Resource for '/atlas/v2/glossary/\{glossaryGuid\}/terms/headers' has methods for the following verbs: get */
  (
    path: "/atlas/v2/glossary/{glossaryGuid}/terms/headers",
    glossaryGuid: string
  ): GlossaryRestGetGlossaryTermHeaders;
  /** Resource for '/glossary/\{glossaryGuid\}/terms/import' has methods for the following verbs: post */
  (
    path: "/glossary/{glossaryGuid}/terms/import",
    glossaryGuid: string
  ): GlossaryRestImportGlossaryTermsViaCSV;
  /** Resource for '/glossary/name/\{glossaryName\}/terms/import' has methods for the following verbs: post */
  (
    path: "/glossary/name/{glossaryName}/terms/import",
    glossaryName: string
  ): GlossaryRestImportGlossaryTermsViaCSVByGlossaryName;
  /** Resource for '/glossary/terms/import/\{operationGuid\}' has methods for the following verbs: get */
  (
    path: "/glossary/terms/import/{operationGuid}",
    operationGuid: string
  ): GlossaryRestGetImportCSVOperationStatus;
  /** Resource for '/glossary/\{glossaryGuid\}/terms/export' has methods for the following verbs: post */
  (
    path: "/glossary/{glossaryGuid}/terms/export",
    glossaryGuid: string
  ): GlossaryRestExportGlossaryTermsAsCSV;
  /** Resource for '/glossary/name/\{glossaryName\}/terms' has methods for the following verbs: get */
  (
    path: "/glossary/name/{glossaryName}/terms",
    glossaryName: string
  ): GlossaryRestGetTermsByGlossaryName;
  /** Resource for '/search/query' has methods for the following verbs: post */
  (path: "/search/query"): DiscoveryRestSearchAdvanced;
  /** Resource for '/search/suggest' has methods for the following verbs: post */
  (path: "/search/suggest"): DiscoveryRestSuggest;
  /** Resource for '/search/autocomplete' has methods for the following verbs: post */
  (path: "/search/autocomplete"): DiscoveryRestAutoComplete;
  /** Resource for '/atlas/v2/lineage/\{guid\}' has methods for the following verbs: get */
  (path: "/atlas/v2/lineage/{guid}", guid: string): LineageRestGetLineageGraph;
  /** Resource for '/lineage/\{guid\}/next/' has methods for the following verbs: get */
  (path: "/lineage/{guid}/next/", guid: string): LineageRestNextLevelLineage;
  /** Resource for '/atlas/v2/relationship' has methods for the following verbs: post, put */
  (path: "/atlas/v2/relationship"): RelationshipRestUpdate;
  /** Resource for '/atlas/v2/relationship/guid/\{guid\}' has methods for the following verbs: get, delete */
  (
    path: "/atlas/v2/relationship/guid/{guid}",
    guid: string
  ): RelationshipRestDeleteById;
  /** Resource for '/atlas/v2/types/classificationdef/guid/\{guid\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/types/classificationdef/guid/{guid}",
    guid: string
  ): TypesRestGetClassificationDefByGuid;
  /** Resource for '/atlas/v2/types/classificationdef/name/\{name\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/types/classificationdef/name/{name}",
    name: string
  ): TypesRestGetClassificationDefByName;
  /** Resource for '/atlas/v2/types/entitydef/guid/\{guid\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/types/entitydef/guid/{guid}",
    guid: string
  ): TypesRestGetEntityDefByGuid;
  /** Resource for '/atlas/v2/types/entitydef/name/\{name\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/types/entitydef/name/{name}",
    name: string
  ): TypesRestGetEntityDefByName;
  /** Resource for '/atlas/v2/types/enumdef/guid/\{guid\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/types/enumdef/guid/{guid}",
    guid: string
  ): TypesRestGetEnumDefByGuid;
  /** Resource for '/atlas/v2/types/enumdef/name/\{name\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/types/enumdef/name/{name}",
    name: string
  ): TypesRestGetEnumDefByName;
  /** Resource for '/atlas/v2/types/relationshipdef/guid/\{guid\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/types/relationshipdef/guid/{guid}",
    guid: string
  ): TypesRestGetRelationshipDefByGuid;
  /** Resource for '/atlas/v2/types/relationshipdef/name/\{name\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/types/relationshipdef/name/{name}",
    name: string
  ): TypesRestGetRelationshipDefByName;
  /** Resource for '/atlas/v2/types/structdef/guid/\{guid\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/types/structdef/guid/{guid}",
    guid: string
  ): TypesRestGetStructDefByGuid;
  /** Resource for '/atlas/v2/types/structdef/name/\{name\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/types/structdef/name/{name}",
    name: string
  ): TypesRestGetStructDefByName;
  /** Resource for '/atlas/v2/types/typedef/guid/\{guid\}' has methods for the following verbs: get */
  (
    path: "/atlas/v2/types/typedef/guid/{guid}",
    guid: string
  ): TypesRestGetTypeDefByGuid;
  /** Resource for '/atlas/v2/types/typedef/name/\{name\}' has methods for the following verbs: get, delete */
  (
    path: "/atlas/v2/types/typedef/name/{name}",
    name: string
  ): TypesRestDeleteTypeByName;
  /** Resource for '/atlas/v2/types/typedefs' has methods for the following verbs: get, post, put, delete */
  (path: "/atlas/v2/types/typedefs"): TypesRestDeleteTypeDefs;
  /** Resource for '/atlas/v2/types/typedefs/headers' has methods for the following verbs: get */
  (path: "/atlas/v2/types/typedefs/headers"): TypesRestGetTypeDefHeaders;
  /** Resource for '/types/termtemplatedef/guid/\{guid\}' has methods for the following verbs: get */
  (
    path: "/types/termtemplatedef/guid/{guid}",
    guid: string
  ): TypesRestGetTermTemplateDefByGuid;
  /** Resource for '/types/termtemplatedef/name/\{name\}' has methods for the following verbs: get */
  (
    path: "/types/termtemplatedef/name/{name}",
    name: string
  ): TypesRestGetTermTemplateDefByName;
}

export type PurviewCatalogClient = Client & {
  path: Routes;
};

export interface PurviewCatalogFactory {
  (
    Endpoint: string,
    credentials: TokenCredential | KeyCredential,
    options?: ClientOptions
  ): void;
}

export default function PurviewCatalog(
  Endpoint: string,
  credentials: TokenCredential | KeyCredential,
  options: ClientOptions = {}
): PurviewCatalogClient {
  const baseUrl = options.baseUrl ?? `${Endpoint}/api`;
  options.apiVersion = options.apiVersion ?? "2020-12-01-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://purview.azure.net/.default"]
    }
  };

  return getClient(baseUrl, credentials, options) as PurviewCatalogClient;
}
