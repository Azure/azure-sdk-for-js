// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  FormDataMap,
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import type { FormData } from "formdata-node";
import type { FormDataEncoder } from "form-data-encoder";
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

let formDataConstructor: typeof FormData;
let formDataEncoderConstructor: typeof FormDataEncoder;

async function getFormData(): Promise<typeof formDataConstructor> {
  if (!formDataConstructor) {
    formDataConstructor = (await import("formdata-node")).FormData;
  }
  return formDataConstructor;
}

async function getFormDataEncoder(): Promise<typeof formDataEncoderConstructor> {
  if (!formDataEncoderConstructor) {
    formDataEncoderConstructor = (await import("form-data-encoder")).FormDataEncoder;
  }
  return formDataEncoderConstructor;
}

async function prepareFormData(
  formData: FormDataMap,
  request: PipelineRequest,
  boundary?: string
): Promise<void> {
  const FormData = await getFormData();
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
  const FormDataEncoder = await getFormDataEncoder();
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

let fileConstructor: typeof File;

async function getFile(): Promise<typeof fileConstructor> {
  if (!fileConstructor) {
    fileConstructor = typeof File === "function" ? File : (await import("formdata-node")).File;
  }
  return fileConstructor;
}

export async function createFile(data: Uint8Array | string): Promise<File> {
  const File = await getFile();
  return new File([data], "placeholder.wav");
}
