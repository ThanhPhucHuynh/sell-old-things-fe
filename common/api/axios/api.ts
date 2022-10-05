import axios, { AxiosRequestConfig, AxiosInstance, AxiosStatic } from 'axios';
import { defer, map, Observable } from 'rxjs';

import initialization from 'common/api/axios/setup';

import axiosRequestConfiguration from './config';

class Api {
  axiosInstance: AxiosInstance;

  /**
   *
   * This is a static axios.
   *
   * @example
   *```ts
   *axios.post('/user', {
   *    firstName: 'Fred',
   *    lastName: 'Corn'
   *  })
   *  .then(function (response) {
   *    console.log(response);
   *  })
   *```
   *
   * @see https://axios-http.com/
   * */
  axios: AxiosStatic = axios;

  constructor(c?: AxiosRequestConfig) {
    if (c) {
      this.axiosInstance = initialization(c);
      return;
    }
    this.axiosInstance = initialization(axiosRequestConfiguration);
  }

  reConstructor(a: AxiosInstance) {
    this.axiosInstance = a;
  }

  get = <T>(url: string, params?: object): Observable<T> =>
    defer(() => this.axiosInstance.get<T>(url, { params })).pipe(
      map((r) => r.data),
    );

  post = <T>(
    url: string,
    body: object,
    params?: object,
  ): Observable<T | void> =>
    defer(() => this.axiosInstance.post<T>(url, body, { params })).pipe(
      map((result) => result.data),
    );

  put = <T>(url: string, body: object, params?: object): Observable<T | void> =>
    defer(() => this.axiosInstance.put<T>(url, body, { params })).pipe(
      map((result) => result.data),
    );

  patch = <T>(
    url: string,
    body: object,
    params?: object,
  ): Observable<T | void> =>
    defer(() => this.axiosInstance.patch<T>(url, body, { params })).pipe(
      map((result) => result.data),
    );

  deleteR = <T>(url: string): Observable<T | void> =>
    defer(() => this.axiosInstance.delete(`${url}`)).pipe(
      map((result) => result.data),
    );
}

export default Api;
