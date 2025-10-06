'use client'

import { useState } from 'react'
import { Palette, Sparkles, Settings, Save } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface ThemeSettings {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  backgroundPattern: 'circuit' | 'grid' | 'dots' | 'waves'
  glowIntensity: 'low' | 'medium' | 'high'
  particleEffect: boolean
  customCSS?: string
}

interface ThemeCustomizerProps {
  currentTheme: ThemeSettings
  onThemeChange: (theme: ThemeSettings) => void
  onSave: (theme: ThemeSettings) => void
}

const PRESET_THEMES = {
  cyberpunk: {
    primaryColor: '#ff006e',
    secondaryColor: '#8338ec',
    accentColor: '#3a86ff',
    backgroundPattern: 'circuit' as const,
    glowIntensity: 'high' as const,
    particleEffect: true
  },
  matrix: {
    primaryColor: '#00ff41',
    secondaryColor: '#00cc33',
    accentColor: '#ffffff',
    backgroundPattern: 'grid' as const,
    glowIntensity: 'medium' as const,
    particleEffect: false
  },
  synthwave: {
    primaryColor: '#ff0080',
    secondaryColor: '#8000ff',
    accentColor: '#00ffff',
    backgroundPattern: 'dots' as const,
    glowIntensity: 'high' as const,
    particleEffect: true
  },
  neon: {
    primaryColor: '#ff1493',
    secondaryColor: '#00bfff',
    accentColor: '#ffff00',
    backgroundPattern: 'waves' as const,
    glowIntensity: 'medium' as const,
    particleEffect: false
  }
}

export default function ThemeCustomizer({ currentTheme, onThemeChange, onSave }: ThemeCustomizerProps) {
  const [theme, setTheme] = useState<ThemeSettings>(currentTheme)
  const [activeTab, setActiveTab] = useState<'colors' | 'effects' | 'advanced'>('colors')

  const handleColorChange = (colorType: keyof Pick<ThemeSettings, 'primaryColor' | 'secondaryColor' | 'accentColor'>, value: string) => {
    const newTheme = { ...theme, [colorType]: value }
    setTheme(newTheme)
    onThemeChange(newTheme)
  }

  const handlePresetSelect = (presetName: string) => {
    const preset = PRESET_THEMES[presetName as keyof typeof PRESET_THEMES]
    if (preset) {
      setTheme(preset)
      onThemeChange(preset)
    }
  }

  const handleSave = () => {
    onSave(theme)
  }

  return (
    <div className="space-y-6">
      {/* Preview */}
      <Card className="theme-bg-gradient theme-glow p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 theme-text-primary" />
          Live Preview
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border theme-border">
            <div className="w-full h-16 bg-gradient-to-r from-primary to-secondary rounded mb-2"></div>
            <div className="text-sm text-gray-300">Primary → Secondary</div>
          </div>
          <div className="p-4 rounded-lg border theme-border">
            <div className="w-full h-16 bg-accent rounded mb-2"></div>
            <div className="text-sm text-gray-300">Accent Color</div>
          </div>
          <div className="p-4 rounded-lg border theme-border theme-glow">
            <div className="w-full h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded mb-2"></div>
            <div className="text-sm text-gray-300">Background Effect</div>
          </div>
        </div>
      </Card>

      {/* Preset Themes */}
      <Card className="theme-bg-gradient theme-glow p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Preset Themes</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(PRESET_THEMES).map(([name, preset]) => (
            <button
              key={name}
              onClick={() => handlePresetSelect(name)}
              className="p-4 rounded-lg border-2 border-transparent hover:border-neon-purple/50 transition-colors text-left"
              style={{
                borderColor: theme.primaryColor === preset.primaryColor ? theme.primaryColor : undefined
              }}
            >
              <div className="flex space-x-1 mb-2">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: preset.primaryColor }}
                ></div>
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: preset.secondaryColor }}
                ></div>
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: preset.accentColor }}
                ></div>
              </div>
              <div className="text-white capitalize font-medium">{name}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* Customization Tabs */}
      <Card className="theme-bg-gradient theme-glow">
        <div className="border-b border-dark-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'colors', label: 'Colors', icon: Palette },
              { id: 'effects', label: 'Effects', icon: Sparkles },
              { id: 'advanced', label: 'Advanced', icon: Settings }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === id
                    ? 'border-neon-purple text-neon-purple'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'colors' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={theme.primaryColor}
                      onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                      className="w-12 h-12 rounded-lg border border-gray-600 cursor-pointer"
                    />
                    <Input
                      value={theme.primaryColor}
                      onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                      placeholder="#ff006e"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Secondary Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={theme.secondaryColor}
                      onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                      className="w-12 h-12 rounded-lg border border-gray-600 cursor-pointer"
                    />
                    <Input
                      value={theme.secondaryColor}
                      onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                      placeholder="#8338ec"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Accent Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={theme.accentColor}
                      onChange={(e) => handleColorChange('accentColor', e.target.value)}
                      className="w-12 h-12 rounded-lg border border-gray-600 cursor-pointer"
                    />
                    <Input
                      value={theme.accentColor}
                      onChange={(e) => handleColorChange('accentColor', e.target.value)}
                      placeholder="#3a86ff"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'effects' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Background Pattern
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(['circuit', 'grid', 'dots', 'waves'] as const).map((pattern) => (
                    <button
                      key={pattern}
                      onClick={() => setTheme({ ...theme, backgroundPattern: pattern })}
                      className={`p-3 rounded-lg border-2 text-center capitalize ${
                        theme.backgroundPattern === pattern
                          ? 'border-neon-purple bg-neon-purple/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="text-white text-sm">{pattern}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Glow Intensity
                </label>
                <div className="flex space-x-3">
                  {(['low', 'medium', 'high'] as const).map((intensity) => (
                    <button
                      key={intensity}
                      onClick={() => setTheme({ ...theme, glowIntensity: intensity })}
                      className={`px-4 py-2 rounded-lg border-2 capitalize ${
                        theme.glowIntensity === intensity
                          ? 'border-neon-purple bg-neon-purple/10 text-neon-purple'
                          : 'border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {intensity}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-white">
                  Particle Effects
                </label>
                <button
                  onClick={() => setTheme({ ...theme, particleEffect: !theme.particleEffect })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    theme.particleEffect ? 'bg-neon-purple' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      theme.particleEffect ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'advanced' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Custom CSS
                </label>
                <textarea
                  value={theme.customCSS || ''}
                  onChange={(e) => setTheme({ ...theme, customCSS: e.target.value })}
                  placeholder="/* Add your custom CSS here */&#10;.my-custom-class {&#10;  color: var(--theme-primary);&#10;}"
                  className="w-full h-32 px-3 py-2 bg-dark-800 border border-gray-600 rounded-lg text-gray-300 font-mono text-sm resize-none focus:border-neon-purple focus:outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Use CSS variables: var(--theme-primary), var(--theme-secondary), var(--theme-accent)
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave}
          variant="cyber-purple"
          size="lg"
          className="px-8"
        >
          <Save className="w-5 h-5 mr-2" />
          Save Theme
        </Button>
      </div>
    </div>
  )
}
