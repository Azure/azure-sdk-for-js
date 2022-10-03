let nock = require('nock');

module.exports.hash = "a589b0e79c4d483a0cd6d4515751de25";

module.exports.testInfo = {"uniqueName":{"container":"container164933926516007625","blob":"blob164933926541001125"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933926516007625')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:45 GMT',
  'ETag',
  '"0x8DA189D3214EA44"',
  'x-ms-request-id',
  '06497e2f-b01e-0009-6786-4a3c4a000000',
  'x-ms-client-request-id',
  '19de005c-e04b-49e4-bd18-03d6e579ff13',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Thu, 07 Apr 2022 13:47:45 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933926516007625/blob164933926541001125')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:45 GMT',
  'ETag',
  '"0x8DA189D323BFB79"',
  'x-ms-request-id',
  '06497e31-b01e-0009-6886-4a3c4a000000',
  'x-ms-client-request-id',
  '7addf1f1-8d39-4dff-a7e9-928bc43a086b',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 07 Apr 2022 13:47:45 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933926516007625/blob164933926541001125', "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:46 GMT',
  'ETag',
  '"0x8DA189D32618615"',
  'x-ms-request-id',
  '06497e32-b01e-0009-6986-4a3c4a000000',
  'x-ms-client-request-id',
  '71bf41d3-885c-47d8-9f40-62ceda0dd1b4',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-content-crc64',
  'u661BimQ84c=',
  'x-ms-blob-sequence-number',
  '0',
  'Date',
  'Thu, 07 Apr 2022 13:47:45 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933926516007625/blob164933926541001125', "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:46 GMT',
  'ETag',
  '"0x8DA189D32875D7B"',
  'x-ms-request-id',
  '06497e33-b01e-0009-6a86-4a3c4a000000',
  'x-ms-client-request-id',
  'd4e40476-e87f-4faf-a0fc-2dca1c411c3c',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-content-crc64',
  'u661BimQ84c=',
  'x-ms-blob-sequence-number',
  '0',
  'Date',
  'Thu, 07 Apr 2022 13:47:45 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933926516007625/blob164933926541001125', "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:46 GMT',
  'ETag',
  '"0x8DA189D32ACE784"',
  'x-ms-request-id',
  '06497e34-b01e-0009-6b86-4a3c4a000000',
  'x-ms-client-request-id',
  'fd4c4662-21e9-42c9-a507-140c90be3bd5',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-content-crc64',
  'u661BimQ84c=',
  'x-ms-blob-sequence-number',
  '0',
  'Date',
  'Thu, 07 Apr 2022 13:47:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933926516007625/blob164933926541001125', "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:46 GMT',
  'ETag',
  '"0x8DA189D32D27188"',
  'x-ms-request-id',
  '06497e35-b01e-0009-6c86-4a3c4a000000',
  'x-ms-client-request-id',
  '41ca5902-8e0d-41c3-b2bd-689bbd677afc',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-content-crc64',
  'u661BimQ84c=',
  'x-ms-blob-sequence-number',
  '0',
  'Date',
  'Thu, 07 Apr 2022 13:47:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container164933926516007625/blob164933926541001125')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<PageList><PageRange><Start>0</Start><End>511</End></PageRange><PageRange><Start>1024</Start><End>1535</End></PageRange><NextMarker>2!16!MDAwMDA0ITIwNDgh</NextMarker></PageList>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:46 GMT',
  'ETag',
  '"0x8DA189D32D27188"',
  'Vary',
  'Origin',
  'x-ms-blob-content-length',
  '4096',
  'x-ms-request-id',
  '06497e36-b01e-0009-6d86-4a3c4a000000',
  'x-ms-version',
  '2021-04-10',
  'x-ms-client-request-id',
  '274569d7-094a-48c3-bdaa-4350643da527',
  'Date',
  'Thu, 07 Apr 2022 13:47:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container164933926516007625/blob164933926541001125')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<PageList><PageRange><Start>2048</Start><End>2559</End></PageRange><PageRange><Start>3072</Start><End>3583</End></PageRange><NextMarker/></PageList>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:46 GMT',
  'ETag',
  '"0x8DA189D32D27188"',
  'Vary',
  'Origin',
  'x-ms-blob-content-length',
  '4096',
  'x-ms-request-id',
  '06497e37-b01e-0009-6e86-4a3c4a000000',
  'x-ms-version',
  '2021-04-10',
  'x-ms-client-request-id',
  'd665f361-21e7-416b-aa8b-af7c2457d124',
  'Date',
  'Thu, 07 Apr 2022 13:47:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container164933926516007625')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '06497e38-b01e-0009-6f86-4a3c4a000000',
  'x-ms-client-request-id',
  'a5e4170c-857a-4988-8a04-4c7ccb9667f0',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Thu, 07 Apr 2022 13:47:46 GMT'
]);
