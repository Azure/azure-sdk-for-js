let nock = require('nock');

module.exports.hash = "2d36176c6aba868830066e958bdda721";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f0f3edddd7bf2e4e1bdfbfb07f74e7edf8fa8d5325be4f4f5bc6af372bb2c2ef36d747b8fbe99e5e7d9ba6c5f4fabba585ebcacabf3a2a4a6cb75598e3e3a2ff272d67cf4e87bbfd8402866f44e7bbdc2efa7b3c5f8758bd7e833413b9be0e5f3ac6c72bc5db6791d7c54e7d43ebf94cfda7a4d1f3555ddcadfdae63c9bd268fc4fdee6d7a63513e0789995d73fc86b83a6f4ddfd34ebfcdd5c2fabe5f5e28b6c85117dff978ceca0b2abbca916f9326f9ae7f9655ed270bc213eadd640860070370166fe1005c18d2394bfbd01ca073c3e85f8b332c059de4ceb62d516d592c6e18d2d3a7d82943f34c56de3d8b48d3738fde48730ba362bca8646e18deca45aaccafcdd1b7c4258f51899e4c57be3a42acb7c0afa6ce16521cb1dfa5e7093f1c8887dbac827ef491669f1b344159f2ef36236cb97dfcd8b8b794b43d1a1627c67cbf6de1e7d247d085a8a8b3f3cfd28189f7eb66980fac9cfd608e9a34059f1c7a38fe8b3e64b6671fa405f5d5f5c909acb6bfa044d0c68fdb3addee6cba2f3f7331ebf7e42b4a9830ff2e5b4bee64e7e2f8c4ebb29164599d5d0c78faca2576afff817c5b4ae9aeabc1d1fff605de7e3d73ce8f1932ff6eebf76ef11b5760db889fcf24b7ec9ff035409abd935060000"], [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D8612BB935483C"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '6ec2e6e7-b17b-439f-aa1b-88892b826c2e',
  'elapsed-time',
  '21',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:19:31 GMT',
  'Content-Length',
  '662' ]);
