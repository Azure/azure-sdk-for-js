# Contract tests for the template-only release completion correlation pilot.
# Requires Pester 5 and powershell-yaml. No Azure pipeline or release is executed.

BeforeAll {
  Import-Module powershell-yaml -ErrorAction Stop
  $repoRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../../..'))
  $baseline = '9fb069e68304834d8ac98ce8b412af0f6fd8bdf0'
  $entryPath = 'sdk/template/ci.yml'
  $clientPath = 'eng/pipelines/templates/stages/archetype-sdk-client.yml'
  $releasePath = 'eng/pipelines/templates/stages/archetype-js-release.yml'
  $templateGuard = '${{ if eq(parameters.ServiceDirectory, ''template'') }}'
  $autoGuard = '${{ if and(eq(variables[''Build.Reason''], ''IndividualCI''), eq(variables[''Build.SourceBranch''], ''refs/heads/main'')) }}'
  $variableGuard = '${{ if and(eq(parameters.ServiceDirectory, ''template''), eq(variables[''Build.Reason''], ''IndividualCI''), eq(variables[''Build.SourceBranch''], ''refs/heads/main'')) }}'
  $expression = '$[ stageDependencies.AutoReleasePrepare.ResolveAutoReleasePackages.outputs[''resolve.AutoReleaseSdkPullRequestUrl''] ]'

  function Read-Pipeline([string] $Path, [switch] $Original) {
    if ($Original) {
      $raw = (git -C $repoRoot show "${baseline}:$Path") -join "`n"
      if ($LASTEXITCODE -ne 0) { throw "Cannot read baseline $Path" }
    } else {
      $raw = [IO.File]::ReadAllText((Join-Path $repoRoot $Path))
    }
    return ConvertFrom-Yaml $raw -Ordered
  }

  function Find-Nodes($Node, [string] $Key, [string] $Value) {
    if ($Node -is [System.Collections.IDictionary]) {
      if ($Node.Contains($Key) -and $Node[$Key] -eq $Value) { ,$Node }
      foreach ($child in $Node.Values) { Find-Nodes $child $Key $Value }
    } elseif ($Node -is [System.Collections.IList]) {
      foreach ($child in $Node) { Find-Nodes $child $Key $Value }
    }
  }

  function Get-Completion($Pipeline) {
    $nodes = @(Find-Nodes $Pipeline 'template' '/eng/common/pipelines/templates/steps/mark-release-completion.yml')
    $nodes.Count | Should -Be 1
    return $nodes[0]
  }

  function Get-ReleaseRelay($Pipeline) {
    return @(Find-Nodes $Pipeline 'template' 'archetype-js-release.yml@self')[0]
  }

  # Evaluate only the new pilot guards, not Azure's full template language.
  function Get-Correlation($Pipeline, [string] $Service, [string] $Reason, [string] $Branch) {
    $completion = Get-Completion $Pipeline
    $result = @{}
    if ($Service -eq 'template') {
      $result.ReleasePlanId = $completion.parameters[$templateGuard].ReleasePlanId
      if ($Reason -eq 'IndividualCI' -and $Branch -eq 'refs/heads/main') {
        $result.SdkPullRequest = $completion.parameters[$templateGuard][$autoGuard].SdkPullRequest
      }
    }
    return $result
  }

  $entry = Read-Pipeline $entryPath
  $client = Read-Pipeline $clientPath
  $release = Read-Pipeline $releasePath
}

Describe 'Template completion correlation' {
  It 'declares a string sentinel and relays the input without conversion' {
    $inputParameter = @($entry.parameters | Where-Object name -EQ ReleasePlanId)
    $inputParameter.Count | Should -Be 1
    $inputParameter[0].type | Should -BeExactly 'string'
    $inputParameter[0].default | Should -BeOfType ([string])
    $inputParameter[0].default | Should -BeExactly '0'
    $entry.extends.parameters.ReleasePlanId | Should -BeExactly '${{ parameters.ReleasePlanId }}'
    $clientParameter = @($client.parameters | Where-Object name -EQ ReleasePlanId)[0]
    $clientParameter.type | Should -BeExactly 'string'
    $clientParameter.default | Should -BeOfType ([string])
    $clientParameter.default | Should -BeExactly '0'
    $relay = Get-ReleaseRelay $client
    $relay.parameters.Contains('ReleasePlanId') | Should -BeFalse
    $relay.parameters[$templateGuard].ReleasePlanId | Should -BeExactly '${{ parameters.ReleasePlanId }}'
    $release.parameters.ReleasePlanId | Should -BeOfType ([string])
    $release.parameters.ReleasePlanId | Should -BeExactly '0'
  }

  It 'preserves raw string <Raw> for downstream CLI validation' -ForEach @(
    @{ Raw = '0' }, @{ Raw = '35307' }, @{ Raw = '2147483647' }, @{ Raw = '100.6' }
  ) {
    $rawYaml = [IO.File]::ReadAllText((Join-Path $repoRoot $entryPath))
    $parsed = ConvertFrom-Yaml ($rawYaml.Replace("default: '0'", "default: '$Raw'")) -Ordered
    $parameter = @($parsed.parameters | Where-Object name -EQ ReleasePlanId)[0]
    $parameter.default | Should -BeOfType ([string])
    $parameter.default | Should -BeExactly $Raw
    $correlation = Get-Correlation $release 'template' 'Manual' 'refs/heads/main'
    # The relay and completion use the same unmodified parameter expression.
    $correlation.ReleasePlanId | Should -BeExactly $parsed.extends.parameters.ReleasePlanId
  }

  It 'maps the output at release-stage scope only for automatic template main CI' {
    $stages = @(Find-Nodes $release 'stage' 'Release_${{artifact.safename}}')
    $stages.Count | Should -Be 1
    $mapping = @($stages[0].variables | Where-Object { $_.Contains($variableGuard) })
    $mapping.Count | Should -Be 1
    $mapping[0][$variableGuard][0].name | Should -BeExactly 'AutoReleaseSdkPullRequestUrl'
    $mapping[0][$variableGuard][0].value | Should -BeExactly $expression
    $correlation = Get-Correlation $release 'template' 'IndividualCI' 'refs/heads/main'
    $correlation.SdkPullRequest | Should -BeExactly '$(AutoReleaseSdkPullRequestUrl)'
    $completion = Get-Completion $release
    $completion.parameters.Contains('SdkPullRequest') | Should -BeFalse
    $completion.parameters.Contains('ReleasePlanId') | Should -BeFalse
  }

  It 'does not pass an automatic PR for <Reason> on <Branch>' -ForEach @(
    @{ Reason = 'Manual'; Branch = 'refs/heads/main' },
    @{ Reason = 'Schedule'; Branch = 'refs/heads/main' },
    @{ Reason = 'PullRequest'; Branch = 'refs/pull/1/merge' },
    @{ Reason = 'BatchedCI'; Branch = 'refs/heads/main' },
    @{ Reason = 'IndividualCI'; Branch = 'refs/heads/release/test' },
    @{ Reason = 'IndividualCI'; Branch = 'refs/heads/hotfix/test' }
  ) {
    $correlation = Get-Correlation $release 'template' $Reason $Branch
    $correlation.ContainsKey('SdkPullRequest') | Should -BeFalse
  }

  It 'leaves non-template completion inputs unchanged for <Service> / <Reason>' -ForEach @(
    @{ Service = 'identity'; Reason = 'Manual' },
    @{ Service = 'identity'; Reason = 'IndividualCI' },
    @{ Service = 'not-specified'; Reason = 'IndividualCI' }
  ) {
    (Get-Correlation $release $Service $Reason 'refs/heads/main').Count | Should -Be 0
    $actual = (Get-Completion $release).parameters
    $original = (Get-Completion (Read-Pipeline $releasePath -Original)).parameters
    $withoutPilot = [ordered]@{}
    foreach ($key in $actual.Keys) {
      if ($key -ne $templateGuard) { $withoutPilot[$key] = $actual[$key] }
    }
    ($withoutPilot | ConvertTo-Json -Depth 100 -Compress) | Should -BeExactly ($original | ConvertTo-Json -Depth 100 -Compress)
  }

  It 'keeps completion inside UpdatePackageVersion after publication and APIView' {
    $job = @(Find-Nodes $release 'job' 'UpdatePackageVersion')[0]
    $job.dependsOn | Should -BeExactly 'PublishPackage_${{ replace(artifact.name, ''-'', ''_'') }}_To_DevFeed'
    $job.condition | Should -BeExactly "and(succeeded(), ne(variables['Skip.UpdatePackageVersion'], 'true'))"
    $job.steps[-1].template | Should -BeExactly '/eng/common/pipelines/templates/steps/mark-release-completion.yml'
    $job.steps[-2].template | Should -BeExactly '/eng/common/pipelines/templates/steps/create-apireview.yml'
  }

  It 'preserves the complete parsed baseline except the explicitly added correlation nodes' {
    $entryCopy = Read-Pipeline $entryPath
    $entryCopy.parameters = @($entryCopy.parameters | Where-Object name -NE ReleasePlanId)
    $entryCopy.extends.parameters.Remove('ReleasePlanId')
    $clientCopy = Read-Pipeline $clientPath
    $clientCopy.parameters = @($clientCopy.parameters | Where-Object name -NE ReleasePlanId)
    (Get-ReleaseRelay $clientCopy).parameters[$templateGuard].Remove('ReleasePlanId')
    $releaseCopy = Read-Pipeline $releasePath
    $releaseCopy.parameters.Remove('ReleasePlanId')
    $stage = @(Find-Nodes $releaseCopy 'stage' 'Release_${{artifact.safename}}')[0]
    $stage.variables = @($stage.variables | Where-Object { -not $_.Contains($variableGuard) })
    (Get-Completion $releaseCopy).parameters.Remove($templateGuard)
    foreach ($pair in @(
      @{ Path = $entryPath; Actual = $entryCopy },
      @{ Path = $clientPath; Actual = $clientCopy },
      @{ Path = $releasePath; Actual = $releaseCopy }
    )) {
      ($pair.Actual | ConvertTo-Json -Depth 100 -Compress) | Should -BeExactly ((Read-Pipeline $pair.Path -Original) | ConvertTo-Json -Depth 100 -Compress)
    }
  }

  It 'does not modify shared engineering files or any SDK package content' {
    $paths = @(git -C $repoRoot diff --name-only $baseline)
    if ($LASTEXITCODE -ne 0) { throw 'Cannot inspect pilot scope' }
    $allowed = @($entryPath, $clientPath, $releasePath, 'eng/scripts/tests/Release-CompletionCorrelation.tests.ps1')
    @($paths | Where-Object { $_ -notin $allowed }).Count | Should -Be 0
    @(git -C $repoRoot diff --name-only $baseline -- eng/common).Count | Should -Be 0
  }
}
