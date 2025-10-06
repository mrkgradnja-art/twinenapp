interface LogEntry {
  timestamp: string
  level: 'info' | 'warn' | 'error' | 'debug'
  message: string
  requestId?: string
  userId?: string
  metadata?: Record<string, any>
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'

  info(message: string, metadata?: Record<string, any>): void {
    this.log('info', message, metadata)
  }

  warn(message: string, metadata?: Record<string, any>): void {
    this.log('warn', message, metadata)
  }

  error(message: string, metadata?: Record<string, any>): void {
    this.log('error', message, metadata)
  }

  debug(message: string, metadata?: Record<string, any>): void {
    this.log('debug', message, metadata)
  }

  private log(level: LogEntry['level'], message: string, metadata?: Record<string, any>): void {
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...metadata
    }

    // In development, log to console with colors
    if (this.isDevelopment) {
      const colors = {
        info: '\x1b[36m', // cyan
        warn: '\x1b[33m', // yellow
        error: '\x1b[31m', // red
        debug: '\x1b[90m'  // gray
      }
      
      console.log(
        `${colors[level]}[${level.toUpperCase()}]\x1b[0m ${logEntry.timestamp} - ${message}`,
        metadata ? JSON.stringify(metadata, null, 2) : ''
      )
    } else {
      // In production, log as JSON for structured logging
      console.log(JSON.stringify(logEntry))
    }

    // TODO: Send to external logging service in production
    // Examples: Winston, Pino, DataDog, CloudWatch, etc.
    // await this.sendToExternalService(logEntry)
  }

  // TODO: Implement external logging service integration
  // private async sendToExternalService(logEntry: LogEntry): Promise<void> {
  //   // Send to logging service like:
  //   // - Winston with transports
  //   // - Pino with transports
  //   // - DataDog
  //   // - AWS CloudWatch
  //   // - Google Cloud Logging
  // }
}

export const logger = new Logger()