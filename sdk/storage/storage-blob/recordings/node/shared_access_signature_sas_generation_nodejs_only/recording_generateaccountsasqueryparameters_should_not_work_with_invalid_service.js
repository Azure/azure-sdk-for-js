let nock = require('nock');

module.exports.testInfo = {"tmr":"2019-05-24T23:02:56.190Z"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"sv":"2018-03-28","ss":"tqf","srt":"sco","se":"2019-05-25T23%3A02%3A56Z","sp":"rwdlacup","sig":"Weu8Hrhpo4aJ7g44Cn52Yjz2Rp%2BlvY%2F7ZzmtkOZCbE0%3D","restype":"service","comp":"properties"})
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationServiceMismatch</Code><Message>This request is not authorized to perform this operation using this service.\nRequestId:43521567-e01e-007b-3884-12f6e8000000\nTime:2019-05-24T23:02:56.2283819Z</Message></Error>", [ 'Content-Length',
  '273',
  'Content-Type',
  'application/xml',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '43521567-e01e-007b-3884-12f6e8000000',
  'x-ms-error-code',
  'AuthorizationServiceMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 23:02:55 GMT',
  'Connection',
  'close' ]);

