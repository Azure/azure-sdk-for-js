// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import {
  FormDataMap,
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { FormData, File } from "formdata-node";
import { FormDataEncoder } from "form-data-encoder";
import { Readable } from "stream";

/**
 * The programmatic identifier of the formDataPolicy.
 */
export const formDataPolicyName = "formDataPolicyWithFileUpload";

/**
 * A policy that encodes FormData on the request into the body.
 */
export function formDataWithFileUploadPolicy(boundary?: string): PipelinePolicy {
  return {
    name: formDataPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (request.formData) {
        const contentType = request.headers.get("Content-Type");
        if (contentType && contentType.indexOf("application/x-www-form-urlencoded") !== -1) {
          request.body = wwwFormUrlEncode(request.formData);
          request.formData = undefined;
        } else {
          await prepareFormData(request.formData, request, boundary);
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

async function prepareFormData(
  formData: FormDataMap,
  request: PipelineRequest,
  boundary?: string
): Promise<void> {
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
  const encoder = boundary
    ? new FormDataEncoder(requestForm, boundary)
    : new FormDataEncoder(requestForm);
  const body = Readable.from(encoder.encode());
  request.body = body;
  request.formData = undefined;
  const contentType = request.headers.get("Content-Type");
  if (contentType && contentType.indexOf("multipart/form-data") !== -1) {
    request.headers.set("Content-Type", encoder.contentType);
  }
  const contentLength = encoder.contentLength;
  if (contentLength !== undefined) {
    request.headers.set("Content-Length", contentLength);
  }
}

export async function createFile(data: Uint8Array | string): Promise<File> {
  return new File([data], "placeholder.wav");
}
