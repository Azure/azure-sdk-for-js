// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />
import { TollFreeVerificationGetCampaignBriefOptionalParams, CampaignBrief } from "./models";
import { isKeyCredential, parseClientArguments } from "@azure/communication-common";
import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { CommonClientOptions, InternalClientPipelineOptions } from "@azure/core-client";
import { TollFreeVerificationClient as TollFreeVerificationGeneratedClient } from "./generated/src";
import { createCommunicationAuthPolicy } from "@azure/communication-common";
import { logger } from "./utils";
import { tracingClient } from "./generated/src/tracing";
/**
 * Client options used to configure the TollFreeVerificationClient API requests.
 */
export interface TollFreeVerificationClientOptions extends CommonClientOptions {}

const isTollFreeVerificationClientOptions = (
  options: any
): options is TollFreeVerificationClientOptions =>
  options && !isKeyCredential(options) && !isTokenCredential(options);

export class TollFreeVerificationClient {
  /**
   * A reference to the auto-generated Toll Free Verification HTTP client.
   */
  private readonly client: TollFreeVerificationGeneratedClient;

  public constructor(connectionString: string, options?: TollFreeVerificationClientOptions);

  public constructor(
    endpoint: string,
    credential: KeyCredential,
    options?: TollFreeVerificationClientOptions
  );

  public constructor(
    endpoint: string,
    credential: TokenCredential,
    options?: TollFreeVerificationClientOptions
  );

  public constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: KeyCredential | TokenCredential | TollFreeVerificationClientOptions,
    maybeOptions: TollFreeVerificationClientOptions = {}
  ) {
    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const options = isTollFreeVerificationClientOptions(credentialOrOptions)
      ? credentialOrOptions
      : maybeOptions;

    const internalPipelineOptions: InternalClientPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info,
        },
      },
    };

    this.client = new TollFreeVerificationGeneratedClient(url, internalPipelineOptions);
    const authPolicy = createCommunicationAuthPolicy(credential);
    this.client.pipeline.addPolicy(authPolicy);
  }

  public getCampaignBrief(
    campaignBriefId: string,
    countryCode: string,
    options: TollFreeVerificationGetCampaignBriefOptionalParams = {}
  ): Promise<CampaignBrief> {
    return tracingClient.withSpan(
      "TollFreeVerificationClient-getCampaignBrief",
      options,
      async (updatedOptions) => {
        return this.client.tollFreeVerification.getCampaignBrief(
          campaignBriefId,
          countryCode,
          updatedOptions
        );
      }
    );
  }
}
