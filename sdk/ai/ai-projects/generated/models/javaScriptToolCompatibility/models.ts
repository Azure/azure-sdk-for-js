// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  MCPToolRequireApproval as MCPToolRequireApproval_1,
  MCPToolFilter,
  ComparisonFilter,
  CompoundFilter,
  AutoCodeInterpreterToolParam,
} from "../openAI/models.js";

/** Alias for MCPToolAllowedTools */
export type MCPToolAllowedTools = string[] | MCPToolFilter;

export function mcpToolAllowedToolsSerializer(item: MCPToolAllowedTools): any {
  return item;
}

export function mcpToolAllowedToolsDeserializer(item: any): MCPToolAllowedTools {
  return item;
}

/** Alias for MCPToolRequireApproval */
export type MCPToolRequireApproval = MCPToolRequireApproval_1 | "always" | "never";

export function mcpToolRequireApprovalSerializer(item: MCPToolRequireApproval): any {
  return item;
}

export function mcpToolRequireApprovalDeserializer(item: any): MCPToolRequireApproval {
  return item;
}

/** Alias for FileSearchToolFiltersValue */
export type FileSearchToolFiltersValue = string | number | boolean | FileSearchToolFiltersValue_1[];

export function fileSearchToolFiltersValueSerializer(item: FileSearchToolFiltersValue): any {
  return item;
}

export function fileSearchToolFiltersValueDeserializer(item: any): FileSearchToolFiltersValue {
  return item;
}

export function fileSearchToolFiltersValueArraySerializer(
  result: Array<FileSearchToolFiltersValue>,
): any[] {
  return result.map((item) => {
    return fileSearchToolFiltersValueSerializer_1(item);
  });
}

export function fileSearchToolFiltersValueArrayDeserializer(
  result: Array<FileSearchToolFiltersValue>,
): any[] {
  return result.map((item) => {
    return fileSearchToolFiltersValueDeserializer_1(item);
  });
}

/** Alias for FileSearchToolFiltersValue */
export type FileSearchToolFiltersValue_1 = string | number;

export function fileSearchToolFiltersValueSerializer_1(item: FileSearchToolFiltersValue_1): any {
  return item;
}

export function fileSearchToolFiltersValueDeserializer_1(item: any): FileSearchToolFiltersValue_1 {
  return item;
}

export function fileSearchToolFiltersFilterArraySerializer(
  result: Array<FileSearchToolFiltersFilter>,
): any[] {
  return result.map((item) => {
    return fileSearchToolFiltersFilterSerializer(item);
  });
}

export function fileSearchToolFiltersFilterArrayDeserializer(
  result: Array<FileSearchToolFiltersFilter>,
): any[] {
  return result.map((item) => {
    return fileSearchToolFiltersFilterDeserializer(item);
  });
}

/** Alias for FileSearchToolFiltersFilter */
export type FileSearchToolFiltersFilter = ComparisonFilter | CompoundFilter;

export function fileSearchToolFiltersFilterSerializer(item: FileSearchToolFiltersFilter): any {
  return item;
}

export function fileSearchToolFiltersFilterDeserializer(item: any): FileSearchToolFiltersFilter {
  return item;
}

/** Alias for CodeInterpreterToolContainer */
export type CodeInterpreterToolContainer = string | AutoCodeInterpreterToolParam;

export function codeInterpreterToolContainerSerializer(item: CodeInterpreterToolContainer): any {
  return item;
}

export function codeInterpreterToolContainerDeserializer(item: any): CodeInterpreterToolContainer {
  return item;
}
