let nock = require('nock');

module.exports.hash = "e795b67a4f961b23b646fb0f8c21444d";

module.exports.testInfo = {"uniqueName":{"share":"share158978108551204482","share158978108551204482":"share158978108551204482158978108609708713"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158978108551204482')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:51:23 GMT',
  'ETag',
  '"0x8D7FAEF7F65B975"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da2666-401a-0012-2cd8-2cd9df000000',
  'x-ms-client-request-id',
  '2bde80ff-3265-4fba-92dc-5d3dbed518fb',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:51:23 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share158978108551204482')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:51:23 GMT',
  'ETag',
  '"0x8D7FAEF7F65B975"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da2669-401a-0012-2dd8-2cd9df000000',
  'x-ms-client-request-id',
  '5c766a9b-37d8-4f97-b65f-a835d0e46de4',
  'x-ms-version',
  '2019-07-07',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-share-quota',
  '5120',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-share-quota,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 18 May 2020 05:51:23 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share158978108551204482158978108609708713')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ShareNotFound</Code><Message>The specified share does not exist.\nRequestId:b2da266c-401a-0012-2ed8-2cd9df000000\nTime:2020-05-18T05:51:24.3649542Z</Message></Error>", [
  'Content-Length',
  '217',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da266c-401a-0012-2ed8-2cd9df000000',
  'x-ms-client-request-id',
  '6acc5f58-83c4-42a6-a45d-f0f54d215a0e',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'ShareNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 18 May 2020 05:51:23 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share158978108551204482')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da266e-401a-0012-2fd8-2cd9df000000',
  'x-ms-client-request-id',
  'c968185d-87d4-49bb-a6b5-5ee222b73423',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:51:24 GMT'
]);
