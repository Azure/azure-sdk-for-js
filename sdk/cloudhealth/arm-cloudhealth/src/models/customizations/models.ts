// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  ResourceHealthAvailabilityStateSignalBehavior,
  DiscoveryRuleRelationshipDiscoveryBehavior,
  DiscoveryRuleRecommendedSignalsBehavior,
  discoveryRuleSpecificationUnionSerializer,
  DiscoveryRuleSpecificationUnion,
} from "../microsoft/cloudHealth/models.js";
import { ProxyResource } from "../models.js";

/** Discovery rule resource for create/update operations. */
export interface DiscoveryRuleResourceCreate extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DiscoveryRulePropertiesCreate;
}

export function discoveryRuleResourceCreateSerializer(item: DiscoveryRuleResourceCreate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : discoveryRulePropertiesCreateSerializer(item["properties"]),
  };
}

/** Discovery rule properties for create/update operations, omitting server-side read-only fields (entityName is required+read-only in the canonical model). */
export interface DiscoveryRulePropertiesCreate {
  /** Display name */
  displayName?: string;
  /** Reference to the name of the authentication setting which is used for querying Azure Resource Graph. The same authentication setting will also be assigned to any discovered entities. */
  authenticationSetting: string;
  /** Whether to create relationships between the discovered entities based on a set of built-in rules. These relationships cannot be manually deleted. */
  discoverRelationships: DiscoveryRuleRelationshipDiscoveryBehavior;
  /** Whether to add all recommended signals to the discovered entities. */
  addRecommendedSignals: DiscoveryRuleRecommendedSignalsBehavior;
  /** Specification of the discovery rule defining how entities are discovered. */
  specification: DiscoveryRuleSpecificationUnion;
  /** Whether to automatically add a signal for the Azure resource's availability state from Azure Resource Health to the discovered entities. Defaults to `Enabled`. */
  addResourceHealthSignal?: ResourceHealthAvailabilityStateSignalBehavior;
}

export function discoveryRulePropertiesCreateSerializer(item: DiscoveryRulePropertiesCreate): any {
  return {
    displayName: item["displayName"],
    authenticationSetting: item["authenticationSetting"],
    discoverRelationships: item["discoverRelationships"],
    addRecommendedSignals: item["addRecommendedSignals"],
    specification: discoveryRuleSpecificationUnionSerializer(item["specification"]),
    addResourceHealthSignal: item["addResourceHealthSignal"],
  };
}
