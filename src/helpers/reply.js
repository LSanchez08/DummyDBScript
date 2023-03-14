
exports.reply = (status, message, collection, method, payload, documents) => {
  return {
    request: {
      collection,
      method
    },
    response: {
      status,
      message,
      ...payload && { payload },
      ...documents && { documents }
    }
  }
}
