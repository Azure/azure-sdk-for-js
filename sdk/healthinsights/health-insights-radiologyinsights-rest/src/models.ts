// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Base for all elements
 * Based on [FHIR Element](https://www.hl7.org/fhir/datatypes.html#Element)
 */
export interface Extension extends Element {
  /** Source of the definition for the extension code - a logical name or a URL. */
  url: string;
  /** Value as Quantity */
  valueQuantity?: Quantity;
  /** Value as CodeableConcept */
  valueCodeableConcept?: CodeableConcept;
  /** Value as string */
  valueString?: string;
  /** Value as boolean */
  valueBoolean?: boolean;
  /** Value as integer */
  valueInteger?: number;
  /** Value as Range. */
  valueRange?: Range;
  /** Value as Ratio. */
  valueRatio?: Ratio;
  /** Value as SampledData. */
  valueSampledData?: SampledData;
  /** Value as time (hh:mm:ss) */
  valueTime?: Date | string;
  /** Value as dateTime. */
  valueDateTime?: string;
  /** Value as Period. */
  valuePeriod?: Period;
  /** Value as reference. */
  valueReference?: Reference;
}

/**
 * A measured or measurable amount
 * Based on [FHIR Quantity](https://www.hl7.org/fhir/R4/datatypes.html#Quantity)
 */
export interface Quantity extends Element {
  /** Numerical value (with implicit precision) */
  value?: number;
  /** \< | \<= | \>= | \> - how to understand the value */
  comparator?: string;
  /** Unit representation */
  unit?: string;
  /** System that defines coded unit form */
  system?: string;
  /** Coded form of the unit */
  code?: string;
}

/**
 * The base definition for all elements contained inside a resource.
 * Based on [FHIR Element](https://www.hl7.org/fhir/R4/element.html)
 */
export interface Element {
  /** Unique id for inter-element referencing */
  id?: string;
  /** Additional Content defined by implementations */
  extension?: Array<Extension>;
}

/**
 * Concept - reference to a terminology or just text
 * Based on [FHIR CodeableConcept](https://www.hl7.org/fhir/R4/datatypes.html#CodeableConcept)
 */
export interface CodeableConcept extends Element {
  /** Code defined by a terminology system */
  coding?: Array<Coding>;
  /** Plain text representation of the concept */
  text?: string;
}

/**
 * A Coding is a representation of a defined concept using a symbol from a defined "code system".
 * Based on [FHIR Coding](https://www.hl7.org/fhir/R4/datatypes.html#Coding)
 */
export interface Coding extends Element {
  /** Identity of the terminology system */
  system?: string;
  /** Version of the system - if relevant */
  version?: string;
  /** Symbol in syntax defined by the system */
  code?: string;
  /** Representation defined by the system */
  display?: string;
}

/**
 * A set of ordered Quantities defined by a low and high limit
 * Based on [FHIR Range](https://www.hl7.org/fhir/R4/datatypes.html#Range)
 */
export interface Range extends Element {
  /** Low limit */
  low?: Quantity;
  /** High limit */
  high?: Quantity;
}

/**
 * A ratio of two Quantity values - a numerator and a denominator
 * Based on [FHIR Ratio](https://www.hl7.org/fhir/R4/datatypes.html#Ratio)
 */
export interface Ratio extends Element {
  /** Numerator value */
  numerator?: Quantity;
  /** Denominator value */
  denominator?: Quantity;
}

/**
 * A series of measurements taken by a device
 * Based on [FHIR SampledData](https://www.hl7.org/fhir/R4/datatypes.html#SampledData)
 */
export interface SampledData extends Element {
  /** Zero value and units */
  origin: Quantity;
  /** Number of milliseconds between samples */
  period: number;
  /** Multiply data by this before adding to origin */
  factor?: number;
  /** Lower limit of detection */
  lowerLimit?: number;
  /** Upper limit of detection */
  upperLimit?: number;
  /** Number of sample points at each time point */
  dimensions: number;
  /** Decimal values with spaces, or "E" | "U" | "L" */
  data?: string;
}

/**
 * A time period defined by a start and end date and optionally time
 * Based on [FHIR Period](https://www.hl7.org/fhir/R4/datatypes.html#Period)
 */
export interface Period extends Element {
  /** Starting time with inclusive boundary */
  start?: string;
  /** End time with inclusive boundary, if not ongoing */
  end?: string;
}

/**
 * A reference from one resource to another
 * Based on [FHIR Reference](https://www.hl7.org/fhir/R4/references.html)
 */
export interface Reference extends Element {
  /** Literal reference, Relative, internal or absolute URL */
  reference?: string;
  /** Type the reference refers to (e.g. "Patient") */
  type?: string;
  /** Logical reference, when literal reference is not known */
  identifier?: Identifier;
  /** Text alternative for the resource */
  display?: string;
}

/**
 * An identifier intended for computation
 * Based on [FHIR Identifier](https://www.hl7.org/fhir/R4/identifier.html)
 */
export interface Identifier extends Element {
  /** usual | official | temp | secondary | old (If known) */
  use?: string;
  /** Description of identifier */
  type?: CodeableConcept;
  /** The namespace for the identifier value */
  system?: string;
  /** The value that is unique */
  value?: string;
  /** Time period when id is/was valid for use */
  period?: Period;
  /** Organization that issued id (may be just text) */
  assigner?: Reference;
}

/**
 * Any resource that is a [DomainResource](https://www.hl7.org/fhir/domainresource.html) may include a human-readable narrative that contains a summary of the resource and may be used to represent the content of the resource to a human.
 * Based on [FHIR Narrative](https://www.hl7.org/fhir/R4/narrative.html#Narrative)
 */
export interface Narrative extends Element {
  /** generated, extensions, additional, empty */
  status: string;
  /** xhtml */
  div: string;
}

/**
 * A text note which also  contains information about who made the statement and when
 * Based on [FHIR Annotation](https://www.hl7.org/fhir/R4/datatypes.html#Annotation)
 */
export interface Annotation extends Element {
  /** Individual responsible for the annotation */
  authorString?: string;
  /** When the annotation was made */
  time?: string;
  /** The annotation - text content (as markdown) */
  text: string;
}

/**
 * Component results
 * Based on [FHIR Observation.component](https://www.hl7.org/fhir/R4/observation.html)
 */
export interface ObservationComponent extends Element {
  /** Type of component observation (code / type) */
  code: CodeableConcept;
  /** Value as Quantity */
  valueQuantity?: Quantity;
  /** Value as CodeableConcept */
  valueCodeableConcept?: CodeableConcept;
  /** Value as string */
  valueString?: string;
  /** Value as boolean */
  valueBoolean?: boolean;
  /** Value as integer */
  valueInteger?: number;
  /** Value as Range. */
  valueRange?: Range;
  /** Value as Ratio. */
  valueRatio?: Ratio;
  /** Value as SampledData. */
  valueSampledData?: SampledData;
  /** Value as time (hh:mm:ss) */
  valueTime?: Date | string;
  /** Value as dateTime. */
  valueDateTime?: string;
  /** Value as Period. */
  valuePeriod?: Period;
  /** Value as reference. */
  valueReference?: Reference;
  /** Why the component result is missing */
  dataAbsentReason?: CodeableConcept;
  /** High, low, normal, etc. */
  interpretation?: Array<CodeableConcept>;
  /** Provides guide for interpretation of component result */
  referenceRange?: Array<ObservationReferenceRange>;
}

/**
 * Provides guide for interpretation of component result
 * Based on [FHIR Observation.referenceRange](https://www.hl7.org/fhir/R4/observation.html)
 */
export interface ObservationReferenceRange {
  /** Low Range, if relevant */
  low?: Quantity;
  /** High Range, if relevant */
  high?: Quantity;
  /** Reference range qualifier */
  type?: CodeableConcept;
  /** Reference range population */
  appliesTo?: Array<CodeableConcept>;
  /** Applicable age range, if relevant */
  age?: Range;
  /** Text based reference range in an observation */
  text?: string;
}

/** Contact details (See: https://www.hl7.org/fhir/R4/metadatatypes.html#ContactDetail) */
export interface ContactDetail extends Element {
  /** Name of an individual to contact */
  name?: string;
  /** Contact details for individual or organization */
  telecom?: Array<ContactPoint>;
}

/**
 * Details for all kinds of technology mediated contact points for a person or organization, including telephone, email, etc.
 * See https://www.hl7.org/fhir/R4/datatypes.html#ContactPoint
 */
export interface ContactPoint {
  /**
   * phone | fax | email | pager | url | sms | other
   *
   * Possible values: "phone", "fax", "email", "pager", "url", "sms", "other"
   */
  system?: string;
  /** The actual contact point details */
  value?: string;
  /**
   * home | work | temp | old | mobile - purpose of this contact point
   *
   * Possible values: "home", "work", "temp", "old", "mobile"
   */
  use?: string;
  /** Specify preferred order of use (1 = highest) */
  rank?: number;
  /** Time period when the contact point was/is in use */
  period?: Period;
}

/**
 * Detailed information about observations
 * Based on [FHIR Observation](https://www.hl7.org/fhir/R4/observation.html)
 */
export interface Observation extends DomainResourceParent {
  /** resourceType */
  resourceType: "Observation";
  /** Business Identifier for observation */
  identifier?: Array<Identifier>;
  /**
   * registered | preliminary | final | amended +
   *
   * Possible values: "registered", "preliminary", "final", "amended", "corrected", "cancelled", "entered-in-error", "unknown"
   */
  status: string;
  /** Classification of  type of observation */
  category?: Array<CodeableConcept>;
  /** Type of observation (code / type) */
  code: CodeableConcept;
  /** Who and/or what the observation is about */
  subject?: Reference;
  /** Healthcare event during which this observation is made */
  encounter?: Reference;
  /** Clinically relevant time/time-period for observation */
  effectiveDateTime?: string;
  /** Clinically relevant time/time-period for observation */
  effectivePeriod?: Period;
  /** Clinically relevant time/time-period for observation */
  effectiveInstant?: string;
  /** Date/Time this version was made available */
  issued?: string;
  /** Actual result */
  valueQuantity?: Quantity;
  /** Actual result */
  valueCodeableConcept?: CodeableConcept;
  /** Actual result */
  valueString?: string;
  /** Actual result */
  valueBoolean?: boolean;
  /** Actual result */
  valueInteger?: number;
  /** Actual result */
  valueRange?: Range;
  /** Actual result */
  valueRatio?: Ratio;
  /** Actual result */
  valueSampledData?: SampledData;
  /** Actual result */
  valueTime?: Date | string;
  /** Actual result */
  valueDateTime?: string;
  /** Actual result */
  valuePeriod?: Period;
  /** Why the result is missing */
  dataAbsentReason?: CodeableConcept;
  /** High, low, normal, etc. */
  interpretation?: Array<CodeableConcept>;
  /** Comments about the observation */
  note?: Array<Annotation>;
  /** Observed body part */
  bodySite?: CodeableConcept;
  /** How it was done */
  method?: CodeableConcept;
  /** Provides guide for interpretation */
  referenceRange?: Array<ObservationReferenceRange>;
  /** Related resource that belongs to the Observation group */
  hasMember?: Array<Reference>;
  /** Related measurements the observation is made from */
  derivedFrom?: Array<Reference>;
  /** Component results */
  component?: Array<ObservationComponent>;
}

/**
 * A resource with narrative, extensions, and contained resources
 * Based on [FHIR DomainResource](https://www.hl7.org/fhir/domainresource.html)
 */
export interface DomainResourceParent extends Resource {
  /** Text summary of the resource, for human interpretation */
  text?: Narrative;
  /** Contained, inline Resources */
  contained?: Array<Resource>;
  /** Additional Content defined by implementations */
  extension?: Array<Extension>;
  /** Extensions that cannot be ignored */
  modifierExtension?: Array<Extension>;
  resourceType: string;
}

/**
 * Resource is the ancestor of DomainResource from which most resources are derived. Bundle, Parameters, and Binary extend Resource directly.
 * Based on [FHIR Resource](https://www.hl7.org/fhir/r4/resource.html
 */
export interface Resource extends Record<string, unknown> {
  /** The type of resource */
  resourceType: string;
  /** Resource Id */
  id?: string;
  /** Metadata about the resource */
  meta?: Meta;
  /** A set of rules under which this content was created */
  implicitRules?: string;
  /** Language of the resource content */
  language?: string;
}

/**
 * Metadata about a resource
 * Based on [FHIR Meta](https://www.hl7.org/fhir/R4/resource.html#Meta)
 */
export interface Meta {
  /** The version specific identifier, as it appears in the version portion of the URL. This value changes when the resource is created, updated, or deleted. */
  versionId?: string;
  /** When the resource last changed - e.g. when the version changed. */
  lastUpdated?: string;
  /** A uri that identifies the source system of the resource. This provides a minimal amount of Provenance information that can be used to track or differentiate the source of information in the resource. The source may identify another FHIR server, document, message, database, etc. */
  source?: string;
  /** A list of profiles (references to [StructureDefinition](https://www.hl7.org/fhir/structuredefinition.html) resources) that this resource claims to conform to. The URL is a reference to [StructureDefinition.url](https://www.hl7.org/fhir/structuredefinition-definitions.html#StructureDefinition.url). */
  profile?: string[];
  /** Security labels applied to this resource. These tags connect specific resources to the overall security policy and infrastructure. */
  security?: Array<Coding>;
  /** Tags applied to this resource. Tags are intended to be used to identify and relate resources to process and workflow, and applications are not required to consider the tags when interpreting the meaning of a resource. */
  tag?: Array<Coding>;
}

/**
 * Detailed information about conditions, problems or diagnoses
 * Based on [FHIR Condition](https://www.hl7.org/fhir/R4/condition.html)
 */
export interface Condition extends DomainResourceParent {
  /** resourceType */
  resourceType: "Condition";
  /** External Ids for this condition */
  identifier?: Array<Identifier>;
  /** active | recurrence | relapse | inactive | remission | resolved */
  clinicalStatus?: CodeableConcept;
  /** unconfirmed | provisional | differential | confirmed | refuted | entered-in-error */
  verificationStatus?: CodeableConcept;
  /** problem-list-item | encounter-diagnosis */
  category?: Array<CodeableConcept>;
  /** Subjective severity of condition */
  severity?: CodeableConcept;
  /** Identification of the condition, problem or diagnosis */
  code?: CodeableConcept;
  /** Anatomical location, if relevant */
  bodySite?: Array<CodeableConcept>;
  /** Encounter created as part of */
  encounter?: Reference;
  /** Estimated or actual date,  date-time, or age */
  onsetDateTime?: string;
  /** Estimated or actual date,  date-time, or age */
  onsetAge?: Quantity;
  /** Estimated or actual date,  date-time, or age */
  onsetPeriod?: Period;
  /** Estimated or actual date,  date-time, or age */
  onsetRange?: Range;
  /** Estimated or actual date,  date-time, or age */
  onsetString?: string;
  /** When in resolution/remission */
  abatementDateTime?: string;
  /** When in resolution/remission */
  abatementAge?: Quantity;
  /** When in resolution/remission */
  abatementPeriod?: Period;
  /** When in resolution/remission */
  abatementRange?: Range;
  /** When in resolution/remission */
  abatementString?: string;
  /** Date record was first recorded */
  recordedDate?: string;
  /** stge/grade, usually assessed formally */
  stage?: Array<ConditionStage>;
  /** Additional information about the Condition */
  note?: Array<Annotation>;
}

/**
 * Stage/grade, usually assessed formally
 * Based on [FHIR Condition.Stage](https://www.hl7.org/fhir/R4/condition.html)
 */
export interface ConditionStage {
  /** Simple summary (disease specific) */
  summary?: CodeableConcept;
  /** Kind of staging */
  type?: CodeableConcept;
}

/**
 * Detailed information about Research Study
 * Based on [FHIR ResearchStudy](https://www.hl7.org/fhir/R4/researchstudy.html)
 */
export interface ResearchStudy extends DomainResourceParent {
  /** resourceType */
  resourceType: "ResearchStudy";
  /** Business Identifier for study */
  identifier?: Array<Identifier>;
  /** Name for this study */
  title?: string;
  /** Steps followed in executing study */
  protocol?: Array<Reference>;
  /** Part of larger study */
  partOf?: Array<Reference>;
  /**
   * active | administratively-completed | approved | closed-to-accrual | closed-to-accrual-and-intervention | completed | disapproved | in-review | temporarily-closed-to-accrual | temporarily-closed-to-accrual-and-intervention | withdrawn
   *
   * Possible values: "active", "administratively-completed", "approved", "closed-to-accrual", "closed-to-accrual-and-intervention", "completed", "disapproved", "in-review", "temporarily-closed-to-accrual", "temporarily-closed-to-accrual-and-intervention", "withdrawn"
   */
  status: string;
  /** treatment | prevention | diagnostic | supportive-care | screening | health-services-research | basic-science | device-feasibility */
  primaryPurposeType?: CodeableConcept;
  /** n-a | early-phase-1 | phase-1 | phase-1-phase-2 | phase-2 | phase-2-phase-3 | phase-3 | phase-4 */
  phase?: CodeableConcept;
  /** Classifications for the study */
  category?: Array<CodeableConcept>;
  /** Drugs, devices, etc. under study */
  focus?: Array<CodeableConcept>;
  /** Condition being studied */
  condition?: Array<CodeableConcept>;
  /** Contact details for the study */
  contact?: Array<ContactDetail>;
  /** Used to search for the study */
  keyword?: Array<CodeableConcept>;
  /** Geographic region(s) for study */
  location?: Array<CodeableConcept>;
  /** What this is study doing */
  description?: string;
  /** Inclusion & exclusion criteria */
  enrollment?: Array<Reference>;
  /** When the study began and ended */
  period?: Period;
  /** Organization that initiates and is legally responsible for the study */
  sponsor?: Reference;
  /** Researcher who oversees multiple aspects of the study */
  principalInvestigator?: Reference;
  /** Facility where study activities are conducted */
  site?: Array<Reference>;
  /** accrual-goal-met | closed-due-to-toxicity | closed-due-to-lack-of-study-progress | temporarily-closed-per-study-design */
  reasonStopped?: CodeableConcept;
  /** Comments made about the study */
  note?: Array<Annotation>;
  /** Defined path through the study for a subject */
  arm?: { name: string; type?: CodeableConcept; description?: string }[];
  /** A goal for the study */
  objective?: { name: string; type?: CodeableConcept }[];
}

/** Procedure information */
export interface OrderedProcedure {
  /** Additional Content defined by implementations */
  extension?: Array<Extension>;
  /** Procedure code */
  code?: CodeableConcept;
  /** Procedure description */
  description?: string;
}

/** Contains the list of patients, and configuration data. */
export interface RadiologyInsightsData {
  /** The list of patients, including their clinical information and data. */
  patients: Array<PatientRecord>;
  /** Configuration affecting the Radiology Insights model's inference. */
  configuration?: RadiologyInsightsModelConfiguration;
}

/** A patient record, including their clinical information and data. */
export interface PatientRecord {
  /** A given identifier for the patient. Has to be unique across all patients in a single request. */
  id: string;
  /** Patient structured information, including demographics and known structured clinical information. */
  info?: PatientInfo;
  /** Patient encounters/visits. */
  encounters?: Array<Encounter>;
  /** Patient unstructured clinical data, given as documents. */
  patientDocuments?: Array<PatientDocument>;
}

/** Patient structured information, including demographics and known structured clinical information. */
export interface PatientInfo {
  /**
   * The patient's sex.
   *
   * Possible values: "female", "male", "unspecified"
   */
  sex?: string;
  /** The patient's date of birth. */
  birthDate?: Date | string;
  /** Known clinical information for the patient, structured. */
  clinicalInfo?: Array<Resource>;
}

/** visit/encounter information */
export interface Encounter {
  /** The id of the visit. */
  id: string;
  /**
   * Time period of the visit.
   * In case of admission, use timePeriod.start to indicate the admission time and timePeriod.end to indicate the discharge time.
   */
  period?: TimePeriod;
  /**
   * The class of the encounter.
   *
   * Possible values: "inpatient", "ambulatory", "observation", "emergency", "virtual", "healthHome"
   */
  class?: string;
}

/** A duration of time during which an event is happening */
export interface TimePeriod {
  /** Starting time with inclusive boundary */
  start?: Date | string;
  /** End time with inclusive boundary, if not ongoing */
  end?: Date | string;
}

/** A clinical document related to a patient. Document here is in the wide sense - not just a text document (note). */
export interface PatientDocument {
  /**
   * The type of the patient document, such as 'note' (text document) or 'fhirBundle' (FHIR JSON document).
   *
   * Possible values: "note", "fhirBundle", "dicom", "genomicSequencing"
   */
  type: string;
  /**
   * The type of the clinical document.
   *
   * Possible values: "consultation", "dischargeSummary", "historyAndPhysical", "radiologyReport", "procedure", "progress", "laboratory", "pathologyReport"
   */
  clinicalType?: string;
  /** A given identifier for the document. Has to be unique across all documents for a single patient. */
  id: string;
  /** A 2 letter ISO 639-1 representation of the language of the document. */
  language?: string;
  /** The date and time when the document was created. */
  createdDateTime?: Date | string;
  /** Document author(s) */
  authors?: Array<DocumentAuthor>;
  /**
   * specialty type the document
   *
   * Possible values: "pathology", "radiology"
   */
  specialtyType?: string;
  /** Administrative metadata for the document. */
  administrativeMetadata?: DocumentAdministrativeMetadata;
  /** The content of the patient document. */
  content: DocumentContent;
}

/** Document author */
export interface DocumentAuthor {
  /** author id */
  id?: string;
  /** Text representation of the full name */
  fullName?: string;
}

/** Document administrative metadata */
export interface DocumentAdministrativeMetadata {
  /** List of procedure information associated with the document. */
  orderedProcedures?: Array<OrderedProcedure>;
  /** Reference to the encounter associated with the document. */
  encounterId?: string;
}

/** The content of the patient document. */
export interface DocumentContent {
  /**
   * The type of the content's source.
   * In case the source type is 'inline', the content is given as a string (for instance, text).
   * In case the source type is 'reference', the content is given as a URI.
   *
   * Possible values: "inline", "reference"
   */
  sourceType: string;
  /** The content of the document, given either inline (as a string) or as a reference (URI). */
  value: string;
}

/** Configuration affecting the Radiology Insights model's inference. */
export interface RadiologyInsightsModelConfiguration {
  /** An indication whether the model should produce verbose output. */
  verbose?: boolean;
  /** An indication whether the model's output should include evidence for the inferences. */
  includeEvidence?: boolean;
  /** This is a list of inference types to be inferred for the current request. It could be used if only part of the Radiology Insights inferences are required. If this list is omitted or empty, the model will return all the inference types. */
  inferenceTypes?: string[];
  /** Options regarding follow up recommendation inferences and finding inferences. */
  inferenceOptions?: RadiologyInsightsInferenceOptions;
  /** Local for the model to use. If not specified, the model will use the default locale. */
  locale?: string;
}

/** Options regarding follow up recommendation inferences and finding inferences. */
export interface RadiologyInsightsInferenceOptions {
  /** Follow-up recommendation options. */
  followupRecommendationOptions?: FollowupRecommendationOptions;
  /** Finding options. */
  findingOptions?: FindingOptions;
}

/** Follow-up recommendation options. */
export interface FollowupRecommendationOptions {
  /** Include/Exclude follow-up recommendations without a specific radiology procedure. Default is false. */
  includeRecommendationsWithNoSpecifiedModality?: boolean;
  /** Include/Exclude follow-up recommendations in references to a guideline or article. Default is false. */
  includeRecommendationsInReferences?: boolean;
  /** If this is true, provide one or more sentences as evidence for the recommendation, next to the token evidence. The start and end positions of these sentences will be put in an extension with url 'modality_sentences'. Default is false. */
  provideFocusedSentenceEvidence?: boolean;
}

/** Finding options. */
export interface FindingOptions {
  /** If this is true, provide the sentence that contains the first token of the finding's clinical indicator (i.e. the medical problem), if there is one. This sentence is provided as an extension with url 'ci_sentence', next to the token evidence. Default is false. */
  provideFocusedSentenceEvidence?: boolean;
}

/**
 * A resource with narrative, extensions, and contained resources
 * Based on [FHIR DomainResource](https://www.hl7.org/fhir/domainresource.html)
 */
export type DomainResource = DomainResourceParent | Observation | Condition | ResearchStudy;
