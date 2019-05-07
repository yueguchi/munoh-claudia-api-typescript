
/** 全文検索結果用DTO */
export default class ReplyDto {
  constructor(private _word: string) {}
  public get word():string { return this._word }
  public set word(word: string) { this._word = word }
}
