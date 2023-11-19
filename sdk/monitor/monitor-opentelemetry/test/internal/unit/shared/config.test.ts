// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import * as path from "path";
import * as sinon from "sinon";
import * as http from "http";
import * as https from "https";

import { InternalConfig } from "../../../../src/shared";
import { JsonConfig } from "../../../../src/shared/jsonConfig";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { AzureMonitorOpenTelemetryOptions } from "../../../../src/shared/types";

describe("Library/Config", () => {
  let originalEnv: NodeJS.ProcessEnv;
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    originalEnv = process.env;
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    process.env = originalEnv;
    sandbox.restore();
    (JsonConfig["_instance"] as any) = undefined;
  });

  describe("#constructor", () => {
    it("merge JSON config", () => {
      (JsonConfig["_instance"] as any) = undefined;
      const env = <{ [id: string]: string }>{};
      const customConfigJSONPath = path.resolve(
        __dirname,
        "../../../../../test/internal/unit/shared/config.json"
      );
      env["APPLICATIONINSIGHTS_CONFIGURATION_FILE"] = customConfigJSONPath; // Load JSON config
      process.env = env;
      const config = new InternalConfig();
      assert.deepStrictEqual(
        config.azureMonitorExporterOptions.connectionString,
        "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;IngestionEndpoint=https://centralus-0.in.applicationinsights.azure.com/"
      );
      assert.deepStrictEqual(config.samplingRatio, 0.3, "Wrong samplingRatio");
      assert.deepStrictEqual(
        config.azureMonitorExporterOptions?.disableOfflineStorage,
        true,
        "Wrong disableOfflineStorage"
      );
      assert.deepStrictEqual(
        config.azureMonitorExporterOptions?.storageDirectory,
        "testPath",
        "Wrong storageDirectory"
      );
      assert.deepStrictEqual(
        config.instrumentationOptions.azureSdk?.enabled,
        true,
        "Wrong azureSdk"
      );
      assert.deepStrictEqual(config.instrumentationOptions.mongoDb?.enabled, true, "Wrong mongoDb");
      assert.deepStrictEqual(config.instrumentationOptions.mySql?.enabled, true, "Wrong mySql");
      assert.deepStrictEqual(
        config.instrumentationOptions.postgreSql?.enabled,
        true,
        "Wrong postgreSql"
      );
      assert.deepStrictEqual(config.instrumentationOptions.redis?.enabled, true, "Wrong redis");
      assert.deepStrictEqual(config.instrumentationOptions.redis4?.enabled, true, "Wrong redis4");
    });

    it("JSON config values take precedence over others", () => {
      const env = <{ [id: string]: string }>{};

      let jsonOptions = {
        azureMonitorExporterOptions: {
          connectionString: "testConnString",
          storageDirectory: "teststorageDirectory",
          disableOfflineStorage: true,
        },
        samplingRatio: 1,
        instrumentationOptions: {
          http: { enabled: true },
          azureSdk: { enabled: true },
          mongoDb: { enabled: true },
          mySql: { enabled: true },
          postgreSql: { enabled: true },
          redis: { enabled: true },
          redis4: { enabled: true },
        },
      };
      env["APPLICATIONINSIGHTS_CONFIGURATION_CONTENT"] = JSON.stringify(jsonOptions);
      process.env = env;

      let options: AzureMonitorOpenTelemetryOptions = {
        azureMonitorExporterOptions: {
          connectionString: "testConnStringOther",
          storageDirectory: "teststorageDirectoryOther",
          disableOfflineStorage: false,
        },
        samplingRatio: 0.5,
        instrumentationOptions: {
          http: { enabled: false },
          azureSdk: { enabled: false },
          mongoDb: { enabled: false },
          mySql: { enabled: false },
          postgreSql: { enabled: false },
          redis: { enabled: false },
          redis4: { enabled: false },
        },
      };

      const config = new InternalConfig(options);
      assert.strictEqual(config.samplingRatio, jsonOptions.samplingRatio);
      assert.strictEqual(
        config.instrumentationOptions?.http?.enabled,
        jsonOptions.instrumentationOptions.http.enabled
      );
      assert.strictEqual(
        config.instrumentationOptions?.azureSdk?.enabled,
        jsonOptions.instrumentationOptions.azureSdk.enabled
      );
      assert.strictEqual(
        config.instrumentationOptions?.mongoDb?.enabled,
        jsonOptions.instrumentationOptions.mongoDb.enabled
      );
      assert.strictEqual(
        config.instrumentationOptions?.mySql?.enabled,
        jsonOptions.instrumentationOptions.mySql.enabled
      );
      assert.strictEqual(
        config.instrumentationOptions?.postgreSql?.enabled,
        jsonOptions.instrumentationOptions.postgreSql.enabled
      );
      assert.strictEqual(
        config.instrumentationOptions?.redis?.enabled,
        jsonOptions.instrumentationOptions.redis.enabled
      );
      assert.strictEqual(
        config.instrumentationOptions?.redis4?.enabled,
        jsonOptions.instrumentationOptions.redis4.enabled
      );
      assert.strictEqual(
        config.azureMonitorExporterOptions?.connectionString,
        jsonOptions.azureMonitorExporterOptions.connectionString
      );
      assert.strictEqual(
        config.azureMonitorExporterOptions?.storageDirectory,
        jsonOptions.azureMonitorExporterOptions.storageDirectory
      );
      assert.strictEqual(
        config.azureMonitorExporterOptions?.disableOfflineStorage,
        jsonOptions.azureMonitorExporterOptions.disableOfflineStorage
      );
    });

    it("Default config", () => {
      const config = new InternalConfig();
      assert.deepStrictEqual(config.samplingRatio, 1, "Wrong samplingRatio");
      assert.deepStrictEqual(
        config.instrumentationOptions.azureSdk?.enabled,
        false,
        "Wrong azureSdk"
      );
      assert.deepStrictEqual(
        config.instrumentationOptions.mongoDb?.enabled,
        false,
        "Wrong mongoDb"
      );
      assert.deepStrictEqual(config.instrumentationOptions.mySql?.enabled, false, "Wrong mySql");
      assert.deepStrictEqual(
        config.instrumentationOptions.postgreSql?.enabled,
        false,
        "Wrong postgreSql"
      );
      assert.deepStrictEqual(config.instrumentationOptions.redis?.enabled, false, "Wrong redis");
      assert.deepStrictEqual(config.instrumentationOptions.redis4?.enabled, false, "Wrong redis4");
      assert.deepStrictEqual(
        config.azureMonitorExporterOptions?.disableOfflineStorage,
        undefined,
        "Wrong disableOfflineStorage"
      );
      assert.deepStrictEqual(
        config.azureMonitorExporterOptions?.storageDirectory,
        undefined,
        "Wrong storageDirectory"
      );
    });

    it("Partial configurations are supported", () => {
      const env = <{ [id: string]: string }>{};

      let jsonOptions = {
        azureMonitorExporterOptions: {
          storageDirectory: "teststorageDirectory",
        },
        samplingRatio: 0.7,
        instrumentationOptions: {
          redis4: { enabled: true },
        },
      };
      env["APPLICATIONINSIGHTS_CONFIGURATION_CONTENT"] = JSON.stringify(jsonOptions);
      process.env = env;

      let options: AzureMonitorOpenTelemetryOptions = {
        azureMonitorExporterOptions: {
          connectionString: "testConnectionString",
        },
        instrumentationOptions: {
          http: { enabled: false },
        },
      };

      const config = new InternalConfig(options);
      assert.deepStrictEqual(config.samplingRatio, 0.7, "Wrong samplingRatio");
      assert.deepStrictEqual(
        config.azureMonitorExporterOptions?.storageDirectory,
        "teststorageDirectory",
        "Wrong storageDirectory"
      );
      assert.deepStrictEqual(
        config.azureMonitorExporterOptions?.connectionString,
        "testConnectionString",
        "Wrong connectionString"
      );
      assert.deepStrictEqual(config.instrumentationOptions.http?.enabled, false, "Wrong http");
      assert.deepStrictEqual(config.instrumentationOptions.redis4?.enabled, true, "Wrong redis4");

      // Default values
      assert.deepStrictEqual(
        config.instrumentationOptions.azureSdk?.enabled,
        false,
        "Wrong azureSdk"
      );
      assert.deepStrictEqual(
        config.instrumentationOptions.mongoDb?.enabled,
        false,
        "Wrong mongoDb"
      );
      assert.deepStrictEqual(config.instrumentationOptions.mySql?.enabled, false, "Wrong mySql");
      assert.deepStrictEqual(
        config.instrumentationOptions.postgreSql?.enabled,
        false,
        "Wrong postgreSql"
      );
      assert.deepStrictEqual(config.instrumentationOptions.redis?.enabled, false, "Wrong redis");
    });
  });

  describe("constructor", () => {
    beforeEach(() => {
      sandbox.stub(http, "request");
      sandbox.stub(https, "request");
    });

    it("should initialize valid values", () => {
      const config = new InternalConfig();
      config.azureMonitorExporterOptions.connectionString =
        "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333";
      assert.ok(typeof config.azureMonitorExporterOptions?.connectionString === "string");
      assert.ok(typeof config.samplingRatio === "number");
    });

    it("instrumentation key validation-valid key passed", () => {
      const warnStub = sandbox.stub(console, "warn");
      const config = new InternalConfig();
      config.azureMonitorExporterOptions.connectionString =
        "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333";
      assert.ok(warnStub.notCalled, "warning was not raised");
    });

    it("instrumentation key validation-invalid key passed", () => {
      const warnStub = sandbox.stub(console, "warn");
      const config = new InternalConfig();
      config.azureMonitorExporterOptions.connectionString =
        "InstrumentationKey=1aa11111bbbb1ccc8dddeeeeffff3333";
      assert.ok(warnStub.calledOn, "warning was raised");
    });

    it("instrumentation key validation-invalid key passed", () => {
      const warnStub = sandbox.stub(console, "warn");
      const config = new InternalConfig();
      config.azureMonitorExporterOptions.connectionString = "abc";
      assert.ok(warnStub.calledOn, "warning was raised");
    });
  });
});

describe("OpenTelemetry Resource", () => {
  it("should allow custom resource to be configured", () => {
    let customAttributes: any = {};
    customAttributes[SemanticResourceAttributes.SERVICE_NAME] = "testServiceName";
    customAttributes[SemanticResourceAttributes.SERVICE_INSTANCE_ID] = "testServiceInstanceId";
    customAttributes[SemanticResourceAttributes.CONTAINER_ID] = "testContainerId";
    let customResource = new Resource(customAttributes);
    const config = new InternalConfig();
    config.resource = customResource;
    assert.deepStrictEqual(
      config.resource.attributes[SemanticResourceAttributes.SERVICE_NAME],
      "testServiceName"
    );
    assert.deepStrictEqual(
      config.resource.attributes[SemanticResourceAttributes.SERVICE_INSTANCE_ID],
      "testServiceInstanceId"
    );
    assert.deepStrictEqual(
      config.resource.attributes[SemanticResourceAttributes.CONTAINER_ID],
      "testContainerId"
    );
  });

  it("Default values", () => {
    const config = new InternalConfig();
    assert.deepStrictEqual(
      config.resource.attributes[SemanticResourceAttributes.TELEMETRY_SDK_NAME],
      "opentelemetry"
    );
    assert.ok(
      String(config.resource.attributes[SemanticResourceAttributes.SERVICE_NAME]).startsWith(
        "unknown_service:"
      ),
      "Wrong SERVICE_NAME"
    );
    assert.ok(
      String(config.resource.attributes[SemanticResourceAttributes.TELEMETRY_SDK_VERSION]).length >
        0,
      "Wrong TELEMETRY_SDK_VERSION"
    );
    assert.deepStrictEqual(
      config.resource.attributes[SemanticResourceAttributes.SERVICE_INSTANCE_ID],
      undefined
    );
  });

  it("Azure App Service resource attributes", () => {
    const env = <{ [id: string]: string }>{};
    const originalEnv = process.env;
    env.WEBSITE_SITE_NAME = 'test-site';
    env.REGION_NAME = 'test-region';
    env.WEBSITE_SLOT_NAME = 'test-slot';
    env.WEBSITE_HOSTNAME = 'test-hostname';
    env.WEBSITE_INSTANCE_ID = 'test-instance-id';
    env.WEBSITE_HOME_STAMPNAME = 'test-home-stamp';
    env.WEBSITE_OWNER_NAME = 'test-owner-name';
    process.env = env;
    const config = new InternalConfig();
    process.env = originalEnv;
    assert.deepStrictEqual(config.resource.attributes[SemanticResourceAttributes.TELEMETRY_SDK_NAME], "opentelemetry");
    assert.deepStrictEqual(config.resource.attributes[SemanticResourceAttributes.SERVICE_NAME], "test-site");
    assert.deepStrictEqual(config.resource.attributes[SemanticResourceAttributes.SERVICE_INSTANCE_ID], "test-instance-id");
    assert.strictEqual(config.resource.attributes[SemanticResourceAttributes.CLOUD_PROVIDER], "azure");
    assert.strictEqual(config.resource.attributes[SemanticResourceAttributes.CLOUD_REGION], "test-region");
    assert.strictEqual(config.resource.attributes[SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT], "test-slot");
    assert.strictEqual(config.resource.attributes[SemanticResourceAttributes.HOST_ID], "test-hostname");
    assert.strictEqual(config.resource.attributes["azure.app.service.stamp"], "test-home-stamp");
  });

  it("OTEL_RESOURCE_ATTRIBUTES", () => {
    const env = <{ [id: string]: string }>{};
    const originalEnv = process.env;
    env.OTEL_RESOURCE_ATTRIBUTES =
      "service.name=testServiceName,service.instance.id=testServiceInstance,k8s.cluster.name=testClusterName,k8s.node.name=testNodeName";
    process.env = env;
    const config = new InternalConfig();
    process.env = originalEnv;
    assert.deepStrictEqual(
      config.resource.attributes[SemanticResourceAttributes.SERVICE_NAME],
      "testServiceName"
    );
    assert.deepStrictEqual(
      config.resource.attributes[SemanticResourceAttributes.SERVICE_INSTANCE_ID],
      "testServiceInstance"
    );
    assert.deepStrictEqual(
      config.resource.attributes[SemanticResourceAttributes.K8S_CLUSTER_NAME],
      "testClusterName"
    );
    assert.deepStrictEqual(
      config.resource.attributes[SemanticResourceAttributes.K8S_NODE_NAME],
      "testNodeName"
    );
  });
});
