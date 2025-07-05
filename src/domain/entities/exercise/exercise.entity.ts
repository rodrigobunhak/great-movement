import { Image } from "../../workout/vos/image.vo.ts";

// Entidade Exercise
export class Exercise {
  private readonly _id: string; // Converter para um VO de id
  private _name: string;
  private _description: string;
  private _focusArea: string;
  private _images: Image[];
  private readonly _createdAt: Date;

  private constructor(
    id: string,
    name: string,
    description: string,
    focusArea: string,
    images: Image[],
    createdAt: Date,
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._focusArea = focusArea;
    this._images = images;
    this._createdAt = createdAt;
  }

  static create(
    name: string,
    description: string,
    focusArea: string,
    images: { url: string, altText: string }[],
  ): Exercise {
    if (!name || name.trim().length === 0) {
      throw new Error('Nome do exercício é obrigatório');
    }
    if (!focusArea || focusArea.trim().length === 0) {
      throw new Error('Foco do exercício é obrigatório');
    }
    const id = '123';
    const createdAt = new Date();
    const imageObjects = images.map(image => new Image(image.url, image.altText));
    return new Exercise(id, name.trim(), description.trim(), focusArea.trim(), imageObjects, createdAt);
  }

  // Getters
  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get description(): string {
    return this._description;
  }

  public get focusArea(): string {
    return this._focusArea;
  }

  public get images(): Image[] {
    return this._images;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  // Métodos de negócio
  updateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Nome do exercício é obrigatório');
    }
    this._name = name.trim();
  }

  updateDescription(description: string): void {
    this._description = description.trim();
  }

  updateFocusArea(focusArea: string): void {
    if (!focusArea || focusArea.trim().length === 0) {
      throw new Error('Foco do exercício é obrigatório');
    }
    this._focusArea = focusArea.trim();
  }

  addImage(image: Image): void {
    this._images.push(image);
  }

  removeImage(imageUrl: string): void {
    this._images = this._images.filter(image => image.url !== imageUrl);
  }
}