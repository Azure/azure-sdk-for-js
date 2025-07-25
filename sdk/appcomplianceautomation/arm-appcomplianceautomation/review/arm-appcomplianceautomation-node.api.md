## API Report File for "@azure/arm-appcomplianceautomation"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import * as coreAuth from '@azure/core-auth';
import * as coreClient from '@azure/core-client';
import { OperationState } from '@azure/core-lro';
import { PagedAsyncIterableIterator } from '@azure/core-paging';
import { SimplePollerLike } from '@azure/core-lro';

// @public
export type ActionType = string;

// @public (undocumented)
export class AppComplianceAutomationToolForMicrosoft365 extends coreClient.ServiceClient {
    // (undocumented)
    $host: string;
    constructor(credentials: coreAuth.TokenCredential, options?: AppComplianceAutomationToolForMicrosoft365OptionalParams);
    // (undocumented)
    apiVersion: string;
    // (undocumented)
    evidence: Evidence;
    // (undocumented)
    operations: Operations;
    // (undocumented)
    providerActions: ProviderActions;
    // (undocumented)
    report: Report;
    // (undocumented)
    scopingConfiguration: ScopingConfiguration;
    // (undocumented)
    snapshot: Snapshot;
    // (undocumented)
    webhook: Webhook;
}

// @public
export interface AppComplianceAutomationToolForMicrosoft365OptionalParams extends coreClient.ServiceClientOptions {
    $host?: string;
    apiVersion?: string;
    endpoint?: string;
}

// @public
export interface Category {
    readonly categoryName?: string;
    readonly categoryStatus?: CategoryStatus;
    readonly controlFamilies?: ControlFamily[];
}

// @public
export type CategoryStatus = string;

// @public
export interface CertSyncRecord {
    certificationStatus?: string;
    controls?: ControlSyncRecord[];
    ingestionStatus?: string;
    offerGuid?: string;
}

// @public
export type CheckNameAvailabilityReason = string;

// @public
export interface CheckNameAvailabilityRequest {
    name?: string;
    type?: string;
}

// @public
export interface CheckNameAvailabilityResponse {
    message?: string;
    nameAvailable?: boolean;
    reason?: CheckNameAvailabilityReason;
}

// @public
export interface ComplianceReportItem {
    readonly categoryName?: string;
    readonly controlFamilyName?: string;
    readonly controlId?: string;
    readonly controlName?: string;
    readonly controlStatus?: ControlStatus;
    readonly resourceId?: string;
    readonly resourceOrigin?: ResourceOrigin;
    readonly resourceStatus?: ResourceStatus;
    readonly resourceStatusChangeDate?: Date;
    readonly resourceType?: string;
    readonly responsibilityDescription?: string;
    readonly responsibilityTitle?: string;
}

// @public
export interface ComplianceResult {
    readonly categories?: Category[];
    readonly complianceName?: string;
}

// @public
export type ContentType = string;

// @public
export interface Control {
    readonly controlDescription?: string;
    readonly controlDescriptionHyperLink?: string;
    readonly controlFullName?: string;
    readonly controlId?: string;
    readonly controlName?: string;
    readonly controlStatus?: ControlStatus;
    readonly responsibilities?: Responsibility[];
}

// @public
export interface ControlFamily {
    readonly controlFamilyName?: string;
    readonly controlFamilyStatus?: ControlFamilyStatus;
    readonly controls?: Control[];
}

// @public
export type ControlFamilyStatus = string;

// @public
export type ControlStatus = string;

// @public
export interface ControlSyncRecord {
    controlId?: string;
    controlStatus?: string;
}

// @public
export type CreatedByType = string;

// @public
export type DeliveryStatus = string;

// @public
export interface DownloadResponse {
    readonly complianceDetailedPdfReport?: DownloadResponseComplianceDetailedPdfReport;
    readonly compliancePdfReport?: DownloadResponseCompliancePdfReport;
    readonly complianceReport?: ComplianceReportItem[];
    readonly resourceList?: ResourceItem[];
}

// @public
export interface DownloadResponseComplianceDetailedPdfReport {
    readonly sasUri?: string;
}

// @public
export interface DownloadResponseCompliancePdfReport {
    readonly sasUri?: string;
}

// @public
export type DownloadType = string;

// @public
export type EnableSslVerification = string;

// @public
export interface ErrorAdditionalInfo {
    readonly info?: Record<string, unknown>;
    readonly type?: string;
}

// @public
export interface ErrorDetail {
    readonly additionalInfo?: ErrorAdditionalInfo[];
    readonly code?: string;
    readonly details?: ErrorDetail[];
    readonly message?: string;
    readonly target?: string;
}

// @public
export interface ErrorResponse {
    error?: ErrorDetail;
}

// @public
export interface Evidence {
    createOrUpdate(reportName: string, evidenceName: string, properties: EvidenceResource, options?: EvidenceCreateOrUpdateOptionalParams): Promise<EvidenceCreateOrUpdateResponse>;
    delete(reportName: string, evidenceName: string, options?: EvidenceDeleteOptionalParams): Promise<void>;
    download(reportName: string, evidenceName: string, body: EvidenceFileDownloadRequest, options?: EvidenceDownloadOptionalParams): Promise<EvidenceDownloadResponse>;
    get(reportName: string, evidenceName: string, options?: EvidenceGetOptionalParams): Promise<EvidenceGetResponse>;
    listByReport(reportName: string, options?: EvidenceListByReportOptionalParams): PagedAsyncIterableIterator<EvidenceResource>;
}

// @public
export interface EvidenceCreateOrUpdateOptionalParams extends coreClient.OperationOptions {
    offerGuid?: string;
    reportCreatorTenantId?: string;
}

// @public
export type EvidenceCreateOrUpdateResponse = EvidenceResource;

// @public
export interface EvidenceDeleteOptionalParams extends coreClient.OperationOptions {
}

// @public
export interface EvidenceDownloadOptionalParams extends coreClient.OperationOptions {
}

// @public
export type EvidenceDownloadResponse = EvidenceFileDownloadResponse;

// @public
export interface EvidenceFileDownloadRequest {
    offerGuid?: string;
    reportCreatorTenantId?: string;
}

// @public
export interface EvidenceFileDownloadResponse {
    readonly evidenceFile?: EvidenceFileDownloadResponseEvidenceFile;
}

// @public
export interface EvidenceFileDownloadResponseEvidenceFile {
    readonly url?: string;
}

// @public
export interface EvidenceGetOptionalParams extends coreClient.OperationOptions {
}

// @public
export type EvidenceGetResponse = EvidenceResource;

// @public
export interface EvidenceListByReportNextOptionalParams extends coreClient.OperationOptions {
}

// @public
export type EvidenceListByReportNextResponse = EvidenceResourceListResult;

// @public
export interface EvidenceListByReportOptionalParams extends coreClient.OperationOptions {
    filter?: string;
    offerGuid?: string;
    orderby?: string;
    reportCreatorTenantId?: string;
    select?: string;
    skipToken?: string;
    top?: number;
}

// @public
export type EvidenceListByReportResponse = EvidenceResourceListResult;

// @public
export interface EvidenceProperties {
    controlId?: string;
    evidenceType?: EvidenceType;
    extraData?: string;
    filePath: string;
    readonly provisioningState?: ProvisioningState;
    responsibilityId?: string;
}

// @public
export interface EvidenceResource extends ProxyResource {
    properties: EvidenceProperties;
}

// @public
export interface EvidenceResourceListResult {
    nextLink?: string;
    value: EvidenceResource[];
}

// @public
export type EvidenceType = string;

// @public
export interface GetCollectionCountRequest {
    type?: string;
}

// @public
export interface GetCollectionCountResponse {
    count?: number;
}

// @public
export function getContinuationToken(page: unknown): string | undefined;

// @public
export interface GetOverviewStatusRequest {
    type?: string;
}

// @public
export interface GetOverviewStatusResponse {
    statusList?: StatusItem[];
}

// @public
export type InputType = string;

// @public
export type IsRecommendSolution = string;

// @public
export enum KnownActionType {
    Internal = "Internal"
}

// @public
export enum KnownCategoryStatus {
    Failed = "Failed",
    NotApplicable = "NotApplicable",
    Passed = "Passed",
    PendingApproval = "PendingApproval"
}

// @public
export enum KnownCheckNameAvailabilityReason {
    AlreadyExists = "AlreadyExists",
    Invalid = "Invalid"
}

// @public
export enum KnownContentType {
    ApplicationJson = "application/json"
}

// @public
export enum KnownControlFamilyStatus {
    Failed = "Failed",
    NotApplicable = "NotApplicable",
    Passed = "Passed",
    PendingApproval = "PendingApproval"
}

// @public
export enum KnownControlStatus {
    Failed = "Failed",
    NotApplicable = "NotApplicable",
    Passed = "Passed",
    PendingApproval = "PendingApproval"
}

// @public
export enum KnownCreatedByType {
    Application = "Application",
    Key = "Key",
    ManagedIdentity = "ManagedIdentity",
    User = "User"
}

// @public
export enum KnownDeliveryStatus {
    Failed = "Failed",
    NotStarted = "NotStarted",
    Succeeded = "Succeeded"
}

// @public
export enum KnownDownloadType {
    ComplianceDetailedPdfReport = "ComplianceDetailedPdfReport",
    CompliancePdfReport = "CompliancePdfReport",
    ComplianceReport = "ComplianceReport",
    ResourceList = "ResourceList"
}

// @public
export enum KnownEnableSslVerification {
    False = "false",
    True = "true"
}

// @public
export enum KnownEvidenceType {
    AutoCollectedEvidence = "AutoCollectedEvidence",
    Data = "Data",
    File = "File"
}

// @public
export enum KnownInputType {
    Boolean = "Boolean",
    Date = "Date",
    Email = "Email",
    Group = "Group",
    MultilineText = "MultilineText",
    MultiSelectCheckbox = "MultiSelectCheckbox",
    MultiSelectDropdown = "MultiSelectDropdown",
    MultiSelectDropdownCustom = "MultiSelectDropdownCustom",
    None = "None",
    Number = "Number",
    SingleSelectDropdown = "SingleSelectDropdown",
    SingleSelection = "SingleSelection",
    Telephone = "Telephone",
    Text = "Text",
    Upload = "Upload",
    Url = "Url",
    YearPicker = "YearPicker",
    YesNoNa = "YesNoNa"
}

// @public
export enum KnownIsRecommendSolution {
    False = "false",
    True = "true"
}

// @public
export enum KnownNotificationEvent {
    AssessmentFailure = "assessment_failure",
    GenerateSnapshotFailed = "generate_snapshot_failed",
    GenerateSnapshotSuccess = "generate_snapshot_success",
    ReportConfigurationChanges = "report_configuration_changes",
    ReportDeletion = "report_deletion"
}

// @public
export enum KnownOrigin {
    System = "system",
    User = "user",
    UserSystem = "user,system"
}

// @public
export enum KnownProvisioningState {
    Canceled = "Canceled",
    Creating = "Creating",
    Deleting = "Deleting",
    Failed = "Failed",
    Fixing = "Fixing",
    Succeeded = "Succeeded",
    Updating = "Updating",
    Verifying = "Verifying"
}

// @public
export enum KnownReportStatus {
    Active = "Active",
    Disabled = "Disabled",
    Failed = "Failed",
    Reviewing = "Reviewing"
}

// @public
export enum KnownResourceOrigin {
    AWS = "AWS",
    Azure = "Azure",
    GCP = "GCP"
}

// @public
export enum KnownResourceStatus {
    Healthy = "Healthy",
    Unhealthy = "Unhealthy"
}

// @public
export enum KnownResponsibilityEnvironment {
    AWS = "AWS",
    Azure = "Azure",
    GCP = "GCP",
    General = "General"
}

// @public
export enum KnownResponsibilitySeverity {
    High = "High",
    Low = "Low",
    Medium = "Medium"
}

// @public
export enum KnownResponsibilityStatus {
    Failed = "Failed",
    NotApplicable = "NotApplicable",
    Passed = "Passed",
    PendingApproval = "PendingApproval"
}

// @public
export enum KnownResponsibilityType {
    Automated = "Automated",
    Manual = "Manual",
    ScopedManual = "ScopedManual"
}

// @public
export enum KnownResult {
    Failed = "Failed",
    Succeeded = "Succeeded"
}

// @public
export enum KnownRule {
    AzureApplication = "AzureApplication",
    CharLength = "CharLength",
    CreditCardPCI = "CreditCardPCI",
    Domains = "Domains",
    DynamicDropdown = "DynamicDropdown",
    PreventNonEnglishChar = "PreventNonEnglishChar",
    PublicSOX = "PublicSOX",
    PublisherVerification = "PublisherVerification",
    Required = "Required",
    Url = "Url",
    Urls = "Urls",
    USPrivacyShield = "USPrivacyShield",
    ValidEmail = "ValidEmail",
    ValidGuid = "ValidGuid"
}

// @public
export enum KnownSendAllEvents {
    False = "false",
    True = "true"
}

// @public
export enum KnownUpdateWebhookKey {
    False = "false",
    True = "true"
}

// @public
export enum KnownWebhookKeyEnabled {
    False = "false",
    True = "true"
}

// @public
export enum KnownWebhookStatus {
    Disabled = "Disabled",
    Enabled = "Enabled"
}

// @public
export interface ListInUseStorageAccountsRequest {
    subscriptionIds?: string[];
}

// @public
export interface ListInUseStorageAccountsResponse {
    storageAccountList?: StorageInfo[];
}

// @public
export type NotificationEvent = string;

// @public
export interface OnboardRequest {
    subscriptionIds: string[];
}

// @public
export interface OnboardResponse {
    subscriptionIds?: string[];
}

// @public
export interface Operation {
    readonly actionType?: ActionType;
    display?: OperationDisplay;
    readonly isDataAction?: boolean;
    readonly name?: string;
    readonly origin?: Origin;
}

// @public
export interface OperationDisplay {
    readonly description?: string;
    readonly operation?: string;
    readonly provider?: string;
    readonly resource?: string;
}

// @public
export interface OperationListResult {
    readonly nextLink?: string;
    readonly value?: Operation[];
}

// @public
export interface Operations {
    list(options?: OperationsListOptionalParams): PagedAsyncIterableIterator<Operation>;
}

// @public
export interface OperationsListNextOptionalParams extends coreClient.OperationOptions {
}

// @public
export type OperationsListNextResponse = OperationListResult;

// @public
export interface OperationsListOptionalParams extends coreClient.OperationOptions {
}

// @public
export type OperationsListResponse = OperationListResult;

// @public
export type Origin = string;

// @public
export interface OverviewStatus {
    readonly failedCount?: number;
    readonly manualCount?: number;
    readonly notApplicableCount?: number;
    readonly passedCount?: number;
    readonly pendingCount?: number;
}

// @public
export interface ProviderActions {
    beginOnboard(body: OnboardRequest, options?: ProviderActionsOnboardOptionalParams): Promise<SimplePollerLike<OperationState<ProviderActionsOnboardResponse>, ProviderActionsOnboardResponse>>;
    beginOnboardAndWait(body: OnboardRequest, options?: ProviderActionsOnboardOptionalParams): Promise<ProviderActionsOnboardResponse>;
    beginTriggerEvaluation(body: TriggerEvaluationRequest, options?: ProviderActionsTriggerEvaluationOptionalParams): Promise<SimplePollerLike<OperationState<ProviderActionsTriggerEvaluationResponse>, ProviderActionsTriggerEvaluationResponse>>;
    beginTriggerEvaluationAndWait(body: TriggerEvaluationRequest, options?: ProviderActionsTriggerEvaluationOptionalParams): Promise<ProviderActionsTriggerEvaluationResponse>;
    checkNameAvailability(body: CheckNameAvailabilityRequest, options?: ProviderActionsCheckNameAvailabilityOptionalParams): Promise<ProviderActionsCheckNameAvailabilityResponse>;
    getCollectionCount(body: GetCollectionCountRequest, options?: ProviderActionsGetCollectionCountOptionalParams): Promise<ProviderActionsGetCollectionCountResponse>;
    getOverviewStatus(body: GetOverviewStatusRequest, options?: ProviderActionsGetOverviewStatusOptionalParams): Promise<ProviderActionsGetOverviewStatusResponse>;
    listInUseStorageAccounts(body: ListInUseStorageAccountsRequest, options?: ProviderActionsListInUseStorageAccountsOptionalParams): Promise<ProviderActionsListInUseStorageAccountsResponse>;
}

// @public
export interface ProviderActionsCheckNameAvailabilityOptionalParams extends coreClient.OperationOptions {
}

// @public
export type ProviderActionsCheckNameAvailabilityResponse = CheckNameAvailabilityResponse;

// @public
export interface ProviderActionsGetCollectionCountOptionalParams extends coreClient.OperationOptions {
}

// @public
export type ProviderActionsGetCollectionCountResponse = GetCollectionCountResponse;

// @public
export interface ProviderActionsGetOverviewStatusOptionalParams extends coreClient.OperationOptions {
}

// @public
export type ProviderActionsGetOverviewStatusResponse = GetOverviewStatusResponse;

// @public
export interface ProviderActionsListInUseStorageAccountsOptionalParams extends coreClient.OperationOptions {
}

// @public
export type ProviderActionsListInUseStorageAccountsResponse = ListInUseStorageAccountsResponse;

// @public
export interface ProviderActionsOnboardHeaders {
    location?: string;
    retryAfter?: number;
}

// @public
export interface ProviderActionsOnboardOptionalParams extends coreClient.OperationOptions {
    resumeFrom?: string;
    updateIntervalInMs?: number;
}

// @public
export type ProviderActionsOnboardResponse = OnboardResponse;

// @public
export interface ProviderActionsTriggerEvaluationHeaders {
    location?: string;
    retryAfter?: number;
}

// @public
export interface ProviderActionsTriggerEvaluationOptionalParams extends coreClient.OperationOptions {
    resumeFrom?: string;
    updateIntervalInMs?: number;
}

// @public
export type ProviderActionsTriggerEvaluationResponse = TriggerEvaluationResponse;

// @public
export type ProvisioningState = string;

// @public
export interface ProxyResource extends Resource {
}

// @public
export interface QuickAssessment {
    readonly description?: string;
    readonly displayName?: string;
    readonly remediationLink?: string;
    readonly resourceId?: string;
    readonly resourceStatus?: ResourceStatus;
    readonly responsibilityId?: string;
    readonly timestamp?: Date;
}

// @public
export interface Recommendation {
    readonly recommendationId?: string;
    readonly recommendationShortName?: string;
    readonly recommendationSolutions?: RecommendationSolution[];
}

// @public
export interface RecommendationSolution {
    readonly isRecommendSolution?: IsRecommendSolution;
    readonly recommendationSolutionContent?: string;
    readonly recommendationSolutionIndex?: string;
}

// @public
export interface Report {
    beginCreateOrUpdate(reportName: string, properties: ReportResource, options?: ReportCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<ReportCreateOrUpdateResponse>, ReportCreateOrUpdateResponse>>;
    beginCreateOrUpdateAndWait(reportName: string, properties: ReportResource, options?: ReportCreateOrUpdateOptionalParams): Promise<ReportCreateOrUpdateResponse>;
    beginDelete(reportName: string, options?: ReportDeleteOptionalParams): Promise<SimplePollerLike<OperationState<ReportDeleteResponse>, ReportDeleteResponse>>;
    beginDeleteAndWait(reportName: string, options?: ReportDeleteOptionalParams): Promise<ReportDeleteResponse>;
    beginFix(reportName: string, options?: ReportFixOptionalParams): Promise<SimplePollerLike<OperationState<ReportFixResponse>, ReportFixResponse>>;
    beginFixAndWait(reportName: string, options?: ReportFixOptionalParams): Promise<ReportFixResponse>;
    beginSyncCertRecord(reportName: string, body: SyncCertRecordRequest, options?: ReportSyncCertRecordOptionalParams): Promise<SimplePollerLike<OperationState<ReportSyncCertRecordResponse>, ReportSyncCertRecordResponse>>;
    beginSyncCertRecordAndWait(reportName: string, body: SyncCertRecordRequest, options?: ReportSyncCertRecordOptionalParams): Promise<ReportSyncCertRecordResponse>;
    beginUpdate(reportName: string, properties: ReportResourcePatch, options?: ReportUpdateOptionalParams): Promise<SimplePollerLike<OperationState<ReportUpdateResponse>, ReportUpdateResponse>>;
    beginUpdateAndWait(reportName: string, properties: ReportResourcePatch, options?: ReportUpdateOptionalParams): Promise<ReportUpdateResponse>;
    beginVerify(reportName: string, options?: ReportVerifyOptionalParams): Promise<SimplePollerLike<OperationState<ReportVerifyResponse>, ReportVerifyResponse>>;
    beginVerifyAndWait(reportName: string, options?: ReportVerifyOptionalParams): Promise<ReportVerifyResponse>;
    get(reportName: string, options?: ReportGetOptionalParams): Promise<ReportGetResponse>;
    getScopingQuestions(reportName: string, options?: ReportGetScopingQuestionsOptionalParams): Promise<ReportGetScopingQuestionsResponse>;
    list(options?: ReportListOptionalParams): PagedAsyncIterableIterator<ReportResource>;
    nestedResourceCheckNameAvailability(reportName: string, body: CheckNameAvailabilityRequest, options?: ReportNestedResourceCheckNameAvailabilityOptionalParams): Promise<ReportNestedResourceCheckNameAvailabilityResponse>;
}

// @public
export interface ReportComplianceStatus {
    readonly m365?: OverviewStatus;
}

// @public
export interface ReportCreateOrUpdateHeaders {
    retryAfter?: number;
}

// @public
export interface ReportCreateOrUpdateOptionalParams extends coreClient.OperationOptions {
    resumeFrom?: string;
    updateIntervalInMs?: number;
}

// @public
export type ReportCreateOrUpdateResponse = ReportResource;

// @public
export interface ReportDeleteHeaders {
    location?: string;
    retryAfter?: number;
}

// @public
export interface ReportDeleteOptionalParams extends coreClient.OperationOptions {
    resumeFrom?: string;
    updateIntervalInMs?: number;
}

// @public
export type ReportDeleteResponse = ReportDeleteHeaders;

// @public
export interface ReportFixHeaders {
    location?: string;
    retryAfter?: number;
}

// @public
export interface ReportFixOptionalParams extends coreClient.OperationOptions {
    resumeFrom?: string;
    updateIntervalInMs?: number;
}

// @public
export type ReportFixResponse = ReportFixResult;

// @public
export interface ReportFixResult {
    readonly reason?: string;
    readonly result?: Result;
}

// @public
export interface ReportGetOptionalParams extends coreClient.OperationOptions {
}

// @public
export type ReportGetResponse = ReportResource;

// @public
export interface ReportGetScopingQuestionsOptionalParams extends coreClient.OperationOptions {
}

// @public
export type ReportGetScopingQuestionsResponse = ScopingQuestions;

// @public
export interface ReportListNextOptionalParams extends coreClient.OperationOptions {
}

// @public
export type ReportListNextResponse = ReportResourceListResult;

// @public
export interface ReportListOptionalParams extends coreClient.OperationOptions {
    filter?: string;
    offerGuid?: string;
    orderby?: string;
    reportCreatorTenantId?: string;
    select?: string;
    skipToken?: string;
    top?: number;
}

// @public
export type ReportListResponse = ReportResourceListResult;

// @public
export interface ReportNestedResourceCheckNameAvailabilityOptionalParams extends coreClient.OperationOptions {
}

// @public
export type ReportNestedResourceCheckNameAvailabilityResponse = CheckNameAvailabilityResponse;

// @public
export interface ReportPatchProperties {
    readonly certRecords?: CertSyncRecord[];
    readonly complianceStatus?: ReportComplianceStatus;
    readonly errors?: string[];
    readonly lastTriggerTime?: Date;
    readonly nextTriggerTime?: Date;
    offerGuid?: string;
    readonly provisioningState?: ProvisioningState;
    resources?: ResourceMetadata[];
    readonly status?: ReportStatus;
    storageInfo?: StorageInfo;
    readonly subscriptions?: string[];
    readonly tenantId?: string;
    timeZone?: string;
    triggerTime?: Date;
}

// @public
export interface ReportProperties {
    readonly certRecords?: CertSyncRecord[];
    readonly complianceStatus?: ReportComplianceStatus;
    readonly errors?: string[];
    readonly lastTriggerTime?: Date;
    readonly nextTriggerTime?: Date;
    offerGuid?: string;
    readonly provisioningState?: ProvisioningState;
    resources: ResourceMetadata[];
    readonly status?: ReportStatus;
    storageInfo?: StorageInfo;
    readonly subscriptions?: string[];
    readonly tenantId?: string;
    timeZone: string;
    triggerTime: Date;
}

// @public
export interface ReportResource extends ProxyResource {
    properties: ReportProperties;
}

// @public
export interface ReportResourceListResult {
    nextLink?: string;
    value: ReportResource[];
}

// @public
export interface ReportResourcePatch {
    properties?: ReportPatchProperties;
}

// @public
export type ReportStatus = string;

// @public
export interface ReportSyncCertRecordHeaders {
    location?: string;
    retryAfter?: number;
}

// @public
export interface ReportSyncCertRecordOptionalParams extends coreClient.OperationOptions {
    resumeFrom?: string;
    updateIntervalInMs?: number;
}

// @public
export type ReportSyncCertRecordResponse = SyncCertRecordResponse;

// @public
export interface ReportUpdateHeaders {
    location?: string;
    retryAfter?: number;
}

// @public
export interface ReportUpdateOptionalParams extends coreClient.OperationOptions {
    resumeFrom?: string;
    updateIntervalInMs?: number;
}

// @public
export type ReportUpdateResponse = ReportResource;

// @public
export interface ReportVerificationResult {
    readonly reason?: string;
    readonly result?: Result;
}

// @public
export interface ReportVerifyHeaders {
    location?: string;
    retryAfter?: number;
}

// @public
export interface ReportVerifyOptionalParams extends coreClient.OperationOptions {
    resumeFrom?: string;
    updateIntervalInMs?: number;
}

// @public
export type ReportVerifyResponse = ReportVerificationResult;

// @public
export interface Resource {
    readonly id?: string;
    readonly name?: string;
    readonly systemData?: SystemData;
    readonly type?: string;
}

// @public
export interface ResourceItem {
    readonly resourceGroup?: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
    readonly subscriptionId?: string;
}

// @public
export interface ResourceMetadata {
    accountId?: string;
    resourceId: string;
    resourceKind?: string;
    resourceOrigin?: ResourceOrigin;
    resourceType?: string;
}

// @public
export type ResourceOrigin = string;

// @public
export type ResourceStatus = string;

// @public
export interface Responsibility {
    evidenceFiles?: string[];
    failedResourceCount?: number;
    readonly guidance?: string;
    readonly justification?: string;
    readonly recommendationList?: Recommendation[];
    readonly resourceList?: ResponsibilityResource[];
    readonly responsibilityDescription?: string;
    readonly responsibilityEnvironment?: ResponsibilityEnvironment;
    readonly responsibilityId?: string;
    readonly responsibilitySeverity?: ResponsibilitySeverity;
    readonly responsibilityStatus?: ResponsibilityStatus;
    readonly responsibilityTitle?: string;
    readonly responsibilityType?: ResponsibilityType;
    totalResourceCount?: number;
}

// @public
export type ResponsibilityEnvironment = string;

// @public
export interface ResponsibilityResource {
    readonly accountId?: string;
    recommendationIds?: string[];
    readonly resourceId?: string;
    readonly resourceOrigin?: ResourceOrigin;
    readonly resourceStatus?: ResourceStatus;
    readonly resourceStatusChangeDate?: Date;
    readonly resourceType?: string;
}

// @public
export type ResponsibilitySeverity = string;

// @public
export type ResponsibilityStatus = string;

// @public
export type ResponsibilityType = string;

// @public
export type Result = string;

// @public
export type Rule = string;

// @public
export interface ScopingAnswer {
    answers: string[];
    questionId: string;
}

// @public
export interface ScopingConfiguration {
    createOrUpdate(reportName: string, scopingConfigurationName: string, properties: ScopingConfigurationResource, options?: ScopingConfigurationCreateOrUpdateOptionalParams): Promise<ScopingConfigurationCreateOrUpdateResponse>;
    delete(reportName: string, scopingConfigurationName: string, options?: ScopingConfigurationDeleteOptionalParams): Promise<void>;
    get(reportName: string, scopingConfigurationName: string, options?: ScopingConfigurationGetOptionalParams): Promise<ScopingConfigurationGetResponse>;
    list(reportName: string, options?: ScopingConfigurationListOptionalParams): PagedAsyncIterableIterator<ScopingConfigurationResource>;
}

// @public
export interface ScopingConfigurationCreateOrUpdateOptionalParams extends coreClient.OperationOptions {
}

// @public
export type ScopingConfigurationCreateOrUpdateResponse = ScopingConfigurationResource;

// @public
export interface ScopingConfigurationDeleteOptionalParams extends coreClient.OperationOptions {
}

// @public
export interface ScopingConfigurationGetOptionalParams extends coreClient.OperationOptions {
}

// @public
export type ScopingConfigurationGetResponse = ScopingConfigurationResource;

// @public
export interface ScopingConfigurationListNextOptionalParams extends coreClient.OperationOptions {
}

// @public
export type ScopingConfigurationListNextResponse = ScopingConfigurationResourceListResult;

// @public
export interface ScopingConfigurationListOptionalParams extends coreClient.OperationOptions {
}

// @public
export type ScopingConfigurationListResponse = ScopingConfigurationResourceListResult;

// @public
export interface ScopingConfigurationProperties {
    answers?: ScopingAnswer[];
    readonly provisioningState?: ProvisioningState;
}

// @public
export interface ScopingConfigurationResource extends ProxyResource {
    properties: ScopingConfigurationProperties;
}

// @public
export interface ScopingConfigurationResourceListResult {
    nextLink?: string;
    value: ScopingConfigurationResource[];
}

// @public
export interface ScopingQuestion {
    readonly inputType: InputType;
    readonly optionIds: string[];
    readonly questionId: string;
    readonly rules: Rule[];
    readonly showSubQuestionsValue?: string;
    readonly superiorQuestionId?: string;
}

// @public
export interface ScopingQuestions {
    questions?: ScopingQuestion[];
}

// @public
export type SendAllEvents = string;

// @public
export interface Snapshot {
    beginDownload(reportName: string, snapshotName: string, body: SnapshotDownloadRequest, options?: SnapshotDownloadOptionalParams): Promise<SimplePollerLike<OperationState<SnapshotDownloadResponse>, SnapshotDownloadResponse>>;
    beginDownloadAndWait(reportName: string, snapshotName: string, body: SnapshotDownloadRequest, options?: SnapshotDownloadOptionalParams): Promise<SnapshotDownloadResponse>;
    get(reportName: string, snapshotName: string, options?: SnapshotGetOptionalParams): Promise<SnapshotGetResponse>;
    list(reportName: string, options?: SnapshotListOptionalParams): PagedAsyncIterableIterator<SnapshotResource>;
}

// @public
export interface SnapshotDownloadHeaders {
    location?: string;
    retryAfter?: number;
}

// @public
export interface SnapshotDownloadOptionalParams extends coreClient.OperationOptions {
    resumeFrom?: string;
    updateIntervalInMs?: number;
}

// @public
export interface SnapshotDownloadRequest {
    downloadType: DownloadType;
    offerGuid?: string;
    reportCreatorTenantId?: string;
}

// @public
export type SnapshotDownloadResponse = DownloadResponse;

// @public
export interface SnapshotGetOptionalParams extends coreClient.OperationOptions {
}

// @public
export type SnapshotGetResponse = SnapshotResource;

// @public
export interface SnapshotListNextOptionalParams extends coreClient.OperationOptions {
}

// @public
export type SnapshotListNextResponse = SnapshotResourceListResult;

// @public
export interface SnapshotListOptionalParams extends coreClient.OperationOptions {
    filter?: string;
    offerGuid?: string;
    orderby?: string;
    reportCreatorTenantId?: string;
    select?: string;
    skipToken?: string;
    top?: number;
}

// @public
export type SnapshotListResponse = SnapshotResourceListResult;

// @public
export interface SnapshotProperties {
    readonly complianceResults?: ComplianceResult[];
    readonly createdAt?: Date;
    readonly provisioningState?: ProvisioningState;
    readonly reportProperties?: ReportProperties;
    readonly reportSystemData?: SystemData;
    readonly snapshotName?: string;
}

// @public
export interface SnapshotResource extends ProxyResource {
    properties?: SnapshotProperties;
}

// @public
export interface SnapshotResourceListResult {
    nextLink?: string;
    value: SnapshotResource[];
}

// @public
export interface StatusItem {
    statusName?: string;
    statusValue?: string;
}

// @public
export interface StorageInfo {
    accountName?: string;
    location?: string;
    resourceGroup?: string;
    subscriptionId?: string;
}

// @public
export interface SyncCertRecordRequest {
    certRecord: CertSyncRecord;
}

// @public
export interface SyncCertRecordResponse {
    certRecord?: CertSyncRecord;
}

// @public
export interface SystemData {
    createdAt?: Date;
    createdBy?: string;
    createdByType?: CreatedByType;
    lastModifiedAt?: Date;
    lastModifiedBy?: string;
    lastModifiedByType?: CreatedByType;
}

// @public
export interface TriggerEvaluationProperty {
    readonly evaluationEndTime?: Date;
    quickAssessments?: QuickAssessment[];
    resourceIds?: string[];
    readonly triggerTime?: Date;
}

// @public
export interface TriggerEvaluationRequest {
    resourceIds: string[];
}

// @public
export interface TriggerEvaluationResponse {
    properties?: TriggerEvaluationProperty;
}

// @public
export type UpdateWebhookKey = string;

// @public
export interface Webhook {
    createOrUpdate(reportName: string, webhookName: string, properties: WebhookResource, options?: WebhookCreateOrUpdateOptionalParams): Promise<WebhookCreateOrUpdateResponse>;
    delete(reportName: string, webhookName: string, options?: WebhookDeleteOptionalParams): Promise<void>;
    get(reportName: string, webhookName: string, options?: WebhookGetOptionalParams): Promise<WebhookGetResponse>;
    list(reportName: string, options?: WebhookListOptionalParams): PagedAsyncIterableIterator<WebhookResource>;
    update(reportName: string, webhookName: string, properties: WebhookResourcePatch, options?: WebhookUpdateOptionalParams): Promise<WebhookUpdateResponse>;
}

// @public
export interface WebhookCreateOrUpdateOptionalParams extends coreClient.OperationOptions {
}

// @public
export type WebhookCreateOrUpdateResponse = WebhookResource;

// @public
export interface WebhookDeleteOptionalParams extends coreClient.OperationOptions {
}

// @public
export interface WebhookGetOptionalParams extends coreClient.OperationOptions {
}

// @public
export type WebhookGetResponse = WebhookResource;

// @public
export type WebhookKeyEnabled = string;

// @public
export interface WebhookListNextOptionalParams extends coreClient.OperationOptions {
}

// @public
export type WebhookListNextResponse = WebhookResourceListResult;

// @public
export interface WebhookListOptionalParams extends coreClient.OperationOptions {
    filter?: string;
    offerGuid?: string;
    orderby?: string;
    reportCreatorTenantId?: string;
    select?: string;
    skipToken?: string;
    top?: number;
}

// @public
export type WebhookListResponse = WebhookResourceListResult;

// @public
export interface WebhookProperties {
    contentType?: ContentType;
    readonly deliveryStatus?: DeliveryStatus;
    enableSslVerification?: EnableSslVerification;
    events?: NotificationEvent[];
    payloadUrl?: string;
    readonly provisioningState?: ProvisioningState;
    sendAllEvents?: SendAllEvents;
    status?: WebhookStatus;
    readonly tenantId?: string;
    updateWebhookKey?: UpdateWebhookKey;
    readonly webhookId?: string;
    webhookKey?: string;
    readonly webhookKeyEnabled?: WebhookKeyEnabled;
}

// @public
export interface WebhookResource extends ProxyResource {
    properties: WebhookProperties;
}

// @public
export interface WebhookResourceListResult {
    nextLink?: string;
    value: WebhookResource[];
}

// @public
export interface WebhookResourcePatch {
    properties?: WebhookProperties;
}

// @public
export type WebhookStatus = string;

// @public
export interface WebhookUpdateOptionalParams extends coreClient.OperationOptions {
}

// @public
export type WebhookUpdateResponse = WebhookResource;

// (No @packageDocumentation comment for this package)

```
