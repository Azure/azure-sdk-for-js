// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import { RemoteRendering } from "../generated/operationsInterfaces";
import { createSpan } from "../tracing";
import { SpanStatusCode } from "@azure/core-tracing";
import { AssetConversion, assetConversionFromConversion } from "./assetConversion";
import { RenderingSession, renderingSessionFromSessionProperties } from "./renderingSession";

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
  options?: OperationOptions
): Promise<AssetConversion> {
  const { span, updatedOptions } = createSpan(tracingSpanName, {
    conversionId: conversionId,
    ...options,
  });

  try {
    const conversion = await operations.getConversion(accountId, conversionId, updatedOptions);
    return assetConversionFromConversion(conversion);
  } catch (e: any) {
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: e.message,
    });
    throw e;
  } finally {
    span.end();
  }
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
  options?: OperationOptions
): Promise<RenderingSession> {
  const { span, updatedOptions } = createSpan(tracingSpanName, {
    sessionId,
    ...options,
  });

  try {
    const sessionProperties = await operations.getSession(accountId, sessionId, updatedOptions);
    return renderingSessionFromSessionProperties(sessionProperties);
  } catch (e: any) {
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: e.message,
    });
    throw e;
  } finally {
    span.end();
  }
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
  options?: OperationOptions
): Promise<void> {
  const { span, updatedOptions } = createSpan(tracingSpanName, {
    conversionId: sessionId,
    ...options,
  });

  try {
    await operations.stopSession(accountId, sessionId, updatedOptions);
  } catch (e: any) {
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: e.message,
    });
    throw e;
  } finally {
    span.end();
  }
}
