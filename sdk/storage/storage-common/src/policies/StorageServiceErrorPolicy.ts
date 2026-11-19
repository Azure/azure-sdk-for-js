// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { RestError } from "@azure/core-rest-pipeline";
import { isReactNative } from "@azure/core-util";
import { XMLParser } from "fast-xml-parser";

/**
 * The programmatic identifier of the storageServiceErrorPolicy.
 */
export const storageServiceErrorPolicyName = "storageServiceErrorPolicy";

/** Every 2xx status: the responses whose body a streamed operation returns as a stream. */
const successStatusCodes: ReadonlySet<number> = new Set(
  Array.from({ length: 100 }, (_, i) => 200 + i),
);

const xmlParser = new XMLParser({
  ignoreAttributes: true,
  parseTagValue: false,
  trimValues: false,
});

/** The error fields the clients name in camelCase. The service's other fields keep their names. */
const camelCaseNames = new Map([
  ["Code", "code"],
  ["Message", "message"],
  ["CopySourceStatusCode", "copySourceStatusCode"],
  ["CopySourceErrorCode", "copySourceErrorCode"],
  ["CopySourceErrorMessage", "copySourceErrorMessage"],
  ["AuthenticationErrorDetail", "authenticationErrorDetail"],
]);

/** The fields the error models of the operations have; `additionalProperties` holds the others. */
const errorModelFields = new Set([
  "Code",
  "Message",
  "CopySourceStatusCode",
  "CopySourceErrorCode",
  "CopySourceErrorMessage",
]);

/**
 * A pipeline policy that turns a storage error response into a `RestError` with the error the
 * service returned, for use by the Azure Storage client libraries.
 *
 * For a request that asks for every response body as a stream (`streamResponseStatusCodes` has
 * `Number.POSITIVE_INFINITY`), it asks for a stream only on success (2xx), so the body of any other
 * response is read as text. The request's own set is put back afterwards. On React Native such a
 * request is left unchanged, because the default HTTP client there can't read those bodies as text.
 *
 * For a response with status 400 or above whose body is a storage error (an `Error` element with a
 * non-empty `Code` or `Message`), it throws a `RestError` with:
 * - `message`: the error's `Message`, or `Unexpected status code: <status>` when it has none;
 * - `code`: the `x-ms-error-code` header, or else the error's `Code`;
 * - `statusCode` and `request`: those of the response;
 * - `details`: the error's fields, with `Code`, `Message`, `AuthenticationErrorDetail` and the
 *   `CopySource` fields in camelCase (`copySourceStatusCode` as a number) and the others under their
 *   own names; `additionalProperties`, the fields other than `Code`, `Message` and the `CopySource`
 *   fields; `errorCode`, the `x-ms-error-code` header; and `xMsCopySourceErrorCode` and
 *   `xMsCopySourceStatusCode` (as a number) when the response has those headers;
 * - `response`: the response, with `parsedBody` set to the error's fields as named in `details`.
 *
 * Other responses pass through unchanged. Add the policy outside the retry and authentication
 * policies, as the storage clients do with `{ afterPhase: "Deserialize" }`, so that they still see
 * the responses they act on.
 */
export function storageServiceErrorPolicy(): PipelinePolicy {
  return {
    name: storageServiceErrorPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const response = await sendReadingErrorBodies(request, next);
      const error = response.status >= 400 ? toServiceError(response) : undefined;
      if (error) {
        throw error;
      }
      return response;
    },
  };
}

async function sendReadingErrorBodies(
  request: PipelineRequest,
  next: SendRequest,
): Promise<PipelineResponse> {
  const streamResponseStatusCodes = request.streamResponseStatusCodes;
  // React Native's default HTTP client reads a body it doesn't stream with `Blob.text()`, which
  // React Native's `Blob` lacks, so the request would never settle.
  if (isReactNative || !streamResponseStatusCodes?.has(Number.POSITIVE_INFINITY)) {
    return next(request);
  }
  request.streamResponseStatusCodes = new Set(successStatusCodes);
  try {
    return await next(request);
  } finally {
    request.streamResponseStatusCodes = streamResponseStatusCodes;
  }
}

/** The `RestError` for a response whose body is a storage error, or undefined for any other body. */
function toServiceError(response: PipelineResponse): RestError | undefined {
  const fields = parseErrorFields(response.bodyAsText);
  const serviceCode = fields?.get("Code");
  const serviceMessage = fields?.get("Message");
  if (!fields || (!serviceCode && !serviceMessage)) {
    return undefined;
  }

  const serviceError: Record<string, unknown> = {};
  const additionalProperties: Record<string, string> = {};
  for (const [name, value] of fields) {
    const field = camelCaseNames.get(name) ?? name;
    // An element named like an inherited member (`isPrototypeOf`) never replaces it.
    if (!(field in serviceError)) {
      serviceError[field] = field === "copySourceStatusCode" ? Number(value) : value;
    }
    if (!errorModelFields.has(name) && !(name in additionalProperties)) {
      additionalProperties[name] = value;
    }
  }

  const headers = response.headers;
  const details: Record<string, unknown> = {
    ...serviceError,
    additionalProperties,
    errorCode: headers.get("x-ms-error-code"),
  };
  const copySourceErrorCode = headers.get("x-ms-copy-source-error-code");
  if (copySourceErrorCode !== undefined) {
    details.xMsCopySourceErrorCode = copySourceErrorCode;
  }
  const copySourceStatusCode = headers.get("x-ms-copy-source-status-code");
  if (copySourceStatusCode !== undefined) {
    details.xMsCopySourceStatusCode = Number(copySourceStatusCode);
  }

  // storageRequestFailureDetailsParserPolicy reads the parsed body of the error, to explain an
  // x-ms-version the account doesn't support.
  (response as PipelineResponse & { parsedBody?: unknown }).parsedBody = serviceError;
  const error = new RestError(serviceMessage || `Unexpected status code: ${response.status}`, {
    code: headers.get("x-ms-error-code") ?? (serviceCode || undefined),
    statusCode: response.status,
    request: response.request,
    response,
  });
  error.details = details;
  return error;
}

/** The text fields of a storage error body (an `Error` element), or undefined for any other body. */
function parseErrorFields(body: string | null | undefined): Map<string, string> | undefined {
  if (!body) {
    return undefined;
  }
  let error: unknown;
  try {
    error = xmlParser.parse(body)?.Error;
  } catch {
    // Not XML, or an element name the parser refuses (such as `__proto__`).
    return undefined;
  }
  if (typeof error !== "object" || error === null || Array.isArray(error)) {
    return undefined;
  }
  const fields = new Map<string, string>();
  for (const [name, value] of Object.entries(error)) {
    // Text between elements ("#text") and repeated or nested elements aren't fields of the error.
    if (typeof value === "string" && !name.startsWith("#")) {
      fields.set(name, value);
    }
  }
  return fields;
}
