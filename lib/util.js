const checkType = function (o, type) {
  return Object.prototype.toString.call(o) === '[object ' + (type || 'Object') + ']'
}

module.exports = {
  checkType
}