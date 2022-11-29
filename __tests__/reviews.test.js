const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  password: '12345',
};
describe('delete test', () => {
  const registerAndLogin = async () => {
    const agent = request.agent(app);
    const user = await UserService.create(mockUser);
    await agent
      .post('/api/v1/users/sessions')
      .send({ email: mockUser.email, password: mockUser.password });
    return [agent, user];
  };

  it('/api/v1/reviews/1 should delete a review', async () => {
    const [agent] = await registerAndLogin();
    const resp = await agent.delete('/api/v1/reviews/1');
    expect(resp.status).toBe(204);

    const getResp = await request(app).get('/api/v1/reviews/1');
    expect(getResp.status).toBe(404);
  });
});
