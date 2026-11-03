import * as $protobuf from "protobufjs";
import Long = require("long");

/**
 * Properties of an UpstreamMessage.
 * @deprecated Use UpstreamMessage.$Properties instead.
 */
export interface IUpstreamMessage extends UpstreamMessage.$Properties {
}

/** Represents an UpstreamMessage. */
export class UpstreamMessage {

    /**
     * Constructs a new UpstreamMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: UpstreamMessage.$Properties);

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[];

    /** UpstreamMessage sendToGroupMessage. */
    sendToGroupMessage?: (UpstreamMessage.SendToGroupMessage.$Properties|null);

    /** UpstreamMessage eventMessage. */
    eventMessage?: (UpstreamMessage.EventMessage.$Properties|null);

    /** UpstreamMessage joinGroupMessage. */
    joinGroupMessage?: (UpstreamMessage.JoinGroupMessage.$Properties|null);

    /** UpstreamMessage leaveGroupMessage. */
    leaveGroupMessage?: (UpstreamMessage.LeaveGroupMessage.$Properties|null);

    /** UpstreamMessage sequenceAckMessage. */
    sequenceAckMessage?: (UpstreamMessage.SequenceAckMessage.$Properties|null);

    /** UpstreamMessage message. */
    message?: ("sendToGroupMessage"|"eventMessage"|"joinGroupMessage"|"leaveGroupMessage"|"sequenceAckMessage");

    /**
     * Creates a new UpstreamMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns UpstreamMessage instance
     */
    static create(properties: UpstreamMessage.$Shape): UpstreamMessage & UpstreamMessage.$Shape;
    static create(properties?: UpstreamMessage.$Properties): UpstreamMessage;

    /**
     * Encodes the specified UpstreamMessage message. Does not implicitly {@link UpstreamMessage.verify|verify} messages.
     * @param message UpstreamMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: UpstreamMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified UpstreamMessage message, length delimited. Does not implicitly {@link UpstreamMessage.verify|verify} messages.
     * @param message UpstreamMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: UpstreamMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an UpstreamMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns {UpstreamMessage & UpstreamMessage.$Shape} UpstreamMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UpstreamMessage & UpstreamMessage.$Shape;

    /**
     * Decodes an UpstreamMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns {UpstreamMessage & UpstreamMessage.$Shape} UpstreamMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UpstreamMessage & UpstreamMessage.$Shape;

    /**
     * Verifies an UpstreamMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an UpstreamMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns UpstreamMessage
     */
    static fromObject(object: { [k: string]: any }): UpstreamMessage;

    /**
     * Creates a plain object from an UpstreamMessage message. Also converts values to other types if specified.
     * @param message UpstreamMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: UpstreamMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this UpstreamMessage to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the type url for UpstreamMessage
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    static getTypeUrl(prefix?: string): string;
}

export namespace UpstreamMessage {

    /** Properties of an UpstreamMessage. */
    interface $Properties {

        /** UpstreamMessage sendToGroupMessage */
        sendToGroupMessage?: (UpstreamMessage.SendToGroupMessage.$Properties|null);

        /** UpstreamMessage eventMessage */
        eventMessage?: (UpstreamMessage.EventMessage.$Properties|null);

        /** UpstreamMessage joinGroupMessage */
        joinGroupMessage?: (UpstreamMessage.JoinGroupMessage.$Properties|null);

        /** UpstreamMessage leaveGroupMessage */
        leaveGroupMessage?: (UpstreamMessage.LeaveGroupMessage.$Properties|null);

        /** UpstreamMessage sequenceAckMessage */
        sequenceAckMessage?: (UpstreamMessage.SequenceAckMessage.$Properties|null);

        /** UpstreamMessage message */
        message?: ("sendToGroupMessage"|"eventMessage"|"joinGroupMessage"|"leaveGroupMessage"|"sequenceAckMessage");

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];
    }

    /** Narrowed shape of an UpstreamMessage. */
    type $Shape = {
      sendToGroupMessage?: UpstreamMessage.SendToGroupMessage.$Shape|null;
      eventMessage?: UpstreamMessage.EventMessage.$Shape|null;
      joinGroupMessage?: UpstreamMessage.JoinGroupMessage.$Shape|null;
      leaveGroupMessage?: UpstreamMessage.LeaveGroupMessage.$Shape|null;
      sequenceAckMessage?: UpstreamMessage.SequenceAckMessage.$Shape|null;
      $unknowns?: Uint8Array[];
    } & (
      ({ message?: undefined; sendToGroupMessage?: null; eventMessage?: null; joinGroupMessage?: null; leaveGroupMessage?: null; sequenceAckMessage?: null }|{ message?: "sendToGroupMessage"; sendToGroupMessage: UpstreamMessage.SendToGroupMessage.$Shape; eventMessage?: null; joinGroupMessage?: null; leaveGroupMessage?: null; sequenceAckMessage?: null }|{ message?: "eventMessage"; sendToGroupMessage?: null; eventMessage: UpstreamMessage.EventMessage.$Shape; joinGroupMessage?: null; leaveGroupMessage?: null; sequenceAckMessage?: null }|{ message?: "joinGroupMessage"; sendToGroupMessage?: null; eventMessage?: null; joinGroupMessage: UpstreamMessage.JoinGroupMessage.$Shape; leaveGroupMessage?: null; sequenceAckMessage?: null }|{ message?: "leaveGroupMessage"; sendToGroupMessage?: null; eventMessage?: null; joinGroupMessage?: null; leaveGroupMessage: UpstreamMessage.LeaveGroupMessage.$Shape; sequenceAckMessage?: null }|{ message?: "sequenceAckMessage"; sendToGroupMessage?: null; eventMessage?: null; joinGroupMessage?: null; leaveGroupMessage?: null; sequenceAckMessage: UpstreamMessage.SequenceAckMessage.$Shape })
    );

    /**
     * Properties of a SendToGroupMessage.
     * @deprecated Use UpstreamMessage.SendToGroupMessage.$Properties instead.
     */
    interface ISendToGroupMessage extends UpstreamMessage.SendToGroupMessage.$Properties {
    }

    /** Represents a SendToGroupMessage. */
    class SendToGroupMessage {

        /**
         * Constructs a new SendToGroupMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: UpstreamMessage.SendToGroupMessage.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** SendToGroupMessage group. */
        group: string;

        /** SendToGroupMessage ackId. */
        ackId?: (number|Long|null);

        /** SendToGroupMessage data. */
        data?: (MessageData.$Properties|null);

        /** SendToGroupMessage noEcho. */
        noEcho?: (boolean|null);

        /**
         * Creates a new SendToGroupMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SendToGroupMessage instance
         */
        static create(properties: UpstreamMessage.SendToGroupMessage.$Shape): UpstreamMessage.SendToGroupMessage & UpstreamMessage.SendToGroupMessage.$Shape;
        static create(properties?: UpstreamMessage.SendToGroupMessage.$Properties): UpstreamMessage.SendToGroupMessage;

        /**
         * Encodes the specified SendToGroupMessage message. Does not implicitly {@link UpstreamMessage.SendToGroupMessage.verify|verify} messages.
         * @param message SendToGroupMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: UpstreamMessage.SendToGroupMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SendToGroupMessage message, length delimited. Does not implicitly {@link UpstreamMessage.SendToGroupMessage.verify|verify} messages.
         * @param message SendToGroupMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: UpstreamMessage.SendToGroupMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SendToGroupMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {UpstreamMessage.SendToGroupMessage & UpstreamMessage.SendToGroupMessage.$Shape} SendToGroupMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UpstreamMessage.SendToGroupMessage & UpstreamMessage.SendToGroupMessage.$Shape;

        /**
         * Decodes a SendToGroupMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {UpstreamMessage.SendToGroupMessage & UpstreamMessage.SendToGroupMessage.$Shape} SendToGroupMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UpstreamMessage.SendToGroupMessage & UpstreamMessage.SendToGroupMessage.$Shape;

        /**
         * Verifies a SendToGroupMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SendToGroupMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SendToGroupMessage
         */
        static fromObject(object: { [k: string]: any }): UpstreamMessage.SendToGroupMessage;

        /**
         * Creates a plain object from a SendToGroupMessage message. Also converts values to other types if specified.
         * @param message SendToGroupMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: UpstreamMessage.SendToGroupMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SendToGroupMessage to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for SendToGroupMessage
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace SendToGroupMessage {

        /** Properties of a SendToGroupMessage. */
        interface $Properties {

            /** SendToGroupMessage group */
            group?: (string|null);

            /** SendToGroupMessage ackId */
            ackId?: (number|Long|null);

            /** SendToGroupMessage data */
            data?: (MessageData.$Properties|null);

            /** SendToGroupMessage noEcho */
            noEcho?: (boolean|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a SendToGroupMessage. */
        type $Shape = {
          group?: string|null;
          ackId?: number|Long|null;
          data?: MessageData.$Shape|null;
          noEcho?: boolean|null;
          $unknowns?: Uint8Array[];
        };
    }

    /**
     * Properties of an EventMessage.
     * @deprecated Use UpstreamMessage.EventMessage.$Properties instead.
     */
    interface IEventMessage extends UpstreamMessage.EventMessage.$Properties {
    }

    /** Represents an EventMessage. */
    class EventMessage {

        /**
         * Constructs a new EventMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: UpstreamMessage.EventMessage.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** EventMessage event. */
        event: string;

        /** EventMessage data. */
        data?: (MessageData.$Properties|null);

        /** EventMessage ackId. */
        ackId?: (number|Long|null);

        /**
         * Creates a new EventMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EventMessage instance
         */
        static create(properties: UpstreamMessage.EventMessage.$Shape): UpstreamMessage.EventMessage & UpstreamMessage.EventMessage.$Shape;
        static create(properties?: UpstreamMessage.EventMessage.$Properties): UpstreamMessage.EventMessage;

        /**
         * Encodes the specified EventMessage message. Does not implicitly {@link UpstreamMessage.EventMessage.verify|verify} messages.
         * @param message EventMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: UpstreamMessage.EventMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EventMessage message, length delimited. Does not implicitly {@link UpstreamMessage.EventMessage.verify|verify} messages.
         * @param message EventMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: UpstreamMessage.EventMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EventMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {UpstreamMessage.EventMessage & UpstreamMessage.EventMessage.$Shape} EventMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UpstreamMessage.EventMessage & UpstreamMessage.EventMessage.$Shape;

        /**
         * Decodes an EventMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {UpstreamMessage.EventMessage & UpstreamMessage.EventMessage.$Shape} EventMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UpstreamMessage.EventMessage & UpstreamMessage.EventMessage.$Shape;

        /**
         * Verifies an EventMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EventMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EventMessage
         */
        static fromObject(object: { [k: string]: any }): UpstreamMessage.EventMessage;

        /**
         * Creates a plain object from an EventMessage message. Also converts values to other types if specified.
         * @param message EventMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: UpstreamMessage.EventMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EventMessage to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for EventMessage
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace EventMessage {

        /** Properties of an EventMessage. */
        interface $Properties {

            /** EventMessage event */
            event?: (string|null);

            /** EventMessage data */
            data?: (MessageData.$Properties|null);

            /** EventMessage ackId */
            ackId?: (number|Long|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an EventMessage. */
        type $Shape = {
          event?: string|null;
          data?: MessageData.$Shape|null;
          ackId?: number|Long|null;
          $unknowns?: Uint8Array[];
        };
    }

    /**
     * Properties of a JoinGroupMessage.
     * @deprecated Use UpstreamMessage.JoinGroupMessage.$Properties instead.
     */
    interface IJoinGroupMessage extends UpstreamMessage.JoinGroupMessage.$Properties {
    }

    /** Represents a JoinGroupMessage. */
    class JoinGroupMessage {

        /**
         * Constructs a new JoinGroupMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: UpstreamMessage.JoinGroupMessage.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** JoinGroupMessage group. */
        group: string;

        /** JoinGroupMessage ackId. */
        ackId?: (number|Long|null);

        /**
         * Creates a new JoinGroupMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns JoinGroupMessage instance
         */
        static create(properties: UpstreamMessage.JoinGroupMessage.$Shape): UpstreamMessage.JoinGroupMessage & UpstreamMessage.JoinGroupMessage.$Shape;
        static create(properties?: UpstreamMessage.JoinGroupMessage.$Properties): UpstreamMessage.JoinGroupMessage;

        /**
         * Encodes the specified JoinGroupMessage message. Does not implicitly {@link UpstreamMessage.JoinGroupMessage.verify|verify} messages.
         * @param message JoinGroupMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: UpstreamMessage.JoinGroupMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified JoinGroupMessage message, length delimited. Does not implicitly {@link UpstreamMessage.JoinGroupMessage.verify|verify} messages.
         * @param message JoinGroupMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: UpstreamMessage.JoinGroupMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a JoinGroupMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {UpstreamMessage.JoinGroupMessage & UpstreamMessage.JoinGroupMessage.$Shape} JoinGroupMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UpstreamMessage.JoinGroupMessage & UpstreamMessage.JoinGroupMessage.$Shape;

        /**
         * Decodes a JoinGroupMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {UpstreamMessage.JoinGroupMessage & UpstreamMessage.JoinGroupMessage.$Shape} JoinGroupMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UpstreamMessage.JoinGroupMessage & UpstreamMessage.JoinGroupMessage.$Shape;

        /**
         * Verifies a JoinGroupMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a JoinGroupMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns JoinGroupMessage
         */
        static fromObject(object: { [k: string]: any }): UpstreamMessage.JoinGroupMessage;

        /**
         * Creates a plain object from a JoinGroupMessage message. Also converts values to other types if specified.
         * @param message JoinGroupMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: UpstreamMessage.JoinGroupMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this JoinGroupMessage to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for JoinGroupMessage
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace JoinGroupMessage {

        /** Properties of a JoinGroupMessage. */
        interface $Properties {

            /** JoinGroupMessage group */
            group?: (string|null);

            /** JoinGroupMessage ackId */
            ackId?: (number|Long|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a JoinGroupMessage. */
        type $Shape = UpstreamMessage.JoinGroupMessage.$Properties;
    }

    /**
     * Properties of a LeaveGroupMessage.
     * @deprecated Use UpstreamMessage.LeaveGroupMessage.$Properties instead.
     */
    interface ILeaveGroupMessage extends UpstreamMessage.LeaveGroupMessage.$Properties {
    }

    /** Represents a LeaveGroupMessage. */
    class LeaveGroupMessage {

        /**
         * Constructs a new LeaveGroupMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: UpstreamMessage.LeaveGroupMessage.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** LeaveGroupMessage group. */
        group: string;

        /** LeaveGroupMessage ackId. */
        ackId?: (number|Long|null);

        /**
         * Creates a new LeaveGroupMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LeaveGroupMessage instance
         */
        static create(properties: UpstreamMessage.LeaveGroupMessage.$Shape): UpstreamMessage.LeaveGroupMessage & UpstreamMessage.LeaveGroupMessage.$Shape;
        static create(properties?: UpstreamMessage.LeaveGroupMessage.$Properties): UpstreamMessage.LeaveGroupMessage;

        /**
         * Encodes the specified LeaveGroupMessage message. Does not implicitly {@link UpstreamMessage.LeaveGroupMessage.verify|verify} messages.
         * @param message LeaveGroupMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: UpstreamMessage.LeaveGroupMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LeaveGroupMessage message, length delimited. Does not implicitly {@link UpstreamMessage.LeaveGroupMessage.verify|verify} messages.
         * @param message LeaveGroupMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: UpstreamMessage.LeaveGroupMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LeaveGroupMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {UpstreamMessage.LeaveGroupMessage & UpstreamMessage.LeaveGroupMessage.$Shape} LeaveGroupMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UpstreamMessage.LeaveGroupMessage & UpstreamMessage.LeaveGroupMessage.$Shape;

        /**
         * Decodes a LeaveGroupMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {UpstreamMessage.LeaveGroupMessage & UpstreamMessage.LeaveGroupMessage.$Shape} LeaveGroupMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UpstreamMessage.LeaveGroupMessage & UpstreamMessage.LeaveGroupMessage.$Shape;

        /**
         * Verifies a LeaveGroupMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LeaveGroupMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LeaveGroupMessage
         */
        static fromObject(object: { [k: string]: any }): UpstreamMessage.LeaveGroupMessage;

        /**
         * Creates a plain object from a LeaveGroupMessage message. Also converts values to other types if specified.
         * @param message LeaveGroupMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: UpstreamMessage.LeaveGroupMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LeaveGroupMessage to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for LeaveGroupMessage
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace LeaveGroupMessage {

        /** Properties of a LeaveGroupMessage. */
        interface $Properties {

            /** LeaveGroupMessage group */
            group?: (string|null);

            /** LeaveGroupMessage ackId */
            ackId?: (number|Long|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a LeaveGroupMessage. */
        type $Shape = UpstreamMessage.LeaveGroupMessage.$Properties;
    }

    /**
     * Properties of a SequenceAckMessage.
     * @deprecated Use UpstreamMessage.SequenceAckMessage.$Properties instead.
     */
    interface ISequenceAckMessage extends UpstreamMessage.SequenceAckMessage.$Properties {
    }

    /** Represents a SequenceAckMessage. */
    class SequenceAckMessage {

        /**
         * Constructs a new SequenceAckMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: UpstreamMessage.SequenceAckMessage.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** SequenceAckMessage sequenceId. */
        sequenceId: (number|Long);

        /**
         * Creates a new SequenceAckMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SequenceAckMessage instance
         */
        static create(properties: UpstreamMessage.SequenceAckMessage.$Shape): UpstreamMessage.SequenceAckMessage & UpstreamMessage.SequenceAckMessage.$Shape;
        static create(properties?: UpstreamMessage.SequenceAckMessage.$Properties): UpstreamMessage.SequenceAckMessage;

        /**
         * Encodes the specified SequenceAckMessage message. Does not implicitly {@link UpstreamMessage.SequenceAckMessage.verify|verify} messages.
         * @param message SequenceAckMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: UpstreamMessage.SequenceAckMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SequenceAckMessage message, length delimited. Does not implicitly {@link UpstreamMessage.SequenceAckMessage.verify|verify} messages.
         * @param message SequenceAckMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: UpstreamMessage.SequenceAckMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SequenceAckMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {UpstreamMessage.SequenceAckMessage & UpstreamMessage.SequenceAckMessage.$Shape} SequenceAckMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UpstreamMessage.SequenceAckMessage & UpstreamMessage.SequenceAckMessage.$Shape;

        /**
         * Decodes a SequenceAckMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {UpstreamMessage.SequenceAckMessage & UpstreamMessage.SequenceAckMessage.$Shape} SequenceAckMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UpstreamMessage.SequenceAckMessage & UpstreamMessage.SequenceAckMessage.$Shape;

        /**
         * Verifies a SequenceAckMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SequenceAckMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SequenceAckMessage
         */
        static fromObject(object: { [k: string]: any }): UpstreamMessage.SequenceAckMessage;

        /**
         * Creates a plain object from a SequenceAckMessage message. Also converts values to other types if specified.
         * @param message SequenceAckMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: UpstreamMessage.SequenceAckMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SequenceAckMessage to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for SequenceAckMessage
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace SequenceAckMessage {

        /** Properties of a SequenceAckMessage. */
        interface $Properties {

            /** SequenceAckMessage sequenceId */
            sequenceId?: (number|Long|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a SequenceAckMessage. */
        type $Shape = UpstreamMessage.SequenceAckMessage.$Properties;
    }
}

/**
 * Properties of a DownstreamMessage.
 * @deprecated Use DownstreamMessage.$Properties instead.
 */
export interface IDownstreamMessage extends DownstreamMessage.$Properties {
}

/** Represents a DownstreamMessage. */
export class DownstreamMessage {

    /**
     * Constructs a new DownstreamMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: DownstreamMessage.$Properties);

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[];

    /** DownstreamMessage ackMessage. */
    ackMessage?: (DownstreamMessage.AckMessage.$Properties|null);

    /** DownstreamMessage dataMessage. */
    dataMessage?: (DownstreamMessage.DataMessage.$Properties|null);

    /** DownstreamMessage systemMessage. */
    systemMessage?: (DownstreamMessage.SystemMessage.$Properties|null);

    /** DownstreamMessage message. */
    message?: ("ackMessage"|"dataMessage"|"systemMessage");

    /**
     * Creates a new DownstreamMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DownstreamMessage instance
     */
    static create(properties: DownstreamMessage.$Shape): DownstreamMessage & DownstreamMessage.$Shape;
    static create(properties?: DownstreamMessage.$Properties): DownstreamMessage;

    /**
     * Encodes the specified DownstreamMessage message. Does not implicitly {@link DownstreamMessage.verify|verify} messages.
     * @param message DownstreamMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: DownstreamMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified DownstreamMessage message, length delimited. Does not implicitly {@link DownstreamMessage.verify|verify} messages.
     * @param message DownstreamMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: DownstreamMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DownstreamMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns {DownstreamMessage & DownstreamMessage.$Shape} DownstreamMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DownstreamMessage & DownstreamMessage.$Shape;

    /**
     * Decodes a DownstreamMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns {DownstreamMessage & DownstreamMessage.$Shape} DownstreamMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DownstreamMessage & DownstreamMessage.$Shape;

    /**
     * Verifies a DownstreamMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a DownstreamMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DownstreamMessage
     */
    static fromObject(object: { [k: string]: any }): DownstreamMessage;

    /**
     * Creates a plain object from a DownstreamMessage message. Also converts values to other types if specified.
     * @param message DownstreamMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: DownstreamMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this DownstreamMessage to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the type url for DownstreamMessage
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    static getTypeUrl(prefix?: string): string;
}

export namespace DownstreamMessage {

    /** Properties of a DownstreamMessage. */
    interface $Properties {

        /** DownstreamMessage ackMessage */
        ackMessage?: (DownstreamMessage.AckMessage.$Properties|null);

        /** DownstreamMessage dataMessage */
        dataMessage?: (DownstreamMessage.DataMessage.$Properties|null);

        /** DownstreamMessage systemMessage */
        systemMessage?: (DownstreamMessage.SystemMessage.$Properties|null);

        /** DownstreamMessage message */
        message?: ("ackMessage"|"dataMessage"|"systemMessage");

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];
    }

    /** Narrowed shape of a DownstreamMessage. */
    type $Shape = {
      ackMessage?: DownstreamMessage.AckMessage.$Shape|null;
      dataMessage?: DownstreamMessage.DataMessage.$Shape|null;
      systemMessage?: DownstreamMessage.SystemMessage.$Shape|null;
      $unknowns?: Uint8Array[];
    } & (
      ({ message?: undefined; ackMessage?: null; dataMessage?: null; systemMessage?: null }|{ message?: "ackMessage"; ackMessage: DownstreamMessage.AckMessage.$Shape; dataMessage?: null; systemMessage?: null }|{ message?: "dataMessage"; ackMessage?: null; dataMessage: DownstreamMessage.DataMessage.$Shape; systemMessage?: null }|{ message?: "systemMessage"; ackMessage?: null; dataMessage?: null; systemMessage: DownstreamMessage.SystemMessage.$Shape })
    );

    /**
     * Properties of an AckMessage.
     * @deprecated Use DownstreamMessage.AckMessage.$Properties instead.
     */
    interface IAckMessage extends DownstreamMessage.AckMessage.$Properties {
    }

    /** Represents an AckMessage. */
    class AckMessage {

        /**
         * Constructs a new AckMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: DownstreamMessage.AckMessage.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** AckMessage ackId. */
        ackId: (number|Long);

        /** AckMessage success. */
        success: boolean;

        /** AckMessage error. */
        error?: (DownstreamMessage.AckMessage.ErrorMessage.$Properties|null);

        /**
         * Creates a new AckMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AckMessage instance
         */
        static create(properties: DownstreamMessage.AckMessage.$Shape): DownstreamMessage.AckMessage & DownstreamMessage.AckMessage.$Shape;
        static create(properties?: DownstreamMessage.AckMessage.$Properties): DownstreamMessage.AckMessage;

        /**
         * Encodes the specified AckMessage message. Does not implicitly {@link DownstreamMessage.AckMessage.verify|verify} messages.
         * @param message AckMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: DownstreamMessage.AckMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AckMessage message, length delimited. Does not implicitly {@link DownstreamMessage.AckMessage.verify|verify} messages.
         * @param message AckMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: DownstreamMessage.AckMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AckMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {DownstreamMessage.AckMessage & DownstreamMessage.AckMessage.$Shape} AckMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DownstreamMessage.AckMessage & DownstreamMessage.AckMessage.$Shape;

        /**
         * Decodes an AckMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {DownstreamMessage.AckMessage & DownstreamMessage.AckMessage.$Shape} AckMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DownstreamMessage.AckMessage & DownstreamMessage.AckMessage.$Shape;

        /**
         * Verifies an AckMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AckMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AckMessage
         */
        static fromObject(object: { [k: string]: any }): DownstreamMessage.AckMessage;

        /**
         * Creates a plain object from an AckMessage message. Also converts values to other types if specified.
         * @param message AckMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: DownstreamMessage.AckMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AckMessage to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AckMessage
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AckMessage {

        /** Properties of an AckMessage. */
        interface $Properties {

            /** AckMessage ackId */
            ackId?: (number|Long|null);

            /** AckMessage success */
            success?: (boolean|null);

            /** AckMessage error */
            error?: (DownstreamMessage.AckMessage.ErrorMessage.$Properties|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AckMessage. */
        type $Shape = DownstreamMessage.AckMessage.$Properties;

        /**
         * Properties of an ErrorMessage.
         * @deprecated Use DownstreamMessage.AckMessage.ErrorMessage.$Properties instead.
         */
        interface IErrorMessage extends DownstreamMessage.AckMessage.ErrorMessage.$Properties {
        }

        /** Represents an ErrorMessage. */
        class ErrorMessage {

            /**
             * Constructs a new ErrorMessage.
             * @param [properties] Properties to set
             */
            constructor(properties?: DownstreamMessage.AckMessage.ErrorMessage.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** ErrorMessage name. */
            name: string;

            /** ErrorMessage message. */
            message: string;

            /**
             * Creates a new ErrorMessage instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ErrorMessage instance
             */
            static create(properties: DownstreamMessage.AckMessage.ErrorMessage.$Shape): DownstreamMessage.AckMessage.ErrorMessage & DownstreamMessage.AckMessage.ErrorMessage.$Shape;
            static create(properties?: DownstreamMessage.AckMessage.ErrorMessage.$Properties): DownstreamMessage.AckMessage.ErrorMessage;

            /**
             * Encodes the specified ErrorMessage message. Does not implicitly {@link DownstreamMessage.AckMessage.ErrorMessage.verify|verify} messages.
             * @param message ErrorMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: DownstreamMessage.AckMessage.ErrorMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ErrorMessage message, length delimited. Does not implicitly {@link DownstreamMessage.AckMessage.ErrorMessage.verify|verify} messages.
             * @param message ErrorMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: DownstreamMessage.AckMessage.ErrorMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ErrorMessage message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {DownstreamMessage.AckMessage.ErrorMessage & DownstreamMessage.AckMessage.ErrorMessage.$Shape} ErrorMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DownstreamMessage.AckMessage.ErrorMessage & DownstreamMessage.AckMessage.ErrorMessage.$Shape;

            /**
             * Decodes an ErrorMessage message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {DownstreamMessage.AckMessage.ErrorMessage & DownstreamMessage.AckMessage.ErrorMessage.$Shape} ErrorMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DownstreamMessage.AckMessage.ErrorMessage & DownstreamMessage.AckMessage.ErrorMessage.$Shape;

            /**
             * Verifies an ErrorMessage message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ErrorMessage message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ErrorMessage
             */
            static fromObject(object: { [k: string]: any }): DownstreamMessage.AckMessage.ErrorMessage;

            /**
             * Creates a plain object from an ErrorMessage message. Also converts values to other types if specified.
             * @param message ErrorMessage
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: DownstreamMessage.AckMessage.ErrorMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ErrorMessage to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };

            /**
             * Gets the type url for ErrorMessage
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace ErrorMessage {

            /** Properties of an ErrorMessage. */
            interface $Properties {

                /** ErrorMessage name */
                name?: (string|null);

                /** ErrorMessage message */
                message?: (string|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of an ErrorMessage. */
            type $Shape = DownstreamMessage.AckMessage.ErrorMessage.$Properties;
        }
    }

    /**
     * Properties of a DataMessage.
     * @deprecated Use DownstreamMessage.DataMessage.$Properties instead.
     */
    interface IDataMessage extends DownstreamMessage.DataMessage.$Properties {
    }

    /** Represents a DataMessage. */
    class DataMessage {

        /**
         * Constructs a new DataMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: DownstreamMessage.DataMessage.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** DataMessage from. */
        from: string;

        /** DataMessage group. */
        group?: (string|null);

        /** DataMessage data. */
        data?: (MessageData.$Properties|null);

        /** DataMessage sequenceId. */
        sequenceId?: (number|Long|null);

        /**
         * Creates a new DataMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DataMessage instance
         */
        static create(properties: DownstreamMessage.DataMessage.$Shape): DownstreamMessage.DataMessage & DownstreamMessage.DataMessage.$Shape;
        static create(properties?: DownstreamMessage.DataMessage.$Properties): DownstreamMessage.DataMessage;

        /**
         * Encodes the specified DataMessage message. Does not implicitly {@link DownstreamMessage.DataMessage.verify|verify} messages.
         * @param message DataMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: DownstreamMessage.DataMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DataMessage message, length delimited. Does not implicitly {@link DownstreamMessage.DataMessage.verify|verify} messages.
         * @param message DataMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: DownstreamMessage.DataMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DataMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {DownstreamMessage.DataMessage & DownstreamMessage.DataMessage.$Shape} DataMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DownstreamMessage.DataMessage & DownstreamMessage.DataMessage.$Shape;

        /**
         * Decodes a DataMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {DownstreamMessage.DataMessage & DownstreamMessage.DataMessage.$Shape} DataMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DownstreamMessage.DataMessage & DownstreamMessage.DataMessage.$Shape;

        /**
         * Verifies a DataMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DataMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DataMessage
         */
        static fromObject(object: { [k: string]: any }): DownstreamMessage.DataMessage;

        /**
         * Creates a plain object from a DataMessage message. Also converts values to other types if specified.
         * @param message DataMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: DownstreamMessage.DataMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DataMessage to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for DataMessage
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace DataMessage {

        /** Properties of a DataMessage. */
        interface $Properties {

            /** DataMessage from */
            from?: (string|null);

            /** DataMessage group */
            group?: (string|null);

            /** DataMessage data */
            data?: (MessageData.$Properties|null);

            /** DataMessage sequenceId */
            sequenceId?: (number|Long|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a DataMessage. */
        type $Shape = {
          from?: string|null;
          group?: string|null;
          data?: MessageData.$Shape|null;
          sequenceId?: number|Long|null;
          $unknowns?: Uint8Array[];
        };
    }

    /**
     * Properties of a SystemMessage.
     * @deprecated Use DownstreamMessage.SystemMessage.$Properties instead.
     */
    interface ISystemMessage extends DownstreamMessage.SystemMessage.$Properties {
    }

    /** Represents a SystemMessage. */
    class SystemMessage {

        /**
         * Constructs a new SystemMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: DownstreamMessage.SystemMessage.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** SystemMessage connectedMessage. */
        connectedMessage?: (DownstreamMessage.SystemMessage.ConnectedMessage.$Properties|null);

        /** SystemMessage disconnectedMessage. */
        disconnectedMessage?: (DownstreamMessage.SystemMessage.DisconnectedMessage.$Properties|null);

        /** SystemMessage message. */
        message?: ("connectedMessage"|"disconnectedMessage");

        /**
         * Creates a new SystemMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SystemMessage instance
         */
        static create(properties: DownstreamMessage.SystemMessage.$Shape): DownstreamMessage.SystemMessage & DownstreamMessage.SystemMessage.$Shape;
        static create(properties?: DownstreamMessage.SystemMessage.$Properties): DownstreamMessage.SystemMessage;

        /**
         * Encodes the specified SystemMessage message. Does not implicitly {@link DownstreamMessage.SystemMessage.verify|verify} messages.
         * @param message SystemMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: DownstreamMessage.SystemMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SystemMessage message, length delimited. Does not implicitly {@link DownstreamMessage.SystemMessage.verify|verify} messages.
         * @param message SystemMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: DownstreamMessage.SystemMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SystemMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {DownstreamMessage.SystemMessage & DownstreamMessage.SystemMessage.$Shape} SystemMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DownstreamMessage.SystemMessage & DownstreamMessage.SystemMessage.$Shape;

        /**
         * Decodes a SystemMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {DownstreamMessage.SystemMessage & DownstreamMessage.SystemMessage.$Shape} SystemMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DownstreamMessage.SystemMessage & DownstreamMessage.SystemMessage.$Shape;

        /**
         * Verifies a SystemMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SystemMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SystemMessage
         */
        static fromObject(object: { [k: string]: any }): DownstreamMessage.SystemMessage;

        /**
         * Creates a plain object from a SystemMessage message. Also converts values to other types if specified.
         * @param message SystemMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: DownstreamMessage.SystemMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SystemMessage to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for SystemMessage
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace SystemMessage {

        /** Properties of a SystemMessage. */
        interface $Properties {

            /** SystemMessage connectedMessage */
            connectedMessage?: (DownstreamMessage.SystemMessage.ConnectedMessage.$Properties|null);

            /** SystemMessage disconnectedMessage */
            disconnectedMessage?: (DownstreamMessage.SystemMessage.DisconnectedMessage.$Properties|null);

            /** SystemMessage message */
            message?: ("connectedMessage"|"disconnectedMessage");

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Narrowed shape of a SystemMessage. */
        type $Shape = {
          connectedMessage?: DownstreamMessage.SystemMessage.ConnectedMessage.$Shape|null;
          disconnectedMessage?: DownstreamMessage.SystemMessage.DisconnectedMessage.$Shape|null;
          $unknowns?: Uint8Array[];
        } & (
          ({ message?: undefined; connectedMessage?: null; disconnectedMessage?: null }|{ message?: "connectedMessage"; connectedMessage: DownstreamMessage.SystemMessage.ConnectedMessage.$Shape; disconnectedMessage?: null }|{ message?: "disconnectedMessage"; connectedMessage?: null; disconnectedMessage: DownstreamMessage.SystemMessage.DisconnectedMessage.$Shape })
        );

        /**
         * Properties of a ConnectedMessage.
         * @deprecated Use DownstreamMessage.SystemMessage.ConnectedMessage.$Properties instead.
         */
        interface IConnectedMessage extends DownstreamMessage.SystemMessage.ConnectedMessage.$Properties {
        }

        /** Represents a ConnectedMessage. */
        class ConnectedMessage {

            /**
             * Constructs a new ConnectedMessage.
             * @param [properties] Properties to set
             */
            constructor(properties?: DownstreamMessage.SystemMessage.ConnectedMessage.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** ConnectedMessage connectionId. */
            connectionId: string;

            /** ConnectedMessage userId. */
            userId: string;

            /** ConnectedMessage reconnectionToken. */
            reconnectionToken: string;

            /**
             * Creates a new ConnectedMessage instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ConnectedMessage instance
             */
            static create(properties: DownstreamMessage.SystemMessage.ConnectedMessage.$Shape): DownstreamMessage.SystemMessage.ConnectedMessage & DownstreamMessage.SystemMessage.ConnectedMessage.$Shape;
            static create(properties?: DownstreamMessage.SystemMessage.ConnectedMessage.$Properties): DownstreamMessage.SystemMessage.ConnectedMessage;

            /**
             * Encodes the specified ConnectedMessage message. Does not implicitly {@link DownstreamMessage.SystemMessage.ConnectedMessage.verify|verify} messages.
             * @param message ConnectedMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: DownstreamMessage.SystemMessage.ConnectedMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ConnectedMessage message, length delimited. Does not implicitly {@link DownstreamMessage.SystemMessage.ConnectedMessage.verify|verify} messages.
             * @param message ConnectedMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: DownstreamMessage.SystemMessage.ConnectedMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ConnectedMessage message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {DownstreamMessage.SystemMessage.ConnectedMessage & DownstreamMessage.SystemMessage.ConnectedMessage.$Shape} ConnectedMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DownstreamMessage.SystemMessage.ConnectedMessage & DownstreamMessage.SystemMessage.ConnectedMessage.$Shape;

            /**
             * Decodes a ConnectedMessage message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {DownstreamMessage.SystemMessage.ConnectedMessage & DownstreamMessage.SystemMessage.ConnectedMessage.$Shape} ConnectedMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DownstreamMessage.SystemMessage.ConnectedMessage & DownstreamMessage.SystemMessage.ConnectedMessage.$Shape;

            /**
             * Verifies a ConnectedMessage message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ConnectedMessage message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ConnectedMessage
             */
            static fromObject(object: { [k: string]: any }): DownstreamMessage.SystemMessage.ConnectedMessage;

            /**
             * Creates a plain object from a ConnectedMessage message. Also converts values to other types if specified.
             * @param message ConnectedMessage
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: DownstreamMessage.SystemMessage.ConnectedMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ConnectedMessage to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };

            /**
             * Gets the type url for ConnectedMessage
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace ConnectedMessage {

            /** Properties of a ConnectedMessage. */
            interface $Properties {

                /** ConnectedMessage connectionId */
                connectionId?: (string|null);

                /** ConnectedMessage userId */
                userId?: (string|null);

                /** ConnectedMessage reconnectionToken */
                reconnectionToken?: (string|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a ConnectedMessage. */
            type $Shape = DownstreamMessage.SystemMessage.ConnectedMessage.$Properties;
        }

        /**
         * Properties of a DisconnectedMessage.
         * @deprecated Use DownstreamMessage.SystemMessage.DisconnectedMessage.$Properties instead.
         */
        interface IDisconnectedMessage extends DownstreamMessage.SystemMessage.DisconnectedMessage.$Properties {
        }

        /** Represents a DisconnectedMessage. */
        class DisconnectedMessage {

            /**
             * Constructs a new DisconnectedMessage.
             * @param [properties] Properties to set
             */
            constructor(properties?: DownstreamMessage.SystemMessage.DisconnectedMessage.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** DisconnectedMessage reason. */
            reason: string;

            /**
             * Creates a new DisconnectedMessage instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DisconnectedMessage instance
             */
            static create(properties: DownstreamMessage.SystemMessage.DisconnectedMessage.$Shape): DownstreamMessage.SystemMessage.DisconnectedMessage & DownstreamMessage.SystemMessage.DisconnectedMessage.$Shape;
            static create(properties?: DownstreamMessage.SystemMessage.DisconnectedMessage.$Properties): DownstreamMessage.SystemMessage.DisconnectedMessage;

            /**
             * Encodes the specified DisconnectedMessage message. Does not implicitly {@link DownstreamMessage.SystemMessage.DisconnectedMessage.verify|verify} messages.
             * @param message DisconnectedMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: DownstreamMessage.SystemMessage.DisconnectedMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DisconnectedMessage message, length delimited. Does not implicitly {@link DownstreamMessage.SystemMessage.DisconnectedMessage.verify|verify} messages.
             * @param message DisconnectedMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: DownstreamMessage.SystemMessage.DisconnectedMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DisconnectedMessage message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {DownstreamMessage.SystemMessage.DisconnectedMessage & DownstreamMessage.SystemMessage.DisconnectedMessage.$Shape} DisconnectedMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DownstreamMessage.SystemMessage.DisconnectedMessage & DownstreamMessage.SystemMessage.DisconnectedMessage.$Shape;

            /**
             * Decodes a DisconnectedMessage message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {DownstreamMessage.SystemMessage.DisconnectedMessage & DownstreamMessage.SystemMessage.DisconnectedMessage.$Shape} DisconnectedMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DownstreamMessage.SystemMessage.DisconnectedMessage & DownstreamMessage.SystemMessage.DisconnectedMessage.$Shape;

            /**
             * Verifies a DisconnectedMessage message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DisconnectedMessage message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DisconnectedMessage
             */
            static fromObject(object: { [k: string]: any }): DownstreamMessage.SystemMessage.DisconnectedMessage;

            /**
             * Creates a plain object from a DisconnectedMessage message. Also converts values to other types if specified.
             * @param message DisconnectedMessage
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: DownstreamMessage.SystemMessage.DisconnectedMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DisconnectedMessage to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };

            /**
             * Gets the type url for DisconnectedMessage
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace DisconnectedMessage {

            /** Properties of a DisconnectedMessage. */
            interface $Properties {

                /** DisconnectedMessage reason */
                reason?: (string|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a DisconnectedMessage. */
            type $Shape = DownstreamMessage.SystemMessage.DisconnectedMessage.$Properties;
        }
    }
}

/**
 * Properties of a MessageData.
 * @deprecated Use MessageData.$Properties instead.
 */
export interface IMessageData extends MessageData.$Properties {
}

/** Represents a MessageData. */
export class MessageData {

    /**
     * Constructs a new MessageData.
     * @param [properties] Properties to set
     */
    constructor(properties?: MessageData.$Properties);

    /** Unknown fields preserved while decoding when enabled */
    $unknowns?: Uint8Array[];

    /** MessageData textData. */
    textData?: (string|null);

    /** MessageData binaryData. */
    binaryData?: (Uint8Array|null);

    /** MessageData protobufData. */
    protobufData?: (google.protobuf.Any.$Properties|null);

    /** MessageData jsonData. */
    jsonData?: (string|null);

    /** MessageData data. */
    data?: ("textData"|"binaryData"|"protobufData"|"jsonData");

    /**
     * Creates a new MessageData instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MessageData instance
     */
    static create(properties: MessageData.$Shape): MessageData & MessageData.$Shape;
    static create(properties?: MessageData.$Properties): MessageData;

    /**
     * Encodes the specified MessageData message. Does not implicitly {@link MessageData.verify|verify} messages.
     * @param message MessageData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encode(message: MessageData.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified MessageData message, length delimited. Does not implicitly {@link MessageData.verify|verify} messages.
     * @param message MessageData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    static encodeDelimited(message: MessageData.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a MessageData message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns {MessageData & MessageData.$Shape} MessageData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MessageData & MessageData.$Shape;

    /**
     * Decodes a MessageData message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns {MessageData & MessageData.$Shape} MessageData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MessageData & MessageData.$Shape;

    /**
     * Verifies a MessageData message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a MessageData message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MessageData
     */
    static fromObject(object: { [k: string]: any }): MessageData;

    /**
     * Creates a plain object from a MessageData message. Also converts values to other types if specified.
     * @param message MessageData
     * @param [options] Conversion options
     * @returns Plain object
     */
    static toObject(message: MessageData, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this MessageData to JSON.
     * @returns JSON object
     */
    toJSON(): { [k: string]: any };

    /**
     * Gets the type url for MessageData
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    static getTypeUrl(prefix?: string): string;
}

export namespace MessageData {

    /** Properties of a MessageData. */
    interface $Properties {

        /** MessageData textData */
        textData?: (string|null);

        /** MessageData binaryData */
        binaryData?: (Uint8Array|null);

        /** MessageData protobufData */
        protobufData?: (google.protobuf.Any.$Properties|null);

        /** MessageData jsonData */
        jsonData?: (string|null);

        /** MessageData data */
        data?: ("textData"|"binaryData"|"protobufData"|"jsonData");

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];
    }

    /** Narrowed shape of a MessageData. */
    type $Shape = {
      textData?: string|null;
      binaryData?: Uint8Array|null;
      protobufData?: google.protobuf.Any.$Shape|null;
      jsonData?: string|null;
      $unknowns?: Uint8Array[];
    } & (
      ({ data?: undefined; textData?: null; binaryData?: null; protobufData?: null; jsonData?: null }|{ data?: "textData"; textData: string; binaryData?: null; protobufData?: null; jsonData?: null }|{ data?: "binaryData"; textData?: null; binaryData: Uint8Array; protobufData?: null; jsonData?: null }|{ data?: "protobufData"; textData?: null; binaryData?: null; protobufData: google.protobuf.Any.$Shape; jsonData?: null }|{ data?: "jsonData"; textData?: null; binaryData?: null; protobufData?: null; jsonData: string })
    );
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /**
         * Properties of an Any.
         * @deprecated Use google.protobuf.Any.$Properties instead.
         */
        interface IAny extends google.protobuf.Any.$Properties {
        }

        /** Represents an Any. */
        class Any {

            /**
             * Constructs a new Any.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.Any.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** Any type_url. */
            type_url: string;

            /** Any value. */
            value: Uint8Array;

            /**
             * Creates a new Any instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Any instance
             */
            static create(properties: google.protobuf.Any.$Shape): google.protobuf.Any & google.protobuf.Any.$Shape;
            static create(properties?: google.protobuf.Any.$Properties): google.protobuf.Any;

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: google.protobuf.Any.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: google.protobuf.Any.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {google.protobuf.Any & google.protobuf.Any.$Shape} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Any & google.protobuf.Any.$Shape;

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {google.protobuf.Any & google.protobuf.Any.$Shape} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Any & google.protobuf.Any.$Shape;

            /**
             * Verifies an Any message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Any
             */
            static fromObject(object: { [k: string]: any }): google.protobuf.Any;

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @param message Any
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: google.protobuf.Any, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Any to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };

            /**
             * Gets the type url for Any
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace Any {

            /** Properties of an Any. */
            interface $Properties {

                /** Any type_url */
                type_url?: (string|null);

                /** Any value */
                value?: (Uint8Array|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of an Any. */
            type $Shape = google.protobuf.Any.$Properties;
        }
    }
}
