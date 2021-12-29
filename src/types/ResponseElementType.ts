import { Newable } from '@vladbasin/strong-api-mapping';
import { ObjectSchema } from 'joi';

export type ResponseElementType<TPayload> = {
    Model: Newable<TPayload>;
    schema: ObjectSchema<TPayload>;
};
