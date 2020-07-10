// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse, PipelineRequest, SendRequest } from "../interfaces";
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
        const formData = request.formData;
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
          // browser will automatically apply a suitable content-type header
          request.headers.delete("Content-Type");
        }
      }
      return next(request);
    }
  };
}
