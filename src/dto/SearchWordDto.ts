import WordEntiy from '../entity/WordEntity'

/** 全文検索結果用DTO */
export default class SearchWordDto {
  constructor(private _total: number, private _wordEnties: WordEntiy[]) {}
  public get total() { return this._total }
  public set total(total: number) { this._total = total }
  public get wordEntiy() { return this._wordEnties }
  public set wordEntiy(entities: WordEntiy[]) { this._wordEnties = entities }
}
