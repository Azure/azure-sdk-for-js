// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as os from "os";
import { SDK_INFO } from "@opentelemetry/core";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";

import { KnownContextTagKeys } from "../../../generated";
import * as ai from "../../../utils/constants/applicationinsights";
import { Tags } from "../../../types";

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
    Context.opentelemetryVersion = SDK_INFO[SemanticResourceAttributes.TELEMETRY_SDK_VERSION];
    Context.sdkVersion = ai.packageVersion;
    this.tags[
      KnownContextTagKeys.AiInternalSdkVersion
    ] = `node${Context.nodeVersion}:otel${Context.opentelemetryVersion}:ext${Context.sdkVersion}`;
  }
}

/**
 * Singleton Context instance.
 * @internal
 */
export function getInstance(): Context {
  if (!instance) {
    instance = new Context();
  }
  return instance;
}
