rush update --recheck
$changed = git diff
if ($changed)
{
  Write-Host "Changes detected after running rush update --recheck"

  # Verify that only pnpm-lock.yaml is changed
  $files = (git status -s)
  $files = $files.Where({$_ -notmatch "pnpm-lock.yaml"})
  if ($files.Count -gt 0)
  {
    Write-Error "Repo has more changes than pnpm-lock.yaml file. This should not happen when running rush update --recheck."
    Write-Host "Run rush udpate --recheck manually after cloning azure-sdk-for-js repo and create pull request."
    exit 1
  }

  // submit pull request
}

Write-Host "No change is detected in pnpm-lock.yaml"
