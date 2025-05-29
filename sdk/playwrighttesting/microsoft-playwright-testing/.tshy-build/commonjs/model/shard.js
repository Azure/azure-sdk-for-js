"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRunStatus = exports.TestResultStatus = exports.TestRunSummary = exports.Shard = void 0;
class Shard {
}
exports.Shard = Shard;
class TestRunSummary {
}
exports.TestRunSummary = TestRunSummary;
var TestResultStatus;
(function (TestResultStatus) {
    TestResultStatus["PASSED"] = "passed";
    TestResultStatus["FAILED"] = "failed";
    TestResultStatus["TIMEDOUT"] = "timedout";
    TestResultStatus["INTERRUPTED"] = "interrupted";
})(TestResultStatus || (exports.TestResultStatus = TestResultStatus = {}));
var TestRunStatus;
(function (TestRunStatus) {
    TestRunStatus["RUNNING"] = "RUNNING";
    TestRunStatus["CLIENT_COMPLETE"] = "CLIENT_COMPLETE";
})(TestRunStatus || (exports.TestRunStatus = TestRunStatus = {}));
//# sourceMappingURL=shard.js.map