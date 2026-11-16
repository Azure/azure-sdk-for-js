// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { TolerationOperator, TaintEffect } from "../../core/v1/models.js";
import type { LabelSelector, LabelSelectorPatch } from "../../meta/v1/models.js";
import {
  labelSelectorSerializer,
  labelSelectorDeserializer,
  labelSelectorPatchSerializer,
} from "../../meta/v1/models.js";

/** ClusterResourcePlacementSpec defines the desired state of ClusterResourcePlacement. */
export interface ClusterResourcePlacementSpec {
  /** Policy defines how to select member clusters to place the selected resources. If unspecified, all the joined member clusters are selected. */
  policy?: PlacementPolicy;
  /** The rollout strategy configuration for the cluster resource placement. */
  rolloutStrategy?: RolloutStrategy;
}

export function clusterResourcePlacementSpecSerializer(item: ClusterResourcePlacementSpec): any {
  return {
    policy: !item["policy"] ? item["policy"] : placementPolicySerializer(item["policy"]),
    rolloutStrategy: !item["rolloutStrategy"]
      ? item["rolloutStrategy"]
      : rolloutStrategySerializer(item["rolloutStrategy"]),
  };
}

export function clusterResourcePlacementSpecDeserializer(item: any): ClusterResourcePlacementSpec {
  return {
    policy: !item["policy"] ? item["policy"] : placementPolicyDeserializer(item["policy"]),
    rolloutStrategy: !item["rolloutStrategy"]
      ? item["rolloutStrategy"]
      : rolloutStrategyDeserializer(item["rolloutStrategy"]),
  };
}

/** PlacementPolicy contains the rules to select target member clusters to place the selected resources. Note that only clusters that are both joined and satisfying the rules will be selected. You can only specify at most one of the two fields: ClusterNames and Affinity. If none is specified, all the joined clusters are selected. */
export interface PlacementPolicy {
  /** Type of placement. Can be "PickAll", "PickN" or "PickFixed". Default is PickAll. */
  placementType?: PlacementType;
  /** ClusterNames contains a list of names of MemberCluster to place the selected resources. Only valid if the placement type is "PickFixed" */
  clusterNames?: string[];
  /** Affinity contains cluster affinity scheduling rules. Defines which member clusters to place the selected resources. Only valid if the placement type is "PickAll" or "PickN". */
  affinity?: Affinity;
  /** If specified, the ClusterResourcePlacement's Tolerations. Tolerations cannot be updated or deleted. This field is beta-level and is for the taints and tolerations feature. */
  tolerations?: Toleration[];
}

export function placementPolicySerializer(item: PlacementPolicy): any {
  return {
    placementType: item["placementType"],
    clusterNames: !item["clusterNames"]
      ? item["clusterNames"]
      : item["clusterNames"].map((p: any) => {
          return p;
        }),
    affinity: !item["affinity"] ? item["affinity"] : affinitySerializer(item["affinity"]),
    tolerations: !item["tolerations"]
      ? item["tolerations"]
      : tolerationArraySerializer(item["tolerations"]),
  };
}

export function placementPolicyDeserializer(item: any): PlacementPolicy {
  return {
    placementType: item["placementType"],
    clusterNames: !item["clusterNames"]
      ? item["clusterNames"]
      : item["clusterNames"].map((p: any) => {
          return p;
        }),
    affinity: !item["affinity"] ? item["affinity"] : affinityDeserializer(item["affinity"]),
    tolerations: !item["tolerations"]
      ? item["tolerations"]
      : tolerationArrayDeserializer(item["tolerations"]),
  };
}

/** PlacementType identifies the type of placement. */
export enum KnownPlacementType {
  /** PickAll picks all clusters that satisfy the rules. */
  PickAll = "PickAll",
  /** PickFixed picks a fixed set of clusters. */
  PickFixed = "PickFixed",
}

/**
 * PlacementType identifies the type of placement. \
 * {@link KnownPlacementType} can be used interchangeably with PlacementType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PickAll**: PickAll picks all clusters that satisfy the rules. \
 * **PickFixed**: PickFixed picks a fixed set of clusters.
 */
export type PlacementType = string;

/** Affinity is a group of cluster affinity scheduling rules. More to be added. */
export interface Affinity {
  /** ClusterAffinity contains cluster affinity scheduling rules for the selected resources. */
  clusterAffinity?: ClusterAffinity;
}

export function affinitySerializer(item: Affinity): any {
  return {
    clusterAffinity: !item["clusterAffinity"]
      ? item["clusterAffinity"]
      : clusterAffinitySerializer(item["clusterAffinity"]),
  };
}

export function affinityDeserializer(item: any): Affinity {
  return {
    clusterAffinity: !item["clusterAffinity"]
      ? item["clusterAffinity"]
      : clusterAffinityDeserializer(item["clusterAffinity"]),
  };
}

/** ClusterAffinity contains cluster affinity scheduling rules for the selected resources. */
export interface ClusterAffinity {
  /** If the affinity requirements specified by this field are not met at scheduling time, the resource will not be scheduled onto the cluster. If the affinity requirements specified by this field cease to be met at some point after the placement (e.g. due to an update), the system may or may not try to eventually remove the resource from the cluster. */
  requiredDuringSchedulingIgnoredDuringExecution?: ClusterSelector;
}

export function clusterAffinitySerializer(item: ClusterAffinity): any {
  return {
    requiredDuringSchedulingIgnoredDuringExecution: !item[
      "requiredDuringSchedulingIgnoredDuringExecution"
    ]
      ? item["requiredDuringSchedulingIgnoredDuringExecution"]
      : clusterSelectorSerializer(item["requiredDuringSchedulingIgnoredDuringExecution"]),
  };
}

export function clusterAffinityDeserializer(item: any): ClusterAffinity {
  return {
    requiredDuringSchedulingIgnoredDuringExecution: !item[
      "requiredDuringSchedulingIgnoredDuringExecution"
    ]
      ? item["requiredDuringSchedulingIgnoredDuringExecution"]
      : clusterSelectorDeserializer(item["requiredDuringSchedulingIgnoredDuringExecution"]),
  };
}

/** ClusterSelector */
export interface ClusterSelector {
  /** ClusterSelectorTerms is a list of cluster selector terms. The terms are `ORed`. */
  clusterSelectorTerms: ClusterSelectorTerm[];
}

export function clusterSelectorSerializer(item: ClusterSelector): any {
  return { clusterSelectorTerms: clusterSelectorTermArraySerializer(item["clusterSelectorTerms"]) };
}

export function clusterSelectorDeserializer(item: any): ClusterSelector {
  return {
    clusterSelectorTerms: clusterSelectorTermArrayDeserializer(item["clusterSelectorTerms"]),
  };
}

export function clusterSelectorTermArraySerializer(result: Array<ClusterSelectorTerm>): any[] {
  return result.map((item) => {
    return clusterSelectorTermSerializer(item);
  });
}

export function clusterSelectorTermArrayDeserializer(result: Array<ClusterSelectorTerm>): any[] {
  return result.map((item) => {
    return clusterSelectorTermDeserializer(item);
  });
}

/** ClusterSelectorTerm */
export interface ClusterSelectorTerm {
  /** LabelSelector is a label query over all the joined member clusters. Clusters matching the query are selected. If you specify both label and property selectors in the same term, the results are AND'd. */
  labelSelector?: LabelSelector;
  /** PropertySelector is a property query over all joined member clusters. Clusters matching the query are selected. If you specify both label and property selectors in the same term, the results are AND'd. At this moment, PropertySelector can only be used with `RequiredDuringSchedulingIgnoredDuringExecution` affinity terms. This field is beta-level; it is for the property-based scheduling feature and is only functional when a property provider is enabled in the deployment. */
  propertySelector?: PropertySelector;
}

export function clusterSelectorTermSerializer(item: ClusterSelectorTerm): any {
  return {
    labelSelector: !item["labelSelector"]
      ? item["labelSelector"]
      : labelSelectorSerializer(item["labelSelector"]),
    propertySelector: !item["propertySelector"]
      ? item["propertySelector"]
      : propertySelectorSerializer(item["propertySelector"]),
  };
}

export function clusterSelectorTermDeserializer(item: any): ClusterSelectorTerm {
  return {
    labelSelector: !item["labelSelector"]
      ? item["labelSelector"]
      : labelSelectorDeserializer(item["labelSelector"]),
    propertySelector: !item["propertySelector"]
      ? item["propertySelector"]
      : propertySelectorDeserializer(item["propertySelector"]),
  };
}

/** PropertySelector helps user specify property requirements when picking clusters for resource placement. */
export interface PropertySelector {
  /** MatchExpressions is an array of PropertySelectorRequirements. The requirements are AND'd. */
  matchExpressions: PropertySelectorRequirement[];
}

export function propertySelectorSerializer(item: PropertySelector): any {
  return { matchExpressions: propertySelectorRequirementArraySerializer(item["matchExpressions"]) };
}

export function propertySelectorDeserializer(item: any): PropertySelector {
  return {
    matchExpressions: propertySelectorRequirementArrayDeserializer(item["matchExpressions"]),
  };
}

export function propertySelectorRequirementArraySerializer(
  result: Array<PropertySelectorRequirement>,
): any[] {
  return result.map((item) => {
    return propertySelectorRequirementSerializer(item);
  });
}

export function propertySelectorRequirementArrayDeserializer(
  result: Array<PropertySelectorRequirement>,
): any[] {
  return result.map((item) => {
    return propertySelectorRequirementDeserializer(item);
  });
}

/** PropertySelectorRequirement is a specific property requirement when picking clusters for resource placement. */
export interface PropertySelectorRequirement {
  /** Name is the name of the property; it should be a Kubernetes label name. */
  name: string;
  /** Operator specifies the relationship between a cluster's observed value of the specified property and the values given in the requirement. */
  operator: PropertySelectorOperator;
  /** Values are a list of values of the specified property which Fleet will compare against the observed values of individual member clusters in accordance with the given operator. At this moment, each value should be a Kubernetes quantity. For more information, see https://pkg.go.dev/k8s.io/apimachinery/pkg/api/resource#Quantity. If the operator is Gt (greater than), Ge (greater than or equal to), Lt (less than), or `Le` (less than or equal to), Eq (equal to), or Ne (ne), exactly one value must be specified in the list. */
  values: string[];
}

export function propertySelectorRequirementSerializer(item: PropertySelectorRequirement): any {
  return {
    name: item["name"],
    operator: item["operator"],
    values: item["values"].map((p: any) => {
      return p;
    }),
  };
}

export function propertySelectorRequirementDeserializer(item: any): PropertySelectorRequirement {
  return {
    name: item["name"],
    operator: item["operator"],
    values: item["values"].map((p: any) => {
      return p;
    }),
  };
}

/** PropertySelectorOperator is the operator that can be used with PropertySelectorRequirements. */
export enum KnownPropertySelectorOperator {
  /** Gt dictates Fleet to select cluster if its observed value of a given property is greater than the value specified in the requirement. */
  Gt = "Gt",
  /** Ge dictates Fleet to select cluster if its observed value of a given property is greater than or equal to the value specified in the requirement. */
  Ge = "Ge",
  /** Eq dictates Fleet to select cluster if its observed value of a given property is equal to the values specified in the requirement. */
  Eq = "Eq",
  /** Ne dictates Fleet to select cluster if its observed value of a given property is not equal to the values specified in the requirement. */
  Ne = "Ne",
  /** Lt dictates Fleet to select cluster if its observed value of a given property is less than the value specified in the requirement. */
  Lt = "Lt",
  /** Le dictates Fleet to select cluster if its observed value of a given property is less than or equal to the value specified in the requirement. */
  Le = "Le",
}

/**
 * PropertySelectorOperator is the operator that can be used with PropertySelectorRequirements. \
 * {@link KnownPropertySelectorOperator} can be used interchangeably with PropertySelectorOperator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Gt**: Gt dictates Fleet to select cluster if its observed value of a given property is greater than the value specified in the requirement. \
 * **Ge**: Ge dictates Fleet to select cluster if its observed value of a given property is greater than or equal to the value specified in the requirement. \
 * **Eq**: Eq dictates Fleet to select cluster if its observed value of a given property is equal to the values specified in the requirement. \
 * **Ne**: Ne dictates Fleet to select cluster if its observed value of a given property is not equal to the values specified in the requirement. \
 * **Lt**: Lt dictates Fleet to select cluster if its observed value of a given property is less than the value specified in the requirement. \
 * **Le**: Le dictates Fleet to select cluster if its observed value of a given property is less than or equal to the value specified in the requirement.
 */
export type PropertySelectorOperator = string;

export function tolerationArraySerializer(result: Array<Toleration>): any[] {
  return result.map((item) => {
    return tolerationSerializer(item);
  });
}

export function tolerationArrayDeserializer(result: Array<Toleration>): any[] {
  return result.map((item) => {
    return tolerationDeserializer(item);
  });
}

/** Toleration allows ClusterResourcePlacement to tolerate any taint that matches the triple <key,value,effect> using the matching operator <operator>. */
export interface Toleration {
  /** Key is the taint key that the toleration applies to. Empty means match all taint keys. If the key is empty, operator must be Exists; this combination means to match all values and all keys. */
  key?: string;
  /** Operator represents a key's relationship to the value. Valid operators are Exists and Equal. Defaults to Equal. Exists is equivalent to wildcard for value, so that a ClusterResourcePlacement can tolerate all taints of a particular category. */
  operator?: TolerationOperator;
  /** Value is the taint value the toleration matches to. If the operator is Exists, the value should be empty, otherwise just a regular string. */
  value?: string;
  /** Effect indicates the taint effect to match. Empty means match all taint effects. When specified, only allowed value is NoSchedule. */
  effect?: TaintEffect;
}

export function tolerationSerializer(item: Toleration): any {
  return {
    key: item["key"],
    operator: item["operator"],
    value: item["value"],
    effect: item["effect"],
  };
}

export function tolerationDeserializer(item: any): Toleration {
  return {
    key: item["key"],
    operator: item["operator"],
    value: item["value"],
    effect: item["effect"],
  };
}

/** The rollout strategy configuration. */
export interface RolloutStrategy {
  /** The type of rollout strategy. Default is RollingUpdate. */
  type?: RolloutStrategyType;
  /** Reference to an existing cluster update strategy. Required when type is External. */
  clusterUpdateStrategy?: ClusterUpdateStrategyReference;
}

export function rolloutStrategySerializer(item: RolloutStrategy): any {
  return {
    type: item["type"],
    clusterUpdateStrategy: !item["clusterUpdateStrategy"]
      ? item["clusterUpdateStrategy"]
      : clusterUpdateStrategyReferenceSerializer(item["clusterUpdateStrategy"]),
  };
}

export function rolloutStrategyDeserializer(item: any): RolloutStrategy {
  return {
    type: item["type"],
    clusterUpdateStrategy: !item["clusterUpdateStrategy"]
      ? item["clusterUpdateStrategy"]
      : clusterUpdateStrategyReferenceDeserializer(item["clusterUpdateStrategy"]),
  };
}

/** The possible rollout strategy types. */
export enum KnownRolloutStrategyType {
  /** Use rolling update strategy for rollout. */
  RollingUpdate = "RollingUpdate",
  /** Use external rollout strategy via Staged Update Run. */
  External = "External",
}

/**
 * The possible rollout strategy types. \
 * {@link KnownRolloutStrategyType} can be used interchangeably with RolloutStrategyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **RollingUpdate**: Use rolling update strategy for rollout. \
 * **External**: Use external rollout strategy via Staged Update Run.
 */
export type RolloutStrategyType = string;

/** A reference to an existing cluster staged update strategy. */
export interface ClusterUpdateStrategyReference {
  /** The name of an existing cluster staged update strategy. */
  name?: string;
}

export function clusterUpdateStrategyReferenceSerializer(
  item: ClusterUpdateStrategyReference,
): any {
  return { name: item["name"] };
}

export function clusterUpdateStrategyReferenceDeserializer(
  item: any,
): ClusterUpdateStrategyReference {
  return {
    name: item["name"],
  };
}

/** The ClusterResourcePlacement settings that can be patched. */
export interface ClusterResourcePlacementSpecPatch {
  /** The placement policy that can be patched. */
  policy?: PlacementPolicyPatch;
  /** The rollout strategy configuration that can be patched. */
  rolloutStrategy?: RolloutStrategy;
}

export function clusterResourcePlacementSpecPatchSerializer(
  item: ClusterResourcePlacementSpecPatch,
): any {
  return {
    policy: !item["policy"] ? item["policy"] : placementPolicyPatchSerializer(item["policy"]),
    rolloutStrategy: !item["rolloutStrategy"]
      ? item["rolloutStrategy"]
      : rolloutStrategySerializer(item["rolloutStrategy"]),
  };
}

/** The placement policy settings that can be patched. */
export interface PlacementPolicyPatch {
  /** The placement type that can be patched. */
  placementType?: PlacementType;
  /** The member cluster names that can be patched. */
  clusterNames?: string[];
  /** The cluster affinity settings that can be patched. */
  affinity?: AffinityPatch;
  /** The tolerations that can be patched. */
  tolerations?: Toleration[];
}

export function placementPolicyPatchSerializer(item: PlacementPolicyPatch): any {
  return {
    placementType: item["placementType"],
    clusterNames: !item["clusterNames"]
      ? item["clusterNames"]
      : item["clusterNames"].map((p: any) => {
          return p;
        }),
    affinity: !item["affinity"] ? item["affinity"] : affinityPatchSerializer(item["affinity"]),
    tolerations: !item["tolerations"]
      ? item["tolerations"]
      : tolerationArraySerializer(item["tolerations"]),
  };
}

/** The affinity settings that can be patched. */
export interface AffinityPatch {
  /** The cluster affinity settings that can be patched. */
  clusterAffinity?: ClusterAffinityPatch;
}

export function affinityPatchSerializer(item: AffinityPatch): any {
  return {
    clusterAffinity: !item["clusterAffinity"]
      ? item["clusterAffinity"]
      : clusterAffinityPatchSerializer(item["clusterAffinity"]),
  };
}

/** The cluster affinity rules that can be patched. */
export interface ClusterAffinityPatch {
  /** The required cluster selector that can be patched. */
  requiredDuringSchedulingIgnoredDuringExecution?: ClusterSelectorPatch;
}

export function clusterAffinityPatchSerializer(item: ClusterAffinityPatch): any {
  return {
    requiredDuringSchedulingIgnoredDuringExecution: !item[
      "requiredDuringSchedulingIgnoredDuringExecution"
    ]
      ? item["requiredDuringSchedulingIgnoredDuringExecution"]
      : clusterSelectorPatchSerializer(item["requiredDuringSchedulingIgnoredDuringExecution"]),
  };
}

/** The cluster selector settings that can be patched. */
export interface ClusterSelectorPatch {
  /** The cluster selector terms that can be patched. */
  clusterSelectorTerms?: ClusterSelectorTermPatch[];
}

export function clusterSelectorPatchSerializer(item: ClusterSelectorPatch): any {
  return {
    clusterSelectorTerms: !item["clusterSelectorTerms"]
      ? item["clusterSelectorTerms"]
      : clusterSelectorTermPatchArraySerializer(item["clusterSelectorTerms"]),
  };
}

export function clusterSelectorTermPatchArraySerializer(
  result: Array<ClusterSelectorTermPatch>,
): any[] {
  return result.map((item) => {
    return clusterSelectorTermPatchSerializer(item);
  });
}

/** A cluster selector term that can be patched. */
export interface ClusterSelectorTermPatch {
  /** The label selector that can be patched. */
  labelSelector?: LabelSelectorPatch;
  /** The property selector that can be patched. */
  propertySelector?: PropertySelectorPatch;
}

export function clusterSelectorTermPatchSerializer(item: ClusterSelectorTermPatch): any {
  return {
    labelSelector: !item["labelSelector"]
      ? item["labelSelector"]
      : labelSelectorPatchSerializer(item["labelSelector"]),
    propertySelector: !item["propertySelector"]
      ? item["propertySelector"]
      : propertySelectorPatchSerializer(item["propertySelector"]),
  };
}

/** The property selector settings that can be patched. */
export interface PropertySelectorPatch {
  /** The property selector requirements that can be patched. */
  matchExpressions?: PropertySelectorRequirementPatch[];
}

export function propertySelectorPatchSerializer(item: PropertySelectorPatch): any {
  return {
    matchExpressions: !item["matchExpressions"]
      ? item["matchExpressions"]
      : propertySelectorRequirementPatchArraySerializer(item["matchExpressions"]),
  };
}

export function propertySelectorRequirementPatchArraySerializer(
  result: Array<PropertySelectorRequirementPatch>,
): any[] {
  return result.map((item) => {
    return propertySelectorRequirementPatchSerializer(item);
  });
}

/** A property selector requirement that can be patched. */
export interface PropertySelectorRequirementPatch {
  /** The property name that can be patched. */
  name?: string;
  /** The property selector operator that can be patched. */
  operator?: PropertySelectorOperator;
  /** The property values that can be patched. */
  values?: string[];
}

export function propertySelectorRequirementPatchSerializer(
  item: PropertySelectorRequirementPatch,
): any {
  return {
    name: item["name"],
    operator: item["operator"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}
