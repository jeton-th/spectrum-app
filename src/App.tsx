import { useCallback, type FunctionComponent } from 'react'
import { useLiveSensorData, useSensorData } from './hooks'
import GaugeComponent from 'react-gauge-component'
import { formatToDegrees, formatToMph } from './utils'
import { ArrowUp, ArrowDown } from 'iconsax-react'
import {
  Container,
  GlobalStyle,
  Message,
  NumberBox,
  Row,
  StartButton,
  theme,
} from './styles'

const App: FunctionComponent = () => {
  const { isLoadingData, sensorData, getSensorData, clearSensorData } =
    useSensorData()
  const {
    isLoadingLiveData,
    liveSensorData,
    startLiveSensorData,
    stopLiveSensorData,
  } = useLiveSensorData()

  const data = {
    statusMessage: sensorData?.statusMessage ?? liveSensorData?.StatusMessage,
    velocity: sensorData?.velocity ?? liveSensorData?.Velocity,
    altitude: sensorData?.altitude ?? liveSensorData?.Altitude,
    temperature: sensorData?.temperature ?? liveSensorData?.Temperature,
    isAscending: sensorData?.isAscending ?? liveSensorData?.IsAscending,
    isActionRequired:
      sensorData?.isActionRequired ?? liveSensorData?.IsActionRequired,
  }

  const toggleLiveData = useCallback(() => {
    clearSensorData()
    if (liveSensorData) {
      stopLiveSensorData()
    } else {
      startLiveSensorData()
    }
  }, [clearSensorData, liveSensorData, startLiveSensorData, stopLiveSensorData])

  return (
    <Container>
      <GlobalStyle />

      <Message>{data.statusMessage}</Message>

      <p>Speed</p>
      <GaugeComponent
        marginInPercent={{ top: 0.1, bottom: 0, left: 0.07, right: 0.07 }}
        type='radial'
        pointer={{
          color: theme.colors.secondaryTextColor,
          elastic: true,
        }}
        value={Math.abs(data?.velocity ?? 0)}
        minValue={0}
        maxValue={100}
        labels={{
          valueLabel: {
            formatTextValue: formatToMph,
            style: { fontSize: 24 },
          },
          tickLabels: {
            defaultTickValueConfig: {
              formatTextValue: formatToMph,
              style: { fontSize: 14 },
            },
          },
        }}
        arc={{
          subArcs: [
            {
              limit: 0,
              color: theme.colors.red,
              showTick: true,
            },
            {
              limit: 25,
              color: theme.colors.orange,
              showTick: true,
            },
            {
              limit: 50,
              color: theme.colors.yellow,
              showTick: true,
            },
            {
              limit: 75,
              color: theme.colors.lightgreen,
              showTick: true,
            },
            {
              limit: 100,
              color: theme.colors.green,
              showTick: true,
            },
          ],
        }}
      />

      <p>Temperature</p>
      <GaugeComponent
        type='radial'
        marginInPercent={{ top: 0.04, bottom: 0.0, left: 0.2, right: 0.2 }}
        style={{ width: '60%', margin: '0 auto' }}
        minValue={-50}
        maxValue={100}
        value={data?.temperature ?? 0}
        labels={{
          valueLabel: {
            formatTextValue: formatToDegrees,
          },
          tickLabels: {
            defaultTickValueConfig: {
              formatTextValue: formatToDegrees,
            },
          },
        }}
        arc={{
          width: 0.2,
          padding: 0.005,
          cornerRadius: 1,
          gradient: true,
        }}
        pointer={{
          color: theme.colors.secondaryTextColor,
          elastic: true,
        }}
      />

      <Row>
        <div style={{ flex: 1 }}>
          <p>Direction</p>
          <Row>
            <ArrowUp
              size='54'
              color={theme.colors.red}
              variant='Bulk'
              opacity={!data?.isAscending ? 0.2 : 1}
              style={{ transition: 'all 0.3s' }}
            />
            <ArrowDown
              size='54'
              color={theme.colors.red}
              variant='Bulk'
              opacity={!sensorData || data?.isAscending ? 0.2 : 1}
              style={{ transition: 'all 0.3s' }}
            />
          </Row>
        </div>

        <div style={{ flex: 1 }}>
          <p>Altitude</p>

          <NumberBox>
            <strong>{data?.altitude?.toLocaleString()}</strong>
          </NumberBox>
        </div>
      </Row>

      <Row>
        <StartButton
          type='button'
          onClick={getSensorData}
          disabled={isLoadingData || isLoadingLiveData || liveSensorData}
        >
          GET DATA
        </StartButton>

        <StartButton
          type='button'
          onClick={toggleLiveData}
          disabled={isLoadingLiveData || isLoadingData}
        >
          {liveSensorData ? 'STOP LIVE DATA' : 'START LIVE DATA'}
        </StartButton>
      </Row>
    </Container>
  )
}

export default App
