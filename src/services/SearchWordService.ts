import * as Elasticsearch from 'elasticsearch'
import SearchWordDto from '../dto/SearchWordDto'
import WordEntity from '../entity/WordEntity'
import _ from 'lodash'
import request from 'request-promise'
import SeparatedWordsEntity from '../entity/SeparatedWordsEntity'

export default class SearchWordService {

  /**
   * 受け取った単語をわかり書きAPIに掛けた結果からランダムに抽出した単語を返す
   * @param word 会話文
   * @returns string
   */
  public async getSeparated1Word(word: string): Promise<SeparatedWordsEntity> | never {
    const options = {
      url: `${process.env.MECAB_SEPARATE_API_ENDPOINT}${word}`,
      method: 'GET'
    }
    const result = await request(options)
    return JSON.parse(result)
  }
  /**
   * 会話から抽出・選定された代表単語より会話文をElasticSearchより取得する
   * 
   * @param word 代表単語
   */
  public async getReply(word: string) : Promise<SearchWordDto> | never {
    const client = new Elasticsearch.Client({
      hosts: process.env.ES_ENDPOINT,
      connectionClass: require('http-aws-es'),
      log: 'trace'
    });
    // ロジックがマルコフじゃないので直す
    const response = await client.search({
      index: process.env.ES_INDEX_WORDS,
      body: {
        query: {
          bool: {
            should: [
              { match : { "word1.keyword" : word }},
              { match : { "word2.keyword": word }},
              { match : { "word.keyword3": word }}
            ]
          }
        }
      }
    })
    const wordEntities: WordEntity[] = []
    response.hits.hits.forEach(record => {
      // updated_at以外を抽出
      const { id, word1, word2, word3, created_at } = _.omit(record._source, ['updated_at']) as WordEntity;
      wordEntities.push(
        new WordEntity(id, word1, word2, word3, created_at)
      )
    });
    return new SearchWordDto(response.hits.total, wordEntities)
  }
}
