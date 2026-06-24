// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ResourceSyncRulePropertiesSelector } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ResourceSyncRulesListByCustomLocationIDOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ResourceSyncRulesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ResourceSyncRulesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ResourceSyncRulesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ResourceSyncRulesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Priority represents a priority of the Resource Sync Rule */
  priority?: number;
  /** A label selector is composed of two parts, matchLabels and matchExpressions. The first part, matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is 'key', the operator is 'In', and the values array contains only 'value'. The second part, matchExpressions is a list of resource selector requirements. Valid operators include In, NotIn, Exists, and DoesNotExist. The values set must be non-empty in the case of In and NotIn. The values set must be empty in the case of Exists and DoesNotExist. All of the requirements, from both matchLabels and matchExpressions must all be satisfied in order to match. */
  selector?: ResourceSyncRulePropertiesSelector;
  /** For an unmapped custom resource, its labels will be used to find matching resource sync rules. If this resource sync rule is one of the matching rules with highest priority, then the unmapped custom resource will be projected to the target resource group associated with this resource sync rule. The user creating this resource sync rule should have write permissions on the target resource group and this write permission will be validated when creating the resource sync rule. */
  targetResourceGroup?: string;
  /** Resource tags */
  tags?: Record<string, string>;
}
