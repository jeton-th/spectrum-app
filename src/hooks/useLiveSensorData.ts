import { useCallback, useRef, useState } from 'react'
import { type LiveSensorData } from '../types/data'

export const useLiveSensorData = (): {
  isLoadingLiveData: boolean
  liveSensorData: LiveSensorData | null
  startLiveSensorData: () => void
  stopLiveSensorData: () => void
} => {
  const [isLoadingLiveData, setIsLoading] = useState(false)
  const [liveSensorData, setSensorData] = useState(null)
  const socket = useRef<WebSocket | null>(null)

  const startLiveSensorData = useCallback(() => {
    setIsLoading(true)

    socket.current = new WebSocket(
      'wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS',
    )

    socket.current.addEventListener('message', (event) => {
      setSensorData(JSON.parse(event.data))
      setIsLoading(false)
    })
  }, [socket])

  const stopLiveSensorData = useCallback(() => {
    socket.current?.close()
    setSensorData(null)
  }, [socket])

  return {
    isLoadingLiveData,
    liveSensorData,
    startLiveSensorData,
    stopLiveSensorData,
  }
}
