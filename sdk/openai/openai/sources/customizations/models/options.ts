// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure-rest/core-client";
import { ImageSize, ImageGenerationResponseFormat } from "../../generated/src/index.js";

/**
 * Options to custom the images generation request
 */
export interface ImageGenerationOptions extends OperationOptions {
  /** The number of images to generate (defaults to 1). */
  n?: number;
  /** The desired size of the generated images. Must be one of 256x256, 512x512, or 1024x1024 (defaults to 1024x1024). */
  size?: ImageSize;
  /**
   *   The format in which image generation response items should be presented.
   *   Azure OpenAI only supports URL response items.
   */
  responseFormat?: ImageGenerationResponseFormat;
  /** A unique identifier representing your end-user, which can help to monitor and detect abuse. */
  user?: string;
}
