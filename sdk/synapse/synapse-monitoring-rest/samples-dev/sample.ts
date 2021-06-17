import Monitoring from "../src";
import { DefaultAzureCredential } from "@azure/identity";
import { config } from "dotenv";

config();

const endpoint = process.env["ENDPOINT"] || "";

async function main() {
  const client = Monitoring(endpoint, new DefaultAzureCredential());

  const applications = await client.path("/monitoring/workloadTypes/spark/Applications").get();

  for (const application of applications.body.sparkJobs ?? []) {
    console.log(application.name);
  }
}

main().catch(console.error);
