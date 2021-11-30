let nock = require('nock');

module.exports.hash = "cf06f39701b4dfa77569dd29ae2c4286";

module.exports.testInfo = {"uniqueName":{"blob":"blob162485944823700035"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/fakecontainername/blob162485944823700035')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Error><Code>BlobNotFound</Code><Message>The specified blob does not exist.\nRequestId:ada94638-101e-001b-5ce1-6b45f9000000\nTime:2021-06-28T05:50:48.6209651Z</Message></Error>", [
  'Content-Length',
  '216',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'BlobNotFound',
  'x-ms-request-id',
  'ada94638-101e-001b-5ce1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  '2b7ba108-a5be-476f-916e-450ed965ffe3',
  'Date',
  'Mon, 28 Jun 2021 05:50:48 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/fakecontainername')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"fakecontainername\"><Blobs /><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ada9463e-101e-001b-61e1-6b45f9000000',
  'x-ms-client-request-id',
  '667e57c6-88f8-4195-b43f-1a00cc05a4c5',
  'x-ms-version',
  '2020-08-04',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Jun 2021 05:50:48 GMT'
]);
