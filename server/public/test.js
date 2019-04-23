const fetch = require('isomorphic-unfetch');
const { app, localStorage, port } = require('../index.js');

let server;
describe('API', () => {
  // Wait for server to start up before running tests.
  beforeAll(() => new Promise((res) => {server = app.listen(port, res);}));

  // We use bob-the-user as the user's name / id in this test suite.
  // This hook cleans up leftover data.
  afterAll(() => {
    localStorage.removeItem('bob-the-user');
    return server.close();
  });

  describe('user/:id', () => {
    it('Requests with missing or invalid or user id should 404.', () => {
      localStorage.removeItem('bob-the-user');
      return Promise.all([
        fetch(`http://localhost:${port}/user/`, { method: 'POST' })
          .then((res) => {
            expect(res.status).toBe(404);
          }),

        fetch(`http://localhost:${port}/user/`)
          .then((res) => {
            expect(res.status).toBe(404);
          }),

        fetch(`http://localhost:${port}/user/`, { method: 'DELETE' })
          .then((res) => {
            expect(res.status).toBe(404);
          }),

        fetch(`http://localhost:${port}/user/bob-the-user`)
          .then((res) => {
            expect(res.status).toBe(404);
          }),

        fetch(`http://localhost:${port}/user/bob-the-user`, { method: 'DELETE' })
          .then((res) => {
            expect(res.status).toBe(404);
          }),
      ]);
    });

    it('POST, GET, and DELETE work as expected', () => {
      localStorage.removeItem('bob-the-user');

      // Get user
      return fetch(`http://localhost:${port}/user/bob-the-user`)
        .then((res) => {
          expect(res.status).toBe(404);
        })

        // Create user
        .then(() =>
          fetch(`http://localhost:${port}/user/bob-the-user`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ settings: { resultCount: 20 } }),
          })
            .then((res) => {
              expect(res.status).toBe(200);
            })
        )

        // Get user
        .then(() => fetch(`http://localhost:${port}/user/bob-the-user`))
        .then((res) => {
          expect(res.status).toBe(200);
          return res.json();
        })
        .then((json) => {
          expect(json).toEqual({
            id: 'bob-the-user',
            settings: { resultCount: 20 },
            favorites: [],
          });
        })

        // Delete user
        .then(() => fetch(`http://localhost:${port}/user/bob-the-user`, { method: 'DELETE' })
          .then((res) => {
            expect(res.status).toBe(200);
          })
        )

        .then(() => fetch(`http://localhost:${port}/user/bob-the-user`))
        .then((res) => {
          expect(res.status).toBe(404);
        });
    });
  });

  describe('user/:id/favorites', () => {
    it('Add & Remove favorite', () => {
      localStorage.removeItem('bob-the-user');
      // Create user
      return fetch(`http://localhost:${port}/user/bob-the-user`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ settings: { resultCount: 20 } }),
      })
        .then((res) => {
          expect(res.status).toBe(200);
        })
        .then(() => fetch(`http://localhost:${port}/user/bob-the-user/favorites`, {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            operation: 'add',
            values: [
              'test1',
              'test1',
              'test2',
              { testing: '123' },
              { testing: '123' },
            ],
          }),
        })
          .then((res) => {
            expect(res.status).toBe(200);
          })
        )
        .then(() => fetch(`http://localhost:${port}/user/bob-the-user`))
        .then((res) => {
          expect(res.status).toBe(200);
          return res.json();
        })
        .then((json) => {
          expect(json).toEqual({
            id: 'bob-the-user',
            settings: { resultCount: 20 },
            favorites: ['test1', 'test2', { testing: '123' }],
          });
        })
        .then(() => fetch(`http://localhost:${port}/user/bob-the-user/favorites`, {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            operation: 'remove',
            values: [
              'test1',
              { testing: '123' },
            ],
          }),
        }))
        .then(() => fetch(`http://localhost:${port}/user/bob-the-user`))
        .then((res) => {
          expect(res.status).toBe(200);
          return res.json();
        })
        .then((json) => {
          expect(json).toEqual({
            id: 'bob-the-user',
            settings: { resultCount: 20 },
            favorites: ['test2'],
          });
        });
    });
  });

  describe('user/:id/settings', () => {
    it('should allow partial setting updates', () => {
      localStorage.removeItem('bob-the-user');
      // Create user
      return fetch(`http://localhost:${port}/user/bob-the-user`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ settings: { resultCount: 20 } }),
      })
        .then((res) => {
          expect(res.status).toBe(200);
        })
        .then(() => fetch(`http://localhost:${port}/user/bob-the-user/settings`, {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            operation: 'update',
            payload: {
              resultCount: 25,
              contactInfo: {
                email: 'hi@gmail.com',
              },
            },
          }),
        }))
        .then((res) => {
          expect(res.status).toBe(200);
        })
        .then(() => fetch(`http://localhost:${port}/user/bob-the-user`))
        .then((res) => {
          expect(res.status).toBe(200);
          return res.json();
        })
        .then((json) => {
          expect(json).toEqual({
            favorites: [],
            id: 'bob-the-user',
            settings: {
              resultCount: 25,
              contactInfo: {
                email: 'hi@gmail.com',
              },
            },
          });
        })
        .then(() => fetch(`http://localhost:${port}/user/bob-the-user/settings`, {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            operation: 'remove',
            payload: {
              contactInfo: {
                email: 'hi@gmail.com',
              },
            },
          }),
        }))
        .then((res) => {
          expect(res.status).toBe(200);
        })
        .then(() => fetch(`http://localhost:${port}/user/bob-the-user`))
        .then((res) => {
          expect(res.status).toBe(200);
          return res.json();
        })
        .then((json) => {
          expect(json).toEqual({
            favorites: [],
            id: 'bob-the-user',
            settings: {
              resultCount: 25,
            },
          });
        });
    });
  });
});
