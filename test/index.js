const DDRobot = require('../lib/index')
const robot = new DDRobot({
  accessToken: '82eb8a738974405431612de0ea2a85c9638d68abcaa4579da1f3efa79811e91a'
})

robot
.send({
  msgtype: 'text',
  text: {
    content: '凤兮凤兮归故乡'
  }
})
.then(res => {
  console.log(res)
})
.catch(err => {
  console.log(err)
})