// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { authorizeRequestOnClaimChallenge } from "./authorizeRequestOnClaimChallenge";
export {
  DeserializationContentTypes,
  deserializationPolicy,
  deserializationPolicyName,
  DeserializationPolicyOptions,
} from "./deserializationPolicy";
export {
  AdditionalPolicyConfig,
  BaseMapper,
  CommonClientOptions,
  CompositeMapper,
  CompositeMapperType,
  DictionaryMapper,
  DictionaryMapperType,
  EnumMapper,
  EnumMapperType,
  FullOperationResponse,
  Mapper,
  MapperConstraints,
  MapperType,
  OperationArguments,
  OperationOptions,
  OperationParameter,
  OperationQueryParameter,
  OperationRequest,
  OperationRequestInfo,
  OperationRequestOptions,
  OperationResponseMap,
  OperationSpec,
  OperationURLParameter,
  ParameterPath,
  PolymorphicDiscriminator,
  QueryCollectionFormat,
  RawResponseCallback,
  SequenceMapper,
  SequenceMapperType,
  Serializer,
  SerializerOptions,
  SimpleMapperType,
  SpanConfig,
  XmlOptions,
  XML_ATTRKEY,
  XML_CHARKEY,
} from "./interfaces";
export { createClientPipeline, InternalClientPipelineOptions } from "./pipeline";
export {
  serializationPolicy,
  serializationPolicyName,
  SerializationPolicyOptions,
} from "./serializationPolicy";
export { createSerializer, MapperTypeNames } from "./serializer";
export { ServiceClient, ServiceClientOptions } from "./serviceClient";
import "@azure/core-asynciterator-polyfill";
