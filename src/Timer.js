import React, { Component } from 'react';
import './css/Timer.css';
import {calculateTimeAsObject} from "./utility";

function Timer(props) {
    return (
        <div className={'timer'}>
            <span className={'text-right'}>{ props.timerValues.hour }</span>:
            <span className={'text-center'}>{ props.timerValues.minute }</span>:
            <span className={'text-center'}>{ props.timerValues.second }</span>,
            <span className={'text-left'}>{ props.timerValues.millisecond }</span>
        </div>
    )
}

class TimerController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonLeft: {
                label: 'Lap',
                className: 'disabled',
                action: this.handleLap.bind(this),
                disabled: true
            },
            buttonRight: {
                label: 'Start',
                className: 'start',
                action: this.handleStartTimer.bind(this)
            },
            mainTimer: {
                values: {
                    hour: '0',
                    minute: '00',
                    second: '00',
                    millisecond: '00',
                }
            },
            subTimer: {
                values: {
                    hour: '0',
                    minute: '00',
                    second: '00',
                    millisecond: '00',
                }
            },
            laps: []
        };

        this.mainCounter = 0;
        this.subCounter = 0;
    }

    componentWillUnmount () {
        this.clearTimer();
    }

    clearTimer() {
        clearInterval(this.timer);
        clearInterval(this.timerLab);
    }

    tick() {

        this.mainCounter += 10;

        let times = calculateTimeAsObject(this.mainCounter);

        this.setState({
            mainTimer: {
                values: {
                    hour: times.hours,
                    minute: times.minutes,
                    second: times.seconds,
                    millisecond: times.milliseconds
                }
            }
        })
    }

    tickSub() {

        this.subCounter += 10;

        let times = calculateTimeAsObject(this.subCounter);

        this.setState({
            subTimer: {
                values: {
                    hour: times.hours,
                    minute: times.minutes,
                    second: times.seconds,
                    millisecond: times.milliseconds
                }
            }
        })
    }

    handleStartTimer() {
        this.clearTimer();
        this.timer = setInterval(this.tick.bind(this), 10);
        this.timerLab = setInterval(this.tickSub.bind(this), 10);
        this.setState({
            buttonLeft: {
                label: 'Lap',
                className: 'left',
                action: this.handleLap.bind(this),
                disabled: false
            },
            buttonRight: {
                label: 'Stop',
                className: 'stop',
                action: this.handleStopTimer.bind(this)
            }
        })
    }

    handleStopTimer() {
        this.clearTimer();
        this.setState({
            buttonLeft: {
                label: 'Reset',
                className: 'left',
                action: this.handleResetTimer.bind(this),
                disabled: false
            },
            buttonRight: {
                label: 'Start',
                className: 'start',
                action: this.handleStartTimer.bind(this)
            }
        })
    }

    handleResetTimer() {
        this.clearTimer();
        this.mainCounter = 0;
        this.subCounter = 0;
        this.setState({
            buttonLeft: {
                label: 'Lap',
                className: 'disabled',
                action: this.handleLap.bind(this),
                disabled: true
            },
            buttonRight: {
                label: 'Start',
                className: 'start',
                action: this.handleStartTimer.bind(this)
            },
            mainTimer: {
                values: {
                    hour: '0',
                    minute: '00',
                    second: '00',
                    millisecond: '00',
                }
            },
            subTimer: {
                values: {
                    hour: '0',
                    minute: '00',
                    second: '00',
                    millisecond: '00',
                }
            },
            laps: []
        })
    }

    handleLap() {
        let laps = this.state.laps;

        let times = calculateTimeAsObject(this.subCounter);

        let newLap = {
            values: {
                hour: times.hours,
                minute: times.minutes,
                second: times.seconds,
                millisecond: times.milliseconds
            }
        };

        laps.unshift(newLap);

        this.setState({
            laps: laps
        });

        this.subCounter = 0;
    }

    render() {
        return (
            <div className={'timer-wrapper'}>
                <Timer
                    timerValues={this.state.mainTimer.values}
                />
                <div className={'actions'}>
                    <button className={this.state.buttonLeft.className} disabled={this.state.buttonLeft.disabled} onClick={this.state.buttonLeft.action}>
                        {this.state.buttonLeft.label}
                    </button>
                    <button className={this.state.buttonRight.className} onClick={this.state.buttonRight.action}>
                        {this.state.buttonRight.label}
                    </button>
                </div>
                <ul className={'laps-wrapper'}>
                    <li key={this.state.laps.length + 1}><p>Lap {this.state.laps.length + 1}</p> <Timer timerValues={this.state.subTimer.values}/></li>
                    {this.state.laps.map((lap, i) =>  <li key={this.state.laps.length - i}><p>Lap {this.state.laps.length - i}</p> <Timer timerValues={lap.values}/></li>)}
                </ul>
            </div>
        )
    }
}

export default TimerController;



