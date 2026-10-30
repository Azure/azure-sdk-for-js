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

/** The parameters used to request an Azure virtual machine size recommendation for an AI workload. */
export interface RecommendVmSkuRequest {
  /** Model identity, sizing inputs, and optional maximum model context length. */
  model?: RecommendVmSkuModel;
  /** Inference request concurrency and token shape assumptions. */
  workload?: RecommendVmSkuWorkload;
  /** Deployment scale and Azure virtual machine procurement option. */
  deployment?: RecommendVmSkuDeployment;
  /** Ranking preference and optional deployment-wide hourly cost limit. */
  optimization?: RecommendVmSkuOptimization;
  /** The Azure virtual machine candidate set. When supplied, only these virtual machine sizes are ranked. Entries must be non-blank and unique, compared case-insensitively. */
  targetVmSizes?: string[];
  /** The subscription-scoped lookups to include in the recommendation. */
  subscriptionOptions?: RecommendVmSkuSubscriptionOptions;
}

export function recommendVmSkuRequestSerializer(item: RecommendVmSkuRequest): any {
  return {
    model: !item["model"] ? item["model"] : recommendVmSkuModelSerializer(item["model"]),
    workload: !item["workload"]
      ? item["workload"]
      : recommendVmSkuWorkloadSerializer(item["workload"]),
    deployment: !item["deployment"]
      ? item["deployment"]
      : recommendVmSkuDeploymentSerializer(item["deployment"]),
    optimization: !item["optimization"]
      ? item["optimization"]
      : recommendVmSkuOptimizationSerializer(item["optimization"]),
    targetVmSizes: !item["targetVmSizes"]
      ? item["targetVmSizes"]
      : item["targetVmSizes"].map((p: any) => {
          return p;
        }),
    subscriptionOptions: !item["subscriptionOptions"]
      ? item["subscriptionOptions"]
      : recommendVmSkuSubscriptionOptionsSerializer(item["subscriptionOptions"]),
  };
}

/** Model inputs used for metadata resolution and memory sizing. */
export interface RecommendVmSkuModel {
  /** The Hugging Face model identifier, for example `meta-llama/Llama-3.1-70B-Instruct`. */
  huggingFaceModelId?: string;
  /** The logical total model parameter count, including all mixture-of-experts experts. May be supplied with or without a model identifier. */
  parameterCount?: number;
  /** The precision the model weights are served at. Matched case-insensitively. */
  weightPrecision?: WeightPrecision;
  /** The model layer count, used for architecture-aware key-value cache sizing. Supply all architecture fields together with a parameter count. */
  numLayers?: number;
  /** The model key-value head count, used for architecture-aware key-value cache sizing. Supply all architecture fields together with a parameter count. */
  numKeyValueHeads?: number;
  /** The attention head dimension, used for architecture-aware key-value cache sizing. Supply all architecture fields together with a parameter count. */
  headDim?: number;
  /** The maximum context length the model supports, in tokens. Used only as an upper bound for the sizing context length when Hugging Face metadata provides no usable maximum. */
  maxContextLength?: number;
}

export function recommendVmSkuModelSerializer(item: RecommendVmSkuModel): any {
  return {
    huggingFaceModelId: item["huggingFaceModelId"],
    parameterCount: item["parameterCount"],
    weightPrecision: item["weightPrecision"],
    numLayers: item["numLayers"],
    numKeyValueHeads: item["numKeyValueHeads"],
    headDim: item["headDim"],
    maxContextLength: item["maxContextLength"],
  };
}

/** The precision a model's weights are served at. */
export enum KnownWeightPrecision {
  /** 32-bit floating point. */
  FP32 = "FP32",
  /** 16-bit floating point. */
  FP16 = "FP16",
  /** 16-bit brain floating point. */
  BF16 = "BF16",
  /** 8-bit floating point. */
  FP8 = "FP8",
  /** 8-bit integer. */
  INT8 = "INT8",
  /** 4-bit integer. */
  INT4 = "INT4",
  /** 4-bit floating point. */
  FP4 = "FP4",
}

/**
 * The precision a model's weights are served at. \
 * {@link KnownWeightPrecision} can be used interchangeably with WeightPrecision,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **FP32**: 32-bit floating point. \
 * **FP16**: 16-bit floating point. \
 * **BF16**: 16-bit brain floating point. \
 * **FP8**: 8-bit floating point. \
 * **INT8**: 8-bit integer. \
 * **INT4**: 4-bit integer. \
 * **FP4**: 4-bit floating point.
 */
export type WeightPrecision = string;

/** Inference workload assumptions that affect memory sizing. */
export interface RecommendVmSkuWorkload {
  /** The maximum number of simultaneous inference requests handled by each deployment replica. */
  maxConcurrentRequestsPerReplica?: number;
  /** The prompt and output token budget used for key-value cache sizing. */
  tokenBudget?: RecommendVmSkuTokenBudget;
}

export function recommendVmSkuWorkloadSerializer(item: RecommendVmSkuWorkload): any {
  return {
    maxConcurrentRequestsPerReplica: item["maxConcurrentRequestsPerReplica"],
    tokenBudget: !item["tokenBudget"]
      ? item["tokenBudget"]
      : recommendVmSkuTokenBudgetSerializer(item["tokenBudget"]),
  };
}

/** The per-request token budget used to size the inference key-value cache. */
export interface RecommendVmSkuTokenBudget {
  /** The number of prompt, or input, tokens per inference request. Must be supplied together with `maxOutputTokens`, and the two must total from 1 through 131072. */
  promptTokens?: number;
  /** The maximum number of generated output tokens per inference request. Must be supplied together with `promptTokens`, and the two must total from 1 through 131072. */
  maxOutputTokens?: number;
}

export function recommendVmSkuTokenBudgetSerializer(item: RecommendVmSkuTokenBudget): any {
  return { promptTokens: item["promptTokens"], maxOutputTokens: item["maxOutputTokens"] };
}

/** Deployment scale and procurement inputs. */
export interface RecommendVmSkuDeployment {
  /** The number of deployment replicas used for cost, quota, and placement calculations. */
  replicaCount?: number;
  /** The Azure virtual machine procurement option. */
  procurementOption?: ProcurementOption;
}

export function recommendVmSkuDeploymentSerializer(item: RecommendVmSkuDeployment): any {
  return { replicaCount: item["replicaCount"], procurementOption: item["procurementOption"] };
}

/** The Azure virtual machine procurement option. */
export enum KnownProcurementOption {
  /** Use standard on-demand capacity. */
  OnDemand = "OnDemand",
  /** Use interruptible Spot capacity. */
  Spot = "Spot",
}

/**
 * The Azure virtual machine procurement option. \
 * {@link KnownProcurementOption} can be used interchangeably with ProcurementOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OnDemand**: Use standard on-demand capacity. \
 * **Spot**: Use interruptible Spot capacity.
 */
export type ProcurementOption = string;

/** Ranking preference and optional deployment-wide hourly cost limit. */
export interface RecommendVmSkuOptimization {
  /** The preference used to rank the recommended options. */
  rankingPreference?: RankingPreference;
  /** The deployment-wide hourly cost ceiling. */
  maxDeploymentCostPerHour?: RecommendVmSkuHourlyCost;
}

export function recommendVmSkuOptimizationSerializer(item: RecommendVmSkuOptimization): any {
  return {
    rankingPreference: item["rankingPreference"],
    maxDeploymentCostPerHour: !item["maxDeploymentCostPerHour"]
      ? item["maxDeploymentCostPerHour"]
      : recommendVmSkuHourlyCostSerializer(item["maxDeploymentCostPerHour"]),
  };
}

/** The preference used to rank the recommended options. */
export enum KnownRankingPreference {
  /** Rank the options by deployment cost. */
  Cost = "Cost",
  /** Rank the options by inference latency. */
  Latency = "Latency",
}

/**
 * The preference used to rank the recommended options. \
 * {@link KnownRankingPreference} can be used interchangeably with RankingPreference,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Cost**: Rank the options by deployment cost. \
 * **Latency**: Rank the options by inference latency.
 */
export type RankingPreference = string;

/** A currency-qualified deployment-wide hourly cost. */
export interface RecommendVmSkuHourlyCost {
  /** The maximum cost per hour for the whole deployment. Must be greater than zero when supplied. */
  amount?: number;
  /** The ISO 4217 currency code the amount is expressed in. The recommendation service currently supports `USD`. */
  currencyCode?: string;
}

export function recommendVmSkuHourlyCostSerializer(item: RecommendVmSkuHourlyCost): any {
  return { amount: item["amount"], currencyCode: item["currencyCode"] };
}

/** The subscription-scoped lookups to include in the recommendation. */
export interface RecommendVmSkuSubscriptionOptions {
  /** Whether to evaluate subscription quota for candidate virtual machine sizes. */
  includeQuota?: boolean;
  /** Whether to query placement scores for candidate virtual machine sizes with available quota. */
  includePlacement?: boolean;
  /** Whether to fetch subscription-scoped virtual machine pricing. */
  includePricing?: boolean;
}

export function recommendVmSkuSubscriptionOptionsSerializer(
  item: RecommendVmSkuSubscriptionOptions,
): any {
  return {
    includeQuota: item["includeQuota"],
    includePlacement: item["includePlacement"],
    includePricing: item["includePricing"],
  };
}

/** The recommended Azure virtual machine sizes for the workload, with the sizing calculation they were derived from. */
export interface RecommendVmSkuResponse {
  /** The recommended virtual machine size options, ordered from the best to the worst match. */
  options: RecommendVmSkuOption[];
  /** The resolved workload sizing shared by every option. */
  sizing: RecommendVmSkuSizing;
}

export function recommendVmSkuResponseDeserializer(item: any): RecommendVmSkuResponse {
  return {
    options: recommendVmSkuOptionArrayDeserializer(item["options"]),
    sizing: recommendVmSkuSizingDeserializer(item["sizing"]),
  };
}

export function recommendVmSkuOptionArrayDeserializer(result: Array<RecommendVmSkuOption>): any[] {
  return result.map((item) => {
    return recommendVmSkuOptionDeserializer(item);
  });
}

/** One ranked virtual machine size recommendation. */
export interface RecommendVmSkuOption {
  /** The Azure virtual machine size name, for example `Standard_NC24ads_A100_v4`. */
  vmSize: string;
  /** The rank of this option within the response, where 1 is the best match. */
  recommendationRank: number;
  /** How ready this option is to deploy. */
  readiness: RecommendVmSkuReadiness;
  /** The deployment topology for this option. */
  topology: RecommendVmSkuTopology;
  /** The deployment cost for this option. */
  cost: RecommendVmSkuCost;
  /** The subscription quota evidence for this option. Returned only when `subscriptionOptions.includeQuota` is set. */
  quota?: RecommendVmSkuQuota;
  /** The capacity placement evidence for this option. Returned only when `subscriptionOptions.includePlacement` is set. */
  placement?: RecommendVmSkuPlacement;
  /** Whether the Azure Machine Learning model catalog recommends this virtual machine size for the model. */
  azureMlRecommended?: boolean;
  /** The external benchmark evidence selected for this option. */
  benchmark?: RecommendVmSkuBenchmark;
  /** A URL to the Azure documentation page for this virtual machine size. */
  documentationUrl?: string;
  /** The advisory deployment throughput and per-request latency estimate for this option. */
  performanceEstimate?: RecommendVmSkuPerformanceEstimate;
}

export function recommendVmSkuOptionDeserializer(item: any): RecommendVmSkuOption {
  return {
    vmSize: item["vmSize"],
    recommendationRank: item["recommendationRank"],
    readiness: recommendVmSkuReadinessDeserializer(item["readiness"]),
    topology: recommendVmSkuTopologyDeserializer(item["topology"]),
    cost: recommendVmSkuCostDeserializer(item["cost"]),
    quota: !item["quota"] ? item["quota"] : recommendVmSkuQuotaDeserializer(item["quota"]),
    placement: !item["placement"]
      ? item["placement"]
      : recommendVmSkuPlacementDeserializer(item["placement"]),
    azureMlRecommended: item["azureMlRecommended"],
    benchmark: !item["benchmark"]
      ? item["benchmark"]
      : recommendVmSkuBenchmarkDeserializer(item["benchmark"]),
    documentationUrl: item["documentationUrl"],
    performanceEstimate: !item["performanceEstimate"]
      ? item["performanceEstimate"]
      : recommendVmSkuPerformanceEstimateDeserializer(item["performanceEstimate"]),
  };
}

/** How ready a recommended option is to deploy. */
export interface RecommendVmSkuReadiness {
  /** The current actionability of the recommendation. */
  status: ReadinessStatus;
  /** A human-readable explanation of the readiness status. */
  reason: string;
}

export function recommendVmSkuReadinessDeserializer(item: any): RecommendVmSkuReadiness {
  return {
    status: item["status"],
    reason: item["reason"],
  };
}

/** The current actionability of a recommended option. */
export enum KnownReadinessStatus {
  /** The option can be attempted without a known prerequisite action. */
  ReadyToAttempt = "ReadyToAttempt",
  /** The option requires a quota increase before deployment. */
  QuotaIncreaseRequired = "QuotaIncreaseRequired",
  /** The option requires an external verification before deployment. */
  VerificationRequired = "VerificationRequired",
  /** The option is not available to the subscription in the requested region. */
  Unavailable = "Unavailable",
}

/**
 * The current actionability of a recommended option. \
 * {@link KnownReadinessStatus} can be used interchangeably with ReadinessStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ReadyToAttempt**: The option can be attempted without a known prerequisite action. \
 * **QuotaIncreaseRequired**: The option requires a quota increase before deployment. \
 * **VerificationRequired**: The option requires an external verification before deployment. \
 * **Unavailable**: The option is not available to the subscription in the requested region.
 */
export type ReadinessStatus = string;

/** The deployment topology for one virtual machine size option. */
export interface RecommendVmSkuTopology {
  /** The estimated number of virtual machine nodes required for a single replica. */
  estimatedNodeCountPerReplica: number;
  /** The estimated total number of virtual machine nodes across all replicas. */
  estimatedTotalNodeCount: number;
  /** The accelerator hardware available in each virtual machine. */
  accelerator: RecommendVmSkuAccelerator;
}

export function recommendVmSkuTopologyDeserializer(item: any): RecommendVmSkuTopology {
  return {
    estimatedNodeCountPerReplica: item["estimatedNodeCountPerReplica"],
    estimatedTotalNodeCount: item["estimatedTotalNodeCount"],
    accelerator: recommendVmSkuAcceleratorDeserializer(item["accelerator"]),
  };
}

/** The accelerator hardware available in each virtual machine. */
export interface RecommendVmSkuAccelerator {
  /** The accelerator model name, for example `A100` or `H100`. */
  model: string;
  /** The number of accelerator devices in each virtual machine. */
  countPerVm: number;
  /** The memory capacity of a single accelerator device, in gibibytes. */
  memoryGiBPerAccelerator: number;
}

export function recommendVmSkuAcceleratorDeserializer(item: any): RecommendVmSkuAccelerator {
  return {
    model: item["model"],
    countPerVm: item["countPerVm"],
    memoryGiBPerAccelerator: item["memoryGiBPerAccelerator"],
  };
}

/** The deployment cost for one virtual machine size option. */
export interface RecommendVmSkuCost {
  /** The ISO 4217 currency code all amounts in this object are expressed in. */
  currencyCode: string;
  /** The price per hour for a single virtual machine, in the stated currency. */
  vmHourly: number;
  /** The price per hour for the whole deployment, in the stated currency. */
  deploymentHourly: number;
  /** The source the price was resolved from. */
  source: CostSource;
  /** The date and time the price was observed. */
  priceAsOf?: Date;
  /** The error that prevented subscription-scoped pricing from being resolved, if any. */
  error?: RecommendVmSkuStageError;
}

export function recommendVmSkuCostDeserializer(item: any): RecommendVmSkuCost {
  return {
    currencyCode: item["currencyCode"],
    vmHourly: item["vmHourly"],
    deploymentHourly: item["deploymentHourly"],
    source: item["source"],
    priceAsOf: !item["priceAsOf"] ? item["priceAsOf"] : new Date(item["priceAsOf"]),
    error: !item["error"] ? item["error"] : recommendVmSkuStageErrorDeserializer(item["error"]),
  };
}

/** The source a price was resolved from. */
export enum KnownCostSource {
  /** The price came from the public Azure retail catalog. */
  AzureRetail = "AzureRetail",
  /** The price came from the caller's Azure subscription. */
  AzureSubscription = "AzureSubscription",
  /** The price is fixed illustrative data for a contract preview. */
  StaticPreview = "StaticPreview",
}

/**
 * The source a price was resolved from. \
 * {@link KnownCostSource} can be used interchangeably with CostSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureRetail**: The price came from the public Azure retail catalog. \
 * **AzureSubscription**: The price came from the caller's Azure subscription. \
 * **StaticPreview**: The price is fixed illustrative data for a contract preview.
 */
export type CostSource = string;

/** An error from an optional subscription-scoped recommendation stage. */
export interface RecommendVmSkuStageError {
  /** The reason the stage did not complete. */
  code: StageErrorCode;
  /** A human-readable description of the error. */
  message: string;
}

export function recommendVmSkuStageErrorDeserializer(item: any): RecommendVmSkuStageError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** The reason an optional subscription-scoped stage did not complete. */
export enum KnownStageErrorCode {
  /** The stage exceeded its deadline. */
  TimedOut = "TimedOut",
  /** The stage was throttled. */
  Throttled = "Throttled",
  /** The service reached its active caller partition capacity. */
  PartitionCapacityExceeded = "PartitionCapacityExceeded",
  /** A downstream dependency call failed. */
  DependencyError = "DependencyError",
  /** Required downstream data was unavailable. */
  DataUnavailable = "DataUnavailable",
  /** The optional evaluation call budget was exhausted. */
  EvaluationBudgetExceeded = "EvaluationBudgetExceeded",
}

/**
 * The reason an optional subscription-scoped stage did not complete. \
 * {@link KnownStageErrorCode} can be used interchangeably with StageErrorCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TimedOut**: The stage exceeded its deadline. \
 * **Throttled**: The stage was throttled. \
 * **PartitionCapacityExceeded**: The service reached its active caller partition capacity. \
 * **DependencyError**: A downstream dependency call failed. \
 * **DataUnavailable**: Required downstream data was unavailable. \
 * **EvaluationBudgetExceeded**: The optional evaluation call budget was exhausted.
 */
export type StageErrorCode = string;

/** The subscription quota evidence for one virtual machine size option. */
export interface RecommendVmSkuQuota {
  /** Whether subscription quota is sufficient for the requested deployment. */
  status: QuotaStatus;
  /** A human-readable explanation of the quota status. */
  reason?: string;
  /** The error that prevented quota from being evaluated, if any. */
  error?: RecommendVmSkuStageError;
  /** The maximum number of replicas that can be deployed with the available quota. */
  maxAvailableReplicaCount?: number;
  /** The quota increase required before this option can be deployed. */
  increase?: RecommendVmSkuQuotaIncrease;
}

export function recommendVmSkuQuotaDeserializer(item: any): RecommendVmSkuQuota {
  return {
    status: item["status"],
    reason: item["reason"],
    error: !item["error"] ? item["error"] : recommendVmSkuStageErrorDeserializer(item["error"]),
    maxAvailableReplicaCount: item["maxAvailableReplicaCount"],
    increase: !item["increase"]
      ? item["increase"]
      : recommendVmSkuQuotaIncreaseDeserializer(item["increase"]),
  };
}

/** Whether subscription quota is sufficient for a requested deployment. */
export enum KnownQuotaStatus {
  /** Quota is sufficient for the requested replicas. */
  Available = "Available",
  /** Quota is insufficient for the requested replicas. */
  Unavailable = "Unavailable",
  /** Quota could not be determined. */
  Unknown = "Unknown",
}

/**
 * Whether subscription quota is sufficient for a requested deployment. \
 * {@link KnownQuotaStatus} can be used interchangeably with QuotaStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Available**: Quota is sufficient for the requested replicas. \
 * **Unavailable**: Quota is insufficient for the requested replicas. \
 * **Unknown**: Quota could not be determined.
 */
export type QuotaStatus = string;

/** The quota limits to raise before retrying a deployment. */
export interface RecommendVmSkuQuotaIncrease {
  /** The individual quota limits that block the requested deployment. */
  limits: RecommendVmSkuQuotaLimit[];
  /** A URL to the Azure portal page for submitting the quota increase. */
  portalUrl: string;
}

export function recommendVmSkuQuotaIncreaseDeserializer(item: any): RecommendVmSkuQuotaIncrease {
  return {
    limits: recommendVmSkuQuotaLimitArrayDeserializer(item["limits"]),
    portalUrl: item["portalUrl"],
  };
}

export function recommendVmSkuQuotaLimitArrayDeserializer(
  result: Array<RecommendVmSkuQuotaLimit>,
): any[] {
  return result.map((item) => {
    return recommendVmSkuQuotaLimitDeserializer(item);
  });
}

/** One quota limit that blocks the requested deployment. */
export interface RecommendVmSkuQuotaLimit {
  /** The name of the quota to raise. */
  name: string;
  /** The current usage against the quota. */
  currentUsage: number;
  /** The current quota limit. */
  currentLimit: number;
  /** The quota limit required to deploy the workload. */
  requiredLimit: number;
}

export function recommendVmSkuQuotaLimitDeserializer(item: any): RecommendVmSkuQuotaLimit {
  return {
    name: item["name"],
    currentUsage: item["currentUsage"],
    currentLimit: item["currentLimit"],
    requiredLimit: item["requiredLimit"],
  };
}

/** The capacity placement evidence for one virtual machine size option. */
export interface RecommendVmSkuPlacement {
  /** The outcome of the placement query. */
  status: PlacementStatus;
  /** A human-readable explanation of the placement status. */
  reason?: string;
  /** The error that prevented placement from being evaluated, if any. */
  error?: RecommendVmSkuStageError;
  /** The availability zones recommended for the deployment, in preference order. */
  recommendedAvailabilityZones?: string[];
}

export function recommendVmSkuPlacementDeserializer(item: any): RecommendVmSkuPlacement {
  return {
    status: item["status"],
    reason: item["reason"],
    error: !item["error"] ? item["error"] : recommendVmSkuStageErrorDeserializer(item["error"]),
    recommendedAvailabilityZones: !item["recommendedAvailabilityZones"]
      ? item["recommendedAvailabilityZones"]
      : item["recommendedAvailabilityZones"].map((p: any) => {
          return p;
        }),
  };
}

/** The outcome of a capacity placement query. */
export enum KnownPlacementStatus {
  /** The placement check completed successfully. */
  Evaluated = "Evaluated",
  /** The placement check failed. */
  Failed = "Failed",
  /** The placement check was not run. */
  NotEvaluated = "NotEvaluated",
  /** The placement check is not supported for this option. */
  Unsupported = "Unsupported",
}

/**
 * The outcome of a capacity placement query. \
 * {@link KnownPlacementStatus} can be used interchangeably with PlacementStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Evaluated**: The placement check completed successfully. \
 * **Failed**: The placement check failed. \
 * **NotEvaluated**: The placement check was not run. \
 * **Unsupported**: The placement check is not supported for this option.
 */
export type PlacementStatus = string;

/** The external benchmark evidence selected for one virtual machine size option. */
export interface RecommendVmSkuBenchmark {
  /** How closely the benchmark evidence matches the recommended topology. */
  level: BenchmarkLevel;
  /** The model size class the benchmark covers, for example `70b`. */
  modelClass: string;
  /** The benchmark scenario, for example `Server` or `Offline`. */
  scenario: string;
  /** The number of submitters that published results for this configuration. */
  submitterCount: number;
  /** The identifier of the selected benchmark submission. */
  submissionId?: string;
  /** The model the benchmark was measured on. */
  benchmarkModel?: string;
  /** The organization that published the benchmark submission. */
  submitter?: string;
  /** The system the benchmark was measured on. */
  system?: string;
  /** The throughput observed in the benchmark submission. */
  throughput?: number;
  /** The unit the observed throughput is expressed in, for example `Tokens/s`. */
  throughputUnit?: string;
  /** The serving software the benchmark was measured with. */
  software?: string;
  /** The operating system the benchmark was measured on. */
  operatingSystem?: string;
  /** The weight data types used in the benchmark submission. */
  weightDataTypes?: string;
  /** The 99th-percentile time to first token observed in the benchmark, in milliseconds. */
  p99TtftMs?: number;
  /** The 99th-percentile time per output token observed in the benchmark, in milliseconds. */
  p99TpotMs?: number;
}

export function recommendVmSkuBenchmarkDeserializer(item: any): RecommendVmSkuBenchmark {
  return {
    level: item["level"],
    modelClass: item["modelClass"],
    scenario: item["scenario"],
    submitterCount: item["submitterCount"],
    submissionId: item["submissionId"],
    benchmarkModel: item["benchmarkModel"],
    submitter: item["submitter"],
    system: item["system"],
    throughput: item["throughput"],
    throughputUnit: item["throughputUnit"],
    software: item["software"],
    operatingSystem: item["operatingSystem"],
    weightDataTypes: item["weightDataTypes"],
    p99TtftMs: item["p99TtftMs"],
    p99TpotMs: item["p99TpotMs"],
  };
}

/** How closely benchmark evidence matches a recommended topology. */
export enum KnownBenchmarkLevel {
  /** The accelerator family has benchmark evidence at a different topology. */
  Benchmarked = "Benchmarked",
  /** The benchmark matches the recommended node and accelerator counts. */
  TopologyMatched = "TopologyMatched",
}

/**
 * How closely benchmark evidence matches a recommended topology. \
 * {@link KnownBenchmarkLevel} can be used interchangeably with BenchmarkLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Benchmarked**: The accelerator family has benchmark evidence at a different topology. \
 * **TopologyMatched**: The benchmark matches the recommended node and accelerator counts.
 */
export type BenchmarkLevel = string;

/** An advisory deployment throughput and per-request latency estimate. */
export interface RecommendVmSkuPerformanceEstimate {
  /** The estimated number of output tokens generated per second across the whole deployment. */
  deploymentOutputTokensPerSecond: number;
  /** The estimated time to first token for a single request, in milliseconds. */
  ttftMs: number;
}

export function recommendVmSkuPerformanceEstimateDeserializer(
  item: any,
): RecommendVmSkuPerformanceEstimate {
  return {
    deploymentOutputTokensPerSecond: item["deploymentOutputTokensPerSecond"],
    ttftMs: item["ttftMs"],
  };
}

/** The resolved workload sizing shared by every recommended option. */
export interface RecommendVmSkuSizing {
  /** The resolved model identity and weight precision. */
  model: RecommendVmSkuSizingModel;
  /** The resolved per-replica workload inputs used for memory sizing. */
  workload: RecommendVmSkuSizingWorkload;
  /** The memory calculation shared by every returned option. */
  memory: RecommendVmSkuMemory;
  /** The sources used for the sizing calculation. */
  basis: RecommendVmSkuSizingBasis;
}

export function recommendVmSkuSizingDeserializer(item: any): RecommendVmSkuSizing {
  return {
    model: recommendVmSkuSizingModelDeserializer(item["model"]),
    workload: recommendVmSkuSizingWorkloadDeserializer(item["workload"]),
    memory: recommendVmSkuMemoryDeserializer(item["memory"]),
    basis: recommendVmSkuSizingBasisDeserializer(item["basis"]),
  };
}

/** The resolved model identity and weight precision. */
export interface RecommendVmSkuSizingModel {
  /** The logical total model parameter count used for sizing. */
  parameterCount: number;
  /** The precision the model weights were sized at. */
  weightPrecision: WeightPrecision;
  /** The Hugging Face model identifier the sizing metadata was resolved from. */
  huggingFaceModelId?: string;
}

export function recommendVmSkuSizingModelDeserializer(item: any): RecommendVmSkuSizingModel {
  return {
    parameterCount: item["parameterCount"],
    weightPrecision: item["weightPrecision"],
    huggingFaceModelId: item["huggingFaceModelId"],
  };
}

/** The resolved per-replica workload inputs used for memory sizing. */
export interface RecommendVmSkuSizingWorkload {
  /** The maximum number of simultaneous inference requests handled by each replica. */
  maxConcurrentRequestsPerReplica: number;
  /** The context length, in tokens, used to size the key-value cache: the sum of `promptTokens` and `maxOutputTokens` when a token budget is supplied, otherwise the service default. */
  contextLength: number;
}

export function recommendVmSkuSizingWorkloadDeserializer(item: any): RecommendVmSkuSizingWorkload {
  return {
    maxConcurrentRequestsPerReplica: item["maxConcurrentRequestsPerReplica"],
    contextLength: item["contextLength"],
  };
}

/** The memory calculation shared by every returned option. */
export interface RecommendVmSkuMemory {
  /** The memory required for the model weights, in gibibytes. */
  modelWeightsGiB: number;
  /** The key-value cache memory required for a single concurrent request, in gibibytes. */
  kvCacheGiBPerRequest: number;
  /** The key-value cache memory required for all concurrent requests on a replica, in gibibytes. */
  kvCacheGiBTotal: number;
  /** The combined model-weight and key-value cache memory required per replica, in gibibytes. */
  modelAndKvCacheGiB: number;
}

export function recommendVmSkuMemoryDeserializer(item: any): RecommendVmSkuMemory {
  return {
    modelWeightsGiB: item["modelWeightsGiB"],
    kvCacheGiBPerRequest: item["kvCacheGiBPerRequest"],
    kvCacheGiBTotal: item["kvCacheGiBTotal"],
    modelAndKvCacheGiB: item["modelAndKvCacheGiB"],
  };
}

/** The sources used for the sizing calculation. */
export interface RecommendVmSkuSizingBasis {
  /** Where the model parameter count was resolved from. */
  parameterCountSource: ParameterCountSource;
  /** How the model weight memory was calculated. */
  modelWeightsCalculation: ModelWeightsCalculation;
  /** Where the context length was resolved from. */
  contextLengthSource: ContextLengthSource;
}

export function recommendVmSkuSizingBasisDeserializer(item: any): RecommendVmSkuSizingBasis {
  return {
    parameterCountSource: item["parameterCountSource"],
    modelWeightsCalculation: item["modelWeightsCalculation"],
    contextLengthSource: item["contextLengthSource"],
  };
}

/** Where a model parameter count was resolved from. */
export enum KnownParameterCountSource {
  /** The parameter count was supplied in the request. */
  Request = "Request",
  /** The parameter count was resolved from Hugging Face metadata. */
  HuggingFace = "HuggingFace",
}

/**
 * Where a model parameter count was resolved from. \
 * {@link KnownParameterCountSource} can be used interchangeably with ParameterCountSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Request**: The parameter count was supplied in the request. \
 * **HuggingFace**: The parameter count was resolved from Hugging Face metadata.
 */
export type ParameterCountSource = string;

/** How model weight memory was calculated. */
export enum KnownModelWeightsCalculation {
  /** The memory was calculated from the published model artifact size. */
  ArtifactSize = "ArtifactSize",
  /** The memory was estimated from the model parameter count. */
  EstimatedFromParameterCount = "EstimatedFromParameterCount",
}

/**
 * How model weight memory was calculated. \
 * {@link KnownModelWeightsCalculation} can be used interchangeably with ModelWeightsCalculation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ArtifactSize**: The memory was calculated from the published model artifact size. \
 * **EstimatedFromParameterCount**: The memory was estimated from the model parameter count.
 */
export type ModelWeightsCalculation = string;

/** Where a context length was resolved from. */
export enum KnownContextLengthSource {
  /** The context length is the sum of the request's `workload.tokenBudget.promptTokens` and `maxOutputTokens`. */
  Request = "Request",
  /** No token budget was supplied, so the service default context length was used. */
  Default = "Default",
}

/**
 * Where a context length was resolved from. \
 * {@link KnownContextLengthSource} can be used interchangeably with ContextLengthSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Request**: The context length is the sum of the request's `workload.tokenBudget.promptTokens` and `maxOutputTokens`. \
 * **Default**: No token budget was supplied, so the service default context length was used.
 */
export type ContextLengthSource = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2026-06-01-preview API version. */
  V20260601Preview = "2026-06-01-preview",
}
