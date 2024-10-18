// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
  EntityGetSampleBusinessMetadataTemplate200Response,
  EntityGetSampleBusinessMetadataTemplate400Response,
  EntityImportBusinessMetadata200Response,
  EntityImportBusinessMetadata400Response,
  EntityImportBusinessMetadata409Response,
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

const responseMap: Record<string, string[]> = {
  "POST /atlas/v2/entity": ["200"],
  "GET /atlas/v2/entity/bulk": ["200"],
  "POST /atlas/v2/entity/bulk": ["200"],
  "DELETE /atlas/v2/entity/bulk": ["200"],
  "POST /atlas/v2/entity/bulk/classification": ["204"],
  "GET /atlas/v2/entity/guid/{guid}": ["200"],
  "PUT /atlas/v2/entity/guid/{guid}": ["200"],
  "DELETE /atlas/v2/entity/guid/{guid}": ["200"],
  "GET /atlas/v2/entity/guid/{guid}/classification/{classificationName}": ["200"],
  "DELETE /atlas/v2/entity/guid/{guid}/classification/{classificationName}": ["204"],
  "GET /atlas/v2/entity/guid/{guid}/classifications": ["200"],
  "POST /atlas/v2/entity/guid/{guid}/classifications": ["204"],
  "PUT /atlas/v2/entity/guid/{guid}/classifications": ["204"],
  "GET /atlas/v2/entity/uniqueAttribute/type/{typeName}": ["200"],
  "PUT /atlas/v2/entity/uniqueAttribute/type/{typeName}": ["200"],
  "DELETE /atlas/v2/entity/uniqueAttribute/type/{typeName}": ["200"],
  "DELETE /atlas/v2/entity/uniqueAttribute/type/{typeName}/classification/{classificationName}": [
    "204",
  ],
  "POST /atlas/v2/entity/uniqueAttribute/type/{typeName}/classifications": ["204"],
  "PUT /atlas/v2/entity/uniqueAttribute/type/{typeName}/classifications": ["204"],
  "POST /atlas/v2/entity/bulk/setClassifications": ["200"],
  "GET /atlas/v2/entity/bulk/uniqueAttribute/type/{typeName}": ["200"],
  "GET /atlas/v2/entity/guid/{guid}/header": ["200"],
  "DELETE /atlas/v2/entity/guid/{guid}/businessmetadata": ["204"],
  "POST /atlas/v2/entity/guid/{guid}/businessmetadata": ["204"],
  "DELETE /atlas/v2/entity/guid/{guid}/businessmetadata/{bmName}": ["204"],
  "POST /atlas/v2/entity/guid/{guid}/businessmetadata/{bmName}": ["204"],
  "GET /atlas/v2/entity/businessmetadata/import/template": ["200"],
  "POST /atlas/v2/entity/businessmetadata/import": ["200"],
  "DELETE /atlas/v2/entity/guid/{guid}/labels": ["204"],
  "POST /atlas/v2/entity/guid/{guid}/labels": ["204"],
  "PUT /atlas/v2/entity/guid/{guid}/labels": ["204"],
  "DELETE /atlas/v2/entity/uniqueAttribute/type/{typeName}/labels": ["204"],
  "POST /atlas/v2/entity/uniqueAttribute/type/{typeName}/labels": ["204"],
  "PUT /atlas/v2/entity/uniqueAttribute/type/{typeName}/labels": ["204"],
  "GET /atlas/v2/glossary": ["200"],
  "POST /atlas/v2/glossary": ["200"],
  "POST /atlas/v2/glossary/categories": ["200"],
  "POST /atlas/v2/glossary/category": ["200"],
  "GET /atlas/v2/glossary/category/{categoryGuid}": ["200"],
  "PUT /atlas/v2/glossary/category/{categoryGuid}": ["200"],
  "DELETE /atlas/v2/glossary/category/{categoryGuid}": ["204"],
  "PUT /atlas/v2/glossary/category/{categoryGuid}/partial": ["200"],
  "GET /atlas/v2/glossary/category/{categoryGuid}/related": ["200"],
  "GET /atlas/v2/glossary/category/{categoryGuid}/terms": ["200"],
  "POST /atlas/v2/glossary/term": ["200"],
  "GET /atlas/v2/glossary/term/{termGuid}": ["200"],
  "PUT /atlas/v2/glossary/term/{termGuid}": ["200"],
  "DELETE /atlas/v2/glossary/term/{termGuid}": ["204"],
  "PUT /atlas/v2/glossary/term/{termGuid}/partial": ["200"],
  "POST /atlas/v2/glossary/terms": ["200"],
  "GET /atlas/v2/glossary/terms/{termGuid}/assignedEntities": ["200"],
  "POST /atlas/v2/glossary/terms/{termGuid}/assignedEntities": ["204"],
  "PUT /atlas/v2/glossary/terms/{termGuid}/assignedEntities": ["204"],
  "DELETE /atlas/v2/glossary/terms/{termGuid}/assignedEntities": ["204"],
  "GET /atlas/v2/glossary/terms/{termGuid}/related": ["200"],
  "GET /atlas/v2/glossary/{glossaryGuid}": ["200"],
  "PUT /atlas/v2/glossary/{glossaryGuid}": ["200"],
  "DELETE /atlas/v2/glossary/{glossaryGuid}": ["204"],
  "GET /atlas/v2/glossary/{glossaryGuid}/categories": ["200"],
  "GET /atlas/v2/glossary/{glossaryGuid}/categories/headers": ["200"],
  "GET /atlas/v2/glossary/{glossaryGuid}/detailed": ["200"],
  "PUT /atlas/v2/glossary/{glossaryGuid}/partial": ["200"],
  "GET /atlas/v2/glossary/{glossaryGuid}/terms": ["200"],
  "GET /atlas/v2/glossary/{glossaryGuid}/terms/headers": ["200"],
  "GET /glossary/{glossaryGuid}/terms/import": ["202"],
  "POST /glossary/{glossaryGuid}/terms/import": ["202"],
  "GET /glossary/name/{glossaryName}/terms/import": ["202"],
  "POST /glossary/name/{glossaryName}/terms/import": ["202"],
  "GET /glossary/terms/import/{operationGuid}": ["200"],
  "POST /glossary/{glossaryGuid}/terms/export": ["200"],
  "GET /glossary/name/{glossaryName}/terms": ["200"],
  "POST /search/query": ["200"],
  "POST /search/suggest": ["200"],
  "POST /browse": ["200"],
  "POST /search/autocomplete": ["200"],
  "GET /atlas/v2/lineage/{guid}": ["200"],
  "GET /lineage/{guid}/next/": ["200"],
  "GET /atlas/v2/lineage/uniqueAttribute/type/{typeName}": ["200"],
  "POST /atlas/v2/relationship": ["200"],
  "PUT /atlas/v2/relationship": ["200"],
  "GET /atlas/v2/relationship/guid/{guid}": ["200"],
  "DELETE /atlas/v2/relationship/guid/{guid}": ["204"],
  "GET /atlas/v2/types/businessmetadatadef/guid/{guid}": ["200"],
  "GET /atlas/v2/types/businessmetadatadef/name/{name}": ["200"],
  "GET /atlas/v2/types/classificationdef/guid/{guid}": ["200"],
  "GET /atlas/v2/types/classificationdef/name/{name}": ["200"],
  "GET /atlas/v2/types/entitydef/guid/{guid}": ["200"],
  "GET /atlas/v2/types/entitydef/name/{name}": ["200"],
  "GET /atlas/v2/types/enumdef/guid/{guid}": ["200"],
  "GET /atlas/v2/types/enumdef/name/{name}": ["200"],
  "GET /atlas/v2/types/relationshipdef/guid/{guid}": ["200"],
  "GET /atlas/v2/types/relationshipdef/name/{name}": ["200"],
  "GET /atlas/v2/types/structdef/guid/{guid}": ["200"],
  "GET /atlas/v2/types/structdef/name/{name}": ["200"],
  "GET /atlas/v2/types/typedef/guid/{guid}": ["200"],
  "GET /atlas/v2/types/typedef/name/{name}": ["200"],
  "DELETE /atlas/v2/types/typedef/name/{name}": ["204"],
  "GET /atlas/v2/types/typedefs": ["200"],
  "POST /atlas/v2/types/typedefs": ["200"],
  "PUT /atlas/v2/types/typedefs": ["200"],
  "DELETE /atlas/v2/types/typedefs": ["204"],
  "GET /atlas/v2/types/typedefs/headers": ["200"],
  "GET /types/termtemplatedef/guid/{guid}": ["200"],
  "GET /types/termtemplatedef/name/{name}": ["200"],
  "POST /collections/{collection}/entity": ["200"],
  "POST /collections/{collection}/entity/bulk": ["200"],
  "POST /collections/{collection}/entity/moveHere": ["200"],
};

export function isUnexpected(
  response: EntityCreateOrUpdate200Response | EntityCreateOrUpdateDefaultResponse,
): response is EntityCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: EntityListByGuids200Response | EntityListByGuidsDefaultResponse,
): response is EntityListByGuidsDefaultResponse;
export function isUnexpected(
  response: EntityCreateOrUpdateEntities200Response | EntityCreateOrUpdateEntitiesDefaultResponse,
): response is EntityCreateOrUpdateEntitiesDefaultResponse;
export function isUnexpected(
  response: EntityDeleteByGuids200Response | EntityDeleteByGuidsDefaultResponse,
): response is EntityDeleteByGuidsDefaultResponse;
export function isUnexpected(
  response: EntityAddClassification204Response | EntityAddClassificationDefaultResponse,
): response is EntityAddClassificationDefaultResponse;
export function isUnexpected(
  response: EntityGetByGuid200Response | EntityGetByGuidDefaultResponse,
): response is EntityGetByGuidDefaultResponse;
export function isUnexpected(
  response:
    | EntityPartialUpdateEntityAttributeByGuid200Response
    | EntityPartialUpdateEntityAttributeByGuidDefaultResponse,
): response is EntityPartialUpdateEntityAttributeByGuidDefaultResponse;
export function isUnexpected(
  response: EntityDeleteByGuid200Response | EntityDeleteByGuidDefaultResponse,
): response is EntityDeleteByGuidDefaultResponse;
export function isUnexpected(
  response: EntityGetClassification200Response | EntityGetClassificationDefaultResponse,
): response is EntityGetClassificationDefaultResponse;
export function isUnexpected(
  response: EntityDeleteClassification204Response | EntityDeleteClassificationDefaultResponse,
): response is EntityDeleteClassificationDefaultResponse;
export function isUnexpected(
  response: EntityGetClassifications200Response | EntityGetClassificationsDefaultResponse,
): response is EntityGetClassificationsDefaultResponse;
export function isUnexpected(
  response: EntityAddClassifications204Response | EntityAddClassificationsDefaultResponse,
): response is EntityAddClassificationsDefaultResponse;
export function isUnexpected(
  response: EntityUpdateClassifications204Response | EntityUpdateClassificationsDefaultResponse,
): response is EntityUpdateClassificationsDefaultResponse;
export function isUnexpected(
  response: EntityGetByUniqueAttributes200Response | EntityGetByUniqueAttributesDefaultResponse,
): response is EntityGetByUniqueAttributesDefaultResponse;
export function isUnexpected(
  response:
    | EntityPartialUpdateEntityByUniqueAttributes200Response
    | EntityPartialUpdateEntityByUniqueAttributesDefaultResponse,
): response is EntityPartialUpdateEntityByUniqueAttributesDefaultResponse;
export function isUnexpected(
  response: EntityDeleteByUniqueAttribute200Response | EntityDeleteByUniqueAttributeDefaultResponse,
): response is EntityDeleteByUniqueAttributeDefaultResponse;
export function isUnexpected(
  response:
    | EntityDeleteClassificationByUniqueAttribute204Response
    | EntityDeleteClassificationByUniqueAttributeDefaultResponse,
): response is EntityDeleteClassificationByUniqueAttributeDefaultResponse;
export function isUnexpected(
  response:
    | EntityAddClassificationsByUniqueAttribute204Response
    | EntityAddClassificationsByUniqueAttributeDefaultResponse,
): response is EntityAddClassificationsByUniqueAttributeDefaultResponse;
export function isUnexpected(
  response:
    | EntityUpdateClassificationsByUniqueAttribute204Response
    | EntityUpdateClassificationsByUniqueAttributeDefaultResponse,
): response is EntityUpdateClassificationsByUniqueAttributeDefaultResponse;
export function isUnexpected(
  response: EntitySetClassifications200Response | EntitySetClassificationsDefaultResponse,
): response is EntitySetClassificationsDefaultResponse;
export function isUnexpected(
  response:
    | EntityGetEntitiesByUniqueAttributes200Response
    | EntityGetEntitiesByUniqueAttributesDefaultResponse,
): response is EntityGetEntitiesByUniqueAttributesDefaultResponse;
export function isUnexpected(
  response: EntityGetHeader200Response | EntityGetHeaderDefaultResponse,
): response is EntityGetHeaderDefaultResponse;
export function isUnexpected(
  response:
    | EntityGetSampleBusinessMetadataTemplate200Response
    | EntityGetSampleBusinessMetadataTemplate400Response,
): response is EntityGetSampleBusinessMetadataTemplate400Response;
export function isUnexpected(
  response:
    | EntityImportBusinessMetadata200Response
    | EntityImportBusinessMetadata400Response
    | EntityImportBusinessMetadata409Response,
): response is EntityImportBusinessMetadata400Response;
export function isUnexpected(
  response: GlossaryListGlossaries200Response | GlossaryListGlossariesDefaultResponse,
): response is GlossaryListGlossariesDefaultResponse;
export function isUnexpected(
  response: GlossaryCreateGlossary200Response | GlossaryCreateGlossaryDefaultResponse,
): response is GlossaryCreateGlossaryDefaultResponse;
export function isUnexpected(
  response:
    | GlossaryCreateGlossaryCategories200Response
    | GlossaryCreateGlossaryCategoriesDefaultResponse,
): response is GlossaryCreateGlossaryCategoriesDefaultResponse;
export function isUnexpected(
  response:
    | GlossaryCreateGlossaryCategory200Response
    | GlossaryCreateGlossaryCategoryDefaultResponse,
): response is GlossaryCreateGlossaryCategoryDefaultResponse;
export function isUnexpected(
  response: GlossaryGetGlossaryCategory200Response | GlossaryGetGlossaryCategoryDefaultResponse,
): response is GlossaryGetGlossaryCategoryDefaultResponse;
export function isUnexpected(
  response:
    | GlossaryUpdateGlossaryCategory200Response
    | GlossaryUpdateGlossaryCategoryDefaultResponse,
): response is GlossaryUpdateGlossaryCategoryDefaultResponse;
export function isUnexpected(
  response:
    | GlossaryDeleteGlossaryCategory204Response
    | GlossaryDeleteGlossaryCategoryDefaultResponse,
): response is GlossaryDeleteGlossaryCategoryDefaultResponse;
export function isUnexpected(
  response:
    | GlossaryPartialUpdateGlossaryCategory200Response
    | GlossaryPartialUpdateGlossaryCategoryDefaultResponse,
): response is GlossaryPartialUpdateGlossaryCategoryDefaultResponse;
export function isUnexpected(
  response: GlossaryListRelatedCategories200Response | GlossaryListRelatedCategoriesDefaultResponse,
): response is GlossaryListRelatedCategoriesDefaultResponse;
export function isUnexpected(
  response: GlossaryListCategoryTerms200Response | GlossaryListCategoryTermsDefaultResponse,
): response is GlossaryListCategoryTermsDefaultResponse;
export function isUnexpected(
  response: GlossaryCreateGlossaryTerm200Response | GlossaryCreateGlossaryTermDefaultResponse,
): response is GlossaryCreateGlossaryTermDefaultResponse;
export function isUnexpected(
  response: GlossaryGetGlossaryTerm200Response | GlossaryGetGlossaryTermDefaultResponse,
): response is GlossaryGetGlossaryTermDefaultResponse;
export function isUnexpected(
  response: GlossaryUpdateGlossaryTerm200Response | GlossaryUpdateGlossaryTermDefaultResponse,
): response is GlossaryUpdateGlossaryTermDefaultResponse;
export function isUnexpected(
  response: GlossaryDeleteGlossaryTerm204Response | GlossaryDeleteGlossaryTermDefaultResponse,
): response is GlossaryDeleteGlossaryTermDefaultResponse;
export function isUnexpected(
  response:
    | GlossaryPartialUpdateGlossaryTerm200Response
    | GlossaryPartialUpdateGlossaryTermDefaultResponse,
): response is GlossaryPartialUpdateGlossaryTermDefaultResponse;
export function isUnexpected(
  response: GlossaryCreateGlossaryTerms200Response | GlossaryCreateGlossaryTermsDefaultResponse,
): response is GlossaryCreateGlossaryTermsDefaultResponse;
export function isUnexpected(
  response:
    | GlossaryGetEntitiesAssignedWithTerm200Response
    | GlossaryGetEntitiesAssignedWithTermDefaultResponse,
): response is GlossaryGetEntitiesAssignedWithTermDefaultResponse;
export function isUnexpected(
  response: GlossaryAssignTermToEntities204Response | GlossaryAssignTermToEntitiesDefaultResponse,
): response is GlossaryAssignTermToEntitiesDefaultResponse;
export function isUnexpected(
  response:
    | GlossaryRemoveTermAssignmentFromEntities204Response
    | GlossaryRemoveTermAssignmentFromEntitiesDefaultResponse,
): response is GlossaryRemoveTermAssignmentFromEntitiesDefaultResponse;
export function isUnexpected(
  response:
    | GlossaryDeleteTermAssignmentFromEntities204Response
    | GlossaryDeleteTermAssignmentFromEntitiesDefaultResponse,
): response is GlossaryDeleteTermAssignmentFromEntitiesDefaultResponse;
export function isUnexpected(
  response: GlossaryListRelatedTerms200Response | GlossaryListRelatedTermsDefaultResponse,
): response is GlossaryListRelatedTermsDefaultResponse;
export function isUnexpected(
  response: GlossaryGetGlossary200Response | GlossaryGetGlossaryDefaultResponse,
): response is GlossaryGetGlossaryDefaultResponse;
export function isUnexpected(
  response: GlossaryUpdateGlossary200Response | GlossaryUpdateGlossaryDefaultResponse,
): response is GlossaryUpdateGlossaryDefaultResponse;
export function isUnexpected(
  response: GlossaryDeleteGlossary204Response | GlossaryDeleteGlossaryDefaultResponse,
): response is GlossaryDeleteGlossaryDefaultResponse;
export function isUnexpected(
  response:
    | GlossaryListGlossaryCategories200Response
    | GlossaryListGlossaryCategoriesDefaultResponse,
): response is GlossaryListGlossaryCategoriesDefaultResponse;
export function isUnexpected(
  response:
    | GlossaryListGlossaryCategoriesHeaders200Response
    | GlossaryListGlossaryCategoriesHeadersDefaultResponse,
): response is GlossaryListGlossaryCategoriesHeadersDefaultResponse;
export function isUnexpected(
  response: GlossaryGetDetailedGlossary200Response | GlossaryGetDetailedGlossaryDefaultResponse,
): response is GlossaryGetDetailedGlossaryDefaultResponse;
export function isUnexpected(
  response: GlossaryPartialUpdateGlossary200Response | GlossaryPartialUpdateGlossaryDefaultResponse,
): response is GlossaryPartialUpdateGlossaryDefaultResponse;
export function isUnexpected(
  response: GlossaryListGlossaryTerms200Response | GlossaryListGlossaryTermsDefaultResponse,
): response is GlossaryListGlossaryTermsDefaultResponse;
export function isUnexpected(
  response:
    | GlossaryListGlossaryTermHeaders200Response
    | GlossaryListGlossaryTermHeadersDefaultResponse,
): response is GlossaryListGlossaryTermHeadersDefaultResponse;
export function isUnexpected(
  response:
    | GlossaryImportGlossaryTermsViaCsv202Response
    | GlossaryImportGlossaryTermsViaCsvDefaultResponse,
): response is GlossaryImportGlossaryTermsViaCsvDefaultResponse;
export function isUnexpected(
  response:
    | GlossaryImportGlossaryTermsViaCsvByGlossaryName202Response
    | GlossaryImportGlossaryTermsViaCsvByGlossaryNameDefaultResponse,
): response is GlossaryImportGlossaryTermsViaCsvByGlossaryNameDefaultResponse;
export function isUnexpected(
  response:
    | GlossaryGetImportCsvOperationStatus200Response
    | GlossaryGetImportCsvOperationStatusDefaultResponse,
): response is GlossaryGetImportCsvOperationStatusDefaultResponse;
export function isUnexpected(
  response:
    | GlossaryExportGlossaryTermsAsCsv200Response
    | GlossaryExportGlossaryTermsAsCsvDefaultResponse,
): response is GlossaryExportGlossaryTermsAsCsvDefaultResponse;
export function isUnexpected(
  response:
    | GlossaryListTermsByGlossaryName200Response
    | GlossaryListTermsByGlossaryNameDefaultResponse,
): response is GlossaryListTermsByGlossaryNameDefaultResponse;
export function isUnexpected(
  response: DiscoveryQuery200Response | DiscoveryQueryDefaultResponse,
): response is DiscoveryQueryDefaultResponse;
export function isUnexpected(
  response: DiscoverySuggest200Response | DiscoverySuggestDefaultResponse,
): response is DiscoverySuggestDefaultResponse;
export function isUnexpected(
  response: DiscoveryBrowse200Response | DiscoveryBrowseDefaultResponse,
): response is DiscoveryBrowseDefaultResponse;
export function isUnexpected(
  response: DiscoveryAutoComplete200Response | DiscoveryAutoCompleteDefaultResponse,
): response is DiscoveryAutoCompleteDefaultResponse;
export function isUnexpected(
  response: LineageGetLineageGraph200Response | LineageGetLineageGraphDefaultResponse,
): response is LineageGetLineageGraphDefaultResponse;
export function isUnexpected(
  response: LineageNextPageLineage200Response | LineageNextPageLineageDefaultResponse,
): response is LineageNextPageLineageDefaultResponse;
export function isUnexpected(
  response:
    | LineageGetLineageByUniqueAttribute200Response
    | LineageGetLineageByUniqueAttribute400Response
    | LineageGetLineageByUniqueAttribute404Response,
): response is LineageGetLineageByUniqueAttribute400Response;
export function isUnexpected(
  response: RelationshipCreate200Response | RelationshipCreateDefaultResponse,
): response is RelationshipCreateDefaultResponse;
export function isUnexpected(
  response: RelationshipUpdate200Response | RelationshipUpdateDefaultResponse,
): response is RelationshipUpdateDefaultResponse;
export function isUnexpected(
  response: RelationshipGet200Response | RelationshipGetDefaultResponse,
): response is RelationshipGetDefaultResponse;
export function isUnexpected(
  response: RelationshipDelete204Response | RelationshipDeleteDefaultResponse,
): response is RelationshipDeleteDefaultResponse;
export function isUnexpected(
  response:
    | TypesGetBusinessMetadataDefByGuid200Response
    | TypesGetBusinessMetadataDefByGuid404Response,
): response is TypesGetBusinessMetadataDefByGuid404Response;
export function isUnexpected(
  response:
    | TypesGetBusinessMetadataDefByName200Response
    | TypesGetBusinessMetadataDefByName404Response,
): response is TypesGetBusinessMetadataDefByName404Response;
export function isUnexpected(
  response:
    | TypesGetClassificationDefByGuid200Response
    | TypesGetClassificationDefByGuidDefaultResponse,
): response is TypesGetClassificationDefByGuidDefaultResponse;
export function isUnexpected(
  response:
    | TypesGetClassificationDefByName200Response
    | TypesGetClassificationDefByNameDefaultResponse,
): response is TypesGetClassificationDefByNameDefaultResponse;
export function isUnexpected(
  response:
    | TypesGetEntityDefinitionByGuid200Response
    | TypesGetEntityDefinitionByGuidDefaultResponse,
): response is TypesGetEntityDefinitionByGuidDefaultResponse;
export function isUnexpected(
  response:
    | TypesGetEntityDefinitionByName200Response
    | TypesGetEntityDefinitionByNameDefaultResponse,
): response is TypesGetEntityDefinitionByNameDefaultResponse;
export function isUnexpected(
  response: TypesGetEnumDefByGuid200Response | TypesGetEnumDefByGuidDefaultResponse,
): response is TypesGetEnumDefByGuidDefaultResponse;
export function isUnexpected(
  response: TypesGetEnumDefByName200Response | TypesGetEnumDefByNameDefaultResponse,
): response is TypesGetEnumDefByNameDefaultResponse;
export function isUnexpected(
  response: TypesGetRelationshipDefByGuid200Response | TypesGetRelationshipDefByGuidDefaultResponse,
): response is TypesGetRelationshipDefByGuidDefaultResponse;
export function isUnexpected(
  response: TypesGetRelationshipDefByName200Response | TypesGetRelationshipDefByNameDefaultResponse,
): response is TypesGetRelationshipDefByNameDefaultResponse;
export function isUnexpected(
  response: TypesGetStructDefByGuid200Response | TypesGetStructDefByGuidDefaultResponse,
): response is TypesGetStructDefByGuidDefaultResponse;
export function isUnexpected(
  response: TypesGetStructDefByName200Response | TypesGetStructDefByNameDefaultResponse,
): response is TypesGetStructDefByNameDefaultResponse;
export function isUnexpected(
  response: TypesGetTypeDefinitionByGuid200Response | TypesGetTypeDefinitionByGuidDefaultResponse,
): response is TypesGetTypeDefinitionByGuidDefaultResponse;
export function isUnexpected(
  response: TypesGetTypeDefinitionByName200Response | TypesGetTypeDefinitionByNameDefaultResponse,
): response is TypesGetTypeDefinitionByNameDefaultResponse;
export function isUnexpected(
  response: TypesDeleteTypeByName204Response | TypesDeleteTypeByNameDefaultResponse,
): response is TypesDeleteTypeByNameDefaultResponse;
export function isUnexpected(
  response: TypesGetAllTypeDefinitions200Response | TypesGetAllTypeDefinitionsDefaultResponse,
): response is TypesGetAllTypeDefinitionsDefaultResponse;
export function isUnexpected(
  response: TypesCreateTypeDefinitions200Response | TypesCreateTypeDefinitionsDefaultResponse,
): response is TypesCreateTypeDefinitionsDefaultResponse;
export function isUnexpected(
  response:
    | TypesUpdateAtlasTypeDefinitions200Response
    | TypesUpdateAtlasTypeDefinitionsDefaultResponse,
): response is TypesUpdateAtlasTypeDefinitionsDefaultResponse;
export function isUnexpected(
  response: TypesDeleteTypeDefinitions204Response | TypesDeleteTypeDefinitionsDefaultResponse,
): response is TypesDeleteTypeDefinitionsDefaultResponse;
export function isUnexpected(
  response:
    | TypesListTypeDefinitionHeaders200Response
    | TypesListTypeDefinitionHeadersDefaultResponse,
): response is TypesListTypeDefinitionHeadersDefaultResponse;
export function isUnexpected(
  response: TypesGetTermTemplateDefByGuid200Response | TypesGetTermTemplateDefByGuidDefaultResponse,
): response is TypesGetTermTemplateDefByGuidDefaultResponse;
export function isUnexpected(
  response: TypesGetTermTemplateDefByName200Response | TypesGetTermTemplateDefByNameDefaultResponse,
): response is TypesGetTermTemplateDefByNameDefaultResponse;
export function isUnexpected(
  response: CollectionCreateOrUpdate200Response | CollectionCreateOrUpdateDefaultResponse,
): response is CollectionCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: CollectionCreateOrUpdateBulk200Response | CollectionCreateOrUpdateBulkDefaultResponse,
): response is CollectionCreateOrUpdateBulkDefaultResponse;
export function isUnexpected(
  response:
    | CollectionMoveEntitiesToCollection200Response
    | CollectionMoveEntitiesToCollectionDefaultResponse,
): response is CollectionMoveEntitiesToCollectionDefaultResponse;
export function isUnexpected(
  response:
    | EntityCreateOrUpdate200Response
    | EntityCreateOrUpdateDefaultResponse
    | EntityListByGuids200Response
    | EntityListByGuidsDefaultResponse
    | EntityCreateOrUpdateEntities200Response
    | EntityCreateOrUpdateEntitiesDefaultResponse
    | EntityDeleteByGuids200Response
    | EntityDeleteByGuidsDefaultResponse
    | EntityAddClassification204Response
    | EntityAddClassificationDefaultResponse
    | EntityGetByGuid200Response
    | EntityGetByGuidDefaultResponse
    | EntityPartialUpdateEntityAttributeByGuid200Response
    | EntityPartialUpdateEntityAttributeByGuidDefaultResponse
    | EntityDeleteByGuid200Response
    | EntityDeleteByGuidDefaultResponse
    | EntityGetClassification200Response
    | EntityGetClassificationDefaultResponse
    | EntityDeleteClassification204Response
    | EntityDeleteClassificationDefaultResponse
    | EntityGetClassifications200Response
    | EntityGetClassificationsDefaultResponse
    | EntityAddClassifications204Response
    | EntityAddClassificationsDefaultResponse
    | EntityUpdateClassifications204Response
    | EntityUpdateClassificationsDefaultResponse
    | EntityGetByUniqueAttributes200Response
    | EntityGetByUniqueAttributesDefaultResponse
    | EntityPartialUpdateEntityByUniqueAttributes200Response
    | EntityPartialUpdateEntityByUniqueAttributesDefaultResponse
    | EntityDeleteByUniqueAttribute200Response
    | EntityDeleteByUniqueAttributeDefaultResponse
    | EntityDeleteClassificationByUniqueAttribute204Response
    | EntityDeleteClassificationByUniqueAttributeDefaultResponse
    | EntityAddClassificationsByUniqueAttribute204Response
    | EntityAddClassificationsByUniqueAttributeDefaultResponse
    | EntityUpdateClassificationsByUniqueAttribute204Response
    | EntityUpdateClassificationsByUniqueAttributeDefaultResponse
    | EntitySetClassifications200Response
    | EntitySetClassificationsDefaultResponse
    | EntityGetEntitiesByUniqueAttributes200Response
    | EntityGetEntitiesByUniqueAttributesDefaultResponse
    | EntityGetHeader200Response
    | EntityGetHeaderDefaultResponse
    | EntityGetSampleBusinessMetadataTemplate200Response
    | EntityGetSampleBusinessMetadataTemplate400Response
    | EntityImportBusinessMetadata200Response
    | EntityImportBusinessMetadata400Response
    | EntityImportBusinessMetadata409Response
    | GlossaryListGlossaries200Response
    | GlossaryListGlossariesDefaultResponse
    | GlossaryCreateGlossary200Response
    | GlossaryCreateGlossaryDefaultResponse
    | GlossaryCreateGlossaryCategories200Response
    | GlossaryCreateGlossaryCategoriesDefaultResponse
    | GlossaryCreateGlossaryCategory200Response
    | GlossaryCreateGlossaryCategoryDefaultResponse
    | GlossaryGetGlossaryCategory200Response
    | GlossaryGetGlossaryCategoryDefaultResponse
    | GlossaryUpdateGlossaryCategory200Response
    | GlossaryUpdateGlossaryCategoryDefaultResponse
    | GlossaryDeleteGlossaryCategory204Response
    | GlossaryDeleteGlossaryCategoryDefaultResponse
    | GlossaryPartialUpdateGlossaryCategory200Response
    | GlossaryPartialUpdateGlossaryCategoryDefaultResponse
    | GlossaryListRelatedCategories200Response
    | GlossaryListRelatedCategoriesDefaultResponse
    | GlossaryListCategoryTerms200Response
    | GlossaryListCategoryTermsDefaultResponse
    | GlossaryCreateGlossaryTerm200Response
    | GlossaryCreateGlossaryTermDefaultResponse
    | GlossaryGetGlossaryTerm200Response
    | GlossaryGetGlossaryTermDefaultResponse
    | GlossaryUpdateGlossaryTerm200Response
    | GlossaryUpdateGlossaryTermDefaultResponse
    | GlossaryDeleteGlossaryTerm204Response
    | GlossaryDeleteGlossaryTermDefaultResponse
    | GlossaryPartialUpdateGlossaryTerm200Response
    | GlossaryPartialUpdateGlossaryTermDefaultResponse
    | GlossaryCreateGlossaryTerms200Response
    | GlossaryCreateGlossaryTermsDefaultResponse
    | GlossaryGetEntitiesAssignedWithTerm200Response
    | GlossaryGetEntitiesAssignedWithTermDefaultResponse
    | GlossaryAssignTermToEntities204Response
    | GlossaryAssignTermToEntitiesDefaultResponse
    | GlossaryRemoveTermAssignmentFromEntities204Response
    | GlossaryRemoveTermAssignmentFromEntitiesDefaultResponse
    | GlossaryDeleteTermAssignmentFromEntities204Response
    | GlossaryDeleteTermAssignmentFromEntitiesDefaultResponse
    | GlossaryListRelatedTerms200Response
    | GlossaryListRelatedTermsDefaultResponse
    | GlossaryGetGlossary200Response
    | GlossaryGetGlossaryDefaultResponse
    | GlossaryUpdateGlossary200Response
    | GlossaryUpdateGlossaryDefaultResponse
    | GlossaryDeleteGlossary204Response
    | GlossaryDeleteGlossaryDefaultResponse
    | GlossaryListGlossaryCategories200Response
    | GlossaryListGlossaryCategoriesDefaultResponse
    | GlossaryListGlossaryCategoriesHeaders200Response
    | GlossaryListGlossaryCategoriesHeadersDefaultResponse
    | GlossaryGetDetailedGlossary200Response
    | GlossaryGetDetailedGlossaryDefaultResponse
    | GlossaryPartialUpdateGlossary200Response
    | GlossaryPartialUpdateGlossaryDefaultResponse
    | GlossaryListGlossaryTerms200Response
    | GlossaryListGlossaryTermsDefaultResponse
    | GlossaryListGlossaryTermHeaders200Response
    | GlossaryListGlossaryTermHeadersDefaultResponse
    | GlossaryImportGlossaryTermsViaCsv202Response
    | GlossaryImportGlossaryTermsViaCsvDefaultResponse
    | GlossaryImportGlossaryTermsViaCsvByGlossaryName202Response
    | GlossaryImportGlossaryTermsViaCsvByGlossaryNameDefaultResponse
    | GlossaryGetImportCsvOperationStatus200Response
    | GlossaryGetImportCsvOperationStatusDefaultResponse
    | GlossaryExportGlossaryTermsAsCsv200Response
    | GlossaryExportGlossaryTermsAsCsvDefaultResponse
    | GlossaryListTermsByGlossaryName200Response
    | GlossaryListTermsByGlossaryNameDefaultResponse
    | DiscoveryQuery200Response
    | DiscoveryQueryDefaultResponse
    | DiscoverySuggest200Response
    | DiscoverySuggestDefaultResponse
    | DiscoveryBrowse200Response
    | DiscoveryBrowseDefaultResponse
    | DiscoveryAutoComplete200Response
    | DiscoveryAutoCompleteDefaultResponse
    | LineageGetLineageGraph200Response
    | LineageGetLineageGraphDefaultResponse
    | LineageNextPageLineage200Response
    | LineageNextPageLineageDefaultResponse
    | LineageGetLineageByUniqueAttribute200Response
    | LineageGetLineageByUniqueAttribute400Response
    | LineageGetLineageByUniqueAttribute404Response
    | RelationshipCreate200Response
    | RelationshipCreateDefaultResponse
    | RelationshipUpdate200Response
    | RelationshipUpdateDefaultResponse
    | RelationshipGet200Response
    | RelationshipGetDefaultResponse
    | RelationshipDelete204Response
    | RelationshipDeleteDefaultResponse
    | TypesGetBusinessMetadataDefByGuid200Response
    | TypesGetBusinessMetadataDefByGuid404Response
    | TypesGetBusinessMetadataDefByName200Response
    | TypesGetBusinessMetadataDefByName404Response
    | TypesGetClassificationDefByGuid200Response
    | TypesGetClassificationDefByGuidDefaultResponse
    | TypesGetClassificationDefByName200Response
    | TypesGetClassificationDefByNameDefaultResponse
    | TypesGetEntityDefinitionByGuid200Response
    | TypesGetEntityDefinitionByGuidDefaultResponse
    | TypesGetEntityDefinitionByName200Response
    | TypesGetEntityDefinitionByNameDefaultResponse
    | TypesGetEnumDefByGuid200Response
    | TypesGetEnumDefByGuidDefaultResponse
    | TypesGetEnumDefByName200Response
    | TypesGetEnumDefByNameDefaultResponse
    | TypesGetRelationshipDefByGuid200Response
    | TypesGetRelationshipDefByGuidDefaultResponse
    | TypesGetRelationshipDefByName200Response
    | TypesGetRelationshipDefByNameDefaultResponse
    | TypesGetStructDefByGuid200Response
    | TypesGetStructDefByGuidDefaultResponse
    | TypesGetStructDefByName200Response
    | TypesGetStructDefByNameDefaultResponse
    | TypesGetTypeDefinitionByGuid200Response
    | TypesGetTypeDefinitionByGuidDefaultResponse
    | TypesGetTypeDefinitionByName200Response
    | TypesGetTypeDefinitionByNameDefaultResponse
    | TypesDeleteTypeByName204Response
    | TypesDeleteTypeByNameDefaultResponse
    | TypesGetAllTypeDefinitions200Response
    | TypesGetAllTypeDefinitionsDefaultResponse
    | TypesCreateTypeDefinitions200Response
    | TypesCreateTypeDefinitionsDefaultResponse
    | TypesUpdateAtlasTypeDefinitions200Response
    | TypesUpdateAtlasTypeDefinitionsDefaultResponse
    | TypesDeleteTypeDefinitions204Response
    | TypesDeleteTypeDefinitionsDefaultResponse
    | TypesListTypeDefinitionHeaders200Response
    | TypesListTypeDefinitionHeadersDefaultResponse
    | TypesGetTermTemplateDefByGuid200Response
    | TypesGetTermTemplateDefByGuidDefaultResponse
    | TypesGetTermTemplateDefByName200Response
    | TypesGetTermTemplateDefByNameDefaultResponse
    | CollectionCreateOrUpdate200Response
    | CollectionCreateOrUpdateDefaultResponse
    | CollectionCreateOrUpdateBulk200Response
    | CollectionCreateOrUpdateBulkDefaultResponse
    | CollectionMoveEntitiesToCollection200Response
    | CollectionMoveEntitiesToCollectionDefaultResponse,
): response is
  | EntityCreateOrUpdateDefaultResponse
  | EntityListByGuidsDefaultResponse
  | EntityCreateOrUpdateEntitiesDefaultResponse
  | EntityDeleteByGuidsDefaultResponse
  | EntityAddClassificationDefaultResponse
  | EntityGetByGuidDefaultResponse
  | EntityPartialUpdateEntityAttributeByGuidDefaultResponse
  | EntityDeleteByGuidDefaultResponse
  | EntityGetClassificationDefaultResponse
  | EntityDeleteClassificationDefaultResponse
  | EntityGetClassificationsDefaultResponse
  | EntityAddClassificationsDefaultResponse
  | EntityUpdateClassificationsDefaultResponse
  | EntityGetByUniqueAttributesDefaultResponse
  | EntityPartialUpdateEntityByUniqueAttributesDefaultResponse
  | EntityDeleteByUniqueAttributeDefaultResponse
  | EntityDeleteClassificationByUniqueAttributeDefaultResponse
  | EntityAddClassificationsByUniqueAttributeDefaultResponse
  | EntityUpdateClassificationsByUniqueAttributeDefaultResponse
  | EntitySetClassificationsDefaultResponse
  | EntityGetEntitiesByUniqueAttributesDefaultResponse
  | EntityGetHeaderDefaultResponse
  | EntityGetSampleBusinessMetadataTemplate400Response
  | EntityImportBusinessMetadata400Response
  | EntityImportBusinessMetadata409Response
  | GlossaryListGlossariesDefaultResponse
  | GlossaryCreateGlossaryDefaultResponse
  | GlossaryCreateGlossaryCategoriesDefaultResponse
  | GlossaryCreateGlossaryCategoryDefaultResponse
  | GlossaryGetGlossaryCategoryDefaultResponse
  | GlossaryUpdateGlossaryCategoryDefaultResponse
  | GlossaryDeleteGlossaryCategoryDefaultResponse
  | GlossaryPartialUpdateGlossaryCategoryDefaultResponse
  | GlossaryListRelatedCategoriesDefaultResponse
  | GlossaryListCategoryTermsDefaultResponse
  | GlossaryCreateGlossaryTermDefaultResponse
  | GlossaryGetGlossaryTermDefaultResponse
  | GlossaryUpdateGlossaryTermDefaultResponse
  | GlossaryDeleteGlossaryTermDefaultResponse
  | GlossaryPartialUpdateGlossaryTermDefaultResponse
  | GlossaryCreateGlossaryTermsDefaultResponse
  | GlossaryGetEntitiesAssignedWithTermDefaultResponse
  | GlossaryAssignTermToEntitiesDefaultResponse
  | GlossaryRemoveTermAssignmentFromEntitiesDefaultResponse
  | GlossaryDeleteTermAssignmentFromEntitiesDefaultResponse
  | GlossaryListRelatedTermsDefaultResponse
  | GlossaryGetGlossaryDefaultResponse
  | GlossaryUpdateGlossaryDefaultResponse
  | GlossaryDeleteGlossaryDefaultResponse
  | GlossaryListGlossaryCategoriesDefaultResponse
  | GlossaryListGlossaryCategoriesHeadersDefaultResponse
  | GlossaryGetDetailedGlossaryDefaultResponse
  | GlossaryPartialUpdateGlossaryDefaultResponse
  | GlossaryListGlossaryTermsDefaultResponse
  | GlossaryListGlossaryTermHeadersDefaultResponse
  | GlossaryImportGlossaryTermsViaCsvDefaultResponse
  | GlossaryImportGlossaryTermsViaCsvByGlossaryNameDefaultResponse
  | GlossaryGetImportCsvOperationStatusDefaultResponse
  | GlossaryExportGlossaryTermsAsCsvDefaultResponse
  | GlossaryListTermsByGlossaryNameDefaultResponse
  | DiscoveryQueryDefaultResponse
  | DiscoverySuggestDefaultResponse
  | DiscoveryBrowseDefaultResponse
  | DiscoveryAutoCompleteDefaultResponse
  | LineageGetLineageGraphDefaultResponse
  | LineageNextPageLineageDefaultResponse
  | LineageGetLineageByUniqueAttribute400Response
  | LineageGetLineageByUniqueAttribute404Response
  | RelationshipCreateDefaultResponse
  | RelationshipUpdateDefaultResponse
  | RelationshipGetDefaultResponse
  | RelationshipDeleteDefaultResponse
  | TypesGetBusinessMetadataDefByGuid404Response
  | TypesGetBusinessMetadataDefByName404Response
  | TypesGetClassificationDefByGuidDefaultResponse
  | TypesGetClassificationDefByNameDefaultResponse
  | TypesGetEntityDefinitionByGuidDefaultResponse
  | TypesGetEntityDefinitionByNameDefaultResponse
  | TypesGetEnumDefByGuidDefaultResponse
  | TypesGetEnumDefByNameDefaultResponse
  | TypesGetRelationshipDefByGuidDefaultResponse
  | TypesGetRelationshipDefByNameDefaultResponse
  | TypesGetStructDefByGuidDefaultResponse
  | TypesGetStructDefByNameDefaultResponse
  | TypesGetTypeDefinitionByGuidDefaultResponse
  | TypesGetTypeDefinitionByNameDefaultResponse
  | TypesDeleteTypeByNameDefaultResponse
  | TypesGetAllTypeDefinitionsDefaultResponse
  | TypesCreateTypeDefinitionsDefaultResponse
  | TypesUpdateAtlasTypeDefinitionsDefaultResponse
  | TypesDeleteTypeDefinitionsDefaultResponse
  | TypesListTypeDefinitionHeadersDefaultResponse
  | TypesGetTermTemplateDefByGuidDefaultResponse
  | TypesGetTermTemplateDefByNameDefaultResponse
  | CollectionCreateOrUpdateDefaultResponse
  | CollectionCreateOrUpdateBulkDefaultResponse
  | CollectionMoveEntitiesToCollectionDefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = getParametrizedPathSuccess(method, url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function getParametrizedPathSuccess(method: string, path: string): string[] {
  const pathParts = path.split("/");

  // Traverse list to match the longest candidate
  // matchedLen: the length of candidate path
  // matchedValue: the matched status code array
  let matchedLen = -1,
    matchedValue: string[] = [];

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(responseMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    if (!key.startsWith(method)) {
      continue;
    }
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // track if we have found a match to return the values found.
    let found = true;
    for (let i = candidateParts.length - 1, j = pathParts.length - 1; i >= 1 && j >= 1; i--, j--) {
      if (candidateParts[i]?.startsWith("{") && candidateParts[i]?.indexOf("}") !== -1) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(`${candidateParts[i]?.slice(start, end)}`).test(
          pathParts[j] || "",
        );

        if (!isMatched) {
          found = false;
          break;
        }
        continue;
      }

      // If the candidate part is not a template and
      // the parts don't match mark the candidate as not found
      // to move on with the next candidate path.
      if (candidateParts[i] !== pathParts[j]) {
        found = false;
        break;
      }
    }

    // We finished evaluating the current candidate parts
    // Update the matched value if and only if we found the longer pattern
    if (found && candidatePath.length > matchedLen) {
      matchedLen = candidatePath.length;
      matchedValue = value;
    }
  }

  return matchedValue;
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}
