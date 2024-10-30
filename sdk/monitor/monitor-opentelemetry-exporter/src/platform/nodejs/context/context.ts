// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as os from "node:os";
import { SDK_INFO } from "@opentelemetry/core";
import { ATTR_TELEMETRY_SDK_VERSION } from "@opentelemetry/semantic-conventions";
import { KnownContextTagKeys } from "../../../generated/index.js";
import * as ai from "../../../utils/constants/applicationinsights.js";
import type { Tags } from "../../../types.js";

let instance: Context | null = null;

/**
 * Azure Telemetry context.
 * @internal
 */
export class Context {
  public tags: Tags;

  public static sdkVersion: string | null = null;

  public static opentelemetryVersion: string | null = null;

  public static nodeVersion: string = "";

  constructor() {
    this.tags = {};
    this._loadDeviceContext();
    this._loadInternalContext();
  }

  private _loadDeviceContext(): void {
    this.tags[KnownContextTagKeys.AiDeviceOsVersion] = os && `${os.type()} ${os.release()}`;
  }

  private _loadInternalContext(): void {
    const { node } = process.versions;
    [Context.nodeVersion] = node.split(".");
    Context.opentelemetryVersion = SDK_INFO[ATTR_TELEMETRY_SDK_VERSION];
    Context.sdkVersion = ai.packageVersion;

    const prefix = process.env["AZURE_MONITOR_PREFIX"] ? process.env["AZURE_MONITOR_PREFIX"] : "";
    const version = process.env["AZURE_MONITOR_DISTRO_VERSION"]
      ? `ext${process.env["AZURE_MONITOR_DISTRO_VERSION"]}`
      : `ext${Context.sdkVersion}`;
    const internalSdkVersion = `${prefix}node${Context.nodeVersion}:otel${Context.opentelemetryVersion}:${version}`;
    this.tags[KnownContextTagKeys.AiInternalSdkVersion] = internalSdkVersion;
  }
}

/**
 * Singleton Context instance
 * @internal
 */
export function getInstance(): Context {
  if (!instance) {
    instance = new Context();
  }
  return instance;
}
