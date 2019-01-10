const https = require('https')
const { checkType } = require('./util')

class DDRobot {
  constructor(opts = {}) {
    if (!opts.accessToken) {
      throw new Error('缺少必要accessToken参数')
    }

    this.accessToken = opts.accessToken
    this.reqOptions = {
      hostname: 'oapi.dingtalk.com',
      port: 443,
      path: `/robot/send?access_token=${this.accessToken}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }

  send(obj) {
    if (!checkType(obj)) {
      throw new Error('消息类型必须为Object')
    }

    const postData = JSON.stringify(obj)
    let chunkData = ''
    return new Promise((resolve, reject) => {
      const req = https.request(this.reqOptions, res => {
        res.on('data', (d) => {
          chunkData += d
        })

        res.on('end', () => {
          chunkData = JSON.stringify(chunkData)
          if (chunkData.errcode === 0) {
            resolve(chunkData)
          } else {
            reject(chunkData)
          }
        })
      })
      req.write(postData)
      req.end()
    }) 
  }
}

module.exports = DDRobot