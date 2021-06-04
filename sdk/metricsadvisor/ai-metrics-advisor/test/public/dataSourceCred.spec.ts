// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import {
  DataLakeGen2SharedKeyDatasourceCredential,
  DatasourceCredentialPatch,
  MetricsAdvisorAdministrationClient,
  ServicePrincipalDatasourceCredential,
  ServicePrincipalInKeyVaultDatasourceCredential,
  SqlServerConnectionStringDatasourceCredential
} from "../../src";
import { createRecordedAdminClient, makeCredential } from "./util/recordedClients";
import { Recorder } from "@azure/test-utils-recorder";

describe("DataSourceCredential", () => {
  let client: MetricsAdvisorAdministrationClient;
  let recorder: Recorder;

  beforeEach(function(this: Context) {
    ({ recorder, client } = createRecordedAdminClient(this, makeCredential(false)));
  });

  afterEach(async function() {
    if (recorder) {
      await recorder.stop();
    }
  });
  describe("dataSource credential CRUD operations", async function() {
    const datasourceCredential = {
      description: "used for testing purposes only"
    };

    let createdSqlServerCredId: string;
    let createdDatalakeCredId: string;
    let createdServicePrincipalCredId: string;
    let createdServicePrincipalInKVCredId: string;

    it("creates sql server connection string credential", async function() {
      const sqlServerCredential: SqlServerConnectionStringDatasourceCredential = {
        ...datasourceCredential,
        name: "ExampleSQLCredential",
        type: "AzureSQLConnectionString",
        connectionString: "sql-server-connection-string"
      };
      const createdSqlServerCred = await client.createDatasourceCredential(sqlServerCredential);
      assert.ok(createdSqlServerCred.id, "Expecting valid datasource credential");
      createdSqlServerCredId = createdSqlServerCred.id!;
      assert.equal(createdSqlServerCred.name, sqlServerCredential.name);
      assert.equal(createdSqlServerCred.description, sqlServerCredential.description);
      assert.equal(createdSqlServerCred.type, sqlServerCredential.type);
    });

    it("updates sql server connection string credential", async function(this: Context) {
      if (!createdSqlServerCredId) {
        this.skip();
      }
      const sqlServerCredentialPatch = {
        name: "UpdatedSqlCred",
        description: "updated description",
        connectionString: "updated-string",
        type: "AzureSQLConnectionString"
      } as DatasourceCredentialPatch;
      await client.updateDatasourceCredential(createdSqlServerCredId, sqlServerCredentialPatch);
      const updated = await client.getDatasourceCredential(createdSqlServerCredId);
      assert.ok(updated.id, "Expecting valid datasource credential");
      assert.equal(updated.description, sqlServerCredentialPatch.description);
      assert.equal(updated.type, sqlServerCredentialPatch.type);
      assert.equal(updated.name, sqlServerCredentialPatch.name);
    });

    it("creates datalake gen2 shared key credential", async function() {
      const datalakeCred: DataLakeGen2SharedKeyDatasourceCredential = {
        ...datasourceCredential,
        name: "ExampleDLCredential",
        type: "DataLakeGen2SharedKey",
        accountKey: "account-key"
      };

      const createdDatalakeCred = await client.createDatasourceCredential(datalakeCred);
      assert.ok(createdDatalakeCred.id, "Expecting valid datasource credential");
      createdDatalakeCredId = createdDatalakeCred.id!;
      assert.equal(createdDatalakeCred.name, datalakeCred.name);
      assert.equal(createdDatalakeCred.description, datalakeCred.description);
      assert.equal(createdDatalakeCred.type, datalakeCred.type);
    });

    it("updates datalake gen2 shared key credential", async function(this: Context) {
      if (!createdDatalakeCredId) {
        this.skip();
      }
      const dataLakeCredentialPatch = {
        name: "UpdatedDataLakeCred",
        description: "updated description",
        accountKey: "updated account key",
        type: "DataLakeGen2SharedKey"
      } as DatasourceCredentialPatch;
      await client.updateDatasourceCredential(createdDatalakeCredId, dataLakeCredentialPatch);
      const updated = await client.getDatasourceCredential(createdDatalakeCredId);
      assert.ok(updated.id, "Expecting valid datasource credential");
      assert.equal(updated.description, dataLakeCredentialPatch.description);
      assert.equal(updated.type, dataLakeCredentialPatch.type);
      assert.equal(updated.name, dataLakeCredentialPatch.name);
    });

    it("creates service principal credential", async function() {
      const servicePrincipalCred: ServicePrincipalDatasourceCredential = {
        ...datasourceCredential,
        name: "ExampleSPCredential",
        type: "ServicePrincipal",
        clientId: "client-id",
        clientSecret: "client-secret",
        tenantId: "tenant-id"
      };

      const createdServicePrincipalCred = await client.createDatasourceCredential(
        servicePrincipalCred
      );
      assert.ok(createdServicePrincipalCred.id, "Expecting valid sql server datasource credential");
      createdServicePrincipalCredId = createdServicePrincipalCred.id!;
      assert.equal(createdServicePrincipalCred.name, servicePrincipalCred.name);
      assert.equal(createdServicePrincipalCred.description, servicePrincipalCred.description);
      assert.equal(createdServicePrincipalCred.type, servicePrincipalCred.type);
    });

    it("updates service principal credential", async function(this: Context) {
      if (!createdServicePrincipalCredId) {
        this.skip();
      }
      const servicePrincipalCredentialPatch = {
        name: "UpdatedSPCred",
        description: "updated description",
        clientId: "updated-client",
        clientSecret: "updated-secret",
        tenantId: "updated-tenant",
        type: "ServicePrincipal"
      } as ServicePrincipalDatasourceCredential;
      await client.updateDatasourceCredential(
        createdServicePrincipalCredId,
        servicePrincipalCredentialPatch
      );
      const updated = await client.getDatasourceCredential(createdServicePrincipalCredId);
      assert.ok(updated.id, "Expecting valid datasource credential");
      assert.equal(updated.description, servicePrincipalCredentialPatch.description);
      assert.equal(updated.type, servicePrincipalCredentialPatch.type);
      assert.equal(updated.name, servicePrincipalCredentialPatch.name);
      assert.equal(
        (updated as ServicePrincipalDatasourceCredential).clientId,
        servicePrincipalCredentialPatch.clientId
      );
    });

    it("creates service principal in keyvault credential", async function() {
      const servicePrincipalInKVCred: ServicePrincipalInKeyVaultDatasourceCredential = {
        ...datasourceCredential,
        name: "ExampleSPinKVCredential",
        type: "ServicePrincipalInKV",
        tenantId: "tenant-id",
        keyVaultEndpoint: "keyvault-endpoint",
        keyVaultClientId: "keyvault-client-id",
        keyVaultClientSecret: "keyvault-client-secret",
        servicePrincipalIdNameInKV: "service-principal-in-kv",
        servicePrincipalSecretNameInKV: "service-principal-secret-name-in-kv"
      };

      const createdServicePrincipalInKVCred = await client.createDatasourceCredential(
        servicePrincipalInKVCred
      );
      assert.ok(createdServicePrincipalInKVCred.id, "Expecting valid datasource credential");
      createdServicePrincipalInKVCredId = createdServicePrincipalInKVCred.id!;
      assert.equal(createdServicePrincipalInKVCred.name, servicePrincipalInKVCred.name);
      assert.equal(
        createdServicePrincipalInKVCred.description,
        servicePrincipalInKVCred.description
      );
      assert.equal(createdServicePrincipalInKVCred.type, servicePrincipalInKVCred.type);
    });

    it("updates service principal in keyvault credential", async function(this: Context) {
      if (!createdServicePrincipalInKVCredId) {
        this.skip();
      }
      const servicePrincipalInKVCredentialPatch = {
        name: "UpdatedSPinKVCred",
        description: "updated description",
        keyVaultEndpoint: "updated-keyvault-endpoint",
        keyVaultClientId: "updated-keyvault-client-id",
        keyVaultClientSecret: "updated-keyvault-client-secret",
        servicePrincipalIdNameInKV: "updated-service-principal-in-kv",
        servicePrincipalSecretNameInKV: "updated-service-principal-secret-name-in-kv",
        tenantId: "updated-tenant",
        type: "ServicePrincipalInKV"
      } as ServicePrincipalInKeyVaultDatasourceCredential;

      await client.updateDatasourceCredential(
        createdServicePrincipalInKVCredId,
        servicePrincipalInKVCredentialPatch
      );
      const updated = await client.getDatasourceCredential(createdServicePrincipalInKVCredId);
      assert.ok(updated.id, "Expecting valid datasource credential");
      assert.equal(updated.description, servicePrincipalInKVCredentialPatch.description);
      assert.equal(updated.type, servicePrincipalInKVCredentialPatch.type);
      assert.equal(updated.name, servicePrincipalInKVCredentialPatch.name);
      assert.equal(
        (updated as ServicePrincipalInKeyVaultDatasourceCredential).tenantId,
        servicePrincipalInKVCredentialPatch.tenantId
      );
      assert.equal(
        (updated as ServicePrincipalInKeyVaultDatasourceCredential).keyVaultClientId,
        servicePrincipalInKVCredentialPatch.keyVaultClientId
      );
      assert.equal(
        (updated as ServicePrincipalInKeyVaultDatasourceCredential).servicePrincipalIdNameInKV,
        servicePrincipalInKVCredentialPatch.servicePrincipalIdNameInKV
      );
    });

    it("lists datasource credentials one by one and by pages", async function() {
      const iterator = client.listDatasourceCredential();
      let result = await iterator.next();

      assert.ok(result.value.id, "Expecting first datasource credential");
      result = await iterator.next();
      assert.ok(result.value.id, "Expecting second datasource credential");

      const pageIterator = client.listDatasourceCredential().byPage({ maxPageSize: 2 });
      let pageResult = await pageIterator.next();
      assert.equal(pageResult.value.length, 2, "Expecting two entries in first page");
      pageResult = await pageIterator.next();
      assert.equal(pageResult.value.length, 2, "Expecting two entries in second page");
    });

    it("deletes sqlserver datasource credential", async function(this: Context) {
      if (!createdSqlServerCredId) {
        this.skip();
      }
      await verifyDatasourceCredentialDeletion(client, createdSqlServerCredId);
    });

    it("deletes datalake gen2 shared key datasource credential", async function(this: Context) {
      if (!createdDatalakeCredId) {
        this.skip();
      }
      await verifyDatasourceCredentialDeletion(client, createdDatalakeCredId);
    });

    it("deletes service principal datasource credential", async function(this: Context) {
      if (!createdServicePrincipalCredId) {
        this.skip();
      }
      await verifyDatasourceCredentialDeletion(client, createdServicePrincipalCredId);
    });

    it("deletes service principal in KeyVault datasource credential", async function(this: Context) {
      if (!createdServicePrincipalInKVCredId) {
        this.skip();
      }
      await verifyDatasourceCredentialDeletion(client, createdServicePrincipalInKVCredId);
    });
  });
}).timeout(60000);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function verifyDatasourceCredentialDeletion(
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  this: any,
  client: MetricsAdvisorAdministrationClient,
  createdDatasourceCredentialId: string
): Promise<void> {
  if (!createdDatasourceCredentialId) {
    this.skip();
  }

  await client.deleteDatasourceCredential(createdDatasourceCredentialId);
  try {
    await client.getDatasourceCredential(createdDatasourceCredentialId);
    assert.fail("Expecting error getting datasource credential");
  } catch (error) {
    assert.equal((error as any).code, "404 NOT_FOUND");
    assert.equal((error as any).message, "credentialId is invalid.");
  }
}
