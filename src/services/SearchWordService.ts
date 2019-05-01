import * as Elasticsearch from 'elasticsearch'
import SearchWordDto from '../dto/SearchWordDto'
import WordEntity from '../entity/WordEntity'
import _ from 'lodash'
import request from 'request-promise'

export default class SearchWordService {

  /**
   * 受け取った単語をわかり書きAPIに掛けた結果からランダムに抽出した単語を返す
   * @param word 会話文
   */
  public async getSeparated1Word(word: string): Promise<any> | never {
    const options = {
      url: `${process.env.MECAB_SEPARATE_API_ENDPOINT}${word}`,
      method: 'GET'
    }
    const result = await request(options)
    const json = JSON.parse(result)　
    // TODO wordsの配列からランダムで返す予定
    return json
  }
  /**
   * 会話から抽出・選定された代表単語より会話文をElasticSearchより取得する
   * 
   * @param word 代表単語
   */
  public async searchWord(word: string) : Promise<SearchWordDto> | never {
    const client = new Elasticsearch.Client({
      hosts: process.env.ES_ENDPOINT,
      connectionClass: require('http-aws-es'),
      log: 'trace'
    });
    const response = await client.search({
      index: process.env.ES_INDEX_WORDS,
      body: {
        query: {
          match_all: {}
        }
      }
    })
    const wordEntities: WordEntity[] = []
    response.hits.hits.forEach(record => {
      // updated_at以外を抽出
      const omitted = _.omit(record._source, ['updated_at']) as any;
      wordEntities.push(
        new WordEntity(omitted.id, omitted.word1, omitted.word2, omitted.word3, omitted.created_at)
      )
    });
    return new SearchWordDto(response.hits.total, wordEntities)
  }
}
