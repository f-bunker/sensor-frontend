/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TimeRes } from '../models/TimeRes';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class HourService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @param sensorId
     * @returns TimeRes Array of data points
     * @throws ApiError
     */
    public getHourData(
        sensorId: string,
    ): CancelablePromise<Array<TimeRes>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/data/hour',
            query: {
                'sensor_id': sensorId,
            },
        });
    }
}
