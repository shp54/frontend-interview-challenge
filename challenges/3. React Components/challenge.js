import React from 'react';
import moment from 'moment';
import { findFreeTimes } from '../1. Meeting Availability/challenge'

export class TimeAvailabilityPills extends React.Component {
  static propTypes = {
    start: React.PropTypes.object,
    end: React.PropTypes.object,
    duration: React.PropTypes.number,
    events: React.PropTypes.arrayOf(React.PropTypes.object),
  };

  render() {
    //Get array of time increments 
    let start = this.props.start,
        end = this.props.end,
        duration = this.props.duration,
        events = this.props.events;
        
    let freeTimes = findFreeTimes(events[0].start, events[events.length - 1].end, duration, events);
    let getAvailability = (time) => freeTimes.filter((free) => moment(time).isBetween(free.start, free.end)).length > 0;
    let increments = moment(end).diff(moment(start), 'minutes') / duration;
    let timeBlocks = Array(increments).fill(0).map((x, i) => x + i)
                     .map((i) => moment(start).clone().add(i * duration, 'minutes'))
                     .map((time) => ({ time: time, isAvailable: getAvailability(time)}));
    
    return (
      <div className='time-availability-pills'>
        {timeBlocks.map((block, index) => (
          <Pill key={index} className={block.isAvailable ? 'available' : 'unavailable'}>
            {block.time.format('h:mm')}
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

