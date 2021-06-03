import {
  DatasourceCredentialPatch,
  MetricsAdvisorAdministrationClient,
  SqlServerConnectionStringDatasourceCredential
} from "../../src";
import { createRecordedAdminClient, makeCredential } from "./util/recordedClients";
import { Recorder } from "@azure/test-utils-recorder";
import { matrix } from "./util/matrix";
import { Context } from "mocha";
import { assert } from "chai";

matrix([[true, false]] as const, async (useAad) => {
  describe(`[${useAad ? "AAD" : "API Key"}]`, () => {
    describe("DataSourceCredential", () => {
      let client: MetricsAdvisorAdministrationClient;
      let recorder: Recorder;

      beforeEach(function(this: Context) {
        ({ recorder, client } = createRecordedAdminClient(this, makeCredential(useAad)));
      });

      afterEach(async function() {
        if (recorder) {
          await recorder.stop();
        }

        describe.only("dataSource credential CRUD operations", async function() {
          const datasourceCredential = {
            name: "ExampleCred",
            description: "used for testing purposes only"
          };
          //  describe("SqlServer Datasource credential", async function() {
          const sqlServerCredential: SqlServerConnectionStringDatasourceCredential = {
            ...datasourceCredential,
            type: "AzureSQLConnectionString",
            connectionString: "sql-server-connection-string"
          };
          let createdSqlServerCredId: string;
          it("creates sql server connection string credential", async function() {
            const createdSqlServerCred = await client.createDatasourceCredential(
              sqlServerCredential
            );
            assert.ok(createdSqlServerCred.id, "Expecting valid sql server datasource credential");
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
              name: "UpdatedCred",
              description: "updated description",
              connectionString: "updated-string",
              type: "AzureSQLConnectionString"
            } as DatasourceCredentialPatch;
            await client.updateDatasourceCredential(
              createdSqlServerCredId,
              sqlServerCredentialPatch
            );
            const updated = await client.getDatasourceCredential(createdSqlServerCredId);
            assert.ok(updated.id, "Expecting valid datasource credential");
            assert.equal(updated.description, sqlServerCredentialPatch.description);
            assert.equal(updated.type, sqlServerCredentialPatch.type);
            assert.equal(updated.name, sqlServerCredentialPatch.name);
            console.log(
              (updated as SqlServerConnectionStringDatasourceCredential).connectionString
            );
          });
          // });
        });
      });
    }).timeout(60000);
  });
});
