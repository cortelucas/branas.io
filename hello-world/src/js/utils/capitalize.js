export class Capitalize {
  static execute (string) {
    return string.toString()[0].toUpperCase() + string.slice(1)
  }
}
