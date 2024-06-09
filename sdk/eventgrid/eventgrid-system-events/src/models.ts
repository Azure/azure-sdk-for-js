// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** Known values of {@link AppAction} that the service accepts. */
export const enum KnownAppAction {
  /** Web app was restarted. */
  Restarted = "Restarted",
  /** Web app was stopped. */
  Stopped = "Stopped",
  /** There was an operation to change app setting on the web app. */
  ChangedAppSettings = "ChangedAppSettings",
  /** The job has started. */
  Started = "Started",
  /** The job has completed. */
  Completed = "Completed",
  /** The job has failed to complete. */
  Failed = "Failed",
}

/** Known values of {@link StampKind} that the service accepts. */
export const enum KnownStampKind {
  /** App Service Plan is running on a public stamp. */
  Public = "Public",
  /** App Service Plan is running on an App Service Environment V1. */
  AseV1 = "AseV1",
  /** App Service Plan is running on an App Service Environment V2. */
  AseV2 = "AseV2",
}

/** Known values of {@link AsyncStatus} that the service accepts. */
export const enum KnownAsyncStatus {
  /** Async operation has started. */
  Started = "Started",
  /** Async operation has completed. */
  Completed = "Completed",
  /** Async operation failed to complete. */
  Failed = "Failed",
}

/** Known values of {@link AppServicePlanAction} that the service accepts. */
export const enum KnownAppServicePlanAction {
  /** App Service plan is being updated. */
  Updated = "Updated",
}

/** Known values of {@link EventGridMqttClientState} that the service accepts. */
export const enum KnownEventGridMqttClientState {
  Enabled = "Enabled",
  Disabled = "Disabled",
}

/** Known values of {@link EventGridMqttClientDisconnectionReason} that the service accepts. */
export const enum KnownEventGridMqttClientDisconnectionReason {
  /** The client got disconnected for any authentication reasons (for example, certificate expired, client got disabled, or client configuration changed). */
  ClientAuthenticationError = "ClientAuthenticationError",
  /** The client got disconnected for any authorization reasons (for example, because of a change in the configuration of topic spaces, permission bindings, or client groups). */
  ClientAuthorizationError = "ClientAuthorizationError",
  /** The client sent a bad request or used one of the unsupported features that resulted in a connection termination by the service. */
  ClientError = "ClientError",
  /** The client initiates a graceful disconnect through a DISCONNECT packet for MQTT or a close frame for MQTT over WebSocket. */
  ClientInitiatedDisconnect = "ClientInitiatedDisconnect",
  /** The client-server connection is lost. (EXCHANGE ONLINE PROTECTION). */
  ConnectionLost = "ConnectionLost",
  /** The client's IP address is blocked by IP filter or Private links configuration. */
  IpForbidden = "IpForbidden",
  /** The client exceeded one or more of the throttling limits that resulted in a connection termination by the service. */
  QuotaExceeded = "QuotaExceeded",
  /** The connection got terminated due to an unexpected server error. */
  ServerError = "ServerError",
  /** The server initiates a graceful disconnect for any operational reason. */
  ServerInitiatedDisconnect = "ServerInitiatedDisconnect",
  /** The client's queue for unacknowledged QoS1 messages reached its limit, which resulted in a connection termination by the server. */
  SessionOverflow = "SessionOverflow",
  /** The client reconnected with the same authentication name, which resulted in the termination of the previous connection. */
  SessionTakenOver = "SessionTakenOver",
}

/** Known values of {@link AcsRouterJobStatus} that the service accepts. */
export const enum KnownAcsRouterJobStatus {
  PendingClassification = "PendingClassification",
  Queued = "Queued",
  Assigned = "Assigned",
  Completed = "Completed",
  Closed = "Closed",
  Cancelled = "Cancelled",
  ClassificationFailed = "ClassificationFailed",
  Created = "Created",
  PendingSchedule = "PendingSchedule",
  Scheduled = "Scheduled",
  ScheduleFailed = "ScheduleFailed",
  WaitingForActivation = "WaitingForActivation",
}

/** Known values of {@link AcsRouterLabelOperator} that the service accepts. */
export const enum KnownAcsRouterLabelOperator {
  Equal = "Equal",
  NotEqual = "NotEqual",
  Greater = "Greater",
  Less = "Less",
  GreaterThanOrEqual = "GreaterThanOrEqual",
  LessThanOrEqual = "LessThanOrEqual",
}

/** Known values of {@link AcsRouterWorkerSelectorState} that the service accepts. */
export const enum KnownAcsRouterWorkerSelectorState {
  /** Router Job Worker Selector is Active */
  Active = "active",
  /** Router Job Worker Selector has Expire */
  Expired = "expired",
}

/** Known values of {@link StorageTaskCompletedStatus} that the service accepts. */
export const enum KnownStorageTaskCompletedStatus {
  Succeeded = "Succeeded",
  Failed = "Failed",
}

/** Known values of {@link StorageTaskAssignmentCompletedStatus} that the service accepts. */
export const enum KnownStorageTaskAssignmentCompletedStatus {
  Succeeded = "Succeeded",
  Failed = "Failed",
}

/** Known values of {@link DataBoxStageName} that the service accepts. */
export const enum KnownDataBoxStageName {
  /** Copy has started */
  CopyStarted = "CopyStarted",
  /** Copy has completed */
  CopyCompleted = "CopyCompleted",
  /** Order has been completed */
  OrderCompleted = "OrderCompleted",
}

/** Known values of {@link CommunicationCloudEnvironmentModel} that the service accepts. */
export const enum KnownCommunicationCloudEnvironmentModel {
  Public = "public",
  Dod = "dod",
  Gcch = "gcch",
}

/** Known values of {@link RecordingContentType} that the service accepts. */
export const enum KnownRecordingContentType {
  AudioVideo = "AudioVideo",
  Audio = "Audio",
}

/** Known values of {@link RecordingChannelType} that the service accepts. */
export const enum KnownRecordingChannelType {
  Mixed = "Mixed",
  Unmixed = "Unmixed",
}

/** Known values of {@link RecordingFormatType} that the service accepts. */
export const enum KnownRecordingFormatType {
  Wav = "Wav",
  Mp3 = "Mp3",
  Mp4 = "Mp4",
}

/** Known values of {@link AcsEmailDeliveryReportStatus} that the service accepts. */
export const enum KnownAcsEmailDeliveryReportStatus {
  /** Hard bounce detected while sending the email */
  Bounced = "Bounced",
  /** The email was delivered */
  Delivered = "Delivered",
  /** The email failed to be delivered */
  Failed = "Failed",
  /** The message was identified spam and was rejected or blocked (not quarantined). */
  FilteredSpam = "FilteredSpam",
  /** The message was quarantined (as spam, bulk mail, or phishing). For more information, see Quarantined email messages in EOP (EXCHANGE ONLINE PROTECTION). */
  Quarantined = "Quarantined",
  /** The email was suppressed */
  Suppressed = "Suppressed",
}

/** Known values of {@link AcsUserEngagement} that the service accepts. */
export const enum KnownAcsUserEngagement {
  View = "view",
  Click = "click",
}

/** Known values of {@link HealthcareFhirResourceType} that the service accepts. */
export const enum KnownHealthcareFhirResourceType {
  /** The FHIR resource type defined in STU3 and R4. */
  Account = "Account",
  /** The FHIR resource type defined in STU3 and R4. */
  ActivityDefinition = "ActivityDefinition",
  /** The FHIR resource type defined in STU3 and R4. */
  AdverseEvent = "AdverseEvent",
  /** The FHIR resource type defined in STU3 and R4. */
  AllergyIntolerance = "AllergyIntolerance",
  /** The FHIR resource type defined in STU3 and R4. */
  Appointment = "Appointment",
  /** The FHIR resource type defined in STU3 and R4. */
  AppointmentResponse = "AppointmentResponse",
  /** The FHIR resource type defined in STU3 and R4. */
  AuditEvent = "AuditEvent",
  /** The FHIR resource type defined in STU3 and R4. */
  Basic = "Basic",
  /** The FHIR resource type defined in STU3 and R4. */
  Binary = "Binary",
  /** The FHIR resource type defined in R4. */
  BiologicallyDerivedProduct = "BiologicallyDerivedProduct",
  /** The FHIR resource type defined in STU3. */
  BodySite = "BodySite",
  /** The FHIR resource type defined in R4. */
  BodyStructure = "BodyStructure",
  /** The FHIR resource type defined in STU3 and R4. */
  Bundle = "Bundle",
  /** The FHIR resource type defined in STU3 and R4. */
  CapabilityStatement = "CapabilityStatement",
  /** The FHIR resource type defined in STU3 and R4. */
  CarePlan = "CarePlan",
  /** The FHIR resource type defined in STU3 and R4. */
  CareTeam = "CareTeam",
  /** The FHIR resource type defined in R4. */
  CatalogEntry = "CatalogEntry",
  /** The FHIR resource type defined in STU3 and R4. */
  ChargeItem = "ChargeItem",
  /** The FHIR resource type defined in R4. */
  ChargeItemDefinition = "ChargeItemDefinition",
  /** The FHIR resource type defined in STU3 and R4. */
  Claim = "Claim",
  /** The FHIR resource type defined in STU3 and R4. */
  ClaimResponse = "ClaimResponse",
  /** The FHIR resource type defined in STU3 and R4. */
  ClinicalImpression = "ClinicalImpression",
  /** The FHIR resource type defined in STU3 and R4. */
  CodeSystem = "CodeSystem",
  /** The FHIR resource type defined in STU3 and R4. */
  Communication = "Communication",
  /** The FHIR resource type defined in STU3 and R4. */
  CommunicationRequest = "CommunicationRequest",
  /** The FHIR resource type defined in STU3 and R4. */
  CompartmentDefinition = "CompartmentDefinition",
  /** The FHIR resource type defined in STU3 and R4. */
  Composition = "Composition",
  /** The FHIR resource type defined in STU3 and R4. */
  ConceptMap = "ConceptMap",
  /** The FHIR resource type defined in STU3 and R4. */
  Condition = "Condition",
  /** The FHIR resource type defined in STU3 and R4. */
  Consent = "Consent",
  /** The FHIR resource type defined in STU3 and R4. */
  Contract = "Contract",
  /** The FHIR resource type defined in STU3 and R4. */
  Coverage = "Coverage",
  /** The FHIR resource type defined in R4. */
  CoverageEligibilityRequest = "CoverageEligibilityRequest",
  /** The FHIR resource type defined in R4. */
  CoverageEligibilityResponse = "CoverageEligibilityResponse",
  /** The FHIR resource type defined in STU3. */
  DataElement = "DataElement",
  /** The FHIR resource type defined in STU3 and R4. */
  DetectedIssue = "DetectedIssue",
  /** The FHIR resource type defined in STU3 and R4. */
  Device = "Device",
  /** The FHIR resource type defined in STU3. */
  DeviceComponent = "DeviceComponent",
  /** The FHIR resource type defined in R4. */
  DeviceDefinition = "DeviceDefinition",
  /** The FHIR resource type defined in STU3 and R4. */
  DeviceMetric = "DeviceMetric",
  /** The FHIR resource type defined in STU3 and R4. */
  DeviceRequest = "DeviceRequest",
  /** The FHIR resource type defined in STU3 and R4. */
  DeviceUseStatement = "DeviceUseStatement",
  /** The FHIR resource type defined in STU3 and R4. */
  DiagnosticReport = "DiagnosticReport",
  /** The FHIR resource type defined in STU3 and R4. */
  DocumentManifest = "DocumentManifest",
  /** The FHIR resource type defined in STU3 and R4. */
  DocumentReference = "DocumentReference",
  /** The FHIR resource type defined in STU3 and R4. */
  DomainResource = "DomainResource",
  /** The FHIR resource type defined in R4. */
  EffectEvidenceSynthesis = "EffectEvidenceSynthesis",
  /** The FHIR resource type defined in STU3. */
  EligibilityRequest = "EligibilityRequest",
  /** The FHIR resource type defined in STU3. */
  EligibilityResponse = "EligibilityResponse",
  /** The FHIR resource type defined in STU3 and R4. */
  Encounter = "Encounter",
  /** The FHIR resource type defined in STU3 and R4. */
  Endpoint = "Endpoint",
  /** The FHIR resource type defined in STU3 and R4. */
  EnrollmentRequest = "EnrollmentRequest",
  /** The FHIR resource type defined in STU3 and R4. */
  EnrollmentResponse = "EnrollmentResponse",
  /** The FHIR resource type defined in STU3 and R4. */
  EpisodeOfCare = "EpisodeOfCare",
  /** The FHIR resource type defined in R4. */
  EventDefinition = "EventDefinition",
  /** The FHIR resource type defined in R4. */
  Evidence = "Evidence",
  /** The FHIR resource type defined in R4. */
  EvidenceVariable = "EvidenceVariable",
  /** The FHIR resource type defined in R4. */
  ExampleScenario = "ExampleScenario",
  /** The FHIR resource type defined in STU3. */
  ExpansionProfile = "ExpansionProfile",
  /** The FHIR resource type defined in STU3 and R4. */
  ExplanationOfBenefit = "ExplanationOfBenefit",
  /** The FHIR resource type defined in STU3 and R4. */
  FamilyMemberHistory = "FamilyMemberHistory",
  /** The FHIR resource type defined in STU3 and R4. */
  Flag = "Flag",
  /** The FHIR resource type defined in STU3 and R4. */
  Goal = "Goal",
  /** The FHIR resource type defined in STU3 and R4. */
  GraphDefinition = "GraphDefinition",
  /** The FHIR resource type defined in STU3 and R4. */
  Group = "Group",
  /** The FHIR resource type defined in STU3 and R4. */
  GuidanceResponse = "GuidanceResponse",
  /** The FHIR resource type defined in STU3 and R4. */
  HealthcareService = "HealthcareService",
  /** The FHIR resource type defined in STU3. */
  ImagingManifest = "ImagingManifest",
  /** The FHIR resource type defined in STU3 and R4. */
  ImagingStudy = "ImagingStudy",
  /** The FHIR resource type defined in STU3 and R4. */
  Immunization = "Immunization",
  /** The FHIR resource type defined in R4. */
  ImmunizationEvaluation = "ImmunizationEvaluation",
  /** The FHIR resource type defined in STU3 and R4. */
  ImmunizationRecommendation = "ImmunizationRecommendation",
  /** The FHIR resource type defined in STU3 and R4. */
  ImplementationGuide = "ImplementationGuide",
  /** The FHIR resource type defined in R4. */
  InsurancePlan = "InsurancePlan",
  /** The FHIR resource type defined in R4. */
  Invoice = "Invoice",
  /** The FHIR resource type defined in STU3 and R4. */
  Library = "Library",
  /** The FHIR resource type defined in STU3 and R4. */
  Linkage = "Linkage",
  /** The FHIR resource type defined in STU3 and R4. */
  List = "List",
  /** The FHIR resource type defined in STU3 and R4. */
  Location = "Location",
  /** The FHIR resource type defined in STU3 and R4. */
  Measure = "Measure",
  /** The FHIR resource type defined in STU3 and R4. */
  MeasureReport = "MeasureReport",
  /** The FHIR resource type defined in STU3 and R4. */
  Media = "Media",
  /** The FHIR resource type defined in STU3 and R4. */
  Medication = "Medication",
  /** The FHIR resource type defined in STU3 and R4. */
  MedicationAdministration = "MedicationAdministration",
  /** The FHIR resource type defined in STU3 and R4. */
  MedicationDispense = "MedicationDispense",
  /** The FHIR resource type defined in R4. */
  MedicationKnowledge = "MedicationKnowledge",
  /** The FHIR resource type defined in STU3 and R4. */
  MedicationRequest = "MedicationRequest",
  /** The FHIR resource type defined in STU3 and R4. */
  MedicationStatement = "MedicationStatement",
  /** The FHIR resource type defined in R4. */
  MedicinalProduct = "MedicinalProduct",
  /** The FHIR resource type defined in R4. */
  MedicinalProductAuthorization = "MedicinalProductAuthorization",
  /** The FHIR resource type defined in R4. */
  MedicinalProductContraindication = "MedicinalProductContraindication",
  /** The FHIR resource type defined in R4. */
  MedicinalProductIndication = "MedicinalProductIndication",
  /** The FHIR resource type defined in R4. */
  MedicinalProductIngredient = "MedicinalProductIngredient",
  /** The FHIR resource type defined in R4. */
  MedicinalProductInteraction = "MedicinalProductInteraction",
  /** The FHIR resource type defined in R4. */
  MedicinalProductManufactured = "MedicinalProductManufactured",
  /** The FHIR resource type defined in R4. */
  MedicinalProductPackaged = "MedicinalProductPackaged",
  /** The FHIR resource type defined in R4. */
  MedicinalProductPharmaceutical = "MedicinalProductPharmaceutical",
  /** The FHIR resource type defined in R4. */
  MedicinalProductUndesirableEffect = "MedicinalProductUndesirableEffect",
  /** The FHIR resource type defined in STU3 and R4. */
  MessageDefinition = "MessageDefinition",
  /** The FHIR resource type defined in STU3 and R4. */
  MessageHeader = "MessageHeader",
  /** The FHIR resource type defined in R4. */
  MolecularSequence = "MolecularSequence",
  /** The FHIR resource type defined in STU3 and R4. */
  NamingSystem = "NamingSystem",
  /** The FHIR resource type defined in STU3 and R4. */
  NutritionOrder = "NutritionOrder",
  /** The FHIR resource type defined in STU3 and R4. */
  Observation = "Observation",
  /** The FHIR resource type defined in R4. */
  ObservationDefinition = "ObservationDefinition",
  /** The FHIR resource type defined in STU3 and R4. */
  OperationDefinition = "OperationDefinition",
  /** The FHIR resource type defined in STU3 and R4. */
  OperationOutcome = "OperationOutcome",
  /** The FHIR resource type defined in STU3 and R4. */
  Organization = "Organization",
  /** The FHIR resource type defined in R4. */
  OrganizationAffiliation = "OrganizationAffiliation",
  /** The FHIR resource type defined in STU3 and R4. */
  Parameters = "Parameters",
  /** The FHIR resource type defined in STU3 and R4. */
  Patient = "Patient",
  /** The FHIR resource type defined in STU3 and R4. */
  PaymentNotice = "PaymentNotice",
  /** The FHIR resource type defined in STU3 and R4. */
  PaymentReconciliation = "PaymentReconciliation",
  /** The FHIR resource type defined in STU3 and R4. */
  Person = "Person",
  /** The FHIR resource type defined in STU3 and R4. */
  PlanDefinition = "PlanDefinition",
  /** The FHIR resource type defined in STU3 and R4. */
  Practitioner = "Practitioner",
  /** The FHIR resource type defined in STU3 and R4. */
  PractitionerRole = "PractitionerRole",
  /** The FHIR resource type defined in STU3 and R4. */
  Procedure = "Procedure",
  /** The FHIR resource type defined in STU3. */
  ProcedureRequest = "ProcedureRequest",
  /** The FHIR resource type defined in STU3. */
  ProcessRequest = "ProcessRequest",
  /** The FHIR resource type defined in STU3. */
  ProcessResponse = "ProcessResponse",
  /** The FHIR resource type defined in STU3 and R4. */
  Provenance = "Provenance",
  /** The FHIR resource type defined in STU3 and R4. */
  Questionnaire = "Questionnaire",
  /** The FHIR resource type defined in STU3 and R4. */
  QuestionnaireResponse = "QuestionnaireResponse",
  /** The FHIR resource type defined in STU3. */
  ReferralRequest = "ReferralRequest",
  /** The FHIR resource type defined in STU3 and R4. */
  RelatedPerson = "RelatedPerson",
  /** The FHIR resource type defined in STU3 and R4. */
  RequestGroup = "RequestGroup",
  /** The FHIR resource type defined in R4. */
  ResearchDefinition = "ResearchDefinition",
  /** The FHIR resource type defined in R4. */
  ResearchElementDefinition = "ResearchElementDefinition",
  /** The FHIR resource type defined in STU3 and R4. */
  ResearchStudy = "ResearchStudy",
  /** The FHIR resource type defined in STU3 and R4. */
  ResearchSubject = "ResearchSubject",
  /** The FHIR resource type defined in STU3 and R4. */
  Resource = "Resource",
  /** The FHIR resource type defined in STU3 and R4. */
  RiskAssessment = "RiskAssessment",
  /** The FHIR resource type defined in R4. */
  RiskEvidenceSynthesis = "RiskEvidenceSynthesis",
  /** The FHIR resource type defined in STU3 and R4. */
  Schedule = "Schedule",
  /** The FHIR resource type defined in STU3 and R4. */
  SearchParameter = "SearchParameter",
  /** The FHIR resource type defined in STU3. */
  Sequence = "Sequence",
  /** The FHIR resource type defined in STU3. */
  ServiceDefinition = "ServiceDefinition",
  /** The FHIR resource type defined in R4. */
  ServiceRequest = "ServiceRequest",
  /** The FHIR resource type defined in STU3 and R4. */
  Slot = "Slot",
  /** The FHIR resource type defined in STU3 and R4. */
  Specimen = "Specimen",
  /** The FHIR resource type defined in R4. */
  SpecimenDefinition = "SpecimenDefinition",
  /** The FHIR resource type defined in STU3 and R4. */
  StructureDefinition = "StructureDefinition",
  /** The FHIR resource type defined in STU3 and R4. */
  StructureMap = "StructureMap",
  /** The FHIR resource type defined in STU3 and R4. */
  Subscription = "Subscription",
  /** The FHIR resource type defined in STU3 and R4. */
  Substance = "Substance",
  /** The FHIR resource type defined in R4. */
  SubstanceNucleicAcid = "SubstanceNucleicAcid",
  /** The FHIR resource type defined in R4. */
  SubstancePolymer = "SubstancePolymer",
  /** The FHIR resource type defined in R4. */
  SubstanceProtein = "SubstanceProtein",
  /** The FHIR resource type defined in R4. */
  SubstanceReferenceInformation = "SubstanceReferenceInformation",
  /** The FHIR resource type defined in R4. */
  SubstanceSourceMaterial = "SubstanceSourceMaterial",
  /** The FHIR resource type defined in R4. */
  SubstanceSpecification = "SubstanceSpecification",
  /** The FHIR resource type defined in STU3 and R4. */
  SupplyDelivery = "SupplyDelivery",
  /** The FHIR resource type defined in STU3 and R4. */
  SupplyRequest = "SupplyRequest",
  /** The FHIR resource type defined in STU3 and R4. */
  Task = "Task",
  /** The FHIR resource type defined in R4. */
  TerminologyCapabilities = "TerminologyCapabilities",
  /** The FHIR resource type defined in STU3 and R4. */
  TestReport = "TestReport",
  /** The FHIR resource type defined in STU3 and R4. */
  TestScript = "TestScript",
  /** The FHIR resource type defined in STU3 and R4. */
  ValueSet = "ValueSet",
  /** The FHIR resource type defined in R4. */
  VerificationResult = "VerificationResult",
  /** The FHIR resource type defined in STU3 and R4. */
  VisionPrescription = "VisionPrescription",
}

/** Known values of {@link AcsRouterUpdatedWorkerProperty} that the service accepts. */
export const enum KnownAcsRouterUpdatedWorkerProperty {
  AvailableForOffers = "AvailableForOffers",
  TotalCapacity = "TotalCapacity",
  QueueAssignments = "QueueAssignments",
  Labels = "Labels",
  Tags = "Tags",
  ChannelConfigurations = "ChannelConfigurations",
}

/** Known values of {@link CommunicationIdentifierModelKind} that the service accepts. */
export const enum KnownCommunicationIdentifierModelKind {
  Unknown = "unknown",
  CommunicationUser = "communicationUser",
  PhoneNumber = "phoneNumber",
  MicrosoftTeamsUser = "microsoftTeamsUser",
  MicrosoftTeamsApp = "microsoftTeamsApp",
}

/** Known values of {@link AcsMessageChannelKind} that the service accepts. */
export const enum KnownAcsMessageChannelKind {
  /** Updated message channel type is Whatsapp */
  Whatsapp = "whatsapp",
}

/** Known values of {@link AcsInteractiveReplyKind} that the service accepts. */
export const enum KnownAcsInteractiveReplyKind {
  /** Messaged interactive reply type is ButtonReply */
  ButtonReply = "buttonReply",
  /** Messaged interactive reply type is ListReply */
  ListReply = "listReply",
  /** Messaged interactive reply type is Unknown */
  Unknown = "unknown",
}

/** Known values of {@link AcsMessageDeliveryStatus} that the service accepts. */
export const enum KnownAcsMessageDeliveryStatus {
  Read = "read",
  Delivered = "delivered",
  Failed = "failed",
  Sent = "sent",
  Warning = "warning",
  Unknown = "unknown",
}

/**
 * Cloud Event Schema.
 */
export interface CloudEvent<T> {
  /**
   * Type of event related to the originating occurrence.
   */
  type: string;
  /**
   * Identifies the context in which an event happened. The combination of id and source must be unique for each distinct event.
   */
  source: string;
  /**
   * An identifier for the event. The combination of id and source must be unique for each distinct event.
   */
  id: string;
  /**
   * The time the event was generated.
   */
  time?: Date;
  /**
   * Identifies the schema that data adheres to.
   */
  dataSchema?: string;
  /**
   * Content type of data value.
   */
  dataContentType?: string;
  /**
   * Event data specific to the event type.
   */
  data?: T;
  /**
   * This describes the subject of the event in the context of the event producer (identified by source).
   */
  subject?: string;
  /**
   * Additional context attributes for the event. The Cloud Event specification refers to these as "extension attributes".
   */
  extensionAttributes?: Record<string, unknown>;
  /**
   * The version of the CloudEvents specification which the event uses.
   */
  specVersion?: string | "1.0";
}

/**
 * An event in the in the Event Grid Schema.
 */
export interface EventGridEvent<T> {
  /**
   * The type of the event.
   */
  eventType: string;
  /**
   * The time the event was generated.
   */
  eventTime: Date;
  /**
   * An unique identifier for the event.
   */
  id: string;
  /**
   * The resource path of the event source.
   */
  topic?: string;
  /**
   * A resource path relative to the topic path.
   */
  subject: string;
  /**
   * The schema version of the data object.
   */
  dataVersion: string;
  /**
   * Event data specific to the event type.
   */
  data: T;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.CertificateNewVersionCreated event. */
export interface KeyVaultCertificateNewVersionCreatedEventData {
  /** The id of the object that triggered this event. */
  id?: string;
  /** Key vault name of the object that triggered this event. */
  vaultName?: string;
  /** The type of the object that triggered this event */
  objectType?: string;
  /** The name of the object that triggered this event */
  objectName?: string;
  /** The version of the object that triggered this event */
  version?: string;
  /** Not before date of the object that triggered this event */
  nbf?: number;
  /** The expiration date of the object that triggered this event */
  exp?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.CertificateNearExpiry event. */
export interface KeyVaultCertificateNearExpiryEventData {
  /** The id of the object that triggered this event. */
  id?: string;
  /** Key vault name of the object that triggered this event. */
  vaultName?: string;
  /** The type of the object that triggered this event */
  objectType?: string;
  /** The name of the object that triggered this event */
  objectName?: string;
  /** The version of the object that triggered this event */
  version?: string;
  /** Not before date of the object that triggered this event */
  nbf?: number;
  /** The expiration date of the object that triggered this event */
  exp?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.CertificateExpired event. */
export interface KeyVaultCertificateExpiredEventData {
  /** The id of the object that triggered this event. */
  id?: string;
  /** Key vault name of the object that triggered this event. */
  vaultName?: string;
  /** The type of the object that triggered this event */
  objectType?: string;
  /** The name of the object that triggered this event */
  objectName?: string;
  /** The version of the object that triggered this event */
  version?: string;
  /** Not before date of the object that triggered this event */
  nbf?: number;
  /** The expiration date of the object that triggered this event */
  exp?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.KeyNewVersionCreated event. */
export interface KeyVaultKeyNewVersionCreatedEventData {
  /** The id of the object that triggered this event. */
  id?: string;
  /** Key vault name of the object that triggered this event. */
  vaultName?: string;
  /** The type of the object that triggered this event */
  objectType?: string;
  /** The name of the object that triggered this event */
  objectName?: string;
  /** The version of the object that triggered this event */
  version?: string;
  /** Not before date of the object that triggered this event */
  nbf?: number;
  /** The expiration date of the object that triggered this event */
  exp?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.KeyNearExpiry event. */
export interface KeyVaultKeyNearExpiryEventData {
  /** The id of the object that triggered this event. */
  id?: string;
  /** Key vault name of the object that triggered this event. */
  vaultName?: string;
  /** The type of the object that triggered this event */
  objectType?: string;
  /** The name of the object that triggered this event */
  objectName?: string;
  /** The version of the object that triggered this event */
  version?: string;
  /** Not before date of the object that triggered this event */
  nbf?: number;
  /** The expiration date of the object that triggered this event */
  exp?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.KeyExpired event. */
export interface KeyVaultKeyExpiredEventData {
  /** The id of the object that triggered this event. */
  id?: string;
  /** Key vault name of the object that triggered this event. */
  vaultName?: string;
  /** The type of the object that triggered this event */
  objectType?: string;
  /** The name of the object that triggered this event */
  objectName?: string;
  /** The version of the object that triggered this event */
  version?: string;
  /** Not before date of the object that triggered this event */
  nbf?: number;
  /** The expiration date of the object that triggered this event */
  exp?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.SecretNewVersionCreated event. */
export interface KeyVaultSecretNewVersionCreatedEventData {
  /** The id of the object that triggered this event. */
  id?: string;
  /** Key vault name of the object that triggered this event. */
  vaultName?: string;
  /** The type of the object that triggered this event */
  objectType?: string;
  /** The name of the object that triggered this event */
  objectName?: string;
  /** The version of the object that triggered this event */
  version?: string;
  /** Not before date of the object that triggered this event */
  nbf?: number;
  /** The expiration date of the object that triggered this event */
  exp?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.SecretNearExpiry event. */
export interface KeyVaultSecretNearExpiryEventData {
  /** The id of the object that triggered this event. */
  id?: string;
  /** Key vault name of the object that triggered this event. */
  vaultName?: string;
  /** The type of the object that triggered this event */
  objectType?: string;
  /** The name of the object that triggered this event */
  objectName?: string;
  /** The version of the object that triggered this event */
  version?: string;
  /** Not before date of the object that triggered this event */
  nbf?: number;
  /** The expiration date of the object that triggered this event */
  exp?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.VaultAccessPolicyChanged event. */
export interface KeyVaultAccessPolicyChangedEventData {
  /** The id of the object that triggered this event. */
  id?: string;
  /** Key vault name of the object that triggered this event. */
  vaultName?: string;
  /** The type of the object that triggered this event */
  objectType?: string;
  /** The name of the object that triggered this event */
  objectName?: string;
  /** The version of the object that triggered this event */
  version?: string;
  /** Not before date of the object that triggered this event */
  nbf?: number;
  /** The expiration date of the object that triggered this event */
  exp?: number;
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.SecretExpired event. */
export interface KeyVaultSecretExpiredEventData {
  /** The id of the object that triggered this event. */
  id?: string;
  /** Key vault name of the object that triggered this event. */
  vaultName?: string;
  /** The type of the object that triggered this event */
  objectType?: string;
  /** The name of the object that triggered this event */
  objectName?: string;
  /** The version of the object that triggered this event */
  version?: string;
  /** Not before date of the object that triggered this event */
  nbf?: number;
  /** The expiration date of the object that triggered this event */
  exp?: number;
}
