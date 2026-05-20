// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  TextResponseFormat,
  TextResponseFormatText,
  TextResponseFormatJsonObject,
  TextResponseFormatUnion,
} from "./models/index.js";

/** @deprecated Use `TextResponseFormat` instead. */
export interface TextResponseFormatConfiguration extends TextResponseFormat {}
/** @deprecated Use `TextResponseFormatText` instead. */
export interface TextResponseFormatConfigurationResponseFormatText extends TextResponseFormatText {}
/** @deprecated Use `TextResponseFormatJsonObject` instead. */
export interface TextResponseFormatConfigurationResponseFormatJsonObject extends TextResponseFormatJsonObject {}
/** @deprecated Use `TextResponseFormatUnion` instead. */
export type TextResponseFormatConfigurationUnion = TextResponseFormatUnion;
