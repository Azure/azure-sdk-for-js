$cspellVersion = '5.12.3'
if ($env:CSPELL_VERSION) {
  $cspellVersion = $env:CSPELL_VERSION
}

Write-Host "Invoke: cspell@$cspellVersion $($args -join ' ')"
npx -q cspell@$cspellVersion -- @args
