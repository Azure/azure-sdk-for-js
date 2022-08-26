// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import Personalizer, {
  isUnexpected,
  PersonalizerClient,
  RankableAction,
  SlotRequest,
  SlotResponseOutput,
} from "../../src";
import { env } from "process";
import { assert } from "chai";
import { enableMultiSlotAsync, isMultiSlotEnabledAsync } from "./helpers";

describe("Multi-Slot Rank Tests", () => {
  let recorder: Recorder;
  let client: PersonalizerClient;

  before(async function (this: Context) {
    client = Personalizer(env["PERSONALIZER_ENDPOINT_MULTI_SLOT"] ?? "", {
      key: env["PERSONALIZER_API_KEY_MULTI_SLOT"] ?? "",
    });
    if (!(await isMultiSlotEnabledAsync(client))) {
      await enableMultiSlotAsync(client);
    }
  });

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("rank with no context features", async function () {
    const actions = getActions();
    const slots = getSlots();
    const eventId = "123456789";
    const response = await client
      .path("/multislot/rank")
      .post({ body: { actions: actions, slots: slots, eventId: eventId } });
    if (isUnexpected(response)) {
      throw response.body.error.code;
    }

    assert.equal(response.body.eventId, eventId);
    assert.exists(response.body.slots);
    assert.equal(slots.length, response.body.slots?.length);
    assert.equal(
      0,
      response.body.slots?.findIndex((slot) => slot.rewardActionId === "NewsArticle")
    );
    assert.equal(
      1,
      response.body.slots?.findIndex((slot) => slot.rewardActionId === "SportsArticle")
    );
  });

  it("rank with context features", async function () {
    const actions = getActions();
    const slots = getSlots();
    const response = await client
      .path("/multislot/rank")
      .post({ body: { actions: actions, slots: slots, contextFeatures: getContextFeatures() } });
    if (isUnexpected(response)) {
      throw response.body.error.code;
    }
    const responseBody = response.body;
    const responseSlots = responseBody.slots as Array<SlotResponseOutput>;
    assert.equal(slots.length, responseSlots.length);
    assert.equal("NewsArticle", responseSlots[0].rewardActionId);
    assert.equal("SportsArticle", responseSlots[1].rewardActionId);
  });
});

function getActions(): RankableAction[] {
  return [
    { id: "NewsArticle", features: [{ type: "News" }] },
    { id: "SportsArticle", features: [{ type: "Sports" }] },
    { id: "EntertainmentArticle", features: [{ type: "Entertainment" }] },
  ];
}

function getContextFeatures() {
  return [
    { User: { ProfileType: "AnonymousUser", LatLong: "47.6,-122.1" } },
    { Environment: { DayOfMonth: "28", MonthOfYear: "8", Weather: "Sunny" } },
    { Device: { Mobile: true, Windows: true } },
    { RecentActivity: { ItemsInCart: 3 } },
  ];
}

function getSlots(): SlotRequest[] {
  return [getSlotRequest1(), getSlotRequest2()];
}

function getSlotRequest1(): SlotRequest {
  return {
    id: "Main Article",
    baselineAction: "NewsArticle",
    features: [{ Size: "Large", Position: "Top Middle" }],
    excludedActions: ["SportsArticle", "EntertainmentArticle"],
  };
}

function getSlotRequest2(): SlotRequest {
  return {
    id: "Side Bar",
    baselineAction: "SportsArticle",
    features: [{ Size: "Small", Position: "Bottom Right" }],
    excludedActions: ["EntertainmentArticle"],
  };
}
