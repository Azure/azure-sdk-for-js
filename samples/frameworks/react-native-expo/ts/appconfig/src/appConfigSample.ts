/**
 * @summary Demonstrates the CRUD operations on the configuration settings.
 */

//import { setLogLevel } from '@azure/logger';
//setLogLevel('verbose');

import { AppConfigurationClient } from '@azure/app-configuration';

export async function runAppConfigSample() {
  console.log('Running helloworld sample');

  // Set the following environment variable or edit the value on the following line.
  const connectionString =
    process.env.EXPO_PUBLIC_APPCONFIG_CONNECTION_STRING ||
    'Endpoint=https://jymappconf.azconfig.io;Id=Wjpc;Secret=5Y5zqpbn5tMGylD8fEc3LpaQulv7cPMB4CQcCJHT4V2V18FCoi2KJQQJ99AGACYeBjFAArohAAACAZACN7m2';
  const client = new AppConfigurationClient(connectionString);

  const greetingKey = 'Samples:Greeting';

  await cleanupSampleValues([greetingKey], client);

  // creating a new setting
  console.log(`Adding in new setting ${greetingKey}`);
  await client.addConfigurationSetting({ key: greetingKey, value: 'Hello!' });

  const newSetting = await client.getConfigurationSetting({ key: greetingKey });
  console.log(`${greetingKey} has been set to ${newSetting.value}`);

  // changing the value of a setting
  await client.setConfigurationSetting({ key: greetingKey, value: 'Goodbye!' });

  const updatedSetting = await client.getConfigurationSetting({
    key: greetingKey,
  });
  console.log(`${greetingKey} has been set to ${updatedSetting.value}`);

  // removing the setting
  await client.deleteConfigurationSetting({ key: greetingKey });
  console.log(`${greetingKey} has been deleted`);

  await cleanupSampleValues([greetingKey], client);
}

async function cleanupSampleValues(
  keys: string[],
  client: AppConfigurationClient
) {
  const settingsIterator = client.listConfigurationSettings({
    keyFilter: keys.join(','),
  });

  for await (const setting of settingsIterator) {
    await client.deleteConfigurationSetting({
      key: setting.key,
      label: setting.label,
    });
  }
}
