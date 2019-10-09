// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as helloworld from "./helloworld";
import * as helloworldWithLabels from "./helloworldWithLabels";
import * as setReadOnlySample from "./setReadOnlySample";
import * as getSettingOnlyIfChanged from "./getSettingOnlyIfChanged";
import * as optimisticConcurrencyViaEtag from "./optimisticConcurrencyViaEtag";

export async function runAll() {
    await helloworld.run();
    await helloworldWithLabels.run();
    await setReadOnlySample.run();
    await getSettingOnlyIfChanged.run();
    await optimisticConcurrencyViaEtag.run();
}