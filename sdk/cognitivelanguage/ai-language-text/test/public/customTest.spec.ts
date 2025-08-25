// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { TextAnalysisClient } from "@azure/ai-language-text";
import { AnalyzeBatchActionNames } from "@azure/ai-language-text";
import { createClient, startRecorder } from "./utils/recordedClient.js";
import { assertActionsResults } from "./utils/resultHelper.js";
import { expectation1, expectation2, expectation4 } from "./expectations.js";
import { authModes } from "./inputs.js";
import { describe, it, beforeEach, afterEach } from "vitest";
import {
  getEntityRecognitionDeploymentName,
  getEntityRecognitionProjectName,
  getMultiLabelClassificationDeploymentName,
  getMultiLabelClassificationProjectName,
  getSingleLabelClassificationDeploymentName,
  getSingleLabelClassificationProjectName,
  isLiveMode,
} from "../utils/injectables.js";

describe.each(authModes)(`[%s] TextAnalysisClient`, (authMethod) => {
  let recorder: Recorder;
  let client: TextAnalysisClient;

  describe("analyzeBatch", () => {
    const pollingInterval = isLiveMode() ? 2000 : 0;

    beforeEach(async (ctx) => {
      recorder = await startRecorder(ctx);
      const c = createClient(authMethod, {
        recorder,
      });
      if (!c) {
        ctx.skip();
      } else {
        client = c;
      }
    });

    afterEach(async () => {
      await recorder.stop();
    });

    describe("custom", () => {
      describe("entity recognition action", () => {
        const projectName = getEntityRecognitionProjectName();
        const deploymentName = getEntityRecognitionDeploymentName();

        it("entity recognition", async () => {
          const docs = [
            `This is a Loan agreement between the two individuals mentioned below in the parties section of the agreement. \nI. Parties of agreement:\n- Casey Jensen with a mailing address of 2469 Pennsylvania Avenue, City of New Brunswick, State of New Jersey (the "Borrower")\n- Hollie Rees with a mailing address of 42 Gladwell Street, City of Memphis, State of Tennessee (the "Lender")`,
            "The loan amount given by lender to borrower is one hundred ninety-two thousand nine hundred eighty-nine Dollars ($192,989.00). Any delay in payment is subject to a fine with a flat amount of $50 for every week the payment is delayed. All payments made by the Borrower shall be go into settling the the accrued interest and any late fess and then into the payment of the principal amount.",
          ];
          const poller = await client.beginAnalyzeBatch(
            [
              {
                kind: AnalyzeBatchActionNames.CustomEntityRecognition,
                deploymentName,
                projectName,
              },
            ],
            docs,
            "en",
            {
              updateIntervalInMs: pollingInterval,
            },
          );
          await assertActionsResults(await poller.pollUntilDone(), expectation1);
        });
      });

      describe("single label classification action", () => {
        const projectName = getSingleLabelClassificationProjectName();
        const deploymentName = getSingleLabelClassificationDeploymentName();

        it("single label classification action", async () => {
          const docs = [
            "A recent report by the Government Accountability Office (GAO) found that the dramatic increase in oil and natural gas development on federal lands over the past six years has stretched the staff of the BLM to a point that it has been unable to meet its environmental protection responsibilities.",
          ];
          const poller = await client.beginAnalyzeBatch(
            [
              {
                kind: AnalyzeBatchActionNames.CustomSingleLabelClassification,
                deploymentName,
                projectName,
              },
            ],
            docs,
            "en",
            {
              updateIntervalInMs: pollingInterval,
            },
          );
          await assertActionsResults(await poller.pollUntilDone(), expectation2);
        });
      });

      describe("multi label classification action", () => {
        const projectName = getMultiLabelClassificationProjectName();
        const deploymentName = getMultiLabelClassificationDeploymentName();

        it("multi label classification action", async () => {
          const docs = [
            "Rahul Dev  & Ria  met as they are independently travelling to Siliguri. Ria is running away to meet her boyfriend while Rahul’s reason is sell his steal. The destination however for both are the hills of Darjeeling. Rahul and Ria are bound by fate here onwards. They knowingly steps into each other's life as well as behind each other’s back as they travel, as Rahul hides his steal in Ria’s bag. It gets into the hands of a thief…… For Rahul the steal is the only hope, and that is something Ria realizes on visiting Rahul’s family.Things take a turn around when Ria is heart broken, as her relationship with her boyfriend falls apart. She offers to aid Rahul one hand and makes a deal with her father on the other. As things falls into place for one. The world shatters for the other. Couples are made in heaven…… Love becomes inevitable when two people cross each other’s path and passes through the good and the bad times. Rahul and Ria meet again but in an altogether different circumstances. This time neither is it in an alien land nor are they alone.But in the last,they both confess there love,and get married.",
          ];
          const poller = await client.beginAnalyzeBatch(
            [
              {
                kind: AnalyzeBatchActionNames.CustomMultiLabelClassification,
                deploymentName,
                projectName,
              },
            ],
            docs,
            "en",
            {
              updateIntervalInMs: pollingInterval,
            },
          );
          await assertActionsResults(await poller.pollUntilDone(), expectation4);
        });
      });
    });
  });
});
