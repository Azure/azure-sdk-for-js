// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  InlineFile,
  InputDataMount,
  OutputDataMount,
  InfraOverrides,
} from "../../../models/microsoft/discovery/workspace/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ToolsGetComputeUsageOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface ToolsGetOperationsOptionalParams extends OperationOptions {
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxPageSize?: number;
}
/** Optional parameters. */
export interface ToolsCancelRunOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface ToolsRunOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /**
   * Command to pass to tool container entrypoint.
   *
   * If the tool has multiple containers defined, this command is executed on all of them.
   *
   * If omitted, all containers execute their raw entrypoints.
   *
   * This command is parsed into an argument list which is passed to the underlying container runtime.
   * For example, if the command is "python /code/wrapper.py --input /inputs/abcdef-input-1/input.txt --output /outputs/abcdef-output-1",
   * then the container runtime will receive the following argument list:
   * ["python", "/code/wrapper.py", "--input", "/inputs/abcdef-input-1/input.txt", "--output", "/outputs/abcdef-output-1"]
   *
   * The container's entrypoint is not overridden. In Docker terminology, the above argument list becomes
   * the CMD, not the ENTRYPOINT of the launched container.
   *
   * Our parsing includes the following limited interpretation of special characters:
   * - The only special characters are " ' and \.
   * - Backslashes `\` escape the next character if that character is a special character, preserving its literal value.
   * - Double quotes `"` preserve everything inside them literally, with the exception of the characters " and \, which must be escaped with a backslash `\`. Unmatched quotes will throw an error.
   * - Single quotes `'` preserve everything inside them literally. A single-quote cannot occur within single-quotes. Unmatched quotes will throw an error.
   *
   * If you wish to run a command that relies on shell features such as globbing or output redirection, you either need to:
   * - use a container with an entrypoint that is a shell (e.g. `/bin/sh` or `/bin/bash`) and pass a command which is valid for that shell e.g.
   * `-c 'python /code/wrapper.py --input /inputs/abcdef-input-1/* --output /outputs/abcdef-output-1'`
   * - use a container which has a shell installed, and include the shell in the command, e.g.
   * `sh -c "python /code/wrapper.py --input /inputs/abcdef-input-1/* --output /outputs/abcdef-output-1"`
   */
  command?: string;
  /** Encoded inline files to be mounted into the container, e.g. for generated code. */
  inlineFiles?: InlineFile[];
  /** Input data references and mount paths. */
  inputData?: InputDataMount[];
  /** Output data references and mount paths. */
  outputData?: OutputDataMount[];
  /** Override the infrastructure requirements in the tool definitions. */
  infraOverrides?: InfraOverrides;
  /** Optional environment variables to set in the tool container. This must not contain any secrets. */
  environmentVariables?: {
    name: string;
    value?: string;
  }[];
}
/** Optional parameters. */
export interface ToolsGetRunStatusOptionalParams extends OperationOptions {
  /** Number of log lines to return (0-2500). */
  logCount?: number;
}
