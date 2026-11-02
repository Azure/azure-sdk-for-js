// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * The deployment scope for a Bicep file.
 */
export type TargetScope = "resourceGroup" | "subscription" | "managementGroup" | "tenant";

/**
 * The set of Bicep primitive type names.
 */
export type PrimitiveTypeName = "any" | "array" | "bool" | "int" | "object" | "string";

/**
 * Binary operators supported in Bicep expressions.
 */
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

/**
 * Unary operators supported in Bicep expressions.
 */
export type UnaryOperator = "!" | "-";

/**
 * Discriminated union of all expression node types.
 * This includes all ValueNode variants plus expression-specific variants.
 */
export type ExpressionNode =
  | NullValue
  | BooleanValue
  | IntegerValue
  | StringValue
  | ArrayValue
  | ObjectValue
  | IdentifierExpression
  | FunctionCallExpression
  | InstanceFunctionCallExpression
  | PropertyAccessExpression
  | ArrayAccessExpression
  | BinaryOperationExpression
  | UnaryOperationExpression
  | TernaryOperationExpression
  | IfConditionExpression
  | ForExpression
  | InterpolatedStringExpression;

/**
 * Discriminated union of all type node kinds.
 */
export type TypeNode =
  | PrimitiveTypeNode
  | TypeReferenceNode
  | StringTypeLiteralNode
  | IntegerTypeLiteralNode
  | BooleanTypeLiteralNode
  | NullTypeLiteralNode
  | ArrayTypeNode
  | ObjectTypePropertyNode
  | ObjectTypeAdditionalPropertiesNode
  | ObjectTypeNode
  | UnionTypeMemberNode
  | UnionTypeNode
  | NullableTypeNode
  | ParameterizedTypeArgumentNode
  | ParameterizedTypeInstantiationNode;

/**
 * An object body, optionally guarded by an `if` or produced by a `for`.
 */
export type DeclarableBodyNode = ObjectValue | IfConditionExpression | ForExpression;

/**
 * Maps each Bicep primitive type name to its TypeScript authoring value type.
 *
 * Generated from TypeSpec and emitter mappings. Do not edit.
 */
export interface PrimitiveTypeMap {
  readonly any: unknown;
  readonly array: readonly unknown[];
  readonly bool: boolean;
  readonly int: number;
  readonly object: Record<string, unknown>;
  readonly string: string;
}

/**
 * Runtime lookup for PrimitiveTypeName values.
 *
 * Generated from TypeSpec. Do not edit.
 */
export const primitiveTypeNames: Readonly<Record<PrimitiveTypeName, true>> = {
  any: true,
  array: true,
  bool: true,
  int: true,
  object: true,
  string: true,
};

/**
 * Checks whether a string is a PrimitiveTypeName value. Generated from
 * TypeSpec. Do not edit.
 */
export function isPrimitiveTypeName(value: string): value is PrimitiveTypeName {
  return Object.hasOwn(primitiveTypeNames, value);
}

/**
 * Represents a single infrastructure unit in the serialization output.
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface InfraNode {
  /**
   * The relative file path/name (e.g. "main.bicep", "modules/storage.bicep").
   */
  readonly fileName: string;
  /**
   * The deployment target scope. Defaults to "resourceGroup" if omitted.
   */
  readonly targetScope?: TargetScope;
  /**
   * Parameter declarations, keyed by Bicep identifier.
   */
  readonly parameters?: Record<string, ParameterDeclarationNode>;
  /**
   * Variable declarations, keyed by Bicep identifier.
   */
  readonly variables?: Record<string, VariableDeclarationNode>;
  /**
   * Output declarations, keyed by Bicep identifier.
   */
  readonly outputs?: Record<string, OutputDeclarationNode>;
  /**
   * Resource declarations, keyed by Bicep identifier.
   */
  readonly resources?: Record<string, ResourceDeclarationNode>;
  /**
   * Module declarations, keyed by Bicep identifier.
   */
  readonly modules?: Record<string, ModuleDeclarationNode>;
}

/**
 * A Bicep parameter declaration.
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface ParameterDeclarationNode {
  readonly bicepIdentifier: string;
  readonly valueType: TypeNode;
  readonly defaultValue?: ExpressionNode;
  readonly decorators?: DecoratorsNode;
}

/**
 * A built-in primitive type (e.g. `string`, `int`, `bool`).
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface PrimitiveTypeNode {
  readonly kind: "primitive-type";
  readonly name: PrimitiveTypeName;
}

/**
 * A reference to a named/user-defined type.
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface TypeReferenceNode {
  readonly kind: "type-reference";
  readonly name: string;
}

/**
 * A string literal used as a type (e.g. `'Standard_GRS'`).
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface StringTypeLiteralNode {
  readonly kind: "string-type-literal";
  readonly value: string;
}

/**
 * An integer literal used as a type.
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface IntegerTypeLiteralNode {
  readonly kind: "integer-type-literal";
  readonly value: string;
}

/**
 * A boolean literal used as a type.
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface BooleanTypeLiteralNode {
  readonly kind: "boolean-type-literal";
  readonly value: boolean;
}

/**
 * A null literal used as a type.
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface NullTypeLiteralNode {
  readonly kind: "null-type-literal";
  readonly value: null;
}

/**
 * An array type (e.g. `string[]`).
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface ArrayTypeNode {
  readonly kind: "array-type";
  readonly item: TypeNode;
}

/**
 * A property within an object type definition.
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface ObjectTypePropertyNode {
  readonly kind: "object-type-property";
  readonly key: string;
  readonly valueType: TypeNode;
  readonly optional?: boolean;
  readonly decorators?: DecoratorsNode;
}

/**
 * Decorator metadata that can be applied to declarations and type properties.
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface DecoratorsNode {
  readonly description?: string;
  readonly secure?: true;
  readonly minValue?: number;
  readonly maxValue?: number;
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly metadata?: Record<string, ExpressionNode>;
  readonly allowed?: readonly ExpressionNode[];
  readonly discriminator?: string;
  readonly sealed?: true;
  readonly export?: true;
  readonly batchSize?: number;
}

/**
 * A null literal value.
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface NullValue {
  readonly kind: "null";
  readonly value: null;
}

/**
 * A boolean literal value.
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface BooleanValue {
  readonly kind: "boolean";
  readonly value: boolean;
}

/**
 * An integer literal value.
 * Stored as a string to preserve 64-bit integer fidelity.
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface IntegerValue {
  readonly kind: "integer";
  readonly value: string;
}

/**
 * A string literal value.
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface StringValue {
  readonly kind: "string";
  readonly value: string;
}

/**
 * An array of expression nodes.
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface ArrayValue {
  readonly kind: "array";
  readonly items: readonly ExpressionNode[];
}

/**
 * An object with named expression node properties.
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface ObjectValue {
  readonly kind: "object";
  readonly value: Record<string, ExpressionNode>;
}

/**
 * A reference to a named identifier (variable, parameter, resource, etc.).
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface IdentifierExpression {
  readonly kind: "identifier";
  readonly id: string;
}

/**
 * A top-level function call (e.g. `toLower(...)`, `concat(...)`).
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface FunctionCallExpression {
  readonly kind: "function-call";
  /**
   * Function name or an expression that resolves to a callable.
   */
  readonly target: string | ExpressionNode;
  readonly args: readonly ExpressionNode[];
}

/**
 * An instance method call (e.g. `base.method(...)`).
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface InstanceFunctionCallExpression {
  readonly kind: "instance-function-call";
  readonly base: ExpressionNode;
  readonly name: string;
  readonly args: readonly ExpressionNode[];
}

/**
 * Property access on an expression (e.g. `base.property` or `base.?property`).
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface PropertyAccessExpression {
  readonly kind: "property-access";
  readonly base: ExpressionNode;
  readonly property: string;
  readonly nullish: boolean;
}

/**
 * Array/index access on an expression (e.g. `base[index]` or `base[^index]`).
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface ArrayAccessExpression {
  readonly kind: "array-access";
  readonly base: ExpressionNode;
  readonly index: ExpressionNode;
  readonly nullish: boolean;
  readonly fromEnd: boolean;
}

/**
 * A binary operator expression (e.g. `a + b`, `a ?? b`, `a && b`).
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface BinaryOperationExpression {
  readonly kind: "binary-operation";
  readonly operator: BinaryOperator;
  readonly left: ExpressionNode;
  readonly right: ExpressionNode;
}

/**
 * A unary operator expression (e.g. `!enabled`, `-count`).
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface UnaryOperationExpression {
  readonly kind: "unary-operation";
  readonly operator: UnaryOperator;
  readonly argument: ExpressionNode;
}

/**
 * A ternary conditional expression (e.g. `condition ? whenTrue : whenFalse`).
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface TernaryOperationExpression {
  readonly kind: "ternary-operation";
  readonly condition: ExpressionNode;
  readonly trueValue: ExpressionNode;
  readonly falseValue: ExpressionNode;
}

/**
 * A conditional expression block (e.g. `if (enabled) { ... }`).
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface IfConditionExpression {
  readonly kind: "if-condition";
  readonly condition: ExpressionNode;
  readonly body: ExpressionNode;
}

/**
 * A `for` expression (e.g. `[for item in items: { ... }]`).
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface ForExpression {
  readonly kind: "for-expression";
  readonly itemVariable: string;
  readonly indexVariable?: string;
  readonly collection: ExpressionNode;
  readonly body: ExpressionNode;
}

/**
 * An interpolated string expression (e.g. `'prefix${expr}suffix'`).
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface InterpolatedStringExpression {
  readonly kind: "interpolated-string";
  readonly segments: readonly ExpressionNode[];
}

/**
 * The additional-properties clause of an object type (`*: T`).
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface ObjectTypeAdditionalPropertiesNode {
  readonly kind: "object-type-additional-properties";
  readonly valueType: TypeNode;
  readonly decorators?: DecoratorsNode;
}

/**
 * An object type with named properties and optional additional properties.
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface ObjectTypeNode {
  readonly kind: "object-type";
  readonly properties: readonly ObjectTypePropertyNode[];
  readonly additionalProperties?: ObjectTypeAdditionalPropertiesNode;
}

/**
 * An individual member in a union type.
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface UnionTypeMemberNode {
  readonly kind: "union-type-member";
  readonly valueType: TypeNode;
}

/**
 * A union type (e.g. `string | int`).
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface UnionTypeNode {
  readonly kind: "union-type";
  readonly members: readonly UnionTypeMemberNode[];
}

/**
 * A nullable type wrapper (e.g. `string?`).
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface NullableTypeNode {
  readonly kind: "nullable-type";
  readonly base: TypeNode;
}

/**
 * A type argument in a parameterized type instantiation.
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface ParameterizedTypeArgumentNode {
  readonly kind: "parameterized-type-argument";
  readonly valueType: TypeNode;
}

/**
 * A parameterized type instantiation (e.g. `map<string>`).
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface ParameterizedTypeInstantiationNode {
  readonly kind: "parameterized-type-instantiation";
  readonly base: TypeNode;
  readonly args: readonly ParameterizedTypeArgumentNode[];
}

/**
 * A Bicep variable declaration.
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface VariableDeclarationNode {
  readonly bicepIdentifier: string;
  readonly value: ExpressionNode;
  readonly decorators?: DecoratorsNode;
}

/**
 * A Bicep output declaration.
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface OutputDeclarationNode {
  readonly bicepIdentifier: string;
  readonly valueType: TypeNode;
  readonly value: ExpressionNode;
  readonly decorators?: DecoratorsNode;
}

/**
 * A Bicep resource declaration.
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface ResourceDeclarationNode {
  readonly bicepIdentifier: string;
  /**
   * The Azure resource type (e.g. "Microsoft.Storage/storageAccounts").
   */
  readonly type: string;
  /**
   * The API version (e.g. "2024-01-01").
   */
  readonly apiVersion: string;
  /**
   * Whether this references an existing resource (`existing` keyword).
   */
  readonly existing: boolean;
  /**
   * The resource body.
   */
  readonly value: DeclarableBodyNode;
  readonly decorators?: DecoratorsNode;
}

/**
 * A Bicep module declaration.
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface ModuleDeclarationNode {
  readonly bicepIdentifier: string;
  /**
   * Relative path to the module file.
   */
  readonly path: string;
  /**
   * The module body.
   */
  readonly value: DeclarableBodyNode;
  readonly decorators?: DecoratorsNode;
}

/**
 * The root serialization document containing all infra nodes.
 *
 * Generated from TypeSpec. Do not edit.
 */
export interface SerializationDocument {
  /**
   * The collection of infra nodes that make up this deployment.
   */
  readonly infras: readonly InfraNode[];
}
