// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as childProcess from "child_process";
import * as path from "path";
import kill from "tree-kill";

let serverProcess: childProcess.ChildProcess;

before(function(done) {
    serverProcess = childProcess.spawn(path.join(__dirname, "../../node_modules/.bin/ts-node"), ["-T", "testserver", "--no-webpack"], { shell: true });
    const dataListener = () => {
        serverProcess.stdout.removeListener("data", dataListener);
        serverProcess.stderr.removeListener("data", dataListener);
        done();
    };
    serverProcess.stdout.on("data", dataListener);
    serverProcess.stderr.on("data", dataListener);
    serverProcess.on("error", err => {
        console.error(err);
        done(err);
    });
});

after(function() {
    serverProcess.stdout.destroy();
    serverProcess.stderr.destroy();
    console.log(`kill ${serverProcess.pid}`);
    kill(serverProcess.pid);
});
