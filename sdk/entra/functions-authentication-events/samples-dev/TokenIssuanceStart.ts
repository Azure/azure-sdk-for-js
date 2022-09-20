import { AzureFunction, Context } from "@azure/functions";
import {
  AuthenticationEventResponse,
  createFailedRequest,
  TokenIssuanceStartRequest,
  ProvideClaimsForToken,
} from "@azure/functions-authentication-events";

const eventTrigger: AzureFunction = async (
  context: Context,
  onTokenIssuanceStartRequest: TokenIssuanceStartRequest
): Promise<AuthenticationEventResponse> => {
  try {
    //Is the request successful and did the token validation pass./
    if (onTokenIssuanceStartRequest.requestStatus === "Successful") {
      //Fetch information about user from external data store

      //Add new claims to the token's response

      onTokenIssuanceStartRequest.response.actions.push({
        claims: [
          { id: "DateOfBirth", value: "2000-01-01" },
          { id: "CustomRoles", value: ["Writer", "Reader"] },
        ],
      } as ProvideClaimsForToken);
    } else {
      //If the request failed for any reason, i.e. Token validation, output the failed request status
      context.log.error(onTokenIssuanceStartRequest.statusMessage);
    }

    return onTokenIssuanceStartRequest.response;
  } catch (e: unknown) {
    return createFailedRequest(e);
  }
};

export default eventTrigger;
