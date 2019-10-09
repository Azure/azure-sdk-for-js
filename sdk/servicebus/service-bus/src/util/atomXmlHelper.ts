// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Constants as CoreHttpConstants,
  HttpOperationResponse,
  RestError,
  stripRequest,
  stripResponse
} from "@azure/core-http";

import * as ServiceBusConstants from "./constants";
/**
 * Serializes input information to construct the Atom XML request
 * @param resourceName
 * @param resource
 * @param properties
 * @param xmlNamespace
 */
export function serializeToAtomXmlRequest(
  resourceName: string,
  resource: any,
  properties: string[],
  xmlNamespace: string
): object {
  const content: any = {};
  content[resourceName] = {
    $: {
      xmlns: xmlNamespace
    }
  };

  if (resource) {
    // Sort properties according to what is allowed by the service
    properties.forEach((property: string) => {
      if (resource[property] !== undefined) {
        content[resourceName][property] = resource[property];
      }
    });
  }
  return content;
}

/**
 * Transforms response to contain the parsed data.
 * @param nameProperties The set of 'name' properties to be constructed on the
 * resultant object e.g., QueueName, TopicName, etc.
 * @param response
 * @param shouldParseResponse
 */
export async function deserializeAtomXmlResponse(
  nameProperties: string[],
  response: HttpOperationResponse
): Promise<HttpOperationResponse> {
  let errorBody: any;

  // If received data is a non-valid HTTP response, the body is expected to contain error information
  if (response.status < 200 || response.status >= 300) {
    errorBody = response.parsedBody;
    if (errorBody == undefined) {
      const HttpResponseCodes: any = ServiceBusConstants.HttpResponseCodes;
      const statusCode = response.status;
      if (isKnownResponseCode(statusCode)) {
        throw buildError(
          {
            code: HttpResponseCodes[statusCode]
          },
          response
        );
      } else {
        throw buildError(
          {
            code: `UnrecognizedHttpResponseStatus: ${statusCode}`
          },
          response
        );
      }
    } else {
      throw buildError(errorBody, response);
    }
  }

  response.parsedBody = parseAtomResult(response.parsedBody, nameProperties);
  return response;
}

/**
 * @ignore
 * Utility to deserialize the given JSON content even further based on
 * if it's a single `entry` or `feed`
 * @param {object} atomResponseInJson
 * @nameProperties The set of 'name' properties to be constructed on the
 * resultant object e.g., QueueName, TopicName, etc.
 * */
function parseAtomResult(
  atomResponseInJson: any,
  nameProperties: string[]
): object[] | object | undefined {
  let result: any;
  if (!atomResponseInJson) {
    return;
  }

  if (atomResponseInJson.feed) {
    result = parseFeedResult(atomResponseInJson.feed);
  } else if (atomResponseInJson.entry) {
    result = parseEntryResult(atomResponseInJson.entry);
  }

  if (result) {
    if (Array.isArray(result)) {
      result.forEach((entry: object) => {
        setName(entry, nameProperties);
      });
    } else {
      setName(result, nameProperties);
    }
    return result;
  }

  throw new Error("Unrecognized result: " + JSON.stringify(atomResponseInJson));
}

/**
 * @ignore
 * Utility to help parse given `entry` result
 * @param entry
 */
function parseEntryResult(entry: any): object | undefined {
  let result: any;

  if (
    typeof entry !== "object" ||
    entry == null ||
    typeof entry.content !== "object" ||
    entry.content == null
  ) {
    return undefined;
  }

  const contentElementNames = Object.keys(entry.content).filter(function(key) {
    return key !== CoreHttpConstants.XML_METADATA_MARKER;
  });

  if (contentElementNames && contentElementNames[0]) {
    const contentRootElementName = contentElementNames[0];
    delete entry.content[contentRootElementName][CoreHttpConstants.XML_METADATA_MARKER];
    result = entry.content[contentRootElementName];

    if (result) {
      if (entry[CoreHttpConstants.XML_METADATA_MARKER]) {
        result[ServiceBusConstants.ATOM_METADATA_MARKER] =
          entry[CoreHttpConstants.XML_METADATA_MARKER];
      } else {
        result[ServiceBusConstants.ATOM_METADATA_MARKER] = {};
      }

      result[ServiceBusConstants.ATOM_METADATA_MARKER][
        "ContentRootElement"
      ] = contentRootElementName;

      Object.keys(entry).forEach((property: string) => {
        if (property !== "content" && property !== CoreHttpConstants.XML_METADATA_MARKER) {
          result[ServiceBusConstants.ATOM_METADATA_MARKER][property] = entry[property];
        }
      });

      return result;
    }
  }

  return undefined;
}

/**
 * @ignore
 * Utility to help parse given `feed` result
 * @param feed
 */
function parseFeedResult(feed: any): object[] {
  const result = [];
  if (typeof feed === "object" && feed != null && feed.entry) {
    if (Array.isArray(feed.entry)) {
      feed.entry.forEach((entry: any) => {
        const parsedEntryResult = parseEntryResult(entry);
        if (parsedEntryResult) {
          result.push(parsedEntryResult);
        }
      });
    } else {
      const parsedEntryResult = parseEntryResult(feed.entry);
      if (parsedEntryResult) {
        result.push(parsedEntryResult);
      }
    }
  }
  return result;
}

function isKnownResponseCode(
  statusCode: number
): statusCode is keyof typeof ServiceBusConstants.HttpResponseCodes {
  return !!(ServiceBusConstants.HttpResponseCodes as { [statusCode: number]: string })[statusCode];
}

/**
 * @ignore
 * Extracts the applicable entity name(s) from the URL based on the known structure
 * and instantiates the corresponding name properties to the deserialized response
 *
 * For instance, following is the URL structure for when creating a rule
 * `<namespace-component>/<topic-name>/Subscriptions/<subscription-name>/Rules/<rule-name>`
 *
 * @param entry
 * @param nameProperties
 */
function setName(entry: any, nameProperties: any): any {
  if (entry[ServiceBusConstants.ATOM_METADATA_MARKER]) {
    const parsedUrl = new URL(entry[ServiceBusConstants.ATOM_METADATA_MARKER].id);

    const parts = parsedUrl.pathname!.split("/");

    for (let i = 0; i * 2 < parts.length - 1; i++) {
      entry[nameProperties[i]] = parts[i * 2 + 1];
    }
  }
}

/**
 *
 * Utility to help construct the normalized `RestError` object based on given `errorBody`
 * data and other data present in the received `response` object.
 *
 * @param errorBody
 * @param response
 */
export function buildError(errorBody: any, response: HttpOperationResponse): RestError {
  const normalizedError: any = {};
  const odataErrorFormat = !!errorBody["odata.error"];
  const errorProperties =
    errorBody.Error || errorBody.error || errorBody["odata.error"] || errorBody;
  let errorMessage;

  if (typeof errorBody === "string") {
    errorMessage = errorBody;
  } else {
    if (odataErrorFormat) {
      Object.keys(errorProperties).forEach((property: string) => {
        let value = null;
        if (
          property === ServiceBusConstants.ODATA_ERROR_MESSAGE &&
          typeof errorProperties[ServiceBusConstants.ODATA_ERROR_MESSAGE] !== "string"
        ) {
          if (
            errorProperties[ServiceBusConstants.ODATA_ERROR_MESSAGE][
              ServiceBusConstants.ODATA_ERROR_MESSAGE_VALUE
            ]
          ) {
            value =
              errorProperties[ServiceBusConstants.ODATA_ERROR_MESSAGE][
                ServiceBusConstants.ODATA_ERROR_MESSAGE_VALUE
              ];
          } else {
            value = "missing value in the message property of the odata error format";
          }
        } else {
          value = errorProperties[property];
        }
        normalizedError[property.toLowerCase()] = value;
      });
    } else {
      Object.keys(errorProperties).forEach((property: any) => {
        {
          let value = null;
          if (property !== CoreHttpConstants.XML_METADATA_MARKER) {
            if (
              errorProperties[property] &&
              errorProperties[property][CoreHttpConstants.XML_VALUE_MARKER]
            ) {
              value = errorProperties[property][CoreHttpConstants.XML_VALUE_MARKER];
            } else {
              value = errorProperties[property];
            }
            normalizedError[property.toLowerCase()] = value;
          }
        }
      });
    }
    errorMessage = normalizedError.code;
    if (normalizedError.detail) {
      errorMessage += " - " + normalizedError.detail;
    }
  }

  const error: RestError = new RestError(
    `ATOM Service Error: ${errorMessage}`,
    normalizedError.code,
    response.status,
    stripRequest(response.request),
    stripResponse(response)
  );
  return error;
}
