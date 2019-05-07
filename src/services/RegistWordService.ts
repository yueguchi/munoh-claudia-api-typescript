import * as AWS from 'aws-sdk'
const docClient = new AWS.DynamoDB.DocumentClient({region: process.env.AWS_REGION || 'ap-northeast-1'});
import uuid4 from 'uuid/v4'
import _ from 'lodash'
import moment from 'moment'

export default class RegistWordService {

  /**
   * 分かち書きされた言葉配列を3要素ずつにチャンクして、不足要素をnullで埋めてdynamoに登録する
   * @param words 
   */
  public async registWord(words: string[]) {
    if (words.length > 0) {
      const threeChunkedNullPaddedArray = _.chunk(words, 3).map(arr => {
        if (!arr[1]) arr[1] = null
        if (!arr[2]) arr[2] = null
        return arr
      })
      for (let items of threeChunkedNullPaddedArray) {
        console.info(`登録単語: ${items.join()}`)
        // TODO うんともすんとも言わない...データは挿入されない。エラーも起きない。
        await docClient.put({
          TableName: "words",
          Item: {
              id: uuid4(),
              word1: items[0],
              word2: items[1],
              word3: items[2],
              created_at: moment().unix(),
              updated_at: moment().unix()
          }
        }, function(err, data) {
          if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
          } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
          }
        })
      }
    }
  }
}
