import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import GlobalSpinner from 'components/organisms/GlobalSpinner'
import { useGlobalSpinnerActionsContext } from 'contexts/GlobalSpinnerContext'

export const Loading: React.FC = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const setGlobalSpinner = useGlobalSpinnerActionsContext()

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== router.asPath) {
        setLoading(true)
        setGlobalSpinner(true)
      }
    }
    const handleComplete = (url: string) => {
      if (url === router.asPath) {
        setLoading(false)
        setGlobalSpinner(false)
      }
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  })

  return <>{loading && <GlobalSpinner />}</>
}
