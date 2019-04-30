import { ClientRequest, ClientResponse } from "http"; // TYPES ONLY
import * as https from "https"; // TYPES ONLY
import { Socket } from "net";
import { Stream } from "stream";
import * as url from "url";

import { Constants, Helper } from "../common";
import { ConnectionPolicy, MediaReadMode } from "../documents";
import { IHeaders } from "../queryExecutionContext";

import { ErrorResponse } from "./ErrorResponse";
export { ErrorResponse }; // Should refactor this out

import { FeedOptions, MediaOptions, RequestOptions } from ".";
import { AuthHandler, AuthOptions } from "../auth";
import { Response } from "./Response";
export { Response }; // Should refactor this out

// ----------------------------------------------------------------------------
// Utility methods
//

/** @hidden */
function javaScriptFriendlyJSONStringify(s: object) {
  // two line terminators (Line separator and Paragraph separator) are not needed to be escaped in JSON
  // but are needed to be escaped in JavaScript.
  return JSON.stringify(s)
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/** @hidden */
export function bodyFromData(data: Stream | Buffer | string | object) {
  if ((data as Stream).pipe) {
    return data;
  }
  if (Buffer.isBuffer(data)) {
    return data;
  }
  if (typeof data === "string") {
    return data;
  }
  if (typeof data === "object") {
    return javaScriptFriendlyJSONStringify(data);
  }
  return undefined;
}

/** @hidden */
export function parse(urlString: string) {
  return url.parse(urlString);
}

/** @hidden */
export function createRequestObject(
  connectionPolicy: ConnectionPolicy,
  requestOptions: https.RequestOptions,
  body: Buffer
): Promise<Response<any>> {
  return new Promise<Response<any>>((resolve, reject) => {
    function onTimeout() {
      httpsRequest.abort();
    }

    const isMedia = requestOptions.path.indexOf("//media") === 0;

    const httpsRequest: ClientRequest = https.request(requestOptions, (response: ClientResponse) => {
      // In case of media response, return the stream to the user and the user will need
      // to handle reading the stream.
      if (isMedia && connectionPolicy.MediaReadMode === MediaReadMode.Streamed) {
        return resolve({
          result: response,
          headers: response.headers as IHeaders
        });
      }

      let data = "";

      // if the requested data is text (not attachment/media) set the encoding to UTF-8
      if (!isMedia) {
        response.setEncoding("utf8");
      }

      response.on("data", chunk => {
        data += chunk;
      });
      response.on("end", () => {
        if (response.statusCode >= 400) {
          return reject(getErrorBody(response, data, response.headers as IHeaders));
        }

        let result;
        try {
          result = isMedia ? data : data.length > 0 ? JSON.parse(data) : undefined;
        } catch (exception) {
          return reject(exception);
        }

        resolve({ result, headers: response.headers as IHeaders, statusCode: response.statusCode });
      });
    });

    httpsRequest.once("socket", (socket: Socket) => {
      if (isMedia) {
        socket.setTimeout(connectionPolicy.MediaRequestTimeout);
      } else {
        socket.setTimeout(connectionPolicy.RequestTimeout);
      }

      socket.once("timeout", onTimeout);

      httpsRequest.once("response", () => {
        socket.removeListener("timeout", onTimeout);
      });
    });

    httpsRequest.once("error", reject);

    if (body) {
      httpsRequest.write(body);
      httpsRequest.end();
    } else {
      httpsRequest.end();
    }
  });
}

/**
 *  Constructs the error body from the response and the data returned from the request.
 * @param {object} response - response object returned from the executon of a request.
 * @param {object} data - the data body returned from the executon of a request.
 * @hidden
 */
function getErrorBody(response: ClientResponse, data: string, headers: IHeaders): ErrorResponse {
  const errorBody: ErrorResponse = {
    code: response.statusCode,
    body: data,
    headers
  };

  if (Constants.HttpHeaders.ActivityId in response.headers) {
    errorBody.activityId = response.headers[Constants.HttpHeaders.ActivityId] as string;
  }

  if (Constants.HttpHeaders.SubStatus in response.headers) {
    errorBody.substatus = parseInt(response.headers[Constants.HttpHeaders.SubStatus] as string, 10);
  }

  if (Constants.HttpHeaders.RetryAfterInMilliseconds in response.headers) {
    errorBody.retryAfterInMilliseconds = parseInt(
      response.headers[Constants.HttpHeaders.RetryAfterInMilliseconds] as string,
      10
    );
  }

  return errorBody;
}

export async function getHeaders(
  authOptions: AuthOptions,
  defaultHeaders: IHeaders,
  verb: string,
  path: string,
  resourceId: string,
  resourceType: string,
  options: RequestOptions | FeedOptions | MediaOptions,
  partitionKeyRangeId?: string,
  useMultipleWriteLocations?: boolean
): Promise<IHeaders> {
  const headers: IHeaders = { ...defaultHeaders };
  const opts: RequestOptions & FeedOptions & MediaOptions = (options || {}) as any; // TODO: this is dirty

  if (useMultipleWriteLocations) {
    headers[Constants.HttpHeaders.ALLOW_MULTIPLE_WRITES] = true;
  }

  if (opts.continuation) {
    headers[Constants.HttpHeaders.Continuation] = opts.continuation;
  }

  if (opts.preTriggerInclude) {
    headers[Constants.HttpHeaders.PreTriggerInclude] =
      opts.preTriggerInclude.constructor === Array
        ? (opts.preTriggerInclude as string[]).join(",")
        : (opts.preTriggerInclude as string);
  }

  if (opts.postTriggerInclude) {
    headers[Constants.HttpHeaders.PostTriggerInclude] =
      opts.postTriggerInclude.constructor === Array
        ? (opts.postTriggerInclude as string[]).join(",")
        : (opts.postTriggerInclude as string);
  }

  if (opts.offerType) {
    headers[Constants.HttpHeaders.OfferType] = opts.offerType;
  }

  if (opts.offerThroughput) {
    headers[Constants.HttpHeaders.OfferThroughput] = opts.offerThroughput;
  }

  if (opts.maxItemCount) {
    headers[Constants.HttpHeaders.PageSize] = opts.maxItemCount;
  }

  if (opts.accessCondition) {
    if (opts.accessCondition.type === "IfMatch") {
      headers[Constants.HttpHeaders.IfMatch] = opts.accessCondition.condition;
    } else {
      headers[Constants.HttpHeaders.IfNoneMatch] = opts.accessCondition.condition;
    }
  }

  if (opts.a_im) {
    headers[Constants.HttpHeaders.A_IM] = opts.a_im;
  }

  if (opts.indexingDirective) {
    headers[Constants.HttpHeaders.IndexingDirective] = opts.indexingDirective;
  }

  if (opts.consistencyLevel) {
    headers[Constants.HttpHeaders.ConsistencyLevel] = opts.consistencyLevel;
  }

  if (opts.resourceTokenExpirySeconds) {
    headers[Constants.HttpHeaders.ResourceTokenExpiry] = opts.resourceTokenExpirySeconds;
  }

  if (opts.sessionToken) {
    headers[Constants.HttpHeaders.SessionToken] = opts.sessionToken;
  }

  if (opts.enableScanInQuery) {
    headers[Constants.HttpHeaders.EnableScanInQuery] = opts.enableScanInQuery;
  }

  if (opts.enableCrossPartitionQuery) {
    headers[Constants.HttpHeaders.EnableCrossPartitionQuery] = opts.enableCrossPartitionQuery;
  }

  if (opts.populateQuotaInfo) {
    headers[Constants.HttpHeaders.PopulateQuotaInfo] = opts.populateQuotaInfo;
  }

  if (opts.populateQueryMetrics) {
    headers[Constants.HttpHeaders.PopulateQueryMetrics] = opts.populateQueryMetrics;
  }

  if (opts.maxDegreeOfParallelism !== undefined) {
    headers[Constants.HttpHeaders.ParallelizeCrossPartitionQuery] = true;
  }

  if (opts.populateQuotaInfo) {
    headers[Constants.HttpHeaders.PopulateQuotaInfo] = true;
  }

  if (opts.partitionKey !== undefined) {
    let partitionKey: string[] | string = opts.partitionKey;
    if (partitionKey === null || !Array.isArray(partitionKey)) {
      partitionKey = [partitionKey as string];
    }
    headers[Constants.HttpHeaders.PartitionKey] = Helper.jsonStringifyAndEscapeNonASCII(partitionKey);
  }

  if (authOptions.masterKey || authOptions.key || authOptions.tokenProvider) {
    headers[Constants.HttpHeaders.XDate] = new Date().toUTCString();
  }

  if (verb === "post" || verb === "put") {
    if (!headers[Constants.HttpHeaders.ContentType]) {
      headers[Constants.HttpHeaders.ContentType] = Constants.MediaTypes.Json;
    }
  }

  if (!headers[Constants.HttpHeaders.Accept]) {
    headers[Constants.HttpHeaders.Accept] = Constants.MediaTypes.Json;
  }

  if (partitionKeyRangeId !== undefined) {
    headers[Constants.HttpHeaders.PartitionKeyRangeID] = partitionKeyRangeId;
  }

  if (opts.enableScriptLogging) {
    headers[Constants.HttpHeaders.EnableScriptLogging] = opts.enableScriptLogging;
  }

  if (opts.offerEnableRUPerMinuteThroughput) {
    headers[Constants.HttpHeaders.OfferIsRUPerMinuteThroughputEnabled] = true;
  }

  if (opts.disableRUPerMinuteUsage) {
    headers[Constants.HttpHeaders.DisableRUPerMinuteUsage] = true;
  }
  if (
    authOptions.masterKey ||
    authOptions.key ||
    authOptions.resourceTokens ||
    authOptions.tokenProvider ||
    authOptions.permissionFeed
  ) {
    const token = await AuthHandler.getAuthorizationHeader(authOptions, verb, path, resourceId, resourceType, headers);
    headers[Constants.HttpHeaders.Authorization] = token;
  }
  return headers;
}
