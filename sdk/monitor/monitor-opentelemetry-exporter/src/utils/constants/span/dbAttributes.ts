// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as conventions from "@opentelemetry/semantic-conventions";

/**
 * OpenTelemetry DB type attribute.
 * @internal
 */
export const { DB_TYPE } = conventions.DatabaseAttribute;
/**
 * OpenTelemetry DB instance attribute.
 * @internal
 */
export const { DB_INSTANCE } = conventions.DatabaseAttribute;
/**
 * OpenTelemetry DB statement attribute.
 * @internal
 */
export const { DB_STATEMENT } = conventions.DatabaseAttribute;
/**
 * OpenTelemetry peer address attribute.
 * @internal
 */
export const PEER_ADDRESS = conventions.GeneralAttribute.NET_PEER_ADDRESS;
/**
 * OpenTelemetry peer hostname attribute.
 * @internal
 */
export const PEER_HOSTNAME = conventions.GeneralAttribute.NET_PEER_HOSTNAME;

/**
 * OpenTelemetry peer port attribute.
 * @internal
 */
export const PEER_PORT = conventions.GeneralAttribute.NET_PEER_PORT;
/**
 * OpenTelemetry peer IPV4 attribute.
 * @internal
 */
export const PEER_IPV4 = conventions.GeneralAttribute.NET_PEER_IPV4;
/**
 * OpenTelemetry peer IPV6 attribute.
 * @internal
 */
export const PEER_IPV6 = conventions.GeneralAttribute.NET_PEER_IPV6;
/**
 * OpenTelemetry peer service attribute.
 * @internal
 */
export const PEER_SERVICE = conventions.GeneralAttribute.NET_PEER_SERVICE;
