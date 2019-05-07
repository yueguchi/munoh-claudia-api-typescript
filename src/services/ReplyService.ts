import * as Elasticsearch from 'elasticsearch'
import ReplyDto from '../dto/ReplyDto'
import WordEntity from '../entity/WordEntity'
import _ from 'lodash'
import request from 'request-promise'
import SeparatedWordsEntity from '../entity/SeparatedWordsEntity'
import Consts from '../libs/Consts';
import RegistWordService from './RegistWordService'

export default class ReplyService {

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
   * 会話から抽出・選定された代表単語より会話文をElasticSearchよりスコア降順で取得し、
   * マルコフ理論で会話を生成する
   * 
   * @param word 代表単語
   */
  public async getReply(word: string, separatedWords: string[]) : Promise<ReplyDto> | never {
    const client = new Elasticsearch.Client({
      hosts: process.env.ES_ENDPOINT,
      connectionClass: require('http-aws-es'),
      log: 'trace'
    });
    const response1 = await client.search({
      index: process.env.ES_INDEX_WORDS,
      body: {
        query: {
          bool: {
            should: [
              { match : { "word2.keyword" : word }}
            ]
          }
        }
      }
    })
    const replyWords: string[] = [word]
    if (!response1.hits.hits[0]) {
      // 本当は非同期(SQSなど)でDynamoDBに登録したいが、一旦Dyanmoにここで入れる
      new RegistWordService().registWord(separatedWords)
      return new ReplyDto(Consts.DEFAULT_MESSAGE)
    }
    const { word1} = _.omit(response1.hits.hits[0]._source, ['updated_at']) as WordEntity;
    if (word1) {
      replyWords.push(word1)
      const response2 = await client.search({
        index: process.env.ES_INDEX_WORDS,
        body: {
          query: {
            bool: {
              should: [
                { match : { "word3.keyword" : word1 }}
              ]
            }
          }
        }
      })
      if (response2.hits.hits[0]) {
        const { word2 } = _.omit(response2.hits.hits[0]._source, ['updated_at']) as WordEntity;
        if (word2) replyWords.push(word2)
      }
    }
    return new ReplyDto(replyWords.join(''))
  }
}
