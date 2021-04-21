// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import { RenderingSession } from "../generated/models/index";
import { RemoteRendering } from "../generated/operations";
import { createSpan } from "../tracing";
import { SpanStatusCode } from "@azure/core-tracing";
import { AssetConversion, assetConversionFromConversion } from "./assetConversion"

export async function getConversionInternal(
  accountId: string,
  operations: RemoteRendering,
  conversionId: string,
  tracingSpanName: string,
  options?: OperationOptions
): Promise<AssetConversion> {
  const { span, updatedOptions } = createSpan(tracingSpanName, {
    conversionId: conversionId,
    ...options
  });

  try {
    let conversion = await operations.getConversion(accountId, conversionId, updatedOptions);
    return assetConversionFromConversion(conversion);
  } catch (e) {
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: e.message
    });
    throw e;
  } finally {
    span.end();
  }
}

export async function getSessionInternal(
  accountId: string,
  operations: RemoteRendering,
  sessionId: string,
  tracingSpanName: string,
  options?: OperationOptions
): Promise<RenderingSession> {
  const { span, updatedOptions } = createSpan(tracingSpanName, {
    sessionId,
    ...options
  });

  try {
    return operations.getSession(accountId, sessionId, updatedOptions);
  } catch (e) {
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: e.message
    });
    throw e;
  } finally {
    span.end();
  }
}

export async function endSessionInternal(
  accountId: string,
  operations: RemoteRendering,
  sessionId: string,
  tracingSpanName: string,
  options?: OperationOptions
): Promise<void> {
  const { span, updatedOptions } = createSpan(tracingSpanName, {
    conversionId: sessionId,
    ...options
  });

  try {
    operations.stopSession(accountId, sessionId, updatedOptions);
  } catch (e) {
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: e.message
    });
    throw e;
  } finally {
    span.end();
  }
}
