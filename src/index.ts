import ApiBuilder from 'claudia-api-builder'
import TestValidator from './libs/validators/TestValidator'
import Consts from './libs/Consts'
import SerachWordService from './services/SearchWordService'

const api: ApiBuilder = new ApiBuilder()
api.get('/', () => 'healthy')

/* テスト
// クエリストリング
api.get('/words/word1', (request: any) => {
  return request.queryString// {"word":"hello"}
})
// pathパラメータとjoi validation
api.get('/words/word1/{word}/{date}', (request: any) => {
  // errがあればerrorMessageキーで返り、なければk/vパラムがそのまま取れる
  const result = TestValidator.checkTest(request.pathParams)
  if (result.error) return new ApiBuilder.ApiResponse(result.error.details, Consts.ErrorResponseHeader, 400)
  return result
})
*/

/** 分かち書き結果のみを返すAPI */
api.get('/sepatate/word/{word}', (request: any) => {
  const result = TestValidator.checkWord(request.pathParams)
  if (result.error) return new ApiBuilder.ApiResponse(result.error.details, Consts.ErrorResponseHeader, 400)
  return new SerachWordService().getSeparated1Word(request.pathParams.word)
})

/** 分かち書き結果から、1単語を抽出し、その単語に対するREPLを返すAPI */
api.get('/repl/word/{word}', async (request: any) => {
  const result = TestValidator.checkWord(request.pathParams)
  if (result.error) return new ApiBuilder.ApiResponse(result.error.details, Consts.ErrorResponseHeader, 400)
  // わかち書きAPIより単語配列を抽出
  const separatedJson = await new SerachWordService().getSeparated1Word(request.pathParams.word)
  // 1単語をランダムに選択
  const targetWord = separatedJson.words[Math.floor(Math.random() * Math.floor(separatedJson.words.length))]
  // 会話文を返す
  return new SerachWordService().getReply(targetWord)
})

export = api;
