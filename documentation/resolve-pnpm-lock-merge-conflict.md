Here's the recommended process to resolve merge conflicts of `pnpm-lock.yaml` in your pull request (assuming your upstream remote is named "upstream"):

1. Find out your upstream remote name for `Azure/azure-sdk-for-js` repository: `git remote -v`
2. Get the latest changes from the upstream main branch: `git fetch upstream main`
3. Merge the latest changes from main to local pull request branch: `git merge --no-edit upstream/main`
4. Use your favorite IDE, editor, or Git Client to resolve conflicts for files other than `pnpm-lock.yaml`
5. Check out the main branch version of pnpm-lock.yaml: `git checkout upstream/main -- pnpm-lock.yaml`
6. Refresh dependencies: `pnpm install`
7. Stage the updates: `git add pnpm-lock.yaml`
8. Commit the merge
9. Push the commit to your pull request branch, assuming "origin" is the git remote name of your fork, `git push origin`

Step 4) to 6) can be combined and enhanced to run under any directory under the repo if you are using a \*NIX environment:

```shell
git checkout upstream/main `git rev-parse --show-toplevel`/pnpm-lock.yaml && pnpm install && git add `git rev-parse --show-toplevel`pnpm-lock.yaml
```
