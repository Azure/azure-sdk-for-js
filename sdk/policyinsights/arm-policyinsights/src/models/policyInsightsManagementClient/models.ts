// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** model interface RemediationsListForManagementGroupQueryOptions */
export interface RemediationsListForManagementGroupQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** OData filter expression. */
  filter?: string;
}

export function remediationsListForManagementGroupQueryOptionsSerializer(
  _item: RemediationsListForManagementGroupQueryOptions,
): any {
  return {};
}

/** model interface RemediationsListForSubscriptionQueryOptions */
export interface RemediationsListForSubscriptionQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** OData filter expression. */
  filter?: string;
}

export function remediationsListForSubscriptionQueryOptionsSerializer(
  _item: RemediationsListForSubscriptionQueryOptions,
): any {
  return {};
}

/** model interface RemediationsListDeploymentsAtSubscriptionQueryOptions */
export interface RemediationsListDeploymentsAtSubscriptionQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
}

export function remediationsListDeploymentsAtSubscriptionQueryOptionsSerializer(
  _item: RemediationsListDeploymentsAtSubscriptionQueryOptions,
): any {
  return {};
}

/** model interface RemediationsListForResourceGroupQueryOptions */
export interface RemediationsListForResourceGroupQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** OData filter expression. */
  filter?: string;
}

export function remediationsListForResourceGroupQueryOptionsSerializer(
  _item: RemediationsListForResourceGroupQueryOptions,
): any {
  return {};
}

/** model interface RemediationsListDeploymentsAtResourceGroupQueryOptions */
export interface RemediationsListDeploymentsAtResourceGroupQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
}

export function remediationsListDeploymentsAtResourceGroupQueryOptionsSerializer(
  _item: RemediationsListDeploymentsAtResourceGroupQueryOptions,
): any {
  return {};
}

/** model interface RemediationsListForResourceQueryOptions */
export interface RemediationsListForResourceQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** OData filter expression. */
  filter?: string;
}

export function remediationsListForResourceQueryOptionsSerializer(
  _item: RemediationsListForResourceQueryOptions,
): any {
  return {};
}

/** model interface RemediationsListDeploymentsAtResourceQueryOptions */
export interface RemediationsListDeploymentsAtResourceQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
}

export function remediationsListDeploymentsAtResourceQueryOptionsSerializer(
  _item: RemediationsListDeploymentsAtResourceQueryOptions,
): any {
  return {};
}

/** model interface RemediationsListDeploymentsAtManagementGroupQueryOptions */
export interface RemediationsListDeploymentsAtManagementGroupQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
}

export function remediationsListDeploymentsAtManagementGroupQueryOptionsSerializer(
  _item: RemediationsListDeploymentsAtManagementGroupQueryOptions,
): any {
  return {};
}

/** model interface AttestationsListForSubscriptionQueryOptions */
export interface AttestationsListForSubscriptionQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** OData filter expression. */
  filter?: string;
}

export function attestationsListForSubscriptionQueryOptionsSerializer(
  _item: AttestationsListForSubscriptionQueryOptions,
): any {
  return {};
}

/** model interface AttestationsListForResourceGroupQueryOptions */
export interface AttestationsListForResourceGroupQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** OData filter expression. */
  filter?: string;
}

export function attestationsListForResourceGroupQueryOptionsSerializer(
  _item: AttestationsListForResourceGroupQueryOptions,
): any {
  return {};
}

/** model interface AttestationsListForResourceQueryOptions */
export interface AttestationsListForResourceQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** OData filter expression. */
  filter?: string;
}

export function attestationsListForResourceQueryOptionsSerializer(
  _item: AttestationsListForResourceQueryOptions,
): any {
  return {};
}

/** model interface PolicyMetadataListQueryOptions */
export interface PolicyMetadataListQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
}

export function policyMetadataListQueryOptionsSerializer(
  _item: PolicyMetadataListQueryOptions,
): any {
  return {};
}

/** model interface PolicyEventsListQueryResultsForManagementGroupQueryOptions */
export interface PolicyEventsListQueryResultsForManagementGroupQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** Ordering expression using OData notation. */
  orderBy?: string;
  /** Select expression using OData notation. */
  select?: string;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
  /** OData apply expression for aggregations. */
  apply?: string;
  /** Skiptoken provided if a previous response returned a partial result. */
  skipToken?: string;
}

export function policyEventsListQueryResultsForManagementGroupQueryOptionsSerializer(
  _item: PolicyEventsListQueryResultsForManagementGroupQueryOptions,
): any {
  return {};
}

/** model interface PolicyEventsListQueryResultsForSubscriptionQueryOptions */
export interface PolicyEventsListQueryResultsForSubscriptionQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** Ordering expression using OData notation. */
  orderBy?: string;
  /** Select expression using OData notation. */
  select?: string;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
  /** OData apply expression for aggregations. */
  apply?: string;
  /** Skiptoken provided if a previous response returned a partial result. */
  skipToken?: string;
}

export function policyEventsListQueryResultsForSubscriptionQueryOptionsSerializer(
  _item: PolicyEventsListQueryResultsForSubscriptionQueryOptions,
): any {
  return {};
}

/** model interface PolicyEventsListQueryResultsForResourceGroupQueryOptions */
export interface PolicyEventsListQueryResultsForResourceGroupQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** Ordering expression using OData notation. */
  orderBy?: string;
  /** Select expression using OData notation. */
  select?: string;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
  /** OData apply expression for aggregations. */
  apply?: string;
  /** Skiptoken provided if a previous response returned a partial result. */
  skipToken?: string;
}

export function policyEventsListQueryResultsForResourceGroupQueryOptionsSerializer(
  _item: PolicyEventsListQueryResultsForResourceGroupQueryOptions,
): any {
  return {};
}

/** model interface PolicyEventsListQueryResultsForResourceQueryOptions */
export interface PolicyEventsListQueryResultsForResourceQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** Ordering expression using OData notation. */
  orderBy?: string;
  /** Select expression using OData notation. */
  select?: string;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
  /** OData apply expression for aggregations. */
  apply?: string;
  /** The $expand query parameter. For example, to expand components use $expand=components */
  expand?: string;
  /** Skiptoken provided if a previous response returned a partial result. */
  skipToken?: string;
}

export function policyEventsListQueryResultsForResourceQueryOptionsSerializer(
  _item: PolicyEventsListQueryResultsForResourceQueryOptions,
): any {
  return {};
}

/** model interface PolicyEventsListQueryResultsForPolicySetDefinitionQueryOptions */
export interface PolicyEventsListQueryResultsForPolicySetDefinitionQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** Ordering expression using OData notation. */
  orderBy?: string;
  /** Select expression using OData notation. */
  select?: string;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
  /** OData apply expression for aggregations. */
  apply?: string;
  /** Skiptoken provided if a previous response returned a partial result. */
  skipToken?: string;
}

export function policyEventsListQueryResultsForPolicySetDefinitionQueryOptionsSerializer(
  _item: PolicyEventsListQueryResultsForPolicySetDefinitionQueryOptions,
): any {
  return {};
}

/** model interface PolicyEventsListQueryResultsForPolicyDefinitionQueryOptions */
export interface PolicyEventsListQueryResultsForPolicyDefinitionQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** Ordering expression using OData notation. */
  orderBy?: string;
  /** Select expression using OData notation. */
  select?: string;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
  /** OData apply expression for aggregations. */
  apply?: string;
  /** Skiptoken provided if a previous response returned a partial result. */
  skipToken?: string;
}

export function policyEventsListQueryResultsForPolicyDefinitionQueryOptionsSerializer(
  _item: PolicyEventsListQueryResultsForPolicyDefinitionQueryOptions,
): any {
  return {};
}

/** model interface PolicyEventsListQueryResultsForSubscriptionLevelPolicyAssignmentQueryOptions */
export interface PolicyEventsListQueryResultsForSubscriptionLevelPolicyAssignmentQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** Ordering expression using OData notation. */
  orderBy?: string;
  /** Select expression using OData notation. */
  select?: string;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
  /** OData apply expression for aggregations. */
  apply?: string;
  /** Skiptoken provided if a previous response returned a partial result. */
  skipToken?: string;
}

export function policyEventsListQueryResultsForSubscriptionLevelPolicyAssignmentQueryOptionsSerializer(
  _item: PolicyEventsListQueryResultsForSubscriptionLevelPolicyAssignmentQueryOptions,
): any {
  return {};
}

/** model interface PolicyEventsListQueryResultsForResourceGroupLevelPolicyAssignmentQueryOptions */
export interface PolicyEventsListQueryResultsForResourceGroupLevelPolicyAssignmentQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** Ordering expression using OData notation. */
  orderBy?: string;
  /** Select expression using OData notation. */
  select?: string;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
  /** OData apply expression for aggregations. */
  apply?: string;
  /** Skiptoken provided if a previous response returned a partial result. */
  skipToken?: string;
}

export function policyEventsListQueryResultsForResourceGroupLevelPolicyAssignmentQueryOptionsSerializer(
  _item: PolicyEventsListQueryResultsForResourceGroupLevelPolicyAssignmentQueryOptions,
): any {
  return {};
}

/** model interface PolicyStatesListQueryResultsForManagementGroupQueryOptions */
export interface PolicyStatesListQueryResultsForManagementGroupQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** Ordering expression using OData notation. */
  orderBy?: string;
  /** Select expression using OData notation. */
  select?: string;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
  /** OData apply expression for aggregations. */
  apply?: string;
  /** Skiptoken provided if a previous response returned a partial result. */
  skipToken?: string;
}

export function policyStatesListQueryResultsForManagementGroupQueryOptionsSerializer(
  _item: PolicyStatesListQueryResultsForManagementGroupQueryOptions,
): any {
  return {};
}

/** model interface PolicyStatesSummarizeForManagementGroupQueryOptions */
export interface PolicyStatesSummarizeForManagementGroupQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
}

export function policyStatesSummarizeForManagementGroupQueryOptionsSerializer(
  _item: PolicyStatesSummarizeForManagementGroupQueryOptions,
): any {
  return {};
}

/** model interface PolicyStatesListQueryResultsForSubscriptionQueryOptions */
export interface PolicyStatesListQueryResultsForSubscriptionQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** Ordering expression using OData notation. */
  orderBy?: string;
  /** Select expression using OData notation. */
  select?: string;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
  /** OData apply expression for aggregations. */
  apply?: string;
  /** Skiptoken provided if a previous response returned a partial result. */
  skipToken?: string;
}

export function policyStatesListQueryResultsForSubscriptionQueryOptionsSerializer(
  _item: PolicyStatesListQueryResultsForSubscriptionQueryOptions,
): any {
  return {};
}

/** model interface PolicyStatesSummarizeForSubscriptionQueryOptions */
export interface PolicyStatesSummarizeForSubscriptionQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
}

export function policyStatesSummarizeForSubscriptionQueryOptionsSerializer(
  _item: PolicyStatesSummarizeForSubscriptionQueryOptions,
): any {
  return {};
}

/** model interface PolicyStatesListQueryResultsForResourceGroupQueryOptions */
export interface PolicyStatesListQueryResultsForResourceGroupQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** Ordering expression using OData notation. */
  orderBy?: string;
  /** Select expression using OData notation. */
  select?: string;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
  /** OData apply expression for aggregations. */
  apply?: string;
  /** Skiptoken provided if a previous response returned a partial result. */
  skipToken?: string;
}

export function policyStatesListQueryResultsForResourceGroupQueryOptionsSerializer(
  _item: PolicyStatesListQueryResultsForResourceGroupQueryOptions,
): any {
  return {};
}

/** model interface PolicyStatesSummarizeForResourceGroupQueryOptions */
export interface PolicyStatesSummarizeForResourceGroupQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
}

export function policyStatesSummarizeForResourceGroupQueryOptionsSerializer(
  _item: PolicyStatesSummarizeForResourceGroupQueryOptions,
): any {
  return {};
}

/** model interface PolicyStatesListQueryResultsForResourceQueryOptions */
export interface PolicyStatesListQueryResultsForResourceQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** Ordering expression using OData notation. */
  orderBy?: string;
  /** Select expression using OData notation. */
  select?: string;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
  /** OData apply expression for aggregations. */
  apply?: string;
  /** The $expand query parameter. For example, to expand components use $expand=components */
  expand?: string;
  /** Skiptoken provided if a previous response returned a partial result. */
  skipToken?: string;
}

export function policyStatesListQueryResultsForResourceQueryOptionsSerializer(
  _item: PolicyStatesListQueryResultsForResourceQueryOptions,
): any {
  return {};
}

/** model interface PolicyStatesSummarizeForResourceQueryOptions */
export interface PolicyStatesSummarizeForResourceQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
}

export function policyStatesSummarizeForResourceQueryOptionsSerializer(
  _item: PolicyStatesSummarizeForResourceQueryOptions,
): any {
  return {};
}

/** model interface PolicyStatesListQueryResultsForPolicySetDefinitionQueryOptions */
export interface PolicyStatesListQueryResultsForPolicySetDefinitionQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** Ordering expression using OData notation. */
  orderBy?: string;
  /** Select expression using OData notation. */
  select?: string;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
  /** OData apply expression for aggregations. */
  apply?: string;
  /** Skiptoken provided if a previous response returned a partial result. */
  skipToken?: string;
}

export function policyStatesListQueryResultsForPolicySetDefinitionQueryOptionsSerializer(
  _item: PolicyStatesListQueryResultsForPolicySetDefinitionQueryOptions,
): any {
  return {};
}

/** model interface PolicyStatesSummarizeForPolicySetDefinitionQueryOptions */
export interface PolicyStatesSummarizeForPolicySetDefinitionQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
}

export function policyStatesSummarizeForPolicySetDefinitionQueryOptionsSerializer(
  _item: PolicyStatesSummarizeForPolicySetDefinitionQueryOptions,
): any {
  return {};
}

/** model interface PolicyStatesListQueryResultsForPolicyDefinitionQueryOptions */
export interface PolicyStatesListQueryResultsForPolicyDefinitionQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** Ordering expression using OData notation. */
  orderBy?: string;
  /** Select expression using OData notation. */
  select?: string;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
  /** OData apply expression for aggregations. */
  apply?: string;
  /** Skiptoken provided if a previous response returned a partial result. */
  skipToken?: string;
}

export function policyStatesListQueryResultsForPolicyDefinitionQueryOptionsSerializer(
  _item: PolicyStatesListQueryResultsForPolicyDefinitionQueryOptions,
): any {
  return {};
}

/** model interface PolicyStatesSummarizeForPolicyDefinitionQueryOptions */
export interface PolicyStatesSummarizeForPolicyDefinitionQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
}

export function policyStatesSummarizeForPolicyDefinitionQueryOptionsSerializer(
  _item: PolicyStatesSummarizeForPolicyDefinitionQueryOptions,
): any {
  return {};
}

/** model interface PolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentQueryOptions */
export interface PolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** Ordering expression using OData notation. */
  orderBy?: string;
  /** Select expression using OData notation. */
  select?: string;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
  /** OData apply expression for aggregations. */
  apply?: string;
  /** Skiptoken provided if a previous response returned a partial result. */
  skipToken?: string;
}

export function policyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentQueryOptionsSerializer(
  _item: PolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentQueryOptions,
): any {
  return {};
}

/** model interface PolicyStatesSummarizeForSubscriptionLevelPolicyAssignmentQueryOptions */
export interface PolicyStatesSummarizeForSubscriptionLevelPolicyAssignmentQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
}

export function policyStatesSummarizeForSubscriptionLevelPolicyAssignmentQueryOptionsSerializer(
  _item: PolicyStatesSummarizeForSubscriptionLevelPolicyAssignmentQueryOptions,
): any {
  return {};
}

/** model interface PolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentQueryOptions */
export interface PolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** Ordering expression using OData notation. */
  orderBy?: string;
  /** Select expression using OData notation. */
  select?: string;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
  /** OData apply expression for aggregations. */
  apply?: string;
  /** Skiptoken provided if a previous response returned a partial result. */
  skipToken?: string;
}

export function policyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentQueryOptionsSerializer(
  _item: PolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentQueryOptions,
): any {
  return {};
}

/** model interface PolicyStatesSummarizeForResourceGroupLevelPolicyAssignmentQueryOptions */
export interface PolicyStatesSummarizeForResourceGroupLevelPolicyAssignmentQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** ISO 8601 formatted timestamp specifying the start time of the interval to query. */
  from?: Date;
  /** ISO 8601 formatted timestamp specifying the end time of the interval to query. */
  to?: Date;
  /** OData filter expression. */
  filter?: string;
}

export function policyStatesSummarizeForResourceGroupLevelPolicyAssignmentQueryOptionsSerializer(
  _item: PolicyStatesSummarizeForResourceGroupLevelPolicyAssignmentQueryOptions,
): any {
  return {};
}

/** model interface PolicyTrackedResourcesListQueryResultsForManagementGroupQueryOptions */
export interface PolicyTrackedResourcesListQueryResultsForManagementGroupQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** OData filter expression. */
  filter?: string;
}

export function policyTrackedResourcesListQueryResultsForManagementGroupQueryOptionsSerializer(
  _item: PolicyTrackedResourcesListQueryResultsForManagementGroupQueryOptions,
): any {
  return {};
}

/** model interface PolicyTrackedResourcesListQueryResultsForSubscriptionQueryOptions */
export interface PolicyTrackedResourcesListQueryResultsForSubscriptionQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** OData filter expression. */
  filter?: string;
}

export function policyTrackedResourcesListQueryResultsForSubscriptionQueryOptionsSerializer(
  _item: PolicyTrackedResourcesListQueryResultsForSubscriptionQueryOptions,
): any {
  return {};
}

/** model interface PolicyTrackedResourcesListQueryResultsForResourceGroupQueryOptions */
export interface PolicyTrackedResourcesListQueryResultsForResourceGroupQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** OData filter expression. */
  filter?: string;
}

export function policyTrackedResourcesListQueryResultsForResourceGroupQueryOptionsSerializer(
  _item: PolicyTrackedResourcesListQueryResultsForResourceGroupQueryOptions,
): any {
  return {};
}

/** model interface PolicyTrackedResourcesListQueryResultsForResourceQueryOptions */
export interface PolicyTrackedResourcesListQueryResultsForResourceQueryOptions {
  /** Maximum number of records to return. */
  top?: number;
  /** OData filter expression. */
  filter?: string;
}

export function policyTrackedResourcesListQueryResultsForResourceQueryOptionsSerializer(
  _item: PolicyTrackedResourcesListQueryResultsForResourceQueryOptions,
): any {
  return {};
}
