// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Core Bicep concepts surfaced to the authoring layer.
 *
 * Defines the Bicep type model and {@link PrimitiveTypeMap}, the authoring-side
 * lookup from a Bicep primitive type name to the TypeScript value shape a user
 * may supply.
 */

// TODO: we will need to further abstract the Bicep concept. Try to keep it only in this file
//       tracked by https://github.com/Azure/js-provisioning-lib/issues/344
export type TargetScope = "resourceGroup" | "subscription" | "managementGroup" | "tenant";

export type BinaryOperator =
  | "%"
  | "*"
  | "+"
  | "-"
  | "/"
  | "<"
  | "<="
  | "=="
  | "!="
  | "=~"
  | "!~"
  | ">"
  | ">="
  | "&&"
  | "||"
  | "??";

export type UnaryOperator = "!" | "-";

export type BicepPrimitiveType = "string" | "int" | "bool" | "object" | "array" | "any";

export interface BicepTypeReference {
  readonly kind: "type-reference";
  readonly name: string;
}

export interface BicepNullableType {
  readonly kind: "nullable";
  readonly base: BicepType;
}

export interface BicepArrayType {
  readonly kind: "array";
  readonly item: BicepType;
}

export interface BicepUnionType {
  readonly kind: "union";
  readonly members: readonly BicepType[];
}

export interface BicepObjectTypeProperty {
  readonly name: string;
  readonly type: BicepType;
  readonly optional?: boolean;
}

export interface BicepObjectType {
  readonly kind: "object-type";
  readonly properties: readonly BicepObjectTypeProperty[];
}

export interface BicepResourceType {
  readonly kind: "resource-type";
  readonly typeString: string;
}

export type BicepType =
  | BicepPrimitiveType
  | BicepTypeReference
  | BicepNullableType
  | BicepArrayType
  | BicepUnionType
  | BicepObjectType
  | BicepResourceType;

/**
 * Maps each Bicep primitive type name to the TypeScript value shape a user may
 * pass for it. This is an authoring concern (it feeds `Expression<T>` and the
 * parameter/output value typing), distinct from the serialization `BicepType`
 * model that describes the type's own data shape.
 */
export interface PrimitiveTypeMap {
  string: string;
  int: number;
  bool: boolean;
  object: Record<string, unknown>;
  array: unknown[];
  any: unknown;
}
