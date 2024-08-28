// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
  "DELETE /atlas/v2/entity/guid/{guid}/businessmetadata/{businessMetadataName}": ["204"],
  "POST /atlas/v2/entity/guid/{guid}/businessmetadata/{businessMetadataName}": ["204"],
  "GET /atlas/v2/entity/businessmetadata/import/template": ["200"],
  "POST /atlas/v2/entity/businessmetadata/import": ["200"],
  "DELETE /atlas/v2/entity/guid/{guid}/labels": ["204"],
  "POST /atlas/v2/entity/guid/{guid}/labels": ["204"],
  "PUT /atlas/v2/entity/guid/{guid}/labels": ["204"],
  "DELETE /atlas/v2/entity/uniqueAttribute/type/{typeName}/labels": ["204"],
  "POST /atlas/v2/entity/uniqueAttribute/type/{typeName}/labels": ["204"],
  "PUT /atlas/v2/entity/uniqueAttribute/type/{typeName}/labels": ["204"],
  "POST /entity/moveTo": ["200"],
  "GET /atlas/v2/glossary": ["200"],
  "POST /atlas/v2/glossary": ["200"],
  "POST /atlas/v2/glossary/categories": ["200"],
  "POST /atlas/v2/glossary/category": ["200"],
  "GET /atlas/v2/glossary/category/{categoryId}": ["200"],
  "PUT /atlas/v2/glossary/category/{categoryId}": ["200"],
  "DELETE /atlas/v2/glossary/category/{categoryId}": ["204"],
  "PUT /atlas/v2/glossary/category/{categoryId}/partial": ["200"],
  "GET /atlas/v2/glossary/category/{categoryId}/related": ["200"],
  "GET /atlas/v2/glossary/category/{categoryId}/terms": ["200"],
  "POST /atlas/v2/glossary/term": ["200"],
  "GET /atlas/v2/glossary/term/{termId}": ["200"],
  "PUT /atlas/v2/glossary/term/{termId}": ["200"],
  "DELETE /atlas/v2/glossary/term/{termId}": ["204"],
  "PUT /atlas/v2/glossary/term/{termId}/partial": ["200"],
  "POST /atlas/v2/glossary/terms": ["200"],
  "GET /atlas/v2/glossary/terms/{termId}/assignedEntities": ["200"],
  "POST /atlas/v2/glossary/terms/{termId}/assignedEntities": ["204"],
  "DELETE /atlas/v2/glossary/terms/{termId}/assignedEntities": ["204"],
  "GET /atlas/v2/glossary/terms/{termId}/related": ["200"],
  "GET /atlas/v2/glossary/{glossaryId}": ["200"],
  "PUT /atlas/v2/glossary/{glossaryId}": ["200"],
  "DELETE /atlas/v2/glossary/{glossaryId}": ["204"],
  "GET /atlas/v2/glossary/{glossaryId}/categories": ["200"],
  "GET /atlas/v2/glossary/{glossaryId}/categories/headers": ["200"],
  "GET /atlas/v2/glossary/{glossaryId}/detailed": ["200"],
  "PUT /atlas/v2/glossary/{glossaryId}/partial": ["200"],
  "GET /atlas/v2/glossary/{glossaryId}/terms": ["200"],
  "GET /atlas/v2/glossary/{glossaryId}/terms/headers": ["200"],
  "POST /search/query": ["200"],
  "POST /search/suggest": ["200"],
  "POST /search/autocomplete": ["200"],
  "GET /atlas/v2/lineage/{guid}": ["200"],
  "GET /lineage/{guid}/next": ["200"],
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
};

export function isUnexpected(
  response: EntityCreateOrUpdate200Response | EntityCreateOrUpdateDefaultResponse,
): response is EntityCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: EntityListByGuids200Response | EntityListByGuidsDefaultResponse,
): response is EntityListByGuidsDefaultResponse;
export function isUnexpected(
  response: EntityBulkCreateOrUpdate200Response | EntityBulkCreateOrUpdateDefaultResponse,
): response is EntityBulkCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: EntityBulkDelete200Response | EntityBulkDeleteDefaultResponse,
): response is EntityBulkDeleteDefaultResponse;
export function isUnexpected(
  response: EntityAddClassification204Response | EntityAddClassificationDefaultResponse,
): response is EntityAddClassificationDefaultResponse;
export function isUnexpected(
  response: EntityGet200Response | EntityGetDefaultResponse,
): response is EntityGetDefaultResponse;
export function isUnexpected(
  response:
    | EntityPartialUpdateAttributeByGuid200Response
    | EntityPartialUpdateAttributeByGuidDefaultResponse,
): response is EntityPartialUpdateAttributeByGuidDefaultResponse;
export function isUnexpected(
  response: EntityDeleteOperation200Response | EntityDeleteOperationDefaultResponse,
): response is EntityDeleteOperationDefaultResponse;
export function isUnexpected(
  response: EntityGetClassification200Response | EntityGetClassificationDefaultResponse,
): response is EntityGetClassificationDefaultResponse;
export function isUnexpected(
  response: EntityRemoveClassification204Response | EntityRemoveClassificationDefaultResponse,
): response is EntityRemoveClassificationDefaultResponse;
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
    | EntityPartialUpdateByUniqueAttributes200Response
    | EntityPartialUpdateByUniqueAttributesDefaultResponse,
): response is EntityPartialUpdateByUniqueAttributesDefaultResponse;
export function isUnexpected(
  response: EntityDeleteByUniqueAttribute200Response | EntityDeleteByUniqueAttributeDefaultResponse,
): response is EntityDeleteByUniqueAttributeDefaultResponse;
export function isUnexpected(
  response:
    | EntityRemoveClassificationByUniqueAttribute204Response
    | EntityRemoveClassificationByUniqueAttributeDefaultResponse,
): response is EntityRemoveClassificationByUniqueAttributeDefaultResponse;
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
  response: EntityBulkSetClassifications200Response | EntityBulkSetClassificationsDefaultResponse,
): response is EntityBulkSetClassificationsDefaultResponse;
export function isUnexpected(
  response: EntityListByUniqueAttributes200Response | EntityListByUniqueAttributesDefaultResponse,
): response is EntityListByUniqueAttributesDefaultResponse;
export function isUnexpected(
  response: EntityGetHeader200Response | EntityGetHeaderDefaultResponse,
): response is EntityGetHeaderDefaultResponse;
export function isUnexpected(
  response: EntityRemoveBusinessMetadata204Response | EntityRemoveBusinessMetadataDefaultResponse,
): response is EntityRemoveBusinessMetadataDefaultResponse;
export function isUnexpected(
  response:
    | EntityAddOrUpdateBusinessMetadata204Response
    | EntityAddOrUpdateBusinessMetadataDefaultResponse,
): response is EntityAddOrUpdateBusinessMetadataDefaultResponse;
export function isUnexpected(
  response:
    | EntityRemoveBusinessMetadataAttributes204Response
    | EntityRemoveBusinessMetadataAttributesDefaultResponse,
): response is EntityRemoveBusinessMetadataAttributesDefaultResponse;
export function isUnexpected(
  response:
    | EntityAddOrUpdateBusinessMetadataAttributes204Response
    | EntityAddOrUpdateBusinessMetadataAttributesDefaultResponse,
): response is EntityAddOrUpdateBusinessMetadataAttributesDefaultResponse;
export function isUnexpected(
  response:
    | EntityGetSampleBusinessMetadataTemplate200Response
    | EntityGetSampleBusinessMetadataTemplateDefaultResponse,
): response is EntityGetSampleBusinessMetadataTemplateDefaultResponse;
export function isUnexpected(
  response: EntityImportBusinessMetadata200Response | EntityImportBusinessMetadataDefaultResponse,
): response is EntityImportBusinessMetadataDefaultResponse;
export function isUnexpected(
  response: EntityRemoveLabels204Response | EntityRemoveLabelsDefaultResponse,
): response is EntityRemoveLabelsDefaultResponse;
export function isUnexpected(
  response: EntitySetLabels204Response | EntitySetLabelsDefaultResponse,
): response is EntitySetLabelsDefaultResponse;
export function isUnexpected(
  response: EntityAddLabel204Response | EntityAddLabelDefaultResponse,
): response is EntityAddLabelDefaultResponse;
export function isUnexpected(
  response:
    | EntityRemoveLabelsByUniqueAttribute204Response
    | EntityRemoveLabelsByUniqueAttributeDefaultResponse,
): response is EntityRemoveLabelsByUniqueAttributeDefaultResponse;
export function isUnexpected(
  response:
    | EntitySetLabelsByUniqueAttribute204Response
    | EntitySetLabelsByUniqueAttributeDefaultResponse,
): response is EntitySetLabelsByUniqueAttributeDefaultResponse;
export function isUnexpected(
  response:
    | EntityAddLabelsByUniqueAttribute204Response
    | EntityAddLabelsByUniqueAttributeDefaultResponse,
): response is EntityAddLabelsByUniqueAttributeDefaultResponse;
export function isUnexpected(
  response:
    | EntityMoveEntitiesToCollection200Response
    | EntityMoveEntitiesToCollectionDefaultResponse,
): response is EntityMoveEntitiesToCollectionDefaultResponse;
export function isUnexpected(
  response: GlossaryList200Response | GlossaryListDefaultResponse,
): response is GlossaryListDefaultResponse;
export function isUnexpected(
  response: GlossaryCreate200Response | GlossaryCreateDefaultResponse,
): response is GlossaryCreateDefaultResponse;
export function isUnexpected(
  response: GlossaryCreateCategories200Response | GlossaryCreateCategoriesDefaultResponse,
): response is GlossaryCreateCategoriesDefaultResponse;
export function isUnexpected(
  response: GlossaryCreateCategory200Response | GlossaryCreateCategoryDefaultResponse,
): response is GlossaryCreateCategoryDefaultResponse;
export function isUnexpected(
  response: GlossaryGetCategory200Response | GlossaryGetCategoryDefaultResponse,
): response is GlossaryGetCategoryDefaultResponse;
export function isUnexpected(
  response: GlossaryUpdateCategory200Response | GlossaryUpdateCategoryDefaultResponse,
): response is GlossaryUpdateCategoryDefaultResponse;
export function isUnexpected(
  response: GlossaryDeleteCategory204Response | GlossaryDeleteCategoryDefaultResponse,
): response is GlossaryDeleteCategoryDefaultResponse;
export function isUnexpected(
  response: GlossaryPartialUpdateCategory200Response | GlossaryPartialUpdateCategoryDefaultResponse,
): response is GlossaryPartialUpdateCategoryDefaultResponse;
export function isUnexpected(
  response: GlossaryListRelatedCategories200Response | GlossaryListRelatedCategoriesDefaultResponse,
): response is GlossaryListRelatedCategoriesDefaultResponse;
export function isUnexpected(
  response: GlossaryListCategoryTerms200Response | GlossaryListCategoryTermsDefaultResponse,
): response is GlossaryListCategoryTermsDefaultResponse;
export function isUnexpected(
  response: GlossaryCreateTerm200Response | GlossaryCreateTermDefaultResponse,
): response is GlossaryCreateTermDefaultResponse;
export function isUnexpected(
  response: GlossaryGetTerm200Response | GlossaryGetTermDefaultResponse,
): response is GlossaryGetTermDefaultResponse;
export function isUnexpected(
  response: GlossaryUpdateTerm200Response | GlossaryUpdateTermDefaultResponse,
): response is GlossaryUpdateTermDefaultResponse;
export function isUnexpected(
  response: GlossaryDeleteTerm204Response | GlossaryDeleteTermDefaultResponse,
): response is GlossaryDeleteTermDefaultResponse;
export function isUnexpected(
  response: GlossaryPartialUpdateTerm200Response | GlossaryPartialUpdateTermDefaultResponse,
): response is GlossaryPartialUpdateTermDefaultResponse;
export function isUnexpected(
  response: GlossaryCreateTerms200Response | GlossaryCreateTermsDefaultResponse,
): response is GlossaryCreateTermsDefaultResponse;
export function isUnexpected(
  response:
    | GlossaryListEntitiesAssignedWithTerm200Response
    | GlossaryListEntitiesAssignedWithTermDefaultResponse,
): response is GlossaryListEntitiesAssignedWithTermDefaultResponse;
export function isUnexpected(
  response: GlossaryAssignTermToEntities204Response | GlossaryAssignTermToEntitiesDefaultResponse,
): response is GlossaryAssignTermToEntitiesDefaultResponse;
export function isUnexpected(
  response:
    | GlossaryDeleteTermAssignmentFromEntities204Response
    | GlossaryDeleteTermAssignmentFromEntitiesDefaultResponse,
): response is GlossaryDeleteTermAssignmentFromEntitiesDefaultResponse;
export function isUnexpected(
  response: GlossaryListRelatedTerms200Response | GlossaryListRelatedTermsDefaultResponse,
): response is GlossaryListRelatedTermsDefaultResponse;
export function isUnexpected(
  response: GlossaryGet200Response | GlossaryGetDefaultResponse,
): response is GlossaryGetDefaultResponse;
export function isUnexpected(
  response: GlossaryUpdate200Response | GlossaryUpdateDefaultResponse,
): response is GlossaryUpdateDefaultResponse;
export function isUnexpected(
  response: GlossaryDeleteOperation204Response | GlossaryDeleteOperationDefaultResponse,
): response is GlossaryDeleteOperationDefaultResponse;
export function isUnexpected(
  response: GlossaryListCategories200Response | GlossaryListCategoriesDefaultResponse,
): response is GlossaryListCategoriesDefaultResponse;
export function isUnexpected(
  response: GlossaryListCategoriesHeaders200Response | GlossaryListCategoriesHeadersDefaultResponse,
): response is GlossaryListCategoriesHeadersDefaultResponse;
export function isUnexpected(
  response: GlossaryGetDetailed200Response | GlossaryGetDetailedDefaultResponse,
): response is GlossaryGetDetailedDefaultResponse;
export function isUnexpected(
  response: GlossaryPartialUpdate200Response | GlossaryPartialUpdateDefaultResponse,
): response is GlossaryPartialUpdateDefaultResponse;
export function isUnexpected(
  response: GlossaryListTerms200Response | GlossaryListTermsDefaultResponse,
): response is GlossaryListTermsDefaultResponse;
export function isUnexpected(
  response: GlossaryListTermHeaders200Response | GlossaryListTermHeadersDefaultResponse,
): response is GlossaryListTermHeadersDefaultResponse;
export function isUnexpected(
  response: DiscoveryQuery200Response | DiscoveryQueryDefaultResponse,
): response is DiscoveryQueryDefaultResponse;
export function isUnexpected(
  response: DiscoverySuggest200Response | DiscoverySuggestDefaultResponse,
): response is DiscoverySuggestDefaultResponse;
export function isUnexpected(
  response: DiscoveryAutoComplete200Response | DiscoveryAutoCompleteDefaultResponse,
): response is DiscoveryAutoCompleteDefaultResponse;
export function isUnexpected(
  response: LineageGet200Response | LineageGetDefaultResponse,
): response is LineageGetDefaultResponse;
export function isUnexpected(
  response: LineageGetNextPage200Response | LineageGetNextPageDefaultResponse,
): response is LineageGetNextPageDefaultResponse;
export function isUnexpected(
  response: LineageGetByUniqueAttribute200Response | LineageGetByUniqueAttributeDefaultResponse,
): response is LineageGetByUniqueAttributeDefaultResponse;
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
  response: RelationshipDeleteOperation204Response | RelationshipDeleteOperationDefaultResponse,
): response is RelationshipDeleteOperationDefaultResponse;
export function isUnexpected(
  response:
    | TypeGetBusinessMetadataDefByGuid200Response
    | TypeGetBusinessMetadataDefByGuidDefaultResponse,
): response is TypeGetBusinessMetadataDefByGuidDefaultResponse;
export function isUnexpected(
  response:
    | TypeGetBusinessMetadataDefByName200Response
    | TypeGetBusinessMetadataDefByNameDefaultResponse,
): response is TypeGetBusinessMetadataDefByNameDefaultResponse;
export function isUnexpected(
  response:
    | TypeGetClassificationDefByGuid200Response
    | TypeGetClassificationDefByGuidDefaultResponse,
): response is TypeGetClassificationDefByGuidDefaultResponse;
export function isUnexpected(
  response:
    | TypeGetClassificationDefByName200Response
    | TypeGetClassificationDefByNameDefaultResponse,
): response is TypeGetClassificationDefByNameDefaultResponse;
export function isUnexpected(
  response: TypeGetEntityDefByGuid200Response | TypeGetEntityDefByGuidDefaultResponse,
): response is TypeGetEntityDefByGuidDefaultResponse;
export function isUnexpected(
  response: TypeGetEntityDefByName200Response | TypeGetEntityDefByNameDefaultResponse,
): response is TypeGetEntityDefByNameDefaultResponse;
export function isUnexpected(
  response: TypeGetEnumDefByGuid200Response | TypeGetEnumDefByGuidDefaultResponse,
): response is TypeGetEnumDefByGuidDefaultResponse;
export function isUnexpected(
  response: TypeGetEnumDefByName200Response | TypeGetEnumDefByNameDefaultResponse,
): response is TypeGetEnumDefByNameDefaultResponse;
export function isUnexpected(
  response: TypeGetRelationshipDefByGuid200Response | TypeGetRelationshipDefByGuidDefaultResponse,
): response is TypeGetRelationshipDefByGuidDefaultResponse;
export function isUnexpected(
  response: TypeGetRelationshipDefByName200Response | TypeGetRelationshipDefByNameDefaultResponse,
): response is TypeGetRelationshipDefByNameDefaultResponse;
export function isUnexpected(
  response: TypeGetStructDefByGuid200Response | TypeGetStructDefByGuidDefaultResponse,
): response is TypeGetStructDefByGuidDefaultResponse;
export function isUnexpected(
  response: TypeGetStructDefByName200Response | TypeGetStructDefByNameDefaultResponse,
): response is TypeGetStructDefByNameDefaultResponse;
export function isUnexpected(
  response: TypeGetByGuid200Response | TypeGetByGuidDefaultResponse,
): response is TypeGetByGuidDefaultResponse;
export function isUnexpected(
  response: TypeGetByName200Response | TypeGetByNameDefaultResponse,
): response is TypeGetByNameDefaultResponse;
export function isUnexpected(
  response: TypeDeleteOperation204Response | TypeDeleteOperationDefaultResponse,
): response is TypeDeleteOperationDefaultResponse;
export function isUnexpected(
  response: TypeList200Response | TypeListDefaultResponse,
): response is TypeListDefaultResponse;
export function isUnexpected(
  response: TypeBulkCreate200Response | TypeBulkCreateDefaultResponse,
): response is TypeBulkCreateDefaultResponse;
export function isUnexpected(
  response: TypeBulkUpdate200Response | TypeBulkUpdateDefaultResponse,
): response is TypeBulkUpdateDefaultResponse;
export function isUnexpected(
  response: TypeBulkDelete204Response | TypeBulkDeleteDefaultResponse,
): response is TypeBulkDeleteDefaultResponse;
export function isUnexpected(
  response: TypeListHeaders200Response | TypeListHeadersDefaultResponse,
): response is TypeListHeadersDefaultResponse;
export function isUnexpected(
  response: TypeGetTermTemplateDefByGuid200Response | TypeGetTermTemplateDefByGuidDefaultResponse,
): response is TypeGetTermTemplateDefByGuidDefaultResponse;
export function isUnexpected(
  response: TypeGetTermTemplateDefByName200Response | TypeGetTermTemplateDefByNameDefaultResponse,
): response is TypeGetTermTemplateDefByNameDefaultResponse;
export function isUnexpected(
  response:
    | EntityCreateOrUpdate200Response
    | EntityCreateOrUpdateDefaultResponse
    | EntityListByGuids200Response
    | EntityListByGuidsDefaultResponse
    | EntityBulkCreateOrUpdate200Response
    | EntityBulkCreateOrUpdateDefaultResponse
    | EntityBulkDelete200Response
    | EntityBulkDeleteDefaultResponse
    | EntityAddClassification204Response
    | EntityAddClassificationDefaultResponse
    | EntityGet200Response
    | EntityGetDefaultResponse
    | EntityPartialUpdateAttributeByGuid200Response
    | EntityPartialUpdateAttributeByGuidDefaultResponse
    | EntityDeleteOperation200Response
    | EntityDeleteOperationDefaultResponse
    | EntityGetClassification200Response
    | EntityGetClassificationDefaultResponse
    | EntityRemoveClassification204Response
    | EntityRemoveClassificationDefaultResponse
    | EntityGetClassifications200Response
    | EntityGetClassificationsDefaultResponse
    | EntityAddClassifications204Response
    | EntityAddClassificationsDefaultResponse
    | EntityUpdateClassifications204Response
    | EntityUpdateClassificationsDefaultResponse
    | EntityGetByUniqueAttributes200Response
    | EntityGetByUniqueAttributesDefaultResponse
    | EntityPartialUpdateByUniqueAttributes200Response
    | EntityPartialUpdateByUniqueAttributesDefaultResponse
    | EntityDeleteByUniqueAttribute200Response
    | EntityDeleteByUniqueAttributeDefaultResponse
    | EntityRemoveClassificationByUniqueAttribute204Response
    | EntityRemoveClassificationByUniqueAttributeDefaultResponse
    | EntityAddClassificationsByUniqueAttribute204Response
    | EntityAddClassificationsByUniqueAttributeDefaultResponse
    | EntityUpdateClassificationsByUniqueAttribute204Response
    | EntityUpdateClassificationsByUniqueAttributeDefaultResponse
    | EntityBulkSetClassifications200Response
    | EntityBulkSetClassificationsDefaultResponse
    | EntityListByUniqueAttributes200Response
    | EntityListByUniqueAttributesDefaultResponse
    | EntityGetHeader200Response
    | EntityGetHeaderDefaultResponse
    | EntityRemoveBusinessMetadata204Response
    | EntityRemoveBusinessMetadataDefaultResponse
    | EntityAddOrUpdateBusinessMetadata204Response
    | EntityAddOrUpdateBusinessMetadataDefaultResponse
    | EntityRemoveBusinessMetadataAttributes204Response
    | EntityRemoveBusinessMetadataAttributesDefaultResponse
    | EntityAddOrUpdateBusinessMetadataAttributes204Response
    | EntityAddOrUpdateBusinessMetadataAttributesDefaultResponse
    | EntityGetSampleBusinessMetadataTemplate200Response
    | EntityGetSampleBusinessMetadataTemplateDefaultResponse
    | EntityImportBusinessMetadata200Response
    | EntityImportBusinessMetadataDefaultResponse
    | EntityRemoveLabels204Response
    | EntityRemoveLabelsDefaultResponse
    | EntitySetLabels204Response
    | EntitySetLabelsDefaultResponse
    | EntityAddLabel204Response
    | EntityAddLabelDefaultResponse
    | EntityRemoveLabelsByUniqueAttribute204Response
    | EntityRemoveLabelsByUniqueAttributeDefaultResponse
    | EntitySetLabelsByUniqueAttribute204Response
    | EntitySetLabelsByUniqueAttributeDefaultResponse
    | EntityAddLabelsByUniqueAttribute204Response
    | EntityAddLabelsByUniqueAttributeDefaultResponse
    | EntityMoveEntitiesToCollection200Response
    | EntityMoveEntitiesToCollectionDefaultResponse
    | GlossaryList200Response
    | GlossaryListDefaultResponse
    | GlossaryCreate200Response
    | GlossaryCreateDefaultResponse
    | GlossaryCreateCategories200Response
    | GlossaryCreateCategoriesDefaultResponse
    | GlossaryCreateCategory200Response
    | GlossaryCreateCategoryDefaultResponse
    | GlossaryGetCategory200Response
    | GlossaryGetCategoryDefaultResponse
    | GlossaryUpdateCategory200Response
    | GlossaryUpdateCategoryDefaultResponse
    | GlossaryDeleteCategory204Response
    | GlossaryDeleteCategoryDefaultResponse
    | GlossaryPartialUpdateCategory200Response
    | GlossaryPartialUpdateCategoryDefaultResponse
    | GlossaryListRelatedCategories200Response
    | GlossaryListRelatedCategoriesDefaultResponse
    | GlossaryListCategoryTerms200Response
    | GlossaryListCategoryTermsDefaultResponse
    | GlossaryCreateTerm200Response
    | GlossaryCreateTermDefaultResponse
    | GlossaryGetTerm200Response
    | GlossaryGetTermDefaultResponse
    | GlossaryUpdateTerm200Response
    | GlossaryUpdateTermDefaultResponse
    | GlossaryDeleteTerm204Response
    | GlossaryDeleteTermDefaultResponse
    | GlossaryPartialUpdateTerm200Response
    | GlossaryPartialUpdateTermDefaultResponse
    | GlossaryCreateTerms200Response
    | GlossaryCreateTermsDefaultResponse
    | GlossaryListEntitiesAssignedWithTerm200Response
    | GlossaryListEntitiesAssignedWithTermDefaultResponse
    | GlossaryAssignTermToEntities204Response
    | GlossaryAssignTermToEntitiesDefaultResponse
    | GlossaryDeleteTermAssignmentFromEntities204Response
    | GlossaryDeleteTermAssignmentFromEntitiesDefaultResponse
    | GlossaryListRelatedTerms200Response
    | GlossaryListRelatedTermsDefaultResponse
    | GlossaryGet200Response
    | GlossaryGetDefaultResponse
    | GlossaryUpdate200Response
    | GlossaryUpdateDefaultResponse
    | GlossaryDeleteOperation204Response
    | GlossaryDeleteOperationDefaultResponse
    | GlossaryListCategories200Response
    | GlossaryListCategoriesDefaultResponse
    | GlossaryListCategoriesHeaders200Response
    | GlossaryListCategoriesHeadersDefaultResponse
    | GlossaryGetDetailed200Response
    | GlossaryGetDetailedDefaultResponse
    | GlossaryPartialUpdate200Response
    | GlossaryPartialUpdateDefaultResponse
    | GlossaryListTerms200Response
    | GlossaryListTermsDefaultResponse
    | GlossaryListTermHeaders200Response
    | GlossaryListTermHeadersDefaultResponse
    | DiscoveryQuery200Response
    | DiscoveryQueryDefaultResponse
    | DiscoverySuggest200Response
    | DiscoverySuggestDefaultResponse
    | DiscoveryAutoComplete200Response
    | DiscoveryAutoCompleteDefaultResponse
    | LineageGet200Response
    | LineageGetDefaultResponse
    | LineageGetNextPage200Response
    | LineageGetNextPageDefaultResponse
    | LineageGetByUniqueAttribute200Response
    | LineageGetByUniqueAttributeDefaultResponse
    | RelationshipCreate200Response
    | RelationshipCreateDefaultResponse
    | RelationshipUpdate200Response
    | RelationshipUpdateDefaultResponse
    | RelationshipGet200Response
    | RelationshipGetDefaultResponse
    | RelationshipDeleteOperation204Response
    | RelationshipDeleteOperationDefaultResponse
    | TypeGetBusinessMetadataDefByGuid200Response
    | TypeGetBusinessMetadataDefByGuidDefaultResponse
    | TypeGetBusinessMetadataDefByName200Response
    | TypeGetBusinessMetadataDefByNameDefaultResponse
    | TypeGetClassificationDefByGuid200Response
    | TypeGetClassificationDefByGuidDefaultResponse
    | TypeGetClassificationDefByName200Response
    | TypeGetClassificationDefByNameDefaultResponse
    | TypeGetEntityDefByGuid200Response
    | TypeGetEntityDefByGuidDefaultResponse
    | TypeGetEntityDefByName200Response
    | TypeGetEntityDefByNameDefaultResponse
    | TypeGetEnumDefByGuid200Response
    | TypeGetEnumDefByGuidDefaultResponse
    | TypeGetEnumDefByName200Response
    | TypeGetEnumDefByNameDefaultResponse
    | TypeGetRelationshipDefByGuid200Response
    | TypeGetRelationshipDefByGuidDefaultResponse
    | TypeGetRelationshipDefByName200Response
    | TypeGetRelationshipDefByNameDefaultResponse
    | TypeGetStructDefByGuid200Response
    | TypeGetStructDefByGuidDefaultResponse
    | TypeGetStructDefByName200Response
    | TypeGetStructDefByNameDefaultResponse
    | TypeGetByGuid200Response
    | TypeGetByGuidDefaultResponse
    | TypeGetByName200Response
    | TypeGetByNameDefaultResponse
    | TypeDeleteOperation204Response
    | TypeDeleteOperationDefaultResponse
    | TypeList200Response
    | TypeListDefaultResponse
    | TypeBulkCreate200Response
    | TypeBulkCreateDefaultResponse
    | TypeBulkUpdate200Response
    | TypeBulkUpdateDefaultResponse
    | TypeBulkDelete204Response
    | TypeBulkDeleteDefaultResponse
    | TypeListHeaders200Response
    | TypeListHeadersDefaultResponse
    | TypeGetTermTemplateDefByGuid200Response
    | TypeGetTermTemplateDefByGuidDefaultResponse
    | TypeGetTermTemplateDefByName200Response
    | TypeGetTermTemplateDefByNameDefaultResponse,
): response is
  | EntityCreateOrUpdateDefaultResponse
  | EntityListByGuidsDefaultResponse
  | EntityBulkCreateOrUpdateDefaultResponse
  | EntityBulkDeleteDefaultResponse
  | EntityAddClassificationDefaultResponse
  | EntityGetDefaultResponse
  | EntityPartialUpdateAttributeByGuidDefaultResponse
  | EntityDeleteOperationDefaultResponse
  | EntityGetClassificationDefaultResponse
  | EntityRemoveClassificationDefaultResponse
  | EntityGetClassificationsDefaultResponse
  | EntityAddClassificationsDefaultResponse
  | EntityUpdateClassificationsDefaultResponse
  | EntityGetByUniqueAttributesDefaultResponse
  | EntityPartialUpdateByUniqueAttributesDefaultResponse
  | EntityDeleteByUniqueAttributeDefaultResponse
  | EntityRemoveClassificationByUniqueAttributeDefaultResponse
  | EntityAddClassificationsByUniqueAttributeDefaultResponse
  | EntityUpdateClassificationsByUniqueAttributeDefaultResponse
  | EntityBulkSetClassificationsDefaultResponse
  | EntityListByUniqueAttributesDefaultResponse
  | EntityGetHeaderDefaultResponse
  | EntityRemoveBusinessMetadataDefaultResponse
  | EntityAddOrUpdateBusinessMetadataDefaultResponse
  | EntityRemoveBusinessMetadataAttributesDefaultResponse
  | EntityAddOrUpdateBusinessMetadataAttributesDefaultResponse
  | EntityGetSampleBusinessMetadataTemplateDefaultResponse
  | EntityImportBusinessMetadataDefaultResponse
  | EntityRemoveLabelsDefaultResponse
  | EntitySetLabelsDefaultResponse
  | EntityAddLabelDefaultResponse
  | EntityRemoveLabelsByUniqueAttributeDefaultResponse
  | EntitySetLabelsByUniqueAttributeDefaultResponse
  | EntityAddLabelsByUniqueAttributeDefaultResponse
  | EntityMoveEntitiesToCollectionDefaultResponse
  | GlossaryListDefaultResponse
  | GlossaryCreateDefaultResponse
  | GlossaryCreateCategoriesDefaultResponse
  | GlossaryCreateCategoryDefaultResponse
  | GlossaryGetCategoryDefaultResponse
  | GlossaryUpdateCategoryDefaultResponse
  | GlossaryDeleteCategoryDefaultResponse
  | GlossaryPartialUpdateCategoryDefaultResponse
  | GlossaryListRelatedCategoriesDefaultResponse
  | GlossaryListCategoryTermsDefaultResponse
  | GlossaryCreateTermDefaultResponse
  | GlossaryGetTermDefaultResponse
  | GlossaryUpdateTermDefaultResponse
  | GlossaryDeleteTermDefaultResponse
  | GlossaryPartialUpdateTermDefaultResponse
  | GlossaryCreateTermsDefaultResponse
  | GlossaryListEntitiesAssignedWithTermDefaultResponse
  | GlossaryAssignTermToEntitiesDefaultResponse
  | GlossaryDeleteTermAssignmentFromEntitiesDefaultResponse
  | GlossaryListRelatedTermsDefaultResponse
  | GlossaryGetDefaultResponse
  | GlossaryUpdateDefaultResponse
  | GlossaryDeleteOperationDefaultResponse
  | GlossaryListCategoriesDefaultResponse
  | GlossaryListCategoriesHeadersDefaultResponse
  | GlossaryGetDetailedDefaultResponse
  | GlossaryPartialUpdateDefaultResponse
  | GlossaryListTermsDefaultResponse
  | GlossaryListTermHeadersDefaultResponse
  | DiscoveryQueryDefaultResponse
  | DiscoverySuggestDefaultResponse
  | DiscoveryAutoCompleteDefaultResponse
  | LineageGetDefaultResponse
  | LineageGetNextPageDefaultResponse
  | LineageGetByUniqueAttributeDefaultResponse
  | RelationshipCreateDefaultResponse
  | RelationshipUpdateDefaultResponse
  | RelationshipGetDefaultResponse
  | RelationshipDeleteOperationDefaultResponse
  | TypeGetBusinessMetadataDefByGuidDefaultResponse
  | TypeGetBusinessMetadataDefByNameDefaultResponse
  | TypeGetClassificationDefByGuidDefaultResponse
  | TypeGetClassificationDefByNameDefaultResponse
  | TypeGetEntityDefByGuidDefaultResponse
  | TypeGetEntityDefByNameDefaultResponse
  | TypeGetEnumDefByGuidDefaultResponse
  | TypeGetEnumDefByNameDefaultResponse
  | TypeGetRelationshipDefByGuidDefaultResponse
  | TypeGetRelationshipDefByNameDefaultResponse
  | TypeGetStructDefByGuidDefaultResponse
  | TypeGetStructDefByNameDefaultResponse
  | TypeGetByGuidDefaultResponse
  | TypeGetByNameDefaultResponse
  | TypeDeleteOperationDefaultResponse
  | TypeListDefaultResponse
  | TypeBulkCreateDefaultResponse
  | TypeBulkUpdateDefaultResponse
  | TypeBulkDeleteDefaultResponse
  | TypeListHeadersDefaultResponse
  | TypeGetTermTemplateDefByGuidDefaultResponse
  | TypeGetTermTemplateDefByNameDefaultResponse {
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
