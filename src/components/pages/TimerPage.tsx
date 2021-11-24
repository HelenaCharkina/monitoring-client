import * as React from "react";

class TimerState {
  secondsRemaining: number;
  minutesRemaining: number;
  hoursRemaining: number;
  daysRemaining: number;
}

class TimerPage extends React.Component<{}, TimerState> {
  state: TimerState = {
    secondsRemaining: 0,
    minutesRemaining: 0,
    hoursRemaining: 0,
    daysRemaining: 0,
  };

  componentDidMount() {
    this.setTimer();
  }

  render() {
    return (
      <div className={"layout"}>
        <img className={"coctail"} src="img/cocktail.svg" alt="" />
        <div>
          <h1 className={"headline"}>Party, friends, two cocktails</h1>
          <h3 className={"comingsoon"}>Coming soon</h3>
          <h3 className={"dates"}>
            Days {this.state.daysRemaining} Hours {this.state.hoursRemaining}{" "}
            Minutes {this.state.minutesRemaining} Seconds{" "}
            {this.state.secondsRemaining}
          </h3>
        </div>
      </div>
    );
  }

  private setTimer() {
    let dateDeadLine = new Date(2021, 6, 23).getTime();
    setInterval(() => {
      this.timerTick(dateDeadLine);
    }, 1000);
  }

  private timerTick(dateDeadLine: number) {
    let dateNow = Date.now();
    let globalDiffSec = Math.floor((dateDeadLine - dateNow) / 1000);
    let globalDiffMin = Math.floor(globalDiffSec / 60);
    let globalDiffHours = Math.floor(globalDiffMin / 60);
    let globalDiffDays = Math.floor(globalDiffHours / 24);
    let diffSec = globalDiffSec % 60;
    let diffMin = globalDiffMin % 60;
    let diffHours = globalDiffHours % 24;

    this.setState({ secondsRemaining: diffSec });
    this.setState({ minutesRemaining: diffMin });
    this.setState({ hoursRemaining: diffHours });
    this.setState({ daysRemaining: globalDiffDays });
  }
}

export default TimerPage;
