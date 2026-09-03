import * as $protobuf from "protobufjs";
import Long = require("long");
/** Properties of an UpstreamMessage. */
export interface IUpstreamMessage {

    /** UpstreamMessage sendToGroupMessage */
    sendToGroupMessage?: (UpstreamMessage.ISendToGroupMessage|null);

    /** UpstreamMessage eventMessage */
    eventMessage?: (UpstreamMessage.IEventMessage|null);

    /** UpstreamMessage joinGroupMessage */
    joinGroupMessage?: (UpstreamMessage.IJoinGroupMessage|null);

    /** UpstreamMessage leaveGroupMessage */
    leaveGroupMessage?: (UpstreamMessage.ILeaveGroupMessage|null);

    /** UpstreamMessage sequenceAckMessage */
    sequenceAckMessage?: (UpstreamMessage.ISequenceAckMessage|null);
}

/** Represents an UpstreamMessage. */
export class UpstreamMessage implements IUpstreamMessage {

    /**
     * Constructs a new UpstreamMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IUpstreamMessage);

    /** UpstreamMessage sendToGroupMessage. */
    public sendToGroupMessage?: (UpstreamMessage.ISendToGroupMessage|null);

    /** UpstreamMessage eventMessage. */
    public eventMessage?: (UpstreamMessage.IEventMessage|null);

    /** UpstreamMessage joinGroupMessage. */
    public joinGroupMessage?: (UpstreamMessage.IJoinGroupMessage|null);

    /** UpstreamMessage leaveGroupMessage. */
    public leaveGroupMessage?: (UpstreamMessage.ILeaveGroupMessage|null);

    /** UpstreamMessage sequenceAckMessage. */
    public sequenceAckMessage?: (UpstreamMessage.ISequenceAckMessage|null);

    /** UpstreamMessage message. */
    public message?: ("sendToGroupMessage"|"eventMessage"|"joinGroupMessage"|"leaveGroupMessage"|"sequenceAckMessage");

    /**
     * Creates a new UpstreamMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns UpstreamMessage instance
     */
    public static create(properties?: IUpstreamMessage): UpstreamMessage;

    /**
     * Encodes the specified UpstreamMessage message. Does not implicitly {@link UpstreamMessage.verify|verify} messages.
     * @param message UpstreamMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IUpstreamMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified UpstreamMessage message, length delimited. Does not implicitly {@link UpstreamMessage.verify|verify} messages.
     * @param message UpstreamMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IUpstreamMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an UpstreamMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns UpstreamMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UpstreamMessage;

    /**
     * Decodes an UpstreamMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns UpstreamMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UpstreamMessage;

    /**
     * Verifies an UpstreamMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an UpstreamMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns UpstreamMessage
     */
    public static fromObject(object: { [k: string]: any }): UpstreamMessage;

    /**
     * Creates a plain object from an UpstreamMessage message. Also converts values to other types if specified.
     * @param message UpstreamMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: UpstreamMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this UpstreamMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for UpstreamMessage
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

export namespace UpstreamMessage {

    /** Properties of a SendToGroupMessage. */
    interface ISendToGroupMessage {

        /** SendToGroupMessage group */
        group?: (string|null);

        /** SendToGroupMessage ackId */
        ackId?: (number|Long|null);

        /** SendToGroupMessage data */
        data?: (IMessageData|null);

        /** SendToGroupMessage noEcho */
        noEcho?: (boolean|null);
    }

    /** Represents a SendToGroupMessage. */
    class SendToGroupMessage implements ISendToGroupMessage {

        /**
         * Constructs a new SendToGroupMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: UpstreamMessage.ISendToGroupMessage);

        /** SendToGroupMessage group. */
        public group: string;

        /** SendToGroupMessage ackId. */
        public ackId?: (number|Long|null);

        /** SendToGroupMessage data. */
        public data?: (IMessageData|null);

        /** SendToGroupMessage noEcho. */
        public noEcho?: (boolean|null);

        /**
         * Creates a new SendToGroupMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SendToGroupMessage instance
         */
        public static create(properties?: UpstreamMessage.ISendToGroupMessage): UpstreamMessage.SendToGroupMessage;

        /**
         * Encodes the specified SendToGroupMessage message. Does not implicitly {@link UpstreamMessage.SendToGroupMessage.verify|verify} messages.
         * @param message SendToGroupMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: UpstreamMessage.ISendToGroupMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SendToGroupMessage message, length delimited. Does not implicitly {@link UpstreamMessage.SendToGroupMessage.verify|verify} messages.
         * @param message SendToGroupMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: UpstreamMessage.ISendToGroupMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SendToGroupMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SendToGroupMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UpstreamMessage.SendToGroupMessage;

        /**
         * Decodes a SendToGroupMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SendToGroupMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UpstreamMessage.SendToGroupMessage;

        /**
         * Verifies a SendToGroupMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SendToGroupMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SendToGroupMessage
         */
        public static fromObject(object: { [k: string]: any }): UpstreamMessage.SendToGroupMessage;

        /**
         * Creates a plain object from a SendToGroupMessage message. Also converts values to other types if specified.
         * @param message SendToGroupMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: UpstreamMessage.SendToGroupMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SendToGroupMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SendToGroupMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an EventMessage. */
    interface IEventMessage {

        /** EventMessage event */
        event?: (string|null);

        /** EventMessage data */
        data?: (IMessageData|null);

        /** EventMessage ackId */
        ackId?: (number|Long|null);
    }

    /** Represents an EventMessage. */
    class EventMessage implements IEventMessage {

        /**
         * Constructs a new EventMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: UpstreamMessage.IEventMessage);

        /** EventMessage event. */
        public event: string;

        /** EventMessage data. */
        public data?: (IMessageData|null);

        /** EventMessage ackId. */
        public ackId?: (number|Long|null);

        /**
         * Creates a new EventMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EventMessage instance
         */
        public static create(properties?: UpstreamMessage.IEventMessage): UpstreamMessage.EventMessage;

        /**
         * Encodes the specified EventMessage message. Does not implicitly {@link UpstreamMessage.EventMessage.verify|verify} messages.
         * @param message EventMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: UpstreamMessage.IEventMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EventMessage message, length delimited. Does not implicitly {@link UpstreamMessage.EventMessage.verify|verify} messages.
         * @param message EventMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: UpstreamMessage.IEventMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EventMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EventMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UpstreamMessage.EventMessage;

        /**
         * Decodes an EventMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EventMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UpstreamMessage.EventMessage;

        /**
         * Verifies an EventMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EventMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EventMessage
         */
        public static fromObject(object: { [k: string]: any }): UpstreamMessage.EventMessage;

        /**
         * Creates a plain object from an EventMessage message. Also converts values to other types if specified.
         * @param message EventMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: UpstreamMessage.EventMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EventMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for EventMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a JoinGroupMessage. */
    interface IJoinGroupMessage {

        /** JoinGroupMessage group */
        group?: (string|null);

        /** JoinGroupMessage ackId */
        ackId?: (number|Long|null);
    }

    /** Represents a JoinGroupMessage. */
    class JoinGroupMessage implements IJoinGroupMessage {

        /**
         * Constructs a new JoinGroupMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: UpstreamMessage.IJoinGroupMessage);

        /** JoinGroupMessage group. */
        public group: string;

        /** JoinGroupMessage ackId. */
        public ackId?: (number|Long|null);

        /**
         * Creates a new JoinGroupMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns JoinGroupMessage instance
         */
        public static create(properties?: UpstreamMessage.IJoinGroupMessage): UpstreamMessage.JoinGroupMessage;

        /**
         * Encodes the specified JoinGroupMessage message. Does not implicitly {@link UpstreamMessage.JoinGroupMessage.verify|verify} messages.
         * @param message JoinGroupMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: UpstreamMessage.IJoinGroupMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified JoinGroupMessage message, length delimited. Does not implicitly {@link UpstreamMessage.JoinGroupMessage.verify|verify} messages.
         * @param message JoinGroupMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: UpstreamMessage.IJoinGroupMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a JoinGroupMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns JoinGroupMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UpstreamMessage.JoinGroupMessage;

        /**
         * Decodes a JoinGroupMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns JoinGroupMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UpstreamMessage.JoinGroupMessage;

        /**
         * Verifies a JoinGroupMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a JoinGroupMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns JoinGroupMessage
         */
        public static fromObject(object: { [k: string]: any }): UpstreamMessage.JoinGroupMessage;

        /**
         * Creates a plain object from a JoinGroupMessage message. Also converts values to other types if specified.
         * @param message JoinGroupMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: UpstreamMessage.JoinGroupMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this JoinGroupMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for JoinGroupMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a LeaveGroupMessage. */
    interface ILeaveGroupMessage {

        /** LeaveGroupMessage group */
        group?: (string|null);

        /** LeaveGroupMessage ackId */
        ackId?: (number|Long|null);
    }

    /** Represents a LeaveGroupMessage. */
    class LeaveGroupMessage implements ILeaveGroupMessage {

        /**
         * Constructs a new LeaveGroupMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: UpstreamMessage.ILeaveGroupMessage);

        /** LeaveGroupMessage group. */
        public group: string;

        /** LeaveGroupMessage ackId. */
        public ackId?: (number|Long|null);

        /**
         * Creates a new LeaveGroupMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LeaveGroupMessage instance
         */
        public static create(properties?: UpstreamMessage.ILeaveGroupMessage): UpstreamMessage.LeaveGroupMessage;

        /**
         * Encodes the specified LeaveGroupMessage message. Does not implicitly {@link UpstreamMessage.LeaveGroupMessage.verify|verify} messages.
         * @param message LeaveGroupMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: UpstreamMessage.ILeaveGroupMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LeaveGroupMessage message, length delimited. Does not implicitly {@link UpstreamMessage.LeaveGroupMessage.verify|verify} messages.
         * @param message LeaveGroupMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: UpstreamMessage.ILeaveGroupMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LeaveGroupMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LeaveGroupMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UpstreamMessage.LeaveGroupMessage;

        /**
         * Decodes a LeaveGroupMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LeaveGroupMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UpstreamMessage.LeaveGroupMessage;

        /**
         * Verifies a LeaveGroupMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LeaveGroupMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LeaveGroupMessage
         */
        public static fromObject(object: { [k: string]: any }): UpstreamMessage.LeaveGroupMessage;

        /**
         * Creates a plain object from a LeaveGroupMessage message. Also converts values to other types if specified.
         * @param message LeaveGroupMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: UpstreamMessage.LeaveGroupMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LeaveGroupMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for LeaveGroupMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SequenceAckMessage. */
    interface ISequenceAckMessage {

        /** SequenceAckMessage sequenceId */
        sequenceId?: (number|Long|null);
    }

    /** Represents a SequenceAckMessage. */
    class SequenceAckMessage implements ISequenceAckMessage {

        /**
         * Constructs a new SequenceAckMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: UpstreamMessage.ISequenceAckMessage);

        /** SequenceAckMessage sequenceId. */
        public sequenceId: (number|Long);

        /**
         * Creates a new SequenceAckMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SequenceAckMessage instance
         */
        public static create(properties?: UpstreamMessage.ISequenceAckMessage): UpstreamMessage.SequenceAckMessage;

        /**
         * Encodes the specified SequenceAckMessage message. Does not implicitly {@link UpstreamMessage.SequenceAckMessage.verify|verify} messages.
         * @param message SequenceAckMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: UpstreamMessage.ISequenceAckMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SequenceAckMessage message, length delimited. Does not implicitly {@link UpstreamMessage.SequenceAckMessage.verify|verify} messages.
         * @param message SequenceAckMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: UpstreamMessage.ISequenceAckMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SequenceAckMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SequenceAckMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UpstreamMessage.SequenceAckMessage;

        /**
         * Decodes a SequenceAckMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SequenceAckMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UpstreamMessage.SequenceAckMessage;

        /**
         * Verifies a SequenceAckMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SequenceAckMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SequenceAckMessage
         */
        public static fromObject(object: { [k: string]: any }): UpstreamMessage.SequenceAckMessage;

        /**
         * Creates a plain object from a SequenceAckMessage message. Also converts values to other types if specified.
         * @param message SequenceAckMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: UpstreamMessage.SequenceAckMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SequenceAckMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SequenceAckMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}

/** Properties of a DownstreamMessage. */
export interface IDownstreamMessage {

    /** DownstreamMessage ackMessage */
    ackMessage?: (DownstreamMessage.IAckMessage|null);

    /** DownstreamMessage dataMessage */
    dataMessage?: (DownstreamMessage.IDataMessage|null);

    /** DownstreamMessage systemMessage */
    systemMessage?: (DownstreamMessage.ISystemMessage|null);
}

/** Represents a DownstreamMessage. */
export class DownstreamMessage implements IDownstreamMessage {

    /**
     * Constructs a new DownstreamMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDownstreamMessage);

    /** DownstreamMessage ackMessage. */
    public ackMessage?: (DownstreamMessage.IAckMessage|null);

    /** DownstreamMessage dataMessage. */
    public dataMessage?: (DownstreamMessage.IDataMessage|null);

    /** DownstreamMessage systemMessage. */
    public systemMessage?: (DownstreamMessage.ISystemMessage|null);

    /** DownstreamMessage message. */
    public message?: ("ackMessage"|"dataMessage"|"systemMessage");

    /**
     * Creates a new DownstreamMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DownstreamMessage instance
     */
    public static create(properties?: IDownstreamMessage): DownstreamMessage;

    /**
     * Encodes the specified DownstreamMessage message. Does not implicitly {@link DownstreamMessage.verify|verify} messages.
     * @param message DownstreamMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDownstreamMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified DownstreamMessage message, length delimited. Does not implicitly {@link DownstreamMessage.verify|verify} messages.
     * @param message DownstreamMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDownstreamMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DownstreamMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DownstreamMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DownstreamMessage;

    /**
     * Decodes a DownstreamMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DownstreamMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DownstreamMessage;

    /**
     * Verifies a DownstreamMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a DownstreamMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DownstreamMessage
     */
    public static fromObject(object: { [k: string]: any }): DownstreamMessage;

    /**
     * Creates a plain object from a DownstreamMessage message. Also converts values to other types if specified.
     * @param message DownstreamMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: DownstreamMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this DownstreamMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for DownstreamMessage
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

export namespace DownstreamMessage {

    /** Properties of an AckMessage. */
    interface IAckMessage {

        /** AckMessage ackId */
        ackId?: (number|Long|null);

        /** AckMessage success */
        success?: (boolean|null);

        /** AckMessage error */
        error?: (DownstreamMessage.AckMessage.IErrorMessage|null);
    }

    /** Represents an AckMessage. */
    class AckMessage implements IAckMessage {

        /**
         * Constructs a new AckMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: DownstreamMessage.IAckMessage);

        /** AckMessage ackId. */
        public ackId: (number|Long);

        /** AckMessage success. */
        public success: boolean;

        /** AckMessage error. */
        public error?: (DownstreamMessage.AckMessage.IErrorMessage|null);

        /**
         * Creates a new AckMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AckMessage instance
         */
        public static create(properties?: DownstreamMessage.IAckMessage): DownstreamMessage.AckMessage;

        /**
         * Encodes the specified AckMessage message. Does not implicitly {@link DownstreamMessage.AckMessage.verify|verify} messages.
         * @param message AckMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: DownstreamMessage.IAckMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AckMessage message, length delimited. Does not implicitly {@link DownstreamMessage.AckMessage.verify|verify} messages.
         * @param message AckMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: DownstreamMessage.IAckMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AckMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AckMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DownstreamMessage.AckMessage;

        /**
         * Decodes an AckMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AckMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DownstreamMessage.AckMessage;

        /**
         * Verifies an AckMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AckMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AckMessage
         */
        public static fromObject(object: { [k: string]: any }): DownstreamMessage.AckMessage;

        /**
         * Creates a plain object from an AckMessage message. Also converts values to other types if specified.
         * @param message AckMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: DownstreamMessage.AckMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AckMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AckMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace AckMessage {

        /** Properties of an ErrorMessage. */
        interface IErrorMessage {

            /** ErrorMessage name */
            name?: (string|null);

            /** ErrorMessage message */
            message?: (string|null);
        }

        /** Represents an ErrorMessage. */
        class ErrorMessage implements IErrorMessage {

            /**
             * Constructs a new ErrorMessage.
             * @param [properties] Properties to set
             */
            constructor(properties?: DownstreamMessage.AckMessage.IErrorMessage);

            /** ErrorMessage name. */
            public name: string;

            /** ErrorMessage message. */
            public message: string;

            /**
             * Creates a new ErrorMessage instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ErrorMessage instance
             */
            public static create(properties?: DownstreamMessage.AckMessage.IErrorMessage): DownstreamMessage.AckMessage.ErrorMessage;

            /**
             * Encodes the specified ErrorMessage message. Does not implicitly {@link DownstreamMessage.AckMessage.ErrorMessage.verify|verify} messages.
             * @param message ErrorMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: DownstreamMessage.AckMessage.IErrorMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ErrorMessage message, length delimited. Does not implicitly {@link DownstreamMessage.AckMessage.ErrorMessage.verify|verify} messages.
             * @param message ErrorMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: DownstreamMessage.AckMessage.IErrorMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ErrorMessage message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ErrorMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DownstreamMessage.AckMessage.ErrorMessage;

            /**
             * Decodes an ErrorMessage message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ErrorMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DownstreamMessage.AckMessage.ErrorMessage;

            /**
             * Verifies an ErrorMessage message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ErrorMessage message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ErrorMessage
             */
            public static fromObject(object: { [k: string]: any }): DownstreamMessage.AckMessage.ErrorMessage;

            /**
             * Creates a plain object from an ErrorMessage message. Also converts values to other types if specified.
             * @param message ErrorMessage
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: DownstreamMessage.AckMessage.ErrorMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ErrorMessage to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ErrorMessage
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }

    /** Properties of a DataMessage. */
    interface IDataMessage {

        /** DataMessage from */
        from?: (string|null);

        /** DataMessage group */
        group?: (string|null);

        /** DataMessage data */
        data?: (IMessageData|null);

        /** DataMessage sequenceId */
        sequenceId?: (number|Long|null);
    }

    /** Represents a DataMessage. */
    class DataMessage implements IDataMessage {

        /**
         * Constructs a new DataMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: DownstreamMessage.IDataMessage);

        /** DataMessage from. */
        public from: string;

        /** DataMessage group. */
        public group?: (string|null);

        /** DataMessage data. */
        public data?: (IMessageData|null);

        /** DataMessage sequenceId. */
        public sequenceId?: (number|Long|null);

        /**
         * Creates a new DataMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DataMessage instance
         */
        public static create(properties?: DownstreamMessage.IDataMessage): DownstreamMessage.DataMessage;

        /**
         * Encodes the specified DataMessage message. Does not implicitly {@link DownstreamMessage.DataMessage.verify|verify} messages.
         * @param message DataMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: DownstreamMessage.IDataMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DataMessage message, length delimited. Does not implicitly {@link DownstreamMessage.DataMessage.verify|verify} messages.
         * @param message DataMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: DownstreamMessage.IDataMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DataMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DataMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DownstreamMessage.DataMessage;

        /**
         * Decodes a DataMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DataMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DownstreamMessage.DataMessage;

        /**
         * Verifies a DataMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DataMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DataMessage
         */
        public static fromObject(object: { [k: string]: any }): DownstreamMessage.DataMessage;

        /**
         * Creates a plain object from a DataMessage message. Also converts values to other types if specified.
         * @param message DataMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: DownstreamMessage.DataMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DataMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DataMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SystemMessage. */
    interface ISystemMessage {

        /** SystemMessage connectedMessage */
        connectedMessage?: (DownstreamMessage.SystemMessage.IConnectedMessage|null);

        /** SystemMessage disconnectedMessage */
        disconnectedMessage?: (DownstreamMessage.SystemMessage.IDisconnectedMessage|null);
    }

    /** Represents a SystemMessage. */
    class SystemMessage implements ISystemMessage {

        /**
         * Constructs a new SystemMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: DownstreamMessage.ISystemMessage);

        /** SystemMessage connectedMessage. */
        public connectedMessage?: (DownstreamMessage.SystemMessage.IConnectedMessage|null);

        /** SystemMessage disconnectedMessage. */
        public disconnectedMessage?: (DownstreamMessage.SystemMessage.IDisconnectedMessage|null);

        /** SystemMessage message. */
        public message?: ("connectedMessage"|"disconnectedMessage");

        /**
         * Creates a new SystemMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SystemMessage instance
         */
        public static create(properties?: DownstreamMessage.ISystemMessage): DownstreamMessage.SystemMessage;

        /**
         * Encodes the specified SystemMessage message. Does not implicitly {@link DownstreamMessage.SystemMessage.verify|verify} messages.
         * @param message SystemMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: DownstreamMessage.ISystemMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SystemMessage message, length delimited. Does not implicitly {@link DownstreamMessage.SystemMessage.verify|verify} messages.
         * @param message SystemMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: DownstreamMessage.ISystemMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SystemMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SystemMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DownstreamMessage.SystemMessage;

        /**
         * Decodes a SystemMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SystemMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DownstreamMessage.SystemMessage;

        /**
         * Verifies a SystemMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SystemMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SystemMessage
         */
        public static fromObject(object: { [k: string]: any }): DownstreamMessage.SystemMessage;

        /**
         * Creates a plain object from a SystemMessage message. Also converts values to other types if specified.
         * @param message SystemMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: DownstreamMessage.SystemMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SystemMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SystemMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace SystemMessage {

        /** Properties of a ConnectedMessage. */
        interface IConnectedMessage {

            /** ConnectedMessage connectionId */
            connectionId?: (string|null);

            /** ConnectedMessage userId */
            userId?: (string|null);

            /** ConnectedMessage reconnectionToken */
            reconnectionToken?: (string|null);
        }

        /** Represents a ConnectedMessage. */
        class ConnectedMessage implements IConnectedMessage {

            /**
             * Constructs a new ConnectedMessage.
             * @param [properties] Properties to set
             */
            constructor(properties?: DownstreamMessage.SystemMessage.IConnectedMessage);

            /** ConnectedMessage connectionId. */
            public connectionId: string;

            /** ConnectedMessage userId. */
            public userId: string;

            /** ConnectedMessage reconnectionToken. */
            public reconnectionToken: string;

            /**
             * Creates a new ConnectedMessage instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ConnectedMessage instance
             */
            public static create(properties?: DownstreamMessage.SystemMessage.IConnectedMessage): DownstreamMessage.SystemMessage.ConnectedMessage;

            /**
             * Encodes the specified ConnectedMessage message. Does not implicitly {@link DownstreamMessage.SystemMessage.ConnectedMessage.verify|verify} messages.
             * @param message ConnectedMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: DownstreamMessage.SystemMessage.IConnectedMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ConnectedMessage message, length delimited. Does not implicitly {@link DownstreamMessage.SystemMessage.ConnectedMessage.verify|verify} messages.
             * @param message ConnectedMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: DownstreamMessage.SystemMessage.IConnectedMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ConnectedMessage message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ConnectedMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DownstreamMessage.SystemMessage.ConnectedMessage;

            /**
             * Decodes a ConnectedMessage message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ConnectedMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DownstreamMessage.SystemMessage.ConnectedMessage;

            /**
             * Verifies a ConnectedMessage message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ConnectedMessage message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ConnectedMessage
             */
            public static fromObject(object: { [k: string]: any }): DownstreamMessage.SystemMessage.ConnectedMessage;

            /**
             * Creates a plain object from a ConnectedMessage message. Also converts values to other types if specified.
             * @param message ConnectedMessage
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: DownstreamMessage.SystemMessage.ConnectedMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ConnectedMessage to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ConnectedMessage
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a DisconnectedMessage. */
        interface IDisconnectedMessage {

            /** DisconnectedMessage reason */
            reason?: (string|null);
        }

        /** Represents a DisconnectedMessage. */
        class DisconnectedMessage implements IDisconnectedMessage {

            /**
             * Constructs a new DisconnectedMessage.
             * @param [properties] Properties to set
             */
            constructor(properties?: DownstreamMessage.SystemMessage.IDisconnectedMessage);

            /** DisconnectedMessage reason. */
            public reason: string;

            /**
             * Creates a new DisconnectedMessage instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DisconnectedMessage instance
             */
            public static create(properties?: DownstreamMessage.SystemMessage.IDisconnectedMessage): DownstreamMessage.SystemMessage.DisconnectedMessage;

            /**
             * Encodes the specified DisconnectedMessage message. Does not implicitly {@link DownstreamMessage.SystemMessage.DisconnectedMessage.verify|verify} messages.
             * @param message DisconnectedMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: DownstreamMessage.SystemMessage.IDisconnectedMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DisconnectedMessage message, length delimited. Does not implicitly {@link DownstreamMessage.SystemMessage.DisconnectedMessage.verify|verify} messages.
             * @param message DisconnectedMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: DownstreamMessage.SystemMessage.IDisconnectedMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DisconnectedMessage message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DisconnectedMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DownstreamMessage.SystemMessage.DisconnectedMessage;

            /**
             * Decodes a DisconnectedMessage message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DisconnectedMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DownstreamMessage.SystemMessage.DisconnectedMessage;

            /**
             * Verifies a DisconnectedMessage message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DisconnectedMessage message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DisconnectedMessage
             */
            public static fromObject(object: { [k: string]: any }): DownstreamMessage.SystemMessage.DisconnectedMessage;

            /**
             * Creates a plain object from a DisconnectedMessage message. Also converts values to other types if specified.
             * @param message DisconnectedMessage
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: DownstreamMessage.SystemMessage.DisconnectedMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DisconnectedMessage to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for DisconnectedMessage
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }
}

/** Properties of a MessageData. */
export interface IMessageData {

    /** MessageData textData */
    textData?: (string|null);

    /** MessageData binaryData */
    binaryData?: (Uint8Array|null);

    /** MessageData protobufData */
    protobufData?: (google.protobuf.IAny|null);

    /** MessageData jsonData */
    jsonData?: (string|null);
}

/** Represents a MessageData. */
export class MessageData implements IMessageData {

    /**
     * Constructs a new MessageData.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMessageData);

    /** MessageData textData. */
    public textData?: (string|null);

    /** MessageData binaryData. */
    public binaryData?: (Uint8Array|null);

    /** MessageData protobufData. */
    public protobufData?: (google.protobuf.IAny|null);

    /** MessageData jsonData. */
    public jsonData?: (string|null);

    /** MessageData data. */
    public data?: ("textData"|"binaryData"|"protobufData"|"jsonData");

    /**
     * Creates a new MessageData instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MessageData instance
     */
    public static create(properties?: IMessageData): MessageData;

    /**
     * Encodes the specified MessageData message. Does not implicitly {@link MessageData.verify|verify} messages.
     * @param message MessageData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMessageData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified MessageData message, length delimited. Does not implicitly {@link MessageData.verify|verify} messages.
     * @param message MessageData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMessageData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a MessageData message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MessageData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MessageData;

    /**
     * Decodes a MessageData message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MessageData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MessageData;

    /**
     * Verifies a MessageData message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a MessageData message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MessageData
     */
    public static fromObject(object: { [k: string]: any }): MessageData;

    /**
     * Creates a plain object from a MessageData message. Also converts values to other types if specified.
     * @param message MessageData
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: MessageData, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this MessageData to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for MessageData
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of an Any. */
        interface IAny {

            /** Any type_url */
            type_url?: (string|null);

            /** Any value */
            value?: (Uint8Array|null);
        }

        /** Represents an Any. */
        class Any implements IAny {

            /**
             * Constructs a new Any.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IAny);

            /** Any type_url. */
            public type_url: string;

            /** Any value. */
            public value: Uint8Array;

            /**
             * Creates a new Any instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Any instance
             */
            public static create(properties?: google.protobuf.IAny): google.protobuf.Any;

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Any;

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Any;

            /**
             * Verifies an Any message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Any
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Any;

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @param message Any
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Any, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Any to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Any
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }
}
