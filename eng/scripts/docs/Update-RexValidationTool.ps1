param(
  $PackageName = '@microsoft/type2docfx',
  $CurrentVersion = (Get-Content $PSScriptRoot/type2docfx.version.txt)
)

$packageInfo = npm view $PackageName --json | ConvertFrom-Json -AsHashtable
$latestPackageVersion = $packageInfo['dist-tags']['latest']

if ($latestPackageVersion -eq $CurrentVersion) { 
  Write-Host "The latest version of $PackageName is already $CurrentVersion. Exiting."
  exit 0
}

Write-Host "A new version of $PackageName is available: $latestPackageVersion"

npm install -g "$PackageName@$latestPackageVersion"

try { 
  $pesterConfig = New-PesterConfiguration @{ 
    Run = @{ 
      Throw = $true; 
      Path  = "$PSScriptRoot/tests/RexValidation.tests.ps1" 
    } 
  }
  Invoke-Pester -Configuration $pesterConfig
}
catch {
  Write-Host "REX tests failed. Exiting."
  Write-Host $_.Exception.Message
  Write-Error $_
  exit 1
}

Set-Content `
  -Path "$PSScriptRoot/type2docfx.version.txt" `
  -Value $latestPackageVersion
