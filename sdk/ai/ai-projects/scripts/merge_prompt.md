# Three-Way Merge: Apply Selective TypeSpec Changes

## Goal

The TypeSpec code generator (`tsp-client`) emits a mix of wanted and unwanted breaking
changes. We want to extract **only the delta** between two generated snapshots and apply
it to the hand-maintained `./src` folder.

## Inputs

| Directory | Description |
|---|---|
| `./incoming/old_src` | Old generated code (baseline — contains only the unwanted changes) |
| `./incoming/new_src` | New generated code (contains both wanted and unwanted changes) |
| `./src` | Current hand-maintained source (the merge target) |

The delta from `old_src → new_src` represents the **wanted** changes only.

## Procedure

### Step 1: Identify changed files

```powershell
git diff --no-index --name-only incoming/old_src incoming/new_src 2>&1 |
  Where-Object { $_ -match '^incoming/new_src/' } |
  ForEach-Object { $_ -replace '^incoming/new_src/', '' }
```

### Step 2: Run `git merge-file` per changed file

For each file from Step 1, run a three-way merge where `src/<file>` is the current
version, `incoming/old_src/<file>` is the common ancestor, and `incoming/new_src/<file>`
is the incoming version:

```powershell
$files = @(
  # paste the file list from Step 1 here
)

foreach ($f in $files) {
  $src = "src/$f"
  $old = "incoming/old_src/$f"
  $new = "incoming/new_src/$f"
  $tmpOut = "incoming/_merged_$($f -replace '[/\\]','_')"

  $proc = Start-Process -FilePath "git" `
    -ArgumentList "merge-file","-p",$src,$old,$new `
    -NoNewWindow -Wait -PassThru -RedirectStandardOutput $tmpOut
  $exitCode = $proc.ExitCode

  if ($exitCode -lt 0) {
    Write-Host "ERROR on $f (exit $exitCode)"
  } elseif ($exitCode -gt 0) {
    Write-Host "CONFLICTS on $f ($exitCode conflicts)"
    Copy-Item $tmpOut $src -Force
  } else {
    Write-Host "CLEAN merge on $f"
    Copy-Item $tmpOut $src -Force
  }
  Remove-Item $tmpOut -Force
}
```

> **Important**: Do NOT capture `git merge-file -p` output into a PowerShell variable
> (e.g. `$result = git merge-file -p ...`) and then pipe it to `Set-Content`. PowerShell
> will strip newlines and collapse the file to a single line. Always use
> `Start-Process -RedirectStandardOutput` to write to a temp file, then `Copy-Item` it
> into place.

### Step 3: Resolve conflicts

Files with conflicts will contain standard Git conflict markers (`<<<<<<<`, `=======`,
`>>>>>>>`). Common conflict patterns and how to resolve them:

- **`import type` vs `import`**: The `src/` codebase uses `import type` for type-only
  imports (TypeScript convention). The generated code uses plain `import`. **Keep
  `import type`** from `src/` and add the new type names from `new_src`.

- **`@azure/core-paging` vs local paging helpers**: `src/` imports
  `PagedAsyncIterableIterator` from `@azure/core-paging`, while generated code imports
  from `../static-helpers/pagingHelpers.js`. **Keep the `@azure/core-paging` import**
  from `src/`.

- **Custom comments / docstrings**: `src/` may have hand-written TSDoc comments that
  differ from the generated `/** model interface ... */` comments. **Keep the `src/`
  versions**.

After resolving, verify no conflict markers remain:

```powershell
git grep -r "<<<<<<" src/
```

### Step 4: Build and verify

```powershell
npx dev-tool run build-package
```

This builds all 4 targets (browser, react-native, esm, commonjs). All must succeed.

### Step 5: Cleanup

```powershell
Remove-Item incoming/delta.patch, incoming/delta_rewritten.patch -Force -ErrorAction SilentlyContinue
```

The `incoming/` directory can be kept for reference or removed once satisfied.

## Tips for Agents

1. **Do not use `git apply --3way`** with patches from `git diff --no-index`. The blob
   IDs in the patch won't exist in the git object store (since the files are untracked),
   so `git apply` will silently succeed without making any changes.

2. **Do not capture `git merge-file -p` output in a PowerShell variable.** PowerShell
   mangles newlines. Use `Start-Process -RedirectStandardOutput` to a temp file instead.

3. **File count check**: Run `git diff --no-index --stat incoming/old_src incoming/new_src`
   first to see the scope. The `--stat` summary gives a quick overview of files changed
   and lines added/removed.

4. **Verify the merge worked** by checking `git diff --stat HEAD -- src/` afterward. The
   number of changed files should match the number of files in the delta (from Step 1).

5. **Conflict resolution principle**: When `src/` and `new_src` disagree on style (e.g.
   `import type` vs `import`), always prefer the `src/` convention. The goal is to add
   new content from the delta while preserving `src/`'s hand-maintained patterns.