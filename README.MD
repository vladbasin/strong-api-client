# Strong API client

Share request/response models with your API consumers, so they don't need to repeat the same mapping & validation logic.

This is CLIENT library. See SERVER library: [@vladbasin/strong-api-middleware](https://github.com/vladbasin/strong-api-middleware)

## Installation

### npm

`npm install @vladbasin/strong-api-client @vladbasin/strong-api-middleware @vladbasin/strong-api-mapping @vladbasin/ts-result reflect-metadata joi`

### yarn

`yarn add @vladbasin/strong-api-client @vladbasin/strong-api-middleware @vladbasin/strong-api-mapping @vladbasin/ts-result reflect-metadata joi`

## Usage

1. Import `reflect-metadata` ONCE in your index file:

```typescript
import 'reflect-metadata';
```

2. Define Request model

```typescript
import { body, header, path, query } from '@vladbasin/strong-api-mapping';

export class RequestPayload {
    @path()
    public userId!: number;

    @path({ key: 'userId' })
    public id!: number;

    @query()
    public name!: string;

    @query()
    public isAdmin!: boolean;

    @query({ key: 'lastname' })
    public surname!: string;

    @query({ parser: String })
    public cars!: string[];

    @query({ parser: Number })
    public cash!: number[];

    @body()
    public details!: DetailsType;

    @header({ key: 'Content-Type' })
    public contentType!: string;

    @header({ key: 'X-Info', parser: String })
    public info!: string[];
}
```

3. Define Response model

```typescript
import { body } from '@vladbasin/strong-api-mapping';

export class ResponsePayload {
    @body()
    public user!: UserType;
}
```

4. Define validation rules with `Joi`

```typescript
export const RequestPayloadSchema = Joi.object<RequestPayload>({
    surname: Joi.string().min(10),
    cars: Joi.array().max(3),
    // other rules for field content...
});
```

5. Call `fetchPayloadRequestWithBodyAsync()` to execute a request:

```typescript
fetchWithBodyAsync({
        request: {
            url: 'http://your-backend/api/users/{userId}',
            method: HttpRequestMethods.Post,
            payload: assign(new RequestPayload(), { id: 12 }),
        },
        response: {
            // process success response (automapped to model instance by the library)
            data: {
                Model: ResponsePayload,
                schema: ResponsePayloadSchema,
            },
            // OPTIONAL: process error response with custom format (automapped to model instance by the library)
            error: {
                element: {
                    Model: ErrorPayload,
                    schema: ErrorPayloadSchema,
                },
                handler: (statusCode, errorPayload) => {
                    //return Error object based on arguments
                },
            },
        },
    })
    .onSuccess(({ user }: response) => { 
        // process response data model
    })
    .onFailureWithError(error => {
        // process error (see FetchError below)
    })
    .run();
```

By default this library creates `FetchError` when reponse fails. You can use it to process the data:

```typescript
class FetchError extends CodedError {
    constructor(
        public httpStatusCode: number,
        public code: string,
        public message: string,
        public errors: InnerErrorType[] = [],
        public stack = '',
        public details: Record<string, unknown> = {}
    )
}

type InnerErrorType = {
    code: string;
    message: string;
};
```
