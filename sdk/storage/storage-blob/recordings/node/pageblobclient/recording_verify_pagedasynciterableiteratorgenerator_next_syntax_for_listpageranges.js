let nock = require('nock');

module.exports.hash = "016f03ff8043a21db98703323b510ed1";

module.exports.testInfo = {"uniqueName":{"container":"container164933926317001181","blob":"blob164933926342200947"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933926317001181')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:43 GMT',
  'ETag',
  '"0x8DA189D30E5907A"',
  'x-ms-request-id',
  '06497e26-b01e-0009-5f86-4a3c4a000000',
  'x-ms-client-request-id',
  '5a644171-20a7-4582-9bc7-cb016e975d17',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Thu, 07 Apr 2022 13:47:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933926317001181/blob164933926342200947')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:43 GMT',
  'ETag',
  '"0x8DA189D310CC552"',
  'x-ms-request-id',
  '06497e28-b01e-0009-6086-4a3c4a000000',
  'x-ms-client-request-id',
  'e68a2cdd-cd93-4924-9f1f-b1af69a4c39a',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 07 Apr 2022 13:47:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933926317001181/blob164933926342200947', "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:44 GMT',
  'ETag',
  '"0x8DA189D31324F31"',
  'x-ms-request-id',
  '06497e29-b01e-0009-6186-4a3c4a000000',
  'x-ms-client-request-id',
  'db8878e9-c87c-4a8d-8569-015f2f38995f',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-content-crc64',
  'u661BimQ84c=',
  'x-ms-blob-sequence-number',
  '0',
  'Date',
  'Thu, 07 Apr 2022 13:47:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933926317001181/blob164933926342200947', "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:44 GMT',
  'ETag',
  '"0x8DA189D315878E9"',
  'x-ms-request-id',
  '06497e2a-b01e-0009-6286-4a3c4a000000',
  'x-ms-client-request-id',
  '7b2dd366-6364-4dca-9d58-e72c12222e30',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-content-crc64',
  'u661BimQ84c=',
  'x-ms-blob-sequence-number',
  '0',
  'Date',
  'Thu, 07 Apr 2022 13:47:44 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933926317001181/blob164933926342200947', "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:44 GMT',
  'ETag',
  '"0x8DA189D317D8A4E"',
  'x-ms-request-id',
  '06497e2b-b01e-0009-6386-4a3c4a000000',
  'x-ms-client-request-id',
  '3fc25ced-9b06-40a0-8b0a-9e4037f3aa36',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-content-crc64',
  'u661BimQ84c=',
  'x-ms-blob-sequence-number',
  '0',
  'Date',
  'Thu, 07 Apr 2022 13:47:44 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164933926317001181/blob164933926342200947', "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:44 GMT',
  'ETag',
  '"0x8DA189D31A2ED6A"',
  'x-ms-request-id',
  '06497e2c-b01e-0009-6486-4a3c4a000000',
  'x-ms-client-request-id',
  '8c925ec1-bf2d-4825-8036-3f64d809f5c9',
  'x-ms-version',
  '2021-04-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-content-crc64',
  'u661BimQ84c=',
  'x-ms-blob-sequence-number',
  '0',
  'Date',
  'Thu, 07 Apr 2022 13:47:44 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container164933926317001181/blob164933926342200947')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<PageList><PageRange><Start>0</Start><End>511</End></PageRange><PageRange><Start>1024</Start><End>1535</End></PageRange><PageRange><Start>2048</Start><End>2559</End></PageRange><PageRange><Start>3072</Start><End>3583</End></PageRange></PageList>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Thu, 07 Apr 2022 13:47:44 GMT',
  'ETag',
  '"0x8DA189D31A2ED6A"',
  'Vary',
  'Origin',
  'x-ms-blob-content-length',
  '4096',
  'x-ms-request-id',
  '06497e2d-b01e-0009-6586-4a3c4a000000',
  'x-ms-version',
  '2021-04-10',
  'x-ms-client-request-id',
  '69f5e39b-bd47-467b-9e46-5d04d3999265',
  'Date',
  'Thu, 07 Apr 2022 13:47:44 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container164933926317001181')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '06497e2e-b01e-0009-6686-4a3c4a000000',
  'x-ms-client-request-id',
  '17efdd16-7a16-4cc6-b567-cd5c11686eac',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Thu, 07 Apr 2022 13:47:44 GMT'
]);
