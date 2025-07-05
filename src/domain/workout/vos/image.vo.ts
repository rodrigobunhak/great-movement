export class Image {
  private readonly _url: string;
  private readonly _altText: string;

  constructor(url: string, altText: string) {
    if (!url || url.trim().length === 0) {
      throw new Error('URL da imagem é obrigatória');
    }
    this._url = url;
    this._altText = altText;
  }

  get url() {
    return this._url;
  }

  get altText() {
    return this._altText;
  }
}
