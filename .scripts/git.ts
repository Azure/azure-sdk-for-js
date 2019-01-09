/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import { Cred, Index, Merge, Oid, Reference, Repository, Reset, Signature, StatusFile, Branch as NodeBranch, MergeOptions } from "nodegit";
import { Logger } from "./logger";

export type ValidateFunction = (statuses: StatusFile[]) => boolean;
export type ValidateEachFunction = (path: string, matchedPatter: string) => number;

export enum BranchLocation {
    Local = "heads",
    Remote = "remotes"
}

export class Branch {
    static LocalMaster = new Branch("master", BranchLocation.Local);
    static RemoteMaster = new Branch("master", BranchLocation.Remote);

    constructor(public name: string, public location: BranchLocation, public remote: string = "origin") {
    }

    shorthand(): string {
        return `${this.remote}/${this.name}`;
    }

    fullName(): string {
        if (this.name.startsWith("refs")) {
            return this.name;
        }

        return `refs/${this.location}/${this.remote}/${this.name}`;
    }

    fullNameWithoutRemote(): string {
        if (this.name.startsWith("refs")) {
            return this.name;
        }

        return `refs/${this.location}/${this.name}`;
    }

    convertTo(location: BranchLocation): Branch {
        if (this.location == location) {
            return this;
        }

        return new Branch(this.name, location, this.remote);
    }

    toRemote(): Branch {
        return this.convertTo(BranchLocation.Remote);
    }

    toLocal(): Branch {
        return this.convertTo(BranchLocation.Local);
    }

    static fromReference(reference: Reference) {
        const fullName = reference.name();
        const parts = fullName.split("/");
        return new Branch(parts.slice(2).join("/"), reference.isRemote() ? BranchLocation.Remote : BranchLocation.Local);
    }
}

const _logger = Logger.get();
const _lockMap: { [key: string]: boolean } = {}

function isLocked(repositoryPath: string): boolean {
    return !!_lockMap[repositoryPath];
}

function lock(repositoryPath: string) {
    _lockMap[repositoryPath] = true;
}

function unlock(repositoryPath: string) {
    _lockMap[repositoryPath] = false;
}

async function waitUntilUnlocked(repositoryPath: string): Promise<void> {
    _logger.logTrace("Waiting for the repository to be unlocked");

    return new Promise<void>((resolve) => {
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
    await repository.fetchAll();
    return repository;
}

export async function mergeBranch(repository: Repository, toBranch: Branch, fromBranch: Branch, mergeOptions?: MergeOptions): Promise<Oid> {
    _logger.logTrace(`Merging "${fromBranch.fullName()}" to "${toBranch.fullName()}" branch in ${repository.path()} repository`);
    try {
        return repository.mergeBranches(toBranch.name, fromBranch.shorthand(), Signature.default(repository), Merge.PREFERENCE.NONE, mergeOptions);
    } catch (error) {
        throw new Error(`Probable merge conflicts. Error: ${error}`);
    }
}

export async function mergeMasterIntoBranch(repository: Repository, toBranch: Branch, mergeOptions?: MergeOptions): Promise<Oid> {
    return mergeBranch(repository, toBranch, Branch.RemoteMaster, mergeOptions);
}

export async function pullBranch(repository: Repository, localBranch: Branch, mergeOptions?: MergeOptions): Promise<void> {
    _logger.logTrace(`Pulling "${localBranch.fullName()}" branch in ${repository.path()} repository`);

    await repository.fetchAll();
    _logger.logTrace(`Fetched all successfully`);

    const remoteBranch = new Branch(localBranch.name, BranchLocation.Remote, localBranch.remote);
    await mergeBranch(repository, localBranch, remoteBranch, mergeOptions);

    const index = await repository.index();
    if (index.hasConflicts()) {
        throw new Error(`Conflict while pulling ${remoteBranch.fullName()}`);
    }

    _logger.logTrace(`Merged "${remoteBranch.fullName()}" to "${localBranch.fullName()}" successfully without any conflicts`);
}

export async function pullMaster(repository: Repository): Promise<void> {
    return pullBranch(repository, Branch.LocalMaster);
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
        return checkoutBranch(repository, branch.shorthand());
    }
}

export async function checkoutRemoteBranch(repository: Repository, remoteBranch: Branch): Promise<Reference> {
    _logger.logTrace(`Checking out "${remoteBranch.fullName()}" remote branch`);

    const branchNames = await repository.getReferenceNames(Reference.TYPE.LISTALL);
    const localBranch = remoteBranch.toLocal();
    const branchExists = branchNames.some(name => name === localBranch.fullNameWithoutRemote());
    _logger.logTrace(`Branch exists: ${branchExists}`);

    let branchRef: Reference;
    if (branchExists) {
        branchRef = await checkoutBranch(repository, remoteBranch.name);
    } else {
        branchRef = await createNewBranch(repository, remoteBranch.name);
        await NodeBranch.setUpstream(branchRef, remoteBranch.shorthand());
        const commit = await repository.getReferenceCommit(remoteBranch.name);
        await checkoutBranch(repository, branchRef);
        await Reset.reset(repository, commit as any, Reset.TYPE.HARD, {});
    }

    return branchRef;
}

export async function rebaseBranch(repository: Repository, localBranch: Branch): Promise<Oid> {
    return repository.rebaseBranches(
        localBranch.name,
        Branch.RemoteMaster.shorthand(),
        "",
        repository.defaultSignature(),
        (_: any) => {});
}

function getCurrentDateSuffix(): string {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-${now.getMilliseconds()}`;
}

export async function createNewUniqueBranch(repository: Repository, branchPrefix: string, checkout?: boolean): Promise<Reference> {
    return createNewBranch(repository, `${branchPrefix}-${getCurrentDateSuffix()}`, checkout);
}

export async function checkoutBranch(repository: Repository, branchName: string | Reference): Promise<Reference> {
    _logger.logTrace(`Checking out "${branchName}" branch`);
    return repository.checkoutBranch(branchName);
}

export async function checkoutMaster(repository: Repository): Promise<Reference> {
    return checkoutBranch(repository, "master");
}

export async function refreshRepository(repository: Repository) {
    await repository.fetchAll();
    await pullMaster(repository);
    return checkoutMaster(repository);
}

export async function commitChanges(repository: Repository, commitMessage: string, validateStatus?: ValidateFunction, validateEach?: string | ValidateEachFunction): Promise<Oid> {
    _logger.logTrace(`Committing changes in "${repository.path()}" repository`);

    validateStatus = validateStatus || ((_) => true);
    validateEach = validateEach || ((_, __) => 0);

    const status = await repository.getStatus();
    if (!validateStatus(status)) {
        return Promise.reject("Unknown changes present in the repository");
    }

    const index = await repository.refreshIndex();
    if (typeof validateEach === "string") {
        const folderName = validateEach;
        validateEach = (path) => {
             return path.startsWith(folderName) ? 0 : 1;
        }
    }

    await index.addAll("*", Index.ADD_OPTION.ADD_CHECK_PATHSPEC, validateEach);

    await index.write();
    const oid = await index.writeTree();

    const head = await repository.getHeadCommit();
    const author = Signature.default(repository);

    return repository.createCommit("HEAD", author, author, commitMessage, oid, [head]);
}

export async function pushBranch(repository: Repository, localBranch: Branch, forcePush?: boolean): Promise<number> {
    const remote = await repository.getRemote("origin");
    const refSpec = `${forcePush ? "+" : ""}refs/heads/${localBranch.name}:refs/heads/${localBranch.name}`;
    _logger.logTrace(`Pushing to ${refSpec}`);

    return new Promise<number>((resolve, reject) => {
        remote.push([refSpec], {
            callbacks: {
                credentials: () => {
                    return Cred.userpassPlaintextNew(getToken(), "x-oauth-basic");
                }
            }
        }).then(result => {
            resolve(result);
        }).catch(error => {
            _logger.logError(error);
            reject(error);
        })
    });
}

export async function commitAndPush(repository: Repository, localBranch: Branch, commitMessage: string, validate?: ValidateFunction, validateEach?: string | ValidateEachFunction, forcePush?: boolean): Promise<void> {
    await commitChanges(repository, commitMessage, validate, validateEach);
    await pushBranch(repository, localBranch, forcePush);
}

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

        _logger.logError(text);
    }
}
