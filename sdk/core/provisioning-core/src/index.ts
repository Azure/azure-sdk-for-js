// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export type {
  PrimitiveTypeMap,
  PrimitiveTypeName,
  TargetScope,
} from "./serialization/contract/index.js";
export {
  createOutput,
  OutputCollection,
  type OutputMetadata,
  type OutputOptions,
  type ScalarOutputType,
  type OutputType,
  type OutputValue,
  type OutputValueFor,
} from "./constructs/output.js";
export {
  createParameter,
  ParameterCollection,
  type InferParamType,
  type Parameter,
  type ParameterMetadata,
  type ParameterOptions,
  type ParameterValue,
} from "./constructs/parameter.js";
export {
  createVariable,
  type ExpressionValue,
  VariableCollection,
  type Variable,
  type VariableMetadata,
  type VariableOptions,
  type VariableValue,
} from "./constructs/variable.js";
export { Stack, type StackOptions } from "./constructs/stack.js";
export {
  ProvisioningComponent,
  type ProvisioningComponentConstructor,
} from "./constructs/provisioning-component.js";
export type { DeploymentContext } from "./deployment-context/deployment-context.js";
export {
  asDiscriminator,
  isExpression,
  type Expression,
  type ExpressionBrand,
  type ExpressionOrValue,
  type ExpressionShape,
  type ExpressionTag,
  type InputOf,
  type InputRecord,
} from "./expression/expressions.js";
export type {
  ArrayAccessExpressionNode,
  ArrayAccessIndex,
  BinaryExpressionNode,
  BinaryOperator,
  ExpressionNode,
  FunctionCallExpressionNode,
  IdentifierExpressionNode,
  InstanceFunctionCallExpressionNode,
  InterpolatedStringExpressionNode,
  PropertyAccessExpressionNode,
  SymbolicValueExpressionNode,
  TernaryExpressionNode,
  UnaryExpressionNode,
  UnaryOperator,
} from "./expression/ast-nodes.js";
export * as fn from "./fn.js";
export {
  DefaultNamingPolicy,
  namingRequiredPolicy,
  type NamingContext,
  type NamingPolicy,
  type NamingPolicyOptions,
} from "./naming/naming-policy.js";
export type { ResourceNamingRules, ResourceNamingValidCharacters } from "./naming/naming-rules.js";
export { type QueryOptions } from "./constructs/resource/resource-query.js";
export {
  isResource,
  isResourceDeclaration,
  isResourceOf,
} from "./constructs/resource/resource-utils.js";
export { ResourceDeclaration } from "./constructs/resource/resource.js";
export { deref, type Deref } from "./constructs/resource/resource-proxy.js";
export {
  type ScopeExpression,
  type ExistingResourceProps,
  type ResourceProps,
  type ResourceState,
  type ResourceOptions,
} from "./constructs/resource/resource.js";
export { Resource } from "./constructs/resource/resource.js";
export type { ResourceCtor } from "./constructs/resource/resource-registry.js";
export type {
  FlatVariantPin,
  FlatVariantSelector,
} from "./constructs/resource/resource-type-registry.js";
export type {
  AnyShape,
  ArrayShape,
  BooleanLiteralShape,
  BooleanShape,
  BytesShape,
  ContainerShape,
  DateShape,
  DeferredShape,
  DiscriminatedModelShape,
  DiscriminatorNames,
  EnumShape,
  FlatModelShape,
  ModelShape,
  NullShape,
  NumberLiteralShape,
  NumberShape,
  PropertyShape,
  RecordShape,
  StringLiteralShape,
  StringShape,
  TerminalValueShape,
  TupleShape,
  UnionShape,
  ValueShape,
} from "./shape/shape.js";
export {
  INTEGER_SCALAR_NAMES,
  NUMERIC_SCALAR_NAMES,
  type BooleanStringEncodingDescriptor,
  type BooleanValueEncodingDescriptor,
  type BytesEncodingDescriptor,
  type BytesValueEncodingDescriptor,
  type DateTimeTextEncodingDescriptor,
  type DateValueEncodingDescriptor,
  type DurationIso8601EncodingDescriptor,
  type DurationNumericEncodingDescriptor,
  type IntegerScalarName,
  type NumberValueEncodingDescriptor,
  type NumericScalarName,
  type NumericStringEncodingDescriptor,
  type PlainDateEncodingDescriptor,
  type StringValueEncodingDescriptor,
  type UnixTimestampEncodingDescriptor,
  type ValueEncodingDescriptor,
} from "./shape/value-encoding.js";
export type { PropertySegment } from "./types.js";
export {
  ResourceGroup,
  type ResourceGroupProps,
} from "./constructs/built-in-resources/resource-group.js";
