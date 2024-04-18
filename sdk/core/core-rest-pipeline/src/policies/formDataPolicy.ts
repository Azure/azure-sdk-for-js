// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNodeLike, stringToUint8Array } from "@azure/core-util";
import { createHttpHeaders } from "../httpHeaders.js";
import type {
  BodyPart,
  FormDataMap,
  FormDataValue,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "../interfaces.js";
import type { PipelinePolicy } from "../pipeline.js";

/**
 * The programmatic identifier of the formDataPolicy.
 */
export const formDataPolicyName = "formDataPolicy";

function formDataToFormDataMap(formData: FormData): FormDataMap {
  const formDataMap: FormDataMap = {};
  for (const [key, value] of formData.entries()) {
    formDataMap[key] ??= [];
    (formDataMap[key] as FormDataValue[]).push(value);
  }
  return formDataMap;
}

/**
 * A policy that encodes FormData on the request into the body.
 */
export function formDataPolicy(): PipelinePolicy {
  return {
    name: formDataPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (isNodeLike && typeof FormData !== "undefined" && request.body instanceof FormData) {
        request.formData = formDataToFormDataMap(request.body);
        request.body = undefined;
      }

      if (request.formData) {
        const contentType = request.headers.get("Content-Type");
        if (contentType && contentType.indexOf("application/x-www-form-urlencoded") !== -1) {
          request.body = wwwFormUrlEncode(request.formData);
        } else {
          await prepareFormData(request.formData, request);
        }

        request.formData = undefined;
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

async function prepareFormData(formData: FormDataMap, request: PipelineRequest): Promise<void> {
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
          body: stringToUint8Array(value, "utf-8"),
        });
      } else if (value === undefined || value === null || typeof value !== "object") {
        throw new Error(
          `Unexpected value for key ${fieldName}: ${value}. Value should be serialized to string first.`,
        );
      } else {
        // using || instead of ?? here since if value.name is empty we should create a file name
        const fileName = (value as File).name || "blob";
        const headers = createHttpHeaders();
        headers.set(
          "Content-Disposition",
          `form-data; name="${fieldName}"; filename="${fileName}"`,
        );

        // again, || is used since an empty value.type means the content type is unset
        headers.set("Content-Type", value.type || "application/octet-stream");

        parts.push({
          headers,
          body: value,
        });
      }
    }
  }
  request.multipartBody = { parts };
}
