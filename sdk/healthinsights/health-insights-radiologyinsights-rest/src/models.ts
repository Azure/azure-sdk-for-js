// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
  details?: PatientDetails;
  /** Patient encounters/visits. */
  encounters?: Array<PatientEncounter>;
  /** Patient unstructured clinical data, given as documents. */
  patientDocuments?: Array<PatientDocument>;
}

/** Patient structured information, including demographics and known structured clinical information. */
export interface PatientDetails {
  /**
   * The patient's sex.
   *
   * Possible values: "female", "male", "unspecified"
   */
  sex?: PatientSex;
  /** The patient's date of birth. */
  birthDate?: string;
  /** Known clinical information for the patient, structured. */
  clinicalInfo?: Array<Resource>;
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
 * Base for all elements
 * Based on [FHIR Element](https://www.hl7.org/fhir/R4/element.html)
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
  valueTime?: string;
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
  /** < | <= | >= | > - how to understand the value */
  comparator?: string;
  /** Unit representation */
  unit?: string;
  /** System that defines coded unit form */
  system?: string;
  /** Coded form of the unit */
  code?: string;
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
  valueTime?: string;
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
  system?: ContactPointSystem;
  /** The actual contact point details */
  value?: string;
  /**
   * home | work | temp | old | mobile - purpose of this contact point
   *
   * Possible values: "home", "work", "temp", "old", "mobile"
   */
  use?: ContactPointUse;
  /** Specify preferred order of use (1 = highest) */
  rank?: number;
  /** Time period when the contact point was/is in use */
  period?: Period;
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
  status: ObservationStatusCodeType;
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
  valueTime?: string;
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
  status: ResearchStudyStatusCodeType;
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

/** visit/encounter information */
export interface PatientEncounter {
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
  class?: EncounterClass;
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
  type: DocumentType;
  /**
   * The type of the clinical document.
   *
   * Possible values: "consultation", "dischargeSummary", "historyAndPhysical", "radiologyReport", "procedure", "progress", "laboratory", "pathologyReport"
   */
  clinicalType?: ClinicalDocumentType;
  /** A given identifier for the document. Has to be unique across all documents for a single patient. */
  id: string;
  /** A 2 letter ISO 639-1 representation of the language of the document. */
  language?: string;
  /** The date and time when the document was created. */
  createdAt?: Date | string;
  /** Document author(s) */
  authors?: Array<DocumentAuthor>;
  /**
   * specialty type the document
   *
   * Possible values: "pathology", "radiology"
   */
  specialtyType?: SpecialtyType;
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

/** Procedure information */
export interface OrderedProcedure {
  /** Procedure code */
  code?: CodeableConcept;
  /** Procedure description */
  description?: string;
  /** Additional Content defined by implementations */
  extension?: Array<Extension>;
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
  sourceType: DocumentContentSourceType;
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
  inferenceTypes?: RadiologyInsightsInferenceType[];
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
  /** Guidance options. */
  guidanceOptions?: GuidanceOptions;
  /** QualityMeasureOptions. */
  qualityMeasureOptions?: QualityMeasureOptions;
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

/** Guidance options. */
export interface GuidanceOptions {
  /** If this is true, also show guidances from a clinical history section i.e. if the first token of the associated finding's clinical indicator is in this section. Default is false. */
  showGuidanceInHistory: boolean;
}

/** Quality Measure Options. */
export interface QualityMeasureOptions {
  /** Id(s) of the MIPS measures that need to be evaluated in the document */
  measureTypes: QualityMeasureType[];
}

/** The inference results for the Radiology Insights request. If field 'status' has value 'succeeded', then field 'result' will contain an instance of RadiologyInsightsInferenceResult. */
export interface RadiologyInsightsInferenceResult {
  /** Results for the patients given in the request. */
  patientResults: Array<RadiologyInsightsPatientResult>;
  /** The version of the model used for inference, expressed as the model date. */
  modelVersion: string;
}

/** Results of the model's work for a single patient. */
export interface RadiologyInsightsPatientResult {
  /** Identifier given for the patient in the request. */
  patientId: string;
  /** The model's inferences for the given patient. */
  inferences: Array<RadiologyInsightsInference>;
}

/**
 * An inference made by the Radiology Insights model regarding a patient.
 *   - AgeMismatch
 *   - SexMismatch
 *   - LateralityDiscrepancy
 *   - CompleteOrderDiscrepancy
 *   - LimitedOrderDiscrepancy
 *   - Finding
 *   - CriticalResult
 *   - FollowupRecommendation
 *   - RadiologyProcedure
 *   - FollowupCommunication
 */
export interface RadiologyInsightsInferenceParent {
  /** Additional Content defined by implementations */
  extension?: Array<Extension>;
  kind: string;
}

/** A notification for age mismatch is displayed when the age mentioned in a document for a specific patient does not match the age specified in the patient information. */
export interface AgeMismatchInference extends RadiologyInsightsInferenceParent {
  /** Inference type. */
  kind: "ageMismatch";
}

/** A notification for a sex mismatch is displayed when the gender, personal pronouns, gender-related body parts, or gender-related procedures mentioned in a patient's clinical document are either inconsistent or do not match the gender specified in the patient information. */
export interface SexMismatchInference extends RadiologyInsightsInferenceParent {
  /** Inference type. */
  kind: "sexMismatch";
  /** Sex indication : SNOMED CT code for gender finding. */
  sexIndication: CodeableConcept;
}

/** A laterality mismatch occurs when there is a discrepancy between the clinical documentation and the ordered procedure (orderLateralityMismatch), a contradiction within the clinical document (textLateralityContradiction), or when no laterality is mentioned (textLateralityMissing). */
export interface LateralityDiscrepancyInference
  extends RadiologyInsightsInferenceParent {
  /** Inference type. */
  kind: "lateralityDiscrepancy";
  /** Laterality indication : SNOMED CT code for laterality qualifier value. */
  lateralityIndication?: CodeableConcept;
  /**
   * Mismatch type : orderLateralityMismatch, textLateralityContradiction, textLateralityMissing.
   *
   * Possible values: "orderLateralityMismatch", "textLateralityContradiction", "textLateralityMissing"
   */
  discrepancyType: LateralityDiscrepancyType;
}

/** A complete order discrepancy is shown when one or more body parts and/or measurements that should be in the document (because there is a complete order) are not present. */
export interface CompleteOrderDiscrepancyInference
  extends RadiologyInsightsInferenceParent {
  /** Inference type. */
  kind: "completeOrderDiscrepancy";
  /** Order type : CPT ultrasound complete code for abdomen, retroperitoneal, pelvis or breast. */
  orderType: CodeableConcept;
  /** List of missing body parts required by a complete order : SNOMED CT codes. */
  missingBodyParts?: Array<CodeableConcept>;
  /** List of missing body parts that require measurement by a complete order : SNOMED CT codes. */
  missingBodyPartMeasurements?: Array<CodeableConcept>;
}

/** A limited order discrepancy occurs when there is a limited order, but all body parts and measurements that are needed for a complete order are present in the document. */
export interface LimitedOrderDiscrepancyInference
  extends RadiologyInsightsInferenceParent {
  /** Inference type. */
  kind: "limitedOrderDiscrepancy";
  /** Order type : CPT ultrasound complete code for abdomen, retroperitoneal, pelvis or breast. */
  orderType: CodeableConcept;
  /** List of body parts found in the document : SNOMED CT codes. */
  presentBodyParts?: Array<CodeableConcept>;
  /** List of body parts that are measured according to the document : SNOMED CT codes. */
  presentBodyPartMeasurements?: Array<CodeableConcept>;
}

/** Findings in a radiology report typically describe abnormalities, lesions, or other notable observations related to the anatomy or pathology of the imaged area. */
export interface FindingInference extends RadiologyInsightsInferenceParent {
  /** Inference type. */
  kind: "finding";
  /** Finding data : contains extensions, fields and components linked with the finding. */
  finding: Observation;
}

/** Critical results refer to findings of utmost importance that may require timely attention due to their potential impact on patient care. */
export interface CriticalResultInference
  extends RadiologyInsightsInferenceParent {
  /** Inference type. */
  kind: "criticalResult";
  /** The complete Critical Result, as outlined below, will be reused for the recommendation. */
  result: CriticalResult;
}

/** Critical Result consists of two properties. */
export interface CriticalResult {
  /** Description : medical problem. */
  description: string;
  /** Finding linked to the critical result. */
  finding?: Observation;
}

/** Radiology procedures are the specific imaging studies or examinations ordered for the patient, extracted from the document information and text. */
export interface RadiologyProcedureInference
  extends RadiologyInsightsInferenceParent {
  /** Inference type. */
  kind: "radiologyProcedure";
  /** LOINC codes for the procedure. */
  procedureCodes?: Array<CodeableConcept>;
  /** Imaging procedures. */
  imagingProcedures: Array<ImagingProcedure>;
  /** Ordered procedure information from the document information or text. */
  orderedProcedure: OrderedProcedure;
}

/** Imaging procedure. */
export interface ImagingProcedure {
  /** Modality : SNOMED CT code. */
  modality: CodeableConcept;
  /** Anatomy : SNOMED CT code. */
  anatomy: CodeableConcept;
  /** Laterality : SNOMED CT code. */
  laterality?: CodeableConcept;
  /** Contrast : see RadiologyCodeWithTypes (below). */
  contrast?: RadiologyCodeWithTypes;
  /** View : see RadiologyCodeWithTypes (below). */
  view?: RadiologyCodeWithTypes;
}

/** Radiology code with types : used in imaging procedure recommendation for contrast and view. */
export interface RadiologyCodeWithTypes {
  /** The SNOMED CT code indicates whether imaging was conducted with or without contrast in the case of contrast, and in the case of views, it denotes the number of views. */
  code: CodeableConcept;
  /** The collection of types will indicate the contrast substance used in the case of contrast and, in the case of views, it will specify the types of views, such as lateral and frontal, etc. */
  types: Array<CodeableConcept>;
}

/** Follow-up recommendations offer guidance to healthcare providers on managing and monitoring patients based on the findings of imaging studies. */
export interface FollowupRecommendationInference
  extends RadiologyInsightsInferenceParent {
  /** Inference type. */
  kind: "followupRecommendation";
  /** Date and time are displayed when the procedure is recommended to be done at a specific point in time. */
  effectiveAt?: string;
  /** The period is shown if a specific period is mentioned, with a start and end date-time. */
  effectivePeriod?: Period;
  /** Findings related to the recommendation. */
  findings?: Array<RecommendationFinding>;
  /** The conditional value indicates whether or not the sentence containing the recommendation includes a conditional statement. Keywords for conditional statements include 'if', 'when', 'unless', and so on. */
  isConditional: boolean;
  /** The option value indicates whether or not the sentence containing the recommendation includes an optional statement. Keywords for optional statements include 'recommend', 'consider', and so on. */
  isOption: boolean;
  /** The guideline value indicates whether or not the recommendation is part of a guideline section that compiles all recommendations applicable to various findings. */
  isGuideline: boolean;
  /** Hedging refers to ambiguous, vague or imprecise language within the sentence of the recommendation. Keywords for hedging are 'can be','may be',and so on. */
  isHedging: boolean;
  /** The procedure recommendation can be a generic procedure or an imaging procedure. */
  recommendedProcedure: ProcedureRecommendation;
}

/** Finding reference for recommendation. */
export interface RecommendationFinding {
  /** Finding linked to a recommendation. */
  finding?: Observation;
  /** Critical result linked to a recommendation. */
  criticalFinding?: CriticalResult;
  /**
   * Recommendation finding status.
   *
   * Possible values: "present", "differential", "ruleOut", "conditional"
   */
  recommendationFindingStatus: RecommendationFindingStatusType;
  /** Additional Content defined by implementations */
  extension?: Array<Extension>;
}

/** The procedure recommendation can be a generic procedure or an imaging procedure. */
export interface ProcedureRecommendationParent {
  /** Additional Content defined by implementations */
  extension?: Array<Extension>;
  kind: string;
}

/** Generic procedure information. */
export interface GenericProcedureRecommendation
  extends ProcedureRecommendationParent {
  /** Procedure type : generic. */
  kind: "genericProcedureRecommendation";
  /** Procedure modality : SNOMED CT code. */
  code: CodeableConcept;
  /** Procedure description : MANAGEMENT PROCEDURE (PROCEDURE) or CONSULTATION (PROCEDURE) based on SNOMED CT. */
  description?: string;
}

/** Imaging procedures. */
export interface ImagingProcedureRecommendation
  extends ProcedureRecommendationParent {
  /** Procedure type : imaging. */
  kind: "imagingProcedureRecommendation";
  /** LOINC codes for the procedure. */
  procedureCodes?: Array<CodeableConcept>;
  /** Imaging procedures. */
  imagingProcedures: Array<ImagingProcedure>;
}

/** Follow-up communication involves the exchange of important information, recommendations, or updates between radiologists and other healthcare professionals involved in a patient's care. */
export interface FollowupCommunicationInference
  extends RadiologyInsightsInferenceParent {
  /** Inference type. */
  kind: "followupCommunication";
  /** Communication date and time. */
  communicatedAt?: Date[] | string[];
  /** Recipient of the communication. */
  recipient?: MedicalProfessionalType[];
  /** Communication was acknowledged. */
  wasAcknowledged: boolean;
}

/** Identifies and highlights Risk, Scoring, Assessment and Classifications and correspondent values dictated in a report, e.g. 'BIRADS 5' */
export interface ScoringAndAssessmentInference
  extends RadiologyInsightsInferenceParent {
  /** Inference type. */
  kind: "scoringAndAssessment";
  /**
   * Category, e.g. BIRADS
   *
   * Possible values: "BIRADS", "C-RADS COLONIC FINDINGS", "CAD-RADS", "LI-RADS", "LUNG-RADS", "NI-RADS", "O-RADS", "PI-RADS", "TI-RADS", "C-RADS EXTRACOLONIC FINDINGS", "LIFETIME BREAST CANCER RISK", "ASCVD RISK", "MODIFIED GAIL MODEL RISK", "TYRER CUSICK MODEL RISK", "AGATSTON SCORE", "10 YEAR CHD RISK", "Z-SCORE", "T-SCORE", "CALCIUM VOLUME SCORE", "US LI-RADS VISUALIZATION SCORE", "US LI-RADS", "CEUS LI-RADS", "TREATMENT RESPONSE LI-RADS", "O-RADS MRI", "CALCIUM MASS SCORE", "RISK OF MALIGNANCY INDEX", "HNPCC MUTATION RISK", "ALBERTA STROKE PROGRAM EARLY CT SCORE", "KELLGREN-LAWRENCE GRADING SCALE", "TONNIS CLASSIFICATION", "CALCIUM SCORE (UNSPECIFIED)", "10 YEAR CHD RISK (OBSERVED AGE)", "10 YEAR CHD RISK (ARTERIAL AGE)", "FRAX SCORE"
   */
  category: ScoringAndAssessmentCategoryType;
  /** The expansion of the category (which is an abbreviation.) */
  categoryDescription: string;
  /** The value. If the value is a range, use field valueRange. */
  singleValue?: string;
  /** The range. */
  rangeValue?: AssessmentValueRange;
}

/** A range of values. */
export interface AssessmentValueRange {
  /** The minimum value. */
  minimum: string;
  /** The maximum value. */
  maximum: string;
}

/** A guidance inference collects structured information about a specific finding in the report and can possibly propose appropriate follow-up recommendations, based upon established, evidence-based best practices i.e. ACR guidelines. */
export interface GuidanceInference extends RadiologyInsightsInferenceParent {
  /** Inference type. */
  kind: "guidance";
  /** The finding associated with the guidance. */
  finding: FindingInference;
  /** The guidance identifier, as a concept */
  identifier: CodeableConcept;
  /** presentGuidanceInformation lists each item of the structured information (e.g. laterality) and corresponding details (left, right, bilateral) that is present in the document. */
  presentGuidanceInformation?: Array<PresentGuidanceInformation>;
  /**
   * See doc of GuidanceRankingType.
   *
   * Possible values: "high", "low"
   */
  ranking: GuidanceRankingType;
  /** The proposed follow-up recommendations, if any. If this is filled, missingGuidanceInformation cannot be filled (and vice versa). */
  recommendationProposals?: Array<FollowupRecommendationInference>;
  /** Contains all missing items that are needed to determine follow-up. */
  missingGuidanceInformation?: string[];
}

/** An item of the structured information (e.g. laterality or size) and one or more corresponding details (e.g. left or size-value) */
export interface PresentGuidanceInformation {
  /** The item of the structured information */
  presentGuidanceItem: string;
  /** A list of size values, if the item is about size. */
  sizes?: Array<Observation>;
  /** The maximum diameter value, if the item is about the maximum diameter. */
  maximumDiameterAsInText?: Quantity;
  /** The list of item values that are mentioned in the report. */
  presentGuidanceValues?: string[];
  /** Additional Content defined by implementations */
  extension?: Array<Extension>;
}

/** A QualityMeasure inference captures the  MIPS ('measure based incentive payment system') quality measure criteria in the document that are used to measure the data completeness. */
export interface QualityMeasureInference
  extends RadiologyInsightsInferenceParent {
  /** Inference type. */
  kind: "qualityMeasure";
  /** The denominator, which identifies the QualityMeasure kind. */
  qualityMeasureDenominator: string;
  /**
   * The ComplianceType indicates whether the document is compliant for the specified QualityMeasure or not, or if exceptions apply.
   *
   * Possible values: "notEligible", "performanceNotMet", "performanceMet", "denominatorException"
   */
  complianceType: QualityMeasureComplianceType;
  /** List of quality criteria identified in the document, if any. */
  qualityCriteria?: string[];
}

/** Response for the Radiology Insights request. */
export interface RadiologyInsightsJob {
  /** The request data for the operation. */
  jobData?: RadiologyInsightsData;
}

/**
 * A resource with narrative, extensions, and contained resources
 * Based on [FHIR DomainResource](https://www.hl7.org/fhir/domainresource.html)
 */
export type DomainResource =
  | DomainResourceParent
  | Observation
  | Condition
  | ResearchStudy;
/**
 * An inference made by the Radiology Insights model regarding a patient.
 *   - AgeMismatch
 *   - SexMismatch
 *   - LateralityDiscrepancy
 *   - CompleteOrderDiscrepancy
 *   - LimitedOrderDiscrepancy
 *   - Finding
 *   - CriticalResult
 *   - FollowupRecommendation
 *   - RadiologyProcedure
 *   - FollowupCommunication
 */
export type RadiologyInsightsInference =
  | RadiologyInsightsInferenceParent
  | AgeMismatchInference
  | SexMismatchInference
  | LateralityDiscrepancyInference
  | CompleteOrderDiscrepancyInference
  | LimitedOrderDiscrepancyInference
  | FindingInference
  | CriticalResultInference
  | RadiologyProcedureInference
  | FollowupRecommendationInference
  | FollowupCommunicationInference
  | ScoringAndAssessmentInference
  | GuidanceInference
  | QualityMeasureInference;
/** The procedure recommendation can be a generic procedure or an imaging procedure. */
export type ProcedureRecommendation =
  | ProcedureRecommendationParent
  | GenericProcedureRecommendation
  | ImagingProcedureRecommendation;
/** Alias for PatientSex */
export type PatientSex = string;
/** Alias for ContactPointSystem */
export type ContactPointSystem = string;
/** Alias for ContactPointUse */
export type ContactPointUse = string;
/** Alias for ObservationStatusCodeType */
export type ObservationStatusCodeType = string;
/** Alias for ResearchStudyStatusCodeType */
export type ResearchStudyStatusCodeType = string;
/** Alias for EncounterClass */
export type EncounterClass = string;
/** Alias for DocumentType */
export type DocumentType = string;
/** Alias for ClinicalDocumentType */
export type ClinicalDocumentType = string;
/** Alias for SpecialtyType */
export type SpecialtyType = string;
/** Alias for DocumentContentSourceType */
export type DocumentContentSourceType = string;
/** Alias for RadiologyInsightsInferenceType */
export type RadiologyInsightsInferenceType = string;
/** Alias for QualityMeasureType */
export type QualityMeasureType = string;
/** Alias for LateralityDiscrepancyType */
export type LateralityDiscrepancyType = string;
/** Alias for RecommendationFindingStatusType */
export type RecommendationFindingStatusType = string;
/** Alias for MedicalProfessionalType */
export type MedicalProfessionalType = string;
/** Alias for ScoringAndAssessmentCategoryType */
export type ScoringAndAssessmentCategoryType = string;
/** Alias for GuidanceRankingType */
export type GuidanceRankingType = string;
/** Alias for QualityMeasureComplianceType */
export type QualityMeasureComplianceType = string;
/** Alias for JobStatus */
export type JobStatus = string;
