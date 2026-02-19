// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import type { RequestSession } from "../models/index.js";
import type {
  CreateSessionOptions,
  StartSessionOptions,
  VoiceLiveSessionOptions,
} from "./voiceLiveSession.js";
import { VoiceLiveSession } from "./voiceLiveSession.js";
import { logger } from "../logger.js";
import type { SessionTarget } from "./types.js";
import { isAgentSessionTarget, isModelSessionTarget } from "./types.js";

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
   * Creates a new VoiceLiveSession using a session target (model or agent).
   *
   * @param target - The session target specifying either a model or agent
   * @param sessionOptions - Optional configuration specific to this session
   * @returns A new VoiceLiveSession instance ready to connect
   *
   * @example Model-centric session
   * ```typescript snippet:CreateSessionModelTarget
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { VoiceLiveClient } from "@azure/ai-voicelive";
   *
   * const credential = new DefaultAzureCredential();
   * const endpoint = "https://your-resource.cognitiveservices.azure.com";
   * const client = new VoiceLiveClient(endpoint, credential);
   *
   * const session = client.createSession({ model: "gpt-4o-realtime-preview" });
   * ```
   *
   * @example Agent-centric session
   * ```typescript snippet:CreateSessionAgentTarget
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { VoiceLiveClient } from "@azure/ai-voicelive";
   *
   * const credential = new DefaultAzureCredential();
   * const endpoint = "https://your-resource.cognitiveservices.azure.com";
   * const client = new VoiceLiveClient(endpoint, credential);
   *
   * const session = client.createSession({
   *   agent: { agentName: "my-agent", projectName: "my-project" },
   * });
   * ```
   */
  createSession(target: SessionTarget, sessionOptions?: CreateSessionOptions): VoiceLiveSession;

  /**
   * Creates a new VoiceLiveSession for real-time voice communication with session configuration.
   *
   * @param sessionConfig - Session configuration including model and other settings
   * @param sessionOptions - Optional configuration specific to this session
   * @returns A new VoiceLiveSession instance ready to connect
   */
  createSession(
    sessionConfig: RequestSession,
    sessionOptions?: CreateSessionOptions,
  ): VoiceLiveSession;

  createSession(
    modelOrConfigOrTarget: string | RequestSession | SessionTarget,
    sessionOptions?: CreateSessionOptions,
  ): VoiceLiveSession {
    // Merge default session options with provided options
    const mergedOptions: VoiceLiveSessionOptions = {
      ...this._options.defaultSessionOptions,
      ...sessionOptions,
    };

    // Handle string model (backward compat)
    if (typeof modelOrConfigOrTarget === "string") {
      if (!modelOrConfigOrTarget) {
        throw new Error(
          "Model name is required when providing a string argument. Use SessionTarget with agent for agent-centric sessions.",
        );
      }

      const session = new VoiceLiveSession(
        this._endpoint,
        this._credential,
        this._options.apiVersion,
        modelOrConfigOrTarget,
        mergedOptions,
      );
      logger.info("VoiceLiveSession created", { model: modelOrConfigOrTarget });
      return session;
    }

    // Handle SessionTarget (new discriminated union pattern)
    if (this._isSessionTarget(modelOrConfigOrTarget)) {
      if (isModelSessionTarget(modelOrConfigOrTarget)) {
        const session = new VoiceLiveSession(
          this._endpoint,
          this._credential,
          this._options.apiVersion,
          modelOrConfigOrTarget.model,
          mergedOptions,
        );
        logger.info("VoiceLiveSession created", { model: modelOrConfigOrTarget.model });
        return session;
      } else if (isAgentSessionTarget(modelOrConfigOrTarget)) {
        const session = new VoiceLiveSession(
          this._endpoint,
          this._credential,
          this._options.apiVersion,
          modelOrConfigOrTarget.agent,
          mergedOptions,
        );
        logger.info("VoiceLiveSession created", {
          agentName: modelOrConfigOrTarget.agent.agentName,
        });
        return session;
      }
    }

    // Handle RequestSession (full config)
    const requestSession = modelOrConfigOrTarget as RequestSession;
    if (!requestSession.model) {
      throw new Error(
        "Model name is required when using RequestSession. Provide a model property, or use SessionTarget with agent for agent-centric sessions.",
      );
    }

    const session = new VoiceLiveSession(
      this._endpoint,
      this._credential,
      this._options.apiVersion,
      requestSession.model,
      mergedOptions,
    );

    // Store full session config for later use
    (session as any)._initialSessionConfig = requestSession;

    logger.info("VoiceLiveSession created", { model: requestSession.model });
    return session;
  }

  /**
   * Type guard to check if a value is a SessionTarget.
   * SessionTarget has exactly one of: { model: string } or { agent: AgentSessionConfig }
   * with no other keys (to distinguish from RequestSession which may have model + other keys).
   */
  private _isSessionTarget(value: unknown): value is SessionTarget {
    if (typeof value !== "object" || value === null) {
      return false;
    }

    const obj = value as Record<string, unknown>;
    const keys = Object.keys(obj);

    // SessionTarget with model: exactly one key "model" with string value
    if (keys.length === 1 && keys[0] === "model" && typeof obj.model === "string") {
      return true;
    }

    // SessionTarget with agent: exactly one key "agent" with AgentSessionConfig object
    if (
      keys.length === 1 &&
      keys[0] === "agent" &&
      typeof obj.agent === "object" &&
      obj.agent !== null &&
      "agentName" in (obj.agent as Record<string, unknown>)
    ) {
      return true;
    }

    return false;
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
   * Creates and immediately connects a new VoiceLiveSession using a session target.
   *
   * @param target - The session target specifying either a model or agent
   * @param sessionOptions - Optional configuration specific to this session
   * @returns A connected VoiceLiveSession instance
   *
   * @example Model-centric session
   * ```typescript snippet:StartSessionModelTarget
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { VoiceLiveClient } from "@azure/ai-voicelive";
   *
   * const credential = new DefaultAzureCredential();
   * const endpoint = "https://your-resource.cognitiveservices.azure.com";
   * const client = new VoiceLiveClient(endpoint, credential);
   *
   * const session = await client.startSession({ model: "gpt-4o-realtime-preview" });
   * ```
   *
   * @example Agent-centric session
   * ```typescript snippet:StartSessionAgentTarget
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { VoiceLiveClient } from "@azure/ai-voicelive";
   *
   * const credential = new DefaultAzureCredential();
   * const endpoint = "https://your-resource.cognitiveservices.azure.com";
   * const client = new VoiceLiveClient(endpoint, credential);
   *
   * const session = await client.startSession({
   *   agent: { agentName: "my-agent", projectName: "my-project" },
   * });
   * ```
   */
  async startSession(
    target: SessionTarget,
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
    modelOrConfigOrTarget: string | RequestSession | SessionTarget,
    sessionOptions?: StartSessionOptions,
  ): Promise<VoiceLiveSession> {
    const session = this.createSession(modelOrConfigOrTarget as any, sessionOptions);

    // Only subscribe if sessionHandlers are provided
    if (sessionOptions?.sessionHandlers) {
      // The subscription lives for the session lifetime and is cleaned up when session is disposed
      session.subscribe(sessionOptions.sessionHandlers);
    }

    await session.connect();

    // If RequestSession was provided (has model property but not as SessionTarget), send it after connection
    if (
      typeof modelOrConfigOrTarget !== "string" &&
      !this._isSessionTarget(modelOrConfigOrTarget)
    ) {
      await session.updateSession(modelOrConfigOrTarget as RequestSession);
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
