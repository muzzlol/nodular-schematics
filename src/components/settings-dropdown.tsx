import { Github, Settings, X } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import type { SchematicConfig } from "@/types"

interface SettingsDropdownProps {
  config: SchematicConfig
  onConfigChange: (config: SchematicConfig) => void
}

export function SettingsDropdown({
  config,
  onConfigChange
}: SettingsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleChange = (key: keyof SchematicConfig, value: number) => {
    const newConfig = { ...config, [key]: value }

    if (newConfig.minNodes > newConfig.maxNodes) {
      if (key === "minNodes") {
        newConfig.maxNodes = newConfig.minNodes
      } else if (key === "maxNodes") {
        newConfig.minNodes = newConfig.maxNodes
      }
    }

    onConfigChange(newConfig)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-10 h-10 p-2 rounded-full transition-all duration-300 ${
          isOpen
            ? "bg-primary text-primary-foreground rotate-90"
            : "bg-background/30 backdrop-blur-md border border-white/10 hover:bg-white/10 text-foreground"
        }`}
        aria-label="Settings"
      >
        <Settings className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-72 p-5 rounded-2xl bg-background/90 backdrop-blur-xl border border-white/10 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">
              Configuration
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Min Nodes */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Min Nodes</span>
                <span className="font-mono">{config.minNodes}</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                value={config.minNodes}
                onChange={(e) =>
                  handleChange("minNodes", Number.parseInt(e.target.value))
                }
                className="w-full accent-primary h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer"
              />
            </div>

            {/* Max Nodes */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Max Nodes</span>
                <span className="font-mono">{config.maxNodes}</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={config.maxNodes}
                onChange={(e) =>
                  handleChange("maxNodes", Number.parseInt(e.target.value))
                }
                className="w-full accent-primary h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer"
              />
            </div>

            {/* Connection Density */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Connection Density</span>
                <span className="font-mono">
                  {(config.connectionDensity * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={config.connectionDensity}
                onChange={(e) =>
                  handleChange("connectionDensity", Number.parseFloat(e.target.value))
                }
                className="w-full accent-primary h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer"
              />
            </div>
          </div>

          <div className="h-px w-full bg-white/10 my-4" />

          <a
            href="https://github.com/muzzlol/nodular-schematics"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-sm font-medium"
          >
            <Github className="w-4 h-4" />
            <span>View on GitHub</span>
          </a>
        </div>
      )}
    </div>
  )
}
