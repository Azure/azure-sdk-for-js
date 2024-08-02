// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createReadStream } from "fs";
import { matrix } from "@azure-tools/test-utils";
import { describe, it, beforeAll } from "vitest";
import { createClient } from "../utils/createClient.js";
import OpenAI, { AzureOpenAI } from "openai";
import {
  APIMatrix,
  APIVersion,
  DeploymentInfo,
  getDeployments,
  withDeployments,
} from "../utils/utils.js";
import { assertAudioResult } from "../utils/asserts.js";
import { AudioResultFormat } from "../utils/audioTypes.js";
import { whisperModels } from "../utils/models.js";

describe("OpenAI", function () {
  matrix([APIMatrix] as const, async function (authMethod: APIVersion) {
    describe(`[${authMethod}] Client`, () => {
      let client: AzureOpenAI | OpenAI;
      let deployments: DeploymentInfo[] = [];

      beforeAll(async function () {
        deployments = await getDeployments("audio");
      });

      describe("getAudioTranscription", function () {
        it(`returns json transcription if responseFormat wasn't specified`, async function () {
          const file = createReadStream(`./assets/audio/countdown.mp3`);
          await withDeployments(
            deployments,
            (deployment) => {
              client = createClient(authMethod, "audio", { deployment });
              return client.audio.transcriptions.create({ model: "", file });
            },
            (audio) => assertAudioResult("json", audio),
            whisperModels,
          );
        });
      });

      describe("getAudioTranslation", function () {
        it(`returns json translation if responseFormat wasn't specified`, async function () {
          const file = createReadStream(`./assets/audio/countdown.mp3`);
          await withDeployments(
            deployments,
            (deployment) => {
              client = createClient(authMethod, "audio", { deployment });
              return client.audio.translations.create({ model: "", file });
            },
            (audio) => assertAudioResult("json", audio),
            whisperModels,
          );
        });
      });

      matrix(
        [
          ["json", "verbose_json", "srt", "vtt", "text"],
          ["m4a", "mp3", "wav", "ogg", "flac", "webm", "mp4", "mpeg", "oga", "mpga"],
        ] as const,
        async function (format: AudioResultFormat, extension: string) {
          describe("getAudioTranscription", function () {
            it(`returns ${format} transcription for ${extension} files`, async function () {
              const file = createReadStream(`./assets/audio/countdown.${extension}`);
              await withDeployments(
                deployments,
                (deployment) => {
                  client = createClient(authMethod, "audio", { deployment });
                  return client.audio.transcriptions.create({
                    model: "",
                    file,
                    response_format: format,
                  });
                },
                (audio) => assertAudioResult(format, audio),
                whisperModels,
              );
            });
          });

          describe("getAudioTranslation", function () {
            it(`returns ${format} translation for ${extension} files`, async function () {
              const file = createReadStream(`./assets/audio/countdown.${extension}`);
              await withDeployments(
                deployments,
                (deployment) => {
                  client = createClient(authMethod, "audio", { deployment });
                  return client.audio.translations.create({
                    model: "",
                    file,
                    response_format: format,
                  });
                },
                (audio) => assertAudioResult(format, audio),
                whisperModels,
              );
            });
          });
        },
      );
    });
  });
});
