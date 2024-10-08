// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** An instance of an entity along with extended info - like hive_table, hive_database. */
export interface AtlasEntityWithExtInfo extends AtlasEntityExtInfo {
  /** An instance of an entity - like hive_table, hive_database. */
  entity?: AtlasEntity;
}

/** An instance of an entity - like hive_table, hive_database. */
export interface AtlasEntity extends AtlasStruct {
  /** Business Attributes */
  businessAttributes?: Record<string, Record<string, unknown>>;
  /** An array of classifications. */
  classifications?: Array<AtlasClassification>;
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
  meanings?: Array<AtlasTermAssignmentHeader>;
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
  contacts?: Record<string, Array<ContactBasic>>;
}

/** An instance of a classification; it doesn't have an identity, this object exists only when associated with an entity. */
export interface AtlasClassification extends AtlasStruct {
  /** The GUID of the entity. */
  entityGuid?: string;
  /** Status of the entity - can be active or deleted. Deleted entities are not removed from Atlas store. */
  entityStatus?: "ACTIVE" | "DELETED";
  /** Determines if propagations will be removed on entity deletion. */
  removePropagationsOnEntityDelete?: boolean;
  /** An array of time boundaries indicating validity periods. */
  validityPeriods?: Array<TimeBoundary>;
  /** indicate the source who create the classification detail */
  source?: string;
  /** more detail on source information */
  sourceDetails?: Record<string, Record<string, unknown>>;
}

/** Captures time-boundary details */
export interface TimeBoundary {
  /** The end of the time boundary. */
  endTime?: string;
  /** The start of the time boundary. */
  startTime?: string;
  /** The timezone of the time boundary. */
  timeZone?: string;
}

/** Captures details of struct contents. Not instantiated directly, used only via AtlasEntity, AtlasClassification. */
export interface AtlasStruct {
  /** The attributes of the struct. */
  attributes?: Record<string, Record<string, unknown>>;
  /** The name of the type. */
  typeName?: string;
  /** ETag for concurrency control. */
  lastModifiedTS?: string;
}

/** The header for term assignment. */
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
export interface ContactBasic {
  /** Azure Active Directory object Id. */
  id?: string;
  /** additional information to describe this contact. */
  info?: string;
}

/** An instance of an entity along with extended info - like hive_table, hive_database. */
export interface AtlasEntityExtInfo {
  /** The referred entities. */
  referredEntities?: Record<string, AtlasEntity>;
}

/** An instance of an entity - like hive_table, hive_database. */
export interface AtlasEntityHeader extends AtlasStruct {
  /** An array of classification names. */
  classificationNames?: Array<string>;
  /** An array of classifications. */
  classifications?: Array<AtlasClassification>;
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
  meanings?: Array<AtlasTermAssignmentHeader>;
  /** Status of the entity - can be active or deleted. Deleted entities are not removed from Atlas store. */
  status?: "ACTIVE" | "DELETED";
}

/** An instance of an entity along with extended info - like hive_table, hive_database. */
export interface AtlasEntitiesWithExtInfo extends AtlasEntityExtInfo {
  /** An array of entities. */
  entities?: Array<AtlasEntity>;
}

/** The request for classification association. */
export interface ClassificationAssociateRequest {
  /** An instance of a classification; it doesn't have an identity, this object exists only when associated with an entity. */
  classification?: AtlasClassification;
  /** The GUID of the entity. */
  entityGuids?: Array<string>;
}

/** An instance of an entity header map. */
export interface AtlasEntityHeaders {
  /** The description of the guid header map, */
  guidHeaderMap?: Record<string, AtlasEntityHeader>;
}

/** The glossary object. */
export interface AtlasGlossary extends AtlasGlossaryBaseObject {
  /** An array of categories. */
  categories?: Array<AtlasRelatedCategoryHeader>;
  /** The language of the glossary. */
  language?: string;
  /** An array of related term headers. */
  terms?: Array<AtlasRelatedTermHeader>;
  /** The usage of the glossary. */
  usage?: string;
}

/** The header of the related category. */
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

/** The header of the related term. */
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
  status?: "DRAFT" | "ACTIVE" | "DEPRECATED" | "OBSOLETE" | "OTHER";
  /** The steward of the term. */
  steward?: string;
  /** The GUID of the term. */
  termGuid?: string;
}

/** The glossary base object. */
export interface AtlasGlossaryBaseObject extends AtlasBaseModelObject {
  /** An array of classifications. */
  classifications?: Array<AtlasClassification>;
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
export interface AtlasBaseModelObject {
  /** The GUID of the object. */
  guid?: string;
}

/** The glossary category. */
export interface AtlasGlossaryCategory extends AtlasGlossaryBaseObject {
  /** The glossary header with basic information. */
  anchor?: AtlasGlossaryHeader;
  /** An array of children categories. */
  childrenCategories?: Array<AtlasRelatedCategoryHeader>;
  /** The header of the related category. */
  parentCategory?: AtlasRelatedCategoryHeader;
  /** An array of related term headers. */
  terms?: Array<AtlasRelatedTermHeader>;
}

/** The glossary header with basic information. */
export interface AtlasGlossaryHeader {
  /** The display text. */
  displayText?: string;
  /** The GUID of the glossary. */
  glossaryGuid?: string;
  /** The GUID of the relationship. */
  relationGuid?: string;
}

/** The glossary term. */
export interface AtlasGlossaryTerm extends AtlasGlossaryBaseObject {
  /** The abbreviation of the term. */
  abbreviation?: string;
  templateName?: Array<Record<string, unknown>>;
  /** The glossary header with basic information. */
  anchor?: AtlasGlossaryHeader;
  /** An array of related term headers as antonyms. */
  antonyms?: Array<AtlasRelatedTermHeader>;
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
  resources?: Array<ResourceLink>;
  /** The dictionary of contacts for terms. Key could be Expert or Steward. */
  contacts?: Record<string, Array<ContactBasic>>;
  /**
   * The custom attributes of the term, which is map<string,map<string,object>>.
   * The key of the first layer map is term template name.
   */
  attributes?: Record<string, Record<string, Record<string, unknown>>>;
  /** An array of related object IDs. */
  assignedEntities?: Array<AtlasRelatedObjectId>;
  /** An array of term categorization headers. */
  categories?: Array<AtlasTermCategorizationHeader>;
  /** An array of related term headers. */
  classifies?: Array<AtlasRelatedTermHeader>;
  /** An array of examples. */
  examples?: Array<string>;
  /** An array of related term headers indicating the is-a relationship. */
  isA?: Array<AtlasRelatedTermHeader>;
  /** An array of preferred related term headers. */
  preferredTerms?: Array<AtlasRelatedTermHeader>;
  /** An array of related term headers that are preferred to. */
  preferredToTerms?: Array<AtlasRelatedTermHeader>;
  /** An array of related term headers that are replaced by. */
  replacedBy?: Array<AtlasRelatedTermHeader>;
  /** An array of related term headers for replacement. */
  replacementTerms?: Array<AtlasRelatedTermHeader>;
  /** An array of related term headers for see also. */
  seeAlso?: Array<AtlasRelatedTermHeader>;
  /** An array of related term headers as synonyms. */
  synonyms?: Array<AtlasRelatedTermHeader>;
  /** An array of translated related term headers. */
  translatedTerms?: Array<AtlasRelatedTermHeader>;
  /** An array of related term headers for translation. */
  translationTerms?: Array<AtlasRelatedTermHeader>;
  /** The usage of the term. */
  usage?: string;
  /** An array of related term headers as valid values. */
  validValues?: Array<AtlasRelatedTermHeader>;
  /** An array of related term headers as valid values for other records. */
  validValuesFor?: Array<AtlasRelatedTermHeader>;
}

/** ResourceLink */
export interface ResourceLink {
  /** Display name for url. */
  displayName?: string;
  /** web url. http or https */
  url?: string;
}

/** Reference to an object-instance of AtlasEntity type used in relationship attribute values */
export interface AtlasRelatedObjectId extends AtlasObjectId {
  /** The display text. */
  displayText?: string;
  /** Status of the entity - can be active or deleted. Deleted entities are not removed from Atlas store. */
  entityStatus?: "ACTIVE" | "DELETED";
  relationshipType?: string;
  /** Captures details of struct contents. Not instantiated directly, used only via AtlasEntity, AtlasClassification. */
  relationshipAttributes?: AtlasStruct;
  /** The GUID of the relationship. */
  relationshipGuid?: string;
  /** The enum of relationship status. */
  relationshipStatus?: "ACTIVE" | "DELETED";
}

/** Reference to an object-instance of an Atlas type - like entity. */
export interface AtlasObjectId {
  /** The GUID of the object. */
  guid?: string;
  /** The name of the type. */
  typeName?: string;
  /** The unique attributes of the object. */
  uniqueAttributes?: Record<string, Record<string, unknown>>;
}

/** The basic information for term categorization. */
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
  status?: "DRAFT" | "ACTIVE" | "DEPRECATED" | "OBSOLETE" | "OTHER";
}

/** The extended information of glossary. */
export interface AtlasGlossaryExtInfo extends AtlasGlossary {
  /** The glossary category information. */
  categoryInfo?: Record<string, AtlasGlossaryCategory>;
  /** The glossary term information. */
  termInfo?: Record<string, AtlasGlossaryTerm>;
}

/** The search query of advanced search request. */
export interface SearchRequest {
  /** The keywords applied to all searchable fields. */
  keywords?: string;
  /** The offset. The default value is 0. The maximum value is 100000. */
  offset?: number;
  /** The limit of the number of the search result. default value is 50; maximum value is 1000. */
  limit?: number;
  /** The filter for the search. See examples for the usage of supported filters. */
  filter?: Record<string, unknown>;
  facets?: Array<SearchFacetItem>;
  taxonomySetting?: SearchRequestTaxonomySetting;
}

/** The content of a search facet result item. */
export interface SearchFacetItem {
  /** The count of the facet item. */
  count?: number;
  /** The name of the facet item. */
  facet?: string;
  /** Any object */
  sort?: Record<string, unknown>;
}

export interface SearchRequestTaxonomySetting {
  assetTypes?: Array<string>;
  /** The content of a search facet result item. */
  facet?: SearchFacetItem;
}

/** The query of suggest request. */
export interface SuggestRequest {
  /** The keywords applied to all fields that support suggest operation. It must be at least 1 character, and no more than 100 characters. In the index schema we defined a default suggester which lists all the supported fields and specifies a search mode. */
  keywords?: string;
  /** The number of suggestions we hope to return. The default value is 5. The value must be a number between 1 and 100. */
  limit?: number;
  /** The filter for the search. */
  filter?: Record<string, unknown>;
}

/** The criteria of browse request. */
export interface BrowseRequest {
  /** The entity type to browse as the root level entry point. */
  entityType?: string;
  /** The path to browse the next level child entities. */
  path?: string;
  /** The number of browse items we hope to return. The maximum value is 10000. */
  limit?: number;
  /** The offset. The default value is 0. The maximum value is 100000. */
  offset?: number;
}

/** The query of autocomplete request. */
export interface AutoCompleteRequest {
  /** The keywords applied to all fields that support autocomplete operation. It must be at least 1 character, and no more than 100 characters. */
  keywords?: string;
  /** The number of autocomplete results we hope to return. The default value is 50. The value must be a number between 1 and 100. */
  limit?: number;
  /** The filter for the autocomplete request. */
  filter?: Record<string, unknown>;
}

/** Atlas relationship instance. */
export interface AtlasRelationship extends AtlasStruct {
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
  status?: "ACTIVE" | "DELETED";
  /** The update time of the record. */
  updateTime?: number;
  /** The user who updated the record. */
  updatedBy?: string;
  /** The version of the relationship. */
  version?: number;
}

/** class that captures details of a struct-type. */
export interface AtlasBusinessMetadataDef extends AtlasStructDef {}

/** class that captures details of a struct-type. */
export interface AtlasStructDef extends AtlasBaseTypeDef {
  /** An array of attribute definitions. */
  attributeDefs?: Array<AtlasAttributeDef>;
}

/** class that captures details of a struct-attribute. */
export interface AtlasAttributeDef {
  /** single-valued attribute or multi-valued attribute. */
  cardinality?: "SINGLE" | "LIST" | "SET";
  /** An array of constraints. */
  constraints?: Array<AtlasConstraintDef>;
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
export interface AtlasConstraintDef {
  /** The parameters of the constraint definition. */
  params?: Record<string, Record<string, unknown>>;
  /** The type of the constraint. */
  type?: string;
}

/** Base class that captures common-attributes for all Atlas types. */
export interface AtlasBaseTypeDef {
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
  dateFormatter?: DateFormat;
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
export interface DateFormat {
  /** An array of available locales. */
  availableLocales?: Array<string>;
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

/** The number format. */
export interface NumberFormat {
  /** The number format. */
  availableLocales?: Array<string>;
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
export interface TimeZone {
  /** The value of the daylight saving time. */
  dstSavings?: number;
  /** The ID of the timezone. */
  id?: string;
  /** An array of available IDs. */
  availableIds?: Array<string>;
  /** The timezone information. */
  default?: TimeZone;
  /** The display name of the timezone. */
  displayName?: string;
  /** The raw offset of the timezone. */
  rawOffset?: number;
}

/** class that captures details of a classification-type. */
export interface AtlasClassificationDef extends AtlasStructDef {
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
export interface AtlasEntityDef extends AtlasStructDef {
  /** An array of sub types. */
  subTypes?: Array<string>;
  /** An array of super types. */
  superTypes?: Array<string>;
  /** An array of relationship attributes. */
  relationshipAttributeDefs?: Array<AtlasRelationshipAttributeDef>;
}

/**
 * The relationshipEndDef represents an end of the relationship. The end of the relationship is defined by a type, an
 * attribute name, cardinality and whether it  is the container end of the relationship.
 */
export interface AtlasRelationshipAttributeDef extends AtlasAttributeDef {
  /** Determines if it is a legacy attribute. */
  isLegacyAttribute?: boolean;
  /** The name of the relationship type. */
  relationshipTypeName?: string;
}

/** class that captures details of an enum-type. */
export interface AtlasEnumDef extends AtlasBaseTypeDef {
  /** The default value. */
  defaultValue?: string;
  /** An array of enum element definitions. */
  elementDefs?: Array<AtlasEnumElementDef>;
}

/** class that captures details of an enum-element. */
export interface AtlasEnumElementDef {
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
export interface AtlasRelationshipDef extends AtlasStructDef {
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
  relationshipCategory?: "ASSOCIATION" | "AGGREGATION" | "COMPOSITION";
  /** The label of the relationship. */
  relationshipLabel?: string;
}

/**
 * The relationshipEndDef represents an end of the relationship. The end of the relationship is defined by a type, an
 * attribute name, cardinality and whether it  is the container end of the relationship.
 */
export interface AtlasRelationshipEndDef {
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
export interface AtlasTypeDef extends AtlasBaseTypeDef, AtlasExtraTypeDef {}

/** Extra properties for a type. */
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
  entityTypes?: Array<string>;
  /** An array of sub types. */
  subTypes?: Array<string>;
  /** An array of super types. */
  superTypes?: Array<string>;
  /** An array of relationship attributes. */
  relationshipAttributeDefs?: Array<AtlasRelationshipAttributeDef>;
  /** The default value. */
  defaultValue?: string;
  /** An array of enum element definitions. */
  elementDefs?: Array<AtlasEnumElementDef>;
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
  relationshipCategory?: "ASSOCIATION" | "AGGREGATION" | "COMPOSITION";
  /** The label of the relationship. */
  relationshipLabel?: string;
  /** An array of attribute definitions. */
  attributeDefs?: Array<AtlasAttributeDef>;
}

/** The definitions of types. */
export interface AtlasTypesDef {
  /** businessMetadataDefs */
  businessMetadataDefs?: Array<AtlasBusinessMetadataDef>;
  /** An array of classification definitions. */
  classificationDefs?: Array<AtlasClassificationDef>;
  /** An array of entity definitions. */
  entityDefs?: Array<AtlasEntityDef>;
  /** An array of enum definitions. */
  enumDefs?: Array<AtlasEnumDef>;
  /** An array of relationship definitions. */
  relationshipDefs?: Array<AtlasRelationshipDef>;
  /** An array of struct definitions. */
  structDefs?: Array<AtlasStructDef>;
  /** An array of term template definitions. */
  termTemplateDefs?: Array<TermTemplateDef>;
}

/** term template definition for glossary term. */
export interface TermTemplateDef extends AtlasStructDef {}

export interface MoveEntitiesRequest {
  /** An array of entity guids to be moved to target collection. */
  entityGuids?: Array<string>;
}
