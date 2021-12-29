import { FetchResponseType } from '.';

export type FetchDataPayloadType<TPayload> = FetchResponseType & {
    payload: TPayload;
};
