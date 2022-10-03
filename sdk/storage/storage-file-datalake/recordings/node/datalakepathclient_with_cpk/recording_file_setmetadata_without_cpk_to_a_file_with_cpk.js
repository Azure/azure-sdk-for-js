let nock = require('nock');

module.exports.hash = "962fabde7a386f81da25debd852c7d7a";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164864665801407464","file":"file164864665829203667","dir":"dir164864665829400942"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864665801407464')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:18 GMT',
  'ETag',
  '"0x8DA1250980C129C"',
  'x-ms-request-id',
  '601eaf1e-e01e-0001-5439-441b65000000',
  'x-ms-client-request-id',
  '5cf34083-6365-4330-b729-e4ca536c958a',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:17 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864665801407464/file164864665829203667')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:18 GMT',
  'ETag',
  '"0x8DA1250983947A1"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '2f12e4d3-a01f-0003-5039-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '6bf7723b-413f-4690-8103-5df117c00dc3',
  'Date',
  'Wed, 30 Mar 2022 13:24:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864665801407464/file164864665829203667')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>BlobUsesCustomerSpecifiedEncryption</Code><Message>The blob is encrypted with customer specified encryption, but it was not provided in the request.\nRequestId:601eaf20-e01e-0001-5539-441b65000000\nTime:2022-03-30T13:24:18.9558569Z</Message></Error>", [
  'Content-Length',
  '301',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '601eaf20-e01e-0001-5539-441b65000000',
  'x-ms-client-request-id',
  'a134944f-e555-4d54-b24d-3e1b09fdf210',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'BlobUsesCustomerSpecifiedEncryption',
  'Date',
  'Wed, 30 Mar 2022 13:24:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164864665801407464')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaf21-e01e-0001-5639-441b65000000',
  'x-ms-client-request-id',
  '15d5f43a-d88f-4b66-975c-268a98f4f358',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:18 GMT'
]);
