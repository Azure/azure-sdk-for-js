[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [ValidateScript({ Test-Path $_ -PathType Leaf })]
  [string] $SnippetPath,

  [Parameter(Mandatory = $true)]
  [ValidatePattern('^\d+\.\d+\.\d+$')]
  [string] $Version,

  [switch] $KeepTemp
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$sourcePath = (Resolve-Path $SnippetPath).Path
$extension = [System.IO.Path]::GetExtension($sourcePath).ToLowerInvariant()
$supportedExtensions = @('.js', '.mjs', '.cjs', '.ts', '.mts', '.cts')
if ($extension -notin $supportedExtensions) {
  throw "Unsupported snippet extension '$extension'."
}

$nodeCommand = Get-Command node -ErrorAction Stop
$npmCommand = Get-Command npm -ErrorAction Stop
$nodeVersion = (& $nodeCommand.Source --version).TrimStart('v')
$nodeMajor = [int] ($nodeVersion -split '\.')[0]
if ($nodeMajor -lt 22) {
  throw "Node.js 22 or later is required; found $nodeVersion."
}

$packageDependenciesJson = & $npmCommand.Source view `
  "@azure/ai-projects@$Version" dependencies --json `
  --registry=https://packagefeedproxy.microsoft.io/npm/
if ($LASTEXITCODE -ne 0) {
  throw "Package metadata lookup failed with exit code $LASTEXITCODE."
}
$packageDependencies = (
  $packageDependenciesJson -join [Environment]::NewLine
) | ConvertFrom-Json -AsHashtable
foreach ($dependencyName in @('@azure/identity', 'openai')) {
  if (-not $packageDependencies.ContainsKey($dependencyName)) {
    throw "@azure/ai-projects@$Version does not declare a $dependencyName dependency."
  }
}

$tempRoot = Join-Path ([System.IO.Path]::GetTempPath()) (
  'ai-projects-doc-snippet-' + [guid]::NewGuid().ToString('N')
)
$snippetName = "snippet$extension"
$pushedLocation = $false

try {
  New-Item -ItemType Directory -Path $tempRoot | Out-Null
  Copy-Item -LiteralPath $sourcePath -Destination (Join-Path $tempRoot $snippetName)

  $packageJson = [ordered]@{
    name = 'ai-projects-doc-snippet-check'
    private = $true
    version = '0.0.0'
    type = 'module'
    dependencies = [ordered]@{
      '@azure/ai-projects' = $Version
      '@azure/identity' = $packageDependencies['@azure/identity']
      dotenv = 'latest'
      openai = $packageDependencies['openai']
    }
    devDependencies = [ordered]@{
      '@types/node' = 'latest'
      typescript = 'latest'
    }
  }
  $packageJson | ConvertTo-Json -Depth 5 |
    Set-Content -Path (Join-Path $tempRoot 'package.json') -Encoding utf8

  $tsconfig = [ordered]@{
    compilerOptions = [ordered]@{
      target = 'ES2022'
      module = 'NodeNext'
      moduleResolution = 'NodeNext'
      strict = $true
      noEmit = $true
      skipLibCheck = $true
      allowJs = $true
      checkJs = $true
      types = @('node')
    }
    include = @($snippetName)
  }
  $tsconfig | ConvertTo-Json -Depth 5 |
    Set-Content -Path (Join-Path $tempRoot 'tsconfig.json') -Encoding utf8

  Push-Location $tempRoot
  $pushedLocation = $true

  & $npmCommand.Source install --ignore-scripts --no-audit --no-fund `
    --package-lock=false `
    --registry=https://packagefeedproxy.microsoft.io/npm/
  if ($LASTEXITCODE -ne 0) {
    throw "Dependency installation failed with exit code $LASTEXITCODE."
  }

  & $nodeCommand.Source node_modules/typescript/bin/tsc `
    --project tsconfig.json --pretty false
  if ($LASTEXITCODE -ne 0) {
    throw "Snippet compilation failed with exit code $LASTEXITCODE."
  }

  Write-Host "Snippet compiles with @azure/ai-projects@$Version."
} finally {
  if ($pushedLocation) {
    Pop-Location
  }
  if ($KeepTemp) {
    Write-Host "Temporary project retained at $tempRoot"
  } elseif (Test-Path $tempRoot) {
    Remove-Item -LiteralPath $tempRoot -Recurse -Force
  }
}
