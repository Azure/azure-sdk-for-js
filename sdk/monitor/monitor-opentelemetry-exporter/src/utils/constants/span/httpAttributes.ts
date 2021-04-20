// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as conventions from "@opentelemetry/semantic-conventions";

/**
 * OpenTelemetry HTTP method attribute.
 * @internal
 */
export const { HTTP_METHOD } = conventions.HttpAttribute;
/**
 * OpenTelemetry HTTP URL attribute.
 * @internal
 */
export const { HTTP_URL } = conventions.HttpAttribute;
/**
 * OpenTelemetry HTTP route attribute.
 * @internal
 */
export const { HTTP_ROUTE } = conventions.HttpAttribute;
/**
 * OpenTelemetry HTTP status code attribute.
 * @internal
 */
export const { HTTP_STATUS_CODE } = conventions.HttpAttribute;
