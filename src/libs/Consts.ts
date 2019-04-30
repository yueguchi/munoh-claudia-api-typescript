export default class Consts {
  public static get ErrorResponseHeader() {
    return {
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
    }
  };
}
