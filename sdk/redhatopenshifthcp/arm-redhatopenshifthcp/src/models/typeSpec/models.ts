// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { NodePoolVersionProfile, NodePoolAutoScaling, Label, Taint } from "../models.js";
import {
  nodePoolVersionProfileSerializer,
  nodePoolAutoScalingSerializer,
  labelArraySerializer,
  taintArraySerializer,
} from "../models.js";

/** The template for adding updateable properties. */
export interface UpdateablePropertiesNodePoolProperties {
  /** OpenShift version for the nodepool */
  version?: NodePoolVersionProfile;
  /**
   * The number of worker nodes, it cannot be used together with autoscaling.
   * Validation:
   * - Minimum: 0
   * - Maximum: 200 (only when availabilityZone is not specified)
   * - No maximum when availabilityZone is specified
   */
  replicas?: number;
  /** Representation of a autoscaling in a node pool. */
  autoScaling?: NodePoolAutoScaling;
  /**
   * Kubernetes labels to propagate to the NodePool Nodes.
   * Note that when the labels are updated this is only applied to newly
   * created nodes in the NodePool, existing node labels remain unchanged.
   */
  labels?: Label[];
  /** Taints for the nodes. */
  taints?: Taint[];
  /**
   * nodeDrainTimeoutMinutes is the grace period for how long Pod Disruption Budget-protected workloads will be
   * respected during any node draining operation. After this grace period, any workloads protected by Pod Disruption
   * Budgets that have not been successfully drained from a node will be forcibly evicted. This is
   * especially relevant to cluster upgrades.
   *
   * Valid values are from 0 to 10080 minutes (1 week) .
   * 0 means that the NodePool can be drained without any time limitation.
   *
   * If unset the cluster nodeDrainTimeoutMinutes value is used as a default.
   */
  nodeDrainTimeoutMinutes?: number;
}

export function updateablePropertiesNodePoolPropertiesSerializer(
  item: UpdateablePropertiesNodePoolProperties,
): any {
  return {
    version: !item["version"] ? item["version"] : nodePoolVersionProfileSerializer(item["version"]),
    replicas: item["replicas"],
    autoScaling: !item["autoScaling"]
      ? item["autoScaling"]
      : nodePoolAutoScalingSerializer(item["autoScaling"]),
    labels: !item["labels"] ? item["labels"] : labelArraySerializer(item["labels"]),
    taints: !item["taints"] ? item["taints"] : taintArraySerializer(item["taints"]),
    nodeDrainTimeoutMinutes: item["nodeDrainTimeoutMinutes"],
  };
}
