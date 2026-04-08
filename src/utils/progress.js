export function saveProgress(index, videoID, time) {
  localStorage.setItem(
    `clip-${index}`,
    JSON.stringify({
      videoID,
      time,
    }),
  )
}

export function loadProgress(index) {
  const saved = localStorage.getItem(`clip-${index}`)
  return saved ? JSON.parse(saved) : null
}
