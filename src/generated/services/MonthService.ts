/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MonthRes } from '../models/MonthRes';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class MonthService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns MonthRes Array of data points
     * @throws ApiError
     */
    public getMonthData(): CancelablePromise<Array<MonthRes>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/data/month',
        });
    }
}
