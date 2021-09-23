import * as cors from 'cors';
import * as express from "express";
import * as https from 'https';
import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import { User } from "./entity/User";
import * as session from "express-session";
import { Routes } from './routes';
import * as fs from 'fs'
import { renameFile, uplaodMiddleware } from './util';



createConnection().then(async connection => {


    const app = express();
    const key = fs.readFileSync('./key.pem', 'utf8');
    const cert = fs.readFileSync('./cert.pem', 'utf8');



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
            secure: true,
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

        const insertResult = await getRepository(User).insert({ ...user, isAdmin: false });

        user.id = insertResult.identifiers[0].id;
        (req.session as any).user = user;
        req.session.save();
        console.log((req.session as any))
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
        console.log(user)
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

    app.use('/uploads', express.static('uploads', {
        extensions: ['jpg']
    }))

    Routes.forEach(route => {
        app[route.method](route.route, ...route.action);
    });



    const server = https.createServer({
        key: key,
        cert: cert,

    }, app)
    server.listen(4000, () => {
        console.log("Express server has started on port 4000. ");
    });





}).catch(error => console.log(error));
