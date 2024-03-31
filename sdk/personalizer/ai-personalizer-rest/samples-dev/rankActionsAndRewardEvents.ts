// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a Personalizer client to rank actions and reward the presented action.
 */
import createPersonalizerClient, {
  isUnexpected,
  PersonalizerErrorOutput,
  RankableAction,
  RankRequest,
} from "@azure-rest/ai-personalizer";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const endpoint = process.env.PERSONALIZER_ENDPOINT || "<endpoint>";
  const key = process.env.PERSONALIZER_API_KEY || "<test-key>";

  const client = createPersonalizerClient(endpoint, { key });

  // The list of actions (videos in this case) to be ranked with metadata associated for each action.
  const actions: RankableAction[] = [
    {
      id: "Video1",
      features: [
        { videoType: "documentary", videoLength: 35, director: "CarlSagan" },
        { mostWatchedByAge: "50-55" },
      ],
    },
    {
      id: "Video2",
      features: [
        { videoType: "movie", videoLength: 120, director: "StevenSpielberg" },
        { mostWatchedByAge: "40-45" },
      ],
    },
  ];

  // The current context
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
  const request: RankRequest = {
    actions: actions,
    contextFeatures: contextFeatures,
  };

  log("Sending rank request");
  const rankResponse = await client.path("/rank").post({ body: request });
  if (isUnexpected(rankResponse)) {
    throw rankResponse.body.error;
  }

  const rankOutput = rankResponse.body;
  const eventId = rankOutput.eventId as string;
  log(
    `Rank returned response with event id ${eventId} and recommended ${rankOutput.rewardActionId} as the best action`,
  );

  // The event response will be determined by how the user interacted with the action that was presented to them.
  // Let us say that they like the action and so we associate a reward of 1.
  log("Sending reward event");
  const eventResponse = await client
    .path("/events/{eventId}/reward", eventId)
    .post({ body: { value: 1 } });
  if (isUnexpected(eventResponse)) {
    throw eventResponse.body.error;
  }

  log("Completed sending reward response");
}

function log(message: string) {
  console.log(message);
}

main().catch((err: PersonalizerErrorOutput) => {
  console.error(
    `The sample encountered an error with code: ${err.code} and message: ${err.message}`,
  );
});
