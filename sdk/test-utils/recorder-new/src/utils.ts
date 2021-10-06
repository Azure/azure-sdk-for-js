// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * A custom error type for failed pipeline requests.
 */
export class RecorderError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = "RecorderError";
    this.statusCode = statusCode;
  }
}

export type RecordingState = "started" | "stopped";
/**
 * Helper class to manage the recording state to make sure the proxy-tool is not flooded with unintended requests.
 */
export class RecordingStateManager {
  private currentState: RecordingState = "stopped";

  /**
   * validateState
   */
  private validateState(nextState: RecordingState) {
    if (nextState === "started") {
      if (this.state === "started") {
        throw new RecorderError("Already started, should not have called start again.");
      }
    }
    if (nextState === "stopped") {
      if (this.state === "stopped") {
        throw new RecorderError("Already stopped, should not have called stop again.");
      }
    }
  }

  public get state(): RecordingState {
    return this.currentState;
  }

  public set state(nextState: RecordingState) {
    // Validate state transition
    this.validateState(nextState);
    this.currentState = nextState;
  }
}
