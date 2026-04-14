# Task: Remove v1 Samples

Remove the outdated `sdk/ai/ai-projects/samples/v1` directory and open a pull request.

---

## Steps

### 1. Create and switch to a new local branch

```bash
git checkout -b remove-v1-samples
```

### 2. Delete the v1 samples directory

Stage the entire `sdk/ai/ai-projects/samples/v1/` directory for removal:

```bash
git rm -r sdk/ai/ai-projects/samples/v1/
```

### 3. Commit the changes

```bash
git commit -m "feat(ai-projects): remove outdated v1 samples"
```

### 4. Push the branch to the remote

Push to the remote branch named `bg/remove-v1-samples`:

```bash
git push origin remove-v1-samples:bg/remove-v1-samples

```

### 5. Open a pull request

Create a PR on GitHub (base: `main`) with:

- **Title**: `feat(ai-projects): remove outdated v1 samples`
- **Body**:
  ```
  Removes the `sdk/ai/ai-projects/samples/v1` directory.
  These samples are outdated and no longer maintained.
  ```

Use `gh pr create` or the GitHub UI targeting `Azure/azure-sdk-for-js`.

---

## Notes

- Do **not** modify any files outside `sdk/ai/ai-projects/samples/v1/`.
- Do **not** touch `samples/v2` or any other directory.
- Confirm with the user before pushing or creating the PR.
