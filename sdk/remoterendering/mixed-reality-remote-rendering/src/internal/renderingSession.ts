// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  RenderingServerSize,
  SessionProperties,
  KnownRenderingSessionStatus,
} from "../generated/index";
import {
  RemoteRenderingServiceError,
  createRemoteRenderingServiceError,
} from "../remoteRenderingServiceError";

/** Properties available for a rendering session in any state */
export interface RenderingSessionBase {
  /** The ID of the session supplied when the session was created. */
  sessionId: string;
  /** The size of the server used for the rendering session. The size impacts the number of polygons the server can render. Refer to https://docs.microsoft.com/azure/remote-rendering/reference/vm-sizes for details. */
  size: RenderingServerSize;
  /** The time in minutes the session will run after reaching the 'Ready' state. */
  maxLeaseTimeInMinutes: number;
}

/** The properties of a complete rendering session */
export interface RenderingSessionProperties {
  /**
   * The TCP port at which the Azure Remote Rendering Inspector tool is hosted.
   */
  readonly arrInspectorPort: number;
  /**
   * The TCP port used for the handshake when establishing a connection.
   */
  readonly handshakePort: number;
  /**
   * Amount of time in minutes the session is or was in the 'Ready' state. Time is rounded down to a full minute.
   */
  readonly elapsedTimeInMinutes: number;
  /**
   * The hostname under which the rendering session is reachable.
   */
  readonly host: string;
  /**
   * The computational power of the rendering session GPU measured in teraflops.
   */
  readonly teraflops: number;
  /**
   * The time when the rendering session was created. Date and time in ISO 8601 format.
   */
  readonly createdOn: Date;
}

/**
 * In certain RenderingSession states, some properties are available and some are not.
 */
export interface PartialRenderingSessionProperties {
  /**
   * The TCP port at which the Azure Remote Rendering Inspector tool is hosted.
   */
  readonly arrInspectorPort?: number;
  /**
   * The TCP port used for the handshake when establishing a connection.
   */
  readonly handshakePort?: number;
  /**
   * Amount of time in minutes the session is or was in the 'Ready' state. Time is rounded down to a full minute.
   */
  readonly elapsedTimeInMinutes?: number;
  /**
   * The hostname under which the rendering session is reachable.
   */
  readonly host?: string;
  /**
   * The computational power of the rendering session GPU measured in teraflops.
   */
  readonly teraflops?: number;
  /**
   * The time when the rendering session was created. Date and time in ISO 8601 format.
   */
  readonly createdOn?: Date;
}

/** The rendering session is ready for incoming connections. */
export interface ReadyRenderingSession extends RenderingSessionBase {
  /** The rendering session is ready for incoming connections. */
  status: "Ready";
  /**
   * The properties of the session.
   */
  properties: RenderingSessionProperties;
}

/** The rendering session has encountered an error, and is unusable. */
export interface ErrorRenderingSession extends RenderingSessionBase {
  /** The rendering session has encountered an error, and is unusable. This is a terminal state. */
  status: "Error";
  /**
   * The error object containing details about the rendering session startup failure.
   */
  readonly error: RemoteRenderingServiceError;
  /**
   * The properties of the session which had been set.
   */
  partialProperties: PartialRenderingSessionProperties;
}

/** The rendering session is starting, but not accepting incoming connections yet. */
export interface StartingRenderingSession extends RenderingSessionBase {
  /** The rendering session is starting, but not accepting incoming connections yet. */
  status: "Starting";
  /**
   * The properties which are currently known about the session.
   */
  partialProperties: PartialRenderingSessionProperties;
}

/** The rendering session enters the 'Expired' state when it has been in the 'Ready' state longer than its lease time. This is a terminal state. */
export interface ExpiredRenderingSession extends RenderingSessionBase {
  /** The rendering session enters the 'Expired' state when it has been in the 'Ready' state longer than its lease time. This is a terminal state. */
  status: "Expired";
  /**
   * The properties of the session.
   */
  properties: RenderingSessionProperties;
}

/** The rendering session has been stopped with the 'Stop Session' operation. This is a terminal state. */
export interface StoppedRenderingSession extends RenderingSessionBase {
  /** The rendering session has been stopped with the 'Stop Session' operation. This is a terminal state. */
  status: "Stopped";
  /**
   * The properties that were known about the session.
   */
  partialProperties: PartialRenderingSessionProperties;
}

/** Information about a rendering session. This is a tagged union with "status" as its discriminant property. */
export type RenderingSession =
  | StartingRenderingSession
  | ReadyRenderingSession
  | ErrorRenderingSession
  | ExpiredRenderingSession
  | StoppedRenderingSession;

/**
 * @internal
 */
function renderingSessionPropertiesFromSessionProperties(
  session: SessionProperties
): RenderingSessionProperties {
  return {
    arrInspectorPort: session.arrInspectorPort!,
    handshakePort: session.handshakePort!,
    elapsedTimeInMinutes: session.elapsedTimeInMinutes!,
    host: session.host!,
    teraflops: session.teraflops!,
    createdOn: session.createdOn!,
  };
}

/**
 * @internal
 */
function partialRenderingSessionPropertiesFromSessionProperties(
  session: SessionProperties
): PartialRenderingSessionProperties {
  return {
    arrInspectorPort: session.arrInspectorPort,
    handshakePort: session.handshakePort,
    elapsedTimeInMinutes: session.elapsedTimeInMinutes,
    host: session.host,
    teraflops: session.teraflops,
    createdOn: session.createdOn,
  };
}

/**
 * Build a RenderingSession object from the SessionProperties object returned by the service.
 * @internal
 */
export function renderingSessionFromSessionProperties(
  session: SessionProperties
): RenderingSession {
  const baseProperties: RenderingSessionBase = {
    sessionId: session.sessionId,
    size: session.size,
    maxLeaseTimeInMinutes: session.maxLeaseTimeInMinutes!,
  };
  switch (session.status) {
    case KnownRenderingSessionStatus.Ready:
      return {
        status: "Ready",
        ...baseProperties,
        properties: renderingSessionPropertiesFromSessionProperties(session),
      };
    case KnownRenderingSessionStatus.Starting:
      return {
        status: "Starting",
        ...baseProperties,
        partialProperties: partialRenderingSessionPropertiesFromSessionProperties(session),
      };
    case KnownRenderingSessionStatus.Error:
      return {
        status: "Error",
        ...baseProperties,
        error: createRemoteRenderingServiceError(session.error!),
        partialProperties: partialRenderingSessionPropertiesFromSessionProperties(session),
      };
    case KnownRenderingSessionStatus.Expired:
      return {
        status: "Expired",
        ...baseProperties,
        properties: renderingSessionPropertiesFromSessionProperties(session),
      };
    case KnownRenderingSessionStatus.Stopped:
      return {
        status: "Stopped",
        ...baseProperties,
        partialProperties: partialRenderingSessionPropertiesFromSessionProperties(session),
      };
    default:
      throw new Error("Unrecognized RenderingSessionStatus returned by the service");
  }
}
