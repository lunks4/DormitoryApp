import { Suspense } from 'react'
import NewAdForm from './NewAdForm'

export default function NewAdPageWrapper() {
  return (
    <Suspense fallback={<div>Загрузка формы...</div>}>
      <NewAdForm />
    </Suspense>
  )
}
