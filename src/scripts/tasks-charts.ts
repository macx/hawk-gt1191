import Chart from 'chart.js/auto'

const parseState = (value: string | null): Record<string, boolean> => {
  if (!value) return {}
  try {
    return JSON.parse(value)
  } catch {
    return {}
  }
}

const loadState = (key: string): Record<string, boolean> => {
  try {
    return parseState(localStorage.getItem(key))
  } catch {
    return {}
  }
}

const saveState = (key: string, state: Record<string, boolean>): void => {
  try {
    localStorage.setItem(key, JSON.stringify(state))
  } catch {
    // Ignore write errors (private mode, quota, etc.).
  }
}

const charts = new WeakMap<HTMLCanvasElement, Chart>()

const getChartColors = (): { done: string; open: string } => {
  const styles = getComputedStyle(document.documentElement)
  const done = styles.getPropertyValue('--clr-primary').trim() || '#c16330'
  const open = styles.getPropertyValue('--clr-line').trim() || '#d7d7d7'
  return { done, open }
}

const updateChart = (
  canvas: HTMLCanvasElement | null,
  openCount: number,
  doneCount: number
): void => {
  if (!canvas) return
  const { done, open } = getChartColors()
  const existing = charts.get(canvas)

  if (existing) {
    existing.data.datasets[0].data = [doneCount, openCount]
    existing.update()
    return
  }

  const chart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: ['Erledigt', 'Offen'],
      datasets: [
        {
          data: [doneCount, openCount],
          backgroundColor: [done, open],
          borderWidth: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      circumference: 360,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    }
  })

  charts.set(canvas, chart)
}

const updateCategory = (section: Element): void => {
  const inputs = Array.from(
    section.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"][data-task-id]'
    )
  )
  const total = inputs.length
  const done = inputs.filter((input) => input.checked).length
  const open = total - done

  const doneEl = section.querySelector<HTMLElement>('[data-tasks-done]')
  const totalEl = section.querySelector<HTMLElement>('[data-tasks-total]')
  const percentEl = section.querySelector<HTMLElement>('[data-tasks-percent]')
  if (doneEl) doneEl.textContent = String(done)
  if (totalEl) totalEl.textContent = String(total)
  if (percentEl) {
    const percent = total > 0 ? Math.round((done / total) * 100) : 0
    percentEl.textContent = `${percent}%`
  }

  const canvas = section.querySelector<HTMLCanvasElement>('[data-tasks-chart]')
  updateChart(canvas, open, done)

  const celebrate = section.querySelector<SVGElement>('[data-tasks-celebrate]')
  if (celebrate) {
    if (total > 0 && done === total) {
      celebrate.classList.remove('is-active')
      celebrate.style.opacity = ''
      void celebrate.getBoundingClientRect()
      celebrate.classList.add('is-active')
    } else {
      celebrate.classList.remove('is-active')
      celebrate.style.opacity = ''
    }
  }
}

const playSound = (audio: HTMLAudioElement | null): void => {
  if (!audio) return
  try {
    audio.currentTime = 0
    void audio.play()
  } catch {
    // Ignore playback errors (autoplay restrictions, etc.).
  }
}

const stopSounds = (audios: Array<HTMLAudioElement | null>): void => {
  audios.forEach((audio) => {
    if (!audio) return
    try {
      audio.pause()
      audio.currentTime = 0
    } catch {
      // Ignore stop errors (autoplay restrictions, etc.).
    }
  })
}

const hydrateTasks = (root: Element): void => {
  const storageKey = (root as HTMLElement).dataset.storageKey || 'tasks'
  const inputs = root.querySelectorAll<HTMLInputElement>(
    'input[type="checkbox"][data-task-id]'
  )
  const state = loadState(storageKey)
  const fillAudio = root.querySelector<HTMLAudioElement>(
    '[data-tasks-audio-fill]'
  )
  const emptyAudio = root.querySelector<HTMLAudioElement>(
    '[data-tasks-audio-empty]'
  )
  const applauseAudio = root.querySelector<HTMLAudioElement>(
    '[data-tasks-audio-applause]'
  )

  inputs.forEach((input) => {
    const id = input.dataset.taskId
    if (id) {
      input.checked = Boolean(state[id])
    }
  })

  const sections = root.querySelectorAll('.media-item-article')
  sections.forEach((section) => {
    const sectionInputs = section.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"][data-task-id]'
    )

    sectionInputs.forEach((input) => {
      input.addEventListener('change', () => {
        const scrollTop = window.scrollY
        const id = input.dataset.taskId
        if (id) {
          state[id] = input.checked
          saveState(storageKey, state)
        }
        stopSounds([fillAudio, emptyAudio, applauseAudio])
        const allChecked =
          sectionInputs.length > 0 &&
          Array.from(sectionInputs).every((item) => item.checked)
        if (allChecked) {
          playSound(applauseAudio)
        } else if (input.checked) {
          playSound(fillAudio)
        } else {
          playSound(emptyAudio)
        }
        updateCategory(section)
        requestAnimationFrame(() => {
          if (window.scrollY !== scrollTop) {
            window.scrollTo({ top: scrollTop, behavior: 'auto' })
          }
        })
      })
    })

    updateCategory(section)
  })
}

document.querySelectorAll('.tasks').forEach(hydrateTasks)

const resetTasks = (root: Element): void => {
  const storageKey = (root as HTMLElement).dataset.storageKey || 'tasks'
  const inputs = Array.from(
    root.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"][data-task-id]'
    )
  )

  inputs.forEach((input) => {
    input.checked = false
  })

  saveState(storageKey, {})

  const sections = root.querySelectorAll('.media-item-article')
  sections.forEach(updateCategory)
}

document
  .querySelectorAll<HTMLElement>('[data-tasks-reset]')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const targetKey = button.dataset.storageKey
      const roots = document.querySelectorAll('.tasks')
      roots.forEach((root) => {
        const key = (root as HTMLElement).dataset.storageKey || 'tasks'
        if (!targetKey || targetKey === key) {
          resetTasks(root)
        }
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  })
