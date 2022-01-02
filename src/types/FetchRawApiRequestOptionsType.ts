import { HttpRequestMethods } from '@vladbasin/strong-api-constants';
import { RawApiRequestType } from '@vladbasin/strong-api-mapping';

export type FetchRawApiRequestOptionsType = {
    url: string;
    method: HttpRequestMethods;
    request: RawApiRequestType;
    json?: {
        parseDates?: boolean;
        datesFormat?: string;
    };
};
