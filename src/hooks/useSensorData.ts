import axios from 'axios'
import { useCallback, useState } from 'react'
import { type SensorData } from '../types/data'

export const useSensorData = (): {
  isLoadingData: boolean
  sensorData: SensorData | null
  getSensorData: () => Promise<void>
  clearSensorData: () => void
} => {
  const [isLoadingData, setIsLoading] = useState(false)
  const [sensorData, setSensorData] = useState<SensorData | null>(null)

  const getSensorData = useCallback(async () => {
    setIsLoading(true)

    const res = await axios({
      method: 'GET',
      baseURL:
        'https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus',
    })

    setSensorData(res.data)
    setIsLoading(false)
  }, [])

  const clearSensorData = useCallback(() => {
    setSensorData(null)
  }, [])

  return { isLoadingData, sensorData, getSensorData, clearSensorData }
}
