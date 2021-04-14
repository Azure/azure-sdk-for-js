// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
    OperationOptions
} from "@azure/core-http";
import {
    AssetConversion,
  } from "../generated/models/index";
import { RemoteRendering } from "../generated/operations";
import { WithResponse } from "../remoteRenderingClient";
import { createSpan } from "../tracing";
import { SpanStatusCode } from "@azure/core-tracing";

export async function getConversionInternal(
    accountId: string,
    operations: RemoteRendering,
    conversionId: string,
    tracingSpanName: string,
    options?: OperationOptions
) : Promise<WithResponse<AssetConversion>> {
    const { span, updatedOptions } = createSpan(tracingSpanName, {
        conversionId: conversionId,
        ...options
    });

    try {
        return await operations.getConversion(accountId, conversionId, updatedOptions);
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
