import { Cycle, CyclesState } from "./cycles";

export enum ActionTypes {
  CREATE_CYCLE = "CREATE_CYCLE",
  INTERRUPT_CYCLE = "INTERRUPT_CYCLE",
  MARK_CURRENT_CYCLE_AS_FINISHED = "MARK_CURRENT_CYCLE_AS_FINISHED",
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.CREATE_CYCLE,
    payload: {
      newCycle,
    },
  };
}

export function finishedCycleAction(activeCycleId: CyclesState) {
  return {
    type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
    payload: {
      activeCycleId,
    },
  };
}

export function interruptedCycleAction(activeCycleId: CyclesState) {
  return {
    type: ActionTypes.INTERRUPT_CYCLE,
    payload: {
      activeCycleId,
    },
  };
}
