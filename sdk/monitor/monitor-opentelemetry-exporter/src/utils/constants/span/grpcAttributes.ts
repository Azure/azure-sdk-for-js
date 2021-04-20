// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as conventions from "@opentelemetry/semantic-conventions";

/**
 * OpenTelemetry GRPC kind attribute.
 * @internal
 */
export const { GRPC_KIND } = conventions.RpcAttribute;
/**
 * OpenTelemetry GRPC method attribute.
 * @internal
 */
export const { GRPC_METHOD } = conventions.RpcAttribute;
/**
 * OpenTelemetry GRPC status code attribute.
 * @internal
 */
export const { GRPC_STATUS_CODE } = conventions.RpcAttribute;
/**
 * OpenTelemetry GRPC error name attribute.
 * @internal
 */
export const { GRPC_ERROR_NAME } = conventions.RpcAttribute;
/**
 * OpenTelemetry GRPC error message attribute.
 * @internal
 */
export const { GRPC_ERROR_MESSAGE } = conventions.RpcAttribute;
