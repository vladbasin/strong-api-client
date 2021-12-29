import { HttpRequestMethods } from '@vladbasin/strong-api-constants';
import { ErrorPayloadHandlerType } from '.';

export type FetchPayloadRequestOptionsType = {
    request: {
        url: string;
        method: HttpRequestMethods;
        payload: unknown;
    };
    response?: {
        error?: ErrorPayloadHandlerType<any>;
    };
};
