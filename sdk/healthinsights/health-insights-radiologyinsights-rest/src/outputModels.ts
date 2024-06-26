// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ErrorModel } from "@azure-rest/core-client";

/** Response for the Radiology Insights request. */
export interface RadiologyInsightsJobOutput {
  /** The request data for the operation. */
  jobData?: RadiologyInsightsDataOutput;
  /** The result of the operation. */
  readonly result?: RadiologyInsightsInferenceResultOutput;
  /** The unique ID of the job. */
  readonly id: string;
  /** The status of the job. */
  readonly status: JobStatusOutput;
  /** The date and time when the processing job was created. */
  readonly createdAt?: string;
  /** The date and time when the processing job is set to expire. */
  readonly expiresAt?: string;
  /** The date and time when the processing job was last updated. */
  readonly updatedAt?: string;
  /** Error object that describes the error when status is "Failed". */
  readonly error?: ErrorModel;
}

/** Contains the list of patients, and configuration data. */
export interface RadiologyInsightsDataOutput {
  /** The list of patients, including their clinical information and data. */
  patients: Array<PatientRecordOutput>;
  /** Configuration affecting the Radiology Insights model's inference. */
  configuration?: RadiologyInsightsModelConfigurationOutput;
}

/** A patient record, including their clinical information and data. */
export interface PatientRecordOutput {
  /** A given identifier for the patient. Has to be unique across all patients in a single request. */
  id: string;
  /** Patient structured information, including demographics and known structured clinical information. */
  details?: PatientDetailsOutput;
  /** Patient encounters/visits. */
  encounters?: Array<PatientEncounterOutput>;
  /** Patient unstructured clinical data, given as documents. */
  patientDocuments?: Array<PatientDocumentOutput>;
}

/** Patient structured information, including demographics and known structured clinical information. */
export interface PatientDetailsOutput {
  /** The patient's sex. */
  sex?: PatientSexOutput;
  /** The patient's date of birth. */
  birthDate?: string;
  /** Known clinical information for the patient, structured. */
  clinicalInfo?: Array<ResourceOutput>;
}

/**
 * Resource is the ancestor of DomainResource from which most resources are derived. Bundle, Parameters, and Binary extend Resource directly.
 * Based on [FHIR Resource](https://www.hl7.org/fhir/r4/resource.html
 */
export interface ResourceOutput extends Record<string, any> {
  /** The type of resource */
  resourceType: string;
  /** Resource Id */
  id?: string;
  /** Metadata about the resource */
  meta?: MetaOutput;
  /** A set of rules under which this content was created */
  implicitRules?: string;
  /** Language of the resource content */
  language?: string;
}

/**
 * Metadata about a resource
 * Based on [FHIR Meta](https://www.hl7.org/fhir/R4/resource.html#Meta)
 */
export interface MetaOutput {
  /** The version specific identifier, as it appears in the version portion of the URL. This value changes when the resource is created, updated, or deleted. */
  versionId?: string;
  /** When the resource last changed - e.g. when the version changed. */
  lastUpdated?: string;
  /** A uri that identifies the source system of the resource. This provides a minimal amount of Provenance information that can be used to track or differentiate the source of information in the resource. The source may identify another FHIR server, document, message, database, etc. */
  source?: string;
  /** A list of profiles (references to [StructureDefinition](https://www.hl7.org/fhir/structuredefinition.html) resources) that this resource claims to conform to. The URL is a reference to [StructureDefinition.url](https://www.hl7.org/fhir/structuredefinition-definitions.html#StructureDefinition.url). */
  profile?: string[];
  /** Security labels applied to this resource. These tags connect specific resources to the overall security policy and infrastructure. */
  security?: Array<CodingOutput>;
  /** Tags applied to this resource. Tags are intended to be used to identify and relate resources to process and workflow, and applications are not required to consider the tags when interpreting the meaning of a resource. */
  tag?: Array<CodingOutput>;
}

/**
 * A Coding is a representation of a defined concept using a symbol from a defined "code system".
 * Based on [FHIR Coding](https://www.hl7.org/fhir/R4/datatypes.html#Coding)
 */
export interface CodingOutput extends ElementOutput {
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
export interface ElementOutput {
  /** Unique id for inter-element referencing */
  id?: string;
  /** Additional Content defined by implementations */
  extension?: Array<ExtensionOutput>;
}

/**
 * Base for all elements
 * Based on [FHIR Element](https://www.hl7.org/fhir/datatypes.html#Element)
 */
export interface ExtensionOutput extends ElementOutput {
  /** Source of the definition for the extension code - a logical name or a URL. */
  url: string;
  /** Value as Quantity */
  valueQuantity?: QuantityOutput;
  /** Value as CodeableConcept */
  valueCodeableConcept?: CodeableConceptOutput;
  /** Value as string */
  valueString?: string;
  /** Value as boolean */
  valueBoolean?: boolean;
  /** Value as integer */
  valueInteger?: number;
  /** Value as Range. */
  valueRange?: RangeOutput;
  /** Value as Ratio. */
  valueRatio?: RatioOutput;
  /** Value as SampledData. */
  valueSampledData?: SampledDataOutput;
  /** Value as time (hh:mm:ss) */
  valueTime?: string;
  /** Value as dateTime. */
  valueDateTime?: string;
  /** Value as Period. */
  valuePeriod?: PeriodOutput;
  /** Value as reference. */
  valueReference?: ReferenceOutput;
}

/**
 * A measured or measurable amount
 * Based on [FHIR Quantity](https://www.hl7.org/fhir/R4/datatypes.html#Quantity)
 */
export interface QuantityOutput extends ElementOutput {
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
 * Concept - reference to a terminology or just text
 * Based on [FHIR CodeableConcept](https://www.hl7.org/fhir/R4/datatypes.html#CodeableConcept)
 */
export interface CodeableConceptOutput extends ElementOutput {
  /** Code defined by a terminology system */
  coding?: Array<CodingOutput>;
  /** Plain text representation of the concept */
  text?: string;
}

/**
 * A set of ordered Quantities defined by a low and high limit
 * Based on [FHIR Range](https://www.hl7.org/fhir/R4/datatypes.html#Range)
 */
export interface RangeOutput extends ElementOutput {
  /** Low limit */
  low?: QuantityOutput;
  /** High limit */
  high?: QuantityOutput;
}

/**
 * A ratio of two Quantity values - a numerator and a denominator
 * Based on [FHIR Ratio](https://www.hl7.org/fhir/R4/datatypes.html#Ratio)
 */
export interface RatioOutput extends ElementOutput {
  /** Numerator value */
  numerator?: QuantityOutput;
  /** Denominator value */
  denominator?: QuantityOutput;
}

/**
 * A series of measurements taken by a device
 * Based on [FHIR SampledData](https://www.hl7.org/fhir/R4/datatypes.html#SampledData)
 */
export interface SampledDataOutput extends ElementOutput {
  /** Zero value and units */
  origin: QuantityOutput;
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
export interface PeriodOutput extends ElementOutput {
  /** Starting time with inclusive boundary */
  start?: string;
  /** End time with inclusive boundary, if not ongoing */
  end?: string;
}

/**
 * A reference from one resource to another
 * Based on [FHIR Reference](https://www.hl7.org/fhir/R4/references.html)
 */
export interface ReferenceOutput extends ElementOutput {
  /** Literal reference, Relative, internal or absolute URL */
  reference?: string;
  /** Type the reference refers to (e.g. "Patient") */
  type?: string;
  /** Logical reference, when literal reference is not known */
  identifier?: IdentifierOutput;
  /** Text alternative for the resource */
  display?: string;
}

/**
 * An identifier intended for computation
 * Based on [FHIR Identifier](https://www.hl7.org/fhir/R4/identifier.html)
 */
export interface IdentifierOutput extends ElementOutput {
  /** usual | official | temp | secondary | old (If known) */
  use?: string;
  /** Description of identifier */
  type?: CodeableConceptOutput;
  /** The namespace for the identifier value */
  system?: string;
  /** The value that is unique */
  value?: string;
  /** Time period when id is/was valid for use */
  period?: PeriodOutput;
  /** Organization that issued id (may be just text) */
  assigner?: ReferenceOutput;
}

/**
 * Any resource that is a [DomainResource](https://www.hl7.org/fhir/domainresource.html) may include a human-readable narrative that contains a summary of the resource and may be used to represent the content of the resource to a human.
 * Based on [FHIR Narrative](https://www.hl7.org/fhir/R4/narrative.html#Narrative)
 */
export interface NarrativeOutput extends ElementOutput {
  /** generated, extensions, additional, empty */
  status: string;
  /** xhtml */
  div: string;
}

/**
 * A text note which also  contains information about who made the statement and when
 * Based on [FHIR Annotation](https://www.hl7.org/fhir/R4/datatypes.html#Annotation)
 */
export interface AnnotationOutput extends ElementOutput {
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
export interface ObservationComponentOutput extends ElementOutput {
  /** Type of component observation (code / type) */
  code: CodeableConceptOutput;
  /** Value as Quantity */
  valueQuantity?: QuantityOutput;
  /** Value as CodeableConcept */
  valueCodeableConcept?: CodeableConceptOutput;
  /** Value as string */
  valueString?: string;
  /** Value as boolean */
  valueBoolean?: boolean;
  /** Value as integer */
  valueInteger?: number;
  /** Value as Range. */
  valueRange?: RangeOutput;
  /** Value as Ratio. */
  valueRatio?: RatioOutput;
  /** Value as SampledData. */
  valueSampledData?: SampledDataOutput;
  /** Value as time (hh:mm:ss) */
  valueTime?: string;
  /** Value as dateTime. */
  valueDateTime?: string;
  /** Value as Period. */
  valuePeriod?: PeriodOutput;
  /** Value as reference. */
  valueReference?: ReferenceOutput;
  /** Why the component result is missing */
  dataAbsentReason?: CodeableConceptOutput;
  /** High, low, normal, etc. */
  interpretation?: Array<CodeableConceptOutput>;
  /** Provides guide for interpretation of component result */
  referenceRange?: Array<ObservationReferenceRangeOutput>;
}

/**
 * Provides guide for interpretation of component result
 * Based on [FHIR Observation.referenceRange](https://www.hl7.org/fhir/R4/observation.html)
 */
export interface ObservationReferenceRangeOutput {
  /** Low Range, if relevant */
  low?: QuantityOutput;
  /** High Range, if relevant */
  high?: QuantityOutput;
  /** Reference range qualifier */
  type?: CodeableConceptOutput;
  /** Reference range population */
  appliesTo?: Array<CodeableConceptOutput>;
  /** Applicable age range, if relevant */
  age?: RangeOutput;
  /** Text based reference range in an observation */
  text?: string;
}

/** Contact details (See: https://www.hl7.org/fhir/R4/metadatatypes.html#ContactDetail) */
export interface ContactDetailOutput extends ElementOutput {
  /** Name of an individual to contact */
  name?: string;
  /** Contact details for individual or organization */
  telecom?: Array<ContactPointOutput>;
}

/**
 * Details for all kinds of technology mediated contact points for a person or organization, including telephone, email, etc.
 * See https://www.hl7.org/fhir/R4/datatypes.html#ContactPoint
 */
export interface ContactPointOutput {
  /** phone | fax | email | pager | url | sms | other */
  system?: ContactPointSystemOutput;
  /** The actual contact point details */
  value?: string;
  /** home | work | temp | old | mobile - purpose of this contact point */
  use?: ContactPointUseOutput;
  /** Specify preferred order of use (1 = highest) */
  rank?: number;
  /** Time period when the contact point was/is in use */
  period?: PeriodOutput;
}

/**
 * A resource with narrative, extensions, and contained resources
 * Based on [FHIR DomainResource](https://www.hl7.org/fhir/domainresource.html)
 */
export interface DomainResourceOutputParent extends ResourceOutput {
  /** Text summary of the resource, for human interpretation */
  text?: NarrativeOutput;
  /** Contained, inline Resources */
  contained?: Array<ResourceOutput>;
  /** Additional Content defined by implementations */
  extension?: Array<ExtensionOutput>;
  /** Extensions that cannot be ignored */
  modifierExtension?: Array<ExtensionOutput>;
  resourceType: string;
}

/**
 * Detailed information about observations
 * Based on [FHIR Observation](https://www.hl7.org/fhir/R4/observation.html)
 */
export interface ObservationOutput extends DomainResourceOutputParent {
  /** resourceType */
  resourceType: "Observation";
  /** Business Identifier for observation */
  identifier?: Array<IdentifierOutput>;
  /** registered | preliminary | final | amended + */
  status: ObservationStatusCodeTypeOutput;
  /** Classification of  type of observation */
  category?: Array<CodeableConceptOutput>;
  /** Type of observation (code / type) */
  code: CodeableConceptOutput;
  /** Who and/or what the observation is about */
  subject?: ReferenceOutput;
  /** Healthcare event during which this observation is made */
  encounter?: ReferenceOutput;
  /** Clinically relevant time/time-period for observation */
  effectiveDateTime?: string;
  /** Clinically relevant time/time-period for observation */
  effectivePeriod?: PeriodOutput;
  /** Clinically relevant time/time-period for observation */
  effectiveInstant?: string;
  /** Date/Time this version was made available */
  issued?: string;
  /** Actual result */
  valueQuantity?: QuantityOutput;
  /** Actual result */
  valueCodeableConcept?: CodeableConceptOutput;
  /** Actual result */
  valueString?: string;
  /** Actual result */
  valueBoolean?: boolean;
  /** Actual result */
  valueInteger?: number;
  /** Actual result */
  valueRange?: RangeOutput;
  /** Actual result */
  valueRatio?: RatioOutput;
  /** Actual result */
  valueSampledData?: SampledDataOutput;
  /** Actual result */
  valueTime?: string;
  /** Actual result */
  valueDateTime?: string;
  /** Actual result */
  valuePeriod?: PeriodOutput;
  /** Why the result is missing */
  dataAbsentReason?: CodeableConceptOutput;
  /** High, low, normal, etc. */
  interpretation?: Array<CodeableConceptOutput>;
  /** Comments about the observation */
  note?: Array<AnnotationOutput>;
  /** Observed body part */
  bodySite?: CodeableConceptOutput;
  /** How it was done */
  method?: CodeableConceptOutput;
  /** Provides guide for interpretation */
  referenceRange?: Array<ObservationReferenceRangeOutput>;
  /** Related resource that belongs to the Observation group */
  hasMember?: Array<ReferenceOutput>;
  /** Related measurements the observation is made from */
  derivedFrom?: Array<ReferenceOutput>;
  /** Component results */
  component?: Array<ObservationComponentOutput>;
}

/**
 * Detailed information about conditions, problems or diagnoses
 * Based on [FHIR Condition](https://www.hl7.org/fhir/R4/condition.html)
 */
export interface ConditionOutput extends DomainResourceOutputParent {
  /** resourceType */
  resourceType: "Condition";
  /** External Ids for this condition */
  identifier?: Array<IdentifierOutput>;
  /** active | recurrence | relapse | inactive | remission | resolved */
  clinicalStatus?: CodeableConceptOutput;
  /** unconfirmed | provisional | differential | confirmed | refuted | entered-in-error */
  verificationStatus?: CodeableConceptOutput;
  /** problem-list-item | encounter-diagnosis */
  category?: Array<CodeableConceptOutput>;
  /** Subjective severity of condition */
  severity?: CodeableConceptOutput;
  /** Identification of the condition, problem or diagnosis */
  code?: CodeableConceptOutput;
  /** Anatomical location, if relevant */
  bodySite?: Array<CodeableConceptOutput>;
  /** Encounter created as part of */
  encounter?: ReferenceOutput;
  /** Estimated or actual date,  date-time, or age */
  onsetDateTime?: string;
  /** Estimated or actual date,  date-time, or age */
  onsetAge?: QuantityOutput;
  /** Estimated or actual date,  date-time, or age */
  onsetPeriod?: PeriodOutput;
  /** Estimated or actual date,  date-time, or age */
  onsetRange?: RangeOutput;
  /** Estimated or actual date,  date-time, or age */
  onsetString?: string;
  /** When in resolution/remission */
  abatementDateTime?: string;
  /** When in resolution/remission */
  abatementAge?: QuantityOutput;
  /** When in resolution/remission */
  abatementPeriod?: PeriodOutput;
  /** When in resolution/remission */
  abatementRange?: RangeOutput;
  /** When in resolution/remission */
  abatementString?: string;
  /** Date record was first recorded */
  recordedDate?: string;
  /** stge/grade, usually assessed formally */
  stage?: Array<ConditionStageOutput>;
  /** Additional information about the Condition */
  note?: Array<AnnotationOutput>;
}

/**
 * Stage/grade, usually assessed formally
 * Based on [FHIR Condition.Stage](https://www.hl7.org/fhir/R4/condition.html)
 */
export interface ConditionStageOutput {
  /** Simple summary (disease specific) */
  summary?: CodeableConceptOutput;
  /** Kind of staging */
  type?: CodeableConceptOutput;
}

/**
 * Detailed information about Research Study
 * Based on [FHIR ResearchStudy](https://www.hl7.org/fhir/R4/researchstudy.html)
 */
export interface ResearchStudyOutput extends DomainResourceOutputParent {
  /** resourceType */
  resourceType: "ResearchStudy";
  /** Business Identifier for study */
  identifier?: Array<IdentifierOutput>;
  /** Name for this study */
  title?: string;
  /** Steps followed in executing study */
  protocol?: Array<ReferenceOutput>;
  /** Part of larger study */
  partOf?: Array<ReferenceOutput>;
  /** active | administratively-completed | approved | closed-to-accrual | closed-to-accrual-and-intervention | completed | disapproved | in-review | temporarily-closed-to-accrual | temporarily-closed-to-accrual-and-intervention | withdrawn */
  status: ResearchStudyStatusCodeTypeOutput;
  /** treatment | prevention | diagnostic | supportive-care | screening | health-services-research | basic-science | device-feasibility */
  primaryPurposeType?: CodeableConceptOutput;
  /** n-a | early-phase-1 | phase-1 | phase-1-phase-2 | phase-2 | phase-2-phase-3 | phase-3 | phase-4 */
  phase?: CodeableConceptOutput;
  /** Classifications for the study */
  category?: Array<CodeableConceptOutput>;
  /** Drugs, devices, etc. under study */
  focus?: Array<CodeableConceptOutput>;
  /** Condition being studied */
  condition?: Array<CodeableConceptOutput>;
  /** Contact details for the study */
  contact?: Array<ContactDetailOutput>;
  /** Used to search for the study */
  keyword?: Array<CodeableConceptOutput>;
  /** Geographic region(s) for study */
  location?: Array<CodeableConceptOutput>;
  /** What this is study doing */
  description?: string;
  /** Inclusion & exclusion criteria */
  enrollment?: Array<ReferenceOutput>;
  /** When the study began and ended */
  period?: PeriodOutput;
  /** Organization that initiates and is legally responsible for the study */
  sponsor?: ReferenceOutput;
  /** Researcher who oversees multiple aspects of the study */
  principalInvestigator?: ReferenceOutput;
  /** Facility where study activities are conducted */
  site?: Array<ReferenceOutput>;
  /** accrual-goal-met | closed-due-to-toxicity | closed-due-to-lack-of-study-progress | temporarily-closed-per-study-design */
  reasonStopped?: CodeableConceptOutput;
  /** Comments made about the study */
  note?: Array<AnnotationOutput>;
  /** Defined path through the study for a subject */
  arm?: { name: string; type?: CodeableConceptOutput; description?: string }[];
  /** A goal for the study */
  objective?: { name: string; type?: CodeableConceptOutput }[];
}

/** visit/encounter information */
export interface PatientEncounterOutput {
  /** The id of the visit. */
  id: string;
  /**
   * Time period of the visit.
   * In case of admission, use timePeriod.start to indicate the admission time and timePeriod.end to indicate the discharge time.
   */
  period?: TimePeriodOutput;
  /** The class of the encounter. */
  class?: EncounterClassOutput;
}

/** A duration of time during which an event is happening */
export interface TimePeriodOutput {
  /** Starting time with inclusive boundary */
  start?: string;
  /** End time with inclusive boundary, if not ongoing */
  end?: string;
}

/** A clinical document related to a patient. Document here is in the wide sense - not just a text document (note). */
export interface PatientDocumentOutput {
  /** The type of the patient document, such as 'note' (text document) or 'fhirBundle' (FHIR JSON document). */
  type: DocumentTypeOutput;
  /** The type of the clinical document. */
  clinicalType?: ClinicalDocumentTypeOutput;
  /** A given identifier for the document. Has to be unique across all documents for a single patient. */
  id: string;
  /** A 2 letter ISO 639-1 representation of the language of the document. */
  language?: string;
  /** The date and time when the document was created. */
  createdAt?: string;
  /** Document author(s) */
  authors?: Array<DocumentAuthorOutput>;
  /** specialty type the document */
  specialtyType?: SpecialtyTypeOutput;
  /** Administrative metadata for the document. */
  administrativeMetadata?: DocumentAdministrativeMetadataOutput;
  /** The content of the patient document. */
  content: DocumentContentOutput;
}

/** Document author */
export interface DocumentAuthorOutput {
  /** author id */
  id?: string;
  /** Text representation of the full name */
  fullName?: string;
}

/** Document administrative metadata */
export interface DocumentAdministrativeMetadataOutput {
  /** List of procedure information associated with the document. */
  orderedProcedures?: Array<OrderedProcedureOutput>;
  /** Reference to the encounter associated with the document. */
  encounterId?: string;
}

/** Procedure information */
export interface OrderedProcedureOutput {
  /** Procedure code */
  code?: CodeableConceptOutput;
  /** Procedure description */
  description?: string;
  /** Additional Content defined by implementations */
  extension?: Array<ExtensionOutput>;
}

/** The content of the patient document. */
export interface DocumentContentOutput {
  /**
   * The type of the content's source.
   * In case the source type is 'inline', the content is given as a string (for instance, text).
   * In case the source type is 'reference', the content is given as a URI.
   */
  sourceType: DocumentContentSourceTypeOutput;
  /** The content of the document, given either inline (as a string) or as a reference (URI). */
  value: string;
}

/** Configuration affecting the Radiology Insights model's inference. */
export interface RadiologyInsightsModelConfigurationOutput {
  /** An indication whether the model should produce verbose output. */
  verbose?: boolean;
  /** An indication whether the model's output should include evidence for the inferences. */
  includeEvidence?: boolean;
  /** This is a list of inference types to be inferred for the current request. It could be used if only part of the Radiology Insights inferences are required. If this list is omitted or empty, the model will return all the inference types. */
  inferenceTypes?: RadiologyInsightsInferenceTypeOutput[];
  /** Options regarding follow up recommendation inferences and finding inferences. */
  inferenceOptions?: RadiologyInsightsInferenceOptionsOutput;
  /** Local for the model to use. If not specified, the model will use the default locale. */
  locale?: string;
}

/** Options regarding follow up recommendation inferences and finding inferences. */
export interface RadiologyInsightsInferenceOptionsOutput {
  /** Follow-up recommendation options. */
  followupRecommendationOptions?: FollowupRecommendationOptionsOutput;
  /** Finding options. */
  findingOptions?: FindingOptionsOutput;
}

/** Follow-up recommendation options. */
export interface FollowupRecommendationOptionsOutput {
  /** Include/Exclude follow-up recommendations without a specific radiology procedure. Default is false. */
  includeRecommendationsWithNoSpecifiedModality?: boolean;
  /** Include/Exclude follow-up recommendations in references to a guideline or article. Default is false. */
  includeRecommendationsInReferences?: boolean;
  /** If this is true, provide one or more sentences as evidence for the recommendation, next to the token evidence. The start and end positions of these sentences will be put in an extension with url 'modality_sentences'. Default is false. */
  provideFocusedSentenceEvidence?: boolean;
}

/** Finding options. */
export interface FindingOptionsOutput {
  /** If this is true, provide the sentence that contains the first token of the finding's clinical indicator (i.e. the medical problem), if there is one. This sentence is provided as an extension with url 'ci_sentence', next to the token evidence. Default is false. */
  provideFocusedSentenceEvidence?: boolean;
}

/** The inference results for the Radiology Insights request. If field 'status' has value 'succeeded', then field 'result' will contain an instance of RadiologyInsightsInferenceResult. */
export interface RadiologyInsightsInferenceResultOutput {
  /** Results for the patients given in the request. */
  patientResults: Array<RadiologyInsightsPatientResultOutput>;
  /** The version of the model used for inference, expressed as the model date. */
  modelVersion: string;
}

/** Results of the model's work for a single patient. */
export interface RadiologyInsightsPatientResultOutput {
  /** Identifier given for the patient in the request. */
  patientId: string;
  /** The model's inferences for the given patient. */
  inferences: Array<RadiologyInsightsInferenceOutput>;
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
export interface RadiologyInsightsInferenceOutputParent {
  /** Additional Content defined by implementations */
  extension?: Array<ExtensionOutput>;
  kind: string;
}

/** A notification for age mismatch is displayed when the age mentioned in a document for a specific patient does not match the age specified in the patient information. */
export interface AgeMismatchInferenceOutput extends RadiologyInsightsInferenceOutputParent {
  /** Inference type. */
  kind: "ageMismatch";
}

/** A notification for a sex mismatch is displayed when the gender, personal pronouns, gender-related body parts, or gender-related procedures mentioned in a patient's clinical document are either inconsistent or do not match the gender specified in the patient information. */
export interface SexMismatchInferenceOutput extends RadiologyInsightsInferenceOutputParent {
  /** Inference type. */
  kind: "sexMismatch";
  /** Sex indication : SNOMED CT code for gender finding. */
  sexIndication: CodeableConceptOutput;
}

/** A laterality mismatch occurs when there is a discrepancy between the clinical documentation and the ordered procedure (orderLateralityMismatch), a contradiction within the clinical document (textLateralityContradiction), or when no laterality is mentioned (textLateralityMissing). */
export interface LateralityDiscrepancyInferenceOutput
  extends RadiologyInsightsInferenceOutputParent {
  /** Inference type. */
  kind: "lateralityDiscrepancy";
  /** Laterality indication : SNOMED CT code for laterality qualifier value. */
  lateralityIndication?: CodeableConceptOutput;
  /** Mismatch type : orderLateralityMismatch, textLateralityContradiction, textLateralityMissing. */
  discrepancyType: LateralityDiscrepancyTypeOutput;
}

/** A complete order discrepancy is shown when one or more body parts and/or measurements that should be in the document (because there is a complete order) are not present. */
export interface CompleteOrderDiscrepancyInferenceOutput
  extends RadiologyInsightsInferenceOutputParent {
  /** Inference type. */
  kind: "completeOrderDiscrepancy";
  /** Order type : CPT ultrasound complete code for abdomen, retroperitoneal, pelvis or breast. */
  orderType: CodeableConceptOutput;
  /** List of missing body parts required by a complete order : SNOMED CT codes. */
  missingBodyParts?: Array<CodeableConceptOutput>;
  /** List of missing body parts that require measurement by a complete order : SNOMED CT codes. */
  missingBodyPartMeasurements?: Array<CodeableConceptOutput>;
}

/** A limited order discrepancy occurs when there is a limited order, but all body parts and measurements that are needed for a complete order are present in the document. */
export interface LimitedOrderDiscrepancyInferenceOutput
  extends RadiologyInsightsInferenceOutputParent {
  /** Inference type. */
  kind: "limitedOrderDiscrepancy";
  /** Order type : CPT ultrasound complete code for abdomen, retroperitoneal, pelvis or breast. */
  orderType: CodeableConceptOutput;
  /** List of body parts found in the document : SNOMED CT codes. */
  presentBodyParts?: Array<CodeableConceptOutput>;
  /** List of body parts that are measured according to the document : SNOMED CT codes. */
  presentBodyPartMeasurements?: Array<CodeableConceptOutput>;
}

/** Findings in a radiology report typically describe abnormalities, lesions, or other notable observations related to the anatomy or pathology of the imaged area. */
export interface FindingInferenceOutput extends RadiologyInsightsInferenceOutputParent {
  /** Inference type. */
  kind: "finding";
  /** Finding data : contains extensions, fields and components linked with the finding. */
  finding: ObservationOutput;
}

/** Critical results refer to findings of utmost importance that may require timely attention due to their potential impact on patient care. */
export interface CriticalResultInferenceOutput extends RadiologyInsightsInferenceOutputParent {
  /** Inference type. */
  kind: "criticalResult";
  /** The complete Critical Result, as outlined below, will be reused for the recommendation. */
  result: CriticalResultOutput;
}

/** Critical Result consists of two properties. */
export interface CriticalResultOutput {
  /** Description : medical problem. */
  description: string;
  /** Finding linked to the critical result. */
  finding?: ObservationOutput;
}

/** Radiology procedures are the specific imaging studies or examinations ordered for the patient, extracted from the document information and text. */
export interface RadiologyProcedureInferenceOutput extends RadiologyInsightsInferenceOutputParent {
  /** Inference type. */
  kind: "radiologyProcedure";
  /** LOINC codes for the procedure. */
  procedureCodes?: Array<CodeableConceptOutput>;
  /** Imaging procedures. */
  imagingProcedures: Array<ImagingProcedureOutput>;
  /** Ordered procedure information from the document information or text. */
  orderedProcedure: OrderedProcedureOutput;
}

/** Imaging procedure. */
export interface ImagingProcedureOutput {
  /** Modality : SNOMED CT code. */
  modality: CodeableConceptOutput;
  /** Anatomy : SNOMED CT code. */
  anatomy: CodeableConceptOutput;
  /** Laterality : SNOMED CT code. */
  laterality?: CodeableConceptOutput;
  /** Contrast : see RadiologyCodeWithTypes (below). */
  contrast?: RadiologyCodeWithTypesOutput;
  /** View : see RadiologyCodeWithTypes (below). */
  view?: RadiologyCodeWithTypesOutput;
}

/** Radiology code with types : used in imaging procedure recommendation for contrast and view. */
export interface RadiologyCodeWithTypesOutput {
  /** The SNOMED CT code indicates whether imaging was conducted with or without contrast in the case of contrast, and in the case of views, it denotes the number of views. */
  code: CodeableConceptOutput;
  /** The collection of types will indicate the contrast substance used in the case of contrast and, in the case of views, it will specify the types of views, such as lateral and frontal, etc. */
  types: Array<CodeableConceptOutput>;
}

/** Follow-up recommendations offer guidance to healthcare providers on managing and monitoring patients based on the findings of imaging studies. */
export interface FollowupRecommendationInferenceOutput
  extends RadiologyInsightsInferenceOutputParent {
  /** Inference type. */
  kind: "followupRecommendation";
  /** Date and time are displayed when the procedure is recommended to be done at a specific point in time. */
  effectiveAt?: string;
  /** The period is shown if a specific period is mentioned, with a start and end date-time. */
  effectivePeriod?: PeriodOutput;
  /** Findings related to the recommendation. */
  findings?: Array<RecommendationFindingOutput>;
  /** The conditional value indicates whether or not the sentence containing the recommendation includes a conditional statement. Keywords for conditional statements include 'if', 'when', 'unless', and so on. */
  isConditional: boolean;
  /** The option value indicates whether or not the sentence containing the recommendation includes an optional statement. Keywords for optional statements include 'recommend', 'consider', and so on. */
  isOption: boolean;
  /** The guideline value indicates whether or not the recommendation is part of a guideline section that compiles all recommendations applicable to various findings. */
  isGuideline: boolean;
  /** Hedging refers to ambiguous, vague or imprecise language within the sentence of the recommendation. Keywords for hedging are 'can be','may be',and so on. */
  isHedging: boolean;
  /** The procedure recommendation can be a generic procedure or an imaging procedure. */
  recommendedProcedure: ProcedureRecommendationOutput;
}

/** Finding reference for recommendation. */
export interface RecommendationFindingOutput {
  /** Finding linked to a recommendation. */
  finding?: ObservationOutput;
  /** Critical result linked to a recommendation. */
  criticalFinding?: CriticalResultOutput;
  /** Recommendation finding status. */
  recommendationFindingStatus: RecommendationFindingStatusTypeOutput;
  /** Additional Content defined by implementations */
  extension?: Array<ExtensionOutput>;
}

/** The procedure recommendation can be a generic procedure or an imaging procedure. */
export interface ProcedureRecommendationOutputParent {
  /** Additional Content defined by implementations */
  extension?: Array<ExtensionOutput>;
  kind: string;
}

/** Generic procedure information. */
export interface GenericProcedureRecommendationOutput extends ProcedureRecommendationOutputParent {
  /** Procedure type : generic. */
  kind: "genericProcedureRecommendation";
  /** Procedure modality : SNOMED CT code. */
  code: CodeableConceptOutput;
  /** Procedure description : MANAGEMENT PROCEDURE (PROCEDURE) or CONSULTATION (PROCEDURE) based on SNOMED CT. */
  description?: string;
}

/** Imaging procedures. */
export interface ImagingProcedureRecommendationOutput extends ProcedureRecommendationOutputParent {
  /** Procedure type : imaging. */
  kind: "imagingProcedureRecommendation";
  /** LOINC codes for the procedure. */
  procedureCodes?: Array<CodeableConceptOutput>;
  /** Imaging procedures. */
  imagingProcedures: Array<ImagingProcedureOutput>;
}

/** Follow-up communication involves the exchange of important information, recommendations, or updates between radiologists and other healthcare professionals involved in a patient's care. */
export interface FollowupCommunicationInferenceOutput
  extends RadiologyInsightsInferenceOutputParent {
  /** Inference type. */
  kind: "followupCommunication";
  /** Communication date and time. */
  communicatedAt?: string[];
  /** Recipient of the communication. */
  recipient?: MedicalProfessionalTypeOutput[];
  /** Communication was acknowledged. */
  wasAcknowledged: boolean;
}

/** A response containing error details. */
export interface HealthInsightsErrorResponseOutput {
  /** The error object. */
  error: ErrorModel;
  /** An opaque, globally-unique, server-generated string identifier for the request. */
  requestId: { response: RequestIdResponseHeaderOutput };
}

/** Provides the 'x-ms-request-id' header to enable request correlation in responses. */
export interface RequestIdResponseHeaderOutput {}

/**
 * A resource with narrative, extensions, and contained resources
 * Based on [FHIR DomainResource](https://www.hl7.org/fhir/domainresource.html)
 */
export type DomainResourceOutput =
  | DomainResourceOutputParent
  | ObservationOutput
  | ConditionOutput
  | ResearchStudyOutput;
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
export type RadiologyInsightsInferenceOutput =
  | RadiologyInsightsInferenceOutputParent
  | AgeMismatchInferenceOutput
  | SexMismatchInferenceOutput
  | LateralityDiscrepancyInferenceOutput
  | CompleteOrderDiscrepancyInferenceOutput
  | LimitedOrderDiscrepancyInferenceOutput
  | FindingInferenceOutput
  | CriticalResultInferenceOutput
  | RadiologyProcedureInferenceOutput
  | FollowupRecommendationInferenceOutput
  | FollowupCommunicationInferenceOutput;
/** The procedure recommendation can be a generic procedure or an imaging procedure. */
export type ProcedureRecommendationOutput =
  | ProcedureRecommendationOutputParent
  | GenericProcedureRecommendationOutput
  | ImagingProcedureRecommendationOutput;
/** Alias for PatientSexOutput */
export type PatientSexOutput = string | "female" | "male" | "unspecified";
/** Alias for ContactPointSystemOutput */
export type ContactPointSystemOutput =
  | string
  | "phone"
  | "fax"
  | "email"
  | "pager"
  | "url"
  | "sms"
  | "other";
/** Alias for ContactPointUseOutput */
export type ContactPointUseOutput = string | "home" | "work" | "temp" | "old" | "mobile";
/** Alias for ObservationStatusCodeTypeOutput */
export type ObservationStatusCodeTypeOutput =
  | string
  | "registered"
  | "preliminary"
  | "final"
  | "amended"
  | "corrected"
  | "cancelled"
  | "entered-in-error"
  | "unknown";
/** Alias for ResearchStudyStatusCodeTypeOutput */
export type ResearchStudyStatusCodeTypeOutput =
  | string
  | "active"
  | "administratively-completed"
  | "approved"
  | "closed-to-accrual"
  | "closed-to-accrual-and-intervention"
  | "completed"
  | "disapproved"
  | "in-review"
  | "temporarily-closed-to-accrual"
  | "temporarily-closed-to-accrual-and-intervention"
  | "withdrawn";
/** Alias for EncounterClassOutput */
export type EncounterClassOutput =
  | string
  | "inpatient"
  | "ambulatory"
  | "observation"
  | "emergency"
  | "virtual"
  | "healthHome";
/** Alias for DocumentTypeOutput */
export type DocumentTypeOutput = string | "note" | "fhirBundle" | "dicom" | "genomicSequencing";
/** Alias for ClinicalDocumentTypeOutput */
export type ClinicalDocumentTypeOutput =
  | string
  | "consultation"
  | "dischargeSummary"
  | "historyAndPhysical"
  | "radiologyReport"
  | "procedure"
  | "progress"
  | "laboratory"
  | "pathologyReport";
/** Alias for SpecialtyTypeOutput */
export type SpecialtyTypeOutput = string | "pathology" | "radiology";
/** Alias for DocumentContentSourceTypeOutput */
export type DocumentContentSourceTypeOutput = string | "inline" | "reference";
/** Alias for RadiologyInsightsInferenceTypeOutput */
export type RadiologyInsightsInferenceTypeOutput =
  | string
  | "ageMismatch"
  | "lateralityDiscrepancy"
  | "sexMismatch"
  | "completeOrderDiscrepancy"
  | "limitedOrderDiscrepancy"
  | "finding"
  | "criticalResult"
  | "followupRecommendation"
  | "followupCommunication"
  | "radiologyProcedure";
/** Alias for LateralityDiscrepancyTypeOutput */
export type LateralityDiscrepancyTypeOutput =
  | string
  | "orderLateralityMismatch"
  | "textLateralityContradiction"
  | "textLateralityMissing";
/** Alias for RecommendationFindingStatusTypeOutput */
export type RecommendationFindingStatusTypeOutput =
  | string
  | "present"
  | "differential"
  | "ruleOut"
  | "conditional";
/** Alias for MedicalProfessionalTypeOutput */
export type MedicalProfessionalTypeOutput =
  | string
  | "unknown"
  | "doctor"
  | "nurse"
  | "midwife"
  | "physicianAssistant";
/** Alias for JobStatusOutput */
export type JobStatusOutput =
  | string
  | "notStarted"
  | "running"
  | "succeeded"
  | "failed"
  | "canceled";
