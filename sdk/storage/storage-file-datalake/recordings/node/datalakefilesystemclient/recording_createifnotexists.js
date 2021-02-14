let nock = require('nock');

module.exports.hash = "20dbc14eb779c9620f4adbba78aa35ca";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158977960418708486","filesystem158977960418708486":"filesystem158977960418708486158977960748306575"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158977960418708486')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:26:45 GMT',
  'ETag',
  '"0x8D7FAEC0E0BABF5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dc4bd6f8-a01e-002b-2dd4-2c3126000000',
  'x-ms-client-request-id',
  '35e3dc14-51eb-48df-9027-262f222639a4',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:26:44 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158977960418708486158977960748306575')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:26:45 GMT',
  'ETag',
  '"0x8D7FAEC0E6EC870"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dc4bd83c-a01e-002b-56d4-2c3126000000',
  'x-ms-client-request-id',
  'c0647c84-ab76-40ab-83af-7d601e52a85f',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:26:45 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158977960418708486158977960748306575')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ContainerAlreadyExists</Code><Message>The specified container already exists.\nRequestId:dc4bd8f2-a01e-002b-7cd4-2c3126000000\nTime:2020-05-18T05:26:46.1284743Z</Message></Error>", [
  'Content-Length',
  '230',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dc4bd8f2-a01e-002b-7cd4-2c3126000000',
  'x-ms-client-request-id',
  'ee8432a2-2585-473d-aaa0-ee45e4902544',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'ContainerAlreadyExists',
  'Date',
  'Mon, 18 May 2020 05:26:45 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem158977960418708486158977960748306575')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dc4bd9a9-a01e-002b-1fd4-2c3126000000',
  'x-ms-client-request-id',
  '9940ef89-f0f5-4695-a1e3-e52f2fd40fd3',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:26:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem158977960418708486')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dc4bdaa1-a01e-002b-08d4-2c3126000000',
  'x-ms-client-request-id',
  'bab87cc5-fa72-416d-92dc-6e7ace950c85',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:26:46 GMT'
]);
