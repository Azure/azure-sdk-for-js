// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DigitalTwinsClient,
  DigitalTwinsAddOptionalParams,
  DigitalTwinsDeleteOptionalParams,
  DigitalTwinsUpdateOptionalParams,
} from "../../src";
import { authenticate } from "../utils/testAuthentication";
import { isLiveMode, isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import { delay } from "@azure/core-util";
import chai from "chai";
import { isRestError } from "@azure/core-rest-pipeline";

const assert: typeof chai.assert = chai.assert;
const should = chai.should();

const BUILDING_MODEL_ID = "dtmi:samples:DTTestBuilding;1";
const dtdl_model_building = {
  "@id": BUILDING_MODEL_ID,
  "@type": "Interface",
  "@context": "dtmi:dtdl:context;2",
  displayName: "Building",
  contents: [
    {
      "@type": "Property",
      name: "AverageTemperature",
      schema: "double",
    },
    {
      "@type": "Property",
      name: "TemperatureUnit",
      schema: "string",
    },
  ],
};

describe("DigitalTwins - create, read, update, delete and telemetry operations", () => {
  let client: DigitalTwinsClient;
  let recorder: Recorder;

  beforeEach(async function (this: Mocha.Context) {
    const authentication = await authenticate(this);
    client = authentication.client;
    recorder = authentication.recorder;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  async function deleteModels(): Promise<void> {
    try {
      await client.deleteModel(BUILDING_MODEL_ID);
    } catch (e: any) {
      if (!isRestError(e) || e.statusCode !== 404) {
        console.error("deleteModel failed during test setup or cleanup", e);
        throw e;
      }
    }
  }

  async function createModel(): Promise<void> {
    const simpleModel = [dtdl_model_building];
    await client.createModels(simpleModel);
  }

  async function setUpModels(): Promise<void> {
    await deleteModels();
    await createModel();
  }

  async function deleteDigitalTwin(digitalTwinId: string): Promise<void> {
    try {
      await client.deleteDigitalTwin(digitalTwinId);
    } catch (e: any) {
      if (!isRestError(e) || e.statusCode !== 404) {
        console.error("deleteDigitalTwin failure during test setup or cleanup", e);
        throw e;
      }
    }
  }

  async function deleteDigitalTwins(): Promise<void> {
    try {
      const queryResult = client.queryTwins("SELECT * FROM digitaltwins");
      for await (const item of queryResult) {
        await client.deleteDigitalTwin(item.$dtId as string);
      }
    } catch (e: any) {
      if (!isRestError(e) || e.statusCode !== 404) {
        console.error("deleteDigitalTwin failure during test setup or cleanup", e);
        throw e;
      }
    }
  }

  it("create a simple digital twin", async function () {
    const digitalTwinId = recorder.variable(
      "digitalTwin",
      `digitalTwin${Math.floor(Math.random() * 1000)}`,
    );

    await setUpModels();
    await deleteDigitalTwin(digitalTwinId);

    const buildingTwin = {
      $metadata: {
        $model: BUILDING_MODEL_ID,
      },
      AverageTemperature: 68,
      TemperatureUnit: "Celsius",
    };
    try {
      const createdTwin: any = await client.upsertDigitalTwin(
        digitalTwinId,
        JSON.stringify(buildingTwin),
      );

      assert.equal(
        createdTwin.$dtId,
        digitalTwinId,
        "Unexpected dtId result from upsertDigitalTwin().",
      );
      assert.equal(
        createdTwin.$metadata.$model,
        BUILDING_MODEL_ID,
        "Unexpected model result from upsertDigitalTwin().",
      );
      assert.equal(
        createdTwin.AverageTemperature,
        buildingTwin["AverageTemperature"],
        "Unexpected AverageTemperature result from upsertDigitalTwin().",
      );
      assert.equal(
        createdTwin.TemperatureUnit,
        buildingTwin["TemperatureUnit"],
        "Unexpected TemperatureUnit result from upsertDigitalTwin().",
      );
      assert.notEqual(createdTwin.$etag, "", "No etag in result from upsertDigitalTwin().");
    } finally {
      await deleteDigitalTwin(digitalTwinId);
      await deleteModels();
    }
  });

  it("create digitaltwin without model", async function () {
    const digitalTwinId = recorder.variable(
      "digitalTwin",
      `digitalTwin${Math.floor(Math.random() * 1000)}`,
    );

    await deleteDigitalTwin(digitalTwinId);

    const buildingTwin = {
      $metadata: {
        $model: "dtmi:samples:DTTestBuilding;2",
      },
      AverageTemperature: 68,
      TemperatureUnit: "Celsius",
    };
    let errorWasThrown = false;
    try {
      await client.upsertDigitalTwin(digitalTwinId, JSON.stringify(buildingTwin));
    } catch (error: any) {
      errorWasThrown = true;
      should.equal(error.message, `Invalid twin specified`);
    } finally {
      await deleteDigitalTwin(digitalTwinId);
      await deleteModels();
    }
    should.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("create invalid digitaltwin", async function () {
    const digitalTwinId = recorder.variable(
      "digitalTwin",
      `create-simple-digitaltwin-${Math.floor(Math.random() * 1000)}`,
    );

    await deleteDigitalTwin(digitalTwinId);

    const buildingTwin = {
      $metadata: {
        $model: "dtmi:samples:DTTestBuilding;2",
      },
      AverageTemperature: 68,
    };
    let errorWasThrown = false;
    try {
      await client.upsertDigitalTwin(digitalTwinId, JSON.stringify(buildingTwin));
    } catch (error: any) {
      errorWasThrown = true;
      should.equal(error.message, `Invalid twin specified`);
    } finally {
      await deleteDigitalTwin(digitalTwinId);
      await deleteModels();
    }
    should.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("create digitaltwin conditionally if missing", async function () {
    const digitalTwinId = recorder.variable(
      "digitalTwin",
      `create-simple-digitaltwin-${Math.floor(Math.random() * 1000)}`,
    );

    await setUpModels();
    await deleteDigitalTwin(digitalTwinId);

    const buildingTwin = {
      $metadata: {
        $model: BUILDING_MODEL_ID,
      },
      AverageTemperature: 68,
      TemperatureUnit: "Celsius",
    };
    const options: DigitalTwinsAddOptionalParams = {
      ifNoneMatch: "*",
    };
    await client.upsertDigitalTwin(digitalTwinId, JSON.stringify(buildingTwin), options);

    let errorWasThrown = false;
    try {
      await client.upsertDigitalTwin(digitalTwinId, JSON.stringify(buildingTwin), options);
    } catch (error: any) {
      errorWasThrown = true;
      should.equal(
        error.message,
        `If-None-Match: * header was specified but a twin with the id ` +
          digitalTwinId +
          ` was found. Please specify a different twin id.`,
      );
    } finally {
      await deleteDigitalTwin(digitalTwinId);
      await deleteModels();
    }
    should.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("update a simple digital twin", async function () {
    const digitalTwinId = recorder.variable(
      "digitalTwin",
      `create-simple-digitaltwin-${Math.floor(Math.random() * 1000)}`,
    );

    await setUpModels();
    await deleteDigitalTwin(digitalTwinId);

    const buildingTwin = {
      $metadata: {
        $model: BUILDING_MODEL_ID,
      },
      AverageTemperature: 68,
      TemperatureUnit: "Celsius",
    };
    try {
      const createdTwin: any = await client.upsertDigitalTwin(
        digitalTwinId,
        JSON.stringify(buildingTwin),
      );
      assert.equal(
        createdTwin.$dtId,
        digitalTwinId,
        "Unexpected dtId result from upsertDigitalTwin().",
      );
      assert.equal(
        createdTwin.$metadata.$model,
        BUILDING_MODEL_ID,
        "Unexpected model result from upsertDigitalTwin().",
      );
      assert.equal(
        createdTwin.AverageTemperature,
        buildingTwin["AverageTemperature"],
        "Unexpected AverageTemperature result from upsertDigitalTwin().",
      );
      assert.equal(
        createdTwin.TemperatureUnit,
        buildingTwin["TemperatureUnit"],
        "Unexpected TemperatureUnit result from upsertDigitalTwin().",
      );
      assert.notEqual(createdTwin.$etag, "", "No etag in result from upsertDigitalTwin().");

      const newTemperature = 69;
      buildingTwin.AverageTemperature = newTemperature;
      const updatedTwin: any = await client.upsertDigitalTwin(
        digitalTwinId,
        JSON.stringify(buildingTwin),
      );
      assert.equal(
        updatedTwin.$dtId,
        digitalTwinId,
        "Unexpected dtId result from upsertDigitalTwin().",
      );
      assert.equal(
        updatedTwin.$metadata.$model,
        BUILDING_MODEL_ID,
        "Unexpected model result from upsertDigitalTwin().",
      );
      assert.equal(
        updatedTwin.AverageTemperature,
        newTemperature,
        "Unexpected AverageTemperature result from upsertDigitalTwin().",
      );
      assert.equal(
        updatedTwin.TemperatureUnit,
        buildingTwin["TemperatureUnit"],
        "Unexpected TemperatureUnit result from upsertDigitalTwin().",
      );
      assert.notEqual(updatedTwin.$etag, "", "No etag in result from upsertDigitalTwin().");
    } finally {
      await deleteDigitalTwin(digitalTwinId);
      await deleteModels();
    }
  });

  it("upsert digital twin invalid conditions", async function () {
    const digitalTwinId = recorder.variable(
      "digitalTwin",
      `create-simple-digitaltwin-${Math.floor(Math.random() * 1000)}`,
    );

    await setUpModels();
    await deleteDigitalTwin(digitalTwinId);

    const buildingTwin = {
      $metadata: {
        $model: BUILDING_MODEL_ID,
      },
      AverageTemperature: 68,
      TemperatureUnit: "Celsius",
    };
    const options: DigitalTwinsAddOptionalParams = {
      ifNoneMatch: "XXX",
    };
    let errorWasThrown = false;
    try {
      await client.upsertDigitalTwin(digitalTwinId, JSON.stringify(buildingTwin), options);
    } catch (error: any) {
      errorWasThrown = true;
      should.equal(
        error.message,
        `Invalid If-None-Match header value. Allowed value(s): If-None-Match: *`,
      );
    } finally {
      await deleteDigitalTwin(digitalTwinId);
      await deleteModels();
    }
    should.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("get digitaltwin", async function () {
    const digitalTwinId = recorder.variable(
      "digitalTwin",
      `create-simple-digitaltwin-${Math.floor(Math.random() * 1000)}`,
    );

    await setUpModels();
    await deleteDigitalTwin(digitalTwinId);

    const buildingTwin = {
      $metadata: {
        $model: BUILDING_MODEL_ID,
      },
      AverageTemperature: 68,
      TemperatureUnit: "Celsius",
    };
    try {
      const createdTwin = await client.upsertDigitalTwin(
        digitalTwinId,
        JSON.stringify(buildingTwin),
      );
      const getTwin = await client.getDigitalTwin(digitalTwinId);

      assert.deepEqual(createdTwin, getTwin);
    } finally {
      await deleteDigitalTwin(digitalTwinId);
      await deleteModels();
    }
  });

  it("get digitaltwin not existing", async function () {
    const digitalTwinId = recorder.variable(
      "digitalTwin",
      `create-simple-digitaltwin-${Math.floor(Math.random() * 1000)}`,
    );

    await setUpModels();
    await deleteDigitalTwin(digitalTwinId);

    let errorWasThrown = false;
    try {
      await client.getDigitalTwin(digitalTwinId);
    } catch (error: any) {
      errorWasThrown = true;
      assert.include(error.message, `There is no digital twin instance that exists with the ID`);
    } finally {
      await deleteDigitalTwin(digitalTwinId);
      await deleteModels();
    }
    should.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("delete digitaltwin", async function () {
    const digitalTwinId = recorder.variable(
      "digitalTwin",
      `create-simple-digitaltwin-${Math.floor(Math.random() * 1000)}`,
    );

    await setUpModels();
    await deleteDigitalTwin(digitalTwinId);

    const buildingTwin = {
      $metadata: {
        $model: BUILDING_MODEL_ID,
      },
      AverageTemperature: 68,
      TemperatureUnit: "Celsius",
    };
    await client.upsertDigitalTwin(digitalTwinId, JSON.stringify(buildingTwin));

    let errorWasThrown = false;
    try {
      await client.deleteDigitalTwin(digitalTwinId);
    } catch (error: any) {
      errorWasThrown = true;
      assert.notInclude(error.message, `There is no digital twin instance that exists with the ID`);
    } finally {
      await deleteDigitalTwin(digitalTwinId);
      await deleteModels();
    }
    should.equal(errorWasThrown, false, "Error was thrown for deleteDigitalTwin()");

    errorWasThrown = false;
    try {
      await client.getDigitalTwin(digitalTwinId);
    } catch (error: any) {
      errorWasThrown = true;
      assert.include(error.message, `There is no digital twin instance that exists with the ID`);
    } finally {
      await deleteDigitalTwin(digitalTwinId);
    }
    should.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("delete digitaltwin not existing", async function () {
    const digitalTwinId = recorder.variable(
      "digitalTwin",
      `create-simple-digitaltwin-${Math.floor(Math.random() * 1000)}`,
    );

    await setUpModels();
    await deleteDigitalTwin(digitalTwinId);

    let errorWasThrown = false;
    try {
      await client.deleteDigitalTwin(digitalTwinId);
    } catch (error: any) {
      errorWasThrown = true;
      assert.include(error.message, `There is no digital twin instance that exists with the ID`);
    } finally {
      await deleteDigitalTwin(digitalTwinId);
      await deleteModels();
    }
    should.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("delete digitaltwin if present", async function () {
    const digitalTwinId = recorder.variable(
      "digitalTwin",
      `create-simple-digitaltwin-${Math.floor(Math.random() * 1000)}`,
    );

    await setUpModels();
    await deleteDigitalTwin(digitalTwinId);

    const buildingTwin = {
      $metadata: {
        $model: BUILDING_MODEL_ID,
      },
      AverageTemperature: 68,
      TemperatureUnit: "Celsius",
    };
    const createdTwin = await client.upsertDigitalTwin(digitalTwinId, JSON.stringify(buildingTwin));

    const options: DigitalTwinsDeleteOptionalParams = {
      ifMatch: createdTwin.etag,
    };
    let errorWasThrown = false;
    try {
      await client.deleteDigitalTwin(digitalTwinId, options);
    } catch (error: any) {
      errorWasThrown = true;
      assert.notInclude(error.message, `There is no digital twin instance that exists with the ID`);
    } finally {
      await deleteDigitalTwin(digitalTwinId);
      await deleteModels();
    }
    should.equal(errorWasThrown, false, "Error was thrown for deleteDigitalTwin()");

    errorWasThrown = false;
    try {
      await client.getDigitalTwin(digitalTwinId);
    } catch (error: any) {
      errorWasThrown = true;
      assert.include(error.message, `There is no digital twin instance that exists with the ID`);
    } finally {
      await deleteDigitalTwin(digitalTwinId);
    }
    should.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("delete digital twin invalid conditions", async function () {
    const digitalTwinId = recorder.variable(
      "digitalTwin",
      `create-simple-digitaltwin-${Math.floor(Math.random() * 1000)}`,
    );

    await setUpModels();
    await deleteDigitalTwin(digitalTwinId);

    const buildingTwin = {
      $metadata: {
        $model: BUILDING_MODEL_ID,
      },
      AverageTemperature: 68,
      TemperatureUnit: "Celsius",
    };
    await client.upsertDigitalTwin(digitalTwinId, JSON.stringify(buildingTwin));

    const options: DigitalTwinsDeleteOptionalParams = {
      ifMatch: "XXX",
    };
    let errorWasThrown = false;
    try {
      await client.deleteDigitalTwin(digitalTwinId, options);
    } catch (error: any) {
      errorWasThrown = true;
      should.equal(
        error.message,
        `Invalid If-Match header value. Allowed value(s): If-Match: {etag} or If-Match: *`,
      );
    } finally {
      await deleteDigitalTwin(digitalTwinId);
      await deleteModels();
    }
    should.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("update digital twin replace", async function () {
    const digitalTwinId = recorder.variable(
      "digitalTwin",
      `create-simple-digitaltwin-${Math.floor(Math.random() * 1000)}`,
    );

    await setUpModels();
    await deleteDigitalTwin(digitalTwinId);

    const buildingTwin = {
      $metadata: {
        $model: BUILDING_MODEL_ID,
      },
      AverageTemperature: 68,
      TemperatureUnit: "Celsius",
    };
    const patch = [
      {
        op: "replace",
        path: "/AverageTemperature",
        value: 42,
      },
    ];
    await client.upsertDigitalTwin(digitalTwinId, JSON.stringify(buildingTwin));
    await client.updateDigitalTwin(digitalTwinId, patch);

    let errorWasThrown = false;
    try {
      const updatedTwin: any = await client.getDigitalTwin(digitalTwinId);
      assert.equal(
        updatedTwin.TemperatureUnit,
        "Celsius",
        "Unexpected TemperatureUnit result from updateDigitalTwin().",
      );
      assert.equal(
        updatedTwin.AverageTemperature,
        42,
        "Unexpected TemperatureUnit result from updateDigitalTwin().",
      );
    } catch (error: any) {
      errorWasThrown = true;
      assert.include(error.message, `There is no digital twin instance that exists with the ID`);
    } finally {
      await deleteDigitalTwin(digitalTwinId);
      await deleteModels();
    }
    should.equal(errorWasThrown, false, "Error was thrown");
  });

  it("update digital twin remove", async function () {
    const digitalTwinId = recorder.variable(
      "digitalTwin",
      `create-simple-digitaltwin-${Math.floor(Math.random() * 1000)}`,
    );

    await setUpModels();
    await deleteDigitalTwin(digitalTwinId);

    const buildingTwin = {
      $metadata: {
        $model: BUILDING_MODEL_ID,
      },
      AverageTemperature: 68,
      TemperatureUnit: "Celsius",
    };
    const patch = [
      {
        op: "remove",
        path: "/AverageTemperature",
      },
    ];
    await client.upsertDigitalTwin(digitalTwinId, JSON.stringify(buildingTwin));
    await client.updateDigitalTwin(digitalTwinId, patch);

    let errorWasThrown = false;
    try {
      const updatedTwin: any = await client.getDigitalTwin(digitalTwinId);
      assert.equal(
        updatedTwin.TemperatureUnit,
        "Celsius",
        "Unexpected TemperatureUnit result from updateDigitalTwin().",
      );
      assert.doesNotHaveAnyKeys(
        updatedTwin,
        ["AverageTemperature"],
        "Unexpected AverageTemperature result from updateDigitalTwin().",
      );
    } catch (error: any) {
      errorWasThrown = true;
      assert.include(error.message, `There is no digital twin instance that exists with the ID`);
    } finally {
      await deleteDigitalTwin(digitalTwinId);
      await deleteModels();
    }
    should.equal(errorWasThrown, false, "Error was thrown");
  });

  it("update digital twin add", async function () {
    const digitalTwinId = recorder.variable(
      "digitalTwin",
      `create-simple-digitaltwin-${Math.floor(Math.random() * 1000)}`,
    );

    await setUpModels();
    await deleteDigitalTwin(digitalTwinId);

    const buildingTwin = {
      $metadata: {
        $model: BUILDING_MODEL_ID,
      },
      AverageTemperature: 68,
    };
    const patch = [
      {
        op: "add",
        path: "/TemperatureUnit",
        value: "Celsius",
      },
    ];
    await client.upsertDigitalTwin(digitalTwinId, JSON.stringify(buildingTwin));
    await client.updateDigitalTwin(digitalTwinId, patch);

    let errorWasThrown = false;
    try {
      const updatedTwin: any = await client.getDigitalTwin(digitalTwinId);
      assert.equal(
        updatedTwin.AverageTemperature,
        68,
        "Unexpected AverageTemperature result from updateDigitalTwin().",
      );
      assert.equal(
        updatedTwin.TemperatureUnit,
        "Celsius",
        "Unexpected TemperatureUnit result from updateDigitalTwin().",
      );
    } catch (error: any) {
      errorWasThrown = true;
      assert.include(error.message, `There is no digital twin instance that exists with the ID`);
    } finally {
      await deleteDigitalTwin(digitalTwinId);
      await deleteModels();
    }
    should.equal(errorWasThrown, false, "Error was thrown");
  });

  it("update digital twin multiple", async function () {
    const digitalTwinId = recorder.variable(
      "digitalTwin",
      `create-simple-digitaltwin-${Math.floor(Math.random() * 1000)}`,
    );

    await setUpModels();
    await deleteDigitalTwin(digitalTwinId);

    const buildingTwin = {
      $metadata: {
        $model: BUILDING_MODEL_ID,
      },
      AverageTemperature: 68,
    };
    const patch = [
      {
        op: "add",
        path: "/TemperatureUnit",
        value: "Celsius",
      },
      {
        op: "replace",
        path: "/AverageTemperature",
        value: 42,
      },
    ];
    await client.upsertDigitalTwin(digitalTwinId, JSON.stringify(buildingTwin));
    await client.updateDigitalTwin(digitalTwinId, patch);

    let errorWasThrown = false;
    try {
      const updatedTwin: any = await client.getDigitalTwin(digitalTwinId);
      assert.equal(
        updatedTwin.AverageTemperature,
        42,
        "Unexpected AverageTemperature result from updateDigitalTwin().",
      );
      assert.equal(
        updatedTwin.TemperatureUnit,
        "Celsius",
        "Unexpected TemperatureUnit result from updateDigitalTwin().",
      );
    } catch (error: any) {
      errorWasThrown = true;
      assert.include(error.message, `There is no digital twin instance that exists with the ID`);
    } finally {
      await deleteDigitalTwin(digitalTwinId);
      await deleteModels();
    }
    should.equal(errorWasThrown, false, "Error was thrown");
  });

  it("update digital twin invalid patch", async function () {
    const digitalTwinId = recorder.variable(
      "digitalTwin",
      `create-simple-digitaltwin-${Math.floor(Math.random() * 1000)}`,
    );

    await setUpModels();
    await deleteDigitalTwin(digitalTwinId);

    const buildingTwin = {
      $metadata: {
        $model: BUILDING_MODEL_ID,
      },
      AverageTemperature: 68,
    };
    const patch = [
      {
        op: "move",
        path: "/AverageTemperature",
        value: 42,
      },
    ];
    await client.upsertDigitalTwin(digitalTwinId, JSON.stringify(buildingTwin));

    let errorWasThrown = false;
    try {
      await client.updateDigitalTwin(digitalTwinId, patch);
    } catch (error: any) {
      errorWasThrown = true;
      assert.include(error.message, `Unsupported operation type move`);
    } finally {
      await deleteDigitalTwin(digitalTwinId);
      await deleteModels();
    }
    should.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("update digital twin confditionally if present", async function () {
    const digitalTwinId = recorder.variable(
      "digitalTwin",
      `create-simple-digitaltwin-${Math.floor(Math.random() * 1000)}`,
    );

    await setUpModels();
    await deleteDigitalTwin(digitalTwinId);

    const buildingTwin = {
      $metadata: {
        $model: BUILDING_MODEL_ID,
      },
      AverageTemperature: 68,
    };
    const patch = [
      {
        op: "replace",
        path: "/AverageTemperature",
        value: 42,
      },
    ];
    const createdTwin = await client.upsertDigitalTwin(digitalTwinId, JSON.stringify(buildingTwin));
    const options: DigitalTwinsUpdateOptionalParams = {
      ifMatch: createdTwin.etag,
    };
    await client.updateDigitalTwin(digitalTwinId, patch, options);

    let errorWasThrown = false;
    try {
      const updatedTwin: any = await client.getDigitalTwin(digitalTwinId);
      assert.equal(
        updatedTwin.AverageTemperature,
        42,
        "Unexpected TemperatureUnit result from updateDigitalTwin().",
      );
    } catch (error: any) {
      errorWasThrown = true;
      assert.include(error.message, `There is no digital twin instance that exists with the ID`);
    } finally {
      await deleteDigitalTwin(digitalTwinId);
      await deleteModels();
    }
    should.equal(errorWasThrown, false, "Error was thrown");
  });

  it("update digital twin invalid conditions", async function () {
    const digitalTwinId = recorder.variable(
      "digitalTwin",
      `create-simple-digitaltwin-${Math.floor(Math.random() * 1000)}`,
    );

    await setUpModels();
    await deleteDigitalTwin(digitalTwinId);

    const buildingTwin = {
      $metadata: {
        $model: BUILDING_MODEL_ID,
      },
      AverageTemperature: 68,
      TemperatureUnit: "Celsius",
    };
    const patch = [
      {
        op: "replace",
        path: "/AverageTemperature",
        value: 42,
      },
    ];
    await client.upsertDigitalTwin(digitalTwinId, JSON.stringify(buildingTwin));

    const options: DigitalTwinsDeleteOptionalParams = {
      ifMatch: "XXX",
    };
    let errorWasThrown = false;
    try {
      await client.updateDigitalTwin(digitalTwinId, patch, options);
    } catch (error: any) {
      errorWasThrown = true;
      should.equal(
        error.message,
        `Invalid If-Match header value. Allowed value(s): If-Match: {etag} or If-Match: *`,
      );
    } finally {
      await deleteDigitalTwin(digitalTwinId);
      await deleteModels();
    }
    should.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("update digital twin not existing", async function () {
    const digitalTwinId = recorder.variable(
      "digitalTwin",
      `create-simple-digitaltwin-${Math.floor(Math.random() * 1000)}`,
    );

    await setUpModels();
    await deleteDigitalTwin(digitalTwinId);

    const patch = [
      {
        op: "replace",
        path: "/AverageTemperature",
        value: 42,
      },
    ];

    let errorWasThrown = false;
    try {
      await client.updateDigitalTwin(digitalTwinId, patch);
    } catch (error: any) {
      errorWasThrown = true;
      assert.include(error.message, `There is no digital twin instance that exists with the ID`);
    } finally {
      await deleteDigitalTwin(digitalTwinId);
      await deleteModels();
    }
    should.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("query digital twin", async function () {
    const digitalTwinId = recorder.variable(
      "digitalTwin",
      `create-simple-digitaltwin-${Math.floor(Math.random() * 1000)}`,
    );

    await setUpModels();
    await deleteDigitalTwins();

    const buildingTwin = {
      $metadata: {
        $model: BUILDING_MODEL_ID,
      },
      AverageTemperature: 68,
      TemperatureUnit: "Celsius",
    };
    await client.upsertDigitalTwin(digitalTwinId, JSON.stringify(buildingTwin));

    // Wait for the service to be ready
    if (!isPlaybackMode()) {
      await delay(5000);
    }

    let twinFound = false;
    try {
      const query = "SELECT * FROM digitaltwins";
      const queryResult = client.queryTwins(query);
      for await (const item of queryResult) {
        if (item.$dtId === digitalTwinId) {
          twinFound = true;
          break;
        }
      }
      assert.equal(twinFound, true, "DigitalTwin did not find");
    } finally {
      await deleteDigitalTwin(digitalTwinId);
      await deleteModels();
    }
  });

  it("query digital twin invalid expression", async function () {
    const digitalTwinId = recorder.variable(
      "digitalTwin",
      `create-simple-digitaltwin-${Math.floor(Math.random() * 1000)}`,
    );
    await setUpModels();
    await deleteDigitalTwins();

    let errorWasThrown = false;
    try {
      const query = "foo";
      const queryResult = client.queryTwins(query);
      await queryResult.next();
    } catch (error: any) {
      errorWasThrown = true;
      assert.include(
        error.message,
        "SQL query parse failed",
        "Unexpected error from queryTwins().",
      );
    } finally {
      await deleteDigitalTwin(digitalTwinId);
      await deleteModels();
    }
    should.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("publish telemetry", async function () {
    if (!isLiveMode()) {
      this.skip();
    }
    const digitalTwinId = recorder.variable(
      "digitalTwin",
      `create-simple-digitaltwin-${Math.floor(Math.random() * 1000)}`,
    );

    await setUpModels();
    await deleteDigitalTwins();

    const buildingTwin = {
      $metadata: {
        $model: BUILDING_MODEL_ID,
      },
      AverageTemperature: 68,
      TemperatureUnit: "Celsius",
    };
    await client.upsertDigitalTwin(digitalTwinId, JSON.stringify(buildingTwin));

    const telemetry = { Telemetry1: 1 };
    const messageId = "MessageId1";
    let errorWasThrown = false;
    try {
      client.publishTelemetry(digitalTwinId, telemetry, messageId);
    } catch (error: any) {
      errorWasThrown = true;
    } finally {
      await deleteDigitalTwin(digitalTwinId);
      await deleteModels();
    }
    should.equal(errorWasThrown, false, "Error was thrown");
  });
});
