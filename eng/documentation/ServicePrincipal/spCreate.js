/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 * 
 */

'use strict';

// Different basic role types that can be assigned to a ServicePrincipal.

  ///////////////
 //Contributor//
///////////////                                         
//  Name             : Contributor
//  Id               : b24988ac-6180-42a0-ab88-20f7382dd24c <<<<<<
//  Description      : Lets you manage everything except access to resources.
//  AssignableScopes : 0=/
//  Actions          : 0=*
//  NotActions       : 0=Microsoft.Authorization/*/Delete, 1=Microsoft.Authorization/*/Write
//  IsCustom         : false

  /////////
 //Owner// 
/////////
//  Name             : Owner
//  Id               : 8e3af657-a8ff-443c-a75c-2fe8c4bcb635 <<<<<
//  Description      : Lets you manage everything, including access to resources.
//  AssignableScopes : 0=/
//  Actions          : 0=*
//  NotActions       :
//  IsCustom         : false

  ///////////
 // Reader//
///////////
//  Name             : Reader
//  Id               : acdd72a7-3385-48ef-bd42-f606fba81ae7 <<<<<
//  Description      : Lets you view everything, but not make any changes.
//  AssignableScopes : 0=/
//  Actions          : 0=*/read
//  NotActions       :
//  IsCustom         : false


  //////////
 //Steps://
//////////
// 1. Validating environment variables.
// 2. Creating an AD application
// 3. Creating a ServicePrincipal on top of the AD application
// 4. Assigning the "Contributor" role to the SP created in step 3 at the subscription scope.
// 5. Trying to login as the created SP. We have induced a timeout of 20 seconds. Still this may fail. 
//    However, that is fine. Executing the ServicePrincipal login in a separate script should work after a minute or so.

validate(function () {
  var msrestazure = require('ms-rest-azure');
  var graph = require('azure-graph');
  var authorization = require('azure-arm-authorization');
  var util = require('util');
  var moment = require('moment');

  var tenantId = process.env['AZURE_TENANT_ID'];
  var subscriptionId = process.env['AZURE_SUBSCRIPTION_ID'];
  var passwordForSp = process.env['AZURE_SP_SECRET'];
  var displayName = process.env['AZURE_SP_DISPLAY_NAME'];
  var homepage = 'http://' + displayName + ':8080';
  var identifierUris = [ homepage ];
  var roleId = 'b24988ac-6180-42a0-ab88-20f7382dd24c'; //that of a contributor
  var scope = '/subscriptions/' + subscriptionId; // we shall be assigning the sp, a 'contributor' role at the subscription level
  var roleDefinitionId = scope + '/providers/Microsoft.Authorization/roleDefinitions/' + roleId;
  var loginOptions = {
    domain: tenantId
  };
  msrestazure.interactiveLogin(loginOptions, function(err, creds) {
    if (err) {
      console.log('Error occured in interactive login: \n' + util.inspect(err, { depth: null }));
      return;
    }
    var options = {
      domain: tenantId,
      tokenAudience: 'graph',
      username: creds.username,
      tokenCache: creds.tokenCache,
      environment: creds.environment
    };
    var credsForGraph = new msrestazure.DeviceTokenCredentials(options);
    var graphClient = new graph(credsForGraph, tenantId);
    var startDate = new Date(Date.now());
    var endDate = new Date(startDate.toISOString());
    var m = moment(endDate);
    m.add(1, 'years');
    endDate = new Date(m.toISOString());
    var applicationCreateParameters = {
      availableToOtherTenants: false,
      displayName: displayName,
      homepage: homepage,
      identifierUris: identifierUris,
      passwordCredentials: [{
        startDate: startDate,
        endDate: endDate,
        keyId: msrestazure.generateUuid(),
        value: passwordForSp
      }]
    };
    graphClient.applications.create(applicationCreateParameters, function (err, application, req, res) {
      if (err) {
        console.log('Error occured while creating the application: \n' + util.inspect(err, { depth: null }));
        return;
      }
      
      var servicePrincipalCreateParameters = {
        appId: application.appId,
        accountEnabled: true
      };
      console.log('Underlying Application objectId: ' + application.objectId);
      graphClient.servicePrincipals.create(servicePrincipalCreateParameters, function (err, sp, req, res) {
        if (err) {
          console.log('Error occured while creating the servicePrincipal: \n' + util.inspect(err, { depth: null }));
          return;
        }
        var authzClient = new authorization(creds, subscriptionId, null);
        var assignmentGuid = msrestazure.generateUuid();
        var roleCreateParams = {
          properties: {
            principalId: sp.objectId,
            //have taken this from the comments made above
            roleDefinitionId: roleDefinitionId,
            scope: scope
          }
        };
        
        console.log('>>>>>>>>>>>\nSuccessfully created the servicePrincipal: \n' + util.inspect(sp, { depth: null }) + '\n');
        authzClient.roleAssignments.create(scope, assignmentGuid, roleCreateParams, function (err, roleAssignment, req, res) {
          if (err) {
            console.log('\nError occured while creating the roleAssignment: \n' + util.inspect(err, { depth: null }));
            return;
          }

          console.log('>>>>>>>>>>>\nSuccessfully created the role assignment for the servicePrincipal.\n');
          console.log('>>>>>>>>>>>\nIn future for login you will need the following info:');
          console.log('ServicePrincipal Id (SPN):    ' + sp.appId);
          console.log('ServicePincipal Password:    ' + passwordForSp);
          console.log('Tenant Id for ServicePrincipal:    ' + tenantId);
          console.log('>>>>>>>>>>>\n');
          console.log(util.format('\nTrying to login as the created servicePrincipal.\n\nWaiting for \'20 seconds\' for the changes to reflect. ' + 
            'If this call fails then  please try to login as the servicePrincipal by executing the following script:\n\n' + 
            'var msrestazure = require(\'ms-rest-azure\');\n\n' + 
            'msrestazure.loginWithServicePrincipalSecret(\'%s\', \'%s\', \'%s\', function(err, creds) { if (err) { console.log(err); ' + 
            '} else { console.log(creds); } });',
            sp.appId, passwordForSp, tenantId));
          setTimeout(function(appId, secret, tenantId, callback) {
            msrestazure.loginWithServicePrincipalSecret(sp.appId, passwordForSp, tenantId, callback);
          }, 20000, 
            sp.appId, passwordForSp, tenantId, function (err, spCreds, subs) {
            if (err) {
              console.log('\nError occured during servicePrincipal login: \n' + util.inspect(err, { depth: null }));
              return;
            }

            console.log('\nServicePrincipal login is successful.\n');
            return;
          });
        });
      });
    });
  });
});

function validate(callback) {
  var ids = [];
  var envs = ['AZURE_TENANT_ID', 'AZURE_SUBSCRIPTION_ID', 'AZURE_SP_SECRET', 'AZURE_SP_DISPLAY_NAME'];
  envs.forEach(function (item) {
    if (!process.env[item]) {
      ids.push(item);
    }
  });

  if (ids.length > 0) {
    console.log('Please set the following environment variables:\n\t' + ids.join(', '));
    process.exit();
  }
  callback();
}