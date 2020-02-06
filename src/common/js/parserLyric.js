export function parserLyric (text) {
  let lrc = []
  const lyricArr = text.split('\n')
  const length = lyricArr.length
  for (let i = 0; i < length; i++) {
    let lyric
    // 取出时间
    let time = lyricArr[i].match(/[\d{2}:\d{2}((.|:)\d{2})]/g)
    // 取出歌词
    if (time !== null) {
      lyric = lyricArr[i].replace(/\[\d{2}:\d{2}((.|:)\d{2})]/g, '')
    }
    // 时间换算
    let minute = parseInt(time.join('').slice(0, 2))
    let second = parseInt(time.join('').slice(3, 5))
    let milliSecond = parseInt(time.join('').slice(6))
    let newTime = minute * 60 + second + milliSecond / 100
    lrc.push({time: newTime, text: lyric})
  }

  return lrc.filter(item => {
    return isNaN(item.time) !== true && item.text !== ''
  })
}
