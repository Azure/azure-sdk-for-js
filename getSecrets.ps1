. ./eng/common/TestResources/SubConfig-Helpers.ps1

set-azcontext -Subscription 'Azure SDK Test Resources'

$subConfigName1 = "sub-config-communication-services-cloud-test-resources-common"
$subConfigName2 = "sub-config-communication-services-cloud-test-resources-js"

# Download the config
$subConfig1 = Get-AzKeyVaultSecret -VaultName spool-TestSecrets -Name $subConfigName1 -AsPlainText | ConvertFrom-Json -AsHashtable
$subConfig2 = Get-AzKeyVaultSecret -VaultName spool-TestSecrets -Name $subConfigName2 -AsPlainText | ConvertFrom-Json -AsHashtable

$subConfig = @{
    EnvironmentVariables = @{}
}

# $subConfig['SubscriptionId'] = $subConfig1.SubscriptionId
$subConfig1.EnvironmentVariables.GetEnumerator() | ForEach-Object { $subConfig.EnvironmentVariables[$_.Key] = $_.Value }
$subConfig2.EnvironmentVariables.GetEnumerator() | ForEach-Object { $subConfig.EnvironmentVariables[$_.Key] = $_.Value }

set-azcontext -Subscription 'Azure SDK Developer Playground'

./eng/common/TestResources/New-TestResources.ps1 -ServiceDirectory communication @subConfig