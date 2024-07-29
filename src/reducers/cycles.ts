export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interrupedDate?: Date;
  finishedDate?: Date;
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export enum ActionTypes {
  CREATE_CYCLE = "CREATE_CYCLE",
  INTERRUPT_CYCLE = "INTERRUPT_CYCLE",
  MARK_CURRENT_CYCLE_AS_FINISHED = "MARK_CURRENT_CYCLE_AS_FINISHED",
}

export function cyclesReducer(state: CyclesState, action: any) {
  if (action.type === ActionTypes.CREATE_CYCLE) {
    return {
      ...state,
      cycles: [...state.cycles, action.payload.newCycle],
      activeCycleId: action.payload.newCycle.id,
    };
  }
  if (action.type === ActionTypes.INTERRUPT_CYCLE) {
    return {
      ...state,
      cycles: [
        state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return {
              ...cycle,
              interrupedDate: new Date(),
            };
          } else {
            return cycle;
          }
        }),
      ],
      activeCycleId: null,
    };
  }

  if (action.type === ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED) {
    return {
      ...state,
      cycles: [
        state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return {
              ...cycle,
              finishedDate: new Date(),
            };
          } else {
            return cycle;
          }
        }),
      ],
      activeCycleId: null,
    };
  }

  return state;
}
