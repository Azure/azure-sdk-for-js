[CmdletBinding()]
param(
  [string]$PackageRoot = $PSScriptRoot,
  [string]$BaseRef = $(if ($env:AZSDK_POST_EMITTER_BASE_REF) { $env:AZSDK_POST_EMITTER_BASE_REF } else { 'HEAD' })
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$script:Utf8NoBom = [System.Text.UTF8Encoding]::new($false)
$script:ModifiedFiles = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::Ordinal)
$script:RuleCounts = [ordered]@{
  'Resolve known diff3 conflicts' = 0
  'Restore protected paths' = 0
  'Propagate generated import renames' = 0
  'Propagate generated operation renames' = 0
  'Repair api-version encoding' = 0
  'Restore local foundryFeatures' = 0
  'Preserve beta evaluator list naming' = 0
  'Apply known positional renames' = 0
  'Repair Node built-in imports' = 0
  'Restore job-aware pollers' = 0
  'Remove duplicates and scratch files' = 0
}

function Invoke-GitCommand {
  param(
    [Parameter(Mandatory)]
    [string[]]$GitArguments,

    [switch]$AllowFailure
  )

  $output = @(& git -C $script:PackageRootPath @GitArguments 2>&1)
  $exitCode = $LASTEXITCODE
  $lines = @($output | ForEach-Object { $_.ToString() })
  if ($exitCode -ne 0 -and -not $AllowFailure) {
    $details = if ($lines.Count -gt 0) { "`n$($lines -join "`n")" } else { '' }
    throw "git $($GitArguments -join ' ') failed with exit code $exitCode.$details"
  }

  return [pscustomobject]@{
    ExitCode = $exitCode
    Lines = $lines
  }
}

function Convert-ToPackagePath {
  param([Parameter(Mandatory)][string]$Path)

  $relativePath = [System.IO.Path]::GetRelativePath($script:PackageRootPath, $Path)
  if ($relativePath -eq '..' -or $relativePath.StartsWith("..$([System.IO.Path]::DirectorySeparatorChar)", [System.StringComparison]::Ordinal)) {
    throw "Path is outside the package root: $Path"
  }

  return $relativePath.Replace('\', '/')
}

function Convert-ToRepositoryPath {
  param([Parameter(Mandatory)][string]$PackagePath)

  if (-not $script:PackagePathFromRepositoryRoot) {
    return $PackagePath
  }

  return "$($script:PackagePathFromRepositoryRoot)/$PackagePath"
}

function Read-TextFile {
  param([Parameter(Mandatory)][string]$Path)

  return [System.IO.File]::ReadAllText($Path)
}

function Write-TextFile {
  param(
    [Parameter(Mandatory)][string]$Path,
    [Parameter(Mandatory)][AllowEmptyString()][string]$Content,
    [Parameter(Mandatory)][string]$Rule,
    [int]$Count = 1
  )

  $original = Read-TextFile -Path $Path
  if ($original -ceq $Content) {
    return $false
  }

  [System.IO.File]::WriteAllText($Path, $Content, $script:Utf8NoBom)
  $packagePath = Convert-ToPackagePath -Path $Path
  [void]$script:ModifiedFiles.Add($packagePath)
  $script:RuleCounts[$Rule] += $Count
  return $true
}

function Get-SourceFiles {
  param([switch]$TrackedOnly)

  if (-not (Test-Path -LiteralPath $script:SourceRoot -PathType Container)) {
    return @()
  }

  if ($TrackedOnly) {
    $tracked = (Invoke-GitCommand -GitArguments @('ls-files', '--', 'src')).Lines
    return @(
      $tracked |
        Where-Object { $_ -match '\.(?:ts|mts|cts)$' } |
        ForEach-Object { Join-Path $script:PackageRootPath $_ } |
        Where-Object { Test-Path -LiteralPath $_ -PathType Leaf }
    )
  }

  return @(
    Get-ChildItem -LiteralPath $script:SourceRoot -Recurse -File |
      Where-Object { $_.Extension -in @('.ts', '.mts', '.cts') } |
      ForEach-Object { $_.FullName }
  )
}

function Get-NewLine {
  param([Parameter(Mandatory)][AllowEmptyString()][string]$Content)

  if ($Content.Contains("`r`n")) {
    return "`r`n"
  }

  return "`n"
}

function Replace-IdentifierInCode {
  param(
    [Parameter(Mandatory)][AllowEmptyString()][string]$Content,
    [Parameter(Mandatory)][string]$Old,
    [Parameter(Mandatory)][string]$New,
    [switch]$ExcludePropertyKeys
  )

  $builder = [System.Text.StringBuilder]::new($Content.Length)
  $index = 0
  $count = 0
  $state = 'Code'

  while ($index -lt $Content.Length) {
    $character = $Content[$index]
    $nextCharacter = if ($index + 1 -lt $Content.Length) { $Content[$index + 1] } else { [char]0 }

    switch ($state) {
      'Code' {
        if ($character -eq '/' -and $nextCharacter -eq '/') {
          [void]$builder.Append('//')
          $index += 2
          $state = 'LineComment'
          continue
        }
        if ($character -eq '/' -and $nextCharacter -eq '*') {
          [void]$builder.Append('/*')
          $index += 2
          $state = 'BlockComment'
          continue
        }
        if ($character -eq "'") {
          [void]$builder.Append($character)
          $index++
          $state = 'SingleQuote'
          continue
        }
        if ($character -eq '"') {
          [void]$builder.Append($character)
          $index++
          $state = 'DoubleQuote'
          continue
        }
        if ($character -eq '`') {
          [void]$builder.Append($character)
          $index++
          $state = 'Template'
          continue
        }

        if ([char]::IsLetter($character) -or $character -eq '_' -or $character -eq '$') {
          $tokenEnd = $index + 1
          while ($tokenEnd -lt $Content.Length) {
            $tokenCharacter = $Content[$tokenEnd]
            if (-not ([char]::IsLetterOrDigit($tokenCharacter) -or $tokenCharacter -eq '_' -or $tokenCharacter -eq '$')) {
              break
            }
            $tokenEnd++
          }

          $token = $Content.Substring($index, $tokenEnd - $index)
          $previousCharacter = if ($index -gt 0) { $Content[$index - 1] } else { [char]0 }
          $nextCodeIndex = $tokenEnd
          while ($nextCodeIndex -lt $Content.Length -and [char]::IsWhiteSpace($Content[$nextCodeIndex])) {
            $nextCodeIndex++
          }
          $isPropertyAccess = $previousCharacter -eq '.'
          $isPropertyKey = $ExcludePropertyKeys -and $nextCodeIndex -lt $Content.Length -and $Content[$nextCodeIndex] -eq ':'

          if ($token -ceq $Old -and -not $isPropertyAccess -and -not $isPropertyKey) {
            [void]$builder.Append($New)
            $count++
          } else {
            [void]$builder.Append($token)
          }
          $index = $tokenEnd
          continue
        }

        [void]$builder.Append($character)
        $index++
      }
      'SingleQuote' {
        [void]$builder.Append($character)
        $index++
        if ($character -eq '\' -and $index -lt $Content.Length) {
          [void]$builder.Append($Content[$index])
          $index++
        } elseif ($character -eq "'") {
          $state = 'Code'
        }
      }
      'DoubleQuote' {
        [void]$builder.Append($character)
        $index++
        if ($character -eq '\' -and $index -lt $Content.Length) {
          [void]$builder.Append($Content[$index])
          $index++
        } elseif ($character -eq '"') {
          $state = 'Code'
        }
      }
      'Template' {
        [void]$builder.Append($character)
        $index++
        if ($character -eq '\' -and $index -lt $Content.Length) {
          [void]$builder.Append($Content[$index])
          $index++
        } elseif ($character -eq '`') {
          $state = 'Code'
        }
      }
      'LineComment' {
        [void]$builder.Append($character)
        $index++
        if ($character -eq "`n") {
          $state = 'Code'
        }
      }
      'BlockComment' {
        [void]$builder.Append($character)
        $index++
        if ($character -eq '*' -and $index -lt $Content.Length -and $Content[$index] -eq '/') {
          [void]$builder.Append('/')
          $index++
          $state = 'Code'
        }
      }
    }
  }

  return [pscustomobject]@{
    Content = $builder.ToString()
    Count = $count
  }
}

function Get-ExportedFunctionMatches {
  param([Parameter(Mandatory)][AllowEmptyString()][string]$Content)

  $pattern = '(?ms)^export\s+(?:async\s+)?function\s+(?<name>[A-Za-z_$][\w$]*)\s*\((?<parameters>.*?)\)\s*(?::\s*[^\{\r\n]+)?\s*\{\r?\n(?<body>.*?)(?=^export\s+|\z)'
  return [regex]::Matches($Content, $pattern)
}

function Read-BaseTextFile {
  param([Parameter(Mandatory)][string]$PackagePath)

  $repositoryPath = Convert-ToRepositoryPath -PackagePath $PackagePath
  $exists = Invoke-GitCommand -GitArguments @('cat-file', '-e', "${BaseRef}:$repositoryPath") -AllowFailure
  if ($exists.ExitCode -ne 0) {
    return $null
  }

  $result = Invoke-GitCommand -GitArguments @('show', "${BaseRef}:$repositoryPath")
  return [string]::Join("`n", $result.Lines)
}

function Get-NamedImportsByModule {
  param([Parameter(Mandatory)][AllowEmptyString()][string]$Content)

  $importsByModule = @{}
  $pattern = [regex]::new('(?ms)^(?:import|export)(?:\s+type)?\s+\{(?<symbols>.*?)\}\s+from\s+"(?<module>[^"]+)";')
  foreach ($importMatch in $pattern.Matches($Content)) {
    $module = $importMatch.Groups['module'].Value
    if (-not $importsByModule.ContainsKey($module)) {
      $importsByModule[$module] = [System.Collections.Generic.List[string]]::new()
    }

    $bindingText = [regex]::Replace($importMatch.Groups['symbols'].Value, '(?s)/\*.*?\*/', '')
    $bindingText = [regex]::Replace($bindingText, '(?m)//.*$', '')
    foreach ($rawSymbol in $bindingText.Split(',')) {
      $symbol = $rawSymbol.Trim()
      if (-not $symbol) {
        continue
      }
      if ($symbol -notmatch '^[A-Za-z_$][\w$]*$') {
        $importsByModule[$module].Clear()
        $importsByModule[$module].Add('__unsupported_import_shape__')
        break
      }
      $importsByModule[$module].Add($symbol)
    }
  }

  return $importsByModule
}

function Get-ContentWithoutNamedImports {
  param([Parameter(Mandatory)][AllowEmptyString()][string]$Content)

  return [regex]::Replace(
    $Content,
    '(?ms)^(?:import|export)(?:\s+type)?\s+\{.*?\}\s+from\s+"[^"]+";\r?\n?',
    ''
  )
}

function Test-IdentifierSubsequence {
  param(
    [Parameter(Mandatory)][string]$Shorter,
    [Parameter(Mandatory)][string]$Longer
  )

  $short = $Shorter.ToLowerInvariant()
  $long = $Longer.ToLowerInvariant()
  $shortIndex = 0
  for ($longIndex = 0; $longIndex -lt $long.Length -and $shortIndex -lt $short.Length; $longIndex++) {
    if ($short[$shortIndex] -eq $long[$longIndex]) {
      $shortIndex++
    }
  }
  return $shortIndex -eq $short.Length
}

function Get-RenamedIdentifierScore {
  param(
    [Parameter(Mandatory)][string]$Old,
    [Parameter(Mandatory)][string]$New
  )

  if (($Old.StartsWith('_')) -ne ($New.StartsWith('_'))) {
    return 0
  }
  if ([char]::IsUpper($Old.TrimStart('_')[0]) -ne [char]::IsUpper($New.TrimStart('_')[0])) {
    return 0
  }

  $oldLower = $Old.ToLowerInvariant()
  $newLower = $New.ToLowerInvariant()
  $containsScore = if ($oldLower.Contains($newLower) -or $newLower.Contains($oldLower)) { 10000 } else { 0 }
  $subsequenceScore = if ((Test-IdentifierSubsequence -Shorter $Old -Longer $New) -or (Test-IdentifierSubsequence -Shorter $New -Longer $Old)) { 1000 } else { 0 }
  $prefixLength = 0
  while (
    $prefixLength -lt $oldLower.Length -and
    $prefixLength -lt $newLower.Length -and
    $oldLower[$prefixLength] -eq $newLower[$prefixLength]
  ) {
    $prefixLength++
  }
  $suffixLength = 0
  while (
    $suffixLength -lt $oldLower.Length -and
    $suffixLength -lt $newLower.Length -and
    $oldLower[$oldLower.Length - 1 - $suffixLength] -eq $newLower[$newLower.Length - 1 - $suffixLength]
  ) {
    $suffixLength++
  }
  if ($containsScore -eq 0 -and $subsequenceScore -eq 0 -and $suffixLength -lt 7) {
    return 0
  }
  return $containsScore + $subsequenceScore + ($suffixLength * 100) + $prefixLength - [Math]::Abs($Old.Length - $New.Length)
}

function Repair-GeneratedImportRenames {
  $rule = 'Propagate generated import renames'
  foreach ($sourceFile in Get-SourceFiles) {
    $sourcePath = Convert-ToPackagePath -Path $sourceFile
    if (-not $sourcePath.StartsWith('src/', [System.StringComparison]::Ordinal) -or (Test-ProtectedPath -PackagePath $sourcePath)) {
      continue
    }

    $generatedPath = "generated/$($sourcePath.Substring(4))"
    $generatedFile = Join-Path $script:PackageRootPath $generatedPath
    if (-not (Test-Path -LiteralPath $generatedFile -PathType Leaf)) {
      continue
    }
    $baseGenerated = Read-BaseTextFile -PackagePath $generatedPath
    if ($null -eq $baseGenerated) {
      continue
    }

    $currentGenerated = Read-TextFile -Path $generatedFile
    $baseImports = Get-NamedImportsByModule -Content $baseGenerated
    $currentImports = Get-NamedImportsByModule -Content $currentGenerated
    $sourceContent = Read-TextFile -Path $sourceFile
    $sourceImports = Get-NamedImportsByModule -Content $sourceContent
    $sourceBody = Get-ContentWithoutNamedImports -Content $sourceContent
    $renameMap = [ordered]@{}

    foreach ($module in $baseImports.Keys) {
      if (-not $currentImports.ContainsKey($module) -or -not $sourceImports.ContainsKey($module)) {
        continue
      }
      $oldSymbols = @($baseImports[$module])
      $newSymbols = @($currentImports[$module])
      $importedSourceSymbols = @($sourceImports[$module])
      if (
        '__unsupported_import_shape__' -in $oldSymbols -or
        '__unsupported_import_shape__' -in $newSymbols -or
        '__unsupported_import_shape__' -in $importedSourceSymbols
      ) {
        continue
      }

      $oldOnly = @($oldSymbols | Where-Object { $_ -notin $newSymbols -and $_ -in $importedSourceSymbols })
      $newOnly = @($newSymbols | Where-Object { $_ -notin $oldSymbols })
      $usedNewSymbols = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::Ordinal)
      foreach ($old in $oldOnly) {
        $scoredCandidates = @(
          $newOnly |
            Where-Object { -not $usedNewSymbols.Contains($_) } |
            ForEach-Object {
              [pscustomobject]@{ Name = $_; Score = Get-RenamedIdentifierScore -Old $old -New $_ }
            } |
            Where-Object { $_.Score -gt 0 } |
            Sort-Object Score -Descending
        )
        if ($scoredCandidates.Count -eq 0) {
          continue
        }
        $topScore = $scoredCandidates[0].Score
        $topCandidates = @($scoredCandidates | Where-Object { $_.Score -eq $topScore })
        if ($topCandidates.Count -ne 1) {
          throw "[$rule] $sourcePath has ambiguous generated binding candidates for '$old': $($topCandidates.Name -join ', ')."
        }
        $new = $topCandidates[0].Name
        [void]$usedNewSymbols.Add($new)
        if ($renameMap.Contains($old) -and $renameMap[$old] -cne $new) {
          throw "[$rule] $sourcePath maps imported symbol '$old' to multiple generated names."
        }
        $renameMap[$old] = $new
      }
    }

    $updated = $sourceContent
    $count = 0
    foreach ($entry in $renameMap.GetEnumerator()) {
      $replacement = Replace-IdentifierInCode -Content $updated -Old $entry.Key -New $entry.Value
      if ($replacement.Count -eq 0) {
        throw "[$rule] Expected to replace '$($entry.Key)' in $sourcePath."
      }
      $updated = $replacement.Content
      $count += $replacement.Count
    }
    if ($updated -cne $sourceContent) {
      [void](Write-TextFile -Path $sourceFile -Content $updated -Rule $rule -Count $count)
    }
  }
}

function Get-ExportedFunctionNames {
  param([Parameter(Mandatory)][AllowEmptyString()][string]$Content)

  return @(
    [regex]::Matches($Content, '(?m)^export\s+(?:async\s+)?function\s+(?<name>[A-Za-z_$][\w$]*)\s*\(') |
      ForEach-Object { $_.Groups['name'].Value }
  )
}

function Remove-RestorePollerHelperArtifact {
  $rule = 'Remove duplicates and scratch files'
  $packagePath = 'src/restorePollerHelpers.ts'
  $fullPath = Join-Path $script:PackageRootPath $packagePath
  if (-not (Test-Path -LiteralPath $fullPath -PathType Leaf)) {
    return
  }

  Remove-Item -LiteralPath $fullPath -Force
  [void]$script:ModifiedFiles.Add($packagePath)
  $script:RuleCounts[$rule]++
  if (Test-Path -LiteralPath $fullPath) {
    throw "[$rule] Failed to remove $packagePath."
  }
}

function Repair-GeneratedOperationRenames {
  $rule = 'Propagate generated operation renames'
  $apiRoot = Join-Path $script:SourceRoot 'api'
  if (-not (Test-Path -LiteralPath $apiRoot -PathType Container)) {
    return
  }

  foreach ($sourceFile in Get-ChildItem -LiteralPath $apiRoot -Recurse -File -Filter 'operations.ts') {
    $sourcePath = Convert-ToPackagePath -Path $sourceFile.FullName
    if (Test-ProtectedPath -PackagePath $sourcePath) {
      continue
    }
    $generatedPath = "generated/$($sourcePath.Substring(4))"
    $generatedFile = Join-Path $script:PackageRootPath $generatedPath
    if (-not (Test-Path -LiteralPath $generatedFile -PathType Leaf)) {
      continue
    }

    $sourceContent = Read-TextFile -Path $sourceFile.FullName
    $sourceExports = @(Get-ExportedFunctionNames -Content $sourceContent)
    $generatedContent = Read-TextFile -Path $generatedFile
    $generatedExports = @(Get-ExportedFunctionNames -Content $generatedContent)
    if ('$delete' -in $generatedExports) {
      continue
    }

    $directory = Split-Path -Parent $sourceFile.FullName
    $relativeApiPath = $sourcePath.Substring('src/api/'.Length)
    $area = $relativeApiPath.Substring(0, $relativeApiPath.Length - '/operations.ts'.Length)
    $sourceClassicPath = Join-Path $script:PackageRootPath "src/classic/$area/index.ts"
    $generatedClassicPath = Join-Path $script:PackageRootPath "generated/classic/$area/index.ts"
    $sourceClassic = if (Test-Path -LiteralPath $sourceClassicPath -PathType Leaf) { Read-TextFile -Path $sourceClassicPath } else { '' }
    $generatedClassic = if (Test-Path -LiteralPath $generatedClassicPath -PathType Leaf) { Read-TextFile -Path $generatedClassicPath } else { '' }
    $hasGenericSourceDelete = '$delete' -in $sourceExports
    $hasBareClassicDelete = $sourceClassic -match '(?m)^\s{2,4}delete\s*:'
    if (-not $hasGenericSourceDelete -and -not $hasBareClassicDelete) {
      continue
    }

    $candidates = @(
      $generatedExports |
        Where-Object {
          $_ -cmatch '^delete[A-Z]' -and
          (
            ($hasGenericSourceDelete -and $_ -notin $sourceExports) -or
            (
              -not $hasGenericSourceDelete -and
              $_ -in $sourceExports -and
              $generatedClassic -match "(?m)^\s{2,4}$([regex]::Escape($_))\s*:"
            )
          ) -and
          "_${_}Send" -in $sourceExports -and
          "_${_}Deserialize" -in $sourceExports
        } |
        Sort-Object -Unique
    )
    if ($candidates.Count -eq 0) {
      continue
    }
    if ($candidates.Count -ne 1) {
      throw "[$rule] $sourcePath has ambiguous generated delete operation candidates: $($candidates -join ', ')."
    }

    $newName = $candidates[0]
    $symbolMap = [ordered]@{
      '_$deleteSend' = "_${newName}Send"
      '_$deleteDeserialize' = "_${newName}Deserialize"
      '$delete' = $newName
    }
    $targetFiles = @(
      $sourceFile.FullName,
      (Join-Path $directory 'index.ts'),
      $sourceClassicPath
    ) | Sort-Object -Unique

    $renameClassicPublicKey = $generatedClassic -match "(?m)^\s{2,4}$([regex]::Escape($newName))\s*:"

    foreach ($targetFile in $targetFiles) {
      if (-not (Test-Path -LiteralPath $targetFile -PathType Leaf)) {
        continue
      }
      $content = Read-TextFile -Path $targetFile
      $updated = $content
      $count = 0
      foreach ($entry in $symbolMap.GetEnumerator()) {
        $replacement = Replace-IdentifierInCode -Content $updated -Old $entry.Key -New $entry.Value
        $updated = $replacement.Content
        $count += $replacement.Count
      }
      if ($renameClassicPublicKey -and $targetFile.Replace('\', '/') -like '*/src/classic/*/index.ts') {
        $publicKeyPattern = '(?m)^(?<indent>\s{2,4})delete(?<separator>\s*:)'
        $publicKeyCount = ([regex]::Matches($updated, $publicKeyPattern)).Count
        $updated = [regex]::Replace($updated, $publicKeyPattern, "`${indent}$newName`${separator}")
        $count += $publicKeyCount
      }
      if ($updated -cne $content) {
        [void](Write-TextFile -Path $targetFile -Content $updated -Rule $rule -Count $count)
      }
    }

    $remaining = Replace-IdentifierInCode -Content (Read-TextFile -Path $sourceFile.FullName) -Old '$delete' -New '$delete'
    if ($remaining.Count -gt 0) {
      throw "[$rule] Generic delete symbols remain in $sourcePath after mapping to '$newName'."
    }
  }
}

function Repair-ApiVersionEncoding {
  $rule = 'Repair api-version encoding'
  foreach ($file in Get-SourceFiles) {
    $content = Read-TextFile -Path $file
    $count = ([regex]::Matches($content, [regex]::Escape('api%2Dversion'))).Count
    if ($count -eq 0) {
      continue
    }

    $updated = $content.Replace('api%2Dversion', 'api-version')
    [void](Write-TextFile -Path $file -Content $updated -Rule $rule -Count $count)
  }

  $remaining = @()
  foreach ($file in Get-SourceFiles) {
    if ((Read-TextFile -Path $file).Contains('api%2Dversion')) {
      $remaining += Convert-ToPackagePath -Path $file
    }
  }
  if ($remaining.Count -gt 0) {
    throw "[$rule] Encoded api-version literals remain in: $($remaining -join ', ')"
  }
}

function Get-ForbiddenFoundryFeatureLines {
  $violations = @()
  foreach ($file in Get-SourceFiles) {
    $packagePath = Convert-ToPackagePath -Path $file
    if ($packagePath.EndsWith('/options.ts', [System.StringComparison]::Ordinal)) {
      continue
    }

    $lineNumber = 0
    foreach ($line in [regex]::Split((Read-TextFile -Path $file), '\r?\n')) {
      $lineNumber++
      if ($line -match '"foundry-features"\s*:' -or $line -match '^\s*const\s+foundryFeatures\s*=') {
        continue
      }
      if (
        $line -match '^\s*foundryFeatures\??\s*:' -or
        $line -match '(?<![\w.])foundryFeatures\s*,' -or
        $line -match '[,(]\s*foundryFeatures\s*\)'
      ) {
        $violations += "${packagePath}:$lineNumber"
      }
    }
  }

  return $violations
}

function Repair-FoundryFeaturesParameters {
  $rule = 'Restore local foundryFeatures'
  $featureMap = [ordered]@{
    'src/api/beta/agents/operations.ts' = 'AgentsOptimization=V2Preview'
    'src/api/beta/datasets/operations.ts' = 'DataGenerationJobs=V1Preview'
    'src/api/beta/evaluationTaxonomies/operations.ts' = 'Evaluations=V1Preview'
    'src/api/beta/evaluators/operations.ts' = 'Evaluations=V1Preview'
    'src/api/beta/insights/operations.ts' = 'Insights=V1Preview'
    'src/api/beta/memoryStores/operations.ts' = 'MemoryStores=V1Preview'
    'src/api/beta/models/operations.ts' = 'Models=V1Preview'
    'src/api/beta/redTeams/operations.ts' = 'RedTeams=V1Preview'
    'src/api/beta/routines/operations.ts' = 'Routines=V1Preview'
    'src/api/beta/schedules/operations.ts' = 'Schedules=V1Preview'
    'src/api/beta/skills/operations.ts' = 'Skills=V1Preview'
  }

  foreach ($entry in $featureMap.GetEnumerator()) {
    $packagePath = $entry.Key
    $feature = $entry.Value
    $file = Join-Path $script:PackageRootPath $packagePath
    if (-not (Test-Path -LiteralPath $file -PathType Leaf)) {
      continue
    }

    $content = Read-TextFile -Path $file
    $literalMatches = [regex]::Matches(
      $content,
      '(?m)(?:^\s*const\s+foundryFeatures\s*=\s*|^\s*foundryFeatures\s*:\s*|"foundry-features"\s*:\s*)"(?<feature>[^"]+)"'
    )
    $literals = @($literalMatches | ForEach-Object { $_.Groups['feature'].Value } | Sort-Object -Unique)
    $unexpected = @($literals | Where-Object { $_ -cne $feature })
    if ($unexpected.Count -gt 0) {
      throw "[$rule] $packagePath contains incompatible feature literal(s): $($unexpected -join ', '); expected $feature."
    }

    $escapedFeature = [regex]::Escape($feature)
    $typedLinePattern = "(?m)^[ \t]*foundryFeatures\s*:\s*`"$escapedFeature`",\r?\n"
    $argumentLinePattern = '(?m)^[ \t]*foundryFeatures,\r?\n'
    $typedCount = ([regex]::Matches($content, $typedLinePattern)).Count
    $argumentCount = ([regex]::Matches($content, $argumentLinePattern)).Count
    $updated = [regex]::Replace($content, $typedLinePattern, '')
    $updated = [regex]::Replace($updated, $argumentLinePattern, '')
    $repairCount = $typedCount + $argumentCount

    $sendPattern = [regex]::new('(?ms)^export function (?<name>_[A-Za-z_$][\w$]*Send)\(.*?(?=^export\s+|\z)')
    $sendMatches = $sendPattern.Matches($updated)
    for ($index = $sendMatches.Count - 1; $index -ge 0; $index--) {
      $sendMatch = $sendMatches[$index]
      $segment = $sendMatch.Value
      if ($segment -notmatch '"foundry-features"\s*:\s*foundryFeatures') {
        continue
      }
      if ($segment -match '(?m)^\s*const\s+foundryFeatures\s*=') {
        continue
      }

      $signatureEnd = [regex]::Match($segment, '(?m)^(?<closing>\): StreamableMethod \{)(?<newline>\r?\n)')
      if (-not $signatureEnd.Success) {
        throw "[$rule] $packagePath function $($sendMatch.Groups['name'].Value) writes the feature header but has an unrecognized signature."
      }

      $insertion = "$($signatureEnd.Groups['closing'].Value)$($signatureEnd.Groups['newline'].Value)  const foundryFeatures = `"$feature`";$($signatureEnd.Groups['newline'].Value)"
      $newSegment = $segment.Remove($signatureEnd.Index, $signatureEnd.Length).Insert($signatureEnd.Index, $insertion)
      $updated = $updated.Remove($sendMatch.Index, $sendMatch.Length).Insert($sendMatch.Index, $newSegment)
      $repairCount++
    }

    $unknownTyped = [regex]::Matches($updated, '(?m)^\s*foundryFeatures\??\s*:\s*[^\r\n]+$')
    $unknownPositional = @(
      [regex]::Split($updated, '\r?\n') |
        Where-Object {
          $_ -notmatch '"foundry-features"\s*:' -and
          $_ -notmatch '^\s*const\s+foundryFeatures\s*=' -and
          ($_ -match '(?<![\w.])foundryFeatures\s*,' -or $_ -match '[,(]\s*foundryFeatures\s*\)')
        }
    )
    if ($unknownTyped.Count -gt 0 -or $unknownPositional.Count -gt 0) {
      throw "[$rule] $packagePath contains an unrecognized positional foundryFeatures shape."
    }

    if ($updated -cne $content) {
      [void](Write-TextFile -Path $file -Content $updated -Rule $rule -Count $repairCount)
    }
  }

  $violations = @(Get-ForbiddenFoundryFeatureLines)
  if ($violations.Count -gt 0) {
    throw "[$rule] Forbidden positional foundryFeatures occurrences remain at: $($violations -join ', ')"
  }
}

function Repair-BetaEvaluatorListNaming {
  $rule = 'Preserve beta evaluator list naming'
  $targetPaths = @(
    'src/api/beta/evaluators/index.ts',
    'src/api/beta/evaluators/operations.ts',
    'src/api/beta/evaluators/options.ts',
    'src/classic/beta/evaluators/index.ts'
  )
  $symbolMap = [ordered]@{
    'BetaEvaluatorsListLatestVersionsOptionalParams' = 'BetaEvaluatorsListOptionalParams'
    'ListLatestVersionsOptionalParams' = 'ListOptionalParams'
    '_listLatestVersionsDeserialize' = '_listDeserialize'
    '_listLatestVersionsSend' = '_listSend'
    'listLatestVersions' = 'list'
  }

  foreach ($packagePath in $targetPaths) {
    $file = Join-Path $script:PackageRootPath $packagePath
    if (-not (Test-Path -LiteralPath $file -PathType Leaf)) {
      continue
    }

    $content = Read-TextFile -Path $file
    $updated = $content
    $count = 0
    foreach ($entry in $symbolMap.GetEnumerator()) {
      $replacement = Replace-IdentifierInCode -Content $updated -Old $entry.Key -New $entry.Value
      $updated = $replacement.Content
      $count += $replacement.Count
    }
    if ($updated -cne $content) {
      [void](Write-TextFile -Path $file -Content $updated -Rule $rule -Count $count)
    }

    $remaining = Replace-IdentifierInCode -Content $updated -Old 'listLatestVersions' -New 'listLatestVersions'
    if ($remaining.Count -gt 0) {
      throw "[$rule] listLatestVersions remains in $packagePath."
    }
  }
}

function Convert-ParameterRenameYamlScalar {
  param([Parameter(Mandatory)][AllowEmptyString()][string]$Value)

  $trimmed = $Value.Trim()
  if ($trimmed.Length -ge 2) {
    if (($trimmed[0] -eq '"' -and $trimmed[$trimmed.Length - 1] -eq '"') -or ($trimmed[0] -eq "'" -and $trimmed[$trimmed.Length - 1] -eq "'")) {
      return $trimmed.Substring(1, $trimmed.Length - 2)
    }
  }
  return $trimmed
}

function Read-ParameterRenameRules {
  $schemaPath = Join-Path $script:PackageRootPath '.github/skills/apply-post-emitter-edits/references/parameter-renames.yml'
  if (-not (Test-Path -LiteralPath $schemaPath -PathType Leaf)) {
    throw "[Apply known positional renames] Missing rename schema: $schemaPath"
  }

  $rules = [System.Collections.Generic.List[object]]::new()
  $sawRoot = $false
  $lineNumber = 0

  function Add-CurrentRenameRule {
    if ($null -eq $script:CurrentRenameRule) {
      return
    }
    foreach ($requiredKey in @('file', 'old', 'new')) {
      if (-not $script:CurrentRenameRule.ContainsKey($requiredKey) -or [string]::IsNullOrWhiteSpace($script:CurrentRenameRule[$requiredKey])) {
        throw "[Apply known positional renames] Rename entry is missing '$requiredKey'."
      }
    }
    $rules.Add([pscustomobject]@{
      File = $script:CurrentRenameRule['file']
      Old = $script:CurrentRenameRule['old']
      New = $script:CurrentRenameRule['new']
      Note = if ($script:CurrentRenameRule.ContainsKey('note')) { $script:CurrentRenameRule['note'] } else { '' }
    })
    $script:CurrentRenameRule = $null
  }

  $script:CurrentRenameRule = $null
  try {
    foreach ($line in [System.IO.File]::ReadAllLines($schemaPath)) {
      $lineNumber++
      if ([string]::IsNullOrWhiteSpace($line) -or $line.TrimStart().StartsWith('#')) {
        continue
      }
      if ($line -ceq 'renames:') {
        if ($sawRoot) {
          throw "[Apply known positional renames] Duplicate renames root at line $lineNumber."
        }
        $sawRoot = $true
        continue
      }
      if (-not $sawRoot) {
        throw "[Apply known positional renames] Expected 'renames:' before line $lineNumber."
      }

      $entryStart = [regex]::Match($line, '^  - (?<key>[a-z]+):\s*(?<value>.*)$')
      if ($entryStart.Success) {
        Add-CurrentRenameRule
        $script:CurrentRenameRule = @{}
        $key = $entryStart.Groups['key'].Value
        if ($key -notin @('file', 'old', 'new', 'note')) {
          throw "[Apply known positional renames] Unknown key '$key' at line $lineNumber."
        }
        $script:CurrentRenameRule[$key] = Convert-ParameterRenameYamlScalar -Value $entryStart.Groups['value'].Value
        continue
      }

      $entryProperty = [regex]::Match($line, '^    (?<key>[a-z]+):\s*(?<value>.*)$')
      if ($entryProperty.Success -and $null -ne $script:CurrentRenameRule) {
        $key = $entryProperty.Groups['key'].Value
        if ($key -notin @('file', 'old', 'new', 'note')) {
          throw "[Apply known positional renames] Unknown key '$key' at line $lineNumber."
        }
        if ($script:CurrentRenameRule.ContainsKey($key)) {
          throw "[Apply known positional renames] Duplicate key '$key' at line $lineNumber."
        }
        $script:CurrentRenameRule[$key] = Convert-ParameterRenameYamlScalar -Value $entryProperty.Groups['value'].Value
        continue
      }

      throw "[Apply known positional renames] Unrecognized schema line ${lineNumber}: $line"
    }
    Add-CurrentRenameRule
  } finally {
    Remove-Variable -Scope Script -Name CurrentRenameRule -ErrorAction SilentlyContinue
  }

  if (-not $sawRoot -or $rules.Count -eq 0) {
    throw '[Apply known positional renames] The rename schema contains no entries.'
  }

  return @($rules)
}

function Repair-KnownPositionalRenames {
  $ruleName = 'Apply known positional renames'
  foreach ($rule in Read-ParameterRenameRules) {
    $normalizedPath = $rule.File.Replace('\', '/')
    $fullPath = [System.IO.Path]::GetFullPath((Join-Path $script:PackageRootPath $normalizedPath))
    $sourcePrefix = "$($script:SourceRoot)$([System.IO.Path]::DirectorySeparatorChar)"
    if (-not $fullPath.StartsWith($sourcePrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
      throw "[$ruleName] Rename path must stay under src/: $($rule.File)"
    }
    if (-not (Test-Path -LiteralPath $fullPath -PathType Leaf)) {
      continue
    }

    $content = Read-TextFile -Path $fullPath
    $updated = $content
    $matches = @(Get-ExportedFunctionMatches -Content $updated)
    $count = 0
    for ($index = $matches.Count - 1; $index -ge 0; $index--) {
      $functionMatch = $matches[$index]
      $signatureCheck = Replace-IdentifierInCode -Content $functionMatch.Groups['parameters'].Value -Old $rule.New -New $rule.New
      if ($signatureCheck.Count -eq 0) {
        continue
      }

      $body = $functionMatch.Groups['body'].Value
      $replacement = Replace-IdentifierInCode -Content $body -Old $rule.Old -New $rule.New -ExcludePropertyKeys
      if ($replacement.Count -eq 0) {
        continue
      }
      $bodyGroup = $functionMatch.Groups['body']
      $updated = $updated.Remove($bodyGroup.Index, $bodyGroup.Length).Insert($bodyGroup.Index, $replacement.Content)
      $count += $replacement.Count
    }

    $verificationMatches = @(Get-ExportedFunctionMatches -Content $updated)
    foreach ($functionMatch in $verificationMatches) {
      $signatureCheck = Replace-IdentifierInCode -Content $functionMatch.Groups['parameters'].Value -Old $rule.New -New $rule.New
      if ($signatureCheck.Count -eq 0) {
        continue
      }
      $staleCheck = Replace-IdentifierInCode -Content $functionMatch.Groups['body'].Value -Old $rule.Old -New $rule.Old -ExcludePropertyKeys
      if ($staleCheck.Count -gt 0) {
        throw "[$ruleName] $normalizedPath function $($functionMatch.Groups['name'].Value) still references '$($rule.Old)' after its signature uses '$($rule.New)'."
      }
    }

    if ($normalizedPath -ceq 'src/api/beta/agents/operations.ts') {
      foreach ($functionMatch in $verificationMatches) {
        if ($functionMatch.Groups['name'].Value -notmatch '(?:deleteSessionFile|getSessionFiles|downloadSessionFile|uploadSessionFile)') {
          continue
        }
        $parameters = $functionMatch.Groups['parameters'].Value
        $oldCheck = Replace-IdentifierInCode -Content $parameters -Old 'agentSessionId' -New 'agentSessionId'
        $newCheck = Replace-IdentifierInCode -Content $parameters -Old 'sessionId' -New 'sessionId'
        if ($newCheck.Count -gt 0 -or ($oldCheck.Count -eq 0 -and $parameters -match 'SessionFile')) {
          throw "[$ruleName] Session-file operation $($functionMatch.Groups['name'].Value) must keep agentSessionId."
        }
      }
    }

    if ($updated -cne $content) {
      [void](Write-TextFile -Path $fullPath -Content $updated -Rule $ruleName -Count $count)
    }
  }
}

function Repair-NodeBuiltinImports {
  $rule = 'Repair Node built-in imports'
  $apiRoot = Join-Path $script:SourceRoot 'api'
  if (-not (Test-Path -LiteralPath $apiRoot -PathType Container)) {
    return
  }

  $allowedNames = @{
    fs = @('readFileSync', 'readdirSync', 'statSync')
    path = @('join', 'relative')
  }
  foreach ($file in Get-ChildItem -LiteralPath $apiRoot -Recurse -File | Where-Object { $_.Extension -in @('.ts', '.mts', '.cts') }) {
    $content = Read-TextFile -Path $file.FullName
    $updated = $content
    $count = 0
    $importPattern = [regex]::new('(?ms)^import\s+\{(?<symbols>.*?)\}\s+from\s+"node:(?<module>fs|path)";\r?\n')
    $imports = $importPattern.Matches($updated)
    if ($imports.Count -gt 2) {
      throw "[$rule] $(Convert-ToPackagePath -Path $file.FullName) contains multiple named Node built-in imports."
    }

    for ($index = $imports.Count - 1; $index -ge 0; $index--) {
      $importMatch = $imports[$index]
      $module = $importMatch.Groups['module'].Value
      $alias = if ($module -eq 'fs') { 'fs' } else { 'nodePath' }
      $symbols = @($importMatch.Groups['symbols'].Value.Split(',') | ForEach-Object { $_.Trim() } | Where-Object { $_ })
      $unknown = @($symbols | Where-Object { $_ -notin $allowedNames[$module] })
      if ($unknown.Count -gt 0) {
        throw "[$rule] $(Convert-ToPackagePath -Path $file.FullName) has unsupported node:$module import(s): $($unknown -join ', ')."
      }

      $withoutImport = $updated.Remove($importMatch.Index, $importMatch.Length)
      $collision = Replace-IdentifierInCode -Content $withoutImport -Old $alias -New $alias
      if ($collision.Count -gt 0) {
        throw "[$rule] $(Convert-ToPackagePath -Path $file.FullName) cannot introduce '$alias' because that identifier already exists."
      }

      $newLine = Get-NewLine -Content $updated
      $defaultImport = "import $alias from `"node:$module`";$newLine"
      $updated = $withoutImport.Insert($importMatch.Index, $defaultImport)
      foreach ($symbol in $symbols) {
        $replacement = Replace-IdentifierInCode -Content $updated -Old $symbol -New "$alias.$symbol" -ExcludePropertyKeys
        $updated = $replacement.Content
        $count += $replacement.Count
      }
      $count++
    }

    if ($updated -cne $content) {
      [void](Write-TextFile -Path $file.FullName -Content $updated -Rule $rule -Count $count)
    }
  }

  $remaining = @()
  foreach ($file in Get-ChildItem -LiteralPath $apiRoot -Recurse -File | Where-Object { $_.Extension -in @('.ts', '.mts', '.cts') }) {
    if ((Read-TextFile -Path $file.FullName) -match '(?ms)^import\s+\{.*?\}\s+from\s+"node:(?:fs|path)";') {
      $remaining += Convert-ToPackagePath -Path $file.FullName
    }
  }
  if ($remaining.Count -gt 0) {
    throw "[$rule] Named Node built-in imports remain in: $($remaining -join ', ')"
  }
}

function Get-NamedImportMatches {
  param(
    [Parameter(Mandatory)][AllowEmptyString()][string]$Content,
    [Parameter(Mandatory)][string]$Module
  )

  $escapedModule = [regex]::Escape($Module)
  $pattern = "(?ms)^import(?<type>\s+type)?\s+\{(?<symbols>.*?)\}\s+from\s+`"$escapedModule`";(?<newline>\r?\n)"
  return [regex]::Matches($Content, $pattern)
}

function Remove-NamedImportSymbols {
  param(
    [Parameter(Mandatory)][AllowEmptyString()][string]$Content,
    [Parameter(Mandatory)][string]$Module,
    [Parameter(Mandatory)][string[]]$Symbols
  )

  $updated = $Content
  $removed = 0
  $matches = @(Get-NamedImportMatches -Content $updated -Module $Module)
  for ($index = $matches.Count - 1; $index -ge 0; $index--) {
    $importMatch = $matches[$index]
    $importedSymbols = @(
      $importMatch.Groups['symbols'].Value.Split(',') |
        ForEach-Object { $_.Trim() } |
        Where-Object { $_ }
    )
    $remaining = @($importedSymbols | Where-Object { $_ -notin $Symbols })
    $removedHere = $importedSymbols.Count - $remaining.Count
    if ($removedHere -eq 0) {
      continue
    }

    if ($remaining.Count -eq 0) {
      $replacement = ''
    } else {
      $typeKeyword = $importMatch.Groups['type'].Value
      $replacement = "import$typeKeyword { $($remaining -join ', ') } from `"$Module`";$($importMatch.Groups['newline'].Value)"
    }
    $updated = $updated.Remove($importMatch.Index, $importMatch.Length).Insert($importMatch.Index, $replacement)
    $removed += $removedHere
  }

  return [pscustomobject]@{
    Content = $updated
    Count = $removed
  }
}

function Ensure-NamedImportSymbol {
  param(
    [Parameter(Mandatory)][AllowEmptyString()][string]$Content,
    [Parameter(Mandatory)][string]$Module,
    [Parameter(Mandatory)][string]$Symbol,
    [switch]$TypeOnly
  )

  $allImportPattern = [regex]::new('(?ms)^import(?<type>\s+type)?\s+\{(?<symbols>.*?)\}\s+from\s+"(?<module>[^"]+)";(?<newline>\r?\n)')
  $allImports = @($allImportPattern.Matches($Content))
  foreach ($importMatch in $allImports) {
    $symbols = @($importMatch.Groups['symbols'].Value.Split(',') | ForEach-Object { $_.Trim() })
    if ($Symbol -notin $symbols) {
      continue
    }

    $isTypeImport = $importMatch.Groups['type'].Success
    if ($importMatch.Groups['module'].Value -cne $Module -or $isTypeImport -ne [bool]$TypeOnly) {
      throw "Import symbol '$Symbol' already exists with an incompatible module or import kind."
    }
    return [pscustomobject]@{ Content = $Content; Count = 0 }
  }

  $moduleImports = @(Get-NamedImportMatches -Content $Content -Module $Module)
  foreach ($importMatch in $moduleImports) {
    $isTypeImport = $importMatch.Groups['type'].Success
    if ($isTypeImport -ne [bool]$TypeOnly) {
      continue
    }
    $symbols = @(
      $importMatch.Groups['symbols'].Value.Split(',') |
        ForEach-Object { $_.Trim() } |
        Where-Object { $_ }
    )
    $symbols += $Symbol
    $typeKeyword = if ($TypeOnly) { ' type' } else { '' }
    $replacement = "import$typeKeyword { $($symbols -join ', ') } from `"$Module`";$($importMatch.Groups['newline'].Value)"
    $updated = $Content.Remove($importMatch.Index, $importMatch.Length).Insert($importMatch.Index, $replacement)
    return [pscustomobject]@{ Content = $updated; Count = 1 }
  }

  $newLine = Get-NewLine -Content $Content
  $typeKeyword = if ($TypeOnly) { ' type' } else { '' }
  $newImport = "import$typeKeyword { $Symbol } from `"$Module`";$newLine"
  $firstImport = [regex]::Match($Content, '(?m)^import\s')
  $insertionIndex = if ($firstImport.Success) { $firstImport.Index } else { 0 }
  $updated = $Content.Insert($insertionIndex, $newImport)
  return [pscustomobject]@{ Content = $updated; Count = 1 }
}

function Get-PollerTypeState {
  param(
    [Parameter(Mandatory)][string]$ReturnType,
    [Parameter(Mandatory)][string]$Context
  )

  $trimmed = $ReturnType.Trim()
  $desired = [regex]::Match($trimmed, '^JobPoller<(?<terminal>.+)>$')
  if ($desired.Success) {
    return [pscustomobject]@{
      State = 'Desired'
      TerminalType = $desired.Groups['terminal'].Value.Trim()
    }
  }

  $emitted = [regex]::Match($trimmed, '^PollerLike<OperationState<(?<first>.+)>,\s*(?<second>.+)>$')
  if ($emitted.Success) {
    $first = $emitted.Groups['first'].Value.Trim()
    $second = $emitted.Groups['second'].Value.Trim()
    if ($first -cne $second) {
      throw "[Restore job-aware pollers] $Context has mismatched terminal types '$first' and '$second'."
    }
    return [pscustomobject]@{
      State = 'Emitted'
      TerminalType = $first
    }
  }

  throw "[Restore job-aware pollers] $Context has unsupported return type '$trimmed'."
}

function Repair-ModularJobPoller {
  param(
    [Parameter(Mandatory)][string]$PackagePath,
    [Parameter(Mandatory)][string]$Method
  )

  $rule = 'Restore job-aware pollers'
  $file = Join-Path $script:PackageRootPath $PackagePath
  if (-not (Test-Path -LiteralPath $file -PathType Leaf)) {
    throw "[$rule] Missing modular target $PackagePath."
  }

  $content = Read-TextFile -Path $file
  $methodPattern = [regex]::new("(?ms)^export function $([regex]::Escape($Method))\((?<parameters>.*?)\)\s*:\s*(?<returnType>[^\{\r\n]+)\s*\{\r?\n(?<body>.*?)(?=^}\r?$)")
  $matches = $methodPattern.Matches($content)
  if ($matches.Count -ne 1) {
    throw "[$rule] Expected exactly one $Method definition in $PackagePath; found $($matches.Count)."
  }

  $methodMatch = $matches[0]
  $typeState = Get-PollerTypeState -ReturnType $methodMatch.Groups['returnType'].Value -Context "$PackagePath::$Method"
  $updated = $content
  $count = 0
  if ($typeState.State -eq 'Emitted') {
    $body = $methodMatch.Groups['body'].Value
    $callReplacement = Replace-IdentifierInCode -Content $body -Old 'getLongRunningPoller' -New 'getJobPoller'
    if ($callReplacement.Count -ne 1) {
      throw "[$rule] $PackagePath::$Method must contain exactly one getLongRunningPoller call; found $($callReplacement.Count)."
    }

    $terminalPattern = [regex]::Escape($typeState.TerminalType)
    $castPattern = "\)\s+as\s+PollerLike<OperationState<$terminalPattern>,\s*$terminalPattern>;"
    $castMatches = [regex]::Matches($callReplacement.Content, $castPattern)
    if ($castMatches.Count -ne 1) {
      throw "[$rule] $PackagePath::$Method must contain exactly one matching PollerLike cast; found $($castMatches.Count)."
    }
    $newBody = [regex]::Replace($callReplacement.Content, $castPattern, ');')

    $bodyGroup = $methodMatch.Groups['body']
    $updated = $updated.Remove($bodyGroup.Index, $bodyGroup.Length).Insert($bodyGroup.Index, $newBody)
    $returnGroup = $methodMatch.Groups['returnType']
    $updated = $updated.Remove($returnGroup.Index, $returnGroup.Length).Insert($returnGroup.Index, "JobPoller<$($typeState.TerminalType)> ")
    $count += 3
  }

  $coreImportRemoval = Remove-NamedImportSymbols -Content $updated -Module '@azure/core-lro' -Symbols @('PollerLike', 'OperationState')
  $withoutCoreImport = $coreImportRemoval.Content
  foreach ($symbol in @('PollerLike', 'OperationState')) {
    $remaining = Replace-IdentifierInCode -Content $withoutCoreImport -Old $symbol -New $symbol
    if ($remaining.Count -gt 0) {
      throw "[$rule] $PackagePath still uses $symbol outside the targeted job operation."
    }
  }
  $updated = $withoutCoreImport
  $count += $coreImportRemoval.Count

  $oldPollingImport = Remove-NamedImportSymbols -Content $updated -Module '../../../static-helpers/pollingHelpers.js' -Symbols @('getLongRunningPoller')
  $updated = $oldPollingImport.Content
  $count += $oldPollingImport.Count
  $jobTypeImport = Ensure-NamedImportSymbol -Content $updated -Module '../../../static-helpers/pollingHelpers.js' -Symbol 'JobPoller' -TypeOnly
  $updated = $jobTypeImport.Content
  $count += $jobTypeImport.Count
  $jobValueImport = Ensure-NamedImportSymbol -Content $updated -Module '../../../static-helpers/pollingHelpers.js' -Symbol 'getJobPoller'
  $updated = $jobValueImport.Content
  $count += $jobValueImport.Count

  $verification = $methodPattern.Match($updated)
  if (-not $verification.Success) {
    throw "[$rule] Could not re-read $PackagePath::$Method after repair."
  }
  $verifiedType = Get-PollerTypeState -ReturnType $verification.Groups['returnType'].Value -Context "$PackagePath::$Method"
  $jobCall = Replace-IdentifierInCode -Content $verification.Groups['body'].Value -Old 'getJobPoller' -New 'getJobPoller'
  $longCall = Replace-IdentifierInCode -Content $verification.Groups['body'].Value -Old 'getLongRunningPoller' -New 'getLongRunningPoller'
  if ($verifiedType.State -ne 'Desired' -or $jobCall.Count -ne 1 -or $longCall.Count -ne 0) {
    throw "[$rule] $PackagePath::$Method does not satisfy the JobPoller postcondition."
  }

  if ($updated -cne $content) {
    [void](Write-TextFile -Path $file -Content $updated -Rule $rule -Count $count)
  }

  return $verifiedType.TerminalType
}

function Repair-ClassicJobPoller {
  param(
    [Parameter(Mandatory)][string]$PackagePath,
    [Parameter(Mandatory)][string]$Method,
    [Parameter(Mandatory)][string]$TerminalType
  )

  $rule = 'Restore job-aware pollers'
  $file = Join-Path $script:PackageRootPath $PackagePath
  if (-not (Test-Path -LiteralPath $file -PathType Leaf)) {
    throw "[$rule] Missing classic target $PackagePath."
  }

  $content = Read-TextFile -Path $file
  $methodPattern = [regex]::new("(?ms)^\s{2}$([regex]::Escape($Method)):\s*\(.*?^\s{2}\)\s*=>\s*(?<returnType>[^;\r\n]+);")
  $matches = $methodPattern.Matches($content)
  if ($matches.Count -ne 1) {
    throw "[$rule] Expected exactly one classic $Method signature in $PackagePath; found $($matches.Count)."
  }

  $typeState = Get-PollerTypeState -ReturnType $matches[0].Groups['returnType'].Value -Context "$PackagePath::$Method"
  if ($typeState.TerminalType -cne $TerminalType) {
    throw "[$rule] $PackagePath::$Method terminal type '$($typeState.TerminalType)' does not match modular type '$TerminalType'."
  }

  $updated = $content
  $count = 0
  if ($typeState.State -eq 'Emitted') {
    $returnGroup = $matches[0].Groups['returnType']
    $updated = $updated.Remove($returnGroup.Index, $returnGroup.Length).Insert($returnGroup.Index, "JobPoller<$TerminalType>")
    $count++
  }

  $coreImportRemoval = Remove-NamedImportSymbols -Content $updated -Module '@azure/core-lro' -Symbols @('PollerLike', 'OperationState')
  $updated = $coreImportRemoval.Content
  $count += $coreImportRemoval.Count
  foreach ($symbol in @('PollerLike', 'OperationState')) {
    $remaining = Replace-IdentifierInCode -Content $updated -Old $symbol -New $symbol
    if ($remaining.Count -gt 0) {
      throw "[$rule] $PackagePath still uses $symbol outside the targeted classic signature."
    }
  }

  $jobTypeImport = Ensure-NamedImportSymbol -Content $updated -Module '../../../static-helpers/pollingHelpers.js' -Symbol 'JobPoller' -TypeOnly
  $updated = $jobTypeImport.Content
  $count += $jobTypeImport.Count

  $verification = $methodPattern.Match($updated)
  if (-not $verification.Success) {
    throw "[$rule] Could not re-read classic $PackagePath::$Method after repair."
  }
  $verifiedType = Get-PollerTypeState -ReturnType $verification.Groups['returnType'].Value -Context "$PackagePath::$Method"
  if ($verifiedType.State -ne 'Desired' -or $verifiedType.TerminalType -cne $TerminalType) {
    throw "[$rule] $PackagePath::$Method does not satisfy the JobPoller postcondition."
  }

  if ($updated -cne $content) {
    [void](Write-TextFile -Path $file -Content $updated -Rule $rule -Count $count)
  }
}

function Repair-JobPollers {
  $targets = @(
    [pscustomobject]@{
      Modular = 'src/api/beta/agents/operations.ts'
      Classic = 'src/classic/beta/agents/index.ts'
      Method = 'createOptimizationJob'
    },
    [pscustomobject]@{
      Modular = 'src/api/beta/datasets/operations.ts'
      Classic = 'src/classic/beta/datasets/index.ts'
      Method = 'createGenerationJob'
    },
    [pscustomobject]@{
      Modular = 'src/api/beta/evaluators/operations.ts'
      Classic = 'src/classic/beta/evaluators/index.ts'
      Method = 'createGenerationJob'
    }
  )

  foreach ($target in $targets) {
    $terminalType = Repair-ModularJobPoller -PackagePath $target.Modular -Method $target.Method
    Repair-ClassicJobPoller -PackagePath $target.Classic -Method $target.Method -TerminalType $terminalType
  }
}

function Find-MatchingBraceIndex {
  param(
    [Parameter(Mandatory)][AllowEmptyString()][string]$Content,
    [Parameter(Mandatory)][int]$OpeningIndex
  )

  if ($OpeningIndex -lt 0 -or $OpeningIndex -ge $Content.Length -or $Content[$OpeningIndex] -ne '{') {
    throw "Expected an opening brace at index $OpeningIndex."
  }

  $depth = 0
  $state = 'Code'
  $index = $OpeningIndex
  while ($index -lt $Content.Length) {
    $character = $Content[$index]
    $nextCharacter = if ($index + 1 -lt $Content.Length) { $Content[$index + 1] } else { [char]0 }
    switch ($state) {
      'Code' {
        if ($character -eq '/' -and $nextCharacter -eq '/') {
          $state = 'LineComment'
          $index += 2
          continue
        }
        if ($character -eq '/' -and $nextCharacter -eq '*') {
          $state = 'BlockComment'
          $index += 2
          continue
        }
        if ($character -eq "'") { $state = 'SingleQuote'; $index++; continue }
        if ($character -eq '"') { $state = 'DoubleQuote'; $index++; continue }
        if ($character -eq '`') { $state = 'Template'; $index++; continue }
        if ($character -eq '{') { $depth++ }
        if ($character -eq '}') {
          $depth--
          if ($depth -eq 0) {
            return $index
          }
        }
        $index++
      }
      'SingleQuote' {
        if ($character -eq '\') { $index += 2; continue }
        if ($character -eq "'") { $state = 'Code' }
        $index++
      }
      'DoubleQuote' {
        if ($character -eq '\') { $index += 2; continue }
        if ($character -eq '"') { $state = 'Code' }
        $index++
      }
      'Template' {
        if ($character -eq '\') { $index += 2; continue }
        if ($character -eq '`') { $state = 'Code' }
        $index++
      }
      'LineComment' {
        if ($character -eq "`n") { $state = 'Code' }
        $index++
      }
      'BlockComment' {
        if ($character -eq '*' -and $nextCharacter -eq '/') {
          $state = 'Code'
          $index += 2
          continue
        }
        $index++
      }
    }
  }

  throw "No matching closing brace found for index $OpeningIndex."
}

function Get-NamedDeclarationRanges {
  param(
    [Parameter(Mandatory)][AllowEmptyString()][string]$Content,
    [Parameter(Mandatory)][string]$Symbol
  )

  $declarationPattern = [regex]::new("(?m)^export\s+(?:interface|function)\s+$([regex]::Escape($Symbol))\b")
  $ranges = @()
  foreach ($declaration in $declarationPattern.Matches($Content)) {
    $openingBrace = $Content.IndexOf('{', $declaration.Index + $declaration.Length)
    if ($openingBrace -lt 0) {
      throw "[Remove duplicates and scratch files] Declaration '$Symbol' has no opening brace."
    }
    $closingBrace = Find-MatchingBraceIndex -Content $Content -OpeningIndex $openingBrace
    $start = $declaration.Index
    $docStart = $Content.LastIndexOf('/**', $declaration.Index, [System.StringComparison]::Ordinal)
    if ($docStart -ge 0) {
      $docEnd = $Content.IndexOf('*/', $docStart, [System.StringComparison]::Ordinal)
      if ($docEnd -ge 0 -and $docEnd + 2 -le $declaration.Index) {
        $between = $Content.Substring($docEnd + 2, $declaration.Index - ($docEnd + 2))
        if ($between -match '^\s*$') {
          $start = $docStart
        }
      }
    }

    $end = $closingBrace + 1
    if ($end -lt $Content.Length -and $Content[$end] -eq "`r") { $end++ }
    if ($end -lt $Content.Length -and $Content[$end] -eq "`n") { $end++ }
    $ranges += [pscustomobject]@{
      Start = $start
      Length = $end - $start
      DeclarationStart = $declaration.Index
      DeclarationEnd = $closingBrace + 1
    }
  }

  return $ranges
}

function Repair-KnownDuplicateDeclarations {
  $rule = 'Remove duplicates and scratch files'
  $modelsPath = Join-Path $script:PackageRootPath 'src/models/models.ts'
  if (-not (Test-Path -LiteralPath $modelsPath -PathType Leaf)) {
    return
  }

  $content = Read-TextFile -Path $modelsPath
  $updated = $content
  $count = 0
  $knownSymbols = @(
    'MCPToolFilter',
    'mcpToolFilterSerializer',
    'mcpToolFilterDeserializer',
    'MCPToolRequireApproval',
    'mcpToolRequireApprovalSerializer',
    'mcpToolRequireApprovalDeserializer'
  )
  foreach ($symbol in $knownSymbols) {
    $expectedKind = if ($symbol -in @('MCPToolFilter', 'MCPToolRequireApproval')) { 'interface' } else { 'function' }
    $declarationKinds = [regex]::Matches(
      $updated,
      "(?m)^export\s+(?<kind>interface|function|type|const|class)\s+$([regex]::Escape($symbol))\b"
    )
    $unexpectedKinds = @($declarationKinds | Where-Object { $_.Groups['kind'].Value -cne $expectedKind })
    if ($unexpectedKinds.Count -gt 0) {
      $kinds = @($unexpectedKinds | ForEach-Object { $_.Groups['kind'].Value } | Sort-Object -Unique)
      throw "[$rule] '$symbol' has an unrecognized declaration shape: $($kinds -join ', ')."
    }

    $ranges = @(Get-NamedDeclarationRanges -Content $updated -Symbol $symbol)
    if ($ranges.Count -le 1) {
      continue
    }
    for ($index = $ranges.Count - 1; $index -ge 1; $index--) {
      $updated = $updated.Remove($ranges[$index].Start, $ranges[$index].Length)
      $count++
    }
  }

  $agentVersionRanges = @(Get-NamedDeclarationRanges -Content $updated -Symbol 'AgentVersion')
  if ($agentVersionRanges.Count -gt 1) {
    throw "[$rule] Expected at most one AgentVersion declaration; found $($agentVersionRanges.Count)."
  }
  if ($agentVersionRanges.Count -eq 1) {
    $range = $agentVersionRanges[0]
    $segment = $updated.Substring($range.DeclarationStart, $range.DeclarationEnd - $range.DeclarationStart)
    $statusPattern = [regex]::new('(?m)^(?<line>[ \t]*status\??:\s*(?<type>[^;\r\n]+);\r?\n?)')
    $statusMatches = $statusPattern.Matches($segment)
    if ($statusMatches.Count -gt 1) {
      $desired = @($statusMatches | Where-Object { $_.Groups['type'].Value.Trim() -ceq 'AgentVersionStatus' })
      if ($desired.Count -ne 1) {
        throw "[$rule] AgentVersion duplicate status properties do not contain exactly one AgentVersionStatus property."
      }
      for ($index = $statusMatches.Count - 1; $index -ge 0; $index--) {
        $statusMatch = $statusMatches[$index]
        if ($statusMatch.Groups['type'].Value.Trim() -ceq 'AgentVersionStatus') {
          continue
        }
        $duplicateType = $statusMatch.Groups['type'].Value.Trim()
        if ($duplicateType -notmatch '^(?:string|(?:["''][^"'']+["'']\s*\|\s*)*["''][^"'']+["''])$') {
          throw "[$rule] AgentVersion has an unrecognized duplicate status type '$duplicateType'."
        }
        $segment = $segment.Remove($statusMatch.Index, $statusMatch.Length)
        $count++
      }
      $updated = $updated.Remove($range.DeclarationStart, $range.DeclarationEnd - $range.DeclarationStart).Insert($range.DeclarationStart, $segment)
    }
  }

  $deserializerRanges = @(Get-NamedDeclarationRanges -Content $updated -Symbol 'agentVersionDeserializer')
  if ($deserializerRanges.Count -gt 1) {
    throw "[$rule] Expected at most one agentVersionDeserializer declaration; found $($deserializerRanges.Count)."
  }
  if ($deserializerRanges.Count -eq 1) {
    $range = $deserializerRanges[0]
    $segment = $updated.Substring($range.DeclarationStart, $range.DeclarationEnd - $range.DeclarationStart)
    $statusPattern = [regex]::new('(?m)^(?<line>[ \t]*status:\s*(?<value>[^,\r\n]+),\r?\n?)')
    $statusMatches = $statusPattern.Matches($segment)
    if ($statusMatches.Count -gt 1) {
      foreach ($statusMatch in $statusMatches) {
        if ($statusMatch.Groups['value'].Value.Trim() -cne 'item["status"]') {
          throw "[$rule] agentVersionDeserializer has an unrecognized duplicate status value."
        }
      }
      for ($index = $statusMatches.Count - 1; $index -ge 1; $index--) {
        $segment = $segment.Remove($statusMatches[$index].Index, $statusMatches[$index].Length)
        $count++
      }
      $updated = $updated.Remove($range.DeclarationStart, $range.DeclarationEnd - $range.DeclarationStart).Insert($range.DeclarationStart, $segment)
    }
  }

  foreach ($symbol in $knownSymbols) {
    $ranges = @(Get-NamedDeclarationRanges -Content $updated -Symbol $symbol)
    if ($ranges.Count -gt 1) {
      throw "[$rule] Duplicate declaration '$symbol' remains."
    }
  }

  if ($updated -cne $content) {
    [void](Write-TextFile -Path $modelsPath -Content $updated -Rule $rule -Count $count)
  }
}

function Remove-ScratchArtifacts {
  $rule = 'Remove duplicates and scratch files'
  $scratchPaths = @('metadata.json', 'agent_version_lines.txt')
  foreach ($packagePath in $scratchPaths) {
    $fullPath = Join-Path $script:PackageRootPath $packagePath
    if (-not (Test-Path -LiteralPath $fullPath -PathType Leaf)) {
      continue
    }
    Remove-Item -LiteralPath $fullPath -Force
    [void]$script:ModifiedFiles.Add($packagePath)
    $script:RuleCounts[$rule]++
  }

  $untrackedSource = (Invoke-GitCommand -GitArguments @('ls-files', '--others', '--exclude-standard', '--', 'src')).Lines
  foreach ($packagePath in $untrackedSource) {
    if ($packagePath -notmatch '\.(?:tmp|tmp2|bak)$') {
      continue
    }
    $fullPath = Join-Path $script:PackageRootPath $packagePath
    if (Test-Path -LiteralPath $fullPath -PathType Leaf) {
      Remove-Item -LiteralPath $fullPath -Force
      [void]$script:ModifiedFiles.Add($packagePath)
      $script:RuleCounts[$rule]++
    }
  }

  $remaining = @($scratchPaths | Where-Object { Test-Path -LiteralPath (Join-Path $script:PackageRootPath $_) })
  $remaining += @(
    (Invoke-GitCommand -GitArguments @('ls-files', '--others', '--exclude-standard', '--', 'src')).Lines |
      Where-Object { $_ -match '\.(?:tmp|tmp2|bak)$' }
  )
  if ($remaining.Count -gt 0) {
    throw "[$rule] Scratch artifacts remain: $($remaining -join ', ')"
  }
}

function Repair-DuplicatesAndScratchArtifacts {
  Repair-KnownDuplicateDeclarations
  Remove-ScratchArtifacts
}

function Resolve-KnownDiff3Conflicts {
  $rule = 'Resolve known diff3 conflicts'
  $conflictPattern = '(?ms)^<<<<<<<[^\r\n]*\r?\n.*?^\|\|\|\|\|\|\|[^\r\n]*\r?\n.*?^=======\r?\n(?<custom>.*?)^>>>>>>>[^\r\n]*(?:\r?\n|$)'
  $markerPattern = '(?m)^(?:<<<<<<<|\|\|\|\|\|\|\||=======|>>>>>>>)[^\r\n]*\r?$'
  $conflictRegex = [regex]::new($conflictPattern)

  foreach ($file in Get-SourceFiles -TrackedOnly) {
    $content = Read-TextFile -Path $file
    $startCount = ([regex]::Matches($content, '(?m)^<<<<<<<[^\r\n]*\r?$')).Count
    if ($startCount -eq 0) {
      continue
    }

    $matches = $conflictRegex.Matches($content)
    if ($matches.Count -ne $startCount) {
      $packagePath = Convert-ToPackagePath -Path $file
      throw "[$rule] $packagePath contains $startCount conflict start marker(s), but only $($matches.Count) complete diff3 block(s)."
    }

    $resolved = $conflictRegex.Replace($content, '${custom}')
    [void](Write-TextFile -Path $file -Content $resolved -Rule $rule -Count $matches.Count)
    Write-Host "[$rule] $(Convert-ToPackagePath -Path $file): $($matches.Count) block(s)"
  }

  $remaining = @()
  foreach ($file in Get-SourceFiles) {
    if ([regex]::IsMatch((Read-TextFile -Path $file), $markerPattern)) {
      $remaining += Convert-ToPackagePath -Path $file
    }
  }
  if ($remaining.Count -gt 0) {
    throw "[$rule] Conflict markers remain in: $($remaining -join ', ')"
  }
}

function Test-ProtectedPath {
  param([Parameter(Mandatory)][string]$PackagePath)

  if ($PackagePath.StartsWith('src/static-helpers/', [System.StringComparison]::Ordinal)) {
    return $true
  }

  return $script:ProtectedPaths -contains $PackagePath
}

function Restore-ProtectedPaths {
  $rule = 'Restore protected paths'
  $changedPaths = @(
    (Invoke-GitCommand -GitArguments @('diff', '--name-only', '--no-renames', '--relative', $BaseRef, '--', 'src')).Lines
    (Invoke-GitCommand -GitArguments @('ls-files', '--others', '--exclude-standard', '--', 'src')).Lines
  ) | Sort-Object -Unique

  $violations = @($changedPaths | Where-Object { Test-ProtectedPath -PackagePath $_ })
  foreach ($packagePath in $violations) {
    $repositoryPath = Convert-ToRepositoryPath -PackagePath $packagePath
    $baseObject = Invoke-GitCommand -GitArguments @('cat-file', '-e', "${BaseRef}:$repositoryPath") -AllowFailure
    $fullPath = Join-Path $script:PackageRootPath $packagePath

    if ($baseObject.ExitCode -eq 0) {
      [void](Invoke-GitCommand -GitArguments @('restore', "--source=$BaseRef", '--worktree', '--', $packagePath))
    } elseif (Test-Path -LiteralPath $fullPath) {
      Remove-Item -LiteralPath $fullPath -Recurse -Force
    }

    [void]$script:ModifiedFiles.Add($packagePath)
    $script:RuleCounts[$rule]++
    Write-Host "[$rule] Restored $packagePath"
  }

  $remaining = @()
  foreach ($packagePath in $script:ProtectedPaths) {
    $comparison = Invoke-GitCommand -GitArguments @('diff', '--quiet', $BaseRef, '--', $packagePath) -AllowFailure
    if ($comparison.ExitCode -eq 1) {
      $remaining += $packagePath
    } elseif ($comparison.ExitCode -gt 1) {
      throw "[$rule] Failed to compare $packagePath with $BaseRef."
    }
  }

  $staticComparison = Invoke-GitCommand -GitArguments @('diff', '--quiet', $BaseRef, '--', 'src/static-helpers') -AllowFailure
  if ($staticComparison.ExitCode -eq 1) {
    $remaining += 'src/static-helpers/**'
  } elseif ($staticComparison.ExitCode -gt 1) {
    throw "[$rule] Failed to compare src/static-helpers with $BaseRef."
  }

  $untrackedStaticHelpers = (Invoke-GitCommand -GitArguments @('ls-files', '--others', '--exclude-standard', '--', 'src/static-helpers')).Lines
  if ($untrackedStaticHelpers.Count -gt 0) {
    $remaining += $untrackedStaticHelpers
  }

  if ($remaining.Count -gt 0) {
    throw "[$rule] Protected paths still differ from ${BaseRef}: $($remaining -join ', ')"
  }
}

function Write-RuleSummary {
  Write-Host ''
  Write-Host 'Post-emitter summary:'
  foreach ($entry in $script:RuleCounts.GetEnumerator()) {
    Write-Host "  $($entry.Key): $($entry.Value)"
  }

  if ($script:ModifiedFiles.Count -eq 0) {
    Write-Host '  Modified files: none'
  } else {
    Write-Host '  Modified files:'
    foreach ($file in @($script:ModifiedFiles) | Sort-Object) {
      Write-Host "    $file"
    }
  }
}

$resolvedPackageRoot = Resolve-Path -LiteralPath $PackageRoot -ErrorAction Stop
$script:PackageRootPath = $resolvedPackageRoot.Path.TrimEnd([System.IO.Path]::DirectorySeparatorChar, [System.IO.Path]::AltDirectorySeparatorChar)
$script:SourceRoot = Join-Path $script:PackageRootPath 'src'

$repositoryRootResult = Invoke-GitCommand -GitArguments @('rev-parse', '--show-toplevel')
$script:RepositoryRootPath = (Resolve-Path -LiteralPath $repositoryRootResult.Lines[0]).Path.TrimEnd([System.IO.Path]::DirectorySeparatorChar, [System.IO.Path]::AltDirectorySeparatorChar)
$repositoryPrefix = "$($script:RepositoryRootPath)$([System.IO.Path]::DirectorySeparatorChar)"
if ($script:PackageRootPath -cne $script:RepositoryRootPath -and -not $script:PackageRootPath.StartsWith($repositoryPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw "Package root '$($script:PackageRootPath)' is not inside Git worktree '$($script:RepositoryRootPath)'."
}

$packagePathFromRoot = [System.IO.Path]::GetRelativePath($script:RepositoryRootPath, $script:PackageRootPath).Replace('\', '/')
$script:PackagePathFromRepositoryRoot = if ($packagePathFromRoot -eq '.') { '' } else { $packagePathFromRoot }

[void](Invoke-GitCommand -GitArguments @('rev-parse', '--verify', "${BaseRef}^{commit}"))
$stagedPackagePaths = (Invoke-GitCommand -GitArguments @('diff', '--cached', '--name-only', '--relative', '--', '.')).Lines
if ($stagedPackagePaths.Count -gt 0) {
  throw "Refusing to proceed: staged package changes would be overwritten or mixed with post-emitter output:`n$($stagedPackagePaths -join "`n")"
}

$script:ProtectedPaths = @(
  'src/aiProjectClient.ts',
  'src/constants.ts',
  'src/getCustomFetch-browser.mts',
  'src/getCustomFetch.ts',
  'src/overwriteOpenAIClient.ts',
  'src/util.ts',
  'src/api/aiProjectContext.ts',
  'src/api/telemetry/index.ts',
  'src/api/telemetry/operations.ts',
  'src/api/datasets/operations.ts',
  'src/classic/telemetry/index.ts',
  'src/classic/datasets/index.ts',
  'src/classic/index.ts'
)

Resolve-KnownDiff3Conflicts
Restore-ProtectedPaths
Remove-RestorePollerHelperArtifact
Repair-GeneratedImportRenames
Repair-GeneratedOperationRenames
Repair-ApiVersionEncoding
Repair-FoundryFeaturesParameters
Repair-BetaEvaluatorListNaming
Repair-KnownPositionalRenames
Repair-NodeBuiltinImports
Repair-JobPollers
Repair-DuplicatesAndScratchArtifacts

[void](Invoke-GitCommand -GitArguments @('diff', '--check', '--', '.'))
Write-RuleSummary