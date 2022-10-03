let nock = require('nock');

module.exports.hash = "511b4250361a14c5284afac406977679";

module.exports.testInfo = {"uniqueName":{"container":"container164933925916704957","blob":"blob164933925941508433"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933925916704957')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:39 GMT',
  'ETag',
  '"0x8DA189D2E822194"',
  'x-ms-request-id',
  '06497e14-b01e-0009-4f86-4a3c4a000000',
  'x-ms-client-request-id',
  '30b0aa3c-a56b-4a1c-a0ba-0c82aeaa0f58',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Thu, 07 Apr 2022 13:47:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933925916704957/blob164933925941508433')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:39 GMT',
  'ETag',
  '"0x8DA189D2EA928BC"',
  'x-ms-request-id',
  '06497e16-b01e-0009-5086-4a3c4a000000',
  'x-ms-client-request-id',
  '61e41ba3-ef43-429a-9be8-ec6619664c1a',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 07 Apr 2022 13:47:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933925916704957/blob164933925941508433', "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:40 GMT',
  'ETag',
  '"0x8DA189D2ECF9D8B"',
  'x-ms-request-id',
  '06497e17-b01e-0009-5186-4a3c4a000000',
  'x-ms-client-request-id',
  '8bf834a0-26a7-40cb-b910-407a66fe10ee',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-content-crc64',
  'u661BimQ84c=',
  'x-ms-blob-sequence-number',
  '0',
  'Date',
  'Thu, 07 Apr 2022 13:47:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933925916704957/blob164933925941508433', "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:40 GMT',
  'ETag',
  '"0x8DA189D2EF54E16"',
  'x-ms-request-id',
  '06497e18-b01e-0009-5286-4a3c4a000000',
  'x-ms-client-request-id',
  '3202cda6-58f3-4c77-9a08-9e8e944279e7',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-content-crc64',
  'u661BimQ84c=',
  'x-ms-blob-sequence-number',
  '0',
  'Date',
  'Thu, 07 Apr 2022 13:47:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933925916704957/blob164933925941508433', "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:40 GMT',
  'ETag',
  '"0x8DA189D2F1AD842"',
  'x-ms-request-id',
  '06497e19-b01e-0009-5386-4a3c4a000000',
  'x-ms-client-request-id',
  'b00bf899-831b-4d53-9d17-740c49fbb07b',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-content-crc64',
  'u661BimQ84c=',
  'x-ms-blob-sequence-number',
  '0',
  'Date',
  'Thu, 07 Apr 2022 13:47:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933925916704957/blob164933925941508433', "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:40 GMT',
  'ETag',
  '"0x8DA189D2F408924"',
  'x-ms-request-id',
  '06497e1a-b01e-0009-5486-4a3c4a000000',
  'x-ms-client-request-id',
  'a6ecdf42-f345-4ced-a9bc-594fff586892',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-content-crc64',
  'u661BimQ84c=',
  'x-ms-blob-sequence-number',
  '0',
  'Date',
  'Thu, 07 Apr 2022 13:47:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container164933925916704957/blob164933925941508433')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<PageList><PageRange><Start>0</Start><End>511</End></PageRange><PageRange><Start>1024</Start><End>1535</End></PageRange><PageRange><Start>2048</Start><End>2559</End></PageRange><PageRange><Start>3072</Start><End>3583</End></PageRange></PageList>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:40 GMT',
  'ETag',
  '"0x8DA189D2F408924"',
  'Vary',
  'Origin',
  'x-ms-blob-content-length',
  '4096',
  'x-ms-request-id',
  '06497e1b-b01e-0009-5586-4a3c4a000000',
  'x-ms-version',
  '2021-04-10',
  'x-ms-client-request-id',
  'a9d44efe-da93-4910-9b50-d45b83274295',
  'Date',
  'Thu, 07 Apr 2022 13:47:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container164933925916704957')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '06497e1c-b01e-0009-5686-4a3c4a000000',
  'x-ms-client-request-id',
  '20799074-3b83-4a29-8e9d-c8b0b8432184',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Thu, 07 Apr 2022 13:47:41 GMT'
]);
