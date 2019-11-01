// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  HttpOperationResponse,
  RestError,
  stripRequest,
  stripResponse,
  WebResource,
  stringifyXML,
  parseXML,
  ServiceClient
} from "@azure/core-http";

import * as Constants from "./constants";
import * as log from "../log";
import { Buffer } from "buffer";

/**
 * @ignore
 * Represents the internal ATOM XML serializer interface
 */
export interface AtomXmlSerializer {
  serialize(requestBodyInJson: object): object;

  deserialize(response: HttpOperationResponse): Promise<HttpOperationResponse>;
}

/**
 * @ignore
 * Utility to execute Atom XML operations as HTTP requests
 * @param webResource
 * @param serializer
 */
export async function executeAtomXmlOperation(
  serviceBusAtomManagementClient: ServiceClient,
  webResource: WebResource,
  serializer: AtomXmlSerializer
): Promise<HttpOperationResponse> {
  if (webResource.body) {
    const content: object = serializer.serialize(JSON.parse(webResource.body));
    webResource.body = stringifyXML(content, { rootName: "entry" });
  }

  if (webResource.method == "PUT") {
    webResource.headers.set("content-length", Buffer.byteLength(webResource.body));
  }

  log.httpAtomXml(`Executing ATOM based HTTP request: ${webResource.body}`);

  const response: HttpOperationResponse = await serviceBusAtomManagementClient.sendRequest(
    webResource
  );

  log.httpAtomXml(`Received ATOM based HTTP response: ${response.bodyAsText}`);

  try {
    if (response.bodyAsText) {
      response.parsedBody = await parseXML(response.bodyAsText, { includeRoot: true });
    }
  } catch (err) {
    const error = new RestError(
      `ResponseNotInAtomXMLFormat - ${err.message}`,
      RestError.PARSE_ERROR,
      response.status,
      stripRequest(response.request),
      stripResponse(response)
    );

    throw error;
  }

  return serializer.deserialize(response);
}

/**
 * Serializes input information to construct the Atom XML request
 * @param resourceName Name of the resource to be serialized like `QueueDescription`
 * @param resource The entity details
 * @param allowedProperties The set of properties that are allowed by the service for the
 * associated operation(s);
 */
export function serializeToAtomXmlRequest(resourceName: string, resource: any): object {
  const content: any = {};
  content[resourceName] = resource;
  content[resourceName][Constants.XML_METADATA_MARKER] = {
    xmlns: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
    "xmlns:i": "http://www.w3.org/2001/XMLSchema-instance"
  };

  content[Constants.XML_METADATA_MARKER] = { type: "application/xml" };
  const requestDetails: any = {
    updated: new Date().toISOString(),
    content: content
  };
  requestDetails[Constants.XML_METADATA_MARKER] = {
    xmlns: "http://www.w3.org/2005/Atom"
  };
  return requestDetails;
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
      const HttpResponseCodes: any = Constants.HttpResponseCodes;
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

  throw new Error("Unrecognized Atom XML result: " + JSON.stringify(atomResponseInJson));
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
): statusCode is keyof typeof Constants.HttpResponseCodes {
  return !!(Constants.HttpResponseCodes as { [statusCode: number]: string })[statusCode];
}

/**
 * @ignore
 * Extracts the applicable entity name(s) from the URL based on the known structure
 * and instantiates the corresponding name properties to the deserialized response
 *
 * The pattern matching checks to extract entity names are based on following
 * constraints dictated by the service
 * - '/' is allowed in Queue and Topic names
 * - '/' is not allowed in Namespace, Subscription and Rule names
 * - Valid pathname URL structures used in the ATOM based management API are
 *     - `<namespace-component>/<topic-name>/Subscriptions/<subscription-name>/Rules/<rule-name>`
 *     - `<namespace-component>/<topic-name>/Subscriptions/<subscription-name>`
 *     - `<namespace-component>/<any-entity-name>`
 *
 * @param entry
 * @param nameProperties
 */
function setName(entry: any, nameProperties: any): any {
  if (entry[Constants.ATOM_METADATA_MARKER]) {
    let rawUrl = entry[Constants.ATOM_METADATA_MARKER].id;

    // The parsedUrl gets constructed differently for browser vs Node.
    // It is specifically behaves different for some of the Atom based management API where
    // the received URL in "id" element is of type "sb:// ... " and not a standard HTTP one
    // Hence, normalizing the URL for parsing to work as expected in browser
    if (rawUrl.startsWith("sb://")) {
      rawUrl = "https://" + rawUrl.substring(5);
    }

    const parsedUrl = new URL(rawUrl);
    const pathname: string = parsedUrl.pathname;

    const firstIndexOfDelimiter = pathname.indexOf("/");

    if (pathname.match("(.*)/(.*)/Subscriptions/(.*)/Rules/(.*)")) {
      const lastIndexOfSubscriptionsDelimiter = pathname.lastIndexOf("/Subscriptions/");
      const firstIndexOfRulesDelimiter = pathname.indexOf("/Rules/");
      entry[nameProperties[0]] = pathname.substring(
        firstIndexOfDelimiter + 1,
        lastIndexOfSubscriptionsDelimiter
      );
      entry[nameProperties[1]] = pathname.substring(
        lastIndexOfSubscriptionsDelimiter + 15,
        firstIndexOfRulesDelimiter
      );
      entry[nameProperties[2]] = pathname.substring(firstIndexOfRulesDelimiter + 7);
    } else if (pathname.match("(.*)/(.*)/Subscriptions/(.*)")) {
      const lastIndexOfSubscriptionsDelimiter = pathname.lastIndexOf("/Subscriptions/");
      entry[nameProperties[0]] = pathname.substring(
        firstIndexOfDelimiter + 1,
        lastIndexOfSubscriptionsDelimiter
      );
      entry[nameProperties[1]] = pathname.substring(lastIndexOfSubscriptionsDelimiter + 15);
    } else if (pathname.match("(.*)/(.*)")) {
      entry[nameProperties[0]] = pathname.substring(firstIndexOfDelimiter + 1);
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
        let value = errorProperties[property];
        if (property === Constants.ODATA_ERROR_MESSAGE && typeof value !== "string") {
          if (value && value[Constants.ODATA_ERROR_MESSAGE_VALUE]) {
            value = value[Constants.ODATA_ERROR_MESSAGE_VALUE];
          } else {
            value = "missing value in the message property of the odata error format";
          }
        }
        normalizedError[property.toLowerCase()] = value;
      });
    } else {
      Object.keys(errorProperties).forEach((property: any) => {
        let value = errorProperties[property];
        if (property !== Constants.XML_METADATA_MARKER) {
          if (value && value[Constants.XML_VALUE_MARKER]) {
            value = value[Constants.XML_VALUE_MARKER];
          }
          normalizedError[property.toLowerCase()] = value;
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
