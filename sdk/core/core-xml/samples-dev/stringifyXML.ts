// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how the stringify() method can be used to stringify some object into XML.
 *
 * @summary Demonstrates how to use @azure/core-xml to stringify some object into XML.
 * @azsdk-weight 100
 */

import { stringifyXML } from "@azure/core-xml";

async function main() {
  const job: Record<string, any> = {
    Type: "ImportCreateRegistrations",
    OutputContainerUri: { __cdata: "https://test.blob.core.windows.net/testjobs" },
    ImportFileUri: { __cdata: "https://test.blob.core.windows.net/testjobs/" },
  };

  const requestObject = serializeToAtomXmlRequest("NotificationHubJob", job);

  const xmlString = stringifyXML(requestObject, { rootName: "entry", cdataPropName: "__cdata" });

  console.log(`Resulting XML: ${xmlString}`);
}

function serializeToAtomXmlRequest(
  resourceName: string,
  resource: unknown
): Record<string, unknown> {
  const XML_METADATA_MARKER = "$";
  const content: any = {};

  content[resourceName] = Object.assign({}, resource);

  content[resourceName][XML_METADATA_MARKER] = {
    xmlns: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
    "xmlns:i": "http://www.w3.org/2001/XMLSchema-instance",
  };

  content[XML_METADATA_MARKER] = { type: "application/xml" };
  const requestDetails: Record<string, unknown> = {
    updated: new Date().toISOString(),
    content: content,
  };
  requestDetails[XML_METADATA_MARKER] = {
    xmlns: "http://www.w3.org/2005/Atom",
  };
  return requestDetails;
}

main().catch((err) => {
  console.log("Sample: Error occurred: ", err);
  process.exit(1);
});
