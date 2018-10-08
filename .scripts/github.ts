/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as Octokit from '@octokit/rest'
import { PullRequestsCreateParams } from '@octokit/rest';

export async function createPullRequest(repositoryName: string, pullRequestTitle: string, sourceBranchName: string, destinationBranchName: string = "master") {
    const octokit = new Octokit();
    octokit.authenticate({ type: "token", token: process.env.SDK_GEN_GITHUB_TOKEN });
    const prOptions: PullRequestsCreateParams = {
        owner: "Azure",
        repo: repositoryName,
        title: pullRequestTitle,
        head: sourceBranchName,
        base: destinationBranchName
    };

    await octokit.pullRequests.create(prOptions);
}