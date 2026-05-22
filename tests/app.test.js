const request = require('supertest');
const app = require('../src/app');

describe('AFL Training Tracker API', () => {

  test('GET /health should return API status', async () => {
    const response = await request(app).get('/health');

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('OK');
  });

  test('GET /sessions should return sessions array', async () => {
    const response = await request(app).get('/sessions');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /sessions should create new session', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        title: 'Fitness Session',
        date: '2026-06-15',
        attendance: 20
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe('Fitness Session');
  });

});