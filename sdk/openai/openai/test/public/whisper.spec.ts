// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as fs from "fs";
import { matrix } from "@azure-tools/test-utils";
import { describe, it, beforeAll } from "vitest";
import { createClient } from "./utils/createClient.js";
import OpenAI, { AzureOpenAI } from "openai";
import {
  APIMatrix,
  APIVersion,
  DeploymentInfo,
  getDeployments,
  withDeployments,
} from "./utils/utils.js";
import { assertAudioResult } from "./utils/asserts.js";
import { AudioResultFormat } from "./utils/audioTypes.js";
import { whisperModels } from "./utils/models.js";

describe("OpenAI", function () {
  matrix([APIMatrix] as const, async function (authMethod: APIVersion) {
    describe(`[${authMethod}] Client`, () => {
      let client: AzureOpenAI | OpenAI;
      let deployments: DeploymentInfo[] = [];

      beforeAll(async function () {
        client = createClient(authMethod, "audio");
        deployments = await getDeployments("audio");
      });

      describe("getAudioTranscription", function () {
        it(`returns json transcription if responseFormat wasn't specified`, async function () {
          const file = fs.createReadStream(`./assets/audio/countdown.ogg`);
          await withDeployments(
            deployments,
            (deploymentName) => client.audio.transcriptions.create({ model: deploymentName, file }),
            (result) => assertAudioResult("json", result),
            whisperModels,
          );
        });
      });

      describe("getAudioTranslation", function () {
        it(`returns json translation if responseFormat wasn't specified`, async function () {
          const file = fs.createReadStream(`./assets/audio/countdown.ogg`);
          await withDeployments(
            deployments,
            (deploymentName) => client.audio.translations.create({ model: deploymentName, file }),
            (result) => assertAudioResult("json", result),
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
              const file = fs.createReadStream(`./assets/audio/countdown.${extension}`);
              withDeployments(
                deployments,
                (deploymentName) =>
                  client.audio.transcriptions.create({
                    model: deploymentName,
                    file,
                    response_format: format,
                  }),
                (result) => assertAudioResult(format, result),
                whisperModels,
              );
            });
          });

          describe("getAudioTranslation", function () {
            it(`returns ${format} translation for ${extension} files`, async function () {
              const file = fs.createReadStream(`./assets/audio/countdown.${extension}`);
              withDeployments(
                deployments,
                (deploymentName) =>
                  client.audio.translations.create({
                    model: deploymentName,
                    file,
                    response_format: format,
                  }),
                (result) => assertAudioResult(format, result),
                whisperModels,
              );
            });
          });
        },
      );
    });
  });
});
