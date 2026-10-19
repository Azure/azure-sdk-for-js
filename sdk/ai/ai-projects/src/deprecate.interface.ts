// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  TextResponseFormat,
  TextResponseFormatText,
  TextResponseFormatJsonObject,
  TextResponseFormatUnion,
} from "./models/index.js";

/**
 * Base configuration for the format of generated text responses.
 * @deprecated Use `TextResponseFormat` instead.
 */
export interface TextResponseFormatConfiguration extends TextResponseFormat {}
/**
 * Configures generated responses to use plain text.
 * @deprecated Use `TextResponseFormatText` instead.
 */
export interface TextResponseFormatConfigurationResponseFormatText extends TextResponseFormatText {}
/**
 * Configures generated responses to use JSON object format.
 * @deprecated Use `TextResponseFormatJsonObject` instead.
 */
export interface TextResponseFormatConfigurationResponseFormatJsonObject extends TextResponseFormatJsonObject {}
/**
 * Supported configurations for plain text and structured JSON responses.
 * @deprecated Use `TextResponseFormatUnion` instead.
 */
export type TextResponseFormatConfigurationUnion = TextResponseFormatUnion;
