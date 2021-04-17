// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export type JsonAtlasEntityWithExtInfo = JsonAtlasEntityWithExtInfoBase &
  JsonAtlasEntityExtInfo;

export interface JsonAtlasEntityWithExtInfoBase {
  /** An instance of an entity - like hive_table, hive_database. */
  entity?: JsonAtlasEntity;
}

export type JsonAtlasEntity = JsonAtlasEntityBase & JsonAtlasStruct;

export interface JsonAtlasEntityBase {
  /** An array of classifications. */
  classifications?: JsonAtlasClassification[];
  /** The created time of the record. */
  createTime?: number;
  /** The user who created the record. */
  createdBy?: string;
  /** The GUID of the entity. */
  guid?: string;
  /** The home ID of the entity. */
  homeId?: string;
  /** An array of term assignment headers indicating the meanings of the entity. */
  meanings?: JsonAtlasTermAssignmentHeader[];
  /** Used to record the provenance of an instance of an entity or relationship. */
  provenanceType?: number;
  /** Determines if there's a proxy. */
  proxy?: boolean;
  /** The attributes of relationship. */
  relationshipAttributes?: JsonAtlasEntityRelationshipAttributesDictionary;
  /** Status of the entity - can be active or deleted. Deleted entities are not removed from Atlas store. */
  status?: JsonStatus;
  /** The update time of the record. */
  updateTime?: number;
  /** The user who updated the record. */
  updatedBy?: string;
  /** The version of the entity. */
  version?: number;
  /** indicate the source who create the classification detail */
  source?: string;
  /** more detail on source information */
  sourceDetails?: JsonAtlasEntitySourceDetailsDictionary;
  /** The dictionary of contacts for terms. Key could be Expert or Owner. */
  contacts?: JsonAtlasEntityContactsDictionary;
}

export type JsonAtlasClassification = JsonAtlasClassificationBase &
  JsonAtlasStruct;

export interface JsonAtlasClassificationBase {
  /** The GUID of the entity. */
  entityGuid?: string;
  /** Status of the entity - can be active or deleted. Deleted entities are not removed from Atlas store. */
  entityStatus?: JsonStatus;
  /** Determines if the classification will be propagated. */
  propagate?: boolean;
  /** Determines if propagations will be removed on entity deletion. */
  removePropagationsOnEntityDelete?: boolean;
  /** An array of time boundaries indicating validity periods. */
  validityPeriods?: JsonTimeBoundary[];
  /** indicate the source who create the classification detail */
  source?: string;
  /** more detail on source information */
  sourceDetails?: JsonAtlasClassificationSourceDetailsDictionary;
}

export interface JsonTimeBoundary {
  /** The end of the time boundary. */
  endTime?: string;
  /** The start of the time boundary. */
  startTime?: string;
  /** The timezone of the time boundary. */
  timeZone?: string;
}

export interface JsonAtlasStruct {
  /** The attributes of the struct. */
  attributes?: JsonAtlasStructAttributesDictionary;
  /** The name of the type. */
  typeName?: string;
  /** ETag for concurrency control. */
  lastModifiedTS?: string;
}

export interface JsonAtlasTermAssignmentHeader {
  /** The confidence of the term assignment. */
  confidence?: number;
  /** The user who created the record. */
  createdBy?: string;
  /** The description of the term assignment. */
  description?: string;
  /** The display text. */
  displayText?: string;
  /** The expression of the term assignment. */
  expression?: string;
  /** The GUID of the relationship. */
  relationGuid?: string;
  /** The source of the term. */
  source?: string;
  /** The status of terms assignment. */
  status?: JsonAtlasTermAssignmentStatus;
  /** The steward of the term. */
  steward?: string;
  /** The GUID of the term. */
  termGuid?: string;
}

export interface JsonContactBasic {
  /** Azure Active Directory object Id. */
  id?: string;
  /** additional information to describe this contact. */
  info?: string;
}

export interface JsonAtlasEntityExtInfo {
  /** The referred entities. */
  referredEntities?: JsonAtlasEntityExtInfoReferredEntitiesDictionary;
}

export interface JsonEntityMutationResponse {
  /** A map of GUID assignments with entities. */
  guidAssignments?: JsonEntityMutationResponseGuidAssignmentsDictionary;
  /** The entity headers of mutated entities. */
  mutatedEntities?: JsonEntityMutationResponseMutatedEntitiesDictionary;
  /** An array of entity headers that partially updated. */
  partialUpdatedEntities?: JsonAtlasEntityHeader[];
}

export type JsonAtlasEntityHeader = JsonAtlasEntityHeaderBase & JsonAtlasStruct;

export interface JsonAtlasEntityHeaderBase {
  /** An array of classification names. */
  classificationNames?: string[];
  /** An array of classifications. */
  classifications?: JsonAtlasClassification[];
  /** The display text. */
  displayText?: string;
  /** The GUID of the record. */
  guid?: string;
  /** An array of meanings. */
  meaningNames?: string[];
  /** An array of term assignment headers. */
  meanings?: JsonAtlasTermAssignmentHeader[];
  /** Status of the entity - can be active or deleted. Deleted entities are not removed from Atlas store. */
  status?: JsonStatus;
}

export type JsonAtlasEntitiesWithExtInfo = JsonAtlasEntitiesWithExtInfoBase &
  JsonAtlasEntityExtInfo;

export interface JsonAtlasEntitiesWithExtInfoBase {
  /** An array of entities. */
  entities?: JsonAtlasEntity[];
}

export interface JsonClassificationAssociateRequest {
  /** An instance of a classification; it doesn't have an identity, this object exists only when associated with an entity. */
  classification?: JsonAtlasClassification;
  /** The GUID of the entity. */
  entityGuids?: string[];
}

export type JsonAtlasClassifications = JsonAtlasClassificationsBase & JsonPlist;

export interface JsonAtlasClassificationsBase {}

export interface JsonPlist {
  /** An array of objects. */
  list?: any[];
  /** The size of the page. */
  pageSize?: number;
  /** The sorted by field. */
  sortBy?: string;
  /** to specify whether the result should be sorted? If yes, whether asc or desc. */
  sortType?: JsonSortType;
  /** The start index of the page. */
  startIndex?: number;
  /** The total count of items. */
  totalCount?: number;
}

export interface JsonAtlasEntityHeaders {
  /** The description of the guid header map, */
  guidHeaderMap?: JsonAtlasEntityHeadersGuidHeaderMapDictionary;
}

export type JsonAtlasGlossary = JsonAtlasGlossaryBase &
  JsonAtlasGlossaryBaseObject;

export interface JsonAtlasGlossaryBase {
  /** An array of categories. */
  categories?: JsonAtlasRelatedCategoryHeader[];
  /** The language of the glossary. */
  language?: string;
  /** An array of related term headers. */
  terms?: JsonAtlasRelatedTermHeader[];
  /** The usage of the glossary. */
  usage?: string;
}

export interface JsonAtlasRelatedCategoryHeader {
  /** The GUID of the category. */
  categoryGuid?: string;
  /** The description of the category header. */
  description?: string;
  /** The display text. */
  displayText?: string;
  /** The GUID of the parent category. */
  parentCategoryGuid?: string;
  /** The GUID of the relationship. */
  relationGuid?: string;
}

export interface JsonAtlasRelatedTermHeader {
  /** The description of the related term. */
  description?: string;
  /** The display text. */
  displayText?: string;
  /** The expression of the term. */
  expression?: string;
  /** The GUID of the relationship. */
  relationGuid?: string;
  /** The source of the term. */
  source?: string;
  /** The status of term relationship. */
  status?: JsonAtlasTermRelationshipStatus;
  /** The steward of the term. */
  steward?: string;
  /** The GUID of the term. */
  termGuid?: string;
}

export type JsonAtlasGlossaryBaseObject = JsonAtlasGlossaryBaseObjectBase &
  JsonAtlasBaseModelObject;

export interface JsonAtlasGlossaryBaseObjectBase {
  /** An array of classifications. */
  classifications?: JsonAtlasClassification[];
  /** The long version description. */
  longDescription?: string;
  /** The name of the glossary object. */
  name?: string;
  /** The qualified name of the glossary object. */
  qualifiedName?: string;
  /** The short version of description. */
  shortDescription?: string;
  /** ETag for concurrency control. */
  lastModifiedTS?: string;
}

export interface JsonAtlasBaseModelObject {
  /** The GUID of the object. */
  guid?: string;
}

export type JsonAtlasGlossaryCategory = JsonAtlasGlossaryCategoryBase &
  JsonAtlasGlossaryBaseObject;

export interface JsonAtlasGlossaryCategoryBase {
  /** The glossary header with basic information. */
  anchor?: JsonAtlasGlossaryHeader;
  /** An array of children categories. */
  childrenCategories?: JsonAtlasRelatedCategoryHeader[];
  /** The header of the related category. */
  parentCategory?: JsonAtlasRelatedCategoryHeader;
  /** An array of related term headers. */
  terms?: JsonAtlasRelatedTermHeader[];
}

export interface JsonAtlasGlossaryHeader {
  /** The display text. */
  displayText?: string;
  /** The GUID of the glossary. */
  glossaryGuid?: string;
  /** The GUID of the relationship. */
  relationGuid?: string;
}

export type JsonAtlasGlossaryTerm = JsonAtlasGlossaryTermBase &
  JsonAtlasGlossaryBaseObject;

export interface JsonAtlasGlossaryTermBase {
  /** The abbreviation of the term. */
  abbreviation?: string;
  /** */
  templateName?: any[];
  /** The glossary header with basic information. */
  anchor?: JsonAtlasGlossaryHeader;
  /** An array of related term headers as antonyms. */
  antonyms?: JsonAtlasRelatedTermHeader[];
  /** The created time of the record. */
  createTime?: number;
  /** The user who created the record. */
  createdBy?: string;
  /** The update time of the record. */
  updateTime?: number;
  /** The user who updated the record. */
  updatedBy?: string;
  /** Status of the AtlasGlossaryTerm */
  status?: JsonTermStatus;
  /** An array of resource link for term */
  resources?: JsonResourceLink[];
  /** The dictionary of contacts for terms. Key could be Expert or Steward. */
  contacts?: JsonAtlasGlossaryTermContactsDictionary;
  /**
   * The custom attributes of the term, which is map<string,map<string,object>>.
   * The key of the first layer map is term template name.
   */
  attributes?: JsonTermCustomAttributesDictionary;
  /** An array of related object IDs. */
  assignedEntities?: JsonAtlasRelatedObjectId[];
  /** An array of term categorization headers. */
  categories?: JsonAtlasTermCategorizationHeader[];
  /** An array of related term headers. */
  classifies?: JsonAtlasRelatedTermHeader[];
  /** An array of examples. */
  examples?: string[];
  /** An array of related term headers indicating the is-a relationship. */
  isA?: JsonAtlasRelatedTermHeader[];
  /** An array of preferred related term headers. */
  preferredTerms?: JsonAtlasRelatedTermHeader[];
  /** An array of related term headers that are preferred to. */
  preferredToTerms?: JsonAtlasRelatedTermHeader[];
  /** An array of related term headers that are replaced by. */
  replacedBy?: JsonAtlasRelatedTermHeader[];
  /** An array of related term headers for replacement. */
  replacementTerms?: JsonAtlasRelatedTermHeader[];
  /** An array of related term headers for see also. */
  seeAlso?: JsonAtlasRelatedTermHeader[];
  /** An array of related term headers as synonyms. */
  synonyms?: JsonAtlasRelatedTermHeader[];
  /** An array of translated related term headers. */
  translatedTerms?: JsonAtlasRelatedTermHeader[];
  /** An array of related term headers for translation. */
  translationTerms?: JsonAtlasRelatedTermHeader[];
  /** The usage of the term. */
  usage?: string;
  /** An array of related term headers as valid values. */
  validValues?: JsonAtlasRelatedTermHeader[];
  /** An array of related term headers as valid values for other records. */
  validValuesFor?: JsonAtlasRelatedTermHeader[];
}

export interface JsonResourceLink {
  /** Display name for url. */
  displayName?: string;
  /** web url. http or https */
  url?: string;
}

export type JsonAtlasRelatedObjectId = JsonAtlasRelatedObjectIdBase &
  JsonAtlasObjectId;

export interface JsonAtlasRelatedObjectIdBase {
  /** The display text. */
  displayText?: string;
  /** Status of the entity - can be active or deleted. Deleted entities are not removed from Atlas store. */
  entityStatus?: JsonStatus;
  /** */
  relationshipType?: string;
  /** Captures details of struct contents. Not instantiated directly, used only via AtlasEntity, AtlasClassification. */
  relationshipAttributes?: JsonAtlasStruct;
  /** The GUID of the relationship. */
  relationshipGuid?: string;
  /** The enum of relationship status. */
  relationshipStatus?: JsonStatusAtlasRelationship;
}

export interface JsonAtlasObjectId {
  /** The GUID of the object. */
  guid?: string;
  /** The name of the type. */
  typeName?: string;
  /** The unique attributes of the object. */
  uniqueAttributes?: JsonAtlasObjectIdUniqueAttributesDictionary;
}

export interface JsonAtlasTermCategorizationHeader {
  /** The GUID of the category. */
  categoryGuid?: string;
  /** The description of the record. */
  description?: string;
  /** The display text. */
  displayText?: string;
  /** The GUID of the relationship. */
  relationGuid?: string;
  /** The status of term relationship. */
  status?: JsonAtlasTermRelationshipStatus;
}

export type JsonAtlasGlossaryExtInfo = JsonAtlasGlossaryExtInfoBase &
  JsonAtlasGlossary;

export interface JsonAtlasGlossaryExtInfoBase {
  /** The glossary category information. */
  categoryInfo?: JsonAtlasGlossaryExtInfoCategoryInfoDictionary;
  /** The glossary term information. */
  termInfo?: JsonAtlasGlossaryExtInfoTermInfoDictionary;
}

export interface JsonImportCSVOperation {
  /** guid string */
  id?: string;
  /** Enum of the status of import csv operation. */
  status?: JsonImportCSVOperationStatus;
  /** The created time of the record. */
  createTime?: string;
  /** The last updated time of the record. */
  lastUpdateTime?: string;
  /** */
  properties?: JsonImportCSVOperationProperties;
  /** */
  error?: JsonImportCSVOperationError;
}

export interface JsonImportCSVOperationProperties {
  /** Term numbers that already imported successfully */
  importedTerms?: string;
  /** Total term numbers that detected in csv */
  totalTermsDetected?: string;
}

export interface JsonImportCSVOperationError {
  /** Error code from async import job if fail */
  errorCode?: number;
  /** Error message from async import job if fail */
  errorMessage?: string;
}

export interface JsonSearchRequest {
  /** The keywords applied to all searchable fields. */
  keywords?: string;
  /** The offset. The default value is 0. */
  offset?: number;
  /** The limit of the number of the search result. default value is 50; maximum value is 1000. */
  limit?: number;
  /** The filter for the search. See examples for the usage of supported filters. */
  filter?: any;
  /** */
  facets?: JsonSearchFacetItem[];
  /** */
  taxonomySetting?: JsonSearchRequestTaxonomySetting;
}

export interface JsonSearchFacetItem {
  /** The count of the facet item. */
  count?: number;
  /** The name of the facet item. */
  facet?: string;
  /** Any object */
  sort?: any;
}

export interface JsonSearchRequestTaxonomySetting {
  /** */
  assetTypes?: string[];
  /** The content of a search facet result item. */
  facet?: JsonSearchFacetItem;
}

export interface JsonSearchResult {
  /** The total number of search results (not the number of documents in a single page). */
  searchCount?: number;
  /** A facet list that consists of index fields assetType ,classification, classificationCategory, contactId, fileExtension, label, and label. When the facet is specified in the request, the value of the facet is returned as an element of @search.facets. */
  searchFacets?: JsonSearchFacetResultValue;
  /** */
  value?: JsonSearchResultValue[];
}

export interface JsonSearchFacetResultValue {
  /** */
  assetType?: JsonSearchFacetItemValue[];
  /** */
  classification?: JsonSearchFacetItemValue[];
  /** */
  classificationCategory?: JsonSearchFacetItemValue[];
  /** */
  contactId?: JsonSearchFacetItemValue[];
  /** */
  fileExtension?: JsonSearchFacetItemValue[];
  /** */
  label?: JsonSearchFacetItemValue[];
  /** */
  term?: JsonSearchFacetItemValue[];
}

export interface JsonSearchFacetItemValue {
  /** The count of the facet item. */
  count?: number;
  /** The name of the facet item. */
  value?: string;
}

export interface JsonSearchResultValue {
  /** The search score calculated by the search engine. The results are ordered by search score by default. */
  searchScore?: number;
  /** A highlight list that consists of index fields id ,qualifiedName, name, description, entityType. When the keyword appears in those fields, the value of the field, attached with emphasis mark, is returned as an element of @search.highlights. */
  searchHighlights?: JsonSearchHighlights;
  /** The target text that contains the keyword as prefix. The keyword is wrapped with emphasis mark. */
  searchText?: string;
  /** The description of the record. */
  description?: string;
  /** The GUID of the record. */
  id?: string;
  /** The name of the record. */
  name?: string;
  /** The owner of the record. This is an Atlas native attribute. */
  owner?: string;
  /** The qualified name of the record. */
  qualifiedName?: string;
  /** The type name of the record. */
  entityType?: string;
  /** The classifications of the record. */
  classification?: string[];
  /** The labels of the record. */
  label?: string[];
  /** The terms assigned to the record. */
  term?: JsonTermSearchResultValue[];
  /** The contacts of the record. */
  contact?: JsonContactSearchResultValue[];
  /** The asset types of the record. */
  assetType?: string[];
}

export interface JsonSearchHighlights {
  /** */
  id?: string[];
  /** */
  qualifiedName?: string[];
  /** */
  name?: string[];
  /** */
  description?: string[];
  /** */
  entityType?: string[];
}

export interface JsonTermSearchResultValue {
  /** The name of the term. */
  name?: string;
  /** The name of the glossary which contains the term. */
  glossaryName?: string;
  /** The GUID of the term. */
  guid?: string;
}

export interface JsonContactSearchResultValue {
  /** The GUID of the contact. */
  id?: string;
  /** The description of the contact. */
  info?: string;
  /** The type of the contact. It can be Expert or Owner for an entity. It can be Expert or Steward for a glossary term. */
  contactType?: string;
}

export interface JsonSuggestRequest {
  /** The keywords applied to all fields that support suggest operation. It must be at least 1 character, and no more than 100 characters. In the index schema we defined a default suggester which lists all the supported fields and specifies a search mode. */
  keywords?: string;
  /** The number of suggestions we hope to return. The default value is 5. The value must be a number between 1 and 100. */
  limit?: number;
  /** The filter for the search. */
  filter?: any;
}

export interface JsonSuggestResult {
  /** */
  value?: JsonSuggestResultValue[];
}

export interface JsonSuggestResultValue {
  /** The search score calculated by the search engine. The results are ordered by search score by default. */
  searchScore?: number;
  /** The target text that contains the keyword as prefix. The keyword is wrapped with emphasis mark. */
  searchText?: string;
  /** The description of the record. */
  description?: string;
  /** The GUID of the record. */
  id?: string;
  /** The name of the record. */
  name?: string;
  /** The owner of the record. This is an Atlas native attribute. */
  owner?: string;
  /** The qualified name of the record. */
  qualifiedName?: string;
  /** The type name of the record. */
  entityType?: string;
  /** The classifications of the record. */
  classification?: string[];
  /** The labels of the record. */
  label?: string[];
  /** The terms assigned to the record. */
  term?: JsonTermSearchResultValue[];
  /** The contacts of the record. */
  contact?: JsonContactSearchResultValue[];
  /** The asset types of the record. */
  assetType?: string[];
}

export interface JsonAutoCompleteRequest {
  /** The keywords applied to all fields that support autocomplete operation. It must be at least 1 character, and no more than 100 characters. */
  keywords?: string;
  /** The number of autocomplete results we hope to return. The default value is 50. The value must be a number between 1 and 100. */
  limit?: number;
  /** The filter for the autocomplete request. */
  filter?: any;
}

export interface JsonAutocompleteResult {
  /** */
  value?: JsonAutocompleteResultValue[];
}

export interface JsonAutocompleteResultValue {
  /** The completed term or phrase. */
  text?: string;
  /** The completed search query text. */
  queryPlusText?: string;
}

export interface JsonAtlasLineageInfo {
  /** The GUID of the base entity. */
  baseEntityGuid?: string;
  /** The GUID entity map. */
  guidEntityMap?: JsonAtlasLineageInfoGuidEntityMapDictionary;
  /** The entity count in specific direction. */
  widthCounts?: JsonAtlasLineageInfoWidthCountsDictionary;
  /** The depth of lineage. */
  lineageDepth?: number;
  /** The width of lineage. */
  lineageWidth?: number;
  /** True to return the parent of the base entity. */
  includeParent?: boolean;
  /** The number of children node. */
  childrenCount?: number;
  /** The enum of lineage direction. */
  lineageDirection?: JsonLineageDirection;
  /** An array of parentRelations relations. */
  parentRelations?: JsonParentRelation[];
  /** An array of lineage relations. */
  relations?: JsonLineageRelation[];
}

export interface JsonParentRelation {
  /** The GUID of child entity. */
  childEntityId?: string;
  /** The GUID of relationship. */
  relationshipId?: string;
  /** The GUID of parent entity. */
  parentEntityId?: string;
}

export interface JsonLineageRelation {
  /** The GUID of from-entity. */
  fromEntityId?: string;
  /** The GUID of relationship. */
  relationshipId?: string;
  /** The GUID of to-entity. */
  toEntityId?: string;
}

export type JsonAtlasRelationship = JsonAtlasRelationshipBase & JsonAtlasStruct;

export interface JsonAtlasRelationshipBase {
  /** An array of blocked propagated classifications. */
  blockedPropagatedClassifications?: JsonAtlasClassification[];
  /** The created time of the record. */
  createTime?: number;
  /** The user who created the record. */
  createdBy?: string;
  /** Reference to an object-instance of an Atlas type - like entity. */
  end1?: JsonAtlasObjectId;
  /** Reference to an object-instance of an Atlas type - like entity. */
  end2?: JsonAtlasObjectId;
  /** The GUID of the relationship. */
  guid?: string;
  /** The home ID of the relationship. */
  homeId?: string;
  /** The label of the relationship. */
  label?: string;
  /**
   * PropagateTags indicates whether tags should propagate across the relationship instance.
   * <p>
   * Tags can propagate:
   * <p>
   * NONE - not at all <br>
   * ONE_TO_TWO - from end 1 to 2 <br>
   * TWO_TO_ONE - from end 2 to 1  <br>
   * BOTH - both ways
   * <p>
   * Care needs to be taken when specifying. The use cases we are aware of where this flag is useful:
   * <p>
   * - propagating confidentiality classifications from a table to columns - ONE_TO_TWO could be used here <br>
   * - propagating classifications around Glossary synonyms - BOTH could be used here.
   * <p>
   * There is an expectation that further enhancements will allow more granular control of tag propagation and will
   * address how to resolve conflicts.
   */
  propagateTags?: JsonPropagateTags;
  /** An array of propagated classifications. */
  propagatedClassifications?: JsonAtlasClassification[];
  /** Used to record the provenance of an instance of an entity or relationship */
  provenanceType?: number;
  /** The enum of relationship status. */
  status?: JsonStatusAtlasRelationship;
  /** The update time of the record. */
  updateTime?: number;
  /** The user who updated the record. */
  updatedBy?: string;
  /** The version of the relationship. */
  version?: number;
}

export interface JsonAtlasRelationshipWithExtInfo {
  /** The referred entity header. */
  referredEntities?: JsonAtlasRelationshipWithExtInfoReferredEntitiesDictionary;
  /** Atlas relationship instance. */
  relationship?: JsonAtlasRelationship;
}

export type JsonAtlasClassificationDef = JsonAtlasClassificationDefBase &
  JsonAtlasStructDef;

export interface JsonAtlasClassificationDefBase {
  /**
   * Specifying a list of entityType names in the classificationDef, ensures that classifications can
   * only be applied to those entityTypes.
   * <ul>
   * <li>Any subtypes of the entity types inherit the restriction</li>
   * <li>Any classificationDef subtypes inherit the parents entityTypes restrictions</li>
   * <li>Any classificationDef subtypes can further restrict the parents entityTypes restrictions by specifying a subset of the entityTypes</li>
   * <li>An empty entityTypes list when there are no parent restrictions means there are no restrictions</li>
   * <li>An empty entityTypes list when there are parent restrictions means that the subtype picks up the parents restrictions</li>
   * <li>If a list of entityTypes are supplied, where one inherits from another, this will be rejected. This should encourage cleaner classificationsDefs</li>
   * </ul>
   */
  entityTypes?: string[];
  /** An array of sub types. */
  subTypes?: string[];
  /** An array of super types. */
  superTypes?: string[];
}

export type JsonAtlasStructDef = JsonAtlasStructDefBase & JsonAtlasBaseTypeDef;

export interface JsonAtlasStructDefBase {
  /** An array of attribute definitions. */
  attributeDefs?: JsonAtlasAttributeDef[];
}

export interface JsonAtlasAttributeDef {
  /** single-valued attribute or multi-valued attribute. */
  cardinality?: JsonCardinality;
  /** An array of constraints. */
  constraints?: JsonAtlasConstraintDef[];
  /** The default value of the attribute. */
  defaultValue?: string;
  /** The description of the attribute. */
  description?: string;
  /** Determines if it is included in notification. */
  includeInNotification?: boolean;
  /** Determines if it is indexable. */
  isIndexable?: boolean;
  /** Determines if it is optional. */
  isOptional?: boolean;
  /** Determines if it unique. */
  isUnique?: boolean;
  /** The name of the attribute. */
  name?: string;
  /** The options for the attribute. */
  options?: JsonAtlasAttributeDefOptionsDictionary;
  /** The name of the type. */
  typeName?: string;
  /** The maximum count of the values. */
  valuesMaxCount?: number;
  /** The minimum count of the values. */
  valuesMinCount?: number;
}

export interface JsonAtlasConstraintDef {
  /** The parameters of the constraint definition. */
  params?: JsonAtlasConstraintDefParamsDictionary;
  /** The type of the constraint. */
  type?: string;
}

export interface JsonAtlasBaseTypeDef {
  /** The enum of type category. */
  category?: JsonTypeCategory;
  /** The created time of the record. */
  createTime?: number;
  /** The user who created the record. */
  createdBy?: string;
  /** The date format. */
  dateFormatter?: JsonDateFormat;
  /** The description of the type definition. */
  description?: string;
  /** The GUID of the type definition. */
  guid?: string;
  /** The name of the type definition. */
  name?: string;
  /** The options for the type definition. */
  options?: JsonAtlasBaseTypeDefOptionsDictionary;
  /** The service type. */
  serviceType?: string;
  /** The version of the type. */
  typeVersion?: string;
  /** The update time of the record. */
  updateTime?: number;
  /** The user who updated the record. */
  updatedBy?: string;
  /** The version of the record. */
  version?: number;
  /** ETag for concurrency control. */
  lastModifiedTS?: string;
}

export interface JsonDateFormat {
  /** An array of available locales. */
  availableLocales?: string[];
  /** */
  calendar?: number;
  /** The date format. */
  dateInstance?: JsonDateFormat;
  /** The date format. */
  dateTimeInstance?: JsonDateFormat;
  /** The date format. */
  instance?: JsonDateFormat;
  /** Determines the leniency of the date format. */
  lenient?: boolean;
  /** The number format. */
  numberFormat?: JsonNumberFormat;
  /** The date format. */
  timeInstance?: JsonDateFormat;
  /** The timezone information. */
  timeZone?: JsonTimeZone;
}

export interface JsonNumberFormat {
  /** The number format. */
  availableLocales?: string[];
  /** The currency. */
  currency?: string;
  /** The number format. */
  currencyInstance?: JsonNumberFormat;
  /** Determines if grouping is used. */
  groupingUsed?: boolean;
  /** The number format. */
  instance?: JsonNumberFormat;
  /** The number format. */
  integerInstance?: JsonNumberFormat;
  /** The maximum of fraction digits. */
  maximumFractionDigits?: number;
  /** The maximum of integer digits. */
  maximumIntegerDigits?: number;
  /** The minimum of fraction digits. */
  minimumFractionDigits?: number;
  /** The minimum of integer digits. */
  minimumIntegerDigits?: number;
  /** The number format. */
  numberInstance?: JsonNumberFormat;
  /** Determines if only integer is parsed. */
  parseIntegerOnly?: boolean;
  /** The number format. */
  percentInstance?: JsonNumberFormat;
  /** The enum of rounding mode. */
  roundingMode?: JsonRoundingMode;
}

export interface JsonTimeZone {
  /** The value of the daylight saving time. */
  dstSavings?: number;
  /** The ID of the timezone. */
  id?: string;
  /** An array of available IDs. */
  availableIds?: string[];
  /** The timezone information. */
  default?: JsonTimeZone;
  /** The display name of the timezone. */
  displayName?: string;
  /** The raw offset of the timezone. */
  rawOffset?: number;
}

export type JsonAtlasEntityDef = JsonAtlasEntityDefBase & JsonAtlasStructDef;

export interface JsonAtlasEntityDefBase {
  /** An array of sub types. */
  subTypes?: string[];
  /** An array of super types. */
  superTypes?: string[];
  /** An array of relationship attributes. */
  relationshipAttributeDefs?: JsonAtlasRelationshipAttributeDef[];
}

export type JsonAtlasRelationshipAttributeDef = JsonAtlasRelationshipAttributeDefBase &
  JsonAtlasAttributeDef;

export interface JsonAtlasRelationshipAttributeDefBase {
  /** Determines if it is a legacy attribute. */
  isLegacyAttribute?: boolean;
  /** The name of the relationship type. */
  relationshipTypeName?: string;
}

export type JsonAtlasEnumDef = JsonAtlasEnumDefBase & JsonAtlasBaseTypeDef;

export interface JsonAtlasEnumDefBase {
  /** The default value. */
  defaultValue?: string;
  /** An array of enum element definitions. */
  elementDefs?: JsonAtlasEnumElementDef[];
}

export interface JsonAtlasEnumElementDef {
  /** The description of the enum element definition. */
  description?: string;
  /** The ordinal of the enum element definition. */
  ordinal?: number;
  /** The value of the enum element definition. */
  value?: string;
}

export type JsonAtlasRelationshipDef = JsonAtlasRelationshipDefBase &
  JsonAtlasStructDef;

export interface JsonAtlasRelationshipDefBase {
  /**
   * The relationshipEndDef represents an end of the relationship. The end of the relationship is defined by a type, an
   * attribute name, cardinality and whether it  is the container end of the relationship.
   */
  endDef1?: JsonAtlasRelationshipEndDef;
  /**
   * The relationshipEndDef represents an end of the relationship. The end of the relationship is defined by a type, an
   * attribute name, cardinality and whether it  is the container end of the relationship.
   */
  endDef2?: JsonAtlasRelationshipEndDef;
  /**
   * PropagateTags indicates whether tags should propagate across the relationship instance.
   * <p>
   * Tags can propagate:
   * <p>
   * NONE - not at all <br>
   * ONE_TO_TWO - from end 1 to 2 <br>
   * TWO_TO_ONE - from end 2 to 1  <br>
   * BOTH - both ways
   * <p>
   * Care needs to be taken when specifying. The use cases we are aware of where this flag is useful:
   * <p>
   * - propagating confidentiality classifications from a table to columns - ONE_TO_TWO could be used here <br>
   * - propagating classifications around Glossary synonyms - BOTH could be used here.
   * <p>
   * There is an expectation that further enhancements will allow more granular control of tag propagation and will
   * address how to resolve conflicts.
   */
  propagateTags?: JsonPropagateTags;
  /**
   * The Relationship category determines the style of relationship around containment and lifecycle.
   * UML terminology is used for the values.
   * <p>
   * ASSOCIATION is a relationship with no containment. <br>
   * COMPOSITION and AGGREGATION are containment relationships.
   * <p>
   * The difference being in the lifecycles of the container and its children. In the COMPOSITION case,
   * the children cannot exist without the container. For AGGREGATION, the life cycles
   * of the container and children are totally independent.
   */
  relationshipCategory?: JsonRelationshipCategory;
  /** The label of the relationship. */
  relationshipLabel?: string;
}

export interface JsonAtlasRelationshipEndDef {
  /** single-valued attribute or multi-valued attribute. */
  cardinality?: JsonCardinality;
  /** The description of the relationship end definition. */
  description?: string;
  /** Determines if it is container. */
  isContainer?: boolean;
  /** Determines if it is a legacy attribute. */
  isLegacyAttribute?: boolean;
  /** The name of the relationship end definition. */
  name?: string;
  /** The type of the relationship end. */
  type?: string;
}

export type JsonAtlasTypeDef = JsonAtlasTypeDefBase &
  JsonAtlasBaseTypeDef &
  JsonAtlasExtraTypeDef;

export interface JsonAtlasTypeDefBase {}

export interface JsonAtlasExtraTypeDef {
  /**
   * Specifying a list of entityType names in the classificationDef, ensures that classifications can
   * only be applied to those entityTypes.
   * <ul>
   * <li>Any subtypes of the entity types inherit the restriction</li>
   * <li>Any classificationDef subtypes inherit the parents entityTypes restrictions</li>
   * <li>Any classificationDef subtypes can further restrict the parents entityTypes restrictions by specifying a subset of the entityTypes</li>
   * <li>An empty entityTypes list when there are no parent restrictions means there are no restrictions</li>
   * <li>An empty entityTypes list when there are parent restrictions means that the subtype picks up the parents restrictions</li>
   * <li>If a list of entityTypes are supplied, where one inherits from another, this will be rejected. This should encourage cleaner classificationsDefs</li>
   * </ul>
   */
  entityTypes?: string[];
  /** An array of sub types. */
  subTypes?: string[];
  /** An array of super types. */
  superTypes?: string[];
  /** An array of relationship attributes. */
  relationshipAttributeDefs?: JsonAtlasRelationshipAttributeDef[];
  /** The default value. */
  defaultValue?: string;
  /** An array of enum element definitions. */
  elementDefs?: JsonAtlasEnumElementDef[];
  /**
   * The relationshipEndDef represents an end of the relationship. The end of the relationship is defined by a type, an
   * attribute name, cardinality and whether it  is the container end of the relationship.
   */
  endDef1?: JsonAtlasRelationshipEndDef;
  /**
   * The relationshipEndDef represents an end of the relationship. The end of the relationship is defined by a type, an
   * attribute name, cardinality and whether it  is the container end of the relationship.
   */
  endDef2?: JsonAtlasRelationshipEndDef;
  /**
   * PropagateTags indicates whether tags should propagate across the relationship instance.
   * <p>
   * Tags can propagate:
   * <p>
   * NONE - not at all <br>
   * ONE_TO_TWO - from end 1 to 2 <br>
   * TWO_TO_ONE - from end 2 to 1  <br>
   * BOTH - both ways
   * <p>
   * Care needs to be taken when specifying. The use cases we are aware of where this flag is useful:
   * <p>
   * - propagating confidentiality classifications from a table to columns - ONE_TO_TWO could be used here <br>
   * - propagating classifications around Glossary synonyms - BOTH could be used here.
   * <p>
   * There is an expectation that further enhancements will allow more granular control of tag propagation and will
   * address how to resolve conflicts.
   */
  propagateTags?: JsonPropagateTags;
  /**
   * The Relationship category determines the style of relationship around containment and lifecycle.
   * UML terminology is used for the values.
   * <p>
   * ASSOCIATION is a relationship with no containment. <br>
   * COMPOSITION and AGGREGATION are containment relationships.
   * <p>
   * The difference being in the lifecycles of the container and its children. In the COMPOSITION case,
   * the children cannot exist without the container. For AGGREGATION, the life cycles
   * of the container and children are totally independent.
   */
  relationshipCategory?: JsonRelationshipCategory;
  /** The label of the relationship. */
  relationshipLabel?: string;
  /** An array of attribute definitions. */
  attributeDefs?: JsonAtlasAttributeDef[];
}

export interface JsonAtlasTypesDef {
  /** An array of classification definitions. */
  classificationDefs?: JsonAtlasClassificationDef[];
  /** An array of entity definitions. */
  entityDefs?: JsonAtlasEntityDef[];
  /** An array of enum definitions. */
  enumDefs?: JsonAtlasEnumDef[];
  /** An array of relationship definitions. */
  relationshipDefs?: JsonAtlasRelationshipDef[];
  /** An array of struct definitions. */
  structDefs?: JsonAtlasStructDef[];
  /** An array of term template definitions. */
  termTemplateDefs?: JsonTermTemplateDef[];
}

export type JsonTermTemplateDef = JsonTermTemplateDefBase & JsonAtlasStructDef;

export interface JsonTermTemplateDefBase {}

export interface JsonAtlasTypeDefHeader {
  /** The enum of type category. */
  category?: JsonTypeCategory;
  /** The GUID of the type definition. */
  guid?: string;
  /** The name of the type definition. */
  name?: string;
}

export interface JsonTypeStatistics {
  /** An map with type and corresponding statistics. */
  typeStatistics?: JsonTypeStatisticsDictionary;
}

export interface JsonTypeStatisticsExtraProperties {
  /** The entity count of this type. */
  count?: number;
}

export type JsonAtlasUserSavedSearch = JsonAtlasUserSavedSearchBase &
  JsonAtlasBaseModelObject;

export interface JsonAtlasUserSavedSearchBase {
  /** The name of the saved search. */
  name?: string;
  /** The owner name of the saved search. */
  ownerName?: string;
  /** The parameters used for search. */
  searchParameters?: JsonSearchParameters;
  /** The enum of saved search type. */
  searchType?: JsonSavedSearchType;
  /** The UI parameters. */
  uiParameters?: string;
}

export interface JsonSearchParameters {
  /** Attribute values included in the results */
  attributes?: string[];
  /** The classification to search. */
  classification?: string;
  /** The filter criteria with attributes and condition. */
  entityFilters?: JsonFilterCriteria;
  /** Determines if exclude deleted entities. */
  excludeDeletedEntities?: boolean;
  /** Determines if include classification attributes. */
  includeClassificationAttributes?: boolean;
  /** Determines if include sub classifications. */
  includeSubClassifications?: boolean;
  /** Determines if include sub types. */
  includeSubTypes?: boolean;
  /** The limit of the search result. */
  limit?: number;
  /** The offset of the search. */
  offset?: number;
  /** The search query. */
  query?: string;
  /** The filter criteria with attributes and condition. */
  tagFilters?: JsonFilterCriteria;
  /** The name of the term for search. */
  termName?: string;
  /** The name of the type for search. */
  typeName?: string;
}

export interface JsonFilterCriteria {
  /** The name of the attribute. */
  attributeName?: string;
  /** The value of the attribute. */
  attributeValue?: string;
  /** The enum for condition. */
  condition?: JsonCondition;
  /** An array of filter criteria. */
  criterion?: JsonFilterCriteria[];
  /**
   * Supported search operations
   * Logical comparison operators can only be used with numbers or dates
   * IN, LIKE, startsWith, endsWith, CONTAINS can only be used with strings or text
   */
  operator?: JsonOperator;
}

export interface JsonSearchFilter {
  /** Determines if get the count. */
  getCount?: boolean;
  /** The maximum of rows. */
  maxRows?: number;
  /** The parameters of the search filter. */
  params?: JsonSearchFilterParamsDictionary;
  /** The sorted by field. */
  sortBy?: string;
  /** to specify whether the result should be sorted? If yes, whether asc or desc. */
  sortType?: JsonSortType;
  /** The start index of the search. */
  startIndex?: number;
}

export interface JsonAzureCatalogUser {
  /** User ID of the Azure catalog user. */
  userId?: string;
}

export interface JsonCatalogCreationRequest {
  /** Name of the catalog. */
  catalogName?: string;
  /** ID of the catalog. */
  catalogId?: string;
  /** User ID or the creator. */
  creatorUserId?: string;
  /** The connection string of the Event Hubs. */
  eventHubConnectionString?: string;
}

export interface JsonCatalogDeletionRequest {
  /** Name of the catalog. */
  catalogName?: string;
}

export interface JsonDataScanPermissionCheckRequest {
  /** Name of the catalog. */
  catalogName?: string;
  /** User ID of the catalog. */
  userId?: string;
}

export interface JsonDataScanPermissionCheckResponse {
  /** The result of the response. */
  result?: string;
}

export interface JsonContext {
  /** The value of the context. */
  value?: string;
}

export interface JsonError {
  /** The error message. */
  errorMessage?: string;
}

export interface JsonAtlasError {
  /** Error code */
  errorCode?: string;
  /** Error message */
  errorMessage?: string;
}

export interface JsonHookNotification {
  /** Enum of hook notification type. Different behavior will be invoked by the value. */
  type?: JsonHookNotificationType;
  /** The user of the notification. Default to be "UNKNOWN". */
  user?: string;
}

export interface JsonEntityCreateRequestV2 {
  /** Enum of hook notification type. Different behavior will be invoked by the value. */
  type?: JsonHookNotificationType;
  /** The user of the notification. Default to be "UNKNOWN". */
  user?: string;
  /** An instance of an entity along with extended info - like hive_table, hive_database. */
  entities?: JsonAtlasEntitiesWithExtInfo;
}

export interface JsonEntityUpdateRequestV2 {
  /** Enum of hook notification type. Different behavior will be invoked by the value. */
  type?: JsonHookNotificationType;
  /** The user of the notification. Default to be "UNKNOWN". */
  user?: string;
  /** An instance of an entity along with extended info - like hive_table, hive_database. */
  entities?: JsonAtlasEntitiesWithExtInfo;
}

export interface JsonEntityPartialUpdateRequestV2 {
  /** Enum of hook notification type. Different behavior will be invoked by the value. */
  type?: JsonHookNotificationType;
  /** The user of the notification. Default to be "UNKNOWN". */
  user?: string;
  /** Reference to an object-instance of an Atlas type - like entity. */
  entityId?: JsonAtlasObjectId;
  /** An instance of an entity along with extended info - like hive_table, hive_database. */
  entity?: JsonAtlasEntitiesWithExtInfo;
}

export interface JsonEntityDeleteRequestV2 {
  /** Enum of hook notification type. Different behavior will be invoked by the value. */
  type?: JsonHookNotificationType;
  /** The user of the notification. Default to be "UNKNOWN". */
  user?: string;
  /** */
  entities?: JsonAtlasObjectId[];
}

export interface JsonRoleAssignmentEntry {
  /** The object ID of the AAD user. */
  principalId?: string;
  /** The name of the role. */
  role?: string;
}

export interface JsonUpdateRoleAssignmentRequest {
  /** */
  roleAssignmentList?: JsonRoleAssignmentEntry[];
}

export interface JsonListRoleAssignmentResponse {
  /** */
  roleAssignmentList?: JsonRoleAssignmentEntry[];
}

export interface XmlNs0Plist {
  /** An array of objects. */
  list?: any[];
  /** The size of the page. */
  pageSize?: number;
  /** The sorted by field. */
  sortBy?: string;
  /** to specify whether the result should be sorted? If yes, whether asc or desc. */
  sortType?: XmlNs0SortType;
  /** The start index of the page. */
  startIndex?: number;
  /** The total count of items. */
  totalCount?: number;
}

export interface XmlNs0SearchFilter {
  /** Determines if get the count. */
  getCount?: boolean;
  /** The maximum of rows. */
  maxRows?: number;
  /** The parameter of the search. */
  params?: any;
  /** The sorted by field. */
  sortBy?: string;
  /** to specify whether the result should be sorted? If yes, whether asc or desc. */
  sortType?: XmlNs0SortType;
  /** The start index of the search. */
  startIndex?: number;
}

export interface XmlNs0TimeBoundary {
  /** The end of the time boundary. */
  endTime?: string;
  /** The start of the time boundary. */
  startTime?: string;
  /** The timezone of the time boundary. */
  timeZone?: string;
}

export interface Paths113Wj49GlossaryGlossaryguidTermsImportPostRequestbodyContentMultipartFormDataSchema {
  /** The csv file to import glossary terms from. */
  file: string;
}

export interface Paths1Fy5A17GlossaryNameGlossarynameTermsImportPostRequestbodyContentMultipartFormDataSchema {
  /** The csv file to import glossary terms from. */
  file: string;
}

export type JsonStatus = "ACTIVE" | "DELETED";
export type JsonAtlasTermAssignmentStatus =
  | "DISCOVERED"
  | "PROPOSED"
  | "IMPORTED"
  | "VALIDATED"
  | "DEPRECATED"
  | "OBSOLETE"
  | "OTHER";
export type JsonSortType = "NONE" | "ASC" | "DESC";
export type JsonAtlasTermRelationshipStatus =
  | "DRAFT"
  | "ACTIVE"
  | "DEPRECATED"
  | "OBSOLETE"
  | "OTHER";
export type JsonTermStatus = "Draft" | "Approved" | "Alert" | "Expired";
export type JsonStatusAtlasRelationship = "ACTIVE" | "DELETED";
export type JsonImportCSVOperationStatus =
  | "INIT"
  | "SUCCEED"
  | "FAILED"
  | "RUNNING";
export type Enum7 = "BOTH" | "INPUT" | "OUTPUT";
export type JsonLineageDirection = "INPUT" | "OUTPUT" | "BOTH";
export type JsonPropagateTags = "NONE" | "ONE_TO_TWO" | "TWO_TO_ONE" | "BOTH";
export type JsonCardinality = "SINGLE" | "LIST" | "SET";
export type JsonTypeCategory =
  | "PRIMITIVE"
  | "OBJECT_ID_TYPE"
  | "ENUM"
  | "STRUCT"
  | "CLASSIFICATION"
  | "ENTITY"
  | "ARRAY"
  | "MAP"
  | "RELATIONSHIP"
  | "TERM_TEMPLATE";
export type JsonRoundingMode =
  | "UP"
  | "DOWN"
  | "CEILING"
  | "FLOOR"
  | "HALF_UP"
  | "HALF_DOWN"
  | "HALF_EVEN"
  | "UNNECESSARY";
export type JsonRelationshipCategory =
  | "ASSOCIATION"
  | "AGGREGATION"
  | "COMPOSITION";
export type Enum14 =
  | "enum"
  | "entity"
  | "classification"
  | "relationship"
  | "struct"
  | "term_template";
export type JsonCondition = "AND" | "OR";
export type JsonOperator =
  | "LT"
  | "GT"
  | "LTE"
  | "GTE"
  | "EQ"
  | "NEQ"
  | "IN"
  | "LIKE"
  | "STARTS_WITH"
  | "ENDS_WITH"
  | "CONTAINS"
  | "CONTAINS_ANY"
  | "CONTAINS_ALL"
  | "IS_NULL"
  | "NOT_NULL";
export type JsonSavedSearchType = "BASIC" | "ADVANCED";
export type JsonHookNotificationType =
  | "TYPE_CREATE"
  | "TYPE_UPDATE"
  | "ENTITY_CREATE"
  | "ENTITY_PARTIAL_UPDATE"
  | "ENTITY_FULL_UPDATE"
  | "ENTITY_DELETE"
  | "ENTITY_CREATE_V2"
  | "ENTITY_PARTIAL_UPDATE_V2"
  | "ENTITY_FULL_UPDATE_V2"
  | "ENTITY_DELETE_V2";
export type XmlNs0SortType = "NONE" | "ASC" | "DESC";
export type JsonEntityOperation =
  | "CREATE"
  | "UPDATE"
  | "PARTIAL_UPDATE"
  | "DELETE";
export type JsonRelation =
  | "SEE_ALSO"
  | "SYNONYMS"
  | "ANTONYMS"
  | "PREFERRED_TO_TERMS"
  | "PREFERRED_TERMS"
  | "REPLACEMENT_TERMS"
  | "REPLACED_BY"
  | "TRANSLATION_TERMS"
  | "TRANSLATED_TERMS"
  | "ISA"
  | "CLASSIFIES"
  | "VALID_VALUES"
  | "VALID_VALUES_FOR";
export type JsonAtlasClassificationSourceDetailsDictionary = Record<
  string,
  any
>;
export type JsonAtlasStructAttributesDictionary = Record<string, any>;
export type JsonAtlasEntityRelationshipAttributesDictionary = Record<
  string,
  any
>;
export type JsonAtlasEntitySourceDetailsDictionary = Record<string, any>;
export type JsonAtlasEntityContactsDictionary = Record<
  string,
  JsonContactBasic[]
>;
export type JsonAtlasEntityExtInfoReferredEntitiesDictionary = Record<
  string,
  JsonAtlasEntity
>;
export type JsonEntityMutationResponseGuidAssignmentsDictionary = Record<
  string,
  string
>;
export type JsonEntityMutationResponseMutatedEntitiesDictionary = Record<
  string,
  JsonAtlasEntityHeader[]
>;
export type JsonAtlasEntityHeadersGuidHeaderMapDictionary = Record<
  string,
  JsonAtlasEntityHeader
>;
export type DictionaryOfStringDictionary = Record<string, string>;
export type DictionaryOfpathsCic80AAtlasV2GlossaryCategoryCategoryguidRelatedGetResponses200ContentApplicationJsonSchemaAdditionalpropertiesDictionary = Record<
  string,
  JsonAtlasRelatedCategoryHeader[]
>;
export type JsonAtlasGlossaryTermContactsDictionary = Record<
  string,
  JsonContactBasic[]
>;
export type JsonTermCustomAttributesExtraPropertiesDictionary = Record<
  string,
  any
>;
export type JsonTermCustomAttributesDictionary = Record<
  string,
  JsonTermCustomAttributesExtraPropertiesDictionary
>;
export type JsonAtlasObjectIdUniqueAttributesDictionary = Record<string, any>;
export type DictionaryOfpathsV84KwqAtlasV2GlossaryTermsTermguidRelatedGetResponses200ContentApplicationJsonSchemaAdditionalpropertiesDictionary = Record<
  string,
  JsonAtlasRelatedTermHeader[]
>;
export type JsonAtlasGlossaryExtInfoCategoryInfoDictionary = Record<
  string,
  JsonAtlasGlossaryCategory
>;
export type JsonAtlasGlossaryExtInfoTermInfoDictionary = Record<
  string,
  JsonAtlasGlossaryTerm
>;
export type JsonAtlasLineageInfoGuidEntityMapDictionary = Record<
  string,
  JsonAtlasEntityHeader
>;
export type JsonAtlasLineageInfoExtraPropertiesDictionary = Record<string, any>;
export type JsonAtlasLineageInfoWidthCountsDictionary = Record<
  string,
  JsonAtlasLineageInfoExtraPropertiesDictionary
>;
export type JsonAtlasRelationshipWithExtInfoReferredEntitiesDictionary = Record<
  string,
  JsonAtlasEntityHeader
>;
export type JsonAtlasConstraintDefParamsDictionary = Record<string, any>;
export type JsonAtlasAttributeDefOptionsDictionary = Record<string, string>;
export type JsonAtlasBaseTypeDefOptionsDictionary = Record<string, string>;
export type JsonTypeStatisticsDictionary = Record<
  string,
  JsonTypeStatisticsExtraProperties
>;
export type JsonSearchFilterParamsDictionary = Record<string, string[]>;
