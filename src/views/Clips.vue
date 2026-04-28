<script setup>
import { ref, onMounted, computed, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { saveProgress, loadProgress } from '@/utils/progress'

const currentTime = ref({})
const activePOV = ref({})
const shouldAutoplay = ref({})
const router = useRouter()
const reloadKey = ref({})

const searchQuery = ref('')

const filteredClips = computed(() => {
  return clips.filter((clip) => {
    const query = searchQuery.value.toLowerCase()

    const matchesTitle = clip.title.toLowerCase().includes(query)

    const matchesPOV = clip.povs.some((pov) => pov.name.toLowerCase().includes(query))

    return matchesTitle || matchesPOV
  })
})
onMounted(() => {
  clips.forEach((clip) => {
    const saved = loadProgress(clip.id)

    if (saved) {
      currentTime.value[clip.id] = saved.time

      const povIndex = clip.povs.findIndex((p) => p.id === saved.videoId)
      if (povIndex !== -1) {
        activePOV.value[clip.id] = povIndex
      }
    }
  })
})
function handleTimestampClick(id, time, videoId) {
  currentTime.value = { ...currentTime.value, [id]: time }
  saveProgress(id, videoId, time)
}

function highlightText(text) {
  if (!searchQuery.value) return text

  const query = searchQuery.value.toLowerCase()

  const index = text.toLowerCase().indexOf(query)

  if (index === -1) return text

  const before = text.slice(0, index)

  const match = text.slice(index, index + query.length)

  const after = text.slice(index + query.length)

  return `${before} <span class ="highlight">${match}</span>${after}`
}

function handleKeydown(e) {
  if (e.key === 'Escape') {
    searchQuery.value = ''
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

watch(searchQuery, () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
})

const clips = [
  {
    id: 1,
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
    id: 2,
    title: 'Advent vs Justice Party Animals Collab. July 22nd, 2024',
    povs: [
      {
        name: 'Nerissa POV',
        id: 'UPZV-6DoRqY',
        timestamps: [{ time: 4947, display: '1:22:27' }],
      },
      {
        name: 'ERB POV',
        id: 'fxvyyBIBNA8',
        timestamps: [
          {
            time: 4495,
            display: '1:14:55',
          },
        ],
      },
    ],
  },
  {
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
    id: 12,
    title: 'Liz playing Valorant with Nerissa appear on chat. Nov 6th, 2024',
    povs: [
      {
        name: 'ERB POV',
        id: 'HQlZTLGIC-g',
        timestamps: [
          {
            time: 1368,
            display: '22:48',
          },
        ],
      },
    ],
  },
  {
    id: 13,
    title: 'Hololive League of Legends Collab ft Fauna, Gigi and Cecilia. Nov 18th, 2024',
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
            time: 7890,
            display: '2:11:30',
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
          {
            time: 6766,
            display: '1:52:46',
          },
          {
            time: 7051,
            display: '1:57:31',
          },
          {
            time: 7431,
            display: '2:03:51',
          },
          {
            time: 9119,
            display: '2:31:59',
          },
        ],
      },
    ],
  },
  {
    id: 14,
    title: 'PowerWas Simulator BloodRaven with Kiara and Shiori. Nov 20th, 2024',
    povs: [
      {
        name: 'Nerissa POV',
        id: 'I7GFX246XL8',
        timestamps: [
          {
            time: 300,
            display: '5:00',
          },
          {
            time: 1747,
            display: '29:07',
          },
          {
            time: 2335,
            display: '38:55',
          },
        ],
      },
      {
        name: 'ERB POV',
        id: 'xrdUzJB5xV8',
        timestamps: [
          {
            time: 270,
            display: '4:30',
          },
          {
            time: 1716,
            display: '28:36',
          },
          {
            time: 2306,
            display: '38:26',
          },
        ],
      },
    ],
  },
  {
    id: 15,
    title: 'Nerissa Birthday slumber party. Nov 21st, 2024',
    povs: [
      {
        name: 'Nerissa POV',
        id: 'NJajbdH6q60',
        timestamps: [
          {
            time: 3152,
            display: '52:32',
          },
          {
            time: 3275,
            display: '54:35',
          },
          {
            time: 3707,
            display: '1:01:47',
          },
          {
            time: 9797,
            display: '2:43:17',
          },
        ],
      },
    ],
  },
  {
    id: 16,
    title: 'Hololive League of Legends Collab ft Fauna, Gigi and Cecilia part 2. Nov 30th, 2024',
    povs: [
      {
        name: 'Nerissa POV',
        id: 'zBeEd0vPyKM',
        timestamps: [
          {
            time: 1212,
            display: '20:12',
          },
          {
            time: 2121,
            display: '35:21',
          },
        ],
      },
      {
        name: 'ERB POV',
        id: 'cBekcLjAW00',
        timestamps: [
          {
            time: 1014,
            display: '16:54',
          },
          {
            time: 1925,
            display: '32:05',
          },
        ],
      },
    ],
  },
  {
    id: 17,
    title: 'Hololive League of Legends Collab ft Gigi, Cecilia and Kiara. Dec 7th, 2024',
    povs: [
      {
        name: 'Nerissa POV',
        id: 'BF-UZEkKRXo',
        timestamps: [
          {
            time: 315,
            display: '5:15',
          },
          {
            time: 1865,
            display: '31:05',
          },
          {
            time: 2143,
            display: '35:43',
          },
          {
            time: 8394,
            display: '2:19:54',
          },
          {
            time: 10888,
            display: '3:01:28',
          },
        ],
      },
      {
        name: 'ERB POV',
        id: 'HeB6Z2zGGRQ',
        timestamps: [
          {
            time: 480,
            display: '8:00',
          },
          {
            time: 1670,
            display: '27:50',
          },
          {
            time: 1946,
            display: '32:26',
          },
          {
            time: 8198,
            display: '2:16:38',
          },
          {
            time: 10690,
            display: '2:58:10',
          },
        ],
      },
    ],
  },
  {
    id: 18,
    title: 'The Broken Promise Watchalong. Dec 18th, 2024',
    povs: [
      {
        name: 'ERB POV',
        id: 'qXDTjLL4-H0',
        timestamps: [
          {
            time: 250,
            display: '4:10',
          },
          {
            time: 333,
            display: '5:33',
          },
          {
            time: 2515,
            display: '41:55',
          },
          {
            time: 2663,
            display: '44:23',
          },
          {
            time: 4910,
            display: '1:21:50',
          },
          {
            time: 5070,
            display: '1:24:30',
          },
          {
            time: 5250,
            display: '1:27:30',
          },
        ],
      },
    ],
  },
  {
    id: 19,
    title: 'Hololive League of Legend Collab with Liz on chat',
    povs: [
      {
        name: 'Nerissa POV',
        id: 'Yj6CH1ZdGpU',
        timestamps: [
          {
            time: 1352,
            display: '22:32',
          },
          {
            time: 1420,
            display: '23:40',
          },
        ],
      },
    ],
  },
  {
    id: 20,
    title: 'Wicked Part One Watchalong. Jan 7th, 2025',
    povs: [
      {
        name: 'Nerissa POV',
        id: 'BR9uPUIP3-M',
        timestamps: [
          {
            time: 296,
            display: '4:56',
          },
          {
            time: 9945,
            display: '2:45:45',
          },
          {
            time: 10222,
            display: '2:50:22',
          },
          {
            time: 10535,
            display: '2:55:35',
          },
        ],
      },
    ],
  },
  {
    id: 21,
    title: 'Elizabeth New Year Outfit Reveal with Nerissa on Chat',
    povs: [
      {
        name: 'ERB POV',
        id: 'KUy6mtsxKDU',
        timestamps: [
          {
            time: 384,
            display: '06:24',
          },
        ],
      },
    ],
  },
  {
    id: 22,
    title: 'Advent & Justice Murky Diver Collab. Jan 31st, 2025',
    povs: [
      {
        name: 'Nerissa POV',
        id: 'pX8BDPy_azo',
        timestamps: [
          {
            time: 279,
            display: '4:39',
          },
          {
            time: 2466,
            display: '41:06',
          },
          {
            time: 3455,
            display: '57:35',
          },
          {
            time: 3493,
            display: '58:13',
          },
          {
            time: 3697,
            display: '1:01:37',
          },
          {
            time: 3940,
            display: '1:05:40',
          },
          {
            time: 4069,
            display: '1:07:49',
          },
          {
            time: 4387,
            display: '1:13:07',
          },
          {
            time: 5741,
            display: '1:35:41',
          },
          {
            time: 5928,
            display: '1:38:48',
          },
          {
            time: 6500,
            display: '1:48:20',
          },
          {
            time: 6550,
            display: '1:49:10',
          },
          {
            time: 7577,
            display: '2:06:17',
          },
        ],
      },
      {
        name: 'ERB POV',
        id: 'JwC5rwW8LaI',
        timestamps: [
          {
            time: 1164,
            display: '19:24',
          },
          {
            time: 3156,
            display: '52:36',
          },
          {
            time: 3182,
            display: '53:02',
          },
          {
            time: 3225,
            display: '53:45',
          },
          {
            time: 3418,
            display: '56:58',
          },
          {
            time: 3650,
            display: '1:00:50',
          },
          {
            time: 3785,
            display: '1:03:05',
          },
          {
            time: 4030,
            display: '1:07:10',
          },
          {
            time: 4090,
            display: '1:08:16',
          },
          {
            time: 4580,
            display: '1:16:20',
          },
          {
            time: 5120,
            display: '1:25:20',
          },
        ],
      },
    ],
  },
  {
    id: 23,
    title: 'Nerissa Yappa Stream with Liz appear in chat on the very last minute. Apr 22nd, 2025',
    povs: [
      {
        name: 'Nerissa POV',
        id: 'sLe9nHFa4cc',
        timestamps: [
          {
            time: 7931,
            display: '2:12:11',
          },
        ],
      },
    ],
  },
  {
    id: 24,
    title: 'Liz birthday karaoke with Rissa appear on chat. Apr 25th, 2025',
    povs: [
      {
        name: 'ERB POV',
        id: '1OSCNdXa2Zs',
        timestamps: [
          {
            time: 698,
            display: '11:38',
          },
          {
            time: 1012,
            display: '16:52',
          },
        ],
      },
    ],
  },
  {
    id: 25,
    title:
      'Liz birthday collab ft Nerissa, Kronii, Gigi, Cecilia, Raora, Ina, Shiori, Biboo, Anya. Apr 25th, 2025',
    povs: [
      {
        name: 'ERB POV',
        id: 'eU2ED67DCN8',
        timestamps: [
          {
            time: 4145,
            display: '1:09:05',
          },
          {
            time: 4381,
            display: '1:13:01',
          },
          {
            time: 5295,
            display: '1:28:15',
          },
          {
            time: 7431,
            display: '2:03:51',
          },
          {
            time: 8225,
            display: '2:17:05',
          },
        ],
      },
    ],
  },
  {
    id: 26,
    title: 'EnReco Chapter 2 Episode 1. May 4th, 2025',
    povs: [
      {
        name: 'Nerissa POV',
        id: 'XfZh_3xb7i0',
        timestamps: [
          {
            time: 596,
            display: '9:56',
          },
          {
            time: 2530,
            display: '42:10',
          },
          {
            time: 2580,
            display: '43:00',
          },
          {
            time: 2745,
            display: '45:45',
          },
          {
            time: 5200,
            display: '1:26:40',
          },
          {
            time: 5285,
            display: '1:28:05',
          },
          {
            time: 5403,
            display: '1:30:03',
          },
          {
            time: 5883,
            display: '1:38:03',
          },
          {
            time: 8305,
            display: '2:18:25',
          },
          {
            time: 9053,
            display: '2:30:53',
          },
          {
            time: 10405,
            display: '2:53:25',
          },
          {
            time: 10620,
            display: '2:57:00',
          },
          {
            time: 10665,
            display: '2:57:45',
          },
          {
            time: 20178,
            display: '5:36:18',
          },
        ],
      },
      {
        name: 'ERB POV',
        id: '2toZfafpyW8',
        timestamps: [
          {
            time: 221,
            display: '3:41',
          },
          {
            time: 2158,
            display: '35:58',
          },
          {
            time: 2545,
            display: '42:25',
          },
          {
            time: 4819,
            display: '1:20:19',
          },
          {
            time: 5344,
            display: '1:29:04',
          },
          {
            time: 5396,
            display: '1:29:56',
          },
          {
            time: 7931,
            display: '2:12:11',
          },
          {
            time: 8675,
            display: '2:24:35',
          },
          {
            time: 9856,
            display: '2:44:16',
          },
        ],
      },
    ],
  },
  {
    id: 27,
    title: 'EnReco Chapter 2 Episode 2. May 5th, 2025',
    povs: [
      {
        name: 'Nerissa POV',
        id: '5sWjzbacGUY',
        timestamps: [
          {
            time: 4505,
            display: '1:15:05',
          },
          {
            time: 5110,
            display: '1:25:10',
          },
          {
            time: 5530,
            display: '1:32:10',
          },
          {
            time: 7555,
            display: '2:05:55',
          },
          {
            time: 8350,
            display: '2:19:10',
          },
          {
            time: 8540,
            display: '2:22:20',
          },
          {
            time: 11735,
            display: '3:15:35',
          },
          {
            time: 12055,
            display: '3:20:55',
          },
          {
            time: 13640,
            display: '3:47:20',
          },
          {
            time: 15660,
            display: '4:21:00',
          },
        ],
      },
      {
        name: 'ERB POV',
        id: 'wnQuawM-3Jc',
        timestamps: [
          {
            time: 145,
            display: '02:25',
          },
          {
            time: 600,
            display: '10:00',
          },
          {
            time: 1230,
            display: '20:30',
          },
          {
            time: 1310,
            display: '21:50',
          },
          {
            time: 2880,
            display: '48:00',
          },
          {
            time: 3675,
            display: '01:01:15',
          },
          {
            time: 4480,
            display: '01:14:40',
          },
          {
            time: 4650,
            display: '01:17:30',
          },
          {
            time: 7855,
            display: '02:10:55',
          },
          {
            time: 8186,
            display: '02:16:26',
          },
          {
            time: 9750,
            display: '02:42:30',
          },
          {
            time: 11770,
            display: '03:16:10',
          },
        ],
      },
    ],
  },
  {
    id: 28,
    title: 'EnReco Chapter 2 Episode 3. May 6th, 2025',
    povs: [
      {
        name: 'Nerissa POV',
        id: 'vMdhvi8dHN4',
        timestamps: [
          {
            time: 4875,
            display: '1:21:15',
          },
          {
            time: 5655,
            display: '1:34:15',
          },
          {
            time: 5908,
            display: '1:38:28',
          },
          {
            time: 6120,
            display: '1:42:00',
          },
          {
            time: 6338,
            display: '1:45:38',
          },
          {
            time: 6520,
            display: '1:48:40',
          },
          {
            time: 6695,
            display: '1:51:35',
          },
          {
            time: 7590,
            display: '2:06:30',
          },
          {
            time: 7880,
            display: '2:11:20',
          },
        ],
      },
      {
        name: 'ERB POV',
        id: 'CVF91CqGD80',
        timestamps: [
          {
            time: 1813,
            display: '30:13',
          },
          {
            time: 6375,
            display: '1:46:15',
          },
          {
            time: 6528,
            display: '1:48:48',
          },
          {
            time: 7165,
            display: '1:59:25',
          },
          {
            time: 7562,
            display: '2:06:02',
          },
          {
            time: 8183,
            display: ' 2:16:23',
          },
          {
            time: 8305,
            display: '2:18:25',
          },
          {
            time: 9065,
            display: '2:31:05',
          },
          {
            time: 9348,
            display: '2:35:48',
          },
        ],
      },
    ],
  },
  {
    id: 29,
    title: 'EnReco Chapter 2 Episode 4. May 7th, 2025',
    povs: [
      {
        name: 'Nerissa POV',
        id: 'zVWvu3ozXKM',
        timestamps: [
          {
            time: 1150,
            display: '19:10',
          },
          {
            time: 1445,
            display: '24:05',
          },
          {
            time: 2398,
            display: '39:58',
          },
          {
            time: 2615,
            display: '43:35',
          },
          {
            time: 2728,
            display: '45:28',
          },
        ],
      },
      {
        name: 'ERB POV',
        id: 'vbppXmxXo7o',
        timestamps: [
          {
            time: 788,
            display: '13:08',
          },
          {
            time: 3564,
            display: '59:24',
          },
          {
            time: 4098,
            display: '1:08:18',
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
      <h1><span class="clips-text">BloodRaven Clips</span></h1>
      <p>
        Watch the iconic moment from these two being oldge marriage couple (why are they like this
        /affectionate)
      </p>
    </div>
    <div class="search-bar">
      <div class="search-wrapper">
        <input v-model="searchQuery" placeholder="Search Clips..." class="search-input" />
        <button v-if="searchQuery" class="clear-btn" @click="searchQuery = ''">✕</button>
      </div>
    </div>

    <div v-if="filteredClips.length > 0" class="video-grid">
      <div v-for="clip in filteredClips" :key="clip.id" class="video-card">
        <h3 v-html="highlightText(clip.title)"></h3>

        <div v-if="clip.povs.length > 1" class="pov-tabs">
          <button
            v-for="(pov, i) in clip.povs"
            :key="pov.name"
            :class="{ active: activePOV[clip.id] === i }"
            @click="activePOV[clip.id] = i"
          >
            {{ pov.name }}
          </button>
        </div>

        <iframe
          :key="activePOV[clip.id] || 0"
          :src="`https://www.youtube.com/embed/${clip.povs[activePOV[clip.id] || 0].id}?start=${currentTime[clip.id] || 0}&autoplay=1`"
          allowfullscreen
        ></iframe>
        <div class="timestamps">
          <span
            v-for="stamp in clip.povs[activePOV[clip.id] || 0].timestamps"
            :key="stamp.time"
            class="timestamp"
            @click="handleTimestampClick(clip.id, stamp.time)"
          >
            ▶ {{ stamp.display }}
          </span>
        </div>
      </div>
    </div>
    <div v-else class="no-results">
      <div class="no-results-box">
        <h2>No clips found</h2>
        <p>Try a different keyword</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.clips-text {
  background: linear-gradient(90deg, #ff2e2e, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
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

.search-bar {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}

.search-input {
  width: 60%;
  padding: 10px 15px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 10px #3b82f6;
}

.filter-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.filter-select {
  padding: 8px 12px;
  border-radius: 10px;
  background: #111;
  color: white;
}

.no-results {
  text-align: center;
  margin-top: 80px;
  color: #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
  text-align: center;
}

.no-results p {
  font-size: 22px;
  margin-bottom: 10px;
}

.no-results span {
  font-size: 14px;
  color: #666;
}
.no-results-box {
  padding: 30px 40px;
  border-radius: 16px;

  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(10px);

  border: 1px solid rgba(255, 255, 255, 0.1);

  text-align: center;

  box-shadow:
    0 0 20px rgba(42, 168, 255, 0.2),
    0 0 40px rgba(255, 0, 51, 0.2);

  transition: all 0.3s ease;
  cursor: default;
}
.no-results-box h2 {
  font-size: 26px;
  margin-bottom: 10px;

  background: linear-gradient(90deg, #ff2e2e, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: fadeIn 0.4s ease;
}

.no-results-box p {
  font-size: 14px;
  color: #aaa;
}
.no-results-box:hover {
  transform: translateY(-6px) scale(1.02);

  box-shadow:
    0 0 25px rgba(42, 168, 255, 0.4),
    0 0 60px rgba(255, 0, 51, 0.4);
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.highlight {
  color: #fff;

  background: linear-gradient(90deg, #ff2e2e, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  text-shadow:
    0 0 6px rgba(255, 0, 50, 0.6),
    0 0 10px rgba(59, 130, 246, 0.5);
}

.search-wrapper {
  position: relative;
  width: 60%;
}

.search-input {
  width: 100%;
  padding: 10px 40px 10px 15px; /* 👈 space for button */
}

.clear-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);

  background: transparent;
  border: none;
  color: #aaa;

  font-size: 16px;
  cursor: pointer;

  transition: 0.2s;
}

.clear-btn:hover {
  color: white;
  transform: translateY(-50%) scale(1.2);
}
</style>
