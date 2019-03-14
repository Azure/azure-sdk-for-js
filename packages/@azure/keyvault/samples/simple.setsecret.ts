import { SecretsClient } from "../lib/secretsClient";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";

async function main(): Promise<void> {
  const url = "https://jeremy-kv.vault.azure.net";
  const c2 = await msRestNodeAuth.interactiveLoginWithAuthResponse();
  const client = new SecretsClient(url, c2.credentials);

  const s = await client.getSecret("Hello", "3597ab0798b043d398cde46f309010ea");
  console.log("secret: ", s);

  const result = await client.setSecret("name", "secret");
  console.log("result: ", result);
}

main().catch((err) => {
console.log("error: ", err);
});
