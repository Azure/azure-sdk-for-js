// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { expect } from "chai";
import { Context } from "mocha";
import { WidgetServiceClient } from "../../src/index.js";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";

// When the recorder observes the values of these environment variables in any
// recorded HTTP request or response, it will replace them with the values they
// are mapped to below.
const replaceableVariables: Record<string, string> = {
  WIDGET_SERVICE_ENDPOINT: "https://myappconfig.azconfig.io/",
  AZURE_TENANT_ID: "12345678-1234-1234-1234-123456789012",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
};

function createClient(recorder: Recorder): WidgetServiceClient {
  // Retrieve the endpoint from the environment variable
  // we saved to the .env file earlier
  const endpoint = assertEnvironmentVariable("WIDGET_SERVICE_ENDPOINT");

  // We use the createTestCredential helper from the test-credential tools package.
  // This function returns the special NoOpCredential in playback mode, which
  // is a special TokenCredential implementation that does not make any requests
  // to AAD.
  const client = new WidgetServiceClient(
    endpoint,
    // recorder.configureClientOptions() updates the client options by adding the test proxy policy to
    // redirect the requests to reach the proxy tool in record/playback modes instead of
    // hitting the live service.
    recorder.configureClientOptions({}),
  );

  return client;
}

describe("WidgetServiceClient", function () {
  // Declare the client and recorder instances.  We will set them using the
  // beforeEach hook.
  let recorder: Recorder;
  let client: WidgetServiceClient;

  // NOTE: use of "function" and not ES6 arrow-style functions with the
  // beforeEach hook is IMPORTANT due to the use of `this` in the function
  // body.
  beforeEach(async function (this: Context) {
    // The recorder has some convenience methods, and we need to store a
    // reference to it so that we can `stop()` the recorder later in the
    // `afterEach` hook.
    recorder = new Recorder(this.currentTest);

    // Start the recorder before each test.
    await recorder.start({
      envSetupForPlayback: replaceableVariables,
      removeCentralSanitizers: [
        "AZSDK3430", // .id in the body is not a secret and is listed below in the beforeEach section
      ],
    });

    // We'll be able to refer to the instantiated `client` in tests, since we
    // initialize it before each test
    client = createClient(recorder);
  });

  // After each test, we need to stop the recording.
  afterEach(async function () {
    await recorder.stop();
  });

  describe("Widgets CRUD", function () {
    it("should create a widget", async function () {
      const widget = await client.createWidget(10, "red");
      // eslint-disable-next-line no-unused-expressions
      expect(widget).to.exist;
      // eslint-disable-next-line no-unused-expressions
      expect(widget.id).to.exist;
      expect(widget.color).to.equal("red");
      expect(widget.weight).to.equal(10);
    });

    it("should get a widget", async function () {
      const widget = await client.createWidget(10, "red");
      const retrievedWidget = await client.getWidget(widget.id);
      expect(retrievedWidget).to.deep.equal(widget);
    });

    it("should update a widget", async function () {
      const widget = await client.createWidget(10, "red");
      const updatedWidget = await client.updateWidget(widget.id, { weight: 20 });
      // eslint-disable-next-line no-unused-expressions
      expect(updatedWidget).to.exist;
      expect(updatedWidget.id).to.equal(widget.id);
      expect(updatedWidget.color).to.equal("red");
      expect(updatedWidget.weight).to.equal(20);
    });

    it("should delete a widget", async function () {
      const widget = await client.createWidget(10, "red");
      await client.deleteWidget(widget.id);
      try {
        await client.getWidget(widget.id);
        expect.fail("Expected an error");
      } catch (error: any) {
        expect(error.code).to.deep.equal(404);
      }
    });
  });
});
