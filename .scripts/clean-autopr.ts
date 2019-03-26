/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import { exec as execWithCallback } from "child_process";
import { getAuthenticatedClient } from "./github";
import { PullRequestsGetAllParams } from "@octokit/rest";

const _repositoryOwner = "Azure";

async function cleanBranches() {
    const octokit = getAuthenticatedClient();
    const params: PullRequestsGetAllParams = {
        owner: _repositoryOwner,
        repo: "azure-sdk-for-js",
        state: "open"
    }

    let pullRequestsResponse = await octokit.pullRequests.getAll(params);

    do {
        const autoPullRequests = pullRequestsResponse.data.filter(pr => pr.title.startsWith("[AutoPR")).map(pr => pr.head.ref);
        console.log(JSON.stringify(autoPullRequests, undefined, "  "));
        console.log(JSON.stringify(autoPullRequests.length, undefined, "  "));

        for (const branch of autoPullRequests) {
            try {
                await exec(`git push origin :${branch}`);
            } catch (err) {
                console.log(`Branch ${branch} doesn't exist. Skipping. Error: [${err}]`);
            }
        }

        if (octokit.hasFirstPage(pullRequestsResponse)) {
            pullRequestsResponse = await octokit.getNextPage(pullRequestsResponse);
        } else {
            break;
        }
    } while (true);
}

try {
    cleanBranches();
} catch (err) {
    console.error(err);
}

async function exec(command: string): Promise<any> {
    console.log(`Executing ${command}`);
    return new Promise((resolve, reject) => {
        execWithCallback(command, (error, stdout) => {
            if (error) {
                reject(error);
            }

            resolve(stdout);
        });
    });
}
