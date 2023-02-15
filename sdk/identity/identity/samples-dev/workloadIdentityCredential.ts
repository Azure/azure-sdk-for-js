import { DefaultAzureCredential, WorkloadIdentityCredential } from "@azure/identity";
import dotenv from "dotenv";

dotenv.config();

async function testDefaultCredential() {
  const credential = new DefaultAzureCredential();

  try {
    const token = await credential.getToken("https://storage.azure.com/.default");
    console.log(token);
  } catch (err) {
    console.log("Error with DefaultAzureCredential:", err);
  }
}

async function testWorkloadCredential() {
  const credential = new WorkloadIdentityCredential(
    process.env.AZURE_TENANT_ID!,
    process.env.AZURE_CLIENT_ID!,
    process.env.AZURE_FEDERATED_TOKEN_FILE_PATH!
  );

  try {
    const token = await credential.getToken("https://storage.azure.com/.default");
    console.log(token);
  } catch (err) {
    console.log("Error with WorkloadIdentityCredential:", err);
  }
}

async function main() {
  await testDefaultCredential();
  await testWorkloadCredential();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
