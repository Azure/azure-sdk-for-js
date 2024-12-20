// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * An instance of an entity along with extended info - like hive_table,
 * hive_database.
 */
export interface AtlasEntityWithExtInfoOutput {
  /** The referred entities. */
  referredEntities?: Record<string, AtlasEntityOutput>;
  /** An instance of an entity - like hive_table, hive_database. */
  entity?: AtlasEntityOutput;
}

/** An instance of an entity - like hive_table, hive_database. */
export interface AtlasEntityOutput {
  /** The attributes of the struct. */
  attributes?: Record<string, any>;
  /** The name of the type. */
  typeName?: string;
  /** ETag for concurrency control. */
  lastModifiedTS?: string;
  /** Business attributes */
  businessAttributes?: Record<string, any>;
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
  /** The collection ID of the entity. */
  readonly collectionId?: string;
  /** Whether it is a shell entity */
  isIncomplete?: boolean;
  /** labels */
  labels?: string[];
  /** An array of term assignment headers indicating the meanings of the entity. */
  meanings?: Array<AtlasTermAssignmentHeaderOutput>;
  /** Used to record the provenance of an instance of an entity or relationship. */
  provenanceType?: number;
  /** Determines if there's a proxy. */
  proxy?: boolean;
  /** The attributes of relationship. */
  relationshipAttributes?: Record<string, any>;
  /**
   * Status of the entity - can be active or deleted. Deleted entities are not
   * removed.
   *
   * Possible values: "ACTIVE", "DELETED"
   */
  status?: EntityStatusOutput;
  /** The update time of the record. */
  updateTime?: number;
  /** The user who updated the record. */
  updatedBy?: string;
  /** The version of the entity. */
  version?: number;
  /** The dictionary of contacts for entities. Key could be Expert or Owner. */
  contacts?: Record<string, Array<ContactInfoOutput>>;
}

/**
 * An instance of a classification; it doesn't have an identity, this object
 * exists only when associated with an entity.
 */
export interface AtlasClassificationOutput {
  /** The attributes of the struct. */
  attributes?: Record<string, any>;
  /** The name of the type. */
  typeName?: string;
  /** ETag for concurrency control. */
  lastModifiedTS?: string;
  /** The GUID of the entity. */
  entityGuid?: string;
  /**
   * Status of the entity - can be active or deleted. Deleted entities are not
   * removed.
   *
   * Possible values: "ACTIVE", "DELETED"
   */
  entityStatus?: EntityStatusOutput;
  /** Determines if propagations will be removed on entity deletion. */
  removePropagationsOnEntityDelete?: boolean;
  /** An array of time boundaries indicating validity periods. */
  validityPeriods?: Array<TimeBoundaryOutput>;
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
  /**
   * The status of terms assignment.
   *
   * Possible values: "DISCOVERED", "PROPOSED", "IMPORTED", "VALIDATED", "DEPRECATED", "OBSOLETE", "OTHER"
   */
  status?: AtlasTermAssignmentStatusOutput;
  /** The steward of the term. */
  steward?: string;
  /** The GUID of the term. */
  termGuid?: string;
}

/** ContactInfo */
export interface ContactInfoOutput {
  /** Azure Active Directory object Id. */
  id?: string;
  /** additional information to describe this contact. */
  info?: string;
}

/** The mutation response result of entity. */
export interface EntityMutationResultOutput {
  /** A map of GUID assignments with entities. */
  guidAssignments?: Record<string, string>;
  /** The entity headers of mutated entities. */
  mutatedEntities?: Record<string, Array<AtlasEntityHeaderOutput>>;
  /** An array of entity headers that partially updated. */
  partialUpdatedEntities?: Array<AtlasEntityHeaderOutput>;
}

/** An instance of an entity - like hive_table, hive_database. */
export interface AtlasEntityHeaderOutput {
  /** The attributes of the struct. */
  attributes?: Record<string, any>;
  /** The name of the type. */
  typeName?: string;
  /** ETag for concurrency control. */
  lastModifiedTS?: string;
  /** An array of classification names. */
  classificationNames?: string[];
  /** An array of classifications. */
  classifications?: Array<AtlasClassificationOutput>;
  /** The display text. */
  displayText?: string;
  /** The GUID of the record. */
  guid?: string;
  /** Whether it is a shell entity */
  isIncomplete?: boolean;
  /** labels */
  labels?: string[];
  /** An array of meanings. */
  meaningNames?: string[];
  /** An array of term assignment headers. */
  meanings?: Array<AtlasTermAssignmentHeaderOutput>;
  /**
   * Status of the entity - can be active or deleted. Deleted entities are not
   * removed.
   *
   * Possible values: "ACTIVE", "DELETED"
   */
  status?: EntityStatusOutput;
}

/** An error response from the service */
export interface AtlasErrorResponseOutput {
  /** The request ID. */
  requestId?: string;
  /** The error code. */
  errorCode?: string;
  /** The error message. */
  errorMessage?: string;
}

/**
 * An instance of an entity along with extended info - like hive_table,
 * hive_database.
 */
export interface AtlasEntitiesWithExtInfoOutput {
  /** The referred entities. */
  referredEntities?: Record<string, AtlasEntityOutput>;
  /** An array of entities. */
  entities?: Array<AtlasEntityOutput>;
}

/** REST serialization friendly list. */
export interface AtlasClassificationsOutput {
  /** An array of objects. */
  list?: any[];
  /** The size of the page. */
  pageSize?: number;
  /** The sorted by field. */
  sortBy?: string;
  /**
   * to specify whether the result should be sorted? If yes, whether asc or desc.
   *
   * Possible values: "NONE", "ASC", "DESC"
   */
  sortType?: SortTypeOutput;
  /** The start index of the page. */
  startIndex?: number;
  /** The total count of items. */
  totalCount?: number;
}

/** Bulk import result */
export interface BulkImportResultOutput {
  /** failed importInfoList */
  failedImportInfoList?: Array<ImportInfoOutput>;
  /** successful importInfoList */
  successImportInfoList?: Array<ImportInfoOutput>;
}

/** ImportInfo */
export interface ImportInfoOutput {
  /** childObjectName */
  childObjectName?: string;
  /**
   * importStatus
   *
   * Possible values: "SUCCESS", "FAILED"
   */
  importStatus?: ImportStatusOutput;
  /** parentObjectName */
  parentObjectName?: string;
  /** remarks */
  remarks?: string;
}

/** The glossary object. */
export interface AtlasGlossaryOutput {
  /** The GUID of the object. */
  guid?: string;
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
  /** The created time of the record. */
  createTime?: number;
  /** The user who created the record. */
  createdBy?: string;
  /** The update time of the record. */
  updateTime?: number;
  /** The user who updated the record. */
  updatedBy?: string;
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
  /**
   * The status of term relationship.
   *
   * Possible values: "DRAFT", "ACTIVE", "DEPRECATED", "OBSOLETE", "OTHER"
   */
  status?: AtlasTermRelationshipStatusOutput;
  /** The steward of the term. */
  steward?: string;
  /** The GUID of the term. */
  termGuid?: string;
}

/** The glossary category. */
export interface AtlasGlossaryCategoryOutput {
  /** The GUID of the object. */
  guid?: string;
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
  /** The created time of the record. */
  createTime?: number;
  /** The user who created the record. */
  createdBy?: string;
  /** The update time of the record. */
  updateTime?: number;
  /** The user who updated the record. */
  updatedBy?: string;
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
export interface AtlasGlossaryTermOutput {
  /** The GUID of the object. */
  guid?: string;
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
  /** The created time of the record. */
  createTime?: number;
  /** The user who created the record. */
  createdBy?: string;
  /** The update time of the record. */
  updateTime?: number;
  /** The user who updated the record. */
  updatedBy?: string;
  /** The abbreviation of the term. */
  abbreviation?: string;
  /** The name of the template. */
  templateName?: any[];
  /** The glossary header with basic information. */
  anchor?: AtlasGlossaryHeaderOutput;
  /** An array of related term headers as antonyms. */
  antonyms?: Array<AtlasRelatedTermHeaderOutput>;
  /**
   * Status of the AtlasGlossaryTerm
   *
   * Possible values: "Draft", "Approved", "Alert", "Expired"
   */
  status?: TermStatusOutput;
  /** The nick name of the term. */
  nickName?: string;
  /** The hierarchy information of the term. */
  hierarchyInfo?: Array<PurviewObjectIdOutput>;
  /** An array of resource link for term */
  resources?: Array<ResourceLinkOutput>;
  /** The dictionary of contacts for terms. Key could be Expert or Steward. */
  contacts?: Record<string, Array<ContactInfoOutput>>;
  /**
   * The custom attributes of the term, which is map<string,map<string,object>>.
   * The
   * key of the first layer map is term template name.
   */
  attributes?: Record<string, Record<string, any>>;
  /** An array of related object IDs. */
  assignedEntities?: Array<AtlasRelatedObjectIdOutput>;
  /** An array of term categorization headers. */
  categories?: Array<AtlasTermCategorizationHeaderOutput>;
  /** An array of related term headers. */
  classifies?: Array<AtlasRelatedTermHeaderOutput>;
  /** An array of examples. */
  examples?: string[];
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

/** PurviewObjectId */
export interface PurviewObjectIdOutput {
  /** The GUID of the object. */
  guid?: string;
  /** The name of the type. */
  typeName?: string;
  /** The unique attributes of the object. */
  uniqueAttributes?: Record<string, any>;
  /** Name */
  name?: string;
  /** Display text */
  displayText?: string;
  /** Item path */
  itemPath?: string;
  /** Resource Id */
  resourceId?: string;
  /** Dictionary of <any> */
  properties?: Record<string, any>;
}

/** ResourceLink */
export interface ResourceLinkOutput {
  /** Display name for url. */
  displayName?: string;
  /** web url. http or https */
  url?: string;
}

/**
 * Reference to an object-instance of AtlasEntity type used in relationship
 * attribute values
 */
export interface AtlasRelatedObjectIdOutput {
  /** The GUID of the object. */
  guid?: string;
  /** The name of the type. */
  typeName?: string;
  /** The unique attributes of the object. */
  uniqueAttributes?: Record<string, any>;
  /** The display text. */
  displayText?: string;
  /**
   * Status of the entity - can be active or deleted. Deleted entities are not
   * removed.
   *
   * Possible values: "ACTIVE", "DELETED"
   */
  entityStatus?: EntityStatusOutput;
  /** Relationship type */
  relationshipType?: string;
  /**
   * Captures details of struct contents. Not instantiated directly, used only via
   * AtlasEntity, AtlasClassification.
   */
  relationshipAttributes?: AtlasStructOutput;
  /** The GUID of the relationship. */
  relationshipGuid?: string;
  /**
   * The enum of relationship status.
   *
   * Possible values: "ACTIVE", "DELETED"
   */
  relationshipStatus?: StatusAtlasRelationshipOutput;
}

/**
 * Captures details of struct contents. Not instantiated directly, used only via
 * AtlasEntity, AtlasClassification.
 */
export interface AtlasStructOutput {
  /** The attributes of the struct. */
  attributes?: Record<string, any>;
  /** The name of the type. */
  typeName?: string;
  /** ETag for concurrency control. */
  lastModifiedTS?: string;
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
  /**
   * The status of term relationship.
   *
   * Possible values: "DRAFT", "ACTIVE", "DEPRECATED", "OBSOLETE", "OTHER"
   */
  status?: AtlasTermRelationshipStatusOutput;
}

/** The extended information of glossary. */
export interface AtlasGlossaryExtInfoOutput {
  /** The GUID of the object. */
  guid?: string;
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
  /** The created time of the record. */
  createTime?: number;
  /** The user who created the record. */
  createdBy?: string;
  /** The update time of the record. */
  updateTime?: number;
  /** The user who updated the record. */
  updatedBy?: string;
  /** An array of categories. */
  categories?: Array<AtlasRelatedCategoryHeaderOutput>;
  /** The language of the glossary. */
  language?: string;
  /** An array of related term headers. */
  terms?: Array<AtlasRelatedTermHeaderOutput>;
  /** The usage of the glossary. */
  usage?: string;
  /** The glossary category information. */
  categoryInfo?: Record<string, AtlasGlossaryCategoryOutput>;
  /** The glossary term information. */
  termInfo?: Record<string, AtlasGlossaryTermOutput>;
}

/** The result of the search result. */
export interface QueryResultOutput {
  /**
   * The total number of search results (not the number of documents in a single
   * page).
   */
  "@search.count"?: number;
  /** 'True' if the '@search.count' is an approximate value and vise versa. */
  "@search.count.approximate"?: boolean;
  /** The token used to get next batch of data. Absent if there's no more data. */
  continuationToken?: string;
  /**
   * A facet list that consists of index fields assetType ,classification,
   * contactId, and label. When the facet is specified in the request, the value of
   * the facet is returned as an element of @search.facets.
   */
  "@search.facets"?: SearchFacetResultValueOutput;
  /** Search result value */
  value?: Array<SearchResultValueOutput>;
}

/**
 * A facet list that consists of index fields assetType ,classification,
 * contactId, and label. When the facet is specified in the request, the value of
 * the facet is returned as an element of @search.facets.
 */
export interface SearchFacetResultValueOutput {
  /** Entity type */
  entityType?: Array<SearchFacetItemValueOutput>;
  /** Asset type */
  assetType?: Array<SearchFacetItemValueOutput>;
  /** Classification */
  classification?: Array<SearchFacetItemValueOutput>;
  /** Term */
  term?: Array<SearchFacetItemValueOutput>;
  /** Contact id */
  contactId?: Array<SearchFacetItemValueOutput>;
  /** Contact type */
  contactType?: Array<SearchFacetItemValueOutput>;
  /** Label */
  label?: Array<SearchFacetItemValueOutput>;
  /** Glossary type */
  glossaryType?: Array<SearchFacetItemValueOutput>;
  /** Term status */
  termStatus?: Array<SearchFacetItemValueOutput>;
  /** Term template */
  termTemplate?: Array<SearchFacetItemValueOutput>;
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
  /**
   * The search score calculated by the search engine. The results are ordered by
   * search score by default.
   */
  "@search.score"?: number;
  /**
   * A highlight list that consists of index fields id ,qualifiedName, name,
   * description, entityType. When the keyword appears in those fields, the value of
   * the field, attached with emphasis mark, is returned as an element of
   * @search.highlights.
   */
  "@search.highlights"?: SearchHighlightsOutput;
  /**
   * The object type of the record. Object type is the top-level property to
   * distinguish whether a record is an asset or a term.
   */
  objectType?: string;
  /** The create time of the record. The Unix epoch format. */
  createTime?: number;
  /** The last update time of the record. The Unix epoch format. */
  updateTime?: number;
  /** The GUID of the record. */
  id?: string;
  /** The name of the record. */
  name?: string;
  /** The qualified name of the record. */
  qualifiedName?: string;
  /** The type name of the asset. */
  entityType?: string;
  /** The description of the asset. */
  description?: string;
  /** The endorsement of the asset. */
  endorsement?: string;
  /** The owner of the record. */
  owner?: string;
  /** The classifications of the record. */
  classification?: string[];
  /** The labels of the asset. */
  label?: string[];
  /** The terms assigned to the asset. */
  term?: Array<TermSearchResultValueOutput>;
  /** The contacts of the asset. */
  contact?: Array<ContactSearchResultValueOutput>;
  /** The asset types of the asset. */
  assetType?: string[];
  /**
   * The type name of the term. Could be AtlasGlossary, AtlasGlossaryTerm or
   * AtlasGlossaryCategory.
   */
  glossaryType?: string;
  /** The glossary name of the term. */
  glossary?: string;
  /** The status of the term. */
  termStatus?: string;
  /** The term template names used by the term. */
  termTemplate?: string[];
  /** The definition of the term. */
  longDescription?: string;
}

/**
 * A highlight list that consists of index fields id ,qualifiedName, name,
 * description, entityType. When the keyword appears in those fields, the value of
 * the field, attached with emphasis mark, is returned as an element of
 * @search.highlights.
 */
export interface SearchHighlightsOutput {
  /** Id */
  id?: string[];
  /** Qualified name */
  qualifiedName?: string[];
  /** Name */
  name?: string[];
  /** Description */
  description?: string[];
  /** Entity type */
  entityType?: string[];
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
  /**
   * The type of the contact. It can be Expert or Owner for an entity. It can be
   * Expert or Steward for a glossary term.
   */
  contactType?: string;
}

/** The result item of the search suggest. */
export interface SuggestResultOutput {
  /** The result value */
  value?: Array<SuggestResultValueOutput>;
}

/** The value item of the search suggest. */
export interface SuggestResultValueOutput {
  /**
   * The search score calculated by the search engine. The results are ordered by
   * search score by default.
   */
  "@search.score"?: number;
  /**
   * The target text that contains the keyword as prefix. The keyword is wrapped
   * with emphasis mark.
   */
  "@search.text"?: string;
  /**
   * The object type of the record. Object type is the top-level property to
   * distinguish whether a record is an asset or a term.
   */
  objectType?: string;
  /** The create time of the record. The Unix epoch format. */
  createTime?: number;
  /** The last update time of the record. The Unix epoch format. */
  updateTime?: number;
  /** The GUID of the record. */
  id?: string;
  /** The name of the record. */
  name?: string;
  /** The qualified name of the record. */
  qualifiedName?: string;
  /** The type name of the asset. */
  entityType?: string;
  /** The description of the asset. */
  description?: string;
  /** The endorsement of the asset. */
  endorsement?: string;
  /** The owner of the record. */
  owner?: string;
  /** The classifications of the record. */
  classification?: string[];
  /** The labels of the asset. */
  label?: string[];
  /** The terms assigned to the asset. */
  term?: Array<TermSearchResultValueOutput>;
  /** The contacts of the asset. */
  contact?: Array<ContactSearchResultValueOutput>;
  /** The asset types of the asset. */
  assetType?: string[];
  /**
   * The type name of the term. Could be AtlasGlossary, AtlasGlossaryTerm or
   * AtlasGlossaryCategory.
   */
  glossaryType?: string;
  /** The glossary name of the term. */
  glossary?: string;
  /** The status of the term. */
  termStatus?: string;
  /** The term template names used by the term. */
  termTemplate?: string[];
  /** The definition of the term. */
  longDescription?: string;
}

/** The result of the autocomplete request. */
export interface AutoCompleteResultOutput {
  /** The result value */
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
  widthCounts?: Record<string, Record<string, any>>;
  /** The depth of lineage. */
  lineageDepth?: number;
  /** The width of lineage. */
  lineageWidth?: number;
  /** The number of children node. */
  childrenCount?: number;
  /**
   * The enum of lineage direction.
   *
   * Possible values: "INPUT", "OUTPUT", "BOTH"
   */
  lineageDirection?: LineageDirectionOutput;
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
export interface AtlasRelationshipOutput {
  /** The attributes of the struct. */
  attributes?: Record<string, any>;
  /** The name of the type. */
  typeName?: string;
  /** ETag for concurrency control. */
  lastModifiedTS?: string;
  /** The created time of the record. */
  createTime?: number;
  /** The user who created the record. */
  createdBy?: string;
  /** Reference to an object-instance of a type - like entity. */
  end1?: AtlasObjectIdOutput;
  /** Reference to an object-instance of a type - like entity. */
  end2?: AtlasObjectIdOutput;
  /** The GUID of the relationship. */
  guid?: string;
  /** The home ID of the relationship. */
  homeId?: string;
  /** The label of the relationship. */
  label?: string;
  /** Used to record the provenance of an instance of an entity or relationship */
  provenanceType?: number;
  /**
   * The enum of relationship status.
   *
   * Possible values: "ACTIVE", "DELETED"
   */
  status?: StatusAtlasRelationshipOutput;
  /** The update time of the record. */
  updateTime?: number;
  /** The user who updated the record. */
  updatedBy?: string;
  /** The version of the relationship. */
  version?: number;
}

/** Reference to an object-instance of a type - like entity. */
export interface AtlasObjectIdOutput {
  /** The GUID of the object. */
  guid?: string;
  /** The name of the type. */
  typeName?: string;
  /** The unique attributes of the object. */
  uniqueAttributes?: Record<string, any>;
}

/** The relationship with extended information. */
export interface AtlasRelationshipWithExtInfoOutput {
  /** The referred entity header. */
  referredEntities?: Record<string, AtlasEntityHeaderOutput>;
  /** Atlas relationship instance. */
  relationship?: AtlasRelationshipOutput;
}

/** class that captures details of a struct-type. */
export interface AtlasBusinessMetadataDefOutput {
  /**
   * The enum of type category.
   *
   * Possible values: "PRIMITIVE", "OBJECT_ID_TYPE", "ENUM", "STRUCT", "CLASSIFICATION", "ENTITY", "ARRAY", "MAP", "RELATIONSHIP", "TERM_TEMPLATE"
   */
  category?: TypeCategoryOutput;
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
  /** An array of attribute definitions. */
  attributeDefs?: Array<AtlasAttributeDefOutput>;
}

/** The date format. */
export interface DateFormatOutput {
  /** An array of available locales. */
  availableLocales?: string[];
  /** Calendar */
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
  availableLocales?: string[];
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
  /**
   * The enum of rounding mode.
   *
   * Possible values: "UP", "DOWN", "CEILING", "FLOOR", "HALF_UP", "HALF_DOWN", "HALF_EVEN", "UNNECESSARY"
   */
  roundingMode?: RoundingModeOutput;
}

/** The timezone information. */
export interface TimeZoneOutput {
  /** The value of the daylight saving time. */
  dstSavings?: number;
  /** The ID of the timezone. */
  id?: string;
  /** An array of available IDs. */
  availableIds?: string[];
  /** The timezone information. */
  default?: TimeZoneOutput;
  /** The display name of the timezone. */
  displayName?: string;
  /** The raw offset of the timezone. */
  rawOffset?: number;
}

/** class that captures details of a struct-attribute. */
export interface AtlasAttributeDefOutput {
  /**
   * single-valued attribute or multi-valued attribute.
   *
   * Possible values: "SINGLE", "LIST", "SET"
   */
  cardinality?: CardinalityValueOutput;
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
  params?: Record<string, any>;
  /** The type of the constraint. */
  type?: string;
}

/** class that captures details of a classification-type. */
export interface AtlasClassificationDefOutput {
  /**
   * The enum of type category.
   *
   * Possible values: "PRIMITIVE", "OBJECT_ID_TYPE", "ENUM", "STRUCT", "CLASSIFICATION", "ENTITY", "ARRAY", "MAP", "RELATIONSHIP", "TERM_TEMPLATE"
   */
  category?: TypeCategoryOutput;
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
  /** An array of attribute definitions. */
  attributeDefs?: Array<AtlasAttributeDefOutput>;
  /**
   * Specifying a list of entityType names in the classificationDef, ensures that
   * classifications can
   * only be applied to those entityTypes.
   *
   * Any subtypes of the entity types inherit the restriction.
   *
   * Any classificationDef subtypes inherit the parents entityTypes restrictions.
   *
   * Any classificationDef subtypes can further restrict the parents entityTypes
   * restrictions by specifying a subset of the entityTypes.
   *
   * An empty entityTypes list when there are no parent restrictions means there are no
   * restrictions.
   *
   * An empty entityTypes list when there are parent
   * restrictions means that the subtype picks up the parents
   * restrictions.
   *
   * If a list of entityTypes are supplied, where one inherits
   * from another, this will be rejected. This should encourage cleaner
   * classificationsDefs.
   *
   */
  entityTypes?: string[];
  /** An array of sub types. */
  subTypes?: string[];
  /** An array of super types. */
  superTypes?: string[];
}

/** class that captures details of a entity-type. */
export interface AtlasEntityDefOutput {
  /**
   * The enum of type category.
   *
   * Possible values: "PRIMITIVE", "OBJECT_ID_TYPE", "ENUM", "STRUCT", "CLASSIFICATION", "ENTITY", "ARRAY", "MAP", "RELATIONSHIP", "TERM_TEMPLATE"
   */
  category?: TypeCategoryOutput;
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
  /** An array of attribute definitions. */
  attributeDefs?: Array<AtlasAttributeDefOutput>;
  /** An array of sub types. */
  subTypes?: string[];
  /** An array of super types. */
  superTypes?: string[];
  /** An array of relationship attributes. */
  relationshipAttributeDefs?: Array<AtlasRelationshipAttributeDefOutput>;
}

/**
 * The relationshipEndDef represents an end of the relationship. The end of the
 * relationship is defined by a type, an
 * attribute name, cardinality and whether
 * it  is the container end of the relationship.
 */
export interface AtlasRelationshipAttributeDefOutput {
  /**
   * single-valued attribute or multi-valued attribute.
   *
   * Possible values: "SINGLE", "LIST", "SET"
   */
  cardinality?: CardinalityValueOutput;
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
  /** Determines if it is a legacy attribute. */
  isLegacyAttribute?: boolean;
  /** The name of the relationship type. */
  relationshipTypeName?: string;
}

/** class that captures details of an enum-type. */
export interface AtlasEnumDefOutput {
  /**
   * The enum of type category.
   *
   * Possible values: "PRIMITIVE", "OBJECT_ID_TYPE", "ENUM", "STRUCT", "CLASSIFICATION", "ENTITY", "ARRAY", "MAP", "RELATIONSHIP", "TERM_TEMPLATE"
   */
  category?: TypeCategoryOutput;
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
 * As with other typeDefs the AtlasRelationshipDef has a name. Once created the
 * RelationshipDef has a guid.
 * The name and the guid are the 2 ways that the
 * RelationshipDef is identified.
 * RelationshipDefs have 2 ends, each of which
 * specify cardinality, an EntityDef type name and name and optionally
 * whether the
 * end is a container.
 * RelationshipDefs can have AttributeDefs - though only
 * primitive types are allowed.
 * RelationshipDefs have a relationshipCategory
 * specifying the UML type of relationship required
 * The way EntityDefs and
 * RelationshipDefs are intended to be used is that EntityDefs will define
 * AttributeDefs these AttributeDefs
 * will not specify an EntityDef type name as
 * their types.
 * RelationshipDefs introduce new attributes to the entity
 * instances. For example
 * EntityDef A might have attributes attr1,attr2,attr3
 *
 * EntityDef B might have attributes attr4,attr5,attr6
 * RelationshipDef
 * AtoB might define 2 ends
 *
 * end1:  type A, name attr7
 * end2:  type B, name attr8
 *
 * When an instance of EntityDef A is created, it
 * will have attributes attr1,attr2,attr3,attr7
 * When an instance of EntityDef
 * B is created, it will have attributes attr4,attr5,attr6,attr8
 *
 * In this way
 * relationshipDefs can be authored separately from entityDefs and can inject
 * relationship attributes into
 * the entity instances
 */
export interface AtlasRelationshipDefOutput {
  /**
   * The enum of type category.
   *
   * Possible values: "PRIMITIVE", "OBJECT_ID_TYPE", "ENUM", "STRUCT", "CLASSIFICATION", "ENTITY", "ARRAY", "MAP", "RELATIONSHIP", "TERM_TEMPLATE"
   */
  category?: TypeCategoryOutput;
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
  /** An array of attribute definitions. */
  attributeDefs?: Array<AtlasAttributeDefOutput>;
  /**
   * The relationshipEndDef represents an end of the relationship. The end of the
   * relationship is defined by a type, an
   * attribute name, cardinality and whether
   * it  is the container end of the relationship.
   */
  endDef1?: AtlasRelationshipEndDefOutput;
  /**
   * The relationshipEndDef represents an end of the relationship. The end of the
   * relationship is defined by a type, an
   * attribute name, cardinality and whether
   * it  is the container end of the relationship.
   */
  endDef2?: AtlasRelationshipEndDefOutput;
  /**
   * The Relationship category determines the style of relationship around
   * containment and lifecycle.
   * UML terminology is used for the values.
   * ASSOCIATION is a relationship with no containment.
   * COMPOSITION and AGGREGATION are containment relationships.
   * The difference being in the lifecycles of the container and its children.
   * In the COMPOSITION case, the children cannot exist without the container.
   * For AGGREGATION, the life cycles of the container and children are totally independent.
   *
   * Possible values: "ASSOCIATION", "AGGREGATION", "COMPOSITION"
   */
  relationshipCategory?: RelationshipCategoryOutput;
  /** The label of the relationship. */
  relationshipLabel?: string;
}

/**
 * The relationshipEndDef represents an end of the relationship. The end of the
 * relationship is defined by a type, an
 * attribute name, cardinality and whether
 * it  is the container end of the relationship.
 */
export interface AtlasRelationshipEndDefOutput {
  /**
   * single-valued attribute or multi-valued attribute.
   *
   * Possible values: "SINGLE", "LIST", "SET"
   */
  cardinality?: CardinalityValueOutput;
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

/** class that captures details of a struct-type. */
export interface AtlasStructDefOutput {
  /**
   * The enum of type category.
   *
   * Possible values: "PRIMITIVE", "OBJECT_ID_TYPE", "ENUM", "STRUCT", "CLASSIFICATION", "ENTITY", "ARRAY", "MAP", "RELATIONSHIP", "TERM_TEMPLATE"
   */
  category?: TypeCategoryOutput;
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
  /** An array of attribute definitions. */
  attributeDefs?: Array<AtlasAttributeDefOutput>;
}

/** The definitions of type. */
export interface AtlasTypeDefOutput {
  /**
   * The enum of type category.
   *
   * Possible values: "PRIMITIVE", "OBJECT_ID_TYPE", "ENUM", "STRUCT", "CLASSIFICATION", "ENTITY", "ARRAY", "MAP", "RELATIONSHIP", "TERM_TEMPLATE"
   */
  category?: TypeCategoryOutput;
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
  /**
   * Specifying a list of entityType names in the classificationDef, ensures that
   * classifications can
   * only be applied to those entityTypes.
   *
   * Any subtypes of the entity types inherit the restriction.
   *
   * Any classificationDef subtypes inherit the parents entityTypes restrictions.
   *
   * Any classificationDef subtypes can further restrict the parents entityTypes
   * restrictions by specifying a subset of the entityTypes.
   *
   * An empty entityTypes list when there are no parent restrictions means there are no
   * restrictions.
   *
   * An empty entityTypes list when there are parent
   * restrictions means that the subtype picks up the parents
   * restrictions.
   *
   * If a list of entityTypes are supplied, where one inherits
   * from another, this will be rejected. This should encourage cleaner
   * classificationsDefs.
   *
   */
  entityTypes?: string[];
  /** An array of sub types. */
  subTypes?: string[];
  /** An array of super types. */
  superTypes?: string[];
  /** An array of relationship attributes. */
  relationshipAttributeDefs?: Array<AtlasRelationshipAttributeDefOutput>;
  /** The default value. */
  defaultValue?: string;
  /** An array of enum element definitions. */
  elementDefs?: Array<AtlasEnumElementDefOutput>;
  /**
   * The relationshipEndDef represents an end of the relationship. The end of the
   * relationship is defined by a type, an
   * attribute name, cardinality and whether
   * it  is the container end of the relationship.
   */
  endDef1?: AtlasRelationshipEndDefOutput;
  /**
   * The relationshipEndDef represents an end of the relationship. The end of the
   * relationship is defined by a type, an
   * attribute name, cardinality and whether
   * it  is the container end of the relationship.
   */
  endDef2?: AtlasRelationshipEndDefOutput;
  /**
   * The Relationship category determines the style of relationship around
   * containment and lifecycle.
   * UML terminology is used for the values.
   *
   * ASSOCIATION is a relationship with no containment.
   * COMPOSITION and AGGREGATION are containment relationships.
   *
   * The difference being in the lifecycles of the container and its children.
   * In the COMPOSITION case, the children cannot exist without the container.
   * For AGGREGATION, the life cycles of the container and children are totally independent.
   *
   * Possible values: "ASSOCIATION", "AGGREGATION", "COMPOSITION"
   */
  relationshipCategory?: RelationshipCategoryOutput;
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

/** Term template definition for glossary term. */
export interface TermTemplateDefOutput {
  /**
   * The enum of type category.
   *
   * Possible values: "PRIMITIVE", "OBJECT_ID_TYPE", "ENUM", "STRUCT", "CLASSIFICATION", "ENTITY", "ARRAY", "MAP", "RELATIONSHIP", "TERM_TEMPLATE"
   */
  category?: TypeCategoryOutput;
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
  /** An array of attribute definitions. */
  attributeDefs?: Array<AtlasAttributeDefOutput>;
}

/** The basic information of the type definition. */
export interface AtlasTypeDefHeaderOutput {
  /**
   * The enum of type category.
   *
   * Possible values: "PRIMITIVE", "OBJECT_ID_TYPE", "ENUM", "STRUCT", "CLASSIFICATION", "ENTITY", "ARRAY", "MAP", "RELATIONSHIP", "TERM_TEMPLATE"
   */
  category?: TypeCategoryOutput;
  /** The GUID of the type definition. */
  guid?: string;
  /** The name of the type definition. */
  name?: string;
}

/** Alias for EntityStatusOutput */
export type EntityStatusOutput = string;
/** Alias for AtlasTermAssignmentStatusOutput */
export type AtlasTermAssignmentStatusOutput = string;
/** Alias for SortTypeOutput */
export type SortTypeOutput = string;
/** Alias for ImportStatusOutput */
export type ImportStatusOutput = string;
/** Alias for AtlasTermRelationshipStatusOutput */
export type AtlasTermRelationshipStatusOutput = string;
/** Alias for TermStatusOutput */
export type TermStatusOutput = string;
/** Alias for StatusAtlasRelationshipOutput */
export type StatusAtlasRelationshipOutput = string;
/** Alias for LineageDirectionOutput */
export type LineageDirectionOutput = string;
/** Alias for TypeCategoryOutput */
export type TypeCategoryOutput = string;
/** Alias for RoundingModeOutput */
export type RoundingModeOutput = string;
/** Alias for CardinalityValueOutput */
export type CardinalityValueOutput = string;
/** Alias for RelationshipCategoryOutput */
export type RelationshipCategoryOutput = string;
