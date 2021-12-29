import { RawApiResponseType } from '@vladbasin/strong-api-mapping';
import { ApiResponseType } from '@vladbasin/strong-api-middleware';

export type FetchRawResponseType<TDataResponsePayload, TErrorResponsePayload> = ApiResponseType<
    TDataResponsePayload,
    TErrorResponsePayload
> & {
    rawApiResponse: RawApiResponseType;
};
