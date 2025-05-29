// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export { KnownCallRejectReason, KnownMediaStreamingAudioChannelType, KnownMediaStreamingContentType, KnownMediaStreamingTransportType, } from "../generated/src/models/index.js";
/** Defines values for VoiceKind that the service accepts. */
export var VoiceKind;
(function (VoiceKind) {
    /** Male */
    VoiceKind["Male"] = "male";
    /** Female */
    VoiceKind["Female"] = "female";
})(VoiceKind || (VoiceKind = {}));
/** A Dtmf Tone. */
export var DtmfTone;
(function (DtmfTone) {
    /** Zero */
    DtmfTone["Zero"] = "zero";
    /** One */
    DtmfTone["One"] = "one";
    /** Two */
    DtmfTone["Two"] = "two";
    /** Three */
    DtmfTone["Three"] = "three";
    /** Four */
    DtmfTone["Four"] = "four";
    /** Five */
    DtmfTone["Five"] = "five";
    /** Six */
    DtmfTone["Six"] = "six";
    /** Seven */
    DtmfTone["Seven"] = "seven";
    /** Eight */
    DtmfTone["Eight"] = "eight";
    /** Nine */
    DtmfTone["Nine"] = "nine";
    /** A */
    DtmfTone["A"] = "a";
    /** B */
    DtmfTone["B"] = "b";
    /** C */
    DtmfTone["C"] = "c";
    /** D */
    DtmfTone["D"] = "d";
    /** Pound */
    DtmfTone["Pound"] = "pound";
    /** Asterisk */
    DtmfTone["Asterisk"] = "asterisk";
})(DtmfTone || (DtmfTone = {}));
/** The type of the recognition that the service accepts. */
export var RecognizeInputType;
(function (RecognizeInputType) {
    /** Dtmf */
    RecognizeInputType["Dtmf"] = "dtmf";
    /** Choices */
    RecognizeInputType["Choices"] = "choices";
})(RecognizeInputType || (RecognizeInputType = {}));
//# sourceMappingURL=models.js.map