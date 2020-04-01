let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container158096125637501561","blob":"blob158096125637606171"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158096125637501561')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 06 Feb 2020 03:54:17 GMT',
  'ETag',
  '"0x8D7AAB83D4F491E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '52cd3c3e-a01e-0042-74a1-dc2bbb000000',
  'x-ms-client-request-id',
  'edc29884-0d59-410a-8e50-132686c7109f',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Thu, 06 Feb 2020 03:54:16 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Containers><Container><Name>container158096125637501561</Name><Properties><Last-Modified>Thu, 06 Feb 2020 03:54:17 GMT</Last-Modified><Etag>\"0x8D7AAB83D4F491E\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><DefaultEncryptionScope>antjoscope1</DefaultEncryptionScope><DenyEncryptionScopeOverride>true</DenyEncryptionScopeOverride><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold></Properties><Metadata /></Container></Containers><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '46c9658e-601e-003f-29a1-dc5a98000000',
  'x-ms-client-request-id',
  'd844abbd-5c3f-47a7-acd7-c90d98f8ce17',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Thu, 06 Feb 2020 03:54:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158096125637501561/blob158096125637606171', "Hello World")
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>RequestForbiddenByContainerEncryptionPolicy</Code><Message>The request is forbidden by the container encryption policy.\nRequestId:c823bedf-001e-0016-0fa1-dc64ec000000\nTime:2020-02-06T03:54:20.2045223Z</Message></Error>", [
  'Content-Length',
  '272',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c823bedf-001e-0016-0fa1-dc64ec000000',
  'x-ms-client-request-id',
  '9c0d665f-4179-46ca-b4b5-068a86f1133e',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'RequestForbiddenByContainerEncryptionPolicy',
  'Date',
  'Thu, 06 Feb 2020 03:54:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158096125637501561')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '52cd3ce3-a01e-0042-4ba1-dc2bbb000000',
  'x-ms-client-request-id',
  'feec62b2-579e-404a-ba02-02753b48e399',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Thu, 06 Feb 2020 03:54:19 GMT'
]);
