let nock = require('nock');

module.exports.hash = "db76eb23fb74f14ca6db094f149bbd6c";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164864666836000317","file":"file164864666863503717","dir":"dir164864666863503068"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864666836000317')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:28 GMT',
  'ETag',
  '"0x8DA12509E366414"',
  'x-ms-request-id',
  '601eaf46-e01e-0001-7339-441b65000000',
  'x-ms-client-request-id',
  '47548a44-2900-4e33-97f1-08e36e4f6034',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:27 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864666836000317/dir164864666863503068')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:29 GMT',
  'ETag',
  '"0x8DA12509E6214C3"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '2f12e4e0-a01f-0003-5a39-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '23e7943a-6881-480e-9e60-30cce20af5dc',
  'Date',
  'Wed, 30 Mar 2022 13:24:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864666836000317/dir164864666863503068')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>BlobUsesCustomerSpecifiedEncryption</Code><Message>The blob is encrypted with customer specified encryption, but it was not provided in the request.\nRequestId:601eaf48-e01e-0001-7439-441b65000000\nTime:2022-03-30T13:24:29.2855215Z</Message></Error>", [
  'Content-Length',
  '301',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '601eaf48-e01e-0001-7439-441b65000000',
  'x-ms-client-request-id',
  '1d37b96c-cd64-43ef-b0ee-5c67a4973c40',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'BlobUsesCustomerSpecifiedEncryption',
  'Date',
  'Wed, 30 Mar 2022 13:24:29 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164864666836000317')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaf49-e01e-0001-7539-441b65000000',
  'x-ms-client-request-id',
  '37541156-9bb2-4866-8164-ca022b199ee9',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:29 GMT'
]);
