// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import FormData from "form-data";
import { FormDataMap, PipelineRequest, PipelineResponse, SendRequest } from "../interfaces";
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

async function prepareFormData(formData: FormDataMap, request: PipelineRequest): Promise<void> {
  const requestForm = new FormData();
  for (const formKey of Object.keys(formData)) {
    const formValue = formData[formKey];
    if (Array.isArray(formValue)) {
      for (const subValue of formValue) {
        requestForm.append(formKey, subValue);
      }
    } else {
      requestForm.append(formKey, formValue);
    }
  }

  request.body = requestForm;
  request.formData = undefined;
  const contentType = request.headers.get("Content-Type");
  if (contentType && contentType.indexOf("multipart/form-data") !== -1) {
    request.headers.set(
      "Content-Type",
      `multipart/form-data; boundary=${requestForm.getBoundary()}`
    );
  }
  try {
    const contentLength = await new Promise<number>((resolve, reject) => {
      requestForm.getLength((err, length) => {
        if (err) {
          reject(err);
        } else {
          resolve(length);
        }
      });
    });
    request.headers.set("Content-Length", contentLength);
  } catch (e: any) {
    // ignore setting the length if this fails
  }
}
