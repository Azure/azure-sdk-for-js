// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Constants } from "./constants";
import { isString } from "./utils";
import { serializeJsonToAtomXml, deserializeAtomXmlToJson } from "./xml";
import { HttpOperationResponse } from "../httpOperationResponse";

export interface AtomXmlSerializer {
  serialize(resourceDataInJson: any): string;

  deserialize(
    response: HttpOperationResponse,
    shouldParseResponse: boolean
  ): Promise<HttpOperationResponse>;
}

/**
 * @ignore
 * Type representing the JSON representation of XML request data
 */
interface XMLRequestInJSON {
  [key: string]: {
    $: { xmlns: string };
    [key: string]: any;
  };
}

/**
 * @ignore
 * Type representing the JSON representation of XML response data
 */
interface XMLResponseInJSON {
  [key: string]: any;
}

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
): string {
  const content: XMLRequestInJSON = {};
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

  return serializeJsonToAtomXml(content);
}

/**
 * @ignore
 * Utility to deserialize the given JSON content even further based on
 * if it's a single `entry` or `feed`
 * @param {object} atomResponseInJson
 * */
function parseAtomResult(
  atomResponseInJson: any
): XMLResponseInJSON[] | XMLResponseInJSON | undefined {
  if (!atomResponseInJson) {
    return;
  }

  if (atomResponseInJson.feed) {
    return parseFeedResult(atomResponseInJson.feed);
  }

  if (atomResponseInJson.entry) {
    return parseEntryResult(atomResponseInJson.entry);
  }

  throw new Error("Unrecognized result: " + JSON.stringify(atomResponseInJson));
}

/**
 * @ignore
 * Utility to help parse given `entry` result
 * @param entry
 */
function parseEntryResult(entry: any): XMLResponseInJSON | undefined {
  let result: XMLResponseInJSON;

  if (
    typeof entry !== "object" ||
    entry == null ||
    typeof entry.content !== "object" ||
    entry.content == null
  ) {
    return undefined;
  }

  const contentElementNames = Object.keys(entry.content).filter(function(key) {
    return key !== Constants.XML_METADATA_MARKER;
  });

  if (contentElementNames && contentElementNames[0]) {
    const contentRootElementName = contentElementNames[0];
    delete entry.content[contentRootElementName][Constants.XML_METADATA_MARKER];
    result = entry.content[contentRootElementName];

    if (result) {
      if (entry[Constants.XML_METADATA_MARKER]) {
        result[Constants.ATOM_METADATA_MARKER] = entry[Constants.XML_METADATA_MARKER];
      } else {
        result[Constants.ATOM_METADATA_MARKER] = {};
      }

      result[Constants.ATOM_METADATA_MARKER]["ContentRootElement"] = contentRootElementName;

      Object.keys(entry).forEach((property: string) => {
        if (property !== "content" && property !== Constants.XML_METADATA_MARKER) {
          result[Constants.ATOM_METADATA_MARKER][property] = entry[property];
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
function parseFeedResult(feed: any): XMLResponseInJSON[] {
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

/**
 * Transforms response to contain the parsed data.
 * @param nameProperties The set of 'name' properties to be constructed on the
 * resultant object e.g., QueueName, TopicName, etc.
 * @param response
 * @param shouldParseResponse
 */
export async function deserializeAtomXmlResponse(
  nameProperties: string[],
  response: HttpOperationResponse,
  shouldParseResponse: boolean
): Promise<HttpOperationResponse> {
  let atomResponseInJson: any;
  try {
    if (response.bodyAsText && response.bodyAsText.toString().length > 0) {
      atomResponseInJson = await deserializeAtomXmlToJson(response.bodyAsText);
      response.parsedBody = atomResponseInJson;
    }
  } catch (e) {
    response.errorBody = {
      error: { code: "ResponseNotInAtomXMLFormat" }
    };
  }

  if (response.status < 200 || response.status > 300) {
    if (response.errorBody == undefined) {
      const HttpResponseCodes = Constants.HttpResponseCodes;
      const statusCode = response.status;
      if (!isKnownResponseCode(statusCode)) {
        response.errorBody = {
          error: { code: `UnrecognizedHttpResponseStatus: ${statusCode}` }
        };
      } else {
        response.errorBody = { error: { code: HttpResponseCodes[statusCode] } };
      }
    }
  }

  // Transform the errorBody to a normalized one
  const normalizedError = normalizeError(response.errorBody, response);
  response.errorBody = normalizedError;

  // Construct response with 'result' to be backward compatibile
  const responseInCustomJson: any = {
    error: response.errorBody,
    response: response.parsedBody,
    result: shouldParseResponse ? [] : undefined
  };

  if (responseInCustomJson.error == undefined) {
    const result = shouldParseResponse ? parseAtomResult(atomResponseInJson) : undefined;
    if (result) {
      if (Array.isArray(result)) {
        result.forEach((entry: XMLResponseInJSON) => {
          setName(entry, nameProperties);
        });
      } else {
        setName(result, nameProperties);
      }
    }
    responseInCustomJson.result = result;
  }

  response.parsedBody = responseInCustomJson;
  return response;
}

function isKnownResponseCode(
  statusCode: number
): statusCode is keyof typeof Constants.HttpResponseCodes {
  return !!(Constants.HttpResponseCodes as { [statusCode: number]: string })[statusCode];
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
function setName(entry: XMLResponseInJSON, nameProperties: any): any {
  if (entry[Constants.ATOM_METADATA_MARKER]) {
    const parsedUrl = new URL(entry[Constants.ATOM_METADATA_MARKER].id);

    const parts = parsedUrl.pathname!.split("/");

    for (let i = 0; i * 2 < parts.length - 1; i++) {
      entry[nameProperties[i]] = parts[i * 2 + 1];
    }
  }
}

/**
 * @ignore
 * Utility to help construct the normalized error object based on given `errorBody`
 * data and other data present in the received `response` object.
 *
 * @param errorBody
 * @param response
 */
function normalizeError(errorBody: any, response: HttpOperationResponse): any {
  if (isString(errorBody)) {
    return new Error(errorBody);
  } else if (errorBody) {
    const normalizedError: any = {};
    const odataErrorFormat = !!errorBody["odata.error"];
    const errorProperties =
      errorBody.Error || errorBody.error || errorBody["odata.error"] || errorBody;

    if (odataErrorFormat) {
      Object.keys(errorProperties).forEach((property: string) => {
        let value = null;
        if (
          property === Constants.ODATA_ERROR_MESSAGE &&
          !isString(errorProperties[Constants.ODATA_ERROR_MESSAGE])
        ) {
          if (errorProperties[Constants.ODATA_ERROR_MESSAGE][Constants.ODATA_ERROR_MESSAGE_VALUE]) {
            value =
              errorProperties[Constants.ODATA_ERROR_MESSAGE][Constants.ODATA_ERROR_MESSAGE_VALUE];
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
          if (property !== Constants.XML_METADATA_MARKER) {
            if (
              errorProperties[property] &&
              errorProperties[property][Constants.XML_VALUE_MARKER]
            ) {
              value = errorProperties[property][Constants.XML_VALUE_MARKER];
            } else {
              value = errorProperties[property];
            }
            normalizedError[property.toLowerCase()] = value;
          }
        }
      });
    }
    let errorMessage = normalizedError.code;
    if (normalizedError.detail) {
      errorMessage += " - " + normalizedError.detail;
    }

    if (response) {
      if (response.status) {
        normalizedError.statusCode = response.status;
      }

      if (response.headers && response.headers.get("x-ms-request-id")) {
        normalizedError.requestId = response.headers.get("x-ms-request-id");
      }
    }

    const errorObject: any = { error: { code: errorMessage } };
    Object.keys(normalizedError).forEach((property: string) => {
      errorObject[property] = normalizedError[property];
    });
    return errorObject;
  }

  return undefined;
}
