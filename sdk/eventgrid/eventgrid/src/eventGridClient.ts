// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyCredential } from "@azure/core-auth";
import {
  PipelineOptions,
  createPipelineFromOptions,
  RestResponse,
  OperationOptions
} from "@azure/core-http";

import { v4 as uuidv4 } from "uuid";

import { hmac } from "./utils/hmac";
import { createEventGridCredentialPolicy } from "./eventGridAuthenticationPolicy";
import { SignatureCredential } from "./sharedAccessSignitureCredential";
import { SDK_VERSION } from "./constants";
import { GeneratedClient } from "./generated/generatedClient";
import { CloudEvent, EventGridEvent } from "./models";
import { dateToServiceTimeString, isKeyCredentialLike } from "./util";

/**
 * Options for the Event Grid Client.
 */
export type EventGridPublisherClientOptions = PipelineOptions;

/**
 * Options for the send events operation.
 */
export type SendEventsOptions = OperationOptions;

/**
 * Options for the send cloud events operation.
 */
export type SendCloudEventsOptions = OperationOptions;

/**
 * Options for the send custom schema events operation.
 */
export type SendCustomSchemaEventsOptions = OperationOptions;

/**
 * Client class for publishing events to the Event Grid Service.
 */
export class EventGridPublisherClient {
  /**
   * The URL to the Event Grid endpoint.
   */
  public readonly endpointUrl: string;

  /**
   * The version of the Even Grid service.
   */
  public readonly apiVersion: string;

  /**
   * The AutoRest generated client for the EventGrid dataplane.
   */
  private readonly client: GeneratedClient;

  /**
   * The credential used to construct the client, when it is constructed with a shared key instead of a
   * signature.
   */
  private readonly keyCredential?: KeyCredential;

  /**
   * Creates an instance of EventGridPublisherClient.
   *
   * Example usage:
   * ```ts
   * import { EventGridPublisherClient, AzureKeyCredential } from "@azure/eventgrid";
   *
   * const client = new EventGridPublisherClient(
   *    "<service endpoint>",
   *    new AzureKeyCredential("<api key>")
   * );
   * ```
   *
   * @param endpointUrl The URL to the EventGrid endpoint, e.g. https://eg-topic.westus2-1.eventgrid.azure.net/api/events
   * @param credential Used to authenticate requests to the service.
   * @param options Used to configure the Event Grid Client
   */
  constructor(
    endpointUrl: string,
    credential: KeyCredential | SignatureCredential,
    options: EventGridPublisherClientOptions = {}
  ) {
    this.endpointUrl = endpointUrl;

    // If the user suplied a key credential (instead of a signature credential), save it on the client so we can generate
    // SAS tokens with `generateSharedAccessSignature`.
    if (isKeyCredentialLike(credential)) {
      this.keyCredential = credential;
    }

    const libInfo = `azsdk-js-eventgrid/${SDK_VERSION}`;
    const pipelineOptions = { ...options };

    if (!pipelineOptions.userAgentOptions) {
      pipelineOptions.userAgentOptions = {};
    }

    if (pipelineOptions.userAgentOptions.userAgentPrefix) {
      pipelineOptions.userAgentOptions.userAgentPrefix = `${pipelineOptions.userAgentOptions.userAgentPrefix} ${libInfo}`;
    } else {
      pipelineOptions.userAgentOptions.userAgentPrefix = libInfo;
    }

    const authPolicy = createEventGridCredentialPolicy(credential);
    const pipeline = createPipelineFromOptions(options, authPolicy);

    this.client = new GeneratedClient(pipeline);
    this.apiVersion = this.client.apiVersion;
  }

  /**
   * Publishes events in the Event Grid scheama. The topic must be configured to expect events in the Event Grid schema.
   *
   * @param message One or more events to publish
   */
  sendEvents(events: EventGridEvent<any>[], options?: SendEventsOptions): Promise<RestResponse> {
    const toPublish = (events || []).map((evt) => {
      return {
        eventType: evt.eventType,
        eventTime: evt.eventTime ?? new Date(),
        id: evt.id ?? uuidv4(),
        subject: evt.subject,
        topic: evt.topic,
        data: evt.data,
        dataVersion: evt.dataVersion
      };
    });
    return this.client.publishEvents(this.endpointUrl, toPublish, options);
  }

  /**
   * Publishes events in the Cloud Events 1.0 schema. The topic must be configured to expect events in the Cloud Events 1.0 schema.
   *
   * @param message One or more events to publish
   */

  sendCloudEvents(
    events: CloudEvent<any>[],
    options?: SendCloudEventsOptions
  ): Promise<RestResponse> {
    const toPublish = (events || []).map((evt) => {
      // TODO(matell): If data is of type `Buffer` or other binary data we should Base64 encoded the data and set
      //               `data_base64` instead.  We also need to validate that `datacontenttype` is set in this case.
      return {
        specversion: "1.0",
        type: evt.type,
        source: evt.source,
        id: evt.id ?? uuidv4(),
        time: evt.time ?? new Date(),
        subject: evt.subject,
        dataschema: evt.dataschema,
        datacontenttype: evt.datacontenttype ?? "application/json",
        ...(evt.extensionAttributes ?? [])
      };
    });

    return this.client.publishCloudEventEvents(this.endpointUrl, toPublish, options);
  }

  /**
   * Publishes events written using a custom schema. The topic must be configured to expect events in a custom schema.
   *
   * @param message One or more events to publish
   */
  sendCustomSchemaEvents(
    events: Record<string, any>[],
    options?: SendCustomSchemaEventsOptions
  ): Promise<RestResponse> {
    return this.client.publishCustomEventEvents(this.endpointUrl, events, options);
  }

  /**
   * Generate a shared access signature, which allows a client to send events to an Event Grid Topic for a limited period of time. This
   * function may only be called when the EventGridPublisherClient was constructed with a KeyCredential instance.
   *
   * @param expiresOn The time at which the shared signature is no longer valid.
   */
  async generateSharedAccessSignature(expiresOnUtc: Date): Promise<string> {
    if (!this.keyCredential) {
      throw new Error(
        "generateSharedAccessSignature may only be called when the client is constructed with a key credential"
      );
    }

    const expiresOnString = dateToServiceTimeString(expiresOnUtc);
    const unsignedSas = `r=${encodeURIComponent(
      `${this.endpointUrl}?apiVersion=${this.apiVersion}`
    )}&e=${encodeURIComponent(expiresOnString)}`;
    return hmac(this.keyCredential!.key, unsignedSas).then(
      (digest) => `${unsignedSas}&s=${encodeURIComponent(digest)}`
    );
  }
}
