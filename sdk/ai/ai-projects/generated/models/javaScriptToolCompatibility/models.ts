// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  MCPToolRequireApproval,
  MCPToolFilter,
  ComparisonFilter,
  CompoundFilter,
  AutoCodeInterpreterToolParam,
} from "../openAI/models.js";

/** Alias for _MCPToolAllowedTools */
export type _MCPToolAllowedTools = string[] | MCPToolFilter;

export function _MCPToolAllowedToolsSerializer(item: _MCPToolAllowedTools): any {
  return item;
}

export function _MCPToolAllowedToolsDeserializer(item: any): _MCPToolAllowedTools {
  return item;
}

/** Alias for _MCPToolRequireApproval */
export type _MCPToolRequireApproval = MCPToolRequireApproval | "always" | "never";

export function _MCPToolRequireApprovalSerializer(item: _MCPToolRequireApproval): any {
  return item;
}

export function _MCPToolRequireApprovalDeserializer(item: any): _MCPToolRequireApproval {
  return item;
}

/** Alias for FileSearchToolFiltersValue */
export type FileSearchToolFiltersValue = string | number | boolean | _FileSearchToolFiltersValue[];

export function fileSearchToolFiltersValueSerializer(item: FileSearchToolFiltersValue): any {
  return item;
}

export function fileSearchToolFiltersValueDeserializer(item: any): FileSearchToolFiltersValue {
  return item;
}

export function _FileSearchToolFiltersValueArraySerializer(
  result: Array<_FileSearchToolFiltersValue>,
): any[] {
  return result.map((item) => {
    return _FileSearchToolFiltersValueSerializer(item);
  });
}

export function _FileSearchToolFiltersValueArrayDeserializer(
  result: Array<_FileSearchToolFiltersValue>,
): any[] {
  return result.map((item) => {
    return _FileSearchToolFiltersValueDeserializer(item);
  });
}

/** Alias for _FileSearchToolFiltersValue */
export type _FileSearchToolFiltersValue = string | number;

export function _FileSearchToolFiltersValueSerializer(item: _FileSearchToolFiltersValue): any {
  return item;
}

export function _FileSearchToolFiltersValueDeserializer(item: any): _FileSearchToolFiltersValue {
  return item;
}

export function _FileSearchToolFiltersFilterArraySerializer(
  result: Array<_FileSearchToolFiltersFilter>,
): any[] {
  return result.map((item) => {
    return _FileSearchToolFiltersFilterSerializer(item);
  });
}

export function _FileSearchToolFiltersFilterArrayDeserializer(
  result: Array<_FileSearchToolFiltersFilter>,
): any[] {
  return result.map((item) => {
    return _FileSearchToolFiltersFilterDeserializer(item);
  });
}

/** Alias for _FileSearchToolFiltersFilter */
export type _FileSearchToolFiltersFilter = ComparisonFilter | CompoundFilter;

export function _FileSearchToolFiltersFilterSerializer(item: _FileSearchToolFiltersFilter): any {
  return item;
}

export function _FileSearchToolFiltersFilterDeserializer(item: any): _FileSearchToolFiltersFilter {
  return item;
}

/** Alias for _CodeInterpreterToolContainer */
export type _CodeInterpreterToolContainer = string | AutoCodeInterpreterToolParam;

export function _CodeInterpreterToolContainerSerializer(item: _CodeInterpreterToolContainer): any {
  return item;
}

export function _CodeInterpreterToolContainerDeserializer(
  item: any,
): _CodeInterpreterToolContainer {
  return item;
}
