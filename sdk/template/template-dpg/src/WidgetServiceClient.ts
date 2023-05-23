// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, isTokenCredential } from "@azure/core-auth";
import {
    AnalyzeResult,
    AnalyzeWidgetOptions,
    ColorType,
    CreateWidgetOptions,
    DeleteWidgetOptions,
    GetWidgetOptions,
    ListWidgetsOptions,
    UpdateWidgetOptions,
    Widget,
    WidgetServiceContext,
    analyzeWidget,
    createWidget,
    createWidgetService,
    deleteWidget,
    getWidget,
    listWidgets,
    updateWidget,
} from "./api/index.js";
import { ClientOptions } from "./common/interfaces.js";

export class WidgetServiceClient {
    private _client: WidgetServiceContext;

    /** */
    constructor(endpoint: string, options?: ClientOptions);
    constructor(endpoint: string, credential: TokenCredential, options?: ClientOptions);
    constructor(endpoint: string, credentialOrOptions?: TokenCredential | ClientOptions, options: ClientOptions = {}) {
        if (isTokenCredential(credentialOrOptions)) {
          this._client = createWidgetService(endpoint, credentialOrOptions, options);
        }

        this._client = createWidgetService(endpoint, options);
    }

    listWidgets(options: ListWidgetsOptions = { requestOptions: {} }): Promise<Widget[]> {
        return listWidgets(this._client, options);
    }

    getWidget(id: string, options: GetWidgetOptions = { requestOptions: {} }): Promise<Widget> {
        return getWidget(this._client, id, options);
    }

    createWidget(weight: number, color: ColorType, options: CreateWidgetOptions = { requestOptions: {} }): Promise<Widget> {
        return createWidget(this._client, weight, color, options);
    }

    updateWidget(id: string, options: UpdateWidgetOptions = { requestOptions: {} }): Promise<Widget> {
        return updateWidget(this._client, id, options);
    }

    deleteWidget(id: string, options: DeleteWidgetOptions = { requestOptions: {} }): Promise<void> {
        return deleteWidget(this._client, id, options);
    }

    analyzeWidget(id: string, options: AnalyzeWidgetOptions = { requestOptions: {} }): Promise<AnalyzeResult> {
        return analyzeWidget(this._client, id, options);
    }
}
