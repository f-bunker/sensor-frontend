/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IdRes } from '../models/IdRes';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class IdService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns IdRes Array of data points
     * @throws ApiError
     */
    public getIds(): CancelablePromise<IdRes> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/data/id',
        });
    }
}
