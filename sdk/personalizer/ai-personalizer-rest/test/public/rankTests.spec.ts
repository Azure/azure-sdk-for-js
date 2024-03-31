// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, env } from "@azure-tools/test-recorder";
import { createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import createPersonalizerClient, {
  PersonalizerClient,
  RankRequest,
  RankableAction,
  isUnexpected,
} from "../../src";
import { assert } from "chai";

describe("Rank Tests", () => {
  let recorder: Recorder;
  let client: PersonalizerClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createPersonalizerClient(
      env["PERSONALIZER_ENDPOINT_SINGLE_SLOT"] ?? "",
      {
        key: env["PERSONALIZER_API_KEY_SINGLE_SLOT"] ?? "",
      },
      recorder.configureClientOptions({}),
    );
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("rank with no context features", async function () {
    const actions: RankableAction[] = [
      {
        id: "Person",
        features: [
          { videoType: "documentary", videoLength: 35, director: "CarlSagan" },
          { mostWatchedByAge: "30-35" },
        ],
      },
    ];
    const request: RankRequest = {
      actions: actions,
      contextFeatures: undefined,
      excludedActions: undefined,
    };
    const response = await client.path("/rank").post({ body: request });
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    assert.equal(actions.length, response.body.ranking.length);
    response.body.ranking.every((val, index) => val.id === actions[index].id);
  });

  it("rank with context features", async function () {
    const actions: RankableAction[] = [
      {
        id: "Person1",
        features: [
          { videoType: "documentary", videoLength: 35, director: "CarlSagan" },
          { mostWatchedByAge: "30-35" },
        ],
      },
      {
        id: "Person2",
        features: [
          { videoType: "documentary", videoLength: 35, director: "CarlSagan" },
          { mostWatchedByAge: "40-45" },
        ],
      },
    ];
    const contextFeatures = [
      { Features: { day: "tuesday", time: "night", weather: "rainy" } },
      {
        Features: {
          payingUser: true,
          favoriteGenre: "documentary",
          hoursOnSite: 0.12,
          lastWatchedType: "movie",
        },
      },
    ];
    const eventId: string = "123456789";
    const request: RankRequest = {
      eventId: eventId,
      actions: actions,
      contextFeatures: contextFeatures,
      excludedActions: ["Person1"],
    };
    const response = await client.path("/rank").post({ body: request });
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    assert.equal(actions.length, response.body.ranking.length);
    response.body.ranking.every((val, index) => val.id === actions[index].id);
  });
});
