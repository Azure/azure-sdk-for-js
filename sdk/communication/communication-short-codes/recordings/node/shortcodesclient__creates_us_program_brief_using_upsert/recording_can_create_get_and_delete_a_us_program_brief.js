let nock = require('nock');

module.exports.hash = "019f5e9fc2ec32608680e9de152b6109";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000', {"id":"00000000-0000-0000-0000-000000000000","programDetails":{"isVanity":false,"numberType":"shortCode","isPoliticalCampaign":false,"name":"Contoso Loyalty Program","description":"TEST Customers can sign up to receive regular updates on coupons and other perks of our loyalty program.","url":"https://endpoint/loyalty-program","signUpTypes":["sms","website"],"signUpUrl":"https://contoso.com/sign-up","termsOfServiceUrl":"https://contoso.com/terms","privacyPolicyUrl":"https://contoso.com/privacy"},"companyInformation":{"name":"Contoso","url":"https://contoso.com","address":"1 Contoso Way Redmond, WA 98052","contactInformation":{"name":"Alex","phone":"+14255551234","email":"alex@contoso.com"},"customerCareInformation":{"tollFreeNumber":"+18005551234","email":"customercare@contoso.com"}},"messageDetails":{"supportedProtocols":["sms"],"recurrence":"subscription","helpMessage":"Send 'Stop' to unsubscribe, send 'Start' to resubscribe.","optOutMessage":"You've been unsubscribed from these messages.  Send 'Start' if you want to resubscribe.","optInMessage":"Someone requested to subscribe this number to receive updates about Contoso's loyalty program.  To confirm subscription, reply to this message with 'JOIN'","optInReply":"JOIN","confirmationMessage":"Congrats, you have been successfully subscribed to loyalty program updates.  Welcome!","directionality":"twoWay","useCases":[{"contentCategory":"coupons","examples":[{"messages":[{"direction":"fromUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgram","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgramPointsPrizes","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]}]},"trafficDetails":{"totalMonthlyVolume":10000,"monthlyAverageMessagesFromUser":1,"monthlyAverageMessagesToUser":3,"isSpiky":true,"spikeDetails":"Higher traffic expected around major shopping holidays, most notably Black Friday and Memorial Day.","estimatedRampUpTimeInDays":0}})
  .query(true)
  .reply(201, {"id":"00000000-0000-0000-0000-000000000000","status":"draft","reviewNotes":[],"costs":[{"amount":650,"currencyCode":"USD","billingFrequency":"once"},{"amount":1000,"currencyCode":"USD","billingFrequency":"monthly"}],"statusUpdatedDate":"2022-01-18T17:52:43.6001504+00:00","programDetails":{"isVanity":false,"numberType":"shortCode","isPoliticalCampaign":false,"name":"Contoso Loyalty Program","description":"TEST Customers can sign up to receive regular updates on coupons and other perks of our loyalty program.","url":"https://endpoint/loyalty-program","signUpTypes":["sms","website"],"signUpUrl":"https://contoso.com/sign-up","termsOfServiceUrl":"https://contoso.com/terms","privacyPolicyUrl":"https://contoso.com/privacy"},"companyInformation":{"name":"Contoso","url":"https://contoso.com","address":"1 Contoso Way Redmond, WA 98052","contactInformation":{"name":"Alex","phone":"+14255551234","email":"alex@contoso.com"},"customerCareInformation":{"tollFreeNumber":"+18005551234","email":"customercare@contoso.com"}},"messageDetails":{"supportedProtocols":["sms"],"recurrence":"subscription","helpMessage":"Send 'Stop' to unsubscribe, send 'Start' to resubscribe.","optOutMessage":"You've been unsubscribed from these messages.  Send 'Start' if you want to resubscribe.","optInMessage":"Someone requested to subscribe this number to receive updates about Contoso's loyalty program.  To confirm subscription, reply to this message with 'JOIN'","optInReply":"JOIN","confirmationMessage":"Congrats, you have been successfully subscribed to loyalty program updates.  Welcome!","directionality":"twoWay","useCases":[{"contentCategory":"coupons","examples":[{"messages":[{"direction":"fromUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgram","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgramPointsPrizes","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]}]},"trafficDetails":{"totalMonthlyVolume":10000,"monthlyAverageMessagesFromUser":1,"monthlyAverageMessagesToUser":3,"isSpiky":true,"spikeDetails":"Higher traffic expected around major shopping holidays, most notably Black Friday and Memorial Day.","estimatedRampUpTimeInDays":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://smstestapp.communication.azure.com/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000',
  'Request-Context',
  'appId=',
  'MS-CV',
  'MQrf0PO+QkKurvWfeq2ryg.0',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '4596ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0aP7mYQAAAABgAH6M0/J5R69FB/sM8JulTUlBRURHRTIyMjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 18 Jan 2022 17:52:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000')
  .query(true)
  .reply(200, {"id":"00000000-0000-0000-0000-000000000000","status":"draft","reviewNotes":[],"costs":[{"amount":650,"currencyCode":"USD","billingFrequency":"once"},{"amount":1000,"currencyCode":"USD","billingFrequency":"monthly"}],"statusUpdatedDate":"2022-01-18T17:52:43.6001504+00:00","programDetails":{"isVanity":false,"numberType":"shortCode","isPoliticalCampaign":false,"name":"Contoso Loyalty Program","description":"TEST Customers can sign up to receive regular updates on coupons and other perks of our loyalty program.","url":"https://endpoint/loyalty-program","signUpTypes":["sms","website"],"signUpUrl":"https://contoso.com/sign-up","termsOfServiceUrl":"https://contoso.com/terms","privacyPolicyUrl":"https://contoso.com/privacy"},"companyInformation":{"name":"Contoso","url":"https://contoso.com","address":"1 Contoso Way Redmond, WA 98052","contactInformation":{"name":"Alex","phone":"+14255551234","email":"alex@contoso.com"},"customerCareInformation":{"tollFreeNumber":"+18005551234","email":"customercare@contoso.com"}},"messageDetails":{"supportedProtocols":["sms"],"recurrence":"subscription","helpMessage":"Send 'Stop' to unsubscribe, send 'Start' to resubscribe.","optOutMessage":"You've been unsubscribed from these messages.  Send 'Start' if you want to resubscribe.","optInMessage":"Someone requested to subscribe this number to receive updates about Contoso's loyalty program.  To confirm subscription, reply to this message with 'JOIN'","optInReply":"JOIN","confirmationMessage":"Congrats, you have been successfully subscribed to loyalty program updates.  Welcome!","directionality":"twoWay","useCases":[{"contentCategory":"coupons","examples":[{"messages":[{"direction":"fromUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgram","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]},{"contentCategory":"loyaltyProgramPointsPrizes","examples":[{"messages":[{"direction":"toUser","text":"txtMessage"}]}]}]},"trafficDetails":{"totalMonthlyVolume":10000,"monthlyAverageMessagesFromUser":1,"monthlyAverageMessagesToUser":3,"isSpiky":true,"spikeDetails":"Higher traffic expected around major shopping holidays, most notably Black Friday and Memorial Day.","estimatedRampUpTimeInDays":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'I01fDc/8HE+iPSm7Mnrz3w.0',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '2562ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0bf7mYQAAAADXCM/0QSSxT5FKbvIooq9gTUlBRURHRTIyMjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 18 Jan 2022 17:52:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000')
  .query(true)
  .reply(204, "", [
  'Request-Context',
  'appId=',
  'MS-CV',
  'seWj0ijW+EGlsfadCAumvg.0',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '2688ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0cP7mYQAAAACxi0boczuuSrI/AQEQEA03TUlBRURHRTIyMjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 18 Jan 2022 17:52:50 GMT'
]);
