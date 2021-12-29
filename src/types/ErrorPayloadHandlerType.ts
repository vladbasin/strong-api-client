import { ResponseElementType } from '.';

export type ErrorPayloadHandlerType<TErrorPayload> = {
    element: ResponseElementType<TErrorPayload>;
    handler: (statusCode: number, payload: TErrorPayload) => Error;
};
