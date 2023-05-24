import request from 'supertest';
import {Express} from 'express-serve-static-core';

import app  from '../server';


describe('GET /hello', () => {
    it('should return 200 & phrase Hellow World', (done) => {
      request(app)
        .get(`/hello`)
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toEqual("Hello World");
          return done();
        });
    }) 
});