// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Query results. */
export interface _PolicyTrackedResourcesQueryResults {
  /** The PolicyTrackedResource items on this page */
  readonly value?: PolicyTrackedResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _policyTrackedResourcesQueryResultsDeserializer(
  item: any,
): _PolicyTrackedResourcesQueryResults {
  return {
    value: !item["value"] ? item["value"] : policyTrackedResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function policyTrackedResourceArrayDeserializer(
  result: Array<PolicyTrackedResource>,
): any[] {
  return result.map((item) => {
    return policyTrackedResourceDeserializer(item);
  });
}

/** Policy tracked resource record. */
export interface PolicyTrackedResource {
  /** The ID of the policy tracked resource. */
  readonly trackedResourceId?: string;
  /** The details of the policy that require the tracked resource. */
  readonly policyDetails?: PolicyDetails;
  /** The details of the policy triggered deployment that created the tracked resource. */
  readonly createdBy?: TrackedResourceModificationDetails;
  /** The details of the policy triggered deployment that modified the tracked resource. */
  readonly lastModifiedBy?: TrackedResourceModificationDetails;
  /** Timestamp of the last update to the tracked resource. */
  readonly lastUpdateUtc?: Date;
}

export function policyTrackedResourceDeserializer(item: any): PolicyTrackedResource {
  return {
    trackedResourceId: item["trackedResourceId"],
    policyDetails: !item["policyDetails"]
      ? item["policyDetails"]
      : policyDetailsDeserializer(item["policyDetails"]),
    createdBy: !item["createdBy"]
      ? item["createdBy"]
      : trackedResourceModificationDetailsDeserializer(item["createdBy"]),
    lastModifiedBy: !item["lastModifiedBy"]
      ? item["lastModifiedBy"]
      : trackedResourceModificationDetailsDeserializer(item["lastModifiedBy"]),
    lastUpdateUtc: !item["lastUpdateUtc"] ? item["lastUpdateUtc"] : new Date(item["lastUpdateUtc"]),
  };
}

/** The policy details. */
export interface PolicyDetails {
  /** The ID of the policy definition. */
  readonly policyDefinitionId?: string;
  /** The ID of the policy assignment. */
  readonly policyAssignmentId?: string;
  /** The display name of the policy assignment. */
  readonly policyAssignmentDisplayName?: string;
  /** The scope of the policy assignment. */
  readonly policyAssignmentScope?: string;
  /** The ID of the policy set definition. */
  readonly policySetDefinitionId?: string;
  /** The policy definition reference ID within the policy set definition. */
  readonly policyDefinitionReferenceId?: string;
}

export function policyDetailsDeserializer(item: any): PolicyDetails {
  return {
    policyDefinitionId: item["policyDefinitionId"],
    policyAssignmentId: item["policyAssignmentId"],
    policyAssignmentDisplayName: item["policyAssignmentDisplayName"],
    policyAssignmentScope: item["policyAssignmentScope"],
    policySetDefinitionId: item["policySetDefinitionId"],
    policyDefinitionReferenceId: item["policyDefinitionReferenceId"],
  };
}

/** The details of the policy triggered deployment that created or modified the tracked resource. */
export interface TrackedResourceModificationDetails {
  /** The details of the policy that created or modified the tracked resource. */
  readonly policyDetails?: PolicyDetails;
  /** The ID of the deployment that created or modified the tracked resource. */
  readonly deploymentId?: string;
  /** Timestamp of the deployment that created or modified the tracked resource. */
  readonly deploymentTime?: Date;
}

export function trackedResourceModificationDetailsDeserializer(
  item: any,
): TrackedResourceModificationDetails {
  return {
    policyDetails: !item["policyDetails"]
      ? item["policyDetails"]
      : policyDetailsDeserializer(item["policyDetails"]),
    deploymentId: item["deploymentId"],
    deploymentTime: !item["deploymentTime"]
      ? item["deploymentTime"]
      : new Date(item["deploymentTime"]),
  };
}

/** Known values of {@link PolicyTrackedResourcesResourceType} that the service accepts. */
export enum KnownPolicyTrackedResourcesResourceType {
  /** default */
  Default = "default",
}

/** Type of PolicyTrackedResourcesResourceType */
export type PolicyTrackedResourcesResourceType = string;
