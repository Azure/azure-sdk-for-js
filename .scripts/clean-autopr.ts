/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import { exec as execWithCallback } from "child_process";
import Octokit from "@octokit/rest";

export function getToken(): string {
    const token: string = process.env.SDK_GEN_GITHUB_TOKEN || "";
    _validatePersonalAccessToken(token);

    return token;
}

function _validatePersonalAccessToken(token: string): void {
    if (!token) {
        const text =
            `Github personal access token was not found as a script parameter or as an
        environmental variable. Please visit https://github.com/settings/tokens,
        generate new token with "repo" scope and pass it with -token switch or set
        it as environmental variable named SDK_GEN_GITHUB_TOKEN.`

        console.error(text);
    }
}

export function getAuthenticatedClient(): Octokit {
    const octokit = new Octokit({ auth: getToken()});
    return octokit;
}

async function cleanBranches() {
    const octokit = getAuthenticatedClient();
    const params: Octokit.PullsListParams = {
        owner: "Azure",
        repo: "azure-sdk-for-js",
        state: "open",
        per_page: 100
    }

    let pullRequestsResponse = await octokit.pulls.list(params);
    const autoPullRequests = pullRequestsResponse.data.filter(pr => pr.title.startsWith("[AutoPR")).map(pr => pr.head.ref);
    console.log(JSON.stringify(autoPullRequests, undefined, "  "));
    console.log(`Found ${autoPullRequests.length} branches`);

    for (const branch of autoPullRequests) {
        try {
            await exec(`git push origin :${branch}`);
        } catch (err) {
            console.log(`Branch ${branch} doesn't exist. Skipping. Error: [${err}]`);
        }
    }
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

try {
    cleanBranches();
} catch (err) {
    console.error(err);
}
