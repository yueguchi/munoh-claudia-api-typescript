import * as Elasticsearch from 'elasticsearch'
import SearchWordDto from '../dto/SearchWordDto'
import WordEntity from '../entity/WordEntity'
import _ from 'lodash'

export default class SearchWordService {
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
      console.info(omitted);
      wordEntities.push(
        new WordEntity(omitted.id, omitted.word1, omitted.word2, omitted.word3, omitted.created_at)
      )
    });
    return new SearchWordDto(response.hits.total, wordEntities)
  }
}
