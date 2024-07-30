import { produce } from "immer";
import { ActionTypes } from "./actions";

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interrupedDate?: Date;
  finishedDate?: Date;
}

export interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export function cyclesReducer(state: CyclesState, action: any) {
  if (action.type === ActionTypes.CREATE_CYCLE) {
    return produce(state, (draft) => {
      draft.cycles.push(action.payload.newCycle);
      draft.activeCycleId = action.payload.newCycle.id;
    });
  }
  if (action.type === ActionTypes.INTERRUPT_CYCLE) {
    return produce(state, (draft) => {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId;
      });

      if (currentCycleIndex < 0) {
        return state;
      }

      draft.cycles[currentCycleIndex].interrupedDate = new Date();

      draft.activeCycleId = null;
    });
  }

  if (action.type === ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED) {
    return produce(state, (draft) => {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId;
      });

      if (currentCycleIndex < 0) {
        return state;
      }

      draft.cycles[currentCycleIndex].finishedDate = new Date();

      draft.activeCycleId = null;
    });
  }

  return state;
}
