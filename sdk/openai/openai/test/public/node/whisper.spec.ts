// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createReadStream } from "node:fs";
import { matrix } from "@azure-tools/test-utils-vitest";
import { describe, it, beforeEach } from "vitest";
import { createClientsAndDeployments } from "../../utils/createClients.js";
import {
  APIMatrix,
  type APIVersion,
  maxRetriesOption,
  withDeployments,
} from "../../utils/utils.js";
import { assertAudioResult } from "../../utils/asserts.js";
import type { AudioResultFormat } from "../../utils/audioTypes.js";
import type { ClientsAndDeploymentsInfo } from "../../utils/types.js";

describe("Whisper", function () {
  matrix([APIMatrix] as const, async function (apiVersion: APIVersion) {
    describe(`[${apiVersion}] Client`, () => {
      let clientsAndDeployments: ClientsAndDeploymentsInfo;

      beforeEach(async () => {
        clientsAndDeployments = createClientsAndDeployments(
          apiVersion,
          { audio: "true" },
          { sku: { capacity: 30 } },
        );
      });

      describe("audio.transcriptions.create", function () {
        it(`returns json transcription if responseFormat wasn't specified`, async function () {
          await withDeployments(
            clientsAndDeployments,
            (client, deployment) => {
              const file = createReadStream(`./assets/audio/countdown.mp3`);
              return client.audio.transcriptions.create(
                { model: deployment, file },
                maxRetriesOption,
              );
            },
            (audio) => assertAudioResult("json", audio),
          );
        });
      });

      describe("audio.translations.create", function () {
        it(`returns json translation if responseFormat wasn't specified`, async function () {
          await withDeployments(
            clientsAndDeployments,
            (client, deployment) => {
              const file = createReadStream(`./assets/audio/countdown.mp3`);
              return client.audio.translations.create(
                { model: deployment, file },
                maxRetriesOption,
              );
            },
            (audio) => assertAudioResult("json", audio),
          );
        });
      });

      matrix(
        [
          ["json", "verbose_json", "text"],
          ["mp3", "mp4"],
        ] as const,
        async function (format: AudioResultFormat, extension: string) {
          describe("audio.transcriptions.create", function () {
            it(`returns ${format} transcription for ${extension} files`, async function () {
              await withDeployments(
                clientsAndDeployments,
                (client, deployment) => {
                  const file = createReadStream(`./assets/audio/countdown.${extension}`);
                  return client.audio.transcriptions.create(
                    {
                      model: deployment,
                      file,
                      response_format: format,
                    },
                    maxRetriesOption,
                  );
                },
                (audio) => assertAudioResult(format, audio),
              );
            });
          });

          describe("audio.translations.create", function () {
            it(`returns ${format} translation for ${extension} files`, async function () {
              await withDeployments(
                clientsAndDeployments,
                (client, deployment) => {
                  const file = createReadStream(`./assets/audio/countdown.${extension}`);
                  return client.audio.translations.create(
                    {
                      model: deployment,
                      file,
                      response_format: format,
                    },
                    maxRetriesOption,
                  );
                },
                (audio) => assertAudioResult(format, audio),
              );
            });
          });
        },
      );
    });
  });
});
