// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import { diag } from "@opentelemetry/api";
import { SDK_INFO } from "@opentelemetry/core";

import { KnownContextTagKeys } from "../../../generated";
import { Tags } from "../../../types";

type PackageJson = { version: string };

let instance: Context | null = null;

/**
 * Azure Telemetry context.
 * @internal
 */
export class Context {
  public tags: Tags;

  public static appVersion: { [path: string]: string } = {};

  public static sdkVersion: string | null = null;

  public static opentelemetryVersion: string | null = null;

  public static nodeVersion: string = "";

  /**
   * Add extra ../ to access on environments not using ts-node
   */
  private static readonly JS_NODE_PREFIX = "../";

  /**
   * Path to azure-opentelemetry-exporter
   */
  private static readonly ROOT_PATH = "../../../../";

  constructor(
    /**
     * Path to this module's `package.json` relative to
     * `Context.ROOT_PATH`
     */
    private _exporterPrefix = "./",
    /**
     * Path to end user application folder which contains `package.json`
     * relative to `Context.ROOT_PATH`
     */
    private _appPrefix = "../../../"
  ) {
    this.tags = {};

    this._loadApplicationContext();
    this._loadDeviceContext();
    this._loadInternalContext();
  }

  private _loadApplicationContext(): void {
    if (Object.keys(Context.appVersion).length === 0) {
      // note: this should return the host package.json
      let packageJson: PackageJson | null = null;
      const packageJsonPath = path.resolve(
        __dirname,
        Context.JS_NODE_PREFIX,
        this._appPrefix,
        Context.ROOT_PATH,
        "./package.json"
      );
      const packageJsonPathTsNode = path.resolve(
        __dirname,
        this._appPrefix,
        Context.ROOT_PATH,
        "./package.json"
      );

      Context.appVersion[packageJsonPath] = "unknown";

      try {
        packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8")) as PackageJson;
      } catch (_) {
        try {
          packageJson = JSON.parse(fs.readFileSync(packageJsonPathTsNode, "utf8")) as PackageJson;
        } catch (exception) {
          diag.warn("Failed to load Application version", exception);
        }
      }

      if (packageJson && typeof packageJson.version === "string") {
        Context.appVersion[packageJsonPath] = packageJson.version;
      }

      this.tags[KnownContextTagKeys.AiApplicationVer] = Context.appVersion[packageJsonPath];
    }
  }

  private _loadDeviceContext(): void {
    this.tags[KnownContextTagKeys.AiDeviceId] = "";
    this.tags[KnownContextTagKeys.AiDeviceOsVersion] = os && `${os.type()} ${os.release()}`;
  }

  private _loadInternalContext(): void {
    if (!Context.sdkVersion) {
      let packageJson: { version: string } | null = null;
      const { node } = process.versions;
      [Context.nodeVersion] = node.split(".");

      // note: this should return the sdk package.json
      const packageJsonPath = path.resolve(
        __dirname,
        Context.JS_NODE_PREFIX,
        this._exporterPrefix,
        Context.ROOT_PATH,
        "./package.json"
      );
      const packageJsonPathTsNode = path.resolve(
        __dirname,
        this._exporterPrefix,
        Context.ROOT_PATH,
        "./package.json"
      );

      Context.sdkVersion = "unknown";
      try {
        packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8")) as PackageJson;
      } catch (_) {
        try {
          packageJson = JSON.parse(fs.readFileSync(packageJsonPathTsNode, "utf8")) as PackageJson;
        } catch (exception) {
          diag.warn("Failed to load Exporter version", exception);
          throw exception;
        }
      }

      if (packageJson && typeof packageJson.version === "string") {
        Context.sdkVersion = packageJson.version;
      }
    }

    this.tags[
      KnownContextTagKeys.AiInternalSdkVersion
    ] = `node${Context.nodeVersion}:otel${SDK_INFO.VERSION}:ext${Context.sdkVersion}`;
  }
}

/**
 * Singleton Context instance.
 * @internal
 */
export function getInstance(exporterPrefix?: string, appPrefix?: string): Context {
  if (!instance) {
    instance = new Context(exporterPrefix, appPrefix);
  }
  return instance;
}
