// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse } from "@azure-rest/core-client";
import {
  EntityMutationResponseOutput,
  ErrorResponseOutput,
  AtlasEntitiesWithExtInfoOutput,
  AtlasEntityWithExtInfoOutput,
  AtlasClassificationOutput,
  AtlasClassificationsOutput,
  AtlasEntityHeaderOutput,
  BulkImportResponseOutput,
  AtlasGlossaryOutput,
  AtlasGlossaryCategoryOutput,
  AtlasRelatedCategoryHeaderOutput,
  AtlasRelatedTermHeaderOutput,
  AtlasGlossaryTermOutput,
  AtlasRelatedObjectIdOutput,
  AtlasGlossaryExtInfoOutput,
  ImportCSVOperationOutput,
  SearchResultOutput,
  SuggestResultOutput,
  BrowseResultOutput,
  AutoCompleteResultOutput,
  AtlasLineageInfoOutput,
  AtlasRelationshipOutput,
  AtlasRelationshipWithExtInfoOutput,
  AtlasBusinessMetadataDefOutput,
  AtlasClassificationDefOutput,
  AtlasEntityDefOutput,
  AtlasEnumDefOutput,
  AtlasRelationshipDefOutput,
  AtlasStructDefOutput,
  AtlasTypeDefOutput,
  AtlasTypesDefOutput,
  AtlasTypeDefHeaderOutput,
  TermTemplateDefOutput,
} from "./outputModels";

/**
 * Create or update an entity in Atlas.
 * Existing entity is matched using its unique guid if supplied or by its unique attributes eg: qualifiedName.
 * Map and array of collections are not well supported. E.g., array<array<int>>, array<map<string, int>>.
 */
export interface EntityCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: EntityMutationResponseOutput;
}

/**
 * Create or update an entity in Atlas.
 * Existing entity is matched using its unique guid if supplied or by its unique attributes eg: qualifiedName.
 * Map and array of collections are not well supported. E.g., array<array<int>>, array<map<string, int>>.
 */
export interface EntityCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** List entities in bulk identified by its GUIDs. */
export interface EntityListByGuids200Response extends HttpResponse {
  status: "200";
  body: AtlasEntitiesWithExtInfoOutput;
}

/** List entities in bulk identified by its GUIDs. */
export interface EntityListByGuidsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/**
 * Create or update entities in Atlas in bulk.
 * Existing entity is matched using its unique guid if supplied or by its unique attributes eg: qualifiedName.
 * Map and array of collections are not well supported. E.g., array<array<int>>, array<map<string, int>>.
 */
export interface EntityCreateOrUpdateEntities200Response extends HttpResponse {
  status: "200";
  body: EntityMutationResponseOutput;
}

/**
 * Create or update entities in Atlas in bulk.
 * Existing entity is matched using its unique guid if supplied or by its unique attributes eg: qualifiedName.
 * Map and array of collections are not well supported. E.g., array<array<int>>, array<map<string, int>>.
 */
export interface EntityCreateOrUpdateEntitiesdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Delete a list of entities in bulk identified by their GUIDs or unique attributes. */
export interface EntityDeleteByGuids200Response extends HttpResponse {
  status: "200";
  body: EntityMutationResponseOutput;
}

/** Delete a list of entities in bulk identified by their GUIDs or unique attributes. */
export interface EntityDeleteByGuidsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Associate a classification to multiple entities in bulk. */
export interface EntityAddClassification204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Associate a classification to multiple entities in bulk. */
export interface EntityAddClassificationdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get complete definition of an entity given its GUID. */
export interface EntityGetByGuid200Response extends HttpResponse {
  status: "200";
  body: AtlasEntityWithExtInfoOutput;
}

/** Get complete definition of an entity given its GUID. */
export interface EntityGetByGuiddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/**
 * Update entity partially - create or update entity attribute identified by its GUID.
 * Supports only primitive attribute type and entity references.
 * It does not support updating complex types like arrays, and maps.
 * Null updates are not possible.
 */
export interface EntityPartialUpdateEntityAttributeByGuid200Response extends HttpResponse {
  status: "200";
  body: EntityMutationResponseOutput;
}

/**
 * Update entity partially - create or update entity attribute identified by its GUID.
 * Supports only primitive attribute type and entity references.
 * It does not support updating complex types like arrays, and maps.
 * Null updates are not possible.
 */
export interface EntityPartialUpdateEntityAttributeByGuiddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Delete an entity identified by its GUID. */
export interface EntityDeleteByGuid200Response extends HttpResponse {
  status: "200";
  body: EntityMutationResponseOutput;
}

/** Delete an entity identified by its GUID. */
export interface EntityDeleteByGuiddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** List classifications for a given entity represented by a GUID. */
export interface EntityGetClassification200Response extends HttpResponse {
  status: "200";
  body: AtlasClassificationOutput;
}

/** List classifications for a given entity represented by a GUID. */
export interface EntityGetClassificationdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Delete a given classification from an existing entity represented by a GUID. */
export interface EntityDeleteClassification204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a given classification from an existing entity represented by a GUID. */
export interface EntityDeleteClassificationdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** List classifications for a given entity represented by a GUID. */
export interface EntityGetClassifications200Response extends HttpResponse {
  status: "200";
  body: AtlasClassificationsOutput;
}

/** List classifications for a given entity represented by a GUID. */
export interface EntityGetClassificationsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Add classifications to an existing entity represented by a GUID. */
export interface EntityAddClassifications204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Add classifications to an existing entity represented by a GUID. */
export interface EntityAddClassificationsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Update classifications to an existing entity represented by a guid. */
export interface EntityUpdateClassifications204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Update classifications to an existing entity represented by a guid. */
export interface EntityUpdateClassificationsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/**
 * Get complete definition of an entity given its type and unique attribute.
 * In addition to the typeName path parameter, attribute key-value pair(s) can be provided in the following format:
 * attr:\<attrName>=<attrValue>.
 * NOTE: The attrName and attrValue should be unique across entities, eg. qualifiedName.
 * The REST request would look something like this:
 * GET /v2/entity/uniqueAttribute/type/aType?attr:aTypeAttribute=someValue.
 */
export interface EntityGetByUniqueAttributes200Response extends HttpResponse {
  status: "200";
  body: AtlasEntityWithExtInfoOutput;
}

/**
 * Get complete definition of an entity given its type and unique attribute.
 * In addition to the typeName path parameter, attribute key-value pair(s) can be provided in the following format:
 * attr:\<attrName>=<attrValue>.
 * NOTE: The attrName and attrValue should be unique across entities, eg. qualifiedName.
 * The REST request would look something like this:
 * GET /v2/entity/uniqueAttribute/type/aType?attr:aTypeAttribute=someValue.
 */
export interface EntityGetByUniqueAttributesdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
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
export interface EntityPartialUpdateEntityByUniqueAttributes200Response extends HttpResponse {
  status: "200";
  body: EntityMutationResponseOutput;
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
export interface EntityPartialUpdateEntityByUniqueAttributesdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/**
 * Delete an entity identified by its type and unique attributes.
 * In addition to the typeName path parameter, attribute key-value pair(s) can be provided in the following format:
 * attr:\<attrName>=\<attrValue>.
 * NOTE: The attrName and attrValue should be unique across entities, eg. qualifiedName.
 * The REST request would look something like this:
 * DELETE /v2/entity/uniqueAttribute/type/aType?attr:aTypeAttribute=someValue.
 */
export interface EntityDeleteByUniqueAttribute200Response extends HttpResponse {
  status: "200";
  body: EntityMutationResponseOutput;
}

/**
 * Delete an entity identified by its type and unique attributes.
 * In addition to the typeName path parameter, attribute key-value pair(s) can be provided in the following format:
 * attr:\<attrName>=\<attrValue>.
 * NOTE: The attrName and attrValue should be unique across entities, eg. qualifiedName.
 * The REST request would look something like this:
 * DELETE /v2/entity/uniqueAttribute/type/aType?attr:aTypeAttribute=someValue.
 */
export interface EntityDeleteByUniqueAttributedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Delete a given classification from an entity identified by its type and unique attributes. */
export interface EntityDeleteClassificationByUniqueAttribute204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a given classification from an entity identified by its type and unique attributes. */
export interface EntityDeleteClassificationByUniqueAttributedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Add classification to the entity identified by its type and unique attributes. */
export interface EntityAddClassificationsByUniqueAttribute204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Add classification to the entity identified by its type and unique attributes. */
export interface EntityAddClassificationsByUniqueAttributedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Update classification on an entity identified by its type and unique attributes. */
export interface EntityUpdateClassificationsByUniqueAttribute204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Update classification on an entity identified by its type and unique attributes. */
export interface EntityUpdateClassificationsByUniqueAttributedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Set classifications on entities in bulk. */
export interface EntitySetClassifications200Response extends HttpResponse {
  status: "200";
  body: Array<string>;
}

/** Set classifications on entities in bulk. */
export interface EntitySetClassificationsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
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
 * GET /v2/entity/bulk/uniqueAttribute/type/hive_db?attr_0:qualifiedName=db1@cl1&attr_2:qualifiedName=db2@cl1
 */
export interface EntityGetEntitiesByUniqueAttributes200Response extends HttpResponse {
  status: "200";
  body: AtlasEntitiesWithExtInfoOutput;
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
 * GET /v2/entity/bulk/uniqueAttribute/type/hive_db?attr_0:qualifiedName=db1@cl1&attr_2:qualifiedName=db2@cl1
 */
export interface EntityGetEntitiesByUniqueAttributesdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get entity header given its GUID. */
export interface EntityGetHeader200Response extends HttpResponse {
  status: "200";
  body: AtlasEntityHeaderOutput;
}

/** Get entity header given its GUID. */
export interface EntityGetHeaderdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Remove business metadata from an entity. */
export interface EntityDeleteBusinessMetadata204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Add business metadata to an entity. */
export interface EntityAddOrUpdateBusinessMetadata204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete business metadata attributes from an entity. */
export interface EntityDeleteBusinessMetadataAttributes204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Add or update business metadata attributes */
export interface EntityAddOrUpdateBusinessMetadataAttributes204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Get the sample Template for uploading/creating bulk BusinessMetaData */
export interface EntityGetSampleBusinessMetadataTemplate200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

/** Get the sample Template for uploading/creating bulk BusinessMetaData */
export interface EntityGetSampleBusinessMetadataTemplate400Response extends HttpResponse {
  status: "400";
  body: Record<string, unknown>;
}

/** Upload the file for creating Business Metadata in BULK */
export interface EntityImportBusinessMetadata200Response extends HttpResponse {
  status: "200";
  body: BulkImportResponseOutput;
}

/** Upload the file for creating Business Metadata in BULK */
export interface EntityImportBusinessMetadata400Response extends HttpResponse {
  status: "400";
  body: Record<string, unknown>;
}

/** Upload the file for creating Business Metadata in BULK */
export interface EntityImportBusinessMetadata409Response extends HttpResponse {
  status: "409";
  body: Record<string, unknown>;
}

/** delete given labels to a given entity */
export interface EntityDeleteLabels204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Set labels to a given entity */
export interface EntitySetLabels204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** add given labels to a given entity */
export interface EntityAddLabel204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete given labels to a given entity identified by its type and unique attributes, if labels is null/empty, no labels will be removed. If any labels in labels set are non-existing labels, they will be ignored, only existing labels will be removed. In addition to the typeName path parameter, attribute key-value pair(s) can be provided in the following format: attr:<attrName>=<attrValue>. NOTE: The attrName and attrValue should be unique across entities, eg. qualifiedName. The REST request would look something like this: DELETE /v2/entity/uniqueAttribute/type/aType?attr:aTypeAttribute=someValue. */
export interface EntityDeleteLabelsByUniqueAttribute204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Set labels to a given entity identified by its type and unique attributes, if labels is null/empty, existing labels will all be removed. In addition to the typeName path parameter, attribute key-value pair(s) can be provided in the following format: attr:<attrName>=<attrValue>. NOTE: The attrName and attrValue should be unique across entities, eg. qualifiedName. The REST request would look something like this: POST /v2/entity/uniqueAttribute/type/aType?attr:aTypeAttribute=someValue. */
export interface EntitySetLabelsByUniqueAttribute204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Add given labels to a given entity identified by its type and unique attributes, if labels is null/empty, no labels will be added. In addition to the typeName path parameter, attribute key-value pair(s) can be provided in the following format: attr:<attrName>=<attrValue>. NOTE: The attrName and attrValue should be unique across entities, eg. qualifiedName. The REST request would look something like this: PUT /v2/entity/uniqueAttribute/type/aType?attr:aTypeAttribute=someValue. */
export interface EntityAddLabelsByUniqueAttribute204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Get all glossaries registered with Atlas. */
export interface GlossaryListGlossaries200Response extends HttpResponse {
  status: "200";
  body: Array<AtlasGlossaryOutput>;
}

/** Get all glossaries registered with Atlas. */
export interface GlossaryListGlossariesdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Create a glossary. */
export interface GlossaryCreateGlossary200Response extends HttpResponse {
  status: "200";
  body: AtlasGlossaryOutput;
}

/** Create a glossary. */
export interface GlossaryCreateGlossarydefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Create glossary category in bulk. */
export interface GlossaryCreateGlossaryCategories200Response extends HttpResponse {
  status: "200";
  body: Array<AtlasGlossaryCategoryOutput>;
}

/** Create glossary category in bulk. */
export interface GlossaryCreateGlossaryCategoriesdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Create a glossary category. */
export interface GlossaryCreateGlossaryCategory200Response extends HttpResponse {
  status: "200";
  body: AtlasGlossaryCategoryOutput;
}

/** Create a glossary category. */
export interface GlossaryCreateGlossaryCategorydefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get specific glossary category by its GUID. */
export interface GlossaryGetGlossaryCategory200Response extends HttpResponse {
  status: "200";
  body: AtlasGlossaryCategoryOutput;
}

/** Get specific glossary category by its GUID. */
export interface GlossaryGetGlossaryCategorydefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Update the given glossary category by its GUID. */
export interface GlossaryUpdateGlossaryCategory200Response extends HttpResponse {
  status: "200";
  body: AtlasGlossaryCategoryOutput;
}

/** Update the given glossary category by its GUID. */
export interface GlossaryUpdateGlossaryCategorydefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Delete a glossary category. */
export interface GlossaryDeleteGlossaryCategory204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a glossary category. */
export interface GlossaryDeleteGlossaryCategorydefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Update the glossary category partially. */
export interface GlossaryPartialUpdateGlossaryCategory200Response extends HttpResponse {
  status: "200";
  body: AtlasGlossaryCategoryOutput;
}

/** Update the glossary category partially. */
export interface GlossaryPartialUpdateGlossaryCategorydefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get all related categories (parent and children). Limit, offset, and sort parameters are currently not being enabled and won't work even they are passed. */
export interface GlossaryListRelatedCategories200Response extends HttpResponse {
  status: "200";
  body: Record<string, Array<AtlasRelatedCategoryHeaderOutput>>;
}

/** Get all related categories (parent and children). Limit, offset, and sort parameters are currently not being enabled and won't work even they are passed. */
export interface GlossaryListRelatedCategoriesdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get all terms associated with the specific category. */
export interface GlossaryListCategoryTerms200Response extends HttpResponse {
  status: "200";
  body: Array<AtlasRelatedTermHeaderOutput>;
}

/** Get all terms associated with the specific category. */
export interface GlossaryListCategoryTermsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Create a glossary term. */
export interface GlossaryCreateGlossaryTerm200Response extends HttpResponse {
  status: "200";
  body: AtlasGlossaryTermOutput;
}

/** Create a glossary term. */
export interface GlossaryCreateGlossaryTermdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a specific glossary term by its GUID. */
export interface GlossaryGetGlossaryTerm200Response extends HttpResponse {
  status: "200";
  body: AtlasGlossaryTermOutput;
}

/** Get a specific glossary term by its GUID. */
export interface GlossaryGetGlossaryTermdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Update the given glossary term by its GUID. */
export interface GlossaryUpdateGlossaryTerm200Response extends HttpResponse {
  status: "200";
  body: AtlasGlossaryTermOutput;
}

/** Update the given glossary term by its GUID. */
export interface GlossaryUpdateGlossaryTermdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Delete a glossary term. */
export interface GlossaryDeleteGlossaryTerm204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a glossary term. */
export interface GlossaryDeleteGlossaryTermdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Update the glossary term partially. */
export interface GlossaryPartialUpdateGlossaryTerm200Response extends HttpResponse {
  status: "200";
  body: AtlasGlossaryTermOutput;
}

/** Update the glossary term partially. */
export interface GlossaryPartialUpdateGlossaryTermdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Create glossary terms in bulk. */
export interface GlossaryCreateGlossaryTerms200Response extends HttpResponse {
  status: "200";
  body: Array<AtlasGlossaryTermOutput>;
}

/** Create glossary terms in bulk. */
export interface GlossaryCreateGlossaryTermsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get all related objects assigned with the specified term. */
export interface GlossaryGetEntitiesAssignedWithTerm200Response extends HttpResponse {
  status: "200";
  body: Array<AtlasRelatedObjectIdOutput>;
}

/** Get all related objects assigned with the specified term. */
export interface GlossaryGetEntitiesAssignedWithTermdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Assign the given term to the provided list of related objects. */
export interface GlossaryAssignTermToEntities204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Assign the given term to the provided list of related objects. */
export interface GlossaryAssignTermToEntitiesdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Delete the term assignment for the given list of related objects. */
export interface GlossaryRemoveTermAssignmentFromEntities204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete the term assignment for the given list of related objects. */
export interface GlossaryRemoveTermAssignmentFromEntitiesdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Delete the term assignment for the given list of related objects. */
export interface GlossaryDeleteTermAssignmentFromEntities204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete the term assignment for the given list of related objects. */
export interface GlossaryDeleteTermAssignmentFromEntitiesdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get all related terms for a specific term by its GUID. Limit, offset, and sort parameters are currently not being enabled and won't work even they are passed. */
export interface GlossaryListRelatedTerms200Response extends HttpResponse {
  status: "200";
  body: Record<string, Array<AtlasRelatedTermHeaderOutput>>;
}

/** Get all related terms for a specific term by its GUID. Limit, offset, and sort parameters are currently not being enabled and won't work even they are passed. */
export interface GlossaryListRelatedTermsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a specific Glossary by its GUID. */
export interface GlossaryGetGlossary200Response extends HttpResponse {
  status: "200";
  body: AtlasGlossaryOutput;
}

/** Get a specific Glossary by its GUID. */
export interface GlossaryGetGlossarydefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Update the given glossary. */
export interface GlossaryUpdateGlossary200Response extends HttpResponse {
  status: "200";
  body: AtlasGlossaryOutput;
}

/** Update the given glossary. */
export interface GlossaryUpdateGlossarydefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Delete a glossary. */
export interface GlossaryDeleteGlossary204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a glossary. */
export interface GlossaryDeleteGlossarydefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get the categories belonging to a specific glossary. */
export interface GlossaryListGlossaryCategories200Response extends HttpResponse {
  status: "200";
  body: Array<AtlasGlossaryCategoryOutput>;
}

/** Get the categories belonging to a specific glossary. */
export interface GlossaryListGlossaryCategoriesdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get the category headers belonging to a specific glossary. */
export interface GlossaryListGlossaryCategoriesHeaders200Response extends HttpResponse {
  status: "200";
  body: Array<AtlasRelatedCategoryHeaderOutput>;
}

/** Get the category headers belonging to a specific glossary. */
export interface GlossaryListGlossaryCategoriesHeadersdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a specific glossary with detailed information. */
export interface GlossaryGetDetailedGlossary200Response extends HttpResponse {
  status: "200";
  body: AtlasGlossaryExtInfoOutput;
}

/** Get a specific glossary with detailed information. */
export interface GlossaryGetDetailedGlossarydefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Update the glossary partially. Some properties such as qualifiedName are not allowed to be updated. */
export interface GlossaryPartialUpdateGlossary200Response extends HttpResponse {
  status: "200";
  body: AtlasGlossaryOutput;
}

/** Update the glossary partially. Some properties such as qualifiedName are not allowed to be updated. */
export interface GlossaryPartialUpdateGlossarydefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get terms belonging to a specific glossary. */
export interface GlossaryListGlossaryTerms200Response extends HttpResponse {
  status: "200";
  body: Array<AtlasGlossaryTermOutput>;
}

/** Get terms belonging to a specific glossary. */
export interface GlossaryListGlossaryTermsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get term headers belonging to a specific glossary. */
export interface GlossaryListGlossaryTermHeaders200Response extends HttpResponse {
  status: "200";
  body: Array<AtlasRelatedTermHeaderOutput>;
}

/** Get term headers belonging to a specific glossary. */
export interface GlossaryListGlossaryTermHeadersdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Import Glossary Terms from local csv file */
export interface GlossaryImportGlossaryTermsViaCsv202Response extends HttpResponse {
  status: "202";
  body: ImportCSVOperationOutput;
}

/** Import Glossary Terms from local csv file */
export interface GlossaryImportGlossaryTermsViaCsvdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Import Glossary Terms from local csv file by glossaryName */
export interface GlossaryImportGlossaryTermsViaCsvByGlossaryName202Response extends HttpResponse {
  status: "202";
  body: ImportCSVOperationOutput;
}

/** Import Glossary Terms from local csv file by glossaryName */
export interface GlossaryImportGlossaryTermsViaCsvByGlossaryNamedefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get the status of import csv operation */
export interface GlossaryGetImportCsvOperationStatus200Response extends HttpResponse {
  status: "200";
  body: ImportCSVOperationOutput;
}

/** Get the status of import csv operation */
export interface GlossaryGetImportCsvOperationStatusdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Export Glossary Terms as csv file */
export interface GlossaryExportGlossaryTermsAsCsv200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

/** Export Glossary Terms as csv file */
export interface GlossaryExportGlossaryTermsAsCsvdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Get terms by glossary name. */
export interface GlossaryListTermsByGlossaryName200Response extends HttpResponse {
  status: "200";
  body: Array<AtlasGlossaryTermOutput>;
}

/** Get terms by glossary name. */
export interface GlossaryListTermsByGlossaryNamedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets data using search. */
export interface DiscoveryQuery200Response extends HttpResponse {
  status: "200";
  body: SearchResultOutput;
}

/** Gets data using search. */
export interface DiscoveryQuerydefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get search suggestions by query criteria. */
export interface DiscoverySuggest200Response extends HttpResponse {
  status: "200";
  body: SuggestResultOutput;
}

/** Get search suggestions by query criteria. */
export interface DiscoverySuggestdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Browse entities by path or entity type. */
export interface DiscoveryBrowse200Response extends HttpResponse {
  status: "200";
  body: BrowseResultOutput;
}

/** Browse entities by path or entity type. */
export interface DiscoveryBrowsedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get auto complete options. */
export interface DiscoveryAutoComplete200Response extends HttpResponse {
  status: "200";
  body: AutoCompleteResultOutput;
}

/** Get auto complete options. */
export interface DiscoveryAutoCompletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get lineage info of the entity specified by GUID. */
export interface LineageGetLineageGraph200Response extends HttpResponse {
  status: "200";
  body: AtlasLineageInfoOutput;
}

/** Get lineage info of the entity specified by GUID. */
export interface LineageGetLineageGraphdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Return immediate next page lineage info about entity with pagination */
export interface LineageNextPageLineage200Response extends HttpResponse {
  status: "200";
  body: AtlasLineageInfoOutput;
}

/** Return immediate next page lineage info about entity with pagination */
export interface LineageNextPageLineagedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/**
 * Returns lineage info about entity.
 *
 * In addition to the typeName path parameter, attribute key-value pair(s) can be provided in the following format
 *
 * attr:[attrName]=[attrValue]
 *
 * NOTE: The attrName and attrValue should be unique across entities, eg. qualifiedName
 */
export interface LineageGetLineageByUniqueAttribute200Response extends HttpResponse {
  status: "200";
  body: AtlasLineageInfoOutput;
}

/**
 * Returns lineage info about entity.
 *
 * In addition to the typeName path parameter, attribute key-value pair(s) can be provided in the following format
 *
 * attr:[attrName]=[attrValue]
 *
 * NOTE: The attrName and attrValue should be unique across entities, eg. qualifiedName
 */
export interface LineageGetLineageByUniqueAttribute400Response extends HttpResponse {
  status: "400";
  body: Record<string, unknown>;
}

/**
 * Returns lineage info about entity.
 *
 * In addition to the typeName path parameter, attribute key-value pair(s) can be provided in the following format
 *
 * attr:[attrName]=[attrValue]
 *
 * NOTE: The attrName and attrValue should be unique across entities, eg. qualifiedName
 */
export interface LineageGetLineageByUniqueAttribute404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Create a new relationship between entities. */
export interface RelationshipCreate200Response extends HttpResponse {
  status: "200";
  body: AtlasRelationshipOutput;
}

/** Create a new relationship between entities. */
export interface RelationshipCreatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Update an existing relationship between entities. */
export interface RelationshipUpdate200Response extends HttpResponse {
  status: "200";
  body: AtlasRelationshipOutput;
}

/** Update an existing relationship between entities. */
export interface RelationshipUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get relationship information between entities by its GUID. */
export interface RelationshipGet200Response extends HttpResponse {
  status: "200";
  body: AtlasRelationshipWithExtInfoOutput;
}

/** Get relationship information between entities by its GUID. */
export interface RelationshipGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Delete a relationship between entities by its GUID. */
export interface RelationshipDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete a relationship between entities by its GUID. */
export interface RelationshipDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get the businessMetadata definition for the given guid */
export interface TypesGetBusinessMetadataDefByGuid200Response extends HttpResponse {
  status: "200";
  body: AtlasBusinessMetadataDefOutput;
}

/** Get the businessMetadata definition for the given guid */
export interface TypesGetBusinessMetadataDefByGuid404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Get the businessMetadata definition by it's name (unique) */
export interface TypesGetBusinessMetadataDefByName200Response extends HttpResponse {
  status: "200";
  body: AtlasBusinessMetadataDefOutput;
}

/** Get the businessMetadata definition by it's name (unique) */
export interface TypesGetBusinessMetadataDefByName404Response extends HttpResponse {
  status: "404";
  body: Record<string, unknown>;
}

/** Get the classification definition for the given GUID. */
export interface TypesGetClassificationDefByGuid200Response extends HttpResponse {
  status: "200";
  body: AtlasClassificationDefOutput;
}

/** Get the classification definition for the given GUID. */
export interface TypesGetClassificationDefByGuiddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get the classification definition by its name (unique). */
export interface TypesGetClassificationDefByName200Response extends HttpResponse {
  status: "200";
  body: AtlasClassificationDefOutput;
}

/** Get the classification definition by its name (unique). */
export interface TypesGetClassificationDefByNamedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get the Entity definition for the given GUID. */
export interface TypesGetEntityDefinitionByGuid200Response extends HttpResponse {
  status: "200";
  body: AtlasEntityDefOutput;
}

/** Get the Entity definition for the given GUID. */
export interface TypesGetEntityDefinitionByGuiddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get the entity definition by its name (unique). */
export interface TypesGetEntityDefinitionByName200Response extends HttpResponse {
  status: "200";
  body: AtlasEntityDefOutput;
}

/** Get the entity definition by its name (unique). */
export interface TypesGetEntityDefinitionByNamedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get the enum definition for the given GUID. */
export interface TypesGetEnumDefByGuid200Response extends HttpResponse {
  status: "200";
  body: AtlasEnumDefOutput;
}

/** Get the enum definition for the given GUID. */
export interface TypesGetEnumDefByGuiddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get the enum definition by its name (unique). */
export interface TypesGetEnumDefByName200Response extends HttpResponse {
  status: "200";
  body: AtlasEnumDefOutput;
}

/** Get the enum definition by its name (unique). */
export interface TypesGetEnumDefByNamedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get the relationship definition for the given GUID. */
export interface TypesGetRelationshipDefByGuid200Response extends HttpResponse {
  status: "200";
  body: AtlasRelationshipDefOutput;
}

/** Get the relationship definition for the given GUID. */
export interface TypesGetRelationshipDefByGuiddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get the relationship definition by its name (unique). */
export interface TypesGetRelationshipDefByName200Response extends HttpResponse {
  status: "200";
  body: AtlasRelationshipDefOutput;
}

/** Get the relationship definition by its name (unique). */
export interface TypesGetRelationshipDefByNamedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get the struct definition for the given GUID. */
export interface TypesGetStructDefByGuid200Response extends HttpResponse {
  status: "200";
  body: AtlasStructDefOutput;
}

/** Get the struct definition for the given GUID. */
export interface TypesGetStructDefByGuiddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get the struct definition by its name (unique). */
export interface TypesGetStructDefByName200Response extends HttpResponse {
  status: "200";
  body: AtlasStructDefOutput;
}

/** Get the struct definition by its name (unique). */
export interface TypesGetStructDefByNamedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get the type definition for the given GUID. */
export interface TypesGetTypeDefinitionByGuid200Response extends HttpResponse {
  status: "200";
  body: AtlasTypeDefOutput;
}

/** Get the type definition for the given GUID. */
export interface TypesGetTypeDefinitionByGuiddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get the type definition by its name (unique). */
export interface TypesGetTypeDefinitionByName200Response extends HttpResponse {
  status: "200";
  body: AtlasTypeDefOutput;
}

/** Get the type definition by its name (unique). */
export interface TypesGetTypeDefinitionByNamedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Delete API for type identified by its name. */
export interface TypesDeleteTypeByName204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete API for type identified by its name. */
export interface TypesDeleteTypeByNamedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get all type definitions in Atlas in bulk. */
export interface TypesGetAllTypeDefinitions200Response extends HttpResponse {
  status: "200";
  body: AtlasTypesDefOutput;
}

/** Get all type definitions in Atlas in bulk. */
export interface TypesGetAllTypeDefinitionsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/**
 * Create all atlas type definitions in bulk, only new definitions will be created.
 * Any changes to the existing definitions will be discarded.
 */
export interface TypesCreateTypeDefinitions200Response extends HttpResponse {
  status: "200";
  body: AtlasTypesDefOutput;
}

/**
 * Create all atlas type definitions in bulk, only new definitions will be created.
 * Any changes to the existing definitions will be discarded.
 */
export interface TypesCreateTypeDefinitionsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Update all types in bulk, changes detected in the type definitions would be persisted. */
export interface TypesUpdateAtlasTypeDefinitions200Response extends HttpResponse {
  status: "200";
  body: AtlasTypesDefOutput;
}

/** Update all types in bulk, changes detected in the type definitions would be persisted. */
export interface TypesUpdateAtlasTypeDefinitionsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Delete API for all types in bulk. */
export interface TypesDeleteTypeDefinitions204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Delete API for all types in bulk. */
export interface TypesDeleteTypeDefinitionsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** List all type definitions returned as a list of minimal information header. */
export interface TypesListTypeDefinitionHeaders200Response extends HttpResponse {
  status: "200";
  body: Array<AtlasTypeDefHeaderOutput>;
}

/** List all type definitions returned as a list of minimal information header. */
export interface TypesListTypeDefinitionHeadersdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get the term template definition for the given GUID. */
export interface TypesGetTermTemplateDefByGuid200Response extends HttpResponse {
  status: "200";
  body: TermTemplateDefOutput;
}

/** Get the term template definition for the given GUID. */
export interface TypesGetTermTemplateDefByGuiddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get the term template definition by its name (unique). */
export interface TypesGetTermTemplateDefByName200Response extends HttpResponse {
  status: "200";
  body: TermTemplateDefOutput;
}

/** Get the term template definition by its name (unique). */
export interface TypesGetTermTemplateDefByNamedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/**
 * Creates or updates an entity to a collection.
 * Existing entity is matched using its unique guid if supplied or by its unique attributes eg: qualifiedName.
 * Map and array of collections are not well supported. E.g., array<array<int>>, array<map<string, int>>.
 */
export interface CollectionCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: EntityMutationResponseOutput;
}

/**
 * Creates or updates an entity to a collection.
 * Existing entity is matched using its unique guid if supplied or by its unique attributes eg: qualifiedName.
 * Map and array of collections are not well supported. E.g., array<array<int>>, array<map<string, int>>.
 */
export interface CollectionCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/**
 * Creates or updates entities in bulk to a collection.
 * Existing entity is matched using its unique guid if supplied or by its unique attributes eg: qualifiedName.
 * Map and array of collections are not well supported. E.g., array<array<int>>, array<map<string, int>>.
 */
export interface CollectionCreateOrUpdateBulk200Response extends HttpResponse {
  status: "200";
  body: EntityMutationResponseOutput;
}

/**
 * Creates or updates entities in bulk to a collection.
 * Existing entity is matched using its unique guid if supplied or by its unique attributes eg: qualifiedName.
 * Map and array of collections are not well supported. E.g., array<array<int>>, array<map<string, int>>.
 */
export interface CollectionCreateOrUpdateBulkdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Move existing entities to the target collection. */
export interface CollectionMoveEntitiesToCollection200Response extends HttpResponse {
  status: "200";
  body: EntityMutationResponseOutput;
}

/** Move existing entities to the target collection. */
export interface CollectionMoveEntitiesToCollectiondefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}
