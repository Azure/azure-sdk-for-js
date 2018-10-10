/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as Octokit from '@octokit/rest'
import { PullRequestsCreateParams, Response, PullRequestsCreateReviewRequestParams, PullRequestsCreateReviewRequestResponse } from '@octokit/rest';
import { getToken, createNewUniqueBranch, commitSpecificationChanges, pushToNewBranch, waitAndLockGitRepository, unlockGitRepository, ValidateFunction, ValidateEachFunction } from './git';
import { getLogger } from './logger';
import { Repository } from 'nodegit';

const _repositoryOwner = "Azure";
const _logger = getLogger();

function getAuthenticatedClient(): Octokit {
    const octokit = new Octokit();
    octokit.authenticate({ type: "token", token: getToken() });
    return octokit;
}

export async function createPullRequest(repositoryName: string, pullRequestTitle: string, body: string, sourceBranchName: string, destinationBranchName: string = "master"): Promise<Response<Octokit.PullRequestsCreateResponse>> {
    const octokit = getAuthenticatedClient();
    const prOptions: PullRequestsCreateParams = {
        owner: _repositoryOwner,
        repo: repositoryName,
        title: pullRequestTitle,
        head: sourceBranchName,
        base: destinationBranchName,
        body: body
    };

    return new Promise<Response<Octokit.PullRequestsCreateResponse>>((resolve, reject) => {
        octokit.pullRequests.create(prOptions, (error, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
}

export async function requestPullRequestReview(repositoryName: string, prId: number): Promise<Response<PullRequestsCreateReviewRequestResponse>> {
    const octokit = getAuthenticatedClient();
    const params: PullRequestsCreateReviewRequestParams = {
        owner: _repositoryOwner,
        repo: repositoryName,
        number: prId,
        reviewers: [ "daschult", "amarzavery", "sergey-shandar" ]
    };

     return new Promise<Response<PullRequestsCreateReviewRequestResponse>>((resolve, reject) => {
        octokit.pullRequests.createReviewRequest(params, (error, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
     });
}

export async function commitAndCreatePullRequest(
    repository: Repository,
    packageName: string,
    commitMessage: string,
    repositoryName: string,
    pullRequestTitle: string,
    pullRequestDescription:string,
    validate?: ValidateFunction,
    validateEach?: ValidateEachFunction): Promise<string> {
    await waitAndLockGitRepository(repository);
    await createNewUniqueBranch(repository, `generated/${packageName}`, true);

    await commitSpecificationChanges(repository, commitMessage, validate, validateEach);
    const newBranch = await repository.getCurrentBranch();
    _logger.logInfo(`Committed changes successfully on ${newBranch.name()} branch`);

    await pushToNewBranch(repository, newBranch.name());
    _logger.logInfo(`Pushed changes successfully to ${newBranch.name()} branch`);

    const pullRequestResponse = await createPullRequest(repositoryName, pullRequestTitle, pullRequestDescription, newBranch.name());
    _logger.logInfo(`Created pull request successfully - ${pullRequestResponse.data.html_url}`);

    const reviewResponse = await requestPullRequestReview(repositoryName, pullRequestResponse.data.number);
    _logger.logInfo(`Requested preview on pull request successfully - ${reviewResponse.data.html_url}`);

    unlockGitRepository(repository);
    return reviewResponse.data.html_url;
}
