import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import express from 'express';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();

  // Hash
  const crypto = require('crypto');
  const sha256 = crypto.createHash('sha256');

  // Storages
  const cookieParser = require('cookie-parser');
  const expressSession = require('express-session');
  
  var session = {
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  };

  const jwt = require('jsonwebtoken');
  const mysql = require('mysql2');
  const cors = require('cors');

  server.use(cors());
  server.use(express.json());
  server.use(cookieParser());
  server.use(expressSession(session));

  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dashboard-byt',
  });

  db.connect((error: string) => {
    if (error) {
      throw error;
    }
  });

  server.post('/api/user:edit', (req, res) => {
    const { fieldUsername, fieldPassword, fieldWebsite } = req.body;

    let query = `UPDATE user SET`;
    let queryParams = [];

    if(fieldUsername) queryParams.push(`username = "${fieldUsername}"`)
    if(fieldPassword) queryParams.push(`password = "${fieldPassword}"`);
    if(fieldWebsite) queryParams.push(`website = "${fieldWebsite}"`);

    if(queryParams.length > 0) {
      query += ` ${queryParams.join(', ')}`;
      query += ` WHERE id_user = 1`;

      db.query(query, async (err: string) => {
        if (err) throw err;

        res.status(200).send({ success: true });
      });
    } else {
      res.status(400).send({ success: false });
    }  
  });

  server.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT id_user, username, password, salt FROM user WHERE username = "${username}"`;

    db.query(query, async (err: string, data: [{ username: string, password: string, salt: string}]) => {
      if (err) throw err;

      if (data.length > 0) {
        const storedPasswordHash = data[0].password;
        const salt = data[0].salt;
        const hashedPassword = crypto.createHash('sha256').update(password + salt).digest('hex');
        
        if (storedPasswordHash === hashedPassword) {
          res.status(200).cookie('username', 129873724, { maxAge: 900000, httpOnly: true }).send({ success: true });
        } else {
          res.status(200).send({ success: false });
        }
      } else {
        res.status(200).send({ success: false });
      }
    });
  });

  server.post('/api/auth/signin', (req, res) => {
    const { username, password } = req.body;

    const randomBytes = crypto.randomBytes(32);
    const salt = randomBytes.toString('hex');
    sha256.update(password + salt);
    const hashedPassword = sha256.digest('hex');

    const query = `INSERT INTO user(username, password, salt) VALUES("${username}", "${hashedPassword}", "${salt}")`;

    db.query(query, async (err: string) => {
      if (err) throw err;

      res.status(200).send({ success: true });
    });
  });

  server.post('/api/auth/token', (req, res) => {});

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(browserDistFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4005;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
