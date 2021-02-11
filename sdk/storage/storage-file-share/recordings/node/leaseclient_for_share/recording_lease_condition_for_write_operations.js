let nock = require('nock');

module.exports.hash = "44ab307e6c4bc4b593883f54024ed146";

module.exports.testInfo = {"uniqueName":{"share":"share160121917079001315"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121917079001315')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:06:10 GMT',
  'ETag',
  '"0x8D862F6DEA02FCD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10293460-d01a-0000-38df-946ea6000000',
  'x-ms-client-request-id',
  '8b85d952-4720-4e12-8f77-f67ac1ebb788',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:06:10 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121917079001315')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:06:10 GMT',
  'ETag',
  '"0x8D862F6DEA02FCD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab1a36-701a-006b-4cdf-94e952000000',
  'x-ms-client-request-id',
  '70c512fb-3dc5-4c2c-99ea-bc254edc6162',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-id',
  'dbb014b6-5de2-4d8f-8c48-ed7b503b7733',
  'Date',
  'Sun, 27 Sep 2020 15:06:10 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121917079001315')
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>LeaseIdMissing</Code><Message>There is currently a lease on the file share and no lease ID was specified in the request.\nRequestId:10293463-d01a-0000-39df-946ea6000000\nTime:2020-09-27T15:06:11.7787922Z</Message></Error>", [
  'Content-Length',
  '273',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10293463-d01a-0000-39df-946ea6000000',
  'x-ms-client-request-id',
  'f2da11ba-e110-4fae-b33c-a4d9b84d5226',
  'x-ms-version',
  '2020-02-10',
  'x-ms-error-code',
  'LeaseIdMissing',
  'Date',
  'Sun, 27 Sep 2020 15:06:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121917079001315')
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>LeaseIdMismatchWithContainerOperation</Code><Message>The lease ID specified did not match the lease ID for the file share.\nRequestId:09ab1a39-701a-006b-4ddf-94e952000000\nTime:2020-09-27T15:06:12.1798962Z</Message></Error>", [
  'Content-Length',
  '275',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab1a39-701a-006b-4ddf-94e952000000',
  'x-ms-client-request-id',
  '4967bca6-47c9-4f66-976d-3ca66d820f49',
  'x-ms-version',
  '2020-02-10',
  'x-ms-error-code',
  'LeaseIdMismatchWithContainerOperation',
  'Date',
  'Sun, 27 Sep 2020 15:06:11 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121917079001315')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:06:12 GMT',
  'ETag',
  '"0x8D862F6DF999657"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10293465-d01a-0000-3adf-946ea6000000',
  'x-ms-client-request-id',
  'a3149040-0a5c-4076-8bf1-0288f6a2709f',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:06:12 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121917079001315')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:06:12 GMT',
  'ETag',
  '"0x8D862F6DF999657"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab1a3c-701a-006b-4fdf-94e952000000',
  'x-ms-client-request-id',
  '50d3ae0e-d30b-4cf5-9146-acc879fa7011',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-time',
  '0',
  'Date',
  'Sun, 27 Sep 2020 15:06:12 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160121917079001315')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10293467-d01a-0000-3bdf-946ea6000000',
  'x-ms-client-request-id',
  '81186509-54c8-415d-94c3-ce811b8cf620',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:06:12 GMT'
]);
