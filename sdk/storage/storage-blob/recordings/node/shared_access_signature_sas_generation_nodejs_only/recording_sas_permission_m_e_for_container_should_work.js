let nock = require('nock');

module.exports.hash = "4b487b76af24b335f678ee2d3772dab2";

module.exports.testInfo = {"uniqueName":{"container":"container160396129862102011"},"newDate":{"now":"2020-10-29T08:48:18.621Z","tmr":"2020-10-29T08:48:18.621Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160396129862102011')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 29 Oct 2020 08:48:18 GMT',
  'ETag',
  '"0x8D87BE7622F8685"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3a085057-901e-0043-2cd0-adb3a1000000',
  'x-ms-client-request-id',
  'eaa4a1fd-fa46-44a1-bec4-fe1c697457ab',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Thu, 29 Oct 2020 08:48:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container160396129862102011')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container160396129862102011\"><Blobs /><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3a08512a-901e-0043-72d0-adb3a1000000',
  'x-ms-client-request-id',
  '7ffe95a9-2eb2-46fb-a825-244553273d57',
  'x-ms-version',
  '2020-02-10',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 29 Oct 2020 08:48:18 GMT'
]);
