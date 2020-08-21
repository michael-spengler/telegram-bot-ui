# Telegram Bot UI Server

## Usage Example

```sh

deno run --allow-read --allow-net bot-ui-server.ts

```

or via pm2

```sh

git clone https://github.com/michael-spengler/telegram-bot-ui.git
cd telegram-bot-ui
cp .env-example.ts .env.ts  # add your individual ingredients in .env.ts
pm2 start  --interpreter="deno" --interpreter-args="run --allow-read --allow-net" ui-server.ts

```

## Support my Open Source Contributions

If you like my work please consider downloading the brave browser via my
promotion link: [https://brave.com/fan464](https://brave.com/fan464).

![![](https://brave.com/)](https://brave.com/wp-content/uploads/2019/01/logotype-full-color.svg)
