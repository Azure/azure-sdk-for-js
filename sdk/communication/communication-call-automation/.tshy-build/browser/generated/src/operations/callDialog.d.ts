import { CallDialog } from "../operationsInterfaces/index.js";
import { CallAutomationApiClient } from "../callAutomationApiClient.js";
import { StartDialogRequest, CallDialogStartDialogOptionalParams, CallDialogStartDialogResponse, CallDialogStopDialogOptionalParams, UpdateDialogRequest, CallDialogUpdateDialogOptionalParams } from "../models/index.js";
/** Class containing CallDialog operations. */
export declare class CallDialogImpl implements CallDialog {
    private readonly client;
    /**
     * Initialize a new instance of the class CallDialog class.
     * @param client Reference to the service client
     */
    constructor(client: CallAutomationApiClient);
    /**
     * Start a dialog.
     * @param callConnectionId The call connection id
     * @param dialogId The dialog id
     * @param startDialogRequest The start dialog request
     * @param options The options parameters.
     */
    startDialog(callConnectionId: string, dialogId: string, startDialogRequest: StartDialogRequest, options?: CallDialogStartDialogOptionalParams): Promise<CallDialogStartDialogResponse>;
    /**
     * @param callConnectionId
     * @param dialogId
     * @param options The options parameters.
     */
    stopDialog(callConnectionId: string, dialogId: string, options?: CallDialogStopDialogOptionalParams): Promise<void>;
    /**
     * Update a dialog.
     * @param callConnectionId The call connection id
     * @param dialogId The dialog id
     * @param updateDialogRequest The update dialog request
     * @param options The options parameters.
     */
    updateDialog(callConnectionId: string, dialogId: string, updateDialogRequest: UpdateDialogRequest, options?: CallDialogUpdateDialogOptionalParams): Promise<void>;
}
//# sourceMappingURL=callDialog.d.ts.map