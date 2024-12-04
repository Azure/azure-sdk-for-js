// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable, isPlaybackMode } from "@azure-tools/test-recorder";
import type { TextAnalysisClient } from "../../src/index.js";
import { AnalyzeBatchActionNames, AzureKeyCredential } from "../../src/index.js";
import { matrix } from "@azure-tools/test-utils-vitest";
import type { AuthMethod } from "../public/utils/recordedClient.js";
import { createClient, startRecorder } from "../public/utils/recordedClient.js";
import type { TextAuthoringClient } from "@azure/ai-language-textauthoring";
import createAuthoringClient from "@azure/ai-language-textauthoring";
import { createCustomTestProject } from "../public/utils/customTestHelpter.js";
import { assertActionsResults } from "../public/utils/resultHelper.js";
import { expectation1, expectation2, expectation4 } from "../public/expectations.js";
import { authModes } from "../public/inputs.js";
import { describe, it, beforeEach, afterEach, beforeAll } from "vitest";

matrix(authModes, async (authMethod: AuthMethod) => {
  describe(`[${authMethod}] TextAnalysisClient`, () => {
    let recorder: Recorder;
    let client: TextAnalysisClient;
    let authoringClient: TextAuthoringClient;

    describe("analyzeBatch", () => {
      const pollingInterval = isPlaybackMode() ? 0 : 2000;

      // TODO: Fix the tests. Tracking issue https://github.com/Azure/azure-sdk-for-js/issues/30395
      describe.skip("custom", () => {
        let projectName: string;
        let deploymentName: string;

        beforeAll(() => {
          if (isPlaybackMode()) {
            return;
          }
          // Create authoring client
          const endpoint = assertEnvironmentVariable("ENDPOINT");
          const apiKey = assertEnvironmentVariable("LANGUAGE_API_KEY");
          authoringClient = createAuthoringClient(endpoint, new AzureKeyCredential(apiKey));
        });

        describe("entity recognition action", () => {
          beforeAll(async () => {
            projectName = "EntityRecognition";
            deploymentName = "EntityDeployment";

            if (isPlaybackMode()) {
              return;
            }

            await createCustomTestProject(
              authoringClient,
              "CustomEntityRecognition",
              projectName,
              deploymentName,
            );
          });

          beforeEach(async (ctx) => {
            recorder = await startRecorder(ctx);
            client = createClient(authMethod, {
              recorder,
            });
          });

          afterEach(async () => {
            await recorder.stop();
          });

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
          beforeAll(async () => {
            projectName = "SingleLabel";
            deploymentName = "SingleLabelDeployment";

            if (isPlaybackMode()) {
              return;
            }

            await createCustomTestProject(
              authoringClient,
              "CustomSingleLabelClassification",
              projectName,
              deploymentName,
            );
          });

          beforeEach(async (ctx) => {
            recorder = await startRecorder(ctx);
            client = createClient(authMethod, {
              recorder,
            });
          });

          afterEach(async () => {
            await recorder.stop();
          });

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
          beforeAll(async () => {
            projectName = "MultiLabel";
            deploymentName = "MultiLabelDeployment";

            if (isPlaybackMode()) {
              return;
            }

            await createCustomTestProject(
              authoringClient,
              "CustomMultiLabelClassification",
              projectName,
              deploymentName,
            );
          });

          beforeEach(async (ctx) => {
            recorder = await startRecorder(ctx);
            client = createClient(authMethod, {
              recorder,
            });
          });

          afterEach(async () => {
            await recorder.stop();
          });

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
});
