let nock = require('nock');

module.exports.hash = "aa766d776ee0b6636d04aa27a811c765";

module.exports.testInfo = {"uniqueName":{"container":"container164933926741206449","blob":"blob164933926766407516"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933926741206449')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:47 GMT',
  'ETag',
  '"0x8DA189D336CDB09"',
  'x-ms-request-id',
  '06497e39-b01e-0009-7086-4a3c4a000000',
  'x-ms-client-request-id',
  'deb3f71c-1856-426f-92f7-51dc0f817aaf',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Thu, 07 Apr 2022 13:47:47 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933926741206449/blob164933926766407516')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:48 GMT',
  'ETag',
  '"0x8DA189D33941707"',
  'x-ms-request-id',
  '06497e3b-b01e-0009-7186-4a3c4a000000',
  'x-ms-client-request-id',
  '60f8d88a-2f02-4ec8-b416-f8f87bf9b732',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 07 Apr 2022 13:47:47 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933926741206449/blob164933926766407516', "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:48 GMT',
  'ETag',
  '"0x8DA189D33B9A100"',
  'x-ms-request-id',
  '06497e3c-b01e-0009-7286-4a3c4a000000',
  'x-ms-client-request-id',
  'f474a128-bbab-490b-9de3-3c21f9995af6',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-content-crc64',
  'u661BimQ84c=',
  'x-ms-blob-sequence-number',
  '0',
  'Date',
  'Thu, 07 Apr 2022 13:47:47 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933926741206449/blob164933926766407516', "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:48 GMT',
  'ETag',
  '"0x8DA189D33DFEE43"',
  'x-ms-request-id',
  '06497e3d-b01e-0009-7386-4a3c4a000000',
  'x-ms-client-request-id',
  'dac09300-7227-42b9-9f59-1a0bc9bccdc2',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-content-crc64',
  'u661BimQ84c=',
  'x-ms-blob-sequence-number',
  '0',
  'Date',
  'Thu, 07 Apr 2022 13:47:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933926741206449/blob164933926766407516', "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:48 GMT',
  'ETag',
  '"0x8DA189D34059F5A"',
  'x-ms-request-id',
  '06497e3e-b01e-0009-7486-4a3c4a000000',
  'x-ms-client-request-id',
  '0ad390d4-e1cf-4438-b160-9705960aa61a',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-content-crc64',
  'u661BimQ84c=',
  'x-ms-blob-sequence-number',
  '0',
  'Date',
  'Thu, 07 Apr 2022 13:47:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933926741206449/blob164933926766407516', "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:49 GMT',
  'ETag',
  '"0x8DA189D342BC5AB"',
  'x-ms-request-id',
  '06497e3f-b01e-0009-7586-4a3c4a000000',
  'x-ms-client-request-id',
  'bb10e64c-2c5c-47b1-9daa-6ea6d31db56c',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-content-crc64',
  'u661BimQ84c=',
  'x-ms-blob-sequence-number',
  '0',
  'Date',
  'Thu, 07 Apr 2022 13:47:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container164933926741206449/blob164933926766407516')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<PageList><PageRange><Start>0</Start><End>511</End></PageRange><PageRange><Start>1024</Start><End>1535</End></PageRange><NextMarker>2!16!MDAwMDA0ITIwNDgh</NextMarker></PageList>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:49 GMT',
  'ETag',
  '"0x8DA189D342BC5AB"',
  'Vary',
  'Origin',
  'x-ms-blob-content-length',
  '4096',
  'x-ms-request-id',
  '06497e40-b01e-0009-7686-4a3c4a000000',
  'x-ms-version',
  '2021-04-10',
  'x-ms-client-request-id',
  'b7dd1ba1-7392-4300-96ee-391ef38452a4',
  'Date',
  'Thu, 07 Apr 2022 13:47:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container164933926741206449/blob164933926766407516')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<PageList><PageRange><Start>2048</Start><End>2559</End></PageRange><PageRange><Start>3072</Start><End>3583</End></PageRange><NextMarker/></PageList>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:49 GMT',
  'ETag',
  '"0x8DA189D342BC5AB"',
  'Vary',
  'Origin',
  'x-ms-blob-content-length',
  '4096',
  'x-ms-request-id',
  '06497e41-b01e-0009-7786-4a3c4a000000',
  'x-ms-version',
  '2021-04-10',
  'x-ms-client-request-id',
  '4e2f1156-ead0-469c-8d13-9e36c8a06989',
  'Date',
  'Thu, 07 Apr 2022 13:47:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container164933926741206449')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '06497e42-b01e-0009-7886-4a3c4a000000',
  'x-ms-client-request-id',
  '8dd43278-bd61-4f09-9d42-f680485bf44b',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Thu, 07 Apr 2022 13:47:49 GMT'
]);
