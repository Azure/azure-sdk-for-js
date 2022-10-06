import AzureLoadTesting, { AzureLoadTestingClient } from "@azure-rest/loadtesting";
import { DefaultAzureCredential } from "@azure/identity";
import dotenv from "dotenv";
import { createReadStream } from "fs";

const readStream = createReadStream("./sample.jmx");
dotenv.config({ path: "../../sample.env" });

async function main() {
  const Endpoint = process.env["LOADTESTSERVICE_ENDPOINT"] || "";
  const DISPLAY_NAME = "some-load-test";
  const SUBSCRIPTION_ID = process.env["SUBSCRIPTION_ID"] || "";
  const Client: AzureLoadTestingClient = AzureLoadTesting(Endpoint, new DefaultAzureCredential());

  await Client.path("/loadtests/{testId}", "abc").patch({
    contentType: "application/merge-patch+json",
    body: {
      displayName: "mrinal-test",
      description: "JS SDK",
      loadTestConfig: {
        engineInstances: 1,
        splitAllCSVs: false,
      },
    },
  });

  await Client.path("/loadtests/{testId}/files/{fileId}", "abc", "xyz12365").put({
    contentType: "multipart/form-data",
    body: {
      file: readStream,
    },
  });

  await Client.path("/appcomponents/{name}", "appcomp123").patch({
    contentType: "application/merge-patch+json",
    body: {
      name: "app_component",
      testId: "abc",
      value: {
        "/subscriptions/{SUBSCRIPTION_ID}/resourceGroups/App-Service-Sample-Demo-rg/providers/Microsoft.Web/sites/App-Service-Sample-Demo": {
          resourceId:
            "/subscriptions/{SUBSCRIPTION_ID}/resourceGroups/App-Service-Sample-Demo-rg/providers/Microsoft.Web/sites/App-Service-Sample-Demo",
          resourceName: "App-Service-Sample-Demo",
          resourceType: "Microsoft.Web/sites",
          subscriptionId: SUBSCRIPTION_ID,
        },
      },
    },
  });

  await Client.path("/testruns/{testRunId}", "abcde").patch({
    contentType: "application/merge-patch+json",
    body: {
      testId: "abc",
      displayName: DISPLAY_NAME,
      vusers: 10,
    },
  });

  await Client.path("/testruns/{testRunId}", "abcde").get();
}

main().catch(console.error);
