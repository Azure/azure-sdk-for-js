// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
  EntityGetSampleBusinessMetadataTemplate200Response,
  EntityGetSampleBusinessMetadataTemplate400Response,
  EntityImportBusinessMetadata200Response,
  EntityImportBusinessMetadata400Response,
  EntityImportBusinessMetadata409Response,
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
  LineageGetLineageByUniqueAttribute200Response,
  LineageGetLineageByUniqueAttribute400Response,
  LineageGetLineageByUniqueAttribute404Response,
  RelationshipCreate200Response,
  RelationshipCreatedefaultResponse,
  RelationshipUpdate200Response,
  RelationshipUpdatedefaultResponse,
  RelationshipGet200Response,
  RelationshipGetdefaultResponse,
  RelationshipDelete204Response,
  RelationshipDeletedefaultResponse,
  TypesGetBusinessMetadataDefByGuid200Response,
  TypesGetBusinessMetadataDefByGuid404Response,
  TypesGetBusinessMetadataDefByName200Response,
  TypesGetBusinessMetadataDefByName404Response,
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

const responseMap: Record<string, string[]> = {
  "POST /entity": ["200"],
  "GET /entity/bulk": ["200"],
  "POST /entity/bulk": ["200"],
  "DELETE /entity/bulk": ["200"],
  "POST /entity/bulk/classification": ["204"],
  "GET /entity/guid/{guid}": ["200"],
  "PUT /entity/guid/{guid}": ["200"],
  "DELETE /entity/guid/{guid}": ["200"],
  "GET /entity/guid/{guid}/classification/{classificationName}": ["200"],
  "DELETE /entity/guid/{guid}/classification/{classificationName}": ["204"],
  "GET /entity/guid/{guid}/classifications": ["200"],
  "POST /entity/guid/{guid}/classifications": ["204"],
  "PUT /entity/guid/{guid}/classifications": ["204"],
  "GET /entity/uniqueAttribute/type/{typeName}": ["200"],
  "PUT /entity/uniqueAttribute/type/{typeName}": ["200"],
  "DELETE /entity/uniqueAttribute/type/{typeName}": ["200"],
  "DELETE /entity/uniqueAttribute/type/{typeName}/classification/{classificationName}": ["204"],
  "POST /entity/uniqueAttribute/type/{typeName}/classifications": ["204"],
  "PUT /entity/uniqueAttribute/type/{typeName}/classifications": ["204"],
  "POST /entity/bulk/setClassifications": ["200"],
  "GET /entity/bulk/uniqueAttribute/type/{typeName}": ["200"],
  "GET /entity/guid/{guid}/header": ["200"],
  "DELETE /entity/guid/{guid}/businessmetadata": ["204"],
  "POST /entity/guid/{guid}/businessmetadata": ["204"],
  "DELETE /entity/guid/{guid}/businessmetadata/{bmName}": ["204"],
  "POST /entity/guid/{guid}/businessmetadata/{bmName}": ["204"],
  "GET /entity/businessmetadata/import/template": ["200"],
  "POST /entity/businessmetadata/import": ["200"],
  "DELETE /entity/guid/{guid}/labels": ["204"],
  "POST /entity/guid/{guid}/labels": ["204"],
  "PUT /entity/guid/{guid}/labels": ["204"],
  "DELETE /entity/uniqueAttribute/type/{typeName}/labels": ["204"],
  "POST /entity/uniqueAttribute/type/{typeName}/labels": ["204"],
  "PUT /entity/uniqueAttribute/type/{typeName}/labels": ["204"],
  "GET /glossary": ["200"],
  "POST /glossary": ["200"],
  "POST /glossary/categories": ["200"],
  "POST /glossary/category": ["200"],
  "GET /glossary/category/{categoryGuid}": ["200"],
  "PUT /glossary/category/{categoryGuid}": ["200"],
  "DELETE /glossary/category/{categoryGuid}": ["204"],
  "PUT /glossary/category/{categoryGuid}/partial": ["200"],
  "GET /glossary/category/{categoryGuid}/related": ["200"],
  "GET /glossary/category/{categoryGuid}/terms": ["200"],
  "POST /glossary/term": ["200"],
  "GET /glossary/term/{termGuid}": ["200"],
  "PUT /glossary/term/{termGuid}": ["200"],
  "DELETE /glossary/term/{termGuid}": ["204"],
  "PUT /glossary/term/{termGuid}/partial": ["200"],
  "POST /glossary/terms": ["200"],
  "GET /glossary/terms/{termGuid}/assignedEntities": ["200"],
  "POST /glossary/terms/{termGuid}/assignedEntities": ["204"],
  "PUT /glossary/terms/{termGuid}/assignedEntities": ["204"],
  "DELETE /glossary/terms/{termGuid}/assignedEntities": ["204"],
  "GET /glossary/terms/{termGuid}/related": ["200"],
  "GET /glossary/{glossaryGuid}": ["200"],
  "PUT /glossary/{glossaryGuid}": ["200"],
  "DELETE /glossary/{glossaryGuid}": ["204"],
  "GET /glossary/{glossaryGuid}/categories": ["200"],
  "GET /glossary/{glossaryGuid}/categories/headers": ["200"],
  "GET /glossary/{glossaryGuid}/detailed": ["200"],
  "PUT /glossary/{glossaryGuid}/partial": ["200"],
  "GET /glossary/{glossaryGuid}/terms": ["200"],
  "GET /glossary/{glossaryGuid}/terms/headers": ["200"],
  "POST /glossary/{glossaryGuid}/terms/import": ["202"],
  "GET /glossary/{glossaryGuid}/terms/import": ["202"],
  "POST /glossary/name/{glossaryName}/terms/import": ["202"],
  "GET /glossary/name/{glossaryName}/terms/import": ["202"],
  "GET /glossary/terms/import/{operationGuid}": ["200"],
  "POST /glossary/{glossaryGuid}/terms/export": ["200"],
  "GET /glossary/name/{glossaryName}/terms": ["200"],
  "POST /search/query": ["200"],
  "POST /search/suggest": ["200"],
  "POST /browse": ["200"],
  "POST /search/autocomplete": ["200"],
  "GET /lineage/{guid}": ["200"],
  "GET /lineage/{guid}/next/": ["200"],
  "GET /lineage/uniqueAttribute/type/{typeName}": ["200"],
  "POST /relationship": ["200"],
  "PUT /relationship": ["200"],
  "GET /relationship/guid/{guid}": ["200"],
  "DELETE /relationship/guid/{guid}": ["204"],
  "GET /types/businessmetadatadef/guid/{guid}": ["200"],
  "GET /types/businessmetadatadef/name/{name}": ["200"],
  "GET /types/classificationdef/guid/{guid}": ["200"],
  "GET /types/classificationdef/name/{name}": ["200"],
  "GET /types/entitydef/guid/{guid}": ["200"],
  "GET /types/entitydef/name/{name}": ["200"],
  "GET /types/enumdef/guid/{guid}": ["200"],
  "GET /types/enumdef/name/{name}": ["200"],
  "GET /types/relationshipdef/guid/{guid}": ["200"],
  "GET /types/relationshipdef/name/{name}": ["200"],
  "GET /types/structdef/guid/{guid}": ["200"],
  "GET /types/structdef/name/{name}": ["200"],
  "GET /types/typedef/guid/{guid}": ["200"],
  "GET /types/typedef/name/{name}": ["200"],
  "DELETE /types/typedef/name/{name}": ["204"],
  "GET /types/typedefs": ["200"],
  "POST /types/typedefs": ["200"],
  "PUT /types/typedefs": ["200"],
  "DELETE /types/typedefs": ["204"],
  "GET /types/typedefs/headers": ["200"],
  "GET /types/termtemplatedef/guid/{guid}": ["200"],
  "GET /types/termtemplatedef/name/{name}": ["200"],
  "POST /collections/{collection}/entity": ["200"],
  "POST /collections/{collection}/entity/bulk": ["200"],
  "POST /collections/{collection}/entity/moveHere": ["200"],
};

export function isUnexpected(
  response: EntityCreateOrUpdate200Response | EntityCreateOrUpdatedefaultResponse
): response is EntityCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: EntityListByGuids200Response | EntityListByGuidsdefaultResponse
): response is EntityListByGuidsdefaultResponse;
export function isUnexpected(
  response: EntityCreateOrUpdateEntities200Response | EntityCreateOrUpdateEntitiesdefaultResponse
): response is EntityCreateOrUpdateEntitiesdefaultResponse;
export function isUnexpected(
  response: EntityDeleteByGuids200Response | EntityDeleteByGuidsdefaultResponse
): response is EntityDeleteByGuidsdefaultResponse;
export function isUnexpected(
  response: EntityAddClassification204Response | EntityAddClassificationdefaultResponse
): response is EntityAddClassificationdefaultResponse;
export function isUnexpected(
  response: EntityGetByGuid200Response | EntityGetByGuiddefaultResponse
): response is EntityGetByGuiddefaultResponse;
export function isUnexpected(
  response:
    | EntityPartialUpdateEntityAttributeByGuid200Response
    | EntityPartialUpdateEntityAttributeByGuiddefaultResponse
): response is EntityPartialUpdateEntityAttributeByGuiddefaultResponse;
export function isUnexpected(
  response: EntityDeleteByGuid200Response | EntityDeleteByGuiddefaultResponse
): response is EntityDeleteByGuiddefaultResponse;
export function isUnexpected(
  response: EntityGetClassification200Response | EntityGetClassificationdefaultResponse
): response is EntityGetClassificationdefaultResponse;
export function isUnexpected(
  response: EntityDeleteClassification204Response | EntityDeleteClassificationdefaultResponse
): response is EntityDeleteClassificationdefaultResponse;
export function isUnexpected(
  response: EntityGetClassifications200Response | EntityGetClassificationsdefaultResponse
): response is EntityGetClassificationsdefaultResponse;
export function isUnexpected(
  response: EntityAddClassifications204Response | EntityAddClassificationsdefaultResponse
): response is EntityAddClassificationsdefaultResponse;
export function isUnexpected(
  response: EntityUpdateClassifications204Response | EntityUpdateClassificationsdefaultResponse
): response is EntityUpdateClassificationsdefaultResponse;
export function isUnexpected(
  response: EntityGetByUniqueAttributes200Response | EntityGetByUniqueAttributesdefaultResponse
): response is EntityGetByUniqueAttributesdefaultResponse;
export function isUnexpected(
  response:
    | EntityPartialUpdateEntityByUniqueAttributes200Response
    | EntityPartialUpdateEntityByUniqueAttributesdefaultResponse
): response is EntityPartialUpdateEntityByUniqueAttributesdefaultResponse;
export function isUnexpected(
  response: EntityDeleteByUniqueAttribute200Response | EntityDeleteByUniqueAttributedefaultResponse
): response is EntityDeleteByUniqueAttributedefaultResponse;
export function isUnexpected(
  response:
    | EntityDeleteClassificationByUniqueAttribute204Response
    | EntityDeleteClassificationByUniqueAttributedefaultResponse
): response is EntityDeleteClassificationByUniqueAttributedefaultResponse;
export function isUnexpected(
  response:
    | EntityAddClassificationsByUniqueAttribute204Response
    | EntityAddClassificationsByUniqueAttributedefaultResponse
): response is EntityAddClassificationsByUniqueAttributedefaultResponse;
export function isUnexpected(
  response:
    | EntityUpdateClassificationsByUniqueAttribute204Response
    | EntityUpdateClassificationsByUniqueAttributedefaultResponse
): response is EntityUpdateClassificationsByUniqueAttributedefaultResponse;
export function isUnexpected(
  response: EntitySetClassifications200Response | EntitySetClassificationsdefaultResponse
): response is EntitySetClassificationsdefaultResponse;
export function isUnexpected(
  response:
    | EntityGetEntitiesByUniqueAttributes200Response
    | EntityGetEntitiesByUniqueAttributesdefaultResponse
): response is EntityGetEntitiesByUniqueAttributesdefaultResponse;
export function isUnexpected(
  response: EntityGetHeader200Response | EntityGetHeaderdefaultResponse
): response is EntityGetHeaderdefaultResponse;
export function isUnexpected(
  response:
    | EntityGetSampleBusinessMetadataTemplate200Response
    | EntityGetSampleBusinessMetadataTemplate400Response
): response is EntityGetSampleBusinessMetadataTemplate400Response;
export function isUnexpected(
  response:
    | EntityImportBusinessMetadata200Response
    | EntityImportBusinessMetadata400Response
    | EntityImportBusinessMetadata409Response
): response is EntityImportBusinessMetadata400Response;
export function isUnexpected(
  response: GlossaryListGlossaries200Response | GlossaryListGlossariesdefaultResponse
): response is GlossaryListGlossariesdefaultResponse;
export function isUnexpected(
  response: GlossaryCreateGlossary200Response | GlossaryCreateGlossarydefaultResponse
): response is GlossaryCreateGlossarydefaultResponse;
export function isUnexpected(
  response:
    | GlossaryCreateGlossaryCategories200Response
    | GlossaryCreateGlossaryCategoriesdefaultResponse
): response is GlossaryCreateGlossaryCategoriesdefaultResponse;
export function isUnexpected(
  response:
    | GlossaryCreateGlossaryCategory200Response
    | GlossaryCreateGlossaryCategorydefaultResponse
): response is GlossaryCreateGlossaryCategorydefaultResponse;
export function isUnexpected(
  response: GlossaryGetGlossaryCategory200Response | GlossaryGetGlossaryCategorydefaultResponse
): response is GlossaryGetGlossaryCategorydefaultResponse;
export function isUnexpected(
  response:
    | GlossaryUpdateGlossaryCategory200Response
    | GlossaryUpdateGlossaryCategorydefaultResponse
): response is GlossaryUpdateGlossaryCategorydefaultResponse;
export function isUnexpected(
  response:
    | GlossaryDeleteGlossaryCategory204Response
    | GlossaryDeleteGlossaryCategorydefaultResponse
): response is GlossaryDeleteGlossaryCategorydefaultResponse;
export function isUnexpected(
  response:
    | GlossaryPartialUpdateGlossaryCategory200Response
    | GlossaryPartialUpdateGlossaryCategorydefaultResponse
): response is GlossaryPartialUpdateGlossaryCategorydefaultResponse;
export function isUnexpected(
  response: GlossaryListRelatedCategories200Response | GlossaryListRelatedCategoriesdefaultResponse
): response is GlossaryListRelatedCategoriesdefaultResponse;
export function isUnexpected(
  response: GlossaryListCategoryTerms200Response | GlossaryListCategoryTermsdefaultResponse
): response is GlossaryListCategoryTermsdefaultResponse;
export function isUnexpected(
  response: GlossaryCreateGlossaryTerm200Response | GlossaryCreateGlossaryTermdefaultResponse
): response is GlossaryCreateGlossaryTermdefaultResponse;
export function isUnexpected(
  response: GlossaryGetGlossaryTerm200Response | GlossaryGetGlossaryTermdefaultResponse
): response is GlossaryGetGlossaryTermdefaultResponse;
export function isUnexpected(
  response: GlossaryUpdateGlossaryTerm200Response | GlossaryUpdateGlossaryTermdefaultResponse
): response is GlossaryUpdateGlossaryTermdefaultResponse;
export function isUnexpected(
  response: GlossaryDeleteGlossaryTerm204Response | GlossaryDeleteGlossaryTermdefaultResponse
): response is GlossaryDeleteGlossaryTermdefaultResponse;
export function isUnexpected(
  response:
    | GlossaryPartialUpdateGlossaryTerm200Response
    | GlossaryPartialUpdateGlossaryTermdefaultResponse
): response is GlossaryPartialUpdateGlossaryTermdefaultResponse;
export function isUnexpected(
  response: GlossaryCreateGlossaryTerms200Response | GlossaryCreateGlossaryTermsdefaultResponse
): response is GlossaryCreateGlossaryTermsdefaultResponse;
export function isUnexpected(
  response:
    | GlossaryGetEntitiesAssignedWithTerm200Response
    | GlossaryGetEntitiesAssignedWithTermdefaultResponse
): response is GlossaryGetEntitiesAssignedWithTermdefaultResponse;
export function isUnexpected(
  response: GlossaryAssignTermToEntities204Response | GlossaryAssignTermToEntitiesdefaultResponse
): response is GlossaryAssignTermToEntitiesdefaultResponse;
export function isUnexpected(
  response:
    | GlossaryRemoveTermAssignmentFromEntities204Response
    | GlossaryRemoveTermAssignmentFromEntitiesdefaultResponse
): response is GlossaryRemoveTermAssignmentFromEntitiesdefaultResponse;
export function isUnexpected(
  response:
    | GlossaryDeleteTermAssignmentFromEntities204Response
    | GlossaryDeleteTermAssignmentFromEntitiesdefaultResponse
): response is GlossaryDeleteTermAssignmentFromEntitiesdefaultResponse;
export function isUnexpected(
  response: GlossaryListRelatedTerms200Response | GlossaryListRelatedTermsdefaultResponse
): response is GlossaryListRelatedTermsdefaultResponse;
export function isUnexpected(
  response: GlossaryGetGlossary200Response | GlossaryGetGlossarydefaultResponse
): response is GlossaryGetGlossarydefaultResponse;
export function isUnexpected(
  response: GlossaryUpdateGlossary200Response | GlossaryUpdateGlossarydefaultResponse
): response is GlossaryUpdateGlossarydefaultResponse;
export function isUnexpected(
  response: GlossaryDeleteGlossary204Response | GlossaryDeleteGlossarydefaultResponse
): response is GlossaryDeleteGlossarydefaultResponse;
export function isUnexpected(
  response:
    | GlossaryListGlossaryCategories200Response
    | GlossaryListGlossaryCategoriesdefaultResponse
): response is GlossaryListGlossaryCategoriesdefaultResponse;
export function isUnexpected(
  response:
    | GlossaryListGlossaryCategoriesHeaders200Response
    | GlossaryListGlossaryCategoriesHeadersdefaultResponse
): response is GlossaryListGlossaryCategoriesHeadersdefaultResponse;
export function isUnexpected(
  response: GlossaryGetDetailedGlossary200Response | GlossaryGetDetailedGlossarydefaultResponse
): response is GlossaryGetDetailedGlossarydefaultResponse;
export function isUnexpected(
  response: GlossaryPartialUpdateGlossary200Response | GlossaryPartialUpdateGlossarydefaultResponse
): response is GlossaryPartialUpdateGlossarydefaultResponse;
export function isUnexpected(
  response: GlossaryListGlossaryTerms200Response | GlossaryListGlossaryTermsdefaultResponse
): response is GlossaryListGlossaryTermsdefaultResponse;
export function isUnexpected(
  response:
    | GlossaryListGlossaryTermHeaders200Response
    | GlossaryListGlossaryTermHeadersdefaultResponse
): response is GlossaryListGlossaryTermHeadersdefaultResponse;
export function isUnexpected(
  response:
    | GlossaryImportGlossaryTermsViaCsv202Response
    | GlossaryImportGlossaryTermsViaCsvdefaultResponse
): response is GlossaryImportGlossaryTermsViaCsvdefaultResponse;
export function isUnexpected(
  response:
    | GlossaryImportGlossaryTermsViaCsvByGlossaryName202Response
    | GlossaryImportGlossaryTermsViaCsvByGlossaryNamedefaultResponse
): response is GlossaryImportGlossaryTermsViaCsvByGlossaryNamedefaultResponse;
export function isUnexpected(
  response:
    | GlossaryGetImportCsvOperationStatus200Response
    | GlossaryGetImportCsvOperationStatusdefaultResponse
): response is GlossaryGetImportCsvOperationStatusdefaultResponse;
export function isUnexpected(
  response:
    | GlossaryExportGlossaryTermsAsCsv200Response
    | GlossaryExportGlossaryTermsAsCsvdefaultResponse
): response is GlossaryExportGlossaryTermsAsCsvdefaultResponse;
export function isUnexpected(
  response:
    | GlossaryListTermsByGlossaryName200Response
    | GlossaryListTermsByGlossaryNamedefaultResponse
): response is GlossaryListTermsByGlossaryNamedefaultResponse;
export function isUnexpected(
  response: DiscoveryQuery200Response | DiscoveryQuerydefaultResponse
): response is DiscoveryQuerydefaultResponse;
export function isUnexpected(
  response: DiscoverySuggest200Response | DiscoverySuggestdefaultResponse
): response is DiscoverySuggestdefaultResponse;
export function isUnexpected(
  response: DiscoveryBrowse200Response | DiscoveryBrowsedefaultResponse
): response is DiscoveryBrowsedefaultResponse;
export function isUnexpected(
  response: DiscoveryAutoComplete200Response | DiscoveryAutoCompletedefaultResponse
): response is DiscoveryAutoCompletedefaultResponse;
export function isUnexpected(
  response: LineageGetLineageGraph200Response | LineageGetLineageGraphdefaultResponse
): response is LineageGetLineageGraphdefaultResponse;
export function isUnexpected(
  response: LineageNextPageLineage200Response | LineageNextPageLineagedefaultResponse
): response is LineageNextPageLineagedefaultResponse;
export function isUnexpected(
  response:
    | LineageGetLineageByUniqueAttribute200Response
    | LineageGetLineageByUniqueAttribute400Response
    | LineageGetLineageByUniqueAttribute404Response
): response is LineageGetLineageByUniqueAttribute400Response;
export function isUnexpected(
  response: RelationshipCreate200Response | RelationshipCreatedefaultResponse
): response is RelationshipCreatedefaultResponse;
export function isUnexpected(
  response: RelationshipUpdate200Response | RelationshipUpdatedefaultResponse
): response is RelationshipUpdatedefaultResponse;
export function isUnexpected(
  response: RelationshipGet200Response | RelationshipGetdefaultResponse
): response is RelationshipGetdefaultResponse;
export function isUnexpected(
  response: RelationshipDelete204Response | RelationshipDeletedefaultResponse
): response is RelationshipDeletedefaultResponse;
export function isUnexpected(
  response:
    | TypesGetBusinessMetadataDefByGuid200Response
    | TypesGetBusinessMetadataDefByGuid404Response
): response is TypesGetBusinessMetadataDefByGuid404Response;
export function isUnexpected(
  response:
    | TypesGetBusinessMetadataDefByName200Response
    | TypesGetBusinessMetadataDefByName404Response
): response is TypesGetBusinessMetadataDefByName404Response;
export function isUnexpected(
  response:
    | TypesGetClassificationDefByGuid200Response
    | TypesGetClassificationDefByGuiddefaultResponse
): response is TypesGetClassificationDefByGuiddefaultResponse;
export function isUnexpected(
  response:
    | TypesGetClassificationDefByName200Response
    | TypesGetClassificationDefByNamedefaultResponse
): response is TypesGetClassificationDefByNamedefaultResponse;
export function isUnexpected(
  response:
    | TypesGetEntityDefinitionByGuid200Response
    | TypesGetEntityDefinitionByGuiddefaultResponse
): response is TypesGetEntityDefinitionByGuiddefaultResponse;
export function isUnexpected(
  response:
    | TypesGetEntityDefinitionByName200Response
    | TypesGetEntityDefinitionByNamedefaultResponse
): response is TypesGetEntityDefinitionByNamedefaultResponse;
export function isUnexpected(
  response: TypesGetEnumDefByGuid200Response | TypesGetEnumDefByGuiddefaultResponse
): response is TypesGetEnumDefByGuiddefaultResponse;
export function isUnexpected(
  response: TypesGetEnumDefByName200Response | TypesGetEnumDefByNamedefaultResponse
): response is TypesGetEnumDefByNamedefaultResponse;
export function isUnexpected(
  response: TypesGetRelationshipDefByGuid200Response | TypesGetRelationshipDefByGuiddefaultResponse
): response is TypesGetRelationshipDefByGuiddefaultResponse;
export function isUnexpected(
  response: TypesGetRelationshipDefByName200Response | TypesGetRelationshipDefByNamedefaultResponse
): response is TypesGetRelationshipDefByNamedefaultResponse;
export function isUnexpected(
  response: TypesGetStructDefByGuid200Response | TypesGetStructDefByGuiddefaultResponse
): response is TypesGetStructDefByGuiddefaultResponse;
export function isUnexpected(
  response: TypesGetStructDefByName200Response | TypesGetStructDefByNamedefaultResponse
): response is TypesGetStructDefByNamedefaultResponse;
export function isUnexpected(
  response: TypesGetTypeDefinitionByGuid200Response | TypesGetTypeDefinitionByGuiddefaultResponse
): response is TypesGetTypeDefinitionByGuiddefaultResponse;
export function isUnexpected(
  response: TypesGetTypeDefinitionByName200Response | TypesGetTypeDefinitionByNamedefaultResponse
): response is TypesGetTypeDefinitionByNamedefaultResponse;
export function isUnexpected(
  response: TypesDeleteTypeByName204Response | TypesDeleteTypeByNamedefaultResponse
): response is TypesDeleteTypeByNamedefaultResponse;
export function isUnexpected(
  response: TypesGetAllTypeDefinitions200Response | TypesGetAllTypeDefinitionsdefaultResponse
): response is TypesGetAllTypeDefinitionsdefaultResponse;
export function isUnexpected(
  response: TypesCreateTypeDefinitions200Response | TypesCreateTypeDefinitionsdefaultResponse
): response is TypesCreateTypeDefinitionsdefaultResponse;
export function isUnexpected(
  response:
    | TypesUpdateAtlasTypeDefinitions200Response
    | TypesUpdateAtlasTypeDefinitionsdefaultResponse
): response is TypesUpdateAtlasTypeDefinitionsdefaultResponse;
export function isUnexpected(
  response: TypesDeleteTypeDefinitions204Response | TypesDeleteTypeDefinitionsdefaultResponse
): response is TypesDeleteTypeDefinitionsdefaultResponse;
export function isUnexpected(
  response:
    | TypesListTypeDefinitionHeaders200Response
    | TypesListTypeDefinitionHeadersdefaultResponse
): response is TypesListTypeDefinitionHeadersdefaultResponse;
export function isUnexpected(
  response: TypesGetTermTemplateDefByGuid200Response | TypesGetTermTemplateDefByGuiddefaultResponse
): response is TypesGetTermTemplateDefByGuiddefaultResponse;
export function isUnexpected(
  response: TypesGetTermTemplateDefByName200Response | TypesGetTermTemplateDefByNamedefaultResponse
): response is TypesGetTermTemplateDefByNamedefaultResponse;
export function isUnexpected(
  response: CollectionCreateOrUpdate200Response | CollectionCreateOrUpdatedefaultResponse
): response is CollectionCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: CollectionCreateOrUpdateBulk200Response | CollectionCreateOrUpdateBulkdefaultResponse
): response is CollectionCreateOrUpdateBulkdefaultResponse;
export function isUnexpected(
  response:
    | CollectionMoveEntitiesToCollection200Response
    | CollectionMoveEntitiesToCollectiondefaultResponse
): response is CollectionMoveEntitiesToCollectiondefaultResponse;
export function isUnexpected(
  response:
    | EntityCreateOrUpdate200Response
    | EntityCreateOrUpdatedefaultResponse
    | EntityListByGuids200Response
    | EntityListByGuidsdefaultResponse
    | EntityCreateOrUpdateEntities200Response
    | EntityCreateOrUpdateEntitiesdefaultResponse
    | EntityDeleteByGuids200Response
    | EntityDeleteByGuidsdefaultResponse
    | EntityAddClassification204Response
    | EntityAddClassificationdefaultResponse
    | EntityGetByGuid200Response
    | EntityGetByGuiddefaultResponse
    | EntityPartialUpdateEntityAttributeByGuid200Response
    | EntityPartialUpdateEntityAttributeByGuiddefaultResponse
    | EntityDeleteByGuid200Response
    | EntityDeleteByGuiddefaultResponse
    | EntityGetClassification200Response
    | EntityGetClassificationdefaultResponse
    | EntityDeleteClassification204Response
    | EntityDeleteClassificationdefaultResponse
    | EntityGetClassifications200Response
    | EntityGetClassificationsdefaultResponse
    | EntityAddClassifications204Response
    | EntityAddClassificationsdefaultResponse
    | EntityUpdateClassifications204Response
    | EntityUpdateClassificationsdefaultResponse
    | EntityGetByUniqueAttributes200Response
    | EntityGetByUniqueAttributesdefaultResponse
    | EntityPartialUpdateEntityByUniqueAttributes200Response
    | EntityPartialUpdateEntityByUniqueAttributesdefaultResponse
    | EntityDeleteByUniqueAttribute200Response
    | EntityDeleteByUniqueAttributedefaultResponse
    | EntityDeleteClassificationByUniqueAttribute204Response
    | EntityDeleteClassificationByUniqueAttributedefaultResponse
    | EntityAddClassificationsByUniqueAttribute204Response
    | EntityAddClassificationsByUniqueAttributedefaultResponse
    | EntityUpdateClassificationsByUniqueAttribute204Response
    | EntityUpdateClassificationsByUniqueAttributedefaultResponse
    | EntitySetClassifications200Response
    | EntitySetClassificationsdefaultResponse
    | EntityGetEntitiesByUniqueAttributes200Response
    | EntityGetEntitiesByUniqueAttributesdefaultResponse
    | EntityGetHeader200Response
    | EntityGetHeaderdefaultResponse
    | EntityGetSampleBusinessMetadataTemplate200Response
    | EntityGetSampleBusinessMetadataTemplate400Response
    | EntityImportBusinessMetadata200Response
    | EntityImportBusinessMetadata400Response
    | EntityImportBusinessMetadata409Response
    | GlossaryListGlossaries200Response
    | GlossaryListGlossariesdefaultResponse
    | GlossaryCreateGlossary200Response
    | GlossaryCreateGlossarydefaultResponse
    | GlossaryCreateGlossaryCategories200Response
    | GlossaryCreateGlossaryCategoriesdefaultResponse
    | GlossaryCreateGlossaryCategory200Response
    | GlossaryCreateGlossaryCategorydefaultResponse
    | GlossaryGetGlossaryCategory200Response
    | GlossaryGetGlossaryCategorydefaultResponse
    | GlossaryUpdateGlossaryCategory200Response
    | GlossaryUpdateGlossaryCategorydefaultResponse
    | GlossaryDeleteGlossaryCategory204Response
    | GlossaryDeleteGlossaryCategorydefaultResponse
    | GlossaryPartialUpdateGlossaryCategory200Response
    | GlossaryPartialUpdateGlossaryCategorydefaultResponse
    | GlossaryListRelatedCategories200Response
    | GlossaryListRelatedCategoriesdefaultResponse
    | GlossaryListCategoryTerms200Response
    | GlossaryListCategoryTermsdefaultResponse
    | GlossaryCreateGlossaryTerm200Response
    | GlossaryCreateGlossaryTermdefaultResponse
    | GlossaryGetGlossaryTerm200Response
    | GlossaryGetGlossaryTermdefaultResponse
    | GlossaryUpdateGlossaryTerm200Response
    | GlossaryUpdateGlossaryTermdefaultResponse
    | GlossaryDeleteGlossaryTerm204Response
    | GlossaryDeleteGlossaryTermdefaultResponse
    | GlossaryPartialUpdateGlossaryTerm200Response
    | GlossaryPartialUpdateGlossaryTermdefaultResponse
    | GlossaryCreateGlossaryTerms200Response
    | GlossaryCreateGlossaryTermsdefaultResponse
    | GlossaryGetEntitiesAssignedWithTerm200Response
    | GlossaryGetEntitiesAssignedWithTermdefaultResponse
    | GlossaryAssignTermToEntities204Response
    | GlossaryAssignTermToEntitiesdefaultResponse
    | GlossaryRemoveTermAssignmentFromEntities204Response
    | GlossaryRemoveTermAssignmentFromEntitiesdefaultResponse
    | GlossaryDeleteTermAssignmentFromEntities204Response
    | GlossaryDeleteTermAssignmentFromEntitiesdefaultResponse
    | GlossaryListRelatedTerms200Response
    | GlossaryListRelatedTermsdefaultResponse
    | GlossaryGetGlossary200Response
    | GlossaryGetGlossarydefaultResponse
    | GlossaryUpdateGlossary200Response
    | GlossaryUpdateGlossarydefaultResponse
    | GlossaryDeleteGlossary204Response
    | GlossaryDeleteGlossarydefaultResponse
    | GlossaryListGlossaryCategories200Response
    | GlossaryListGlossaryCategoriesdefaultResponse
    | GlossaryListGlossaryCategoriesHeaders200Response
    | GlossaryListGlossaryCategoriesHeadersdefaultResponse
    | GlossaryGetDetailedGlossary200Response
    | GlossaryGetDetailedGlossarydefaultResponse
    | GlossaryPartialUpdateGlossary200Response
    | GlossaryPartialUpdateGlossarydefaultResponse
    | GlossaryListGlossaryTerms200Response
    | GlossaryListGlossaryTermsdefaultResponse
    | GlossaryListGlossaryTermHeaders200Response
    | GlossaryListGlossaryTermHeadersdefaultResponse
    | GlossaryImportGlossaryTermsViaCsv202Response
    | GlossaryImportGlossaryTermsViaCsvdefaultResponse
    | GlossaryImportGlossaryTermsViaCsvByGlossaryName202Response
    | GlossaryImportGlossaryTermsViaCsvByGlossaryNamedefaultResponse
    | GlossaryGetImportCsvOperationStatus200Response
    | GlossaryGetImportCsvOperationStatusdefaultResponse
    | GlossaryExportGlossaryTermsAsCsv200Response
    | GlossaryExportGlossaryTermsAsCsvdefaultResponse
    | GlossaryListTermsByGlossaryName200Response
    | GlossaryListTermsByGlossaryNamedefaultResponse
    | DiscoveryQuery200Response
    | DiscoveryQuerydefaultResponse
    | DiscoverySuggest200Response
    | DiscoverySuggestdefaultResponse
    | DiscoveryBrowse200Response
    | DiscoveryBrowsedefaultResponse
    | DiscoveryAutoComplete200Response
    | DiscoveryAutoCompletedefaultResponse
    | LineageGetLineageGraph200Response
    | LineageGetLineageGraphdefaultResponse
    | LineageNextPageLineage200Response
    | LineageNextPageLineagedefaultResponse
    | LineageGetLineageByUniqueAttribute200Response
    | LineageGetLineageByUniqueAttribute400Response
    | LineageGetLineageByUniqueAttribute404Response
    | RelationshipCreate200Response
    | RelationshipCreatedefaultResponse
    | RelationshipUpdate200Response
    | RelationshipUpdatedefaultResponse
    | RelationshipGet200Response
    | RelationshipGetdefaultResponse
    | RelationshipDelete204Response
    | RelationshipDeletedefaultResponse
    | TypesGetBusinessMetadataDefByGuid200Response
    | TypesGetBusinessMetadataDefByGuid404Response
    | TypesGetBusinessMetadataDefByName200Response
    | TypesGetBusinessMetadataDefByName404Response
    | TypesGetClassificationDefByGuid200Response
    | TypesGetClassificationDefByGuiddefaultResponse
    | TypesGetClassificationDefByName200Response
    | TypesGetClassificationDefByNamedefaultResponse
    | TypesGetEntityDefinitionByGuid200Response
    | TypesGetEntityDefinitionByGuiddefaultResponse
    | TypesGetEntityDefinitionByName200Response
    | TypesGetEntityDefinitionByNamedefaultResponse
    | TypesGetEnumDefByGuid200Response
    | TypesGetEnumDefByGuiddefaultResponse
    | TypesGetEnumDefByName200Response
    | TypesGetEnumDefByNamedefaultResponse
    | TypesGetRelationshipDefByGuid200Response
    | TypesGetRelationshipDefByGuiddefaultResponse
    | TypesGetRelationshipDefByName200Response
    | TypesGetRelationshipDefByNamedefaultResponse
    | TypesGetStructDefByGuid200Response
    | TypesGetStructDefByGuiddefaultResponse
    | TypesGetStructDefByName200Response
    | TypesGetStructDefByNamedefaultResponse
    | TypesGetTypeDefinitionByGuid200Response
    | TypesGetTypeDefinitionByGuiddefaultResponse
    | TypesGetTypeDefinitionByName200Response
    | TypesGetTypeDefinitionByNamedefaultResponse
    | TypesDeleteTypeByName204Response
    | TypesDeleteTypeByNamedefaultResponse
    | TypesGetAllTypeDefinitions200Response
    | TypesGetAllTypeDefinitionsdefaultResponse
    | TypesCreateTypeDefinitions200Response
    | TypesCreateTypeDefinitionsdefaultResponse
    | TypesUpdateAtlasTypeDefinitions200Response
    | TypesUpdateAtlasTypeDefinitionsdefaultResponse
    | TypesDeleteTypeDefinitions204Response
    | TypesDeleteTypeDefinitionsdefaultResponse
    | TypesListTypeDefinitionHeaders200Response
    | TypesListTypeDefinitionHeadersdefaultResponse
    | TypesGetTermTemplateDefByGuid200Response
    | TypesGetTermTemplateDefByGuiddefaultResponse
    | TypesGetTermTemplateDefByName200Response
    | TypesGetTermTemplateDefByNamedefaultResponse
    | CollectionCreateOrUpdate200Response
    | CollectionCreateOrUpdatedefaultResponse
    | CollectionCreateOrUpdateBulk200Response
    | CollectionCreateOrUpdateBulkdefaultResponse
    | CollectionMoveEntitiesToCollection200Response
    | CollectionMoveEntitiesToCollectiondefaultResponse
): response is
  | EntityCreateOrUpdatedefaultResponse
  | EntityListByGuidsdefaultResponse
  | EntityCreateOrUpdateEntitiesdefaultResponse
  | EntityDeleteByGuidsdefaultResponse
  | EntityAddClassificationdefaultResponse
  | EntityGetByGuiddefaultResponse
  | EntityPartialUpdateEntityAttributeByGuiddefaultResponse
  | EntityDeleteByGuiddefaultResponse
  | EntityGetClassificationdefaultResponse
  | EntityDeleteClassificationdefaultResponse
  | EntityGetClassificationsdefaultResponse
  | EntityAddClassificationsdefaultResponse
  | EntityUpdateClassificationsdefaultResponse
  | EntityGetByUniqueAttributesdefaultResponse
  | EntityPartialUpdateEntityByUniqueAttributesdefaultResponse
  | EntityDeleteByUniqueAttributedefaultResponse
  | EntityDeleteClassificationByUniqueAttributedefaultResponse
  | EntityAddClassificationsByUniqueAttributedefaultResponse
  | EntityUpdateClassificationsByUniqueAttributedefaultResponse
  | EntitySetClassificationsdefaultResponse
  | EntityGetEntitiesByUniqueAttributesdefaultResponse
  | EntityGetHeaderdefaultResponse
  | EntityGetSampleBusinessMetadataTemplate400Response
  | EntityImportBusinessMetadata400Response
  | EntityImportBusinessMetadata409Response
  | GlossaryListGlossariesdefaultResponse
  | GlossaryCreateGlossarydefaultResponse
  | GlossaryCreateGlossaryCategoriesdefaultResponse
  | GlossaryCreateGlossaryCategorydefaultResponse
  | GlossaryGetGlossaryCategorydefaultResponse
  | GlossaryUpdateGlossaryCategorydefaultResponse
  | GlossaryDeleteGlossaryCategorydefaultResponse
  | GlossaryPartialUpdateGlossaryCategorydefaultResponse
  | GlossaryListRelatedCategoriesdefaultResponse
  | GlossaryListCategoryTermsdefaultResponse
  | GlossaryCreateGlossaryTermdefaultResponse
  | GlossaryGetGlossaryTermdefaultResponse
  | GlossaryUpdateGlossaryTermdefaultResponse
  | GlossaryDeleteGlossaryTermdefaultResponse
  | GlossaryPartialUpdateGlossaryTermdefaultResponse
  | GlossaryCreateGlossaryTermsdefaultResponse
  | GlossaryGetEntitiesAssignedWithTermdefaultResponse
  | GlossaryAssignTermToEntitiesdefaultResponse
  | GlossaryRemoveTermAssignmentFromEntitiesdefaultResponse
  | GlossaryDeleteTermAssignmentFromEntitiesdefaultResponse
  | GlossaryListRelatedTermsdefaultResponse
  | GlossaryGetGlossarydefaultResponse
  | GlossaryUpdateGlossarydefaultResponse
  | GlossaryDeleteGlossarydefaultResponse
  | GlossaryListGlossaryCategoriesdefaultResponse
  | GlossaryListGlossaryCategoriesHeadersdefaultResponse
  | GlossaryGetDetailedGlossarydefaultResponse
  | GlossaryPartialUpdateGlossarydefaultResponse
  | GlossaryListGlossaryTermsdefaultResponse
  | GlossaryListGlossaryTermHeadersdefaultResponse
  | GlossaryImportGlossaryTermsViaCsvdefaultResponse
  | GlossaryImportGlossaryTermsViaCsvByGlossaryNamedefaultResponse
  | GlossaryGetImportCsvOperationStatusdefaultResponse
  | GlossaryExportGlossaryTermsAsCsvdefaultResponse
  | GlossaryListTermsByGlossaryNamedefaultResponse
  | DiscoveryQuerydefaultResponse
  | DiscoverySuggestdefaultResponse
  | DiscoveryBrowsedefaultResponse
  | DiscoveryAutoCompletedefaultResponse
  | LineageGetLineageGraphdefaultResponse
  | LineageNextPageLineagedefaultResponse
  | LineageGetLineageByUniqueAttribute400Response
  | LineageGetLineageByUniqueAttribute404Response
  | RelationshipCreatedefaultResponse
  | RelationshipUpdatedefaultResponse
  | RelationshipGetdefaultResponse
  | RelationshipDeletedefaultResponse
  | TypesGetBusinessMetadataDefByGuid404Response
  | TypesGetBusinessMetadataDefByName404Response
  | TypesGetClassificationDefByGuiddefaultResponse
  | TypesGetClassificationDefByNamedefaultResponse
  | TypesGetEntityDefinitionByGuiddefaultResponse
  | TypesGetEntityDefinitionByNamedefaultResponse
  | TypesGetEnumDefByGuiddefaultResponse
  | TypesGetEnumDefByNamedefaultResponse
  | TypesGetRelationshipDefByGuiddefaultResponse
  | TypesGetRelationshipDefByNamedefaultResponse
  | TypesGetStructDefByGuiddefaultResponse
  | TypesGetStructDefByNamedefaultResponse
  | TypesGetTypeDefinitionByGuiddefaultResponse
  | TypesGetTypeDefinitionByNamedefaultResponse
  | TypesDeleteTypeByNamedefaultResponse
  | TypesGetAllTypeDefinitionsdefaultResponse
  | TypesCreateTypeDefinitionsdefaultResponse
  | TypesUpdateAtlasTypeDefinitionsdefaultResponse
  | TypesDeleteTypeDefinitionsdefaultResponse
  | TypesListTypeDefinitionHeadersdefaultResponse
  | TypesGetTermTemplateDefByGuiddefaultResponse
  | TypesGetTermTemplateDefByNamedefaultResponse
  | CollectionCreateOrUpdatedefaultResponse
  | CollectionCreateOrUpdateBulkdefaultResponse
  | CollectionMoveEntitiesToCollectiondefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = geParametrizedPathSuccess(url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function geParametrizedPathSuccess(path: string): string[] {
  const pathParts = path.split("/");

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(responseMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // If the candidate and actual paths don't match in size
    // we move on to the next candidate path
    if (candidateParts.length === pathParts.length && hasParametrizedPath(key)) {
      // track if we have found a match to return the values found.
      let found = true;
      for (let i = 0; i < candidateParts.length; i++) {
        if (candidateParts[i].startsWith("{") && candidateParts[i].endsWith("}")) {
          // If the current part of the candidate is a "template" part
          // it is a match with the actual path part on hand
          // skip as the parameterized part can match anything
          continue;
        }

        // If the candidate part is not a template and
        // the parts don't match mark the candidate as not found
        // to move on with the next candidate path.
        if (candidateParts[i] !== pathParts[i]) {
          found = false;
          break;
        }
      }

      // We finished evaluating the current candidate parts
      // if all parts matched we return the success values form
      // the path mapping.
      if (found) {
        return value;
      }
    }
  }

  // No match was found, return an empty array.
  return [];
}

function hasParametrizedPath(path: string): boolean {
  return path.includes("/{");
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}
