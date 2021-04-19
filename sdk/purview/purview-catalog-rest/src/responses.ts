// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  JsonEntityMutationResponse,
  JsonAtlasEntitiesWithExtInfo,
  JsonAtlasEntityWithExtInfo,
  JsonAtlasClassification,
  JsonAtlasClassifications,
  JsonAtlasEntityHeader,
  JsonAtlasGlossary,
  JsonAtlasGlossaryCategory,
  DictionaryOfpathsCic80AAtlasV2GlossaryCategoryCategoryguidRelatedGetResponses200ContentApplicationJsonSchemaAdditionalpropertiesDictionary,
  JsonAtlasRelatedTermHeader,
  JsonAtlasGlossaryTerm,
  JsonAtlasRelatedObjectId,
  DictionaryOfpathsV84KwqAtlasV2GlossaryTermsTermguidRelatedGetResponses200ContentApplicationJsonSchemaAdditionalpropertiesDictionary,
  JsonAtlasRelatedCategoryHeader,
  JsonAtlasGlossaryExtInfo,
  JsonImportCSVOperation,
  JsonSearchResult,
  JsonSuggestResult,
  JsonAutocompleteResult,
  JsonAtlasLineageInfo,
  JsonAtlasRelationship,
  JsonAtlasRelationshipWithExtInfo,
  JsonAtlasClassificationDef,
  JsonAtlasEntityDef,
  JsonAtlasEnumDef,
  JsonAtlasRelationshipDef,
  JsonAtlasStructDef,
  JsonAtlasTypeDef,
  JsonAtlasTypesDef,
  JsonAtlasTypeDefHeader,
  JsonTermTemplateDef,
} from "./models";
import { HttpResponse } from "@azure-rest/core-client";

/**
 * Create or update an entity in Atlas.
 * Existing entity is matched using its unique guid if supplied or by its unique attributes eg: qualifiedName.
 * Map and array of collections are not well supported. E.g., array<array<int>>, array<map<string, int>>.
 */
export interface EntityRestCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: JsonEntityMutationResponse;
}

/** List entities in bulk identified by its GUIDs. */
export interface EntityRestGetByGuids200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasEntitiesWithExtInfo;
}

/**
 * Create or update entities in Atlas in bulk.
 * Existing entity is matched using its unique guid if supplied or by its unique attributes eg: qualifiedName.
 * Map and array of collections are not well supported. E.g., array<array<int>>, array<map<string, int>>.
 */
export interface EntityRestCreateOrUpdateBulk200Response extends HttpResponse {
  status: "200";
  body: JsonEntityMutationResponse;
}

/** Delete a list of entities in bulk identified by their GUIDs or unique attributes. */
export interface EntityRestBulkDelete200Response extends HttpResponse {
  status: "200";
  body: JsonEntityMutationResponse;
}

/** Associate a classification to multiple entities in bulk. */
export interface EntityRestAddClassification204Response extends HttpResponse {
  status: "204";
}

/** Get complete definition of an entity given its GUID. */
export interface EntityRestGetById200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasEntityWithExtInfo;
}

/**
 * Update entity partially - create or update entity attribute identified by its GUID.
 * Supports only primitive attribute type and entity references.
 * It does not support updating complex types like arrays, and maps.
 * Null updates are not possible.
 */
export interface EntityRestPartialUpdateEntityAttrByGuid200Response extends HttpResponse {
  status: "200";
  body: JsonEntityMutationResponse;
}

/** Delete an entity identified by its GUID. */
export interface EntityRestDeleteByGuid200Response extends HttpResponse {
  status: "200";
  body: JsonEntityMutationResponse;
}

/** List classifications for a given entity represented by a GUID. */
export interface EntityRestGetClassification200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasClassification;
}

/** Delete a given classification from an existing entity represented by a GUID. */
export interface EntityRestDeleteClassification204Response extends HttpResponse {
  status: "204";
}

/** List classifications for a given entity represented by a GUID. */
export interface EntityRestGetClassifications200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasClassifications;
}

/** Add classifications to an existing entity represented by a GUID. */
export interface EntityRestAddClassifications204Response extends HttpResponse {
  status: "204";
}

/** Update classifications to an existing entity represented by a guid. */
export interface EntityRestUpdateClassifications204Response extends HttpResponse {
  status: "204";
}

/**
 * Get complete definition of an entity given its type and unique attribute.
 * In addition to the typeName path parameter, attribute key-value pair(s) can be provided in the following format:
 * attr:\<attrName>=<attrValue>.
 * NOTE: The attrName and attrValue should be unique across entities, eg. qualifiedName.
 * The REST request would look something like this:
 * GET /v2/entity/uniqueAttribute/type/aType?attr:aTypeAttribute=someValue.
 */
export interface EntityRestGetByUniqueAttributes200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasEntityWithExtInfo;
}

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
export interface EntityRestPartialUpdateEntityByUniqueAttrs200Response extends HttpResponse {
  status: "200";
  body: JsonEntityMutationResponse;
}

/**
 * Delete an entity identified by its type and unique attributes.
 * In addition to the typeName path parameter, attribute key-value pair(s) can be provided in the following format:
 * attr:\<attrName>=\<attrValue>.
 * NOTE: The attrName and attrValue should be unique across entities, eg. qualifiedName.
 * The REST request would look something like this:
 * DELETE /v2/entity/uniqueAttribute/type/aType?attr:aTypeAttribute=someValue.
 */
export interface EntityRestDeleteByUniqueAttribute200Response extends HttpResponse {
  status: "200";
  body: JsonEntityMutationResponse;
}

/** Delete a given classification from an entity identified by its type and unique attributes. */
export interface EntityRestDeleteClassificationByUniqueAttribute204Response extends HttpResponse {
  status: "204";
}

/** Add classification to the entity identified by its type and unique attributes. */
export interface EntityRestAddClassificationsByUniqueAttribute204Response extends HttpResponse {
  status: "204";
}

/** Update classification on an entity identified by its type and unique attributes. */
export interface EntityRestUpdateClassificationsByUniqueAttribute204Response extends HttpResponse {
  status: "204";
}

/** Set classifications on entities in bulk. */
export interface EntityRestSetClassifications200Response extends HttpResponse {
  status: "200";
  body: string[];
}

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
export interface EntityRestGetEntitiesByUniqueAttributes200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasEntitiesWithExtInfo;
}

/** Get entity header given its GUID. */
export interface EntityRestGetHeaderById200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasEntityHeader;
}

/** Get all glossaries registered with Atlas. */
export interface GlossaryRestGetGlossaries200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasGlossary[];
}

/** Create a glossary. */
export interface GlossaryRestCreateGlossary200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasGlossary;
}

/** Create glossary category in bulk. */
export interface GlossaryRestCreateGlossaryCategories200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasGlossaryCategory[];
}

/** Create a glossary category. */
export interface GlossaryRestCreateGlossaryCategory200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasGlossaryCategory;
}

/** Get specific glossary category by its GUID. */
export interface GlossaryRestGetGlossaryCategory200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasGlossaryCategory;
}

/** Update the given glossary category by its GUID. */
export interface GlossaryRestUpdateGlossaryCategory200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasGlossaryCategory;
}

/** Delete a glossary category. */
export interface GlossaryRestDeleteGlossaryCategory204Response extends HttpResponse {
  status: "204";
}

/** Update the glossary category partially. */
export interface GlossaryRestPartialUpdateGlossaryCategory200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasGlossaryCategory;
}

/** Get all related categories (parent and children). Limit, offset, and sort parameters are currently not being enabled and won't work even they are passed. */
export interface GlossaryRestGetRelatedCategories200Response extends HttpResponse {
  status: "200";
  body: DictionaryOfpathsCic80AAtlasV2GlossaryCategoryCategoryguidRelatedGetResponses200ContentApplicationJsonSchemaAdditionalpropertiesDictionary;
}

/** Get all terms associated with the specific category. */
export interface GlossaryRestGetCategoryTerms200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasRelatedTermHeader[];
}

/** Create a glossary term. */
export interface GlossaryRestCreateGlossaryTerm200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasGlossaryTerm;
}

/** Get a specific glossary term by its GUID. */
export interface GlossaryRestGetGlossaryTerm200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasGlossaryTerm;
}

/** Update the given glossary term by its GUID. */
export interface GlossaryRestUpdateGlossaryTerm200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasGlossaryTerm;
}

/** Delete a glossary term. */
export interface GlossaryRestDeleteGlossaryTerm204Response extends HttpResponse {
  status: "204";
}

/** Update the glossary term partially. */
export interface GlossaryRestPartialUpdateGlossaryTerm200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasGlossaryTerm;
}

/** Create glossary terms in bulk. */
export interface GlossaryRestCreateGlossaryTerms200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasGlossaryTerm[];
}

/** Get all related objects assigned with the specified term. */
export interface GlossaryRestGetEntitiesAssignedWithTerm200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasRelatedObjectId[];
}

/** Assign the given term to the provided list of related objects. */
export interface GlossaryRestAssignTermToEntities204Response extends HttpResponse {
  status: "204";
}

/** Delete the term assignment for the given list of related objects. */
export interface GlossaryRestRemoveTermAssignmentFromEntities204Response extends HttpResponse {
  status: "204";
}

/** Delete the term assignment for the given list of related objects. */
export interface GlossaryRestDeleteTermAssignmentFromEntities204Response extends HttpResponse {
  status: "204";
}

/** Get all related terms for a specific term by its GUID. Limit, offset, and sort parameters are currently not being enabled and won't work even they are passed. */
export interface GlossaryRestGetRelatedTerms200Response extends HttpResponse {
  status: "200";
  body: DictionaryOfpathsV84KwqAtlasV2GlossaryTermsTermguidRelatedGetResponses200ContentApplicationJsonSchemaAdditionalpropertiesDictionary;
}

/** Get a specific Glossary by its GUID. */
export interface GlossaryRestGetGlossary200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasGlossary;
}

/** Update the given glossary. */
export interface GlossaryRestUpdateGlossary200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasGlossary;
}

/** Delete a glossary. */
export interface GlossaryRestDeleteGlossary204Response extends HttpResponse {
  status: "204";
}

/** Get the categories belonging to a specific glossary. */
export interface GlossaryRestGetGlossaryCategories200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasGlossaryCategory[];
}

/** Get the category headers belonging to a specific glossary. */
export interface GlossaryRestGetGlossaryCategoriesHeaders200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasRelatedCategoryHeader[];
}

/** Get a specific glossary with detailed information. */
export interface GlossaryRestGetDetailedGlossary200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasGlossaryExtInfo;
}

/** Update the glossary partially. Some properties such as qualifiedName are not allowed to be updated. */
export interface GlossaryRestPartialUpdateGlossary200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasGlossary;
}

/** Get terms belonging to a specific glossary. */
export interface GlossaryRestGetGlossaryTerms200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasGlossaryTerm[];
}

/** Get term headers belonging to a specific glossary. */
export interface GlossaryRestGetGlossaryTermHeaders200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasRelatedTermHeader[];
}

/** Import Glossary Terms from local csv file */
export interface GlossaryRestImportGlossaryTermsViaCSV202Response extends HttpResponse {
  status: "202";
  body: JsonImportCSVOperation;
}

/** Import Glossary Terms from local csv file by glossaryName */
export interface GlossaryRestImportGlossaryTermsViaCSVByGlossaryName202Response
  extends HttpResponse {
  status: "202";
  body: JsonImportCSVOperation;
}

/** Get the status of import csv operation */
export interface GlossaryRestGetImportCSVOperationStatus200Response extends HttpResponse {
  status: "200";
  body: JsonImportCSVOperation;
}

/** Export Glossary Terms as csv file */
export interface GlossaryRestExportGlossaryTermsAsCSV200Response extends HttpResponse {
  status: "200";
}

/** Get terms by glossary name. */
export interface GlossaryRestGetTermsByGlossaryName200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasGlossaryTerm[];
}

/** Gets data using search. */
export interface DiscoveryRestSearchAdvanced200Response extends HttpResponse {
  status: "200";
  body: JsonSearchResult;
}

/** Get search suggestions by query criteria. */
export interface DiscoveryRestSuggest200Response extends HttpResponse {
  status: "200";
  body: JsonSuggestResult;
}

/** Get auto complete options. */
export interface DiscoveryRestAutoComplete200Response extends HttpResponse {
  status: "200";
  body: JsonAutocompleteResult;
}

/** Get lineage info about the specified entity by GUID. */
export interface LineageRestGetLineageGraph200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasLineageInfo;
}

/** Return immediate next level lineage info about entity with pagination */
export interface LineageRestNextLevelLineage200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasLineageInfo;
}

/** Create a new relationship between entities. */
export interface RelationshipRestCreate200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasRelationship;
}

/** Update an existing relationship between entities. */
export interface RelationshipRestUpdate200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasRelationship;
}

/** Get relationship information between entities by its GUID. */
export interface RelationshipRestGetById2200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasRelationshipWithExtInfo;
}

/** Delete a relationship between entities by its GUID. */
export interface RelationshipRestDeleteById204Response extends HttpResponse {
  status: "204";
}

/** Get the classification definition for the given GUID. */
export interface TypesRestGetClassificationDefByGuid200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasClassificationDef;
}

/** Get the classification definition by its name (unique). */
export interface TypesRestGetClassificationDefByName200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasClassificationDef;
}

/** Get the Entity definition for the given GUID. */
export interface TypesRestGetEntityDefByGuid200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasEntityDef;
}

/** Get the entity definition by its name (unique). */
export interface TypesRestGetEntityDefByName200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasEntityDef;
}

/** Get the enum definition for the given GUID. */
export interface TypesRestGetEnumDefByGuid200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasEnumDef;
}

/** Get the enum definition by its name (unique). */
export interface TypesRestGetEnumDefByName200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasEnumDef;
}

/** Get the relationship definition for the given GUID. */
export interface TypesRestGetRelationshipDefByGuid200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasRelationshipDef;
}

/** Get the relationship definition by its name (unique). */
export interface TypesRestGetRelationshipDefByName200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasRelationshipDef;
}

/** Get the struct definition for the given GUID. */
export interface TypesRestGetStructDefByGuid200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasStructDef;
}

/** Get the struct definition by its name (unique). */
export interface TypesRestGetStructDefByName200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasStructDef;
}

/** Get the type definition for the given GUID. */
export interface TypesRestGetTypeDefByGuid200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasTypeDef;
}

/** Get the type definition by its name (unique). */
export interface TypesRestGetTypeDefByName200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasTypeDef;
}

/** Delete API for type identified by its name. */
export interface TypesRestDeleteTypeByName204Response extends HttpResponse {
  status: "204";
}

/** Get all type definitions in Atlas in bulk. */
export interface TypesRestGetAllTypeDefs200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasTypesDef;
}

/**
 * Create all atlas type definitions in bulk, only new definitions will be created.
 * Any changes to the existing definitions will be discarded.
 */
export interface TypesRestCreateTypeDefs200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasTypesDef;
}

/** Update all types in bulk, changes detected in the type definitions would be persisted. */
export interface TypesRestUpdateAtlasTypeDefs200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasTypesDef;
}

/** Delete API for all types in bulk. */
export interface TypesRestDeleteTypeDefs204Response extends HttpResponse {
  status: "204";
}

/** List all type definitions returned as a list of minimal information header. */
export interface TypesRestGetTypeDefHeaders200Response extends HttpResponse {
  status: "200";
  body: JsonAtlasTypeDefHeader[];
}

/** Get the term template definition for the given GUID. */
export interface TypesRestGetTermTemplateDefByGuid200Response extends HttpResponse {
  status: "200";
  body: JsonTermTemplateDef;
}

/** Get the term template definition by its name (unique). */
export interface TypesRestGetTermTemplateDefByName200Response extends HttpResponse {
  status: "200";
  body: JsonTermTemplateDef;
}
