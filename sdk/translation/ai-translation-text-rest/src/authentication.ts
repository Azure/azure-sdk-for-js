// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential } from "@azure/core-auth";
import {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";

const APIM_KEY_HEADER_NAME = "Ocp-Apim-Subscription-Key";
const APIM_REGION_HEADER_NAME = "Ocp-Apim-Subscription-Region";

export interface TranslatorCredential {
  key: string;
  region: string;
}

export class TranslatorAuthenticationPolicy implements PipelinePolicy {
  name: string = "TranslatorAuthenticationPolicy";
  credential: TranslatorCredential;

  constructor(credential: TranslatorCredential) {
    this.credential = credential;
  }

  sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
    request.headers.set(APIM_KEY_HEADER_NAME, this.credential.key);
    request.headers.set(APIM_REGION_HEADER_NAME, this.credential.region);

    return next(request);
  }
}

export class TranslatorAzureKeyAuthenticationPolicy implements PipelinePolicy {
  name: string = "TranslatorAzureKeyAuthenticationPolicy";
  credential: AzureKeyCredential;

  constructor(credential: AzureKeyCredential) {
    this.credential = credential;
  }

  sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
    request.headers.set(APIM_KEY_HEADER_NAME, this.credential.key);

    return next(request);
  }
}
