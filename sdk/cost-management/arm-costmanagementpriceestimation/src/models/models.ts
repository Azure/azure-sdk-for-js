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

/** Resolved pricing configurations and explicitly supplied usage for a normalized month. */
export interface EstimateContent {
  /** Charge-once entries. Position correlates results; no customer identifiers are accepted. */
  resources: EstimateResourceInput[];
}

export function estimateContentSerializer(item: EstimateContent): any {
  return { resources: estimateResourceInputArraySerializer(item["resources"]) };
}

export function estimateResourceInputArraySerializer(result: Array<EstimateResourceInput>): any[] {
  return result.map((item) => {
    return estimateResourceInputSerializer(item);
  });
}

/** One proposed charge entry validated against server-owned metadata. */
export interface EstimateResourceInput {
  /** Supported resource type, matched case-insensitively. */
  resourceType: string;
  /** Supported source resource API version; the service never evaluates that resource or deploys it. */
  resourceApiVersion: string;
  /** Two named object inputs: resource (an allowlisted subset of the native ARM resource) and usage (consumption and purchase assumptions). Omitted values are completed only by applicable advertised defaults. */
  inputs: EstimateNamedValue[];
}

export function estimateResourceInputSerializer(item: EstimateResourceInput): any {
  return {
    resourceType: item["resourceType"],
    resourceApiVersion: item["resourceApiVersion"],
    inputs: estimateNamedValueArraySerializer(item["inputs"]),
  };
}

export function estimateNamedValueArraySerializer(result: Array<EstimateNamedValue>): any[] {
  return result.map((item) => {
    return estimateNamedValueSerializer(item);
  });
}

export function estimateNamedValueArrayDeserializer(result: Array<EstimateNamedValue>): any[] {
  return result.map((item) => {
    return estimateNamedValueDeserializer(item);
  });
}

/** A case-sensitive allowlisted business name and an explicitly typed value. */
export interface EstimateNamedValue {
  /** Unique sibling business name, not a customer resource name or a path expression. */
  name: string;
  /** Typed value. Null and coercion from another JSON kind are not accepted. */
  value: EstimateValueUnion;
}

export function estimateNamedValueSerializer(item: EstimateNamedValue): any {
  return { name: item["name"], value: estimateValueUnionSerializer(item["value"]) };
}

export function estimateNamedValueDeserializer(item: any): EstimateNamedValue {
  return {
    name: item["name"],
    value: estimateValueUnionDeserializer(item["value"]),
  };
}

/**
 * Base for the five typed variants. The service rejects unknown kinds, unexpected
 * properties, duplicate JSON members and malformed variants. A missing value is
 * represented by omission of its named entry, not by null or a sentinel.
 */
export interface EstimateValue {
  /** Exact discriminator selecting a supported typed variant. */
  /** The discriminator possible values: string, number, boolean, object, array */
  kind: EstimateValueKind;
}

export function estimateValueSerializer(item: EstimateValue): any {
  return { kind: item["kind"] };
}

export function estimateValueDeserializer(item: any): EstimateValue {
  return {
    kind: item["kind"],
  };
}

/** Alias for EstimateValueUnion */
export type EstimateValueUnion =
  | EstimateStringValue
  | EstimateNumberValue
  | EstimateBooleanValue
  | EstimateObjectValue
  | EstimateArrayValue
  | EstimateValue;

export function estimateValueUnionSerializer(item: EstimateValueUnion): any {
  switch (item.kind) {
    case "string":
      return estimateStringValueSerializer(item as EstimateStringValue);

    case "number":
      return estimateNumberValueSerializer(item as EstimateNumberValue);

    case "boolean":
      return estimateBooleanValueSerializer(item as EstimateBooleanValue);

    case "object":
      return estimateObjectValueSerializer(item as EstimateObjectValue);

    case "array":
      return estimateArrayValueSerializer(item as EstimateArrayValue);

    default:
      return estimateValueSerializer(item);
  }
}

export function estimateValueUnionDeserializer(item: any): EstimateValueUnion {
  switch (item["kind"]) {
    case "string":
      return estimateStringValueDeserializer(item as EstimateStringValue);

    case "number":
      return estimateNumberValueDeserializer(item as EstimateNumberValue);

    case "boolean":
      return estimateBooleanValueDeserializer(item as EstimateBooleanValue);

    case "object":
      return estimateObjectValueDeserializer(item as EstimateObjectValue);

    case "array":
      return estimateArrayValueDeserializer(item as EstimateArrayValue);

    default:
      return estimateValueDeserializer(item);
  }
}

/**
 * Supported decoded kinds. The extensible representation supports client
 * compatibility with additional kinds in future API versions. Requests must
 * still use one of the five typed variants supported by this API version;
 * an unrecognized discriminator is rejected.
 */
export enum KnownEstimateValueKind {
  /** A JSON string. */
  String = "string",
  /** A finite JSON number, not a numeric string. */
  Number = "number",
  /** A native JSON boolean. */
  Boolean = "boolean",
  /** Named typed members. */
  Object = "object",
  /** Ordered typed items. */
  Array = "array",
}

/**
 * Supported decoded kinds. The extensible representation supports client
 * compatibility with additional kinds in future API versions. Requests must
 * still use one of the five typed variants supported by this API version;
 * an unrecognized discriminator is rejected. \
 * {@link KnownEstimateValueKind} can be used interchangeably with EstimateValueKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **string**: A JSON string. \
 * **number**: A finite JSON number, not a numeric string. \
 * **boolean**: A native JSON boolean. \
 * **object**: Named typed members. \
 * **array**: Ordered typed items.
 */
export type EstimateValueKind = string;

/** A resolved string pricing value; not a template, expression, script or secret. */
export interface EstimateStringValue extends EstimateValue {
  /** String variant discriminator. */
  kind: "string";
  /** Text accepted only when permitted by the selected input definition. */
  value: string;
}

export function estimateStringValueSerializer(item: EstimateStringValue): any {
  return { kind: item["kind"], value: item["value"] };
}

export function estimateStringValueDeserializer(item: any): EstimateStringValue {
  return {
    kind: item["kind"],
    value: item["value"],
  };
}

/**
 * A finite JSON number, never string-encoded. Integer-valued inputs are limited
 * to the exact IEEE 754 safe-integer range. Non-integer inputs have magnitude at
 * most 1000000000 and at most six fractional decimal places. Supported decimal
 * values roundtrip through double-based SDK serialization; binary floating-point
 * arithmetic is not exact decimal arithmetic.
 */
export interface EstimateNumberValue extends EstimateValue {
  /** Number variant discriminator. */
  kind: "number";
  /** Parsed using decimal arithmetic. Integer magnitude must not exceed 9007199254740991; non-integer magnitude must not exceed 1000000000. Excess precision and out-of-range values are rejected, not rounded or coerced. */
  value: number;
}

export function estimateNumberValueSerializer(item: EstimateNumberValue): any {
  return { kind: item["kind"], value: item["value"] };
}

export function estimateNumberValueDeserializer(item: any): EstimateNumberValue {
  return {
    kind: item["kind"],
    value: item["value"],
  };
}

/** A native JSON true or false pricing value. */
export interface EstimateBooleanValue extends EstimateValue {
  /** Boolean variant discriminator. */
  kind: "boolean";
  /** Explicit boolean; omission is distinct from false. */
  value: boolean;
}

export function estimateBooleanValueSerializer(item: EstimateBooleanValue): any {
  return { kind: item["kind"], value: item["value"] };
}

export function estimateBooleanValueDeserializer(item: any): EstimateBooleanValue {
  return {
    kind: item["kind"],
    value: item["value"],
  };
}

/** A complete object represented by allowlisted named typed members. */
export interface EstimateObjectValue extends EstimateValue {
  /** Object variant discriminator. */
  kind: "object";
  /** Unique, case-sensitive member names. Empty members is an explicit empty object, not an omitted input. */
  members: EstimateNamedValue[];
}

export function estimateObjectValueSerializer(item: EstimateObjectValue): any {
  return { kind: item["kind"], members: estimateNamedValueArraySerializer(item["members"]) };
}

export function estimateObjectValueDeserializer(item: any): EstimateObjectValue {
  return {
    kind: item["kind"],
    members: estimateNamedValueArrayDeserializer(item["members"]),
  };
}

/** A complete ordered array; individual elements cannot be supplied through separate paths. */
export interface EstimateArrayValue extends EstimateValue {
  /** Array variant discriminator. */
  kind: "array";
  /** Explicit items, recursively validated. Empty items is distinct from an omitted array. */
  items: EstimateValueUnion[];
}

export function estimateArrayValueSerializer(item: EstimateArrayValue): any {
  return { kind: item["kind"], items: estimateValueUnionArraySerializer(item["items"]) };
}

export function estimateArrayValueDeserializer(item: any): EstimateArrayValue {
  return {
    kind: item["kind"],
    items: estimateValueUnionArrayDeserializer(item["items"]),
  };
}

export function estimateValueUnionArraySerializer(result: Array<EstimateValueUnion>): any[] {
  return result.map((item) => {
    return estimateValueUnionSerializer(item);
  });
}

export function estimateValueUnionArrayDeserializer(result: Array<EstimateValueUnion>): any[] {
  return result.map((item) => {
    return estimateValueUnionDeserializer(item);
  });
}

/**
 * Computed costs for submitted pricing inputs, not an ARM resource or invoice.
 * The serialized UTF-8 HTTP 200 response body must not exceed 4194304 bytes
 * (4 MiB), including JSON property names, escaping and all server-added values.
 * Across the response there are at most 20000 applied typed values, eight
 * object/array levels, 10000 components, 1000 diagnostics, and 20000 combined
 * defaultedFields and assumedUsageFields pointers. Array bounds below are also
 * subject to these request-wide totals. All limits apply together: a result
 * within the count limits can still exceed the byte budget.
 * The service checks completed configurations before pricing and checks result
 * counts and bounded UTF-8 serialization before storing success. Exceeding any
 * result limit fails the whole estimate with HTTP 400 EstimateResultTooLarge,
 * synchronously when known during preparation or as a terminal polling error
 * otherwise. Results, defaults, assumptions and pricing issues are never truncated.
 */
export interface EstimateResult {
  /** Subscription billing currency for every amount; never a caller-selected currency or silent fallback. */
  readonly currency: string;
  /** UTC instant used to select applicable prices. This is not a future price guarantee. */
  readonly pricingAsOf: Date;
  /**
   * Fixed scope marker, not a completeness enum: this operation prices only
   * submitted inputs, never an entire template or deployment. Completeness is
   * reported by each charge period's status. Callers separately track template
   * preparation and coverage gaps.
   */
  readonly coverage: "SubmittedPricingInputs";
  /** Exactly one result per input, in the same order. */
  readonly results: EstimateResourceResult[];
  /** Independent recurring and upfront totals. */
  readonly totals: EstimateTotals;
  /** Request-wide assumptions; never raw input values or customer identifiers. */
  readonly assumptions: EstimateDiagnostic[];
}

export function estimateResultDeserializer(item: any): EstimateResult {
  return {
    currency: item["currency"],
    pricingAsOf: new Date(item["pricingAsOf"]),
    coverage: item["coverage"],
    results: estimateResourceResultArrayDeserializer(item["results"]),
    totals: estimateTotalsDeserializer(item["totals"]),
    assumptions: estimateDiagnosticArrayDeserializer(item["assumptions"]),
  };
}

export function estimateResourceResultArrayDeserializer(
  result: Array<EstimateResourceResult>,
): any[] {
  return result.map((item) => {
    return estimateResourceResultDeserializer(item);
  });
}

/** Cost breakdown and explicit gaps for one input entry. */
export interface EstimateResourceResult {
  /** Zero-based input position; not a customer resource identifier. */
  readonly inputIndex: number;
  /** What the server set or changed in the priced configuration. Absent only when a catalog failure prevented complete validation. */
  readonly configuration?: EstimateEffectiveConfiguration;
  /** Known and unknown recurring costs for this entry. */
  readonly monthly: EstimateCostSummary;
  /** Known and unknown upfront charges, never included in monthly. */
  readonly upfront: EstimateCostSummary;
  /** Component breakdown, including components whose cost could not be determined. */
  readonly components: EstimateComponentResult[];
  /** Reasons for incomplete coverage or costs. Nonempty whenever either summary is incomplete. */
  readonly issues: EstimateDiagnostic[];
  /** Defaults and other assumptions actually applied to this entry. */
  readonly assumptions: EstimateDiagnostic[];
}

export function estimateResourceResultDeserializer(item: any): EstimateResourceResult {
  return {
    inputIndex: item["inputIndex"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : estimateEffectiveConfigurationDeserializer(item["configuration"]),
    monthly: estimateCostSummaryDeserializer(item["monthly"]),
    upfront: estimateCostSummaryDeserializer(item["upfront"]),
    components: estimateComponentResultArrayDeserializer(item["components"]),
    issues: estimateDiagnosticArrayDeserializer(item["issues"]),
    assumptions: estimateDiagnosticArrayDeserializer(item["assumptions"]),
  };
}

/** What the server set or changed when completing one entry's configuration, for display and revision. */
export interface EstimateEffectiveConfiguration {
  /** The supported resource type, in its canonical spelling. */
  readonly resourceType: string;
  /** The supported source resource API version. */
  readonly resourceApiVersion: string;
  /** JSON Pointers of configuration defaults the server applied to omitted inputs. */
  readonly defaultedFields: string[];
  /** JSON Pointers of usage quantities the caller omitted and the server assumed, such as /usage/storedGB. A non-empty list means the price rests on quantities the caller did not state. */
  readonly assumedUsageFields: string[];
  /** Every field the server set or changed: defaulted fields, assumed usage quantities and canonicalized spellings. Every other priced value is exactly what the caller submitted. */
  readonly appliedValues: EstimateAppliedValue[];
}

export function estimateEffectiveConfigurationDeserializer(
  item: any,
): EstimateEffectiveConfiguration {
  return {
    resourceType: item["resourceType"],
    resourceApiVersion: item["resourceApiVersion"],
    defaultedFields: item["defaultedFields"].map((p: any) => {
      return p;
    }),
    assumedUsageFields: item["assumedUsageFields"].map((p: any) => {
      return p;
    }),
    appliedValues: estimateAppliedValueArrayDeserializer(item["appliedValues"]),
  };
}

export function estimateAppliedValueArrayDeserializer(result: Array<EstimateAppliedValue>): any[] {
  return result.map((item) => {
    return estimateAppliedValueDeserializer(item);
  });
}

/** One input value the server set or changed, in the same typed encoding as request inputs. */
export interface EstimateAppliedValue {
  /** JSON Pointer of the field within the decoded resource and usage inputs, such as /usage/accessTier. */
  readonly field: string;
  /** The value the server priced for this field. */
  readonly value: EstimateValueUnion;
}

export function estimateAppliedValueDeserializer(item: any): EstimateAppliedValue {
  return {
    field: item["field"],
    value: estimateValueUnionDeserializer(item["value"]),
  };
}

/**
 * A summary for exactly one charge period. Complete requires amount and forbids
 * knownAmount. Partial requires knownAmount and forbids amount. Unavailable omits
 * both. A known zero is Complete with amount zero; it is never an unknown cost.
 * Partial knownAmount may be zero only when at least one underlying cost is known.
 * Amounts are JSON numbers, not strings. Decimal calculations retain intermediate
 * precision. Component amounts are rounded once to six fractional decimal places,
 * midpoint away from zero; entry and request summaries sum reported components.
 * Every component, entry and request amount or known subtotal is limited to
 * 1000000000 in the billing currency. The service uses checked decimal arithmetic
 * and enforces the ceiling after component rounding and at each aggregation.
 * Individually valid components or entries can exceed the ceiling when aggregated.
 * Arithmetic overflow or a ceiling violation fails the entire operation with
 * HTTP 400 EstimateAmountOutOfRange, including as a terminal polling error when
 * discovered during pricing. Known costs are never clamped, independently
 * re-rounded at aggregate levels, or changed to Unavailable to fit the limit.
 * A rounded-zero amount is not a declaration that the underlying meter is free.
 */
export interface EstimateCostSummary {
  /** Independent completeness of this monthly or upfront summary. */
  readonly status: EstimateCostStatus;
  /** Complete amount only. */
  readonly amount?: number;
  /** Sum of known costs only, not a total or an upper bound. Present only for Partial. */
  readonly knownAmount?: number;
}

export function estimateCostSummaryDeserializer(item: any): EstimateCostSummary {
  return {
    status: item["status"],
    amount: item["amount"],
    knownAmount: item["knownAmount"],
  };
}

/** Completeness of one charge period. Clients must not treat unknown statuses as Complete. */
export enum KnownEstimateCostStatus {
  /** All applicable charges are known, including explicit free or non-applicable charges. */
  Complete = "Complete",
  /** Some applicable charges are known and others are not. */
  Partial = "Partial",
  /** No applicable cost could be determined. */
  Unavailable = "Unavailable",
}

/**
 * Completeness of one charge period. Clients must not treat unknown statuses as Complete. \
 * {@link KnownEstimateCostStatus} can be used interchangeably with EstimateCostStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Complete**: All applicable charges are known, including explicit free or non-applicable charges. \
 * **Partial**: Some applicable charges are known and others are not. \
 * **Unavailable**: No applicable cost could be determined.
 */
export type EstimateCostStatus = string;

export function estimateComponentResultArrayDeserializer(
  result: Array<EstimateComponentResult>,
): any[] {
  return result.map((item) => {
    return estimateComponentResultDeserializer(item);
  });
}

/** A server-defined billable component, such as compute, licensing, disk capacity or bandwidth. */
export interface EstimateComponentResult {
  /** Stable business component name, unique within the entry. */
  readonly component: string;
  /** Resolved internal pricing meter identifiers, distinct from customer resource IDs. Absent when unresolved or not needed. */
  readonly meterIds?: string[];
  /** Component's recurring monthly cost. */
  readonly monthly: EstimateCostSummary;
  /** Component's upfront charge. A known non-applicable charge is Complete with amount zero. */
  readonly upfront: EstimateCostSummary;
}

export function estimateComponentResultDeserializer(item: any): EstimateComponentResult {
  return {
    component: item["component"],
    meterIds: !item["meterIds"]
      ? item["meterIds"]
      : item["meterIds"].map((p: any) => {
          return p;
        }),
    monthly: estimateCostSummaryDeserializer(item["monthly"]),
    upfront: estimateCostSummaryDeserializer(item["upfront"]),
  };
}

export function estimateDiagnosticArrayDeserializer(result: Array<EstimateDiagnostic>): any[] {
  return result.map((item) => {
    return estimateDiagnosticDeserializer(item);
  });
}

/** A safe explanation of a pricing gap or an applied assumption. */
export interface EstimateDiagnostic {
  /** Machine-readable code, such as RateUnavailable, AllowanceContextRequired or InputCanonicalized. */
  readonly code: string;
  /** Explanation without input values, customer information or tokens. */
  readonly message: string;
  /** Optional RFC 6901 request location, using entry positions and business field names only. */
  readonly target?: string;
  /** Affected business component name when the issue is component-specific. */
  readonly component?: string;
}

export function estimateDiagnosticDeserializer(item: any): EstimateDiagnostic {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    component: item["component"],
  };
}

/** Separately aggregated monthly and upfront costs across submitted entries. */
export interface EstimateTotals {
  /** Recurring monthly aggregate; an upfront payment is never included. */
  readonly monthly: EstimateCostSummary;
  /** Upfront aggregate, without amortization. */
  readonly upfront: EstimateCostSummary;
}

export function estimateTotalsDeserializer(item: any): EstimateTotals {
  return {
    monthly: estimateCostSummaryDeserializer(item["monthly"]),
    upfront: estimateCostSummaryDeserializer(item["upfront"]),
  };
}

/** Versions of the price estimation contract. */
export enum KnownVersions {
  /** Public-preview contract for asynchronous price estimation. */
  V20261001Preview = "2026-10-01-preview",
}
