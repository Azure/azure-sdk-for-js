// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { OperationTracingOptions } from "@azure/core-tracing";
import {
  HttpMethods,
  PipelineResponse,
  TransferProgressEvent,
  PipelineRequest
} from "@azure/core-https";

/**
 * This interface extends a generic `PipelineRequest` to include
 * additional metadata about the request.
 */
export type OperationRequest = PipelineRequest<OperationRequestInfo>;

/**
 * Metadata that is used to properly parse a response.
 */
export interface OperationRequestInfo {
  /**
   * Used to parse the response.
   */
  operationSpec?: OperationSpec;

  /**
   * A function that returns the proper OperationResponseMap for the given OperationSpec and
   * PipelineResponse combination. If this is undefined, then a simple status code lookup will
   * be used.
   */
  operationResponseGetter?: (
    operationSpec: OperationSpec,
    response: PipelineResponse
  ) => undefined | OperationResponseMap;

  /**
   * Whether or not the PipelineResponse should be deserialized. Defaults to true.
   */
  shouldDeserialize?: boolean | ((response: PipelineResponse) => boolean);
}

/**
 * The base options type for all operations.
 */
export interface OperationOptions {
  /**
   * The signal which can be used to abort requests.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Options used when creating and sending HTTP requests for this operation.
   */
  requestOptions?: OperationRequestOptions;
  /**
   * Options used when tracing is enabled.
   */
  tracingOptions?: OperationTracingOptions;
}

/**
 * Options used when creating and sending HTTP requests for this operation.
 */
export interface OperationRequestOptions {
  /**
   * @property {object} [customHeaders] User defined custom request headers that
   * will be applied before the request is sent.
   */
  customHeaders?: { [key: string]: string };

  /**
   * The number of milliseconds a request can take before automatically being terminated.
   */
  timeout?: number;

  /**
   * Callback which fires upon upload progress.
   */
  onUploadProgress?: (progress: TransferProgressEvent) => void;

  /**
   * Callback which fires upon download progress.
   */
  onDownloadProgress?: (progress: TransferProgressEvent) => void;
  /**
   * Whether or not the HttpOperationResponse should be deserialized. If this is undefined, then the
   * HttpOperationResponse should be deserialized.
   */
  shouldDeserialize?: boolean | ((response: PipelineResponse) => boolean);
}

/**
 * A collection of properties that apply to a single invocation of an operation.
 */
export interface OperationArguments {
  /**
   * The parameters that were passed to the operation method.
   */
  [parameterName: string]: unknown;

  /**
   * The optional arugments that are provided to an operation.
   */
  options?: OperationOptions;
}

/**
 * The format that will be used to join an array of values together for a query parameter value.
 */
export type QueryCollectionFormat = "CSV" | "SSV" | "TSV" | "Pipes" | "Multi";

/**
 * Encodes how to reach a particular property on an object.
 */
export type ParameterPath = string | string[] | { [propertyName: string]: ParameterPath };

/**
 * A common interface that all Operation parameter's extend.
 */
export interface OperationParameter {
  /**
   * The path to this parameter's value in OperationArguments or the object that contains paths for
   * each property's value in OperationArguments.
   */
  parameterPath: ParameterPath;

  /**
   * The mapper that defines how to validate and serialize this parameter's value.
   */
  mapper: Mapper;
}

/**
 * A parameter for an operation that will be substituted into the operation's request URL.
 */
export interface OperationURLParameter extends OperationParameter {
  /**
   * Whether or not to skip encoding the URL parameter's value before adding it to the URL.
   */
  skipEncoding?: boolean;
}

/**
 * A parameter for an operation that will be added as a query parameter to the operation's HTTP
 * request.
 */
export interface OperationQueryParameter extends OperationParameter {
  /**
   * Whether or not to skip encoding the query parameter's value before adding it to the URL.
   */
  skipEncoding?: boolean;

  /**
   * If this query parameter's value is a collection, what type of format should the value be
   * converted to.
   */
  collectionFormat?: QueryCollectionFormat;
}

/**
 * An OperationResponse that can be returned from an operation request for a single status code.
 */
export interface OperationResponseMap {
  /**
   * The mapper that will be used to deserialize the response headers.
   */
  headersMapper?: Mapper;

  /**
   * The mapper that will be used to deserialize the response body.
   */
  bodyMapper?: Mapper;
}

/**
 * A specification that defines an operation.
 */
export interface OperationSpec {
  /**
   * The serializer to use in this operation.
   */
  readonly serializer: Serializer;

  /**
   * The HTTP method that should be used by requests for this operation.
   */
  readonly httpMethod: HttpMethods;

  /**
   * The URL that was provided in the service's specification. This will still have all of the URL
   * template variables in it. If this is not provided when the OperationSpec is created, then it
   * will be populated by a "baseUri" property on the ServiceClient.
   */
  readonly baseUrl?: string;

  /**
   * The fixed path for this operation's URL. This will still have all of the URL template variables
   * in it.
   */
  readonly path?: string;

  /**
   * The content type of the request body. This value will be used as the "Content-Type" header if
   * it is provided.
   */
  readonly contentType?: string;

  /**
   * The media type of the request body.
   * This value can be used to aide in serialization if it is provided.
   */
  readonly mediaType?:
    | "json"
    | "xml"
    | "form"
    | "binary"
    | "multipart"
    | "text"
    | "unknown"
    | string;
  /**
   * The parameter that will be used to construct the HTTP request's body.
   */
  readonly requestBody?: OperationParameter;

  /**
   * Whether or not this operation uses XML request and response bodies.
   */
  readonly isXML?: boolean;

  /**
   * The parameters to the operation method that will be substituted into the constructed URL.
   */
  readonly urlParameters?: ReadonlyArray<OperationURLParameter>;

  /**
   * The parameters to the operation method that will be added to the constructed URL's query.
   */
  readonly queryParameters?: ReadonlyArray<OperationQueryParameter>;

  /**
   * The parameters to the operation method that will be converted to headers on the operation's
   * HTTP request.
   */
  readonly headerParameters?: ReadonlyArray<OperationParameter>;

  /**
   * The parameters to the operation method that will be used to create a formdata body for the
   * operation's HTTP request.
   */
  readonly formDataParameters?: ReadonlyArray<OperationParameter>;

  /**
   * The different types of responses that this operation can return based on what status code is
   * returned.
   */
  readonly responses: { [responseCode: string]: OperationResponseMap };
}

/**
 * Wrapper object for http request and response. Deserialized object is stored in
 * the `parsedBody` property when the response body is received in JSON or XML.
 */
export interface FullOperationResponse extends PipelineResponse {
  /**
   * The parsed HTTP response headers.
   */
  parsedHeaders?: { [key: string]: unknown };

  /**
   * The response body as parsed JSON or XML.
   */
  parsedBody?: any;

  /**
   * The request that generated the response.
   */
  request: OperationRequest;
}

/**
 * The processed and flattened response to an operation call.
 * Contains merged properties of the parsed body and headers.
 */
export interface OperationResponse {
  /**
   * The underlying HTTP response containing both raw and deserialized response data.
   */
  _response: FullOperationResponse;

  [key: string]: any;
}

/**
 * Used to map raw response objects to final shapes.
 * Mostly useful for unpacking/packing Dates and other encoded types that
 * are not intrinsic to JSON.
 */
export interface Serializer {
  readonly modelMappers: { [key: string]: any };
  readonly isXML: boolean;
  validateConstraints(mapper: Mapper, value: any, objectName: string): void;
  serialize(mapper: Mapper, object: any, objectName?: string): any;
  deserialize(mapper: Mapper, responseBody: any, objectName: string): any;
}

export interface MapperConstraints {
  InclusiveMaximum?: number;
  ExclusiveMaximum?: number;
  InclusiveMinimum?: number;
  ExclusiveMinimum?: number;
  MaxLength?: number;
  MinLength?: number;
  Pattern?: RegExp;
  MaxItems?: number;
  MinItems?: number;
  UniqueItems?: true;
  MultipleOf?: number;
}

export type MapperType =
  | SimpleMapperType
  | CompositeMapperType
  | SequenceMapperType
  | DictionaryMapperType
  | EnumMapperType;

export interface SimpleMapperType {
  name:
    | "Base64Url"
    | "Boolean"
    | "ByteArray"
    | "Date"
    | "DateTime"
    | "DateTimeRfc1123"
    | "Object"
    | "Stream"
    | "String"
    | "TimeSpan"
    | "UnixTime"
    | "Uuid"
    | "Number"
    | "any";
}

export interface CompositeMapperType {
  name: "Composite";

  // Only one of the two below properties should be present.
  // Use className to reference another type definition,
  // and use modelProperties/additionalProperties when the reference to the other type has been resolved.
  className?: string;

  modelProperties?: { [propertyName: string]: Mapper };
  additionalProperties?: Mapper;

  uberParent?: string;
  polymorphicDiscriminator?: PolymorphicDiscriminator;
}

export interface SequenceMapperType {
  name: "Sequence";
  element: Mapper;
}

export interface DictionaryMapperType {
  name: "Dictionary";
  value: Mapper;
}

export interface EnumMapperType {
  name: "Enum";
  allowedValues: any[];
}

export interface BaseMapper {
  xmlName?: string;
  xmlIsAttribute?: boolean;
  xmlElementName?: string;
  xmlIsWrapped?: boolean;
  readOnly?: boolean;
  isConstant?: boolean;
  required?: boolean;
  nullable?: boolean;
  serializedName?: string;
  type: MapperType;
  defaultValue?: any;
  constraints?: MapperConstraints;
}

export type Mapper = BaseMapper | CompositeMapper | SequenceMapper | DictionaryMapper | EnumMapper;

export interface PolymorphicDiscriminator {
  serializedName: string;
  clientName: string;
  [key: string]: string;
}

export interface CompositeMapper extends BaseMapper {
  type: CompositeMapperType;
}

export interface SequenceMapper extends BaseMapper {
  type: SequenceMapperType;
}

export interface DictionaryMapper extends BaseMapper {
  type: DictionaryMapperType;
  headerCollectionPrefix?: string;
}

export interface EnumMapper extends BaseMapper {
  type: EnumMapperType;
}

export interface UrlParameterValue {
  value: string;
  skipUrlEncoding: boolean;
}
