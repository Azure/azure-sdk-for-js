/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import { Repository, Signature, Merge, Oid, Reference } from "nodegit";
import { getLogger } from "./logger";

const _logger = getLogger();

async function openRepository(repositoryPath: string): Promise<Repository> {
    _logger.logVerbose(`Opening Git repository located in ${repositoryPath}`);
    return Repository.open(repositoryPath)
}

async function validateRepositoryStatus(repository: Repository): Promise<void> {
    const status = await repository.getStatus();
    _logger.logVerbose(`Current repository status: ${status}`);

    if (status && status.length > 0) {
        throw new Error(`Not commited changes exist in ${repository.path()} repository`)
    }
}

async function getValidatedRepository(repositoryPath: string): Promise<Repository> {
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

export async function createNewBranch(repositoryPath: string, branchName: string, checkout?: boolean): Promise<Reference> {
    const repository = await openRepository(repositoryPath);
    const headCommit = await repository.getHeadCommit();
    const branchPromise = repository.createBranch(branchName, headCommit, false);
    if (!checkout) {
        return branchPromise
    } else {
        const branch = await branchPromise;
        return checkoutBranch(repository, branch);
    }
}

function getCurrentDateSuffix(): string {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDay()}-${now.getSeconds()}}`
}

export async function createNewUniqueBranch(repositoryPath: string, branchPrefix: string, checkout?: boolean): Promise<Reference> {
    return createNewBranch(repositoryPath, `${branchPrefix}-${getCurrentDateSuffix()}`, checkout);
}

export async function checkoutBranch(repository: Repository, branchName: string | Reference): Promise<Reference> {
    _logger.logVerbose(`Checking out ${branchName} branch`)
    return repository.checkoutBranch(branchName)
}

export async function checkoutMaster(repository: Repository): Promise<Reference> {
    return checkoutBranch(repository, "master");
}

export async function refreshRepository(repositoryPath: string) {
    const repository = await getValidatedRepository(repositoryPath);
    await pullMaster(repository);
    return checkoutMaster(repository);
}

export async function commitSpecificationChanges(repositoryPath: string, packageName: string) {
    const repository = await openRepository(repositoryPath);
    const index = await repository.refreshIndex();
    const status = await repository.getStatus();

    if ((status.length == 1) && (status[0].isNew) && (status[0].path().startsWith(`specification/${packageName}`))) {
        await index.addByPath(status[0].path());
        await index.write();
        await index.writeTree();

        var author = Signature.create("Scott Chacon",
            "schacon@gmail.com", 123456789, 60);
        var committer = Signature.create("Scott A Chacon",
            "scott@github.com", 987654321, 90);
        return repository.createCommitOnHead([status[0].path()], author, committer, "abc");
    } else {
        throw "Unknown changes present in the repository";
    }
}
