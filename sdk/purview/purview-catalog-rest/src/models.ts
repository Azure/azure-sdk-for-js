// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export type AtlasEntityWithExtInfo = AtlasEntityWithExtInfoBase &
  AtlasEntityExtInfo;

export interface AtlasEntityWithExtInfoBase {
  /** An instance of an entity - like hive_table, hive_database. */
  entity?: AtlasEntity;
}

export type AtlasEntity = AtlasEntityBase & AtlasStruct;

export interface AtlasEntityBase {
  /** An array of classifications. */
  classifications?: AtlasClassification[];
  /** The created time of the record. */
  createTime?: number;
  /** The user who created the record. */
  createdBy?: string;
  /** The GUID of the entity. */
  guid?: string;
  /** The home ID of the entity. */
  homeId?: string;
  /** An array of term assignment headers indicating the meanings of the entity. */
  meanings?: AtlasTermAssignmentHeader[];
  /** Used to record the provenance of an instance of an entity or relationship. */
  provenanceType?: number;
  /** Determines if there's a proxy. */
  proxy?: boolean;
  /** The attributes of relationship. */
  relationshipAttributes?: AtlasEntityRelationshipAttributesDictionary;
  /** Status of the entity - can be active or deleted. Deleted entities are not removed from Atlas store. */
  status?: Status;
  /** The update time of the record. */
  updateTime?: number;
  /** The user who updated the record. */
  updatedBy?: string;
  /** The version of the entity. */
  version?: number;
  /** indicate the source who create the classification detail */
  source?: string;
  /** more detail on source information */
  sourceDetails?: AtlasEntitySourceDetailsDictionary;
  /** The dictionary of contacts for terms. Key could be Expert or Owner. */
  contacts?: AtlasEntityContactsDictionary;
}

export type AtlasClassification = AtlasClassificationBase & AtlasStruct;

export interface AtlasClassificationBase {
  /** The GUID of the entity. */
  entityGuid?: string;
  /** Status of the entity - can be active or deleted. Deleted entities are not removed from Atlas store. */
  entityStatus?: Status;
  /** Determines if propagations will be removed on entity deletion. */
  removePropagationsOnEntityDelete?: boolean;
  /** An array of time boundaries indicating validity periods. */
  validityPeriods?: TimeBoundary[];
  /** indicate the source who create the classification detail */
  source?: string;
  /** more detail on source information */
  sourceDetails?: AtlasClassificationSourceDetailsDictionary;
}

export interface TimeBoundary {
  /** The end of the time boundary. */
  endTime?: string;
  /** The start of the time boundary. */
  startTime?: string;
  /** The timezone of the time boundary. */
  timeZone?: string;
}

export interface AtlasStruct {
  /** The attributes of the struct. */
  attributes?: AtlasStructAttributesDictionary;
  /** The name of the type. */
  typeName?: string;
  /** ETag for concurrency control. */
  lastModifiedTS?: string;
}

export interface AtlasTermAssignmentHeader {
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
  status?: AtlasTermAssignmentStatus;
  /** The steward of the term. */
  steward?: string;
  /** The GUID of the term. */
  termGuid?: string;
}

export interface ContactBasic {
  /** Azure Active Directory object Id. */
  id?: string;
  /** additional information to describe this contact. */
  info?: string;
}

export interface AtlasEntityExtInfo {
  /** The referred entities. */
  referredEntities?: AtlasEntityExtInfoReferredEntitiesDictionary;
}

export interface EntityMutationResponse {
  /** A map of GUID assignments with entities. */
  guidAssignments?: EntityMutationResponseGuidAssignmentsDictionary;
  /** The entity headers of mutated entities. */
  mutatedEntities?: EntityMutationResponseMutatedEntitiesDictionary;
  /** An array of entity headers that partially updated. */
  partialUpdatedEntities?: AtlasEntityHeader[];
}

export type AtlasEntityHeader = AtlasEntityHeaderBase & AtlasStruct;

export interface AtlasEntityHeaderBase {
  /** An array of classification names. */
  classificationNames?: string[];
  /** An array of classifications. */
  classifications?: AtlasClassification[];
  /** The display text. */
  displayText?: string;
  /** The GUID of the record. */
  guid?: string;
  /** An array of meanings. */
  meaningNames?: string[];
  /** An array of term assignment headers. */
  meanings?: AtlasTermAssignmentHeader[];
  /** Status of the entity - can be active or deleted. Deleted entities are not removed from Atlas store. */
  status?: Status;
}

export type AtlasEntitiesWithExtInfo = AtlasEntitiesWithExtInfoBase &
  AtlasEntityExtInfo;

export interface AtlasEntitiesWithExtInfoBase {
  /** An array of entities. */
  entities?: AtlasEntity[];
}

export interface ClassificationAssociateRequest {
  /** An instance of a classification; it doesn't have an identity, this object exists only when associated with an entity. */
  classification?: AtlasClassification;
  /** The GUID of the entity. */
  entityGuids?: string[];
}

export type AtlasClassifications = AtlasClassificationsBase & PList;

export interface AtlasClassificationsBase {}

export interface PList {
  /** An array of objects. */
  list?: any[];
  /** The size of the page. */
  pageSize?: number;
  /** The sorted by field. */
  sortBy?: string;
  /** to specify whether the result should be sorted? If yes, whether asc or desc. */
  sortType?: SortType;
  /** The start index of the page. */
  startIndex?: number;
  /** The total count of items. */
  totalCount?: number;
}

export interface AtlasEntityHeaders {
  /** The description of the guid header map, */
  guidHeaderMap?: AtlasEntityHeadersGuidHeaderMapDictionary;
}

export type AtlasGlossary = AtlasGlossaryBase & AtlasGlossaryBaseObject;

export interface AtlasGlossaryBase {
  /** An array of categories. */
  categories?: AtlasRelatedCategoryHeader[];
  /** The language of the glossary. */
  language?: string;
  /** An array of related term headers. */
  terms?: AtlasRelatedTermHeader[];
  /** The usage of the glossary. */
  usage?: string;
}

export interface AtlasRelatedCategoryHeader {
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

export interface AtlasRelatedTermHeader {
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
  status?: AtlasTermRelationshipStatus;
  /** The steward of the term. */
  steward?: string;
  /** The GUID of the term. */
  termGuid?: string;
}

export type AtlasGlossaryBaseObject = AtlasGlossaryBaseObjectBase &
  AtlasBaseModelObject;

export interface AtlasGlossaryBaseObjectBase {
  /** An array of classifications. */
  classifications?: AtlasClassification[];
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

export interface AtlasBaseModelObject {
  /** The GUID of the object. */
  guid?: string;
}

export type AtlasGlossaryCategory = AtlasGlossaryCategoryBase &
  AtlasGlossaryBaseObject;

export interface AtlasGlossaryCategoryBase {
  /** The glossary header with basic information. */
  anchor?: AtlasGlossaryHeader;
  /** An array of children categories. */
  childrenCategories?: AtlasRelatedCategoryHeader[];
  /** The header of the related category. */
  parentCategory?: AtlasRelatedCategoryHeader;
  /** An array of related term headers. */
  terms?: AtlasRelatedTermHeader[];
}

export interface AtlasGlossaryHeader {
  /** The display text. */
  displayText?: string;
  /** The GUID of the glossary. */
  glossaryGuid?: string;
  /** The GUID of the relationship. */
  relationGuid?: string;
}

export type AtlasGlossaryTerm = AtlasGlossaryTermBase & AtlasGlossaryBaseObject;

export interface AtlasGlossaryTermBase {
  /** The abbreviation of the term. */
  abbreviation?: string;
  templateName?: any[];
  /** The glossary header with basic information. */
  anchor?: AtlasGlossaryHeader;
  /** An array of related term headers as antonyms. */
  antonyms?: AtlasRelatedTermHeader[];
  /** The created time of the record. */
  createTime?: number;
  /** The user who created the record. */
  createdBy?: string;
  /** The update time of the record. */
  updateTime?: number;
  /** The user who updated the record. */
  updatedBy?: string;
  /** Status of the AtlasGlossaryTerm */
  status?: TermStatus;
  /** An array of resource link for term */
  resources?: ResourceLink[];
  /** The dictionary of contacts for terms. Key could be Expert or Steward. */
  contacts?: AtlasGlossaryTermContactsDictionary;
  /**
   * The custom attributes of the term, which is map<string,map<string,object>>.
   * The key of the first layer map is term template name.
   */
  attributes?: TermCustomAttributesDictionary;
  /** An array of related object IDs. */
  assignedEntities?: AtlasRelatedObjectId[];
  /** An array of term categorization headers. */
  categories?: AtlasTermCategorizationHeader[];
  /** An array of related term headers. */
  classifies?: AtlasRelatedTermHeader[];
  /** An array of examples. */
  examples?: string[];
  /** An array of related term headers indicating the is-a relationship. */
  isA?: AtlasRelatedTermHeader[];
  /** An array of preferred related term headers. */
  preferredTerms?: AtlasRelatedTermHeader[];
  /** An array of related term headers that are preferred to. */
  preferredToTerms?: AtlasRelatedTermHeader[];
  /** An array of related term headers that are replaced by. */
  replacedBy?: AtlasRelatedTermHeader[];
  /** An array of related term headers for replacement. */
  replacementTerms?: AtlasRelatedTermHeader[];
  /** An array of related term headers for see also. */
  seeAlso?: AtlasRelatedTermHeader[];
  /** An array of related term headers as synonyms. */
  synonyms?: AtlasRelatedTermHeader[];
  /** An array of translated related term headers. */
  translatedTerms?: AtlasRelatedTermHeader[];
  /** An array of related term headers for translation. */
  translationTerms?: AtlasRelatedTermHeader[];
  /** The usage of the term. */
  usage?: string;
  /** An array of related term headers as valid values. */
  validValues?: AtlasRelatedTermHeader[];
  /** An array of related term headers as valid values for other records. */
  validValuesFor?: AtlasRelatedTermHeader[];
}

export interface ResourceLink {
  /** Display name for url. */
  displayName?: string;
  /** web url. http or https */
  url?: string;
}

export type AtlasRelatedObjectId = AtlasRelatedObjectIdBase & AtlasObjectId;

export interface AtlasRelatedObjectIdBase {
  /** The display text. */
  displayText?: string;
  /** Status of the entity - can be active or deleted. Deleted entities are not removed from Atlas store. */
  entityStatus?: Status;
  relationshipType?: string;
  /** Captures details of struct contents. Not instantiated directly, used only via AtlasEntity, AtlasClassification. */
  relationshipAttributes?: AtlasStruct;
  /** The GUID of the relationship. */
  relationshipGuid?: string;
  /** The enum of relationship status. */
  relationshipStatus?: StatusAtlasRelationship;
}

export interface AtlasObjectId {
  /** The GUID of the object. */
  guid?: string;
  /** The name of the type. */
  typeName?: string;
  /** The unique attributes of the object. */
  uniqueAttributes?: AtlasObjectIdUniqueAttributesDictionary;
}

export interface AtlasTermCategorizationHeader {
  /** The GUID of the category. */
  categoryGuid?: string;
  /** The description of the record. */
  description?: string;
  /** The display text. */
  displayText?: string;
  /** The GUID of the relationship. */
  relationGuid?: string;
  /** The status of term relationship. */
  status?: AtlasTermRelationshipStatus;
}

export type AtlasGlossaryExtInfo = AtlasGlossaryExtInfoBase & AtlasGlossary;

export interface AtlasGlossaryExtInfoBase {
  /** The glossary category information. */
  categoryInfo?: AtlasGlossaryExtInfoCategoryInfoDictionary;
  /** The glossary term information. */
  termInfo?: AtlasGlossaryExtInfoTermInfoDictionary;
}

export interface ImportCSVOperation {
  /** guid string */
  id?: string;
  /** Enum of the status of import csv operation. */
  status?: ImportCSVOperationStatus;
  /** The created time of the record. */
  createTime?: string;
  /** The last updated time of the record. */
  lastUpdateTime?: string;
  properties?: ImportCSVOperationProperties;
  error?: ImportCSVOperationError;
}

export interface ImportCSVOperationProperties {
  /** Term numbers that already imported successfully */
  importedTerms?: string;
  /** Total term numbers that detected in csv */
  totalTermsDetected?: string;
}

export interface ImportCSVOperationError {
  /** Error code from async import job if fail */
  errorCode?: number;
  /** Error message from async import job if fail */
  errorMessage?: string;
}

export interface SearchRequest {
  /** The keywords applied to all searchable fields. */
  keywords?: string;
  /** The offset. The default value is 0. */
  offset?: number;
  /** The limit of the number of the search result. default value is 50; maximum value is 1000. */
  limit?: number;
  /** The filter for the search. See examples for the usage of supported filters. */
  filter?: any;
  facets?: SearchFacetItem[];
  taxonomySetting?: SearchRequestTaxonomySetting;
}

export interface SearchFacetItem {
  /** The count of the facet item. */
  count?: number;
  /** The name of the facet item. */
  facet?: string;
  /** Any object */
  sort?: any;
}

export interface SearchRequestTaxonomySetting {
  assetTypes?: string[];
  /** The content of a search facet result item. */
  facet?: SearchFacetItem;
}

export interface SearchResult {
  /** The total number of search results (not the number of documents in a single page). */
  searchCount?: number;
  /** A facet list that consists of index fields assetType ,classification, classificationCategory, contactId, fileExtension, label, and label. When the facet is specified in the request, the value of the facet is returned as an element of @search.facets. */
  searchFacets?: SearchFacetResultValue;
  value?: SearchResultValue[];
}

export interface SearchFacetResultValue {
  assetType?: SearchFacetItemValue[];
  classification?: SearchFacetItemValue[];
  classificationCategory?: SearchFacetItemValue[];
  contactId?: SearchFacetItemValue[];
  fileExtension?: SearchFacetItemValue[];
  label?: SearchFacetItemValue[];
  term?: SearchFacetItemValue[];
}

export interface SearchFacetItemValue {
  /** The count of the facet item. */
  count?: number;
  /** The name of the facet item. */
  value?: string;
}

export interface SearchResultValue {
  /** The search score calculated by the search engine. The results are ordered by search score by default. */
  searchScore?: number;
  /** A highlight list that consists of index fields id ,qualifiedName, name, description, entityType. When the keyword appears in those fields, the value of the field, attached with emphasis mark, is returned as an element of @search.highlights. */
  searchHighlights?: SearchHighlights;
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
  term?: TermSearchResultValue[];
  /** The contacts of the record. */
  contact?: ContactSearchResultValue[];
  /** The asset types of the record. */
  assetType?: string[];
}

export interface SearchHighlights {
  id?: string[];
  qualifiedName?: string[];
  name?: string[];
  description?: string[];
  entityType?: string[];
}

export interface TermSearchResultValue {
  /** The name of the term. */
  name?: string;
  /** The name of the glossary which contains the term. */
  glossaryName?: string;
  /** The GUID of the term. */
  guid?: string;
}

export interface ContactSearchResultValue {
  /** The GUID of the contact. */
  id?: string;
  /** The description of the contact. */
  info?: string;
  /** The type of the contact. It can be Expert or Owner for an entity. It can be Expert or Steward for a glossary term. */
  contactType?: string;
}

export interface SuggestRequest {
  /** The keywords applied to all fields that support suggest operation. It must be at least 1 character, and no more than 100 characters. In the index schema we defined a default suggester which lists all the supported fields and specifies a search mode. */
  keywords?: string;
  /** The number of suggestions we hope to return. The default value is 5. The value must be a number between 1 and 100. */
  limit?: number;
  /** The filter for the search. */
  filter?: any;
}

export interface SuggestResult {
  value?: SuggestResultValue[];
}

export interface SuggestResultValue {
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
  term?: TermSearchResultValue[];
  /** The contacts of the record. */
  contact?: ContactSearchResultValue[];
  /** The asset types of the record. */
  assetType?: string[];
}

export interface AutoCompleteRequest {
  /** The keywords applied to all fields that support autocomplete operation. It must be at least 1 character, and no more than 100 characters. */
  keywords?: string;
  /** The number of autocomplete results we hope to return. The default value is 50. The value must be a number between 1 and 100. */
  limit?: number;
  /** The filter for the autocomplete request. */
  filter?: any;
}

export interface AutoCompleteResult {
  value?: AutoCompleteResultValue[];
}

export interface AutoCompleteResultValue {
  /** The completed term or phrase. */
  text?: string;
  /** The completed search query text. */
  queryPlusText?: string;
}

export interface AtlasLineageInfo {
  /** The GUID of the base entity. */
  baseEntityGuid?: string;
  /** The GUID entity map. */
  guidEntityMap?: AtlasLineageInfoGuidEntityMapDictionary;
  /** The entity count in specific direction. */
  widthCounts?: AtlasLineageInfoWidthCountsDictionary;
  /** The depth of lineage. */
  lineageDepth?: number;
  /** The width of lineage. */
  lineageWidth?: number;
  /** True to return the parent of the base entity. */
  includeParent?: boolean;
  /** The number of children node. */
  childrenCount?: number;
  /** The enum of lineage direction. */
  lineageDirection?: LineageDirection;
  /** An array of parentRelations relations. */
  parentRelations?: ParentRelation[];
  /** An array of lineage relations. */
  relations?: LineageRelation[];
}

export interface ParentRelation {
  /** The GUID of child entity. */
  childEntityId?: string;
  /** The GUID of relationship. */
  relationshipId?: string;
  /** The GUID of parent entity. */
  parentEntityId?: string;
}

export interface LineageRelation {
  /** The GUID of from-entity. */
  fromEntityId?: string;
  /** The GUID of relationship. */
  relationshipId?: string;
  /** The GUID of to-entity. */
  toEntityId?: string;
}

export type AtlasRelationship = AtlasRelationshipBase & AtlasStruct;

export interface AtlasRelationshipBase {
  /** The created time of the record. */
  createTime?: number;
  /** The user who created the record. */
  createdBy?: string;
  /** Reference to an object-instance of an Atlas type - like entity. */
  end1?: AtlasObjectId;
  /** Reference to an object-instance of an Atlas type - like entity. */
  end2?: AtlasObjectId;
  /** The GUID of the relationship. */
  guid?: string;
  /** The home ID of the relationship. */
  homeId?: string;
  /** The label of the relationship. */
  label?: string;
  /** Used to record the provenance of an instance of an entity or relationship */
  provenanceType?: number;
  /** The enum of relationship status. */
  status?: StatusAtlasRelationship;
  /** The update time of the record. */
  updateTime?: number;
  /** The user who updated the record. */
  updatedBy?: string;
  /** The version of the relationship. */
  version?: number;
}

export interface AtlasRelationshipWithExtInfo {
  /** The referred entity header. */
  referredEntities?: AtlasRelationshipWithExtInfoReferredEntitiesDictionary;
  /** Atlas relationship instance. */
  relationship?: AtlasRelationship;
}

export type AtlasClassificationDef = AtlasClassificationDefBase &
  AtlasStructDef;

export interface AtlasClassificationDefBase {
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

export type AtlasStructDef = AtlasStructDefBase & AtlasBaseTypeDef;

export interface AtlasStructDefBase {
  /** An array of attribute definitions. */
  attributeDefs?: AtlasAttributeDef[];
}

export interface AtlasAttributeDef {
  /** single-valued attribute or multi-valued attribute. */
  cardinality?: Cardinality;
  /** An array of constraints. */
  constraints?: AtlasConstraintDef[];
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
  options?: AtlasAttributeDefOptionsDictionary;
  /** The name of the type. */
  typeName?: string;
  /** The maximum count of the values. */
  valuesMaxCount?: number;
  /** The minimum count of the values. */
  valuesMinCount?: number;
}

export interface AtlasConstraintDef {
  /** The parameters of the constraint definition. */
  params?: AtlasConstraintDefParamsDictionary;
  /** The type of the constraint. */
  type?: string;
}

export interface AtlasBaseTypeDef {
  /** The enum of type category. */
  category?: TypeCategory;
  /** The created time of the record. */
  createTime?: number;
  /** The user who created the record. */
  createdBy?: string;
  /** The date format. */
  dateFormatter?: DateFormat;
  /** The description of the type definition. */
  description?: string;
  /** The GUID of the type definition. */
  guid?: string;
  /** The name of the type definition. */
  name?: string;
  /** The options for the type definition. */
  options?: AtlasBaseTypeDefOptionsDictionary;
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

export interface DateFormat {
  /** An array of available locales. */
  availableLocales?: string[];
  calendar?: number;
  /** The date format. */
  dateInstance?: DateFormat;
  /** The date format. */
  dateTimeInstance?: DateFormat;
  /** The date format. */
  instance?: DateFormat;
  /** Determines the leniency of the date format. */
  lenient?: boolean;
  /** The number format. */
  numberFormat?: NumberFormat;
  /** The date format. */
  timeInstance?: DateFormat;
  /** The timezone information. */
  timeZone?: TimeZone;
}

export interface NumberFormat {
  /** The number format. */
  availableLocales?: string[];
  /** The currency. */
  currency?: string;
  /** The number format. */
  currencyInstance?: NumberFormat;
  /** Determines if grouping is used. */
  groupingUsed?: boolean;
  /** The number format. */
  instance?: NumberFormat;
  /** The number format. */
  integerInstance?: NumberFormat;
  /** The maximum of fraction digits. */
  maximumFractionDigits?: number;
  /** The maximum of integer digits. */
  maximumIntegerDigits?: number;
  /** The minimum of fraction digits. */
  minimumFractionDigits?: number;
  /** The minimum of integer digits. */
  minimumIntegerDigits?: number;
  /** The number format. */
  numberInstance?: NumberFormat;
  /** Determines if only integer is parsed. */
  parseIntegerOnly?: boolean;
  /** The number format. */
  percentInstance?: NumberFormat;
  /** The enum of rounding mode. */
  roundingMode?: RoundingMode;
}

export interface TimeZone {
  /** The value of the daylight saving time. */
  dstSavings?: number;
  /** The ID of the timezone. */
  id?: string;
  /** An array of available IDs. */
  availableIds?: string[];
  /** The timezone information. */
  default?: TimeZone;
  /** The display name of the timezone. */
  displayName?: string;
  /** The raw offset of the timezone. */
  rawOffset?: number;
}

export type AtlasEntityDef = AtlasEntityDefBase & AtlasStructDef;

export interface AtlasEntityDefBase {
  /** An array of sub types. */
  subTypes?: string[];
  /** An array of super types. */
  superTypes?: string[];
  /** An array of relationship attributes. */
  relationshipAttributeDefs?: AtlasRelationshipAttributeDef[];
}

export type AtlasRelationshipAttributeDef = AtlasRelationshipAttributeDefBase &
  AtlasAttributeDef;

export interface AtlasRelationshipAttributeDefBase {
  /** Determines if it is a legacy attribute. */
  isLegacyAttribute?: boolean;
  /** The name of the relationship type. */
  relationshipTypeName?: string;
}

export type AtlasEnumDef = AtlasEnumDefBase & AtlasBaseTypeDef;

export interface AtlasEnumDefBase {
  /** The default value. */
  defaultValue?: string;
  /** An array of enum element definitions. */
  elementDefs?: AtlasEnumElementDef[];
}

export interface AtlasEnumElementDef {
  /** The description of the enum element definition. */
  description?: string;
  /** The ordinal of the enum element definition. */
  ordinal?: number;
  /** The value of the enum element definition. */
  value?: string;
}

export type AtlasRelationshipDef = AtlasRelationshipDefBase & AtlasStructDef;

export interface AtlasRelationshipDefBase {
  /**
   * The relationshipEndDef represents an end of the relationship. The end of the relationship is defined by a type, an
   * attribute name, cardinality and whether it  is the container end of the relationship.
   */
  endDef1?: AtlasRelationshipEndDef;
  /**
   * The relationshipEndDef represents an end of the relationship. The end of the relationship is defined by a type, an
   * attribute name, cardinality and whether it  is the container end of the relationship.
   */
  endDef2?: AtlasRelationshipEndDef;
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
  relationshipCategory?: RelationshipCategory;
  /** The label of the relationship. */
  relationshipLabel?: string;
}

export interface AtlasRelationshipEndDef {
  /** single-valued attribute or multi-valued attribute. */
  cardinality?: Cardinality;
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

export type AtlasTypeDef = AtlasTypeDefBase &
  AtlasBaseTypeDef &
  AtlasExtraTypeDef;

export interface AtlasTypeDefBase {}

export interface AtlasExtraTypeDef {
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
  relationshipAttributeDefs?: AtlasRelationshipAttributeDef[];
  /** The default value. */
  defaultValue?: string;
  /** An array of enum element definitions. */
  elementDefs?: AtlasEnumElementDef[];
  /**
   * The relationshipEndDef represents an end of the relationship. The end of the relationship is defined by a type, an
   * attribute name, cardinality and whether it  is the container end of the relationship.
   */
  endDef1?: AtlasRelationshipEndDef;
  /**
   * The relationshipEndDef represents an end of the relationship. The end of the relationship is defined by a type, an
   * attribute name, cardinality and whether it  is the container end of the relationship.
   */
  endDef2?: AtlasRelationshipEndDef;
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
  relationshipCategory?: RelationshipCategory;
  /** The label of the relationship. */
  relationshipLabel?: string;
  /** An array of attribute definitions. */
  attributeDefs?: AtlasAttributeDef[];
}

export interface AtlasTypesDef {
  /** An array of classification definitions. */
  classificationDefs?: AtlasClassificationDef[];
  /** An array of entity definitions. */
  entityDefs?: AtlasEntityDef[];
  /** An array of enum definitions. */
  enumDefs?: AtlasEnumDef[];
  /** An array of relationship definitions. */
  relationshipDefs?: AtlasRelationshipDef[];
  /** An array of struct definitions. */
  structDefs?: AtlasStructDef[];
  /** An array of term template definitions. */
  termTemplateDefs?: TermTemplateDef[];
}

export type TermTemplateDef = TermTemplateDefBase & AtlasStructDef;

export interface TermTemplateDefBase {}

export interface AtlasTypeDefHeader {
  /** The enum of type category. */
  category?: TypeCategory;
  /** The GUID of the type definition. */
  guid?: string;
  /** The name of the type definition. */
  name?: string;
}

export interface TypeStatistics {
  /** An map with type and corresponding statistics. */
  typeStatistics?: TypeStatisticsDictionary;
}

export interface TypeStatisticsExtraProperties {
  /** The entity count of this type. */
  count?: number;
}

export type AtlasUserSavedSearch = AtlasUserSavedSearchBase &
  AtlasBaseModelObject;

export interface AtlasUserSavedSearchBase {
  /** The name of the saved search. */
  name?: string;
  /** The owner name of the saved search. */
  ownerName?: string;
  /** The parameters used for search. */
  searchParameters?: SearchParameters;
  /** The enum of saved search type. */
  searchType?: SavedSearchType;
  /** The UI parameters. */
  uiParameters?: string;
}

export interface SearchParameters {
  /** Attribute values included in the results */
  attributes?: string[];
  /** The classification to search. */
  classification?: string;
  /** The filter criteria with attributes and condition. */
  entityFilters?: FilterCriteria;
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
  tagFilters?: FilterCriteria;
  /** The name of the term for search. */
  termName?: string;
  /** The name of the type for search. */
  typeName?: string;
}

export interface FilterCriteria {
  /** The name of the attribute. */
  attributeName?: string;
  /** The value of the attribute. */
  attributeValue?: string;
  /** The enum for condition. */
  condition?: Condition;
  /** An array of filter criteria. */
  criterion?: FilterCriteria[];
  /**
   * Supported search operations
   * Logical comparison operators can only be used with numbers or dates
   * IN, LIKE, startsWith, endsWith, CONTAINS can only be used with strings or text
   */
  operator?: Operator;
}

export interface SearchFilter {
  /** Determines if get the count. */
  getCount?: boolean;
  /** The maximum of rows. */
  maxRows?: number;
  /** The parameters of the search filter. */
  params?: SearchFilterParamsDictionary;
  /** The sorted by field. */
  sortBy?: string;
  /** to specify whether the result should be sorted? If yes, whether asc or desc. */
  sortType?: SortType;
  /** The start index of the search. */
  startIndex?: number;
}

export interface AzureCatalogUser {
  /** User ID of the Azure catalog user. */
  userId?: string;
}

export interface CatalogCreationRequest {
  /** Name of the catalog. */
  catalogName?: string;
  /** ID of the catalog. */
  catalogId?: string;
  /** User ID or the creator. */
  creatorUserId?: string;
  /** The connection string of the Event Hubs. */
  eventHubConnectionString?: string;
}

export interface CatalogDeletionRequest {
  /** Name of the catalog. */
  catalogName?: string;
}

export interface DataScanPermissionCheckRequest {
  /** Name of the catalog. */
  catalogName?: string;
  /** User ID of the catalog. */
  userId?: string;
}

export interface DataScanPermissionCheckResponse {
  /** The result of the response. */
  result?: string;
}

export interface Context {
  /** The value of the context. */
  value?: string;
}

export interface Error {
  /** The error message. */
  errorMessage?: string;
}

export interface AtlasError {
  /** Error code */
  errorCode?: string;
  /** Error message */
  errorMessage?: string;
}

export interface HookNotification {
  /** Enum of hook notification type. Different behavior will be invoked by the value. */
  type?: HookNotificationType;
  /** The user of the notification. Default to be "UNKNOWN". */
  user?: string;
}

export interface EntityCreateRequestV2 {
  /** Enum of hook notification type. Different behavior will be invoked by the value. */
  type?: HookNotificationType;
  /** The user of the notification. Default to be "UNKNOWN". */
  user?: string;
  /** An instance of an entity along with extended info - like hive_table, hive_database. */
  entities?: AtlasEntitiesWithExtInfo;
}

export interface EntityUpdateRequestV2 {
  /** Enum of hook notification type. Different behavior will be invoked by the value. */
  type?: HookNotificationType;
  /** The user of the notification. Default to be "UNKNOWN". */
  user?: string;
  /** An instance of an entity along with extended info - like hive_table, hive_database. */
  entities?: AtlasEntitiesWithExtInfo;
}

export interface EntityPartialUpdateRequestV2 {
  /** Enum of hook notification type. Different behavior will be invoked by the value. */
  type?: HookNotificationType;
  /** The user of the notification. Default to be "UNKNOWN". */
  user?: string;
  /** Reference to an object-instance of an Atlas type - like entity. */
  entityId?: AtlasObjectId;
  /** An instance of an entity along with extended info - like hive_table, hive_database. */
  entity?: AtlasEntitiesWithExtInfo;
}

export interface EntityDeleteRequestV2 {
  /** Enum of hook notification type. Different behavior will be invoked by the value. */
  type?: HookNotificationType;
  /** The user of the notification. Default to be "UNKNOWN". */
  user?: string;
  entities?: AtlasObjectId[];
}

export interface RoleAssignmentEntry {
  /** The object ID of the AAD user. */
  principalId?: string;
  /** The name of the role. */
  role?: string;
}

export interface UpdateRoleAssignmentRequest {
  roleAssignmentList?: RoleAssignmentEntry[];
}

export interface ListRoleAssignmentResponse {
  roleAssignmentList?: RoleAssignmentEntry[];
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

export type Status = "ACTIVE" | "DELETED";
export type AtlasTermAssignmentStatus =
  | "DISCOVERED"
  | "PROPOSED"
  | "IMPORTED"
  | "VALIDATED"
  | "DEPRECATED"
  | "OBSOLETE"
  | "OTHER";
export type SortType = "NONE" | "ASC" | "DESC";
export type AtlasTermRelationshipStatus =
  | "DRAFT"
  | "ACTIVE"
  | "DEPRECATED"
  | "OBSOLETE"
  | "OTHER";
export type TermStatus = "Draft" | "Approved" | "Alert" | "Expired";
export type StatusAtlasRelationship = "ACTIVE" | "DELETED";
export type ImportCSVOperationStatus =
  | "NotStarted"
  | "Succeeded"
  | "Failed"
  | "Running";
export type Direction = "BOTH" | "INPUT" | "OUTPUT";
export type LineageDirection = "INPUT" | "OUTPUT" | "BOTH";
export type Cardinality = "SINGLE" | "LIST" | "SET";
export type TypeCategory =
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
export type RoundingMode =
  | "UP"
  | "DOWN"
  | "CEILING"
  | "FLOOR"
  | "HALF_UP"
  | "HALF_DOWN"
  | "HALF_EVEN"
  | "UNNECESSARY";
export type RelationshipCategory =
  | "ASSOCIATION"
  | "AGGREGATION"
  | "COMPOSITION";
export type Type =
  | "enum"
  | "entity"
  | "classification"
  | "relationship"
  | "struct"
  | "term_template";
export type Condition = "AND" | "OR";
export type Operator =
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
export type SavedSearchType = "BASIC" | "ADVANCED";
export type HookNotificationType =
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
export type EntityOperation = "CREATE" | "UPDATE" | "PARTIAL_UPDATE" | "DELETE";
export type Relation =
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
export type AtlasClassificationSourceDetailsDictionary = Record<string, any>;
export type AtlasStructAttributesDictionary = Record<string, any>;
export type AtlasEntityRelationshipAttributesDictionary = Record<string, any>;
export type AtlasEntitySourceDetailsDictionary = Record<string, any>;
export type AtlasEntityContactsDictionary = Record<string, ContactBasic[]>;
export type AtlasEntityExtInfoReferredEntitiesDictionary = Record<
  string,
  AtlasEntity
>;
export type EntityMutationResponseGuidAssignmentsDictionary = Record<
  string,
  string
>;
export type EntityMutationResponseMutatedEntitiesDictionary = Record<
  string,
  AtlasEntityHeader[]
>;
export type AtlasEntityHeadersGuidHeaderMapDictionary = Record<
  string,
  AtlasEntityHeader
>;
export type DictionaryOfStringDictionary = Record<string, string>;
export type DictionaryOfpathsCic80AAtlasV2GlossaryCategoryCategoryguidRelatedGetResponses200ContentApplicationJsonSchemaAdditionalpropertiesDictionary = Record<
  string,
  AtlasRelatedCategoryHeader[]
>;
export type AtlasGlossaryTermContactsDictionary = Record<
  string,
  ContactBasic[]
>;
export type TermCustomAttributesExtraPropertiesDictionary = Record<string, any>;
export type TermCustomAttributesDictionary = Record<
  string,
  TermCustomAttributesExtraPropertiesDictionary
>;
export type AtlasObjectIdUniqueAttributesDictionary = Record<string, any>;
export type DictionaryOfpathsV84KwqAtlasV2GlossaryTermsTermguidRelatedGetResponses200ContentApplicationJsonSchemaAdditionalpropertiesDictionary = Record<
  string,
  AtlasRelatedTermHeader[]
>;
export type AtlasGlossaryExtInfoCategoryInfoDictionary = Record<
  string,
  AtlasGlossaryCategory
>;
export type AtlasGlossaryExtInfoTermInfoDictionary = Record<
  string,
  AtlasGlossaryTerm
>;
export type AtlasLineageInfoGuidEntityMapDictionary = Record<
  string,
  AtlasEntityHeader
>;
export type AtlasLineageInfoExtraPropertiesDictionary = Record<string, any>;
export type AtlasLineageInfoWidthCountsDictionary = Record<
  string,
  AtlasLineageInfoExtraPropertiesDictionary
>;
export type AtlasRelationshipWithExtInfoReferredEntitiesDictionary = Record<
  string,
  AtlasEntityHeader
>;
export type AtlasConstraintDefParamsDictionary = Record<string, any>;
export type AtlasAttributeDefOptionsDictionary = Record<string, string>;
export type AtlasBaseTypeDefOptionsDictionary = Record<string, string>;
export type TypeStatisticsDictionary = Record<
  string,
  TypeStatisticsExtraProperties
>;
export type SearchFilterParamsDictionary = Record<string, string[]>;
