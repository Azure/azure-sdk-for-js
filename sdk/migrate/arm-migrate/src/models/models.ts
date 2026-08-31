// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface _OperationListResult {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** Details of a REST API operation, returned from the Resource Provider Operations API */
export interface Operation {
  /** The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action" */
  readonly name?: string;
  /** Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for Azure Resource Manager/control-plane operations. */
  readonly isDataAction?: boolean;
  /** Localized display information for this particular operation. */
  display?: OperationDisplay;
  /** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
  readonly origin?: Origin;
  /** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  readonly actionType?: ActionType;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    actionType: item["actionType"],
  };
}

/** Localized display information for an operation. */
export interface OperationDisplay {
  /** The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute". */
  readonly provider?: string;
  /** The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections". */
  readonly resource?: string;
  /** The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine". */
  readonly operation?: string;
  /** The short, localized friendly description of the operation; suitable for tool tips and detailed views. */
  readonly description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
export enum KnownOrigin {
  /** Indicates the operation is initiated by a user. */
  User = "user",
  /** Indicates the operation is initiated by a system. */
  System = "system",
  /** Indicates the operation is initiated by a user or system. */
  UserSystem = "user,system",
}

/**
 * The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" \
 * {@link KnownOrigin} can be used interchangeably with Origin,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **user**: Indicates the operation is initiated by a user. \
 * **system**: Indicates the operation is initiated by a system. \
 * **user,system**: Indicates the operation is initiated by a user or system.
 */
export type Origin = string;

/** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
export enum KnownActionType {
  /** Actions are for internal-only APIs. */
  Internal = "Internal",
}

/**
 * Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. \
 * {@link KnownActionType} can be used interchangeably with ActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Internal**: Actions are for internal-only APIs.
 */
export type ActionType = string;

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponse {
  /** The error object. */
  error?: ErrorDetail;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The error detail. */
export interface ErrorDetail {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: ErrorDetail[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDetailArrayDeserializer(result: Array<ErrorDetail>): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

export function errorAdditionalInfoArrayDeserializer(result: Array<ErrorAdditionalInfo>): any[] {
  return result.map((item) => {
    return errorAdditionalInfoDeserializer(item);
  });
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: any;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** Data model of Download URL for wave recommendation report. */
export interface GenerateWavePlanRequest {
  /** ARM Id of the assessment for which the wave plan report is to be generated. */
  assessmentArmId?: string;
  /** Optional. Specify the migration path for which the wave plan report is to be generated. If not specified, the default will be used */
  migrationPath?: string;
}

export function generateWavePlanRequestSerializer(item: GenerateWavePlanRequest): any {
  return { assessmentArmId: item["assessmentArmId"], migrationPath: item["migrationPath"] };
}

/** Data model of Download URL for wave recommendation report. */
export interface GenerateWavePlanResponse {
  /** The deterministic wave-plan resource name matching the persisted row's wavePlanName. */
  readonly wavePlanName: string;
  /** The provisioning state of the persisted wave-plan row. */
  readonly provisioningState: ProvisioningState;
  /** The plan source (SystemGenerated for all generated runs). */
  readonly planSource: PlanSource;
  /** The assessment ARM ID this plan was generated for. */
  readonly assessmentArmId: string;
  /** The canonical migration-path string this plan was generated for. */
  readonly migrationPath: string;
  /** The Artifact Store identity (artifactId, versionId) this run's files are committed under, used to resolve time-bound download access. */
  readonly artifactProperties: ArtifactProperties;
  /** The plan-level summary (number of waves, risk, confidence). */
  readonly summary?: WavePlanSummary;
}

export function generateWavePlanResponseDeserializer(item: any): GenerateWavePlanResponse {
  return {
    wavePlanName: item["wavePlanName"],
    provisioningState: item["provisioningState"],
    planSource: item["planSource"],
    assessmentArmId: item["assessmentArmId"],
    migrationPath: item["migrationPath"],
    artifactProperties: artifactPropertiesDeserializer(item["artifactProperties"]),
    summary: !item["summary"] ? item["summary"] : wavePlanSummaryDeserializer(item["summary"]),
  };
}

/** The status of the current operation. */
export enum KnownProvisioningState {
  /** Resource provisioning Successful. */
  Succeeded = "Succeeded",
  /** Resource provisioning Failed. */
  Failed = "Failed",
  /** Resource provisioning Canceled. */
  Canceled = "Canceled",
  /** Resource is being Provisioned. */
  Provisioning = "Provisioning",
  /** Resource is being Updated. */
  Updating = "Updating",
  /** Resource is being Deleted. */
  Deleting = "Deleting",
  /** Resource is being Accepted. */
  Accepted = "Accepted",
}

/**
 * The status of the current operation. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource provisioning Successful. \
 * **Failed**: Resource provisioning Failed. \
 * **Canceled**: Resource provisioning Canceled. \
 * **Provisioning**: Resource is being Provisioned. \
 * **Updating**: Resource is being Updated. \
 * **Deleting**: Resource is being Deleted. \
 * **Accepted**: Resource is being Accepted.
 */
export type ProvisioningState = string;

/** The source of a wave plan. */
export enum KnownPlanSource {
  /** Plan generated by the system. */
  SystemGenerated = "SystemGenerated",
  /** Plan imported by the user. */
  Imported = "Imported",
}

/**
 * The source of a wave plan. \
 * {@link KnownPlanSource} can be used interchangeably with PlanSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemGenerated**: Plan generated by the system. \
 * **Imported**: Plan imported by the user.
 */
export type PlanSource = string;

/** Artifact Store identity for a wave plan run. Consumers use the artifact ARM id and version id to reference or share the committed artifact and resolve time-bound download access. */
export interface ArtifactProperties {
  /** The ARM id of the Artifact Store artifact the run's files are committed under. */
  readonly artifactId: string;
  /** The Artifact Store version id for the run's committed files. */
  readonly versionId: string;
}

export function artifactPropertiesDeserializer(item: any): ArtifactProperties {
  return {
    artifactId: item["artifactId"],
    versionId: item["versionId"],
  };
}

/** Plan-level summary surfaced on the generateWavePlan and getWavePlans responses. */
export interface WavePlanSummary {
  /** The total number of waves in the plan. */
  readonly numberOfWaves: number;
  /** The plan-level overall risk bucket (Low/Medium/High). */
  readonly risk: string;
  /** The plan-level overall confidence label (Low/Medium/High). */
  readonly confidence: string;
}

export function wavePlanSummaryDeserializer(item: any): WavePlanSummary {
  return {
    numberOfWaves: item["numberOfWaves"],
    risk: item["risk"],
    confidence: item["confidence"],
  };
}

/** Request body for refreshing migration entities and groups. */
export interface RefreshEntitiesRequest {
  /** List of migration entity ARM IDs to refresh. Each ID must be a fully qualified ARM resource ID belonging to the same subscription and resource group as the migrate project. */
  migrationEntityIds?: string[];
  /** List of migration entity group ARM IDs. All entities within these groups will be refreshed. Each ID must be a fully qualified ARM resource ID belonging to the same subscription and resource group as the migrate project. */
  migrationEntityGroupIds?: string[];
}

export function refreshEntitiesRequestSerializer(item: RefreshEntitiesRequest): any {
  return {
    migrationEntityIds: !item["migrationEntityIds"]
      ? item["migrationEntityIds"]
      : item["migrationEntityIds"].map((p: any) => {
          return p;
        }),
    migrationEntityGroupIds: !item["migrationEntityGroupIds"]
      ? item["migrationEntityGroupIds"]
      : item["migrationEntityGroupIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Response body for refresh migration entities operation. */
export interface RefreshEntitiesResponse {
  /** List of migration entity ARM IDs being refreshed. */
  readonly migrationEntityIds?: string[];
  /** List of migration entity group ARM IDs being refreshed. */
  readonly migrationEntityGroupIds?: string[];
}

export function refreshEntitiesResponseDeserializer(item: any): RefreshEntitiesResponse {
  return {
    migrationEntityIds: !item["migrationEntityIds"]
      ? item["migrationEntityIds"]
      : item["migrationEntityIds"].map((p: any) => {
          return p;
        }),
    migrationEntityGroupIds: !item["migrationEntityGroupIds"]
      ? item["migrationEntityGroupIds"]
      : item["migrationEntityGroupIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Request body for creating waves from a wave plan. */
export interface CreateWavesFromPlanRequest {
  /** The assessment ARM ID to capture migration preference, saving and scope. */
  assessmentArmId: string;
  /** The migration path preference. */
  migrationPath: string;
  /** The wave selection list. If null or empty, all waves from the wave plan will be included. */
  waveSelection?: WaveSelectionItem[];
}

export function createWavesFromPlanRequestSerializer(item: CreateWavesFromPlanRequest): any {
  return {
    assessmentArmId: item["assessmentArmId"],
    migrationPath: item["migrationPath"],
    waveSelection: !item["waveSelection"]
      ? item["waveSelection"]
      : waveSelectionItemArraySerializer(item["waveSelection"]),
  };
}

export function waveSelectionItemArraySerializer(result: Array<WaveSelectionItem>): any[] {
  return result.map((item) => {
    return waveSelectionItemSerializer(item);
  });
}

/** A wave selection item with name and optional display name. */
export interface WaveSelectionItem {
  /** The ARM-compliant wave resource name used to create the wave. */
  waveName: string;
  /** Optional friendly name used during wave creation. */
  waveDisplayName?: string;
}

export function waveSelectionItemSerializer(item: WaveSelectionItem): any {
  return { waveName: item["waveName"], waveDisplayName: item["waveDisplayName"] };
}

/** Response for the create waves from plan operation. */
export interface CreateWavesFromPlanResponse {
  /** The total number of waves in the wave plan. */
  readonly totalWaves: number;
  /** The count of successfully created waves. */
  readonly succeededWaves: number;
  /** The count of failed wave creations. */
  readonly failedWaves: number;
  /** The count of skipped waves. */
  readonly skippedWaves: number;
  /** The read-only SAS URI for the exported error CSV. */
  readonly sasUri?: string;
  /** The expiry timestamp (UTC) for the error CSV SAS URI. */
  readonly expirationTime?: Date;
}

export function createWavesFromPlanResponseDeserializer(item: any): CreateWavesFromPlanResponse {
  return {
    totalWaves: item["totalWaves"],
    succeededWaves: item["succeededWaves"],
    failedWaves: item["failedWaves"],
    skippedWaves: item["skippedWaves"],
    sasUri: item["sasUri"],
    expirationTime: !item["expirationTime"]
      ? item["expirationTime"]
      : new Date(item["expirationTime"]),
  };
}

/** Request body for the getWavePlans listing action. */
export interface GetWavePlansRequest {
  /** The assessment ARM ID to scope the listing to. */
  assessmentArmId: string;
  /** The optional migration path filter. When omitted, plans across all migration paths are returned. */
  migrationPath?: string;
}

export function getWavePlansRequestSerializer(item: GetWavePlansRequest): any {
  return { assessmentArmId: item["assessmentArmId"], migrationPath: item["migrationPath"] };
}

/** Response payload for the getWavePlans listing action. */
export interface GetWavePlansResponse {
  /** The wave plan list items. Always present; empty when no plans match the filter. */
  value: WavePlanListItem[];
}

export function getWavePlansResponseDeserializer(item: any): GetWavePlansResponse {
  return {
    value: wavePlanListItemArrayDeserializer(item["value"]),
  };
}

export function wavePlanListItemArrayDeserializer(result: Array<WavePlanListItem>): any[] {
  return result.map((item) => {
    return wavePlanListItemDeserializer(item);
  });
}

/** A single wave-plan entry in the getWavePlans response. */
export interface WavePlanListItem {
  /** The wave-plan name. */
  readonly wavePlanName: string;
  /** The assessment ARM identifier the plan belongs to. */
  readonly assessmentArmId: string;
  /** The migration path the plan was generated for. */
  readonly migrationPath: string;
  /** The provisioning state of the plan. */
  readonly provisioningState: ProvisioningState;
  /** The source of the plan. */
  readonly planSource: PlanSource;
  /** The Artifact Store identity (artifactId, versionId) this plan's files are committed under, used to resolve time-bound download access. */
  readonly artifactProperties: ArtifactProperties;
  /** The plan-level summary (number of waves, risk, confidence). */
  readonly summary?: WavePlanSummary;
}

export function wavePlanListItemDeserializer(item: any): WavePlanListItem {
  return {
    wavePlanName: item["wavePlanName"],
    assessmentArmId: item["assessmentArmId"],
    migrationPath: item["migrationPath"],
    provisioningState: item["provisioningState"],
    planSource: item["planSource"],
    artifactProperties: artifactPropertiesDeserializer(item["artifactProperties"]),
    summary: !item["summary"] ? item["summary"] : wavePlanSummaryDeserializer(item["summary"]),
  };
}

/** Request body for the fetchSASUri action. */
export interface FetchSasUriRequest {
  /** The assessment ARM ID identifying the wave plan to amend. */
  assessmentArmId: string;
  /** The migration path identifying the wave plan to amend. */
  migrationPath: string;
  /** An optional caller-supplied SAS version ID folded into the deterministic staging blob name so concurrent upload sessions stage to distinct blobs. */
  sasVersionId?: string;
}

export function fetchSasUriRequestSerializer(item: FetchSasUriRequest): any {
  return {
    assessmentArmId: item["assessmentArmId"],
    migrationPath: item["migrationPath"],
    sasVersionId: item["sasVersionId"],
  };
}

/** Response payload for the fetchSASUri action. */
export interface FetchSasUriResponse {
  /** The write-targeted SAS URI to which the caller should PUT the CSV payload. */
  readonly sasUri: string;
  /** The UTC expiration timestamp of the returned SAS URI. */
  readonly expirationTime: Date;
}

export function fetchSasUriResponseDeserializer(item: any): FetchSasUriResponse {
  return {
    sasUri: item["sasUri"],
    expirationTime: new Date(item["expirationTime"]),
  };
}

/** Request body for the importWavePlan action. */
export interface ImportWavePlanRequest {
  /** The assessment ARM ID to scope the import to. */
  assessmentArmId: string;
  /** The migration path identifying the existing wave plan being amended. */
  migrationPath: string;
  /** An optional caller-supplied SAS version ID. Must match the value passed to fetchSASUri when the CSV was staged. */
  sasVersionId?: string;
}

export function importWavePlanRequestSerializer(item: ImportWavePlanRequest): any {
  return {
    assessmentArmId: item["assessmentArmId"],
    migrationPath: item["migrationPath"],
    sasVersionId: item["sasVersionId"],
  };
}

/** Response payload for the importWavePlan action. */
export interface ImportWavePlanResponse {
  /** The wave-plan name. */
  readonly wavePlanName: string;
  /** The assessment ARM identifier the plan belongs to. */
  readonly assessmentArmId: string;
  /** The migration path the plan was generated for. */
  readonly migrationPath: string;
  /** The provisioning state of the plan. */
  readonly provisioningState: ProvisioningState;
  /** The source of the plan. */
  readonly planSource: PlanSource;
  /** The Artifact Store identity (artifactId, versionId) this plan's files are committed under, used to resolve time-bound download access. */
  readonly artifactProperties: ArtifactProperties;
}

export function importWavePlanResponseDeserializer(item: any): ImportWavePlanResponse {
  return {
    wavePlanName: item["wavePlanName"],
    assessmentArmId: item["assessmentArmId"],
    migrationPath: item["migrationPath"],
    provisioningState: item["provisioningState"],
    planSource: item["planSource"],
    artifactProperties: artifactPropertiesDeserializer(item["artifactProperties"]),
  };
}

/** Migration Wave resource. */
export interface Wave extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: WaveProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function waveSerializer(item: Wave): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : wavePropertiesSerializer(item["properties"]),
  };
}

export function waveDeserializer(item: any): Wave {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : wavePropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** Migration Wave Properties class. */
export interface WaveProperties {
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
  /** Description of the wave. */
  description?: string;
  /** Display Name of the wave. */
  displayName: string;
  /** ARG query and other details to create workloads within a wave */
  arg: Arg;
  /** The status of the wave. */
  readonly status?: string;
  /** Planned start date of the wave. */
  plannedStartDate: Date;
  /** Planned completion date of the wave. */
  plannedCompletionDate?: Date;
  /** Actual start date of the wave. */
  readonly actualStartDate?: Date;
  /** The current stage of the wave. */
  readonly stage?: string;
}

export function wavePropertiesSerializer(item: WaveProperties): any {
  return {
    description: item["description"],
    displayName: item["displayName"],
    arg: argSerializer(item["arg"]),
    plannedStartDate: item["plannedStartDate"].toISOString(),
    plannedCompletionDate: !item["plannedCompletionDate"]
      ? item["plannedCompletionDate"]
      : item["plannedCompletionDate"].toISOString(),
  };
}

export function wavePropertiesDeserializer(item: any): WaveProperties {
  return {
    provisioningState: item["provisioningState"],
    description: item["description"],
    displayName: item["displayName"],
    arg: argDeserializer(item["arg"]),
    status: item["status"],
    plannedStartDate: new Date(item["plannedStartDate"]),
    plannedCompletionDate: !item["plannedCompletionDate"]
      ? item["plannedCompletionDate"]
      : new Date(item["plannedCompletionDate"]),
    actualStartDate: !item["actualStartDate"]
      ? item["actualStartDate"]
      : new Date(item["actualStartDate"]),
    stage: item["stage"],
  };
}

/** ARG query and other details to create workloads within a wave. */
export interface Arg {
  /** The query to create workloads within the wave. */
  query: string;
}

export function argSerializer(item: Arg): any {
  return { query: item["query"] };
}

export function argDeserializer(item: any): Arg {
  return {
    query: item["query"],
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(_item: ProxyResource): any {
  return {};
}

export function proxyResourceDeserializer(item: any): ProxyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Common fields that are returned in the response for all Azure Resource Manager resources */
export interface Resource {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
}

export function resourceSerializer(_item: Resource): any {
  return {};
}

export function resourceDeserializer(item: any): Resource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: CreatedByType;
  /** The timestamp of resource creation (UTC). */
  createdAt?: Date;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: CreatedByType;
  /** The timestamp of resource last modification (UTC) */
  lastModifiedAt?: Date;
}

export function systemDataDeserializer(item: any): SystemData {
  return {
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    lastModifiedBy: item["lastModifiedBy"],
    lastModifiedByType: item["lastModifiedByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
  };
}

/** The kind of entity that created the resource. */
export enum KnownCreatedByType {
  /** The entity was created by a user. */
  User = "User",
  /** The entity was created by an application. */
  Application = "Application",
  /** The entity was created by a managed identity. */
  ManagedIdentity = "ManagedIdentity",
  /** The entity was created by a key. */
  Key = "Key",
}

/**
 * The kind of entity that created the resource. \
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** The response of a Wave list operation. */
export interface _WaveListResult {
  /** The Wave items on this page */
  value: Wave[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _waveListResultDeserializer(item: any): _WaveListResult {
  return {
    value: waveArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function waveArraySerializer(result: Array<Wave>): any[] {
  return result.map((item) => {
    return waveSerializer(item);
  });
}

export function waveArrayDeserializer(result: Array<Wave>): any[] {
  return result.map((item) => {
    return waveDeserializer(item);
  });
}

/** Migration Entity resource. */
export interface MigrationEntity extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: MigrationEntityProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function migrationEntitySerializer(item: MigrationEntity): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : migrationEntityPropertiesSerializer(item["properties"]),
  };
}

export function migrationEntityDeserializer(item: any): MigrationEntity {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : migrationEntityPropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** Migration Entity Properties class. */
export interface MigrationEntityProperties {
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
  /** ARM Resource Identifier for the partner resource. */
  partnerResourceArmId?: string;
  /** target Azure Resource ARM Id. */
  targetAzureResourceArmId?: string;
  /** inventory resource id */
  associatedInventoryResourceId: string;
  /** Display Name of the Workload. */
  inventoryDisplayName: string;
  /** Associated Assessment Id */
  associatedAssessmentId?: string;
  /** associated Wave Id */
  associatedWaveId?: string;
  /** associated Migration Entity Group Id */
  associatedMigrationEntityGroupIds?: string[];
  /** Execution start date for Migration Entity. */
  readonly executionStartDate?: Date;
  /** Target of the Migration Entity. */
  target?: string;
  /** Strategy of Migration Entity. */
  readonly migrationStrategy?: Strategy;
  /** Execution Stage of Migration Entity. */
  readonly executionStage?: string;
  /** Execution Status of Migration Entity. */
  readonly executionStatus?: string;
  /** Execution Readiness of Migration Entity. */
  readonly executionReadiness?: string;
  /** Migration specific properties for the entity. */
  migrationSpecificProperties?: MigrationSpecificPropertiesBaseUnion;
  /** Migration Tool of the Migration Entity. */
  migrationTool?: string;
  /** Migration path */
  migrationPath?: string;
  /** Assessed Entity ARM Id */
  assessedEntityArmId?: string;
}

export function migrationEntityPropertiesSerializer(item: MigrationEntityProperties): any {
  return {
    partnerResourceArmId: item["partnerResourceArmId"],
    targetAzureResourceArmId: item["targetAzureResourceArmId"],
    associatedInventoryResourceId: item["associatedInventoryResourceId"],
    inventoryDisplayName: item["inventoryDisplayName"],
    associatedAssessmentId: item["associatedAssessmentId"],
    associatedWaveId: item["associatedWaveId"],
    associatedMigrationEntityGroupIds: !item["associatedMigrationEntityGroupIds"]
      ? item["associatedMigrationEntityGroupIds"]
      : item["associatedMigrationEntityGroupIds"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    migrationSpecificProperties: !item["migrationSpecificProperties"]
      ? item["migrationSpecificProperties"]
      : migrationSpecificPropertiesBaseUnionSerializer(item["migrationSpecificProperties"]),
    migrationTool: item["migrationTool"],
    migrationPath: item["migrationPath"],
    assessedEntityArmId: item["assessedEntityArmId"],
  };
}

export function migrationEntityPropertiesDeserializer(item: any): MigrationEntityProperties {
  return {
    provisioningState: item["provisioningState"],
    partnerResourceArmId: item["partnerResourceArmId"],
    targetAzureResourceArmId: item["targetAzureResourceArmId"],
    associatedInventoryResourceId: item["associatedInventoryResourceId"],
    inventoryDisplayName: item["inventoryDisplayName"],
    associatedAssessmentId: item["associatedAssessmentId"],
    associatedWaveId: item["associatedWaveId"],
    associatedMigrationEntityGroupIds: !item["associatedMigrationEntityGroupIds"]
      ? item["associatedMigrationEntityGroupIds"]
      : item["associatedMigrationEntityGroupIds"].map((p: any) => {
          return p;
        }),
    executionStartDate: !item["executionStartDate"]
      ? item["executionStartDate"]
      : new Date(item["executionStartDate"]),
    target: item["target"],
    migrationStrategy: item["migrationStrategy"],
    executionStage: item["executionStage"],
    executionStatus: item["executionStatus"],
    executionReadiness: item["executionReadiness"],
    migrationSpecificProperties: !item["migrationSpecificProperties"]
      ? item["migrationSpecificProperties"]
      : migrationSpecificPropertiesBaseUnionDeserializer(item["migrationSpecificProperties"]),
    migrationTool: item["migrationTool"],
    migrationPath: item["migrationPath"],
    assessedEntityArmId: item["assessedEntityArmId"],
  };
}

/** Strategy for migration to Azure */
export enum KnownStrategy {
  /** No specific strategy defined. */
  None = "None",
  /** Rehost: Also known as 'lift and shift', this strategy involves moving existing applications to Azure without modification. */
  Rehost = "Rehost",
  /** Refactor: Often referred to as 'lift, tinker, and shift', this involves making minor modifications to the application to take advantage of Azure's cloud capabilities. */
  Refactor = "Refactor",
  /** Rearchitect: This approach involves significant changes to the application's architecture to fully utilize cloud-native features and scalability of Azure. */
  Rearchitect = "Rearchitect",
  /** Rebuild: Involves completely redesigning and rewriting the application from scratch to be cloud-native, leveraging Azure's advanced services. */
  Rebuild = "Rebuild",
  /** Replace: This strategy involves discarding the existing application and replacing it with a new Azure solution or a SaaS platform. */
  Replace = "Replace",
  /** Retire: This strategy involves discarding the existing application and replacing it with a new Azure solution or a SaaS platform. */
  Retire = "Retire",
  /** Retain: Keeping certain applications in the current environment when they are not suitable for cloud migration or when the timing is not right. */
  Retain = "Retain",
  /** Replatform: This strategy involves making more substantial changes to the application. */
  Replatform = "Replatform",
}

/**
 * Strategy for migration to Azure \
 * {@link KnownStrategy} can be used interchangeably with Strategy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No specific strategy defined. \
 * **Rehost**: Rehost: Also known as 'lift and shift', this strategy involves moving existing applications to Azure without modification. \
 * **Refactor**: Refactor: Often referred to as 'lift, tinker, and shift', this involves making minor modifications to the application to take advantage of Azure's cloud capabilities. \
 * **Rearchitect**: Rearchitect: This approach involves significant changes to the application's architecture to fully utilize cloud-native features and scalability of Azure. \
 * **Rebuild**: Rebuild: Involves completely redesigning and rewriting the application from scratch to be cloud-native, leveraging Azure's advanced services. \
 * **Replace**: Replace: This strategy involves discarding the existing application and replacing it with a new Azure solution or a SaaS platform. \
 * **Retire**: Retire: This strategy involves discarding the existing application and replacing it with a new Azure solution or a SaaS platform. \
 * **Retain**: Retain: Keeping certain applications in the current environment when they are not suitable for cloud migration or when the timing is not right. \
 * **Replatform**: Replatform: This strategy involves making more substantial changes to the application.
 */
export type Strategy = string;

/** The base Migration Specific Properties model. */
export interface MigrationSpecificPropertiesBase {
  /** Discriminator for migration specific properties. */
  /** The discriminator possible values: ServerMigration */
  instanceType: MigrationSpecificPropertiesInstanceType;
}

export function migrationSpecificPropertiesBaseSerializer(
  item: MigrationSpecificPropertiesBase,
): any {
  return { instanceType: item["instanceType"] };
}

export function migrationSpecificPropertiesBaseDeserializer(
  item: any,
): MigrationSpecificPropertiesBase {
  return {
    instanceType: item["instanceType"],
  };
}

/** Alias for MigrationSpecificPropertiesBaseUnion */
export type MigrationSpecificPropertiesBaseUnion =
  ServerMigrationSpecificProperties | MigrationSpecificPropertiesBase;

export function migrationSpecificPropertiesBaseUnionSerializer(
  item: MigrationSpecificPropertiesBaseUnion,
): any {
  switch (item.instanceType) {
    case "ServerMigration":
      return serverMigrationSpecificPropertiesSerializer(item as ServerMigrationSpecificProperties);

    default:
      return migrationSpecificPropertiesBaseSerializer(item);
  }
}

export function migrationSpecificPropertiesBaseUnionDeserializer(
  item: any,
): MigrationSpecificPropertiesBaseUnion {
  switch (item["instanceType"]) {
    case "ServerMigration":
      return serverMigrationSpecificPropertiesDeserializer(
        item as ServerMigrationSpecificProperties,
      );

    default:
      return migrationSpecificPropertiesBaseDeserializer(item);
  }
}

/** Migration Specific Properties Instance Types. */
export enum KnownMigrationSpecificPropertiesInstanceType {
  /** ServerMigration */
  ServerMigration = "ServerMigration",
}

/**
 * Migration Specific Properties Instance Types. \
 * {@link KnownMigrationSpecificPropertiesInstanceType} can be used interchangeably with MigrationSpecificPropertiesInstanceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ServerMigration**
 */
export type MigrationSpecificPropertiesInstanceType = string;

/** Represents a Server Migration Specific properties base model. */
export interface ServerMigrationSpecificProperties extends MigrationSpecificPropertiesBase {
  /** Discriminator for migration specific properties. */
  instanceType: "ServerMigration";
  drApplianceInventoryId?: string;
  currentJobId?: string;
}

export function serverMigrationSpecificPropertiesSerializer(
  item: ServerMigrationSpecificProperties,
): any {
  return {
    instanceType: item["instanceType"],
    drApplianceInventoryId: item["drApplianceInventoryId"],
    currentJobId: item["currentJobId"],
  };
}

export function serverMigrationSpecificPropertiesDeserializer(
  item: any,
): ServerMigrationSpecificProperties {
  return {
    instanceType: item["instanceType"],
    drApplianceInventoryId: item["drApplianceInventoryId"],
    currentJobId: item["currentJobId"],
  };
}

/** The response of a MigrationEntity list operation. */
export interface _MigrationEntityListResult {
  /** The MigrationEntity items on this page */
  value: MigrationEntity[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _migrationEntityListResultDeserializer(item: any): _MigrationEntityListResult {
  return {
    value: migrationEntityArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function migrationEntityArraySerializer(result: Array<MigrationEntity>): any[] {
  return result.map((item) => {
    return migrationEntitySerializer(item);
  });
}

export function migrationEntityArrayDeserializer(result: Array<MigrationEntity>): any[] {
  return result.map((item) => {
    return migrationEntityDeserializer(item);
  });
}

/** Migration Entity Group resource. */
export interface MigrationEntityGroup extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: MigrationEntityGroupProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function migrationEntityGroupSerializer(item: MigrationEntityGroup): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : migrationEntityGroupPropertiesSerializer(item["properties"]),
  };
}

export function migrationEntityGroupDeserializer(item: any): MigrationEntityGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : migrationEntityGroupPropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** Migration Entity Group Properties class. */
export interface MigrationEntityGroupProperties {
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
  /** Application id */
  applicationId: string;
  /** Display Name of the Workload. */
  applicationDisplayName: string;
  /** Associated Assessment Id */
  associatedAssessmentId?: string;
  /** associated Wave Id */
  associatedWaveIds?: string[];
  /** Migration Entity Group Status */
  readonly executionStatus?: string;
  /** Execution Start Date */
  readonly executionStartDate?: Date;
  /** Migration path */
  migrationPath?: string;
}

export function migrationEntityGroupPropertiesSerializer(
  item: MigrationEntityGroupProperties,
): any {
  return {
    applicationId: item["applicationId"],
    applicationDisplayName: item["applicationDisplayName"],
    associatedAssessmentId: item["associatedAssessmentId"],
    associatedWaveIds: !item["associatedWaveIds"]
      ? item["associatedWaveIds"]
      : item["associatedWaveIds"].map((p: any) => {
          return p;
        }),
    migrationPath: item["migrationPath"],
  };
}

export function migrationEntityGroupPropertiesDeserializer(
  item: any,
): MigrationEntityGroupProperties {
  return {
    provisioningState: item["provisioningState"],
    applicationId: item["applicationId"],
    applicationDisplayName: item["applicationDisplayName"],
    associatedAssessmentId: item["associatedAssessmentId"],
    associatedWaveIds: !item["associatedWaveIds"]
      ? item["associatedWaveIds"]
      : item["associatedWaveIds"].map((p: any) => {
          return p;
        }),
    executionStatus: item["executionStatus"],
    executionStartDate: !item["executionStartDate"]
      ? item["executionStartDate"]
      : new Date(item["executionStartDate"]),
    migrationPath: item["migrationPath"],
  };
}

/** The response of a MigrationEntityGroup list operation. */
export interface _MigrationEntityGroupListResult {
  /** The MigrationEntityGroup items on this page */
  value: MigrationEntityGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _migrationEntityGroupListResultDeserializer(
  item: any,
): _MigrationEntityGroupListResult {
  return {
    value: migrationEntityGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function migrationEntityGroupArraySerializer(result: Array<MigrationEntityGroup>): any[] {
  return result.map((item) => {
    return migrationEntityGroupSerializer(item);
  });
}

export function migrationEntityGroupArrayDeserializer(result: Array<MigrationEntityGroup>): any[] {
  return result.map((item) => {
    return migrationEntityGroupDeserializer(item);
  });
}

/** Task resource for create operations. */
export interface TaskCreate extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: TaskPropertiesCreate;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function taskCreateSerializer(item: TaskCreate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : taskPropertiesCreateSerializer(item["properties"]),
  };
}

/** Task properties for create operations, omitting server-side read-only fields (taskType, isEditable, completionDate, provisioningState). */
export interface TaskPropertiesCreate {
  /** associated Wave Id */
  scopeId: string;
  /** Task Stage */
  stage?: string;
  /** Task Dislay Name */
  displayName: string;
  /** Task Status */
  status: string;
  /** Task Scope */
  scope: TaskScope;
  /** Task Description */
  description?: string;
}

export function taskPropertiesCreateSerializer(item: TaskPropertiesCreate): any {
  return {
    scopeId: item["scopeId"],
    stage: item["stage"],
    displayName: item["displayName"],
    status: item["status"],
    scope: item["scope"],
    description: item["description"],
  };
}

/** TaskScope can be either 'Wave' or 'MigrationEntity' or 'MigrationEntityGroup' */
export enum KnownTaskScope {
  /** Wave task - typically related to a specific wave of migration */
  Wave = "Wave",
  /** Migration Entity task - typically related to a specific migration entity */
  MigrationEntity = "MigrationEntity",
  /** Migration Entity Group task - typically related to a specific migration entity group */
  MigrationEntityGroup = "MigrationEntityGroup",
}

/**
 * TaskScope can be either 'Wave' or 'MigrationEntity' or 'MigrationEntityGroup' \
 * {@link KnownTaskScope} can be used interchangeably with TaskScope,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Wave**: Wave task - typically related to a specific wave of migration \
 * **MigrationEntity**: Migration Entity task - typically related to a specific migration entity \
 * **MigrationEntityGroup**: Migration Entity Group task - typically related to a specific migration entity group
 */
export type TaskScope = string;

/** Tasks resource. */
export interface Task extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: TaskProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function taskDeserializer(item: any): Task {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : taskPropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** Task Properties class. */
export interface TaskProperties {
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
  /** associated Wave Id */
  scopeId: string;
  /** Task Stage */
  stage?: string;
  /** Task Type */
  readonly taskType: TaskType;
  /** Task Dislay Name */
  displayName: string;
  /** Indicates whether the task is editable. */
  readonly isEditable: boolean;
  /** Task Status */
  status: string;
  /** Task Scope */
  scope: TaskScope;
  /** Task Description */
  description?: string;
  /** Task completion Date */
  readonly completionDate?: Date;
}

export function taskPropertiesDeserializer(item: any): TaskProperties {
  return {
    provisioningState: item["provisioningState"],
    scopeId: item["scopeId"],
    stage: item["stage"],
    taskType: item["taskType"],
    displayName: item["displayName"],
    isEditable: item["isEditable"],
    status: item["status"],
    scope: item["scope"],
    description: item["description"],
    completionDate: !item["completionDate"]
      ? item["completionDate"]
      : new Date(item["completionDate"]),
  };
}

/** TaskType can be either 'User' or 'System' */
export enum KnownTaskType {
  /** UserDefined task - typically initiated by a user */
  UserDefined = "UserDefined",
  /** SystemDefined task - typically initiated by the system */
  SystemDefined = "SystemDefined",
}

/**
 * TaskType can be either 'User' or 'System' \
 * {@link KnownTaskType} can be used interchangeably with TaskType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **UserDefined**: UserDefined task - typically initiated by a user \
 * **SystemDefined**: SystemDefined task - typically initiated by the system
 */
export type TaskType = string;

/** The response of a Task list operation. */
export interface _TaskListResult {
  /** The Task items on this page */
  value: Task[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _taskListResultDeserializer(item: any): _TaskListResult {
  return {
    value: taskArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function taskArrayDeserializer(result: Array<Task>): any[] {
  return result.map((item) => {
    return taskDeserializer(item);
  });
}

/** Task Summary Request model. */
export interface TaskSummaryRequest {
  /** Task Scope ARM Id */
  scopeId: string;
}

export function taskSummaryRequestSerializer(item: TaskSummaryRequest): any {
  return { scopeId: item["scopeId"] };
}

/** Task Summary Response model. */
export interface TaskSummaryResponse {
  /** List of Task Summary Items */
  items: TaskSummaryItem[];
}

export function taskSummaryResponseDeserializer(item: any): TaskSummaryResponse {
  return {
    items: taskSummaryItemArrayDeserializer(item["items"]),
  };
}

export function taskSummaryItemArrayDeserializer(result: Array<TaskSummaryItem>): any[] {
  return result.map((item) => {
    return taskSummaryItemDeserializer(item);
  });
}

/** Task Summary Item model. */
export interface TaskSummaryItem {
  /** Task Stage */
  stage: string;
  /** Aggregated status of tasks in this stage. */
  aggregatedStatus: string;
  /** Counts of tasks in this stage by status. */
  statusCounts: TaskStatusCounts;
  /** List of tasks in this stage. */
  tasks: Task[];
}

export function taskSummaryItemDeserializer(item: any): TaskSummaryItem {
  return {
    stage: item["stage"],
    aggregatedStatus: item["aggregatedStatus"],
    statusCounts: taskStatusCountsDeserializer(item["statusCounts"]),
    tasks: taskArrayDeserializer(item["tasks"]),
  };
}

/** Task Status Counts model. */
export interface TaskStatusCounts {
  /** Status counts dictionary mapping TaskStatus to the count of tasks with that status. */
  statusCounts: TaskStatusCountMap[];
}

export function taskStatusCountsDeserializer(item: any): TaskStatusCounts {
  return {
    statusCounts: taskStatusCountMapArrayDeserializer(item["statusCounts"]),
  };
}

export function taskStatusCountMapArrayDeserializer(result: Array<TaskStatusCountMap>): any[] {
  return result.map((item) => {
    return taskStatusCountMapDeserializer(item);
  });
}

/** Task status count mapping. */
export interface TaskStatusCountMap {
  /** The task status. */
  status: string;
  /** The count of tasks with this status. */
  count: number;
}

export function taskStatusCountMapDeserializer(item: any): TaskStatusCountMap {
  return {
    status: item["status"],
    count: item["count"],
  };
}

/** Common API Versions for Migrate Project Tracked Resource. */
export enum KnownApiVersions {
  /** 2025-03-30-preview API Version. */
  V20250330Preview = "2025-03-30-preview",
  /** 2025-12-01-preview API Version. */
  V20251201Preview = "2025-12-01-preview",
  /** 2026-02-01-preview API Version. */
  V20260201Preview = "2026-02-01-preview",
  /** 2026-06-01-preview API Version. */
  V20260601Preview = "2026-06-01-preview",
}
