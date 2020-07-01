// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { createSerializer, MapperType } from "./serializer";
export { ServiceClient, ServiceClientOptions } from "./serviceClient";
export {
  OperationSpec,
  OperationArguments,
  OperationOptions,
  Serializer,
  Mapper,
  EnumMapper,
  SequenceMapper,
  DictionaryMapper,
  CompositeMapper,
  OperationRequest,
  QueryCollectionFormat,
  ParameterPath,
  FullOperationResponse
} from "./interfaces";
export {
  deserializationPolicy,
  deserializationPolicyName,
  DeserializationPolicyOptions,
  DeserializationContentTypes
} from "./deserializationPolicy";
