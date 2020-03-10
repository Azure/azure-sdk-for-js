let nock = require('nock');

module.exports.hash = "e2bdfcfd874c8405ce893166fff3eb17";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158377020838303486","newfilesystem":"newfilesystem158377020842205077"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158377020838303486')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 09 Mar 2020 16:10:08 GMT',
  'ETag',
  '"0x8D7C444567AFAA2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8991abe-001e-0069-4e2d-f61a32000000',
  'x-ms-client-request-id',
  '22cb3ddb-2e54-4255-bbbe-9299b2425a42',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 09 Mar 2020 16:10:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/newfilesystem158377020842205077')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ContainerNotFound</Code><Message>The specified container does not exist.\nRequestId:b8991adf-001e-0069-6d2d-f61a32000000\nTime:2020-03-09T16:10:08.4315193Z</Message></Error>", [
  'Content-Length',
  '225',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8991adf-001e-0069-6d2d-f61a32000000',
  'x-ms-client-request-id',
  'df2e5e08-5cd3-40b6-9a26-039a61306e7e',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'ContainerNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 09 Mar 2020 16:10:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem158377020838303486')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8991b39-001e-0069-3f2d-f61a32000000',
  'x-ms-client-request-id',
  '06fc4241-debf-4f68-9d6e-0189359de0ba',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 09 Mar 2020 16:10:07 GMT'
]);
