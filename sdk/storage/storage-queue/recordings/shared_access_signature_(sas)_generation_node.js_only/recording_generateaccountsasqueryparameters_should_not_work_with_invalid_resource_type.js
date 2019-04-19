let nock = require('nock');

module.exports.testInfo = {"tmr":"2019-04-19T03:51:44.170Z"}

nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"sv":"2016-05-31","ss":"btqf","srt":"co","spr":"https%2Chttp","se":"2019-04-20T03%3A51%3A44Z","sip":"0.0.0.0-255.255.255.255","sp":"rwdlacup","sig":"K4as7CWLlyiMwvHrqz8ym5h8OcFqy1piXCu3OU0rvoY%3D","restype":"service","comp":"properties","timeout":"30"})
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationResourceTypeMismatch</Code><Message>This request is not authorized to perform this operation using this resource type.\nRequestId:6e05285b-1003-0080-7863-f63ef2000000\nTime:2019-04-19T03:51:44.5826865Z</Message></Error>", [ 'Content-Length',
  '284',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e05285b-1003-0080-7863-f63ef2000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'AuthorizationResourceTypeMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 19 Apr 2019 03:51:44 GMT',
  'Connection',
  'close' ]);
