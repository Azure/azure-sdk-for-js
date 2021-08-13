// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as conventions from "@opentelemetry/semantic-conventions";

/**
 * OpenTelemetry GRPC method attribute.
 * @internal
 */
export const GRPC_METHOD = conventions.SemanticAttributes.RPC_METHOD;
/**
 * OpenTelemetry GRPC status code attribute.
 * @internal
 */
export const GRPC_STATUS_CODE = conventions.SemanticAttributes.RPC_GRPC_STATUS_CODE;
