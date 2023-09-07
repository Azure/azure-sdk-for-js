// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import * as sinon from "sinon";
import * as fs from "fs";
import * as path from "path";
import { JsonConfig } from "../../../../src/shared/jsonConfig";

describe("Json Config", () => {
  let sandbox: sinon.SinonSandbox;
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = process.env;
    sandbox = sinon.createSandbox();
    (JsonConfig["_instance"] as any) = undefined;
  });

  afterEach(() => {
    process.env = originalEnv;
    sandbox.restore();
  });

  after(() => {
    (JsonConfig["_instance"] as any) = undefined;
  });

  describe("config path", () => {
    it("Default file path", () => {
      const fileSpy = sandbox.spy(fs, "readFileSync");
      const config = JsonConfig.getInstance();
      config["_loadJsonFile"]();
      assert.ok(fileSpy.called);
      const defaultPath = path.resolve(process.cwd(), "applicationinsights.json");
      assert.deepStrictEqual(fileSpy.args[0][0], defaultPath);
    });

    it("Absolute file path", () => {
      const env = <{ [id: string]: string }>{};
      const customConfigJSONPath = path.resolve(
        __dirname,
        "../../../../../test/internal/unit/shared/config.json"
      );
      env["APPLICATIONINSIGHTS_CONFIGURATION_FILE"] = customConfigJSONPath;
      process.env = env;
      const config = JsonConfig.getInstance();
      assert.deepStrictEqual(
        config.azureMonitorExporterConfig?.connectionString,
        "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;IngestionEndpoint=https://centralus-0.in.applicationinsights.azure.com/"
      );
    });

    it("Relative file path", () => {
      const env = <{ [id: string]: string }>{};
      const customConfigJSONPath = "./test/internal/unit/shared/config.json";
      env["APPLICATIONINSIGHTS_CONFIGURATION_FILE"] = customConfigJSONPath;
      process.env = env;
      const config = JsonConfig.getInstance();
      assert.deepStrictEqual(
        config.azureMonitorExporterConfig?.connectionString,
        "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;IngestionEndpoint=https://centralus-0.in.applicationinsights.azure.com/"
      );
    });
  });

  describe("configuration values", () => {
    it("Should take configurations from JSON config file", () => {
      const env = <{ [id: string]: string }>{};
      const customConfigJSONPath = path.resolve(
        __dirname,
        "../../../../../test/internal/unit/shared/config.json"
      );
      env["APPLICATIONINSIGHTS_CONFIGURATION_FILE"] = customConfigJSONPath;
      process.env = env;
      const config = JsonConfig.getInstance();
      assert.deepStrictEqual(
        config.azureMonitorExporterConfig?.connectionString,
        "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;IngestionEndpoint=https://centralus-0.in.applicationinsights.azure.com/"
      );
      assert.deepStrictEqual(config.azureMonitorExporterConfig?.disableOfflineStorage, true);
      assert.deepStrictEqual(config.azureMonitorExporterConfig?.storageDirectory, "testPath");
      assert.deepStrictEqual(config.samplingRatio, 0.3, "Wrong samplingRatio");
      assert.deepStrictEqual(
        config.instrumentationOptions?.azureSdk?.enabled,
        true,
        "Wrong azureSdk"
      );
      assert.deepStrictEqual(
        config.instrumentationOptions?.mongoDb?.enabled,
        true,
        "Wrong mongoDb"
      );
      assert.deepStrictEqual(config.instrumentationOptions?.mySql?.enabled, true, "Wrong mySql");
      assert.deepStrictEqual(
        config.instrumentationOptions?.postgreSql?.enabled,
        true,
        "Wrong postgreSql"
      );
      assert.deepStrictEqual(config.instrumentationOptions?.redis?.enabled, true, "Wrong redis");
      assert.deepStrictEqual(config.instrumentationOptions?.redis4?.enabled, true, "Wrong redis4");
    });

    it("Should take configurations from JSON config file over environment variables if both are configured", () => {
      const env = <{ [id: string]: string }>{};
      const customConfigJSONPath = path.resolve(
        __dirname,
        "../../../../../test/internal/unit/shared/config.json"
      );
      env["APPLICATIONINSIGHTS_CONFIGURATION_FILE"] = customConfigJSONPath;
      env["APPLICATIONINSIGHTS_CONNECTION_STRING"] = "TestConnectionString";
      process.env = env;
      const config = JsonConfig.getInstance();
      assert.deepStrictEqual(
        config.azureMonitorExporterConfig?.connectionString,
        "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;IngestionEndpoint=https://centralus-0.in.applicationinsights.azure.com/"
      );
    });
  });
});
