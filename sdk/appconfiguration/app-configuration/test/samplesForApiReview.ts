import { AppConfigurationClient, isFeatureFlag, isFeatureFlagPercentageClientFilter, isFeatureFlagTargetingClientFilter, isFeatureFlagTimeWindowClientFilter, isKeyVaultReference } from "../src";

const appConfigClient = new AppConfigurationClient("connection-string");

export async function sampleSyncTokenExample() {
  // get sync token from EventGrid event (example event shown, based on .net sample)
  const eventGridEvent = {
    key: "key for setting",
    label: "label for setting",
    syncToken: "opaque sync token"
  }

  // user treats token as an opaque value (note - this _does_ mutate the appconfigclient)
  // however, this mutations happens regardless since the system can and does return
  // sync token headers during normal operation.
  appConfigClient.updateSyncToken(eventGridEvent.syncToken);

  // and now retrieving the value should be consistent with what happened
  // in EventGrid.
  const retrievedSetting = await appConfigClient.getConfigurationSetting({
    key: eventGridEvent.key,
    label: eventGridEvent.label
  });

  console.log(retrievedSetting);
}

export async function sampleKeyVaultReference() {
  const secretClient: SecretClient = {} as any; // An actual KeyVault SecretClient gotten from "somewhere" else
  
  const setting = await appConfigClient.getConfigurationSetting({
    key: "my keyvault reference"
  });

  if (isKeyVaultReference(setting)) {
    // setting is a `KeyVaultReference`

    // use KeyVault to parse secret ID and retrieve it.
    const parsedSecretId = parseKeyVaultSecretId(setting.keyVaultSecretUri);
    const actualSecret = await secretClient.getSecret(parsedSecretId.name);

    console.log(`Retrieved secret value: ${actualSecret.value}`)
  } else {
    // otherwise it's potentially a feature flag or just a plain ConfigurationSetting
  }
}

export async function sampleFeatureFlag() {
  const setting = await appConfigClient.getConfigurationSetting({
    key: "my feature flag"
  });

  if (isFeatureFlag(setting)) {
    // setting is a `FeatureFlag`

    const conditions = setting.conditions;

    // FeatureFlag specific properties:
    // 
    // setting.displayName
    // setting.enabled

    //
    // the client filters are the real meat of the FeatureFlag.
    //
    for (const clientFilter of conditions.clientFilters) {
      if (isFeatureFlagTargetingClientFilter(clientFilter)) {
     		// some of the fields:
        // clientFilter.parameters.audience
        // clientFilter.parameters.audience.groups[0].name
        // clientFilter.parameters.audience.groups[0].rolloutPercentage
        // clientFilter.parameters.audience.users[0]         // string
        // clientFilter.parameters.defaultRolloutPercentage 
      } else if (isFeatureFlagTimeWindowClientFilter(clientFilter)) {
        // clientFilter.parameters.end;
        // clientFilter.parameters.start;
      } else if (isFeatureFlagPercentageClientFilter(clientFilter)) {
        // TODO: didn't analyze this one. Just comes back as key/value pairs, perhaps with a 
        // numeric constraint?
      } else {
        // we return a generic object and they get whatever was deserialized.
      }
    }
  } else {
    // otherwise it's a KeyVaultReference or just a ConfigurationSetting
  }
}

/** BEGIN: Interfaces from KeyVault */
export interface SecretClient {
  getSecret(
    secretName: string,
  ): Promise<KeyVaultSecret>;
}

export function parseKeyVaultSecretId(_id: string): KeyVaultSecretId { throw new Error("For sample only") }

export interface KeyVaultSecretId {
  /** other fields elided ... */
  name: string;
}
/** END: Interfaces from KeyVault */

export interface KeyVaultSecret {
  value?: string; 
}
