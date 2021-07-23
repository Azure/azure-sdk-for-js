let nock = require('nock');

module.exports.hash = "7118a72739b3adcc704665553a085e86";

module.exports.testInfo = {"uniqueName":{"blob":"blob162485944525805172"},"newDate":{"minutesLater":"2021-06-28T05:50:45.259Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162485944525805172')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Error><Code>BlobNotFound</Code><Message>The specified blob does not exist.\nRequestId:ada945f9-101e-001b-3ae1-6b45f9000000\nTime:2021-06-28T05:50:45.6396404Z</Message></Error>", [
  'Content-Length',
  '216',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'BlobNotFound',
  'x-ms-request-id',
  'ada945f9-101e-001b-3ae1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  '80299b62-6495-4eed-8eb0-5389523f6c79',
  'Date',
  'Mon, 28 Jun 2021 05:50:45 GMT'
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
  'ada94601-101e-001b-41e1-6b45f9000000',
  'x-ms-client-request-id',
  '0d110656-fdca-426a-8af4-1e456407589f',
  'x-ms-version',
  '2020-08-04',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Jun 2021 05:50:45 GMT'
]);
