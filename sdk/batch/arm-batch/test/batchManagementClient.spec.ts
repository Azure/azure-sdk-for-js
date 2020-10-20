/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BatchManagementClient, BatchManagementModels } from "../src/batchManagementClient";
import { describe, beforeEach } from "mocha";
import { assert } from "chai";
import * as dotenv from "dotenv";
import * as util from "util";
import * as fs from "fs";
import { AuthenticationContext } from "adal-node";
import { TokenCredentials, RestError, ServiceClient, WebResource } from "@azure/ms-rest-js";
import { CertificateCreateOrUpdateParameters } from "../src/models";

dotenv.config();

describe("Batch Management Service", () => {
  let client: BatchManagementClient;
  let subscriptionId: string;
  let clientId: string;
  let secret: string;
  let tenant: string;
  let location: string;
  let autoStorage: string;
  let batchAccount: string;
  let groupName: string;

  async function getAppOnlyToken(clientId, secret) {
    const authContext = new AuthenticationContext(
      "https://login.microsoftonline.com/microsoft.onmicrosoft.com"
    );
    return new Promise<string>((resolve, reject) => {
      authContext.acquireTokenWithClientCredentials(
        "https://management.core.windows.net/",
        clientId,
        secret,
        (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(token.accessToken);
          }
        }
      );
    });
  }

  beforeEach(async () => {
    subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"]!;
    location = process.env["AZURE_TEST_LOCATION"]!;
    autoStorage = process.env["AZURE_AUTOSTORAGE"]!;
    batchAccount = "batchtestnodesdk";
    groupName = util.format("default-azurebatch-%s", location);
    clientId = process.env["AZURE_CLIENT_ID"];
    secret = process.env["AZURE_CLIENT_SECRET"];
    tenant = process.env["AZURE_TENANT_ID"];

    const token = await getAppOnlyToken(clientId, secret);
    const tokenCreds = new TokenCredentials(token, "Bearer");
    client = new BatchManagementClient(tokenCreds, subscriptionId);
  });

  describe("operations", () => {
    it("should list Batch operations successfully", async () => {
      const result = await client.operations.list();
      assert.isNotNull(result);
      assert.isAtLeast(result.length, 50);
      assert.equal(
        result[0].name,
        "Microsoft.Batch/batchAccounts/providers/Microsoft.Insights/diagnosticSettings/read"
      );
      assert.equal(result[0].origin, "system");
      assert.equal(result[0].display.provider, "Microsoft Batch");
      assert.equal(result[0].display.operation, "Read diagnostic setting");
    });

    it("should get subscription quota successfully", async () => {
      const result = await client.location.getQuotas(location);
      assert.exists(result);
      assert.equal(result.accountQuota, 1);
    });

    it("should check name available successfully", async () => {
      let name = "randombatch8374652387";
      const result = await client.location.checkNameAvailability(location, name);
      assert.exists(result);
      assert.isTrue(result.nameAvailable);
    });

    it("should create a batch account successfully", async () => {
      var resource = util.format(
        "/subscriptions/%s/resourceGroups/%s/providers/Microsoft.Storage/storageAccounts/%s",
        subscriptionId,
        groupName,
        autoStorage
      );
      var params = { location: location, autoStorage: { storageAccountId: resource } };
      const result = await client.batchAccount.create(groupName, batchAccount, params);
      assert.exists(result);
      assert.equal(result.location, location);
      assert.equal(result.poolQuota, 100);
      assert.equal(result.dedicatedCoreQuota, 700);
      assert.equal(result.lowPriorityCoreQuota, 500);
    });

    it("should add application successfully", async () => {
      var params = { allowUpdates: true, displayName: "my_application_name" };
      var options = { parameters: params };
      const result = await client.application.create(
        groupName,
        batchAccount,
        "my_application_id",
        options
      );
      assert.exists(result);
      assert.equal(result.name, "my_application_id");
    });

    it("should get application successfully", async () => {
      const result = await client.application.get(groupName, batchAccount, "my_application_id");
      assert.exists(result);
      assert.equal(result.name, "my_application_id");
      assert.equal(result.displayName, "my_application_name");
    });

    it("should get a list of applications successfully", async () => {
      const result = await client.application.list(groupName, batchAccount);
      assert.exists(result);
      assert.isAtLeast(result.length, 1);
    });

    it("should add application package successfully", async () => {
      const result = await client.applicationPackage.create(
        groupName,
        batchAccount,
        "my_application_id",
        "v1.0"
      );
      assert.exists(result);
      assert.equal(result._response.status, 200);
      assert.equal(result.name, "v1.0");
      console.log(result);
      console.log(__dirname);
      fs.writeFileSync(__dirname + "/test_package.zip", "Hey there!");
      var fileContent = fs.createReadStream(__dirname + "/test_package.zip");
      var httpRequest = new WebResource();
      var serviceClient = new ServiceClient();
      httpRequest.method = "PUT";
      httpRequest.headers = {};
      httpRequest.headers["x-ms-blob-type"] = "BlockBlob";
      httpRequest.headers["Content-Length"] = "10";
      httpRequest.url = result.storageUrl;
      httpRequest.body = fileContent;
      httpRequest.streamedResponse = true;
      var upload = serviceClient.sendRequest(httpRequest, function(err, response) {
        assert.exists(response);
        assert.equal(response.statusCode, 201);
      });
    });

    it("should add second application package successfully", async () => {
      const result = await client.applicationPackage.create(
        groupName,
        batchAccount,
        "my_application_id",
        "v2.0"
      );
      assert.exists(result);
      assert.equal(result._response.status, 200);
    });

    it("should list application packages successfully", async () => {
      const result = await client.applicationPackage.list(
        groupName,
        batchAccount,
        "my_application_id"
      );
      assert.isAtLeast(result.length, 1);
    });

    it("should activate application package successfully", async () => {
      const result = await client.applicationPackage.activate(
        groupName,
        batchAccount,
        "my_application_id",
        "v1.0",
        "zip"
      );
      assert.exists(result);
      assert.equal(result._response.status, 200);
    });

    it("should fail to activate application package", async () => {
      try {
        await client.applicationPackage.activate(
          groupName,
          batchAccount,
          "my_application_id",
          "v2.0",
          "zip"
        );
        assert.fail("No error thrown");
      } catch (err) {
        if (err instanceof RestError) {
          assert.equal(err.response.status, 409);
          assert.equal(err.body.code, "ApplicationPackageBlobNotFound");
        } else {
          assert.fail(`Caught error but wasn't a RestError: ${err}`);
        }
      }
    });

    it("should fail to update application", async () => {
      var params = { allowUpdates: false, displayName: "my_updated_name", defaultVersion: "v2.0" };
      try {
        await client.application.update(groupName, batchAccount, "my_application_id", params);
        assert.fail("No error thrown");
      } catch (err) {
        if (err instanceof RestError) {
          assert.equal(err.response.status, 409);
          assert.equal(err.body.code, "RequestedDefaultVersionNotActive");
        } else {
          assert.fail(`Caught error but wasn't a RestError: ${err}`);
        }
      }
    });

    it("should update application successfully", async () => {
      var params = { allowUpdates: false, displayName: "my_updated_name", defaultVersion: "v1.0" };
      const result = await client.application.update(
        groupName,
        batchAccount,
        "my_application_id",
        params
      );
      assert.equal(result._response.status, 200);
    });

    it("should get application package successfully", async () => {
      const result = await client.applicationPackage.get(
        groupName,
        batchAccount,
        "my_application_id",
        "v1.0"
      );
      assert.exists(result);
      assert.equal(result._response.status, 200);
    });

    it("should delete application package successfully", async () => {
      const result = await client.applicationPackage.deleteMethod(
        groupName,
        batchAccount,
        "my_application_id",
        "v1.0"
      );
      assert.equal(result._response.status, 200);
    });

    it("should fail to delete application", async () => {
      try {
        await client.application.deleteMethod(groupName, batchAccount, "my_application_id");
        assert.fail("No error thrown");
      } catch (err) {
        if (err instanceof RestError) {
          assert.equal(err.response.status, 409);
          assert.equal(err.body.code, "ApplicationPackagesNotEmpty");
        } else {
          assert.fail(`Caught error but wasn't a RestError: ${err}`);
        }
      }
    });

    it("should delete second application package successfully", async () => {
      const result = await client.applicationPackage.deleteMethod(
        groupName,
        batchAccount,
        "my_application_id",
        "v2.0"
      );
      assert.equal(result._response.status, 200);
    });

    it("should delete application successfully", async () => {
      const result = await client.application.deleteMethod(
        groupName,
        batchAccount,
        "my_application_id"
      );
      assert.equal(result._response.status, 200);
    });

    it("should fail to create a batch account due to dupilcate location", async () => {
      var params = { location: location };
      try {
        await client.batchAccount.create(groupName, "batchtestnodesdk2", params);
        assert.fail("No error thrown");
      } catch (err) {
        console.log(err);
      }
      //This fails after the initial create request - so error isn't surfaced.
    });

    it("should fail to create a batch account due to invalid resource group", async () => {
      var params = { location: location };
      try {
        await client.batchAccount.create("does-not-exist", batchAccount, params);
        assert.fail("No error thrown");
      } catch (err) {
        if (err instanceof RestError) {
          assert.equal(err.response.status, 404);
          assert.equal(err.body.code, "ResourceGroupNotFound");
        } else {
          assert.fail(`Caught error but wasn't a RestError: ${err}`);
        }
      }
      //This fails on the initial create request - so we can check the error.
    });

    it("should get a specific account info successfully", async () => {
      const result = await client.batchAccount.get(groupName, batchAccount);
      assert.exists(result);
      assert.equal(result.name, batchAccount);
      assert.equal(result.location, location);
      assert.equal(result._response.status, 200);
    });

    it("should list accounts successfully", async () => {
      const result = await client.batchAccount.list();
      assert.exists(result);
      assert.isAtLeast(result.length, 1);
      var sorted = result.sort(function(a, b) {
        if (a.name < b.name) {
          return -1;
        }
        return 1;
      });
      assert.equal(sorted[0].name, batchAccount);
      assert.equal(sorted[0].location, location);
    });

    it("should list accounts by resource group successfully", async () => {
      const result = await client.batchAccount.listByResourceGroup(groupName);
      assert.exists(result);
      assert.isAtLeast(result.length, 1);
      assert.equal(result[0].name, batchAccount);
      assert.equal(result[0].location, location);
    });

    it("should get account keys successfully", async () => {
      const result = await client.batchAccount.getKeys(groupName, batchAccount);
      assert.exists(result);
      assert.exists(result.accountName);
      assert.exists(result.primary);
      assert.exists(result.secondary);
    });

    it("should regenerate keys successfully", async () => {
      const result = await client.batchAccount.regenerateKey(groupName, batchAccount, "Primary");
      assert.exists(result);
      assert.exists(result.primary);
      assert.exists(result.secondary);
    });

    it("should sync auto storage keys successfully", async () => {
      const result = await client.batchAccount.synchronizeAutoStorageKeys(groupName, batchAccount);
      assert.equal(result._response.status, 204);
    });

    it("should update account successfully", async () => {
      var tags = { tags: { Name: "tagName", Value: "tagValue" } };
      const result = await client.batchAccount.update(groupName, batchAccount, tags);
      assert.exists(result);
      assert.equal(result.tags.Name, "tagName");
      assert.equal(result.tags.Value, "tagValue");
    });

    it("should add certificate successfully", async () => {
      var certificate = "SHA1-cff2ab63c8c955aaf71989efa641b906558d9fb7";
      var parameters: CertificateCreateOrUpdateParameters = {
        thumbprint: "cff2ab63c8c955aaf71989efa641b906558d9fb7",
        thumbprintAlgorithm: "sha1",
        data:
          "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",
        format: "Pfx",
        password: "nodesdk"
      };
      const result = await client.certificate.create(
        groupName,
        batchAccount,
        certificate,
        parameters
      );
      assert.exists(result);
      assert.equal(result.name, "sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7");
    });

    it("should list certificates successfully", async () => {
      const result = await client.certificate.listByBatchAccount(groupName, batchAccount);
      assert.exists(result);
      assert.equal(result.length, 1);
    });

    it("should get certificate successfully", async () => {
      var certificate = "SHA1-cff2ab63c8c955aaf71989efa641b906558d9fb7";
      const result = await client.certificate.get(groupName, batchAccount, certificate);
      assert.exists(result);
      assert.equal(result.name, "sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7");
      assert.equal(result.thumbprintAlgorithm, "sha1");
      assert.equal(result.thumbprint, "cff2ab63c8c955aaf71989efa641b906558d9fb7");
    });

    it("should update certificate successfully", async () => {
      var certificate = "SHA1-cff2ab63c8c955aaf71989efa641b906558d9fb7";
      var parameters: CertificateCreateOrUpdateParameters = {
        password: "nodesdk",
        data:
          "MIIGMQIBAzCCBe0GCSqGSIb3DQEHAaCCBd4EggXaMIIF1jCCA8AGCSqGSIb3DQEHAaCCA7EEggOtMIIDqTCCA6UGCyqGSIb3DQEMCgECoIICtjCCArIwHAYKKoZIhvcNAQwBAzAOBAhyd3xCtln3iQICB9AEggKQhe5P10V9iV1BsDlwWT561Yu2hVq3JT8ae/ebx1ZR/gMApVereDKkS9Zg4vFyssusHebbK5pDpU8vfAqle0TM4m7wGsRj453ZorSPUfMpHvQnAOn+2pEpWdMThU7xvZ6DVpwhDOQk9166z+KnKdHGuJKh4haMT7Rw/6xZ1rsBt2423cwTrQVMQyACrEkianpuujubKltN99qRoFAxhQcnYE2KlYKw7lRcExq6mDSYAyk5xJZ1ZFdLj6MAryZroQit/0g5eyhoNEKwWbi8px5j71pRTf7yjN+deMGQKwbGl+3OgaL1UZ5fCjypbVL60kpIBxLZwIJ7p3jJ+q9pbq9zSdzshPYor5lxyUfXqaso/0/91ayNoBzg4hQGh618PhFI6RMGjwkzhB9xk74iweJ9HQyIHf8yx2RCSI22JuCMitPMWSGvOszhbNx3AEDLuiiAOHg391mprEtKZguOIr9LrJwem/YmcHbwyz5YAbZmiseKPkllfC7dafFfCFEkj6R2oegIsZo0pEKYisAXBqT0g+6/jGwuhlZcBo0f7UIZm88iA3MrJCjlXEgV5OcQdoWj+hq0lKEdnhtCKr03AIfukN6+4vjjarZeW1bs0swq0l3XFf5RHa11otshMS4mpewshB9iO9MuKWpRxuxeng4PlKZ/zuBqmPeUrjJ9454oK35Pq+dghfemt7AUpBH/KycDNIZgfdEWUZrRKBGnc519C+RTqxyt5hWL18nJk4LvSd3QKlJ1iyJxClhhb/NWEzPqNdyA5cxen+2T9bd/EqJ2KzRv5/BPVwTQkHH9W/TZElFyvFfOFIW2+03RKbVGw72Mr/0xKZ+awAnEfoU+SL/2Gj2m6PHkqFX2sOCi/tN9EA4xgdswEwYJKoZIhvcNAQkVMQYEBAEAAAAwXQYJKwYBBAGCNxEBMVAeTgBNAGkAYwByAG8AcwBvAGYAdAAgAFMAdAByAG8AbgBnACAAQwByAHkAcAB0AG8AZwByAGEAcABoAGkAYwAgAFAAcgBvAHYAaQBkAGUAcjBlBgkqhkiG9w0BCRQxWB5WAFAAdgBrAFQAbQBwADoANABjAGUANgAwADQAZABhAC0AMAA2ADgAMQAtADQANAAxADUALQBhADIAYwBhAC0ANQA3ADcAMwAwADgAZQA2AGQAOQBhAGMwggIOBgkqhkiG9w0BBwGgggH/BIIB+zCCAfcwggHzBgsqhkiG9w0BDAoBA6CCAcswggHHBgoqhkiG9w0BCRYBoIIBtwSCAbMwggGvMIIBXaADAgECAhAdka3aTQsIsUphgIXGUmeRMAkGBSsOAwIdBQAwFjEUMBIGA1UEAxMLUm9vdCBBZ2VuY3kwHhcNMTYwMTAxMDcwMDAwWhcNMTgwMTAxMDcwMDAwWjASMRAwDgYDVQQDEwdub2Rlc2RrMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5fhcxbJHxxBEIDzVOMc56s04U6k4GPY7yMR1m+rBGVRiAyV4RjY6U936dqXHCVD36ps2Q0Z+OeEgyCInkIyVeB1EwXcToOcyeS2YcUb0vRWZDouC3tuFdHwiK1Ed5iW/LksmXDotyV7kpqzaPhOFiMtBuMEwNJcPge9k17hRgRQIDAQABo0swSTBHBgNVHQEEQDA+gBAS5AktBh0dTwCNYSHcFmRjoRgwFjEUMBIGA1UEAxMLUm9vdCBBZ2VuY3mCEAY3bACqAGSKEc+41KpcNfQwCQYFKw4DAh0FAANBAHl2M97QbpzdnwO5HoRBsiEExOcLTNg+GKCr7HUsbzfvrUivw+JLL7qjHAIc5phnK+F5bQ8HKe0L9YXBSKl+fvwxFTATBgkqhkiG9w0BCRUxBgQEAQAAADA7MB8wBwYFKw4DAhoEFGVtyGMqiBd32fGpzlGZQoRM6UQwBBTI0YHFFqTS4Go8CoLgswn29EiuUQICB9A="
      };
      const result = await client.certificate.update(
        groupName,
        batchAccount,
        certificate,
        parameters
      );
      assert.exists(result);
      assert.equal(result.name, "sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7");
    });

    it("shoud delete certificate successfully", async () => {
      var certificate = "SHA1-cff2ab63c8c955aaf71989efa641b906558d9fb7";
      const result = await client.certificate.deleteMethod(groupName, batchAccount, certificate);
    });

    it("should create a paas pool successfully", async () => {
      var paas_pool = "test_paas_pool";
      var parameters = {
        displayName: "test_pool",
        vmSize: "small",
        deploymentConfiguration: {
          cloudServiceConfiguration: {
            osFamily: "5"
          }
        },
        startTask: {
          commandLine: 'cmd.exe /c "echo hello world"',
          resourceFiles: [{ httpUrl: "https://blobsource.com", filePath: "filename.txt" }],
          environmentSettings: [{ name: "ENV_VAR", value: "foo" }],
          userIdentity: {
            autoUser: {
              elevationLevel: "admin"
            }
          }
        },
        userAccounts: [{ name: "UserName", password: "p@55wOrd" }],
        scaleSettings: {
          fixedScale: {
            targetDedicatedNodes: 0,
            targetLowPriorityNodes: 0
          }
        }
      };
      const result = await client.pool.create(groupName, batchAccount, paas_pool, parameters);
      assert.exists(result);
      assert.equal(result.name, paas_pool);
    });

    it("should create a iaas pool successfully", async () => {
      var iaas_pool = "test_iaas_pool";
      var parameters = {
        displayName: "test_pool",
        vmSize: "Standard_A1",
        deploymentConfiguration: {
          virtualMachineConfiguration: {
            imageReference: {
              publisher: "MicrosoftWindowsServer",
              offer: "WindowsServer",
              sku: "2016-Datacenter-smalldisk"
            },
            nodeAgentSkuId: "batch.node.windows amd64",
            windowsConfiguration: { enableAutomaticUpdates: true }
          }
        },
        scaleSettings: {
          fixedScale: {
            targetDedicatedNodes: 0,
            targetLowPriorityNodes: 0
          }
        }
      };
      const result = await client.pool.create(groupName, batchAccount, iaas_pool, parameters);
      assert.exists(result);
      assert.equal(result.name, iaas_pool);
    });

    it("should list pools successfully", async () => {
      const result = await client.pool.listByBatchAccount(groupName, batchAccount);
      assert.exists(result);
      assert.equal(result.length, 2);
    });

    it("should update pool successfully", async () => {
      var iaas_pool = "test_iaas_pool";
      var parameters = {
        autoScale: {
          formula: "$TargetDedicatedNodes=1"
        }
      };
      const result = await client.pool.update(groupName, batchAccount, iaas_pool, parameters);
      assert.exists(result);
      assert.equal(result.name, iaas_pool);
    });

    it("should get pool successfully", async () => {
      var iaas_pool = "test_iaas_pool";
      const result = await client.pool.get(groupName, batchAccount, iaas_pool);
      assert.exists(result);
      assert.equal(result.name, iaas_pool);
      assert.equal(result.vmSize, "STANDARD_A1");
    });

    it("should delete pool successfully", async () => {
      var iaas_pool = "test_iaas_pool";
      await client.pool.deleteMethod(groupName, batchAccount, iaas_pool);
      var paas_pool = "test_paas_pool";
      await client.pool.deleteMethod(groupName, batchAccount, paas_pool);
    });

    it("should delete a batch account successfully", async () => {
      const result = await client.batchAccount.deleteMethod(groupName, batchAccount);
    });

    it("should fail to create a BYOS account with bad KeyVault properties", async () => {
      var byosAccountName = "batchtestnodesdkbyos";
      var allocationMode = "UserSubscription";

      // Omit keyVaultReference
      var params = {
        location: location,
        poolAllocationMode: allocationMode
      };

      try {
        await client.batchAccount.create(groupName, byosAccountName, params);
        assert.fail("No error thrown");
      } catch (err) {
        if (err instanceof RestError) {
          assert.equal(err.response.status, 400);
          assert.equal(err.body.code, "InvalidRequestBody");
        } else {
          assert.fail(`Caught error but wasn't a RestError: ${err}`);
        }
      }

      // Use malformed key vault parameter values
      var params1 = {
        location: location,
        poolAllocationMode: allocationMode,
        keyVaultReference: {
          id: "abc",
          url: "def"
        }
      };

      try {
        await client.batchAccount.create(groupName, byosAccountName, params1);
        assert.fail("No error thrown");
      } catch (err) {
        console.log(err);
        if (err instanceof RestError) {
          assert.equal(err.response.status, 400);
          assert.equal(err.body.code, "LinkedInvalidPropertyId");
        } else {
          assert.fail(`Caught error but wasn't a RestError: ${err}`);
        }
      }
    });
  });
});
