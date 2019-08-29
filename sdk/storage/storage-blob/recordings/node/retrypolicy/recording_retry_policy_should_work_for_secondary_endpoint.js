let nock = require('nock');

module.exports.testInfo = {"container":"container156585818197901214"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156585818197901214')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 15 Aug 2019 08:32:23 GMT',
  'ETag',
  '"0x8D7215B18DD98C7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9bd45c13-601e-009d-4843-5344d6000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 15 Aug 2019 08:32:23 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount-secondary.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156585818197901214')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ContainerNotFound</Code><Message>The specified container does not exist.\nRequestId:0068beea-601e-00f4-4343-53c5fc000000\nTime:2019-08-15T08:32:24.7148769Z</Message></Error>", [
  'Content-Length',
  '225',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0068beea-601e-00f4-4343-53c5fc000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-error-code',
  'ContainerNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 15 Aug 2019 08:32:24 GMT',
  'Connection',
  'close'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156585818197901214')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56a2e7a6-f01e-0032-7543-536646000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 15 Aug 2019 08:32:24 GMT',
  'Connection',
  'close'
]);

