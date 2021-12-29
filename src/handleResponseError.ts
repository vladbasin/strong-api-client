import { isNil } from 'lodash';
import { Maybe } from '@vladbasin/ts-types';
import { CommonErrorCodes } from '@vladbasin/strong-api-models';
import { ErrorResponsePayload } from '@vladbasin/strong-api-middleware';
import { FetchError } from './models';

export const handleResponseError = (statusCode: number, payload: Maybe<ErrorResponsePayload>) => {
    return isNil(payload)
        ? new FetchError(statusCode, CommonErrorCodes.unknown, '')
        : new FetchError(statusCode, payload.body.code, payload.body.message, payload.body.errors, payload.body.stack);
};
