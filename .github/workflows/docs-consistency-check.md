---
on:
  workflow_dispatch:
  schedule:
    - cron: "0 9 * * 1"
description: Review documentation for inconsistencies with source code and create a PR with fixes
permissions:
  contents: read
  issues: read
  pull-requests: read
tools:
  github:
    toolsets: [default]
  edit:
  bash: true
safe-outputs:
  create-pull-request:
    title-prefix: "[docs] "
    labels: [documentation, automated]
  id-token: write
  environment: AzureSDKEngKeyVault
  steps:
    - name: Azure Login
      uses: azure/login@v2
      with:
        client-id: ${{ secrets.AZURE_CLIENT_ID }}
        tenant-id: ${{ secrets.AZURE_TENANT_ID }}
        subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
    - name: Login to GitHub
      uses: ./eng/common/actions/login-to-github
      with:
        token-owners: Azure
    - name: Reconfigure Git with GitHub App token
      run: |
        SERVER_URL_STRIPPED="${GITHUB_SERVER_URL#https://}"
        git remote set-url origin "https://x-access-token:${GH_TOKEN}@${SERVER_URL_STRIPPED}/${GITHUB_REPOSITORY}.git"

---

# Documentation Consistency Check

Review all markdown files under the `documentation/` folder for inconsistencies
with the actual source code and other documentation in this repository.

## Analysis

Go through each file in the `documentation/` folder and check for:

1. **Incorrect code examples**: snippets that reference APIs, classes, methods, or
   options that no longer exist or have changed signature in the source code under `sdk/`.
2. **Outdated instructions**: build commands, test commands, or setup steps that
   no longer match the current tooling (e.g. referencing `npm` instead of `pnpm`,
   missing `turbo` flags, wrong script names in `package.json`).
3. **Broken internal links**: references to files, folders, or other docs that have
   been moved or deleted.
4. **Contradictions between documents**: two or more docs giving conflicting guidance
   on the same topic (e.g. different Node.js version requirements, different
   instructions for the same task).
5. **Stale references**: mentions of deprecated packages, old repository paths, or
   removed features.

## Process

1. Read every markdown file in `documentation/`.
2. For each claim or instruction, verify it against the current source code and
   repository structure using bash and the GitHub tools.
3. Collect all inconsistencies found.
4. Fix the documentation files directly using the edit tools.
5. Create a pull request with all fixes, providing a clear summary of every change
   made and why.
