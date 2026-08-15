import React, { useCallback, useEffect, useRef, useState } from 'react'

const dispatchSteps = [
  ['ORCHESTRATOR', 'Reading project rules and current workspace state'],
  ['SCOUT', 'Mapping affected repository, domain, and deployment path'],
  ['BUILDER', 'Preparing a scoped implementation task'],
  ['REVIEWER', 'Checking safety, tests, and production impact'],
]

function isSpeechAvailable() {
  return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition)
}

function startCinematicAudio() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    const context = new AudioContext()
    const master = context.createGain()
    master.gain.setValueAtTime(0.0001, context.currentTime)
    master.gain.exponentialRampToValueAtTime(0.16, context.currentTime + 0.4)
    master.connect(context.destination)

    const pad = context.createOscillator()
    const padGain = context.createGain()
    pad.type = 'triangle'
    pad.frequency.value = 110
    padGain.gain.value = 0.22
    pad.connect(padGain).connect(master)
    pad.start()

    ;[196, 247, 330, 392, 523].forEach((frequency, index) => {
      const oscillator = context.createOscillator()
      const gain = context.createGain()
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(frequency, context.currentTime + 0.18 + index * 0.16)
      gain.gain.setValueAtTime(0.0001, context.currentTime + 0.18 + index * 0.16)
      gain.gain.exponentialRampToValueAtTime(0.12, context.currentTime + 0.22 + index * 0.16)
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 1.1 + index * 0.16)
      oscillator.connect(gain).connect(master)
      oscillator.start(context.currentTime + 0.18 + index * 0.16)
      oscillator.stop(context.currentTime + 1.25 + index * 0.16)
    })

    window.setTimeout(() => {
      master.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.8)
      window.setTimeout(() => {
        pad.stop()
        context.close()
      }, 900)
    }, 4200)
  } catch {
    // Audio is a progressive enhancement.
  }
}

function speakGreeting() {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance('Hi boss, what can I do for you?')
  utterance.rate = 0.94
  utterance.pitch = 0.84
  window.speechSynthesis.speak(utterance)
}

export default function CommandCenterPage() {
  const [password, setPassword] = useState('')
  const [accessState, setAccessState] = useState('locked')
  const [command, setCommand] = useState('')
  const [listening, setListening] = useState(false)
  const [speechState, setSpeechState] = useState('Voice ready when you are.')
  const [dispatch, setDispatch] = useState([])
  const [showDispatch, setShowDispatch] = useState(false)
  const recognitionRef = useRef(null)
  const silenceTimerRef = useRef(null)

  const submitCommand = useCallback((rawCommand = command) => {
    const task = rawCommand.trim()
    if (!task) return
    setCommand(task)
    setShowDispatch(true)
    setDispatch([])
    dispatchSteps.forEach(([agent, message], index) => {
      window.setTimeout(() => {
        setDispatch((current) => [...current, { agent, message, task }])
      }, 420 + index * 700)
    })
    window.fetch('/api/command', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ command: task, source: 'command-center' }),
    }).catch(() => {})
  }, [command])

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop()
    setListening(false)
  }, [])

  const startListening = useCallback(() => {
    if (!isSpeechAvailable()) {
      setSpeechState('Speech recognition is not available in this browser. Type your mission below.')
      return
    }
    if (recognitionRef.current) recognitionRef.current.stop()
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new Recognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'
    let finalTranscript = ''
    recognition.onstart = () => {
      setListening(true)
      setSpeechState('Listening. I will prepare the mission after three seconds of silence.')
    }
    recognition.onresult = (event) => {
      let interim = ''
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const transcript = event.results[index][0].transcript
        if (event.results[index].isFinal) finalTranscript += `${transcript} `
        else interim += transcript
      }
      const nextCommand = `${finalTranscript}${interim}`.trim()
      setCommand(nextCommand)
      window.clearTimeout(silenceTimerRef.current)
      silenceTimerRef.current = window.setTimeout(() => {
        const mission = `${finalTranscript}${interim}`.trim()
        if (mission) submitCommand(mission)
        stopListening()
      }, 3000)
    }
    recognition.onerror = (event) => {
      setListening(false)
      setSpeechState(event.error === 'not-allowed' ? 'Microphone permission is required to listen.' : 'Voice capture paused. You can type your mission below.')
    }
    recognition.onend = () => setListening(false)
    recognitionRef.current = recognition
    recognition.start()
  }, [stopListening, submitCommand])

  useEffect(() => () => {
    window.clearTimeout(silenceTimerRef.current)
    recognitionRef.current?.stop()
  }, [])

  async function unlock(event) {
    event.preventDefault()
    if (!password) return
    setAccessState('checking')
    try {
      const response = await fetch('/api/access/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password }),
      })
      if (!response.ok) throw new Error('Denied')
      setAccessState('entering')
      startCinematicAudio()
      window.setTimeout(() => {
        setAccessState('unlocked')
        speakGreeting()
        startListening()
      }, 2400)
    } catch {
      setAccessState('denied')
    }
  }

  const locked = accessState !== 'unlocked'
  return (
    <main className={`command-center ${locked ? 'command-center--locked' : 'command-center--open'}`}>
      <div className="command-center__aurora" aria-hidden="true" />
      <video className="command-center__video" autoPlay muted loop playsInline aria-hidden="true">
        <source src="/assets/myappai-live-wallpaper.mp4" type="video/mp4" />
      </video>
      {accessState === 'entering' && (
        <div className="entrance-morph" aria-hidden="true">
          <div className="entrance-morph__ring" />
          <div className="entrance-morph__core" />
        </div>
      )}
      {locked && accessState !== 'entering' && <section className={`access-gate access-gate--${accessState}`} aria-label="Private access">
        <div className="access-gate__orb" aria-hidden="true"><span /></div>
        <p className="eyebrow">MYAPPAI // PRIVATE OPERATOR NETWORK</p>
        <h1>Enter the command center.</h1>
        <p>One private workspace for every project, domain, and agent mission.</p>
        <form onSubmit={unlock}>
          <label htmlFor="command-password">Password</label>
          <input id="command-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} disabled={accessState === 'checking' || accessState === 'entering'} />
          <button type="submit" disabled={accessState === 'checking' || accessState === 'entering'}>{accessState === 'checking' ? 'VERIFYING ACCESS' : accessState === 'entering' ? 'INITIALIZING' : 'ENTER COMMAND CENTER'}</button>
        </form>
        {accessState === 'denied' && <p className="access-gate__error" role="alert">Access denied. Check the private password and try again.</p>}
      </section>}
      {accessState === 'unlocked' && <section className="mission-shell">
        <header className="mission-header"><div><p className="eyebrow">3000 STUDIOS // CONTROL ROOM</p><h1>Boss Orchestrator</h1></div><span className="secure-status">PRIVATE SESSION ACTIVE</span></header>
        <section className="mission-hero">
          <div className="agent-avatar" aria-hidden="true"><div className="agent-avatar__halo" /><div className="agent-avatar__core" /><div className="agent-avatar__scan" /></div>
          <div className="mission-copy"><p className="eyebrow">ORCHESTRATION ONLINE</p><h2>Hi boss, what can I do for you?</h2><p>I will map the work, assign the right agents, and keep every project’s production rules in view.</p></div>
          <aside className="mission-stats"><span>PROJECTS <b>CONNECTED</b></span><span>AGENTS <b>STANDING BY</b></span><span>PRODUCTION <b>GUARDED</b></span></aside>
        </section>
        <section className="command-composer" aria-label="Mission composer">
          <button type="button" className={`mic-button ${listening ? 'mic-button--live' : ''}`} onClick={listening ? stopListening : startListening} aria-pressed={listening}>{listening ? 'STOP' : 'VOICE'}</button>
          <label className="sr-only" htmlFor="mission-command">Tell the orchestrator what to do</label>
          <textarea id="mission-command" rows="3" value={command} onChange={(event) => setCommand(event.target.value)} placeholder="Tell the orchestrator what you want done…" />
          <button type="button" className="dispatch-button" onClick={() => submitCommand()}>DISPATCH</button>
          <p>{speechState}</p>
        </section>
      </section>}
      {showDispatch && <aside className="dispatch-window" role="status" aria-live="polite"><header><span>LIVE MISSION DISPATCH</span><button onClick={() => setShowDispatch(false)} aria-label="Close dispatch">×</button></header><p className="dispatch-window__task">{command}</p>{dispatch.map((item) => <div className="dispatch-row" key={item.agent}><strong>{item.agent}</strong><span>{item.message}</span><i>ACTIVE</i></div>)}{dispatch.length === dispatchSteps.length && <p className="dispatch-window__notice">Mission is staged for the secured operator queue. Review and approve production-impacting actions before execution.</p>}</aside>}
    </main>
  )
}
