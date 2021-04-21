// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  RenderingServerSize,
  RenderingSessionStatus,
  RemoteRenderingServiceError,
  SessionProperties
} from "../generated/index";

/** The properties of a rendering session. */
export interface RenderingSession {
  /** The ID of the session supplied when the session was created. */
  sessionId: string;
  /**
   * The TCP port at which the Azure Remote Rendering Inspector tool is hosted.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly arrInspectorPort?: number;
  /**
   * The TCP port used for the handshake when establishing a connection.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly handshakePort?: number;
  /**
   * Amount of time in minutes the session is or was in the 'Ready' state. Time is rounded down to a full minute.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly elapsedTimeInMinutes?: number;
  /**
   * The hostname under which the rendering session is reachable.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly host?: string;
  /**
   * The time in minutes the session will run after reaching the 'Ready' state.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly maxLeaseTimeInMinutes?: number;
  /** The size of the server used for the rendering session. The size impacts the number of polygons the server can render. Refer to https://docs.microsoft.com/azure/remote-rendering/reference/vm-sizes for details. */
  size: RenderingServerSize;
  /** The status of the rendering session. Terminal states are 'Error', 'Expired', and 'Stopped'. */
  status: RenderingSessionStatus;
  /**
   * The computational power of the rendering session GPU measured in teraflops.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly teraflops?: number;
  /**
   * The error object containing details about the rendering session startup failure.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly error?: RemoteRenderingServiceError;
  /**
   * The time when the rendering session was created. Date and time in ISO 8601 format.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly createdOn?: Date;
}

export function renderingSessionFromSessionProperties(session: SessionProperties) {
  return {
    ...session,
    error: session.error ? session.error : undefined
  };
}
