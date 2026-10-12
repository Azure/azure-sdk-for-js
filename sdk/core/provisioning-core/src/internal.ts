// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  unwrapExpression,
  wrapExpression,
  type InputArray,
  type InputOf,
  type InputRecord,
  type InputTuple,
} from "./expression/expressions.js";
export { serializeExpression, type SerializableValue } from "./serialization/json/expression.js";
export { sanitizeIdentifier } from "./serialization/json/util.js";
export { collectDependenciesForDeclaration } from "./serialization/utils.js";
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
  createAnyShape,
  createArrayShape,
  createBooleanLiteralShape,
  createBooleanShape,
  createBytesShape,
  createDateShape,
  createDeferredShape,
  createDiscriminatedModelShape,
  createEnumShape,
  createFlatModelShape,
  createNullShape,
  createNumberLiteralShape,
  createNumberShape,
  createRecordShape,
  createStringLiteralShape,
  createStringShape,
  createTupleShape,
  createUnionShape,
} from "./shape/shape.js";
export type {
  FlatVariantSelection,
  FlatVariantSelector,
} from "./constructs/resource/resource-type-registry.js";
export {
  INTEGER_SCALAR_NAMES,
  isIntegerScalarName,
  isNumericScalarName,
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
export type { ResourceNamingRules, ResourceNamingValidCharacters } from "./naming/naming-rules.js";
