let nock = require('nock');

module.exports.hash = "22355622381ef5bce5752d12f15575dc";

module.exports.testInfo = {"uniqueName":{"blob":"blob162485944763305410"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/fakecontainername/blob162485944763305410')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Error><Code>BlobNotFound</Code><Message>The specified blob does not exist.\nRequestId:ada9462b-101e-001b-56e1-6b45f9000000\nTime:2021-06-28T05:50:48.0153055Z</Message></Error>", [
  'Content-Length',
  '216',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'BlobNotFound',
  'x-ms-request-id',
  'ada9462b-101e-001b-56e1-6b45f9000000',
  'x-ms-version',
  '2020-08-04',
  'x-ms-client-request-id',
  '6267015e-104f-4674-a49d-967d17c50bf7',
  'Date',
  'Mon, 28 Jun 2021 05:50:47 GMT'
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
  'ada94632-101e-001b-59e1-6b45f9000000',
  'x-ms-client-request-id',
  '037065d4-a671-4dfe-9332-edcfa52ffd50',
  'x-ms-version',
  '2020-08-04',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Jun 2021 05:50:48 GMT'
]);
