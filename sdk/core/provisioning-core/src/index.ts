// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export type {
  BicepArrayType,
  BicepNullableType,
  BicepObjectType,
  BicepObjectTypeProperty,
  BicepPrimitiveType,
  BicepResourceType,
  BicepType,
  BicepTypeReference,
  BicepUnionType,
  BinaryOperator,
  TargetScope,
  UnaryOperator,
} from "./bicep.js";
export { type PrimitiveTypeMap } from "./bicep.js";
export {
  createOutput,
  OutputCollection,
  type OutputMetadata,
  type OutputOptions,
  type OutputValue,
} from "./constructs/output.js";
export {
  createParameter,
  ParameterCollection,
  type Parameter,
  type ParameterMetadata,
  type ParameterOptions,
  type ParameterValue,
  type InferParamType,
} from "./constructs/parameter.js";
export {
  createVariable,
  VariableCollection,
  type Variable,
  type VariableMetadata,
  type VariableOptions,
  type VariableValue,
  type ExpressionValue,
} from "./constructs/variable.js";
export { Stack, type StackOptions } from "./constructs/stack.js";
export {
  ProvisioningComponent,
  type ProvisioningComponentConstructor,
} from "./constructs/provisioning-component.js";
export type {
  ArrayShape,
  DiscriminatedModelShape,
  DiscriminatorNames,
  FlatModelShape,
  ModelShape,
  NavShape,
  PropertyEncoding,
  PropertyShape,
  RecordShape,
  ResourceShape,
  DeferredShape,
  NestedShape,
} from "./shape/shape.js";
export {
  createArrayShape,
  createDiscriminatedModelShape,
  createFlatModelShape,
  createRecordShape,
  createDeferredShape,
  navigateShape,
  resolveModelShape,
} from "./shape/shape.js";
export { getShape, registerShape, type ShapeResolveOptions } from "./shape/shape-registry.js";
export type {
  FlatVariantPin,
  FlatVariantSelection,
  FlatVariantSelector,
} from "./constructs/resource/resource-type-registry.js";
export type { DeploymentContext } from "./deployment-context/deployment-context.js";
export {
  accessExpressionNode,
  arrayAccessExpressionNode,
  functionCallExpressionNode,
  identifierExpressionNode,
  instanceFunctionCallExpressionNode,
  interpolatedStringExpressionNode,
  isExpressionNode,
  propertyAccessExpressionNode,
  symbolicValueExpressionNode,
  type ArrayAccessExpressionNode,
  type ArrayAccessIndex,
  type BinaryExpressionNode,
  type ExpressionNode,
  type FunctionCallExpressionNode,
  type IdentifierExpressionNode,
  type InstanceFunctionCallExpressionNode,
  type InterpolatedStringExpressionNode,
  type PropertyAccessExpressionNode,
  type SymbolicValueExpressionNode,
  type TernaryExpressionNode,
  type UnaryExpressionNode,
} from "./expression/ast-nodes.js";
export {
  wrapExpression,
  asDiscriminator,
  isExpression,
  unwrapExpression,
  type BrandedExpression,
  type Expression,
  type ExpressionBrand,
  type ExpressionOrValue,
  type ExpressionShape,
  type ExpressionTag,
  type InputArray,
  type InputOf,
  type InputRecord,
} from "./expression/expressions.js";
export type { PropertySegment } from "./types.js";
export * as fn from "./fn.js";
export { getHost, setHost, type CdkHost } from "./host.js";
export {
  DefaultNamingPolicy,
  namingRequiredPolicy,
  resolveResourceName,
  type NamingContext,
  type NamingPolicy,
  type NamingPolicyOptions,
} from "./naming/naming-policy.js";
export {
  MOST_RESTRICTIVE,
  type ResourceNamingRules,
  type ResourceNamingValidCharacters,
} from "./naming/naming-rules.js";
export { type QueryOptions } from "./constructs/resource/resource-query.js";
export {
  isResource,
  isResourceDeclaration,
  isLoopedResource,
  isResourceOf,
  isLoopedResourceOf,
} from "./constructs/resource/resource-utils.js";
export { ChildResourceCollection } from "./constructs/resource/child-resource-collection.js";
export {
  Loop,
  type LoopOptions,
  type LoopContext,
  LoopedResource,
  ResourceDeclaration,
} from "./constructs/resource/resource.js";
export {
  deref,
  unwrapResourceHandle,
  createIndexedResourceProxy,
  type IndexedProxyOf,
  STATE_PARENT_INDEX,
  type Deref,
} from "./constructs/resource/resource-proxy.js";
export {
  type ScopeExpression,
  type ExistingResourceProps,
  type ResourceProps,
  type ResourceState,
  type SingletonExistingResourceProps,
  type ResourceOptions,
} from "./constructs/resource/resource.js";
export { Resource } from "./constructs/resource/resource.js";
export {
  registerResource,
  resolveResource,
  type ResolveOptions,
  type ResourceCtor,
} from "./constructs/resource/resource-registry.js";
export {
  ResourceGroup,
  resourceGroupNamingRules,
  type ResourceGroupProps,
} from "./constructs/built-in-resources/resource-group.js";
export { definedProps } from "./util.js";
