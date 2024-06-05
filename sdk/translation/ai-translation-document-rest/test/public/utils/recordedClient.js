"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocumentTranslationClient = exports.startRecorder = void 0;
const tslib_1 = require("tslib");
const test_recorder_1 = require("@azure-tools/test-recorder");
const documentTranslationClient_1 = tslib_1.__importDefault(require("../../../src/documentTranslationClient"));
const envSetupForPlayback = {
    DOCUMENT_TRANSLATION_API_KEY: "fakeApiKey",
    DOCUMENT_TRANSLATION_ENDPOINT: "https://fakeEndpoint-doctranslation.cognitive.microsofttranslator.com",
    DOCUMENT_TRANSLATION_STORAGE_NAME: "fakeStorageName",
    DOCUMENT_TRANSLATION_CONNECTION_STRING: "DefaultEndpointsProtocol=https;AccountName=fakeStorageName;AccountKey=fakeKey;EndpointSuffix=core.windows.net"
};
const recorderEnvSetup = {
    envSetupForPlayback,
};
async function startRecorder(context) {
    const recorder = new test_recorder_1.Recorder(context.currentTest);
    await recorder.start(recorderEnvSetup);
    return recorder;
}
exports.startRecorder = startRecorder;
async function createDocumentTranslationClient(options) {
    var _a, _b;
    const { recorder, clientOptions = {} } = options;
    const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;
    const endpoint = (_a = test_recorder_1.env.DOCUMENT_TRANSLATION_ENDPOINT) !== null && _a !== void 0 ? _a : "";
    const credentials = { key: (_b = test_recorder_1.env.DOCUMENT_TRANSLATION_API_KEY) !== null && _b !== void 0 ? _b : "" };
    const client = (0, documentTranslationClient_1.default)(endpoint, credentials, updatedOptions);
    return client;
}
exports.createDocumentTranslationClient = createDocumentTranslationClient;
//# sourceMappingURL=recordedClient.js.map