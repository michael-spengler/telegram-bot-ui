import { Request } from 'https://deno.land/x/request@1.1.0/request.ts'
import * as log from "https://deno.land/std/log/mod.ts";

export class Sender {

    public static async send(token: string, chatId: number, text: string) {
        log.info(`sending message to chatId ${chatId}: ${text}`)
        await Request.get(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}`)
    }
}

