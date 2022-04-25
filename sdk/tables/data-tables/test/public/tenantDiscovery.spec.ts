import { createTableServiceClient } from "./utils/recordedClient";

describe.only("Tenant Discovery", () => {
  it("should pass", async () => {
    const client = await createTableServiceClient("TokenCredential");
    const tables = client.listTables();

    for await (const table of tables) {
      console.log(table.name);
    }
  });
});
