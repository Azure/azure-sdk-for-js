// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Mapper, Serializer } from "@azure/core-http";
import { CustomEventDataDeserializer } from "./models";
import { EventHubCaptureFileCreatedEventData } from "./generated/models/mappers";
import {
  ContainerRegistryEventData,
  ContainerRegistryEventTarget,
  ContainerRegistryEventRequest,
  ContainerRegistryEventActor,
  ContainerRegistryEventSource
} from "./generated/models/mappers";

const serializer = new Serializer({
  ContainerRegistryEventTarget: ContainerRegistryEventTarget,
  ContainerRegistryEventRequest: ContainerRegistryEventRequest,
  ContainerRegistryEventActor: ContainerRegistryEventActor,
  ContainerRegistryEventSource: ContainerRegistryEventSource
});

function makeDeserializerFromMapper(
  mapper: Mapper,
  initialDesializers?: CustomEventDataDeserializer[]
): CustomEventDataDeserializer {
  return async function(o: any): Promise<any> {
    if (initialDesializers) {
      for (const decoder of initialDesializers) {
        o = await decoder(o);
      }
    }

    return serializer.deserialize(mapper, o, "");
  };
}

async function jsonParseDeserializer(o: any): Promise<any> {
  if (typeof o === "string") {
    return JSON.parse(o);
  }

  return o;
}

export const systemDeserializers: Record<string, CustomEventDataDeserializer> = {
  "Microsoft.ContainerRegistry.ChartDeleted": makeDeserializerFromMapper(
    ContainerRegistryEventData,
    [jsonParseDeserializer]
  ),
  "Microsoft.ContainerRegistry.ChartPushed": makeDeserializerFromMapper(
    ContainerRegistryEventData,
    [jsonParseDeserializer]
  ),
  "Microsoft.ContainerRegistry.ImageDeleted": makeDeserializerFromMapper(
    ContainerRegistryEventData,
    [jsonParseDeserializer]
  ),
  "Microsoft.ContainerRegistry.ImagePushed": makeDeserializerFromMapper(
    ContainerRegistryEventData,
    [jsonParseDeserializer]
  ),
  "Microsoft.EventHub.CaptureFileCreated": makeDeserializerFromMapper(
    EventHubCaptureFileCreatedEventData
  )
};
