import { expect } from "chai";
import { Context } from "mocha";
import { WidgetServiceClient } from "../../src/index.js";
import {
  Recorder,
  RecorderStartOptions,
  assertEnvironmentVariable,
} from "@azure-tools/test-recorder";

const envSetupForPlayback: { [k: string]: string } = {
  WIDGET_SERVICE_ENDPOINT: "https://myapp.azconfig.io",
  AZURE_TENANT_ID: "12345678-1234-1234-1234-123456789012",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
};

// When the recorder observes the values of these environment variables in any
// recorded HTTP request or response, it will replace them with the values they
// are mapped to below.
const recorderStartOptions: RecorderStartOptions = {
  envSetupForPlayback,
};

describe("WidgetServiceClient", () => {
  // Declare the client and recorder instances.  We will set them using the
  // beforeEach hook.
  let recorder: Recorder;
  let client: WidgetServiceClient;

  // NOTE: use of "function" and not ES6 arrow-style functions with the
  // beforeEach hook is IMPORTANT due to the use of `this` in the function
  // body.
  beforeEach(async function (this: Context) {
    const endpoint = assertEnvironmentVariable("WIDGET_SERVICE_ENDPOINT");

    // The recorder has some convenience methods, and we need to store a
    // reference to it so that we can `stop()` the recorder later in the
    // `afterEach` hook.
    recorder = new Recorder(this.currentTest);

    // Start the recorder before each test.
    await recorder.start({ envSetupForPlayback });

    // We'll be able to refer to the instantiated `client` in tests, since we
    // initialize it before each test
    client = new WidgetServiceClient(endpoint, recorder.configureClientOptions({}));
  });

  // After each test, we need to stop the recording.
  afterEach(async function () {
    await recorder.stop();
  });

  it("should create a widget", async () => {
    const widget = await client.createWidget(10, "red");
    expect(widget).to.exist;
    expect(widget.id).to.exist;
    expect(widget.color).to.equal("red");
    expect(widget.weight).to.equal(10);
  });

  it("should get a widget", async () => {
    const widget = await client.createWidget(10, "red");
    const retrievedWidget = await client.getWidget(widget.id);
    expect(retrievedWidget).to.deep.equal(widget);
  });

  it("should update a widget", async () => {
    const widget = await client.createWidget(10, "red");
    const updatedWidget = await client.updateWidget(widget.id, { weight: 20 });
    expect(updatedWidget).to.exist;
    expect(updatedWidget.id).to.equal(widget.id);
    expect(updatedWidget.color).to.equal("red");
    expect(updatedWidget.weight).to.equal(20);
  });

  it("should delete a widget", async () => {
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
