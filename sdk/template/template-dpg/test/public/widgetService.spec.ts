import { expect } from "chai";
import { Context } from "mocha";
import { WidgetServiceClient } from "../../src/index.js";
import { Recorder } from "@azure-tools/test-recorder";
import { createClient, startRecorder } from "./utils/recordedClient.js";

describe("WidgetServiceClient", () => {
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
    recorder = await startRecorder(this.currentTest);

    // We'll be able to refer to the instantiated `client` in tests, since we
    // initialize it before each test
    client = createClient({ recorder });
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
