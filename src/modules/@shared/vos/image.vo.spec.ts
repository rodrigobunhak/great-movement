import { Image } from './image.vo';

describe('Image Value Object', () => {
  it('should create an image', () => {
    const image = new Image('http://example.com/image.png', 'alt text');
    expect(image).toBeInstanceOf(Image);
    expect(image.url).toBe('http://example.com/image.png');
    expect(image.altText).toBe('alt text');
  });

  it('should throw an error if url is empty', () => {
    expect(() => new Image('', 'alt text')).toThrow('URL da imagem é obrigatória');
  });

  it('should throw an error if url is only whitespace', () => {
    expect(() => new Image('   ', 'alt text')).toThrow('URL da imagem é obrigatória');
  });

  it('should create an image with empty alt text', () => {
    const image = new Image('http://example.com/image.png', '');
    expect(image).toBeInstanceOf(Image);
    expect(image.altText).toBe('');
  });
});
