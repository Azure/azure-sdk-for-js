let nock = require('nock');

module.exports.hash = "651943585b7f765da30b063517242c8c";

module.exports.testInfo = {"uniqueName":{"container1":"container1159220870164604944","key":"key159220870319306639","key2":"key2159220870319306858","blobname1":"blobname1159220870319304275","val1":"val1159220870319502764","blobname2":"blobname2159220870349903988","val2":"val2159220870350101043"},"newDate":{"now":"2020-06-15T08:11:41.643Z","tmr":"2020-06-15T08:11:41.644Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container1159220870164604944')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 08:11:42 GMT',
  'ETag',
  '"0x8D81103BD1E4CBD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6eb6eed5-e01e-007c-66ec-42635f000000',
  'x-ms-client-request-id',
  '659c96af-b45b-4f27-944d-9ad55f6b5bbc',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 08:11:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container1159220870164604944/blobname1159220870319304275')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 08:11:43 GMT',
  'ETag',
  '"0x8D81103BD6BBE41"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6eb6eff7-e01e-007c-77ec-42635f000000',
  'x-ms-client-request-id',
  '35cb2ed1-d7c1-4e36-a2ad-6340ba60229b',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T08:11:43.3454145Z',
  'Date',
  'Mon, 15 Jun 2020 08:11:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container1159220870164604944/blobname2159220870349903988')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 08:11:43 GMT',
  'ETag',
  '"0x8D81103BD993F1A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6eb6f0b6-e01e-007c-31ec-42635f000000',
  'x-ms-client-request-id',
  '11320ca7-afd2-47ef-810a-a8d1ce13471c',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T08:11:43.6436250Z',
  'Date',
  'Mon, 15 Jun 2020 08:11:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Where>key159220870319306639=&apos;val1159220870319502764&apos;</Where><Blobs><Blob><Name>blobname1159220870319304275</Name><ContainerName>container1159220870164604944</ContainerName><TagValue>val1159220870319502764</TagValue></Blob></Blobs><NextMarker/></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6eb6f53a-e01e-007c-75ec-42635f000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '0f0f2d4e-7dfa-41ac-8112-b950dd4a6de8',
  'Date',
  'Mon, 15 Jun 2020 08:11:45 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container1159220870164604944')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6eb6f658-e01e-007c-01ec-42635f000000',
  'x-ms-client-request-id',
  '3b7bb3be-7d0b-4c3e-8abf-08fee458d84c',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 08:11:46 GMT'
]);
