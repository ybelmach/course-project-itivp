import request from 'supertest';
import { app } from '../src/app';

describe('GET /api/health', () => {
  it('responds with ok', async () => {
    const res = await request(app).get('/api/health');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('unknown route', () => {
  it('responds with 404 and a JSON message', async () => {
    const res = await request(app).get('/api/does-not-exist');

    expect(res.status).toBe(404);
    expect(res.body.message).toContain('not found');
  });
});
