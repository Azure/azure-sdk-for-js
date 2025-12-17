// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContextTagKeys } from "../generated/index.js";

const contextTagKeyMap = {
  AiApplicationVer: "ai.application.ver",
  AiDeviceId: "ai.device.id",
  AiDeviceLocale: "ai.device.locale",
  AiDeviceModel: "ai.device.model",
  AiDeviceOemName: "ai.device.oemName",
  AiDeviceOsVersion: "ai.device.osVersion",
  AiDeviceType: "ai.device.type",
  AiLocationIp: "ai.location.ip",
  AiLocationCountry: "ai.location.country",
  AiLocationProvince: "ai.location.province",
  AiLocationCity: "ai.location.city",
  AiOperationId: "ai.operation.id",
  AiOperationName: "ai.operation.name",
  AiOperationParentId: "ai.operation.parentId",
  AiOperationSyntheticSource: "ai.operation.syntheticSource",
  AiOperationCorrelationVector: "ai.operation.correlationVector",
  AiSessionId: "ai.session.id",
  AiSessionIsFirst: "ai.session.isFirst",
  AiUserAccountId: "ai.user.accountId",
  AiUserId: "ai.user.id",
  AiUserAuthUserId: "ai.user.authUserId",
  AiCloudRole: "ai.cloud.role",
  AiCloudRoleVer: "ai.cloud.roleVer",
  AiCloudRoleInstance: "ai.cloud.roleInstance",
  AiCloudLocation: "ai.cloud.location",
  AiInternalSdkVersion: "ai.internal.sdkVersion",
  AiInternalAgentVersion: "ai.internal.agentVersion",
  AiInternalNodeName: "ai.internal.nodeName",
} as const;

export type KnownContextTagKeyName = keyof typeof contextTagKeyMap;

// Back-compat enumerator mapping to the generated ContextTagKeys string union.
export const KnownContextTagKeys: Record<KnownContextTagKeyName, ContextTagKeys> = contextTagKeyMap;
