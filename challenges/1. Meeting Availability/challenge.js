import moment from 'moment'

const getLengthInMinutes = (period) => moment(period.end).diff(moment(period.start), 'minutes')

const getPeriodsLongerThan = (duration) => (periods) => periods.filter((period) => getLengthInMinutes(period) >= duration)

export function findFreeTimes (start, end, duration, events) {
  let filteredData = events.filter((event) => moment(event.start) > start && moment(event.start) < end) //Get only events between the given start and end 
  
  //If there's no events in the given time period, mark that whole period as free
  if(filteredData.length === 0){
    return getPeriodsLongerThan(duration)([{ start: moment(start).format(), end: moment(end).format() }])
  } 
  
  //Get the time that all events end (except last one) and the time that new events start (except first one)
  //Zip them together to create the periods when this schedule is free
  let lastEventIndex = filteredData.length - 1,
      freeStarts = filteredData.slice(0, lastEventIndex).map((event) => event.end),
      freeEnds = filteredData.slice(1, filteredData.length).map((event) => event.start),
      freePeriods = freeStarts.map((start, index) => ({start: start, end: freeEnds[index]}))
        
    //If there's space between beginning of given period and the first event after it, add that free period
    if(start < moment(filteredData[0].start)){
      freePeriods = [{ start: moment(start).format(), end: filteredData[0].start }, ...freePeriods]
    }
    
    //If there's space end of last event after it and the end of the given period, add that free period
    if(moment(filteredData[lastEventIndex].end) < end){
      freePeriods = freePeriods.concat({ start: filteredData[lastEventIndex].end, end: moment(end).format() })
    }
          
    return getPeriodsLongerThan(duration)(freePeriods)
}