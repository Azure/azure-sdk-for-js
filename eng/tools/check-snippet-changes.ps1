$diffFile = "SnippetChanges.diff"
git diff --output=$diffFile --exit-code
Write-Host "Exit code for git diff for snippet changes = $LastExitCode"
if($LastExitCode -ne 0) {
    Write-Host "There were changes after running update-snippets - saved in $diffFile"
    Write-Host "Contents of $diffFile"
    Get-Content -Path $diffFile | % { Write-Host $_ }
    Write-Host " "
    Write-Host "Please do 'npm run update-snippets' then add the changes to the PR."
    Write-Host ""
    exit 1
}
