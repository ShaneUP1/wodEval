import { MovementPattern, SquatType } from '../helpers/enums';

export interface MovementOptions {
    value: SquatType;
    label: string;
    pattern: MovementPattern
}
