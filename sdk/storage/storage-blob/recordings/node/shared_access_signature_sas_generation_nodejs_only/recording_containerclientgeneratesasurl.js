let nock = require('nock');

module.exports.hash = "17168cfda4c35ad7c37f2761e70c2c88";

module.exports.testInfo = {"uniqueName":{"container":"container160639112026806217"},"newDate":{"now":"2020-11-26T11:45:20.267Z","tmr":"2020-11-26T11:45:20.268Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160639112026806217')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 26 Nov 2020 11:45:21 GMT',
  'ETag',
  '"0x8D89200C16144CF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2993b697-801e-004f-7be9-c324a9000000',
  'x-ms-client-request-id',
  '829b0503-eff9-4bba-a2e7-152dc72b7b83',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 26 Nov 2020 11:45:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container160639112026806217')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container160639112026806217\"><Blobs /><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2993b6c2-801e-004f-20e9-c324a9000000',
  'x-ms-client-request-id',
  '1842e64d-7dc3-4e92-9081-ca12605ef368',
  'x-ms-version',
  '2020-02-10',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 26 Nov 2020 11:45:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160639112026806217')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2993b77a-801e-004f-38e9-c324a9000000',
  'x-ms-client-request-id',
  '23f31088-9fd1-48e8-bcfd-4cf193fbffcd',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 26 Nov 2020 11:45:23 GMT'
]);
