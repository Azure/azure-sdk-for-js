// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../../static-helpers/serialization/check-prop-undefined.js";
import type { SystemData, TrackedResource } from "../../models.js";
import { systemDataDeserializer } from "../../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The autoscale setting resource. */
export interface AutoscaleSettingResource extends TrackedResource {
  /** the collection of automatic scaling profiles that specify different scaling parameters for different time periods. A maximum of 20 profiles can be specified. */
  profiles: AutoscaleProfile[];
  /** the collection of notifications. */
  notifications?: AutoscaleNotification[];
  /** the enabled flag. Specifies whether automatic scaling is enabled for the resource. The default value is 'false'. */
  enabled?: boolean;
  /** the predictive autoscale policy mode. */
  predictiveAutoscalePolicy?: PredictiveAutoscalePolicy;
  /** the name of the autoscale setting. */
  namePropertiesName?: string;
  /** the resource identifier of the resource that the autoscale setting should be added to. */
  targetResourceUri?: string;
  /** the location of the resource that the autoscale setting should be added to. */
  targetResourceLocation?: string;
}

export function autoscaleSettingResourceSerializer(item: AutoscaleSettingResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _autoscaleSettingResourcePropertiesSerializer(item),
  };
}

export function autoscaleSettingResourceDeserializer(item: any): AutoscaleSettingResource {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._autoscaleSettingResourcePropertiesDeserializer(item["properties"]),
  };
}

/** A setting that contains all of the configuration for the automatic scaling of a resource. */
export interface AutoscaleSetting {
  /** the collection of automatic scaling profiles that specify different scaling parameters for different time periods. A maximum of 20 profiles can be specified. */
  profiles: AutoscaleProfile[];
  /** the collection of notifications. */
  notifications?: AutoscaleNotification[];
  /** the enabled flag. Specifies whether automatic scaling is enabled for the resource. The default value is 'false'. */
  enabled?: boolean;
  /** the predictive autoscale policy mode. */
  predictiveAutoscalePolicy?: PredictiveAutoscalePolicy;
  /** the name of the autoscale setting. */
  name?: string;
  /** the resource identifier of the resource that the autoscale setting should be added to. */
  targetResourceUri?: string;
  /** the location of the resource that the autoscale setting should be added to. */
  targetResourceLocation?: string;
}

export function autoscaleSettingSerializer(item: AutoscaleSetting): any {
  return {
    profiles: autoscaleProfileArraySerializer(item["profiles"]),
    notifications: !item["notifications"]
      ? item["notifications"]
      : autoscaleNotificationArraySerializer(item["notifications"]),
    enabled: item["enabled"],
    predictiveAutoscalePolicy: !item["predictiveAutoscalePolicy"]
      ? item["predictiveAutoscalePolicy"]
      : predictiveAutoscalePolicySerializer(item["predictiveAutoscalePolicy"]),
    name: item["name"],
    targetResourceUri: item["targetResourceUri"],
    targetResourceLocation: item["targetResourceLocation"],
  };
}

export function autoscaleSettingDeserializer(item: any): AutoscaleSetting {
  return {
    profiles: autoscaleProfileArrayDeserializer(item["profiles"]),
    notifications: !item["notifications"]
      ? item["notifications"]
      : autoscaleNotificationArrayDeserializer(item["notifications"]),
    enabled: item["enabled"],
    predictiveAutoscalePolicy: !item["predictiveAutoscalePolicy"]
      ? item["predictiveAutoscalePolicy"]
      : predictiveAutoscalePolicyDeserializer(item["predictiveAutoscalePolicy"]),
    name: item["name"],
    targetResourceUri: item["targetResourceUri"],
    targetResourceLocation: item["targetResourceLocation"],
  };
}

export function autoscaleProfileArraySerializer(result: Array<AutoscaleProfile>): any[] {
  return result.map((item) => {
    return autoscaleProfileSerializer(item);
  });
}

export function autoscaleProfileArrayDeserializer(result: Array<AutoscaleProfile>): any[] {
  return result.map((item) => {
    return autoscaleProfileDeserializer(item);
  });
}

/** Autoscale profile. */
export interface AutoscaleProfile {
  /** the name of the profile. */
  name: string;
  /** the number of instances that can be used during this profile. */
  capacity: ScaleCapacity;
  /** the collection of rules that provide the triggers and parameters for the scaling action. A maximum of 10 rules can be specified. */
  rules: ScaleRule[];
  /** the specific date-time for the profile. This element is not used if the Recurrence element is used. */
  fixedDate?: TimeWindow;
  /** the repeating times at which this profile begins. This element is not used if the FixedDate element is used. */
  recurrence?: Recurrence;
}

export function autoscaleProfileSerializer(item: AutoscaleProfile): any {
  return {
    name: item["name"],
    capacity: scaleCapacitySerializer(item["capacity"]),
    rules: scaleRuleArraySerializer(item["rules"]),
    fixedDate: !item["fixedDate"] ? item["fixedDate"] : timeWindowSerializer(item["fixedDate"]),
    recurrence: !item["recurrence"] ? item["recurrence"] : recurrenceSerializer(item["recurrence"]),
  };
}

export function autoscaleProfileDeserializer(item: any): AutoscaleProfile {
  return {
    name: item["name"],
    capacity: scaleCapacityDeserializer(item["capacity"]),
    rules: scaleRuleArrayDeserializer(item["rules"]),
    fixedDate: !item["fixedDate"] ? item["fixedDate"] : timeWindowDeserializer(item["fixedDate"]),
    recurrence: !item["recurrence"]
      ? item["recurrence"]
      : recurrenceDeserializer(item["recurrence"]),
  };
}

/** The number of instances that can be used during this profile. */
export interface ScaleCapacity {
  /** the minimum number of instances for the resource. */
  minimum: string;
  /** the maximum number of instances for the resource. The actual maximum number of instances is limited by the cores that are available in the subscription. */
  maximum: string;
  /** the number of instances that will be set if metrics are not available for evaluation. The default is only used if the current instance count is lower than the default. */
  default: string;
}

export function scaleCapacitySerializer(item: ScaleCapacity): any {
  return { minimum: item["minimum"], maximum: item["maximum"], default: item["default"] };
}

export function scaleCapacityDeserializer(item: any): ScaleCapacity {
  return {
    minimum: item["minimum"],
    maximum: item["maximum"],
    default: item["default"],
  };
}

export function scaleRuleArraySerializer(result: Array<ScaleRule>): any[] {
  return result.map((item) => {
    return scaleRuleSerializer(item);
  });
}

export function scaleRuleArrayDeserializer(result: Array<ScaleRule>): any[] {
  return result.map((item) => {
    return scaleRuleDeserializer(item);
  });
}

/** A rule that provide the triggers and parameters for the scaling action. */
export interface ScaleRule {
  /** the trigger that results in a scaling action. */
  metricTrigger: MetricTrigger;
  /** the parameters for the scaling action. */
  scaleAction: ScaleAction;
}

export function scaleRuleSerializer(item: ScaleRule): any {
  return {
    metricTrigger: metricTriggerSerializer(item["metricTrigger"]),
    scaleAction: scaleActionSerializer(item["scaleAction"]),
  };
}

export function scaleRuleDeserializer(item: any): ScaleRule {
  return {
    metricTrigger: metricTriggerDeserializer(item["metricTrigger"]),
    scaleAction: scaleActionDeserializer(item["scaleAction"]),
  };
}

/** The trigger that results in a scaling action. */
export interface MetricTrigger {
  /** the name of the metric that defines what the rule monitors. */
  metricName: string;
  /** the namespace of the metric that defines what the rule monitors. */
  metricNamespace?: string;
  /** the resource identifier of the resource the rule monitors. */
  metricResourceUri: string;
  /** the location of the resource the rule monitors. */
  metricResourceLocation?: string;
  /** the granularity of metrics the rule monitors. Must be one of the predefined values returned from metric definitions for the metric. Must be between 12 hours and 1 minute. */
  timeGrain: string;
  /** the metric statistic type. How the metrics from multiple instances are combined. */
  statistic: MetricStatisticType;
  /** the range of time in which instance data is collected. This value must be greater than the delay in metric collection, which can vary from resource-to-resource. Must be between 12 hours and 5 minutes. */
  timeWindow: string;
  /** time aggregation type. How the data that is collected should be combined over time. The default value is Average. */
  timeAggregation: TimeAggregationType;
  /** the operator that is used to compare the metric data and the threshold. */
  operator: ComparisonOperationType;
  /** the threshold of the metric that triggers the scale action. */
  threshold: number;
  /** List of dimension conditions. For example: [{"DimensionName":"AppName","Operator":"Equals","Values":["App1"]},{"DimensionName":"Deployment","Operator":"Equals","Values":["default"]}]. */
  dimensions?: ScaleRuleMetricDimension[];
  /** a value indicating whether metric should divide per instance. */
  dividePerInstance?: boolean;
}

export function metricTriggerSerializer(item: MetricTrigger): any {
  return {
    metricName: item["metricName"],
    metricNamespace: item["metricNamespace"],
    metricResourceUri: item["metricResourceUri"],
    metricResourceLocation: item["metricResourceLocation"],
    timeGrain: item["timeGrain"],
    statistic: item["statistic"],
    timeWindow: item["timeWindow"],
    timeAggregation: item["timeAggregation"],
    operator: item["operator"],
    threshold: item["threshold"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : scaleRuleMetricDimensionArraySerializer(item["dimensions"]),
    dividePerInstance: item["dividePerInstance"],
  };
}

export function metricTriggerDeserializer(item: any): MetricTrigger {
  return {
    metricName: item["metricName"],
    metricNamespace: item["metricNamespace"],
    metricResourceUri: item["metricResourceUri"],
    metricResourceLocation: item["metricResourceLocation"],
    timeGrain: item["timeGrain"],
    statistic: item["statistic"],
    timeWindow: item["timeWindow"],
    timeAggregation: item["timeAggregation"],
    operator: item["operator"],
    threshold: item["threshold"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : scaleRuleMetricDimensionArrayDeserializer(item["dimensions"]),
    dividePerInstance: item["dividePerInstance"],
  };
}

/** the metric statistic type. How the metrics from multiple instances are combined. */
export type MetricStatisticType = "Average" | "Min" | "Max" | "Sum" | "Count";
/** time aggregation type. How the data that is collected should be combined over time. The default value is Average. */
export type TimeAggregationType = "Average" | "Minimum" | "Maximum" | "Total" | "Count" | "Last";
/** the operator that is used to compare the metric data and the threshold. */
export type ComparisonOperationType =
  | "Equals"
  | "NotEquals"
  | "GreaterThan"
  | "GreaterThanOrEqual"
  | "LessThan"
  | "LessThanOrEqual";

export function scaleRuleMetricDimensionArraySerializer(
  result: Array<ScaleRuleMetricDimension>,
): any[] {
  return result.map((item) => {
    return scaleRuleMetricDimensionSerializer(item);
  });
}

export function scaleRuleMetricDimensionArrayDeserializer(
  result: Array<ScaleRuleMetricDimension>,
): any[] {
  return result.map((item) => {
    return scaleRuleMetricDimensionDeserializer(item);
  });
}

/** Specifies an auto scale rule metric dimension. */
export interface ScaleRuleMetricDimension {
  /** Name of the dimension. */
  dimensionName: string;
  /** the dimension operator. Only 'Equals' and 'NotEquals' are supported. 'Equals' being equal to any of the values. 'NotEquals' being not equal to all of the values */
  operator: ScaleRuleMetricDimensionOperationType;
  /** list of dimension values. For example: ["App1","App2"]. */
  values: string[];
}

export function scaleRuleMetricDimensionSerializer(item: ScaleRuleMetricDimension): any {
  return {
    DimensionName: item["dimensionName"],
    Operator: item["operator"],
    Values: item["values"].map((p: any) => {
      return p;
    }),
  };
}

export function scaleRuleMetricDimensionDeserializer(item: any): ScaleRuleMetricDimension {
  return {
    dimensionName: item["DimensionName"],
    operator: item["Operator"],
    values: item["Values"].map((p: any) => {
      return p;
    }),
  };
}

/** the dimension operator. Only 'Equals' and 'NotEquals' are supported. 'Equals' being equal to any of the values. 'NotEquals' being not equal to all of the values */
export enum KnownScaleRuleMetricDimensionOperationType {
  /** Equals */
  Equals = "Equals",
  /** NotEquals */
  NotEquals = "NotEquals",
}

/**
 * the dimension operator. Only 'Equals' and 'NotEquals' are supported. 'Equals' being equal to any of the values. 'NotEquals' being not equal to all of the values \
 * {@link KnownScaleRuleMetricDimensionOperationType} can be used interchangeably with ScaleRuleMetricDimensionOperationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Equals**: Equals \
 * **NotEquals**: NotEquals
 */
export type ScaleRuleMetricDimensionOperationType = string;

/** The parameters for the scaling action. */
export interface ScaleAction {
  /** the scale direction. Whether the scaling action increases or decreases the number of instances. */
  direction: ScaleDirection;
  /** the type of action that should occur when the scale rule fires. */
  type: ScaleType;
  /** the number of instances that are involved in the scaling action. This value must be 1 or greater. The default value is 1. */
  value?: string;
  /** the amount of time to wait since the last scaling action before this action occurs. It must be between 1 week and 1 minute in ISO 8601 format. */
  cooldown: string;
}

export function scaleActionSerializer(item: ScaleAction): any {
  return {
    direction: item["direction"],
    type: item["type"],
    value: item["value"],
    cooldown: item["cooldown"],
  };
}

export function scaleActionDeserializer(item: any): ScaleAction {
  return {
    direction: item["direction"],
    type: item["type"],
    value: item["value"],
    cooldown: item["cooldown"],
  };
}

/** the scale direction. Whether the scaling action increases or decreases the number of instances. */
export type ScaleDirection = "None" | "Increase" | "Decrease";
/** the type of action that should occur when the scale rule fires. */
export type ScaleType =
  | "ChangeCount"
  | "PercentChangeCount"
  | "ExactCount"
  | "ServiceAllowedNextValue";

/** A specific date-time for the profile. */
export interface TimeWindow {
  /** the timezone of the start and end times for the profile. Some examples of valid time zones are: Dateline Standard Time, UTC-11, Hawaiian Standard Time, Alaskan Standard Time, Pacific Standard Time (Mexico), Pacific Standard Time, US Mountain Standard Time, Mountain Standard Time (Mexico), Mountain Standard Time, Central America Standard Time, Central Standard Time, Central Standard Time (Mexico), Canada Central Standard Time, SA Pacific Standard Time, Eastern Standard Time, US Eastern Standard Time, Venezuela Standard Time, Paraguay Standard Time, Atlantic Standard Time, Central Brazilian Standard Time, SA Western Standard Time, Pacific SA Standard Time, Newfoundland Standard Time, E. South America Standard Time, Argentina Standard Time, SA Eastern Standard Time, Greenland Standard Time, Montevideo Standard Time, Bahia Standard Time, UTC-02, Mid-Atlantic Standard Time, Azores Standard Time, Cape Verde Standard Time, Morocco Standard Time, UTC, GMT Standard Time, Greenwich Standard Time, W. Europe Standard Time, Central Europe Standard Time, Romance Standard Time, Central European Standard Time, W. Central Africa Standard Time, Namibia Standard Time, Jordan Standard Time, GTB Standard Time, Middle East Standard Time, Egypt Standard Time, Syria Standard Time, E. Europe Standard Time, South Africa Standard Time, FLE Standard Time, Turkey Standard Time, Israel Standard Time, Kaliningrad Standard Time, Libya Standard Time, Arabic Standard Time, Arab Standard Time, Belarus Standard Time, Russian Standard Time, E. Africa Standard Time, Iran Standard Time, Arabian Standard Time, Azerbaijan Standard Time, Russia Time Zone 3, Mauritius Standard Time, Georgian Standard Time, Caucasus Standard Time, Afghanistan Standard Time, West Asia Standard Time, Ekaterinburg Standard Time, Pakistan Standard Time, India Standard Time, Sri Lanka Standard Time, Nepal Standard Time, Central Asia Standard Time, Bangladesh Standard Time, N. Central Asia Standard Time, Myanmar Standard Time, SE Asia Standard Time, North Asia Standard Time, China Standard Time, North Asia East Standard Time, Singapore Standard Time, W. Australia Standard Time, Taipei Standard Time, Ulaanbaatar Standard Time, Tokyo Standard Time, Korea Standard Time, Yakutsk Standard Time, Cen. Australia Standard Time, AUS Central Standard Time, E. Australia Standard Time, AUS Eastern Standard Time, West Pacific Standard Time, Tasmania Standard Time, Magadan Standard Time, Vladivostok Standard Time, Russia Time Zone 10, Central Pacific Standard Time, Russia Time Zone 11, New Zealand Standard Time, UTC+12, Fiji Standard Time, Kamchatka Standard Time, Tonga Standard Time, Samoa Standard Time, Line Islands Standard Time */
  timeZone?: string;
  /** the start time for the profile in ISO 8601 format. */
  start: Date;
  /** the end time for the profile in ISO 8601 format. */
  end: Date;
}

export function timeWindowSerializer(item: TimeWindow): any {
  return {
    timeZone: item["timeZone"],
    start: item["start"].toISOString(),
    end: item["end"].toISOString(),
  };
}

export function timeWindowDeserializer(item: any): TimeWindow {
  return {
    timeZone: item["timeZone"],
    start: new Date(item["start"]),
    end: new Date(item["end"]),
  };
}

/** The repeating times at which this profile begins. This element is not used if the FixedDate element is used. */
export interface Recurrence {
  /** the recurrence frequency. How often the schedule profile should take effect. This value must be Week, meaning each week will have the same set of profiles. For example, to set a daily schedule, set **schedule** to every day of the week. The frequency property specifies that the schedule is repeated weekly. */
  frequency: RecurrenceFrequency;
  /** the scheduling constraints for when the profile begins. */
  schedule: RecurrentSchedule;
}

export function recurrenceSerializer(item: Recurrence): any {
  return { frequency: item["frequency"], schedule: recurrentScheduleSerializer(item["schedule"]) };
}

export function recurrenceDeserializer(item: any): Recurrence {
  return {
    frequency: item["frequency"],
    schedule: recurrentScheduleDeserializer(item["schedule"]),
  };
}

/** the recurrence frequency. How often the schedule profile should take effect. This value must be Week, meaning each week will have the same set of profiles. For example, to set a daily schedule, set **schedule** to every day of the week. The frequency property specifies that the schedule is repeated weekly. */
export type RecurrenceFrequency =
  | "None"
  | "Second"
  | "Minute"
  | "Hour"
  | "Day"
  | "Week"
  | "Month"
  | "Year";

/** The scheduling constraints for when the profile begins. */
export interface RecurrentSchedule {
  /** the timezone for the hours of the profile. Some examples of valid time zones are: Dateline Standard Time, UTC-11, Hawaiian Standard Time, Alaskan Standard Time, Pacific Standard Time (Mexico), Pacific Standard Time, US Mountain Standard Time, Mountain Standard Time (Mexico), Mountain Standard Time, Central America Standard Time, Central Standard Time, Central Standard Time (Mexico), Canada Central Standard Time, SA Pacific Standard Time, Eastern Standard Time, US Eastern Standard Time, Venezuela Standard Time, Paraguay Standard Time, Atlantic Standard Time, Central Brazilian Standard Time, SA Western Standard Time, Pacific SA Standard Time, Newfoundland Standard Time, E. South America Standard Time, Argentina Standard Time, SA Eastern Standard Time, Greenland Standard Time, Montevideo Standard Time, Bahia Standard Time, UTC-02, Mid-Atlantic Standard Time, Azores Standard Time, Cape Verde Standard Time, Morocco Standard Time, UTC, GMT Standard Time, Greenwich Standard Time, W. Europe Standard Time, Central Europe Standard Time, Romance Standard Time, Central European Standard Time, W. Central Africa Standard Time, Namibia Standard Time, Jordan Standard Time, GTB Standard Time, Middle East Standard Time, Egypt Standard Time, Syria Standard Time, E. Europe Standard Time, South Africa Standard Time, FLE Standard Time, Turkey Standard Time, Israel Standard Time, Kaliningrad Standard Time, Libya Standard Time, Arabic Standard Time, Arab Standard Time, Belarus Standard Time, Russian Standard Time, E. Africa Standard Time, Iran Standard Time, Arabian Standard Time, Azerbaijan Standard Time, Russia Time Zone 3, Mauritius Standard Time, Georgian Standard Time, Caucasus Standard Time, Afghanistan Standard Time, West Asia Standard Time, Ekaterinburg Standard Time, Pakistan Standard Time, India Standard Time, Sri Lanka Standard Time, Nepal Standard Time, Central Asia Standard Time, Bangladesh Standard Time, N. Central Asia Standard Time, Myanmar Standard Time, SE Asia Standard Time, North Asia Standard Time, China Standard Time, North Asia East Standard Time, Singapore Standard Time, W. Australia Standard Time, Taipei Standard Time, Ulaanbaatar Standard Time, Tokyo Standard Time, Korea Standard Time, Yakutsk Standard Time, Cen. Australia Standard Time, AUS Central Standard Time, E. Australia Standard Time, AUS Eastern Standard Time, West Pacific Standard Time, Tasmania Standard Time, Magadan Standard Time, Vladivostok Standard Time, Russia Time Zone 10, Central Pacific Standard Time, Russia Time Zone 11, New Zealand Standard Time, UTC+12, Fiji Standard Time, Kamchatka Standard Time, Tonga Standard Time, Samoa Standard Time, Line Islands Standard Time */
  timeZone: string;
  /** the collection of days that the profile takes effect on. Possible values are Sunday through Saturday. */
  days: string[];
  /** A collection of hours that the profile takes effect on. Values supported are 0 to 23 on the 24-hour clock (AM/PM times are not supported). */
  hours: number[];
  /** A collection of minutes at which the profile takes effect at. */
  minutes: number[];
}

export function recurrentScheduleSerializer(item: RecurrentSchedule): any {
  return {
    timeZone: item["timeZone"],
    days: item["days"].map((p: any) => {
      return p;
    }),
    hours: item["hours"].map((p: any) => {
      return p;
    }),
    minutes: item["minutes"].map((p: any) => {
      return p;
    }),
  };
}

export function recurrentScheduleDeserializer(item: any): RecurrentSchedule {
  return {
    timeZone: item["timeZone"],
    days: item["days"].map((p: any) => {
      return p;
    }),
    hours: item["hours"].map((p: any) => {
      return p;
    }),
    minutes: item["minutes"].map((p: any) => {
      return p;
    }),
  };
}

export function autoscaleNotificationArraySerializer(result: Array<AutoscaleNotification>): any[] {
  return result.map((item) => {
    return autoscaleNotificationSerializer(item);
  });
}

export function autoscaleNotificationArrayDeserializer(
  result: Array<AutoscaleNotification>,
): any[] {
  return result.map((item) => {
    return autoscaleNotificationDeserializer(item);
  });
}

/** Autoscale notification. */
export interface AutoscaleNotification {
  /** the operation associated with the notification and its value must be "scale" */
  operation: OperationType;
  /** the email notification. */
  email?: EmailNotification;
  /** the collection of webhook notifications. */
  webhooks?: WebhookNotification[];
}

export function autoscaleNotificationSerializer(item: AutoscaleNotification): any {
  return {
    operation: item["operation"],
    email: !item["email"] ? item["email"] : emailNotificationSerializer(item["email"]),
    webhooks: !item["webhooks"]
      ? item["webhooks"]
      : webhookNotificationArraySerializer(item["webhooks"]),
  };
}

export function autoscaleNotificationDeserializer(item: any): AutoscaleNotification {
  return {
    operation: item["operation"],
    email: !item["email"] ? item["email"] : emailNotificationDeserializer(item["email"]),
    webhooks: !item["webhooks"]
      ? item["webhooks"]
      : webhookNotificationArrayDeserializer(item["webhooks"]),
  };
}

/** Type of OperationType */
export type OperationType = "Scale";

/** Email notification of an autoscale event. */
export interface EmailNotification {
  /** a value indicating whether to send email to subscription administrator. */
  sendToSubscriptionAdministrator?: boolean;
  /** a value indicating whether to send email to subscription co-administrators. */
  sendToSubscriptionCoAdministrators?: boolean;
  /** the custom e-mails list. This value can be null or empty, in which case this attribute will be ignored. */
  customEmails?: string[];
}

export function emailNotificationSerializer(item: EmailNotification): any {
  return {
    sendToSubscriptionAdministrator: item["sendToSubscriptionAdministrator"],
    sendToSubscriptionCoAdministrators: item["sendToSubscriptionCoAdministrators"],
    customEmails: !item["customEmails"]
      ? item["customEmails"]
      : item["customEmails"].map((p: any) => {
          return p;
        }),
  };
}

export function emailNotificationDeserializer(item: any): EmailNotification {
  return {
    sendToSubscriptionAdministrator: item["sendToSubscriptionAdministrator"],
    sendToSubscriptionCoAdministrators: item["sendToSubscriptionCoAdministrators"],
    customEmails: !item["customEmails"]
      ? item["customEmails"]
      : item["customEmails"].map((p: any) => {
          return p;
        }),
  };
}

export function webhookNotificationArraySerializer(result: Array<WebhookNotification>): any[] {
  return result.map((item) => {
    return webhookNotificationSerializer(item);
  });
}

export function webhookNotificationArrayDeserializer(result: Array<WebhookNotification>): any[] {
  return result.map((item) => {
    return webhookNotificationDeserializer(item);
  });
}

/** Webhook notification of an autoscale event. */
export interface WebhookNotification {
  /** the service address to receive the notification. */
  serviceUri?: string;
  /** a property bag of settings. This value can be empty. */
  properties?: Record<string, string>;
}

export function webhookNotificationSerializer(item: WebhookNotification): any {
  return { serviceUri: item["serviceUri"], properties: item["properties"] };
}

export function webhookNotificationDeserializer(item: any): WebhookNotification {
  return {
    serviceUri: item["serviceUri"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** The parameters for enabling predictive autoscale. */
export interface PredictiveAutoscalePolicy {
  /** the predictive autoscale mode */
  scaleMode: PredictiveAutoscalePolicyScaleMode;
  /** the amount of time to specify by which instances are launched in advance. It must be between 1 minute and 60 minutes in ISO 8601 format. */
  scaleLookAheadTime?: string;
}

export function predictiveAutoscalePolicySerializer(item: PredictiveAutoscalePolicy): any {
  return { scaleMode: item["scaleMode"], scaleLookAheadTime: item["scaleLookAheadTime"] };
}

export function predictiveAutoscalePolicyDeserializer(item: any): PredictiveAutoscalePolicy {
  return {
    scaleMode: item["scaleMode"],
    scaleLookAheadTime: item["scaleLookAheadTime"],
  };
}

/** the predictive autoscale mode */
export type PredictiveAutoscalePolicyScaleMode = "Disabled" | "ForecastOnly" | "Enabled";

/** Describes the format of Error response. */
export interface AutoscaleErrorResponse {
  /** The error object. */
  error?: AutoscaleErrorResponseError;
  /** The system metadata related to the response. */
  readonly systemData?: SystemData;
}

export function autoscaleErrorResponseDeserializer(item: any): AutoscaleErrorResponse {
  return {
    error: !item["error"] ? item["error"] : autoscaleErrorResponseErrorDeserializer(item["error"]),
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** The error object. */
export interface AutoscaleErrorResponseError {
  /** One of a server-defined set of error codes. */
  code?: string;
  /** A human-readable representation of the error. */
  message?: string;
  /** The target of the particular error. */
  target?: string;
  /** A human-readable representation of the error's details. */
  details?: string;
}

export function autoscaleErrorResponseErrorDeserializer(item: any): AutoscaleErrorResponseError {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: item["details"],
  };
}

/** The autoscale setting object for patch operations. */
export interface AutoscaleSettingResourcePatch {
  /** Resource tags */
  tags?: Record<string, string>;
  /** the collection of automatic scaling profiles that specify different scaling parameters for different time periods. A maximum of 20 profiles can be specified. */
  profiles?: AutoscaleProfile[];
  /** the collection of notifications. */
  notifications?: AutoscaleNotification[];
  /** the enabled flag. Specifies whether automatic scaling is enabled for the resource. The default value is 'false'. */
  enabled?: boolean;
  /** the predictive autoscale policy mode. */
  predictiveAutoscalePolicy?: PredictiveAutoscalePolicy;
  /** the name of the autoscale setting. */
  name?: string;
  /** the resource identifier of the resource that the autoscale setting should be added to. */
  targetResourceUri?: string;
  /** the location of the resource that the autoscale setting should be added to. */
  targetResourceLocation?: string;
}

export function autoscaleSettingResourcePatchSerializer(item: AutoscaleSettingResourcePatch): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "profiles",
      "notifications",
      "enabled",
      "predictiveAutoscalePolicy",
      "name",
      "targetResourceUri",
      "targetResourceLocation",
    ])
      ? undefined
      : _autoscaleSettingResourcePatchPropertiesSerializer(item),
  };
}

/** Represents a collection of autoscale setting resources. */
export interface _AutoscaleSettingResourceCollection {
  /** The AutoscaleSettingResource items on this page */
  value: AutoscaleSettingResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _autoscaleSettingResourceCollectionDeserializer(
  item: any,
): _AutoscaleSettingResourceCollection {
  return {
    value: autoscaleSettingResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function autoscaleSettingResourceArraySerializer(
  result: Array<AutoscaleSettingResource>,
): any[] {
  return result.map((item) => {
    return autoscaleSettingResourceSerializer(item);
  });
}

export function autoscaleSettingResourceArrayDeserializer(
  result: Array<AutoscaleSettingResource>,
): any[] {
  return result.map((item) => {
    return autoscaleSettingResourceDeserializer(item);
  });
}

/** The response to a metrics query. */
export interface PredictiveResponse {
  /** The timespan for which the data was retrieved. Its value consists of two datetimes concatenated, separated by '/'.  This may be adjusted in the future and returned back from what was originally requested. */
  timespan?: string;
  /** The interval (window size) for which the metric data was returned in.  This may be adjusted in the future and returned back from what was originally requested.  This is not present if a metadata request was made. */
  interval?: string;
  /** The metrics being queried */
  metricName?: string;
  /** resource of the predictive metric. */
  targetResourceId?: string;
  /** the value of the collection. */
  data?: PredictiveValue[];
}

export function predictiveResponseDeserializer(item: any): PredictiveResponse {
  return {
    timespan: item["timespan"],
    interval: item["interval"],
    metricName: item["metricName"],
    targetResourceId: item["targetResourceId"],
    data: !item["data"] ? item["data"] : predictiveValueArrayDeserializer(item["data"]),
  };
}

export function predictiveValueArrayDeserializer(result: Array<PredictiveValue>): any[] {
  return result.map((item) => {
    return predictiveValueDeserializer(item);
  });
}

/** Represents a predictive metric value in the given bucket. */
export interface PredictiveValue {
  /** the timestamp for the metric value in ISO 8601 format. */
  timeStamp: Date;
  /** Predictive value in this time bucket. */
  value: number;
}

export function predictiveValueDeserializer(item: any): PredictiveValue {
  return {
    timeStamp: new Date(item["timeStamp"]),
    value: item["value"],
  };
}

export function _autoscaleSettingResourcePropertiesSerializer(item: AutoscaleSettingResource): any {
  return {
    profiles: autoscaleProfileArraySerializer(item["profiles"]),
    notifications: !item["notifications"]
      ? item["notifications"]
      : autoscaleNotificationArraySerializer(item["notifications"]),
    enabled: item["enabled"],
    predictiveAutoscalePolicy: !item["predictiveAutoscalePolicy"]
      ? item["predictiveAutoscalePolicy"]
      : predictiveAutoscalePolicySerializer(item["predictiveAutoscalePolicy"]),
    name: item["namePropertiesName"],
    targetResourceUri: item["targetResourceUri"],
    targetResourceLocation: item["targetResourceLocation"],
  };
}

export function _autoscaleSettingResourcePropertiesDeserializer(item: any) {
  return {
    profiles: autoscaleProfileArrayDeserializer(item["profiles"]),
    notifications: !item["notifications"]
      ? item["notifications"]
      : autoscaleNotificationArrayDeserializer(item["notifications"]),
    enabled: item["enabled"],
    predictiveAutoscalePolicy: !item["predictiveAutoscalePolicy"]
      ? item["predictiveAutoscalePolicy"]
      : predictiveAutoscalePolicyDeserializer(item["predictiveAutoscalePolicy"]),
    namePropertiesName: item["name"],
    targetResourceUri: item["targetResourceUri"],
    targetResourceLocation: item["targetResourceLocation"],
  };
}

export function _autoscaleSettingResourcePatchPropertiesSerializer(
  item: AutoscaleSettingResourcePatch,
): any {
  return {
    profiles: !item["profiles"]
      ? item["profiles"]
      : autoscaleProfileArraySerializer(item["profiles"]),
    notifications: !item["notifications"]
      ? item["notifications"]
      : autoscaleNotificationArraySerializer(item["notifications"]),
    enabled: item["enabled"],
    predictiveAutoscalePolicy: !item["predictiveAutoscalePolicy"]
      ? item["predictiveAutoscalePolicy"]
      : predictiveAutoscalePolicySerializer(item["predictiveAutoscalePolicy"]),
    name: item["name"],
    targetResourceUri: item["targetResourceUri"],
    targetResourceLocation: item["targetResourceLocation"],
  };
}

export function _autoscaleSettingResourcePatchPropertiesDeserializer(item: any) {
  return {
    profiles: !item["profiles"]
      ? item["profiles"]
      : autoscaleProfileArrayDeserializer(item["profiles"]),
    notifications: !item["notifications"]
      ? item["notifications"]
      : autoscaleNotificationArrayDeserializer(item["notifications"]),
    enabled: item["enabled"],
    predictiveAutoscalePolicy: !item["predictiveAutoscalePolicy"]
      ? item["predictiveAutoscalePolicy"]
      : predictiveAutoscalePolicyDeserializer(item["predictiveAutoscalePolicy"]),
    name: item["name"],
    targetResourceUri: item["targetResourceUri"],
    targetResourceLocation: item["targetResourceLocation"],
  };
}
