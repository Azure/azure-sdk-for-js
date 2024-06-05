"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const src_1 = require("../../src");
const recordedClient_1 = require("./utils/recordedClient");
describe("GetSupportedFormats tests", () => {
    let recorder;
    let client;
    beforeEach(async function () {
        recorder = await (0, recordedClient_1.startRecorder)(this);
        client = await (0, recordedClient_1.createDocumentTranslationClient)({ recorder });
    });
    afterEach(async function () {
        await recorder.stop();
    });
    it("all formats", async () => {
        const response = await client.path("/document/formats").get();
        chai_1.assert.equal(response.status, "200");
        if ((0, src_1.isUnexpected)(response)) {
            throw response.body;
        }
        const fileFormatTypes = response.body;
        fileFormatTypes.value.forEach(fileFormatType => {
            chai_1.assert.isTrue(fileFormatType.format !== null);
            chai_1.assert.isTrue(fileFormatType.contentTypes !== null);
            chai_1.assert.isTrue(fileFormatType.fileExtensions !== null);
        });
    });
});
//# sourceMappingURL=getSupportedFormatsTest.spec.js.map