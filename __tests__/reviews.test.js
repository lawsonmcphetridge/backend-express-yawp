const request = require('supertest');
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

describe('delete test', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('admin can delete can delete posts', async () => {
    const agent = request.agent(app);
    await UserService.create({
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin',
      password: 'password',
    });
    await agent.post('/api/v1/users/sessions').send({
      email: 'admin',
      password: 'password',
    });
    const resp = await agent.delete('/api/v1/reviews/1');
    expect(resp.status).toBe(204);

    const getResp = await request(app).get('/api/v1/reviews/1');
    expect(getResp.status).toBe(404);
  });

  it('users can delete can delete their posts', async () => {
    const agent = request.agent(app);
    await UserService.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: '12345',
    });

    await agent.post('/api/v1/users/sessions').send({
      email: 'test@example.com',
      password: '12345',
    });
    

    await agent
      .post('/api/v1/restaurants/1/reviews')
      .send({ stars: 2, detail: 'cool review' });
    const resp = await agent.delete('/api/v1/reviews/4');
    expect(resp.status).toBe(204);

    const getResp = await request(app).get('/api/v1/reviews/1');
    expect(getResp.status).toBe(404);
  });


  afterAll(() => {
    pool.end();
  });
});
