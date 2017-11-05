import { findCommonItems, findCommonEvents, findCommonFreeTimes } from './challenge'
import moment from 'moment';
import data from './data'

test('findCommonItems 1', () => {
  let input = [[1, 3, 4, 5], [3, 4, 5], [4, 5, 7]] 
  let expected = [4, 5]
  let result = findCommonItems(input)
  expect(result).toMatchObject(expected)  
})

test('findCommonItems 2', () => {
  let input = [[1, 2, 3], [3, 4, 5]] 
  let expected = [3]
  let result = findCommonItems(input)
  expect(result).toMatchObject(expected)  
})

test('findCommonItems 2', () => {
  let input = [[1, 2], [3, 4, 5],  [6, 7]] 
  let expected = []
  let result = findCommonItems(input)
  expect(result).toMatchObject(expected)  
})

test('findCommonEvents', () => {
  let schedule = [data.slice(0,3), data.slice(2, 4)]
  let expected = [{
    "start": "2017-02-21T09:00:00-05:00",
    "end": "2017-02-21T09:30:00-05:00"
  }]
  
  let result = findCommonEvents(schedule)
  expect(result).toMatchObject(expected)
})


test('findCommonFreeTimes 1', () => {
  let userSchedules = [data.slice(0,4), data.slice(2, 4)]
  const start = moment('2017-02-21').startOf('day').hour(8)
  const end = start.clone().hour(10)
  let expected = [
    {"start": "2017-02-21T08:00:00-05:00", "end": "2017-02-21T09:00:00-05:00"},
    {"start": "2017-02-21T09:30:00-05:00", "end": "2017-02-21T09:45:00-05:00"}
  ]
  
  let result = findCommonFreeTimes(userSchedules, start, end, 15)
  expect(result).toMatchObject(expected)
})

test('findCommonFreeTimes 2', () => {
  let userSchedules = [data.slice(0,4), data.slice(2, 4)]
  const start = moment('2017-02-21').startOf('day').hour(8)
  const end = start.clone().hour(10)
  let expected = [
    {"start": "2017-02-21T08:00:00-05:00", "end": "2017-02-21T09:00:00-05:00"}
  ]
  
  let result = findCommonFreeTimes(userSchedules, start, end, 30)
  expect(result).toMatchObject(expected)
})