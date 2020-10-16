let nock = require('nock');

module.exports.hash = "6bc9e6dba00ba7917561b4297b120d2b";

module.exports.testInfo = {"uniqueName":{"share":"share160121914334809671"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121914334809671')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:43 GMT',
  'ETag',
  '"0x8D862F6CE4450CF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19c3-701a-006b-10df-94e952000000',
  'x-ms-client-request-id',
  '5a751af9-44de-4e5c-9881-33f31c77e379',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:05:42 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121914334809671')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:43 GMT',
  'ETag',
  '"0x8D862F6CE4450CF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19c6-701a-006b-12df-94e952000000',
  'x-ms-client-request-id',
  'dc7d3aef-9458-4c25-86d5-270e9257c87c',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-id',
  'e04ff2de-d75d-476a-9cb2-3ea66fcb912f',
  'Date',
  'Sun, 27 Sep 2020 15:05:42 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121914334809671')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>LeaseAlreadyPresent</Code><Message>There is already a lease present.\nRequestId:09ab19c8-701a-006b-13df-94e952000000\nTime:2020-09-27T15:05:44.2120727Z</Message></Error>", [
  'Content-Length',
  '221',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19c8-701a-006b-13df-94e952000000',
  'x-ms-client-request-id',
  '0ea6de8e-54d6-4eab-80ec-76e5dec25cb9',
  'x-ms-version',
  '2020-02-10',
  'x-ms-error-code',
  'LeaseAlreadyPresent',
  'Date',
  'Sun, 27 Sep 2020 15:05:43 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121914334809671')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:43 GMT',
  'ETag',
  '"0x8D862F6CE4450CF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19c9-701a-006b-14df-94e952000000',
  'x-ms-client-request-id',
  '3e903cb4-fc7a-4b30-83df-b5f66cbf2a37',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-time',
  '0',
  'Date',
  'Sun, 27 Sep 2020 15:05:43 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160121914334809671')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19ca-701a-006b-15df-94e952000000',
  'x-ms-client-request-id',
  '66b30245-d215-4f56-a055-a75cea1dfd29',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:05:44 GMT'
]);
