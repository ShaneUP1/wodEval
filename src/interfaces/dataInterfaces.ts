import { HingeType, MovementPattern, OlyType, PressType, PullType, SquatType } from '../helpers/enums';

export interface MovementOptions {
    value: SquatType | HingeType | PressType | PullType | OlyType;
    label: string;
    pattern: MovementPattern[]
}
