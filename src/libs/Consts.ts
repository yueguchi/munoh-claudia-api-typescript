export default class Consts {
  public static get ErrorResponseHeader() {
    return {
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
    }
  }
  public static get DEFAULT_MESSAGE(): string {
    return 'ちょっと何言っているのかわかんないですね'
  }
}
