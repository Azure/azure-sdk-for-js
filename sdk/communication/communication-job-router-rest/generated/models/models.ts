// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Policy governing how jobs are distributed to workers */
export interface DistributionPolicy {
  /** The entity tag for this resource. */
  readonly etag: string;
  /** Id of a distribution policy. */
  readonly id: string;
  /** Friendly name of this policy. */
  name?: string;
  /** Number of seconds after which any offers created under this policy will be expired. */
  offerExpiresAfterSeconds?: number;
  /** Mode governing the specific distribution method. */
  mode?: DistributionModeUnion;
}

export function distributionPolicySerializer(item: DistributionPolicy): any {
  return {
    name: item["name"],
    offerExpiresAfterSeconds: item["offerExpiresAfterSeconds"],
    mode: !item["mode"] ? item["mode"] : distributionModeUnionSerializer(item["mode"]),
  };
}

export function distributionPolicyDeserializer(item: any): DistributionPolicy {
  return {
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    offerExpiresAfterSeconds: item["offerExpiresAfterSeconds"],
    mode: !item["mode"] ? item["mode"] : distributionModeUnionDeserializer(item["mode"]),
  };
}

/** Abstract base class for defining a distribution mode. */
export interface DistributionMode {
  /** Governs the minimum desired number of active concurrent offers a job can have. */
  minConcurrentOffers?: number;
  /** Governs the maximum number of active concurrent offers a job can have. */
  maxConcurrentOffers?: number;
  /** If set to true, then router will match workers to jobs even if they don't match label selectors. Warning: You may get workers that are not qualified for a job they are matched with if you set this variable to true. This flag is intended more for temporary usage. By default, set to false. */
  bypassSelectors?: boolean;
  /** The type discriminator describing a sub-type of DistributionMode. */
  /** The discriminator possible values: bestWorker, longestIdle, roundRobin */
  kind: DistributionModeKind;
}

export function distributionModeSerializer(item: DistributionMode): any {
  return {
    minConcurrentOffers: item["minConcurrentOffers"],
    maxConcurrentOffers: item["maxConcurrentOffers"],
    bypassSelectors: item["bypassSelectors"],
    kind: item["kind"],
  };
}

export function distributionModeDeserializer(item: any): DistributionMode {
  return {
    minConcurrentOffers: item["minConcurrentOffers"],
    maxConcurrentOffers: item["maxConcurrentOffers"],
    bypassSelectors: item["bypassSelectors"],
    kind: item["kind"],
  };
}

/** Alias for DistributionModeUnion */
export type DistributionModeUnion =
  | BestWorkerMode
  | LongestIdleMode
  | RoundRobinMode
  | DistributionMode;

export function distributionModeUnionSerializer(item: DistributionModeUnion): any {
  switch (item.kind) {
    case "bestWorker":
      return bestWorkerModeSerializer(item as BestWorkerMode);

    case "longestIdle":
      return longestIdleModeSerializer(item as LongestIdleMode);

    case "roundRobin":
      return roundRobinModeSerializer(item as RoundRobinMode);

    default:
      return distributionModeSerializer(item);
  }
}

export function distributionModeUnionDeserializer(item: any): DistributionModeUnion {
  switch (item["kind"]) {
    case "bestWorker":
      return bestWorkerModeDeserializer(item as BestWorkerMode);

    case "longestIdle":
      return longestIdleModeDeserializer(item as LongestIdleMode);

    case "roundRobin":
      return roundRobinModeDeserializer(item as RoundRobinMode);

    default:
      return distributionModeDeserializer(item);
  }
}

/** Discriminators for supported distribution mode types. */
export type DistributionModeKind = "bestWorker" | "longestIdle" | "roundRobin";

/** Jobs are distributed to the worker with the strongest abilities available. */
export interface BestWorkerMode extends DistributionMode {
  /** Define a scoring rule to use, when calculating a score to determine the best worker. If not set, will use a default scoring formula that uses the number of job labels that the worker labels match, as well as the number of label selectors the worker labels match and/or exceed using a logistic function (https://en.wikipedia.org/wiki/Logistic_function). */
  scoringRule?: RouterRuleUnion;
  /** Options to configure 'scoringRule'. If not set, default values are used. */
  scoringRuleOptions?: ScoringRuleOptions;
  /** The type discriminator describing a sub-type of Mode */
  kind: "bestWorker";
}

export function bestWorkerModeSerializer(item: BestWorkerMode): any {
  return {
    minConcurrentOffers: item["minConcurrentOffers"],
    maxConcurrentOffers: item["maxConcurrentOffers"],
    bypassSelectors: item["bypassSelectors"],
    kind: item["kind"],
    scoringRule: !item["scoringRule"]
      ? item["scoringRule"]
      : routerRuleUnionSerializer(item["scoringRule"]),
    scoringRuleOptions: !item["scoringRuleOptions"]
      ? item["scoringRuleOptions"]
      : scoringRuleOptionsSerializer(item["scoringRuleOptions"]),
  };
}

export function bestWorkerModeDeserializer(item: any): BestWorkerMode {
  return {
    minConcurrentOffers: item["minConcurrentOffers"],
    maxConcurrentOffers: item["maxConcurrentOffers"],
    bypassSelectors: item["bypassSelectors"],
    kind: item["kind"],
    scoringRule: !item["scoringRule"]
      ? item["scoringRule"]
      : routerRuleUnionDeserializer(item["scoringRule"]),
    scoringRuleOptions: !item["scoringRuleOptions"]
      ? item["scoringRuleOptions"]
      : scoringRuleOptionsDeserializer(item["scoringRuleOptions"]),
  };
}

/**
 * A rule of one of the following types:
 * StaticRule:  A rule providing static rules that always return the same result, regardless of input.
 * DirectMapRule:  A rule that return the same labels as the input labels.
 * ExpressionRule: A rule providing inline expression rules.
 * FunctionRule: A rule providing a binding to an HTTP Triggered Azure Function.
 * WebhookRule: A rule providing a binding to a webserver following OAuth2.0 authentication protocol.
 */
export interface RouterRule {
  /** The type discriminator describing a sub-type of RouterRule */
  /** The discriminator possible values: directMap, expression, function, static, webhook */
  kind: RouterRuleKind;
}

export function routerRuleSerializer(item: RouterRule): any {
  return { kind: item["kind"] };
}

export function routerRuleDeserializer(item: any): RouterRule {
  return {
    kind: item["kind"],
  };
}

/** Alias for RouterRuleUnion */
export type RouterRuleUnion =
  | DirectMapRouterRule
  | ExpressionRouterRule
  | FunctionRouterRule
  | StaticRouterRule
  | WebhookRouterRule
  | RouterRule;

export function routerRuleUnionSerializer(item: RouterRuleUnion): any {
  switch (item.kind) {
    case "directMap":
      return directMapRouterRuleSerializer(item as DirectMapRouterRule);

    case "expression":
      return expressionRouterRuleSerializer(item as ExpressionRouterRule);

    case "function":
      return functionRouterRuleSerializer(item as FunctionRouterRule);

    case "static":
      return staticRouterRuleSerializer(item as StaticRouterRule);

    case "webhook":
      return webhookRouterRuleSerializer(item as WebhookRouterRule);

    default:
      return routerRuleSerializer(item);
  }
}

export function routerRuleUnionDeserializer(item: any): RouterRuleUnion {
  switch (item["kind"]) {
    case "directMap":
      return directMapRouterRuleDeserializer(item as DirectMapRouterRule);

    case "expression":
      return expressionRouterRuleDeserializer(item as ExpressionRouterRule);

    case "function":
      return functionRouterRuleDeserializer(item as FunctionRouterRule);

    case "static":
      return staticRouterRuleDeserializer(item as StaticRouterRule);

    case "webhook":
      return webhookRouterRuleDeserializer(item as WebhookRouterRule);

    default:
      return routerRuleDeserializer(item);
  }
}

/** Discriminators for supported router rule types. */
export type RouterRuleKind = "directMap" | "expression" | "function" | "static" | "webhook";

/** A rule that return the same labels as the input labels. */
export interface DirectMapRouterRule extends RouterRule {
  /** The type discriminator describing a sub-type of Rule. */
  kind: "directMap";
}

export function directMapRouterRuleSerializer(item: DirectMapRouterRule): any {
  return { kind: item["kind"] };
}

export function directMapRouterRuleDeserializer(item: any): DirectMapRouterRule {
  return {
    kind: item["kind"],
  };
}

/** A rule providing inline expression rules. */
export interface ExpressionRouterRule extends RouterRule {
  /** The expression language to compile to and execute. */
  language?: ExpressionRouterRuleLanguage;
  /** An expression to evaluate. Should contain return statement with calculated values. */
  expression: string;
  /** The type discriminator describing a sub-type of Rule. */
  kind: "expression";
}

export function expressionRouterRuleSerializer(item: ExpressionRouterRule): any {
  return { kind: item["kind"], language: item["language"], expression: item["expression"] };
}

export function expressionRouterRuleDeserializer(item: any): ExpressionRouterRule {
  return {
    kind: item["kind"],
    language: item["language"],
    expression: item["expression"],
  };
}

/** Available expression languages that can be configured. */
export type ExpressionRouterRuleLanguage = "powerFx";

/** A rule providing a binding to an HTTP Triggered Azure Function. */
export interface FunctionRouterRule extends RouterRule {
  /** URL for Azure Function. */
  functionUri: string;
  /** Credentials used to access Azure function rule. */
  credential?: FunctionRouterRuleCredential;
  /** The type discriminator describing a sub-type of Rule. */
  kind: "function";
}

export function functionRouterRuleSerializer(item: FunctionRouterRule): any {
  return {
    kind: item["kind"],
    functionUri: item["functionUri"],
    credential: !item["credential"]
      ? item["credential"]
      : functionRouterRuleCredentialSerializer(item["credential"]),
  };
}

export function functionRouterRuleDeserializer(item: any): FunctionRouterRule {
  return {
    kind: item["kind"],
    functionUri: item["functionUri"],
    credential: !item["credential"]
      ? item["credential"]
      : functionRouterRuleCredentialDeserializer(item["credential"]),
  };
}

/** Credentials used to access Azure function rule. */
export interface FunctionRouterRuleCredential {
  /** Access key scoped to a particular function. */
  functionKey?: string;
  /** Access key scoped to a Azure Function app. This key grants access to all functions under the app. */
  appKey?: string;
  /** Client id, when AppKey is provided In context of Azure function, this is usually the name of the key. */
  clientId?: string;
}

export function functionRouterRuleCredentialSerializer(item: FunctionRouterRuleCredential): any {
  return { functionKey: item["functionKey"], appKey: item["appKey"], clientId: item["clientId"] };
}

export function functionRouterRuleCredentialDeserializer(item: any): FunctionRouterRuleCredential {
  return {
    functionKey: item["functionKey"],
    appKey: item["appKey"],
    clientId: item["clientId"],
  };
}

/** A rule providing static rules that always return the same result, regardless of input. */
export interface StaticRouterRule extends RouterRule {
  /** The static value this rule always returns. Values must be primitive values - number, string, boolean. */
  value?: any;
  /** The type discriminator describing a sub-type of Rule. */
  kind: "static";
}

export function staticRouterRuleSerializer(item: StaticRouterRule): any {
  return { kind: item["kind"], value: item["value"] };
}

export function staticRouterRuleDeserializer(item: any): StaticRouterRule {
  return {
    kind: item["kind"],
    value: item["value"],
  };
}

/** A rule providing a binding to an external web server. */
export interface WebhookRouterRule extends RouterRule {
  /** Uri for Authorization Server. */
  authorizationServerUri?: string;
  /** OAuth2.0 Credentials used to Contoso's Authorization server. Reference: https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/ */
  clientCredential?: OAuth2WebhookClientCredential;
  /** Uri for Contoso's Web Server. */
  webhookUri?: string;
  /** The type discriminator describing a sub-type of Rule. */
  kind: "webhook";
}

export function webhookRouterRuleSerializer(item: WebhookRouterRule): any {
  return {
    kind: item["kind"],
    authorizationServerUri: item["authorizationServerUri"],
    clientCredential: !item["clientCredential"]
      ? item["clientCredential"]
      : oAuth2WebhookClientCredentialSerializer(item["clientCredential"]),
    webhookUri: item["webhookUri"],
  };
}

export function webhookRouterRuleDeserializer(item: any): WebhookRouterRule {
  return {
    kind: item["kind"],
    authorizationServerUri: item["authorizationServerUri"],
    clientCredential: !item["clientCredential"]
      ? item["clientCredential"]
      : oAuth2WebhookClientCredentialDeserializer(item["clientCredential"]),
    webhookUri: item["webhookUri"],
  };
}

/** OAuth2.0 Credentials used to Contoso's Authorization server. Reference: https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/ */
export interface OAuth2WebhookClientCredential {
  /** ClientId for Contoso Authorization server. */
  clientId?: string;
  /** Client secret for Contoso Authorization server. */
  clientSecret?: string;
}

export function oAuth2WebhookClientCredentialSerializer(item: OAuth2WebhookClientCredential): any {
  return { clientId: item["clientId"], clientSecret: item["clientSecret"] };
}

export function oAuth2WebhookClientCredentialDeserializer(
  item: any,
): OAuth2WebhookClientCredential {
  return {
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
  };
}

/** Encapsulates all options that can be passed as parameters for scoring rule with BestWorkerMode. */
export interface ScoringRuleOptions {
  /** Set batch size when 'isBatchScoringEnabled' is set to true. Defaults to 20 if not configured. */
  batchSize?: number;
  /** List of extra parameters from a job that will be sent as part of the payload to scoring rule. If not set, a job's labels (sent in the payload as `job`) and a job's worker selectors (sent in the payload as `selectors`) are added to the payload of the scoring rule by default. Note: Worker labels are always sent with scoring payload. */
  scoringParameters?: ScoringRuleParameterSelector[];
  /** If set to true, will score workers in batches, and the parameter name of the worker labels will be sent as `workers`. By default, set to false and the parameter name for the worker labels will be sent as `worker`. Note: If enabled, use 'batchSize' to set batch size. */
  isBatchScoringEnabled?: boolean;
  /** If false, will sort scores by ascending order. By default, set to true. */
  descendingOrder?: boolean;
}

export function scoringRuleOptionsSerializer(item: ScoringRuleOptions): any {
  return {
    batchSize: item["batchSize"],
    scoringParameters: !item["scoringParameters"]
      ? item["scoringParameters"]
      : item["scoringParameters"].map((p: any) => {
          return p;
        }),
    isBatchScoringEnabled: item["isBatchScoringEnabled"],
    descendingOrder: item["descendingOrder"],
  };
}

export function scoringRuleOptionsDeserializer(item: any): ScoringRuleOptions {
  return {
    batchSize: item["batchSize"],
    scoringParameters: !item["scoringParameters"]
      ? item["scoringParameters"]
      : item["scoringParameters"].map((p: any) => {
          return p;
        }),
    isBatchScoringEnabled: item["isBatchScoringEnabled"],
    descendingOrder: item["descendingOrder"],
  };
}

/** Supported parameters for scoring workers used with BestWorkerMode. */
export type ScoringRuleParameterSelector = "jobLabels" | "workerSelectors";

/** Jobs are directed to the worker who has been idle longest. */
export interface LongestIdleMode extends DistributionMode {
  /** The type discriminator describing a sub-type of Mode. */
  kind: "longestIdle";
}

export function longestIdleModeSerializer(item: LongestIdleMode): any {
  return {
    minConcurrentOffers: item["minConcurrentOffers"],
    maxConcurrentOffers: item["maxConcurrentOffers"],
    bypassSelectors: item["bypassSelectors"],
    kind: item["kind"],
  };
}

export function longestIdleModeDeserializer(item: any): LongestIdleMode {
  return {
    minConcurrentOffers: item["minConcurrentOffers"],
    maxConcurrentOffers: item["maxConcurrentOffers"],
    bypassSelectors: item["bypassSelectors"],
    kind: item["kind"],
  };
}

/** Jobs are distributed in order to workers, starting with the worker that is after the last worker to receive a job. */
export interface RoundRobinMode extends DistributionMode {
  /** The type discriminator describing a sub-type of Mode. */
  kind: "roundRobin";
}

export function roundRobinModeSerializer(item: RoundRobinMode): any {
  return {
    minConcurrentOffers: item["minConcurrentOffers"],
    maxConcurrentOffers: item["maxConcurrentOffers"],
    bypassSelectors: item["bypassSelectors"],
    kind: item["kind"],
  };
}

export function roundRobinModeDeserializer(item: any): RoundRobinMode {
  return {
    minConcurrentOffers: item["minConcurrentOffers"],
    maxConcurrentOffers: item["maxConcurrentOffers"],
    bypassSelectors: item["bypassSelectors"],
    kind: item["kind"],
  };
}

/** Paged collection of DistributionPolicy items */
export interface _PagedDistributionPolicy {
  /** The DistributionPolicy items on this page */
  value: DistributionPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedDistributionPolicyDeserializer(item: any): _PagedDistributionPolicy {
  return {
    value: distributionPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function distributionPolicyArraySerializer(result: Array<DistributionPolicy>): any[] {
  return result.map((item) => {
    return distributionPolicySerializer(item);
  });
}

export function distributionPolicyArrayDeserializer(result: Array<DistributionPolicy>): any[] {
  return result.map((item) => {
    return distributionPolicyDeserializer(item);
  });
}

/** A container for the rules that govern how jobs are classified. */
export interface ClassificationPolicy {
  /** The entity tag for this resource. */
  readonly etag: string;
  /** Id of a classification policy. */
  readonly id: string;
  /** Friendly name of this policy. */
  name?: string;
  /** Id of a fallback queue to select if queue selector attachments doesn't find a match. */
  fallbackQueueId?: string;
  /** Queue selector attachments used to resolve a queue for a job. */
  queueSelectorAttachments?: QueueSelectorAttachmentUnion[];
  /** A rule to determine a priority score for a job. */
  prioritizationRule?: RouterRuleUnion;
  /** Worker selector attachments used to attach worker selectors to a job. */
  workerSelectorAttachments?: WorkerSelectorAttachmentUnion[];
}

export function classificationPolicySerializer(item: ClassificationPolicy): any {
  return {
    name: item["name"],
    fallbackQueueId: item["fallbackQueueId"],
    queueSelectorAttachments: !item["queueSelectorAttachments"]
      ? item["queueSelectorAttachments"]
      : queueSelectorAttachmentUnionArraySerializer(item["queueSelectorAttachments"]),
    prioritizationRule: !item["prioritizationRule"]
      ? item["prioritizationRule"]
      : routerRuleUnionSerializer(item["prioritizationRule"]),
    workerSelectorAttachments: !item["workerSelectorAttachments"]
      ? item["workerSelectorAttachments"]
      : workerSelectorAttachmentUnionArraySerializer(item["workerSelectorAttachments"]),
  };
}

export function classificationPolicyDeserializer(item: any): ClassificationPolicy {
  return {
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    fallbackQueueId: item["fallbackQueueId"],
    queueSelectorAttachments: !item["queueSelectorAttachments"]
      ? item["queueSelectorAttachments"]
      : queueSelectorAttachmentUnionArrayDeserializer(item["queueSelectorAttachments"]),
    prioritizationRule: !item["prioritizationRule"]
      ? item["prioritizationRule"]
      : routerRuleUnionDeserializer(item["prioritizationRule"]),
    workerSelectorAttachments: !item["workerSelectorAttachments"]
      ? item["workerSelectorAttachments"]
      : workerSelectorAttachmentUnionArrayDeserializer(item["workerSelectorAttachments"]),
  };
}

export function queueSelectorAttachmentUnionArraySerializer(
  result: Array<QueueSelectorAttachmentUnion>,
): any[] {
  return result.map((item) => {
    return queueSelectorAttachmentUnionSerializer(item);
  });
}

export function queueSelectorAttachmentUnionArrayDeserializer(
  result: Array<QueueSelectorAttachmentUnion>,
): any[] {
  return result.map((item) => {
    return queueSelectorAttachmentUnionDeserializer(item);
  });
}

/** An attachment of queue selectors to resolve a queue to a job from a classification policy. */
export interface QueueSelectorAttachment {
  /** The type discriminator describing a sub-type of QueueSelectorAttachment. */
  /** The discriminator possible values: conditional, passThrough, ruleEngine, static, weightedAllocation */
  kind: QueueSelectorAttachmentKind;
}

export function queueSelectorAttachmentSerializer(item: QueueSelectorAttachment): any {
  return { kind: item["kind"] };
}

export function queueSelectorAttachmentDeserializer(item: any): QueueSelectorAttachment {
  return {
    kind: item["kind"],
  };
}

/** Alias for QueueSelectorAttachmentUnion */
export type QueueSelectorAttachmentUnion =
  | ConditionalQueueSelectorAttachment
  | PassThroughQueueSelectorAttachment
  | RuleEngineQueueSelectorAttachment
  | StaticQueueSelectorAttachment
  | WeightedAllocationQueueSelectorAttachment
  | QueueSelectorAttachment;

export function queueSelectorAttachmentUnionSerializer(item: QueueSelectorAttachmentUnion): any {
  switch (item.kind) {
    case "conditional":
      return conditionalQueueSelectorAttachmentSerializer(
        item as ConditionalQueueSelectorAttachment,
      );

    case "passThrough":
      return passThroughQueueSelectorAttachmentSerializer(
        item as PassThroughQueueSelectorAttachment,
      );

    case "ruleEngine":
      return ruleEngineQueueSelectorAttachmentSerializer(item as RuleEngineQueueSelectorAttachment);

    case "static":
      return staticQueueSelectorAttachmentSerializer(item as StaticQueueSelectorAttachment);

    case "weightedAllocation":
      return weightedAllocationQueueSelectorAttachmentSerializer(
        item as WeightedAllocationQueueSelectorAttachment,
      );

    default:
      return queueSelectorAttachmentSerializer(item);
  }
}

export function queueSelectorAttachmentUnionDeserializer(item: any): QueueSelectorAttachmentUnion {
  switch (item["kind"]) {
    case "conditional":
      return conditionalQueueSelectorAttachmentDeserializer(
        item as ConditionalQueueSelectorAttachment,
      );

    case "passThrough":
      return passThroughQueueSelectorAttachmentDeserializer(
        item as PassThroughQueueSelectorAttachment,
      );

    case "ruleEngine":
      return ruleEngineQueueSelectorAttachmentDeserializer(
        item as RuleEngineQueueSelectorAttachment,
      );

    case "static":
      return staticQueueSelectorAttachmentDeserializer(item as StaticQueueSelectorAttachment);

    case "weightedAllocation":
      return weightedAllocationQueueSelectorAttachmentDeserializer(
        item as WeightedAllocationQueueSelectorAttachment,
      );

    default:
      return queueSelectorAttachmentDeserializer(item);
  }
}

/** Discriminators for supported queue selector attachment types. */
export type QueueSelectorAttachmentKind =
  | "conditional"
  | "passThrough"
  | "ruleEngine"
  | "static"
  | "weightedAllocation";

/** Describes a set of queue selectors that will be attached if the given condition resolves to true. */
export interface ConditionalQueueSelectorAttachment extends QueueSelectorAttachment {
  /** The condition that must be true for the queue selectors to be attached. */
  condition: RouterRuleUnion;
  /** The queue selectors to attach. */
  queueSelectors: RouterQueueSelector[];
  /** The type discriminator describing the type of queue selector attachment. */
  kind: "conditional";
}

export function conditionalQueueSelectorAttachmentSerializer(
  item: ConditionalQueueSelectorAttachment,
): any {
  return {
    kind: item["kind"],
    condition: routerRuleUnionSerializer(item["condition"]),
    queueSelectors: routerQueueSelectorArraySerializer(item["queueSelectors"]),
  };
}

export function conditionalQueueSelectorAttachmentDeserializer(
  item: any,
): ConditionalQueueSelectorAttachment {
  return {
    kind: item["kind"],
    condition: routerRuleUnionDeserializer(item["condition"]),
    queueSelectors: routerQueueSelectorArrayDeserializer(item["queueSelectors"]),
  };
}

export function routerQueueSelectorArraySerializer(result: Array<RouterQueueSelector>): any[] {
  return result.map((item) => {
    return routerQueueSelectorSerializer(item);
  });
}

export function routerQueueSelectorArrayDeserializer(result: Array<RouterQueueSelector>): any[] {
  return result.map((item) => {
    return routerQueueSelectorDeserializer(item);
  });
}

/** Describes a condition that must be met against a set of labels for queue selection. */
export interface RouterQueueSelector {
  /** The label key to query against. */
  key: string;
  /** Describes how the value of the label is compared to the value defined on the label selector. */
  labelOperator: LabelOperator;
  /** The value to compare against the actual label value with the given operator. Values must be primitive values - number, string, boolean. */
  value?: any;
}

export function routerQueueSelectorSerializer(item: RouterQueueSelector): any {
  return { key: item["key"], labelOperator: item["labelOperator"], value: item["value"] };
}

export function routerQueueSelectorDeserializer(item: any): RouterQueueSelector {
  return {
    key: item["key"],
    labelOperator: item["labelOperator"],
    value: item["value"],
  };
}

/** Describes supported operations on label values. */
export type LabelOperator =
  | "equal"
  | "notEqual"
  | "lessThan"
  | "lessThanOrEqual"
  | "greaterThan"
  | "greaterThanOrEqual";

/** Attaches a queue selector where the value is passed through from a job's label with the same key. */
export interface PassThroughQueueSelectorAttachment extends QueueSelectorAttachment {
  /** The label key to query against. */
  key: string;
  /** Describes how the value of the label is compared to the value pass through. */
  labelOperator: LabelOperator;
  /** The type discriminator describing the type of queue selector attachment. */
  kind: "passThrough";
}

export function passThroughQueueSelectorAttachmentSerializer(
  item: PassThroughQueueSelectorAttachment,
): any {
  return { kind: item["kind"], key: item["key"], labelOperator: item["labelOperator"] };
}

export function passThroughQueueSelectorAttachmentDeserializer(
  item: any,
): PassThroughQueueSelectorAttachment {
  return {
    kind: item["kind"],
    key: item["key"],
    labelOperator: item["labelOperator"],
  };
}

/** Attaches queue selectors to a job when the RouterRule is resolved. */
export interface RuleEngineQueueSelectorAttachment extends QueueSelectorAttachment {
  /** A RouterRule that resolves a collection of queue selectors to attach. */
  rule: RouterRuleUnion;
  /** The type discriminator describing the type of queue selector attachment. */
  kind: "ruleEngine";
}

export function ruleEngineQueueSelectorAttachmentSerializer(
  item: RuleEngineQueueSelectorAttachment,
): any {
  return { kind: item["kind"], rule: routerRuleUnionSerializer(item["rule"]) };
}

export function ruleEngineQueueSelectorAttachmentDeserializer(
  item: any,
): RuleEngineQueueSelectorAttachment {
  return {
    kind: item["kind"],
    rule: routerRuleUnionDeserializer(item["rule"]),
  };
}

/** Describes a queue selector that will be attached to a job. */
export interface StaticQueueSelectorAttachment extends QueueSelectorAttachment {
  /** The queue selector to attach. */
  queueSelector: RouterQueueSelector;
  /** The type discriminator describing the type of queue selector attachment. */
  kind: "static";
}

export function staticQueueSelectorAttachmentSerializer(item: StaticQueueSelectorAttachment): any {
  return {
    kind: item["kind"],
    queueSelector: routerQueueSelectorSerializer(item["queueSelector"]),
  };
}

export function staticQueueSelectorAttachmentDeserializer(
  item: any,
): StaticQueueSelectorAttachment {
  return {
    kind: item["kind"],
    queueSelector: routerQueueSelectorDeserializer(item["queueSelector"]),
  };
}

/** Describes multiple sets of queue selectors, of which one will be selected and attached according to a weighting. */
export interface WeightedAllocationQueueSelectorAttachment extends QueueSelectorAttachment {
  /** A collection of percentage based weighted allocations. */
  allocations: QueueWeightedAllocation[];
  /** The type discriminator describing the type of queue selector attachment. */
  kind: "weightedAllocation";
}

export function weightedAllocationQueueSelectorAttachmentSerializer(
  item: WeightedAllocationQueueSelectorAttachment,
): any {
  return {
    kind: item["kind"],
    allocations: queueWeightedAllocationArraySerializer(item["allocations"]),
  };
}

export function weightedAllocationQueueSelectorAttachmentDeserializer(
  item: any,
): WeightedAllocationQueueSelectorAttachment {
  return {
    kind: item["kind"],
    allocations: queueWeightedAllocationArrayDeserializer(item["allocations"]),
  };
}

export function queueWeightedAllocationArraySerializer(
  result: Array<QueueWeightedAllocation>,
): any[] {
  return result.map((item) => {
    return queueWeightedAllocationSerializer(item);
  });
}

export function queueWeightedAllocationArrayDeserializer(
  result: Array<QueueWeightedAllocation>,
): any[] {
  return result.map((item) => {
    return queueWeightedAllocationDeserializer(item);
  });
}

/** Contains the weight percentage and queue selectors to be applied if selected for weighted distributions. */
export interface QueueWeightedAllocation {
  /** The percentage of this weight, expressed as a fraction of 1. */
  weight: number;
  /** A collection of queue selectors that will be applied if this allocation is selected. */
  queueSelectors: RouterQueueSelector[];
}

export function queueWeightedAllocationSerializer(item: QueueWeightedAllocation): any {
  return {
    weight: item["weight"],
    queueSelectors: routerQueueSelectorArraySerializer(item["queueSelectors"]),
  };
}

export function queueWeightedAllocationDeserializer(item: any): QueueWeightedAllocation {
  return {
    weight: item["weight"],
    queueSelectors: routerQueueSelectorArrayDeserializer(item["queueSelectors"]),
  };
}

export function workerSelectorAttachmentUnionArraySerializer(
  result: Array<WorkerSelectorAttachmentUnion>,
): any[] {
  return result.map((item) => {
    return workerSelectorAttachmentUnionSerializer(item);
  });
}

export function workerSelectorAttachmentUnionArrayDeserializer(
  result: Array<WorkerSelectorAttachmentUnion>,
): any[] {
  return result.map((item) => {
    return workerSelectorAttachmentUnionDeserializer(item);
  });
}

/** An attachment which attaches worker selectors to a job. */
export interface WorkerSelectorAttachment {
  /** The type discriminator describing a sub-type of WorkerSelectorAttachment. */
  /** The discriminator possible values: conditional, passThrough, ruleEngine, static, weightedAllocation */
  kind: WorkerSelectorAttachmentKind;
}

export function workerSelectorAttachmentSerializer(item: WorkerSelectorAttachment): any {
  return { kind: item["kind"] };
}

export function workerSelectorAttachmentDeserializer(item: any): WorkerSelectorAttachment {
  return {
    kind: item["kind"],
  };
}

/** Alias for WorkerSelectorAttachmentUnion */
export type WorkerSelectorAttachmentUnion =
  | ConditionalWorkerSelectorAttachment
  | PassThroughWorkerSelectorAttachment
  | RuleEngineWorkerSelectorAttachment
  | StaticWorkerSelectorAttachment
  | WeightedAllocationWorkerSelectorAttachment
  | WorkerSelectorAttachment;

export function workerSelectorAttachmentUnionSerializer(item: WorkerSelectorAttachmentUnion): any {
  switch (item.kind) {
    case "conditional":
      return conditionalWorkerSelectorAttachmentSerializer(
        item as ConditionalWorkerSelectorAttachment,
      );

    case "passThrough":
      return passThroughWorkerSelectorAttachmentSerializer(
        item as PassThroughWorkerSelectorAttachment,
      );

    case "ruleEngine":
      return ruleEngineWorkerSelectorAttachmentSerializer(
        item as RuleEngineWorkerSelectorAttachment,
      );

    case "static":
      return staticWorkerSelectorAttachmentSerializer(item as StaticWorkerSelectorAttachment);

    case "weightedAllocation":
      return weightedAllocationWorkerSelectorAttachmentSerializer(
        item as WeightedAllocationWorkerSelectorAttachment,
      );

    default:
      return workerSelectorAttachmentSerializer(item);
  }
}

export function workerSelectorAttachmentUnionDeserializer(
  item: any,
): WorkerSelectorAttachmentUnion {
  switch (item["kind"]) {
    case "conditional":
      return conditionalWorkerSelectorAttachmentDeserializer(
        item as ConditionalWorkerSelectorAttachment,
      );

    case "passThrough":
      return passThroughWorkerSelectorAttachmentDeserializer(
        item as PassThroughWorkerSelectorAttachment,
      );

    case "ruleEngine":
      return ruleEngineWorkerSelectorAttachmentDeserializer(
        item as RuleEngineWorkerSelectorAttachment,
      );

    case "static":
      return staticWorkerSelectorAttachmentDeserializer(item as StaticWorkerSelectorAttachment);

    case "weightedAllocation":
      return weightedAllocationWorkerSelectorAttachmentDeserializer(
        item as WeightedAllocationWorkerSelectorAttachment,
      );

    default:
      return workerSelectorAttachmentDeserializer(item);
  }
}

/** Discriminators for supported worker selector attachment types. */
export type WorkerSelectorAttachmentKind =
  | "conditional"
  | "passThrough"
  | "ruleEngine"
  | "static"
  | "weightedAllocation";

/** Describes a set of worker selectors that will be attached if the given condition resolves to true. */
export interface ConditionalWorkerSelectorAttachment extends WorkerSelectorAttachment {
  /** The condition that must be true for the worker selectors to be attached. */
  condition: RouterRuleUnion;
  /** The worker selectors to attach. */
  workerSelectors: RouterWorkerSelector[];
  /** The type discriminator describing the type of worker selector attachment. */
  kind: "conditional";
}

export function conditionalWorkerSelectorAttachmentSerializer(
  item: ConditionalWorkerSelectorAttachment,
): any {
  return {
    kind: item["kind"],
    condition: routerRuleUnionSerializer(item["condition"]),
    workerSelectors: routerWorkerSelectorArraySerializer(item["workerSelectors"]),
  };
}

export function conditionalWorkerSelectorAttachmentDeserializer(
  item: any,
): ConditionalWorkerSelectorAttachment {
  return {
    kind: item["kind"],
    condition: routerRuleUnionDeserializer(item["condition"]),
    workerSelectors: routerWorkerSelectorArrayDeserializer(item["workerSelectors"]),
  };
}

export function routerWorkerSelectorArraySerializer(result: Array<RouterWorkerSelector>): any[] {
  return result.map((item) => {
    return routerWorkerSelectorSerializer(item);
  });
}

export function routerWorkerSelectorArrayDeserializer(result: Array<RouterWorkerSelector>): any[] {
  return result.map((item) => {
    return routerWorkerSelectorDeserializer(item);
  });
}

/** Describes a condition that must be met against a set of labels for worker selection. */
export interface RouterWorkerSelector {
  /** The label key to query against. */
  key: string;
  /** Describes how the value of the label is compared to the value defined on the worker selector. */
  labelOperator: LabelOperator;
  /** The value to compare against the actual label value with the given operator. Values must be primitive values - number, string, boolean. */
  value?: any;
  /** Describes how long this label selector is valid in seconds. */
  expiresAfterSeconds?: number;
  /** Pushes a job to the front of the queue as long as this selector is active. */
  expedite?: boolean;
  /** Status of the worker selector. */
  readonly status?: RouterWorkerSelectorStatus;
  /** The time at which this worker selector expires in UTC. */
  readonly expiresAt?: Date;
}

export function routerWorkerSelectorSerializer(item: RouterWorkerSelector): any {
  return {
    key: item["key"],
    labelOperator: item["labelOperator"],
    value: item["value"],
    expiresAfterSeconds: item["expiresAfterSeconds"],
    expedite: item["expedite"],
  };
}

export function routerWorkerSelectorDeserializer(item: any): RouterWorkerSelector {
  return {
    key: item["key"],
    labelOperator: item["labelOperator"],
    value: item["value"],
    expiresAfterSeconds: item["expiresAfterSeconds"],
    expedite: item["expedite"],
    status: item["status"],
    expiresAt: !item["expiresAt"] ? item["expiresAt"] : new Date(item["expiresAt"]),
  };
}

/** Describes the status of a worker selector. */
export type RouterWorkerSelectorStatus = "active" | "expired";

/** Attaches a worker selector where the value is passed through from a job's label with the same key. */
export interface PassThroughWorkerSelectorAttachment extends WorkerSelectorAttachment {
  /** The label key to query against. */
  key: string;
  /** Describes how the value of the label is compared to the value pass through. */
  labelOperator: LabelOperator;
  /** Describes how long the attached label selector is valid in seconds. */
  expiresAfterSeconds?: number;
  /** The type discriminator describing the type of worker selector attachment. */
  kind: "passThrough";
}

export function passThroughWorkerSelectorAttachmentSerializer(
  item: PassThroughWorkerSelectorAttachment,
): any {
  return {
    kind: item["kind"],
    key: item["key"],
    labelOperator: item["labelOperator"],
    expiresAfterSeconds: item["expiresAfterSeconds"],
  };
}

export function passThroughWorkerSelectorAttachmentDeserializer(
  item: any,
): PassThroughWorkerSelectorAttachment {
  return {
    kind: item["kind"],
    key: item["key"],
    labelOperator: item["labelOperator"],
    expiresAfterSeconds: item["expiresAfterSeconds"],
  };
}

/** Attaches worker selectors to a job when a RouterRule is resolved. */
export interface RuleEngineWorkerSelectorAttachment extends WorkerSelectorAttachment {
  /** A RouterRule that resolves a collection of worker selectors to attach. */
  rule: RouterRuleUnion;
  /** The type discriminator describing the type of worker selector attachment. */
  kind: "ruleEngine";
}

export function ruleEngineWorkerSelectorAttachmentSerializer(
  item: RuleEngineWorkerSelectorAttachment,
): any {
  return { kind: item["kind"], rule: routerRuleUnionSerializer(item["rule"]) };
}

export function ruleEngineWorkerSelectorAttachmentDeserializer(
  item: any,
): RuleEngineWorkerSelectorAttachment {
  return {
    kind: item["kind"],
    rule: routerRuleUnionDeserializer(item["rule"]),
  };
}

/** Describes a worker selector that will be attached to a job. */
export interface StaticWorkerSelectorAttachment extends WorkerSelectorAttachment {
  /** The worker selector to attach. */
  workerSelector: RouterWorkerSelector;
  /** The type discriminator describing the type of worker selector attachment. */
  kind: "static";
}

export function staticWorkerSelectorAttachmentSerializer(
  item: StaticWorkerSelectorAttachment,
): any {
  return {
    kind: item["kind"],
    workerSelector: routerWorkerSelectorSerializer(item["workerSelector"]),
  };
}

export function staticWorkerSelectorAttachmentDeserializer(
  item: any,
): StaticWorkerSelectorAttachment {
  return {
    kind: item["kind"],
    workerSelector: routerWorkerSelectorDeserializer(item["workerSelector"]),
  };
}

/** Describes multiple sets of worker selectors, of which one will be selected and attached according to a weighting. */
export interface WeightedAllocationWorkerSelectorAttachment extends WorkerSelectorAttachment {
  /** A collection of percentage based weighted allocations. */
  allocations: WorkerWeightedAllocation[];
  /** The type discriminator describing the type of worker selector attachment. */
  kind: "weightedAllocation";
}

export function weightedAllocationWorkerSelectorAttachmentSerializer(
  item: WeightedAllocationWorkerSelectorAttachment,
): any {
  return {
    kind: item["kind"],
    allocations: workerWeightedAllocationArraySerializer(item["allocations"]),
  };
}

export function weightedAllocationWorkerSelectorAttachmentDeserializer(
  item: any,
): WeightedAllocationWorkerSelectorAttachment {
  return {
    kind: item["kind"],
    allocations: workerWeightedAllocationArrayDeserializer(item["allocations"]),
  };
}

export function workerWeightedAllocationArraySerializer(
  result: Array<WorkerWeightedAllocation>,
): any[] {
  return result.map((item) => {
    return workerWeightedAllocationSerializer(item);
  });
}

export function workerWeightedAllocationArrayDeserializer(
  result: Array<WorkerWeightedAllocation>,
): any[] {
  return result.map((item) => {
    return workerWeightedAllocationDeserializer(item);
  });
}

/** Contains the weight percentage and worker selectors to be applied if selected for weighted distributions. */
export interface WorkerWeightedAllocation {
  /** The percentage of this weight, expressed as a fraction of 1. */
  weight: number;
  /** A collection of worker selectors that will be applied if this allocation is selected. */
  workerSelectors: RouterWorkerSelector[];
}

export function workerWeightedAllocationSerializer(item: WorkerWeightedAllocation): any {
  return {
    weight: item["weight"],
    workerSelectors: routerWorkerSelectorArraySerializer(item["workerSelectors"]),
  };
}

export function workerWeightedAllocationDeserializer(item: any): WorkerWeightedAllocation {
  return {
    weight: item["weight"],
    workerSelectors: routerWorkerSelectorArrayDeserializer(item["workerSelectors"]),
  };
}

/** Paged collection of ClassificationPolicy items */
export interface _PagedClassificationPolicy {
  /** The ClassificationPolicy items on this page */
  value: ClassificationPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedClassificationPolicyDeserializer(item: any): _PagedClassificationPolicy {
  return {
    value: classificationPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function classificationPolicyArraySerializer(result: Array<ClassificationPolicy>): any[] {
  return result.map((item) => {
    return classificationPolicySerializer(item);
  });
}

export function classificationPolicyArrayDeserializer(result: Array<ClassificationPolicy>): any[] {
  return result.map((item) => {
    return classificationPolicyDeserializer(item);
  });
}

/** A policy that defines actions to execute when exception are triggered. */
export interface ExceptionPolicy {
  /** The entity tag for this resource. */
  readonly etag: string;
  /** Id of an exception policy. */
  readonly id: string;
  /** Friendly name of this policy. */
  name?: string;
  /** A collection of exception rules on the exception policy. */
  exceptionRules?: ExceptionRule[];
}

export function exceptionPolicySerializer(item: ExceptionPolicy): any {
  return {
    name: item["name"],
    exceptionRules: !item["exceptionRules"]
      ? item["exceptionRules"]
      : exceptionRuleArraySerializer(item["exceptionRules"]),
  };
}

export function exceptionPolicyDeserializer(item: any): ExceptionPolicy {
  return {
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    exceptionRules: !item["exceptionRules"]
      ? item["exceptionRules"]
      : exceptionRuleArrayDeserializer(item["exceptionRules"]),
  };
}

export function exceptionRuleArraySerializer(result: Array<ExceptionRule>): any[] {
  return result.map((item) => {
    return exceptionRuleSerializer(item);
  });
}

export function exceptionRuleArrayDeserializer(result: Array<ExceptionRule>): any[] {
  return result.map((item) => {
    return exceptionRuleDeserializer(item);
  });
}

/** A rule that defines actions to execute upon a specific trigger. */
export interface ExceptionRule {
  /** Id of an exception rule. */
  id: string;
  /** The trigger for this exception rule. */
  trigger: ExceptionTriggerUnion;
  /** A collection of actions to perform once the exception is triggered. */
  actions: ExceptionActionUnion[];
}

export function exceptionRuleSerializer(item: ExceptionRule): any {
  return {
    id: item["id"],
    trigger: exceptionTriggerUnionSerializer(item["trigger"]),
    actions: exceptionActionUnionArraySerializer(item["actions"]),
  };
}

export function exceptionRuleDeserializer(item: any): ExceptionRule {
  return {
    id: item["id"],
    trigger: exceptionTriggerUnionDeserializer(item["trigger"]),
    actions: exceptionActionUnionArrayDeserializer(item["actions"]),
  };
}

/** Abstract base class for defining a trigger for exception rules. */
export interface ExceptionTrigger {
  /** The type discriminator describing a sub-type of ExceptionTrigger. */
  /** The discriminator possible values: queueLength, waitTime */
  kind: ExceptionTriggerKind;
}

export function exceptionTriggerSerializer(item: ExceptionTrigger): any {
  return { kind: item["kind"] };
}

export function exceptionTriggerDeserializer(item: any): ExceptionTrigger {
  return {
    kind: item["kind"],
  };
}

/** Alias for ExceptionTriggerUnion */
export type ExceptionTriggerUnion =
  | QueueLengthExceptionTrigger
  | WaitTimeExceptionTrigger
  | ExceptionTrigger;

export function exceptionTriggerUnionSerializer(item: ExceptionTriggerUnion): any {
  switch (item.kind) {
    case "queueLength":
      return queueLengthExceptionTriggerSerializer(item as QueueLengthExceptionTrigger);

    case "waitTime":
      return waitTimeExceptionTriggerSerializer(item as WaitTimeExceptionTrigger);

    default:
      return exceptionTriggerSerializer(item);
  }
}

export function exceptionTriggerUnionDeserializer(item: any): ExceptionTriggerUnion {
  switch (item["kind"]) {
    case "queueLength":
      return queueLengthExceptionTriggerDeserializer(item as QueueLengthExceptionTrigger);

    case "waitTime":
      return waitTimeExceptionTriggerDeserializer(item as WaitTimeExceptionTrigger);

    default:
      return exceptionTriggerDeserializer(item);
  }
}

/** Discriminators for supported exception trigger types. */
export type ExceptionTriggerKind = "queueLength" | "waitTime";

/** Trigger for an exception action on exceeding queue length. */
export interface QueueLengthExceptionTrigger extends ExceptionTrigger {
  /** Threshold of number of jobs ahead in the queue to for this trigger to fire. */
  threshold: number;
  /** The type discriminator describing a sub-type of ExceptionTrigger. */
  kind: "queueLength";
}

export function queueLengthExceptionTriggerSerializer(item: QueueLengthExceptionTrigger): any {
  return { kind: item["kind"], threshold: item["threshold"] };
}

export function queueLengthExceptionTriggerDeserializer(item: any): QueueLengthExceptionTrigger {
  return {
    kind: item["kind"],
    threshold: item["threshold"],
  };
}

/** Trigger for an exception action on exceeding wait time. */
export interface WaitTimeExceptionTrigger extends ExceptionTrigger {
  /** Threshold for wait time for this trigger. */
  thresholdSeconds: number;
  /** The type discriminator describing a sub-type of ExceptionTrigger. */
  kind: "waitTime";
}

export function waitTimeExceptionTriggerSerializer(item: WaitTimeExceptionTrigger): any {
  return { kind: item["kind"], thresholdSeconds: item["thresholdSeconds"] };
}

export function waitTimeExceptionTriggerDeserializer(item: any): WaitTimeExceptionTrigger {
  return {
    kind: item["kind"],
    thresholdSeconds: item["thresholdSeconds"],
  };
}

export function exceptionActionUnionArraySerializer(result: Array<ExceptionActionUnion>): any[] {
  return result.map((item) => {
    return exceptionActionUnionSerializer(item);
  });
}

export function exceptionActionUnionArrayDeserializer(result: Array<ExceptionActionUnion>): any[] {
  return result.map((item) => {
    return exceptionActionUnionDeserializer(item);
  });
}

/** The action to take when the exception is triggered. */
export interface ExceptionAction {
  /** Unique Id of the exception action. */
  id?: string;
  /** The type discriminator describing a sub-type of ExceptionAction. */
  /** The discriminator possible values: cancel, manualReclassify, reclassify */
  kind: ExceptionActionKind;
}

export function exceptionActionSerializer(item: ExceptionAction): any {
  return { id: item["id"], kind: item["kind"] };
}

export function exceptionActionDeserializer(item: any): ExceptionAction {
  return {
    id: item["id"],
    kind: item["kind"],
  };
}

/** Alias for ExceptionActionUnion */
export type ExceptionActionUnion =
  | CancelExceptionAction
  | ManualReclassifyExceptionAction
  | ReclassifyExceptionAction
  | ExceptionAction;

export function exceptionActionUnionSerializer(item: ExceptionActionUnion): any {
  switch (item.kind) {
    case "cancel":
      return cancelExceptionActionSerializer(item as CancelExceptionAction);

    case "manualReclassify":
      return manualReclassifyExceptionActionSerializer(item as ManualReclassifyExceptionAction);

    case "reclassify":
      return reclassifyExceptionActionSerializer(item as ReclassifyExceptionAction);

    default:
      return exceptionActionSerializer(item);
  }
}

export function exceptionActionUnionDeserializer(item: any): ExceptionActionUnion {
  switch (item["kind"]) {
    case "cancel":
      return cancelExceptionActionDeserializer(item as CancelExceptionAction);

    case "manualReclassify":
      return manualReclassifyExceptionActionDeserializer(item as ManualReclassifyExceptionAction);

    case "reclassify":
      return reclassifyExceptionActionDeserializer(item as ReclassifyExceptionAction);

    default:
      return exceptionActionDeserializer(item);
  }
}

/** Discriminators for supported exception action types. */
export type ExceptionActionKind = "cancel" | "manualReclassify" | "reclassify";

/** An action that marks a job as cancelled. */
export interface CancelExceptionAction extends ExceptionAction {
  /** A note that will be appended to a job's notes collection with the current timestamp. */
  note?: string;
  /** Indicates the outcome of a job, populate this field with your own custom values. */
  dispositionCode?: string;
  /** The type discriminator describing a sub-type of ExceptionAction. */
  kind: "cancel";
}

export function cancelExceptionActionSerializer(item: CancelExceptionAction): any {
  return {
    id: item["id"],
    kind: item["kind"],
    note: item["note"],
    dispositionCode: item["dispositionCode"],
  };
}

export function cancelExceptionActionDeserializer(item: any): CancelExceptionAction {
  return {
    id: item["id"],
    kind: item["kind"],
    note: item["note"],
    dispositionCode: item["dispositionCode"],
  };
}

/** An action that manually reclassifies a job by providing the queue, priority and worker selectors. */
export interface ManualReclassifyExceptionAction extends ExceptionAction {
  /** Updated QueueId. */
  queueId?: string;
  /** Updated Priority. */
  priority?: number;
  /** Updated WorkerSelectors. */
  workerSelectors?: RouterWorkerSelector[];
  /** The type discriminator describing a sub-type of ExceptionAction. */
  kind: "manualReclassify";
}

export function manualReclassifyExceptionActionSerializer(
  item: ManualReclassifyExceptionAction,
): any {
  return {
    id: item["id"],
    kind: item["kind"],
    queueId: item["queueId"],
    priority: item["priority"],
    workerSelectors: !item["workerSelectors"]
      ? item["workerSelectors"]
      : routerWorkerSelectorArraySerializer(item["workerSelectors"]),
  };
}

export function manualReclassifyExceptionActionDeserializer(
  item: any,
): ManualReclassifyExceptionAction {
  return {
    id: item["id"],
    kind: item["kind"],
    queueId: item["queueId"],
    priority: item["priority"],
    workerSelectors: !item["workerSelectors"]
      ? item["workerSelectors"]
      : routerWorkerSelectorArrayDeserializer(item["workerSelectors"]),
  };
}

/** An action that modifies labels on a job and then reclassifies it. */
export interface ReclassifyExceptionAction extends ExceptionAction {
  /** The new classification policy that will determine queue, priority and worker selectors. */
  classificationPolicyId?: string;
  /** Dictionary containing the labels to update (or add if not existing) in key-value pairs.  Values must be primitive values - number, string, boolean. */
  labelsToUpsert?: Record<string, any>;
  /** The type discriminator describing a sub-type of ExceptionAction. */
  kind: "reclassify";
}

export function reclassifyExceptionActionSerializer(item: ReclassifyExceptionAction): any {
  return {
    id: item["id"],
    kind: item["kind"],
    classificationPolicyId: item["classificationPolicyId"],
    labelsToUpsert: item["labelsToUpsert"],
  };
}

export function reclassifyExceptionActionDeserializer(item: any): ReclassifyExceptionAction {
  return {
    id: item["id"],
    kind: item["kind"],
    classificationPolicyId: item["classificationPolicyId"],
    labelsToUpsert: !item["labelsToUpsert"]
      ? item["labelsToUpsert"]
      : Object.fromEntries(
          Object.entries(item["labelsToUpsert"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Paged collection of ExceptionPolicy items */
export interface _PagedExceptionPolicy {
  /** The ExceptionPolicy items on this page */
  value: ExceptionPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedExceptionPolicyDeserializer(item: any): _PagedExceptionPolicy {
  return {
    value: exceptionPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function exceptionPolicyArraySerializer(result: Array<ExceptionPolicy>): any[] {
  return result.map((item) => {
    return exceptionPolicySerializer(item);
  });
}

export function exceptionPolicyArrayDeserializer(result: Array<ExceptionPolicy>): any[] {
  return result.map((item) => {
    return exceptionPolicyDeserializer(item);
  });
}

/** A queue that can contain jobs to be routed. */
export interface RouterQueue {
  /** The entity tag for this resource. */
  readonly etag: string;
  /** Id of a queue. */
  readonly id: string;
  /** Friendly name of this queue. */
  name?: string;
  /** Id of a distribution policy that will determine how a job is distributed to workers. */
  distributionPolicyId?: string;
  /** A set of key/value pairs that are identifying attributes used by the rules engines to make decisions. Values must be primitive values - number, string, boolean. */
  labels?: Record<string, any>;
  /** Id of an exception policy that determines various job escalation rules. */
  exceptionPolicyId?: string;
}

export function routerQueueSerializer(item: RouterQueue): any {
  return {
    name: item["name"],
    distributionPolicyId: item["distributionPolicyId"],
    labels: item["labels"],
    exceptionPolicyId: item["exceptionPolicyId"],
  };
}

export function routerQueueDeserializer(item: any): RouterQueue {
  return {
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    distributionPolicyId: item["distributionPolicyId"],
    labels: !item["labels"]
      ? item["labels"]
      : Object.fromEntries(Object.entries(item["labels"]).map(([k, p]: [string, any]) => [k, p])),
    exceptionPolicyId: item["exceptionPolicyId"],
  };
}

/** Paged collection of RouterQueue items */
export interface _PagedRouterQueue {
  /** The RouterQueue items on this page */
  value: RouterQueue[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedRouterQueueDeserializer(item: any): _PagedRouterQueue {
  return {
    value: routerQueueArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function routerQueueArraySerializer(result: Array<RouterQueue>): any[] {
  return result.map((item) => {
    return routerQueueSerializer(item);
  });
}

export function routerQueueArrayDeserializer(result: Array<RouterQueue>): any[] {
  return result.map((item) => {
    return routerQueueDeserializer(item);
  });
}

/** A unit of work to be routed */
export interface RouterJob {
  /** The entity tag for this resource. */
  readonly etag: string;
  /** Id of a job. */
  readonly id: string;
  /** Reference to an external parent context, eg. call ID. */
  channelReference?: string;
  /** The status of the job. */
  readonly status?: RouterJobStatus;
  /** Timestamp a job was queued in UTC. */
  readonly enqueuedAt?: Date;
  /** The channel identifier. eg. voice, chat, etc. */
  channelId?: string;
  /** Id of a classification policy used for classifying this job. */
  classificationPolicyId?: string;
  /** Id of a queue that this job is queued to. */
  queueId?: string;
  /** Priority of this job. Value must be between -100 to 100. */
  priority?: number;
  /** Reason code for cancelled or closed jobs. */
  dispositionCode?: string;
  /** A collection of manually specified worker selectors, which a worker must satisfy in order to process this job. */
  requestedWorkerSelectors?: RouterWorkerSelector[];
  /** A collection of worker selectors attached by a classification policy, which a worker must satisfy in order to process this job. */
  readonly attachedWorkerSelectors?: RouterWorkerSelector[];
  /** A set of key/value pairs that are identifying attributes used by the rules engines to make decisions. Values must be primitive values - number, string, boolean. */
  labels?: Record<string, any>;
  /** A collection of the assignments of the job. Key is AssignmentId. */
  readonly assignments?: Record<string, RouterJobAssignment>;
  /** A set of non-identifying attributes attached to this job. Values must be primitive values - number, string, boolean. */
  tags?: Record<string, any>;
  /** Notes attached to a job, sorted by timestamp. */
  notes?: RouterJobNote[];
  /** If set, job will be scheduled to be enqueued at a given time. */
  readonly scheduledAt?: Date;
  /** If provided, will determine how job matching will be carried out. Default mode: QueueAndMatchMode. */
  matchingMode?: JobMatchingModeUnion;
}

export function routerJobSerializer(item: RouterJob): any {
  return {
    channelReference: item["channelReference"],
    channelId: item["channelId"],
    classificationPolicyId: item["classificationPolicyId"],
    queueId: item["queueId"],
    priority: item["priority"],
    dispositionCode: item["dispositionCode"],
    requestedWorkerSelectors: !item["requestedWorkerSelectors"]
      ? item["requestedWorkerSelectors"]
      : routerWorkerSelectorArraySerializer(item["requestedWorkerSelectors"]),
    labels: item["labels"],
    tags: item["tags"],
    notes: !item["notes"] ? item["notes"] : routerJobNoteArraySerializer(item["notes"]),
    matchingMode: !item["matchingMode"]
      ? item["matchingMode"]
      : jobMatchingModeUnionSerializer(item["matchingMode"]),
  };
}

export function routerJobDeserializer(item: any): RouterJob {
  return {
    etag: item["etag"],
    id: item["id"],
    channelReference: item["channelReference"],
    status: item["status"],
    enqueuedAt: !item["enqueuedAt"] ? item["enqueuedAt"] : new Date(item["enqueuedAt"]),
    channelId: item["channelId"],
    classificationPolicyId: item["classificationPolicyId"],
    queueId: item["queueId"],
    priority: item["priority"],
    dispositionCode: item["dispositionCode"],
    requestedWorkerSelectors: !item["requestedWorkerSelectors"]
      ? item["requestedWorkerSelectors"]
      : routerWorkerSelectorArrayDeserializer(item["requestedWorkerSelectors"]),
    attachedWorkerSelectors: !item["attachedWorkerSelectors"]
      ? item["attachedWorkerSelectors"]
      : routerWorkerSelectorArrayDeserializer(item["attachedWorkerSelectors"]),
    labels: !item["labels"]
      ? item["labels"]
      : Object.fromEntries(Object.entries(item["labels"]).map(([k, p]: [string, any]) => [k, p])),
    assignments: !item["assignments"]
      ? item["assignments"]
      : routerJobAssignmentRecordDeserializer(item["assignments"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    notes: !item["notes"] ? item["notes"] : routerJobNoteArrayDeserializer(item["notes"]),
    scheduledAt: !item["scheduledAt"] ? item["scheduledAt"] : new Date(item["scheduledAt"]),
    matchingMode: !item["matchingMode"]
      ? item["matchingMode"]
      : jobMatchingModeUnionDeserializer(item["matchingMode"]),
  };
}

/** Describes the various status of a job. */
export type RouterJobStatus =
  | "pendingClassification"
  | "queued"
  | "assigned"
  | "completed"
  | "closed"
  | "cancelled"
  | "classificationFailed"
  | "created"
  | "pendingSchedule"
  | "scheduled"
  | "scheduleFailed"
  | "waitingForActivation";

export function routerJobAssignmentRecordDeserializer(
  item: Record<string, any>,
): Record<string, RouterJobAssignment> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : routerJobAssignmentDeserializer(item[key]);
  });
  return result;
}

/** Assignment details of a job to a worker. */
export interface RouterJobAssignment {
  /** Id of a job assignment. */
  readonly assignmentId: string;
  /** Id of the Worker assigned to the job. */
  workerId?: string;
  /** Timestamp when the job was assigned to a worker in UTC. */
  assignedAt: Date;
  /** Timestamp when the job was marked as completed after being assigned in UTC. */
  completedAt?: Date;
  /** Timestamp when the job was marked as closed after being completed in UTC. */
  closedAt?: Date;
}

export function routerJobAssignmentDeserializer(item: any): RouterJobAssignment {
  return {
    assignmentId: item["assignmentId"],
    workerId: item["workerId"],
    assignedAt: new Date(item["assignedAt"]),
    completedAt: !item["completedAt"] ? item["completedAt"] : new Date(item["completedAt"]),
    closedAt: !item["closedAt"] ? item["closedAt"] : new Date(item["closedAt"]),
  };
}

export function routerJobNoteArraySerializer(result: Array<RouterJobNote>): any[] {
  return result.map((item) => {
    return routerJobNoteSerializer(item);
  });
}

export function routerJobNoteArrayDeserializer(result: Array<RouterJobNote>): any[] {
  return result.map((item) => {
    return routerJobNoteDeserializer(item);
  });
}

/** A note attached to a job. */
export interface RouterJobNote {
  /** The message contained in the note. */
  message: string;
  /** The time at which the note was added in UTC. If not provided, will default to the current time. */
  addedAt?: Date;
}

export function routerJobNoteSerializer(item: RouterJobNote): any {
  return {
    message: item["message"],
    addedAt: !item["addedAt"] ? item["addedAt"] : item["addedAt"].toISOString(),
  };
}

export function routerJobNoteDeserializer(item: any): RouterJobNote {
  return {
    message: item["message"],
    addedAt: !item["addedAt"] ? item["addedAt"] : new Date(item["addedAt"]),
  };
}

/**
 * A matching mode of one of the following types:
 * QueueAndMatchMode: Used when matching worker to a job is required to be done right after job is queued.
 * ScheduleAndSuspendMode: Used for scheduling jobs to be queued at a future time. At specified time, matching of a worker to the job will not start automatically.
 * SuspendMode: Used when matching workers to a job needs to be suspended.
 */
export interface JobMatchingMode {
  /** The type discriminator describing a sub-type of JobMatchingMode. */
  /** The discriminator possible values: scheduleAndSuspend, queueAndMatch, suspend */
  kind: JobMatchingModeKind;
}

export function jobMatchingModeSerializer(item: JobMatchingMode): any {
  return { kind: item["kind"] };
}

export function jobMatchingModeDeserializer(item: any): JobMatchingMode {
  return {
    kind: item["kind"],
  };
}

/** Alias for JobMatchingModeUnion */
export type JobMatchingModeUnion =
  | ScheduleAndSuspendMode
  | QueueAndMatchMode
  | SuspendMode
  | JobMatchingMode;

export function jobMatchingModeUnionSerializer(item: JobMatchingModeUnion): any {
  switch (item.kind) {
    case "scheduleAndSuspend":
      return scheduleAndSuspendModeSerializer(item as ScheduleAndSuspendMode);

    case "queueAndMatch":
      return queueAndMatchModeSerializer(item as QueueAndMatchMode);

    case "suspend":
      return suspendModeSerializer(item as SuspendMode);

    default:
      return jobMatchingModeSerializer(item);
  }
}

export function jobMatchingModeUnionDeserializer(item: any): JobMatchingModeUnion {
  switch (item["kind"]) {
    case "scheduleAndSuspend":
      return scheduleAndSuspendModeDeserializer(item as ScheduleAndSuspendMode);

    case "queueAndMatch":
      return queueAndMatchModeDeserializer(item as QueueAndMatchMode);

    case "suspend":
      return suspendModeDeserializer(item as SuspendMode);

    default:
      return jobMatchingModeDeserializer(item);
  }
}

/** Discriminators for supported matching mode types. */
export type JobMatchingModeKind = "queueAndMatch" | "scheduleAndSuspend" | "suspend";

/** Describes a matching mode used for scheduling jobs to be queued at a future time. At the specified time, matching worker to a job will not start automatically. */
export interface ScheduleAndSuspendMode extends JobMatchingMode {
  /** Requested schedule time. */
  scheduleAt: Date;
  /** The type discriminator describing ScheduleAndSuspendMode */
  kind: "scheduleAndSuspend";
}

export function scheduleAndSuspendModeSerializer(item: ScheduleAndSuspendMode): any {
  return { kind: item["kind"], scheduleAt: item["scheduleAt"].toISOString() };
}

export function scheduleAndSuspendModeDeserializer(item: any): ScheduleAndSuspendMode {
  return {
    kind: item["kind"],
    scheduleAt: new Date(item["scheduleAt"]),
  };
}

/** Describes a matching mode where matching worker to a job is automatically started after job is queued successfully. */
export interface QueueAndMatchMode extends JobMatchingMode {
  /** The type discriminator describing QueueAndMatchMode */
  kind: "queueAndMatch";
}

export function queueAndMatchModeSerializer(item: QueueAndMatchMode): any {
  return { kind: item["kind"] };
}

export function queueAndMatchModeDeserializer(item: any): QueueAndMatchMode {
  return {
    kind: item["kind"],
  };
}

/** Describes a matching mode where matching worker to a job is suspended. */
export interface SuspendMode extends JobMatchingMode {
  /** The type discriminator describing SuspendMode */
  kind: "suspend";
}

export function suspendModeSerializer(item: SuspendMode): any {
  return { kind: item["kind"] };
}

export function suspendModeDeserializer(item: any): SuspendMode {
  return {
    kind: item["kind"],
  };
}

/** Request payload for reclassifying jobs. */
export interface ReclassifyJobOptions {}

export function reclassifyJobOptionsSerializer(_item: ReclassifyJobOptions): any {
  return {};
}

/** Response payload from reclassifying a job. */
export interface ReclassifyJobResult {}

export function reclassifyJobResultDeserializer(item: any): ReclassifyJobResult {
  return item;
}

/** Request payload for cancelling a job. */
export interface CancelJobOptions {
  /** A note that will be appended to a job's Notes collection with the current timestamp. */
  note?: string;
  /** Indicates the outcome of a job, populate this field with your own custom values. If not provided, default value of "Cancelled" is set. */
  dispositionCode?: string;
}

export function cancelJobOptionsSerializer(item: CancelJobOptions): any {
  return { note: item["note"], dispositionCode: item["dispositionCode"] };
}

/** Response payload from cancelling a job. */
export interface CancelJobResult {}

export function cancelJobResultDeserializer(item: any): CancelJobResult {
  return item;
}

/** Request payload for completing jobs. */
export interface CompleteJobOptions {
  /** A note that will be appended to a job's Notes collection with the current timestamp. */
  note?: string;
}

export function completeJobOptionsSerializer(item: CompleteJobOptions): any {
  return { note: item["note"] };
}

/** Response payload from completing a job. */
export interface CompleteJobResult {}

export function completeJobResultDeserializer(item: any): CompleteJobResult {
  return item;
}

/** Request payload for closing jobs */
export interface CloseJobOptions {
  /** Indicates the outcome of a job, populate this field with your own custom values. */
  dispositionCode?: string;
  /** If not provided, worker capacity is released immediately along with a JobClosedEvent notification. If provided, worker capacity is released along with a JobClosedEvent notification at a future time in UTC. */
  closeAt?: Date;
  /** A note that will be appended to a job's Notes collection with the current timestamp. */
  note?: string;
}

export function closeJobOptionsSerializer(item: CloseJobOptions): any {
  return {
    dispositionCode: item["dispositionCode"],
    closeAt: !item["closeAt"] ? item["closeAt"] : item["closeAt"].toISOString(),
    note: item["note"],
  };
}

/** Response payload from closing a job. */
export interface CloseJobResult {}

export function closeJobResultDeserializer(item: any): CloseJobResult {
  return item;
}

/** Paged collection of RouterJob items */
export interface _PagedRouterJob {
  /** The RouterJob items on this page */
  value: RouterJob[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedRouterJobDeserializer(item: any): _PagedRouterJob {
  return {
    value: routerJobArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function routerJobArraySerializer(result: Array<RouterJob>): any[] {
  return result.map((item) => {
    return routerJobSerializer(item);
  });
}

export function routerJobArrayDeserializer(result: Array<RouterJob>): any[] {
  return result.map((item) => {
    return routerJobDeserializer(item);
  });
}

/** Position and estimated wait time for a job. */
export interface RouterJobPositionDetails {
  /** Id of the job these details are about. */
  jobId: string;
  /** Position of the job in question within that queue. */
  position: number;
  /** Id of the queue this job is enqueued in. */
  queueId: string;
  /** Length of the queue: total number of enqueued jobs. */
  queueLength: number;
  /** Estimated wait time of the job rounded up to the nearest minute. */
  estimatedWaitTimeMinutes: number;
}

export function routerJobPositionDetailsDeserializer(item: any): RouterJobPositionDetails {
  return {
    jobId: item["jobId"],
    position: item["position"],
    queueId: item["queueId"],
    queueLength: item["queueLength"],
    estimatedWaitTimeMinutes: item["estimatedWaitTimeMinutes"],
  };
}

/** Request payload for unassigning a job. */
export interface UnassignJobOptions {
  /** If SuspendMatching is true, then a job is not queued for re-matching with a worker. */
  suspendMatching?: boolean;
}

export function unassignJobOptionsSerializer(item: UnassignJobOptions): any {
  return { suspendMatching: item["suspendMatching"] };
}

/** Response payload after a job has been successfully unassigned. */
export interface UnassignJobResult {
  /** Id of an unassigned job. */
  jobId: string;
  /** The number of times a job is unassigned. At a maximum 3. */
  unassignmentCount: number;
}

export function unassignJobResultDeserializer(item: any): UnassignJobResult {
  return {
    jobId: item["jobId"],
    unassignmentCount: item["unassignmentCount"],
  };
}

/** Response containing ids for the worker, job, and assignment from an accepted offer. */
export interface AcceptJobOfferResult {
  /** Id of job assignment that assigns a worker that has accepted an offer to a job. */
  assignmentId: string;
  /** Id of the job assigned. */
  jobId: string;
  /** Id of the worker that has been assigned this job. */
  workerId: string;
}

export function acceptJobOfferResultDeserializer(item: any): AcceptJobOfferResult {
  return {
    assignmentId: item["assignmentId"],
    jobId: item["jobId"],
    workerId: item["workerId"],
  };
}

/** Request payload for declining offers. */
export interface DeclineJobOfferOptions {
  /** If the RetryOfferAt is not provided, then this job will not be offered again to the worker who declined this job unless the worker is de-registered and re-registered.  If a RetryOfferAt time is provided, then the job will be re-matched to eligible workers at the retry time in UTC.  The worker that declined the job will also be eligible for the job at that time. */
  retryOfferAt?: Date;
}

export function declineJobOfferOptionsSerializer(item: DeclineJobOfferOptions): any {
  return {
    retryOfferAt: !item["retryOfferAt"] ? item["retryOfferAt"] : item["retryOfferAt"].toISOString(),
  };
}

/** Response payload from declining a job. */
export interface DeclineJobOfferResult {}

export function declineJobOfferResultDeserializer(item: any): DeclineJobOfferResult {
  return item;
}

/** Statistics for the queue. */
export interface RouterQueueStatistics {
  /** Id of the queue these details are about. */
  queueId: string;
  /** Length of the queue: total number of enqueued jobs. */
  length: number;
  /** The estimated wait time of this queue rounded up to the nearest minute, grouped by job priority. */
  estimatedWaitTimeMinutes?: Record<string, number>;
  /** The wait time of the job that has been enqueued in this queue for the longest. */
  longestJobWaitTimeMinutes?: number;
}

export function routerQueueStatisticsDeserializer(item: any): RouterQueueStatistics {
  return {
    queueId: item["queueId"],
    length: item["length"],
    estimatedWaitTimeMinutes: !item["estimatedWaitTimeMinutes"]
      ? item["estimatedWaitTimeMinutes"]
      : Object.fromEntries(
          Object.entries(item["estimatedWaitTimeMinutes"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    longestJobWaitTimeMinutes: item["longestJobWaitTimeMinutes"],
  };
}

/** An entity for jobs to be routed to. */
export interface RouterWorker {
  /** The entity tag for this resource. */
  readonly etag: string;
  /** Id of a worker. */
  readonly id: string;
  /** Current state of a worker. */
  readonly state?: RouterWorkerState;
  /** Collection of queue(s) that this worker can receive work from. */
  queues?: string[];
  /** The total capacity score this worker has to manage multiple concurrent jobs. */
  capacity?: number;
  /** A set of key/value pairs that are identifying attributes used by the rules engines to make decisions. Values must be primitive values - number, string, boolean. */
  labels?: Record<string, any>;
  /** A set of non-identifying attributes attached to this worker. Values must be primitive values - number, string, boolean. */
  tags?: Record<string, any>;
  /** Collection of channel(s) this worker can handle and their impact on the workers capacity. */
  channels?: RouterChannel[];
  /** A list of active offers issued to this worker. */
  readonly offers?: RouterJobOffer[];
  /** A list of assigned jobs attached to this worker. */
  readonly assignedJobs?: RouterWorkerAssignment[];
  /** A value indicating the workers capacity. A value of '1' means all capacity is consumed. A value of '0' means no capacity is currently consumed. */
  readonly loadRatio?: number;
  /** A flag indicating this worker is open to receive offers or not. */
  availableForOffers?: boolean;
  /** If this is set, the worker will only receive up to this many new offers at a time. */
  maxConcurrentOffers?: number;
}

export function routerWorkerSerializer(item: RouterWorker): any {
  return {
    queues: !item["queues"]
      ? item["queues"]
      : item["queues"].map((p: any) => {
          return p;
        }),
    capacity: item["capacity"],
    labels: item["labels"],
    tags: item["tags"],
    channels: !item["channels"] ? item["channels"] : routerChannelArraySerializer(item["channels"]),
    availableForOffers: item["availableForOffers"],
    maxConcurrentOffers: item["maxConcurrentOffers"],
  };
}

export function routerWorkerDeserializer(item: any): RouterWorker {
  return {
    etag: item["etag"],
    id: item["id"],
    state: item["state"],
    queues: !item["queues"]
      ? item["queues"]
      : item["queues"].map((p: any) => {
          return p;
        }),
    capacity: item["capacity"],
    labels: !item["labels"]
      ? item["labels"]
      : Object.fromEntries(Object.entries(item["labels"]).map(([k, p]: [string, any]) => [k, p])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    channels: !item["channels"]
      ? item["channels"]
      : routerChannelArrayDeserializer(item["channels"]),
    offers: !item["offers"] ? item["offers"] : routerJobOfferArrayDeserializer(item["offers"]),
    assignedJobs: !item["assignedJobs"]
      ? item["assignedJobs"]
      : routerWorkerAssignmentArrayDeserializer(item["assignedJobs"]),
    loadRatio: item["loadRatio"],
    availableForOffers: item["availableForOffers"],
    maxConcurrentOffers: item["maxConcurrentOffers"],
  };
}

/** Enums for worker states. */
export type RouterWorkerState = "active" | "draining" | "inactive";

export function routerChannelArraySerializer(result: Array<RouterChannel>): any[] {
  return result.map((item) => {
    return routerChannelSerializer(item);
  });
}

export function routerChannelArrayDeserializer(result: Array<RouterChannel>): any[] {
  return result.map((item) => {
    return routerChannelDeserializer(item);
  });
}

/** Represents the capacity a job in this channel will consume from a worker. */
export interface RouterChannel {
  /** Id of a channel. */
  channelId: string;
  /** The amount of capacity that an instance of a job of this channel will consume of the total worker capacity. */
  capacityCostPerJob: number;
  /** The maximum number of jobs that can be supported concurrently for this channel. Value must be greater than zero. */
  maxNumberOfJobs?: number;
}

export function routerChannelSerializer(item: RouterChannel): any {
  return {
    channelId: item["channelId"],
    capacityCostPerJob: item["capacityCostPerJob"],
    maxNumberOfJobs: item["maxNumberOfJobs"],
  };
}

export function routerChannelDeserializer(item: any): RouterChannel {
  return {
    channelId: item["channelId"],
    capacityCostPerJob: item["capacityCostPerJob"],
    maxNumberOfJobs: item["maxNumberOfJobs"],
  };
}

export function routerJobOfferArrayDeserializer(result: Array<RouterJobOffer>): any[] {
  return result.map((item) => {
    return routerJobOfferDeserializer(item);
  });
}

/** An offer of a job to a worker. */
export interface RouterJobOffer {
  /** Id of an offer. */
  readonly offerId: string;
  /** Id of the job. */
  jobId: string;
  /** The capacity cost consumed by the job offer. */
  capacityCost: number;
  /** Timestamp when the offer was created in UTC. */
  offeredAt?: Date;
  /** Timestamp when the offer will expire in UTC. */
  expiresAt?: Date;
}

export function routerJobOfferDeserializer(item: any): RouterJobOffer {
  return {
    offerId: item["offerId"],
    jobId: item["jobId"],
    capacityCost: item["capacityCost"],
    offeredAt: !item["offeredAt"] ? item["offeredAt"] : new Date(item["offeredAt"]),
    expiresAt: !item["expiresAt"] ? item["expiresAt"] : new Date(item["expiresAt"]),
  };
}

export function routerWorkerAssignmentArrayDeserializer(
  result: Array<RouterWorkerAssignment>,
): any[] {
  return result.map((item) => {
    return routerWorkerAssignmentDeserializer(item);
  });
}

/** The assignment for a worker to a job. */
export interface RouterWorkerAssignment {
  /** Id of the assignment. */
  assignmentId: string;
  /** Id of the job assigned. */
  jobId: string;
  /** The amount of capacity this assignment has consumed on the worker. */
  capacityCost: number;
  /** The assignment time of the job in UTC. */
  assignedAt: Date;
}

export function routerWorkerAssignmentDeserializer(item: any): RouterWorkerAssignment {
  return {
    assignmentId: item["assignmentId"],
    jobId: item["jobId"],
    capacityCost: item["capacityCost"],
    assignedAt: new Date(item["assignedAt"]),
  };
}

/** Paged collection of RouterWorker items */
export interface _PagedRouterWorker {
  /** The RouterWorker items on this page */
  value: RouterWorker[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedRouterWorkerDeserializer(item: any): _PagedRouterWorker {
  return {
    value: routerWorkerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function routerWorkerArraySerializer(result: Array<RouterWorker>): any[] {
  return result.map((item) => {
    return routerWorkerSerializer(item);
  });
}

export function routerWorkerArrayDeserializer(result: Array<RouterWorker>): any[] {
  return result.map((item) => {
    return routerWorkerDeserializer(item);
  });
}

/** Enums used to filters jobs by status. */
export type RouterJobStatusSelector =
  | "all"
  | "pendingClassification"
  | "queued"
  | "assigned"
  | "completed"
  | "closed"
  | "cancelled"
  | "classificationFailed"
  | "created"
  | "pendingSchedule"
  | "scheduled"
  | "scheduleFailed"
  | "waitingForActivation"
  | "active";
/** Enums used to filters workers by state */
export type RouterWorkerStateSelector = "active" | "draining" | "inactive" | "all";

/** JobRouter Versions */
export enum KnownVersions {
  /** JobRouter 2023-11-01 api version */
  C20231101 = "2023-11-01",
  /** JobRouter 2024-01-18-preview api version */
  C20240118Preview = "2024-01-18-preview",
}
