// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as helloworld from "./helloworld";
import * as helloworldWithLabels from "./helloworldWithLabels";
import * as setReadOnlySample from "./setReadOnlySample";

export async function runAll() {
    await helloworld.run();
    await helloworldWithLabels.run();
    await setReadOnlySample.run();
}