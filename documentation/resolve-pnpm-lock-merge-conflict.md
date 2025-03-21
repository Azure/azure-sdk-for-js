Here's the recommended process to resolve merge conflicts of `common/config/rush/pnpm-lock.yaml` in your pull request (assuming your upstream remote is named "upstream"):

0. Find out your upstream remote name for `Azure/azure-sdk-for-js` repository: `git remote -v`
1. Get the latest changes from the upstream main branch: `git fetch upstream main`
2. Merge the latest changes from main to local pull request branch: `git merge --no-edit upstream/main`
3. Use your favorite IDE, editor, or Git Client to resolve conflicts for files other than `common/config/rush/pnpm-lock.yaml`
4. Check out the main branch version of pnpm-lock.yaml: `git checkout upstream/main -- common/config/rush/pnpm-lock.yaml`
5. Refresh dependencies: `rush update`
6. Stage the updates: `git add common/config/rush/pnpm-lock.yaml`
7. Commit the merge
8. Push the commit to your pull request branch, assuming "origin" is the git remote name of your fork, `git push origin`

Step 4) to 6) can be combined and enhanced to run under any directory under the repo if you are using a \*NIX environment:

```shell
git checkout upstream/main `git rev-parse --show-toplevel`/common/config/rush/pnpm-lock.yaml && rush update && git add `git rev-parse --show-toplevel`/common/config/rush/pnpm-lock.yaml
```
