// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpOperationResponse } from "../httpOperationResponse";
import { OperationResponse } from "../operationResponse";
import { OperationSpec, isStreamOperation } from "../operationSpec";
import { RestError } from "../restError";
import { MapperType } from "../serializer";
import { parseXML } from "../util/xml";
import { WebResourceLike } from "../webResource";
import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions
} from "./requestPolicy";

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
  deserializationContentTypes?: DeserializationContentTypes
): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new DeserializationPolicy(nextPolicy, deserializationContentTypes, options);
    }
  };
}

export const defaultJsonContentTypes = ["application/json", "text/json"];
export const defaultXmlContentTypes = ["application/xml", "application/atom+xml"];

export const DefaultDeserializationOptions: DeserializationOptions = {
  expectedContentTypes: {
    json: defaultJsonContentTypes,
    xml: defaultXmlContentTypes
  }
};

/**
 * A RequestPolicy that will deserialize HTTP response bodies and headers as they pass through the
 * HTTP pipeline.
 */
export class DeserializationPolicy extends BaseRequestPolicy {
  public readonly jsonContentTypes: string[];
  public readonly xmlContentTypes: string[];

  constructor(
    nextPolicy: RequestPolicy,
    deserializationContentTypes: DeserializationContentTypes | undefined,
    options: RequestPolicyOptions
  ) {
    super(nextPolicy, options);

    this.jsonContentTypes =
      (deserializationContentTypes && deserializationContentTypes.json) || defaultJsonContentTypes;
    this.xmlContentTypes =
      (deserializationContentTypes && deserializationContentTypes.xml) || defaultXmlContentTypes;
  }

  public async sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    return this._nextPolicy
      .sendRequest(request)
      .then((response: HttpOperationResponse) =>
        deserializeResponseBody(this.jsonContentTypes, this.xmlContentTypes, response)
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

export function deserializeResponseBody(
  jsonContentTypes: string[],
  xmlContentTypes: string[],
  response: HttpOperationResponse
): Promise<HttpOperationResponse> {
  return parse(jsonContentTypes, xmlContentTypes, response).then((parsedResponse) => {
    if (!shouldDeserializeResponse(parsedResponse)) {
      return parsedResponse;
    }

    const operationSpec = parsedResponse.request.operationSpec;
    if (!operationSpec || !operationSpec.responses) {
      return parsedResponse;
    }

    const responseSpec = getOperationResponse(parsedResponse);
    const expectedStatusCodes = Object.keys(operationSpec.responses);
    const hasNoExpectedStatusCodes =
      expectedStatusCodes.length === 0 ||
      (expectedStatusCodes.length === 1 && expectedStatusCodes[0] === "default");
    const isExpectedStatusCode: boolean = hasNoExpectedStatusCodes
      ? 200 <= parsedResponse.status && parsedResponse.status < 300
      : !!responseSpec;

    // There is no operation response spec for current status code.
    // So, treat it as an error case and use the default response spec to deserialize the response.
    if (!isExpectedStatusCode) {
      const defaultResponseSpec = operationSpec.responses.default;
      if (!defaultResponseSpec) {
        return parsedResponse;
      }

      const defaultBodyMapper = defaultResponseSpec.bodyMapper;
      const defaultHeadersMapper = defaultResponseSpec.headersMapper;

      const initialErrorMessage = isStreamOperation(operationSpec)
        ? `Unexpected status code: ${parsedResponse.status}`
        : (parsedResponse.bodyAsText as string);

      const error = new RestError(
        initialErrorMessage,
        undefined,
        parsedResponse.status,
        parsedResponse.request,
        parsedResponse
      );

      try {
        // If error response has a body, try to extract error code & message from it
        // Then try to deserialize it using default body mapper
        if (parsedResponse.parsedBody) {
          const parsedBody = parsedResponse.parsedBody;
          const internalError: any = parsedBody.error || parsedBody;
          error.code = internalError.code;
          if (internalError.message) {
            error.message = internalError.message;
          }

          if (defaultBodyMapper) {
            let valueToDeserialize: any = parsedBody;
            if (operationSpec.isXML && defaultBodyMapper.type.name === MapperType.Sequence) {
              valueToDeserialize =
                typeof parsedBody === "object" ? parsedBody[defaultBodyMapper.xmlElementName!] : [];
            }
            error.response!.parsedBody = operationSpec.serializer.deserialize(
              defaultBodyMapper,
              valueToDeserialize,
              "error.response.parsedBody"
            );
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
      } catch (defaultError) {
        error.message = `Error "${defaultError.message}" occurred in deserializing the responseBody - "${parsedResponse.bodyAsText}" for the default response.`;
      }
      throw error;
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
            "operationRes.parsedBody"
          );
        } catch (error) {
          const restError = new RestError(
            `Error ${error} occurred in deserializing the responseBody - ${parsedResponse.bodyAsText}`,
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
          "operationRes.parsedHeaders"
        );
      }
    }

    return parsedResponse;
  });
}

function parse(
  jsonContentTypes: string[],
  xmlContentTypes: string[],
  operationResponse: HttpOperationResponse
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

  if (!operationResponse.request.streamResponseBody && operationResponse.bodyAsText) {
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
      return parseXML(text)
        .then((body) => {
          operationResponse.parsedBody = body;
          return operationResponse;
        })
        .catch(errorHandler);
    }
  }

  return Promise.resolve(operationResponse);
}
