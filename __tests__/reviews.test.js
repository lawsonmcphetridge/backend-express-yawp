const { request } = require('../lib/app');
const app = require('../lib/app');

describe('delete test', async () => {
  it('/api/v1/reviews should delete a revew', async () => {
    const resp = await request(app).delete('/api/v1/reviews/1');
    expect(resp.status).toBe(204);

    const getResp = await request(app).get('/api/v1/reviews/1');
    expect(resp.status).toBe(404);
  });
});
