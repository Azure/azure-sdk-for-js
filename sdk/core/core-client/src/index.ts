// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { createSerializer, MapperTypeNames } from "./serializer";
export { createSpanFunction } from "./createSpan";
export {
  ServiceClient,
  ServiceClientOptions,
  createClientPipeline,
  ClientPipelineOptions
} from "./serviceClient";
export {
  OperationSpec,
  OperationArguments,
  OperationOptions,
  OperationResponseMap,
  OperationParameter,
  OperationQueryParameter,
  OperationURLParameter,
  Serializer,
  BaseMapper,
  Mapper,
  MapperType,
  SimpleMapperType,
  EnumMapper,
  EnumMapperType,
  SequenceMapper,
  SequenceMapperType,
  DictionaryMapper,
  DictionaryMapperType,
  CompositeMapper,
  CompositeMapperType,
  MapperConstraints,
  OperationRequest,
  OperationRequestOptions,
  OperationRequestInfo,
  QueryCollectionFormat,
  ParameterPath,
  FullOperationResponse,
  PolymorphicDiscriminator,
  SpanConfig,
  XML_ATTRKEY,
  XML_CHARKEY,
  XmlOptions,
  SerializerOptions,
  RawResponseCallback
} from "./interfaces";
export {
  deserializationPolicy,
  deserializationPolicyName,
  DeserializationPolicyOptions,
  DeserializationContentTypes
} from "./deserializationPolicy";
export {
  serializationPolicy,
  serializationPolicyName,
  SerializationPolicyOptions
} from "./serializationPolicy";
