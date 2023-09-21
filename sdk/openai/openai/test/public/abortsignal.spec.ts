// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { OpenAIClient } from "../../src/index.js";
import { createClient } from "./utils/recordedClient.js";
// import { ChatMessage } from "../../src/index.js";
import { AbortSignalLike } from "@azure/abort-controller";
describe("README samples", () => {
  let client: OpenAIClient;

  beforeEach(async function (this: Context) {
    client = createClient("AzureAPIKey", {});
  });

  it.only("Abort signal test", async function () {

    const messages = [
      { role: "system", content: "You are a helpful assistant. You will talk like a pirate." },
      { role: "user", content: "Can you help me?" },
      { role: "assistant", content: "Arrrr! Of course, me hearty! What can I do for ye?" },
      { role: "user", content: "What's the best way to train a parrot?" },
    ];

    // class AzureClient {
    //   private currentMessage: string;
    //   private client: OpenAIClient;

    //   constructor() {
    //     this.client = client;
    //     this.currentMessage = "";
    //   }

    //   async createChatCompletion(messages: ChatMessage[]): Promise<string> {
    //     const deploymentName = "gpt-35-turbo";
    //     abortController = new AbortController();
    //     const abortSignal = abortController.signal;

    //     try {
    //       const events = this.client.listChatCompletions(deploymentName, messages, {
    //         maxTokens: 800,
    //         temperature: 0.7,
    //         presencePenalty: 0,
    //         frequencyPenalty: 0,
    //         abortSignal: abortSignal as AbortSignalLike,
    //       });
    //       console.log("finish call to list chat complete")
    //       for await (const event of events) {
    //         console.log("getting events")
    //         for (const choice of event.choices) {
    //           const delta = choice.delta?.content;
    //           if (delta !== undefined) {
    //             this.currentMessage += delta;
    //           }
    //         }
    //       }
    //       console.log("finished message", this.currentMessage)
    //       return this.currentMessage;
    //     } catch (error) {
    //       console.error(error);
    //       if (abortSignal.aborted) {
    //         console.log("Request aborted");
    //         return "ABORTED";
    //       } else {
    //         console.log("Something went wrong");
    //         return "OFF"
    //       }
    //     }
    //   }

    //   abortChatCompletion(): void {
    //     console.log("check abort controller null or not:", abortController === null)
    //     if (abortController) {
    //       console.log("abort")
    //       abortController.abort();
    //       abortController = null;
    //     }
    //   }
    // }

    // const testClient = new AzureClient();
    // Promise.all([new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(testClient.abortChatCompletion())
    //   }, 10000)
    // }), new Promise((resolve) => {
    //   setTimeout(() => { resolve(testClient.createChatCompletion(messages))}, 10)
    // })]).then((values) => {
    //   console.log(values)
    // })

    const deploymentName = "gpt-35-turbo";
    const abortController = new AbortController();
    const abortSignal = abortController.signal;

    try {
      const events = client.listChatCompletions(deploymentName, messages, {
        maxTokens: 800,
        temperature: 0.7,
        presencePenalty: 0,
        frequencyPenalty: 0,
        abortSignal: abortSignal as AbortSignalLike,
      });
      console.log("finish call to list chat complete")
      for await (const event of events) {
        for (const choice of event.choices) {
          console.log("getting events", choice)
          const delta = choice.delta?.content;
          abortController.abort()
          console.log("ABORTED")
          if (delta !== undefined) {
            this.currentMessage += delta;
          }
        }
      }
      console.log("finished message", this.currentMessage)
      return this.currentMessage;
    } catch (error) {
      console.error(error);
      if (abortSignal.aborted) {
        console.log("Request aborted");
      } else {
        console.log("Something went wrong");
      }
    }
  });
});
