// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  RestError,
  type PipelinePolicy,
  type PipelineRequest,
  type PipelineResponse,
  type SendRequest,
} from "@azure/core-rest-pipeline";

const AadAudienceErrorCode = "AADSTS500011";
const NoAudienceErrorMessage =
  "Unable to authenticate to Azure App Configuration. No authentication token audience was provided. Please set AppConfigurationClientOptions.audience to the appropriate audience for the target cloud. For details on how to configure the authentication token audience visit https://aka.ms/appconfig/client-token-audience.";
const WrongAudienceErrorMessage =
  "Unable to authenticate to Azure App Configuration. An incorrect token audience was provided. Please set AppConfigurationClientOptions.audience to the appropriate audience for the target cloud. For details on how to configure the authentication token audience visit https://aka.ms/appconfig/client-token-audience.";

export function audienceErrorHandlingPolicy(isAudienceConfigured: boolean): PipelinePolicy {
  return {
    name: "audienceErrorHandlingPolicy",
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      try {
        return await next(request);
      } catch (error: any) {
        // Only AggregateAuthenticationError and CredentialUnavailableError should be thrown for the audience error, but we don't want to introduce the dependecy on @azure/identity.
        // So we catch all exceptions here and inspect whether the AAD error codes are embedded in the exception message.
        if (typeof error.message === "string" && error.message.includes(AadAudienceErrorCode)) {
          if (isAudienceConfigured) {
            throw new RestError(WrongAudienceErrorMessage);
          } else {
            throw new RestError(NoAudienceErrorMessage);
          }
        }
        throw error;
      }
    },
  };
}
