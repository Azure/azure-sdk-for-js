// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how the parseXML() method can be used to parse some XML.
 *
 * @summary Demonstrates how to use @azure/core-xml to parse XML.
 * @azsdk-weight 100
 */

import { parseXML } from "@azure/core-xml";

const XML = `<?xml version="1.0" encoding="utf-8"?>
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

async function main() {
  const xmlObj = await parseXML(XML, { includeRoot: true });
  const notificationHubJob = xmlObj.entry.content.NotificationHubJob;

  console.log(`Job Type: ${notificationHubJob.Type}`);
  console.log(`Output Container URL: ${notificationHubJob.OutputContainerUri}`);
  console.log(`Import File URL: ${notificationHubJob.ImportFileUri}`);
}

main().catch((err) => {
  console.log("Sample: Error occurred: ", err);
  process.exit(1);
});
