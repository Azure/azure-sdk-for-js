// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a Personalizer client to rank actions for multiple slots and reward the presented action.
 */
import Personalizer, {
  ErrorResponseOutput,
  MultiSlotRankRequest,
  MultiSlotRankResponseOutput,
  PersonalizerErrorOutput,
  RankableAction,
  SlotRequest,
  SlotResponseOutput,
} from "@azure-rest/ai-personalizer";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const endpoint = process.env.PERSONALIZER_ENDPOINT || "<endpoint>";
  const key = process.env.PERSONALIZER_API_KEY || "<test-key>";

  const client = Personalizer(endpoint, { key: key });

  const request: MultiSlotRankRequest = {
    slots: getSlots(),
    actions: getActions(),
    contextFeatures: getContextFeatures(),
  };

  console.log("Sending multi-slot rank request");
  const rankResponse = await client.path("/multislot/rank").post({ body: request });
  if (rankResponse.status != "201") {
    const error = rankResponse.body as ErrorResponseOutput;
    throw error.error;
  }
  const rankOutput = rankResponse.body as MultiSlotRankResponseOutput;
  const eventId = rankOutput.eventId as string;
  const slotResponses = rankOutput.slots as SlotResponseOutput[];
  console.log(`Rank returned response with event id ${eventId} and recommended the following:`);
  slotResponses.forEach(function (slotResponse) {
    console.log(`Action ${slotResponse.rewardActionId} for slot ${slotResponse.id}`);
  });

  // The event response will be determined by how the user interacted with the action that was presented to them.
  // Let us say that they like the action presented to them for the Main Article slot and so we associate a reward of 1.
  console.log("Sending reward event for slot 1");
  const eventResponse = await client
    .path("/multislot/events/{eventId}/reward", eventId)
    .post({ body: { reward: [{ slotId: "Main Article", value: 1 }] } });
  if (eventResponse.status != "204") {
    const error = eventResponse.body as ErrorResponseOutput;
    throw error.error;
  }
  
  console.log("Completed sending reward response");
}

// We want to rank the actions for two slots.
function getSlots(): SlotRequest[] {
  return [
    {
      id: "Main Article",
      baselineAction: "NewsArticle",
      features: [{ Size: "Large", Position: "Top Middle" }],
    },
    {
      id: "Side Bar",
      baselineAction: "SportsArticle",
      features: [{ Size: "Small", Position: "Bottom Right" }],
    },
  ];
}

// The list of actions to be ranked with metadata associated for each action.
function getActions(): RankableAction[] {
  return [
    { id: "NewsArticle", features: [{ type: "News" }] },
    { id: "SportsArticle", features: [{ type: "Sports" }] },
    { id: "EntertainmentArticle", features: [{ type: "Entertainment" }] },
  ];
}

// The current context.
function getContextFeatures() {
  return [
    { User: { ProfileType: "AnonymousUser", LatLong: "47.6,-122.1" } },
    { Environment: { DayOfMonth: "28", MonthOfYear: "8", Weather: "Sunny" } },
    { Device: { Mobile: true, Windows: true } },
    { RecentActivity: { ItemsInCart: 3 } },
  ];
}

main().catch((err: PersonalizerErrorOutput) => {
  console.error(
    `The sample encountered an error with code: ${err.code} and message: ${err.message}`
  );
});
