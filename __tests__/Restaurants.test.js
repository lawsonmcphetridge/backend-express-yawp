const app = require("../lib/app");
const { request } = require("../lib/app");
const pool = require("../lib/utils/pool");


describe('rest routes', () => {
    beforeEach(() => {
        return setup(pool);
    });
    
    
    it('/api/v1/restaurants shows a list of restaurants', async () => {
        const resp = await request(app).get('/api/v1/restaurants');
        expect(resp.body).toMatchInlineSnapshot();
    })
    
    
    
    
    
    
    
    afterAll(() => {
        pool.end();
    });
})