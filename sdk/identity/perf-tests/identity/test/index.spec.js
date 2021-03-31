"use strict";
exports.__esModule = true;
var test_utils_perfstress_1 = require("@azure/test-utils-perfstress");
var persistence_spec_1 = require("./DeviceCodeCredential/persistence.spec");
console.log("=== Starting the perfStress test ===");
var perfStressProgram = new test_utils_perfstress_1.PerfStressProgram(test_utils_perfstress_1.selectPerfStressTest([persistence_spec_1.DeviceCodeCredentialPersistenceTest]));
perfStressProgram.run();
