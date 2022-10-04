# Telegram Bot UI Server

This code is published as a [Deno Module](https://deno.land/x/telegram_bot_ui).  


## Usage Example

```sh

deno run --allow-read --allow-net --allow-env bot-ui-server.ts

```

or via pm2

```sh

git clone https://github.com/michael-spengler/telegram-bot-ui.git
cd telegram-bot-ui
cp .env-example.ts .env.ts  # add your individual ingredients in .env.ts
pm2 start  --interpreter="deno" --interpreter-args="run --allow-read --allow-net --allow-env" bot-ui-server.ts

```

## Support my Open Source Contributions
Ethereum Wallet: 
0x9E972a43B3B8D68cD70930697E16429E47E88151

