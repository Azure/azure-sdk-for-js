// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as childProcess from "child_process";
import * as path from "path";

let serverProcess: childProcess.ChildProcess;

before(function(done) {
    serverProcess = childProcess.spawn(path.join(__dirname, "../../node_modules/.bin/ts-node"), ["testserver", "--no-webpack"], { shell: true });
    const dataListener = function() { done(); serverProcess.stdout.removeListener("data", dataListener); };
    serverProcess.stdout.on("data", dataListener);
    serverProcess.stderr.on("data", dataListener);
    serverProcess.on("error", function(err) { done(err); });
});

after(function() {
    serverProcess.stdout.destroy();
    serverProcess.stderr.destroy();
    serverProcess.kill();
});
