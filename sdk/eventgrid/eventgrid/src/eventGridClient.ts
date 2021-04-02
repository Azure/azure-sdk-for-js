// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyCredential } from "@azure/core-auth";
import {
  PipelineOptions,
  createPipelineFromOptions,
  OperationOptions,
  generateUuid,
  HttpResponse,
  RequestPolicyFactory,
  RestResponse
} from "@azure/core-http";

import { createEventGridCredentialPolicy } from "./eventGridAuthenticationPolicy";
import { SignatureCredential } from "./sharedAccessSignitureCredential";
import { SDK_VERSION } from "./constants";
import {
  SendCloudEventInput,
  SendEventGridEventInput,
  cloudEventReservedPropertyNames
} from "./models";
import { GeneratedClient } from "./generated/generatedClient";
import {
  CloudEvent as CloudEventWireModel,
  EventGridEvent as EventGridEventWireModel
} from "./generated/models";
import { cloudEventDistributedTracingEnricherPolicy } from "./cloudEventDistrubtedTracingEnricherPolicy";
import { createSpan } from "./tracing";
import { CanonicalCode } from "@opentelemetry/api";

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
 * The response when sending events to the Event Grid service.
 */
export interface SendEventsResponse {
  /**
   * Event Response
   */
  _response: HttpResponse;
}

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
   * @param endpointUrl - The URL to the EventGrid endpoint, e.g. https://eg-topic.westus2-1.eventgrid.azure.net/api/events
   * @param credential - Used to authenticate requests to the service.
   * @param options - Used to configure the Event Grid Client
   */
  constructor(
    endpointUrl: string,
    credential: KeyCredential | SignatureCredential,
    options: EventGridPublisherClientOptions = {}
  ) {
    this.endpointUrl = endpointUrl;

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

    (pipeline.requestPolicyFactories as RequestPolicyFactory[]).push(
      cloudEventDistributedTracingEnricherPolicy()
    );

    this.client = new GeneratedClient(pipeline);
    this.apiVersion = this.client.apiVersion;
  }

  /**
   * Publishes events in the Event Grid schema. The topic must be configured to expect events in the Event Grid schema.
   *
   * @param message - One or more events to publish
   */
  async sendEvents(
    events: SendEventGridEventInput<any>[],
    options?: SendEventsOptions
  ): Promise<SendEventsResponse> {
    const { span, updatedOptions } = createSpan(
      "EventGridPublisherClient-sendEvents",
      options || {}
    );

    try {
      const r = await this.client.publishEvents(
        this.endpointUrl,
        (events || []).map(convertEventGridEventToModelType),
        updatedOptions
      );
      return buildResponse(r);
    } catch (e) {
      span.setStatus({ code: CanonicalCode.UNKNOWN, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Publishes events in the Cloud Events 1.0 schema. The topic must be configured to expect events in the Cloud Events 1.0 schema.
   *
   * @param message - One or more events to publish
   */
  async sendCloudEvents(
    events: SendCloudEventInput<any>[],
    options?: SendCloudEventsOptions
  ): Promise<SendEventsResponse> {
    const { span, updatedOptions } = createSpan(
      "EventGridPublisherClient-sendCloudEvents",
      options || {}
    );

    try {
      const r = await this.client.publishCloudEventEvents(
        this.endpointUrl,
        (events || []).map(convertCloudEventToModelType),
        updatedOptions
      );
      return buildResponse(r);
    } catch (e) {
      span.setStatus({ code: CanonicalCode.UNKNOWN, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Publishes events written using a custom schema. The topic must be configured to expect events in a custom schema.
   *
   * @param message - One or more events to publish
   */
  async sendCustomSchemaEvents(
    events: Record<string, any>[],
    options?: SendCustomSchemaEventsOptions
  ): Promise<SendEventsResponse> {
    const { span, updatedOptions } = createSpan(
      "EventGridPublisherClient-sendCustomSchemaEvents",
      options || {}
    );

    try {
      const r = await this.client.publishCustomEventEvents(
        this.endpointUrl,
        events || [],
        updatedOptions
      );
      return buildResponse(r);
    } catch (e) {
      span.setStatus({ code: CanonicalCode.UNKNOWN, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }
}

function buildResponse(r: RestResponse): SendEventsResponse {
  const ret = { _response: r._response };

  Object.defineProperty(ret, "_response", {
    enumerable: false
  });

  return ret;
}

/**
 * @internal
 */
export function convertEventGridEventToModelType(
  event: SendEventGridEventInput<any>
): EventGridEventWireModel {
  return {
    eventType: event.eventType,
    eventTime: event.eventTime ?? new Date(),
    id: event.id ?? generateUuid(),
    subject: event.subject,
    topic: event.topic,
    data: event.data,
    dataVersion: event.dataVersion
  };
}

/**
 * @internal
 */
export function convertCloudEventToModelType(event: SendCloudEventInput<any>): CloudEventWireModel {
  if (event.extensionAttributes) {
    for (const propName in event.extensionAttributes) {
      // Per the cloud events spec: "CloudEvents attribute names MUST consist of lower-case letters ('a' to 'z') or digits ('0' to '9') from the ASCII character set"
      // they also can not match an existing defined property name.

      if (
        !/^[a-z0-9]*$/.test(propName) ||
        cloudEventReservedPropertyNames.indexOf(propName) !== -1
      ) {
        throw new Error(`invalid extension attribute name: ${propName}`);
      }
    }
  }

  const converted: CloudEventWireModel = {
    specversion: "1.0",
    type: event.type,
    source: event.source,
    id: event.id ?? generateUuid(),
    time: event.time ?? new Date(),
    subject: event.subject,
    dataschema: event.dataschema,
    ...(event.extensionAttributes ?? [])
  };

  if (event.data instanceof Uint8Array) {
    if (!event.datacontenttype) {
      throw new Error(
        "a data content type must be provided when sending an event with binary data"
      );
    }

    converted.datacontenttype = event.datacontenttype;
    converted.dataBase64 = event.data;
  } else {
    converted.datacontenttype = event.datacontenttype ?? "application/json";
    converted.data = event.data;
  }

  return converted;
}
