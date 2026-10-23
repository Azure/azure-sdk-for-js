# Regression tests for passing the auto-release SDK PR to release-plan completion.
# Requires Pester 5 and powershell-yaml; does not execute a release.

BeforeAll {
  Import-Module powershell-yaml -ErrorAction Stop
  $repoRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../../..'))
  $release = ConvertFrom-Yaml (Get-Content (Join-Path $repoRoot 'eng/pipelines/templates/stages/archetype-js-release.yml') -Raw) -Ordered
  $script:autoGuard = '${{ if and(eq(variables[''Build.Reason''], ''IndividualCI''), eq(variables[''Build.SourceBranch''], ''refs/heads/main'')) }}'
  $script:outputExpression = '$[ stageDependencies.AutoReleasePrepare.ResolveAutoReleasePackages.outputs[''resolve.AutoReleaseSdkPullRequestUrl''] ]'

  function Find-PipelineNode($Node, [string] $Key, [string] $Value) {
    if ($Node -is [System.Collections.IDictionary]) {
      if ($Node.Contains($Key) -and $Node[$Key] -eq $Value) { ,$Node }
      foreach ($child in $Node.Values) { Find-PipelineNode $child $Key $Value }
    } elseif ($Node -is [System.Collections.IList]) {
      foreach ($child in $Node) { Find-PipelineNode $child $Key $Value }
    }
  }

  $stages = @(Find-PipelineNode $release 'stage' 'Release_${{artifact.safename}}')
  $script:stage = $stages[0]
  $completionSteps = @(Find-PipelineNode $release 'template' '/eng/common/pipelines/templates/steps/mark-release-completion.yml')
  $script:completion = $completionSteps[0]
}

Describe 'Auto-release plan completion correlation' -Tag 'UnitTest' {
  It 'maps the prepare-stage SDK PR into each release stage' {
    $stages.Count | Should -Be 1
    $mapping = @($stage.variables | Where-Object { $_.Contains($autoGuard) })
    $mapping.Count | Should -Be 1
    @($mapping[0][$autoGuard]).Count | Should -Be 1
    $mapping[0][$autoGuard][0].name | Should -BeExactly 'AutoReleaseSdkPullRequestUrl'
    $mapping[0][$autoGuard][0].value | Should -BeExactly $outputExpression
    @($stage['${{ else }}'].dependsOn) | Should -Contain 'AutoReleasePrepare'
  }

  It 'passes the SDK PR to completion for automatic releases of every service' {
    $completionSteps.Count | Should -Be 1
    $completion.parameters[$autoGuard].SdkPullRequest | Should -BeExactly '$(AutoReleaseSdkPullRequestUrl)'
    @($completion.parameters[$autoGuard].Keys) | Should -Be @('SdkPullRequest')
    @($completion.parameters.Keys | Sort-Object) | Should -Be (@('ConfigFileDir', 'PackageArtifactName', $autoGuard) | Sort-Object)
    $completion.parameters.ConfigFileDir | Should -BeExactly '$(Pipeline.Workspace)/packages/PackageInfo'
    $completion.parameters.PackageArtifactName | Should -BeExactly '${{ artifact.name }}'
  }

  It 'does not attach an automatic SDK PR to manual, scheduled, PR, or non-main runs' {
    # The same guard owns the producer, output mapping, and completion input.
    # Manual paths retain the shared template default instead of a previous package PR.
    @($completion.parameters.Keys) | Should -Contain $autoGuard
    $completion.parameters.Contains('SdkPullRequest') | Should -BeFalse
    $completion.parameters.Contains('ReleasePlanId') | Should -BeFalse
    $stage['${{ if in(variables[''Build.Reason''], ''Manual'', '''') }}'].dependsOn | Should -BeExactly '${{parameters.DependsOn}}'
    $prepare = @(Find-PipelineNode $release 'template' '/eng/common/pipelines/templates/stages/archetype-auto-release-prepare.yml')
    $prepare.Count | Should -Be 1
  }

  It 'keeps completion after package publication and API review' {
    $jobs = @(Find-PipelineNode $release 'job' 'UpdatePackageVersion')
    $jobs.Count | Should -Be 1
    $jobs[0].dependsOn | Should -BeExactly 'PublishPackage_${{ replace(artifact.name, ''-'', ''_'') }}_To_DevFeed'
    $jobs[0].condition | Should -BeExactly 'and(succeeded(), ne(variables[''Skip.UpdatePackageVersion''], ''true''))'
    $jobs[0].steps[-1].template | Should -BeExactly $completion.template
    $jobs[0].steps[-2].template | Should -BeExactly '/eng/common/pipelines/templates/steps/create-apireview.yml'
    $jobs[0].steps[-2].parameters.MarkPackageAsShipped | Should -BeTrue
  }

  It 'uses the existing shared output and completion input without changing shared files' {
    $resolvePath = Join-Path $repoRoot 'eng/common/scripts/Resolve-AutoReleasePackages.ps1'
    (Get-Content $resolvePath -Raw) | Should -Match "Set-PipelineVariable -Name 'AutoReleaseSdkPullRequestUrl' -Value \`$prLink -IsOutput"
    $shared = ConvertFrom-Yaml (Get-Content (Join-Path $repoRoot 'eng/common/pipelines/templates/steps/mark-release-completion.yml') -Raw) -Ordered
    $shared.parameters.SdkPullRequest | Should -BeExactly ''
    $shared.steps[-1].inputs.arguments | Should -Match '-SdkPullRequest'
  }
}
