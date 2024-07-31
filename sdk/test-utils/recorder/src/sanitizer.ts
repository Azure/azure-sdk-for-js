// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient } from "@azure/core-rest-pipeline";
import { logger } from "./log.js";
import { getRealAndFakePairs } from "./utils/connectionStringHelpers.js";
import { createRecordingRequest } from "./utils/createRecordingRequest.js";
import { paths } from "./utils/paths.js";
import {
  BodyKeySanitizer,
  ConnectionStringSanitizer,
  ContinuationSanitizer,
  FindReplaceSanitizer,
  getTestMode,
  HeaderSanitizer,
  isStringSanitizer,
  ProxyToolSanitizers,
  RecorderError,
  SanitizerOptions,
} from "./utils/utils.js";

/**
 * Returns the html document of all the available transforms in the proxy-tool
 */
export async function transformsInfo(
  httpClient: HttpClient,
  url: string,
  recordingId: string,
): Promise<string | null | undefined> {
  if (recordingId) {
    const infoUri = `${url}${paths.info}${paths.available}`;
    const req = createRecordingRequest(infoUri, undefined, recordingId, "GET");
    if (!httpClient) {
      throw new RecorderError(
        `Something went wrong, Sanitizer.httpClient should not have been undefined in ${getTestMode()} mode.`,
      );
    }
    const rsp = await httpClient.sendRequest({
      ...req,
      allowInsecureConnection: true,
    });
    if (rsp.status !== 200) {
      throw new RecorderError("Info request failed.");
    }
    return rsp.bodyAsText;
  } else {
    throw new RecorderError("Bad state, recordingId is not defined when called transformsInfo().");
  }
}

/**
 * Array of objects of this type would constitute to be the request body of /addSanitizers
 */
type SanitizerRequestBody = {
  Name: string;
  Body: Record<string, unknown> | undefined;
};

/**
 * Extract sanitizers for each key and make SanitizerRequestBody[] array out of them for /addSanitizers request
 */
function makeBatchSanitizerBody(sanitizers: SanitizerOptions): SanitizerRequestBody[] {
  const {
    generalSanitizers,
    bodySanitizers,
    headerSanitizers,
    uriSanitizers,
    connectionStringSanitizers,
    bodyKeySanitizers,
    continuationSanitizers,
    removeHeaderSanitizer,
    oAuthResponseSanitizer,
    uriSubscriptionIdSanitizer,
    resetSanitizer,
  } = sanitizers;
  let connectionStringSanitizersBodies: SanitizerRequestBody[] = [];
  for (const sanitizer of connectionStringSanitizers ?? []) {
    connectionStringSanitizersBodies = connectionStringSanitizersBodies.concat(
      makeConnectionStringSanitizerBody(sanitizer),
    );
  }

  return (<SanitizerRequestBody[]>[]).concat(
    getSanitizerBodies(
      generalSanitizers,
      makeFindReplaceSanitizerBody("GeneralRegexSanitizer", "GeneralStringSanitizer"),
    ),
    getSanitizerBodies(
      bodySanitizers,
      makeFindReplaceSanitizerBody("BodyRegexSanitizer", "BodyStringSanitizer"),
    ),
    getSanitizerBodies(headerSanitizers, makeHeaderSanitizerBody),
    getSanitizerBodies(
      uriSanitizers,
      makeFindReplaceSanitizerBody("UriRegexSanitizer", "UriStringSanitizer"),
    ),
    connectionStringSanitizersBodies,
    getSanitizerBodies(bodyKeySanitizers, makeBodyKeySanitizerBody),
    getSanitizerBodies(continuationSanitizers, makeContinuationSanitizerBody),
    removeHeaderSanitizer
      ? [
          {
            Name: "RemoveHeaderSanitizer",
            Body: {
              headersForRemoval: removeHeaderSanitizer.headersForRemoval.toString(),
            },
          },
        ]
      : [],
    oAuthResponseSanitizer ? [{ Name: "OAuthResponseSanitizer", Body: undefined }] : [],
    uriSubscriptionIdSanitizer
      ? [{ Name: "UriSubscriptionIdSanitizer", Body: uriSubscriptionIdSanitizer }]
      : [],
    resetSanitizer ? [{ Name: "Reset", Body: undefined }] : [],
  );
}

/**
 * Makes a /removeSanitizers request to the test proxy
 * This API is meant to remove the central sanitizers that were added by the proxy-tool
 * You'd need to pass the sanitizer ids that you want the test-proxy to remove for your recording
 *
 * Read more at https://github.com/Azure/azure-sdk-tools/pull/8142/files
 */
export async function removeCentralSanitizers(
  httpClient: HttpClient,
  url: string,
  recordingId: string | undefined,
  removalList: string[],
): Promise<void> {
  const uri = `${url}${paths.admin}${paths.removeSanitizers}`;
  const req = createRecordingRequest(uri, undefined, recordingId);
  req.headers.set("Content-Type", "application/json");
  req.body = JSON.stringify({
    Sanitizers: removalList,
  });
  logger.info("[removeSanitizers] Removing sanitizers", removalList);
  const rsp = await httpClient.sendRequest({
    ...req,
    allowInsecureConnection: true,
  });
  if (rsp.status !== 200) {
    logger.error("[removeSanitizers] removeSanitizers request failed", rsp);
    throw new RecorderError("removeSanitizers request failed.");
  }
}

/**
 * Makes an /addSanitizers request to the test proxy
 */
export async function addSanitizers(
  httpClient: HttpClient,
  url: string,
  recordingId: string | undefined,
  options: SanitizerOptions,
): Promise<void> {
  const sanitizerBodies = makeBatchSanitizerBody(options);

  if (sanitizerBodies.length === 0) return;
  const uri = `${url}${paths.admin}${paths.addSanitizers}`;
  const req = createRecordingRequest(uri, undefined, recordingId);

  req.headers.set("Content-Type", "application/json");
  req.body = JSON.stringify(sanitizerBodies);

  logger.info("[addSanitizers] Adding sanitizers", options);
  const rsp = await httpClient.sendRequest({
    ...req,
    allowInsecureConnection: true,
  });
  if (rsp.status !== 200) {
    logger.error("[addSanitizers] addSanitizers request failed", rsp);
    throw new RecorderError("addSanitizers request failed.");
  }
}

// Batch sanitizer body makers

/**
 * Makes a sanitizer-bodies array from the sanitizers provided that is sent over as the addSanitizers request body.
 * Also takes in the function that makes the body for each sanitizer.
 */
function getSanitizerBodies<T>(
  sanitizers: T[] | undefined,
  func: (sanitizer: T) => SanitizerRequestBody,
): SanitizerRequestBody[] {
  return sanitizers?.map(func) ?? [];
}

/**
 * Makes a sanitizer-body array, part of the array that is sent over as the addSanitizers request body.
 * for a FindReplaceSanitizer, for example a bodySanitizer.
 *
 * Depending on the input FindReplaceSanitizer options, either adds a sanitizer named `regexSanitizerName`
 * or `stringSanitizerName`.
 */
function makeFindReplaceSanitizerBody(
  regexSanitizerName: ProxyToolSanitizers,
  stringSanitizerName: ProxyToolSanitizers,
): (sanitizer: FindReplaceSanitizer) => SanitizerRequestBody {
  return (sanitizer: FindReplaceSanitizer): SanitizerRequestBody => {
    if (isStringSanitizer(sanitizer)) {
      return {
        Name: stringSanitizerName,
        Body: {
          target: sanitizer.target,
          value: sanitizer.value,
        },
      };
    }
    return {
      Name: regexSanitizerName,
      Body: {
        regex: sanitizer.target,
        value: sanitizer.value,
        groupForReplace: sanitizer.groupForReplace,
      },
    };
  };
}

/**
 * Adds a HeaderRegexSanitizer or HeaderStringSanitizer.
 *
 * HeaderSanitizer is a special case of FindReplaceSanitizer where a header name ('key') must be provided.
 * Additionally, the 'target' option is not required. If target is unspecified, the header's value will always
 * be replaced.
 */
function makeHeaderSanitizerBody(sanitizer: HeaderSanitizer): SanitizerRequestBody {
  if (sanitizer.regex || !sanitizer.target) {
    return {
      Name: "HeaderRegexSanitizer",
      Body: {
        key: sanitizer.key,
        value: sanitizer.value,
        regex: sanitizer.target,
        groupForReplace: sanitizer.groupForReplace,
      },
    };
  }
  return {
    Name: "HeaderStringSanitizer",
    Body: {
      key: sanitizer.key,
      target: sanitizer.target,
      value: sanitizer.value,
    },
  };
}

/**
 *  Internally,
 * - connection strings are parsed and
 * - each part of the connection string is mapped with its corresponding fake value
 * - GeneralStringSanitizer is applied for each of the parts with the real and fake values that are parsed
 */
function makeConnectionStringSanitizerBody(
  sanitizer: ConnectionStringSanitizer,
): SanitizerRequestBody[] {
  if (!sanitizer.actualConnString) {
    throw new RecorderError(
      `Attempted to add an invalid sanitizer - ${JSON.stringify({
        actualConnString: sanitizer.actualConnString,
        fakeConnString: sanitizer.fakeConnString,
      })}`,
    );
  }
  const pairsMatched = getRealAndFakePairs(sanitizer.actualConnString, sanitizer.fakeConnString);
  return Object.entries(pairsMatched).map(([key, value]) => {
    return { Name: "GeneralStringSanitizer", Body: { value, target: key } };
  });
}

/**
 * Makes a sanitizer-body, part of the array that is sent over as the addSanitizers request body.
 */
function makeBodyKeySanitizerBody(sanitizer: BodyKeySanitizer): SanitizerRequestBody {
  return {
    Name: "BodyKeySanitizer",
    Body: sanitizer,
  };
}

/**
 * Makes a sanitizer-body, part of the array that is sent over as the addSanitizers request body.
 */
function makeContinuationSanitizerBody(sanitizer: ContinuationSanitizer): SanitizerRequestBody {
  return {
    Name: "ContinuationSanitizer",
    Body: {
      ...sanitizer,
      resetAfterFirst: sanitizer.resetAfterFirst.toString(),
    },
  };
}
