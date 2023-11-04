// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { Client, StreamableMethod } from "@azure-rest/core-client";
import { CreateParameters, CreateStreamingParameters } from "./parameters.js";
import { Create200Response, CreateStreaming200Response } from "./responses.js";

export interface CreateStreaming {
  /** Creates a new streaming chat completion. */
  post(options?: CreateStreamingParameters): StreamableMethod<CreateStreaming200Response>;
  /** Creates a new chat completion. */
  post(options?: CreateParameters): StreamableMethod<Create200Response>;
}

export interface Routes {
  (path: string): CreateStreaming;
}

export type ChatProtocolContext = Client & {
  path: Routes;
  chatRoute: string;
};
