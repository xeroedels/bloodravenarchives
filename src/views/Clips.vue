<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const activePOV = ref({})
const router = useRouter()

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
        ],
      },
    ],
  },
]
</script>

<template>
  <div class="clips-page">
    <button class="back-btn" @click="$router.push('/hub')">← Back</button>

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
          :src="`https://www.youtube.com/embed/${clip.povs[activePOV[index] || 0].id}`"
          allowfullscreen
        ></iframe>

        <div class="timestamps">
          <span
            v-for="stamp in clip.povs[activePOV[index] || 0].timestamps"
            :key="stamp.time"
            class="timestamp"
            @click="
              $event.target.closest('.video-card').querySelector('iframe').src =
                `https://www.youtube.com/embed/${clip.povs[activePOV[index] || 0].id}?start=${stamp.time}&autoplay=1`
            "
          >
            ▶ {{ stamp.display }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.clips-page {
  min-height: 100vh;
  background: radial-gradient(circle at top, #0a0a0a, #000);
  color: white;
  padding: 60px;
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

  background: linear-gradient(90deg, #2aa8ff, #ff0033);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header p {
  color: #cfcfcf;
  margin-top: 12px;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 40px;
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
@media (max-width: 700px) {
  .clips-page {
    padding: 30px 20px;
  }

  .header h1 {
    font-size: 36px;
  }

  .video-grid {
    gap: 25px;
  }

  .video-card h3 {
    font-size: 16px;
  }
}
.timestamps {
  padding: 0 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.timestamp {
  font-size: 14px;
  color: #38bdf8;
  cursor: pointer;
  transition: all 0.2s ease;
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
