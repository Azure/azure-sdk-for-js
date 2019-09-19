// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as helloworld from "./helloworld";
import * as helloworldWithLabels from "./helloworldWithLabels";

export async function runAll() {
    await helloworld.run();
    await helloworldWithLabels.run();
}