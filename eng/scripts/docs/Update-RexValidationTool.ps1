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

# Install the latest version of the package
npm install -g "$PackageName@$latestPackageVersion"

# Run Rex tests
$pesterConfig = New-PesterConfiguration @{ 
  Run = @{ 
    Throw = $true; 
    Path  = "$PSScriptRoot/tests/Docs-Onboarding.tests.ps1" 
  } 
}

try { 
  Invoke-Pester -Configuration $pesterConfig
}
catch { 
  Write-Error "REX tests failed. Exiting."
  exit 1
}

# Update the version file
Set-Content `
  -Path "$PSScriptRoot/type2docfx.version.txt" `
  -Value $latestPackageVersion
