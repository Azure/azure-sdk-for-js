param (
  $taskType,
  $packageName,
  $pkgVersion,
  $tagName,
  $npmToken,
  $reason
)

try {
  Write-Host "Setting AuthToken Deployment"
  $env:NPM_TOKEN = $npmToken
  $regAuth = "//registry.npmjs.org/"
  npm config set $regAuth`:_authToken=`$`{NPM_TOKEN`}
  $nameAndVersion = $packageName + "@" + $pkgVersion

  switch ($taskType) {
    AddTag {
      Write-Host "Adding tag for package"
      Write-Host "npm dist-tag add $($nameAndVersion) $tagName"
      npm dist-tag add $nameAndVersion $tagName
    }

    RemoveTag {
      Write-Host "Removing tag for package"
      Write-Host "npm dist-tag rm $($nameAndVersion) $tagName"
      npm dist-tag rm $nameAndVersion $tagName
    }

    DeprecatePackage {
      Write-Host "Deprecate package $nameAndVersion, reason: $reason"
      Write-Host "npm deprecate $($nameAndVersion) $reason"
      npm deprecate $nameAndVersion $reason
    }

    default {
      Write-Host "Invalid taskType to run npm admin job."
      exit 1
    }
  }
    
  if ($LastExitCode -ne 0) {
    Write-Host "Npm task failed"
    exit 1
  }
}
finally {
  npm config delete $regAuth`:_authToken
  $env:NPM_TOKEN = ""
}
