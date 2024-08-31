// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/*
import * as assert from "assert";
import * as path from "path";
import * as sinon from "sinon";
import nock from "nock";

import { InternalConfig } from "../../../../src/shared";
import { JsonConfig } from "../../../../src/shared/jsonConfig";
import { Resource } from "@opentelemetry/resources";
import {
  CloudPlatformValues,
  SemanticResourceAttributes,
} from "@opentelemetry/semantic-conventions";
import { AzureMonitorOpenTelemetryOptions } from "../../../../src/types";

const vmTestResponse = {
  additionalCapabilities: {
    hibernationEnabled: "false",
  },
  azEnvironment: "AzurePublicCloud",
  customData: "",
  evictionPolicy: "",
  extendedLocation: {
    name: "",
    type: "",
  },
  host: {
    id: "",
  },
  hostGroup: {
    id: "",
  },
  isHostCompatibilityLayerVm: "true",
  licenseType: "Windows_Client",
  location: "westus",
  name: "examplevmname",
  offer: "WindowsServer",
  osProfile: {
    adminUsername: "azureuser",
    computerName: "examplevmname",
    disablePasswordAuthentication: "true",
  },
  osType: "Windows",
  placementGroupId: "",
  plan: {
    name: "",
    product: "",
    publisher: "",
  },
  platformFaultDomain: "0",
  platformSubFaultDomain: "",
  platformUpdateDomain: "0",
  priority: "",
  provider: "Microsoft.Compute",
  publicKeys: [
    {
      keyData: "ssh-rsa 0",
      path: "/home/user/.ssh/authorized_keys0",
    },
    {
      keyData: "ssh-rsa 1",
      path: "/home/user/.ssh/authorized_keys1",
    },
  ],
  publisher: "RDFE-Test-Microsoft-Windows-Server-Group",
  resourceGroupName: "macikgo-test-may-23",
  resourceId:
    "/subscriptions/xxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx/resourceGroups/macikgo-test-may-23/providers/Microsoft.Compute/virtualMachines/examplevmname",
  securityProfile: {
    encryptionAtHost: "false",
    secureBootEnabled: "true",
    securityType: "TrustedLaunch",
    virtualTpmEnabled: "true",
  },
  sku: "2019-Datacenter",
  storageProfile: {
    dataDisks: [
      {
        bytesPerSecondThrottle: "979202048",
        caching: "None",
        createOption: "Empty",
        diskCapacityBytes: "274877906944",
        diskSizeGB: "1024",
        image: {
          uri: "",
        },
        isSharedDisk: "false",
        isUltraDisk: "true",
        lun: "0",
        managedDisk: {
          id: "/subscriptions/xxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx/resourceGroups/macikgo-test-may-23/providers/Microsoft.Compute/disks/exampledatadiskname",
          storageAccountType: "StandardSSD_LRS",
        },
        name: "exampledatadiskname",
        opsPerSecondThrottle: "65280",
        vhd: {
          uri: "",
        },
        writeAcceleratorEnabled: "false",
      },
    ],
    imageReference: {
      id: "",
      offer: "WindowsServer",
      publisher: "MicrosoftWindowsServer",
      sku: "2019-Datacenter",
      version: "latest",
    },
    osDisk: {
      caching: "ReadWrite",
      createOption: "FromImage",
      diffDiskSettings: {
        option: "",
      },
      diskSizeGB: "30",
      encryptionSettings: {
        enabled: "false",
        diskEncryptionKey: {
          sourceVault: {
            id: "/subscriptions/test-source-guid/resourceGroups/testrg/providers/Microsoft.KeyVault/vaults/test-kv",
          },
          secretUrl:
            "https://test-disk.vault.azure.net/secrets/xxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx/xxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx",
        },
        keyEncryptionKey: {
          sourceVault: {
            id: "/subscriptions/test-key-guid/resourceGroups/testrg/providers/Microsoft.KeyVault/vaults/test-kv",
          },
          keyUrl:
            "https://test-key.vault.azure.net/secrets/xxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx/xxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx",
        },
      },
      image: {
        uri: "",
      },
      managedDisk: {
        id: "/subscriptions/xxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx/resourceGroups/macikgo-test-may-23/providers/Microsoft.Compute/disks/exampleosdiskname",
        storageAccountType: "StandardSSD_LRS",
      },
      name: "exampledatadiskname",
      osType: "Windows",
      vhd: {
        uri: "",
      },
      writeAcceleratorEnabled: "false",
    },
    resourceDisk: {
      size: "16384",
    },
  },
  subscriptionId: "xxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx",
  tags: "azsecpack:nonprod;platformsettings.host_environment.service.platform_optedin_for_rootcerts:true",
  userData: "Zm9vYmFy",
  tagsList: [
    {
      name: "azsecpack",
      value: "nonprod",
    },
    {
      name: "platformsettings.host_environment.service.platform_optedin_for_rootcerts",
      value: "true",
    },
  ],
  version: "20.04.202307240",
  virtualMachineScaleSet: {
    id: "/subscriptions/xxxxxxxx-xxxxx-xxx-xxx-xxxx/resourceGroups/resource-group-name/providers/Microsoft.Compute/virtualMachineScaleSets/virtual-machine-scale-set-name",
  },
  vmId: "02aab8a4-74ef-476e-8182-f6d2ba4166a6",
  vmScaleSetName: "crpteste9vflji9",
  vmSize: "Standard_A3",
  zone: "1",
};

const testAttributes: any = {
  "azure.vm.scaleset.name": "crpteste9vflji9",
  "azure.vm.sku": "2019-Datacenter",
  "cloud.platform": "azure_vm",
  "cloud.provider": "azure",
  "cloud.region": "westus",
  "cloud.resource_id":
    "/subscriptions/xxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx/resourceGroups/macikgo-test-may-23/providers/Microsoft.Compute/virtualMachines/examplevmname",
  "host.id": "02aab8a4-74ef-476e-8182-f6d2ba4166a6",
  "host.name": "examplevmname",
  "host.type": "Standard_A3",
  "os.type": "Windows",
  "os.version": "20.04.202307240",
  "service.instance.id": "02aab8a4-74ef-476e-8182-f6d2ba4166a6",
  "service.name": "unknown_service:node",
  "telemetry.sdk.language": "nodejs",
  "telemetry.sdk.name": "opentelemetry",
  "telemetry.sdk.version": "1.25.1",
};

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
      const customConfigJSONPath = path.resolve(__dirname, "config.json");
      env["APPLICATIONINSIGHTS_CONFIGURATION_FILE"] = customConfigJSONPath; // Load JSON config
      process.env = env;
      const config = new InternalConfig();
      assert.deepStrictEqual(
        config.azureMonitorExporterOptions.connectionString,
        "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;IngestionEndpoint=https://centralus-0.in.applicationinsights.azure.com/",
      );
      assert.deepStrictEqual(config.samplingRatio, 0.3, "Wrong samplingRatio");
      assert.deepStrictEqual(
        config.azureMonitorExporterOptions?.disableOfflineStorage,
        true,
        "Wrong disableOfflineStorage",
      );
      assert.deepStrictEqual(
        config.azureMonitorExporterOptions?.storageDirectory,
        "testPath",
        "Wrong storageDirectory",
      );
      assert.deepStrictEqual(
        config.instrumentationOptions.azureSdk?.enabled,
        true,
        "Wrong azureSdk",
      );
      assert.deepStrictEqual(config.instrumentationOptions.mongoDb?.enabled, true, "Wrong mongoDb");
      assert.deepStrictEqual(config.instrumentationOptions.mySql?.enabled, true, "Wrong mySql");
      assert.deepStrictEqual(
        config.instrumentationOptions.postgreSql?.enabled,
        true,
        "Wrong postgreSql",
      );
      assert.deepStrictEqual(config.instrumentationOptions.redis?.enabled, true, "Wrong redis");
      assert.deepStrictEqual(config.instrumentationOptions.redis4?.enabled, true, "Wrong redis4");
    });

    it("JSON config values take precedence over others", () => {
      const env = <{ [id: string]: string }>{};

      const jsonOptions = {
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

      const options: AzureMonitorOpenTelemetryOptions = {
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
        jsonOptions.instrumentationOptions.http.enabled,
      );
      assert.strictEqual(
        config.instrumentationOptions?.azureSdk?.enabled,
        jsonOptions.instrumentationOptions.azureSdk.enabled,
      );
      assert.strictEqual(
        config.instrumentationOptions?.mongoDb?.enabled,
        jsonOptions.instrumentationOptions.mongoDb.enabled,
      );
      assert.strictEqual(
        config.instrumentationOptions?.mySql?.enabled,
        jsonOptions.instrumentationOptions.mySql.enabled,
      );
      assert.strictEqual(
        config.instrumentationOptions?.postgreSql?.enabled,
        jsonOptions.instrumentationOptions.postgreSql.enabled,
      );
      assert.strictEqual(
        config.instrumentationOptions?.redis?.enabled,
        jsonOptions.instrumentationOptions.redis.enabled,
      );
      assert.strictEqual(
        config.instrumentationOptions?.redis4?.enabled,
        jsonOptions.instrumentationOptions.redis4.enabled,
      );
      assert.strictEqual(
        config.azureMonitorExporterOptions?.connectionString,
        jsonOptions.azureMonitorExporterOptions.connectionString,
      );
      assert.strictEqual(
        config.azureMonitorExporterOptions?.storageDirectory,
        jsonOptions.azureMonitorExporterOptions.storageDirectory,
      );
      assert.strictEqual(
        config.azureMonitorExporterOptions?.disableOfflineStorage,
        jsonOptions.azureMonitorExporterOptions.disableOfflineStorage,
      );
    });

    it("Default config", () => {
      const config = new InternalConfig();
      assert.deepStrictEqual(config.samplingRatio, 1, "Wrong samplingRatio");
      assert.deepStrictEqual(
        config.instrumentationOptions.azureSdk?.enabled,
        false,
        "Wrong azureSdk",
      );
      assert.deepStrictEqual(
        config.instrumentationOptions.mongoDb?.enabled,
        false,
        "Wrong mongoDb",
      );
      assert.deepStrictEqual(config.instrumentationOptions.mySql?.enabled, false, "Wrong mySql");
      assert.deepStrictEqual(
        config.instrumentationOptions.postgreSql?.enabled,
        false,
        "Wrong postgreSql",
      );
      assert.deepStrictEqual(config.instrumentationOptions.redis?.enabled, false, "Wrong redis");
      assert.deepStrictEqual(config.instrumentationOptions.redis4?.enabled, false, "Wrong redis4");
      assert.deepStrictEqual(
        config.azureMonitorExporterOptions?.disableOfflineStorage,
        undefined,
        "Wrong disableOfflineStorage",
      );
      assert.deepStrictEqual(
        config.azureMonitorExporterOptions?.storageDirectory,
        undefined,
        "Wrong storageDirectory",
      );
    });

    it("Partial configurations are supported", () => {
      const env = <{ [id: string]: string }>{};

      const jsonOptions = {
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

      const options: AzureMonitorOpenTelemetryOptions = {
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
        "Wrong storageDirectory",
      );
      assert.deepStrictEqual(
        config.azureMonitorExporterOptions?.connectionString,
        "testConnectionString",
        "Wrong connectionString",
      );
      assert.deepStrictEqual(config.instrumentationOptions.http?.enabled, false, "Wrong http");
      assert.deepStrictEqual(config.instrumentationOptions.redis4?.enabled, true, "Wrong redis4");

      // Default values
      assert.deepStrictEqual(
        config.instrumentationOptions.azureSdk?.enabled,
        false,
        "Wrong azureSdk",
      );
      assert.deepStrictEqual(
        config.instrumentationOptions.mongoDb?.enabled,
        false,
        "Wrong mongoDb",
      );
      assert.deepStrictEqual(config.instrumentationOptions.mySql?.enabled, false, "Wrong mySql");
      assert.deepStrictEqual(
        config.instrumentationOptions.postgreSql?.enabled,
        false,
        "Wrong postgreSql",
      );
      assert.deepStrictEqual(config.instrumentationOptions.redis?.enabled, false, "Wrong redis");
    });
  });

  describe("constructor", () => {
    it("should initialize valid values", () => {
      const config = new InternalConfig();
      config.azureMonitorExporterOptions.connectionString =
        "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333";
      assert.ok(typeof config.azureMonitorExporterOptions?.connectionString === "string");
      assert.ok(typeof config.samplingRatio === "number");
    });

    it("should accept zero sampling ratio", () => {
      const config = new InternalConfig();
      config.samplingRatio = 0;
      assert.strictEqual(config.samplingRatio, 0);
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
  beforeEach(() => {
    nock.disableNetConnect();
    nock.cleanAll();
  });

  afterEach(() => {
    nock.enableNetConnect();
  });

  it("should allow custom resource to be configured", () => {
    const customAttributes: any = {};
    customAttributes[SemanticResourceAttributes.SERVICE_NAME] = "testServiceName";
    customAttributes[SemanticResourceAttributes.SERVICE_INSTANCE_ID] = "testServiceInstanceId";
    customAttributes[SemanticResourceAttributes.CONTAINER_ID] = "testContainerId";
    const customResource = new Resource(customAttributes);
    const config = new InternalConfig();
    config.resource = customResource;
    assert.deepStrictEqual(
      config.resource.attributes[SemanticResourceAttributes.SERVICE_NAME],
      "testServiceName",
    );
    assert.deepStrictEqual(
      config.resource.attributes[SemanticResourceAttributes.SERVICE_INSTANCE_ID],
      "testServiceInstanceId",
    );
    assert.deepStrictEqual(
      config.resource.attributes[SemanticResourceAttributes.CONTAINER_ID],
      "testContainerId",
    );
  });

  it("Default values", () => {
    const config = new InternalConfig();
    assert.deepStrictEqual(
      config.resource.attributes[SemanticResourceAttributes.TELEMETRY_SDK_NAME],
      "opentelemetry",
    );
    assert.ok(
      String(config.resource.attributes[SemanticResourceAttributes.SERVICE_NAME]).startsWith(
        "unknown_service:",
      ),
      "Wrong SERVICE_NAME",
    );
    assert.ok(
      String(config.resource.attributes[SemanticResourceAttributes.TELEMETRY_SDK_VERSION]).length >
        0,
      "Wrong TELEMETRY_SDK_VERSION",
    );
    assert.deepStrictEqual(
      config.resource.attributes[SemanticResourceAttributes.SERVICE_INSTANCE_ID],
      undefined,
    );
  });

  it("Azure App Service resource attributes", () => {
    const env = <{ [id: string]: string }>{};
    const originalEnv = process.env;
    env.WEBSITE_SITE_NAME = "test-site";
    env.REGION_NAME = "test-region";
    env.WEBSITE_SLOT_NAME = "test-slot";
    env.WEBSITE_HOSTNAME = "test-hostname";
    env.WEBSITE_INSTANCE_ID = "test-instance-id";
    env.WEBSITE_HOME_STAMPNAME = "test-home-stamp";
    env.WEBSITE_OWNER_NAME = "test-owner-name";
    process.env = env;
    const config = new InternalConfig();
    process.env = originalEnv;
    assert.deepStrictEqual(
      config.resource.attributes[SemanticResourceAttributes.TELEMETRY_SDK_NAME],
      "opentelemetry",
    );
    assert.deepStrictEqual(
      config.resource.attributes[SemanticResourceAttributes.SERVICE_NAME],
      "test-site",
    );
    assert.deepStrictEqual(
      config.resource.attributes[SemanticResourceAttributes.SERVICE_INSTANCE_ID],
      "test-instance-id",
    );
    assert.strictEqual(
      config.resource.attributes[SemanticResourceAttributes.CLOUD_PROVIDER],
      "azure",
    );
    assert.strictEqual(
      config.resource.attributes[SemanticResourceAttributes.CLOUD_REGION],
      "test-region",
    );
    assert.strictEqual(
      config.resource.attributes[SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT],
      "test-slot",
    );
    assert.strictEqual(
      config.resource.attributes[SemanticResourceAttributes.HOST_ID],
      "test-hostname",
    );
    assert.strictEqual(config.resource.attributes["azure.app.service.stamp"], "test-home-stamp");
  });

  it("Azure Functions resource attributes", () => {
    const env = <{ [id: string]: string }>{};
    const originalEnv = process.env;
    env.WEBSITE_SITE_NAME = "test-site";
    env.REGION_NAME = "test-region";
    env.WEBSITE_MEMORY_LIMIT_MB = "512";
    env.FUNCTIONS_EXTENSION_VERSION = "~3";
    process.env = env;
    const config = new InternalConfig();
    process.env = originalEnv;
    assert.deepStrictEqual(
      config.resource.attributes[SemanticResourceAttributes.TELEMETRY_SDK_NAME],
      "opentelemetry",
    );
    assert.strictEqual(
      config.resource.attributes[SemanticResourceAttributes.CLOUD_PROVIDER],
      "azure",
    );
    assert.strictEqual(
      config.resource.attributes[SemanticResourceAttributes.CLOUD_REGION],
      "test-region",
    );
    assert.strictEqual(
      config.resource.attributes[SemanticResourceAttributes.FAAS_MAX_MEMORY],
      "512",
    );
    assert.strictEqual(
      config.resource.attributes[SemanticResourceAttributes.SERVICE_NAME],
      "test-site",
    );
  });

  it("Azure VM resource attributes", async () => {
    const scope = nock("http://169.254.169.254")
      .get("/metadata/instance/compute?api-version=2021-12-13&format=json")
      .reply(200, vmTestResponse);

    const config = new InternalConfig();
    assert.ok(config);

    // Wait for the async VM resource detector to finish
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        for (let i = 0; i < Object.keys(config.resource.attributes).length; i++) {
          const key = Object.keys(config.resource.attributes)[i];
          assert.strictEqual(config.resource.attributes[key], testAttributes[key]);
        }
        assert.strictEqual(
          config.resource.attributes[SemanticResourceAttributes.CLOUD_PROVIDER],
          "azure",
        );
        assert.strictEqual(
          config.resource.attributes[SemanticResourceAttributes.CLOUD_REGION],
          "westus",
        );
        assert.strictEqual(
          config.resource.attributes[SemanticResourceAttributes.CLOUD_PLATFORM],
          CloudPlatformValues.AZURE_VM,
        );
        resolve();
      }, 150);
    });
    scope.done();
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
      "testServiceName",
    );
    assert.deepStrictEqual(
      config.resource.attributes[SemanticResourceAttributes.SERVICE_INSTANCE_ID],
      "testServiceInstance",
    );
    assert.deepStrictEqual(
      config.resource.attributes[SemanticResourceAttributes.K8S_CLUSTER_NAME],
      "testClusterName",
    );
    assert.deepStrictEqual(
      config.resource.attributes[SemanticResourceAttributes.K8S_NODE_NAME],
      "testNodeName",
    );
  });
});
*/
