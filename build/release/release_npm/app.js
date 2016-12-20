#!/usr/bin/env node

// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var u = require('./lib/utils.js');
var Promise = require('bluebird');

var repoRoot;
var remoteName = process.argv[2];
var packageFolders = process.argv.slice(3);

var packages = Promise.map(packageFolders, function (folder) {
  return new u.Package(folder);
});

function usage() {
  console.log([
    '',
    'node release_npm/app.js <remote-name> <package-folder>...',
    '  <remote-name>        The name of the tracked repository where the npm packages will be staged',
    '  <package-folder>...  One or more npm package folders within your repository'
  ].join('\n'));
}

function getRepoRoot() {
  return u.getRepoRoot()
    .then(function (value) {
      repoRoot = value;
    });
}

function ensureCurrentBranchIsDevelop() {
  return u.isCurrentBranch('develop')
    .then(function (isDevelop) {
      return isDevelop ?
        null :
        Promise.reject(new Error('Please switch to the \'develop\' branch before running this script.'));
    });
}

function ensureThereAreNoUncommittedChanges() {
  return u.hasUncommittedChanges()
    .then(function (hasUncommittedChanges) {
      return !hasUncommittedChanges ?
        null :
        Promise.reject(new Error('You have uncommitted changes. Please commit them before running this script.'));
    });
}

function ensureWorkingDirectoryIsClean() {
  return u.isWorkingDirClean(repoRoot)
    .then(function (isWorkingDirClean) {
      return isWorkingDirClean ?
        null :
        Promise.reject(new Error('Your working directory isn\'t clean. Please clean your working directory (i.e., git clean -xdf) before running this script.'));
    });
}

function ensureRepoIsTrackingTheGivenRemote() {
  return u.tracksRemote(remoteName)
    .then(function (tracksRemote) {
      return tracksRemote ?
        null :
        Promise.reject(new Error('Please add \'' + remoteName + '\' to your repo remotes.'));
    });
}

function fetchAndPruneRemote() {
  console.log('Fetching (pruning) remote repository \'' + remoteName + '\'...');
  return u.fetchRemote(remoteName);
}

function getPackages() {
  return packages;
}

function ensurePackageExistsInRepo(pkg) {
  return u.tryPackageFolder(pkg.path)
    .then(function () {
      return u.folderIsInRepo(pkg.path, repoRoot);
    })
    .then(function (folderIsInRepo) {
      return folderIsInRepo ?
        pkg :
        Promise.reject(new Error('The package folder \'' + pkg.path + '\' is not under the repo at ' + repoRoot));
    });
}

function setPackageNameAndVersion(pkg) {
  return u.getPackageInfo(pkg.path)
    .then(function (packageInfo) {
      pkg.name = packageInfo.name;
      pkg.version = packageInfo.version;
      return pkg;
    });
}

function ensureStagingBranchDoesNotExist(pkg) {
  return Promise.join(
    u.localBranchExists(pkg.stagingBranch()),
    u.remoteBranchExists(remoteName, pkg.stagingBranch()),
    function (localExists, remoteExists) {
      if (localExists) {
        return Promise.reject(new Error('Branch \'' + pkg.stagingBranch() + '\' already exists.'));
      }
      else if (remoteExists) {
        return Promise.reject(new Error('Remote branch \'' + remoteName + '/' + pkg.stagingBranch() + '\' already exists.'));
      }
      else {
        console.log('Folder \'' + pkg.path + '\' is ok.');
        return pkg;
      }
    });
}

function createStagingFolder(pkg) {
  return u.createCleanDir(pkg.stagingPath())
    .then(function () { return pkg; });
}

function stagePackageFiles(pkg) {
  return u.getTrackedFiles(pkg.path)
    .then(function (files) {
      return Promise.all([
        // also copy .gitattributes so that text files are normalized
        u.copyFiles(['.gitattributes'], repoRoot, pkg.stagingPath()),
        u.copyFiles(files, pkg.path, pkg.stagingPath())
      ]);
    });
}
    
function chdirToRoot() {
  process.chdir(repoRoot);
}

function checkoutStagingBranch(pkg) {
  console.log('\nChecking out staging branch \'' + pkg.stagingBranch() + '\'...');
  return u.checkoutOrphanBranch(pkg.stagingBranch())
    .then(function () { return pkg; });
}

function copyStagedFiles(pkg) {
  console.log('Copying staged files...');
  return u.copyDir(pkg.stagingPath(), repoRoot)
    .then(function () { return pkg; });
}

function commitStagedFiles(pkg) {
  console.log('Committing staged files...');
  return u.commitFiles(pkg.stagingBranch())
    .then(function () { return pkg; });
}

function pushToRemote(pkg) {
  console.log('Pushing commit to remote...');
  return u.pushToRemote(remoteName, pkg.stagingBranch())
    .then(function () { return pkg; });
}

function getTarballUrl(pkg) {
  console.log('Done.');
  return u.getTarballUrl(remoteName, pkg.stagingBranch());
}

function checkoutDevelop() {
  console.log('\nReturning to branch \'develop\'...');
  return u.checkoutBranch('develop');
}

function deleteStagingBranches() {
  console.log('Removing staging branches...');
  return packages.each(function (pkg) {
      var branch = pkg.stagingBranch();
      return u.localBranchExists(branch)
        .then(function (exists) {
          return exists ? u.deleteBranch(branch) : null;
        });
    });
}

function cleanup() {
  return checkoutDevelop()
    .then(deleteStagingBranches);
}

function printTarballUris(uris) {
  console.log('\nPackage URIs:');
  uris.forEach(function (uri) {
    console.log(uri);
  });
}

function printError(err) {
  console.log(err.toString());
}


if (process.argv.length < 4) {
  usage();
  process.exit(1);
}

getRepoRoot()
  .then(ensureCurrentBranchIsDevelop)
  .then(ensureThereAreNoUncommittedChanges)
  .then(ensureWorkingDirectoryIsClean)
  .then(ensureRepoIsTrackingTheGivenRemote)
  .then(fetchAndPruneRemote)
  .then(getPackages)
  .map(function(pkg) {  // this chain of steps can happen in parallel for all packages...
    return ensurePackageExistsInRepo(pkg)
      .then(setPackageNameAndVersion)
      .then(ensureStagingBranchDoesNotExist)
      .then(createStagingFolder)
      .then(stagePackageFiles);
  })
  .then(chdirToRoot)
  .then(getPackages)
  .mapSeries(function (pkg) { // this chain of steps must happen serially per package...
    return checkoutStagingBranch(pkg)
      .then(copyStagedFiles)
      .then(commitStagedFiles)
      .then(pushToRemote)
      .then(getTarballUrl);
  })
  .finally(cleanup)
  .then(printTarballUris)
  .catch(printError);