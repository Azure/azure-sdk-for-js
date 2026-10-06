# Contract tests for the template-only release completion correlation pilot.
# Requires Pester 5 and powershell-yaml. No Azure pipeline or release is executed.

BeforeAll {
  Import-Module powershell-yaml -ErrorAction Stop
  $repoRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../../..'))
  $entryPath = 'sdk/template/ci.yml'
  $clientPath = 'eng/pipelines/templates/stages/archetype-sdk-client.yml'
  $releasePath = 'eng/pipelines/templates/stages/archetype-js-release.yml'
  $templateGuard = '${{ if eq(parameters.ServiceDirectory, ''template'') }}'
  $autoGuard = '${{ if and(eq(variables[''Build.Reason''], ''IndividualCI''), eq(variables[''Build.SourceBranch''], ''refs/heads/main'')) }}'
  $variableGuard = '${{ if and(eq(parameters.ServiceDirectory, ''template''), eq(variables[''Build.Reason''], ''IndividualCI''), eq(variables[''Build.SourceBranch''], ''refs/heads/main'')) }}'
  $expression = '$[ stageDependencies.AutoReleasePrepare.ResolveAutoReleasePackages.outputs[''resolve.AutoReleaseSdkPullRequestUrl''] ]'

  function Read-Pipeline([string] $Path) {
    $raw = [IO.File]::ReadAllText((Join-Path $repoRoot $Path))
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
    $nodes = @(Find-Nodes $Pipeline 'template' 'archetype-js-release.yml@self')
    $nodes.Count | Should -Be 1
    return $nodes[0]
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
    @($mapping[0][$variableGuard]).Count | Should -Be 1
    $mapping[0][$variableGuard][0].name | Should -BeExactly 'AutoReleaseSdkPullRequestUrl'
    $mapping[0][$variableGuard][0].value | Should -BeExactly $expression
    @(Find-Nodes $release 'name' 'AutoReleaseSdkPullRequestUrl').Count | Should -Be 1
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
    $parameters = (Get-Completion $release).parameters
    (@($parameters.Keys | Sort-Object) -join '|') | Should -BeExactly ((@('ConfigFileDir', 'PackageArtifactName', $templateGuard) | Sort-Object) -join '|')
    $parameters.ConfigFileDir | Should -BeExactly '$(Pipeline.Workspace)/packages/PackageInfo'
    $parameters.PackageArtifactName | Should -BeExactly '${{ artifact.name }}'
    $pilot = $parameters[$templateGuard]
    (@($pilot.Keys | Sort-Object) -join '|') | Should -BeExactly ((@('ReleasePlanId', $autoGuard) | Sort-Object) -join '|')
    (@($pilot[$autoGuard].Keys) -join '|') | Should -BeExactly 'SdkPullRequest'
    $pilot.ReleasePlanId | Should -BeExactly '${{ parameters.ReleasePlanId }}'
    $pilot[$autoGuard].SdkPullRequest | Should -BeExactly '$(AutoReleaseSdkPullRequestUrl)'
  }

  It 'keeps completion inside UpdatePackageVersion after publication and APIView' {
    $stages = @(Find-Nodes $release 'stage' 'Release_${{artifact.safename}}')
    $guards = @($stages[0].jobs | Where-Object { $_.Contains('${{ if ne(artifact.skipUpdatePackageVersion, ''true'') }}') })
    $guards.Count | Should -Be 1
    $jobs = @(Find-Nodes $guards[0]['${{ if ne(artifact.skipUpdatePackageVersion, ''true'') }}'] 'job' 'UpdatePackageVersion')
    $jobs.Count | Should -Be 1
    @(Find-Nodes $release 'job' 'UpdatePackageVersion').Count | Should -Be 1
    $job = $jobs[0]
    $job.dependsOn | Should -BeExactly 'PublishPackage_${{ replace(artifact.name, ''-'', ''_'') }}_To_DevFeed'
    $job.condition | Should -BeExactly "and(succeeded(), ne(variables['Skip.UpdatePackageVersion'], 'true'))"
    @(Find-Nodes $job 'template' '/eng/common/pipelines/templates/steps/mark-release-completion.yml').Count | Should -Be 1
    $job.steps[-1].template | Should -BeExactly '/eng/common/pipelines/templates/steps/mark-release-completion.yml'
    $job.steps[-2].template | Should -BeExactly '/eng/common/pipelines/templates/steps/create-apireview.yml'
    $job.steps[-2].parameters.MarkPackageAsShipped | Should -BeTrue
    $job.steps[-2].parameters.PackageName | Should -BeExactly '${{ artifact.name }}'
    $job.steps[-2].parameters.ArtifactName | Should -BeExactly '${{ parameters.ArtifactName }}'
    $job.steps[-2].parameters.ConfigFileDir | Should -BeExactly '$(Pipeline.Workspace)/packages/PackageInfo'
  }

  # Assert checked-in safety contracts directly: shallow CI needs no historical objects.
  It 'keeps template artifacts and CI triggers unchanged without publish overrides' {
    $entry.extends.template | Should -BeExactly '../../eng/pipelines/templates/stages/archetype-sdk-client.yml'
    (@($entry.extends.parameters.Keys | Sort-Object) -join '|') | Should -BeExactly 'Artifacts|oneESTemplateTag|ReleasePlanId|ServiceDirectory'
    $entry.extends.parameters.ServiceDirectory | Should -BeExactly 'template'
    $entry.extends.parameters.oneESTemplateTag | Should -BeExactly '${{ parameters.oneESTemplateTag }}'
    $artifacts = @($entry.extends.parameters.Artifacts)
    $artifacts.Count | Should -Be 2
    $artifacts[0].name | Should -BeExactly 'azure-template'
    $artifacts[0].safeName | Should -BeExactly 'azuretemplate'
    (@($artifacts[0].Keys | Sort-Object) -join '|') | Should -BeExactly 'name|safeName|triggeringPaths'
    @($artifacts[0].triggeringPaths) -join '|' | Should -BeExactly '/sdk/test-utils/|/sdk/identity/|/.config/|/.devcontainer/|/.github/|/.scripts/|/common/|/eng/'
    $artifacts[1].name | Should -BeExactly 'azure-template-dpg'
    $artifacts[1].safeName | Should -BeExactly 'azuretemplatedpg'
    (@($artifacts[1].Keys | Sort-Object) -join '|') | Should -BeExactly 'name|safeName'
    @($entry.trigger.branches.include) -join '|' | Should -BeExactly 'main|release/*|hotfix/*'
    @($entry.pr.branches.include) -join '|' | Should -BeExactly 'main|feature/*|release/*|hotfix/*'
    foreach ($trigger in @($entry.trigger, $entry.pr)) {
      @($trigger.paths.include) -join '|' | Should -BeExactly 'sdk/template/|eng/common/'
    }
  }

  It 'keeps client release eligibility, build dependency and template-only test settings' {
    $gate = '${{if and(not(and(eq(parameters.SkipPrValidation, true), eq(variables[''Build.Reason''], ''Manual''))), ne(variables[''Build.Reason''], ''PullRequest''), eq(variables[''System.TeamProject''], ''internal''), eq(parameters.IncludeRelease,true))}}'
    $guarded = @($client.extends.parameters.stages | Where-Object { $_.Contains($gate) })
    $guarded.Count | Should -Be 1
    @(Find-Nodes $guarded[0][$gate] 'template' 'archetype-js-release.yml@self').Count | Should -Be 1
    $parameters = (Get-ReleaseRelay $client).parameters
    (@($parameters.Keys | Sort-Object) -join '|') | Should -BeExactly ((@('DependsOn', 'ServiceDirectory', 'TestProxy', 'Artifacts', 'TargetDocRepoOwner', 'TargetDocRepoName', $templateGuard) | Sort-Object) -join '|')
    $parameters.DependsOn | Should -BeExactly 'Build'
    foreach ($name in @('ServiceDirectory', 'TestProxy', 'Artifacts', 'TargetDocRepoOwner', 'TargetDocRepoName')) {
      $parameters[$name] | Should -BeExactly ('${{ parameters.' + $name + ' }}')
    }
    (@($parameters[$templateGuard].Keys | Sort-Object) -join '|') | Should -BeExactly 'ReleasePlanId|TestPipeline'
    $parameters[$templateGuard].TestPipeline | Should -BeTrue
    foreach ($name in @('IncludeRelease', 'TestProxy')) {
      $parameter = @($client.parameters | Where-Object name -EQ $name)
      $parameter.Count | Should -Be 1
      $parameter[0].type | Should -BeExactly 'boolean'
      $parameter[0].default | Should -BeTrue
    }
    $skip = @($client.parameters | Where-Object name -EQ SkipPrValidation)[0]
    $skip.type | Should -BeExactly 'boolean'
    $skip.default | Should -BeFalse
    $build = @(Find-Nodes $client 'stage' 'Build')
    $build.Count | Should -Be 1
    $build[0].condition | Should -BeExactly 'not(and(eq(${{ parameters.SkipPrValidation }}, true), eq(variables[''Build.Reason''], ''Manual'')))'
  }

  It 'keeps release gates, artifact eligibility, environments and publication dependencies' {
    $gate = '${{ if and(eq(variables[''System.TeamProject''], ''internal''), or(in(variables[''Build.Reason''], ''Manual'', ''''), and(eq(variables[''Build.Reason''], ''IndividualCI''), eq(variables[''Build.SourceBranch''], ''refs/heads/main'')))) }}'
    $guarded = @($release.stages | Where-Object { $_.Contains($gate) })
    $guarded.Count | Should -Be 1
    @($release.stages).Count | Should -Be 2
    $eligible = $guarded[0][$gate]
    @($eligible).Count | Should -Be 2
    $prepare = $eligible[0][$autoGuard]
    @($prepare).Count | Should -Be 1
    $prepare[0].template | Should -BeExactly '/eng/common/pipelines/templates/stages/archetype-auto-release-prepare.yml'
    @($prepare[0].parameters.DependsOn) -join '|' | Should -BeExactly '${{ parameters.DependsOn }}'
    $prepare[0].parameters.Artifacts | Should -BeExactly '${{ parameters.Artifacts }}'
    $safe = 'and(succeeded(),ne(variables[''SetDevVersion''],''true''),ne(variables[''Skip.Release''],''true''),ne(variables[''Build.Repository.Name''],''Azure/azure-sdk-for-js-pr''))'
    ($prepare[0].parameters.Condition -replace '\s', '') | Should -BeExactly $safe
    $loop = $eligible[1]['${{ each artifact in parameters.Artifacts }}']
    @($loop).Count | Should -Be 1
    $stage = $loop[0]
    $stage.stage | Should -BeExactly 'Release_${{artifact.safename}}'
    $manual = $stage['${{ if in(variables[''Build.Reason''], ''Manual'', '''') }}']
    $manual.dependsOn | Should -BeExactly '${{parameters.DependsOn}}'
    ($manual.condition -replace '\s', '') | Should -BeExactly $safe
    @($stage['${{ else }}'].dependsOn) -join '|' | Should -BeExactly '${{parameters.DependsOn}}|AutoReleasePrepare'
    ($stage['${{ else }}'].condition -replace '\s', '') | Should -BeExactly 'and(succeeded(),eq(dependencies.AutoReleasePrepare.outputs[''ResolveAutoReleasePackages.resolve.ReleaseArtifact_${{artifact.safename}}''],''true''),ne(variables[''SetDevVersion''],''true''),ne(variables[''Skip.Release''],''true''),ne(variables[''Build.Repository.Name''],''Azure/azure-sdk-for-js-pr''))'
    $release.parameters.TestPipeline | Should -BeFalse
    $release.parameters.ArtifactName | Should -BeExactly 'packages'
    $release.parameters.DependsOn | Should -BeExactly 'Build'
    $tags = @(Find-Nodes $stage 'job' 'TagRepository')
    $tags.Count | Should -Be 1
    $tags[0].condition | Should -BeExactly 'ne(variables[''Skip.TagRepository''], ''true'')'
    $tagStep = @(Find-Nodes $tags[0] 'template' '/eng/common/pipelines/templates/steps/create-tags-and-git-release.yml')[0]
    $tagStep.parameters.ArtifactLocation | Should -BeExactly '$(Pipeline.Workspace)/${{parameters.ArtifactName}}/${{artifact.name}}'
    $tagStep.parameters.PackageRepository | Should -BeExactly 'Npm'
    $tagStep.parameters.ReleaseSha | Should -BeExactly '$(Build.SourceVersion)'
    $publishGuard = @($stage.jobs | Where-Object { $_.Contains('${{ if ne(artifact.skipPublishPackage, ''true'') }}') })
    $publishGuard.Count | Should -Be 1
    $publishes = @(Find-Nodes $publishGuard[0]['${{ if ne(artifact.skipPublishPackage, ''true'') }}'] 'template' '/eng/common/pipelines/templates/jobs/npm-publish.yml')
    $publishes.Count | Should -Be 2
    @(Find-Nodes $stage 'template' '/eng/common/pipelines/templates/jobs/npm-publish.yml').Count | Should -Be 2
    $publishes[0].parameters.DeploymentName | Should -BeExactly 'PublishPackage_${{ replace(artifact.name, ''-'', ''_'') }}'
    $publishes[0].parameters.Contains('Registry') | Should -BeFalse
    $publishes[1].parameters.DeploymentName | Should -BeExactly 'PublishPackage_${{ replace(artifact.name, ''-'', ''_'') }}_To_DevFeed'
    $publishes[1].parameters.Registry | Should -BeExactly '$(PublicDevOpsRegistry)'
    foreach ($publish in $publishes) {
      $publish.parameters.DependsOn | Should -BeExactly 'TagRepository'
      $publish.parameters.ArtifactName | Should -BeExactly '${{ parameters.ArtifactName }}'
      $publish.parameters.ArtifactSubPath | Should -BeExactly '${{ artifact.name }}'
      $publish.parameters.Contains('Environment') | Should -BeFalse
      $publish.parameters[$autoGuard].Environment | Should -BeExactly 'none'
      $publish.parameters['${{ else }}'].Environment | Should -BeExactly 'package-publish'
    }
    $integration = @(Find-Nodes $release 'stage' 'Integration')
    $integration.Count | Should -Be 1
    $integration[0].dependsOn | Should -BeExactly '${{ parameters.DependsOn }}'
    $integration[0].condition | Should -BeExactly 'and(succeeded(), or(eq(variables[''SetDevVersion''], ''true''), and(eq(variables[''Build.Reason''],''Schedule''), eq(variables[''System.TeamProject''], ''internal''))))'
    $devPublish = @(Find-Nodes $integration[0] 'template' '/eng/common/pipelines/templates/jobs/npm-publish.yml')[0].parameters
    $devPublish.Tag | Should -BeExactly 'dev'
    $devPublish.ArtifactName | Should -BeExactly '${{ parameters.ArtifactName }}-dev-publish'
    $devPublish.Environment | Should -BeExactly 'none'
    $devPublish.FailOnMissingPackages | Should -BeFalse
  }
}
