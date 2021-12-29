import { Result } from '@vladbasin/ts-result';
import { isStatusCodeSuccess } from '@vladbasin/strong-api-constants';
import { mapPayloadToRawApiRequest } from '@vladbasin/strong-api-mapping';
import { chooseResponseErrorHandler, fetchRawApiRequestAsync } from '.';
import { FetchPayloadRequestOptionsType, FetchRawApiRequestOptionsType, FetchResponseType } from './types';

export const fetchPayloadRequestAsync = (options: FetchPayloadRequestOptionsType): Result<FetchResponseType> => {
    const rawOptions: FetchRawApiRequestOptionsType = {
        url: options.request.url,
        method: options.request.method,
        request: mapPayloadToRawApiRequest(options.request.payload),
    };

    return fetchRawApiRequestAsync(rawOptions).onSuccess(response => {
        return !isStatusCodeSuccess(response.statusCode)
            ? Result.FailWithError(chooseResponseErrorHandler(options?.response?.error, response))
            : Result.Ok<FetchResponseType>({
                  statusCode: response.statusCode,
                  headers: response.rawApiResponse.headers,
                  multiValueHeaders: response.rawApiResponse.multiValueHeaders,
              });
    });
};
