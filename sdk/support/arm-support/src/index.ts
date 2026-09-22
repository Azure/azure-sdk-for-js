// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { MicrosoftSupport } from "./microsoftSupport.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  Service,
  ServiceProperties,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  ServiceClassificationRequest,
  ServiceClassificationOutput,
  ServiceClassificationAnswer,
  ClassificationService,
  ProblemClassificationsClassificationInput,
  ProblemClassificationsClassificationOutput,
  ProblemClassificationsClassificationResult,
  ProblemClassification,
  ProblemClassificationProperties,
  SecondaryConsentEnabled,
  CommunicationDetails,
  CommunicationDetailsProperties,
  CommunicationType,
  CommunicationDirection,
  CheckNameAvailabilityInput,
  Type,
  CheckNameAvailabilityOutput,
  SupportTicketDetails,
  SupportTicketDetailsProperties,
  SeverityLevel,
  Consent,
  ContactProfile,
  PreferredContactMethod,
  ServiceLevelAgreement,
  SupportEngineer,
  IsTemporaryTicket,
  TechnicalTicketDetails,
  QuotaTicketDetails,
  QuotaChangeRequest,
  SecondaryConsent,
  UserConsent,
  DirectConnectEscalation,
  EscalationStatus,
  UpdateSupportTicket,
  Status,
  UpdateContactProfile,
  LookUpResourceIdRequest,
  LookUpResourceIdResponse,
  ChatTranscriptDetails,
  ChatTranscriptDetailsProperties,
  MessageProperties,
  FileWorkspaceDetails,
  FileWorkspaceDetailsProperties,
  FileDetails,
  FileDetailsProperties,
  UploadFile,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownCreatedByType,
  KnownCommunicationType,
  KnownCommunicationDirection,
  KnownSeverityLevel,
  KnownConsent,
  KnownPreferredContactMethod,
  KnownIsTemporaryTicket,
  KnownUserConsent,
  KnownEscalationStatus,
  KnownStatus,
  KnownVersions,
} from "./models/index.js";
export type { MicrosoftSupportOptionalParams } from "./api/index.js";
export type {
  ChatTranscriptsListOptionalParams,
  ChatTranscriptsGetOptionalParams,
} from "./api/chatTranscripts/index.js";
export type {
  ChatTranscriptsNoSubscriptionListOptionalParams,
  ChatTranscriptsNoSubscriptionGetOptionalParams,
} from "./api/chatTranscriptsNoSubscription/index.js";
export type { ClassifyProblemsClassifyProblemsOptionalParams } from "./api/classifyProblems/index.js";
export type { ClassifyProblemsNoSubscriptionClassifyProblemsOptionalParams } from "./api/classifyProblemsNoSubscription/index.js";
export type { ClassifyServicesClassifyServicesOptionalParams } from "./api/classifyServices/index.js";
export type { ClassifyServicesNoSubscriptionClassifyServicesOptionalParams } from "./api/classifyServicesNoSubscription/index.js";
export type {
  CommunicationsCheckNameAvailabilityOptionalParams,
  CommunicationsListOptionalParams,
  CommunicationsCreateOptionalParams,
  CommunicationsGetOptionalParams,
} from "./api/communications/index.js";
export type {
  CommunicationsNoSubscriptionCheckNameAvailabilityOptionalParams,
  CommunicationsNoSubscriptionListOptionalParams,
  CommunicationsNoSubscriptionCreateOptionalParams,
  CommunicationsNoSubscriptionGetOptionalParams,
} from "./api/communicationsNoSubscription/index.js";
export type {
  FilesUploadOptionalParams,
  FilesListOptionalParams,
  FilesCreateOptionalParams,
  FilesGetOptionalParams,
} from "./api/files/index.js";
export type {
  FilesNoSubscriptionUploadOptionalParams,
  FilesNoSubscriptionListOptionalParams,
  FilesNoSubscriptionCreateOptionalParams,
  FilesNoSubscriptionGetOptionalParams,
} from "./api/filesNoSubscription/index.js";
export type {
  FileWorkspacesCreateOptionalParams,
  FileWorkspacesGetOptionalParams,
} from "./api/fileWorkspaces/index.js";
export type {
  FileWorkspacesNoSubscriptionCreateOptionalParams,
  FileWorkspacesNoSubscriptionGetOptionalParams,
} from "./api/fileWorkspacesNoSubscription/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  ProblemClassificationsListOptionalParams,
  ProblemClassificationsGetOptionalParams,
} from "./api/problemClassifications/index.js";
export type {
  ServicesListOptionalParams,
  ServicesGetOptionalParams,
} from "./api/services/index.js";
export type {
  SupportTicketsCheckNameAvailabilityOptionalParams,
  SupportTicketsLookUpResourceIdOptionalParams,
  SupportTicketsListOptionalParams,
  SupportTicketsUpdateOptionalParams,
  SupportTicketsCreateOptionalParams,
  SupportTicketsGetOptionalParams,
} from "./api/supportTickets/index.js";
export type {
  SupportTicketsNoSubscriptionCheckNameAvailabilityOptionalParams,
  SupportTicketsNoSubscriptionListOptionalParams,
  SupportTicketsNoSubscriptionUpdateOptionalParams,
  SupportTicketsNoSubscriptionCreateOptionalParams,
  SupportTicketsNoSubscriptionGetOptionalParams,
} from "./api/supportTicketsNoSubscription/index.js";
export type {
  ChatTranscriptsOperations,
  ChatTranscriptsNoSubscriptionOperations,
  ClassifyProblemsOperations,
  ClassifyProblemsNoSubscriptionOperations,
  ClassifyServicesOperations,
  ClassifyServicesNoSubscriptionOperations,
  CommunicationsOperations,
  CommunicationsNoSubscriptionOperations,
  FilesOperations,
  FilesNoSubscriptionOperations,
  FileWorkspacesOperations,
  FileWorkspacesNoSubscriptionOperations,
  OperationsOperations,
  ProblemClassificationsOperations,
  ServicesOperations,
  SupportTicketsOperations,
  SupportTicketsNoSubscriptionOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
