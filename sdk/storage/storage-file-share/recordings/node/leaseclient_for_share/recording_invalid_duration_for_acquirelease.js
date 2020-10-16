let nock = require('nock');

module.exports.hash = "654caa107adf9e5140aa8bdb81725c8e";

module.exports.testInfo = {"uniqueName":{"share":"share160121914775500736"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121914775500736')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:05:47 GMT',
  'ETag',
  '"0x8D862F6D0EC4B5E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10293411-d01a-0000-0ddf-946ea6000000',
  'x-ms-client-request-id',
  '17271a22-cdd2-4854-9ffe-4c2b4b99c820',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:05:47 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121914775500736')
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidHeaderValue</Code><Message>The value for one of the HTTP headers is not in the correct format.\nRequestId:09ab19da-701a-006b-1ddf-94e952000000\nTime:2020-09-27T15:05:48.3009699Z</Message><HeaderName>x-ms-lease-duration</HeaderName><HeaderValue>1</HeaderValue></Error>", [
  'Content-Length',
  '326',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab19da-701a-006b-1ddf-94e952000000',
  'x-ms-client-request-id',
  '7eeaebe0-d727-4e32-a9f0-cc6673ecbfb5',
  'x-ms-version',
  '2020-02-10',
  'x-ms-error-code',
  'InvalidHeaderValue',
  'Date',
  'Sun, 27 Sep 2020 15:05:47 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160121914775500736')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10293413-d01a-0000-0edf-946ea6000000',
  'x-ms-client-request-id',
  '4d1defbc-20c2-4031-87da-9f19e734f42e',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:05:48 GMT'
]);
