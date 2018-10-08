/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import { Repository, Signature, Merge, Oid, Reference, Remote, Cred, Branch, StatusFile } from "nodegit";
import { getLogger } from "./logger";

const _logger = getLogger();

export async function openRepository(repositoryPath: string): Promise<Repository> {
    _logger.logVerbose(`Opening Git repository located in ${repositoryPath}`);
    return Repository.open(repositoryPath)
}

export async function validateRepositoryStatus(repository: Repository): Promise<void> {
    const status = await repository.getStatus();
    _logger.logVerbose(`Current repository status: ${status}`);

    if (status && status.length > 0) {
        throw new Error(`Not committed changes exist in ${repository.path()} repository`)
    }
}

export async function getValidatedRepository(repositoryPath: string): Promise<Repository> {
    const repository = await openRepository(repositoryPath);
    await validateRepositoryStatus(repository);
    return repository;
}

export async function pull(repository: Repository, branchName: string, origin: string = "origin"): Promise<Oid> {
    await repository.fetchAll();
    const oid = await repository.mergeBranches(branchName, `${origin}/${branchName}`, Signature.default(repository), Merge.PREFERENCE.NONE);
    const index = await repository.index();

    if (index.hasConflicts()) {
        throw new Error(`Conflict while pulling ${branchName} from origin.`);
    }

    return oid;
}

export async function pullMaster(repository: Repository): Promise<Oid> {
    return pull(repository, "master");
}

export async function createNewBranch(repository: Repository, branchName: string, checkout?: boolean): Promise<Reference> {
    const headCommit = await repository.getHeadCommit();
    const branchPromise = repository.createBranch(branchName, headCommit, false);
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
    _logger.logVerbose(`Checking out ${branchName} branch`);
    return repository.checkoutBranch(branchName);
}

export async function checkoutMaster(repository: Repository): Promise<Reference> {
    return checkoutBranch(repository, "master");
}

export async function refreshRepository(repository: Repository) {
    await pullMaster(repository);
    return checkoutMaster(repository);
}

export async function commitSpecificationChanges(repository: Repository, packageName: string, validate: (value: StatusFile, index: number, array: StatusFile[]) => boolean): Promise<Oid> {
    const status = await repository.getStatus();

    if ((status.length == 2) && (status.every(validate))) {
        var author = Signature.default(repository);
        return repository.createCommitOnHead(status.map(el => el.path()), author, author, `Generate ${packageName} package`);
    } else {
        throw "Unknown changes present in the repository";
    }
}

export async function pushToNewBranch(repository: Repository, branchName: string): Promise<number> {
    const remote = await repository.getRemote("origin");
    return remote.push([`${branchName}:${branchName}`], {
        callbacks: {
            credentials: function (url, userName) {
                return Cred.userpassPlaintextNew("e7174eefd558921e98102310257c69d19b268ee0", "x-oauth-basic");
            }
        }
    });
}
