[CmdletBinding()]
param([string]$TestName)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$script:PackageRoot = Split-Path -Parent $PSScriptRoot
$script:ProductionScript = Join-Path $script:PackageRoot 'PostEmitter.ps1'
$script:Utf8NoBom = [System.Text.UTF8Encoding]::new($false)
$script:TempRoot = Join-Path ([System.IO.Path]::GetTempPath()) "ai-projects-post-emitter-$([guid]::NewGuid().ToString('N'))"
$script:Passed = 0
$script:Failed = 0

function Write-FixtureFile {
  param(
    [Parameter(Mandatory)][string]$Root,
    [Parameter(Mandatory)][string]$Path,
    [Parameter(Mandatory)][AllowEmptyString()][string]$Content
  )

  $fullPath = Join-Path $Root $Path
  $directory = Split-Path -Parent $fullPath
  if ($directory) {
    [void](New-Item -ItemType Directory -Path $directory -Force)
  }
  [System.IO.File]::WriteAllText($fullPath, $Content, $script:Utf8NoBom)
}

function Read-FixtureFile {
  param(
    [Parameter(Mandatory)][string]$Root,
    [Parameter(Mandatory)][string]$Path
  )

  return [System.IO.File]::ReadAllText((Join-Path $Root $Path))
}

function Invoke-FixtureGit {
  param(
    [Parameter(Mandatory)][string]$Root,
    [Parameter(Mandatory)][string[]]$GitArguments
  )

  $output = @(& git -C $Root @GitArguments 2>&1)
  if ($LASTEXITCODE -ne 0) {
    throw "git $($GitArguments -join ' ') failed:`n$($output -join "`n")"
  }
  return @($output | ForEach-Object { $_.ToString() })
}

function Get-DesiredModularJobContent {
  param(
    [Parameter(Mandatory)][string]$Method,
    [Parameter(Mandatory)][string]$TerminalType
  )

  return @"
import type { JobPoller } from "../../../static-helpers/pollingHelpers.js";
import { getJobPoller } from "../../../static-helpers/pollingHelpers.js";

export function $Method(
  context: Client,
): JobPoller<$TerminalType> {
  return getJobPoller(context, deserialize, ["202"], {
    getInitialResponse: () => send(context),
  });
}
"@
}

function Get-DesiredClassicJobContent {
  param(
    [Parameter(Mandatory)][string]$Method,
    [Parameter(Mandatory)][string]$TerminalType
  )

  return @"
import type { JobPoller } from "../../../static-helpers/pollingHelpers.js";

export interface Operations {
  $Method`: (
    job: Job,
  ) => JobPoller<$TerminalType>;
}
"@
}

function Write-DesiredJobTargets {
  param([Parameter(Mandatory)][string]$Root)

  $targets = @(
    @('src/api/beta/agents/operations.ts', 'src/classic/beta/agents/index.ts', 'createOptimizationJob', 'OptimizationJobResult'),
    @('src/api/beta/datasets/operations.ts', 'src/classic/beta/datasets/index.ts', 'createGenerationJob', 'DataGenerationJobResult'),
    @('src/api/beta/evaluators/operations.ts', 'src/classic/beta/evaluators/index.ts', 'createGenerationJob', 'EvaluatorVersion')
  )
  foreach ($target in $targets) {
    Write-FixtureFile -Root $Root -Path $target[0] -Content (Get-DesiredModularJobContent -Method $target[2] -TerminalType $target[3])
    Write-FixtureFile -Root $Root -Path $target[1] -Content (Get-DesiredClassicJobContent -Method $target[2] -TerminalType $target[3])
  }
}

function New-FixtureRepository {
  $root = Join-Path $script:TempRoot ([guid]::NewGuid().ToString('N'))
  [void](New-Item -ItemType Directory -Path $root -Force)
  [void](Invoke-FixtureGit -Root $root -GitArguments @('init', '--quiet'))
  [void](Invoke-FixtureGit -Root $root -GitArguments @('config', 'user.email', 'post-emitter@example.invalid'))
  [void](Invoke-FixtureGit -Root $root -GitArguments @('config', 'user.name', 'Post Emitter Tests'))
  [void](Invoke-FixtureGit -Root $root -GitArguments @('config', 'core.whitespace', 'cr-at-eol'))

  Write-FixtureFile -Root $root -Path '.github/skills/apply-post-emitter-edits/references/parameter-renames.yml' -Content @'
renames:
  - file: src/api/beta/agents/operations.ts
    old: agentSessionId
    new: sessionId
  - file: src/api/beta/toolboxes/operations.ts
    old: name
    new: toolboxName
  - file: src/classic/beta/toolboxes/index.ts
    old: name
    new: toolboxName
'@
  Write-DesiredJobTargets -Root $root
  Write-FixtureFile -Root $root -Path 'src/api/example.ts' -Content 'export const value = "base";'
  Write-FixtureFile -Root $root -Path 'src/constants.ts' -Content 'export const protectedConstant = "base";'
  Write-FixtureFile -Root $root -Path 'src/aiProjectClient.ts' -Content 'export const protectedClient = "base";'
  Write-FixtureFile -Root $root -Path 'src/static-helpers/pollingHelpers.ts' -Content 'export const protectedHelper = "base";'
  Write-FixtureFile -Root $root -Path 'src/models/models.ts' -Content @'
export interface AgentVersion {
  status?: AgentVersionStatus;
}

export function agentVersionDeserializer(item: any): AgentVersion {
  return {
    status: item["status"],
  };
}

export interface MCPToolRequireApproval {}
export function mcpToolRequireApprovalSerializer(item: MCPToolRequireApproval): any {
  return item;
}
export function mcpToolRequireApprovalDeserializer(item: any): MCPToolRequireApproval {
  return item;
}

export interface MCPToolFilter {}
export function mcpToolFilterSerializer(item: MCPToolFilter): any {
  return item;
}
export function mcpToolFilterDeserializer(item: any): MCPToolFilter {
  return item;
}
'@
  Write-FixtureFile -Root $root -Path 'review/ai-projects-browser.api.diff.md' -Content 'tracked browser report'
  Write-FixtureFile -Root $root -Path 'review/ai-projects-react-native.api.diff.md' -Content 'tracked react native report'
  [void](Invoke-FixtureGit -Root $root -GitArguments @('add', '.'))
  [void](Invoke-FixtureGit -Root $root -GitArguments @('commit', '--quiet', '-m', 'fixture baseline'))
  return $root
}

function Invoke-PostEmitterFixture {
  param(
    [Parameter(Mandatory)][string]$Root,
    [switch]$ExpectFailure,
    [string]$ErrorPattern
  )

  $output = @(& pwsh -NonInteractive -NoProfile -File $script:ProductionScript -PackageRoot $Root -BaseRef HEAD 2>&1)
  $exitCode = $LASTEXITCODE
  $text = @($output | ForEach-Object { $_.ToString() }) -join "`n"
  if ($ExpectFailure) {
    if ($exitCode -eq 0) {
      throw "Expected PostEmitter.ps1 to fail, but it succeeded.`n$text"
    }
    if ($ErrorPattern -and $text -notmatch $ErrorPattern) {
      throw "Failure did not match '$ErrorPattern':`n$text"
    }
  } elseif ($exitCode -ne 0) {
    throw "PostEmitter.ps1 failed with exit code ${exitCode}:`n$text"
  }
  return $text
}

function Assert-True {
  param([Parameter(Mandatory)][bool]$Condition, [Parameter(Mandatory)][string]$Message)
  if (-not $Condition) { throw $Message }
}

function Assert-Contains {
  param(
    [Parameter(Mandatory)][AllowEmptyString()][string]$Content,
    [Parameter(Mandatory)][string]$Expected
  )
  if (-not $Content.Contains($Expected)) {
    throw "Expected content to contain: $Expected"
  }
}

function Assert-NotContains {
  param(
    [Parameter(Mandatory)][AllowEmptyString()][string]$Content,
    [Parameter(Mandatory)][string]$Unexpected
  )
  if ($Content.Contains($Unexpected)) {
    throw "Expected content not to contain: $Unexpected"
  }
}

function Invoke-FixtureTest {
  param(
    [Parameter(Mandatory)][string]$Name,
    [Parameter(Mandatory)][scriptblock]$Body
  )

  if ($TestName -and $Name -notlike "*$TestName*") {
    return
  }

  $root = New-FixtureRepository
  $failed = $false
  try {
    & $Body $root
    $script:Passed++
    Write-Host "PASS $Name"
  } catch {
    $failed = $true
    $script:Failed++
    Write-Host "FAIL $Name"
    Write-Host $_
  } finally {
    if ($failed -and $env:AZSDK_KEEP_POST_EMITTER_FIXTURES) {
      Write-Host "KEPT $root"
    } else {
      Remove-Item -LiteralPath $root -Recurse -Force -ErrorAction SilentlyContinue
    }
  }
}

function Write-EmittedJobPoller {
  param(
    [Parameter(Mandatory)][string]$Root,
    [Parameter(Mandatory)][string]$ModularPath,
    [Parameter(Mandatory)][string]$ClassicPath,
    [Parameter(Mandatory)][string]$Method,
    [Parameter(Mandatory)][string]$TerminalType
  )

  Write-FixtureFile -Root $Root -Path $ModularPath -Content @"
import type { PollerLike, OperationState } from "@azure/core-lro";
import { getLongRunningPoller } from "../../../static-helpers/pollingHelpers.js";

export function $Method(
  context: Client,
): PollerLike<OperationState<$TerminalType>, $TerminalType> {
  return getLongRunningPoller(context, deserialize, ["202"], {
    getInitialResponse: () => send(context),
  }) as PollerLike<OperationState<$TerminalType>, $TerminalType>;
}
"@
  Write-FixtureFile -Root $Root -Path $ClassicPath -Content @"
import { PollerLike, OperationState } from "@azure/core-lro";

export interface Operations {
  $Method`: (
    job: Job,
  ) => PollerLike<OperationState<$TerminalType>, $TerminalType>;
}
"@
}

[void](New-Item -ItemType Directory -Path $script:TempRoot -Force)
try {
  Invoke-FixtureTest 'resolves complete diff3 blocks to the customized side' {
    param($root)
    $startMarker = '<' * 7
    $baseMarker = '|' * 7
    $separatorMarker = '=' * 7
    $endMarker = '>' * 7
    $fixture = @(
      "$startMarker generated"
      'export const value = "generated";'
      "$baseMarker base"
      'export const value = "base";'
      $separatorMarker
      'export const value = "customized";'
      "$endMarker customized"
    ) -join "`n"
    Write-FixtureFile -Root $root -Path 'src/api/example.ts' -Content $fixture
    [void](Invoke-PostEmitterFixture -Root $root)
    $content = Read-FixtureFile -Root $root -Path 'src/api/example.ts'
    Assert-Contains -Content $content -Expected '"customized"'
    Assert-NotContains -Content $content -Unexpected $startMarker
  }

  Invoke-FixtureTest 'rejects malformed diff3 markers' {
    param($root)
    $startMarker = '<' * 7
    $separatorMarker = '=' * 7
    Write-FixtureFile -Root $root -Path 'src/api/example.ts' -Content "$startMarker generated`nexport const value = 1;`n$separatorMarker`n"
    [void](Invoke-PostEmitterFixture -Root $root -ExpectFailure -ErrorPattern 'complete diff3 block')
  }

  Invoke-FixtureTest 'restores modified and deleted protected paths' {
    param($root)
    Write-FixtureFile -Root $root -Path 'src/constants.ts' -Content 'export const protectedConstant = "changed";'
    Remove-Item -LiteralPath (Join-Path $root 'src/aiProjectClient.ts') -Force
    Write-FixtureFile -Root $root -Path 'src/static-helpers/pollingHelpers.ts' -Content 'export const protectedHelper = "changed";'
    [void](Invoke-PostEmitterFixture -Root $root)
    Assert-Contains -Content (Read-FixtureFile -Root $root -Path 'src/constants.ts') -Expected '"base"'
    Assert-Contains -Content (Read-FixtureFile -Root $root -Path 'src/aiProjectClient.ts') -Expected '"base"'
    Assert-Contains -Content (Read-FixtureFile -Root $root -Path 'src/static-helpers/pollingHelpers.ts') -Expected '"base"'
  }

  Invoke-FixtureTest 'repairs api-version encoding only under src' {
    param($root)
    Write-FixtureFile -Root $root -Path 'src/api/example.ts' -Content 'export const value = "api%2Dversion";'
    Write-FixtureFile -Root $root -Path 'generated/example.ts' -Content 'export const value = "api%2Dversion";'
    [void](Invoke-PostEmitterFixture -Root $root)
    Assert-Contains -Content (Read-FixtureFile -Root $root -Path 'src/api/example.ts') -Expected '"api-version"'
    Assert-Contains -Content (Read-FixtureFile -Root $root -Path 'generated/example.ts') -Expected '"api%2Dversion"'
  }

  Invoke-FixtureTest 'restores local foundryFeatures constants' {
    param($root)
    Write-FixtureFile -Root $root -Path 'src/api/beta/models/operations.ts' -Content @'
export function _getSend(
  context: Client,
  foundryFeatures: "Models=V1Preview",
  options: Options,
): StreamableMethod {
  return context.get({
    headers: { "foundry-features": foundryFeatures },
  });
}

export function get(
  context: Client,
  foundryFeatures: "Models=V1Preview",
  options: Options,
): void {
  _getSend(
    context,
    foundryFeatures,
    options,
  );
}
'@
    [void](Invoke-PostEmitterFixture -Root $root)
    $content = Read-FixtureFile -Root $root -Path 'src/api/beta/models/operations.ts'
    Assert-Contains -Content $content -Expected 'const foundryFeatures = "Models=V1Preview";'
    Assert-NotContains -Content $content -Unexpected 'foundryFeatures: "Models=V1Preview"'
    Assert-NotContains -Content $content -Unexpected "`n    foundryFeatures,"
  }

  Invoke-FixtureTest 'keeps options-bag foundryFeatures properties' {
    param($root)
    $content = "export interface Options {`n  foundryFeatures?: `"Models=V1Preview`";`n}`n"
    Write-FixtureFile -Root $root -Path 'src/api/beta/models/options.ts' -Content $content
    [void](Invoke-PostEmitterFixture -Root $root)
    Assert-True -Condition ((Read-FixtureFile -Root $root -Path 'src/api/beta/models/options.ts') -ceq $content) -Message 'Options-bag property changed.'
  }

  Invoke-FixtureTest 'rejects unknown positional foundryFeatures shapes' {
    param($root)
    Write-FixtureFile -Root $root -Path 'src/api/beta/models/operations.ts' -Content @'
export function _getSend(context: Client, foundryFeatures: "Models=V1Preview"): StreamableMethod {
  return context.get({ headers: { "foundry-features": foundryFeatures } });
}
'@
    [void](Invoke-PostEmitterFixture -Root $root -ExpectFailure -ErrorPattern 'unrecognized')
  }

  Invoke-FixtureTest 'removes the source poller helper before later rule failures' {
    param($root)
    Write-FixtureFile -Root $root -Path 'src/restorePollerHelpers.ts' -Content 'export const scratch = true;'
    Write-FixtureFile -Root $root -Path 'src/api/beta/models/operations.ts' -Content @'
export function _getSend(context: Client, foundryFeatures: "Models=V1Preview"): StreamableMethod {
  return context.get({ headers: { "foundry-features": foundryFeatures } });
}
'@
    [void](Invoke-PostEmitterFixture -Root $root -ExpectFailure -ErrorPattern 'unrecognized')
    Assert-True -Condition (-not (Test-Path -LiteralPath (Join-Path $root 'src/restorePollerHelpers.ts'))) -Message 'Source restorePollerHelpers.ts survived a later rule failure.'
  }

  Invoke-FixtureTest 'preserves evaluator list naming without changing listVersions' {
    param($root)
    $operations = Read-FixtureFile -Root $root -Path 'src/api/beta/evaluators/operations.ts'
    $operations += @'

export function _listLatestVersionsSend(): void {}
export function _listLatestVersionsDeserialize(): void {}
export function listLatestVersions(): void {
  _listLatestVersionsSend();
}
export function listVersions(): void {}
'@
    Write-FixtureFile -Root $root -Path 'src/api/beta/evaluators/operations.ts' -Content $operations
    Write-FixtureFile -Root $root -Path 'src/api/beta/evaluators/index.ts' -Content 'export { listLatestVersions, listVersions } from "./operations.js";'
    Write-FixtureFile -Root $root -Path 'src/api/beta/evaluators/options.ts' -Content 'export interface BetaEvaluatorsListLatestVersionsOptionalParams {}'
    $classic = Read-FixtureFile -Root $root -Path 'src/classic/beta/evaluators/index.ts'
    $classic += "`nexport const listLatestVersions = 1;`nexport const listVersions = 2;`n"
    Write-FixtureFile -Root $root -Path 'src/classic/beta/evaluators/index.ts' -Content $classic
    [void](Invoke-PostEmitterFixture -Root $root)
    foreach ($path in @('src/api/beta/evaluators/operations.ts', 'src/api/beta/evaluators/index.ts', 'src/api/beta/evaluators/options.ts', 'src/classic/beta/evaluators/index.ts')) {
      $content = Read-FixtureFile -Root $root -Path $path
      Assert-NotContains -Content $content -Unexpected 'listLatestVersions'
      if ($path -notlike '*options.ts') { Assert-Contains -Content $content -Expected 'listVersions' }
    }
  }

  Invoke-FixtureTest 'propagates generated model renames through import type statements' {
    param($root)
    Write-FixtureFile -Root $root -Path 'generated/api/beta/agents/operations.ts' -Content @'
import {
  OptimizationJob,
  optimizationJobSerializer,
  OptimizationJobResult,
} from "../../../models/models.js";
'@
    Write-FixtureFile -Root $root -Path 'src/api/beta/agents/operations.ts' -Content @'
import type { OptimizationJob, OptimizationJobResult } from "../../../models/models.js";
import { optimizationJobSerializer } from "../../../models/models.js";
import type { JobPoller } from "../../../static-helpers/pollingHelpers.js";
import { getJobPoller } from "../../../static-helpers/pollingHelpers.js";

export function createOptimizationJob(
  context: Client,
  job: OptimizationJob,
): JobPoller<OptimizationJobResult> {
  optimizationJobSerializer(job);
  return getJobPoller(context, deserialize, ["202"], {
    getInitialResponse: () => send(context),
  });
}
'@
    Write-FixtureFile -Root $root -Path 'generated/classic/beta/agents/index.ts' -Content @'
import { OptimizationJob, OptimizationJobResult } from "../../../models/models.js";
'@
    Write-FixtureFile -Root $root -Path 'src/classic/beta/agents/index.ts' -Content @'
import type { OptimizationJob, OptimizationJobResult } from "../../../models/models.js";
import type { JobPoller } from "../../../static-helpers/pollingHelpers.js";

export interface Operations {
  createOptimizationJob: (
    job: OptimizationJob,
  ) => JobPoller<OptimizationJobResult>;
}
'@
  Write-FixtureFile -Root $root -Path 'generated/models/index.ts' -Content 'export type { OptimizationJob, OptimizationJobResult } from "./models.js";'
    Write-FixtureFile -Root $root -Path 'src/models/index.ts' -Content @'
export type {
  /** retained documentation */
  OptimizationJob,
  OptimizationJobResult,
} from "./models.js";
'@
  [void](Invoke-FixtureGit -Root $root -GitArguments @('add', 'generated/api/beta/agents/operations.ts', 'generated/classic/beta/agents/index.ts', 'generated/models/index.ts', 'src/api/beta/agents/operations.ts', 'src/classic/beta/agents/index.ts', 'src/models/index.ts'))
    [void](Invoke-FixtureGit -Root $root -GitArguments @('commit', '--quiet', '-m', 'model rename baseline'))

    Write-FixtureFile -Root $root -Path 'generated/api/beta/agents/operations.ts' -Content @'
import {
  AgentOptimizationJob,
  agentOptimizationJobSerializer,
  AgentOptimizationJobResult,
} from "../../../models/models.js";
'@
    Write-FixtureFile -Root $root -Path 'src/api/beta/agents/operations.ts' -Content @'
import type { OptimizationJob, OptimizationJobResult } from "../../../models/models.js";
import { optimizationJobSerializer } from "../../../models/models.js";
import type { JobPoller } from "../../../static-helpers/pollingHelpers.js";
import { getJobPoller } from "../../../static-helpers/pollingHelpers.js";

export function createOptimizationJob(
  context: Client,
  job: AgentOptimizationJob,
): JobPoller<OptimizationJobResult> {
  agentOptimizationJobSerializer(job);
  return getJobPoller(context, deserialize, ["202"], {
    getInitialResponse: () => send(context),
  });
}
'@
    Write-FixtureFile -Root $root -Path 'generated/classic/beta/agents/index.ts' -Content @'
import { AgentOptimizationJob, AgentOptimizationJobResult } from "../../../models/models.js";
'@
    Write-FixtureFile -Root $root -Path 'src/classic/beta/agents/index.ts' -Content @'
import type { OptimizationJob, OptimizationJobResult } from "../../../models/models.js";
import type { JobPoller } from "../../../static-helpers/pollingHelpers.js";

export interface Operations {
  createOptimizationJob: (
    job: AgentOptimizationJob,
  ) => JobPoller<OptimizationJobResult>;
}
'@
  Write-FixtureFile -Root $root -Path 'generated/models/index.ts' -Content 'export type { AgentOptimizationJob, AgentOptimizationJobResult } from "./models.js";'
    [void](Invoke-PostEmitterFixture -Root $root)
    $modular = Read-FixtureFile -Root $root -Path 'src/api/beta/agents/operations.ts'
    Assert-Contains -Content $modular -Expected 'import type { AgentOptimizationJob, AgentOptimizationJobResult }'
    Assert-Contains -Content $modular -Expected 'import { agentOptimizationJobSerializer }'
    Assert-Contains -Content $modular -Expected 'JobPoller<AgentOptimizationJobResult>'
    Assert-NotContains -Content $modular -Unexpected 'import type { OptimizationJob'
    $classic = Read-FixtureFile -Root $root -Path 'src/classic/beta/agents/index.ts'
    Assert-Contains -Content $classic -Expected 'import type { AgentOptimizationJob, AgentOptimizationJobResult }'
    Assert-Contains -Content $classic -Expected 'JobPoller<AgentOptimizationJobResult>'
    $barrel = Read-FixtureFile -Root $root -Path 'src/models/index.ts'
    Assert-Contains -Content $barrel -Expected 'AgentOptimizationJob'
    Assert-Contains -Content $barrel -Expected 'AgentOptimizationJobResult'
    Assert-NotContains -Content $barrel -Unexpected '  OptimizationJob,'
  }

  Invoke-FixtureTest 'propagates generated paged-result model renames' {
    param($root)
    Write-FixtureFile -Root $root -Path 'generated/api/beta/routines/operations.ts' -Content @'
import { _AgentsPagedResultRoutine } from "../../../models/models.js";
'@
    Write-FixtureFile -Root $root -Path 'src/api/beta/routines/operations.ts' -Content @'
import type { _AgentsPagedResultRoutine } from "../../../models/models.js";
export function list(): _AgentsPagedResultRoutine { return value; }
'@
    [void](Invoke-FixtureGit -Root $root -GitArguments @('add', 'generated/api/beta/routines/operations.ts', 'src/api/beta/routines/operations.ts'))
    [void](Invoke-FixtureGit -Root $root -GitArguments @('commit', '--quiet', '-m', 'unrelated import baseline'))
    Write-FixtureFile -Root $root -Path 'generated/api/beta/routines/operations.ts' -Content @'
import { _PagedResultWithNextLinkRoutine } from "../../../models/models.js";
'@
    [void](Invoke-PostEmitterFixture -Root $root)
    $content = Read-FixtureFile -Root $root -Path 'src/api/beta/routines/operations.ts'
    Assert-Contains -Content $content -Expected '_PagedResultWithNextLinkRoutine'
    Assert-NotContains -Content $content -Unexpected '_AgentsPagedResultRoutine'
  }

  Invoke-FixtureTest 'propagates semantic delete operation renames across surfaces' {
    param($root)
    $baselineOperations = @'
export function _$deleteSend(): void {}
export function _$deleteDeserialize(): void {}
export function $delete(): void {
  _$deleteSend();
  _$deleteDeserialize();
}
'@
    Write-FixtureFile -Root $root -Path 'generated/api/evaluationRules/operations.ts' -Content $baselineOperations
    Write-FixtureFile -Root $root -Path 'src/api/evaluationRules/operations.ts' -Content $baselineOperations
    Write-FixtureFile -Root $root -Path 'src/api/evaluationRules/index.ts' -Content 'export { $delete } from "./operations.js";'
    Write-FixtureFile -Root $root -Path 'generated/classic/evaluationRules/index.ts' -Content 'export interface Operations { delete: () => void; }'
    Write-FixtureFile -Root $root -Path 'src/classic/evaluationRules/index.ts' -Content @'
import { $delete } from "../../api/evaluationRules/operations.js";
  export interface Operations { delete: () => void; }
  export const operations = { delete: () => $delete() };
'@
    [void](Invoke-FixtureGit -Root $root -GitArguments @('add', 'generated/api/evaluationRules/operations.ts', 'generated/classic/evaluationRules/index.ts', 'src/api/evaluationRules/index.ts', 'src/api/evaluationRules/operations.ts', 'src/classic/evaluationRules/index.ts'))
    [void](Invoke-FixtureGit -Root $root -GitArguments @('commit', '--quiet', '-m', 'operation rename baseline'))

    Write-FixtureFile -Root $root -Path 'generated/api/evaluationRules/operations.ts' -Content @'
export function _deleteEvaluationRuleSend(): void {}
export function _deleteEvaluationRuleDeserialize(): void {}
export function deleteEvaluationRule(): void {
  _deleteEvaluationRuleSend();
  _deleteEvaluationRuleDeserialize();
}
'@
    Write-FixtureFile -Root $root -Path 'generated/classic/evaluationRules/index.ts' -Content 'export interface Operations { deleteEvaluationRule: () => void; }'
    Write-FixtureFile -Root $root -Path 'src/api/evaluationRules/operations.ts' -Content @'
export function _deleteEvaluationRuleSend(): void {}
export function _deleteEvaluationRuleDeserialize(): void {}
export function $delete(): void {
  _$deleteSend();
  _$deleteDeserialize();
}
'@
    Write-FixtureFile -Root $root -Path 'src/api/evaluationRules/index.ts' -Content 'export { deleteEvaluationRule } from "./operations.js";'
    [void](Invoke-PostEmitterFixture -Root $root)
    foreach ($path in @('src/api/evaluationRules/operations.ts', 'src/api/evaluationRules/index.ts', 'src/classic/evaluationRules/index.ts')) {
      $content = Read-FixtureFile -Root $root -Path $path
      Assert-Contains -Content $content -Expected 'deleteEvaluationRule'
      Assert-NotContains -Content $content -Unexpected '$delete'
    }
  }

  Invoke-FixtureTest 'applies positional renames without corrupting names or session files' {
    param($root)
    $agents = Read-FixtureFile -Root $root -Path 'src/api/beta/agents/operations.ts'
    $agents += @'

export function deleteSession(
  context: Client,
  sessionId: string,
): string {
  const request = { agentSessionId: agentSessionId };
  return send(context, agentSessionId, request.agentSessionId);
}

export function deleteSessionFile(
  context: Client,
  agentSessionId: string,
): string {
  return agentSessionId;
}
'@
    Write-FixtureFile -Root $root -Path 'src/api/beta/agents/operations.ts' -Content $agents
    Write-FixtureFile -Root $root -Path 'src/api/beta/toolboxes/operations.ts' -Content @'
export function getToolbox(
  context: Client,
  toolboxName: string,
): string {
  const request = { name: name };
  return send(context, name, request.name, toolboxName);
}
'@
    [void](Invoke-PostEmitterFixture -Root $root)
    $agents = Read-FixtureFile -Root $root -Path 'src/api/beta/agents/operations.ts'
    Assert-Contains -Content $agents -Expected '{ agentSessionId: sessionId }'
    Assert-Contains -Content $agents -Expected 'deleteSessionFile'
    Assert-Contains -Content $agents -Expected 'return agentSessionId;'
    $toolboxes = Read-FixtureFile -Root $root -Path 'src/api/beta/toolboxes/operations.ts'
    Assert-Contains -Content $toolboxes -Expected '{ name: toolboxName }'
    Assert-NotContains -Content $toolboxes -Unexpected 'toolboxtoolboxName'
  }

  Invoke-FixtureTest 'converts supported Node built-in imports to lazy defaults' {
    param($root)
    Write-FixtureFile -Root $root -Path 'src/api/beta/models/operations.ts' -Content @'
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

export function inspect(root: string): unknown {
  return [readFileSync(join(root, "a")), readdirSync(root), statSync(root), relative(root, root)];
}
'@
    [void](Invoke-PostEmitterFixture -Root $root)
    $content = Read-FixtureFile -Root $root -Path 'src/api/beta/models/operations.ts'
    Assert-Contains -Content $content -Expected 'import fs from "node:fs";'
    Assert-Contains -Content $content -Expected 'import nodePath from "node:path";'
    Assert-Contains -Content $content -Expected 'fs.readFileSync(nodePath.join('
    Assert-Contains -Content $content -Expected 'nodePath.relative('
  }

  Invoke-FixtureTest 'rejects unknown Node import aliases' {
    param($root)
    Write-FixtureFile -Root $root -Path 'src/api/beta/models/operations.ts' -Content @'
import { readFileSync as read } from "node:fs";
export const value = read("a");
'@
    [void](Invoke-PostEmitterFixture -Root $root -ExpectFailure -ErrorPattern 'unsupported node:fs import')
  }

  Invoke-FixtureTest 'captures renamed job terminal types and preserves unrelated pollers' {
    param($root)
    Write-EmittedJobPoller -Root $root -ModularPath 'src/api/beta/agents/operations.ts' -ClassicPath 'src/classic/beta/agents/index.ts' -Method 'createOptimizationJob' -TerminalType 'RenamedOptimizationResult'
    $memory = @'
import { getLongRunningPoller } from "../../../static-helpers/pollingHelpers.js";
export function createMemoryStore(): void {
  getLongRunningPoller();
}
'@
    Write-FixtureFile -Root $root -Path 'src/api/beta/memoryStores/operations.ts' -Content $memory
    [void](Invoke-PostEmitterFixture -Root $root)
    $modular = Read-FixtureFile -Root $root -Path 'src/api/beta/agents/operations.ts'
    $classic = Read-FixtureFile -Root $root -Path 'src/classic/beta/agents/index.ts'
    Assert-Contains -Content $modular -Expected 'JobPoller<RenamedOptimizationResult>'
    Assert-Contains -Content $modular -Expected 'getJobPoller'
    Assert-NotContains -Content $modular -Unexpected 'PollerLike'
    Assert-Contains -Content $classic -Expected 'JobPoller<RenamedOptimizationResult>'
    Assert-True -Condition ((Read-FixtureFile -Root $root -Path 'src/api/beta/memoryStores/operations.ts') -ceq $memory) -Message 'Unrelated memory-store poller changed.'
  }

  Invoke-FixtureTest 'removes known duplicate declarations and status properties' {
    param($root)
    $models = Read-FixtureFile -Root $root -Path 'src/models/models.ts'
    $models = $models.Replace('  status?: AgentVersionStatus;', "  status?: AgentVersionStatus;`n  status?: `"active`" | `"failed`";")
    $models = $models.Replace('    status: item["status"],', "    status: item[`"status`"],`n    status: item[`"status`"],")
    $models += @'

/** duplicate */
export interface MCPToolRequireApproval {}
export function mcpToolRequireApprovalSerializer(item: MCPToolRequireApproval): any { return item; }
export function mcpToolRequireApprovalDeserializer(item: any): MCPToolRequireApproval { return item; }
export interface MCPToolFilter {}
export function mcpToolFilterSerializer(item: MCPToolFilter): any { return item; }
export function mcpToolFilterDeserializer(item: any): MCPToolFilter { return item; }
'@
    Write-FixtureFile -Root $root -Path 'src/models/models.ts' -Content $models
    [void](Invoke-PostEmitterFixture -Root $root)
    $models = Read-FixtureFile -Root $root -Path 'src/models/models.ts'
    Assert-NotContains -Content $models -Unexpected 'status?: "active"'
    Assert-True -Condition (([regex]::Matches($models, '(?m)^export interface MCPToolFilter\b')).Count -eq 1) -Message 'MCPToolFilter duplicate remains.'
    Assert-True -Condition (([regex]::Matches($models, '(?m)^\s*status: item\["status"\],')).Count -eq 1) -Message 'Deserializer status duplicate remains.'
  }

  Invoke-FixtureTest 'rejects unknown duplicate status shapes' {
    param($root)
    $models = Read-FixtureFile -Root $root -Path 'src/models/models.ts'
    $models = $models.Replace('  status?: AgentVersionStatus;', "  status?: AgentVersionStatus;`n  status?: number;")
    Write-FixtureFile -Root $root -Path 'src/models/models.ts' -Content $models
    [void](Invoke-PostEmitterFixture -Root $root -ExpectFailure -ErrorPattern 'AgentVersion')
  }

  Invoke-FixtureTest 'rejects unknown duplicate declaration shapes' {
    param($root)
    $models = Read-FixtureFile -Root $root -Path 'src/models/models.ts'
    $models += "`nexport type MCPToolFilter = string;`n"
    Write-FixtureFile -Root $root -Path 'src/models/models.ts' -Content $models
    [void](Invoke-PostEmitterFixture -Root $root -ExpectFailure -ErrorPattern 'unrecognized declaration shape')
  }

  Invoke-FixtureTest 'removes scratch files but preserves tracked API reports' {
    param($root)
    Write-FixtureFile -Root $root -Path 'src/restorePollerHelpers.ts' -Content 'scratch'
    Write-FixtureFile -Root $root -Path 'metadata.json' -Content '{}'
    Write-FixtureFile -Root $root -Path 'agent_version_lines.txt' -Content 'scratch'
    Write-FixtureFile -Root $root -Path 'src/a.tmp' -Content 'scratch'
    Write-FixtureFile -Root $root -Path 'src/b.tmp2' -Content 'scratch'
    Write-FixtureFile -Root $root -Path 'src/c.bak' -Content 'scratch'
    [void](Invoke-PostEmitterFixture -Root $root)
    foreach ($path in @('src/restorePollerHelpers.ts', 'metadata.json', 'agent_version_lines.txt', 'src/a.tmp', 'src/b.tmp2', 'src/c.bak')) {
      Assert-True -Condition (-not (Test-Path -LiteralPath (Join-Path $root $path))) -Message "Scratch path survived: $path"
    }
    Assert-True -Condition (Test-Path -LiteralPath (Join-Path $root 'review/ai-projects-browser.api.diff.md')) -Message 'Tracked browser report was deleted.'
    Assert-True -Condition (Test-Path -LiteralPath (Join-Path $root 'review/ai-projects-react-native.api.diff.md')) -Message 'Tracked React Native report was deleted.'
  }

  Invoke-FixtureTest 'rejects unknown rename schema keys' {
    param($root)
    $schema = Read-FixtureFile -Root $root -Path '.github/skills/apply-post-emitter-edits/references/parameter-renames.yml'
    $schema += "`n    unexpected: value`n"
    Write-FixtureFile -Root $root -Path '.github/skills/apply-post-emitter-edits/references/parameter-renames.yml' -Content $schema
    [void](Invoke-PostEmitterFixture -Root $root -ExpectFailure -ErrorPattern 'Unknown key')
  }

  Invoke-FixtureTest 'refuses staged package changes' {
    param($root)
    Write-FixtureFile -Root $root -Path 'src/api/example.ts' -Content 'export const value = "staged";'
    [void](Invoke-FixtureGit -Root $root -GitArguments @('add', 'src/api/example.ts'))
    [void](Invoke-PostEmitterFixture -Root $root -ExpectFailure -ErrorPattern 'staged package changes')
  }

  Invoke-FixtureTest 'is idempotent on a second invocation' {
    param($root)
    Write-FixtureFile -Root $root -Path 'src/api/example.ts' -Content 'export const value = "api%2Dversion";'
    [void](Invoke-PostEmitterFixture -Root $root)
    $firstDiff = (Invoke-FixtureGit -Root $root -GitArguments @('diff', '--', '.')) -join "`n"
    [void](Invoke-PostEmitterFixture -Root $root)
    $secondDiff = (Invoke-FixtureGit -Root $root -GitArguments @('diff', '--', '.')) -join "`n"
    Assert-True -Condition ($firstDiff -ceq $secondDiff) -Message 'Second invocation changed the Git diff.'
  }
} finally {
  if (-not $env:AZSDK_KEEP_POST_EMITTER_FIXTURES) {
    Remove-Item -LiteralPath $script:TempRoot -Recurse -Force -ErrorAction SilentlyContinue
  }
}

Write-Host ''
Write-Host "Post-emitter fixtures: $($script:Passed) passed, $($script:Failed) failed."
if ($script:Failed -gt 0) {
  exit 1
}