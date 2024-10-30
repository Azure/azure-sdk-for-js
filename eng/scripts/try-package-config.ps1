param(
  $MatrixConfigFile
)

if ( -not (Test-Path $MatrixConfigFile)) {
  Write-Error "Matrix Config file doesn't exist"
  exit 1
}

$content = Get-Content $MatrixConfigFile -Raw | ConvertFrom-Json
Write-Host $content

Write-Host ($content | ConvertTo-Json -Depth 100)
