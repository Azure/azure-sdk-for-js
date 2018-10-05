/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import { SdkType } from "./commandLine";
import { findAzureRestApiSpecsRepository, findSdkDirectory, saveContentToFile } from "./generateSdks";
import { copyExistingNodeJsReadme, updateTypeScriptReadmeFile } from "./readme";

export async function generateTsReadme(packageName: string, sdkType: SdkType) {
    const azureRestApiSpecsRepository: string = await findAzureRestApiSpecsRepository();
    console.log(`Found azure-rest-api-specs repository in ${azureRestApiSpecsRepository}`);

    const sdkPath: string = await findSdkDirectory(azureRestApiSpecsRepository, packageName, sdkType);
    console.log(`Found specification in ${sdkPath}`);

    const typescriptReadmePath: string = await copyExistingNodeJsReadme(sdkPath);
    console.log(`Copied readme file successfully`);

    const newContent: string = await updateTypeScriptReadmeFile(typescriptReadmePath);
    console.log(`Generated content of the new readme file successfully`);

    await saveContentToFile(typescriptReadmePath, newContent);
    console.log(`Content saved successfully to ${typescriptReadmePath}`);
}
