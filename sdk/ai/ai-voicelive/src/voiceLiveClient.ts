// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import type { RequestSession } from "./models/index.js";
import type {
  CreateSessionOptions,
  StartSessionOptions,
  VoiceLiveSessionOptions,
} from "./voiceLiveSession.js";
import { VoiceLiveSession } from "./voiceLiveSession.js";
import { logger } from "./logger.js";

export interface VoiceLiveClientOptions {
  /** API version to use for the Voice Live service */
  apiVersion?: string;
  /** Default session options to apply to all created sessions */
  defaultSessionOptions?: VoiceLiveSessionOptions;
}

/**
 * The VoiceLive client provides session management for real-time conversational AI capabilities.
 *
 * This client acts as a factory for creating VoiceLiveSession instances, which handle the actual
 * WebSocket connections and real-time interactions with the service.
 */
export class VoiceLiveClient {
  private readonly _endpoint: string;
  private readonly _credential: TokenCredential | KeyCredential;
  private readonly _options: Required<VoiceLiveClientOptions>;

  /**
   * Creates an instance of VoiceLiveClient with endpoint and credential.
   *
   * @param endpoint - The Voice Live service endpoint URL
   * @param credential - Azure TokenCredential or KeyCredential for authentication
   * @param options - Optional configuration for the client
   */
  constructor(
    endpoint: string,
    credential: TokenCredential | KeyCredential,
    options: VoiceLiveClientOptions = {},
  ) {
    this._endpoint = this._normalizeEndpoint(endpoint);
    this._credential = credential;
    this._options = this._buildDefaultOptions(options);

    logger.info("VoiceLiveClient created", {
      endpoint: this._endpoint,
      apiVersion: this._options.apiVersion,
    });
  }

  /**
   * Creates a new VoiceLiveSession for real-time voice communication.
   *
   * @param model - The model name to use for the session (e.g., "gpt-4o-realtime-preview")
   * @param sessionOptions - Optional configuration specific to this session
   * @returns A new VoiceLiveSession instance ready to connect
   */
  createSession(model: string, sessionOptions?: CreateSessionOptions): VoiceLiveSession;

  /**
   * Creates a new VoiceLiveSession for real-time voice communication with session configuration.
   *
   * @param sessionConfig - Session configuration including model and other settings
   * @returns A new VoiceLiveSession instance ready to connect
   */
  createSession(
    sessionConfig: RequestSession,
    sessionOptions?: CreateSessionOptions,
  ): VoiceLiveSession;

  createSession(
    modelOrConfig: string | RequestSession,
    sessionOptions?: CreateSessionOptions,
  ): VoiceLiveSession {
    // Extract model name from the parameter
    const model = typeof modelOrConfig === "string" ? modelOrConfig : modelOrConfig.model;
    if (!model) {
      throw new Error(
        "Model name is required. Provide either a model string or RequestSession with model property.",
      );
    }

    // Merge default session options with provided options
    const mergedOptions: VoiceLiveSessionOptions = {
      ...this._options.defaultSessionOptions,
      ...sessionOptions,
    };

    const session = new VoiceLiveSession(
      this._endpoint,
      this._credential,
      this._options.apiVersion,
      model,
      mergedOptions,
    );

    // If full session config was provided, store it for later use
    if (typeof modelOrConfig !== "string") {
      (session as any)._initialSessionConfig = modelOrConfig;
    }

    logger.info("VoiceLiveSession created", { model });
    return session;
  }

  /**
   * Creates and immediately connects a new VoiceLiveSession.
   *
   * @param model - The model name to use for the session (e.g., "gpt-4o-realtime-preview")
   * @param sessionOptions - Optional configuration specific to this session
   * @returns A connected VoiceLiveSession instance
   */
  async startSession(
    model: string,
    sessionOptions?: StartSessionOptions,
  ): Promise<VoiceLiveSession>;

  /**
   * Creates and immediately connects a new VoiceLiveSession with session configuration.
   *
   * @param sessionConfig - Session configuration including model and other settings
   * @param sessionOptions - Optional configuration specific to this session
   * @returns A connected VoiceLiveSession instance
   */
  async startSession(
    sessionConfig: RequestSession,
    sessionOptions?: StartSessionOptions,
  ): Promise<VoiceLiveSession>;

  async startSession(
    modelOrConfig: string | RequestSession,
    sessionOptions?: StartSessionOptions,
  ): Promise<VoiceLiveSession> {
    const session = this.createSession(modelOrConfig as any, sessionOptions);
    await session.connect();

    // If full session config was provided, send it after connection
    if (typeof modelOrConfig !== "string") {
      await session.updateSession(modelOrConfig);
    }

    return session;
  }

  // Properties
  get endpoint(): string {
    return this._endpoint;
  }

  get apiVersion(): string {
    return this._options.apiVersion;
  }

  private _buildDefaultOptions(options: VoiceLiveClientOptions): Required<VoiceLiveClientOptions> {
    return {
      apiVersion: options.apiVersion || "2025-10-01",
      defaultSessionOptions: options.defaultSessionOptions || {},
    };
  }

  private _normalizeEndpoint(endpoint: string): string {
    // Ensure endpoint has proper protocol
    if (!endpoint.startsWith("http://") && !endpoint.startsWith("https://")) {
      endpoint = `https://${endpoint}`;
    }

    // Remove trailing slash
    return endpoint.replace(/\/$/, "");
  }
}
