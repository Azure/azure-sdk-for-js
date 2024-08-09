// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Response } from "express";
import { logger } from "./logger.mts";

export function sendHeaders(res: Response) {
  res.writeHead(200, {
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
  });
}

export async function sendEvents(res: Response, count: number, waitTimeInMs: number) {
  let i = 0;
  while (i < count) {
    await new Promise((resolve) => setTimeout(resolve, waitTimeInMs));
    logger.verbose("Emit", ++i);
    res.write(`data: ${i}\n\n`);
  }
  logger.verbose("Emit [DONE]");
  res.write(`data: [DONE]\n\n`);
}
