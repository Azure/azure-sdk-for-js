// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  BearerTokenAuthenticationPolicyOptions,
  PipelinePolicy,
  bearerTokenAuthenticationPolicy,
} from "@azure/core-rest-pipeline";
import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { createCallAutomationAccessKeyCredentialPolicy } from "./callAutomationAccessKeyCredentialPolicy";
import { CallAutomationApiClient, CallAutomationApiClientOptionalParams } from "./../generated/src";
import { createCommunicationAuthPolicy } from "@azure/communication-common";
/**
 * Creates a pipeline policy to authenticate request based
 * on the credential passed in.
 * @hidden
 *
 * @param credential - The KeyCredential or TokenCredential.
 */
export function createCallAutomationAuthPolicy(
  credential: KeyCredential | TokenCredential,
  acsUrl: string,
): PipelinePolicy {
  if (isTokenCredential(credential)) {
    const policyOptions: BearerTokenAuthenticationPolicyOptions = {
      credential: credential,
      scopes: ["https://communication.azure.com//.default"],
    };
    return bearerTokenAuthenticationPolicy(policyOptions);
  } else {
    return createCallAutomationAccessKeyCredentialPolicy(credential, acsUrl);
  }
}

/**
 * Creates CallAutomationApiClient for custom endpoint
 * @hidden
 *
 * @param credential - The KeyCredential or TokenCredential.
 * @param internalPipelineOptions - CallAutomationApiClientOptionalParams if provided.
 * @param url - ACS url.
 */
export function createCustomCallAutomationApiClient(
  credential: KeyCredential | TokenCredential,
  internalPipelineOptions: CallAutomationApiClientOptionalParams | undefined,
  url: string,
): CallAutomationApiClient {
  // read environment variable for callAutomation auth
  const customEnabled = process.env.COMMUNICATION_CUSTOM_ENDPOINT_ENABLED;
  const customUrl = process.env.COMMUNICATION_CUSTOM_URL;
  let callAutomationApiClient: CallAutomationApiClient;

  if (customEnabled?.toLowerCase() === "true" && customUrl) {
    // add custom header for Call Automation auth when flag is true
    callAutomationApiClient = new CallAutomationApiClient(customUrl, internalPipelineOptions);
    const callAutomationAuthPolicy = createCallAutomationAuthPolicy(credential, url);
    callAutomationApiClient.pipeline.addPolicy(callAutomationAuthPolicy);
  } else {
    callAutomationApiClient = new CallAutomationApiClient(url, internalPipelineOptions);
    const authPolicy = createCommunicationAuthPolicy(credential);
    callAutomationApiClient.pipeline.addPolicy(authPolicy);
  }
  return callAutomationApiClient;
}
