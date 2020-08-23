import { Request } from 'https://deno.land/x/request@1.1.0/request.ts'
import * as log from "https://deno.land/std/log/mod.ts";

export class ChatHandler {

    public static async exportChatInviteLink(token: string, chatId: number): Promise<any> {
        log.info(`exporting chat invite link for ${chatId}`)
        await Request.get(`https://api.telegram.org/bot${token}/exportChatInviteLink?chat_id=${chatId}`)
        const getChatResult = await Request.get(`https://api.telegram.org/bot${token}/getChat?chat_id=${chatId}`)

        log.warning(`getChatResult: ${JSON.stringify(getChatResult)}`)

        return {getChatResult}
    }

}