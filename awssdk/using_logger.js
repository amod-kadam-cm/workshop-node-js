// Require logplease
const logplease = require('logplease');
// Set external log file option
//logplease.setLogfile('debug.log');
// Set log level
logplease.setLogLevel('DEBUG');
// Create logger

const options = {
  useColors: true,     // Enable colors
  showTimestamp: true, // Display timestamp in the log message
  useLocalTime: true, // Display timestamp in local timezone
  showLevel: true,     // Display log level in the log message
  filename: 'debug.log',      // Set file path to log to a file
  appendFile: true,    // Append logfile instead of overwriting
};
const logger = logplease.create('logger name',options);

logger.info("info");
logger.error("error");
logger.debug("debug");
logger.warn("warn");
