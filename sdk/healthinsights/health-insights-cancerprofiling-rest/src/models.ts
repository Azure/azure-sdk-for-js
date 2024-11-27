// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** A piece of clinical information, expressed as a code in a clinical coding system. */
export interface ClinicalCodedElement {
  /** The clinical coding system, e.g. ICD-10, SNOMED-CT, UMLS. */
  system: string;
  /** The code within the given clinical coding system. */
  code: string;
  /** The name of this coded concept in the coding system. */
  name?: string;
  /** A value associated with the code within the given clinical coding system. */
  value?: string;
}

/** The body of the Onco Phenotype request. */
export interface OncoPhenotypeData {
  /** The list of patients, including their clinical information and data. */
  patients: Array<PatientRecord>;
  /** Configuration affecting the Onco Phenotype model's inference. */
  configuration?: OncoPhenotypeModelConfiguration;
}

/** A patient record, including their clinical information and data. */
export interface PatientRecord {
  /** A given identifier for the patient. Has to be unique across all patients in a single request. */
  id: string;
  /** Patient structured information, including demographics and known structured clinical information. */
  info?: PatientInfo;
  /** Patient unstructured clinical data, given as documents. */
  data?: Array<PatientDocument>;
}

/** Patient structured information, including demographics and known structured clinical information. */
export interface PatientInfo {
  /**
   * The patient's sex.
   *
   * Possible values: female, male, unspecified
   */
  sex?: string;
  /** The patient's date of birth. */
  birthDate?: Date | string;
  /** Known clinical information for the patient, structured. */
  clinicalInfo?: Array<ClinicalCodedElement>;
}

/** A clinical document related to a patient. Document here is in the wide sense - not just a text document (note). */
export interface PatientDocument {
  /**
   * The type of the patient document, such as 'note' (text document) or 'fhirBundle' (FHIR JSON document).
   *
   * Possible values: note, fhirBundle, dicom, genomicSequencing
   */
  type: string;
  /**
   * The type of the clinical document.
   *
   * Possible values: consultation, dischargeSummary, historyAndPhysical, procedure, progress, imaging, laboratory, pathology
   */
  clinicalType?: string;
  /** A given identifier for the document. Has to be unique across all documents for a single patient. */
  id: string;
  /** A 2 letter ISO 639-1 representation of the language of the document. */
  language?: string;
  /** The date and time when the document was created. */
  createdDateTime?: Date | string;
  /** The content of the patient document. */
  content: DocumentContent;
}

/** The content of the patient document. */
export interface DocumentContent {
  /**
   * The type of the content's source.
   * In case the source type is 'inline', the content is given as a string (for instance, text).
   * In case the source type is 'reference', the content is given as a URI.
   *
   * Possible values: inline, reference
   */
  sourceType: string;
  /** The content of the document, given either inline (as a string) or as a reference (URI). */
  value: string;
}

/** Configuration affecting the Onco Phenotype model's inference. */
export interface OncoPhenotypeModelConfiguration {
  /** An indication whether the model should produce verbose output. */
  verbose?: boolean;
  /** An indication whether the model's output should include evidence for the inferences. */
  includeEvidence?: boolean;
  /**
   * A list of inference types to be inferred for the current request.
   * This could be used if only part of the Onco Phenotype inferences are required.
   * If this list is omitted or empty, the model will return all the inference types.
   */
  inferenceTypes?: string[];
  /** An indication whether to perform a preliminary step on the patient's documents to determine whether they relate to a Cancer case. */
  checkForCancerCase?: boolean;
}
