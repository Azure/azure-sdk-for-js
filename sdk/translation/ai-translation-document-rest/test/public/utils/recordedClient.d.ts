import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { ClientOptions } from "@azure-rest/core-client";
import { DocumentTranslationClient } from "../../../src";
export declare function startRecorder(context: Context): Promise<Recorder>;
export declare function createDocumentTranslationClient(options: {
    recorder?: Recorder;
    clientOptions?: ClientOptions;
}): Promise<DocumentTranslationClient>;
//# sourceMappingURL=recordedClient.d.ts.map