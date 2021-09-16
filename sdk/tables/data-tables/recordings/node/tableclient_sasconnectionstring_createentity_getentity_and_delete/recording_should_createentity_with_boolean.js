let nock = require('nock');

module.exports.hash = "10564c0369135bb56c3a21a46e67619c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestSASConnectionStringnode', {"PartitionKey":"P6_node","RowKey":"R6","testField":true,"testField@odata.type":"Edm.Boolean"})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2021-09-07T16%3A24%3A07.786071Z'"`,
  'Location',
  "https://fakeaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P6_node',RowKey='R6')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0076547d-e002-0038-2a04-a4c0e6000000',
  'x-ms-client-request-id',
  '4f462ecc-08a8-4e56-9587-162b9898d60f',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://fakeaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P6_node',RowKey='R6')",
  'Date',
  'Tue, 07 Sep 2021 16:24:07 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get(`/tableClientTestSASConnectionStringnode(PartitionKey='P6_node',RowKey='R6')`)
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode/@Element","odata.etag":"W/\"datetime'2021-09-07T16%3A24%3A07.786071Z'\"","PartitionKey":"P6_node","RowKey":"R6","Timestamp":"2021-09-07T16:24:07.786071Z","testField":true}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2021-09-07T16%3A24%3A07.786071Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00765488-e002-0038-3404-a4c0e6000000',
  'x-ms-client-request-id',
  '1767b759-1526-49f6-933a-e83def95549a',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 07 Sep 2021 16:24:07 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .delete(`/tableClientTestSASConnectionStringnode(PartitionKey='P6_node',RowKey='R6')`)
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00765492-e002-0038-3d04-a4c0e6000000',
  'x-ms-client-request-id',
  'b97d207c-9367-48a5-bf59-af47ffa76940',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 07 Sep 2021 16:24:07 GMT'
]);
