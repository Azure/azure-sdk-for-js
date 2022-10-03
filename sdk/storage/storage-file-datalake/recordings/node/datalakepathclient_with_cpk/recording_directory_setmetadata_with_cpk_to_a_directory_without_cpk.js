let nock = require('nock');

module.exports.hash = "c7627e2b2b90235fbf8f6521b30081bb";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164864666946202671","file":"file164864666973809159","dir":"dir164864666973801944"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864666946202671')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:29 GMT',
  'ETag',
  '"0x8DA12509EDE6705"',
  'x-ms-request-id',
  '601eaf4a-e01e-0001-7639-441b65000000',
  'x-ms-client-request-id',
  'f5f66dcf-c7e7-497a-95f9-8a7196fa3aa3',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:29 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864666946202671/dir164864666973801944')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:30 GMT',
  'ETag',
  '"0x8DA12509F0A0185"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '2f12e4e2-a01f-0003-5b39-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '4c7f066c-0d56-4b56-9aef-c903f1f4860b',
  'Date',
  'Wed, 30 Mar 2022 13:24:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864666946202671/dir164864666973801944')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>BlobDoesNotUseCustomerSpecifiedEncryption</Code><Message>The blob is not encrypted with customer specified encryption, but one was provided in the request.\nRequestId:601eaf4d-e01e-0001-7739-441b65000000\nTime:2022-03-30T13:24:30.3855880Z</Message></Error>", [
  'Content-Length',
  '308',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '601eaf4d-e01e-0001-7739-441b65000000',
  'x-ms-client-request-id',
  '69219cff-9316-4cf2-835f-2d63bd098750',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'BlobDoesNotUseCustomerSpecifiedEncryption',
  'Date',
  'Wed, 30 Mar 2022 13:24:30 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164864666946202671')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaf4f-e01e-0001-7839-441b65000000',
  'x-ms-client-request-id',
  '5b195626-b9bb-458a-90b0-aca0576d767d',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:30 GMT'
]);
