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

describe
  .only("DataSourceCredential", () => {
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

      it("updates sql server connection string credential", async function() {
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
        console.dir(updated);
        assert.ok(updated.id, "Expecting valid datasource credential");
        assert.equal(updated.description, sqlServerCredentialPatch.description);
        assert.equal(updated.type, sqlServerCredentialPatch.type);
        assert.equal(updated.name, sqlServerCredentialPatch.name);
        console.log((updated as SqlServerConnectionStringDatasourceCredential).connectionString);
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

      it("updates datalake gen2 shared key credential", async function() {
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
        console.dir(updated);
        assert.ok(updated.id, "Expecting valid datasource credential");
        assert.equal(updated.description, dataLakeCredentialPatch.description);
        assert.equal(updated.type, dataLakeCredentialPatch.type);
        assert.equal(updated.name, dataLakeCredentialPatch.name);
        console.log((updated as DataLakeGen2SharedKeyDatasourceCredential).accountKey);
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
        assert.ok(
          createdServicePrincipalCred.id,
          "Expecting valid sql server datasource credential"
        );
        createdServicePrincipalCredId = createdServicePrincipalCred.id!;
        assert.equal(createdServicePrincipalCred.name, servicePrincipalCred.name);
        assert.equal(createdServicePrincipalCred.description, servicePrincipalCred.description);
        assert.equal(createdServicePrincipalCred.type, servicePrincipalCred.type);
      });

      it("updates service principal credential", async function() {
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
        const updated = await client.getDatasourceCredential(createdDatalakeCredId);
        console.dir(updated);
        assert.ok(updated.id, "Expecting valid datasource credential");
        assert.equal(updated.description, servicePrincipalCredentialPatch.description);
        assert.equal(updated.type, servicePrincipalCredentialPatch.type);
        assert.equal(updated.name, servicePrincipalCredentialPatch.name);
        assert.equal(
          (updated as ServicePrincipalDatasourceCredential).clientId,
          servicePrincipalCredentialPatch.clientId
        );
        assert.equal(
          (updated as ServicePrincipalDatasourceCredential).clientSecret,
          servicePrincipalCredentialPatch.clientSecret
        );
      });

      it("creates service principal in keyvault credential", async function() {
        const servicePrincipalInKVCred: ServicePrincipalInKeyVaultDatasourceCredential = {
          ...datasourceCredential,
          name: "ExampleSPCredential",
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

      it("updates service principal in keyvault credential", async function() {
        if (!createdServicePrincipalInKVCredId) {
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
        const updated = await client.getDatasourceCredential(createdDatalakeCredId);
        console.dir(updated);
        assert.ok(updated.id, "Expecting valid datasource credential");
        assert.equal(updated.description, servicePrincipalCredentialPatch.description);
        assert.equal(updated.type, servicePrincipalCredentialPatch.type);
        assert.equal(updated.name, servicePrincipalCredentialPatch.name);
        assert.equal(
          (updated as ServicePrincipalDatasourceCredential).clientId,
          servicePrincipalCredentialPatch.clientId
        );
        assert.equal(
          (updated as ServicePrincipalDatasourceCredential).clientSecret,
          servicePrincipalCredentialPatch.clientSecret
        );
      });
    });
  })
  .timeout(60000);
