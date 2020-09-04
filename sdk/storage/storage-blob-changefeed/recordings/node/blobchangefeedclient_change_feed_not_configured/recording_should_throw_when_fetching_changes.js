let nock = require('nock');

module.exports.hash = "8481efa8af15121bd252c16165dbfb55";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/%24blobchangefeed')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ContainerNotFound</Code><Message>The specified container does not exist.\nRequestId:159bf179-901e-002e-263a-7cf018000000\nTime:2020-08-27T06:21:22.2217107Z</Message></Error>", [
  'Content-Length',
  '225',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '159bf179-901e-002e-263a-7cf018000000',
  'x-ms-client-request-id',
  'ed10ded2-a0ab-4bd9-bc11-6966d094fcef',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'ContainerNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 27 Aug 2020 06:21:22 GMT'
]);
