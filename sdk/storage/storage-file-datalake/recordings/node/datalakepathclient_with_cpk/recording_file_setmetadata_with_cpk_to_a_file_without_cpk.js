let nock = require('nock');

module.exports.hash = "11d9b72937470d046da11983e6b969e4";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164864665913901674","file":"file164864665941400838","dir":"dir164864665941503629"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864665913901674')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:19 GMT',
  'ETag',
  '"0x8DA125098B72296"',
  'x-ms-request-id',
  '601eaf22-e01e-0001-5739-441b65000000',
  'x-ms-client-request-id',
  'f0938cff-7162-48a8-8a10-e307b6346bc4',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:18 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864665913901674/file164864665941400838')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:19 GMT',
  'ETag',
  '"0x8DA125098E42C9A"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '2f12e4d5-a01f-0003-5139-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '1127446d-426e-4671-92b4-6598cf85552c',
  'Date',
  'Wed, 30 Mar 2022 13:24:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864665913901674/file164864665941400838')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>BlobDoesNotUseCustomerSpecifiedEncryption</Code><Message>The blob is not encrypted with customer specified encryption, but one was provided in the request.\nRequestId:601eaf24-e01e-0001-5839-441b65000000\nTime:2022-03-30T13:24:20.0829234Z</Message></Error>", [
  'Content-Length',
  '308',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '601eaf24-e01e-0001-5839-441b65000000',
  'x-ms-client-request-id',
  'b1faa944-ae88-4407-aff9-7832940360aa',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'BlobDoesNotUseCustomerSpecifiedEncryption',
  'Date',
  'Wed, 30 Mar 2022 13:24:20 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164864665913901674')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaf27-e01e-0001-5b39-441b65000000',
  'x-ms-client-request-id',
  '465852bc-06c9-4bb2-8fdf-d9240f6a59a6',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:20 GMT'
]);
