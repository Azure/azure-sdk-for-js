// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential, TokenCredential } from "@azure/core-auth";
import {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";

const APIM_KEY_HEADER_NAME = "Ocp-Apim-Subscription-Key";
const APIM_REGION_HEADER_NAME = "Ocp-Apim-Subscription-Region";
const APIM_RESOURCE_ID = "Ocp-Apim-ResourceId";
export const DEFAULT_SCOPE = "https://cognitiveservices.azure.com/.default";

export interface TranslatorCredential {
  key: string;
  region: string;
}

export interface TranslatorTokenCredential {
  tokenCredential: TokenCredential;
  region: string;
  azureResourceId: string;
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

export class TranslatorTokenCredentialAuthenticationPolicy implements PipelinePolicy {
  name: string = "TranslatorTokenCredentialAuthenticationPolicy";
  credential: TranslatorTokenCredential;

  constructor(credential: TranslatorTokenCredential) {
    this.credential = credential;
  }

  sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
    request.headers.set(APIM_REGION_HEADER_NAME, this.credential.region);
    request.headers.set(APIM_RESOURCE_ID, this.credential.azureResourceId);

    return next(request);
  }
}
