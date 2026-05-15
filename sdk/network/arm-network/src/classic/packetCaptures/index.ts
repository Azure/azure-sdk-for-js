// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  getStatus,
  stop,
  $delete,
  get,
  create,
} from "../../api/packetCaptures/operations.js";
import {
  PacketCapturesListOptionalParams,
  PacketCapturesGetStatusOptionalParams,
  PacketCapturesStopOptionalParams,
  PacketCapturesDeleteOptionalParams,
  PacketCapturesGetOptionalParams,
  PacketCapturesCreateOptionalParams,
} from "../../api/packetCaptures/options.js";
import {
  PacketCapture,
  PacketCaptureResult,
  PacketCaptureQueryStatusResult,
} from "../../models/microsoft/network/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PacketCaptures operations. */
export interface PacketCapturesOperations {
  /** Lists all packet capture sessions within the specified resource group. */
  list: (
    resourceGroupName: string,
    networkWatcherName: string,
    options?: PacketCapturesListOptionalParams,
  ) => PagedAsyncIterableIterator<PacketCaptureResult>;
  /** Query the status of a running packet capture session. */
  getStatus: (
    resourceGroupName: string,
    networkWatcherName: string,
    packetCaptureName: string,
    options?: PacketCapturesGetStatusOptionalParams,
  ) => PollerLike<OperationState<PacketCaptureQueryStatusResult>, PacketCaptureQueryStatusResult>;
  /** @deprecated use getStatus instead */
  beginGetStatus: (
    resourceGroupName: string,
    networkWatcherName: string,
    packetCaptureName: string,
    options?: PacketCapturesGetStatusOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<PacketCaptureQueryStatusResult>, PacketCaptureQueryStatusResult>
  >;
  /** @deprecated use getStatus instead */
  beginGetStatusAndWait: (
    resourceGroupName: string,
    networkWatcherName: string,
    packetCaptureName: string,
    options?: PacketCapturesGetStatusOptionalParams,
  ) => Promise<PacketCaptureQueryStatusResult>;
  /** Stops a specified packet capture session. */
  stop: (
    resourceGroupName: string,
    networkWatcherName: string,
    packetCaptureName: string,
    options?: PacketCapturesStopOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use stop instead */
  beginStop: (
    resourceGroupName: string,
    networkWatcherName: string,
    packetCaptureName: string,
    options?: PacketCapturesStopOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use stop instead */
  beginStopAndWait: (
    resourceGroupName: string,
    networkWatcherName: string,
    packetCaptureName: string,
    options?: PacketCapturesStopOptionalParams,
  ) => Promise<void>;
  /** Deletes the specified packet capture session. */
  delete: (
    resourceGroupName: string,
    networkWatcherName: string,
    packetCaptureName: string,
    options?: PacketCapturesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkWatcherName: string,
    packetCaptureName: string,
    options?: PacketCapturesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkWatcherName: string,
    packetCaptureName: string,
    options?: PacketCapturesDeleteOptionalParams,
  ) => Promise<void>;
  /** Gets a packet capture session by name. */
  get: (
    resourceGroupName: string,
    networkWatcherName: string,
    packetCaptureName: string,
    options?: PacketCapturesGetOptionalParams,
  ) => Promise<PacketCaptureResult>;
  /** Create and start a packet capture on the specified VM. */
  create: (
    resourceGroupName: string,
    networkWatcherName: string,
    packetCaptureName: string,
    parameters: PacketCapture,
    options?: PacketCapturesCreateOptionalParams,
  ) => PollerLike<OperationState<PacketCaptureResult>, PacketCaptureResult>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    networkWatcherName: string,
    packetCaptureName: string,
    parameters: PacketCapture,
    options?: PacketCapturesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<PacketCaptureResult>, PacketCaptureResult>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    networkWatcherName: string,
    packetCaptureName: string,
    parameters: PacketCapture,
    options?: PacketCapturesCreateOptionalParams,
  ) => Promise<PacketCaptureResult>;
}

function _getPacketCaptures(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkWatcherName: string,
      options?: PacketCapturesListOptionalParams,
    ) => list(context, resourceGroupName, networkWatcherName, options),
    getStatus: (
      resourceGroupName: string,
      networkWatcherName: string,
      packetCaptureName: string,
      options?: PacketCapturesGetStatusOptionalParams,
    ) => getStatus(context, resourceGroupName, networkWatcherName, packetCaptureName, options),
    beginGetStatus: async (
      resourceGroupName: string,
      networkWatcherName: string,
      packetCaptureName: string,
      options?: PacketCapturesGetStatusOptionalParams,
    ) => {
      const poller = getStatus(
        context,
        resourceGroupName,
        networkWatcherName,
        packetCaptureName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetStatusAndWait: async (
      resourceGroupName: string,
      networkWatcherName: string,
      packetCaptureName: string,
      options?: PacketCapturesGetStatusOptionalParams,
    ) => {
      return await getStatus(
        context,
        resourceGroupName,
        networkWatcherName,
        packetCaptureName,
        options,
      );
    },
    stop: (
      resourceGroupName: string,
      networkWatcherName: string,
      packetCaptureName: string,
      options?: PacketCapturesStopOptionalParams,
    ) => stop(context, resourceGroupName, networkWatcherName, packetCaptureName, options),
    beginStop: async (
      resourceGroupName: string,
      networkWatcherName: string,
      packetCaptureName: string,
      options?: PacketCapturesStopOptionalParams,
    ) => {
      const poller = stop(
        context,
        resourceGroupName,
        networkWatcherName,
        packetCaptureName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStopAndWait: async (
      resourceGroupName: string,
      networkWatcherName: string,
      packetCaptureName: string,
      options?: PacketCapturesStopOptionalParams,
    ) => {
      return await stop(context, resourceGroupName, networkWatcherName, packetCaptureName, options);
    },
    delete: (
      resourceGroupName: string,
      networkWatcherName: string,
      packetCaptureName: string,
      options?: PacketCapturesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkWatcherName, packetCaptureName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkWatcherName: string,
      packetCaptureName: string,
      options?: PacketCapturesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        networkWatcherName,
        packetCaptureName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkWatcherName: string,
      packetCaptureName: string,
      options?: PacketCapturesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        networkWatcherName,
        packetCaptureName,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      networkWatcherName: string,
      packetCaptureName: string,
      options?: PacketCapturesGetOptionalParams,
    ) => get(context, resourceGroupName, networkWatcherName, packetCaptureName, options),
    create: (
      resourceGroupName: string,
      networkWatcherName: string,
      packetCaptureName: string,
      parameters: PacketCapture,
      options?: PacketCapturesCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        networkWatcherName,
        packetCaptureName,
        parameters,
        options,
      ),
    beginCreate: async (
      resourceGroupName: string,
      networkWatcherName: string,
      packetCaptureName: string,
      parameters: PacketCapture,
      options?: PacketCapturesCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        networkWatcherName,
        packetCaptureName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      networkWatcherName: string,
      packetCaptureName: string,
      parameters: PacketCapture,
      options?: PacketCapturesCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        networkWatcherName,
        packetCaptureName,
        parameters,
        options,
      );
    },
  };
}

export function _getPacketCapturesOperations(
  context: NetworkManagementContext,
): PacketCapturesOperations {
  return {
    ..._getPacketCaptures(context),
  };
}
