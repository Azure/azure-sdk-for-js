// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyCredential, SASCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";
import type { OperationOptions, CommonClientOptions } from "@azure/core-client";
import { eventGridCredentialPolicy } from "./eventGridAuthenticationPolicy.js";
import { DEFAULT_EVENTGRID_SCOPE } from "./constants.js";
import type { SendCloudEventInput, SendEventGridEventInput } from "./models.js";
import { cloudEventReservedPropertyNames } from "./models.js";
import { GeneratedClient } from "./generated/generatedClient.js";
import type {
  CloudEvent as CloudEventWireModel,
  EventGridEvent as EventGridEventWireModel,
  PublishCloudEventEventsOptionalParams,
} from "./generated/models/index.js";
import { cloudEventDistributedTracingEnricherPolicy } from "./cloudEventDistrubtedTracingEnricherPolicy.js";
import { tracingClient } from "./tracing.js";
import { randomUUID } from "@azure/core-util";
import type { TokenCredential } from "@azure/core-auth";
import { bearerTokenAuthenticationPolicy, tracingPolicyName } from "@azure/core-rest-pipeline";

/**
 * Options for the Event Grid Client.
 */
export type EventGridPublisherClientOptions = CommonClientOptions;

/**
 * Options for the send events operation.
 */
export type SendOptions = OperationOptions;

/**
 * Options for the send events operation, when the input schema is cloud event.
 */
export interface CloudEventSendOptions extends SendOptions {
  /**
   * The name of the channel to send the event to (only valid for Partner Namespaces and Topics).
   */
  channelName?: string;
}

/**
 * A map of input schema names to shapes of the input for the send method on EventGridPublisherClient.
 */
export interface InputSchemaToInputTypeMap {
  /**
   * The shape of the input to `send` when the client is configured to send events using the Event Grid schema.
   */
  EventGrid: SendEventGridEventInput<unknown>;
  /**
   * The shape of the input to `send` when the client is configured to send events using the Cloud Event schema.
   */
  CloudEvent: SendCloudEventInput<unknown>;
  /**
   * The shape of the input to `send` when the client is configured to send events using a custom schema.
   */
  Custom: Record<string, unknown>;
}

/**
 * A map of input schema names to shapes of the options bag for the send method on EventGridPublisherClient.
 */
export interface InputSchemaToOptionsTypeMap {
  /**
   * The shape of the options parameter for `send` when the client is configured to send events using the Event Grid schema.
   */
  EventGrid: SendOptions;
  /**
   * The shape of the options parameter for `send` when the client is configured to send events using the Cloud Event schema.
   */
  CloudEvent: CloudEventSendOptions;
  /**
   * The shape of the options parameter for `send` when the client is configured to send events using a custom schema.
   */
  Custom: SendOptions;
}

/**
 * Allowed schema types, to be used when constructing the EventGridPublisherClient.
 */
export type InputSchema = keyof InputSchemaToInputTypeMap;

/**
 * Client class for publishing events to the Event Grid Service.
 */
export class EventGridPublisherClient<T extends InputSchema> {
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
   * The schema that will be used when sending events.
   */
  private readonly inputSchema: InputSchema;

  /**
   * Creates an instance of EventGridPublisherClient which sends events using the Event Grid Schema.
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleCreateClient_KeyCredential
   * import { EventGridPublisherClient, AzureKeyCredential } from "@azure/eventgrid";
   *
   * const client = new EventGridPublisherClient(
   *   "<endpoint>",
   *   "EventGrid",
   *   new AzureKeyCredential("<Access Key>"),
   * );
   * ```
   *
   * @param endpointUrl - The URL to the Event Grid endpoint, e.g. https://eg-topic.westus2-1.eventgrid.azure.net/api/events.
   * @param inputSchema - The schema that the Event Grid endpoint is configured to accept. One of "EventGrid", "CloudEvent", or "Custom".
   * @param credential - Used to authenticate requests to the service.
   * @param options - Used to configure the Event Grid Client.
   */
  constructor(
    endpointUrl: string,
    inputSchema: T,
    credential: KeyCredential | SASCredential | TokenCredential,
    options: EventGridPublisherClientOptions = {},
  ) {
    this.endpointUrl = endpointUrl;
    this.inputSchema = inputSchema;

    this.client = new GeneratedClient(options);

    const authPolicy = isTokenCredential(credential)
      ? bearerTokenAuthenticationPolicy({ credential, scopes: DEFAULT_EVENTGRID_SCOPE })
      : eventGridCredentialPolicy(credential);

    this.client.pipeline.addPolicy(authPolicy);
    this.client.pipeline.addPolicy(cloudEventDistributedTracingEnricherPolicy(), {
      afterPolicies: [tracingPolicyName],
    });
    this.apiVersion = this.client.apiVersion;
  }

  /**
   * Sends events to a topic.
   *
   * @param events - The events to send. The events should be in the schema used when constructing the client.
   * @param options - Options to control the underlying operation.
   */
  send(
    events: InputSchemaToInputTypeMap[T][],
    options: InputSchemaToOptionsTypeMap[T] = {},
  ): Promise<void> {
    return tracingClient.withSpan("EventGridPublisherClient.send", options, (updatedOptions) => {
      switch (this.inputSchema) {
        case "EventGrid": {
          return this.client.publishEventGridEvents(
            this.endpointUrl,
            (events as InputSchemaToInputTypeMap["EventGrid"][]).map(
              convertEventGridEventToModelType,
            ),
            updatedOptions,
          );
        }
        case "CloudEvent": {
          // The underlying REST API expects a header named `aeg-channel-name`, and so the generated client
          // expects that options bag has a property called `aegChannelName`, where as we expose it with the
          // friendlier name "channelName". Fix up the impedence mismatch here
          const {
            channelName,
            ...sendOptions
          }: { channelName?: string } & PublishCloudEventEventsOptionalParams =
            updatedOptions as CloudEventSendOptions;

          if (channelName) {
            sendOptions.aegChannelName = channelName;
          }

          return this.client.publishCloudEventEvents(
            this.endpointUrl,
            (events as InputSchemaToInputTypeMap["CloudEvent"][]).map(convertCloudEventToModelType),
            sendOptions,
          );
        }
        case "Custom": {
          return this.client.publishCustomEventEvents(
            this.endpointUrl,
            events as InputSchemaToInputTypeMap["Custom"][],
            updatedOptions,
          );
        }
        default: {
          throw new Error(`Unknown input schema type '${this.inputSchema}'`);
        }
      }
    });
  }
}

/**
 * @internal
 */
export function convertEventGridEventToModelType(
  event: SendEventGridEventInput<any>,
): EventGridEventWireModel {
  return {
    eventType: event.eventType,
    eventTime: event.eventTime ?? new Date(),
    id: event.id ?? randomUUID(),
    subject: event.subject,
    topic: event.topic,
    data: event.data,
    dataVersion: event.dataVersion,
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
    id: event.id ?? randomUUID(),
    time: event.time ?? new Date(),
    subject: event.subject,
    dataschema: event.dataschema,
    ...(event.extensionAttributes ?? []),
  };

  if (event.data instanceof Uint8Array) {
    if (!event.datacontenttype) {
      throw new Error(
        "a data content type must be provided when sending an event with binary data",
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
