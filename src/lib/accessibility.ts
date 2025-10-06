// Accessibility utilities and helpers for Twinen

export interface AccessibilityOptions {
  announceChanges?: boolean
  highContrast?: boolean
  reducedMotion?: boolean
  fontSize?: 'small' | 'medium' | 'large' | 'extra-large'
  screenReader?: boolean
  keyboardNavigation?: boolean
}

export class AccessibilityManager {
  private options: AccessibilityOptions = {
    announceChanges: true,
    highContrast: false,
    reducedMotion: false,
    fontSize: 'medium',
    screenReader: false,
    keyboardNavigation: true
  }

  constructor() {
    this.loadUserPreferences()
    this.setupEventListeners()
  }

  // Load user accessibility preferences from localStorage
  private loadUserPreferences(): void {
    if (typeof window === 'undefined') return

    try {
      const saved = localStorage.getItem('twinen-accessibility')
      if (saved) {
        this.options = { ...this.options, ...JSON.parse(saved) }
        this.applyPreferences()
      }
    } catch (error) {
      console.warn('Failed to load accessibility preferences:', error)
    }
  }

  // Save user preferences to localStorage
  private savePreferences(): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem('twinen-accessibility', JSON.stringify(this.options))
    } catch (error) {
      console.warn('Failed to save accessibility preferences:', error)
    }
  }

  // Apply accessibility preferences to the page
  private applyPreferences(): void {
    if (typeof window === 'undefined') return

    const root = document.documentElement

    // Apply high contrast mode
    if (this.options.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    // Apply reduced motion
    if (this.options.reducedMotion) {
      root.classList.add('reduced-motion')
    } else {
      root.classList.remove('reduced-motion')
    }

    // Apply font size
    root.classList.remove('font-small', 'font-medium', 'font-large', 'font-extra-large')
    root.classList.add(`font-${this.options.fontSize}`)

    // Apply screen reader optimizations
    if (this.options.screenReader) {
      root.classList.add('screen-reader-optimized')
    } else {
      root.classList.remove('screen-reader-optimized')
    }
  }

  // Setup keyboard navigation and other event listeners
  private setupEventListeners(): void {
    if (typeof window === 'undefined') return

    // Keyboard navigation
    document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this))

    // Focus management
    document.addEventListener('focusin', this.handleFocusIn.bind(this))
    document.addEventListener('focusout', this.handleFocusOut.bind(this))

    // Screen reader announcements
    if (this.options.announceChanges) {
      this.setupLiveRegion()
    }
  }

  // Handle keyboard navigation
  private handleKeyboardNavigation(event: KeyboardEvent): void {
    if (!this.options.keyboardNavigation) return

    // Skip links for better navigation
    if (event.key === 'Tab' && event.shiftKey === false) {
      const focusableElements = this.getFocusableElements()
      const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement)
      
      if (currentIndex === focusableElements.length - 1) {
        // Focus first element when reaching the end
        event.preventDefault()
        focusableElements[0]?.focus()
      }
    }

    // Escape key to close modals
    if (event.key === 'Escape') {
      const modal = document.querySelector('[role="dialog"]')
      if (modal) {
        const closeButton = modal.querySelector('[aria-label*="close"], [aria-label*="Close"]')
        if (closeButton instanceof HTMLElement) {
          closeButton.click()
        }
      }
    }

    // Enter and Space for button activation
    if ((event.key === 'Enter' || event.key === ' ') && 
        document.activeElement?.getAttribute('role') === 'button') {
      event.preventDefault()
      ;(document.activeElement as HTMLElement).click()
    }
  }

  // Handle focus in events
  private handleFocusIn(event: FocusEvent): void {
    const target = event.target as HTMLElement
    
    // Add focus ring for keyboard users
    if (target.matches('button, input, textarea, select, a, [tabindex]')) {
      target.classList.add('keyboard-focus')
    }

    // Announce focus changes to screen readers
    if (this.options.announceChanges) {
      this.announceFocus(target)
    }
  }

  // Handle focus out events
  private handleFocusOut(event: FocusEvent): void {
    const target = event.target as HTMLElement
    target.classList.remove('keyboard-focus')
  }

  // Get all focusable elements on the page
  private getFocusableElements(): HTMLElement[] {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'textarea:not([disabled])',
      'select:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[role="button"]:not([disabled])',
      '[role="link"]',
      '[role="menuitem"]',
      '[role="option"]'
    ].join(', ')

    return Array.from(document.querySelectorAll(focusableSelectors)) as HTMLElement[]
  }

  // Announce focus changes to screen readers
  private announceFocus(element: HTMLElement): void {
    const label = this.getElementLabel(element)
    if (label) {
      this.announce(label)
    }
  }

  // Get accessible label for an element
  private getElementLabel(element: HTMLElement): string | null {
    // Check for aria-label first
    const ariaLabel = element.getAttribute('aria-label')
    if (ariaLabel) return ariaLabel

    // Check for aria-labelledby
    const ariaLabelledBy = element.getAttribute('aria-labelledby')
    if (ariaLabelledBy) {
      const labelElement = document.getElementById(ariaLabelledBy)
      if (labelElement) return labelElement.textContent
    }

    // Check for associated label
    const id = element.getAttribute('id')
    if (id) {
      const label = document.querySelector(`label[for="${id}"]`)
      if (label) return label.textContent
    }

    // Check for text content
    const textContent = element.textContent?.trim()
    if (textContent) return textContent

    // Check for title attribute
    const title = element.getAttribute('title')
    if (title) return title

    return null
  }

  // Setup live region for announcements
  private setupLiveRegion(): void {
    if (typeof window === 'undefined') return

    let liveRegion = document.getElementById('twinen-live-region')
    
    if (!liveRegion) {
      liveRegion = document.createElement('div')
      liveRegion.id = 'twinen-live-region'
      liveRegion.setAttribute('aria-live', 'polite')
      liveRegion.setAttribute('aria-atomic', 'true')
      liveRegion.className = 'sr-only'
      document.body.appendChild(liveRegion)
    }
  }

  // Announce text to screen readers
  public announce(text: string): void {
    if (typeof window === 'undefined') return

    const liveRegion = document.getElementById('twinen-live-region')
    if (liveRegion && this.options.announceChanges) {
      liveRegion.textContent = text
      
      // Clear after announcement
      setTimeout(() => {
        liveRegion.textContent = ''
      }, 1000)
    }
  }

  // Update accessibility options
  public updateOptions(newOptions: Partial<AccessibilityOptions>): void {
    this.options = { ...this.options, ...newOptions }
    this.applyPreferences()
    this.savePreferences()
  }

  // Get current accessibility options
  public getOptions(): AccessibilityOptions {
    return { ...this.options }
  }

  // Toggle specific accessibility features
  public toggleHighContrast(): void {
    this.updateOptions({ highContrast: !this.options.highContrast })
  }

  public toggleReducedMotion(): void {
    this.updateOptions({ reducedMotion: !this.options.reducedMotion })
  }

  public setFontSize(size: AccessibilityOptions['fontSize']): void {
    this.updateOptions({ fontSize: size })
  }

  public toggleScreenReader(): void {
    this.updateOptions({ screenReader: !this.options.screenReader })
  }

  // Utility functions for developers
  public static validateARIA(element: HTMLElement): string[] {
    const errors: string[] = []

    // Check for required ARIA attributes
    if (element.getAttribute('role') === 'button' && !element.getAttribute('aria-label') && !element.textContent) {
      errors.push('Button without accessible name')
    }

    if (element.getAttribute('role') === 'img' && !element.getAttribute('aria-label') && !element.getAttribute('alt')) {
      errors.push('Image without accessible name')
    }

    // Check for proper heading structure
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    let previousLevel = 0
    headings.forEach(heading => {
      const level = parseInt(heading.tagName.charAt(1))
      if (level > previousLevel + 1) {
        errors.push(`Heading level skipped: ${heading.tagName}`)
      }
      previousLevel = level
    })

    return errors
  }

  public static checkColorContrast(foreground: string, background: string): number {
    // Simplified contrast ratio calculation
    // In production, use a proper color contrast library
    const fg = this.hexToRgb(foreground)
    const bg = this.hexToRgb(background)
    
    if (!fg || !bg) return 0

    const luminance1 = this.getLuminance(fg)
    const luminance2 = this.getLuminance(bg)
    
    const brightest = Math.max(luminance1, luminance2)
    const darkest = Math.min(luminance1, luminance2)
    
    return (brightest + 0.05) / (darkest + 0.05)
  }

  private static hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  private static getLuminance(rgb: { r: number; g: number; b: number }): number {
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }
}

// Export singleton instance
export const accessibilityManager = new AccessibilityManager()

// Helper function to generate accessible IDs
export function generateAccessibleId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 15)}`
}

// Helper function to create accessible button props
export function createAccessibleButtonProps(
  onClick: () => void,
  label: string,
  options: {
    disabled?: boolean
    pressed?: boolean
    expanded?: boolean
    controls?: string
    describedBy?: string
  } = {}
) {
  return {
    onClick,
    'aria-label': label,
    'aria-disabled': options.disabled || false,
    'aria-pressed': options.pressed,
    'aria-expanded': options.expanded,
    'aria-controls': options.controls,
    'aria-describedby': options.describedBy,
    role: 'button',
    tabIndex: options.disabled ? -1 : 0
  }
}

// Helper function to create accessible form field props
export function createAccessibleFieldProps(
  id: string,
  label: string,
  required: boolean = false,
  error?: string,
  helpText?: string
) {
  const errorId = error ? `${id}-error` : undefined
  const helpId = helpText ? `${id}-help` : undefined
  const describedBy = [errorId, helpId].filter(Boolean).join(' ') || undefined

  return {
    id,
    'aria-label': label,
    'aria-required': required,
    'aria-invalid': !!error,
    'aria-describedby': describedBy,
    'aria-errormessage': errorId
  }
}
