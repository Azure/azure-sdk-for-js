// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert } from "vitest";
import {
  parseNotificationHubJobEntry,
  parseNotificationHubJobFeed,
  serializeNotificationHubJobEntry,
} from "../../../src/serializers/notificationHubJobSerializer.js";
import { NotificationHubJob } from "../../../src/models/notificationHubJob.js";

const HUB_JOB_OUTGOING = `<?xml version="1.0" encoding="utf-8"?>
<entry xmlns="http://www.w3.org/2005/Atom">
  <content type="application/atom+xml;type=entry;charset=utf-8">
    <NotificationHubJob xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
      <Type>ImportCreateRegistrations</Type>
      <OutputContainerUri>
        <![CDATA[https://test.blob.core.windows.net/testjobs]]>
      </OutputContainerUri>
      <ImportFileUri>
        <![CDATA[https://test.blob.core.windows.net/testjobs/CreateFile.txt]]>
      </ImportFileUri>
    </NotificationHubJob>
  </content>
</entry>`;

const HUB_JOB_INCOMING = `<entry xmlns="http://www.w3.org/2005/Atom">
<id>https://test.servicebus.windows.net/hub/jobs/1?api-version=2014-09</id>
<title type="text">1</title>
<published>2014-12-06T01:48:55Z</published>
<updated>2014-12-06T01:48:55Z</updated>
<link rel="self" href="https://test.servicebus.windows.net/hub/jobs/1?api-version=2014-09"/>
<content type="application/xml">
  <NotificationHubJob xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
    <JobId>1</JobId>
    <Progress>99.99</Progress>
    <Type>ImportCreateRegistrations</Type>
    <Status>Completed</Status>
    <OutputContainerUri><![CDATA[https://test.blob.core.windows.net/testjobs]]></OutputContainerUri>
    <ImportFileUri><![CDATA[https://test.blob.core.windows.net/testjobs/CreateFile.txt]]></ImportFileUri>
    <OutputProperties xmlns:d3p1="http://schemas.microsoft.com/2003/10/Serialization/Arrays">
      <d3p1:KeyValueOfstringstring>
        <d3p1:Key>OutputFilePath</d3p1:Key>
        <d3p1:Value>test//hub/1/Output.txt</d3p1:Value>
      </d3p1:KeyValueOfstringstring>
      <d3p1:KeyValueOfstringstring>
        <d3p1:Key>FailedFilePath</d3p1:Key>
        <d3p1:Value>test//hub/1/Failed.txt</d3p1:Value>
      </d3p1:KeyValueOfstringstring>
    </OutputProperties>
    <CreatedAt>2014-12-06T01:48:49.9874484Z</CreatedAt>
    <UpdatedAt>2014-12-06T01:48:54.4501165Z</UpdatedAt>
  </NotificationHubJob>
</content>
</entry>`;

const HUB_JOB_FEED = `<feed xmlns="http://www.w3.org/2005/Atom">
<title type="text">jobs</title>
<id>https://test.servicebus.windows.net/hub/jobs</id>
<updated>2014-12-06T06:17:24Z</updated>
<link rel="self" href="https://test.servicebus.windows.net/adm-hub/jobs"/>
<entry xmlns="http://www.w3.org/2005/Atom">
  <id>https://test.servicebus.windows.net/hub/jobs/1?api-version=2014-09</id>
  <title type="text">1</title>
  <published>2014-12-06T01:48:55Z</published>
  <updated>2014-12-06T01:48:55Z</updated>
  <link rel="self" href="https://test.servicebus.windows.net/hub/jobs/1?api-version=2014-09"/>
  <content type="application/xml">
    <NotificationHubJob xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
      <JobId>1</JobId>
      <Progress>99.99</Progress>
      <Type>ImportCreateRegistrations</Type>
      <Status>Completed</Status>
      <OutputContainerUri>https://test.blob.core.windows.net/testjobs</OutputContainerUri>
      <ImportFileUri>https://test.blob.core.windows.net/testjobs/CreateFile.txt</ImportFileUri>
      <OutputProperties xmlns:d3p1="http://schemas.microsoft.com/2003/10/Serialization/Arrays">
        <d3p1:KeyValueOfstringstring>
          <d3p1:Key>OutputFilePath</d3p1:Key>
          <d3p1:Value>test//hub/1/Output.txt</d3p1:Value>
        </d3p1:KeyValueOfstringstring>
        <d3p1:KeyValueOfstringstring>
          <d3p1:Key>FailedFilePath</d3p1:Key>
          <d3p1:Value>test//hub/1/Failed.txt</d3p1:Value>
        </d3p1:KeyValueOfstringstring>
      </OutputProperties>
      <CreatedAt>2014-12-06T01:48:49.9874484Z</CreatedAt>
      <UpdatedAt>2014-12-06T01:48:54.4501165Z</UpdatedAt>
    </NotificationHubJob>
  </content>
</entry>
<entry xmlns="http://www.w3.org/2005/Atom">
  <id>https://test.servicebus.windows.net/hub/jobs/1?api-version=2014-09</id>
  <title type="text">1</title>
  <published>2014-12-06T01:48:55Z</published>
  <updated>2014-12-06T01:48:55Z</updated>
  <link rel="self" href="https://test.servicebus.windows.net/hub/jobs/1?api-version=2014-09"/>
  <content type="application/xml">
    <NotificationHubJob xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
      <JobId>2</JobId>
      <Progress>99.99</Progress>
      <Type>ImportCreateRegistrations</Type>
      <Status>Completed</Status>
      <OutputContainerUri>https://test.blob.core.windows.net/testjobs</OutputContainerUri>
      <ImportFileUri>https://test.blob.core.windows.net/testjobs/CreateFile.txt</ImportFileUri>
      <OutputProperties xmlns:d3p1="http://schemas.microsoft.com/2003/10/Serialization/Arrays">
        <d3p1:KeyValueOfstringstring>
          <d3p1:Key>OutputFilePath</d3p1:Key>
          <d3p1:Value>test//hub/2/Output.txt</d3p1:Value>
        </d3p1:KeyValueOfstringstring>
        <d3p1:KeyValueOfstringstring>
          <d3p1:Key>FailedFilePath</d3p1:Key>
          <d3p1:Value>test//hub/2/Failed.txt</d3p1:Value>
        </d3p1:KeyValueOfstringstring>
      </OutputProperties>
      <CreatedAt>2014-12-06T01:48:49.9874484Z</CreatedAt>
      <UpdatedAt>2014-12-06T01:48:54.4501165Z</UpdatedAt>
    </NotificationHubJob>
  </content>
</entry>
<entry xmlns="http://www.w3.org/2005/Atom">
  <id>https://test.servicebus.windows.net/hub/jobs/1?api-version=2014-09</id>
  <title type="text">1</title>
  <published>2014-12-06T01:48:55Z</published>
  <updated>2014-12-06T01:48:55Z</updated>
  <link rel="self" href="https://test.servicebus.windows.net/hub/jobs/1?api-version=2014-09"/>
  <content type="application/xml">
    <NotificationHubJob xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
      <JobId>3</JobId>
      <Progress>99.99</Progress>
      <Type>ImportCreateRegistrations</Type>
      <Status>Completed</Status>
      <OutputContainerUri>https://test.blob.core.windows.net/testjobs</OutputContainerUri>
      <ImportFileUri>https://test.blob.core.windows.net/testjobs/CreateFile.txt</ImportFileUri>
      <OutputProperties xmlns:d3p1="http://schemas.microsoft.com/2003/10/Serialization/Arrays">
        <d3p1:KeyValueOfstringstring>
          <d3p1:Key>OutputFilePath</d3p1:Key>
          <d3p1:Value>test//hub/3/Output.txt</d3p1:Value>
        </d3p1:KeyValueOfstringstring>
        <d3p1:KeyValueOfstringstring>
          <d3p1:Key>FailedFilePath</d3p1:Key>
          <d3p1:Value>test//hub/3/Failed.txt</d3p1:Value>
        </d3p1:KeyValueOfstringstring>
      </OutputProperties>
      <CreatedAt>2014-12-06T01:48:49.9874484Z</CreatedAt>
      <UpdatedAt>2014-12-06T01:48:54.4501165Z</UpdatedAt>
    </NotificationHubJob>
  </content>
</entry>
</feed>`;

const SINGLE_JOB_FEED = `<feed xmlns="http://www.w3.org/2005/Atom">
<title type="text">jobs</title>
<id>https://test.servicebus.windows.net/hub/jobs</id>
<updated>2014-12-06T06:17:24Z</updated>
<link rel="self" href="https://test.servicebus.windows.net/adm-hub/jobs"/>
<entry xmlns="http://www.w3.org/2005/Atom">
  <id>https://test.servicebus.windows.net/hub/jobs/1?api-version=2014-09</id>
  <title type="text">1</title>
  <published>2014-12-06T01:48:55Z</published>
  <updated>2014-12-06T01:48:55Z</updated>
  <link rel="self" href="https://test.servicebus.windows.net/hub/jobs/1?api-version=2014-09"/>
  <content type="application/xml">
    <NotificationHubJob xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
      <JobId>3</JobId>
      <Progress>99.99</Progress>
      <Type>ImportCreateRegistrations</Type>
      <Status>Completed</Status>
      <OutputContainerUri>https://test.blob.core.windows.net/testjobs</OutputContainerUri>
      <ImportFileUri>https://test.blob.core.windows.net/testjobs/CreateFile.txt</ImportFileUri>
      <OutputProperties xmlns:d3p1="http://schemas.microsoft.com/2003/10/Serialization/Arrays">
        <d3p1:KeyValueOfstringstring>
          <d3p1:Key>OutputFilePath</d3p1:Key>
          <d3p1:Value>test//hub/3/Output.txt</d3p1:Value>
        </d3p1:KeyValueOfstringstring>
        <d3p1:KeyValueOfstringstring>
          <d3p1:Key>FailedFilePath</d3p1:Key>
          <d3p1:Value>test//hub/3/Failed.txt</d3p1:Value>
        </d3p1:KeyValueOfstringstring>
      </OutputProperties>
      <CreatedAt>2014-12-06T01:48:49.9874484Z</CreatedAt>
      <UpdatedAt>2014-12-06T01:48:54.4501165Z</UpdatedAt>
    </NotificationHubJob>
  </content>
</entry>
</feed>`;

const EMPTY_JOB_FEED = `<feed xmlns="http://www.w3.org/2005/Atom">
<title type="text">jobs</title>
<id>https://test.servicebus.windows.net/hub/jobs</id>
<updated>2014-12-06T06:17:24Z</updated>
<link rel="self" href="https://test.servicebus.windows.net/adm-hub/jobs"/>
</feed>`;

describe("parseNotificationHubJobEntry", () => {
  it("should parse an outgoing entry", async () => {
    const parsed = await parseNotificationHubJobEntry(HUB_JOB_OUTGOING);

    assert.equal(parsed.type, "ImportCreateRegistrations");
    assert.equal(parsed.outputContainerUrl, "https://test.blob.core.windows.net/testjobs");
    assert.equal(
      parsed.importFileUrl,
      "https://test.blob.core.windows.net/testjobs/CreateFile.txt",
    );
  });

  it("should parse an incoming entry", async () => {
    const parsed = await parseNotificationHubJobEntry(HUB_JOB_INCOMING);

    assert.equal(parsed.jobId, "1");
    assert.equal(parsed.progress, 99.99);
    assert.equal(parsed.type, "ImportCreateRegistrations");
    assert.equal(parsed.status, "Completed");
    assert.equal(parsed.outputContainerUrl, "https://test.blob.core.windows.net/testjobs");
    assert.equal(
      parsed.importFileUrl,
      "https://test.blob.core.windows.net/testjobs/CreateFile.txt",
    );
    assert.equal(parsed.outputProperties!["OutputFilePath"], "test//hub/1/Output.txt");
    assert.equal(parsed.outputProperties!["FailedFilePath"], "test//hub/1/Failed.txt");
  });
});

describe("parseNotificationHubJobFeed", () => {
  it("should parse an empty job feed", async () => {
    const parsed = await parseNotificationHubJobFeed(EMPTY_JOB_FEED);

    assert.equal(parsed.length, 0);
  });

  it("should parse a single notification job from feed", async () => {
    const parsed = await parseNotificationHubJobFeed(SINGLE_JOB_FEED);

    assert.equal(parsed.length, 1);

    const job = parsed[0];
    assert.equal(job.jobId, "3");
    assert.equal(job.progress, 99.99);
    assert.equal(job.type, "ImportCreateRegistrations");
    assert.equal(job.status, "Completed");
    assert.equal(job.outputContainerUrl, "https://test.blob.core.windows.net/testjobs");
    assert.equal(job.importFileUrl, "https://test.blob.core.windows.net/testjobs/CreateFile.txt");
    assert.equal(job.outputProperties!["OutputFilePath"], "test//hub/3/Output.txt");
    assert.equal(job.outputProperties!["FailedFilePath"], "test//hub/3/Failed.txt");
  });

  it("should parse a notification job feed", async () => {
    const parsed = await parseNotificationHubJobFeed(HUB_JOB_FEED);

    assert.equal(parsed.length, 3);

    const first = parsed[0];
    assert.equal(first.jobId, "1");
    assert.equal(first.progress, 99.99);
    assert.equal(first.type, "ImportCreateRegistrations");
    assert.equal(first.status, "Completed");
    assert.equal(first.outputContainerUrl, "https://test.blob.core.windows.net/testjobs");
    assert.equal(first.importFileUrl, "https://test.blob.core.windows.net/testjobs/CreateFile.txt");
    assert.equal(first.outputProperties!["OutputFilePath"], "test//hub/1/Output.txt");
    assert.equal(first.outputProperties!["FailedFilePath"], "test//hub/1/Failed.txt");

    const second = parsed[1];
    assert.equal(second.jobId, "2");
    assert.equal(second.progress, 99.99);
    assert.equal(second.type, "ImportCreateRegistrations");
    assert.equal(second.status, "Completed");
    assert.equal(second.outputContainerUrl, "https://test.blob.core.windows.net/testjobs");
    assert.equal(
      second.importFileUrl,
      "https://test.blob.core.windows.net/testjobs/CreateFile.txt",
    );
    assert.equal(second.outputProperties!["OutputFilePath"], "test//hub/2/Output.txt");
    assert.equal(second.outputProperties!["FailedFilePath"], "test//hub/2/Failed.txt");

    const third = parsed[2];
    assert.equal(third.jobId, "3");
    assert.equal(third.progress, 99.99);
    assert.equal(third.type, "ImportCreateRegistrations");
    assert.equal(third.status, "Completed");
    assert.equal(third.outputContainerUrl, "https://test.blob.core.windows.net/testjobs");
    assert.equal(third.importFileUrl, "https://test.blob.core.windows.net/testjobs/CreateFile.txt");
    assert.equal(third.outputProperties!["OutputFilePath"], "test//hub/3/Output.txt");
    assert.equal(third.outputProperties!["FailedFilePath"], "test//hub/3/Failed.txt");
  });
});

describe("serializeNotificationHubJobEntry", () => {
  it("should deserialize notification hub job", () => {
    const job: NotificationHubJob = {
      outputContainerUrl: "https://test.blob.core.windows.net/testjobs",
      importFileUrl: "https://test.blob.core.windows.net/testjobs/CreateFile.txt",
      type: "ImportCreateRegistrations",
    };

    const xml = serializeNotificationHubJobEntry(job);

    assert.isTrue(
      xml.indexOf("<Type>ImportCreateRegistrations</Type>") !== -1,
      "Should contain ImportCreateRegistrations type",
    );
    assert.isTrue(
      xml.indexOf(
        "<OutputContainerUri><![CDATA[https://test.blob.core.windows.net/testjobs]]></OutputContainerUri>",
      ) !== -1,
      "Should contain OutputContainerUri",
    );
    assert.isTrue(
      xml.indexOf(
        "<ImportFileUri><![CDATA[https://test.blob.core.windows.net/testjobs/CreateFile.txt]]></ImportFileUri>",
      ) !== -1,
      "Should contain ImportFileUri",
    );
  });
});
