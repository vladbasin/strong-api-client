import { Maybe, MaybeNullable } from '@vladbasin/ts-types';

export type FetchResponseType = {
    statusCode: number;
    headers?: MaybeNullable<Record<string, Maybe<string>>>;
    multiValueHeaders?: MaybeNullable<Record<string, Maybe<string[]>>>;
};
