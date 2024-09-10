// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpResponse } from "@azure-rest/core-client";
import {
  EntityMutationResultOutput,
  AtlasErrorResponseOutput,
  AtlasEntitiesWithExtInfoOutput,
  AtlasEntityWithExtInfoOutput,
  AtlasClassificationOutput,
  AtlasClassificationsOutput,
  AtlasEntityHeaderOutput,
  BulkImportResultOutput,
  AtlasGlossaryOutput,
  AtlasGlossaryCategoryOutput,
  AtlasRelatedTermHeaderOutput,
  AtlasGlossaryTermOutput,
  AtlasRelatedObjectIdOutput,
  AtlasRelatedCategoryHeaderOutput,
  AtlasGlossaryExtInfoOutput,
  QueryResultOutput,
  SuggestResultOutput,
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

/** The request has succeeded. */
export interface EntityCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: EntityMutationResultOutput;
}

export interface EntityCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface EntityListByGuids200Response extends HttpResponse {
  status: "200";
  body: AtlasEntitiesWithExtInfoOutput;
}

export interface EntityListByGuidsDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface EntityBulkCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: EntityMutationResultOutput;
}

export interface EntityBulkCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface EntityBulkDelete200Response extends HttpResponse {
  status: "200";
  body: EntityMutationResultOutput;
}

export interface EntityBulkDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface EntityAddClassification204Response extends HttpResponse {
  status: "204";
}

export interface EntityAddClassificationDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface EntityGet200Response extends HttpResponse {
  status: "200";
  body: AtlasEntityWithExtInfoOutput;
}

export interface EntityGetDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface EntityPartialUpdateAttributeByGuid200Response extends HttpResponse {
  status: "200";
  body: EntityMutationResultOutput;
}

export interface EntityPartialUpdateAttributeByGuidDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface EntityDeleteOperation200Response extends HttpResponse {
  status: "200";
  body: EntityMutationResultOutput;
}

export interface EntityDeleteOperationDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface EntityGetClassification200Response extends HttpResponse {
  status: "200";
  body: AtlasClassificationOutput;
}

export interface EntityGetClassificationDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface EntityRemoveClassification204Response extends HttpResponse {
  status: "204";
}

export interface EntityRemoveClassificationDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface EntityGetClassifications200Response extends HttpResponse {
  status: "200";
  body: AtlasClassificationsOutput;
}

export interface EntityGetClassificationsDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface EntityAddClassifications204Response extends HttpResponse {
  status: "204";
}

export interface EntityAddClassificationsDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface EntityUpdateClassifications204Response extends HttpResponse {
  status: "204";
}

export interface EntityUpdateClassificationsDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface EntityGetByUniqueAttributes200Response extends HttpResponse {
  status: "200";
  body: AtlasEntityWithExtInfoOutput;
}

export interface EntityGetByUniqueAttributesDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface EntityPartialUpdateByUniqueAttributes200Response extends HttpResponse {
  status: "200";
  body: EntityMutationResultOutput;
}

export interface EntityPartialUpdateByUniqueAttributesDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface EntityDeleteByUniqueAttribute200Response extends HttpResponse {
  status: "200";
  body: EntityMutationResultOutput;
}

export interface EntityDeleteByUniqueAttributeDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface EntityRemoveClassificationByUniqueAttribute204Response extends HttpResponse {
  status: "204";
}

export interface EntityRemoveClassificationByUniqueAttributeDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface EntityAddClassificationsByUniqueAttribute204Response extends HttpResponse {
  status: "204";
}

export interface EntityAddClassificationsByUniqueAttributeDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface EntityUpdateClassificationsByUniqueAttribute204Response extends HttpResponse {
  status: "204";
}

export interface EntityUpdateClassificationsByUniqueAttributeDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface EntityBulkSetClassifications200Response extends HttpResponse {
  status: "200";
  body: string[];
}

export interface EntityBulkSetClassificationsDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface EntityListByUniqueAttributes200Response extends HttpResponse {
  status: "200";
  body: AtlasEntitiesWithExtInfoOutput;
}

export interface EntityListByUniqueAttributesDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface EntityGetHeader200Response extends HttpResponse {
  status: "200";
  body: AtlasEntityHeaderOutput;
}

export interface EntityGetHeaderDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface EntityRemoveBusinessMetadata204Response extends HttpResponse {
  status: "204";
}

export interface EntityRemoveBusinessMetadataDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface EntityAddOrUpdateBusinessMetadata204Response extends HttpResponse {
  status: "204";
}

export interface EntityAddOrUpdateBusinessMetadataDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface EntityRemoveBusinessMetadataAttributes204Response extends HttpResponse {
  status: "204";
}

export interface EntityRemoveBusinessMetadataAttributesDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface EntityAddOrUpdateBusinessMetadataAttributes204Response extends HttpResponse {
  status: "204";
}

export interface EntityAddOrUpdateBusinessMetadataAttributesDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface EntityGetSampleBusinessMetadataTemplate200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

export interface EntityGetSampleBusinessMetadataTemplateDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface EntityImportBusinessMetadata200Response extends HttpResponse {
  status: "200";
  body: BulkImportResultOutput;
}

export interface EntityImportBusinessMetadataDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface EntityRemoveLabels204Response extends HttpResponse {
  status: "204";
}

export interface EntityRemoveLabelsDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface EntitySetLabels204Response extends HttpResponse {
  status: "204";
}

export interface EntitySetLabelsDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface EntityAddLabel204Response extends HttpResponse {
  status: "204";
}

export interface EntityAddLabelDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface EntityRemoveLabelsByUniqueAttribute204Response extends HttpResponse {
  status: "204";
}

export interface EntityRemoveLabelsByUniqueAttributeDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface EntitySetLabelsByUniqueAttribute204Response extends HttpResponse {
  status: "204";
}

export interface EntitySetLabelsByUniqueAttributeDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface EntityAddLabelsByUniqueAttribute204Response extends HttpResponse {
  status: "204";
}

export interface EntityAddLabelsByUniqueAttributeDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface EntityMoveEntitiesToCollection200Response extends HttpResponse {
  status: "200";
  body: EntityMutationResultOutput;
}

export interface EntityMoveEntitiesToCollectionDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface GlossaryList200Response extends HttpResponse {
  status: "200";
  body: Array<AtlasGlossaryOutput>;
}

export interface GlossaryListDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface GlossaryCreate200Response extends HttpResponse {
  status: "200";
  body: AtlasGlossaryOutput;
}

export interface GlossaryCreateDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface GlossaryCreateCategories200Response extends HttpResponse {
  status: "200";
  body: Array<AtlasGlossaryCategoryOutput>;
}

export interface GlossaryCreateCategoriesDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface GlossaryCreateCategory200Response extends HttpResponse {
  status: "200";
  body: AtlasGlossaryCategoryOutput;
}

export interface GlossaryCreateCategoryDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface GlossaryGetCategory200Response extends HttpResponse {
  status: "200";
  body: AtlasGlossaryCategoryOutput;
}

export interface GlossaryGetCategoryDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface GlossaryUpdateCategory200Response extends HttpResponse {
  status: "200";
  body: AtlasGlossaryCategoryOutput;
}

export interface GlossaryUpdateCategoryDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface GlossaryDeleteCategory204Response extends HttpResponse {
  status: "204";
}

export interface GlossaryDeleteCategoryDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface GlossaryPartialUpdateCategory200Response extends HttpResponse {
  status: "200";
  body: AtlasGlossaryCategoryOutput;
}

export interface GlossaryPartialUpdateCategoryDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface GlossaryListRelatedCategories200Response extends HttpResponse {
  status: "200";
  body: Record<string, Array<AtlasRelatedCategoryHeaderOutput>>;
}

export interface GlossaryListRelatedCategoriesDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface GlossaryListCategoryTerms200Response extends HttpResponse {
  status: "200";
  body: Array<AtlasRelatedTermHeaderOutput>;
}

export interface GlossaryListCategoryTermsDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface GlossaryCreateTerm200Response extends HttpResponse {
  status: "200";
  body: AtlasGlossaryTermOutput;
}

export interface GlossaryCreateTermDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface GlossaryGetTerm200Response extends HttpResponse {
  status: "200";
  body: AtlasGlossaryTermOutput;
}

export interface GlossaryGetTermDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface GlossaryUpdateTerm200Response extends HttpResponse {
  status: "200";
  body: AtlasGlossaryTermOutput;
}

export interface GlossaryUpdateTermDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface GlossaryDeleteTerm204Response extends HttpResponse {
  status: "204";
}

export interface GlossaryDeleteTermDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface GlossaryPartialUpdateTerm200Response extends HttpResponse {
  status: "200";
  body: AtlasGlossaryTermOutput;
}

export interface GlossaryPartialUpdateTermDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface GlossaryCreateTerms200Response extends HttpResponse {
  status: "200";
  body: Array<AtlasGlossaryTermOutput>;
}

export interface GlossaryCreateTermsDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface GlossaryListEntitiesAssignedWithTerm200Response extends HttpResponse {
  status: "200";
  body: Array<AtlasRelatedObjectIdOutput>;
}

export interface GlossaryListEntitiesAssignedWithTermDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface GlossaryAssignTermToEntities204Response extends HttpResponse {
  status: "204";
}

export interface GlossaryAssignTermToEntitiesDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface GlossaryDeleteTermAssignmentFromEntities204Response extends HttpResponse {
  status: "204";
}

export interface GlossaryDeleteTermAssignmentFromEntitiesDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface GlossaryListRelatedTerms200Response extends HttpResponse {
  status: "200";
  body: Record<string, Array<AtlasRelatedTermHeaderOutput>>;
}

export interface GlossaryListRelatedTermsDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface GlossaryGet200Response extends HttpResponse {
  status: "200";
  body: AtlasGlossaryOutput;
}

export interface GlossaryGetDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface GlossaryUpdate200Response extends HttpResponse {
  status: "200";
  body: AtlasGlossaryOutput;
}

export interface GlossaryUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface GlossaryDeleteOperation204Response extends HttpResponse {
  status: "204";
}

export interface GlossaryDeleteOperationDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface GlossaryListCategories200Response extends HttpResponse {
  status: "200";
  body: Array<AtlasGlossaryCategoryOutput>;
}

export interface GlossaryListCategoriesDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface GlossaryListCategoriesHeaders200Response extends HttpResponse {
  status: "200";
  body: Array<AtlasRelatedCategoryHeaderOutput>;
}

export interface GlossaryListCategoriesHeadersDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface GlossaryGetDetailed200Response extends HttpResponse {
  status: "200";
  body: AtlasGlossaryExtInfoOutput;
}

export interface GlossaryGetDetailedDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface GlossaryPartialUpdate200Response extends HttpResponse {
  status: "200";
  body: AtlasGlossaryOutput;
}

export interface GlossaryPartialUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface GlossaryListTerms200Response extends HttpResponse {
  status: "200";
  body: Array<AtlasGlossaryTermOutput>;
}

export interface GlossaryListTermsDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface GlossaryListTermHeaders200Response extends HttpResponse {
  status: "200";
  body: Array<AtlasRelatedTermHeaderOutput>;
}

export interface GlossaryListTermHeadersDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface DiscoveryQuery200Response extends HttpResponse {
  status: "200";
  body: QueryResultOutput;
}

export interface DiscoveryQueryDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface DiscoverySuggest200Response extends HttpResponse {
  status: "200";
  body: SuggestResultOutput;
}

export interface DiscoverySuggestDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface DiscoveryAutoComplete200Response extends HttpResponse {
  status: "200";
  body: AutoCompleteResultOutput;
}

export interface DiscoveryAutoCompleteDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface LineageGet200Response extends HttpResponse {
  status: "200";
  body: AtlasLineageInfoOutput;
}

export interface LineageGetDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface LineageGetNextPage200Response extends HttpResponse {
  status: "200";
  body: AtlasLineageInfoOutput;
}

export interface LineageGetNextPageDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface LineageGetByUniqueAttribute200Response extends HttpResponse {
  status: "200";
  body: AtlasLineageInfoOutput;
}

export interface LineageGetByUniqueAttributeDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface RelationshipCreate200Response extends HttpResponse {
  status: "200";
  body: AtlasRelationshipOutput;
}

export interface RelationshipCreateDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface RelationshipUpdate200Response extends HttpResponse {
  status: "200";
  body: AtlasRelationshipOutput;
}

export interface RelationshipUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface RelationshipGet200Response extends HttpResponse {
  status: "200";
  body: AtlasRelationshipWithExtInfoOutput;
}

export interface RelationshipGetDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface RelationshipDeleteOperation204Response extends HttpResponse {
  status: "204";
}

export interface RelationshipDeleteOperationDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface TypeGetBusinessMetadataDefByGuid200Response extends HttpResponse {
  status: "200";
  body: AtlasBusinessMetadataDefOutput;
}

export interface TypeGetBusinessMetadataDefByGuidDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface TypeGetBusinessMetadataDefByName200Response extends HttpResponse {
  status: "200";
  body: AtlasBusinessMetadataDefOutput;
}

export interface TypeGetBusinessMetadataDefByNameDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface TypeGetClassificationDefByGuid200Response extends HttpResponse {
  status: "200";
  body: AtlasClassificationDefOutput;
}

export interface TypeGetClassificationDefByGuidDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface TypeGetClassificationDefByName200Response extends HttpResponse {
  status: "200";
  body: AtlasClassificationDefOutput;
}

export interface TypeGetClassificationDefByNameDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface TypeGetEntityDefByGuid200Response extends HttpResponse {
  status: "200";
  body: AtlasEntityDefOutput;
}

export interface TypeGetEntityDefByGuidDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface TypeGetEntityDefByName200Response extends HttpResponse {
  status: "200";
  body: AtlasEntityDefOutput;
}

export interface TypeGetEntityDefByNameDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface TypeGetEnumDefByGuid200Response extends HttpResponse {
  status: "200";
  body: AtlasEnumDefOutput;
}

export interface TypeGetEnumDefByGuidDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface TypeGetEnumDefByName200Response extends HttpResponse {
  status: "200";
  body: AtlasEnumDefOutput;
}

export interface TypeGetEnumDefByNameDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface TypeGetRelationshipDefByGuid200Response extends HttpResponse {
  status: "200";
  body: AtlasRelationshipDefOutput;
}

export interface TypeGetRelationshipDefByGuidDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface TypeGetRelationshipDefByName200Response extends HttpResponse {
  status: "200";
  body: AtlasRelationshipDefOutput;
}

export interface TypeGetRelationshipDefByNameDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface TypeGetStructDefByGuid200Response extends HttpResponse {
  status: "200";
  body: AtlasStructDefOutput;
}

export interface TypeGetStructDefByGuidDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface TypeGetStructDefByName200Response extends HttpResponse {
  status: "200";
  body: AtlasStructDefOutput;
}

export interface TypeGetStructDefByNameDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface TypeGetByGuid200Response extends HttpResponse {
  status: "200";
  body: AtlasTypeDefOutput;
}

export interface TypeGetByGuidDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface TypeGetByName200Response extends HttpResponse {
  status: "200";
  body: AtlasTypeDefOutput;
}

export interface TypeGetByNameDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface TypeDeleteOperation204Response extends HttpResponse {
  status: "204";
}

export interface TypeDeleteOperationDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface TypeList200Response extends HttpResponse {
  status: "200";
  body: AtlasTypesDefOutput;
}

export interface TypeListDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface TypeBulkCreate200Response extends HttpResponse {
  status: "200";
  body: AtlasTypesDefOutput;
}

export interface TypeBulkCreateDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface TypeBulkUpdate200Response extends HttpResponse {
  status: "200";
  body: AtlasTypesDefOutput;
}

export interface TypeBulkUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface TypeBulkDelete204Response extends HttpResponse {
  status: "204";
}

export interface TypeBulkDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface TypeListHeaders200Response extends HttpResponse {
  status: "200";
  body: Array<AtlasTypeDefHeaderOutput>;
}

export interface TypeListHeadersDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface TypeGetTermTemplateDefByGuid200Response extends HttpResponse {
  status: "200";
  body: TermTemplateDefOutput;
}

export interface TypeGetTermTemplateDefByGuidDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}

/** The request has succeeded. */
export interface TypeGetTermTemplateDefByName200Response extends HttpResponse {
  status: "200";
  body: TermTemplateDefOutput;
}

export interface TypeGetTermTemplateDefByNameDefaultResponse extends HttpResponse {
  status: string;
  body: AtlasErrorResponseOutput;
}
