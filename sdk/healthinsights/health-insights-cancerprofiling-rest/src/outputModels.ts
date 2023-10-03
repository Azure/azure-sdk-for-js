// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** The response for the Onco Phenotype request. */
export interface OncoPhenotypeResultOutput {
  /** A processing job identifier. */
  readonly jobId: string;
  /** The date and time when the processing job was created. */
  readonly createdDateTime: string;
  /** The date and time when the processing job is set to expire. */
  readonly expirationDateTime: string;
  /** The date and time when the processing job was last updated. */
  readonly lastUpdateDateTime: string;
  /**
   * The status of the processing job.
   *
   * Possible values: notStarted, running, succeeded, failed, partiallyCompleted
   */
  readonly status: string;
  /** An array of errors, if any errors occurred during the processing job. */
  readonly errors?: Array<ErrorModelOutput>;
  /** The inference results for the Onco Phenotype request. */
  readonly results?: OncoPhenotypeResultsOutput;
}

/** The error object. */
export interface ErrorModelOutput {
  /** One of a server-defined set of error codes. */
  code: string;
  /** A human-readable representation of the error. */
  message: string;
  /** The target of the error. */
  target?: string;
  /** An array of details about specific errors that led to this reported error. */
  details?: Array<ErrorModelOutput>;
  /** An object containing more specific information than the current object about the error. */
  innererror?: InnerErrorOutput;
}

/** An object containing more specific information about the error. As per Microsoft One API guidelines - https://github.com/Microsoft/api-guidelines/blob/vNext/Guidelines.md#7102-error-condition-responses. */
export interface InnerErrorOutput {
  /** One of a server-defined set of error codes. */
  code?: string;
  /** Inner error. */
  innererror?: InnerErrorOutput;
}

/** The inference results for the Onco Phenotype request. */
export interface OncoPhenotypeResultsOutput {
  /** Results for the patients given in the request. */
  patients: Array<OncoPhenotypePatientResultOutput>;
  /** The version of the model used for inference, expressed as the model date. */
  modelVersion: string;
}

/** The results of the model's work for a single patient. */
export interface OncoPhenotypePatientResultOutput {
  /** The identifier given for the patient in the request. */
  id: string;
  /** The model's inferences for the given patient. */
  inferences: Array<OncoPhenotypeInferenceOutput>;
}

/** An inference made by the Onco Phenotype model regarding a patient. */
export interface OncoPhenotypeInferenceOutput {
  /**
   * The type of the Onco Phenotype inference
   *
   * Possible values: tumorSite, histology, clinicalStageT, clinicalStageN, clinicalStageM, pathologicStageT, pathologicStageN, pathologicStageM
   */
  type: string;
  /** The value of the inference, as relevant for the given inference type. */
  value: string;
  /** The description corresponding to the inference value. */
  description?: string;
  /** Confidence score for this inference. */
  confidenceScore?: number;
  /** The evidence corresponding to the inference value. */
  evidence?: Array<InferenceEvidenceOutput>;
  /** An identifier for a clinical case, if there are multiple clinical cases regarding the same patient. */
  caseId?: string;
}

/** A piece of evidence corresponding to an inference. */
export interface InferenceEvidenceOutput {
  /** A piece of evidence from a clinical note (text document). */
  patientDataEvidence?: ClinicalNoteEvidenceOutput;
  /**
   * A piece of clinical information, expressed as a code in a clinical coding
   * system.
   */
  patientInfoEvidence?: ClinicalCodedElementOutput;
  /** A value indicating how important this piece of evidence is for the inference. */
  importance?: number;
}

/** A piece of evidence from a clinical note (text document). */
export interface ClinicalNoteEvidenceOutput {
  /** The identifier of the document containing the evidence. */
  id: string;
  /** The actual text span which is evidence for the inference. */
  text?: string;
  /** The start index of the evidence text span in the document (0 based). */
  offset: number;
  /** The length of the evidence text span. */
  length: number;
}

/** A piece of clinical information, expressed as a code in a clinical coding system. */
export interface ClinicalCodedElementOutput {
  /** The clinical coding system, e.g. ICD-10, SNOMED-CT, UMLS. */
  system: string;
  /** The code within the given clinical coding system. */
  code: string;
  /** The name of this coded concept in the coding system. */
  name?: string;
  /** A value associated with the code within the given clinical coding system. */
  value?: string;
}
