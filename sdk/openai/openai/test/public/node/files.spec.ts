// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import { AnyApiVersion, APIMatrix, DeploymentType } from "../utils/utils.js";
import { assert, describe, it } from "vitest";
import "openai/shims/node";
import OpenAI, { AzureOpenAI } from "openai";
import { createClient } from "../utils/createClient.js";
import { FilePurpose } from "openai/resources/index";
import { APIError } from "openai/error.mjs";
import * as fs from "fs";
import { createFile, getName } from "./utils.js";
import { unlink } from "fs/promises";

const FileAPIInfo = {
  batch: { sizeLimit: 200, beta: true },
  vision: { sizeLimit: 200, beta: true },
  assistants: { sizeLimit: 512, beta: true },
  "fine-tune": { sizeLimit: 512, beta: false },
};

const purposes = Object.keys(FileAPIInfo) as FilePurpose[];
const sizes = [...new Set(Object.values(FileAPIInfo).map((x) => x.sizeLimit))];

const resourceType: DeploymentType = "vision";

describe("OpenAI", function () {
  matrix([APIMatrix], async function (apiVersion: AnyApiVersion) {
    describe(`[${apiVersion.name}] Client`, function () {
      let client: AzureOpenAI | OpenAI;

      describe("create", { timeout: 3600000 }, function () {
        matrix([sizes, purposes] as const, async function (size, purpose) {
          it(`${size} MB file - [${purpose}]`, async function () {
            if (purpose === "vision" || (purpose !== "fine-tune" && !apiVersion.beta)) {
              return;
            }
            client = createClient(apiVersion, resourceType);
            const fileName = getName(purpose, size);
            await createFile(purpose, size);
            try {
              const fileObj = await client.files.create({
                purpose,
                file: fs.createReadStream(fileName),
              });
              await client.files.del(fileObj.id);
            } catch (error) {
              if (error instanceof APIError) {
                if (error.code === "quotaExceeded") {
                  return;
                } else if (FileAPIInfo[purpose].sizeLimit < size) {
                  assert.equal(error.status, 400);
                } else {
                  throw error;
                }
              } else {
                throw error;
              }
            } finally {
              await unlink(fileName);
            }
          });
        });
      });
    });
  });
});
