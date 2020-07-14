// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Mapper, Serializer } from "@azure/core-http";
import { CustomEventDataDecoder } from "./models";
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

function makeDecoderFromMapper(
  mapper: Mapper,
  initialDecoders?: CustomEventDataDecoder[]
): CustomEventDataDecoder {
  return async function(o: any): Promise<any> {
    if (initialDecoders) {
      for (const decoder of initialDecoders) {
        o = await decoder(o);
      }
    }

    return serializer.deserialize(mapper, o, "");
  };
}

async function jsonParseDecoder(o: any): Promise<any> {
  if (typeof o === "string") {
    return JSON.parse(o);
  }

  return o;
}

export const systemDecoders: Record<string, CustomEventDataDecoder> = {
  "Microsoft.ContainerRegistry.ChartDeleted": makeDecoderFromMapper(ContainerRegistryEventData, [
    jsonParseDecoder
  ]),
  "Microsoft.ContainerRegistry.ChartPushed": makeDecoderFromMapper(ContainerRegistryEventData, [
    jsonParseDecoder
  ]),
  "Microsoft.ContainerRegistry.ImageDeleted": makeDecoderFromMapper(ContainerRegistryEventData, [
    jsonParseDecoder
  ]),
  "Microsoft.ContainerRegistry.ImagePushed": makeDecoderFromMapper(ContainerRegistryEventData, [
    jsonParseDecoder
  ]),
  "Microsoft.EventHub.CaptureFileCreated": makeDecoderFromMapper(
    EventHubCaptureFileCreatedEventData
  )
};
