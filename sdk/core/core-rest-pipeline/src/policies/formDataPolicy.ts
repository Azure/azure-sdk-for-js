// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { stringToUint8Array } from "@azure/core-util";
import { createHttpHeaders } from "../httpHeaders";
import {
  BodyPart,
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
      } else {
        // using || instead of ?? here since if value.name is empty we should create a file name
        const fileName = value.name || "blob";
        const headers = createHttpHeaders();
        headers.set(
          "Content-Disposition",
          `form-data; name="${fieldName}"; filename="${fileName}"`
        );
        if (value.type) {
          headers.set("Content-Type", value.type);
        }

        parts.push({
          headers,
          body: value,
        });
      }
    }

    request.multipartBody = { parts };
  }
}
