import { opine } from "https://deno.land/x/opine@0.20.2/mod.ts";
import { Persistence } from "https://deno.land/x/persistence/persistence.ts"
import { Sender } from "./sender.ts"
import { port, telegramBotToken, pathToCert, pathToCertKey, apiKey, baseURL } from './.env.ts'
import { ChatHandler } from "./chat-handler.ts";

export class UIServer {

    private static pathToSendMessageUIHTML = `${Deno.cwd()}/send-message-ui.html`
    private static pathToChatHandlingUIHTML = `${Deno.cwd()}/chat-handling-ui.html`
    private static counterOfFailingTrials = 0

    public static serve() {
        const app = opine();

        const authorizationMiddleware = function (req: any, res: any, next: any) {
            if (req.query.apiKey === apiKey && UIServer.counterOfFailingTrials < 10){
                next();
            } else {
                UIServer.counterOfFailingTrials += 1
                res.send('out of scope')
            }
        };

        app.get('/', authorizationMiddleware, async (req: any, res: any) => {
                const html = (await Persistence.readFromLocalFile(UIServer.pathToSendMessageUIHTML))
                    .replace('secret', req.query.apiKey)
                    .replace('theFancyBaseURL', baseURL)
                res.send(html);
        });

        app.get('/chatHandling', authorizationMiddleware, async (req: any, res: any) => {
                const html = (await Persistence.readFromLocalFile(UIServer.pathToChatHandlingUIHTML))
                    .replace('secret', req.query.apiKey)
                    .replace('theFancyBaseURL', baseURL)
                res.send(html);
        });

        app.get('/sendMessage/chatId/:chatId/textMessage/:textMessage', authorizationMiddleware, async (req: any, res: any) => {
                await Sender.send(telegramBotToken, req.params.chatId, req.params.textMessage)
                res.send('sent successfully');
        });

        app.get('/exportChatInviteLink/chatId/:chatId', authorizationMiddleware, async (req: any, res: any) => {
                const result =  await ChatHandler.exportChatInviteLink(telegramBotToken, req.params.chatId)
                res.send(result);
        });

        if (port.toString().includes('443')) {
            const httpsOptions = {
                port,
                certFile: pathToCert,
                keyFile: pathToCertKey,
            }
            app.listen(httpsOptions)
        } else {
            app.listen(port)
        }

        Sender.startResetSecurityCounterInterval()
        UIServer.startResetSecurityCounterInterval()
    }

    public static startResetSecurityCounterInterval() {
        setInterval(() => {
            UIServer.counterOfFailingTrials = 0
        }, 1000 * 60 * 60)
    }
}

UIServer.serve()

