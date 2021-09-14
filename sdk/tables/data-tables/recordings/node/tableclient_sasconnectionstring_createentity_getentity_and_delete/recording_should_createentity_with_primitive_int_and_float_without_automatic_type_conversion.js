let nock = require('nock');

module.exports.hash = "d4f6972bb994b640bcae8d0352293f32";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestSASConnectionStringnode', {"PartitionKey":"P8_node","RowKey":"R8","integerNumber":3,"floatingPointNumber":3.14,"booleanValue":true})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2021-09-14T21%3A24%3A02.784731Z'"`,
  'Location',
  "https://fakeaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P8_node',RowKey='R8')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced258e-0002-0039-7bae-a9c11b000000',
  'x-ms-client-request-id',
  '5755d804-637d-4167-905f-d5d44e9ea551',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://fakeaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P8_node',RowKey='R8')",
  'Date',
  'Tue, 14 Sep 2021 21:24:02 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestSASConnectionStringnode(PartitionKey=\'P8_node\',RowKey=\'R8\')')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode/@Element","odata.etag":"W/\"datetime'2021-09-14T21%3A24%3A02.784731Z'\"","PartitionKey":"P8_node","RowKey":"R8","Timestamp":"2021-09-14T21:24:02.784731Z","integerNumber":3,"floatingPointNumber":3.14,"booleanValue":true}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2021-09-14T21%3A24%3A02.784731Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced25a5-0002-0039-11ae-a9c11b000000',
  'x-ms-client-request-id',
  'b28536af-7caf-415a-9163-24d53dcc8cd3',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Sep 2021 21:24:02 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/tableClientTestSASConnectionStringnode(PartitionKey=\'P8_node\',RowKey=\'R8\')')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced25ba-0002-0039-22ae-a9c11b000000',
  'x-ms-client-request-id',
  '2840c7ca-06a7-4fad-b435-48a3acd2a525',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 14 Sep 2021 21:24:02 GMT'
]);
