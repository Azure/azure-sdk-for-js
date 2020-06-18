let nock = require('nock');

module.exports.hash = "6feed0d547ec4f58b9d7f2325d0691d2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/%24blobchangefeed')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ContainerNotFound</Code><Message>The specified container does not exist.\nRequestId:2553a5ef-a01e-0028-2735-454401000000\nTime:2020-06-18T05:58:16.6210745Z</Message></Error>", [
  'Content-Length',
  '225',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2553a5ef-a01e-0028-2735-454401000000',
  'x-ms-client-request-id',
  'fa910e87-6b0d-4697-8020-745ec3febccb',
  'x-ms-version',
  '2019-07-07',
  'x-ms-error-code',
  'ContainerNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 18 Jun 2020 05:58:16 GMT'
]);
