import * as elasticsearch from 'elasticsearch';

export default class SearchWordService {
  public searchWord(word: string) {
    const client = new elasticsearch.Client({
      host: process.env.ES_ENDPOINT
    });
    return { result: `${word}を${process.env.ES_ENDPOINT}から探します`}
  }
}
