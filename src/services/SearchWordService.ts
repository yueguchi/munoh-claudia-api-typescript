export default class SearchWordService {
  public searchWord(word: string) {
    return { result: `${word}を探します`}
  }
}
