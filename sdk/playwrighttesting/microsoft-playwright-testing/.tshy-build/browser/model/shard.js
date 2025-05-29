// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export class Shard {
}
export class TestRunSummary {
}
export var TestResultStatus;
(function (TestResultStatus) {
    TestResultStatus["PASSED"] = "passed";
    TestResultStatus["FAILED"] = "failed";
    TestResultStatus["TIMEDOUT"] = "timedout";
    TestResultStatus["INTERRUPTED"] = "interrupted";
})(TestResultStatus || (TestResultStatus = {}));
export var TestRunStatus;
(function (TestRunStatus) {
    TestRunStatus["RUNNING"] = "RUNNING";
    TestRunStatus["CLIENT_COMPLETE"] = "CLIENT_COMPLETE";
})(TestRunStatus || (TestRunStatus = {}));
//# sourceMappingURL=shard.js.map