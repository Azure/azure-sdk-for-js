// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { createSerializer, MapperTypeNames } from "./serializer.js";
export { ServiceClient, type ServiceClientOptions } from "./serviceClient.js";
export { createClientPipeline, type InternalClientPipelineOptions } from "./pipeline.js";
export {
  type OperationSpec,
  type OperationArguments,
  type OperationOptions,
  type OperationResponseMap,
  type OperationParameter,
  type OperationQueryParameter,
  type OperationURLParameter,
  type Serializer,
  type BaseMapper,
  type Mapper,
  type MapperType,
  type SimpleMapperType,
  type EnumMapper,
  type EnumMapperType,
  type SequenceMapper,
  type SequenceMapperType,
  type DictionaryMapper,
  type DictionaryMapperType,
  type CompositeMapper,
  type CompositeMapperType,
  type MapperConstraints,
  type OperationRequest,
  type OperationRequestOptions,
  type OperationRequestInfo,
  type QueryCollectionFormat,
  type ParameterPath,
  type FullOperationResponse,
  type PolymorphicDiscriminator,
  type SpanConfig,
  XML_ATTRKEY,
  XML_CHARKEY,
  type XmlOptions,
  type SerializerOptions,
  type RawResponseCallback,
  type CommonClientOptions,
  type AdditionalPolicyConfig,
} from "./interfaces.js";
export {
  deserializationPolicy,
  deserializationPolicyName,
  type DeserializationPolicyOptions,
  type DeserializationContentTypes,
} from "./deserializationPolicy.js";
export {
  serializationPolicy,
  serializationPolicyName,
  type SerializationPolicyOptions,
} from "./serializationPolicy.js";
export { authorizeRequestOnClaimChallenge } from "./authorizeRequestOnClaimChallenge.js";
export { authorizeRequestOnTenantChallenge } from "./authorizeRequestOnTenantChallenge.js";
