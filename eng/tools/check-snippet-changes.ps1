$diffFile = "SnippetChanges.diff"
git diff --output=$diffFile --exit-code -- . ":(exclude).npmrc"
Write-Host "Exit code for git diff for snippet changes = $LastExitCode"
if($LastExitCode -ne 0) {
    Write-Host "There were changes after running update-snippets - saved in $diffFile"
    Write-Host "Contents of $diffFile"
    Get-Content -Path $diffFile | % { Write-Host $_ }
    Write-Host " "

    $changedPackages = @(
        git diff --name-only -- . ":(exclude).npmrc" |
            ForEach-Object {
                if ($_ -match '^(sdk[\\/][^\\/]+[\\/][^\\/]+)[\\/]') {
                    $Matches[1] -replace '\\', '/'
                }
            } |
            Sort-Object -Unique
    )
    if ($changedPackages.Count -gt 0) {
        $packageList = $changedPackages -join ", "
        $directoryInstruction = if ($changedPackages.Count -eq 1) {
            "that package directory"
        } else {
            "each listed package directory"
        }
        $remediation = "Generated snippets are out of date in $packageList. Run `"pnpm update-snippets`" from $directoryInstruction and commit the resulting changes."
    } else {
        $remediation = "Generated snippets are out of date. Run `"pnpm update-snippets`" from each affected package directory and commit the resulting changes."
    }

    Write-Host $remediation
    if ($env:TF_BUILD) {
        $escapedRemediation = $remediation.Replace("%", "%AZP25").Replace("`r", "%0D").Replace("`n", "%0A")
        Write-Host "##vso[task.logissue type=error]$escapedRemediation"
    }
    Write-Host ""
    exit 1
}
