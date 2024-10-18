// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** An instance of an entity along with extended info - like hive_table, hive_database. */
export interface AtlasEntityWithExtInfoOutput extends AtlasEntityExtInfoOutput {
  /** An instance of an entity - like hive_table, hive_database. */
  entity?: AtlasEntityOutput;
}

/** An instance of an entity - like hive_table, hive_database. */
export interface AtlasEntityOutput extends AtlasStructOutput {
  /** Business Attributes */
  businessAttributes?: Record<string, Record<string, unknown>>;
  /** An array of classifications. */
  classifications?: Array<AtlasClassificationOutput>;
  /** The created time of the record. */
  createTime?: number;
  /** The user who created the record. */
  createdBy?: string;
  /** Custom Attribute */
  customAttributes?: Record<string, string>;
  /** The GUID of the entity. */
  guid?: string;
  /** The home ID of the entity. */
  homeId?: string;
  /** Whether it is a shell entity */
  isIncomplete?: boolean;
  /** labels */
  labels?: Array<string>;
  /** An array of term assignment headers indicating the meanings of the entity. */
  meanings?: Array<AtlasTermAssignmentHeaderOutput>;
  /** Used to record the provenance of an instance of an entity or relationship. */
  provenanceType?: number;
  /** Determines if there's a proxy. */
  proxy?: boolean;
  /** The attributes of relationship. */
  relationshipAttributes?: Record<string, Record<string, unknown>>;
  /** Status of the entity - can be active or deleted. Deleted entities are not removed from Atlas store. */
  status?: "ACTIVE" | "DELETED";
  /** The update time of the record. */
  updateTime?: number;
  /** The user who updated the record. */
  updatedBy?: string;
  /** The version of the entity. */
  version?: number;
  /** indicate the source who create the classification detail */
  source?: string;
  /** more detail on source information */
  sourceDetails?: Record<string, Record<string, unknown>>;
  /** The dictionary of contacts for terms. Key could be Expert or Owner. */
  contacts?: Record<string, Array<ContactBasicOutput>>;
}

/** An instance of a classification; it doesn't have an identity, this object exists only when associated with an entity. */
export interface AtlasClassificationOutput extends AtlasStructOutput {
  /** The GUID of the entity. */
  entityGuid?: string;
  /** Status of the entity - can be active or deleted. Deleted entities are not removed from Atlas store. */
  entityStatus?: "ACTIVE" | "DELETED";
  /** Determines if propagations will be removed on entity deletion. */
  removePropagationsOnEntityDelete?: boolean;
  /** An array of time boundaries indicating validity periods. */
  validityPeriods?: Array<TimeBoundaryOutput>;
  /** indicate the source who create the classification detail */
  source?: string;
  /** more detail on source information */
  sourceDetails?: Record<string, Record<string, unknown>>;
}

/** Captures time-boundary details */
export interface TimeBoundaryOutput {
  /** The end of the time boundary. */
  endTime?: string;
  /** The start of the time boundary. */
  startTime?: string;
  /** The timezone of the time boundary. */
  timeZone?: string;
}

/** Captures details of struct contents. Not instantiated directly, used only via AtlasEntity, AtlasClassification. */
export interface AtlasStructOutput {
  /** The attributes of the struct. */
  attributes?: Record<string, Record<string, unknown>>;
  /** The name of the type. */
  typeName?: string;
  /** ETag for concurrency control. */
  lastModifiedTS?: string;
}

/** The header for term assignment. */
export interface AtlasTermAssignmentHeaderOutput {
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
  status?:
    | "DISCOVERED"
    | "PROPOSED"
    | "IMPORTED"
    | "VALIDATED"
    | "DEPRECATED"
    | "OBSOLETE"
    | "OTHER";
  /** The steward of the term. */
  steward?: string;
  /** The GUID of the term. */
  termGuid?: string;
}

/** ContactBasic */
export interface ContactBasicOutput {
  /** Azure Active Directory object Id. */
  id?: string;
  /** additional information to describe this contact. */
  info?: string;
}

/** An instance of an entity along with extended info - like hive_table, hive_database. */
export interface AtlasEntityExtInfoOutput {
  /** The referred entities. */
  referredEntities?: Record<string, AtlasEntityOutput>;
}

/** The mutation response of entity. */
export interface EntityMutationResponseOutput {
  /** A map of GUID assignments with entities. */
  guidAssignments?: Record<string, string>;
  /** The entity headers of mutated entities. */
  mutatedEntities?: Record<string, Array<AtlasEntityHeaderOutput>>;
  /** An array of entity headers that partially updated. */
  partialUpdatedEntities?: Array<AtlasEntityHeaderOutput>;
}

/** An instance of an entity - like hive_table, hive_database. */
export interface AtlasEntityHeaderOutput extends AtlasStructOutput {
  /** An array of classification names. */
  classificationNames?: Array<string>;
  /** An array of classifications. */
  classifications?: Array<AtlasClassificationOutput>;
  /** The display text. */
  displayText?: string;
  /** The GUID of the record. */
  guid?: string;
  /** Whether it is a shell entity */
  isIncomplete?: boolean;
  /** labels */
  labels?: Array<string>;
  /** An array of meanings. */
  meaningNames?: Array<string>;
  /** An array of term assignment headers. */
  meanings?: Array<AtlasTermAssignmentHeaderOutput>;
  /** Status of the entity - can be active or deleted. Deleted entities are not removed from Atlas store. */
  status?: "ACTIVE" | "DELETED";
}

/** An error response from the service */
export interface ErrorResponseOutput {
  /** The request ID. */
  requestId?: string;
  /** The error code. */
  errorCode?: string;
  /** The error message. */
  errorMessage?: string;
}

/** An instance of an entity along with extended info - like hive_table, hive_database. */
export interface AtlasEntitiesWithExtInfoOutput extends AtlasEntityExtInfoOutput {
  /** An array of entities. */
  entities?: Array<AtlasEntityOutput>;
}

/** REST serialization friendly list. */
export interface AtlasClassificationsOutput extends PListOutput {}

/** Paginated-list, for returning search results. */
export interface PListOutput {
  /** An array of objects. */
  list?: Array<Record<string, unknown>>;
  /** The size of the page. */
  pageSize?: number;
  /** The sorted by field. */
  sortBy?: string;
  /** to specify whether the result should be sorted? If yes, whether asc or desc. */
  sortType?: "NONE" | "ASC" | "DESC";
  /** The start index of the page. */
  startIndex?: number;
  /** The total count of items. */
  totalCount?: number;
}

/** example */
export interface BulkImportResponseOutput {
  /** failed importInfoList */
  failedImportInfoList?: Array<ImportInfoOutput>;
  /** successful importInfoList */
  successImportInfoList?: Array<ImportInfoOutput>;
}

/** ImportInfo */
export interface ImportInfoOutput {
  /** childObjectName */
  childObjectName?: string;
  /** importStatus */
  importStatus?: "SUCCESS" | "FAILED";
  /** parentObjectName */
  parentObjectName?: string;
  /** remarks */
  remarks?: string;
}

/** The glossary object. */
export interface AtlasGlossaryOutput extends AtlasGlossaryBaseObjectOutput {
  /** An array of categories. */
  categories?: Array<AtlasRelatedCategoryHeaderOutput>;
  /** The language of the glossary. */
  language?: string;
  /** An array of related term headers. */
  terms?: Array<AtlasRelatedTermHeaderOutput>;
  /** The usage of the glossary. */
  usage?: string;
}

/** The header of the related category. */
export interface AtlasRelatedCategoryHeaderOutput {
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

/** The header of the related term. */
export interface AtlasRelatedTermHeaderOutput {
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
  status?: "DRAFT" | "ACTIVE" | "DEPRECATED" | "OBSOLETE" | "OTHER";
  /** The steward of the term. */
  steward?: string;
  /** The GUID of the term. */
  termGuid?: string;
}

/** The glossary base object. */
export interface AtlasGlossaryBaseObjectOutput extends AtlasBaseModelObjectOutput {
  /** An array of classifications. */
  classifications?: Array<AtlasClassificationOutput>;
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

/** The base model object. */
export interface AtlasBaseModelObjectOutput {
  /** The GUID of the object. */
  guid?: string;
}

/** The glossary category. */
export interface AtlasGlossaryCategoryOutput extends AtlasGlossaryBaseObjectOutput {
  /** The glossary header with basic information. */
  anchor?: AtlasGlossaryHeaderOutput;
  /** An array of children categories. */
  childrenCategories?: Array<AtlasRelatedCategoryHeaderOutput>;
  /** The header of the related category. */
  parentCategory?: AtlasRelatedCategoryHeaderOutput;
  /** An array of related term headers. */
  terms?: Array<AtlasRelatedTermHeaderOutput>;
}

/** The glossary header with basic information. */
export interface AtlasGlossaryHeaderOutput {
  /** The display text. */
  displayText?: string;
  /** The GUID of the glossary. */
  glossaryGuid?: string;
  /** The GUID of the relationship. */
  relationGuid?: string;
}

/** The glossary term. */
export interface AtlasGlossaryTermOutput extends AtlasGlossaryBaseObjectOutput {
  /** The abbreviation of the term. */
  abbreviation?: string;
  templateName?: Array<Record<string, unknown>>;
  /** The glossary header with basic information. */
  anchor?: AtlasGlossaryHeaderOutput;
  /** An array of related term headers as antonyms. */
  antonyms?: Array<AtlasRelatedTermHeaderOutput>;
  /** The created time of the record. */
  createTime?: number;
  /** The user who created the record. */
  createdBy?: string;
  /** The update time of the record. */
  updateTime?: number;
  /** The user who updated the record. */
  updatedBy?: string;
  /** Status of the AtlasGlossaryTerm */
  status?: "Draft" | "Approved" | "Alert" | "Expired";
  /** An array of resource link for term */
  resources?: Array<ResourceLinkOutput>;
  /** The dictionary of contacts for terms. Key could be Expert or Steward. */
  contacts?: Record<string, Array<ContactBasicOutput>>;
  /**
   * The custom attributes of the term, which is map<string,map<string,object>>.
   * The key of the first layer map is term template name.
   */
  attributes?: Record<string, Record<string, Record<string, unknown>>>;
  /** An array of related object IDs. */
  assignedEntities?: Array<AtlasRelatedObjectIdOutput>;
  /** An array of term categorization headers. */
  categories?: Array<AtlasTermCategorizationHeaderOutput>;
  /** An array of related term headers. */
  classifies?: Array<AtlasRelatedTermHeaderOutput>;
  /** An array of examples. */
  examples?: Array<string>;
  /** An array of related term headers indicating the is-a relationship. */
  isA?: Array<AtlasRelatedTermHeaderOutput>;
  /** An array of preferred related term headers. */
  preferredTerms?: Array<AtlasRelatedTermHeaderOutput>;
  /** An array of related term headers that are preferred to. */
  preferredToTerms?: Array<AtlasRelatedTermHeaderOutput>;
  /** An array of related term headers that are replaced by. */
  replacedBy?: Array<AtlasRelatedTermHeaderOutput>;
  /** An array of related term headers for replacement. */
  replacementTerms?: Array<AtlasRelatedTermHeaderOutput>;
  /** An array of related term headers for see also. */
  seeAlso?: Array<AtlasRelatedTermHeaderOutput>;
  /** An array of related term headers as synonyms. */
  synonyms?: Array<AtlasRelatedTermHeaderOutput>;
  /** An array of translated related term headers. */
  translatedTerms?: Array<AtlasRelatedTermHeaderOutput>;
  /** An array of related term headers for translation. */
  translationTerms?: Array<AtlasRelatedTermHeaderOutput>;
  /** The usage of the term. */
  usage?: string;
  /** An array of related term headers as valid values. */
  validValues?: Array<AtlasRelatedTermHeaderOutput>;
  /** An array of related term headers as valid values for other records. */
  validValuesFor?: Array<AtlasRelatedTermHeaderOutput>;
}

/** ResourceLink */
export interface ResourceLinkOutput {
  /** Display name for url. */
  displayName?: string;
  /** web url. http or https */
  url?: string;
}

/** Reference to an object-instance of AtlasEntity type used in relationship attribute values */
export interface AtlasRelatedObjectIdOutput extends AtlasObjectIdOutput {
  /** The display text. */
  displayText?: string;
  /** Status of the entity - can be active or deleted. Deleted entities are not removed from Atlas store. */
  entityStatus?: "ACTIVE" | "DELETED";
  relationshipType?: string;
  /** Captures details of struct contents. Not instantiated directly, used only via AtlasEntity, AtlasClassification. */
  relationshipAttributes?: AtlasStructOutput;
  /** The GUID of the relationship. */
  relationshipGuid?: string;
  /** The enum of relationship status. */
  relationshipStatus?: "ACTIVE" | "DELETED";
}

/** Reference to an object-instance of an Atlas type - like entity. */
export interface AtlasObjectIdOutput {
  /** The GUID of the object. */
  guid?: string;
  /** The name of the type. */
  typeName?: string;
  /** The unique attributes of the object. */
  uniqueAttributes?: Record<string, Record<string, unknown>>;
}

/** The basic information for term categorization. */
export interface AtlasTermCategorizationHeaderOutput {
  /** The GUID of the category. */
  categoryGuid?: string;
  /** The description of the record. */
  description?: string;
  /** The display text. */
  displayText?: string;
  /** The GUID of the relationship. */
  relationGuid?: string;
  /** The status of term relationship. */
  status?: "DRAFT" | "ACTIVE" | "DEPRECATED" | "OBSOLETE" | "OTHER";
}

/** The extended information of glossary. */
export interface AtlasGlossaryExtInfoOutput extends AtlasGlossaryOutput {
  /** The glossary category information. */
  categoryInfo?: Record<string, AtlasGlossaryCategoryOutput>;
  /** The glossary term information. */
  termInfo?: Record<string, AtlasGlossaryTermOutput>;
}

/** The status of import csv operation */
export interface ImportCSVOperationOutput {
  /** guid string */
  id?: string;
  /** Enum of the status of import csv operation. */
  status?: "NotStarted" | "Succeeded" | "Failed" | "Running";
  /** The created time of the record. */
  createTime?: string;
  /** The last updated time of the record. */
  lastUpdateTime?: string;
  properties?: ImportCSVOperationPropertiesOutput;
  error?: ImportCSVOperationErrorOutput;
}

export interface ImportCSVOperationPropertiesOutput {
  /** Term numbers that already imported successfully */
  importedTerms?: string;
  /** Total term numbers that detected in csv */
  totalTermsDetected?: string;
}

export interface ImportCSVOperationErrorOutput {
  /** Error code from async import job if fail */
  errorCode?: number;
  /** Error message from async import job if fail */
  errorMessage?: string;
}

/** The result of the search result. */
export interface SearchResultOutput {
  /** The total number of search results (not the number of documents in a single page). */
  "@search.count"?: number;
  /** A facet list that consists of index fields assetType ,classification, contactId, and label. When the facet is specified in the request, the value of the facet is returned as an element of @search.facets. */
  "@search.facets"?: SearchFacetResultValueOutput;
  value?: Array<SearchResultValueOutput>;
}

/** A facet list that consists of index fields assetType ,classification, contactId, and label. When the facet is specified in the request, the value of the facet is returned as an element of @search.facets. */
export interface SearchFacetResultValueOutput {
  assetType?: Array<SearchFacetItemValueOutput>;
  classification?: Array<SearchFacetItemValueOutput>;
  classificationCategory?: Array<SearchFacetItemValueOutput>;
  contactId?: Array<SearchFacetItemValueOutput>;
  fileExtension?: Array<SearchFacetItemValueOutput>;
  label?: Array<SearchFacetItemValueOutput>;
  term?: Array<SearchFacetItemValueOutput>;
}

/** The content of a search facet result item. */
export interface SearchFacetItemValueOutput {
  /** The count of the facet item. */
  count?: number;
  /** The name of the facet item. */
  value?: string;
}

/** The value item of the search result. */
export interface SearchResultValueOutput {
  /** The search score calculated by the search engine. The results are ordered by search score by default. */
  "@search.score"?: number;
  /** A highlight list that consists of index fields id ,qualifiedName, name, description, entityType. When the keyword appears in those fields, the value of the field, attached with emphasis mark, is returned as an element of @search.highlights. */
  "@search.highlights"?: SearchHighlightsOutput;
  /** The target text that contains the keyword as prefix. The keyword is wrapped with emphasis mark. */
  "@search.text"?: string;
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
  classification?: Array<string>;
  /** The labels of the record. */
  label?: Array<string>;
  /** The terms assigned to the record. */
  term?: Array<TermSearchResultValueOutput>;
  /** The contacts of the record. */
  contact?: Array<ContactSearchResultValueOutput>;
  /** The asset types of the record. */
  assetType?: Array<string>;
}

/** A highlight list that consists of index fields id ,qualifiedName, name, description, entityType. When the keyword appears in those fields, the value of the field, attached with emphasis mark, is returned as an element of @search.highlights. */
export interface SearchHighlightsOutput {
  id?: Array<string>;
  qualifiedName?: Array<string>;
  name?: Array<string>;
  description?: Array<string>;
  entityType?: Array<string>;
}

/** The context. */
export interface TermSearchResultValueOutput {
  /** The name of the term. */
  name?: string;
  /** The name of the glossary which contains the term. */
  glossaryName?: string;
  /** The GUID of the term. */
  guid?: string;
}

/** The contact in the search and suggest result. */
export interface ContactSearchResultValueOutput {
  /** The GUID of the contact. */
  id?: string;
  /** The description of the contact. */
  info?: string;
  /** The type of the contact. It can be Expert or Owner for an entity. It can be Expert or Steward for a glossary term. */
  contactType?: string;
}

/** The result item of the search suggest. */
export interface SuggestResultOutput {
  value?: Array<SuggestResultValueOutput>;
}

/** The value item of the search suggest. */
export interface SuggestResultValueOutput {
  /** The search score calculated by the search engine. The results are ordered by search score by default. */
  "@search.score"?: number;
  /** The target text that contains the keyword as prefix. The keyword is wrapped with emphasis mark. */
  "@search.text"?: string;
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
  classification?: Array<string>;
  /** The labels of the record. */
  label?: Array<string>;
  /** The terms assigned to the record. */
  term?: Array<TermSearchResultValueOutput>;
  /** The contacts of the record. */
  contact?: Array<ContactSearchResultValueOutput>;
  /** The asset types of the record. */
  assetType?: Array<string>;
}

/** The result item of the browse request. */
export interface BrowseResultOutput {
  /** The total number of browse results. */
  "@search.count"?: number;
  value?: Array<BrowseResultValueOutput>;
}

/** The value item of the browse result. */
export interface BrowseResultValueOutput {
  /** The type name of the record. */
  entityType?: string;
  /** The GUID of the record. */
  id?: string;
  /** If the record is a leaf entity. */
  isLeaf?: boolean;
  /** The name of the record. */
  name?: string;
  /** The owners of the record. */
  owner?: Array<BrowseResultOwnerOutput>;
  /** The path of the record. */
  path?: string;
  /** The qualified name of the record. */
  qualifiedName?: string;
}

/** The value item of the browse owner. */
export interface BrowseResultOwnerOutput {
  /** The GUID of the owner. */
  id?: string;
  /** The display name of the owner. */
  displayName?: string;
  /** The mail of the owner. */
  mail?: string;
  /** The contact type of the owner. The value will be Owner. */
  contactType?: string;
}

/** The result of the autocomplete request. */
export interface AutoCompleteResultOutput {
  value?: Array<AutoCompleteResultValueOutput>;
}

/** The value item of the autocomplete suggest. */
export interface AutoCompleteResultValueOutput {
  /** The completed term or phrase. */
  text?: string;
  /** The completed search query text. */
  queryPlusText?: string;
}

/** The lineage information. */
export interface AtlasLineageInfoOutput {
  /** The GUID of the base entity. */
  baseEntityGuid?: string;
  /** The GUID entity map. */
  guidEntityMap?: Record<string, AtlasEntityHeaderOutput>;
  /** The entity count in specific direction. */
  widthCounts?: Record<string, Record<string, Record<string, unknown>>>;
  /** The depth of lineage. */
  lineageDepth?: number;
  /** The width of lineage. */
  lineageWidth?: number;
  /** True to return the parent of the base entity. */
  includeParent?: boolean;
  /** The number of children node. */
  childrenCount?: number;
  /** The enum of lineage direction. */
  lineageDirection?: "INPUT" | "OUTPUT" | "BOTH";
  /** An array of parentRelations relations. */
  parentRelations?: Array<ParentRelationOutput>;
  /** An array of lineage relations. */
  relations?: Array<LineageRelationOutput>;
}

/** The lineage parents relation with GUID of the parent entity and to child entity. */
export interface ParentRelationOutput {
  /** The GUID of child entity. */
  childEntityId?: string;
  /** The GUID of relationship. */
  relationshipId?: string;
  /** The GUID of parent entity. */
  parentEntityId?: string;
}

/** The lineage relation with GUID of the from and to entity. */
export interface LineageRelationOutput {
  /** The GUID of from-entity. */
  fromEntityId?: string;
  /** The GUID of relationship. */
  relationshipId?: string;
  /** The GUID of to-entity. */
  toEntityId?: string;
}

/** Atlas relationship instance. */
export interface AtlasRelationshipOutput extends AtlasStructOutput {
  /** The created time of the record. */
  createTime?: number;
  /** The user who created the record. */
  createdBy?: string;
  /** Reference to an object-instance of an Atlas type - like entity. */
  end1?: AtlasObjectIdOutput;
  /** Reference to an object-instance of an Atlas type - like entity. */
  end2?: AtlasObjectIdOutput;
  /** The GUID of the relationship. */
  guid?: string;
  /** The home ID of the relationship. */
  homeId?: string;
  /** The label of the relationship. */
  label?: string;
  /** Used to record the provenance of an instance of an entity or relationship */
  provenanceType?: number;
  /** The enum of relationship status. */
  status?: "ACTIVE" | "DELETED";
  /** The update time of the record. */
  updateTime?: number;
  /** The user who updated the record. */
  updatedBy?: string;
  /** The version of the relationship. */
  version?: number;
}

/** The relationship with extended information. */
export interface AtlasRelationshipWithExtInfoOutput {
  /** The referred entity header. */
  referredEntities?: Record<string, AtlasEntityHeaderOutput>;
  /** Atlas relationship instance. */
  relationship?: AtlasRelationshipOutput;
}

/** class that captures details of a struct-type. */
export interface AtlasBusinessMetadataDefOutput extends AtlasStructDefOutput {}

/** class that captures details of a struct-type. */
export interface AtlasStructDefOutput extends AtlasBaseTypeDefOutput {
  /** An array of attribute definitions. */
  attributeDefs?: Array<AtlasAttributeDefOutput>;
}

/** class that captures details of a struct-attribute. */
export interface AtlasAttributeDefOutput {
  /** single-valued attribute or multi-valued attribute. */
  cardinality?: "SINGLE" | "LIST" | "SET";
  /** An array of constraints. */
  constraints?: Array<AtlasConstraintDefOutput>;
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
  options?: Record<string, string>;
  /** The name of the type. */
  typeName?: string;
  /** The maximum count of the values. */
  valuesMaxCount?: number;
  /** The minimum count of the values. */
  valuesMinCount?: number;
}

/** class that captures details of a constraint. */
export interface AtlasConstraintDefOutput {
  /** The parameters of the constraint definition. */
  params?: Record<string, Record<string, unknown>>;
  /** The type of the constraint. */
  type?: string;
}

/** Base class that captures common-attributes for all Atlas types. */
export interface AtlasBaseTypeDefOutput {
  /** The enum of type category. */
  category?:
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
  /** The created time of the record. */
  createTime?: number;
  /** The user who created the record. */
  createdBy?: string;
  /** The date format. */
  dateFormatter?: DateFormatOutput;
  /** The description of the type definition. */
  description?: string;
  /** The GUID of the type definition. */
  guid?: string;
  /** The name of the type definition. */
  name?: string;
  /** The options for the type definition. */
  options?: Record<string, string>;
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

/** The date format. */
export interface DateFormatOutput {
  /** An array of available locales. */
  availableLocales?: Array<string>;
  calendar?: number;
  /** The date format. */
  dateInstance?: DateFormatOutput;
  /** The date format. */
  dateTimeInstance?: DateFormatOutput;
  /** The date format. */
  instance?: DateFormatOutput;
  /** Determines the leniency of the date format. */
  lenient?: boolean;
  /** The number format. */
  numberFormat?: NumberFormatOutput;
  /** The date format. */
  timeInstance?: DateFormatOutput;
  /** The timezone information. */
  timeZone?: TimeZoneOutput;
}

/** The number format. */
export interface NumberFormatOutput {
  /** The number format. */
  availableLocales?: Array<string>;
  /** The currency. */
  currency?: string;
  /** The number format. */
  currencyInstance?: NumberFormatOutput;
  /** Determines if grouping is used. */
  groupingUsed?: boolean;
  /** The number format. */
  instance?: NumberFormatOutput;
  /** The number format. */
  integerInstance?: NumberFormatOutput;
  /** The maximum of fraction digits. */
  maximumFractionDigits?: number;
  /** The maximum of integer digits. */
  maximumIntegerDigits?: number;
  /** The minimum of fraction digits. */
  minimumFractionDigits?: number;
  /** The minimum of integer digits. */
  minimumIntegerDigits?: number;
  /** The number format. */
  numberInstance?: NumberFormatOutput;
  /** Determines if only integer is parsed. */
  parseIntegerOnly?: boolean;
  /** The number format. */
  percentInstance?: NumberFormatOutput;
  /** The enum of rounding mode. */
  roundingMode?:
    | "UP"
    | "DOWN"
    | "CEILING"
    | "FLOOR"
    | "HALF_UP"
    | "HALF_DOWN"
    | "HALF_EVEN"
    | "UNNECESSARY";
}

/** The timezone information. */
export interface TimeZoneOutput {
  /** The value of the daylight saving time. */
  dstSavings?: number;
  /** The ID of the timezone. */
  id?: string;
  /** An array of available IDs. */
  availableIds?: Array<string>;
  /** The timezone information. */
  default?: TimeZoneOutput;
  /** The display name of the timezone. */
  displayName?: string;
  /** The raw offset of the timezone. */
  rawOffset?: number;
}

/** class that captures details of a classification-type. */
export interface AtlasClassificationDefOutput extends AtlasStructDefOutput {
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
  entityTypes?: Array<string>;
  /** An array of sub types. */
  subTypes?: Array<string>;
  /** An array of super types. */
  superTypes?: Array<string>;
}

/** class that captures details of a entity-type. */
export interface AtlasEntityDefOutput extends AtlasStructDefOutput {
  /** An array of sub types. */
  subTypes?: Array<string>;
  /** An array of super types. */
  superTypes?: Array<string>;
  /** An array of relationship attributes. */
  relationshipAttributeDefs?: Array<AtlasRelationshipAttributeDefOutput>;
}

/**
 * The relationshipEndDef represents an end of the relationship. The end of the relationship is defined by a type, an
 * attribute name, cardinality and whether it  is the container end of the relationship.
 */
export interface AtlasRelationshipAttributeDefOutput extends AtlasAttributeDefOutput {
  /** Determines if it is a legacy attribute. */
  isLegacyAttribute?: boolean;
  /** The name of the relationship type. */
  relationshipTypeName?: string;
}

/** class that captures details of an enum-type. */
export interface AtlasEnumDefOutput extends AtlasBaseTypeDefOutput {
  /** The default value. */
  defaultValue?: string;
  /** An array of enum element definitions. */
  elementDefs?: Array<AtlasEnumElementDefOutput>;
}

/** class that captures details of an enum-element. */
export interface AtlasEnumElementDefOutput {
  /** The description of the enum element definition. */
  description?: string;
  /** The ordinal of the enum element definition. */
  ordinal?: number;
  /** The value of the enum element definition. */
  value?: string;
}

/**
 * AtlasRelationshipDef is a TypeDef that defines a relationship.
 * <p>
 * As with other typeDefs the AtlasRelationshipDef has a name. Once created the RelationshipDef has a guid.
 * The name and the guid are the 2 ways that the RelationshipDef is identified.
 * <p>
 * RelationshipDefs have 2 ends, each of which specify cardinality, an EntityDef type name and name and optionally
 * whether the end is a container.
 * <p>
 * RelationshipDefs can have AttributeDefs - though only primitive types are allowed. <br>
 * RelationshipDefs have a relationshipCategory specifying the UML type of relationship required <br>
 * The way EntityDefs and RelationshipDefs are intended to be used is that EntityDefs will define AttributeDefs these AttributeDefs
 * will not specify an EntityDef type name as their types.
 * <p>
 * RelationshipDefs introduce new attributes to the entity instances. For example
 * <p>
 * EntityDef A might have attributes attr1,attr2,attr3 <br>
 * EntityDef B might have attributes attr4,attr5,attr6 <br>
 * RelationshipDef AtoB might define 2 ends <br>
 *
 * <pre>
 *    end1:  type A, name attr7
 *    end2:  type B, name attr8  </pre>
 *
 * <p>
 * When an instance of EntityDef A is created, it will have attributes attr1,attr2,attr3,attr7 <br>
 * When an instance of EntityDef B is created, it will have attributes attr4,attr5,attr6,attr8
 * <p>
 * In this way relationshipDefs can be authored separately from entityDefs and can inject relationship attributes into
 * the entity instances
 */
export interface AtlasRelationshipDefOutput extends AtlasStructDefOutput {
  /**
   * The relationshipEndDef represents an end of the relationship. The end of the relationship is defined by a type, an
   * attribute name, cardinality and whether it  is the container end of the relationship.
   */
  endDef1?: AtlasRelationshipEndDefOutput;
  /**
   * The relationshipEndDef represents an end of the relationship. The end of the relationship is defined by a type, an
   * attribute name, cardinality and whether it  is the container end of the relationship.
   */
  endDef2?: AtlasRelationshipEndDefOutput;
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
  relationshipCategory?: "ASSOCIATION" | "AGGREGATION" | "COMPOSITION";
  /** The label of the relationship. */
  relationshipLabel?: string;
}

/**
 * The relationshipEndDef represents an end of the relationship. The end of the relationship is defined by a type, an
 * attribute name, cardinality and whether it  is the container end of the relationship.
 */
export interface AtlasRelationshipEndDefOutput {
  /** single-valued attribute or multi-valued attribute. */
  cardinality?: "SINGLE" | "LIST" | "SET";
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

/** The definitions of type. */
export interface AtlasTypeDefOutput extends AtlasBaseTypeDefOutput, AtlasExtraTypeDefOutput {}

/** Extra properties for a type. */
export interface AtlasExtraTypeDefOutput {
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
  entityTypes?: Array<string>;
  /** An array of sub types. */
  subTypes?: Array<string>;
  /** An array of super types. */
  superTypes?: Array<string>;
  /** An array of relationship attributes. */
  relationshipAttributeDefs?: Array<AtlasRelationshipAttributeDefOutput>;
  /** The default value. */
  defaultValue?: string;
  /** An array of enum element definitions. */
  elementDefs?: Array<AtlasEnumElementDefOutput>;
  /**
   * The relationshipEndDef represents an end of the relationship. The end of the relationship is defined by a type, an
   * attribute name, cardinality and whether it  is the container end of the relationship.
   */
  endDef1?: AtlasRelationshipEndDefOutput;
  /**
   * The relationshipEndDef represents an end of the relationship. The end of the relationship is defined by a type, an
   * attribute name, cardinality and whether it  is the container end of the relationship.
   */
  endDef2?: AtlasRelationshipEndDefOutput;
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
  relationshipCategory?: "ASSOCIATION" | "AGGREGATION" | "COMPOSITION";
  /** The label of the relationship. */
  relationshipLabel?: string;
  /** An array of attribute definitions. */
  attributeDefs?: Array<AtlasAttributeDefOutput>;
}

/** The definitions of types. */
export interface AtlasTypesDefOutput {
  /** businessMetadataDefs */
  businessMetadataDefs?: Array<AtlasBusinessMetadataDefOutput>;
  /** An array of classification definitions. */
  classificationDefs?: Array<AtlasClassificationDefOutput>;
  /** An array of entity definitions. */
  entityDefs?: Array<AtlasEntityDefOutput>;
  /** An array of enum definitions. */
  enumDefs?: Array<AtlasEnumDefOutput>;
  /** An array of relationship definitions. */
  relationshipDefs?: Array<AtlasRelationshipDefOutput>;
  /** An array of struct definitions. */
  structDefs?: Array<AtlasStructDefOutput>;
  /** An array of term template definitions. */
  termTemplateDefs?: Array<TermTemplateDefOutput>;
}

/** term template definition for glossary term. */
export interface TermTemplateDefOutput extends AtlasStructDefOutput {}

/** The basic information of the type definition. */
export interface AtlasTypeDefHeaderOutput {
  /** The enum of type category. */
  category?:
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
  /** The GUID of the type definition. */
  guid?: string;
  /** The name of the type definition. */
  name?: string;
}
