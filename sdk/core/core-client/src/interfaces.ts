// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { OperationTracingOptions } from "@azure/core-tracing";
import {
  HttpMethods,
  PipelineResponse,
  TransferProgressEvent,
  PipelineRequest,
  PipelineOptions,
  HttpClient
} from "@azure/core-rest-pipeline";

/**
 * Default key used to access the XML attributes.
 */
export const XML_ATTRKEY = "$";
/**
 * Default key used to access the XML value content.
 */
export const XML_CHARKEY = "_";
/**
 * Options to govern behavior of xml parser and builder.
 */
export interface XmlOptions {
  /**
   * indicates the name of the root element in the resulting XML when building XML.
   */
  rootName?: string;
  /**
   * indicates whether the root element is to be included or not in the output when parsing XML.
   */
  includeRoot?: boolean;
  /**
   * key used to access the XML value content when parsing XML.
   */
  xmlCharKey?: string;
}
/**
 * Options to configure serialization/de-serialization behavior.
 */
export interface SerializerOptions {
  /**
   * Options to configure xml parser/builder behavior.
   */
  xml: XmlOptions;
}

export type RequiredSerializerOptions = {
  [K in keyof SerializerOptions]: Required<SerializerOptions[K]>;
};

/**
 * A type alias for future proofing.
 */
export type OperationRequest = PipelineRequest;

/**
 * Metadata that is used to properly parse a response.
 */
export interface OperationRequestInfo {
  /**
   * Used to parse the response.
   */
  operationSpec?: OperationSpec;

  /**
   * Used to encode the request.
   */
  operationArguments?: OperationArguments;

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
  /**
   * Options to override serialization/de-serialization behavior.
   */
  serializerOptions?: SerializerOptions;

  /**
   * A function to be called each time a response is received from the server
   * while performing the requested operation.
   * May be called multiple times.
   */
  onResponse?: RawResponseCallback;
}

/**
 * Options used when creating and sending HTTP requests for this operation.
 */
export interface OperationRequestOptions {
  /**
   * User defined custom request headers that
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

  /**
   * Set to true if the request is sent over HTTP instead of HTTPS
   */
  allowInsecureConnection?: boolean;
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
   * The optional arguments that are provided to an operation.
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

  /**
   * Indicates if this is an error response
   */
  isError?: boolean;
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
 * A function to be called each time a response is received from the server
 * while performing the requested operation.
 * May be called multiple times.
 */
export type RawResponseCallback = (
  rawResponse: FullOperationResponse,
  flatResponse: unknown
) => void;

/**
 * Used to map raw response objects to final shapes.
 * Mostly useful for unpacking/packing Dates and other encoded types that
 * are not intrinsic to JSON.
 */
export interface Serializer {
  readonly modelMappers: { [key: string]: any };
  readonly isXML: boolean;
  validateConstraints(mapper: Mapper, value: any, objectName: string): void;
  serialize(mapper: Mapper, object: any, objectName?: string, options?: SerializerOptions): any;
  deserialize(
    mapper: Mapper,
    responseBody: any,
    objectName: string,
    options?: SerializerOptions
  ): any;
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
  /**
   * Name for the xml element
   */
  xmlName?: string;
  /**
   * Xml element namespace
   */
  xmlNamespace?: string;
  /**
   * Xml element namespace prefix
   */
  xmlNamespacePrefix?: string;
  /**
   * Determines if the current property should be serialized as an attribute of the parent xml element
   */
  xmlIsAttribute?: boolean;
  /**
   * Name for the xml elements when serializing an array
   */
  xmlElementName?: string;
  /**
   * Whether or not the current property should have a wrapping XML element
   */
  xmlIsWrapped?: boolean;
  /**
   * Whether or not the current property is readonly
   */
  readOnly?: boolean;
  /**
   * Whether or not the current property is a constant
   */
  isConstant?: boolean;
  /**
   * Whether or not the current property is required
   */
  required?: boolean;
  /**
   * Whether or not the current property allows mull as a value
   */
  nullable?: boolean;
  /**
   * The name to use when serializing
   */
  serializedName?: string;
  /**
   * Type of the mapper
   */
  type: MapperType;
  /**
   * Default value when one is not explicitly provided
   */
  defaultValue?: any;
  /**
   * Constraints to test the current value against
   */
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

/**
 * Configuration for creating a new Tracing Span
 */
export interface SpanConfig {
  /**
   * Package name prefix
   */
  packagePrefix: string;
  /**
   * Service namespace
   */
  namespace: string;
}

/**
 * The common set of options that high level clients are expected to expose.
 */
export interface CommonClientOptions extends PipelineOptions {
  /**
   * The HttpClient that will be used to send HTTP requests.
   */
  httpClient?: HttpClient;
}
