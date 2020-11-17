const request = require('supertest');
const express = require('express');
const Profiles = require('../../api/profile/profileModel');
const profileRouter = require('../../api/profile/profileRouter');
const Watchlist = require('../../api/watchlist/watchlist-bridgesModel');
const watchlistRouter = require('../../api/watchlist/watchlistRouter');
const server = express();
server.use(express.json());

jest.mock('../../api/profile/profileModel');
jest.mock('../../api/watchlist/watchlist-bridgesModel');
// mock the auth middleware completely
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

describe('profiles router endpoints', () => {
  beforeAll(() => {
    // This is the module/route being tested
    server.use(['/profile', '/profiles'], profileRouter);
    server.use('/watchlist', watchlistRouter);
    jest.clearAllMocks();
  });

  describe('GET Test001 User /profiles/:id', () => {
    it('should return 200 when profile found', async () => {
      Profiles.findById.mockResolvedValue({
        id: '00ulthapbErVUwVJy4x6',
        name: 'Test001 User',
        email: 'llama001@maildrop.cc',
      });
      const res = await request(server).get('/profiles/00ulthapbErVUwVJy4x6');

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Test001 User');
      expect(Profiles.findById.mock.calls.length).toBe(1);
    });
  });
});

describe('Test watchlist endpoints', () => {
  test('add a watchlist', () => {
    return request(server)
      .post('/watchlist/00ulthapbErVUwVJy4x6')
      .send({
        title: 'Test title',
        user: '00ulthapbErVUwVJy4x6',
        notes: 'Testing notes',
        locations: '1014107',
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  test('get watchlist', () => {
    return request(server)
      .post('/watchlist/00ulthapbErVUwVJy4x6')
      .send({
        title: 'Test title',
        user: '00ulthapbErVUwVJy4x6',
        notes: 'Testing notes',
        locations: '1014107',
      })
      .then(() => {
        request(server)
          .get('/watchlist/00ulthapbErVUwVJy4x6')
          .then((res) => {
            expect(res.status).toBe(200);
          });
      });
  });

  test('update a watchlist', () => {
    return request(server)
      .post('/watchlist/00ulthapbErVUwVJy4x6')
      .send({
        title: 'Test update title',
        user: '00ulthapbErVUwVJy4x6',
        notes: 'Update testing notes',
        locations: '1014107',
      })
      .then(() => {
        request(server)
          .put('/watchlist/00ulthapbErVUwVJy4x6')
          .send({ notes: 'Updating notes endpoint test in jest' })
          .then((res) => {
            console.log(res.status, res.body);
            expect(res.status).toBe(200);
          });
      });
  });

  test.skip('delete a watchlist', () => {
    return request(server)
      .post('/watchlist/00ulthapbErVUwVJy4x6')
      .send({
        title: 'Test: Delete this',
        user: '00ulthapbErVUwVJy4x6',
        notes: 'This will be deleted',
        locations: '1014107',
      })
      .then(() => {
        request(server)
          .delete('/watchlist/00ulthapbErVUwVJy4x6')
          .then((res) => {
            expect(res.status).toBe(204);
          });
      });
  });
});
