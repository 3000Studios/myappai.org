import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const projects = [
  { id: 'myappai', name: 'MyAppAI', domain: 'myappai.org', repo: '3000Studios/myappai.org', status: 'LIVE' },
  { id: 'voicetowebsite', name: 'VoiceToWebsite', domain: 'voicetowebsite.com', repo: '3000Studios/voicetowebsite-copyright-mrjwswain', status: 'LIVE' },
]

const executionSteps = [
  ['ORCHESTRATOR', 'Read project rules and understand the requested outcome'],
  ['SCOUT', 'Locate the affected pages, components, navigation, and deployment path'],
  ['BUILDER', 'Prepare the smallest complete implementation'],
  ['REVIEWER', 'Validate tests, security, mobile behavior, and production impact'],
]

function detectProject(text) {
  const lowered = String(text ?? '').toLowerCase()
  return lowered.includes('voice to website') || lowered.includes('voicetowebsite')
    ? projects[1]
    : projects[0]
}

function buildPlan(task) {
  const lowered = task.toLowerCase()
  const pageIntent = /\b(add|create|build)\b.*\b(page|route)\b/.test(lowered)
  const musicIntent = /\b(add|create|play)\b.*\bmusic\b/.test(lowered)
  const footerIntent = /\bfooter\b/.test(lowered)
  const steps = ['Read the project instructions and current production source.']
  if (pageIntent) steps.push('Create the requested page, add a route, and add a reachable navigation link.')
  if (footerIntent) steps.push('Locate the shared footer and apply the requested global change there.')
  if (musicIntent) steps.push('Use an approved or original audio asset with playback controls and no autoplay violation.')
  steps.push('Run the project checks, commit main, wait for Cloudflare, then verify the live domain.')
  return steps
}

function isSpeechAvailable() {
  return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition)
}

function speakGreeting() {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance('Hi boss, what can I do for you? I will draft first and only send it when you say Send IT.')
  utterance.rate = 0.94
  utterance.pitch = 0.84
  window.speechSynthesis.speak(utterance)
}

export default function CommandCenterPage() {
  const [password, setPassword] = useState('')
  const [accessState, setAccessState] = useState('locked')
  const [command, setCommand] = useState('')
  const [stagedMission, setStagedMission] = useState(null)
  const [listening, setListening] = useState(false)
  const [speechState, setSpeechState] = useState('Voice ready when you are.')
  const [activity, setActivity] = useState([])
  const [operatorResult, setOperatorResult] = useState(null)
  const recognitionRef = useRef(null)
  const silenceTimerRef = useRef(null)
  const selectedProject = useMemo(() => detectProject(stagedMission?.task ?? command), [stagedMission, command])

  const stageMission = useCallback((rawTask = command) => {
    const task = String(rawTask).replace(/\bsend it\b/gi, '').trim()
    if (!task) return
    const project = detectProject(task)
    setCommand(task)
    setStagedMission({ task, project, plan: buildPlan(task) })
    setActivity([])
    setOperatorResult({ status: 'draft', summary: 'Mission drafted. Say “Send IT” or press SEND IT when you want the secured operator to act.' })
  }, [command])

  const executeMission = useCallback((mission = stagedMission) => {
    if (!mission?.task) return
    setOperatorResult({ status: 'sending', summary: `Sending ${mission.project.name} mission to the secured operator…` })
    setActivity([])
    executionSteps.forEach(([agent, message], index) => {
      window.setTimeout(() => setActivity((current) => [...current, { agent, message }]), 320 + index * 650)
    })
    window.fetch('/api/command', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ command: mission.task, projectId: mission.project.id, source: 'command-center' }),
    })
      .then(async (response) => {
        const payload = await response.json().catch(() => ({}))
        setOperatorResult({
          status: payload.status ?? (response.ok ? 'accepted' : 'unavailable'),
          summary: payload.summary ?? payload.message ?? 'The operator did not return a status message.',
          nextSteps: payload.nextSteps ?? [],
          liveUrl: payload.deployment?.status === 'live' ? `https://${mission.project.domain}` : null,
        })
      })
      .catch(() => setOperatorResult({ status: 'offline', summary: 'The secure operator endpoint could not be reached. The mission remains staged.' }))
  }, [stagedMission])

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop()
    setListening(false)
  }, [])

  const startListening = useCallback(() => {
    if (!isSpeechAvailable()) {
      setSpeechState('Speech recognition is unavailable in this browser. Type your mission below.')
      return
    }
    recognitionRef.current?.stop()
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new Recognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'
    let transcript = ''
    recognition.onstart = () => { setListening(true); setSpeechState('Listening. I will draft after ten seconds of silence. Say “Send IT” to run the staged mission.') }
    recognition.onresult = (event) => {
      let next = ''
      for (let index = event.resultIndex; index < event.results.length; index += 1) next += `${event.results[index][0].transcript} `
      transcript = `${transcript} ${next}`.trim()
      if (/\bsend it\b/i.test(transcript) && stagedMission) {
        executeMission(stagedMission)
        setSpeechState('Send IT heard. Secure execution has started.')
        stopListening()
        return
      }
      setCommand(transcript)
      window.clearTimeout(silenceTimerRef.current)
      silenceTimerRef.current = window.setTimeout(() => { stageMission(transcript); stopListening() }, 10000)
    }
    recognition.onerror = (event) => { setListening(false); setSpeechState(event.error === 'not-allowed' ? 'Microphone permission is required to listen.' : 'Voice capture paused. You can type your mission below.') }
    recognition.onend = () => setListening(false)
    recognitionRef.current = recognition
    recognition.start()
  }, [executeMission, stagedMission, stageMission, stopListening])

  useEffect(() => () => { window.clearTimeout(silenceTimerRef.current); recognitionRef.current?.stop() }, [])

  async function unlock(event) {
    event.preventDefault()
    if (!password) return
    setAccessState('checking')
    try {
      const response = await fetch('/api/access/login', { method: 'POST', headers: { 'content-type': 'application/json' }, credentials: 'include', body: JSON.stringify({ password }) })
      if (!response.ok) throw new Error('Denied')
      setAccessState('unlocked')
      speakGreeting()
      startListening()
    } catch { setAccessState('denied') }
  }

  if (accessState !== 'unlocked') return <main className="command-center command-center--locked"><div className="command-center__aurora" aria-hidden="true" /><section className="access-gate"><div className="access-gate__orb" aria-hidden="true"><span /></div><p className="eyebrow">MYAPPAI // PRIVATE OPERATOR NETWORK</p><h1>Enter the command center.</h1><p>One private workspace for every project, domain, and agent mission.</p><form onSubmit={unlock}><label htmlFor="command-password">Password</label><input id="command-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} /><button type="submit">ENTER COMMAND CENTER</button></form>{accessState === 'denied' && <p className="access-gate__error" role="alert">Access denied. Check the private password and try again.</p>}</section></main>

  return <main className="command-center command-center--open"><div className="command-center__aurora" aria-hidden="true" /><section className="mission-shell"><header className="mission-header"><div><p className="eyebrow">3000 STUDIOS // CONTROL ROOM</p><h1>Boss Orchestrator</h1></div><span className="secure-status">PRIVATE SESSION ACTIVE</span></header><div className="control-grid"><aside className="project-library"><p className="eyebrow">PROJECT LIBRARY</p><h2>Ready projects</h2>{projects.map((project) => <button type="button" className={selectedProject.id === project.id ? 'project-card project-card--active' : 'project-card'} key={project.id} onClick={() => setCommand(`On ${project.name}, `)}><strong>{project.name}</strong><span>{project.domain}</span><small>{project.repo}</small><i>{project.status}</i></button>)}</aside><section className="mission-main"><div className="mission-hero"><div className="agent-avatar" aria-hidden="true"><div className="agent-avatar__halo" /><div className="agent-avatar__core" /><div className="agent-avatar__scan" /></div><div className="mission-copy"><p className="eyebrow">ORCHESTRATION ONLINE</p><h2>What can I do for you?</h2><p>Draft freely. Nothing is sent until you say <b>Send IT</b>.</p></div></div><section className="command-composer" aria-label="Mission composer"><button type="button" className={`mic-button ${listening ? 'mic-button--live' : ''}`} onClick={listening ? stopListening : startListening}>{listening ? 'STOP' : 'VOICE'}</button><textarea rows="3" value={command} onChange={(event) => setCommand(event.target.value)} placeholder="Example: On VoiceToWebsite add TEST in large blue neon letters to the global footer." /><button type="button" className="dispatch-button" onClick={() => stageMission()}>DRAFT</button><p>{speechState}</p></section>{stagedMission && <section className="draft-card"><p className="eyebrow">DRAFT READY // {stagedMission.project.name}</p><h3>{stagedMission.task}</h3><ol>{stagedMission.plan.map((step) => <li key={step}>{step}</li>)}</ol><button className="send-button" type="button" onClick={() => executeMission()}>SEND IT</button></section>}</section><aside className="execution-window"><p className="eyebrow">EXECUTION MONITOR</p><h2>{stagedMission ? stagedMission.project.name : 'Awaiting mission'}</h2><span>{stagedMission ? stagedMission.project.domain : 'Choose or mention a project'}</span>{activity.length ? activity.map((item) => <div className="execution-row" key={item.agent}><strong>{item.agent}</strong><span>{item.message}</span><i>ACTIVE</i></div>) : <p className="execution-empty">Your draft and its live progress will appear here after you say Send IT.</p>}{operatorResult && <div className={`operator-result operator-result--${operatorResult.status}`}><strong>{operatorResult.status.toUpperCase()}</strong><span>{operatorResult.summary}</span>{operatorResult.nextSteps?.map((step) => <small key={step}>{step}</small>)}{operatorResult.liveUrl && <a href={operatorResult.liveUrl} target="_blank" rel="noreferrer">OPEN LIVE SITE</a>}</div>}</aside></div></section></main>
}
