import { opine } from "https://deno.land/x/opine@0.20.2/mod.ts";
import { Persistence } from "https://deno.land/x/persistence/persistence.ts"
import { Sender } from "./sender.ts"
import { port, telegramBotToken, pathToCert, pathToCertKey, apiKey, baseURL } from './.env.ts'

export class UIServer {

    private static pathToUIHTML = `${Deno.cwd()}/ui.html`

    public static serve() {
        const app = opine();

        app.get('/apiKey/:apiKey', async (req: any, res: any) => {
            if (req.params.apiKey === apiKey) {
                const html = (await Persistence.readFromLocalFile(UIServer.pathToUIHTML))
                    .replace('secret', req.params.apiKey)
                    .replace('theFancyBaseURL', baseURL)
                res.send(html);
            } else {
                res.send('what kind of api key shall this be?');
            }
        });

        app.get('/sendMessage/chatId/:chatId/textMessage/:textMessage/apiKey/:apiKey', async (req: any, res: any) => {
            if (req.params.apiKey === apiKey) {
                await Sender.send(telegramBotToken, req.params.chatId, req.params.textMessage)
                res.send('sent successfully');
            } else {
                res.send('what kind of api key shall this be?');
            }
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
    }
}

UIServer.serve()

