$diffFile = "ReviewMdChanges.diff"
git diff --output=$diffFile --exit-code sdk/**/review/**.md
Write-Host "Exit code for git diff for changes in api review files = $LastExitCode"
if($LastExitCode -ne 0) {
    Write-Host "There were differences in the two packages - saved in $diffFile"
    Write-Host "Contents of $diffFile"
    Get-Content -Path $diffFile | % { Write-Host $_ }
    exit 1
}
