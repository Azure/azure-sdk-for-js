import { SecretClient } from "../lib/secretClient";
import msRestNodeAuth from "@azure/ms-rest-nodeauth";

async function main(): Promise<void> {
  const url = "";
  const credentials = await msRestNodeAuth.interactiveLogin();
  const pipeline = SecretClient.getDefaultPipeline(credentials);
  const client = new SecretClient(url, credentials, pipeline);
  const result = await client.setSecret("name", "secret");
  console.log("result: %s", result);
}

main().catch((err) => {
console.log("error: ", err);
});
