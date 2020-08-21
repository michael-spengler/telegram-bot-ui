import { Request } from 'https://deno.land/x/request@1.1.0/request.ts'
import * as log from "https://deno.land/std/log/mod.ts";
import { limitPerHour } from "./.env.ts"

export class Sender {

    private static counter = 0

    public static async send(token: string, chatId: number, text: string) {
        Sender.counter += 1
        if (Sender.counter < limitPerHour){
            log.info(`sending message to chatId ${chatId}: ${text}`)
            await Request.get(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}`)
        } else {
            log.warning(`limit of messages per hour reached - counter is at ${Sender.counter} - limit is at ${limitPerHour}.`)
        }
    }

    public static startProtectionInterval() {
        setInterval(() => {
            log.info(`resetting counter from ${Sender.counter} to 0`)
            Sender.counter = 0
        }, 1000 * 60 * 60)
    }
}

