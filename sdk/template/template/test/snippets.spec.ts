import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { ConfigurationClient } from "../src";

describe("snippets", function () {
  it("new_configurationclient", function () {
    // @ts-ignore
    const client = new ConfigurationClient(
      process.env.ENDPOINT ?? "<app configuration endpoint>",
      new DefaultAzureCredential()
    );
  });

  it("FooBar", () => {
    const x = process.env.WHATEVER ?? "<whatever>";

    void x;
  });

  it("Bar", () => {
    const x: number = 5;

    void x;
  });

  it("setloglevel", () => {
    setLogLevel("verbose");
  });
});
