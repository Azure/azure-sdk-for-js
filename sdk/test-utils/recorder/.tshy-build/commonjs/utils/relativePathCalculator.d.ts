/**
 * Returns the potential `recordings` folder(relative path) for the project using `process.cwd()`.
 *
 * Note for browser tests:
 *    1. Supposed to be called from karma.conf.js in the package for which the testing is being done.
 *    2. Set this `RECORDINGS_RELATIVE_PATH` as an env variable
 *      ```js
 *        const { relativeRecordingsPathForBrowser } = require("@azure-tools/test-recorder-new");
 *        process.env.RECORDINGS_RELATIVE_PATH = relativeRecordingsPathForBrowser();
 *      ```
 *    3. Add "RECORDINGS_RELATIVE_PATH" in the `envPreprocessor` array to let this be loaded in the browser environment.
 *      ```
 *        envPreprocessor: ["RECORDINGS_RELATIVE_PATH"],
 *      ```
 *
 * `RECORDINGS_RELATIVE_PATH` in the browser environment is used in the recorder to tell the proxy-tool about the location to generate the browser recordings at.
 *
 * @export
 * @returns {string} location of the relative `recordings` folder path - `sdk/storage/storage-blob/recordings/` example
 */
export declare function relativeRecordingsPath(): string;
//# sourceMappingURL=relativePathCalculator.d.ts.map