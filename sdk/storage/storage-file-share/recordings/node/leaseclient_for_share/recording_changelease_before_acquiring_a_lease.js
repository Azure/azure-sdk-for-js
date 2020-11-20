let nock = require('nock');

module.exports.hash = "ebfbd5b28ebc766ef7fcc4b5f1e3c195";

module.exports.testInfo = {"uniqueName":{"share":"share160121915061801772"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121915061801772')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:50 GMT',
  'ETag',
  '"0x8D862F6D29A2262"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10293419-d01a-0000-12df-946ea6000000',
  'x-ms-client-request-id',
  'f8d1e1d9-9240-4f38-a7b1-9b20fb243fae',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:05:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121915061801772')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>LeaseNotPresentWithLeaseOperation</Code><Message>There is currently no lease on the file share.\nRequestId:09ab19e5-701a-006b-23df-94e952000000\nTime:2020-09-27T15:05:51.1790130Z</Message></Error>", [
  'Content-Length',
  '248',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19e5-701a-006b-23df-94e952000000',
  'x-ms-client-request-id',
  'a9af1e5f-8eb8-4b67-ad8e-8e83dd800ab9',
  'x-ms-version',
  '2020-02-10',
  'x-ms-error-code',
  'LeaseNotPresentWithLeaseOperation',
  'Date',
  'Sun, 27 Sep 2020 15:05:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160121915061801772')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1029341b-d01a-0000-13df-946ea6000000',
  'x-ms-client-request-id',
  '28e6eb70-76d2-4a0e-8bc3-6f0b59f8f3b9',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:05:51 GMT'
]);
