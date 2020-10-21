// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export class TestCase {
  public expected: any;
  public encodedEvent: string;

  constructor(expected: any, encodedEvent?: string) {
    this.expected = expected;
    this.encodedEvent = encodedEvent ?? JSON.stringify(expected);
  }
}

export interface TestEventInfo {
  /**
   * A test case of an event in the Event Grid Schema
   */
  eventGridSchema: TestCase;
  /**
   * A test case of an event in the Cloud Event Schema.
   */
  cloudEventSchema: TestCase;
}

export const customTestEvent1: TestEventInfo = {
  eventGridSchema: new TestCase({
    id: "5bc888aa-c2f4-11ea-b3de-0242ac130004",
    subject: "",
    data: {
      hello: "world"
    },
    eventType: "Azure.Sdk.TestEvent1",
    dataVersion: "1.0",
    metadataVersion: "1",
    eventTime: new Date("2020-07-10T21:27:12.925Z"),
    topic:
      "/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/matell-rg/providers/Microsoft.EventGrid/topics/matell-eg-topic"
  }),
  cloudEventSchema: new TestCase({
    id: "5bc888aa-c2f4-11ea-b3de-0242ac130004",
    source:
      "/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/matell-rg/providers/Microsoft.EventGrid/topics/matell-eg-topic",
    specversion: "1.0",
    type: "Azure.Sdk.TestEvent1",
    subject: "",
    time: new Date("2020-07-10T21:27:12.925Z"),
    data: {
      hello: "world"
    }
  })
};

export const customTestEvent2: TestEventInfo = {
  eventGridSchema: new TestCase({
    id: "ddf773ae-c2f4-11ea-b3de-0242ac130004",
    subject: "",
    data: {
      goodbye: "everyone"
    },
    eventType: "Azure.Sdk.TestEvent2",
    dataVersion: "1.0",
    metadataVersion: "1",
    eventTime: new Date("2020-07-10T21:27:12.925Z"),
    topic:
      "/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/matell-rg/providers/Microsoft.EventGrid/topics/matell-eg-topic"
  }),
  cloudEventSchema: new TestCase({
    id: "ddf773ae-c2f4-11ea-b3de-0242ac130004",
    source:
      "/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/matell-rg/providers/Microsoft.EventGrid/topics/matell-eg-topic",
    specversion: "1.0",
    type: "Azure.Sdk.TestEvent2",
    subject: "",
    time: new Date("2020-07-10T21:27:12.925Z"),
    data: {
      goodbye: "everyone"
    }
  })
};

// As of 2020-07-10, the Container Registry service is delivering the `data` object as string instead of a JSON object. This disagrees with
// the documented shape of the event. Our parsers have a special case to deal with this, for these events.
export const containerRegistryPushedEvent: TestEventInfo = {
  eventGridSchema: new TestCase(
    {
      id: "b734f818-f923-472b-aec8-50995013fd7c",
      topic:
        "/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/matell-rg/providers/Microsoft.ContainerRegistry/registries/matellcr",
      subject: "ubuntu:18.04",
      eventType: "Microsoft.ContainerRegistry.ImagePushed",
      data: {
        id: "b734f818-f923-472b-aec8-50995013fd7c",
        timestamp: new Date("2020-07-09T00:29:38.143428094Z"),
        action: "push",
        target: {
          mediaType: "application/vnd.docker.distribution.manifest.v2+json",
          size: 1152,
          digest: "sha256:3013b0d761d4bad6ff16dd2805887a2f2c3fc140d6206086698b5c3e44e0f7fe",
          length: 1152,
          repository: "ubuntu",
          tag: "18.04"
        },
        request: {
          id: "6d472f8e-8366-408a-a248-fb76348c91a0",
          host: "matellcr.azurecr.io",
          method: "PUT",
          useragent:
            "docker/19.03.8 go/go1.12.17 git-commit/afacb8b kernel/4.19.104-microsoft-standard os/linux arch/amd64 UpstreamClient(Docker-Client/19.03.8 \\(windows\\))"
        }
      },
      dataVersion: "1.0",
      metadataVersion: "1",
      eventTime: new Date("2020-07-09T00:29:38.3640826Z")
    },
    JSON.stringify({
      id: "b734f818-f923-472b-aec8-50995013fd7c",
      topic:
        "/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/matell-rg/providers/Microsoft.ContainerRegistry/registries/matellcr",
      subject: "ubuntu:18.04",
      eventType: "Microsoft.ContainerRegistry.ImagePushed",
      data:
        '{"id":"b734f818-f923-472b-aec8-50995013fd7c","timestamp":"2020-07-09T00:29:38.143428094Z","action":"push","target":{"mediaType":"application/vnd.docker.distribution.manifest.v2+json","size":1152,"digest":"sha256:3013b0d761d4bad6ff16dd2805887a2f2c3fc140d6206086698b5c3e44e0f7fe","length":1152,"repository":"ubuntu","tag":"18.04"},"request":{"id":"6d472f8e-8366-408a-a248-fb76348c91a0","host":"matellcr.azurecr.io","method":"PUT","useragent":"docker/19.03.8 go/go1.12.17 git-commit/afacb8b kernel/4.19.104-microsoft-standard os/linux arch/amd64 UpstreamClient(Docker-Client/19.03.8 \\\\(windows\\\\))"}}',
      dataVersion: "1.0",
      metadataVersion: "1",
      eventTime: "2020-07-09T00:29:38.3640826Z"
    })
  ),
  cloudEventSchema: new TestCase(
    {
      id: "2092c215-d22b-4116-8e56-42dfa856d711",
      source:
        "/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/matell-rg/providers/Microsoft.ContainerRegistry/registries/matellcr",
      specversion: "1.0",
      type: "Microsoft.ContainerRegistry.ImagePushed",
      dataschema: "#1.0",
      subject: "alpine:latest",
      time: new Date("2020-07-10T20:30:31.3653996Z"),
      data: {
        id: "2092c215-d22b-4116-8e56-42dfa856d711",
        timestamp: new Date("2020-07-10T20:30:30.956083501Z"),
        action: "push",
        target: {
          mediaType: "application/vnd.docker.distribution.manifest.v2+json",
          size: 528,
          digest: "sha256:a15790640a6690aa1730c38cf0a440e2aa44aaca9b0e8931a9f2b0d7cc90fd65",
          length: 528,
          repository: "alpine",
          tag: "latest"
        },
        request: {
          id: "1dd0b459-1fc7-43aa-a1a1-c820e996699f",
          host: "matellcr.azurecr.io",
          method: "PUT",
          useragent:
            "docker/19.03.8 go/go1.12.17 git-commit/afacb8b kernel/4.19.104-microsoft-standard os/linux arch/amd64 UpstreamClient(Docker-Client/19.03.8 \\(linux\\))"
        }
      }
    },
    JSON.stringify({
      id: "2092c215-d22b-4116-8e56-42dfa856d711",
      source:
        "/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/matell-rg/providers/Microsoft.ContainerRegistry/registries/matellcr",
      specversion: "1.0",
      type: "Microsoft.ContainerRegistry.ImagePushed",
      dataschema: "#1.0",
      subject: "alpine:latest",
      time: "2020-07-10T20:30:31.3653996Z",
      data:
        '{"id":"2092c215-d22b-4116-8e56-42dfa856d711","timestamp":"2020-07-10T20:30:30.956083501Z","action":"push","target":{"mediaType":"application/vnd.docker.distribution.manifest.v2+json","size":528,"digest":"sha256:a15790640a6690aa1730c38cf0a440e2aa44aaca9b0e8931a9f2b0d7cc90fd65","length":528,"repository":"alpine","tag":"latest"},"request":{"id":"1dd0b459-1fc7-43aa-a1a1-c820e996699f","host":"matellcr.azurecr.io","method":"PUT","useragent":"docker/19.03.8 go/go1.12.17 git-commit/afacb8b kernel/4.19.104-microsoft-standard os/linux arch/amd64 UpstreamClient(Docker-Client/19.03.8 \\\\(linux\\\\))"}}'
    })
  )
};
