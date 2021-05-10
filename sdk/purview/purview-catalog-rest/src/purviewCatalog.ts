// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  EntityCreateOrUpdateParameters,
  EntityListByGuidsParameters,
  EntityCreateOrUpdateEntitiesParameters,
  EntityDeleteByGuidsParameters,
  EntityAddClassificationParameters,
  EntityGetByGuidParameters,
  EntityCreateOrUpdateByGuidParameters,
  EntityDeleteByGuidParameters,
  EntityGetClassificationParameters,
  EntityDeleteClassificationParameters,
  EntityGetClassificationsParameters,
  EntityAddClassificationsParameters,
  EntityUpdateClassificationsParameters,
  EntityGetByUniqueAttributesParameters,
  EntityCreateOrUpdateByUniqueAttributeParameters,
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
  SearchParameters,
  SuggestParameters,
  AutoCompleteParameters,
  GetLineageGraphParameters,
  NextPageLineageParameters,
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
} from "./parameters";
import {
  EntityCreateOrUpdate200Response,
  EntityListByGuids200Response,
  EntityCreateOrUpdateEntities200Response,
  EntityDeleteByGuids200Response,
  EntityAddClassification204Response,
  EntityGetByGuid200Response,
  EntityCreateOrUpdateByGuid200Response,
  EntityDeleteByGuid200Response,
  EntityGetClassification200Response,
  EntityDeleteClassification204Response,
  EntityGetClassifications200Response,
  EntityAddClassifications204Response,
  EntityUpdateClassifications204Response,
  EntityGetByUniqueAttributes200Response,
  EntityCreateOrUpdateByUniqueAttribute200Response,
  EntityDeleteByUniqueAttribute200Response,
  EntityDeleteClassificationByUniqueAttribute204Response,
  EntityAddClassificationsByUniqueAttribute204Response,
  EntityUpdateClassificationsByUniqueAttribute204Response,
  EntitySetClassifications200Response,
  EntityGetEntitiesByUniqueAttributes200Response,
  EntityGetHeader200Response,
  GlossaryListGlossaries200Response,
  GlossaryCreateGlossary200Response,
  GlossaryCreateGlossaryCategories200Response,
  GlossaryCreateGlossaryCategory200Response,
  GlossaryGetGlossaryCategory200Response,
  GlossaryUpdateGlossaryCategory200Response,
  GlossaryDeleteGlossaryCategory204Response,
  GlossaryPartialUpdateGlossaryCategory200Response,
  GlossaryListRelatedCategories200Response,
  GlossaryListCategoryTerms200Response,
  GlossaryCreateGlossaryTerm200Response,
  GlossaryGetGlossaryTerm200Response,
  GlossaryUpdateGlossaryTerm200Response,
  GlossaryDeleteGlossaryTerm204Response,
  GlossaryPartialUpdateGlossaryTerm200Response,
  GlossaryCreateGlossaryTerms200Response,
  GlossaryGetEntitiesAssignedWithTerm200Response,
  GlossaryAssignTermToEntities204Response,
  GlossaryRemoveTermAssignmentFromEntities204Response,
  GlossaryDeleteTermAssignmentFromEntities204Response,
  GlossaryListRelatedTerms200Response,
  GlossaryGetGlossary200Response,
  GlossaryUpdateGlossary200Response,
  GlossaryDeleteGlossary204Response,
  GlossaryListGlossaryCategories200Response,
  GlossaryListGlossaryCategoriesHeaders200Response,
  GlossaryGetDetailedGlossary200Response,
  GlossaryPartialUpdateGlossary200Response,
  GlossaryListGlossaryTerms200Response,
  GlossaryListGlossaryTermHeaders200Response,
  GlossaryImportGlossaryTermsViaCsv202Response,
  GlossaryImportGlossaryTermsViaCsvByGlossaryName202Response,
  GlossaryGetImportCsvOperationStatus200Response,
  GlossaryExportGlossaryTermsAsCsv200Response,
  GlossaryListTermsByGlossaryName200Response,
  Search200Response,
  Suggest200Response,
  AutoComplete200Response,
  GetLineageGraph200Response,
  NextPageLineage200Response,
  RelationshipCreate200Response,
  RelationshipUpdate200Response,
  RelationshipGet200Response,
  RelationshipDelete204Response,
  TypesGetClassificationDefByGuid200Response,
  TypesGetClassificationDefByName200Response,
  TypesGetEntityDefinitionByGuid200Response,
  TypesGetEntityDefinitionByName200Response,
  TypesGetEnumDefByGuid200Response,
  TypesGetEnumDefByName200Response,
  TypesGetRelationshipDefByGuid200Response,
  TypesGetRelationshipDefByName200Response,
  TypesGetStructDefByGuid200Response,
  TypesGetStructDefByName200Response,
  TypesGetTypeDefinitionByGuid200Response,
  TypesGetTypeDefinitionByName200Response,
  TypesDeleteTypeByName204Response,
  TypesGetAllTypeDefinitions200Response,
  TypesCreateTypeDefinitions200Response,
  TypesUpdateAtlasTypeDefinitions200Response,
  TypesDeleteTypeDefinitions204Response,
  TypesListTypeDefinitionHeaders200Response,
  TypesGetTermTemplateDefByGuid200Response,
  TypesGetTermTemplateDefByName200Response,
} from "./responses";
import { getClient, ClientOptions, Client } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

export interface EntityCreateOrUpdate {
  /**
   * Create or update an entity in Atlas.
   * Existing entity is matched using its unique guid if supplied or by its unique attributes eg: qualifiedName.
   * Map and array of collections are not well supported. E.g., array<array<int>>, array<map<string, int>>.
   */
  post(options: EntityCreateOrUpdateParameters): Promise<EntityCreateOrUpdate200Response>;
}

export interface EntityDeleteByGuids {
  /** List entities in bulk identified by its GUIDs. */
  get(options?: EntityListByGuidsParameters): Promise<EntityListByGuids200Response>;
  /**
   * Create or update entities in Atlas in bulk.
   * Existing entity is matched using its unique guid if supplied or by its unique attributes eg: qualifiedName.
   * Map and array of collections are not well supported. E.g., array<array<int>>, array<map<string, int>>.
   */
  post(
    options: EntityCreateOrUpdateEntitiesParameters
  ): Promise<EntityCreateOrUpdateEntities200Response>;
  /** Delete a list of entities in bulk identified by their GUIDs or unique attributes. */
  delete(options?: EntityDeleteByGuidsParameters): Promise<EntityDeleteByGuids200Response>;
}

export interface EntityAddClassification {
  /** Associate a classification to multiple entities in bulk. */
  post(options: EntityAddClassificationParameters): Promise<EntityAddClassification204Response>;
}

export interface EntityDeleteByGuid {
  /** Get complete definition of an entity given its GUID. */
  get(options?: EntityGetByGuidParameters): Promise<EntityGetByGuid200Response>;
  /**
   * Update entity partially - create or update entity attribute identified by its GUID.
   * Supports only primitive attribute type and entity references.
   * It does not support updating complex types like arrays, and maps.
   * Null updates are not possible.
   */
  put(
    options: EntityCreateOrUpdateByGuidParameters
  ): Promise<EntityCreateOrUpdateByGuid200Response>;
  /** Delete an entity identified by its GUID. */
  delete(options?: EntityDeleteByGuidParameters): Promise<EntityDeleteByGuid200Response>;
}

export interface EntityDeleteClassification {
  /** List classifications for a given entity represented by a GUID. */
  get(options?: EntityGetClassificationParameters): Promise<EntityGetClassification200Response>;
  /** Delete a given classification from an existing entity represented by a GUID. */
  delete(
    options?: EntityDeleteClassificationParameters
  ): Promise<EntityDeleteClassification204Response>;
}

export interface EntityUpdateClassifications {
  /** List classifications for a given entity represented by a GUID. */
  get(options?: EntityGetClassificationsParameters): Promise<EntityGetClassifications200Response>;
  /** Add classifications to an existing entity represented by a GUID. */
  post(options: EntityAddClassificationsParameters): Promise<EntityAddClassifications204Response>;
  /** Update classifications to an existing entity represented by a guid. */
  put(
    options: EntityUpdateClassificationsParameters
  ): Promise<EntityUpdateClassifications204Response>;
}

export interface EntityDeleteByUniqueAttribute {
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
  ): Promise<EntityGetByUniqueAttributes200Response>;
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
    options: EntityCreateOrUpdateByUniqueAttributeParameters
  ): Promise<EntityCreateOrUpdateByUniqueAttribute200Response>;
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
  ): Promise<EntityDeleteByUniqueAttribute200Response>;
}

export interface EntityDeleteClassificationByUniqueAttribute {
  /** Delete a given classification from an entity identified by its type and unique attributes. */
  delete(
    options?: EntityDeleteClassificationByUniqueAttributeParameters
  ): Promise<EntityDeleteClassificationByUniqueAttribute204Response>;
}

export interface EntityUpdateClassificationsByUniqueAttribute {
  /** Add classification to the entity identified by its type and unique attributes. */
  post(
    options: EntityAddClassificationsByUniqueAttributeParameters
  ): Promise<EntityAddClassificationsByUniqueAttribute204Response>;
  /** Update classification on an entity identified by its type and unique attributes. */
  put(
    options: EntityUpdateClassificationsByUniqueAttributeParameters
  ): Promise<EntityUpdateClassificationsByUniqueAttribute204Response>;
}

export interface EntitySetClassifications {
  /** Set classifications on entities in bulk. */
  post(options: EntitySetClassificationsParameters): Promise<EntitySetClassifications200Response>;
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
   * GET /v2/entity/bulk/uniqueAttribute/type/hive_db?attr_0:qualifiedName=db1\@cl1&attr_2:qualifiedName=db2\@cl1
   */
  get(
    options?: EntityGetEntitiesByUniqueAttributesParameters
  ): Promise<EntityGetEntitiesByUniqueAttributes200Response>;
}

export interface EntityGetHeader {
  /** Get entity header given its GUID. */
  get(options?: EntityGetHeaderParameters): Promise<EntityGetHeader200Response>;
}

export interface GlossaryCreateGlossary {
  /** Get all glossaries registered with Atlas. */
  get(options?: GlossaryListGlossariesParameters): Promise<GlossaryListGlossaries200Response>;
  /** Create a glossary. */
  post(options: GlossaryCreateGlossaryParameters): Promise<GlossaryCreateGlossary200Response>;
}

export interface GlossaryCreateGlossaryCategories {
  /** Create glossary category in bulk. */
  post(
    options: GlossaryCreateGlossaryCategoriesParameters
  ): Promise<GlossaryCreateGlossaryCategories200Response>;
}

export interface GlossaryCreateGlossaryCategory {
  /** Create a glossary category. */
  post(
    options: GlossaryCreateGlossaryCategoryParameters
  ): Promise<GlossaryCreateGlossaryCategory200Response>;
}

export interface GlossaryDeleteGlossaryCategory {
  /** Get specific glossary category by its GUID. */
  get(
    options?: GlossaryGetGlossaryCategoryParameters
  ): Promise<GlossaryGetGlossaryCategory200Response>;
  /** Update the given glossary category by its GUID. */
  put(
    options: GlossaryUpdateGlossaryCategoryParameters
  ): Promise<GlossaryUpdateGlossaryCategory200Response>;
  /** Delete a glossary category. */
  delete(
    options?: GlossaryDeleteGlossaryCategoryParameters
  ): Promise<GlossaryDeleteGlossaryCategory204Response>;
}

export interface GlossaryPartialUpdateGlossaryCategory {
  /** Update the glossary category partially. */
  put(
    options: GlossaryPartialUpdateGlossaryCategoryParameters
  ): Promise<GlossaryPartialUpdateGlossaryCategory200Response>;
}

export interface GlossaryListRelatedCategories {
  /** Get all related categories (parent and children). Limit, offset, and sort parameters are currently not being enabled and won't work even they are passed. */
  get(
    options?: GlossaryListRelatedCategoriesParameters
  ): Promise<GlossaryListRelatedCategories200Response>;
}

export interface GlossaryListCategoryTerms {
  /** Get all terms associated with the specific category. */
  get(options?: GlossaryListCategoryTermsParameters): Promise<GlossaryListCategoryTerms200Response>;
}

export interface GlossaryCreateGlossaryTerm {
  /** Create a glossary term. */
  post(
    options: GlossaryCreateGlossaryTermParameters
  ): Promise<GlossaryCreateGlossaryTerm200Response>;
}

export interface GlossaryDeleteGlossaryTerm {
  /** Get a specific glossary term by its GUID. */
  get(options?: GlossaryGetGlossaryTermParameters): Promise<GlossaryGetGlossaryTerm200Response>;
  /** Update the given glossary term by its GUID. */
  put(
    options: GlossaryUpdateGlossaryTermParameters
  ): Promise<GlossaryUpdateGlossaryTerm200Response>;
  /** Delete a glossary term. */
  delete(
    options?: GlossaryDeleteGlossaryTermParameters
  ): Promise<GlossaryDeleteGlossaryTerm204Response>;
}

export interface GlossaryPartialUpdateGlossaryTerm {
  /** Update the glossary term partially. */
  put(
    options: GlossaryPartialUpdateGlossaryTermParameters
  ): Promise<GlossaryPartialUpdateGlossaryTerm200Response>;
}

export interface GlossaryCreateGlossaryTerms {
  /** Create glossary terms in bulk. */
  post(
    options: GlossaryCreateGlossaryTermsParameters
  ): Promise<GlossaryCreateGlossaryTerms200Response>;
}

export interface GlossaryDeleteTermAssignmentFromEntities {
  /** Get all related objects assigned with the specified term. */
  get(
    options?: GlossaryGetEntitiesAssignedWithTermParameters
  ): Promise<GlossaryGetEntitiesAssignedWithTerm200Response>;
  /** Assign the given term to the provided list of related objects. */
  post(
    options: GlossaryAssignTermToEntitiesParameters
  ): Promise<GlossaryAssignTermToEntities204Response>;
  /** Delete the term assignment for the given list of related objects. */
  put(
    options: GlossaryRemoveTermAssignmentFromEntitiesParameters
  ): Promise<GlossaryRemoveTermAssignmentFromEntities204Response>;
  /** Delete the term assignment for the given list of related objects. */
  delete(
    options: GlossaryDeleteTermAssignmentFromEntitiesParameters
  ): Promise<GlossaryDeleteTermAssignmentFromEntities204Response>;
}

export interface GlossaryListRelatedTerms {
  /** Get all related terms for a specific term by its GUID. Limit, offset, and sort parameters are currently not being enabled and won't work even they are passed. */
  get(options?: GlossaryListRelatedTermsParameters): Promise<GlossaryListRelatedTerms200Response>;
}

export interface GlossaryDeleteGlossary {
  /** Get a specific Glossary by its GUID. */
  get(options?: GlossaryGetGlossaryParameters): Promise<GlossaryGetGlossary200Response>;
  /** Update the given glossary. */
  put(options: GlossaryUpdateGlossaryParameters): Promise<GlossaryUpdateGlossary200Response>;
  /** Delete a glossary. */
  delete(options?: GlossaryDeleteGlossaryParameters): Promise<GlossaryDeleteGlossary204Response>;
}

export interface GlossaryListGlossaryCategories {
  /** Get the categories belonging to a specific glossary. */
  get(
    options?: GlossaryListGlossaryCategoriesParameters
  ): Promise<GlossaryListGlossaryCategories200Response>;
}

export interface GlossaryListGlossaryCategoriesHeaders {
  /** Get the category headers belonging to a specific glossary. */
  get(
    options?: GlossaryListGlossaryCategoriesHeadersParameters
  ): Promise<GlossaryListGlossaryCategoriesHeaders200Response>;
}

export interface GlossaryGetDetailedGlossary {
  /** Get a specific glossary with detailed information. */
  get(
    options?: GlossaryGetDetailedGlossaryParameters
  ): Promise<GlossaryGetDetailedGlossary200Response>;
}

export interface GlossaryPartialUpdateGlossary {
  /** Update the glossary partially. Some properties such as qualifiedName are not allowed to be updated. */
  put(
    options: GlossaryPartialUpdateGlossaryParameters
  ): Promise<GlossaryPartialUpdateGlossary200Response>;
}

export interface GlossaryListGlossaryTerms {
  /** Get terms belonging to a specific glossary. */
  get(options?: GlossaryListGlossaryTermsParameters): Promise<GlossaryListGlossaryTerms200Response>;
}

export interface GlossaryListGlossaryTermHeaders {
  /** Get term headers belonging to a specific glossary. */
  get(
    options?: GlossaryListGlossaryTermHeadersParameters
  ): Promise<GlossaryListGlossaryTermHeaders200Response>;
}

export interface GlossaryImportGlossaryTermsViaCsv {
  /** Import Glossary Terms from local csv file */
  post(
    options: GlossaryImportGlossaryTermsViaCsvParameters
  ): Promise<GlossaryImportGlossaryTermsViaCsv202Response>;
}

export interface GlossaryImportGlossaryTermsViaCsvByGlossaryName {
  /** Import Glossary Terms from local csv file by glossaryName */
  post(
    options: GlossaryImportGlossaryTermsViaCsvByGlossaryNameParameters
  ): Promise<GlossaryImportGlossaryTermsViaCsvByGlossaryName202Response>;
}

export interface GlossaryGetImportCsvOperationStatus {
  /** Get the status of import csv operation */
  get(
    options?: GlossaryGetImportCsvOperationStatusParameters
  ): Promise<GlossaryGetImportCsvOperationStatus200Response>;
}

export interface GlossaryExportGlossaryTermsAsCsv {
  /** Export Glossary Terms as csv file */
  post(
    options: GlossaryExportGlossaryTermsAsCsvParameters
  ): Promise<GlossaryExportGlossaryTermsAsCsv200Response>;
}

export interface GlossaryListTermsByGlossaryName {
  /** Get terms by glossary name. */
  get(
    options?: GlossaryListTermsByGlossaryNameParameters
  ): Promise<GlossaryListTermsByGlossaryName200Response>;
}

export interface Search {
  /** Gets data using search. */
  post(options: SearchParameters): Promise<Search200Response>;
}

export interface Suggest {
  /** Get search suggestions by query criteria. */
  post(options: SuggestParameters): Promise<Suggest200Response>;
}

export interface AutoComplete {
  /** Get auto complete options. */
  post(options: AutoCompleteParameters): Promise<AutoComplete200Response>;
}

export interface GetLineageGraph {
  /** Get lineage info of the entity specified by GUID. */
  get(options?: GetLineageGraphParameters): Promise<GetLineageGraph200Response>;
}

export interface NextPageLineage {
  /** Return immediate next page lineage info about entity with pagination */
  get(options?: NextPageLineageParameters): Promise<NextPageLineage200Response>;
}

export interface RelationshipUpdate {
  /** Create a new relationship between entities. */
  post(options: RelationshipCreateParameters): Promise<RelationshipCreate200Response>;
  /** Update an existing relationship between entities. */
  put(options: RelationshipUpdateParameters): Promise<RelationshipUpdate200Response>;
}

export interface RelationshipDelete {
  /** Get relationship information between entities by its GUID. */
  get(options?: RelationshipGetParameters): Promise<RelationshipGet200Response>;
  /** Delete a relationship between entities by its GUID. */
  delete(options?: RelationshipDeleteParameters): Promise<RelationshipDelete204Response>;
}

export interface TypesGetClassificationDefByGuid {
  /** Get the classification definition for the given GUID. */
  get(
    options?: TypesGetClassificationDefByGuidParameters
  ): Promise<TypesGetClassificationDefByGuid200Response>;
}

export interface TypesGetClassificationDefByName {
  /** Get the classification definition by its name (unique). */
  get(
    options?: TypesGetClassificationDefByNameParameters
  ): Promise<TypesGetClassificationDefByName200Response>;
}

export interface TypesGetEntityDefinitionByGuid {
  /** Get the Entity definition for the given GUID. */
  get(
    options?: TypesGetEntityDefinitionByGuidParameters
  ): Promise<TypesGetEntityDefinitionByGuid200Response>;
}

export interface TypesGetEntityDefinitionByName {
  /** Get the entity definition by its name (unique). */
  get(
    options?: TypesGetEntityDefinitionByNameParameters
  ): Promise<TypesGetEntityDefinitionByName200Response>;
}

export interface TypesGetEnumDefByGuid {
  /** Get the enum definition for the given GUID. */
  get(options?: TypesGetEnumDefByGuidParameters): Promise<TypesGetEnumDefByGuid200Response>;
}

export interface TypesGetEnumDefByName {
  /** Get the enum definition by its name (unique). */
  get(options?: TypesGetEnumDefByNameParameters): Promise<TypesGetEnumDefByName200Response>;
}

export interface TypesGetRelationshipDefByGuid {
  /** Get the relationship definition for the given GUID. */
  get(
    options?: TypesGetRelationshipDefByGuidParameters
  ): Promise<TypesGetRelationshipDefByGuid200Response>;
}

export interface TypesGetRelationshipDefByName {
  /** Get the relationship definition by its name (unique). */
  get(
    options?: TypesGetRelationshipDefByNameParameters
  ): Promise<TypesGetRelationshipDefByName200Response>;
}

export interface TypesGetStructDefByGuid {
  /** Get the struct definition for the given GUID. */
  get(options?: TypesGetStructDefByGuidParameters): Promise<TypesGetStructDefByGuid200Response>;
}

export interface TypesGetStructDefByName {
  /** Get the struct definition by its name (unique). */
  get(options?: TypesGetStructDefByNameParameters): Promise<TypesGetStructDefByName200Response>;
}

export interface TypesGetTypeDefinitionByGuid {
  /** Get the type definition for the given GUID. */
  get(
    options?: TypesGetTypeDefinitionByGuidParameters
  ): Promise<TypesGetTypeDefinitionByGuid200Response>;
}

export interface TypesDeleteTypeByName {
  /** Get the type definition by its name (unique). */
  get(
    options?: TypesGetTypeDefinitionByNameParameters
  ): Promise<TypesGetTypeDefinitionByName200Response>;
  /** Delete API for type identified by its name. */
  delete(options?: TypesDeleteTypeByNameParameters): Promise<TypesDeleteTypeByName204Response>;
}

export interface TypesDeleteTypeDefinitions {
  /** Get all type definitions in Atlas in bulk. */
  get(
    options?: TypesGetAllTypeDefinitionsParameters
  ): Promise<TypesGetAllTypeDefinitions200Response>;
  /**
   * Create all atlas type definitions in bulk, only new definitions will be created.
   * Any changes to the existing definitions will be discarded.
   */
  post(
    options: TypesCreateTypeDefinitionsParameters
  ): Promise<TypesCreateTypeDefinitions200Response>;
  /** Update all types in bulk, changes detected in the type definitions would be persisted. */
  put(
    options: TypesUpdateAtlasTypeDefinitionsParameters
  ): Promise<TypesUpdateAtlasTypeDefinitions200Response>;
  /** Delete API for all types in bulk. */
  delete(
    options: TypesDeleteTypeDefinitionsParameters
  ): Promise<TypesDeleteTypeDefinitions204Response>;
}

export interface TypesListTypeDefinitionHeaders {
  /** List all type definitions returned as a list of minimal information header. */
  get(
    options?: TypesListTypeDefinitionHeadersParameters
  ): Promise<TypesListTypeDefinitionHeaders200Response>;
}

export interface TypesGetTermTemplateDefByGuid {
  /** Get the term template definition for the given GUID. */
  get(
    options?: TypesGetTermTemplateDefByGuidParameters
  ): Promise<TypesGetTermTemplateDefByGuid200Response>;
}

export interface TypesGetTermTemplateDefByName {
  /** Get the term template definition by its name (unique). */
  get(
    options?: TypesGetTermTemplateDefByNameParameters
  ): Promise<TypesGetTermTemplateDefByName200Response>;
}

export interface Routes {
  /** Resource for '/atlas/v2/entity' has methods for the following verbs: post */
  (path: "/atlas/v2/entity"): EntityCreateOrUpdate;
  /** Resource for '/atlas/v2/entity/bulk' has methods for the following verbs: get, post, delete */
  (path: "/atlas/v2/entity/bulk"): EntityDeleteByGuids;
  /** Resource for '/atlas/v2/entity/bulk/classification' has methods for the following verbs: post */
  (path: "/atlas/v2/entity/bulk/classification"): EntityAddClassification;
  /** Resource for '/atlas/v2/entity/guid/\{guid\}' has methods for the following verbs: get, put, delete */
  (path: "/atlas/v2/entity/guid/{guid}", guid: string): EntityDeleteByGuid;
  /** Resource for '/atlas/v2/entity/guid/\{guid\}/classification/\{classificationName\}' has methods for the following verbs: get, delete */
  (
    path: "/atlas/v2/entity/guid/{guid}/classification/{classificationName}",
    guid: string,
    classificationName: string
  ): EntityDeleteClassification;
  /** Resource for '/atlas/v2/entity/guid/\{guid\}/classifications' has methods for the following verbs: get, post, put */
  (path: "/atlas/v2/entity/guid/{guid}/classifications", guid: string): EntityUpdateClassifications;
  /** Resource for '/atlas/v2/entity/uniqueAttribute/type/\{typeName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/atlas/v2/entity/uniqueAttribute/type/{typeName}",
    typeName: string
  ): EntityDeleteByUniqueAttribute;
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
  ): EntityUpdateClassificationsByUniqueAttribute;
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
  (path: "/atlas/v2/glossary"): GlossaryCreateGlossary;
  /** Resource for '/atlas/v2/glossary/categories' has methods for the following verbs: post */
  (path: "/atlas/v2/glossary/categories"): GlossaryCreateGlossaryCategories;
  /** Resource for '/atlas/v2/glossary/category' has methods for the following verbs: post */
  (path: "/atlas/v2/glossary/category"): GlossaryCreateGlossaryCategory;
  /** Resource for '/atlas/v2/glossary/category/\{categoryGuid\}' has methods for the following verbs: get, put, delete */
  (
    path: "/atlas/v2/glossary/category/{categoryGuid}",
    categoryGuid: string
  ): GlossaryDeleteGlossaryCategory;
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
  (path: "/atlas/v2/glossary/term/{termGuid}", termGuid: string): GlossaryDeleteGlossaryTerm;
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
  ): GlossaryDeleteTermAssignmentFromEntities;
  /** Resource for '/atlas/v2/glossary/terms/\{termGuid\}/related' has methods for the following verbs: get */
  (path: "/atlas/v2/glossary/terms/{termGuid}/related", termGuid: string): GlossaryListRelatedTerms;
  /** Resource for '/atlas/v2/glossary/\{glossaryGuid\}' has methods for the following verbs: get, put, delete */
  (path: "/atlas/v2/glossary/{glossaryGuid}", glossaryGuid: string): GlossaryDeleteGlossary;
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
  (path: "/search/query"): Search;
  /** Resource for '/search/suggest' has methods for the following verbs: post */
  (path: "/search/suggest"): Suggest;
  /** Resource for '/search/autocomplete' has methods for the following verbs: post */
  (path: "/search/autocomplete"): AutoComplete;
  /** Resource for '/atlas/v2/lineage/\{guid\}' has methods for the following verbs: get */
  (path: "/atlas/v2/lineage/{guid}", guid: string): GetLineageGraph;
  /** Resource for '/lineage/\{guid\}/next/' has methods for the following verbs: get */
  (path: "/lineage/{guid}/next/", guid: string): NextPageLineage;
  /** Resource for '/atlas/v2/relationship' has methods for the following verbs: post, put */
  (path: "/atlas/v2/relationship"): RelationshipUpdate;
  /** Resource for '/atlas/v2/relationship/guid/\{guid\}' has methods for the following verbs: get, delete */
  (path: "/atlas/v2/relationship/guid/{guid}", guid: string): RelationshipDelete;
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
  (path: "/atlas/v2/types/typedef/name/{name}", name: string): TypesDeleteTypeByName;
  /** Resource for '/atlas/v2/types/typedefs' has methods for the following verbs: get, post, put, delete */
  (path: "/atlas/v2/types/typedefs"): TypesDeleteTypeDefinitions;
  /** Resource for '/atlas/v2/types/typedefs/headers' has methods for the following verbs: get */
  (path: "/atlas/v2/types/typedefs/headers"): TypesListTypeDefinitionHeaders;
  /** Resource for '/types/termtemplatedef/guid/\{guid\}' has methods for the following verbs: get */
  (path: "/types/termtemplatedef/guid/{guid}", guid: string): TypesGetTermTemplateDefByGuid;
  /** Resource for '/types/termtemplatedef/name/\{name\}' has methods for the following verbs: get */
  (path: "/types/termtemplatedef/name/{name}", name: string): TypesGetTermTemplateDefByName;
}

export type PurviewCatalogRestClient = Client & {
  path: Routes;
};

export default function PurviewCatalog(
  Endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): PurviewCatalogRestClient {
  const baseUrl = options.baseUrl ?? `${Endpoint}/api`;
  options.apiVersion = options.apiVersion ?? "2021-05-01-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://purview.azure.net/.default"],
    },
  };

  return getClient(baseUrl, credentials, options) as PurviewCatalogRestClient;
}
