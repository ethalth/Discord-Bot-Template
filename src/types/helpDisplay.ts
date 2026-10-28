export interface Metadata {
  description: string,
  usage: string,
  emoji?: string | number
}

export interface CategoryMetadata {
  name: string,
  meta: Metadata
}