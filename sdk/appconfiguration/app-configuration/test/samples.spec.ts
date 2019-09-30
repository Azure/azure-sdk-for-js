// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { runAll } from "../samples";

describe("AppConfiguration samples", () => {
    it("Make sure all the samples build and run", async () => {
        await runAll();
    });
});