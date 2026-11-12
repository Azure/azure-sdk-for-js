// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type { ContainerClient } from "../ContainerClient.js";
import type { ActiveSession } from "./models.js";
import { createActiveSession } from "./models.js";

/**
 * Creates a session scoped to the given container.
 *
 * This is the only place that reaches the generated Create Session operation, so a
 * regeneration or a future public API only has to be reconciled here. Create Session is a
 * `POST` and so is never session-eligible, which is what keeps this from recursing when the
 * container client is built on a session-enabled pipeline.
 */
export async function createContainerSession(
  containerClient: ContainerClient,
  abortSignal?: AbortSignalLike,
): Promise<ActiveSession> {
  // Hack to access a protected member.
  const containerContext = containerClient["storageClientContext"].container;

  const response = await containerContext.createSession(
    { authenticationType: "HMAC" },
    { abortSignal },
  );

  const sessionToken = response.credentials?.sessionToken;
  const sessionKey = response.credentials?.sessionKey;
  if (!sessionToken || !sessionKey || !response.expiration) {
    throw new Error(
      "Create Session succeeded but the response was missing the session token, session key, or expiration.",
    );
  }

  return createActiveSession(sessionToken, sessionKey, response.expiration);
}
