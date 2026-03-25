<script setup>
import { ref } from 'vue'

const props = defineProps({
  videoID: String,
})

const isPlaying = ref(false)

const thumbnail = `https://img.youtube.com/vi/${props.videoID}/hqdefault.jpg`
</script>

<template>
  <div class="video-wrapper">
    <div v-if="!isPlaying" class="thumbnail" @click="isPlaying = true">
      <img :src="thumbnail" />
      <div class="play-button">▶</div>
    </div>

    <iframe
      v-else
      :src="`https://www.youtube.com/embed/${props.videoID}?autoplay=1`"
      allow="autoplay; encrypted-media"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style scoped>
.video-wrapper {
  width: 80%;
  max-width: 1000px;
  margin: 80px auto;
  aspect-ratio: 16 / 9;
  position: relative;
}

.thumbnail {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 60px;
  color: white;
  background: rgba(0, 0, 0, 0.6);
  padding: 20px 28px;
  border-radius: 50%;
}

iframe {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  border: none;
}
</style>
