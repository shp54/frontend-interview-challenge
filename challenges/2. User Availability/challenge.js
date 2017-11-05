import { findFreeTimes } from '../1. Meeting Availability/challenge'

const arrayOfSets = (arr) => arr.map((iter) => new Set(iter)) //Takes array of arrays and turns inner array into sets

const intersection = (set1, set2) => new Set([...set1].filter((x) => set2.has(x))) //Gets intersection of two sets

const multiIntersection = (sets) => sets.slice(1).reduce((acc, item) => intersection(acc, item), sets[0]) //Gets intersection of more than two sets

export const findCommonItems = (multiArray) => Array.from(multiIntersection(arrayOfSets(multiArray))) //Get array of common items from an array of arrays

//Basic idea: get the set of free times for each user, and get the intersection of all sets
//Have to flatten event object because Set.has doesn't work with object equality
//So these two functions flatten an event object and create an object from the flattened string
const flattenEventObject = (event) => `${event.start} to ${event.end}` 
const createEventObject = (eventString) => ({start: eventString.split(" ")[0], end: eventString.split(" ")[2]})

export const findCommonEvents = (eventListArray) => findCommonItems(eventListArray.map((events) => events.map(flattenEventObject))).map(createEventObject)

export function findCommonFreeTimes (userSchedules, after, before, duration) { 
  let userFreeTimes = userSchedules.map((user) => findFreeTimes(after, before, duration, user)) 
  return findCommonEvents(userFreeTimes)
}
