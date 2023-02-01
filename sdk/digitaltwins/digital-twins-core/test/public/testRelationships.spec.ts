// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DigitalTwinsClient, DigitalTwinsAddRelationshipOptionalParams } from "../../src";
import { authenticate } from "../utils/testAuthentication";
import { Recorder } from "@azure-tools/test-recorder";
import chai from "chai";
import { isRestError } from "@azure/core-rest-pipeline";

const assert = chai.assert;
const should = chai.should();

const BUILDING_MODEL_ID = "dtmi:samples:DTRelationshipsTestsBuilding;1";
const FLOOR_MODEL_ID = "dtmi:samples:DTRelationshipsTestsFloor;1";
const ROOM_MODEL_ID = "dtmi:samples:DTRelationshipsTestsRoom;1";
const BUILDING_DIGITAL_TWIN_ID = "DTRelationshipsTestsBuildingTwin";
const FLOOR_DIGITAL_TWIN_ID = "DTRelationshipsTestsFloorTwin";
const ROOM_DIGITAL_TWIN_ID = "DTRelationshipsTestsRoomTwin";

const dtdl_model_building = {
  "@id": BUILDING_MODEL_ID,
  "@type": "Interface",
  "@context": "dtmi:dtdl:context;2",
  displayName: "Building",
  contents: [
    {
      "@type": "Relationship",
      name: "has",
      target: FLOOR_MODEL_ID,
      properties: [
        {
          "@type": "Property",
          name: "isAccessRestricted",
          schema: "boolean",
        },
      ],
    },
    {
      "@type": "Property",
      name: "AverageTemperature",
      schema: "double",
    },
  ],
};

const dtdl_model_floor = {
  "@id": FLOOR_MODEL_ID,
  "@type": "Interface",
  "@context": "dtmi:dtdl:context;2",
  displayName: "Floor",
  contents: [
    {
      "@type": "Relationship",
      name: "contains",
      target: ROOM_MODEL_ID,
    },
    {
      "@type": "Property",
      name: "AverageTemperature",
      schema: "double",
    },
  ],
};

const dtdl_model_room = {
  "@id": ROOM_MODEL_ID,
  "@type": "Interface",
  "@context": "dtmi:dtdl:context;2",
  displayName: "Room",
  contents: [
    {
      "@type": "Property",
      name: "Temperature",
      schema: "double",
    },
    {
      "@type": "Property",
      name: "IsOccupied",
      schema: "boolean",
    },
  ],
};

describe("DigitalTwins Relationships - create, read, list, delete operations", () => {
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

    try {
      await client.deleteModel(FLOOR_MODEL_ID);
    } catch (e: any) {
      if (!isRestError(e) || e.statusCode !== 404) {
        console.error("deleteModel failed during test setup or cleanup", e);
        throw e;
      }
    }

    try {
      await client.deleteModel(ROOM_MODEL_ID);
    } catch (e: any) {
      if (!isRestError(e) || e.statusCode !== 404) {
        console.error("deleteModel failed during test setup or cleanup", e);
        throw e;
      }
    }
  }

  async function createModel(): Promise<void> {
    const simpleModels = [dtdl_model_building, dtdl_model_floor, dtdl_model_room];
    await client.createModels(simpleModels);
  }

  async function setUpModels(): Promise<void> {
    await deleteModels();
    await createModel();
  }

  async function deleteDigitalTwins(): Promise<void> {
    try {
      await client.deleteDigitalTwin(BUILDING_DIGITAL_TWIN_ID);
    } catch (e: any) {
      if (!isRestError(e) || e.statusCode !== 404) {
        console.error("deleteDigitalTwin failure during test setup or cleanup", e);
        throw e;
      }
    }
    try {
      await client.deleteDigitalTwin(FLOOR_DIGITAL_TWIN_ID);
    } catch (e: any) {
      if (!isRestError(e) || e.statusCode !== 404) {
        console.error("deleteDigitalTwin failure during test setup or cleanup", e);
        throw e;
      }
    }
    try {
      await client.deleteDigitalTwin(ROOM_DIGITAL_TWIN_ID);
    } catch (e: any) {
      if (!isRestError(e) || e.statusCode !== 404) {
        console.error("deleteDigitalTwin failure during test setup or cleanup", e);
        throw e;
      }
    }
  }

  async function cleanup(twinId: string, relationshipId: string): Promise<void> {
    try {
      await client.deleteRelationship(twinId, relationshipId);
    } catch (e: any) {
      if (!isRestError(e) || e.statusCode !== 404) {
        console.error("deleteRelationship failure during test setup or cleanup", e);
        throw e;
      }
    }
    await deleteDigitalTwins();
    await deleteModels();
  }

  async function createDigitalTwins(): Promise<void> {
    const buildingTwin = {
      $metadata: {
        $model: BUILDING_MODEL_ID,
      },
      AverageTemperature: 68,
    };
    await client.upsertDigitalTwin(BUILDING_DIGITAL_TWIN_ID, JSON.stringify(buildingTwin));

    const floorTwin = {
      $metadata: {
        $model: FLOOR_MODEL_ID,
      },
      AverageTemperature: 75,
    };
    await client.upsertDigitalTwin(FLOOR_DIGITAL_TWIN_ID, JSON.stringify(floorTwin));

    const roomTwin = {
      $metadata: {
        $model: ROOM_MODEL_ID,
      },
      Temperature: 80,
      IsOccupied: true,
    };
    await client.upsertDigitalTwin(ROOM_DIGITAL_TWIN_ID, JSON.stringify(roomTwin));
  }

  async function setUpDigitalTwins(): Promise<void> {
    await deleteDigitalTwins();
    await createDigitalTwins();
  }

  it("create basic relationship", async function () {
    await setUpModels();
    await setUpDigitalTwins();

    const relationshipId = "FloorContainsRoom";
    const relationship = {
      $relationshipId: relationshipId,
      $sourceId: FLOOR_DIGITAL_TWIN_ID,
      $relationshipName: "contains",
      $targetId: ROOM_DIGITAL_TWIN_ID,
    };

    try {
      const createdRelationship: any = await client.upsertRelationship(
        FLOOR_DIGITAL_TWIN_ID,
        relationshipId,
        relationship
      );
      assert.equal(
        createdRelationship.$relationshipId,
        relationship.$relationshipId,
        "Unexpected relationshipId result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.$sourceId,
        relationship.$sourceId,
        "Unexpected sourceId result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.$targetId,
        relationship.$targetId,
        "Unexpected targetId result from upsertRelationship()."
      );
      assert.isNotNull(
        createdRelationship.$etag,
        "Unexpected eTag result from upsertRelationship()."
      );
    } finally {
      await cleanup(FLOOR_DIGITAL_TWIN_ID, relationshipId);
    }
  });

  it("create invalid relationship - invalid twin id", async function () {
    await setUpModels();
    await setUpDigitalTwins();

    const relationshipId = "FloorContainsRoom";
    const relationship = {
      $relationshipId: relationshipId,
      $sourceId: FLOOR_DIGITAL_TWIN_ID,
      $relationshipName: "contains",
      $targetId: ROOM_DIGITAL_TWIN_ID,
    };

    let errorWasThrown = false;
    try {
      await client.upsertRelationship("foo", relationshipId, relationship);
    } catch (error: any) {
      errorWasThrown = true;
      assert.include(error.message, `There is no digital twin instance that exists with the ID`);
    } finally {
      await cleanup(FLOOR_DIGITAL_TWIN_ID, relationshipId);
    }
    should.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("create invalid relationship - invalid twin target id", async function () {
    await setUpModels();
    await setUpDigitalTwins();

    const relationshipId = "FloorContainsRoom";
    const relationship = {
      $relationshipId: relationshipId,
      $sourceId: FLOOR_DIGITAL_TWIN_ID,
      $relationshipName: "contains",
      $targetId: "foo",
    };

    let errorWasThrown = false;
    try {
      await client.upsertRelationship(FLOOR_DIGITAL_TWIN_ID, relationshipId, relationship);
    } catch (error: any) {
      errorWasThrown = true;
      assert.include(error.message, `The target digital twin is invalid or does not exist`);
    } finally {
      await cleanup(FLOOR_DIGITAL_TWIN_ID, relationshipId);
    }
    should.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("create relationship conditionally", async function () {
    await setUpModels();
    await setUpDigitalTwins();

    const relationshipId = "FloorContainsRoom";
    const relationship = {
      $relationshipId: relationshipId,
      $sourceId: FLOOR_DIGITAL_TWIN_ID,
      $relationshipName: "contains",
      $targetId: ROOM_DIGITAL_TWIN_ID,
    };

    try {
      const options: DigitalTwinsAddRelationshipOptionalParams = {};
      options.ifNoneMatch = "*";
      const createdRelationship: any = await client.upsertRelationship(
        FLOOR_DIGITAL_TWIN_ID,
        relationshipId,
        relationship,
        options
      );
      assert.equal(
        createdRelationship.$relationshipId,
        relationship.$relationshipId,
        "Unexpected relationshipId result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.$sourceId,
        relationship.$sourceId,
        "Unexpected sourceId result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.$targetId,
        relationship.$targetId,
        "Unexpected targetId result from upsertRelationship()."
      );
      assert.isNotNull(
        createdRelationship.$etag,
        "Unexpected eTag result from upsertRelationship()."
      );

      let errorWasThrown = false;
      try {
        await client.upsertRelationship(
          FLOOR_DIGITAL_TWIN_ID,
          relationshipId,
          relationship,
          options
        );
      } catch (error: any) {
        errorWasThrown = true;
        assert.include(error.message, `header was specified but a relationship with the id`);
      }
      should.equal(errorWasThrown, true, "Error was not thrown");
    } finally {
      await cleanup(FLOOR_DIGITAL_TWIN_ID, relationshipId);
    }
  });

  it("upsert relationship", async function () {
    await setUpModels();
    await setUpDigitalTwins();

    const relationshipId = "BuildingHasFloor";
    const relationship = {
      $relationshipId: relationshipId,
      $sourceId: BUILDING_DIGITAL_TWIN_ID,
      $relationshipName: "has",
      $targetId: FLOOR_DIGITAL_TWIN_ID,
      isAccessRestricted: false,
    };

    try {
      const createdRelationship: any = await client.upsertRelationship(
        BUILDING_DIGITAL_TWIN_ID,
        relationshipId,
        relationship
      );
      assert.equal(
        createdRelationship.$relationshipId,
        relationship.$relationshipId,
        "Unexpected relationshipId result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.$sourceId,
        relationship.$sourceId,
        "Unexpected sourceId result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.$targetId,
        relationship.$targetId,
        "Unexpected targetId result from upsertRelationship()."
      );
      assert.isNotNull(
        createdRelationship.$etag,
        "Unexpected eTag result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.isAccessRestricted,
        false,
        "Unexpected isAccessRestricted result from upsertRelationship()."
      );

      relationship.isAccessRestricted = true;
      const updatedRelationship: any = await client.upsertRelationship(
        BUILDING_DIGITAL_TWIN_ID,
        relationshipId,
        relationship
      );
      assert.equal(
        updatedRelationship.$relationshipId,
        relationship.$relationshipId,
        "Unexpected relationshipId result from upsertRelationship()."
      );
      assert.equal(
        updatedRelationship.$sourceId,
        relationship.$sourceId,
        "Unexpected sourceId result from upsertRelationship()."
      );
      assert.equal(
        updatedRelationship.$targetId,
        relationship.$targetId,
        "Unexpected targetId result from upsertRelationship()."
      );
      assert.isNotNull(
        updatedRelationship.$etag,
        "Unexpected eTag result from upsertRelationship()."
      );
      assert.equal(
        updatedRelationship.isAccessRestricted,
        true,
        "Unexpected isAccessRestricted result from upsertRelationship()."
      );
    } finally {
      await cleanup(BUILDING_DIGITAL_TWIN_ID, relationshipId);
    }
  });

  it("get relationship", async function () {
    await setUpModels();
    await setUpDigitalTwins();

    const relationshipId = "BuildingHasFloor";
    const relationship = {
      $relationshipId: relationshipId,
      $sourceId: BUILDING_DIGITAL_TWIN_ID,
      $relationshipName: "has",
      $targetId: FLOOR_DIGITAL_TWIN_ID,
      isAccessRestricted: false,
    };

    try {
      const createdRelationship: any = await client.upsertRelationship(
        BUILDING_DIGITAL_TWIN_ID,
        relationshipId,
        relationship
      );
      assert.equal(
        createdRelationship.$relationshipId,
        relationship.$relationshipId,
        "Unexpected relationshipId result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.$sourceId,
        relationship.$sourceId,
        "Unexpected sourceId result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.$targetId,
        relationship.$targetId,
        "Unexpected targetId result from upsertRelationship()."
      );
      assert.isNotNull(
        createdRelationship.$etag,
        "Unexpected eTag result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.isAccessRestricted,
        false,
        "Unexpected isAccessRestricted result from upsertRelationship()."
      );

      const getRelationship: any = await client.getRelationship(
        BUILDING_DIGITAL_TWIN_ID,
        relationshipId
      );
      assert.equal(
        getRelationship.$relationshipId,
        createdRelationship.$relationshipId,
        "Unexpected relationshipId result from upsertRelationship()."
      );
      assert.equal(
        getRelationship.$sourceId,
        createdRelationship.$sourceId,
        "Unexpected sourceId result from upsertRelationship()."
      );
      assert.equal(
        getRelationship.$targetId,
        createdRelationship.$targetId,
        "Unexpected targetId result from upsertRelationship()."
      );
      assert.equal(
        getRelationship.$etag,
        createdRelationship.$etag,
        "Unexpected eTag result from upsertRelationship()."
      );
      assert.equal(
        getRelationship.isAccessRestricted,
        createdRelationship.isAccessRestricted,
        "Unexpected isAccessRestricted result from upsertRelationship()."
      );
    } finally {
      await cleanup(BUILDING_DIGITAL_TWIN_ID, relationshipId);
    }
  });

  it("get relationship not existing", async function () {
    await setUpModels();
    await setUpDigitalTwins();

    const relationshipId = "BuildingHasFloor";

    let errorWasThrown = false;
    try {
      await client.getRelationship(BUILDING_DIGITAL_TWIN_ID, relationshipId);
    } catch (error: any) {
      errorWasThrown = true;
      assert.include(
        error.message,
        `Relationship ` + relationshipId + ` not found on twin ` + BUILDING_DIGITAL_TWIN_ID
      );
      should.equal(errorWasThrown, true, "Error was not thrown");
    } finally {
      await cleanup(BUILDING_DIGITAL_TWIN_ID, relationshipId);
    }
  });

  it("delete relationship", async function () {
    await setUpModels();
    await setUpDigitalTwins();

    const relationshipId = "BuildingHasFloor";
    const relationship = {
      $relationshipId: relationshipId,
      $sourceId: BUILDING_DIGITAL_TWIN_ID,
      $relationshipName: "has",
      $targetId: FLOOR_DIGITAL_TWIN_ID,
      isAccessRestricted: false,
    };
    try {
      const createdRelationship: any = await client.upsertRelationship(
        BUILDING_DIGITAL_TWIN_ID,
        relationshipId,
        relationship
      );
      assert.equal(
        createdRelationship.$relationshipId,
        relationship.$relationshipId,
        "Unexpected relationshipId result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.$sourceId,
        relationship.$sourceId,
        "Unexpected sourceId result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.$targetId,
        relationship.$targetId,
        "Unexpected targetId result from upsertRelationship()."
      );
      assert.isNotNull(
        createdRelationship.$etag,
        "Unexpected eTag result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.isAccessRestricted,
        false,
        "Unexpected isAccessRestricted result from upsertRelationship()."
      );

      await client.deleteRelationship(BUILDING_DIGITAL_TWIN_ID, relationshipId);

      let errorWasThrown = false;
      try {
        await client.getRelationship(BUILDING_DIGITAL_TWIN_ID, relationshipId);
      } catch (error: any) {
        errorWasThrown = true;
        assert.include(
          error.message,
          `Relationship ` + relationshipId + ` not found on twin ` + BUILDING_DIGITAL_TWIN_ID
        );
        should.equal(errorWasThrown, true, "Error was not thrown");
      }
    } finally {
      await cleanup(BUILDING_DIGITAL_TWIN_ID, relationshipId);
    }
  });

  it("delete relationship not existing", async function () {
    await setUpModels();
    await setUpDigitalTwins();

    const relationshipId = "BuildingHasFloor";

    let errorWasThrown = false;
    try {
      await client.deleteRelationship(BUILDING_DIGITAL_TWIN_ID, relationshipId);
    } catch (error: any) {
      errorWasThrown = true;
      assert.include(
        error.message,
        `Relationship ` + relationshipId + ` not found on twin ` + BUILDING_DIGITAL_TWIN_ID
      );
      should.equal(errorWasThrown, true, "Error was not thrown");
    } finally {
      await cleanup(BUILDING_DIGITAL_TWIN_ID, relationshipId);
    }
  });

  it("update relationship replace", async function () {
    await setUpModels();
    await setUpDigitalTwins();

    const relationshipId = "BuildingHasFloor";
    const relationship = {
      $relationshipId: relationshipId,
      $sourceId: BUILDING_DIGITAL_TWIN_ID,
      $relationshipName: "has",
      $targetId: FLOOR_DIGITAL_TWIN_ID,
      isAccessRestricted: false,
    };

    try {
      const createdRelationship: any = await client.upsertRelationship(
        BUILDING_DIGITAL_TWIN_ID,
        relationshipId,
        relationship
      );
      assert.equal(
        createdRelationship.$relationshipId,
        relationship.$relationshipId,
        "Unexpected relationshipId result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.$sourceId,
        relationship.$sourceId,
        "Unexpected sourceId result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.$targetId,
        relationship.$targetId,
        "Unexpected targetId result from upsertRelationship()."
      );
      assert.isNotNull(
        createdRelationship.$etag,
        "Unexpected eTag result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.isAccessRestricted,
        false,
        "Unexpected isAccessRestricted result from upsertRelationship()."
      );

      const patch = [
        {
          op: "replace",
          path: "/isAccessRestricted",
          value: true,
        },
      ];
      const updatedRelationship = await client.updateRelationship(
        BUILDING_DIGITAL_TWIN_ID,
        relationshipId,
        patch
      );
      assert.isNotNull(
        updatedRelationship.etag,
        "Unexpected eTag result from updateRelationship()."
      );

      const getRelationship: any = await client.getRelationship(
        BUILDING_DIGITAL_TWIN_ID,
        relationshipId
      );
      assert.equal(
        getRelationship.etag,
        updatedRelationship.etag,
        "Unexpected eTag result from getRelationship()."
      );
      assert.equal(
        getRelationship.isAccessRestricted,
        true,
        "Unexpected isAccessRestricted result from getRelationship()."
      );
    } finally {
      await cleanup(BUILDING_DIGITAL_TWIN_ID, relationshipId);
    }
  });

  it("update relationship remove", async function () {
    await setUpModels();
    await setUpDigitalTwins();

    const relationshipId = "BuildingHasFloor";
    const relationship = {
      $relationshipId: relationshipId,
      $sourceId: BUILDING_DIGITAL_TWIN_ID,
      $relationshipName: "has",
      $targetId: FLOOR_DIGITAL_TWIN_ID,
      isAccessRestricted: false,
    };

    try {
      const createdRelationship: any = await client.upsertRelationship(
        BUILDING_DIGITAL_TWIN_ID,
        relationshipId,
        relationship
      );
      assert.equal(
        createdRelationship.$relationshipId,
        relationship.$relationshipId,
        "Unexpected relationshipId result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.$sourceId,
        relationship.$sourceId,
        "Unexpected sourceId result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.$targetId,
        relationship.$targetId,
        "Unexpected targetId result from upsertRelationship()."
      );
      assert.isNotNull(
        createdRelationship.$etag,
        "Unexpected eTag result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.isAccessRestricted,
        false,
        "Unexpected isAccessRestricted result from upsertRelationship()."
      );

      const patch = [
        {
          op: "remove",
          path: "/isAccessRestricted",
        },
      ];
      const updatedRelationship = await client.updateRelationship(
        BUILDING_DIGITAL_TWIN_ID,
        relationshipId,
        patch
      );
      assert.isNotNull(
        updatedRelationship.etag,
        "Unexpected eTag result from updateRelationship()."
      );

      const getRelationship: any = await client.getRelationship(
        BUILDING_DIGITAL_TWIN_ID,
        relationshipId
      );
      assert.equal(
        getRelationship.etag,
        updatedRelationship.etag,
        "Unexpected eTag result from getRelationship()."
      );
      assert.isUndefined(
        getRelationship.isAccessRestricted,
        "Unexpected isAccessRestricted result from getRelationship()."
      );
    } finally {
      await cleanup(BUILDING_DIGITAL_TWIN_ID, relationshipId);
    }
  });

  it("update relationship add", async function () {
    await setUpModels();
    await setUpDigitalTwins();

    const relationshipId = "BuildingHasFloor";
    const relationship = {
      $relationshipId: relationshipId,
      $sourceId: BUILDING_DIGITAL_TWIN_ID,
      $relationshipName: "has",
      $targetId: FLOOR_DIGITAL_TWIN_ID,
      isAccessRestricted: false,
    };

    try {
      const createdRelationship: any = await client.upsertRelationship(
        BUILDING_DIGITAL_TWIN_ID,
        relationshipId,
        relationship
      );
      assert.equal(
        createdRelationship.$relationshipId,
        relationship.$relationshipId,
        "Unexpected relationshipId result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.$sourceId,
        relationship.$sourceId,
        "Unexpected sourceId result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.$targetId,
        relationship.$targetId,
        "Unexpected targetId result from upsertRelationship()."
      );
      assert.isNotNull(
        createdRelationship.$etag,
        "Unexpected eTag result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.isAccessRestricted,
        false,
        "Unexpected isAccessRestricted result from upsertRelationship()."
      );

      const remove_patch = [
        {
          op: "remove",
          path: "/isAccessRestricted",
        },
      ];
      await client.updateRelationship(BUILDING_DIGITAL_TWIN_ID, relationshipId, remove_patch);

      const patch = [
        {
          op: "add",
          path: "/isAccessRestricted",
          value: true,
        },
      ];
      const updatedRelationship = await client.updateRelationship(
        BUILDING_DIGITAL_TWIN_ID,
        relationshipId,
        patch
      );
      assert.isNotNull(
        updatedRelationship.etag,
        "Unexpected eTag result from updateRelationship()."
      );

      const getRelationship: any = await client.getRelationship(
        BUILDING_DIGITAL_TWIN_ID,
        relationshipId
      );
      assert.equal(
        getRelationship.etag,
        updatedRelationship.etag,
        "Unexpected eTag result from getRelationship()."
      );
      assert.equal(
        getRelationship.isAccessRestricted,
        true,
        "Unexpected isAccessRestricted result from getRelationship()."
      );
    } finally {
      await cleanup(BUILDING_DIGITAL_TWIN_ID, relationshipId);
    }
  });

  it("update relationship multiple", async function () {
    await setUpModels();
    await setUpDigitalTwins();

    const relationshipId = "BuildingHasFloor";
    const relationship = {
      $relationshipId: relationshipId,
      $sourceId: BUILDING_DIGITAL_TWIN_ID,
      $relationshipName: "has",
      $targetId: FLOOR_DIGITAL_TWIN_ID,
      isAccessRestricted: false,
    };

    try {
      const createdRelationship: any = await client.upsertRelationship(
        BUILDING_DIGITAL_TWIN_ID,
        relationshipId,
        relationship
      );
      assert.equal(
        createdRelationship.$relationshipId,
        relationship.$relationshipId,
        "Unexpected relationshipId result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.$sourceId,
        relationship.$sourceId,
        "Unexpected sourceId result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.$targetId,
        relationship.$targetId,
        "Unexpected targetId result from upsertRelationship()."
      );
      assert.isNotNull(
        createdRelationship.$etag,
        "Unexpected eTag result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.isAccessRestricted,
        false,
        "Unexpected isAccessRestricted result from upsertRelationship()."
      );

      const patch = [
        {
          op: "replace",
          path: "/isAccessRestricted",
          value: true,
        },
        {
          op: "remove",
          path: "/isAccessRestricted",
        },
      ];
      const updatedRelationship = await client.updateRelationship(
        BUILDING_DIGITAL_TWIN_ID,
        relationshipId,
        patch
      );
      assert.isNotNull(
        updatedRelationship.etag,
        "Unexpected eTag result from updateRelationship()."
      );

      const getRelationship: any = await client.getRelationship(
        BUILDING_DIGITAL_TWIN_ID,
        relationshipId
      );
      assert.equal(
        getRelationship.etag,
        updatedRelationship.etag,
        "Unexpected eTag result from getRelationship()."
      );
      assert.isUndefined(
        getRelationship.isAccessRestricted,
        "Unexpected isAccessRestricted result from getRelationship()."
      );
    } finally {
      await cleanup(BUILDING_DIGITAL_TWIN_ID, relationshipId);
    }
  });

  it("update relationship invalid patch", async function () {
    await setUpModels();
    await setUpDigitalTwins();

    const relationshipId = "BuildingHasFloor";
    const relationship = {
      $relationshipId: relationshipId,
      $sourceId: BUILDING_DIGITAL_TWIN_ID,
      $relationshipName: "has",
      $targetId: FLOOR_DIGITAL_TWIN_ID,
      isAccessRestricted: false,
    };

    try {
      const createdRelationship: any = await client.upsertRelationship(
        BUILDING_DIGITAL_TWIN_ID,
        relationshipId,
        relationship
      );
      assert.equal(
        createdRelationship.$relationshipId,
        relationship.$relationshipId,
        "Unexpected relationshipId result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.$sourceId,
        relationship.$sourceId,
        "Unexpected sourceId result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.$targetId,
        relationship.$targetId,
        "Unexpected targetId result from upsertRelationship()."
      );
      assert.isNotNull(
        createdRelationship.$etag,
        "Unexpected eTag result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.isAccessRestricted,
        false,
        "Unexpected isAccessRestricted result from upsertRelationship()."
      );

      const patch1 = [
        {
          op: "move",
          path: "/isAccessRestricted",
        },
      ];
      let errorWasThrown = false;
      try {
        await client.updateRelationship(BUILDING_DIGITAL_TWIN_ID, relationshipId, patch1);
      } catch (error: any) {
        errorWasThrown = true;
        assert.include(error.message, `Unsupported operation type move`);
        should.equal(errorWasThrown, true, "Error was not thrown");
      }

      const patch2 = [
        {
          op: "remove",
          path: "/isAccessDoorRestricted",
        },
      ];
      errorWasThrown = false;
      try {
        await client.updateRelationship(BUILDING_DIGITAL_TWIN_ID, relationshipId, patch2);
      } catch (error: any) {
        errorWasThrown = true;
        assert.include(
          error.message,
          `The target location specified by path segment 'isAccessDoorRestricted' was not found`
        );
        should.equal(errorWasThrown, true, "Error was not thrown");
      }

      const patch3 = [
        {
          isAccessRestricted: false,
        },
      ];
      errorWasThrown = false;
      try {
        await client.updateRelationship(BUILDING_DIGITAL_TWIN_ID, relationshipId, patch3);
      } catch (error: any) {
        errorWasThrown = true;
        assert.include(error.message, `Parameter op must not be empty`);
        should.equal(errorWasThrown, true, "Error was not thrown");
      }

      const patch4 = [{}];
      errorWasThrown = false;
      try {
        await client.updateRelationship(BUILDING_DIGITAL_TWIN_ID, relationshipId, patch4);
      } catch (error: any) {
        errorWasThrown = true;
        assert.include(error.message, `Parameter op must not be empty`);
        should.equal(errorWasThrown, true, "Error was not thrown");
      }
    } finally {
      await cleanup(BUILDING_DIGITAL_TWIN_ID, relationshipId);
    }
  });

  it("update relationship conditionally", async function () {
    await setUpModels();
    await setUpDigitalTwins();

    const relationshipId = "BuildingHasFloor";
    const relationship = {
      $relationshipId: relationshipId,
      $sourceId: BUILDING_DIGITAL_TWIN_ID,
      $relationshipName: "has",
      $targetId: FLOOR_DIGITAL_TWIN_ID,
      isAccessRestricted: false,
    };

    try {
      const createdRelationship: any = await client.upsertRelationship(
        BUILDING_DIGITAL_TWIN_ID,
        relationshipId,
        relationship
      );
      assert.equal(
        createdRelationship.$relationshipId,
        relationship.$relationshipId,
        "Unexpected relationshipId result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.$sourceId,
        relationship.$sourceId,
        "Unexpected sourceId result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.$targetId,
        relationship.$targetId,
        "Unexpected targetId result from upsertRelationship()."
      );
      assert.isNotNull(
        createdRelationship.$etag,
        "Unexpected eTag result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.isAccessRestricted,
        false,
        "Unexpected isAccessRestricted result from upsertRelationship()."
      );

      const patch = [
        {
          op: "replace",
          path: "/isAccessRestricted",
          value: true,
        },
      ];
      const options: DigitalTwinsAddRelationshipOptionalParams = {};
      options.ifNoneMatch = "*";
      const updatedRelationship = await client.updateRelationship(
        BUILDING_DIGITAL_TWIN_ID,
        relationshipId,
        patch,
        options
      );
      assert.isNotNull(
        updatedRelationship.etag,
        "Unexpected eTag result from updateRelationship()."
      );

      const getRelationship: any = await client.getRelationship(
        BUILDING_DIGITAL_TWIN_ID,
        relationshipId
      );
      assert.equal(
        getRelationship.etag,
        updatedRelationship.etag,
        "Unexpected eTag result from getRelationship()."
      );
      assert.equal(
        getRelationship.isAccessRestricted,
        true,
        "Unexpected isAccessRestricted result from getRelationship()."
      );
    } finally {
      await cleanup(BUILDING_DIGITAL_TWIN_ID, relationshipId);
    }
  });

  it("update relationship not existing", async function () {
    await setUpModels();
    await setUpDigitalTwins();

    const relationshipId = "BuildingHasFloor";

    let errorWasThrown = false;
    try {
      const patch = [
        {
          op: "replace",
          path: "/isAccessRestricted",
          value: true,
        },
      ];
      await client.updateRelationship(BUILDING_DIGITAL_TWIN_ID, "foo", patch);
    } catch (error: any) {
      errorWasThrown = true;
      assert.include(error.message, `Relationship foo not found on twin`);
      should.equal(errorWasThrown, true, "Error was not thrown");
    } finally {
      await cleanup(BUILDING_DIGITAL_TWIN_ID, relationshipId);
    }
  });

  it("list relationships", async function () {
    await setUpModels();
    await setUpDigitalTwins();

    const relationshipId = "BuildingHasFloor";
    const relationship = {
      $relationshipId: relationshipId,
      $sourceId: BUILDING_DIGITAL_TWIN_ID,
      $relationshipName: "has",
      $targetId: FLOOR_DIGITAL_TWIN_ID,
      isAccessRestricted: false,
    };

    try {
      const createdRelationship: any = await client.upsertRelationship(
        BUILDING_DIGITAL_TWIN_ID,
        relationshipId,
        relationship
      );
      assert.equal(
        createdRelationship.$relationshipId,
        relationship.$relationshipId,
        "Unexpected relationshipId result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.$sourceId,
        relationship.$sourceId,
        "Unexpected sourceId result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.$targetId,
        relationship.$targetId,
        "Unexpected targetId result from upsertRelationship()."
      );
      assert.isNotNull(
        createdRelationship.$etag,
        "Unexpected eTag result from upsertRelationship()."
      );

      let relationshipFound = false;
      let count = 0;
      const relationships = client.listRelationships(BUILDING_DIGITAL_TWIN_ID);
      for await (const relationshipFromList of relationships) {
        if (relationshipFromList.$relationshipId === relationshipId) {
          relationshipFound = true;
        }
        count++;
      }
      assert.equal(count >= 1, true, "Unexpected count result from listRelationships().");
      assert.equal(relationshipFound, true, "Unexpected result from listRelationships().");
    } finally {
      await cleanup(BUILDING_DIGITAL_TWIN_ID, relationshipId);
    }
  });

  it("list incoming relationships", async function () {
    await setUpModels();
    await setUpDigitalTwins();

    const relationshipId = "BuildingHasFloor";
    const relationship = {
      $relationshipId: relationshipId,
      $sourceId: BUILDING_DIGITAL_TWIN_ID,
      $relationshipName: "has",
      $targetId: FLOOR_DIGITAL_TWIN_ID,
      isAccessRestricted: false,
    };

    try {
      const createdRelationship: any = await client.upsertRelationship(
        BUILDING_DIGITAL_TWIN_ID,
        relationshipId,
        relationship
      );
      assert.equal(
        createdRelationship.$relationshipId,
        relationship.$relationshipId,
        "Unexpected relationshipId result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.$sourceId,
        relationship.$sourceId,
        "Unexpected sourceId result from upsertRelationship()."
      );
      assert.equal(
        createdRelationship.$targetId,
        relationship.$targetId,
        "Unexpected targetId result from upsertRelationship()."
      );
      assert.isNotNull(
        createdRelationship.$etag,
        "Unexpected eTag result from upsertRelationship()."
      );

      let relationshipFound = false;
      let count = 0;
      const relationships = client.listIncomingRelationships(BUILDING_DIGITAL_TWIN_ID);
      for await (const relationshipFromList of relationships) {
        if (relationshipFromList.relationshipId === relationshipId) {
          relationshipFound = true;
        }
        count++;
      }
      assert.equal(count === 0, true, "Unexpected count result from listRelationships().");
      assert.equal(relationshipFound, false, "Unexpected result from listRelationships().");
    } finally {
      await cleanup(BUILDING_DIGITAL_TWIN_ID, relationshipId);
    }
  });
});
