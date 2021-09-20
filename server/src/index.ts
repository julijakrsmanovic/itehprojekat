import * as cors from 'cors';
import * as express from "express";
import * as http from 'http';
import "reflect-metadata";
import * as io from 'socket.io';
import { createConnection, getRepository } from "typeorm";
import { User } from "./entity/User";
import * as session from "express-session";
import * as multer from 'multer';
import * as path from 'path';
import { Routes } from './routes';
import { renameFile, uplaodMiddleware } from './util';



createConnection().then(async connection => {

    // create express app
    const app = express();
    const server = http.createServer(app);
    const socket = new io.Server(server);

    app.use(cors({
        credentials: true,//protiv xss napada

        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        origin: 'http://localhost:3000'

    }));
    app.use(express.json());
    app.use(session({
        secret: 'adsfgdhtydadsfadfsafdsgafsjtiuyi',
        resave: false,

        saveUninitialized: false,
        cookie: {
            sameSite: 'none',
            secure: false,
            maxAge: 1000 * 60 * 10,
            httpOnly: true,
        }

    }))
    app.post('/login', async (req, res) => {
        const { email, password } = req.body;
        const users = await getRepository(User).find({
            where: {
                password,
                email
            }
        });
        if (users.length === 0) {
            res.status(400).send('User doesn\'t exist');
        } else {
            (req.session as any).user = users[0];
            req.session.save();
            res.json(users[0]);
        }

    })
    app.post('/register', async (req, res, next) => {
        const user = req.body as User;
        const users = await getRepository(User).find({
            where: {

                email: user.email
            }
        });
        if (users.length > 0) {
            res.status(400).send('User already exists');
        } else {
            next();
        }
    }, uplaodMiddleware, renameFile('image'), async (req, res) => {
        const user = req.body as User;
        const insertResult = await getRepository(User).insert(user);
        user.id = insertResult.identifiers[0].id;
        (req.session as any).user = user;
        req.session.save();
        res.json(user);
    })
    app.post('/logout', async (request: express.Request, response: express.Response) => {
        delete (request.session as any).user;
        request.session.destroy((err) => {
            if (err)
                response.sendStatus(500);
        })
        response.sendStatus(204);
    })

    app.get('/check', async (req, res) => {
        const user = (req.session as any).user;
        if (!user) {
            res.status(401).send('User is not logged in');
        } else {
            res.json(user);
        }
    })
    app.use((req, res, next) => {
        const user = (req.session as any).user;
        if (!user) {
            res.sendStatus(403);
        } else {
            next();
        }
    })

    app.use('/uploads', express.static('uploads'))
    Routes.forEach(route => {
        app[route.method](route.route, ...route.action);
    });
    server.listen(4000, () => {
        console.log("Express server has started on port 4000. ");
    });





}).catch(error => console.log(error));
