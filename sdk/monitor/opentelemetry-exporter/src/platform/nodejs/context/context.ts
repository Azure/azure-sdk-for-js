import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import { Logger } from "@opentelemetry/api";
import { ConsoleLogger, LogLevel, SDK_INFO } from "@opentelemetry/core";

import * as Contracts from "../../../Declarations/Contracts";

type PackageJson = { version: string };

let instance: Context | null = null;

export class Context {
  public keys: Contracts.ContextTagKeys;

  public tags: { [key: string]: string };

  public static DefaultRoleName: string = "Node.js";

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
    private _logger: Logger = new ConsoleLogger(LogLevel.WARN),
    /**
     * Path to this module's `package.json` relative to
     * `Context.ROOT_PATH`
     */
    private _exporterPrefix = "./",
    /**
     * Path to end user application folder which contains `package.json`
     * relative to `Context.ROOT_PATH`
     * @default `../../`
     */
    private _appPrefix = "../../../",
  ) {
    this.keys = new Contracts.ContextTagKeys();
    this.tags = <{ [key: string]: string }>{};

    this._loadApplicationContext();
    this._loadDeviceContext();
    this._loadInternalContext();
  }

  private _loadApplicationContext() {
    if (Object.keys(Context.appVersion).length === 0) {
      // note: this should return the host package.json
      let packageJson: PackageJson | null = null;
      const packageJsonPath = path.resolve(
        __dirname,
        Context.JS_NODE_PREFIX,
        this._appPrefix,
        Context.ROOT_PATH,
        "./package.json",
      );
      const packageJsonPathTsNode = path.resolve(
        __dirname,
        this._appPrefix,
        Context.ROOT_PATH,
        "./package.json",
      );

      Context.appVersion[packageJsonPath] = "unknown";

      try {
        packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8")) as PackageJson;
      } catch (_) {
        try {
          packageJson = JSON.parse(fs.readFileSync(packageJsonPathTsNode, "utf8")) as PackageJson;
        } catch (exception) {
          this._logger.warn("Failed to load Application version", exception);
        }
      }

      if (packageJson && typeof packageJson.version === "string") {
        Context.appVersion[packageJsonPath] = packageJson.version;
      }

      this.tags[this.keys.applicationVersion] = Context.appVersion[packageJsonPath];
    }
  }

  private _loadDeviceContext() {
    this.tags[this.keys.deviceId] = "";
    this.tags[this.keys.cloudRoleInstance] = os && os.hostname();
    this.tags[this.keys.deviceOSVersion] = os && `${os.type()} ${os.release()}`;
    this.tags[this.keys.cloudRole] = Context.DefaultRoleName;

    // not yet supported tags
    this.tags["ai.device.osArchitecture"] = os && os.arch();
    this.tags["ai.device.osPlatform"] = os && os.platform();
  }

  private _loadInternalContext() {
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
        "./package.json",
      );
      const packageJsonPathTsNode = path.resolve(
        __dirname,
        this._exporterPrefix,
        Context.ROOT_PATH,
        "./package.json",
      );

      Context.sdkVersion = "unknown";
      try {
        packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8")) as PackageJson;
      } catch (_) {
        try {
          packageJson = JSON.parse(fs.readFileSync(packageJsonPathTsNode, "utf8")) as PackageJson;
        } catch (exception) {
          this._logger.warn("Failed to load Exporter version", exception);
          throw exception;
        }
      }

      if (packageJson && typeof packageJson.version === "string") {
        Context.sdkVersion = packageJson.version;
      }
    }

    this.tags[
      this.keys.internalSdkVersion
    ] = `node${Context.nodeVersion}:ot${SDK_INFO.VERSION}:ext${Context.sdkVersion}`;
  }
}

export function getInstance(logger?: Logger, exporterPrefix?: string, appPrefix?: string): Context {
  if (!instance) {
    instance = new Context(logger, exporterPrefix, appPrefix);
  }
  return instance;
}
