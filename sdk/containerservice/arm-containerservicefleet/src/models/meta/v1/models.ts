// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/** A label selector is a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. An empty label selector matches all objects. A null label selector matches no objects. */
export interface LabelSelector {
  /** matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed. */
  matchLabels?: Record<string, string>;
  /** matchExpressions is a list of label selector requirements. The requirements are ANDed. */
  matchExpressions?: LabelSelectorRequirement[];
}

export function labelSelectorSerializer(item: LabelSelector): any {
  return {
    matchLabels: item["matchLabels"],
    matchExpressions: !item["matchExpressions"]
      ? item["matchExpressions"]
      : labelSelectorRequirementArraySerializer(item["matchExpressions"]),
  };
}

export function labelSelectorDeserializer(item: any): LabelSelector {
  return {
    matchLabels: !item["matchLabels"]
      ? item["matchLabels"]
      : Object.fromEntries(
          Object.entries(item["matchLabels"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    matchExpressions: !item["matchExpressions"]
      ? item["matchExpressions"]
      : labelSelectorRequirementArrayDeserializer(item["matchExpressions"]),
  };
}

export function labelSelectorRequirementArraySerializer(
  result: Array<LabelSelectorRequirement>,
): any[] {
  return result.map((item) => {
    return labelSelectorRequirementSerializer(item);
  });
}

export function labelSelectorRequirementArrayDeserializer(
  result: Array<LabelSelectorRequirement>,
): any[] {
  return result.map((item) => {
    return labelSelectorRequirementDeserializer(item);
  });
}

/** A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values. */
export interface LabelSelectorRequirement {
  /** key is the label key that the selector applies to. */
  key: string;
  /** operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist. */
  operator: LabelSelectorOperator;
  /** values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch. */
  values?: string[];
}

export function labelSelectorRequirementSerializer(item: LabelSelectorRequirement): any {
  return {
    key: item["key"],
    operator: item["operator"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

export function labelSelectorRequirementDeserializer(item: any): LabelSelectorRequirement {
  return {
    key: item["key"],
    operator: item["operator"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** A label selector operator is the set of operators that can be used in a selector requirement. */
export enum KnownLabelSelectorOperator {
  /** Label Selector Operator In */
  In = "In",
  /** Label Selector Operator NotIn */
  NotIn = "NotIn",
  /** Label Selector Operator Exists */
  Exists = "Exists",
  /** Label Selector Operator DoesNotExist */
  DoesNotExist = "DoesNotExist",
}

/**
 * A label selector operator is the set of operators that can be used in a selector requirement. \
 * {@link KnownLabelSelectorOperator} can be used interchangeably with LabelSelectorOperator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **In**: Label Selector Operator In \
 * **NotIn**: Label Selector Operator NotIn \
 * **Exists**: Label Selector Operator Exists \
 * **DoesNotExist**: Label Selector Operator DoesNotExist
 */
export type LabelSelectorOperator = string;

/** The label selector settings that can be patched. */
export interface LabelSelectorPatch {
  /** matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed. */
  matchLabels?: Record<string, string>;
  /** The label selector requirements that can be patched. */
  matchExpressions?: LabelSelectorRequirementPatch[];
}

export function labelSelectorPatchSerializer(item: LabelSelectorPatch): any {
  return {
    matchLabels: item["matchLabels"],
    matchExpressions: !item["matchExpressions"]
      ? item["matchExpressions"]
      : labelSelectorRequirementPatchArraySerializer(item["matchExpressions"]),
  };
}

export function labelSelectorRequirementPatchArraySerializer(
  result: Array<LabelSelectorRequirementPatch>,
): any[] {
  return result.map((item) => {
    return labelSelectorRequirementPatchSerializer(item);
  });
}

/** A label selector requirement that can be patched. */
export interface LabelSelectorRequirementPatch {
  /** key is the label key that the selector applies to. */
  key?: string;
  /** operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist. */
  operator?: LabelSelectorOperator;
  /** values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch. */
  values?: string[];
}

export function labelSelectorRequirementPatchSerializer(item: LabelSelectorRequirementPatch): any {
  return {
    key: item["key"],
    operator: item["operator"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}
