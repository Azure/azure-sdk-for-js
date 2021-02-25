// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.


import {
  //PipelineOptions,
  TokenCredential,
  //OperationOptions,
  bearerTokenAuthenticationPolicy,
  createPipelineFromOptions,
  InternalPipelineOptions
} from "@azure/core-http";
//import { CanonicalCode } from "@opentelemetry/api";


import { RemoteRenderingRestClient } from "./generated";
import { RemoteRenderingRestClientOptionalParams } from "./generated/models/index";

import { RemoteRenderingClientOptions } from "./options";
import { RemoteRenderingAccount } from "./remoteRenderingAccount";

import { SDK_VERSION } from "./constants";
import { logger } from "./logger";
//import { createSpan } from "./tracing";

import { constructAuthenticationEndpointFromDomain } from "../../mixedreality-authentication/src/util/authenticationEndpoint";

/**
 * The client class used to interact with the App Configuration service.
 */
export class RemoteRenderingClient {
  private client: RemoteRenderingRestClient;

  /**
   * Creates an instance of a MixedRealityStsClient.
   * @param accountId The Mixed Reality service account identifier.
   * @param accountDomain The Mixed Reality service account domain.
   * @param keyCredential The Mixed Reality service account primary or secondary key credential.
   * @param options Additional client options.
   */
  constructor(endpoint: string, account: RemoteRenderingAccount, tokenCredential: TokenCredential, options: RemoteRenderingClientOptions = {}) {

    // The below code helps us set a proper User-Agent header on all requests
    const libInfo = `azsdk-js-mixedreality-authentication/${SDK_VERSION}`;

    if (!options.userAgentOptions) {
      options.userAgentOptions = {};
    }

    const userAgentOptions = { ...options.userAgentOptions };
    if (options.userAgentOptions.userAgentPrefix) {
      userAgentOptions.userAgentPrefix = `${options.userAgentOptions.userAgentPrefix} ${libInfo}`;
    } else {
      userAgentOptions.userAgentPrefix = libInfo;
    }

    const internalPipelineOptions: InternalPipelineOptions = {
      ...{ ...options, userAgentOptions },
      ...{
        loggingOptions: {
          logger: logger.info,
          // This array contains header names we want to log that are not already
          // included as safe. Unknown/unsafe headers are logged as "<REDACTED>".
          allowedHeaderNames: ["X-MRC-CV", "MS-CV"]
        }
      }
    };

    const authenticationEndpoint = options.authenticationEndpointUrl ?? constructAuthenticationEndpointFromDomain(account.domain);
    
    const mrTokenCredential : TokenCredential = new MixedRealityTokenCredential(account.AccountId, authenticationEndpoint, tokenCredential);

    const authPolicy = bearerTokenAuthenticationPolicy(
      mrTokenCredential,
      `${endpoint}/.default`
    );
    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);

    const clientOptions: RemoteRenderingRestClientOptionalParams = {
      ...internalPipelineOptions,
      ...pipeline,
      endpoint: endpoint
    };

    this.client = new RemoteRenderingRestClient(endpoint, clientOptions);
  }
}
