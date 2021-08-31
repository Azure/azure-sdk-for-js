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
  `W/"datetime'2021-08-31T18%3A46%3A02.8349079Z'"`,
  'Location',
  "https://fakeaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P8_node',RowKey='R8')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '41a88324-9002-0096-0d98-9ee38b000000',
  'x-ms-client-request-id',
  'e1acc0c9-7f91-4ae4-a763-e6de3d9e0fe4',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://fakeaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P8_node',RowKey='R8')",
  'Date',
  'Tue, 31 Aug 2021 18:46:02 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get(`/tableClientTestSASConnectionStringnode(PartitionKey='P8_node',RowKey='R8')`)
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode/@Element","odata.etag":"W/\"datetime'2021-08-31T18%3A46%3A02.8349079Z'\"","PartitionKey":"P8_node","RowKey":"R8","Timestamp":"2021-08-31T18:46:02.8349079Z","integerNumber":3,"floatingPointNumber":3.14,"booleanValue":true}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2021-08-31T18%3A46%3A02.8349079Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '41a88334-9002-0096-1598-9ee38b000000',
  'x-ms-client-request-id',
  '4b4dbc3e-956b-4e3b-b559-5dc348f1ffdf',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 31 Aug 2021 18:46:02 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .delete(`/tableClientTestSASConnectionStringnode(PartitionKey='P8_node',RowKey='R8')`)
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '41a8834a-9002-0096-2098-9ee38b000000',
  'x-ms-client-request-id',
  '42939454-2266-4cfc-a30b-9f3f4b3ab235',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 31 Aug 2021 18:46:02 GMT'
]);
