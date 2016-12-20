// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var os = require('os');
var fs = require('fs-extra');
var Promise = require('bluebird');
var copy = Promise.promisify(fs.copy);
var mkdir = Promise.promisify(fs.mkdir);
var access = Promise.promisify(fs.access);
var remove = Promise.promisify(fs.remove);
var readFile = Promise.promisify(fs.readFile);
var child_process = Promise.promisifyAll(require('child_process'));
var execAsync = child_process.execAsync;

var utils = module.exports = {};

utils.Package = function Package(folder) {
  this.path = folder;
  this.name = '';
  this.version = '';
  this.stagingBranch = function () {
    return this.name + '.' + this.version;
  };
  this.stagingPath = function () {
    return os.tmpdir() + '/' + this.stagingBranch();
  };
};

utils.getRepoRoot = function getRepoRoot() {
  return execAsync('git rev-parse --show-toplevel')
    .then(function (stdout) {
      return stdout.trim();
    });
};

utils.isCurrentBranch = function isCurrentBranch(which) {
  return execAsync('git rev-parse --abbrev-ref HEAD')
    .then(function (stdout) {
      return stdout.trim() === which ? true : false;
    });
};

utils.hasUncommittedChanges = function hasUncommittedChanges() {
  return execAsync('git status --porcelain --untracked-files=no')
    .then(function (stdout) {
      return stdout.trim().length !== 0 ? true : false;
    });
};

utils.isWorkingDirClean = function isWorkingDirClean(rootDir) {
  return execAsync('git -C ' + rootDir + ' clean -xdn')
    .then(function (stdout) {
      return stdout.trim().length === 0 ? true : false;
    });
};

utils.tracksRemote = function tracksRemote(which) {
  return execAsync('git remote')
    .then(function (stdout) {
      var re = new RegExp('^' + which + '$', 'm');
      return re.test(stdout) ? true : false;
    });
};

utils.fetchRemote = function fetchRemote(which) {
  return execAsync('git fetch --prune ' + which)
    .then(function (stdout) {
      console.log(stdout);
    });
};

utils.tryPackageFolder = function tryPackageFolder(folder) {
  return access(folder + '/package.json', fs.R_OK);
};

utils.folderIsInRepo = function folderIsInRepo(folder, repoRoot) {
  return execAsync('git -C ' + folder + ' rev-parse --show-toplevel')
  .then(function (stdout) {
    return stdout.trim() === repoRoot ? true : false;
  });
};

utils.getPackageInfo = function getPackageInfo(packageFolder) {
  return readFile(packageFolder + '/package.json', 'utf-8')
  .then(function (data) {
    var pkg = JSON.parse(data);
    return {
      name: pkg.name,
      version: pkg.version
    };
  });
};

utils.localBranchExists = function localBranchExists(name) {
  return execAsync('git for-each-ref --format=%(refname:short) refs/heads/')
    .then(function (stdout) {
      var re = new RegExp('^' + name + '$', 'm');
      return re.test(stdout) ? true : false;
    });
};

utils.remoteBranchExists = function remoteBranchExists(remoteName, branchName) {
  return execAsync('git for-each-ref --format=%(refname:short) refs/remotes/')
    .then(function (stdout) {
      var re = new RegExp('^' + remoteName + '/' + branchName + '$', 'm');
      return re.test(stdout) ? true : false;
    });
};

utils.getTrackedFiles = function getTrackedFiles(folder) {
  return execAsync('git -C ' + folder + ' ls-tree -r HEAD --name-only')
    .then(function (stdout) {
      return stdout.trim().split('\n');
    });
};

utils.createCleanDir = function createCleanDir(path) {
  return remove(path)
    .then(function () {
      return mkdir(path);
    });
};

utils.copyFiles = function copyFiles(fileList, src, dst) {
  return Promise.map(fileList, function (file) {
    return copy(src + '/' + file, dst + '/' + file);
  });
};

utils.copyDir = function copyDir(srcDir, dstDir) {
  return copy(srcDir, dstDir);
};

utils.checkoutBranch = function checkoutBranch(name) {
  return execAsync('git checkout ' + name);
};

utils.checkoutOrphanBranch = function checkoutOrphanBranch(name) {
  return execAsync('git checkout --orphan ' + name)
    .then(function () {
      return execAsync('git rm -rf .')
        .catch(function (err) {
          // it's okay if there aren't any files to 'git rm'...
          if (!err.toString().search(/pathspec '\.' did not match any files/)) {
            throw err;
          }
        });
    });
};

utils.commitFiles = function commitFiles(message) {
  return execAsync('git add .')
    .then(function () {
      return execAsync('git commit -m "' + message + '"');
    });
};

utils.pushToRemote = function pushToRemote(remoteName, branchName) {
  return execAsync('git push ' + remoteName + ' ' + branchName);
};

utils.getTarballUrl = function getTarballUrl(remoteName, branchName) {
  return execAsync('git config --get remote.' + remoteName + '.url')
    .then(function (stdout) {
      return stdout.trim().replace(/\.git$/, '') + '/tarball/' + branchName;
    });
};

utils.deleteBranch = function deleteBranch(which) {
  return execAsync('git branch -D ' + which);
};