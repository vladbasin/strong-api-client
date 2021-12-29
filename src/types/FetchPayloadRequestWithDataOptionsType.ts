import { HttpRequestMethods } from '@vladbasin/strong-api-constants';
import { ErrorPayloadHandlerType, ResponseElementType } from '.';

export type FetchPayloadRequestWithDataOptionsType<TResponseDataPayload, TResponseErrorPayload> = {
    request: {
        url: string;
        method: HttpRequestMethods;
        payload: unknown;
    };
    response: {
        data: ResponseElementType<TResponseDataPayload>;
        error?: ErrorPayloadHandlerType<TResponseErrorPayload>;
    };
};
