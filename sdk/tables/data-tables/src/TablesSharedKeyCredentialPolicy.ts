// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineResponse,
  PipelineRequest,
  SendRequest,
  PipelinePolicy
} from "@azure/core-rest-pipeline";
import { TablesSharedKeyCredentialLike } from "./TablesSharedKeyCredential";
import { HeaderConstants } from "./utils/constants";
import { URL } from "./utils/url";

/**
 * The programmatic identifier of the tablesSharedKeyCredentialPolicy.
 */
export const tablesSharedKeyCredentialPolicyName = "tablesSharedKeyCredentialPolicy";

/**
 * tablesSharedKeyCredentialPolicy is a policy used to sign HTTP request with a shared key.
 */
export function tablesSharedKeyCredentialPolicy(
  credential: TablesSharedKeyCredentialLike
): PipelinePolicy {
  function signRequest(request: PipelineRequest): void {
    const headerValue = getAuthorizationHeader(request, credential);
    request.headers.set(HeaderConstants.AUTHORIZATION, headerValue);
  }

  return {
    name: tablesSharedKeyCredentialPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      signRequest(request);
      return next(request);
    }
  };
}

export function getAuthorizationHeader(
  request: PipelineRequest,
  credential: TablesSharedKeyCredentialLike
): string {
  if (!request.headers.has(HeaderConstants.X_MS_DATE)) {
    request.headers.set(HeaderConstants.X_MS_DATE, new Date().toUTCString());
  }

  if (request.body && typeof request.body === "string" && request.body.length > 0) {
    request.headers.set(HeaderConstants.CONTENT_LENGTH, Buffer.byteLength(request.body));
  }

  // If x-ms-date is present, use it otherwise date
  const dateHeader = getHeaderValueToSign(request, HeaderConstants.X_MS_DATE);

  if (!dateHeader) {
    throw new Error("Failed to sign request: x-ms-date or date header must be present");
  }

  const stringToSign: string = [
    dateHeader,
    getCanonicalizedResourceString(request, credential)
  ].join("\n");

  const signature = credential.computeHMACSHA256(stringToSign);

  return `SharedKeyLite ${credential.accountName}:${signature}`;
}

function getHeaderValueToSign(request: PipelineRequest, headerName: string): string {
  const value = request.headers.get(headerName);

  if (!value) {
    return "";
  }
  return value;
}

function getCanonicalizedResourceString(
  request: PipelineRequest,
  credential: TablesSharedKeyCredentialLike
): string {
  // https://docs.microsoft.com/rest/api/storageservices/authorize-with-shared-key#shared-key-lite-and-table-service-format-for-2009-09-19-and-later
  const url = new URL(request.url);
  const path = url.pathname || "/";
  let canonicalizedResourceString = "/" + credential.accountName + path;

  // The query string should include the question mark and the comp parameter (for example, ?comp=metadata). No other parameters should be included on the query string.
  const comp = url.searchParams.get("comp");

  if (comp) {
    canonicalizedResourceString = `${canonicalizedResourceString}?comp=${comp}`;
  }

  return canonicalizedResourceString;
}
