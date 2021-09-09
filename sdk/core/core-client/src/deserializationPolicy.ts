// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineResponse,
  PipelineRequest,
  SendRequest,
  PipelinePolicy,
  RestError
} from "@azure/core-rest-pipeline";
import {
  OperationRequest,
  OperationResponseMap,
  FullOperationResponse,
  OperationSpec,
  SerializerOptions,
  XmlOptions,
  XML_CHARKEY,
  RequiredSerializerOptions
} from "./interfaces";
import { MapperTypeNames } from "./serializer";
import { getOperationRequestInfo } from "./operationHelpers";

const defaultJsonContentTypes = ["application/json", "text/json"];
const defaultXmlContentTypes = ["application/xml", "application/atom+xml"];

/**
 * The programmatic identifier of the deserializationPolicy.
 */
export const deserializationPolicyName = "deserializationPolicy";

/**
 * Options to configure API response deserialization.
 */
export interface DeserializationPolicyOptions {
  /**
   * Configures the expected content types for the deserialization of
   * JSON and XML response bodies.
   */
  expectedContentTypes?: DeserializationContentTypes;

  /**
   * A function that is able to parse XML. Required for XML support.
   */
  parseXML?: (str: string, opts?: XmlOptions) => Promise<any>;

  /**
   * Configures behavior of xml parser and builder.
   */
  serializerOptions?: SerializerOptions;
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
 * This policy handles parsing out responses according to OperationSpecs on the request.
 */
export function deserializationPolicy(options: DeserializationPolicyOptions = {}): PipelinePolicy {
  const jsonContentTypes = options.expectedContentTypes?.json ?? defaultJsonContentTypes;
  const xmlContentTypes = options.expectedContentTypes?.xml ?? defaultXmlContentTypes;
  const parseXML = options.parseXML;
  const serializerOptions = options.serializerOptions;
  const updatedOptions: RequiredSerializerOptions = {
    xml: {
      rootName: serializerOptions?.xml.rootName ?? "",
      includeRoot: serializerOptions?.xml.includeRoot ?? false,
      xmlCharKey: serializerOptions?.xml.xmlCharKey ?? XML_CHARKEY
    }
  };

  return {
    name: deserializationPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const response = await next(request);
      return deserializeResponseBody(
        jsonContentTypes,
        xmlContentTypes,
        response,
        updatedOptions,
        parseXML
      );
    }
  };
}

function getOperationResponseMap(
  parsedResponse: PipelineResponse
): undefined | OperationResponseMap {
  let result: OperationResponseMap | undefined;
  const request: OperationRequest = parsedResponse.request;
  const operationInfo = getOperationRequestInfo(request);
  const operationSpec = operationInfo?.operationSpec;
  if (operationSpec) {
    if (!operationInfo?.operationResponseGetter) {
      result = operationSpec.responses[parsedResponse.status];
    } else {
      result = operationInfo?.operationResponseGetter(operationSpec, parsedResponse);
    }
  }
  return result;
}

function shouldDeserializeResponse(parsedResponse: PipelineResponse): boolean {
  const request: OperationRequest = parsedResponse.request;
  const operationInfo = getOperationRequestInfo(request);
  const shouldDeserialize = operationInfo?.shouldDeserialize;
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

async function deserializeResponseBody(
  jsonContentTypes: string[],
  xmlContentTypes: string[],
  response: PipelineResponse,
  options: RequiredSerializerOptions,
  parseXML?: (str: string, opts?: XmlOptions) => Promise<any>
): Promise<PipelineResponse> {
  const parsedResponse = await parse(
    jsonContentTypes,
    xmlContentTypes,
    response,
    options,
    parseXML
  );
  if (!shouldDeserializeResponse(parsedResponse)) {
    return parsedResponse;
  }

  const operationInfo = getOperationRequestInfo(parsedResponse.request);
  const operationSpec = operationInfo?.operationSpec;
  if (!operationSpec || !operationSpec.responses) {
    return parsedResponse;
  }

  const responseSpec = getOperationResponseMap(parsedResponse);
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
      if (operationSpec.isXML && responseSpec.bodyMapper.type.name === MapperTypeNames.Sequence) {
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
      } catch (deserializeError) {
        const restError = new RestError(
          `Error ${deserializeError} occurred in deserializing the responseBody - ${parsedResponse.bodyAsText}`,
          {
            statusCode: parsedResponse.status,
            request: parsedResponse.request,
            response: parsedResponse
          }
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
        parsedResponse.headers.toJSON(),
        "operationRes.parsedHeaders"
      );
    }
  }

  return parsedResponse;
}

function isOperationSpecEmpty(operationSpec: OperationSpec): boolean {
  const expectedStatusCodes = Object.keys(operationSpec.responses);
  return (
    expectedStatusCodes.length === 0 ||
    (expectedStatusCodes.length === 1 && expectedStatusCodes[0] === "default")
  );
}

function handleErrorResponse(
  parsedResponse: FullOperationResponse,
  operationSpec: OperationSpec,
  responseSpec: OperationResponseMap | undefined
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

  const initialErrorMessage = parsedResponse.request.streamResponseStatusCodes?.has(
    parsedResponse.status
  )
    ? `Unexpected status code: ${parsedResponse.status}`
    : (parsedResponse.bodyAsText as string);

  const error = new RestError(initialErrorMessage, {
    statusCode: parsedResponse.status,
    request: parsedResponse.request,
    response: parsedResponse
  });

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
      let deserializedError;

      if (defaultBodyMapper) {
        let valueToDeserialize: any = parsedBody;
        if (operationSpec.isXML && defaultBodyMapper.type.name === MapperTypeNames.Sequence) {
          valueToDeserialize = [];
          const elementName = defaultBodyMapper.xmlElementName;
          if (typeof parsedBody === "object" && elementName) {
            valueToDeserialize = parsedBody[elementName];
          }
        }
        deserializedError = operationSpec.serializer.deserialize(
          defaultBodyMapper,
          valueToDeserialize,
          "error.response.parsedBody"
        );
      }

      const internalError: any = parsedBody.error || deserializedError || parsedBody;
      error.code = internalError.code;
      if (internalError.message) {
        error.message = internalError.message;
      }

      if (defaultBodyMapper) {
        (error.response! as FullOperationResponse).parsedBody = deserializedError;
      }
    }

    // If error response has headers, try to deserialize it using default header mapper
    if (parsedResponse.headers && defaultHeadersMapper) {
      (error.response! as FullOperationResponse).parsedHeaders = operationSpec.serializer.deserialize(
        defaultHeadersMapper,
        parsedResponse.headers.toJSON(),
        "operationRes.parsedHeaders"
      );
    }
  } catch (defaultError) {
    error.message = `Error "${defaultError.message}" occurred in deserializing the responseBody - "${parsedResponse.bodyAsText}" for the default response.`;
  }

  return { error, shouldReturnResponse: false };
}

async function parse(
  jsonContentTypes: string[],
  xmlContentTypes: string[],
  operationResponse: FullOperationResponse,
  opts: RequiredSerializerOptions,
  parseXML?: (str: string, opts?: XmlOptions) => Promise<any>
): Promise<FullOperationResponse> {
  if (
    !operationResponse.request.streamResponseStatusCodes?.has(operationResponse.status) &&
    operationResponse.bodyAsText
  ) {
    const text = operationResponse.bodyAsText;
    const contentType: string = operationResponse.headers.get("Content-Type") || "";
    const contentComponents: string[] = !contentType
      ? []
      : contentType.split(";").map((component) => component.toLowerCase());

    try {
      if (
        contentComponents.length === 0 ||
        contentComponents.some((component) => jsonContentTypes.indexOf(component) !== -1)
      ) {
        operationResponse.parsedBody = JSON.parse(text);
        return operationResponse;
      } else if (contentComponents.some((component) => xmlContentTypes.indexOf(component) !== -1)) {
        if (!parseXML) {
          throw new Error("Parsing XML not supported.");
        }
        const body = await parseXML(text, opts.xml);
        operationResponse.parsedBody = body;
        return operationResponse;
      }
    } catch (err) {
      const msg = `Error "${err}" occurred while parsing the response body - ${operationResponse.bodyAsText}.`;
      const errCode = err.code || RestError.PARSE_ERROR;
      const e = new RestError(msg, {
        code: errCode,
        statusCode: operationResponse.status,
        request: operationResponse.request,
        response: operationResponse
      });
      throw e;
    }
  }

  return operationResponse;
}
