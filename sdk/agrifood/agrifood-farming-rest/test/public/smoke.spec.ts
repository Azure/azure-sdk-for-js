// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { FarmBeatsClient, Party, paginate, PartiesListParameters } from "../../src";
import { Recorder } from "@azure-tools/test-recorder";

import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";

const partyId = "contoso-party-js";
const boundaryId = "test-boundary";
describe("List parties", () => {
  let recorder: Recorder;
  let client: FarmBeatsClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should list all parties", async () => {
    const parameters: PartiesListParameters = { queryParameters: { ids: partyId } };
    const result = await client.path("/parties").get(parameters);

    if (result.status !== "200") {
      assert.fail(`GET "/parties" failed with ${result.status}`);
    }

    const parties = paginate(client, result);

    const lastParty: Party[] = [];
    for await (const party of parties) {
      lastParty.push(<Party>party);
    }

    assert.isDefined(lastParty);
  });

  it("should create a party", async () => {
    const result = await client.path("/parties/{partyId}", partyId).patch({
      body: {
        name: "Contoso Party",
        description: "Your custom party description here",
        status: "Active",
        properties: { foo: "bar", "numeric one": 1, "1": "numeric key" },
      },
      contentType: "application/merge-patch+json",
    });

    assert.include(["200", "201"], result.status);
  });

  it("should create a boundary", async () => {
    const result = await client
      .path("/parties/{partyId}/boundaries/{boundaryId}", partyId, boundaryId)
      .patch({
        body: {
          geometry: {
            coordinates: [
              [
                [73.70457172393799, 20.545385304358106],
                [73.70457172393799, 20.545385304358106],
                [73.70448589324951, 20.542411534243367],
                [73.70877742767334, 20.541688176010233],
                [73.71023654937744, 20.545083911372505],
                [73.70663166046143, 20.546992723579137],
                [73.70457172393799, 20.545385304358106],
              ],
            ],
            type: "Polygon",
          },
          description: "Created by SDK",
        },
        contentType: "application/merge-patch+json",
      });

    if (result.status !== "200" && result.status !== "201") {
      throw result.body;
    }

    assert.include(["200", "201"], result.status);
  });

  it("should delete a boundary", async () => {
    const result = await client
      .path("/parties/{partyId}/boundaries/{boundaryId}", partyId, boundaryId)
      .delete();

    assert.equal(result.status, "204");
  });

  it("should delete a party", async () => {
    const result = await client.path("/parties/{partyId}", partyId).delete();
    assert.equal(result.status, "204");
  });
});
