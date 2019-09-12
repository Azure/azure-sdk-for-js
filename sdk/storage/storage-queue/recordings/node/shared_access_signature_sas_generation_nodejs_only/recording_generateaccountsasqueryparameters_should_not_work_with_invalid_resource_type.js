let nock = require('nock');

module.exports.testInfo = {"tmr":"2019-09-04T07:16:19.949Z"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationResourceTypeMismatch</Code><Message>This request is not authorized to perform this operation using this resource type.\nRequestId:9ba25742-7003-000f-41f0-6281ef000000\nTime:2019-09-04T07:16:20.1949100Z</Message></Error>", [ 'Content-Length',
  '284',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9ba25742-7003-000f-41f0-6281ef000000',
  'x-ms-client-request-id',
  'af7735ee-2cab-4dab-a6a7-3591c2217830',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'AuthorizationResourceTypeMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:16:19 GMT',
  'Connection',
  'close' ]);

