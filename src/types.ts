export interface Point {
  x: number
  y: number
}

export const NODE_TYPES = [
  "SIMPLE",
  "CONCENTRIC",
  "RADIAL",
  "CROSSHAIR",
  "GEAR",
  "ORBITAL"
] as const

export type NodeType = (typeof NODE_TYPES)[number]

export interface SchematicNode {
  id: string
  x: number
  y: number
  radius: number
  type: NodeType
  rotation: number
  details: number[] // Array of random numbers for procedural detail generation
}

export interface SchematicLink {
  id: string
  source: string
  target: string
  type: "DIRECT" | "TANGENT" | "DOTTED"
}

export interface SchematicConfig {
  minNodes: number
  maxNodes: number
  connectionDensity: number // 0-1, affects how many neighbors to connect to
}
