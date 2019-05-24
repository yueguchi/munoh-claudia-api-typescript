/** Elastisearchのwordsインデックスwordtypeに相当するエンティティ */
export default class WordDto {
  constructor(
    private _id: string,
    private _word1: string,
    private _word2: string,
    protected _word3: string,
    private _createdAt: number
  ) {}
  public get id(): string { return this._id }
  public set id(id: string) { this._id = id }
  public get word1(): string { return this._word1 }
  public set word1(word: string) { this._word1 = word}
  public get word2(): string { return this._word2 }
  public set word2(word: string) { this._word2 = word}
  public get word3(): string { return this._word3 }
  public set word3(word: string) { this._word3 = word}
  public get created_at(): number { return this._createdAt }
  public set created_at(createdAt: number) { this._createdAt = createdAt}
}
