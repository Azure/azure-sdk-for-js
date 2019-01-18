/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import Octokit, { PullRequestsCreateParams, PullRequestsCreateReviewRequestParams, PullRequestsCreateReviewRequestResponse, PullRequestsGetAllParams, PullRequestsGetAllResponse, PullRequestsGetAllResponseItem, PullRequestsGetParams, PullRequestsUpdateParams, Response } from '@octokit/rest';
import { Reference, Repository } from 'nodegit';
import { Branch, commitChanges, createNewUniqueBranch, getToken, pushBranch, ValidateEachFunction, ValidateFunction } from './git';
import { Logger } from './logger';

const _repositoryOwner = "Azure";
const _logger = Logger.get();

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

export async function listPullRequests(repositoryName: string, state?: "open" | "closed" | "all"): Promise<Response<PullRequestsGetAllResponse>> {
    const octokit = getAuthenticatedClient();
    const params: PullRequestsGetAllParams = {
        owner: _repositoryOwner,
        repo: repositoryName,
        state: state
    }

    return new Promise<Response<PullRequestsGetAllResponse>>((resolve, reject) => {
        octokit.pullRequests.getAll(params, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

export async function findPullRequest(repositoryName: string, branchName: string, state?: "open" | "closed" | "all"): Promise<PullRequestsGetAllResponseItem | undefined> {
    const allPullRequests = await listPullRequests(repositoryName, state);
    return allPullRequests.data.find(el => el.head.ref === branchName);
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
    validateEach?: string | ValidateEachFunction): Promise<string> {
    await createNewUniqueBranch(repository, `generated/${packageName}`, true);

    await commitChanges(repository, commitMessage, validate, validateEach);
    const newBranchRef: Reference = await repository.getCurrentBranch();
    const newBranch: Branch = Branch.fromReference(newBranchRef);
    _logger.logInfo(`Committed changes successfully on ${newBranch.name} branch`);

    await pushBranch(repository, newBranch);
    _logger.logInfo(`Pushed changes successfully to ${newBranch.name} branch`);

    const pullRequestResponse = await createPullRequest(repositoryName, pullRequestTitle, pullRequestDescription, newBranchRef.name());
    _logger.logInfo(`Created pull request successfully - ${pullRequestResponse.data.html_url}`);

    const reviewResponse = await requestPullRequestReview(repositoryName, pullRequestResponse.data.number);
    _logger.logInfo(`Requested preview on pull request successfully - ${reviewResponse.data.html_url}`);

    return reviewResponse.data.html_url;
}

export async function getDataFromPullRequest(pullRequestUrl: string): Promise<{ packageName: string | undefined, branchName: string, prId: number }> {
    const octokit: Octokit = getAuthenticatedClient();
    const params: Octokit.PullRequestsGetParams = parsePullRequestUrl(pullRequestUrl);
    const pullRequest: Octokit.Response<Octokit.PullRequestsGetResponse> = await octokit.pullRequests.get(params);
    const branchName: string = pullRequest.data.head.ref;
    const files: Octokit.Response<Octokit.PullRequestsGetFilesResponseItem[]> = await octokit.pullRequests.getFiles(params);
    const path: string = getRootFolder(files.data.map(i => i.filename));
    const packageName: string | undefined = getPackageNameFromPath(path);

    _logger.logTrace(`Found "${packageName}" package name and ${branchName} branch name`)
    return { packageName: packageName, branchName: branchName, prId: params.number };
}

function parsePullRequestUrl(pullRequestUrl: string): PullRequestsGetParams {
    const parts = pullRequestUrl.split("/");
    const hostIndex = parts.indexOf("github.com")
    const owner = parts[hostIndex + 1];
    const repositoryName = parts[hostIndex + 2];
    const resourceIndex = parts.indexOf("pull");
    const id = Number.parseInt(parts[resourceIndex + 1]);

    return {
        number: id,
        owner: owner,
        repo: repositoryName
    };
}

function getPackageNameFromPath(rootFolder: string): string | undefined {
    if (!rootFolder || !rootFolder.startsWith("packages/") || rootFolder === "packages/" || rootFolder === "packages/@azure/") {
        _logger.logDebug(`Can't get package name from '${rootFolder}' path`);
        return undefined;
    }

    return rootFolder.slice("packages/".length);
}

function getRootFolder(changedFiles: string[]): string {
    const pathsParts = changedFiles.map(changedFile => changedFile.split("/"));
    let commonParts = [];
    if (changedFiles.length == 1) {
        const parts = pathsParts[0];
        commonParts = parts.slice(0, parts.length - 1);
    } else {
        const partCount = Math.max(...pathsParts.map(arr => arr.length));

        for (let partIndex = 0; partIndex < partCount; partIndex++) {
            const part = pathsParts[0][partIndex];
            const partArray = pathsParts.map(p => p[partIndex]);

            if (partArray.every(p => p === part)) {
                commonParts.push(part);
                continue;
            }

            break;
        }
    }

    const commonPath = commonParts.join("/");
    _logger.logTrace(`Found "${commonPath}" common path for files in the pull request`)

    return commonPath;
}

export async function forcePrDiffRefresh(repositoryName: string, pullRequestId: number) {
    const octokit = getAuthenticatedClient();
    const params: PullRequestsUpdateParams = {
        owner: _repositoryOwner,
        repo: repositoryName,
        number: pullRequestId,
        base: "force-pr-diff-update"
    }
    await octokit.pullRequests.update(params)
    params.base = "master";
    return octokit.pullRequests.update(params)
}
