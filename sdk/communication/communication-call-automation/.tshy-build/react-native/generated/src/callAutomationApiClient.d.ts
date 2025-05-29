import * as coreClient from "@azure/core-client";
import { CallConnection, CallMedia, CallDialog, CallRecording } from "./operationsInterfaces/index.js";
import { CallAutomationApiClientOptionalParams, CreateCallRequest, CreateCallOptionalParams, CreateCallResponse, AnswerCallRequest, AnswerCallOptionalParams, AnswerCallResponse, RedirectCallRequest, RedirectCallOptionalParams, RejectCallRequest, RejectCallOptionalParams, ConnectRequest, ConnectOptionalParams, ConnectResponse } from "./models/index.js";
export declare class CallAutomationApiClient extends coreClient.ServiceClient {
    endpoint: string;
    apiVersion: string;
    /**
     * Initializes a new instance of the CallAutomationApiClient class.
     * @param endpoint The endpoint of the Azure Communication resource.
     * @param options The parameter options
     */
    constructor(endpoint: string, options?: CallAutomationApiClientOptionalParams);
    /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
    private addCustomApiVersionPolicy;
    /**
     * Create an outbound call.
     * @param createCallRequest The create call request.
     * @param options The options parameters.
     */
    createCall(createCallRequest: CreateCallRequest, options?: CreateCallOptionalParams): Promise<CreateCallResponse>;
    /**
     * Answer a call using the IncomingCallContext from Event Grid.
     * @param answerCallRequest The answer call request.
     * @param options The options parameters.
     */
    answerCall(answerCallRequest: AnswerCallRequest, options?: AnswerCallOptionalParams): Promise<AnswerCallResponse>;
    /**
     * Redirect a call.
     * @param redirectCallRequest The redirect call request.
     * @param options The options parameters.
     */
    redirectCall(redirectCallRequest: RedirectCallRequest, options?: RedirectCallOptionalParams): Promise<void>;
    /**
     * Reject the call.
     * @param rejectCallRequest The reject call request.
     * @param options The options parameters.
     */
    rejectCall(rejectCallRequest: RejectCallRequest, options?: RejectCallOptionalParams): Promise<void>;
    /**
     * Create a connection to a CallLocator.
     * @param connectRequest The create connection request.
     * @param options The options parameters.
     */
    connect(connectRequest: ConnectRequest, options?: ConnectOptionalParams): Promise<ConnectResponse>;
    callConnection: CallConnection;
    callMedia: CallMedia;
    callDialog: CallDialog;
    callRecording: CallRecording;
}
//# sourceMappingURL=callAutomationApiClient.d.ts.map