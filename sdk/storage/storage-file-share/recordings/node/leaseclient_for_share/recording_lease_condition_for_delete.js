let nock = require('nock');

module.exports.hash = "0c0829efdb2bc6b3a538e1d74362f342";

module.exports.testInfo = {"uniqueName":{"share":"share160121916619007218"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121916619007218')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:06:06 GMT',
  'ETag',
  '"0x8D862F6DBE1C8C2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10293451-d01a-0000-2fdf-946ea6000000',
  'x-ms-client-request-id',
  '9d1e9520-7dc4-4f1c-871b-bb8009e53ac4',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:06:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121916619007218')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:06:06 GMT',
  'ETag',
  '"0x8D862F6DBE1C8C2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab1a20-701a-006b-42df-94e952000000',
  'x-ms-client-request-id',
  '8de6c038-0b3a-42b4-8fff-222e5583a978',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-id',
  'e9890485-bf47-4d9a-b3d0-aceb18506124',
  'Date',
  'Sun, 27 Sep 2020 15:06:05 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160121916619007218')
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>LeaseIdMissing</Code><Message>There is currently a lease on the file share and no lease ID was specified in the request.\nRequestId:10293453-d01a-0000-30df-946ea6000000\nTime:2020-09-27T15:06:07.1545112Z</Message></Error>", [
  'Content-Length',
  '273',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10293453-d01a-0000-30df-946ea6000000',
  'x-ms-client-request-id',
  'db810f91-bf9e-4757-8888-1edecde92635',
  'x-ms-version',
  '2020-02-10',
  'x-ms-error-code',
  'LeaseIdMissing',
  'Date',
  'Sun, 27 Sep 2020 15:06:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160121916619007218')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab1a26-701a-006b-44df-94e952000000',
  'x-ms-client-request-id',
  '878d5d81-092c-4798-8731-d9e861b67210',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:06:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160121916619007218')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10293458-d01a-0000-33df-946ea6000000',
  'x-ms-client-request-id',
  '41a75a6b-e4cc-42d9-a22a-dd37a8076891',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:06:07 GMT'
]);
