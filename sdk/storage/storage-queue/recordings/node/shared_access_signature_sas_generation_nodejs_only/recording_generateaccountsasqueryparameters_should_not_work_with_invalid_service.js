let nock = require('nock');

module.exports.testInfo = {"tmr":"2019-06-08T02:09:32.870Z"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"sv":"2018-03-28","ss":"b","srt":"sco","se":"2019-06-09T02%3A09%3A32Z","sp":"rwdlacup","sig":"VyaEU5ihQNqG9NEqJ9%2FvNu2C8DSbUGhNMRBd4yUWetE%3D","restype":"service","comp":"properties","timeout":"30"})
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationServiceMismatch</Code><Message>This request is not authorized to perform this operation using this service.\nRequestId:1190c7fc-8003-0024-489f-1d0416000000\nTime:2019-06-08T02:09:32.6095102Z</Message></Error>", [ 'Content-Length',
  '273',
  'Content-Type',
  'application/xml',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1190c7fc-8003-0024-489f-1d0416000000',
  'x-ms-error-code',
  'AuthorizationServiceMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 08 Jun 2019 02:09:32 GMT',
  'Connection',
  'close' ]);

