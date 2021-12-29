import { mapRawApiResponseToPayload } from '@vladbasin/strong-api-mapping';
import { ErrorResponsePayload, ErrorResponsePayloadSchema } from '@vladbasin/strong-api-middleware';
import { Maybe } from '@vladbasin/ts-types';
import { isNil } from 'lodash';
import { handleResponseError } from '.';
import { FetchRawResponseType, ErrorPayloadHandlerType } from './types';

export const chooseResponseErrorHandler = (
    options: Maybe<ErrorPayloadHandlerType<any>>,
    response: FetchRawResponseType<unknown, unknown>
) => {
    return isNil(options) || isNil(options?.element)
        ? handleResponseError(
              response.statusCode,
              mapRawApiResponseToPayload(response.rawApiResponse, ErrorResponsePayload, ErrorResponsePayloadSchema)
          )
        : options.handler(
              response.statusCode,
              mapRawApiResponseToPayload(response.rawApiResponse, options.element.Model, options.element.schema)
          );
};
