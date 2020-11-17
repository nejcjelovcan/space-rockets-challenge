export function formatDate(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(timestamp));
}

export function formatDateTime(timestamp, options = {}) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
    ...options,
  }).format(new Date(timestamp));
}

/**
 * Format datetime as UTC and then concatenate original offset
 *
 * @param {string} timestamp  ISO8601 Timestamp
 */
export function formatDateTimeWithOffset(timestamp) {
  const match = ISO8601_OFFSET_REGEX.exec(timestamp);
  const offset = match && match[0] !== "Z" ? ` ${match[0]}` : "";

  return `${formatDateTime(timestamp, { timeZone: "UTC" })}${offset}`;
}

const ISO8601_OFFSET_REGEX = /(?:Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])$/;
