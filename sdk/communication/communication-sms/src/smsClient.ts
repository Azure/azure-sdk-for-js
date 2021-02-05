// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import {
  parseClientArguments,
  isKeyCredential,
  createCommunicationAuthPolicy
} from "@azure/communication-common";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import {
  //RestResponse,
  PipelineOptions,
  InternalPipelineOptions,
  createPipelineFromOptions,
  OperationOptions
  //operationOptionsToRequestOptionsBase
} from "@azure/core-http";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { CanonicalCode } from "@opentelemetry/api";
import { SmsApiClient } from "./generated/src/smsApiClient";
import { SmsSendResult, SmsSendOptions as InternalSmsSendOptions } from "./generated/src/models";
import { SDK_VERSION } from "./constants";
import { createSpan } from "./tracing";
import { logger } from "./logger";
//import { extractOperationOptions } from "./extractOperationOptions";

/**
 * Client options used to configure SMS Client API requests.
 */
export interface SmsClientOptions extends PipelineOptions {}

/**
 * Values used to configure Sms message
 */
export interface SmsSendRequest {
  /**
   * The sender's phone number in E.164 format that is owned by the authenticated account.
   */
  from: string;
  /**
   * The list of recipient's phone number in E.164 format.
   */
  to: string[];
  /**
   * The contents of the message that will be sent to the recipient. The allowable content is
   * defined by RFC 5724.
   */
  message: string;
}

/**
 * Options to configure Sms requests
 */
export interface SmsSendOptions extends OperationOptions, InternalSmsSendOptions {}

export { SmsSendResult };

/**
 * Checks whether the type of a value is SmsClientOptions or not.
 *
 * @param options The value being checked.
 */
const isSmsClientOptions = (options: any): options is SmsClientOptions =>
  !!options && !isKeyCredential(options);

/**
 * A SmsClient represents a Client to the Azure Communication Sms service allowing you
 * to send SMS messages.
 */
export class SmsClient {
  private readonly api: SmsApiClient;

  /**
   * Initializes a new instance of the SmsClient class.
   * @param connectionString Connection string to connect to an Azure Communication Service resource.
   *                         Example: "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret";
   * @param options Optional. Options to configure the HTTP pipeline.
   */
  constructor(connectionString: string, options?: SmsClientOptions);

  /**
   * Initializes a new instance of the SmsClient class using an Azure KeyCredential.
   * @param url The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential An object that is used to authenticate requests to the service. Use the Azure KeyCredential or `@azure/identity` to create a credential.
   * @param options Optional. Options to configure the HTTP pipeline.
   */
  constructor(url: string, credential: KeyCredential, options?: SmsClientOptions);

  /**
   * Initializes a new instance of the SmsClient class using a TokenCredential.
   * @param url The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential TokenCredential that is used to authenticate requests to the service.
   * @param options Optional. Options to configure the HTTP pipeline.
   */
  constructor(url: string, credential: TokenCredential, options?: SmsClientOptions);

  constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: KeyCredential | TokenCredential | SmsClientOptions,
    maybeOptions: SmsClientOptions = {}
  ) {
    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const options = isSmsClientOptions(credentialOrOptions) ? credentialOrOptions : maybeOptions;
    const libInfo = `azsdk-js-communication-sms/${SDK_VERSION}`;

    if (!options.userAgentOptions) {
      options.userAgentOptions = {};
    }

    if (options.userAgentOptions.userAgentPrefix) {
      options.userAgentOptions.userAgentPrefix = `${options.userAgentOptions.userAgentPrefix} ${libInfo}`;
    } else {
      options.userAgentOptions.userAgentPrefix = libInfo;
    }

    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info
        }
      }
    };

    const authPolicy = createCommunicationAuthPolicy(credential);
    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);

    this.api = new SmsApiClient(url, pipeline);
    if (this.api) {
      console.log("test");
    }
  }

  /**
   * Sends a SMS from a phone number that is acquired by the authenticated account, to another phone number.
   *
   * @param sendRequest Provides the sender's and recipient's phone numbers, and the contents of the message
   * @param options Additional request options
   */
  public send(
    _sendRequest: SmsSendRequest,
    _options: SmsSendOptions = {}
  ): PagedAsyncIterableIterator<SmsSendResult> {
    const { span } = createSpan("SmsClient-Send", _options);
    try {
      return {
        next() {
          throw new Error("Not yet implemented.");
        },
        [Symbol.asyncIterator]() {
          throw new Error("Not yet implemented.");
        },
        byPage: (_settings: PageSettings = {}) => {
          throw new Error("Not yet implemented.");
        }
      };
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
