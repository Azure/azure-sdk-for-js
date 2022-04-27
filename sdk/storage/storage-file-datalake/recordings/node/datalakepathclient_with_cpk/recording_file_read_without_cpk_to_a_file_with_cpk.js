let nock = require('nock');

module.exports.hash = "bc257cc19d51e623838fa4b090740c0c";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164864665325905502","file":"file164864665353706543","dir":"dir164864665353804739"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864665325905502')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:13 GMT',
  'ETag',
  '"0x8DA125095367875"',
  'x-ms-request-id',
  '601eaf06-e01e-0001-4939-441b65000000',
  'x-ms-client-request-id',
  'd404e012-8639-4ba2-b341-4722bfb89795',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:13 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864665325905502/file164864665353706543')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:13 GMT',
  'ETag',
  '"0x8DA125095638C43"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '2f12e4cc-a01f-0003-4939-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'e29fc005-0331-472d-b73f-1fb5c0ec0d2b',
  'Date',
  'Wed, 30 Mar 2022 13:24:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem164864665325905502/file164864665353706543', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '2f12e4cd-a01f-0003-4a39-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '67e833b7-5f4a-4843-8969-f84de1cb4ed6',
  'Date',
  'Wed, 30 Mar 2022 13:24:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem164864665325905502/file164864665353706543')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:14 GMT',
  'ETag',
  '"0x8DA125095B36ECC"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '2f12e4ce-a01f-0003-4b39-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'f0aed472-18e7-4bc1-ae09-0931130da93e',
  'Date',
  'Wed, 30 Mar 2022 13:24:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem164864665325905502/file164864665353706543')
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>BlobUsesCustomerSpecifiedEncryption</Code><Message>The blob is encrypted with customer specified encryption, but it was not provided in the request.\nRequestId:601eaf08-e01e-0001-4a39-441b65000000\nTime:2022-03-30T13:24:14.7195833Z</Message></Error>", [
  'Content-Length',
  '301',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '601eaf08-e01e-0001-4a39-441b65000000',
  'x-ms-client-request-id',
  'e63410cc-9bf3-4493-8ad3-008d1a8196de',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'BlobUsesCustomerSpecifiedEncryption',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 30 Mar 2022 13:24:14 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164864665325905502')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaf09-e01e-0001-4b39-441b65000000',
  'x-ms-client-request-id',
  '012d3630-04ce-47a0-9bf7-d784af98401c',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:14 GMT'
]);
