/** わかり書きAPIのresponseに相当するエンティティ */
export default class SeparatedWordsDto {
  constructor(private _words: string[]) {}
  public get words(): string[] { return this._words }
  public set words(words: string[]) { this._words = words }
}
