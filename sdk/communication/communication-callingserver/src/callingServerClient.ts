// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import { CallConnection } from ".";
import { ServerCall } from ".";
import { CreateCallConnectionOptions, JoinCallOptions } from "./models";
import { CallConnections, ServerCalls } from "./generated/src/operations";
import { CreateCallRequest, JoinCallRequest } from "./generated/src/models";

import {
  CommunicationIdentifier,
  serializeCommunicationIdentifier
} from "@azure/communication-common";

import {
  parseClientArguments,
  isKeyCredential,
  createCommunicationAuthPolicy
} from "@azure/communication-common";
import {
  PipelineOptions,
  InternalPipelineOptions,
  createPipelineFromOptions,
  operationOptionsToRequestOptionsBase
} from "@azure/core-http";
import { SpanStatusCode } from "@azure/core-tracing";
import { CallingServerApiClient } from "./generated/src/callingServerApiClient";
import { SDK_VERSION } from "./constants";
import { createSpan } from "./tracing";
import { logger } from "./logger";

/**
 * Client options used to configure CallingServer Client API requests.
 */
 export interface CallingServerClientOptions extends PipelineOptions {}


 /**
 * Checks whether the type of a value is CallingServerClientOptions or not.
 *
 * @param options - The value being checked.
 */
const isCallingServerClientOptions = (options: any): options is CallingServerClientOptions =>
!!options && !isKeyCredential(options);

/**
 * A CallingServerClient represents a Client to the Azure Communication CallingServer service.
 */
export class CallingServerClient {
  private readonly callingServerServiceClient: CallingServerApiClient;
  private readonly callConnectionRestClient: CallConnections;
  private readonly serverCallRestClient: ServerCalls;

  /**
   * Initializes a new instance of the CallingServerClient class.
   * @param connectionString - Connection string to connect to an Azure Communication Service resource.
   *                         Example: "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret";
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(connectionString: string, options?: CallingServerClientOptions);

  constructor(
    connectionString: string,
    options?: CallingServerClientOptions,
    maybeOptions: CallingServerClientOptions = {}
  ) {
    const { url, credential } = parseClientArguments(connectionString, options);
    options = isCallingServerClientOptions(options) ? options : maybeOptions;

    const libInfo = `azsdk-js-communication-callingserver/${SDK_VERSION}`;

    if (!options?.userAgentOptions) {
      options.userAgentOptions = {};
    }

    if (options?.userAgentOptions?.userAgentPrefix) {
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
    this.callingServerServiceClient = new CallingServerApiClient(url, pipeline);
    this.callConnectionRestClient = this.callingServerServiceClient.callConnections;
    this.serverCallRestClient = this.callingServerServiceClient.serverCalls;
  }

  public getCallConnection(callConnectionId: string): CallConnection {
    return new CallConnection(callConnectionId, this.callConnectionRestClient);
  }

  public initializeServerCall(serverCallId: string): ServerCall {
    return new ServerCall(serverCallId, this.serverCallRestClient);
  }

  public async createCallConnection(
    source: CommunicationIdentifier,
    targets: CommunicationIdentifier[],
    options: CreateCallConnectionOptions
  ): Promise<CallConnection> {
    const { span, updatedOptions } = createSpan("CallConnectionRestClient-CreateCallConnection", options);

    const request: CreateCallRequest = {
      source: serializeCommunicationIdentifier(source),
      targets: targets.map(m => serializeCommunicationIdentifier(m)),
      callbackUri: options.callbackUri,
      requestedMediaTypes: options.requestedMediaTypes,
      requestedCallEvents: options.requestedCallEvents,
      alternateCallerId: options.alternateCallerId == null ? undefined : {value: options.alternateCallerId.phoneNumber},
      subject: options.subject
    };

    try {
      const response = await this.callConnectionRestClient.createCall(
        request,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );

      if (response.callConnectionId) {
        return new CallConnection(response.callConnectionId, this.callConnectionRestClient);
      } else {
        throw 'callConnectionId is missing in createCall response';
      }
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async joinCall(
    serverCallId: string,
    source: CommunicationIdentifier,
    options: JoinCallOptions,
  ): Promise<CallConnection> {
    const { span, updatedOptions } = createSpan("ServerCallRestClient-JoinCall", options);

    const request: JoinCallRequest = {
      source: serializeCommunicationIdentifier(source),
      callbackUri: options.callbackUri,
      requestedMediaTypes: options.requestedMediaTypes,
      requestedCallEvents: options.requestedCallEvents,
      subject: undefined
    };


    try {
      const response = await this.serverCallRestClient.joinCall(
        serverCallId,
        request,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );

      if (response.callConnectionId) {
        return new CallConnection(response.callConnectionId, this.callConnectionRestClient);
      } else {
        throw 'callConnectionId is missing in joinCall response';
      }
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
