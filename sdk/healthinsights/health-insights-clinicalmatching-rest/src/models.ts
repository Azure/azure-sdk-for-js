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

/** Trial data which is of interest to the potential participant. */
export interface ClinicalTrialMetadata {
  /**
   * Phases which are relevant for the clinical trial.
   * Each clinical trial can be in a certain phase or in multiple phases.
   */
  phases?: string[];
  /**
   * Possible study types of a clinical trial.
   *
   * Possible values: interventional, observational, expandedAccess, patientRegistries
   */
  studyType?: string;
  /**
   * Possible recruitment status of a clinical trial.
   *
   * Possible values: unknownStatus, notYetRecruiting, recruiting, enrollingByInvitation
   */
  recruitmentStatus?: string;
  /** Medical conditions and their synonyms which are relevant for the clinical trial, given as strings. */
  conditions: string[];
  /** Sponsors/collaborators involved with the trial. */
  sponsors?: string[];
  /** Contact details of the trial administrators, for patients that want to participate in the trial. */
  contacts?: Array<ContactDetails>;
  /** Research facilities where the clinical trial is conducted. */
  facilities?: Array<ClinicalTrialResearchFacility>;
}

/** A person's contact details. */
export interface ContactDetails {
  /** The person's name. */
  name?: string;
  /** The person's email. */
  email?: string;
  /** A person's phone number. */
  phone?: string;
}

/** Details of a research facility where a clinical trial is conducted. */
export interface ClinicalTrialResearchFacility {
  /** The facility's name. */
  name: string;
  /** City name. */
  city?: string;
  /** State name. */
  state?: string;
  /** Country/region name. */
  countryOrRegion: string;
}

/** The body of the Trial Matcher request. */
export interface TrialMatcherData {
  /** The list of patients, including their clinical information and data. */
  patients: Array<PatientRecord>;
  /** Configuration affecting the Trial Matcher model's inference. */
  configuration?: TrialMatcherModelConfiguration;
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

/** Configuration affecting the Trial Matcher model's inference. */
export interface TrialMatcherModelConfiguration {
  /** An indication whether the model should produce verbose output. */
  verbose?: boolean;
  /** An indication whether the model's output should include evidence for the inferences. */
  includeEvidence?: boolean;
  /**
   * The clinical trials that the patient(s) should be matched to. <br />The trial
   * selection can be given as a list of custom clinical trials and/or a list of
   * filters to known clinical trial registries. In case both are given, the
   * resulting trial set is a union of the two sets.
   */
  clinicalTrials: ClinicalTrials;
}

/**
 * The clinical trials that the patient(s) should be matched to.
 * The trial selection can be given as a list of custom clinical trials and/or a list of filters to known clinical trial registries.
 * In case both are given, the resulting trial set is a union of the two sets.
 */
export interface ClinicalTrials {
  /** A list of clinical trials. */
  customTrials?: Array<ClinicalTrialDetails>;
  /**
   * A list of filters, each one creating a selection of trials from a given
   * clinical trial registry.
   */
  registryFilters?: Array<ClinicalTrialRegistryFilter>;
}

/** A description of a clinical trial. */
export interface ClinicalTrialDetails {
  /** A given identifier for the clinical trial. Has to be unique within a list of clinical trials. */
  id: string;
  /** The eligibility criteria of the clinical trial (inclusion and exclusion), given as text. */
  eligibilityCriteriaText?: string;
  /** Demographic criteria for a clinical trial. */
  demographics?: ClinicalTrialDemographics;
  /** Trial data which is of interest to the potential participant. */
  metadata: ClinicalTrialMetadata;
}

/** Demographic criteria for a clinical trial. */
export interface ClinicalTrialDemographics {
  /**
   * Indication of the sex of people who may participate in the clinical trial.
   *
   * Possible values: all, female, male
   */
  acceptedSex?: string;
  /** A definition of the range of ages accepted by a clinical trial. Contains a minimum age and/or a maximum age. */
  acceptedAgeRange?: AcceptedAgeRange;
}

/** A definition of the range of ages accepted by a clinical trial. Contains a minimum age and/or a maximum age. */
export interface AcceptedAgeRange {
  /** A person's age, given as a number (value) and a unit (e.g. years, months) */
  minimumAge?: AcceptedAge;
  /** A person's age, given as a number (value) and a unit (e.g. years, months) */
  maximumAge?: AcceptedAge;
}

/** A person's age, given as a number (value) and a unit (e.g. years, months) */
export interface AcceptedAge {
  /**
   * Possible units for a person's age.
   *
   * Possible values: years, months, days
   */
  unit: string;
  /** The number of years/months/days that represents the person's age. */
  value: number;
}

/** A filter defining a subset of clinical trials from a given clinical trial registry (e.g. clinicaltrials.gov). */
export interface ClinicalTrialRegistryFilter {
  /**
   * Trials with any of the given medical conditions will be included in the selection (provided that other limitations are satisfied).
   * Leaving this list empty will not limit the medical conditions.
   */
  conditions?: string[];
  /**
   * Trials with any of the given study types will be included in the selection (provided that other limitations are satisfied).
   * Leaving this list empty will not limit the study types.
   */
  studyTypes?: string[];
  /**
   * Trials with any of the given recruitment statuses will be included in the selection (provided that other limitations are satisfied).
   * Leaving this list empty will not limit the recruitment statuses.
   */
  recruitmentStatuses?: string[];
  /**
   * Trials with any of the given sponsors will be included in the selection (provided that other limitations are satisfied).
   * Leaving this list empty will not limit the sponsors.
   */
  sponsors?: string[];
  /**
   * Trials with any of the given phases will be included in the selection (provided that other limitations are satisfied).
   * Leaving this list empty will not limit the phases.
   */
  phases?: string[];
  /**
   * Trials with any of the given purposes will be included in the selection (provided that other limitations are satisfied).
   * Leaving this list empty will not limit the purposes.
   */
  purposes?: string[];
  /**
   * Trials with any of the given identifiers will be included in the selection (provided that other limitations are satisfied).
   * Leaving this list empty will not limit the trial identifiers.
   */
  ids?: string[];
  /**
   * Trials with any of the given sources will be included in the selection (provided that other limitations are satisfied).
   * Leaving this list empty will not limit the sources.
   */
  sources?: string[];
  /**
   * Trials with any of the given facility names will be included in the selection (provided that other limitations are satisfied).
   * Leaving this list empty will not limit the trial facility names.
   */
  facilityNames?: string[];
  /**
   * Trials with any of the given facility locations will be included in the selection (provided that other limitations are satisfied).
   * Leaving this list empty will not limit the trial facility locations.
   */
  facilityLocations?: Array<GeographicLocation>;
  /**
   * Trials with any of the given facility area boundaries will be included in the selection (provided that other limitations are satisfied).
   * Leaving this list empty will not limit the trial facility area boundaries.
   */
  facilityAreas?: Array<GeographicArea>;
}

/**
 * A location given as a combination of city, state and country/region. It could specify a city, a state or a country/region.
 * In case a city is specified, either state +country/region or country/region (for countries/regions where there are no states) should be added.
 * In case a state is specified (without a city), country/region should be added.
 */
export interface GeographicLocation {
  /** City name. */
  city?: string;
  /** State name. */
  state?: string;
  /** Country/region name. */
  countryOrRegion: string;
}

/** A geographic area, expressed as a `Circle` geometry represented using a `GeoJSON Feature` (see [GeoJSON spec](https://tools.ietf.org/html/rfc7946)). */
export interface GeographicArea {
  /**
   * `GeoJSON` type.
   *
   * Possible values: Feature
   */
  type: string;
  /** `GeoJSON` geometry, representing the area circle's center. */
  geometry: AreaGeometry;
  /** `GeoJSON` object properties. */
  properties: AreaProperties;
}

/** `GeoJSON` geometry, representing the area circle's center. */
export interface AreaGeometry {
  /**
   * `GeoJSON` geometry type.
   *
   * Possible values: Point
   */
  type: string;
  /**
   * Coordinates of the area circle's center, represented according to the `GeoJSON` standard.
   * This is an array of 2 decimal numbers, longitude and latitude (precisely in this order).
   */
  coordinates: number[];
}

/** `GeoJSON` object properties. */
export interface AreaProperties {
  /**
   * `GeoJSON` object sub-type.
   *
   * Possible values: Circle
   */
  subType: string;
  /** The radius of the area's circle, in meters. */
  radius: number;
}
