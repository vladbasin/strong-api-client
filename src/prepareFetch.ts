import fetch from 'node-fetch';
import { isNil } from 'lodash';
import { URL } from 'url';
import { FetchRawApiRequestOptionsType, reduceRecord } from '.';

export const prepareFetch = (options: FetchRawApiRequestOptionsType) => {
    const { url, request, method } = options;

    // path
    let preparedUrl = url;
    preparedUrl = reduceRecord(
        request.pathParams,
        (accum, key, value) => accum.replace(`{${key}}`, encodeURIComponent(value)),
        preparedUrl
    );

    // query
    const builtUrl = new URL(preparedUrl);
    reduceRecord<string, URL>(
        request.queryParams,
        (accum, key, value) => {
            accum.searchParams.append(key, value);
            return accum;
        },
        builtUrl
    );
    reduceRecord<string[], URL>(
        request.multiValueQueryParams,
        (accum, key, values) => {
            values.forEach(value => accum.searchParams.append(key, value));
            return accum;
        },
        builtUrl
    );

    // headers
    const headers = reduceRecord<string, Record<string, string>>(
        request.headers,
        (accum, key, value) => {
            // eslint-disable-next-line no-param-reassign
            accum[key] = value;
            return accum;
        },
        {}
    );
    reduceRecord<string[], Record<string, string>>(
        request.multiValueHeaders,
        (accum, key, values) => {
            // eslint-disable-next-line no-param-reassign
            accum[key] = values.join(',');
            return accum;
        },
        headers
    );

    return fetch(builtUrl.toString(), {
        headers,
        body: isNil(request.body) ? undefined : request.body,
        method,
    });
};
