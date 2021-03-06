const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');
const app = express();
const Recipe = require('./src/domain/recipe.js');
const fs = require('fs');
const CATEGORY = require('./src/domain/category.js')

const config = {
        channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
        channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);

//Lineからのリクエストを受けとる
app.post('/recipe-bot',line.middleware(config),(req,res) => {
    console.log(req.body.events);
    Promise
        .all(
            //イベントによってリプライ内容を変える.
            req.body.events.map(handleEvent),
            )
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});
    
const handleEvent = (event) => {
    //フォローされたときにメニューのクイックリプライを送る.
    if (event.type == 'follow') {
        setMenu(event);
    }
    //メッセージやテキスト以外のリクエストにはnullを返す.
    if (event.type !== 'message' || event.message.type !== 'text'){
        return Promise.resolve(null);
    }   
    //リクエスト内容によってリプライメッセージを変更する.
    switch (event.message.text) {
        case '肉':
            getRecipe(event,CATEGORY.MEAT);
            break;
        case '魚':
            getRecipe(event,CATEGORY.FISH);
            break;
        case 'サラダ':
            getRecipe(event,CATEGORY.SALADA);
            break;
        default:
            setMenu(event);
    }
}
//レシピ情報を取得する.
const getRecipe = async (event,categoryId) => {
    //楽天レシピのAPIを叩いてレシピ情報を取得.
    const res =  await axios.get(getUrl(categoryId));
    //取得した情報をもとにインスタンスを生成.
    const recipe = new Recipe(res.data.result[0]);
    //レシピ情報をメッセージで送る.
    await client.pushMessage(event.source.userId,{
        type: 'text',
        text: recipe.createMessage(event.message.text)
    });
    //メニューボタンを表示.
    await setMenu(event);
}
    
//クイックリプライ機能を使ってメニューボタンを作成.
const setMenu = (event) => {
    //クイックリプライ用のjsonファイルを読み込む.
    const menuMessage = JSON.parse(fs.readFileSync('./src/json/menu.json','utf-8'));
    client.replyMessage(event.replyToken,menuMessage);
}

//カテゴリーIDをもとに楽天レシピAPIのURLを作成.
const getUrl = (categoryId) =>{
    var url = "https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1070489888626363239&categoryId=" + categoryId;
    return url;
}
   
const port = process.env.PORT || 3000;
    app.listen(port, () => {
    console.log("listening on ${port}")
});