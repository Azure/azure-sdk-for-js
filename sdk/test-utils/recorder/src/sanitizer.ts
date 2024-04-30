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
 * Extract sanitizers for given key and make SanitizerRequestBody[] arrays out of them for /addSanitizers requests
 */
function addSanitizersBodiesForBatch(
  options: SanitizerOptions,
  key: keyof SanitizerOptions
): SanitizerRequestBody[] {
  if (key === "generalSanitizers") {
    return makeFindReplaceSanitizerBodiesForBatch(
      options[key],
      "GeneralRegexSanitizer",
      "GeneralStringSanitizer",
    );
  }
  if (key === "bodySanitizers") {
    return makeFindReplaceSanitizerBodiesForBatch(
      options[key],
      "BodyRegexSanitizer",
      "BodyStringSanitizer",
    );
  }
  if (key === "headerSanitizers") return makeHeaderSanitizerBodiesForBatch(options[key]);
  if (key === "uriSanitizers") {
    return makeFindReplaceSanitizerBodiesForBatch(
      options[key],
      "UriRegexSanitizer",
      "UriStringSanitizer",
    );
  }
  if (key === "connectionStringSanitizers") {
    return makeConnectionStringSanitizerBodiesForBatch(options[key]);
  }
  if (key === "bodyKeySanitizers") return makeBodyKeySanitizerBodiesForBatch(options[key]);
  if (key === "continuationSanitizers") {
    return makeContinuationSanitizerBodiesForBatch(options[key]);
  }
  if (key === "removeHeaderSanitizer") {
    return options[key]
      ? [
        {
          Name: "RemoveHeaderSanitizer",
          Body: {
            headersForRemoval: options[key]?.headersForRemoval.toString(),
          },
        },
      ]
      : [];
  }
  if (key === "oAuthResponseSanitizer") {
    return [{ Name: "OAuthResponseSanitizer", Body: undefined }];
  }
  if (key === "uriSubscriptionIdSanitizer") {
    return [{ Name: "UriSubscriptionIdSanitizer", Body: options[key] }];
  }
  if (key === "resetSanitizer") return [{ Name: "Reset", Body: undefined }];

  throw new RecorderError(
    `Unexpected key "${key}" for sanitizers is seen while making the request body for /addSanitizers`,
  );
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
  const sanitizerBodies: SanitizerRequestBody[] = [];

  for (const key of Object.keys(options)) {
    sanitizerBodies.push(...addSanitizersBodiesForBatch(options, key as keyof SanitizerOptions));
  }

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
 * Makes a sanitizer-bodies array that is sent over as the addSanitizers request body
 * for a FindReplaceSanitizer, for example a bodySanitizer.
 *
 * Depending on the input FindReplaceSanitizer options, either adds a sanitizer named `regexSanitizerName`
 * or `stringSanitizerName`.
 */
function makeFindReplaceSanitizerBodiesForBatch(
  sanitizers: FindReplaceSanitizer[] | undefined,
  regexSanitizerName: ProxyToolSanitizers,
  stringSanitizerName: ProxyToolSanitizers,
): SanitizerRequestBody[] {
  const bodies: SanitizerRequestBody[] = [];
  if (!sanitizers) return bodies;
  for (const sanitizer of sanitizers) {
    if (isStringSanitizer(sanitizer)) {
      bodies.push({
        Name: stringSanitizerName,
        Body: {
          target: sanitizer.target,
          value: sanitizer.value,
        },
      });
    } else {
      bodies.push({
        Name: regexSanitizerName,
        Body: {
          regex: sanitizer.target,
          value: sanitizer.value,
          groupForReplace: sanitizer.groupForReplace,
        },
      });
    }
  }
  return bodies;
}

/**
 * Adds a HeaderRegexSanitizer or HeaderStringSanitizer.
 *
 * HeaderSanitizer is a special case of FindReplaceSanitizer where a header name ('key') must be provided.
 * Additionally, the 'target' option is not required. If target is unspecified, the header's value will always
 * be replaced.
 */
function makeHeaderSanitizerBodiesForBatch(
  sanitizers: HeaderSanitizer[] | undefined,
): SanitizerRequestBody[] {
  if (!sanitizers) return [];
  const bodies: SanitizerRequestBody[] = [];
  for (const sanitizer of sanitizers) {
    if (sanitizer.regex || !sanitizer.target) {
      bodies.push({
        Name: "HeaderRegexSanitizer",
        Body: {
          key: sanitizer.key,
          value: sanitizer.value,
          regex: sanitizer.target,
          groupForReplace: sanitizer.groupForReplace,
        },
      });
    } else {
      bodies.push({
        Name: "HeaderStringSanitizer",
        Body: {
          key: sanitizer.key,
          target: sanitizer.target,
          value: sanitizer.value,
        },
      });
    }
  }
  return bodies;
}

/**
 *  Internally,
 * - connection strings are parsed and
 * - each part of the connection string is mapped with its corresponding fake value
 * - GeneralStringSanitizer is applied for each of the parts with the real and fake values that are parsed
 */
function makeConnectionStringSanitizerBodiesForBatch(
  sanitizers: ConnectionStringSanitizer[] | undefined,
): SanitizerRequestBody[] {
  if (!sanitizers) return [];
  const bodies: SanitizerRequestBody[] = [];
  for (const sanitizer of sanitizers) {
    if (!sanitizer.actualConnString) {
      throw new RecorderError(
        `Attempted to add an invalid sanitizer - ${JSON.stringify({
          actualConnString: sanitizer.actualConnString,
          fakeConnString: sanitizer.fakeConnString,
        })}`,
      );
    }
    // extract connection string parts and match call
    const pairsMatched = getRealAndFakePairs(sanitizer.actualConnString, sanitizer.fakeConnString);
    bodies.push(
      ...makeFindReplaceSanitizerBodiesForBatch(
        Object.entries(pairsMatched).map(([key, value]) => {
          return { value, target: key };
        }),
        "GeneralRegexSanitizer",
        "GeneralStringSanitizer",
      ),
    );
  }
  return bodies;
}

/**
 * Makes a sanitizer-bodies array that is sent over as the addSanitizers request body.
 */
function makeBodyKeySanitizerBodiesForBatch(
  sanitizers: BodyKeySanitizer[] | undefined,
): SanitizerRequestBody[] {
  if (!sanitizers) return [];
  const bodies: SanitizerRequestBody[] = [];
  for (const sanitizer of sanitizers) {
    bodies.push({
      Name: "BodyKeySanitizer",
      Body: sanitizer,
    });
  }
  return bodies;
}

/**
 * Makes a sanitizer-bodies array that is sent over as the addSanitizers request body.
 */
function makeContinuationSanitizerBodiesForBatch(
  sanitizers: ContinuationSanitizer[] | undefined,
): SanitizerRequestBody[] {
  if (!sanitizers) return [];
  const bodies: SanitizerRequestBody[] = [];
  for (const sanitizer of sanitizers) {
    bodies.push({
      Name: "ContinuationSanitizer",
      Body: {
        ...sanitizer,
        resetAfterFirst: sanitizer.resetAfterFirst.toString(),
      },
    });
  }
  return bodies;
}
