//レシピの情報を持つクラス.
module.exports = class Recipe {
    constructor(recipeData){
        //レシピタイトル
        this.recipeTitle = recipeData.recipeTitle;
        //レシピのURL
        this.recipeUrl = recipeData.recipeUrl;
        //料理の画像
        this.foodImageUrl = recipeData.foodImageUrl;
        //調理時間
        this.recipeIndication = recipeData.recipeIndication;
    }
    get recipeTitle(){
        return this._recipeTitle;
    }
    set recipeTitle(value){
        this._recipeTitle = value;
    }
    get recipeUrl(){
        return this._recipeUrl;
    }
    set recipeUrl(value){
        this._recipeUrl = value;
    }
    get foodImageUrl(){
        return this._foodImageUrl;
    }
    set foodImageUrl(value){
        this._foodImageUrl = value;
    }
    get recipeIndication(){
        return this._recipeIndication;
    }
    set recipeIndication(value){
        this._recipeIndication = value;
    }

    createMessage(value){
        return '★'+value+'のオススメレシピ★\n' + this.recipeTitle + '\n' + this.recipeUrl;
    }
}