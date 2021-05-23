import React, { useState } from 'react';
import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/react';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

// const WORK_TIME_IN_SEC = 25 * 60;
const WORK_TIME_IN_SEC = 5;

const pomodoroMachine = createMachine(
  {
    id: 'pomodoroMachine',
    initial: 'stopped',
    // context: {
    //   tickIntervalId: null,
    //   timeLeftSec: WORK_TIME_IN_SEC,
    // },
    states: {
      stopped: {
        on: {
          START: {
            target: 'working',
            // actions: 'startWorking',
          },
        },
      },
      working: {
        on: { PAUSE: 'paused', STOP: 'stopped' },
      },
      paused: {
        on: { START: 'working', STOP: 'stopped' },
      },
    },
  }
  // {
  //   actions: {
  //     startWorking: assign({ tickIntervalId: (context, event) => setInterval() }),
  //   },
  // }
);

function Timer() {
  const [current, send] = useMachine(pomodoroMachine);
  const isTicking = current.matches('working');
  // const { count } = current.context;

  // const [isTicking, setIsTicking] = useState(false);
  const [timeLeftSec, setTimeLeftSec] = useState(WORK_TIME_IN_SEC);
  const [tickInterval, setTickInterval] = useState(null);

  const timeIsUp = () => {
    console.log('eeeee');
    send('STOP');
    // setIsTicking(false);
    setTimeLeftSec(0);
    clearInterval(tickInterval);
    setTickInterval(null);
    window.alert('Time is up');
  };

  const tickHandler = () => {
    console.log(timeLeftSec);
    if (timeLeftSec <= 0) {
      timeIsUp();
      return;
    }
    setTimeLeftSec((prevTimeLeftSec) => prevTimeLeftSec - 1);
  };

  const startTick = () => {
    if (isTicking) return;
    send('START');
    // if (isTicking) return;
    // setIsTicking(true);
    setTimeLeftSec(WORK_TIME_IN_SEC);
    setTickInterval(setInterval(tickHandler, 1000));
  };

  const formattedTime = () => {
    return `${Math.floor(timeLeftSec / 60)}:${Math.floor(timeLeftSec % 60)}`;
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3">Fuel</Typography>
      <Typography variant="h1">{formattedTime()}</Typography>
      <Button
        variant="contained"
        color={isTicking ? 'secondary' : 'primary'}
        onClick={startTick}
      >
        {isTicking ? 'Pause' : 'Start'}
      </Button>
    </Container>
  );
}

export default Timer;