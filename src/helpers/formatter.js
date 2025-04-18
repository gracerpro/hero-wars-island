/**
 * @param {Object} date
 * @returns {String}
 */
export function formatDate(date) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("ru-RU");
}

/**
 * @param {Date} date
 * @param {String} locale
 * @returns {String}
 */
export function fromCurrentDate(date, locale = null) {
  if (!date) {
    return "";
  }

  const now = new Date();
  let result =
    date.getDate() + " " + date.toLocaleString(locale ? locale : "default", { month: "short" });

  if (date.getFullYear() !== now.getFullYear()) {
    result += " " + date.getFullYear();
  }

  return result;
}

export function getHumanQuantity(quantity) {
  // max 4 chars

  if (quantity >= 1000000) {
    if (quantity % 100000 === 0) {
      return quantity / 1000000 + "M";
    }
    return Math.floor(quantity / 1000000) + "M";
  }
  if (quantity >= 1000) {
    if (quantity % 100 === 0) {
      return quantity / 1000 + "K";
    }
    return Math.floor(quantity / 1000) + "K";
  }

  return "" + quantity;
}

/**
 * @param {Number} sizeInBytes
 * @param {Number} precision
 * @return {string}
 */
export function getHumanSize(sizeInBytes, precision = 2) {
  if (sizeInBytes < 1024) {
    return sizeInBytes + " b";
  }
  // 1048576 = 1 Mb
  if (sizeInBytes < 1048576) {
    return (sizeInBytes / 1024).toFixed(precision) + " kb";
  }

  return (sizeInBytes / 1024 / 1024).toFixed(precision) + " mb";
}
