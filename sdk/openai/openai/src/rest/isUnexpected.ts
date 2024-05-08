// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetAudioTranscriptionAsPlainText200Response,
  GetAudioTranscriptionAsPlainTextDefaultResponse,
  GetAudioTranscriptionAsResponseObject200Response,
  GetAudioTranscriptionAsResponseObjectDefaultResponse,
  GetAudioTranslationAsPlainText200Response,
  GetAudioTranslationAsPlainTextDefaultResponse,
  GetAudioTranslationAsResponseObject200Response,
  GetAudioTranslationAsResponseObjectDefaultResponse,
  GetCompletions200Response,
  GetCompletionsDefaultResponse,
  GetChatCompletions200Response,
  GetChatCompletionsDefaultResponse,
  GetImageGenerations200Response,
  GetImageGenerationsDefaultResponse,
  GenerateSpeechFromText200Response,
  GenerateSpeechFromTextDefaultResponse,
  GetEmbeddings200Response,
  GetEmbeddingsDefaultResponse,
} from "./responses.js";

const responseMap: Record<string, string[]> = {
  "POST /deployments/{deploymentId}/audio/transcriptions": ["200"],
  "POST /deployments/{deploymentId}/audio/translations": ["200"],
  "POST /deployments/{deploymentId}/completions": ["200"],
  "POST /deployments/{deploymentId}/chat/completions": ["200"],
  "POST /deployments/{deploymentId}/images/generations": ["200"],
  "POST /deployments/{deploymentId}/audio/speech": ["200"],
  "POST /deployments/{deploymentId}/embeddings": ["200"],
};

export function isUnexpected(
  response:
    | GetAudioTranscriptionAsPlainText200Response
    | GetAudioTranscriptionAsPlainTextDefaultResponse,
): response is GetAudioTranscriptionAsPlainTextDefaultResponse;
export function isUnexpected(
  response:
    | GetAudioTranscriptionAsResponseObject200Response
    | GetAudioTranscriptionAsResponseObjectDefaultResponse,
): response is GetAudioTranscriptionAsResponseObjectDefaultResponse;
export function isUnexpected(
  response:
    | GetAudioTranslationAsPlainText200Response
    | GetAudioTranslationAsPlainTextDefaultResponse,
): response is GetAudioTranslationAsPlainTextDefaultResponse;
export function isUnexpected(
  response:
    | GetAudioTranslationAsResponseObject200Response
    | GetAudioTranslationAsResponseObjectDefaultResponse,
): response is GetAudioTranslationAsResponseObjectDefaultResponse;
export function isUnexpected(
  response: GetCompletions200Response | GetCompletionsDefaultResponse,
): response is GetCompletionsDefaultResponse;
export function isUnexpected(
  response: GetChatCompletions200Response | GetChatCompletionsDefaultResponse,
): response is GetChatCompletionsDefaultResponse;
export function isUnexpected(
  response: GetImageGenerations200Response | GetImageGenerationsDefaultResponse,
): response is GetImageGenerationsDefaultResponse;
export function isUnexpected(
  response:
    | GenerateSpeechFromText200Response
    | GenerateSpeechFromTextDefaultResponse,
): response is GenerateSpeechFromTextDefaultResponse;
export function isUnexpected(
  response: GetEmbeddings200Response | GetEmbeddingsDefaultResponse,
): response is GetEmbeddingsDefaultResponse;
export function isUnexpected(
  response:
    | GetAudioTranscriptionAsPlainText200Response
    | GetAudioTranscriptionAsPlainTextDefaultResponse
    | GetAudioTranscriptionAsResponseObject200Response
    | GetAudioTranscriptionAsResponseObjectDefaultResponse
    | GetAudioTranslationAsPlainText200Response
    | GetAudioTranslationAsPlainTextDefaultResponse
    | GetAudioTranslationAsResponseObject200Response
    | GetAudioTranslationAsResponseObjectDefaultResponse
    | GetCompletions200Response
    | GetCompletionsDefaultResponse
    | GetChatCompletions200Response
    | GetChatCompletionsDefaultResponse
    | GetImageGenerations200Response
    | GetImageGenerationsDefaultResponse
    | GenerateSpeechFromText200Response
    | GenerateSpeechFromTextDefaultResponse
    | GetEmbeddings200Response
    | GetEmbeddingsDefaultResponse,
): response is
  | GetAudioTranscriptionAsPlainTextDefaultResponse
  | GetAudioTranscriptionAsResponseObjectDefaultResponse
  | GetAudioTranslationAsPlainTextDefaultResponse
  | GetAudioTranslationAsResponseObjectDefaultResponse
  | GetCompletionsDefaultResponse
  | GetChatCompletionsDefaultResponse
  | GetImageGenerationsDefaultResponse
  | GenerateSpeechFromTextDefaultResponse
  | GetEmbeddingsDefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = getParametrizedPathSuccess(method, url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function getParametrizedPathSuccess(method: string, path: string): string[] {
  const pathParts = path.split("/");

  // Traverse list to match the longest candidate
  // matchedLen: the length of candidate path
  // matchedValue: the matched status code array
  let matchedLen = -1,
    matchedValue: string[] = [];

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(responseMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    if (!key.startsWith(method)) {
      continue;
    }
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // track if we have found a match to return the values found.
    let found = true;
    for (
      let i = candidateParts.length - 1, j = pathParts.length - 1;
      i >= 1 && j >= 1;
      i--, j--
    ) {
      if (
        candidateParts[i]?.startsWith("{") &&
        candidateParts[i]?.indexOf("}") !== -1
      ) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(
          `${candidateParts[i]?.slice(start, end)}`,
        ).test(pathParts[j] || "");

        if (!isMatched) {
          found = false;
          break;
        }
        continue;
      }

      // If the candidate part is not a template and
      // the parts don't match mark the candidate as not found
      // to move on with the next candidate path.
      if (candidateParts[i] !== pathParts[j]) {
        found = false;
        break;
      }
    }

    // We finished evaluating the current candidate parts
    // Update the matched value if and only if we found the longer pattern
    if (found && candidatePath.length > matchedLen) {
      matchedLen = candidatePath.length;
      matchedValue = value;
    }
  }

  return matchedValue;
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}
