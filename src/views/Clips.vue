<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { saveProgress, loadProgress } from '@/utils/progress'
const currentTime = ref({})
const activePOV = ref({})
const shouldAutoplay = ref({})
const router = useRouter()
const reloadKey = ref({})
onMounted(() => {
  clips.forEach((clip, index) => {
    const saved = loadProgress(index)

    if (saved) {
      currentTime.value[index] = saved.time

      const povIndex = clip.povs.findIndex((p) => p.id === saved.videoId)
      if (povIndex !== -1) {
        activePOV.value[index] = povIndex
      }
    }
  })
})
function handleTimestampClick(index, time, videoId) {
  currentTime.value = { ...currentTime.value, [index]: time }

  saveProgress(index, videoId, time)
}
const clips = [
  {
    title: 'First time talking on stream. July 18th, 2024',
    povs: [
      {
        name: 'Nerissa POV',
        id: '06bbpbSTD_g',
        timestamps: [{ time: 2625, display: '43:45' }],
      },
    ],
  },
  {
    title: 'Advent vs Justice Party Animals Collab. July 22nd, 2024',
    povs: [
      {
        name: 'Nerissa POV',
        id: 'UPZV-6DoRqY',
        timestamps: [{ time: 4947, display: '1:22:27' }],
      },
    ],
  },
  {
    title: 'ENReco Chapter 1 Episode 1. Sep 1st, 2024',
    povs: [
      {
        name: 'Nerissa POV',
        id: 'PJSd7DYlGNo',
        timestamps: [
          {
            time: 1657,
            display: '27:37',
          },
        ],
      },
      {
        name: 'ERB POV',
        id: '2qiX7084obE',
        timestamps: [
          {
            time: 1461,
            display: '24:21',
          },
        ],
      },
    ],
  },
  {
    title: 'ENReco Chapter 1 Episode 3. Sep 3rd, 2024',
    povs: [
      {
        name: 'Nerissa POV',
        id: 'LH_8d-8gZow',
        timestamps: [
          {
            time: 4815,
            display: '1:20:15',
          },
        ],
      },
      {
        name: 'ERB POV',
        id: 'oVguNTPnDww',
        timestamps: [
          {
            time: 819,
            display: '13:39',
          },
          {
            time: 930,
            display: '15:30',
          },
          {
            time: 1197,
            display: '19:57',
          },
          {
            time: 2185,
            display: '36:25',
          },
          {
            time: 2740,
            display: '45:40',
          },
          {
            time: 2772,
            display: '46:12',
          },
          {
            time: 2818,
            display: '46:58',
          },
          {
            time: 5289,
            display: '1:28:09',
          },
          {
            time: 5334,
            display: '1:28:54',
          },
          {
            time: 5855,
            display: '1:37:35',
          },
        ],
      },
    ],
  },
  {
    title: 'ENReco Chapter 1 Episode 4. Sep 4th, 2024',
    povs: [
      {
        name: 'Nerissa POV',
        id: 'dRCvSHBTvSk',
        timestamps: [
          {
            time: 10858,
            display: '3:00:58',
          },
          {
            time: 11666,
            display: '3:14:26',
          },
          {
            time: 13431,
            display: '3:43:51',
          },
          {
            time: 14400,
            display: '4:00:00',
          },
          {
            time: 15970,
            display: '4:26:10',
          },
          {
            time: 17470,
            display: '4:51:10',
          },
        ],
      },
      {
        name: 'ERB POV',
        id: 'dCNrMstGc3I',
        timestamps: [
          {
            time: 1417,
            display: '23:37',
          },
          {
            time: 1713,
            display: '28:33',
          },
          {
            time: 1838,
            display: '30:38',
          },
          {
            time: 4287,
            display: '1:11:27',
          },
          {
            time: 5259,
            display: '1:27:39',
          },
          {
            time: 6428,
            display: '1:47:08',
          },
          {
            time: 6815,
            display: '1:53:35',
          },
          {
            time: 7540,
            display: '2:05:40',
          },
          {
            time: 8333,
            display: '2:18:53',
          },
          {
            time: 8525,
            display: '2:22:05',
          },
          {
            time: 8598,
            display: '2:23:18',
          },
          {
            time: 8651,
            display: '2:24:11',
          },
          {
            time: 8755,
            display: '2:25:55',
          },
        ],
      },
    ],
  },
  {
    title: 'ENReco Chapter 1 Episode 5. Sep 5th, 2024',
    povs: [
      {
        name: 'Nerissa POV',
        id: 'Lv6_Xl1u_Ss',
        timestamps: [
          {
            time: 737,
            display: '12:17',
          },
          {
            time: 1122,
            display: '18:42',
          },
          {
            time: 1141,
            display: '19:01',
          },
          {
            time: 1650,
            display: '27:30',
          },
          {
            time: 1930,
            display: '32:10',
          },
          {
            time: 2781,
            display: '46:21',
          },
          {
            time: 4240,
            display: '1:10:40',
          },
          {
            time: 6627,
            display: '1:50:27',
          },
          {
            time: 6783,
            display: '1:53:03',
          },
          {
            time: 6880,
            display: '1:54:40',
          },
          {
            time: 6947,
            display: '1:55:47',
          },
          {
            time: 7036,
            display: '1:57:16',
          },
          {
            time: 7100,
            display: '1:58:20',
          },
          {
            time: 7156,
            display: '1:59:16',
          },
          {
            time: 7239,
            display: '2:00:39',
          },
          {
            time: 7374,
            display: '2:02:54',
          },
          {
            time: 7465,
            display: '2:04:25',
          },
          {
            time: 7982,
            display: '2:13:02',
          },
          {
            time: 8041,
            display: '2:14:01',
          },
          {
            time: 8402,
            display: '2:20:02',
          },
          {
            time: 9365,
            display: '2:36:05',
          },
          {
            time: 9547,
            display: '2:39:07',
          },
          {
            time: 9692,
            display: '2:41:32',
          },
          {
            time: 10088,
            display: '2:48:08',
          },
          {
            time: 10151,
            display: '2:49:11',
          },
          {
            time: 10390,
            display: '2:53:10',
          },
        ],
      },
      {
        name: 'ERB POV',
        id: '1_dhGL0K5-k',
        timestamps: [
          {
            time: 1127,
            display: '18:47',
          },
          {
            time: 1226,
            display: '20:26',
          },
          {
            time: 1634,
            display: '27:14',
          },
          {
            time: 2149,
            display: '35:49',
          },
          {
            time: 2415,
            display: '40:15',
          },
          {
            time: 7639,
            display: '2:07:19',
          },
          {
            time: 10052,
            display: '2:47:32',
          },
          {
            time: 10171,
            display: '2:49:31',
          },
          {
            time: 10229,
            display: '2:50:29',
          },
          {
            time: 10709,
            display: '2:58:29',
          },
          {
            time: 10797,
            display: '2:59:57',
          },
          {
            time: 10844,
            display: '3:00:44',
          },
        ],
      },
    ],
  },
  {
    title: 'ENReco Chapter 1 Episode 6. Sep 6th, 2024',
    povs: [
      {
        name: 'ERB POV',
        id: '5R01-igo4sM',
        timestamps: [
          {
            time: 2050,
            display: '34:10',
          },
          {
            time: 2363,
            display: '39:23',
          },
          {
            time: 2410,
            display: '40:10',
          },
          {
            time: 2457,
            display: '40:57',
          },
          {
            time: 2552,
            display: '42:32',
          },
          {
            time: 2797,
            display: '46:37',
          },
          {
            time: 2901,
            display: '48:21',
          },
          {
            time: 3369,
            display: '56:09',
          },
          {
            time: 3562,
            display: '59:22',
          },
          {
            time: 4915,
            display: '1:21:55',
          },
          {
            time: 4990,
            display: '1:23:10',
          },
          {
            time: 5041,
            display: '1:24:01',
          },
          {
            time: 7061,
            display: '1:57:41',
          },
        ],
      },
    ],
  },
  {
    title: 'ENReco Chapter 1 Episode 7. Sep 7th, 2024',
    povs: [
      {
        name: 'ERB POV',
        id: 'Gw0dZbPKTG4',
        timestamps: [
          {
            time: 823,
            display: '13:43',
          },
          {
            time: 4713,
            display: '1:18:33',
          },
        ],
      },
    ],
  },
  {
    title: 'ENReco Chapter 1 Episode 8. Sep 8th, 2024',
    povs: [
      {
        name: 'Nerissa POV',
        id: 'qdYQ5j-0sQI',
        timestamps: [
          {
            time: 780,
            display: '13:00',
          },
          {
            time: 1823,
            display: '30:23',
          },
          {
            time: 2417,
            display: '40:17',
          },
          {
            time: 2588,
            display: '43:08',
          },
          {
            time: 3114,
            display: '51:54',
          },
          {
            time: 3886,
            display: '1:04:46',
          },
          {
            time: 6483,
            display: '1:48:03',
          },
          {
            time: 7214,
            display: '2:00:14',
          },
          {
            time: 7284,
            display: '2:01:24',
          },
          {
            time: 10371,
            display: '2:52:51',
          },
          {
            time: 13851,
            display: '3:50:51',
          },
        ],
      },
      {
        name: 'ERB POV',
        id: '_urPfTQnLes',
        timestamps: [
          {
            time: 5797,
            display: '1:36:37',
          },
          {
            time: 6842,
            display: '1:54:02',
          },
          {
            time: 7435,
            display: '2:03:55',
          },
          {
            time: 7527,
            display: '2:05:27',
          },
          {
            time: 7604,
            display: '2:06:44',
          },
          {
            time: 7690,
            display: '2:08:10',
          },
          {
            time: 7984,
            display: '2:13:04',
          },
          {
            time: 8133,
            display: '2:15:33',
          },
          {
            time: 8403,
            display: '2:20:03',
          },
          {
            time: 8905,
            display: '2:28:25',
          },
          {
            time: 9620,
            display: '2:40:20',
          },
          {
            time: 9714,
            display: '2:41:54',
          },
          {
            time: 12221,
            display: '3:23:41',
          },
          {
            time: 12304,
            display: '3:25:04',
          },
          {
            time: 15388,
            display: '4:16:28',
          },
          {
            time: 15720,
            display: '4:22:00',
          },
          {
            time: 18870,
            display: '5:14:30',
          },
          {
            time: 19020,
            display: '5:21:17',
          },
        ],
      },
    ],
  },
  {
    title: 'PowerWash Simulator BloodRaven. Oct 16th, 2024',
    povs: [
      {
        name: 'Nerissa POV',
        id: '6lfDKecsl6g',
        timestamps: [
          {
            time: 405,
            display: '6:45',
          },
          {
            time: 3962,
            display: '1:06:02',
          },
          {
            time: 10733,
            display: '2:58:53',
          },
          {
            time: 10746,
            display: '2:59:06',
          },
        ],
      },
      {
        name: 'ERB POV',
        id: 'y8Nn0CdTlzU',
        timestamps: [
          {
            time: 353,
            display: '5:53',
          },
          {
            time: 2687,
            display: '44:47',
          },
          {
            time: 2902,
            display: '48:22',
          },
          {
            time: 3913,
            display: '1:05:13',
          },
          {
            time: 4012,
            display: '1:06:52',
          },
          {
            time: 4045,
            display: '1:07:25',
          },
        ],
      },
    ],
  },
  {
    title: 'Justice Haunted Investigation. Nov 1st, 2024',
    povs: [
      {
        name: 'Nerissa POV',
        id: 'KcYUgBvsjLY',
        timestamps: [
          {
            time: 835,
            display: '13:55',
          },
          {
            time: 904,
            display: '15:04',
          },
          {
            time: 1109,
            display: '18:29',
          },
          {
            time: 2514,
            display: '41:54',
          },
          {
            time: 3452,
            display: '57:32',
          },
          {
            time: 3591,
            display: '59:51',
          },
          {
            time: 5085,
            display: '1:24:45',
          },
          {
            time: 6150,
            display: '1:42:30',
          },
        ],
      },
      {
        name: 'ERB POV',
        id: 'bdwGIYhBXuU',
        timestamps: [
          {
            time: 565,
            display: '9:25',
          },
          {
            time: 834,
            display: '13:54',
          },
          {
            time: 2246,
            display: '37:26',
          },
          {
            time: 3169,
            display: '52:49',
          },
          {
            time: 3327,
            display: '55:27',
          },
          {
            time: 4814,
            display: '1:20:14',
          },
          {
            time: 5882,
            display: '1:38:02',
          },
        ],
      },
    ],
  },
  {
    title: 'Hololive League of Legends Collab',
    povs: [
      {
        name: 'Nerissa POV',
        id: '54UVnzsa_OY',
        timestamps: [
          {
            time: 1420,
            display: '23:40',
          },
          {
            time: 1489,
            display: '24:49',
          },
          {
            time: 2044,
            display: '34:04',
          },
          {
            time: 2208,
            display: '36:48',
          },
          {
            time: 3202,
            display: '53:22',
          },
          {
            time: 3374,
            display: '56:14',
          },
          {
            time: 3696,
            display: '1:01:36',
          },
          {
            time: 4612,
            display: '1:16:52',
          },
          {
            time: 5312,
            display: '1:28:32',
          },
          {
            time: 5393,
            display: '1:29:53',
          },
          {
            time: 5828,
            display: '1:37:08',
          },
          {
            time: 7229,
            display: '2:00:29',
          },
          {
            time: 7438,
            display: '2:03:58',
          },
          {
            time: 7717,
            display: '2:08:37',
          },
          {
            time: 9579,
            display: '2:39:39',
          },
          {
            time: 9702,
            display: '2:41:42',
          },
        ],
      },
      {
        name: 'ERB POV',
        id: 'eCRLPfFYN4c',
        timestamps: [
          {
            time: 957,
            display: '15:57',
          },
          {
            time: 1030,
            display: '17:10',
          },
          {
            time: 1534,
            display: '25:34',
          },
          {
            time: 1748,
            display: '29:08',
          },
          {
            time: 2739,
            display: '45:39',
          },
          {
            time: 2915,
            display: '48:35',
          },
          {
            time: 3234,
            display: '53:54',
          },
          {
            time: 3677,
            display: '1:01:17',
          },
          {
            time: 4856,
            display: '1:20:56',
          },
          {
            time: 5366,
            display: '1:29:26',
          },
        ],
      },
    ],
  },
]
</script>

<template>
  <div class="clips-page">
    <button class="back-btn" @click="router.push('/hub')">← Back</button>

    <div class="header">
      <h1>BloodRaven Clips</h1>
      <p>
        Watch the iconic moment from these two being oldge marriage couple (why are they like this
        /affectionate)
      </p>
    </div>

    <div class="video-grid">
      <div v-for="(clip, index) in clips" :key="clip.title" class="video-card">
        <h3>{{ clip.title }}</h3>

        <div v-if="clip.povs.length > 1" class="pov-tabs">
          <button
            v-for="(pov, i) in clip.povs"
            :key="pov.name"
            :class="{ active: activePOV[index] === i }"
            @click="activePOV[index] = i"
          >
            {{ pov.name }}
          </button>
        </div>

        <iframe
          :key="activePOV[index] || 0"
          :src="`https://www.youtube.com/embed/${clip.povs[activePOV[index] || 0].id}?start=${currentTime[index] || 0}&autoplay=1`"
          allowfullscreen
        ></iframe>
        <div class="timestamps">
          <span
            v-for="stamp in clip.povs[activePOV[index] || 0].timestamps"
            :key="stamp.time"
            class="timestamp"
            @click="handleTimestampClick(index, stamp.time)"
          >
            ▶ {{ stamp.display }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.clips-page,
.home-page,
.container {
  max-width: 100%;
  overflow-x: hidden;
}
.clips-page {
  min-height: 100vh;
  background: radial-gradient(circle at top, #0a0a0a, #000);
  color: white;
  padding: 60px;
}

@media (max-width: 1024px) {
  .clips-page {
    padding: 40px 30px;
  }
}

@media (max-width: 640px) {
  .clips-page {
    padding: 20px 15px;
  }
}

.back-btn {
  position: fixed;
  top: 26px;
  left: 26px;

  display: flex;
  align-items: center;
  gap: 10px;

  padding: 12px 24px;

  font-size: 15px;
  font-weight: 600;

  border-radius: 12px;

  background: linear-gradient(135deg, #0f172a, #1e293b);
  border: 1px solid rgba(80, 120, 255, 0.35);

  color: #e6f1ff;

  cursor: pointer;

  transition: all 0.25s ease;

  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.6),
    0 0 10px rgba(80, 120, 255, 0.2);
}

.back-btn:hover {
  transform: translateY(-2px) scale(1.03);

  border-color: #38bdf8;

  box-shadow:
    0 0 12px rgba(56, 189, 248, 0.7),
    0 0 24px rgba(56, 189, 248, 0.35);
}

.back-btn:active {
  transform: translateY(0) scale(0.96);
}

.back-btn:hover {
  transform: translateY(-2px) scale(1.03);

  border-color: #38bdf8;

  box-shadow:
    0 0 12px rgba(56, 189, 248, 0.7),
    0 0 24px rgba(56, 189, 248, 0.35);
}

.back-btn:active {
  transform: translateY(0) scale(0.96);
}

.back-btn:hover .arrow {
  transform: translateX(-4px);
}

.arrow {
  transition: transform 0.25s ease;
}

.header {
  text-align: center;
  margin-bottom: 60px;
}

.header h1 {
  font-size: 52px;
}

@media (max-width: 1024px) {
  .header h1 {
    font-size: 40px;
  }
}

@media (max-width: 640px) {
  .header h1 {
    font-size: 28px;
  }
}

@media (max-width: 640px) {
  .back-btn {
    top: 15px;
    left: 15px;
    padding: 8px 14px;
    font-size: 13px;
  }
}
.header p {
  color: #cfcfcf;
  margin-top: 12px;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.video-card {
  background: #111;
  border-radius: 14px;
  overflow: hidden;

  transition: all 0.25s ease;
}

.video-card iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: none;
}

.video-card h3 {
  padding: 16px;
  font-size: 18px;
}

.video-card:hover {
  transform: translateY(-6px);

  box-shadow: 0 0 20px rgba(42, 168, 255, 0.4);
}
@media (max-width: 640px) {
  .header h1 {
    font-size: 28px;
  }

  .video-card h3 {
    font-size: 16px;
  }

  .video-grid {
    gap: 20px;
  }
}

.timestamps {
  padding: 0 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
}

.timestamp {
  font-size: 14px;
  padding: 6px 8px;
}

@media (max-width: 640px) {
  .timestamp {
    font-size: 13px;
    padding: 8px;
  }
}

.timestamp:hover {
  color: #7dd3fc;

  text-shadow:
    0 0 6px rgba(56, 189, 248, 0.6),
    0 0 12px rgba(56, 189, 248, 0.4);
}
.pov-tabs {
  display: flex;
  gap: 8px;
  padding: 0 16px 10px;
  flex-wrap: wrap;
}
.pov-tabs button {
  background: #1a1a1a;
  border: 1px solid #333;
  color: white;
  padding: 5px 10px;
  border-radius: 8px;
  cursor: pointer;
}

.pov-tabs button.active {
  border-color: #38bdf8;
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.5);
}
</style>
