// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createReadStream } from "fs";
import { matrix } from "@azure-tools/test-utils-vitest";
import { describe, it, beforeAll } from "vitest";
import { createClient } from "../utils/createClient.js";
import OpenAI, { AzureOpenAI } from "openai";
import {
  APIMatrix,
  APIVersion,
  DeploymentInfo,
  getDeployments,
  maxRetriesOption,
  withDeployments,
} from "../utils/utils.js";
import { assertAudioResult } from "../utils/asserts.js";
import { AudioResultFormat } from "../utils/audioTypes.js";
import { whisperModelsToSkip } from "../utils/models.js";

describe("OpenAI", function () {
  matrix([APIMatrix] as const, async function (apiVersion: APIVersion) {
    describe(`[${apiVersion}] Client`, () => {
      let client: AzureOpenAI | OpenAI;
      let deployments: DeploymentInfo[] = [];

      // TODO: Change to "audio" deployments once retry behavior is fixed
      beforeAll(async function () {
        deployments = await getDeployments("vision");
      });

      describe("getAudioTranscription", function () {
        it(`returns json transcription if responseFormat wasn't specified`, async function () {
          await withDeployments(
            deployments,
            (deployment) => {
              const file = createReadStream(`./assets/audio/countdown.mp3`);
              client = createClient(apiVersion, "vision", { deployment });
              return client.audio.transcriptions.create({ model: "", file }, maxRetriesOption);
            },
            (audio) => assertAudioResult("json", audio),
            whisperModelsToSkip,
          );
        });
      });

      describe("getAudioTranslation", function () {
        it(`returns json translation if responseFormat wasn't specified`, async function () {
          await withDeployments(
            deployments,
            (deployment) => {
              const file = createReadStream(`./assets/audio/countdown.mp3`);
              client = createClient(apiVersion, "vision", { deployment });
              return client.audio.translations.create({ model: "", file }, maxRetriesOption);
            },
            (audio) => assertAudioResult("json", audio),
            whisperModelsToSkip,
          );
        });
      });

      matrix(
        [
          ["json", "verbose_json", "text"],
          ["mp3", "mp4"],
        ] as const,
        async function (format: AudioResultFormat, extension: string) {
          describe("getAudioTranscription", function () {
            it(`returns ${format} transcription for ${extension} files`, async function () {
              await withDeployments(
                deployments,
                (deployment) => {
                  const file = createReadStream(`./assets/audio/countdown.${extension}`);
                  client = createClient(apiVersion, "vision", { deployment });
                  return client.audio.transcriptions.create(
                    {
                      model: "",
                      file,
                      response_format: format,
                    },
                    maxRetriesOption,
                  );
                },
                (audio) => assertAudioResult(format, audio),
                whisperModelsToSkip,
              );
            });
          });

          describe("getAudioTranslation", function () {
            it(`returns ${format} translation for ${extension} files`, async function () {
              await withDeployments(
                deployments,
                (deployment) => {
                  const file = createReadStream(`./assets/audio/countdown.${extension}`);
                  client = createClient(apiVersion, "vision", { deployment });
                  return client.audio.translations.create(
                    {
                      model: "",
                      file,
                      response_format: format,
                    },
                    maxRetriesOption,
                  );
                },
                (audio) => assertAudioResult(format, audio),
                whisperModelsToSkip,
              );
            });
          });
        },
      );
    });
  });
});
