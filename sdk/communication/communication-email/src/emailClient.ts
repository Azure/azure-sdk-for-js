// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EmailClientOptions, EmailMessage, SendEmailResult, SendStatusResult } from "./models";
import {
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments,
} from "@azure/communication-common";
import { EmailRestApiClient } from "./generated/src/emailRestApiClient";
import { InternalPipelineOptions } from "@azure/core-rest-pipeline";
import { KeyCredential } from "@azure/core-auth";
import { logger } from "./logger";
import { v4 as uuid } from "uuid";

/**
 * Checks whether the type of a value is EmailClientOptions or not.
 *
 * @param options - The value being checked.
 */
const isEmailClientOptions = (options: any): options is EmailClientOptions =>
  !!options && !isKeyCredential(options);

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
  constructor(endpoint: string, credential: KeyCredential, options?: EmailClientOptions);

  constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: EmailClientOptions | KeyCredential,
    maybeOptions: EmailClientOptions = {}
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
   * @param emailMessage - Message payload for sending an email
   */
  public async send(emailMessage: EmailMessage): Promise<SendEmailResult> {
    const response = await this.generatedClient.email.send(
      uuid(),
      new Date().toUTCString(),
      emailMessage
    );

    return {
      messageId: response.xMsRequestId ?? "",
    };
  }

  /**
   * Gets the status of a message sent previously.
   * @param messageId - System generated message id (GUID) returned from a previous call to send email
   */
  public async getSendStatus(messageId: string): Promise<SendStatusResult> {
    const response = await this.generatedClient.email.getSendStatus(messageId);

    return {
      messageId: response.messageId,
      status: response.status,
    };
  }
}
