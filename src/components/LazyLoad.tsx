import { Suspense, lazy, ComponentType } from 'react'
import { LoadingPage } from './LoadingPage'

export function lazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) {
  const LazyComponent = lazy(importFunc)

  return (props: any) => (
    <Suspense fallback={<LoadingPage />}>
      <LazyComponent {...props} />
    </Suspense>
  )
}
