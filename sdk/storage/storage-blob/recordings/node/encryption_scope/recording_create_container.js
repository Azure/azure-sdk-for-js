let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container158096124988706891","blob":"blob158096124988804715"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158096124988706891')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 06 Feb 2020 03:54:13 GMT',
  'ETag',
  '"0x8D7AAB83AB7B987"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cc606e7f-401e-0038-49a1-dc36fb000000',
  'x-ms-client-request-id',
  '3af96703-e930-4622-9123-18caab753df5',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Thu, 06 Feb 2020 03:54:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Containers><Container><Name>container158096124988706891</Name><Properties><Last-Modified>Thu, 06 Feb 2020 03:54:13 GMT</Last-Modified><Etag>\"0x8D7AAB83AB7B987\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold></Properties><Metadata /></Container></Containers><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c404afc9-001e-0029-05a1-dcac4f000000',
  'x-ms-client-request-id',
  'c5aa49d5-5c62-4663-8434-9a27e88196ea',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Thu, 06 Feb 2020 03:54:13 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158096124988706891/blob158096124988804715', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 06 Feb 2020 03:54:15 GMT',
  'ETag',
  '"0x8D7AAB83C4842DE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c404b013-001e-0029-42a1-dcac4f000000',
  'x-ms-client-request-id',
  'eb53044a-4b9c-4158-8db3-4bd0ddc95eb9',
  'x-ms-version',
  '2019-07-07',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'antjoscope1',
  'Date',
  'Thu, 06 Feb 2020 03:54:15 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158096124988706891')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cc606ea7-401e-0038-67a1-dc36fb000000',
  'x-ms-client-request-id',
  '56e9a7af-d983-4a2a-a474-52c9195ab11f',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Thu, 06 Feb 2020 03:54:15 GMT'
]);
