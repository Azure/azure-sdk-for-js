// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EmailClientOptions, EmailMessage, EmailSendOptionalParams } from "./models.js";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";
import type { SimplePollerLike, OperationState } from "@azure/core-lro";
import {
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments,
} from "@azure/communication-common";
import { EmailRestApiClient } from "./generated/src/emailRestApiClient.js";
import type { InternalPipelineOptions } from "@azure/core-rest-pipeline";
import { logger } from "./logger.js";
import type { EmailSendResponse } from "./generated/src/index.js";

/**
 * Checks whether the type of a value is EmailClientOptions or not.
 *
 * @param options - The value being checked.
 */
const isEmailClientOptions = (options: any): options is EmailClientOptions =>
  !!options && !isTokenCredential(options) && !isKeyCredential(options);

/**
 *  The Email service client.
 */
export class EmailClient {
  private readonly generatedClient: EmailRestApiClient;

  /**
   * Initializes a new instance of the EmailClient class.
   * @param connectionString - Connection string to connect to an Azure Communication Service resource.
   *                         Example: "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret";
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(connectionString: string, options?: EmailClientOptions);

  /**
   * Initializes a new instance of the EmailClient class using an Azure KeyCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - An object that is used to authenticate requests to the service. Use the Azure KeyCredential or `@azure/identity` to create a credential.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options?: EmailClientOptions,
  );

  constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: EmailClientOptions | TokenCredential | KeyCredential,
    maybeOptions: EmailClientOptions = {},
  ) {
    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const options = isEmailClientOptions(credentialOrOptions) ? credentialOrOptions : maybeOptions;

    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info,
        },
      },
    };

    const authPolicy = createCommunicationAuthPolicy(credential);
    this.generatedClient = new EmailRestApiClient(url, internalPipelineOptions);
    this.generatedClient.pipeline.addPolicy(authPolicy);
  }

  /**
   * Queues an email message to be sent to one or more recipients
   * @param message - Message payload for sending an email
   * @param options - The options parameters.
   */
  beginSend(
    message: EmailMessage,
    options?: EmailSendOptionalParams,
  ): Promise<SimplePollerLike<OperationState<EmailSendResponse>, EmailSendResponse>> {
    return this.generatedClient.email.beginSend(message, options);
  }
}
