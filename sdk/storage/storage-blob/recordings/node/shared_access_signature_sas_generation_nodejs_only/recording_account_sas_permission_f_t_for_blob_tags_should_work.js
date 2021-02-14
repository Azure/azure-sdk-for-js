let nock = require('nock');

module.exports.hash = "65f4da8bb715d1ed6e4003554d3d029c";

module.exports.testInfo = {"uniqueName":{"container1":"container1160587645053109512","key":"key160587645183702804","key2":"key2160587645183708754","blobname1":"blobname1160587645183708224","val1":"val1160587645183909250","blobname2":"blobname2160587645246900867","val2":"val2160587645247005754"},"newDate":{"now":"2020-11-20T12:47:30.528Z","tmr":"2020-11-20T12:47:30.529Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container1160587645053109512')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 20 Nov 2020 12:47:31 GMT',
  'ETag',
  '"0x8D88D5272438848"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cde1154e-a01e-0070-603b-bf6335000000',
  'x-ms-client-request-id',
  'b30860f3-d57d-4682-a175-098c51cbfaca',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Fri, 20 Nov 2020 12:47:31 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container1160587645053109512/blobname1160587645183708224')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 20 Nov 2020 12:47:32 GMT',
  'ETag',
  '"0x8D88D5272A6D89C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cde11581-a01e-0070-093b-bf6335000000',
  'x-ms-client-request-id',
  'fbf6f7f3-bffb-47bf-800a-3c55bd835d38',
  'x-ms-version',
  '2020-04-08',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-11-20T12:47:32.3296924Z',
  'Date',
  'Fri, 20 Nov 2020 12:47:32 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container1160587645053109512/blobname2160587645246900867')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 20 Nov 2020 12:47:32 GMT',
  'ETag',
  '"0x8D88D5272D1C0FB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cde1162a-a01e-0070-063b-bf6335000000',
  'x-ms-client-request-id',
  'f9dd0849-d267-4155-847b-3cfd355a763c',
  'x-ms-version',
  '2020-04-08',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-11-20T12:47:32.6108923Z',
  'Date',
  'Fri, 20 Nov 2020 12:47:32 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Where>key160587645183702804=&apos;val1160587645183909250&apos;</Where><Blobs><Blob><Name>blobname1160587645183708224</Name><ContainerName>container1160587645053109512</ContainerName><Tags><TagSet><Tag><Key>key160587645183702804</Key><Value>val1160587645183909250</Value></Tag></TagSet></Tags></Blob></Blobs><NextMarker/></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cde117d1-a01e-0070-513b-bf6335000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  'bf772780-e60a-4bb7-b9d8-689ca33f4831',
  'Date',
  'Fri, 20 Nov 2020 12:47:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container1160587645053109512')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cde1198e-a01e-0070-3c3b-bf6335000000',
  'x-ms-client-request-id',
  'e1198b53-af46-421b-afd5-09dee6fbb7c2',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Fri, 20 Nov 2020 12:47:36 GMT'
]);
