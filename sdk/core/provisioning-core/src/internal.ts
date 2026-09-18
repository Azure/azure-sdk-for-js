// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  unwrapExpression,
  wrapExpression,
  type InputArray,
  type InputOf,
  type InputRecord,
} from "./expression/expressions.js";
export { serializeExpression, type SerializableValue } from "./serialization/json/expression.js";
export { sanitizeIdentifier } from "./serialization/json/util.js";
export type {
  BinaryOperator,
  DeclarableBodyNode,
  DecoratorsNode,
  ExpressionNode,
  IdentifierExpression,
  InfraNode,
  ModuleDeclarationNode,
  ObjectValue,
  OutputDeclarationNode,
  ParameterDeclarationNode,
  PrimitiveTypeMap,
  ResourceDeclarationNode,
  TargetScope,
  TypeNode,
  UnaryOperator,
  VariableDeclarationNode,
} from "./serialization/contract/index.js";
export { unwrapResourceHandle } from "./constructs/resource/resource-proxy.js";
export type {
  ResourceProps,
  SingletonExistingResourceProps,
} from "./constructs/resource/resource.js";
export type { DiscriminatedModelShape, DiscriminatorNames, FlatModelShape } from "./shape/shape.js";
export {
  createArrayShape,
  createDeferredShape,
  createDiscriminatedModelShape,
  createFlatModelShape,
  createRecordShape,
} from "./shape/shape.js";
export type {
  FlatVariantSelection,
  FlatVariantSelector,
} from "./constructs/resource/resource-type-registry.js";
export type { ResourceNamingRules, ResourceNamingValidCharacters } from "./naming/naming-rules.js";
