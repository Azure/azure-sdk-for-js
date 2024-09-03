// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/// <reference lib="esnext.asynciterable" />

import {
  NumberAllotmentGetAcquiredNumberLimitsOptionalParams,
  TieringGetByResourceIdOptionalParams,
  AcsTier,
  AssetDetailsModel,
} from "./models";
import { CommonClientOptions, InternalClientPipelineOptions } from "@azure/core-client";
import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { createCommunicationAuthPolicy } from "@azure/communication-common";
import { isKeyCredential, parseClientArguments } from "@azure/communication-common";
import { TieringClient as TieringGeneratedClient } from "./generated/src";
import { logger } from "./utils";
import { tracingClient } from "./generated/src/tracing";

/**
 * Client options used to configure the TieringGeneratedClient API requests.
 */
export interface TieringClientOptions extends CommonClientOptions {}

const isTieringClientOptions = (options: any): options is TieringClientOptions =>
  options && !isKeyCredential(options) && !isTokenCredential(options);

/**
 * Client class for interacting with Azure Communication Services Tiering.
 */
export class TieringClient {
  /**
   * A reference to the auto-generated TieringClient HTTP client.
   */
  private readonly client: TieringGeneratedClient;

  /**
   * Initializes a new instance of the TieringClient class using a connection string.
   *
   * @param connectionString - Connection string to connect to an Azure Communication Service resource. (eg: endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret)
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(connectionString: string, options?: TieringClientOptions);

  /**
   * Initializes a new instance of the TieringClient class using an Azure KeyCredential.
   *
   * @param endpoint - The endpoint of the service (eg: https://contoso.eastus.communications.azure.net)
   * @param credential - An object that is used to authenticate requests to the service. Use the Azure KeyCredential or `@azure/identity` to create a credential.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(endpoint: string, credential: KeyCredential, options?: TieringClientOptions);

  /**
   * Initializes a new instance of the TieringClient class using an Azure KeyCredential.
   *
   * @param endpoint - The endpoint of the service (eg: https://contoso.eastus.communications.azure.net)
   * @param credential - An object that is used to authenticate requests to the service. Use the Azure KeyCredential or `@azure/identity` to create a credential.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(endpoint: string, credential: TokenCredential, options?: TieringClientOptions);

  public constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: KeyCredential | TokenCredential | TieringClientOptions,
    maybeOptions: TieringClientOptions = {},
  ) {
    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const options = isTieringClientOptions(credentialOrOptions)
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

    this.client = new TieringGeneratedClient(url, internalPipelineOptions);
    const authPolicy = createCommunicationAuthPolicy(credential);
    this.client.pipeline.addPolicy(authPolicy);
  }

  /**
   * Get acquired numbers and limits for a resource.
   *
   * @param options - Additional request options.
   */
  public getAcquiredNumberLimits(
    resourceId: string,
    options: NumberAllotmentGetAcquiredNumberLimitsOptionalParams = {},
  ): Promise<AssetDetailsModel> {
    return tracingClient.withSpan(
      "numberAllotment.getAcquiredNumberLimits",
      options,
      (updatedOptions) => {
        return this.client.numberAllotment.getAcquiredNumberLimits(resourceId, updatedOptions);
      },
    );
  }

  /**
   * Get tiering info for a resource.
   *
   * @param options - Additional request options.
   */
  public getTierByResourceId(
    resourceId: string,
    options: TieringGetByResourceIdOptionalParams = {},
  ): Promise<AcsTier> {
    return tracingClient.withSpan("tiering.getTierByResourceId", options, (updatedOptions) => {
      return this.client.tiering.getByResourceId(resourceId, updatedOptions);
    });
  }
}
