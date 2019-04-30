import ApiBuilder from 'claudia-api-builder'
import TestValidator from './libs/validators/TestValidator'
import Consts from './libs/Consts'
import SerachWordService from './services/SearchWordService'

const api: ApiBuilder = new ApiBuilder()
api.get('/', () => 'Hello world')
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

api.get('/es/word/{word}', (request: any) => {
  const result = TestValidator.checkWord(request.pathParams)
  if (result.error) return new ApiBuilder.ApiResponse(result.error.details, Consts.ErrorResponseHeader, 400)
  return new SerachWordService().searchWord(request.pathParams.word)
})

export = api;
