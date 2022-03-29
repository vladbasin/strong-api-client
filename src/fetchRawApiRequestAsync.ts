import { Result } from '@vladbasin/ts-result';
import { Maybe } from '@vladbasin/ts-types';
import { RawApiResponseType } from '@vladbasin/strong-api-mapping';
import { ApiResponsePayloadType, useJsonDatesFormat } from '@vladbasin/strong-api-middleware';
import { FetchRawApiRequestOptionsType, FetchRawResponseType } from './types';
import { prepareFetch } from '.';

export const fetchRawApiRequestAsync = <TDataResponsePayload, TErrorResponsePayload>(
    options: FetchRawApiRequestOptionsType
): Result<FetchRawResponseType<TDataResponsePayload, TErrorResponsePayload>> => {
    if (options.json?.parseDates === true) {
        useJsonDatesFormat(options.json?.datesFormat);
    }

    let statusCode = 0;

    const headers: Record<string, Maybe<string>> = {};
    const multiValueHeaders: Record<string, Maybe<string[]>> = {};

    return Result.FromPromise(prepareFetch(options))
        .onSuccess(response => {
            statusCode = response.status;

            response.headers.forEach((value, name) => {
                const values = value.split(',').map(t => t.trim());

                if (values.length > 1) {
                    multiValueHeaders[name] = values;
                } else {
                    headers[name] = value;
                }
            });

            return response.json();
        })
        .onSuccess(
            (
                payload: ApiResponsePayloadType<TDataResponsePayload, TErrorResponsePayload>
            ): FetchRawResponseType<TDataResponsePayload, TErrorResponsePayload> => {
                const rawApiResponse: RawApiResponseType = {
                    body: JSON.stringify(payload?.data || payload?.error || {}),
                    headers,
                    multiValueHeaders,
                };

                return {
                    payload,
                    statusCode,
                    rawApiResponse,
                };
            }
        );
};
