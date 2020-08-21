import { opine } from "https://deno.land/x/opine@0.20.2/mod.ts";
// import * as log from "https://deno.land/std/log/mod.ts";
import { Persistence } from "https://deno.land/x/persistence/persistence.ts"
import { Sender } from "./sender.ts"
import { port, telegramBotToken, pathToCert, pathToCertKey } from './.env.ts'

export class UIServer {

    private static pathToUIHTML = `${Deno.cwd()}/ui.html`

    public static serve() {
        const app = opine();

        app.get('/', async (req: any, res: any) => {
            const html = await Persistence.readFromLocalFile(UIServer.pathToUIHTML)
            res.send(html);
        });

        app.get('/sendMessage/chatId/:chatId/textMessage/:textMessage', async (req: any, res: any) => {
            await Sender.send(telegramBotToken, req.params.chatId, req.params.textMessage)
            res.send('sent successfully');
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

