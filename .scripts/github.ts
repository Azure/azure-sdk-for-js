/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as Octokit from '@octokit/rest'
import { PullRequestsCreateParams, Response } from '@octokit/rest';
import { getToken } from './git';

export async function createPullRequest(repositoryName: string, pullRequestTitle: string, body: string, sourceBranchName: string, destinationBranchName: string = "master"): Promise<Response<Octokit.PullRequestsCreateResponse>> {
    const octokit = new Octokit();
    octokit.authenticate({ type: "token", token: getToken() });
    const prOptions: PullRequestsCreateParams = {
        owner: "Azure",
        repo: repositoryName,
        title: pullRequestTitle,
        head: sourceBranchName,
        base: destinationBranchName,
        body: body
    };

    return octokit.pullRequests.create(prOptions);
}