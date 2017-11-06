import React from 'react';
import moment from 'moment';
import { createSelector } from 'reselect';
import { findFreeTimes } from '../1. Meeting Availability/challenge';

const eventsSelector = props => props.events,
      durationSelector = props => props.duration, 
      startSelector = props => props.start,
      endSelector = props => props.end;

const incrementsSelector = createSelector(
    [ startSelector, endSelector, durationSelector ],
    (start, end, duration) => moment(end).diff(moment(start), 'minutes') / duration
  )

const freeTimesSelector = createSelector(
  [eventsSelector, durationSelector],
  (events, duration) => {
    let freeTimes = findFreeTimes(events[0].start, events[events.length - 1].end, duration, events)
    return freeTimes; //Have to do this otherwise the selector returns undefined
  })

const getAvailabilityFn = (freeTimes) => (time) => freeTimes.filter((free) => moment(time).isBetween(free.start, free.end)).length > 0

const timeBlocksSelector = createSelector(
    [ incrementsSelector, startSelector, durationSelector, freeTimesSelector ],
    (increments, start, duration, freeTimes) => {
      const getAvailability = getAvailabilityFn(freeTimes);
      return Array.from(new Array(increments), (x, i) => i * duration)
                  .map((mins) => moment(start).clone().add(mins, 'minutes'))
                  .map((time) => ({ time: time.format('h:mm'), isAvailable: getAvailability(time) }));
     }
  )

export class TimeAvailabilityPills extends React.Component {
  static propTypes = {
    start: React.PropTypes.object,
    end: React.PropTypes.object,
    duration: React.PropTypes.number,
    events: React.PropTypes.arrayOf(React.PropTypes.object),
  };
  
  render() {     
    return (
      <div className='time-availability-pills'>
        {timeBlocksSelector(this.props).map((block, index) => (
          <Pill key={index} className={block.isAvailable ? 'available' : 'unavailable'}>
            {block.time}
          </Pill>
        ))}
      </div>
     );
  }
}

export function Pill ({className, children, ...props}) {
  className = Array.isArray(className) ? className : [className];
  const classes = ['pill', ...className];
  return (
    <div className={classes}>
      {children}
    </div>
  );
}

