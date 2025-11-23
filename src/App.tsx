import { ThemeProvider, useTheme } from "next-themes"
import { useState } from "react"
import {
  SchematicCanvas,
  type SchematicCanvasRef
} from "@/components/schematic-canvas"
import {
  ThemeToggleButton,
  useThemeTransition
} from "@/components/theme-toggle-button"
import { SettingsDropdown } from "@/components/settings-dropdown"
import type { SchematicConfig } from "@/types"

import { BackgroundGrid } from "@/components/background-grid"

function AppContent() {
  const [schematicState, setSchematicState] =
    useState<SchematicCanvasRef | null>(null)
  const [config, setConfig] = useState<SchematicConfig>({
    minNodes: 20,
    maxNodes: 35,
    connectionDensity: 0.5
  })
  const { theme, setTheme } = useTheme()
  const { startTransition } = useThemeTransition()

  const handleThemeToggle = () => {
    startTransition(() => {
      setTheme(theme === "light" ? "dark" : "light")
    })
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
      <BackgroundGrid />
      
      {/* Schematic Background */}
      <div className="absolute inset-0 z-0">
        <SchematicCanvas onStateChange={setSchematicState} config={config} />
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggleButton
          theme={theme === "dark" ? "dark" : "light"}
          onClick={handleThemeToggle}
          variant="circle-blur"
        />
      </div>

      {/* Settings Dropdown - Top Center */}
      <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50">
        <SettingsDropdown config={config} onConfigChange={setConfig} />
      </div>

      {/* Debug Info - Bottom Left */}
      {schematicState && (
        <div className="pointer-events-none absolute bottom-4 left-4 z-10">
          <div className="font-mono text-[10px] text-gray-500">
            Nodes: {schematicState.nodes.length} | Links:{" "}
            {schematicState.links.length} | ID: {schematicState.genId}
          </div>
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <AppContent />
    </ThemeProvider>
  )
}

export default App


