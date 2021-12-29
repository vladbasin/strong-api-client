import 'reflect-metadata';
import { isNil } from 'lodash';
import { Result } from '@vladbasin/ts-result';
import { isStatusCodeSuccess } from '@vladbasin/strong-api-constants';
import { mapPayloadToRawApiRequest, mapRawApiResponseToPayload } from '@vladbasin/strong-api-mapping';
import { chooseResponseErrorHandler, fetchRawApiRequestAsync } from '.';
import { FetchDataPayloadType, FetchPayloadRequestWithDataOptionsType, FetchRawApiRequestOptionsType } from './types';

export const fetchPayloadRequestWithBodyAsync = <TDataPayload, TErrorPayload>(
    options: FetchPayloadRequestWithDataOptionsType<TDataPayload, TErrorPayload>
): Result<FetchDataPayloadType<TDataPayload>> => {
    const rawOptions: FetchRawApiRequestOptionsType = {
        url: options.request.url,
        method: options.request.method,
        request: mapPayloadToRawApiRequest(options.request.payload),
    };

    return fetchRawApiRequestAsync(rawOptions).onSuccess(response => {
        return !isStatusCodeSuccess(response.statusCode) || isNil(response.payload) || isNil(response.payload?.data)
            ? Result.FailWithError(chooseResponseErrorHandler(options.response.error, response))
            : Result.Ok<FetchDataPayloadType<TDataPayload>>({
                  statusCode: response.statusCode,
                  headers: response.rawApiResponse.headers,
                  multiValueHeaders: response.rawApiResponse.multiValueHeaders,
                  payload: mapRawApiResponseToPayload(
                      response.rawApiResponse,
                      options.response.data.Model,
                      options.response.data.schema
                  ),
              });
    });
};
