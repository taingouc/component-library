import Mock from 'mockjs'
const Random = require('mockjs').Random
// 轮播图数据
Mock.mock('/mock/swiper', (req, res) => {
  const result = {
    status: 200,
    msg: '获取数据成功！'
  }
  const data = []
  for (let i = 0; i < 4; i++) {
    // 利用mockjs的Random随机生成数字并转成十六进制，拼接。
    const a = '#' + Random.integer(180, 255).toString(16) + Random.integer(140, 255).toString(16) + Random.integer(120, 220).toString(16)
    data.push({
      image_url: Random.image('600x300', a, 'png')
    })
  }
  result.data = data
  return result
})
// 新闻长列表数据
function newsList(num) {
  const list = []
  for (let i = 0; i < 10; i++) {
    const a = '#' + Random.integer(180, 255).toString(16) + Random.integer(140, 255).toString(16) + Random.integer(120, 220).toString(16)
    list.push(Random.image('600x300', a, 'png'))
  }
  const result = Mock.mock({
    [`data|${num}`]: [
      {
        // 模拟id自增
        'id|+1': 1,
        // 模拟标题
        title: '@ctitle(15,25)',
        // 模拟图片索引
        image: '@natural(0,9)',
        // 模拟访问人数
        reads: '@natural(0,99999)',
        // 模拟新闻来源
        form: '@ctitle(3,7)',
        // 模拟发布时间
        date: "@date('yyyy-MM-dd')"
      }
    ]
  })
  result.data.forEach((item) => {
    item.image = list[item.image]
  })
  return result
}
Mock.mock('/mock/news', (req, res) => {
  const { num } = JSON.parse(req.body)
  return newsList(num)
})
