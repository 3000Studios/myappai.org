import {
  createAdminSession,
  setAdminSessionCookie,
  validatePrivateAccessPassword,
} from '../services/adminSessionService.js'
import { logSecureEvent } from '../services/logService.js'

export async function postPrivateAccessLogin(request, response) {
  const result = validatePrivateAccessPassword(request.body?.password)
  if (!result.ok) {
    await logSecureEvent({
      level: 'warn',
      scope: 'auth',
      title: 'Private access rejected',
      message: 'Invalid private password.',
    })
    response.status(403).json({ ok: false, message: result.message })
    return
  }

  const session = createAdminSession(result.email)
  setAdminSessionCookie(response, session.signedToken)
  response.json({ ok: true })
}
