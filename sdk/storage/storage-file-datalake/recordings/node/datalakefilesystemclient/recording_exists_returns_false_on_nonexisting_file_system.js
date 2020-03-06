let nock = require('nock');

module.exports.hash = "e2bdfcfd874c8405ce893166fff3eb17";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158350665043108736","newfilesystem":"newfilesystem158350665079003560"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158350665043108736')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Mar 2020 14:57:30 GMT',
  'ETag',
  '"0x8D7C1DEB1C7B16F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '009f1b72-001e-0087-66c7-f310b1000000',
  'x-ms-client-request-id',
  'f8ba444d-f235-446d-bac1-a53a8a87b603',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Fri, 06 Mar 2020 14:57:30 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/newfilesystem158350665079003560')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ContainerNotFound</Code><Message>The specified container does not exist.\nRequestId:009f1bee-001e-0087-5dc7-f310b1000000\nTime:2020-03-06T14:57:30.9262207Z</Message></Error>", [
  'Content-Length',
  '225',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '009f1bee-001e-0087-5dc7-f310b1000000',
  'x-ms-client-request-id',
  '11a571cd-9a1d-47c8-9889-233779cc4fad',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'ContainerNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Mar 2020 14:57:30 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem158350665043108736')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '009f1edd-001e-0087-09c7-f310b1000000',
  'x-ms-client-request-id',
  'dcd5599a-42c9-4ead-b59f-ae1f29378667',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Fri, 06 Mar 2020 14:57:32 GMT'
]);
