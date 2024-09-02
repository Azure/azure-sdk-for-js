// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DocumentTranslationStartTranslation202Response,
  DocumentTranslationStartTranslation400Response,
  DocumentTranslationStartTranslation401Response,
  DocumentTranslationStartTranslation429Response,
  DocumentTranslationStartTranslation500Response,
  DocumentTranslationStartTranslation503Response,
  DocumentTranslationGetTranslationsStatus200Response,
  DocumentTranslationGetTranslationsStatus400Response,
  DocumentTranslationGetTranslationsStatus401Response,
  DocumentTranslationGetTranslationsStatus429Response,
  DocumentTranslationGetTranslationsStatus500Response,
  DocumentTranslationGetTranslationsStatus503Response,
  DocumentTranslationGetDocumentStatus200Response,
  DocumentTranslationGetDocumentStatus401Response,
  DocumentTranslationGetDocumentStatus404Response,
  DocumentTranslationGetDocumentStatus429Response,
  DocumentTranslationGetDocumentStatus500Response,
  DocumentTranslationGetDocumentStatus503Response,
  DocumentTranslationGetTranslationStatus200Response,
  DocumentTranslationGetTranslationStatus401Response,
  DocumentTranslationGetTranslationStatus404Response,
  DocumentTranslationGetTranslationStatus429Response,
  DocumentTranslationGetTranslationStatus500Response,
  DocumentTranslationGetTranslationStatus503Response,
  DocumentTranslationCancelTranslation200Response,
  DocumentTranslationCancelTranslation401Response,
  DocumentTranslationCancelTranslation404Response,
  DocumentTranslationCancelTranslation429Response,
  DocumentTranslationCancelTranslation500Response,
  DocumentTranslationCancelTranslation503Response,
  DocumentTranslationGetDocumentsStatus200Response,
  DocumentTranslationGetDocumentsStatus400Response,
  DocumentTranslationGetDocumentsStatus401Response,
  DocumentTranslationGetDocumentsStatus404Response,
  DocumentTranslationGetDocumentsStatus429Response,
  DocumentTranslationGetDocumentsStatus500Response,
  DocumentTranslationGetDocumentsStatus503Response,
  DocumentTranslationGetSupportedDocumentFormats200Response,
  DocumentTranslationGetSupportedDocumentFormats429Response,
  DocumentTranslationGetSupportedDocumentFormats500Response,
  DocumentTranslationGetSupportedDocumentFormats503Response,
  DocumentTranslationGetSupportedGlossaryFormats200Response,
  DocumentTranslationGetSupportedGlossaryFormats429Response,
  DocumentTranslationGetSupportedGlossaryFormats500Response,
  DocumentTranslationGetSupportedGlossaryFormats503Response,
  DocumentTranslationGetSupportedStorageSources200Response,
  DocumentTranslationGetSupportedStorageSources429Response,
  DocumentTranslationGetSupportedStorageSources500Response,
  DocumentTranslationGetSupportedStorageSources503Response,
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /batches": ["200"],
  "POST /batches": ["202"],
  "GET /batches/{id}/documents/{documentId}": ["200"],
  "GET /batches/{id}": ["200"],
  "DELETE /batches/{id}": ["200"],
  "GET /batches/{id}/documents": ["200"],
  "GET /documents/formats": ["200"],
  "GET /glossaries/formats": ["200"],
  "GET /storagesources": ["200"],
};

export function isUnexpected(
  response:
    | DocumentTranslationStartTranslation202Response
    | DocumentTranslationStartTranslation400Response
    | DocumentTranslationStartTranslation401Response
    | DocumentTranslationStartTranslation429Response
    | DocumentTranslationStartTranslation500Response
    | DocumentTranslationStartTranslation503Response,
): response is DocumentTranslationStartTranslation400Response;
export function isUnexpected(
  response:
    | DocumentTranslationGetTranslationsStatus200Response
    | DocumentTranslationGetTranslationsStatus400Response
    | DocumentTranslationGetTranslationsStatus401Response
    | DocumentTranslationGetTranslationsStatus429Response
    | DocumentTranslationGetTranslationsStatus500Response
    | DocumentTranslationGetTranslationsStatus503Response,
): response is DocumentTranslationGetTranslationsStatus400Response;
export function isUnexpected(
  response:
    | DocumentTranslationGetDocumentStatus200Response
    | DocumentTranslationGetDocumentStatus401Response
    | DocumentTranslationGetDocumentStatus404Response
    | DocumentTranslationGetDocumentStatus429Response
    | DocumentTranslationGetDocumentStatus500Response
    | DocumentTranslationGetDocumentStatus503Response,
): response is DocumentTranslationGetDocumentStatus401Response;
export function isUnexpected(
  response:
    | DocumentTranslationGetTranslationStatus200Response
    | DocumentTranslationGetTranslationStatus401Response
    | DocumentTranslationGetTranslationStatus404Response
    | DocumentTranslationGetTranslationStatus429Response
    | DocumentTranslationGetTranslationStatus500Response
    | DocumentTranslationGetTranslationStatus503Response,
): response is DocumentTranslationGetTranslationStatus401Response;
export function isUnexpected(
  response:
    | DocumentTranslationCancelTranslation200Response
    | DocumentTranslationCancelTranslation401Response
    | DocumentTranslationCancelTranslation404Response
    | DocumentTranslationCancelTranslation429Response
    | DocumentTranslationCancelTranslation500Response
    | DocumentTranslationCancelTranslation503Response,
): response is DocumentTranslationCancelTranslation401Response;
export function isUnexpected(
  response:
    | DocumentTranslationGetDocumentsStatus200Response
    | DocumentTranslationGetDocumentsStatus400Response
    | DocumentTranslationGetDocumentsStatus401Response
    | DocumentTranslationGetDocumentsStatus404Response
    | DocumentTranslationGetDocumentsStatus429Response
    | DocumentTranslationGetDocumentsStatus500Response
    | DocumentTranslationGetDocumentsStatus503Response,
): response is DocumentTranslationGetDocumentsStatus400Response;
export function isUnexpected(
  response:
    | DocumentTranslationGetSupportedDocumentFormats200Response
    | DocumentTranslationGetSupportedDocumentFormats429Response
    | DocumentTranslationGetSupportedDocumentFormats500Response
    | DocumentTranslationGetSupportedDocumentFormats503Response,
): response is DocumentTranslationGetSupportedDocumentFormats429Response;
export function isUnexpected(
  response:
    | DocumentTranslationGetSupportedGlossaryFormats200Response
    | DocumentTranslationGetSupportedGlossaryFormats429Response
    | DocumentTranslationGetSupportedGlossaryFormats500Response
    | DocumentTranslationGetSupportedGlossaryFormats503Response,
): response is DocumentTranslationGetSupportedGlossaryFormats429Response;
export function isUnexpected(
  response:
    | DocumentTranslationGetSupportedStorageSources200Response
    | DocumentTranslationGetSupportedStorageSources429Response
    | DocumentTranslationGetSupportedStorageSources500Response
    | DocumentTranslationGetSupportedStorageSources503Response,
): response is DocumentTranslationGetSupportedStorageSources429Response;
export function isUnexpected(
  response:
    | DocumentTranslationStartTranslation202Response
    | DocumentTranslationStartTranslation400Response
    | DocumentTranslationStartTranslation401Response
    | DocumentTranslationStartTranslation429Response
    | DocumentTranslationStartTranslation500Response
    | DocumentTranslationStartTranslation503Response
    | DocumentTranslationGetTranslationsStatus200Response
    | DocumentTranslationGetTranslationsStatus400Response
    | DocumentTranslationGetTranslationsStatus401Response
    | DocumentTranslationGetTranslationsStatus429Response
    | DocumentTranslationGetTranslationsStatus500Response
    | DocumentTranslationGetTranslationsStatus503Response
    | DocumentTranslationGetDocumentStatus200Response
    | DocumentTranslationGetDocumentStatus401Response
    | DocumentTranslationGetDocumentStatus404Response
    | DocumentTranslationGetDocumentStatus429Response
    | DocumentTranslationGetDocumentStatus500Response
    | DocumentTranslationGetDocumentStatus503Response
    | DocumentTranslationGetTranslationStatus200Response
    | DocumentTranslationGetTranslationStatus401Response
    | DocumentTranslationGetTranslationStatus404Response
    | DocumentTranslationGetTranslationStatus429Response
    | DocumentTranslationGetTranslationStatus500Response
    | DocumentTranslationGetTranslationStatus503Response
    | DocumentTranslationCancelTranslation200Response
    | DocumentTranslationCancelTranslation401Response
    | DocumentTranslationCancelTranslation404Response
    | DocumentTranslationCancelTranslation429Response
    | DocumentTranslationCancelTranslation500Response
    | DocumentTranslationCancelTranslation503Response
    | DocumentTranslationGetDocumentsStatus200Response
    | DocumentTranslationGetDocumentsStatus400Response
    | DocumentTranslationGetDocumentsStatus401Response
    | DocumentTranslationGetDocumentsStatus404Response
    | DocumentTranslationGetDocumentsStatus429Response
    | DocumentTranslationGetDocumentsStatus500Response
    | DocumentTranslationGetDocumentsStatus503Response
    | DocumentTranslationGetSupportedDocumentFormats200Response
    | DocumentTranslationGetSupportedDocumentFormats429Response
    | DocumentTranslationGetSupportedDocumentFormats500Response
    | DocumentTranslationGetSupportedDocumentFormats503Response
    | DocumentTranslationGetSupportedGlossaryFormats200Response
    | DocumentTranslationGetSupportedGlossaryFormats429Response
    | DocumentTranslationGetSupportedGlossaryFormats500Response
    | DocumentTranslationGetSupportedGlossaryFormats503Response
    | DocumentTranslationGetSupportedStorageSources200Response
    | DocumentTranslationGetSupportedStorageSources429Response
    | DocumentTranslationGetSupportedStorageSources500Response
    | DocumentTranslationGetSupportedStorageSources503Response,
): response is
  | DocumentTranslationStartTranslation400Response
  | DocumentTranslationStartTranslation401Response
  | DocumentTranslationStartTranslation429Response
  | DocumentTranslationStartTranslation500Response
  | DocumentTranslationStartTranslation503Response
  | DocumentTranslationGetTranslationsStatus400Response
  | DocumentTranslationGetTranslationsStatus401Response
  | DocumentTranslationGetTranslationsStatus429Response
  | DocumentTranslationGetTranslationsStatus500Response
  | DocumentTranslationGetTranslationsStatus503Response
  | DocumentTranslationGetDocumentStatus401Response
  | DocumentTranslationGetDocumentStatus404Response
  | DocumentTranslationGetDocumentStatus429Response
  | DocumentTranslationGetDocumentStatus500Response
  | DocumentTranslationGetDocumentStatus503Response
  | DocumentTranslationGetTranslationStatus401Response
  | DocumentTranslationGetTranslationStatus404Response
  | DocumentTranslationGetTranslationStatus429Response
  | DocumentTranslationGetTranslationStatus500Response
  | DocumentTranslationGetTranslationStatus503Response
  | DocumentTranslationCancelTranslation401Response
  | DocumentTranslationCancelTranslation404Response
  | DocumentTranslationCancelTranslation429Response
  | DocumentTranslationCancelTranslation500Response
  | DocumentTranslationCancelTranslation503Response
  | DocumentTranslationGetDocumentsStatus400Response
  | DocumentTranslationGetDocumentsStatus401Response
  | DocumentTranslationGetDocumentsStatus404Response
  | DocumentTranslationGetDocumentsStatus429Response
  | DocumentTranslationGetDocumentsStatus500Response
  | DocumentTranslationGetDocumentsStatus503Response
  | DocumentTranslationGetSupportedDocumentFormats429Response
  | DocumentTranslationGetSupportedDocumentFormats500Response
  | DocumentTranslationGetSupportedDocumentFormats503Response
  | DocumentTranslationGetSupportedGlossaryFormats429Response
  | DocumentTranslationGetSupportedGlossaryFormats500Response
  | DocumentTranslationGetSupportedGlossaryFormats503Response
  | DocumentTranslationGetSupportedStorageSources429Response
  | DocumentTranslationGetSupportedStorageSources500Response
  | DocumentTranslationGetSupportedStorageSources503Response {
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
    for (let i = candidateParts.length - 1, j = pathParts.length - 1; i >= 1 && j >= 1; i--, j--) {
      if (candidateParts[i]?.startsWith("{") && candidateParts[i]?.indexOf("}") !== -1) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(`${candidateParts[i]?.slice(start, end)}`).test(
          pathParts[j] || "",
        );

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
