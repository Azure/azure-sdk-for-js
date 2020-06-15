let nock = require('nock');

module.exports.hash = "5a0449068d3fe94bec9946961f9b9d03";

module.exports.testInfo = {"uniqueName":{"container1":"container1159218984686205498","key":"key159218984821401244","key2":"key2159218984821407907","blobname1":"blobname1159218984821507230","val1":"val1159218984821603506","blobname2":"blobname2159218984852304182","val2":"val2159218984852407041"},"newDate":{"now":"2020-06-15T02:57:26.859Z","tmr":"2020-06-15T02:57:26.860Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container1159218984686205498')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:57:27 GMT',
  'ETag',
  '"0x8D810D7D6C24E0D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dea84e26-a01e-0089-4bc0-42f775000000',
  'x-ms-client-request-id',
  '04963732-0d5c-4e8e-a14e-4a2eb1248a53',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:57:27 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container1159218984686205498/blobname1159218984821507230')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:57:28 GMT',
  'ETag',
  '"0x8D810D7D6F42897"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dea84ee2-a01e-0089-7ec0-42f775000000',
  'x-ms-client-request-id',
  '562bfc6c-17aa-4d68-a4c1-672a775491f1',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:57:28.3263639Z',
  'Date',
  'Mon, 15 Jun 2020 02:57:27 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container1159218984686205498/blobname2159218984852304182')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:57:28 GMT',
  'ETag',
  '"0x8D810D7D721A968"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dea84f7e-a01e-0089-15c0-42f775000000',
  'x-ms-client-request-id',
  '61447852-d0ec-4982-8baa-1bd2177afe9b',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T02:57:28.6245736Z',
  'Date',
  'Mon, 15 Jun 2020 02:57:28 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Where>key159218984821401244=&apos;val1159218984821603506&apos;</Where><Blobs><Blob><Name>blobname1159218984821507230</Name><ContainerName>container1159218984686205498</ContainerName><TagValue>val1159218984821603506</TagValue></Blob></Blobs><NextMarker/></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dea8554c-a01e-0089-34c0-42f775000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'f0d45b84-d5d5-47b6-baf6-b33fb6070ee6',
  'Date',
  'Mon, 15 Jun 2020 02:57:30 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container1159218984686205498')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dea856d7-a01e-0089-2cc0-42f775000000',
  'x-ms-client-request-id',
  'd4ddb98f-ec79-4868-bf09-73b1a7f2896c',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:57:31 GMT'
]);
