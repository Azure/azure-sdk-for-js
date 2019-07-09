let nock = require('nock');

module.exports.testInfo = {}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.queue.core.windows.net/\"><Queues><Queue><Name>myqueue</Name></Queue><Queue><Name>queue156266448562703031156266448589500140</Name></Queue><Queue><Name>queue156266452234800481</Name></Queue><Queue><Name>queue156266456729003536156266456742809886</Name></Queue><Queue><Name>queue156266494621707269156266494649003820</Name></Queue><Queue><Name>queue156266498433208225</Name></Queue><Queue><Name>queue156266515514705847156266515528900798</Name></Queue><Queue><Name>queue156266532216101604156266532244300151</Name></Queue><Queue><Name>stress1545968498014</Name></Queue><Queue><Name>stress1545972562688</Name></Queue><Queue><Name>stress1545972655290</Name></Queue><Queue><Name>stress1545973251571</Name></Queue><Queue><Name>stress1545973337963</Name></Queue><Queue><Name>stress1545973829773</Name></Queue><Queue><Name>stress1545974281332</Name></Queue><Queue><Name>stress1545975415535</Name></Queue><Queue><Name>stress1545975516554</Name></Queue><Queue><Name>stress1545975638302</Name></Queue><Queue><Name>stress1545977042499</Name></Queue><Queue><Name>stress1545977190085</Name></Queue><Queue><Name>stress1545977335192</Name></Queue><Queue><Name>stress1545984725239</Name></Queue><Queue><Name>stress1545984829173</Name></Queue><Queue><Name>stress1545984931705</Name></Queue><Queue><Name>stress1545985358226</Name></Queue><Queue><Name>stress1545985498458</Name></Queue><Queue><Name>stress1545985644766</Name></Queue><Queue><Name>stress1545986090845</Name></Queue><Queue><Name>stress1545986594209</Name></Queue><Queue><Name>stress1545987132340</Name></Queue><Queue><Name>stress1545988467101</Name></Queue><Queue><Name>stress1545988608339</Name></Queue><Queue><Name>stress1545988743312</Name></Queue></Queues><NextMarker /></EnumerationResults>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0d7a1737-c003-0075-6b3a-36b92d000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 09 Jul 2019 09:38:49 GMT',
  'Connection',
  'close' ]);

