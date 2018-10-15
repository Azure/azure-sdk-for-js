/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import { Repository, Signature, Merge, Oid, Reference, Cred, StatusFile } from "nodegit";
import { getLogger } from "./logger";
import { getCommandLineOptions } from "./commandLine";

export type ValidateFunction = (statuses: StatusFile[]) => boolean;
export type ValidateEachFunction = (value: StatusFile, index: number, array: StatusFile[]) => boolean;

const _args = getCommandLineOptions();
const _logger = getLogger();

const _lockMap = { }

function isLocked(repositoryPath: string) {
    const isLocked = _lockMap[repositoryPath];
    return isLocked || false;
}

function lock(repositoryPath: string) {
    _lockMap[repositoryPath] = true;
}

function unlock(repositoryPath: string) {
    _lockMap[repositoryPath] = true;
}

async function waitUntilUnlocked(repositoryPath: string): Promise<void> {
    _logger.logTrace("Waiting for the repository to be unlocked");

    return new Promise<void>((resolve, reject) => {
        const wait = () => {
            setTimeout(() => {
                _logger.logTrace(`Repository is ${isLocked(repositoryPath) ? "locked" : "unlocked"}`);

                if (isLocked(repositoryPath)) {
                    wait();
                } else {
                    resolve();
                }
            }, 50);
        }

        wait();
    });
}

export async function waitAndLockGitRepository(repository: Repository): Promise<boolean> {
    _logger.logTrace("Waiting to lock the repository");
    const repositoryPath = repository.path();

    await waitUntilUnlocked(repositoryPath);
    if (!isLocked(repositoryPath)) {
        lock(repositoryPath);
        return isLocked(repositoryPath);
    }

    return waitAndLockGitRepository(repository);
}

export function unlockGitRepository(repository: Repository) {
    _logger.logTrace("Unlocking the repository");
    unlock(repository.path());
}

export async function openRepository(repositoryPath: string): Promise<Repository> {
    _logger.logTrace(`Opening Git repository located in ${repositoryPath}`);
    return Repository.open(repositoryPath)
}

export async function validateRepositoryStatus(repository: Repository): Promise<void> {
    const status = await repository.getStatus();
    _logger.logTrace(`Current repository status: ${JSON.stringify(status)}`);

    if (status && status.length > 0) {
        return Promise.reject(`Not committed changes exist in ${repository.path()} repository`);
    }

    _logger.logTrace(`Status of the repository validated successfully`);
}

export async function getValidatedRepository(repositoryPath: string): Promise<Repository> {
    const repository = await openRepository(repositoryPath);
    await validateRepositoryStatus(repository);
    return repository;
}

export async function pull(repository: Repository, branchName: string, origin: string = "origin"): Promise<Oid> {
    _logger.logTrace(`Pulling "${branchName}" branch from ${origin} origin in ${repository.path()} repository`);

    await repository.fetchAll();
    _logger.logTrace(`Fetched all successfully`);

    const oid = await repository.mergeBranches(branchName, `${origin}/${branchName}`, Signature.default(repository), Merge.PREFERENCE.NONE);

    const index = await repository.index();
    if (index.hasConflicts()) {
        throw new Error(`Conflict while pulling ${branchName} from origin.`);
    }

    _logger.logTrace(`Merged "${origin}/${branchName}" to "${branchName}" successfully without any conflicts`);
    return oid;
}

export async function pullMaster(repository: Repository): Promise<Oid> {
    return pull(repository, "master");
}

export async function createNewBranch(repository: Repository, branchName: string, checkout?: boolean): Promise<Reference> {
    _logger.logTrace(`Create new branch "${branchName}" in ${repository.path()} repository`);

    const headCommit = await repository.getHeadCommit();
    const branchPromise = repository.createBranch(branchName, headCommit, false);
    _logger.logTrace(`Created new branch "${branchName}" successfully`);

    if (!checkout) {
        return branchPromise;
    } else {
        const branch = await branchPromise;
        return checkoutBranch(repository, branch.name());
    }
}

function getCurrentDateSuffix(): string {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-${now.getMilliseconds()}`;
}

export async function createNewUniqueBranch(repository: Repository, branchPrefix: string, checkout?: boolean): Promise<Reference> {
    return createNewBranch(repository, `${branchPrefix}-${getCurrentDateSuffix()}`, checkout);
}

export async function checkoutBranch(repository: Repository, branchName: string | Reference): Promise<Reference> {
    _logger.logTrace(`Checking out ${branchName} branch`);
    return repository.checkoutBranch(branchName);
}

export async function checkoutMaster(repository: Repository): Promise<Reference> {
    return checkoutBranch(repository, "master");
}

export async function refreshRepository(repository: Repository) {
    await pullMaster(repository);
    return checkoutMaster(repository);
}

export async function commitSpecificationChanges(repository: Repository, commitMessage: string, validate?: ValidateFunction, validateEach?: ValidateEachFunction): Promise<Oid> {
    _logger.logTrace(`Committing changes in "${repository.path()}" repository`);

    const emptyValidate = () => true;
    validate = validate || emptyValidate;
    validateEach = validateEach || emptyValidate;

    const status = await repository.getStatus();

    if (validate(status) && status.every(validateEach)) {
        var author = Signature.default(repository);
        return repository.createCommitOnHead(status.map(el => el.path()), author, author, commitMessage);
    } else {
        return Promise.reject("Unknown changes present in the repository");
    }
}

export async function pushToNewBranch(repository: Repository, branchName: string): Promise<number> {
    const remote = await repository.getRemote("origin");
    return remote.push([`${branchName}:${branchName}`], {
        callbacks: {
            credentials: function (url, userName) {
                return Cred.userpassPlaintextNew(getToken(), "x-oauth-basic");
            }
        }
    });
}

export function getToken(): string {
    const token = _args.token || process.env.SDK_GEN_GITHUB_TOKEN;
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

        _logger.logError(text);
    }
}
