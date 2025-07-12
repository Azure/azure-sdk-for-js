import { AzureNamedKeyCredential } from "@azure/core-auth";
import createClient from "../src/index.js";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", function () {
  it("ReadmeSampleCreateClient_Node", async function () {
    const credential = new AzureNamedKeyCredential("<account name>", "<account key>");
    const batchClient = createClient("<account endpoint>", credential);
  });

  it("SetLogLevel", () => {
    setLogLevel("info");
  });
});
