let nock = require('nock');

module.exports.hash = "b0e0629f46595c8ad0ac3aa52f63d434";

module.exports.testInfo = {"uniqueName":{"container":"container158977895451106039","container2":"container2158977895481308612","container3":"container3158977895541909286"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158977895451106039')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:15:52 GMT',
  'ETag',
  '"0x8D7FAEA893907F1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '80919cf0-101e-0052-6cd3-2cdee7000000',
  'x-ms-client-request-id',
  '9cce3650-a136-4f46-91d6-c41ed703acb5',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:15:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container2158977895481308612')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 18 May 2020 05:15:53 GMT',
  'ETag',
  '"0x8D7FAEA8967734C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '80919daf-101e-0052-03d3-2cdee7000000',
  'x-ms-client-request-id',
  '4f37487f-1488-47d4-8eaa-435c93fe22a9',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:15:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container2158977895481308612')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '80919e6f-101e-0052-1bd3-2cdee7000000',
  'x-ms-client-request-id',
  'b4d54db2-0264-4f17-afc1-1e733eca8987',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:15:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container3158977895541909286')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ContainerNotFound</Code><Message>The specified container does not exist.\nRequestId:80919f4e-101e-0052-57d3-2cdee7000000\nTime:2020-05-18T05:15:53.6808389Z</Message></Error>", [
  'Content-Length',
  '225',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '80919f4e-101e-0052-57d3-2cdee7000000',
  'x-ms-client-request-id',
  '5d8eaac9-b24b-43d3-8380-73d9c7d06711',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'ContainerNotFound',
  'Date',
  'Mon, 18 May 2020 05:15:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158977895451106039')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8091a048-101e-0052-37d3-2cdee7000000',
  'x-ms-client-request-id',
  '2f6a7c3c-2a7a-486a-b204-e54d8addfbe8',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 18 May 2020 05:15:53 GMT'
]);
