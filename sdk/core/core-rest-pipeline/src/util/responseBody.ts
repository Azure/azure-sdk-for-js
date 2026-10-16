// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineResponse } from "../interfaces.js";
import { logger } from "../log.js";

interface NodeResponseBody {
  destroy?: () => void;
  resume: () => void;
}

interface BrowserResponseBody {
  cancel: () => Promise<void>;
}

function isNodeResponseBody(value: unknown): value is NodeResponseBody {
  return (
    typeof value === "object" &&
    value !== null &&
    "resume" in value &&
    typeof value.resume === "function"
  );
}

function isBrowserResponseBody(value: unknown): value is BrowserResponseBody {
  return (
    typeof value === "object" &&
    value !== null &&
    "cancel" in value &&
    typeof value.cancel === "function"
  );
}

export async function disposeResponseBody(response: PipelineResponse): Promise<void> {
  try {
    const readableStream: unknown = response.readableStreamBody;
    if (isNodeResponseBody(readableStream)) {
      if (readableStream.destroy) {
        readableStream.destroy();
      } else {
        readableStream.resume();
      }
      return;
    }

    const browserStream: unknown = response.browserStreamBody;
    if (isBrowserResponseBody(browserStream)) {
      await browserStream.cancel();
    }
  } catch (error) {
    logger.warning("Error disposing response body", error);
  }
}
