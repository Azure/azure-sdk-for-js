let nock = require('nock');

module.exports.hash = "ae747a9b21db3a1e891631c17d4f80ec";

module.exports.testInfo = {"uniqueName":{"share":"share167870264678609332","newshare":"newshare167870264819805251"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167870264678609332')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 13 Mar 2023 10:17:28 GMT',
  'ETag',
  '"0x8DB23AC260A96B8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '290fa2c7-c01a-0087-1295-55b6cc000000',
  'x-ms-client-request-id',
  '55cb3ed5-a9cd-4a87-9ae1-00fc7813ca3d',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 13 Mar 2023 10:17:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/newshare167870264819805251')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>FileOAuthManagementApiRestrictedToSrp</Code><Message>This API does not support bearer tokens. For OAuth, use the Storage Resource Provider APIs instead. Learn more: https://aka.ms/azurefiles/restapi.\nRequestId:290fa2cd-c01a-0087-1395-55b6cc000000\nTime:2023-03-13T10:17:29.0228289Z</Message></Error>", [
  'Content-Length',
  '352',
  'Content-Type',
  'application/xml',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '290fa2cd-c01a-0087-1395-55b6cc000000',
  'x-ms-client-request-id',
  '950df7cc-64ef-4424-a8cc-f8ca6b2db58e',
  'x-ms-error-code',
  'FileOAuthManagementApiRestrictedToSrp',
  'Date',
  'Mon, 13 Mar 2023 10:17:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167870264678609332')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '290fa2d0-c01a-0087-1495-55b6cc000000',
  'x-ms-client-request-id',
  'd9ba9be3-b959-4944-9705-4206deb71755',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 13 Mar 2023 10:17:29 GMT'
]);
