import { expect } from '@jest/globals';
import nock from 'nock';
import axios, { AxiosRequestConfig } from 'axios';
import { take } from 'rxjs';

import { Api } from 'common';

const DOMAIN = 'http://localhost:3000';

describe('Axios rxjs', () => {
  const config: AxiosRequestConfig = {
    baseURL: 'http://localhost:4000',
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  it('Init class with /no config and reConstructor', async () => {
    const axiosNotConfig = new Api();
    const axiosConfig = new Api(config);
    const axiosReConstructor = new Api().reConstructor(
      axios.create({ ...config, baseURL: 'http://localhost:5000' }),
    );

    expect(axiosNotConfig).not.toBeNull();
    expect(axiosConfig).not.toBeNull();
    expect(axiosReConstructor).not.toBeNull();
  });

  it('Init class with /no config', async () => {
    const axiosNotConfig = new Api();
    const axiosConfig = new Api(config);

    expect(axiosNotConfig).not.toBeNull();
    expect(axiosConfig).not.toBeNull();
  });

  it('GET method health check with api axios static', async () => {
    const healthResponse = {
      status: 'success',
      statusCode: 200,
      mgs: 'live',
    };
    const pathHealth = `/live`;

    const getMethod = nock(DOMAIN);
    const healthMock = getMethod.get(pathHealth).reply(200, healthResponse, {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    });

    const res = await new Api().axios.get(`${DOMAIN}${pathHealth}`);

    healthMock.done();
    expect(res.status).toEqual(200);
    expect(res.data).toEqual(healthResponse);
  });

  it('Get method health check', (done) => {
    const healthResponse = {
      status: 'success',
      statusCode: 200,
      mgs: 'live',
    };
    const pathHealth = `/live`;

    const getMethod = nock(DOMAIN);
    const healthMock = getMethod.get(pathHealth).reply(200, healthResponse, {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    });

    new Api()
      .get('/live')
      .pipe(take(1))
      .subscribe((r) => {
        expect(r).toEqual(healthResponse);
        healthMock.done();
        done();
      });
  });

  it('PUT method check', (done) => {
    const response = {
      status: 'success',
      statusCode: 200,
      mgs: 'ok',
    };
    const pathHealth = `/user`;

    const putMethod = nock(DOMAIN)
      .persist()
      .intercept('/user', 'OPTIONS')
      .reply(
        200,
        {},
        {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application:json',
        },
      );

    const mock = putMethod.put(pathHealth).reply(200, response, {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    });

    new Api()
      .put(`${DOMAIN}${pathHealth}`, {})
      .pipe(take(1))
      .subscribe((r) => {
        expect(r).toEqual(response);
        mock.done();
        done();
      });
  });

  it('POST method check', (done) => {
    const response = {
      status: 'success',
      statusCode: 200,
      mgs: 'ok',
    };
    const path = `/user`;

    const method = nock(DOMAIN);

    const mock = method.post(path).reply(200, response, {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    });

    new Api()
      .post(`${DOMAIN}${path}`, {})
      .pipe(take(1))
      .subscribe((r) => {
        expect(r).toEqual(response);
        mock.done();
        done();
      });
  });

  it('PATCH method check', (done) => {
    const response = {
      status: 'success',
      statusCode: 200,
      mgs: 'ok',
    };
    const path = `/user`;

    const method = nock(DOMAIN);

    const mock = method.patch(path).reply(200, response, {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    });

    new Api()
      .patch(`${DOMAIN}${path}`, {})
      .pipe(take(1))
      .subscribe((r) => {
        expect(r).toEqual(response);
        mock.done();
        done();
      });
  });

  it('DELETE method check', (done) => {
    const response = {
      status: 'success',
      statusCode: 200,
      mgs: 'ok',
    };
    const pathHealth = `/user`;

    const putMethod = nock(DOMAIN);

    const mock = putMethod.delete(pathHealth).reply(200, response, {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    });

    new Api()
      .deleteR(`${DOMAIN}${pathHealth}`)
      .pipe(take(1))
      .subscribe((r) => {
        expect(r).toEqual(response);
        mock.done();
        done();
      });
  });
});
