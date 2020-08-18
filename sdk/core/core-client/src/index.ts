// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { createSerializer, MapperTypeNames } from "./serializer";
export { ServiceClient, ServiceClientOptions } from "./serviceClient";
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
  OperationResponse,
  FullOperationResponse,
  PolymorphicDiscriminator
} from "./interfaces";
export {
  deserializationPolicy,
  deserializationPolicyName,
  DeserializationPolicyOptions,
  DeserializationContentTypes
} from "./deserializationPolicy";
