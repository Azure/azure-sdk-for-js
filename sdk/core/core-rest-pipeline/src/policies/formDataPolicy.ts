// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createHttpHeaders } from "../httpHeaders";
import {
  BodyPart,
  FileLike,
  FormDataMap,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "../interfaces";
import { PipelinePolicy } from "../pipeline";

/**
 * The programmatic identifier of the formDataPolicy.
 */
export const formDataPolicyName = "formDataPolicy";

/**
 * A policy that encodes FormData on the request into the body.
 */
export function formDataPolicy(): PipelinePolicy {
  return {
    name: formDataPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (request.formData) {
        const contentType = request.headers.get("Content-Type");
        if (contentType && contentType.indexOf("application/x-www-form-urlencoded") !== -1) {
          request.body = wwwFormUrlEncode(request.formData);
          request.formData = undefined;
        } else {
          await prepareFormData(request.formData, request);
        }
      }
      return next(request);
    },
  };
}

function wwwFormUrlEncode(formData: FormDataMap): string {
  const urlSearchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(formData)) {
    if (Array.isArray(value)) {
      for (const subValue of value) {
        urlSearchParams.append(key, subValue.toString());
      }
    } else {
      urlSearchParams.append(key, value.toString());
    }
  }
  return urlSearchParams.toString();
}

function isFileLike(maybeFile: any): maybeFile is FileLike {
  return (
    maybeFile?.stream !== undefined &&
    ((typeof ReadableStream !== "undefined" && maybeFile.stream instanceof ReadableStream) ||
      typeof maybeFile.stream?.pipe === "function" ||
      typeof maybeFile.stream === "function")
  );
}

const encoder = new TextEncoder();

async function prepareFormData(formData: FormDataMap, request: PipelineRequest): Promise<void> {
  // clear request.formData
  request.formData = undefined;

  // validate content type (multipart/form-data)
  const contentType = request.headers.get("Content-Type");
  if (contentType && !contentType.startsWith("multipart/form-data")) {
    // content type is specified and is not multipart/form-data. Exit.
    return;
  }

  request.headers.set("Content-Type", contentType ?? "multipart/form-data");

  // set body to MultipartRequestBody using content from FormDataMap
  const parts: BodyPart[] = [];

  for (const [fieldName, values] of Object.entries(formData)) {
    for (const value of Array.isArray(values) ? values : [values]) {
      if (typeof value === "string") {
        parts.push({
          headers: createHttpHeaders({
            "Content-Disposition": `form-data; name="${fieldName}"`,
          }),
          body: encoder.encode(value),
        });
      } else if (isFileLike(value)) {
        const fileName = value.name || "blob";
        const headers = createHttpHeaders();
        headers.set(
          "Content-Disposition",
          `form-data; name="${fieldName}"; filename="${fileName}"`
        );
        if (value.type) {
          headers.set("content-type", value.type);
        }

        parts.push({
          headers,
          body: typeof value.stream === "function" ? value.stream() : value.stream,
        });
      } else if (typeof ReadableStream !== "undefined" && value instanceof ReadableStream) {
        parts.push({
          headers: createHttpHeaders({
            "Content-Disposition": `form-data; name=${fieldName}; filename=blob`,
          }),
          body: value,
        });
      }
    }

    request.body = { parts };
  }
}
