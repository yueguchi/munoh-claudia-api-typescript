import WordDto from './WordDto'

/** 全文検索結果用DTO */
export default class SearchWordDto {
  constructor(private _total: number, private _words: WordDto[]) {}
  public get total() { return this._total }
  public set total(total: number) { this._total = total }
  public get words() { return this._words }
  public set words(entities: WordDto[]) { this._words = entities }
}
