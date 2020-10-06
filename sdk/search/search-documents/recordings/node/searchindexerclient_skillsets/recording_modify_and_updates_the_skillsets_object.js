let nock = require('nock');

module.exports.hash = "26d74760f05f6a3e51a4d4090c5d2cc0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-2%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0f3edddb3fd83dd9fff4e4d3d3d3dff7236ab5cc16397dbdb8dece7eb0aef349594db60db4ed3d6a30cb9b695dacdaa25a52bbd7fa55ea7f3cfa48def8e8d1f7ec80daeb15e0fef817c5b4ae9aeabc1dcbabe33734ccf12923f92a9f5617cb0230f84b02a4e8fcf82efdee77f168b92ecbd1478e4c7767d574bda0c152c369d6e617555de4c0e0a39779ddd01ba38f7e629d7137f4eb97f545b62c7e9031acd1475fbd7a4eff9e2eb2027d3eaf08807cf19420bd290885efa3fbf36c5db6cfb3e5c53abbc84faa1930cbd16c512c8bc57af1b2cea745833715bd62392dd7b3fc0d8dbdcc9b8647c95899af57eb96fe222ae938793044be6a5d4ff1b71dd5dd455e5fe4b3df9f07cc83943627f89bdee942fcfe2f1959a0a58fb179913e77c04d0bfbed30582244b56ef54fdbc58a69dcd0fb6d4678b62fccc7d5aacc3ff27151daf69aba2f7e0977a29c7099bfceebcb62ea88f676595d95f9ec227fdd5635bd299fe6cb697dcdacf17be5d7f2e12ff97f008c6b1a184d030000"], [ 'Cache-Control',
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
  'W/"0x8D862481C46C6EE"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'a5f5f5eb-cc1f-4609-879b-e009c2342f74',
  'elapsed-time',
  '44',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Sat, 26 Sep 2020 18:15:20 GMT',
  'Content-Length',
  '577' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/skillsets(%27my-azureblob-skillset-2%27)', {"name":"my-azureblob-skillset-2","description":"Skillset description","skills":[{"name":"#1","description":null,"context":"/document","inputs":[{"name":"text","source":"/document/merged_content","sourceContext":null,"inputs":[]},{"name":"languageCode","source":"/document/language","sourceContext":null,"inputs":[]}],"outputs":[{"name":"persons","targetName":"people"},{"name":"locations","targetName":"locations"},{"name":"organizations","targetName":"organizations"}],"@odata.type":"#Microsoft.Skills.Text.EntityRecognitionSkill","categories":["Person","Quantity","Organization","URL","Email","Location","DateTime"],"defaultLanguageCode":"en","includeTypelessEntities":null,"minimumPrecision":null}],"cognitiveServices":null,"@odata.etag":"\"0x8D862481C46C6EE\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0f3edddb3fd8dbdd79b67b70f2ecf7fd885a2db3454e5f2faeb7b31faceb7c5256936d036d7b8f1accf2665a17abb6a896d4eeb57e95fa1f8f3e92373e7af43d3ba0f67a05b83ffe4531adaba63a6fc7f2eaf80d0d737cca48becaa7d5c5b2000cfe9200293a3fbe4bbffb5d3c5aaecb72f49123d3dd59355d2f68b0d4709ab5f94555173930f8e8655e37f4c6e8a39f5867dc0dfdfa657d912d8b1f640c6bf4d157af9ed3bfa78bac409fcf2b02205f3c25486f0a42e1fbe8fe3c5b97edf36c79b1ce2ef2936a06cc72345b14cb62b15ebcacf369d1e04d45af584ecbf52c7f43632ff3a6e1513256e6ebd5baa5bf884a3a4e1e0c91af5ad753fc6d47757791d717f9ecf7e701f320a5cd09fea677ba10bfff4b461668e9636c5ea4cf1d70d3c27e3b0c960851ad5bfdd376b1621a37f47e9b119eed0bf371b52af38f7c5c94b6bda6ee0baf75e54d53ef8df0cb5fc2a829ff5ce6aff3fab2983a52bf5d5657653ebbc85fb7554d6fcba7f9725a5f3343fd5ef9b57cf84bfe1f71fb2c3383030000"], [ 'Cache-Control',
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
  'W/"0x8D86248210F18CF"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '9fdd31c4-9e0a-4382-a8f3-cb65ba6343de',
  'elapsed-time',
  '66',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Sat, 26 Sep 2020 18:15:20 GMT',
  'Content-Length',
  '585' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-2%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde36777fb77cd916edf5472303999a5c10d8dff7a39d77074f0f3edddb3fd8dbdd79b67b70f2ecf7fd885a2db3454e5f2faeb7b31faceb7c5256936d036d7b8f1accf2665a17abb6a896d4eeb57e95fa1f8f3e92373e7af43d3ba0f67a05b83ffe4531adaba63a6fc7f2eaf80d0d737cca48becaa7d5c5b2000cfe9200293a3fbe4bbffb5d3c5aaecb72f49123d3dd59355d2f68b0d4709ab5f94555173930f8e8655e37f4c6e8a39f5867dc0dfdfa657d912d8b1f640c6bf4d157af9ed3bfa78bac409fcf2b02205f3c25486f0a42e1fbe8fe3c5b97edf36c79b1ce2ef2936a06cc72345b14cb62b15ebcacf369d1e04d45af584ecbf52c7f43632ff3a6e1513256e6ebd5baa5bf884a3a4e1e0c91af5ad753fc6d47757791d717f9ecf7e701f320a5cd09fea677ba10bfff4b461668e9636c5ea4cf1d70d3c27e3b0c960851ad5bfdd376b1621a37f47e9b119eed0bf371b52af38f7c5c94b6bda6ee0baf75e54d53ef8df0cb5fc2a829ff5ce6aff3fab2983a52bf5d5657653ebbc85fb7554d6fcba7f9725a5f3343fd5ef9b57cf84bfe1f71fb2c3383030000"], [ 'Cache-Control',
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
  'W/"0x8D86248210F18CF"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '971f053f-ef43-4a20-8fa3-b11cd113c1ce',
  'elapsed-time',
  '38',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Sat, 26 Sep 2020 18:15:20 GMT',
  'Content-Length',
  '585' ]);
