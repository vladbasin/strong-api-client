import { CodedError, InnerErrorType } from '@vladbasin/strong-api-models';

export class FetchError extends CodedError {
    constructor(
        public httpStatusCode: number,
        public code: string,
        public message: string,
        public errors: InnerErrorType[] = [],
        public stack = '',
        public details: Record<string, unknown> = {}
    ) {
        super(code, message, errors, stack, details);

        this.httpStatusCode = httpStatusCode;
    }
}
