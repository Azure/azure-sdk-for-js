// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ActionConstants,
  PayloadConstants,
  RequestConstants,
  ResponseConstants,
} from "./constants";
import {
  ProvideClaimsForToken,
  TokenIssuanceStartRequest,
} from "@azure/functions-authentication-events";

import { expect } from "chai";
import { request } from "./payloads";
import { createProvideClaimsForToken } from "../../src/tokenIssuanceStart";

describe("TokenIssuanceStart payload tests.", () => {
  const tokenIssuanceRequest: TokenIssuanceStartRequest = request;
  it("Confirm request translation", () => {
    expect(tokenIssuanceRequest.requestStatus).to.be.equal("Successful");
    expect(tokenIssuanceRequest.statusMessage).to.be.equal(RequestConstants.statusMessage);
    expect(tokenIssuanceRequest.queryParameters[RequestConstants.qsKey1]).to.be.equal(
      RequestConstants.qsValue1,
    );
    expect(tokenIssuanceRequest.queryParameters[RequestConstants.qsKey2]).to.be.equal(
      RequestConstants.qsValue2,
    );
    expect(tokenIssuanceRequest.tokenClaims).to.be.equal(undefined);
    expect(tokenIssuanceRequest.source).to.be.equal(RequestConstants.source);
    expect(tokenIssuanceRequest.oDataType).to.be.equal(RequestConstants.oDataType);
    expect(tokenIssuanceRequest.type).to.be.equal(RequestConstants.type);
  });

  it("Confirm response translation", () => {
    expect(tokenIssuanceRequest.response.actions).to.be.deep.equal([]);
    expect(tokenIssuanceRequest.response.body).to.be.equal(ResponseConstants.body);
    expect(tokenIssuanceRequest.response.oDataType).to.be.equal(ResponseConstants.oDataType);
  });

  describe("Confirm payload translation", () => {
    it("Confirm payload", () => {
      expect(tokenIssuanceRequest.payload.customAuthenticationExtensionId).to.be.equal(
        PayloadConstants.Base.customAuthenticationExtensionId,
      );
      expect(tokenIssuanceRequest.payload.authenticationEventListenerId).to.be.equal(
        PayloadConstants.Base.authenticationEventListenerId,
      );
      expect(tokenIssuanceRequest.payload.tenantId).to.be.equal(PayloadConstants.Base.tenantId);
    });

    it("Confirm payload -> context", () => {
      expect(tokenIssuanceRequest.payload.authenticationContext.correlationId).to.be.equal(
        PayloadConstants.Context.correlationId,
      );
    });

    it("Confirm payload -> context -> client", () => {
      expect(tokenIssuanceRequest.payload.authenticationContext.client.ip).to.be.equal(
        PayloadConstants.Context.Client.ip,
      );
      expect(tokenIssuanceRequest.payload.authenticationContext.client.locale).to.be.equal(
        PayloadConstants.Context.Client.locale,
      );
      expect(tokenIssuanceRequest.payload.authenticationContext.client.market).to.be.equal(
        PayloadConstants.Context.Client.market,
      );
    });

    it("Confirm payload -> context -> authProtocol", () => {
      expect(tokenIssuanceRequest.payload.authenticationContext.authenticationProtocol).to.be.equal(
        PayloadConstants.Context.AuthProtocol,
      );
    });

    it("Confirm payload -> context -> clientServicePrincipal", () => {
      expect(
        tokenIssuanceRequest.payload.authenticationContext.clientServicePrincipal.appDisplayName,
      ).to.be.equal(PayloadConstants.Context.ClientServicePrincipal.appDisplayName);
      expect(
        tokenIssuanceRequest.payload.authenticationContext.clientServicePrincipal.appId,
      ).to.be.equal(PayloadConstants.Context.ClientServicePrincipal.appId);
      expect(
        tokenIssuanceRequest.payload.authenticationContext.clientServicePrincipal.displayName,
      ).to.be.equal(PayloadConstants.Context.ClientServicePrincipal.displayName);
      expect(
        tokenIssuanceRequest.payload.authenticationContext.clientServicePrincipal.id,
      ).to.be.equal(PayloadConstants.Context.ClientServicePrincipal.id);
    });

    it("Confirm payload -> context -> resourceServicePrincipal", () => {
      expect(
        tokenIssuanceRequest.payload.authenticationContext.resourceServicePrincipal.appDisplayName,
      ).to.be.equal(PayloadConstants.Context.ResourceServicePrincipal.appDisplayName);
      expect(
        tokenIssuanceRequest.payload.authenticationContext.resourceServicePrincipal.appId,
      ).to.be.equal(PayloadConstants.Context.ResourceServicePrincipal.appId);
      expect(
        tokenIssuanceRequest.payload.authenticationContext.resourceServicePrincipal.displayName,
      ).to.be.equal(PayloadConstants.Context.ResourceServicePrincipal.displayName);
      expect(
        tokenIssuanceRequest.payload.authenticationContext.resourceServicePrincipal.id,
      ).to.be.equal(PayloadConstants.Context.ResourceServicePrincipal.id);
    });

    it("Confirm payload -> context -> user", () => {
      expect(tokenIssuanceRequest.payload.authenticationContext.user.companyName).to.be.equal(
        PayloadConstants.Context.User.companyName,
      );
      expect(tokenIssuanceRequest.payload.authenticationContext.user.country).to.be.equal(
        PayloadConstants.Context.User.country,
      );
      expect(tokenIssuanceRequest.payload.authenticationContext.user.displayName).to.be.equal(
        PayloadConstants.Context.User.displayName,
      );
      expect(tokenIssuanceRequest.payload.authenticationContext.user.givenName).to.be.equal(
        PayloadConstants.Context.User.givenName,
      );
      expect(tokenIssuanceRequest.payload.authenticationContext.user.id).to.be.equal(
        PayloadConstants.Context.User.id,
      );
      expect(tokenIssuanceRequest.payload.authenticationContext.user.mail).to.be.equal(
        PayloadConstants.Context.User.mail,
      );
      expect(
        tokenIssuanceRequest.payload.authenticationContext.user.onPremiseUserPrincipalName,
      ).to.be.equal("");
      expect(
        tokenIssuanceRequest.payload.authenticationContext.user.onPremisesSamAccountName,
      ).to.be.equal(PayloadConstants.Context.User.onPremisesSamAccountName);
      expect(
        tokenIssuanceRequest.payload.authenticationContext.user.onPremisesSecurityIdentifier,
      ).to.be.equal(PayloadConstants.Context.User.onPremisesSecurityIdentifier);
      expect(
        tokenIssuanceRequest.payload.authenticationContext.user.preferredDataLocation,
      ).to.be.equal(PayloadConstants.Context.User.preferredDataLocation);
      expect(tokenIssuanceRequest.payload.authenticationContext.user.preferredLanguage).to.be.equal(
        PayloadConstants.Context.User.preferredLanguage,
      );
      expect(tokenIssuanceRequest.payload.authenticationContext.user.userType).to.be.equal(
        PayloadConstants.Context.User.userType,
      );
    });
  });
});

describe("TokenIssuanceStart action tests", () => {
  it("ProvideClaimsForToken action", () => {
    const tokenIssuanceRequest: TokenIssuanceStartRequest = request;
    const provideClaimsAction: ProvideClaimsForToken = createProvideClaimsForToken(
      ActionConstants.Claims,
    );

    tokenIssuanceRequest.response.actions.push(provideClaimsAction);
    expect(tokenIssuanceRequest.response.actions.length).to.be.equal(1);
    expect(JSON.stringify(tokenIssuanceRequest.response.actions)).to.be.equal(
      ActionConstants.Claims_as_string,
    );
  });
});
