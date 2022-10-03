let nock = require('nock');

module.exports.hash = "6b2d9d25a3f74f3cf48e266efeffa869";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164864665489808336","file":"file164864665517702572","dir":"dir164864665518500272"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864665489808336')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:15 GMT',
  'ETag',
  '"0x8DA1250963093E3"',
  'x-ms-request-id',
  '601eaf0b-e01e-0001-4c39-441b65000000',
  'x-ms-client-request-id',
  '35b306fd-636c-412b-95a9-9eb3cd89d07f',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:15 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864665489808336/file164864665517702572')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:15 GMT',
  'ETag',
  '"0x8DA1250965FFA03"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '2f12e4cf-a01f-0003-4c39-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '136d7525-a4b3-4feb-8350-76078579428d',
  'Date',
  'Wed, 30 Mar 2022 13:24:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem164864665489808336/file164864665517702572', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '2f12e4d0-a01f-0003-4d39-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '6bab9545-1fa5-41ea-bd09-968f4a1ce0cb',
  'Date',
  'Wed, 30 Mar 2022 13:24:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem164864665489808336/file164864665517702572')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:16 GMT',
  'ETag',
  '"0x8DA125096B121C6"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '2f12e4d1-a01f-0003-4e39-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'ab995f18-a84f-47ca-a403-8f0fea16a10f',
  'Date',
  'Wed, 30 Mar 2022 13:24:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem164864665489808336/file164864665517702572')
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>BlobDoesNotUseCustomerSpecifiedEncryption</Code><Message>The blob is not encrypted with customer specified encryption, but one was provided in the request.\nRequestId:601eaf0e-e01e-0001-4d39-441b65000000\nTime:2022-03-30T13:24:16.3826854Z</Message></Error>", [
  'Content-Length',
  '308',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '601eaf0e-e01e-0001-4d39-441b65000000',
  'x-ms-client-request-id',
  '67052de5-06d7-499d-bc50-2577e198d653',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'BlobDoesNotUseCustomerSpecifiedEncryption',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 30 Mar 2022 13:24:16 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164864665489808336')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaf10-e01e-0001-4f39-441b65000000',
  'x-ms-client-request-id',
  'd10b00f8-6875-4fb8-bbfd-14e1b3ba00d5',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:16 GMT'
]);
