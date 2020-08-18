let nock = require('nock');

module.exports.hash = "22482e1dd1c751c45cc4c4047970c845";

module.exports.testInfo = {"uniqueName":{"share":"share158978108669701515","share158978108669701515":"share158978108669701515158978108699400572"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158978108669701515')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:51:24 GMT',
  'ETag',
  '"0x8D7FAEF801AF9A4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da266f-401a-0012-30d8-2cd9df000000',
  'x-ms-client-request-id',
  'a6b025ec-c745-4c58-9d45-dd0a3696a79a',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:51:24 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158978108669701515158978108699400572')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:51:25 GMT',
  'ETag',
  '"0x8D7FAEF80487A8E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da2671-401a-0012-31d8-2cd9df000000',
  'x-ms-client-request-id',
  '5dbe7c10-39f8-47d1-8c2b-ba11df145182',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:51:24 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share158978108669701515158978108699400572')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ShareAlreadyExists</Code><Message>The specified share already exists.\nRequestId:b2da2673-401a-0012-32d8-2cd9df000000\nTime:2020-05-18T05:51:25.5537999Z</Message></Error>", [
  'Content-Length',
  '222',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da2673-401a-0012-32d8-2cd9df000000',
  'x-ms-client-request-id',
  'f9a13168-6513-48e8-80b3-f0e2c0a68f36',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'ShareAlreadyExists',
  'Date',
  'Mon, 18 May 2020 05:51:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share158978108669701515158978108699400572')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da2675-401a-0012-33d8-2cd9df000000',
  'x-ms-client-request-id',
  '20401e55-ebd4-494c-88ee-be585955beb8',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:51:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share158978108669701515')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2da2676-401a-0012-34d8-2cd9df000000',
  'x-ms-client-request-id',
  '07d6b264-8e4c-4478-b02e-acdd70c58935',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:51:25 GMT'
]);
