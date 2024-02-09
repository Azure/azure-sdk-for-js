export const appConfigTestEvent: string = JSON.stringify({
  id: "deb8e00d-8c64-4b6e-9cab-282259c7674f",
  topic:
    "/subscriptions/{subscription-id}/resourceGroups/eventDemoGroup/providers/microsoft.appconfiguration/configurationstores/{appconfig-name}",
  subject: "https://{appconfig-name}.azconfig.io/kv/Foo",
  data: {
    key: "Samples:Greeting",
    etag: "a1LIDdNEIV6wCnfv3xaip7fMXD3",
    syncToken: "zAJw6V16=Njo1IzMzMjE3MzA=;sn=3321730",
  },
  eventType: "Microsoft.AppConfiguration.KeyValueModified",
  eventTime: "2019-05-31T18:59:54Z",
  dataVersion: "1",
  metadataVersion: "1",
});
