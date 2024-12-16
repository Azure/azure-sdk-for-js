// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Response } from "express";
import { logger } from "./logger.mjs";

export function sendHeaders(res: Response): void {
  res.writeHead(200, {
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
  });
}

export async function sendEvents(
  res: Response,
  count: number,
  waitTimeInMs: number,
): Promise<void> {
  for (let i = 0; i < count; i++) {
    await new Promise((resolve) => setTimeout(resolve, waitTimeInMs));
    logger.verbose("Emit", ++i);
    res.write(`data: ${i}\n\n`);
  }
  logger.verbose("Emit [DONE]");
  res.write(`data: [DONE]\n\n`);
}
