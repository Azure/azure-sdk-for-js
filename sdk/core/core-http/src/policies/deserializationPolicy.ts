// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions,
} from "./requestPolicy";
import { SerializerOptions, XML_CHARKEY } from "../util/serializer.common";
import { HttpOperationResponse } from "../httpOperationResponse";
import { MapperType } from "../serializer";
import { OperationResponse } from "../operationResponse";
import { OperationSpec } from "../operationSpec";
import { RestError } from "../restError";
import { WebResourceLike } from "../webResource";
import { parseXML } from "../util/xml";

/**
 * Options to configure API response deserialization.
 */
export interface DeserializationOptions {
  /**
   * Configures the expected content types for the deserialization of
   * JSON and XML response bodies.
   */
  expectedContentTypes: DeserializationContentTypes;
}

/**
 * The content-types that will indicate that an operation response should be deserialized in a
 * particular way.
 */
export interface DeserializationContentTypes {
  /**
   * The content-types that indicate that an operation response should be deserialized as JSON.
   * Defaults to [ "application/json", "text/json" ].
   */
  json?: string[];

  /**
   * The content-types that indicate that an operation response should be deserialized as XML.
   * Defaults to [ "application/xml", "application/atom+xml" ].
   */
  xml?: string[];
}

/**
 * Create a new serialization RequestPolicyCreator that will serialized HTTP request bodies as they
 * pass through the HTTP pipeline.
 */
export function deserializationPolicy(
  deserializationContentTypes?: DeserializationContentTypes,
  parsingOptions?: SerializerOptions
): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new DeserializationPolicy(
        nextPolicy,
        options,
        deserializationContentTypes,
        parsingOptions
      );
    },
  };
}

export const defaultJsonContentTypes = ["application/json", "text/json"];
export const defaultXmlContentTypes = ["application/xml", "application/atom+xml"];

export const DefaultDeserializationOptions: DeserializationOptions = {
  expectedContentTypes: {
    json: defaultJsonContentTypes,
    xml: defaultXmlContentTypes,
  },
};

/**
 * A RequestPolicy that will deserialize HTTP response bodies and headers as they pass through the
 * HTTP pipeline.
 */
export class DeserializationPolicy extends BaseRequestPolicy {
  public readonly jsonContentTypes: string[];
  public readonly xmlContentTypes: string[];
  public readonly xmlCharKey: string;

  constructor(
    nextPolicy: RequestPolicy,
    requestPolicyOptions: RequestPolicyOptions,
    deserializationContentTypes?: DeserializationContentTypes,
    parsingOptions: SerializerOptions = {}
  ) {
    super(nextPolicy, requestPolicyOptions);

    this.jsonContentTypes =
      (deserializationContentTypes && deserializationContentTypes.json) || defaultJsonContentTypes;
    this.xmlContentTypes =
      (deserializationContentTypes && deserializationContentTypes.xml) || defaultXmlContentTypes;
    this.xmlCharKey = parsingOptions.xmlCharKey ?? XML_CHARKEY;
  }

  public async sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    return this._nextPolicy.sendRequest(request).then((response: HttpOperationResponse) =>
      deserializeResponseBody(this.jsonContentTypes, this.xmlContentTypes, response, {
        xmlCharKey: this.xmlCharKey,
      })
    );
  }
}

function getOperationResponse(
  parsedResponse: HttpOperationResponse
): undefined | OperationResponse {
  let result: OperationResponse | undefined;
  const request: WebResourceLike = parsedResponse.request;
  const operationSpec: OperationSpec | undefined = request.operationSpec;
  if (operationSpec) {
    const operationResponseGetter:
      | undefined
      | ((
          operationSpec: OperationSpec,
          response: HttpOperationResponse
        ) => undefined | OperationResponse) = request.operationResponseGetter;
    if (!operationResponseGetter) {
      result = operationSpec.responses[parsedResponse.status];
    } else {
      result = operationResponseGetter(operationSpec, parsedResponse);
    }
  }
  return result;
}

function shouldDeserializeResponse(parsedResponse: HttpOperationResponse): boolean {
  const shouldDeserialize: undefined | boolean | ((response: HttpOperationResponse) => boolean) =
    parsedResponse.request.shouldDeserialize;
  let result: boolean;
  if (shouldDeserialize === undefined) {
    result = true;
  } else if (typeof shouldDeserialize === "boolean") {
    result = shouldDeserialize;
  } else {
    result = shouldDeserialize(parsedResponse);
  }
  return result;
}

/**
 * Given a particular set of content types to parse as either JSON or XML, consumes the HTTP response to produce the result object defined by the request's {@link OperationSpec}.
 * @param jsonContentTypes - Response content types to parse the body as JSON.
 * @param xmlContentTypes  - Response content types to parse the body as XML.
 * @param response - HTTP Response from the pipeline.
 * @param options  - Options to the serializer, mostly for configuring the XML parser if needed.
 * @returns A parsed {@link HttpOperationResponse} object that can be returned by the {@link ServiceClient}.
 */
export function deserializeResponseBody(
  jsonContentTypes: string[],
  xmlContentTypes: string[],
  response: HttpOperationResponse,
  options: SerializerOptions = {}
): Promise<HttpOperationResponse> {
  const updatedOptions: Required<SerializerOptions> = {
    rootName: options.rootName ?? "",
    includeRoot: options.includeRoot ?? false,
    xmlCharKey: options.xmlCharKey ?? XML_CHARKEY,
  };
  return parse(jsonContentTypes, xmlContentTypes, response, updatedOptions).then(
    (parsedResponse) => {
      if (!shouldDeserializeResponse(parsedResponse)) {
        return parsedResponse;
      }

      const operationSpec = parsedResponse.request.operationSpec;
      if (!operationSpec || !operationSpec.responses) {
        return parsedResponse;
      }

      const responseSpec = getOperationResponse(parsedResponse);

      const { error, shouldReturnResponse } = handleErrorResponse(
        parsedResponse,
        operationSpec,
        responseSpec
      );
      if (error) {
        throw error;
      } else if (shouldReturnResponse) {
        return parsedResponse;
      }

      // An operation response spec does exist for current status code, so
      // use it to deserialize the response.
      if (responseSpec) {
        if (responseSpec.bodyMapper) {
          let valueToDeserialize: any = parsedResponse.parsedBody;
          if (operationSpec.isXML && responseSpec.bodyMapper.type.name === MapperType.Sequence) {
            valueToDeserialize =
              typeof valueToDeserialize === "object"
                ? valueToDeserialize[responseSpec.bodyMapper.xmlElementName!]
                : [];
          }
          try {
            parsedResponse.parsedBody = operationSpec.serializer.deserialize(
              responseSpec.bodyMapper,
              valueToDeserialize,
              "operationRes.parsedBody",
              options
            );
          } catch (innerError: any) {
            const restError = new RestError(
              `Error ${innerError} occurred in deserializing the responseBody - ${parsedResponse.bodyAsText}`,
              undefined,
              parsedResponse.status,
              parsedResponse.request,
              parsedResponse
            );
            throw restError;
          }
        } else if (operationSpec.httpMethod === "HEAD") {
          // head methods never have a body, but we return a boolean to indicate presence/absence of the resource
          parsedResponse.parsedBody = response.status >= 200 && response.status < 300;
        }

        if (responseSpec.headersMapper) {
          parsedResponse.parsedHeaders = operationSpec.serializer.deserialize(
            responseSpec.headersMapper,
            parsedResponse.headers.rawHeaders(),
            "operationRes.parsedHeaders",
            options
          );
        }
      }

      return parsedResponse;
    }
  );
}

function isOperationSpecEmpty(operationSpec: OperationSpec): boolean {
  const expectedStatusCodes = Object.keys(operationSpec.responses);
  return (
    expectedStatusCodes.length === 0 ||
    (expectedStatusCodes.length === 1 && expectedStatusCodes[0] === "default")
  );
}

function handleErrorResponse(
  parsedResponse: HttpOperationResponse,
  operationSpec: OperationSpec,
  responseSpec: OperationResponse | undefined
): { error: RestError | null; shouldReturnResponse: boolean } {
  const isSuccessByStatus = 200 <= parsedResponse.status && parsedResponse.status < 300;
  const isExpectedStatusCode: boolean = isOperationSpecEmpty(operationSpec)
    ? isSuccessByStatus
    : !!responseSpec;

  if (isExpectedStatusCode) {
    if (responseSpec) {
      if (!responseSpec.isError) {
        return { error: null, shouldReturnResponse: false };
      }
    } else {
      return { error: null, shouldReturnResponse: false };
    }
  }

  const errorResponseSpec = responseSpec ?? operationSpec.responses.default;
  const streaming =
    parsedResponse.request.streamResponseStatusCodes?.has(parsedResponse.status) ||
    parsedResponse.request.streamResponseBody;
  const initialErrorMessage = streaming
    ? `Unexpected status code: ${parsedResponse.status}`
    : (parsedResponse.bodyAsText as string);

  const error = new RestError(
    initialErrorMessage,
    undefined,
    parsedResponse.status,
    parsedResponse.request,
    parsedResponse
  );

  // If the item failed but there's no error spec or default spec to deserialize the error,
  // we should fail so we just throw the parsed response
  if (!errorResponseSpec) {
    throw error;
  }

  const defaultBodyMapper = errorResponseSpec.bodyMapper;
  const defaultHeadersMapper = errorResponseSpec.headersMapper;

  try {
    // If error response has a body, try to deserialize it using default body mapper.
    // Then try to extract error code & message from it
    if (parsedResponse.parsedBody) {
      const parsedBody = parsedResponse.parsedBody;
      let parsedError;
      if (defaultBodyMapper) {
        let valueToDeserialize: any = parsedBody;
        if (operationSpec.isXML && defaultBodyMapper.type.name === MapperType.Sequence) {
          valueToDeserialize =
            typeof parsedBody === "object" ? parsedBody[defaultBodyMapper.xmlElementName!] : [];
        }
        parsedError = operationSpec.serializer.deserialize(
          defaultBodyMapper,
          valueToDeserialize,
          "error.response.parsedBody"
        );
      }

      const internalError: any = parsedBody.error || parsedError || parsedBody;
      error.code = internalError.code;
      if (internalError.message) {
        error.message = internalError.message;
      }

      if (defaultBodyMapper) {
        error.response!.parsedBody = parsedError;
      }
    }

    // If error response has headers, try to deserialize it using default header mapper
    if (parsedResponse.headers && defaultHeadersMapper) {
      error.response!.parsedHeaders = operationSpec.serializer.deserialize(
        defaultHeadersMapper,
        parsedResponse.headers.rawHeaders(),
        "operationRes.parsedHeaders"
      );
    }
  } catch (defaultError: any) {
    error.message = `Error "${defaultError.message}" occurred in deserializing the responseBody - "${parsedResponse.bodyAsText}" for the default response.`;
  }

  return { error, shouldReturnResponse: false };
}

function parse(
  jsonContentTypes: string[],
  xmlContentTypes: string[],
  operationResponse: HttpOperationResponse,
  opts: Required<SerializerOptions>
): Promise<HttpOperationResponse> {
  const errorHandler = (err: Error & { code: string }): Promise<never> => {
    const msg = `Error "${err}" occurred while parsing the response body - ${operationResponse.bodyAsText}.`;
    const errCode = err.code || RestError.PARSE_ERROR;
    const e = new RestError(
      msg,
      errCode,
      operationResponse.status,
      operationResponse.request,
      operationResponse
    );
    return Promise.reject(e);
  };

  const streaming =
    operationResponse.request.streamResponseStatusCodes?.has(operationResponse.status) ||
    operationResponse.request.streamResponseBody;
  if (!streaming && operationResponse.bodyAsText) {
    const text = operationResponse.bodyAsText;
    const contentType: string = operationResponse.headers.get("Content-Type") || "";
    const contentComponents: string[] = !contentType
      ? []
      : contentType.split(";").map((component) => component.toLowerCase());
    if (
      contentComponents.length === 0 ||
      contentComponents.some((component) => jsonContentTypes.indexOf(component) !== -1)
    ) {
      return new Promise<HttpOperationResponse>((resolve) => {
        operationResponse.parsedBody = JSON.parse(text);
        resolve(operationResponse);
      }).catch(errorHandler);
    } else if (contentComponents.some((component) => xmlContentTypes.indexOf(component) !== -1)) {
      return parseXML(text, opts)
        .then((body) => {
          operationResponse.parsedBody = body;
          return operationResponse;
        })
        .catch(errorHandler);
    }
  }

  return Promise.resolve(operationResponse);
}
