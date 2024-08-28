// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AssetConversion, assetConversionFromConversion } from "./assetConversion";
import { RenderingSession, renderingSessionFromSessionProperties } from "./renderingSession";
import { OperationOptions } from "@azure/core-client";
import { RemoteRendering } from "../generated/operationsInterfaces";
import { tracingClient } from "../generated/tracing";

/**
 * Call getConversion on the service, wrapped in a tracing span with a provided name.
 * @param tracingSpanName - The name to use for the span that wraps the call.
 * @internal
 */
export async function getConversionInternal(
  accountId: string,
  operations: RemoteRendering,
  conversionId: string,
  tracingSpanName: string,
  options?: OperationOptions,
): Promise<AssetConversion> {
  return tracingClient.withSpan(
    tracingSpanName,
    {
      conversionId: conversionId,
      ...options,
    },
    async (updatedOptions) => {
      const conversion = await operations.getConversion(accountId, conversionId, updatedOptions);
      return assetConversionFromConversion(conversion);
    },
  );
}

/**
 * Call getSession on the service, wrapped in a tracing span with a provided name.
 * @param tracingSpanName - The name to use for the span that wraps the call.
 * @internal
 */
export async function getSessionInternal(
  accountId: string,
  operations: RemoteRendering,
  sessionId: string,
  tracingSpanName: string,
  options?: OperationOptions,
): Promise<RenderingSession> {
  return tracingClient.withSpan(
    tracingSpanName,
    {
      sessionId,
      ...options,
    },
    async (updatedOptions) => {
      const sessionProperties = await operations.getSession(accountId, sessionId, updatedOptions);
      return renderingSessionFromSessionProperties(sessionProperties);
    },
  );
}

/**
 * Call endSession on the service, wrapped in a tracing span with a provided name.
 * @param tracingSpanName - The name to use for the span that wraps the call.
 * @internal
 */
export async function endSessionInternal(
  accountId: string,
  operations: RemoteRendering,
  sessionId: string,
  tracingSpanName: string,
  options?: OperationOptions,
): Promise<void> {
  return tracingClient.withSpan(
    tracingSpanName,
    {
      conversionId: sessionId,
      ...options,
    },
    async (updatedOptions) => {
      await operations.stopSession(accountId, sessionId, updatedOptions);
    },
  );
}
