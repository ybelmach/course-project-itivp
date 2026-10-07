import { useEffect, useState } from 'react'
import { api } from '../api/client'

type ApiStatus = 'loading' | 'ok' | 'error'

const statusText: Record<ApiStatus, string> = {
  loading: 'проверка…',
  ok: 'доступен',
  error: 'недоступен',
}

export function HomePage() {
  const [status, setStatus] = useState<ApiStatus>('loading')

  useEffect(() => {
    api
      .get('/health')
      .then(() => setStatus('ok'))
      .catch(() => setStatus('error'))
  }, [])

  return (
    <>
      <h1>Платформа для обмена учебными материалами</h1>
      <p>Лекции, презентации и книги в одном месте.</p>
      <p>Сервер: {statusText[status]}</p>
    </>
  )
}
